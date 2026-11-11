// The build refuses to run on a malformed address, copies the static tree, and produces the same fingerprints
// on a second run. All three are things a bad deploy would expose silently.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const build = (env = {}) => spawnSync(process.execPath, ["tools/build.mjs"], {
  cwd: root, encoding: "utf8", env: { ...process.env, ...env },
});
const assets = () => readdirSync(join(root, "public/assets")).sort();

test("a malformed contact email stops the build", () => {
  const r = build({ CONTACT_EMAIL: "not-an-email" });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /contact email/i);
});

test("a malformed site address stops the build", () => {
  const r = build({ SITE_URL: "ftp://nope" });
  assert.equal(r.status, 1);
});

test("a clean build succeeds and is idempotent", () => {
  const first = build();
  assert.equal(first.status, 0, first.stderr);
  const a = assets();
  const second = build();
  assert.equal(second.status, 0, second.stderr);
  assert.deepEqual(assets(), a, "a second build produced different fingerprints");
});

test("every file under src/static is published", () => {
  const walk = (dir, out = []) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p, out); else out.push(relative(join(root, "src/static"), p));
    }
    return out;
  };
  const missing = walk(join(root, "src/static")).filter((rel) => !existsSync(join(root, "public", rel)));
  assert.deepEqual(missing, [], "not published: " + missing.join(", "));
});

test("the host files a deploy needs are present", () => {
  for (const f of ["404.html", "_headers", "robots.txt", "manifest.webmanifest"]) {
    assert.ok(existsSync(join(root, "public", f)), "missing public/" + f);
  }
});
