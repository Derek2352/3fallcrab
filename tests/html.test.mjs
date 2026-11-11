// Structural checks on the page markup. Duplicate ids break label associations and aria references silently,
// which is exactly the kind of fault that never shows up until someone tries to use the page with a screen reader.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "src/index.html"), "utf8");
const manifest = JSON.parse(readFileSync(join(root, "src/static/manifest.webmanifest"), "utf8"));

test("no duplicate element ids", () => {
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set(), dupes = new Set();
  for (const id of ids) (seen.has(id) ? dupes : seen).add(id);
  assert.deepEqual([...dupes], [], "duplicate ids: " + [...dupes].join(", "));
});

test("every input is labelled", () => {
  const inputs = [...html.matchAll(/<(input|textarea|select)\b[^>]*>/g)].map((m) => m[0]);
  const unlabelled = [];
  for (const tag of inputs) {
    const id = (tag.match(/\sid="([^"]+)"/) || [])[1];
    const hasAria = /\saria-label="/.test(tag) || /\saria-labelledby="/.test(tag);
    const hasFor = id && new RegExp('for="' + id + '"').test(html);
    const inLabel = /<label\b[^>]*>[^<]*$/.test(html.slice(Math.max(0, html.indexOf(tag) - 200), html.indexOf(tag)));
    if (!hasAria && !hasFor && !inLabel) unlabelled.push(id || tag.slice(0, 40));
  }
  assert.deepEqual(unlabelled, [], "unlabelled inputs: " + unlabelled.join(", "));
});

test("every image declares alt or is decorative", () => {
  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  const bad = imgs.filter((t) => !/\salt="/.test(t) && !/aria-hidden="true"/.test(t));
  assert.deepEqual(bad, [], "images without alt: " + bad.length);
});

test("the document declares a language", () => {
  assert.match(html, /<html[^>]*\slang="[a-zA-Z-]+"/);
});

test("no insecure asset references", () => {
  const http = [...html.matchAll(/(?:src|href)="http:\/\/[^"]+"/g)].map((m) => m[0]);
  assert.deepEqual(http, [], "http:// references (mixed content): " + http.join(", "));
});

test("the web app manifest is complete", () => {
  assert.ok(manifest.name, "manifest needs a name");
  assert.ok(manifest.start_url, "manifest needs start_url");
  assert.ok(Array.isArray(manifest.icons) && manifest.icons.length >= 2, "manifest needs icons");
  for (const i of manifest.icons) assert.ok(i.src && i.sizes && i.type, "icon entry incomplete: " + JSON.stringify(i));
});
