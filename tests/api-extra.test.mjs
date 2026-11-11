// Edge cases around calendar boundaries and input limits, where off-by-one errors in prize weeks hide.
import test from "node:test";
import assert from "node:assert/strict";
import * as A from "../server/api.js";

const TZ = "Asia/Hong_Kong";

test("ISO week holds across the new year, as the prize weeks rely on", () => {
  assert.equal(A.isoWeek(new Date("2026-12-31T04:00:00Z"), TZ), "2026-W53");
  assert.equal(A.isoWeek(new Date("2027-01-01T04:00:00Z"), TZ), "2026-W53");
  assert.equal(A.isoWeek(new Date("2027-01-04T04:00:00Z"), TZ), "2027-W01");
});

test("month key flips at midnight Hong Kong time, not UTC", () => {
  assert.equal(A.monthKey(new Date("2026-12-31T15:00:00Z"), TZ), "2026-12");   // 23:00 on 31 Dec
  assert.equal(A.monthKey(new Date("2026-12-31T16:30:00Z"), TZ), "2027-01");   // 00:30 on 1 Jan
});

test("cleanName survives input made only of control characters", () => {
  assert.equal(A.cleanName("\u0000\u0001\u0002"), A.NAME_DEFAULT);
});

test("cleanEmail respects the length and shape limits", () => {
  assert.equal(A.cleanEmail("a".repeat(64) + "@b.co").length, 64 + 5);
  assert.equal(A.cleanEmail("a".repeat(65) + "@b.co"), null);
  assert.equal(A.cleanEmail("first.last+tag@b.co"), "first.last+tag@b.co");
  assert.equal(A.cleanEmail("bad@"), null);
  assert.equal(A.cleanEmail("@bad.co"), null);
});

test("networkKey always reduces IPv6 to a /64, with or without a double colon", () => {
  assert.match(A.networkKey("2001:db8:1:2:3:4:5:6"), /^2001:db8:1:2::\/64$/);
  assert.match(A.networkKey("2001:db8:1:2::9"), /\/64$/);
  assert.equal(A.networkKey("2001:db8:1:2:3:4:5:6"), A.networkKey("2001:db8:1:2:9:9:9:9"));
});
