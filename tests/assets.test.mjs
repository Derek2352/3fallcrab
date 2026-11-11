// Everything the built page asks the browser to fetch must exist. A missing font or a stale url() in the CSS
// fails silently: the text just falls back to a system face and nobody notices until it looks wrong.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const cssName = readdirSync(join(pub, "assets")).find((f) => f.startsWith("style.") && f.endsWith(".css"));
const css = readFileSync(join(pub, "assets", cssName), "utf8");

test("every url() in the built CSS resolves to a published file", () => {
  const urls = [...css.matchAll(/url\((['"]?)([^)'"]+)\1\)/g)].map((m) => m[2]);
  const local = urls.filter((u) => u.startsWith("/") && !u.startsWith("data:"));
  const missing = [...new Set(local)].filter((u) => !existsSync(join(pub, u)));
  assert.ok(local.length > 0, "expected local url() references in the CSS");
  assert.deepEqual(missing, [], "missing: " + missing.join(", "));
});

test("every @font-face source is published", () => {
  const faces = [...css.matchAll(/@font-face\{[^}]*\}/g)].map((m) => m[0]);
  assert.ok(faces.length >= 2, "expected the self-hosted faces");
  for (const f of faces) for (const m of f.matchAll(/url\(([^)]+)\)/g)) {
    const u = m[1].replace(/["']/g, "");
    if (u.startsWith("/")) assert.ok(existsSync(join(pub, u)), "font missing: " + u);
  }
});

test("the stylesheet's braces balance", () => {
  const open = (css.match(/\{/g) || []).length, close = (css.match(/\}/g) || []).length;
  assert.equal(open, close, open + " { vs " + close + " }");
});

test("wrangler config points at files that exist", () => {
  const w = readFileSync(join(root, "wrangler.jsonc"), "utf8");
  const main = (w.match(/"main"\s*:\s*"([^"]+)"/) || [])[1];
  assert.ok(main && existsSync(join(root, main)), "wrangler main is missing: " + main);
  assert.match(w, /"binding"\s*:\s*"DB"/, "the D1 binding must stay named DB");
  assert.match(w, /"directory"\s*:\s*"\.\/public"/, "assets directory changed");
  assert.match(w, /3fallcrab\.com/, "routes lost the domain");
});

test("the runtime satisfies the declared engine", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const want = (pkg.engines && pkg.engines.node) || "";
  const major = parseInt(want.replace(/[^0-9]/g, "").slice(0, 2), 10);
  const have = parseInt(process.versions.node.split(".")[0], 10);
  assert.ok(have >= major, "node " + process.versions.node + " does not satisfy engines.node " + want);
});
