// Static safety checks on the game's own source (vendored libraries are excluded — they are third-party and
// checked by their own projects).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const walk = (dir, out = []) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) { if (f !== "vendor" && f !== "node_modules") walk(p, out); }
    else if (f.endsWith(".js")) out.push(p);
  }
  return out;
};
const files = [...walk(join(root, "src")), join(root, "server/api.js"), join(root, "server/worker.js")];
const source = files.map((f) => [f, readFileSync(f, "utf8")]);

test("no eval or Function constructor in the game's own code", () => {
  const hits = source.filter(([, s]) => /\beval\s*\(|new\s+Function\s*\(/.test(s)).map(([f]) => f);
  assert.deepEqual(hits, [], "dynamic code execution in: " + hits.join(", "));
});

test("no credentials committed to source", () => {
  const patterns = [/gh[pousr]_[A-Za-z0-9]{20,}/, /sk-[A-Za-z0-9]{20,}/, /AIza[0-9A-Za-z_-]{30,}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/];
  const hits = [];
  for (const [f, s] of source) for (const re of patterns) if (re.test(s)) hits.push(f + " matches " + re);
  assert.deepEqual(hits, [], hits.join("; "));
});

test("no debugger statements left in", () => {
  const hits = source.filter(([, s]) => /^\s*debugger\s*;?\s*$/m.test(s)).map(([f]) => f);
  assert.deepEqual(hits, [], "debugger in: " + hits.join(", "));
});
