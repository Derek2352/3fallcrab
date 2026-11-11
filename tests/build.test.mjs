// The build must produce a page whose every asset reference resolves. A stale fingerprint here means the site
// serves a 404 for its own stylesheet, which is the failure this suite exists to catch.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

test("build runs cleanly", () => {
  const r = spawnSync(process.execPath, ["tools/build.mjs"], { cwd: root, encoding: "utf8" });
  assert.equal(r.status, 0, "build failed:\n" + (r.stderr || r.stdout));
});

test("public/index.html exists and every /assets/ reference resolves", () => {
  const idx = join(pub, "index.html");
  assert.ok(existsSync(idx), "no public/index.html");
  const html = readFileSync(idx, "utf8");
  const refs = [...new Set(html.match(/\/assets\/[A-Za-z0-9._%-]+/g) || [])];
  assert.ok(refs.length > 0, "page references no assets");
  const missing = refs.filter((r) => !existsSync(join(pub, r)));
  assert.deepEqual(missing, [], "missing assets: " + missing.join(", "));
});

test("no unresolved template tokens are shipped", () => {
  const html = readFileSync(join(pub, "index.html"), "utf8");
  const left = (html.match(/%%[A-Z_]+%%/g) || []);
  assert.deepEqual(left, [], "unreplaced tokens: " + left.join(", "));
});
