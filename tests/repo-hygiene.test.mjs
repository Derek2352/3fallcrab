// Things that make the repository shippable: ignored build output, the scripts a deploy needs, a page with a
// title and a manifest, and no scratch files committed by accident.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

test("build output and secrets are ignored", () => {
  const ig = readFileSync(join(root, ".gitignore"), "utf8");
  // this repo publishes public/ on purpose (the Worker serves it), so only the local and secret paths are ignored
  for (const pat of ["node_modules", ".wrangler", ".dev.vars", ".env"])
    assert.ok(ig.includes(pat), ".gitignore does not cover " + pat);
});

test("the scripts a deploy needs are declared", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  for (const s of ["build", "test", "dev", "deploy"])
    assert.ok(pkg.scripts[s], "missing script: " + s);
  assert.ok(pkg.private, "package should stay private");
});

test("the page has a title, a viewport and a manifest", () => {
  const html = readFileSync(join(root, "public/index.html"), "utf8");
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  assert.ok(title && title.trim().length > 3, "missing title");
  assert.match(html, /name="viewport"/);
  assert.match(html, /rel="manifest"/);
});

test("the page loads the game's own code and styles", () => {
  const html = readFileSync(join(root, "public/index.html"), "utf8");
  assert.match(html, /assets\/game\.[a-f0-9]+\.js/);
  assert.match(html, /assets\/style\.[a-f0-9]+\.css/);
});

test("no scratch or backup files are committed", () => {
  const r = spawnSync("git", ["ls-files"], { cwd: root, encoding: "utf8" });
  assert.equal(r.status, 0, "git ls-files failed");
  const files = r.stdout.split("\n").filter(Boolean);
  const bad = files.filter((f) =>
    f.includes("_probe") || f.endsWith(".bak") || f.endsWith(".orig") || f.endsWith(".tmp") ||
    f.includes(".DS_Store") || f.startsWith("~$") || f.includes("node_modules/"));
  assert.deepEqual(bad.slice(0, 5), [], "committed by accident: " + bad.join(", "));
});
