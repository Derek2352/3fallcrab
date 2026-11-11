// Regression guards for the mechanics and chrome that were tuned deliberately. Each assertion names the behaviour
// it protects, so a future edit that undoes the work fails with a reason rather than silently.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const game = readFileSync(join(root, "src/game.js"), "utf8");
const css = readFileSync(join(root, "src/style.css"), "utf8");
const html = readFileSync(join(root, "src/index.html"), "utf8");
const num = (name) => {
  const m = game.match(new RegExp(name + " = ([0-9.]+)"));
  assert.ok(m, name + " not found in src/game.js");
  return parseFloat(m[1]);
};


test("item rarity slices are each possible and never overlap the whole range", () => {
  const vine = num("VINE_RARE"), lock = num("LOCK_RARE"), slime = num("SLIME_RARE");
  for (const [n, v] of [["VINE_RARE", vine], ["LOCK_RARE", lock], ["SLIME_RARE", slime]])
    assert.ok(v > 0 && v < 1, n + " out of range: " + v);
  const total = vine + lock + slime;
  assert.ok(total < 1, "the sequential roll would swallow the plain items: " + total.toFixed(3));
});

test("slime grips without an attractive force", () => {
  assert.equal(game.includes("SLIME_PULL"), false, "the attractive pull is back; it makes items rock");
  assert.ok(game.includes("SLIME_GRAB"), "the one-way grip is missing");
  assert.ok(game.includes("Body.setVelocity"), "the grip should cancel separating velocity");
});

test("the CUT overlay stays removed", () => {
  assert.equal(game.includes("cutSlap"), false);
  assert.equal(html.includes("cutOv"), false);
  assert.equal(css.includes("#cutOv"), false);
});

test("letterbox bars are keyed to the card modal and cannot inherit the .lbx panel", () => {
  assert.ok(css.includes(".fbars{position:fixed"), "the fbars rule is missing");
  assert.equal(css.includes(".lbx{position:fixed"), false, "the old .lbx rule is back");
  assert.ok(css.includes(":has(#cardModal"), "bars must follow the modal's own state");
});

test("the prize email is remembered on the device", () => {
  assert.ok(game.includes('lsGet("tff_email"'), "email is not restored");
  assert.ok(game.includes('lsSet("tff_email"'), "email is not saved");
});

test("end credits close the results, after the troll section", () => {
  const t = html.indexOf('id="trollSec"'), c = html.indexOf("credits-sec");
  assert.ok(t > -1 && c > -1, "missing troll or credits block");
  assert.ok(t < c, "credits must come after 'Too good to be true'");
});

test("grain is static on touch devices", () => {
  assert.ok(css.includes("pointer: coarse"), "no coarse-pointer guard for the grain");
});
