// Unit tests for the leaderboard API's pure functions. These are the guards that stop an edited request from
// reaching the board, plus the date and network helpers the weekly/monthly prizes depend on.
import test from "node:test";
import assert from "node:assert/strict";
import * as A from "../server/api.js";

const TZ = "Asia/Hong_Kong";

test("cleanName: trims, caps, strips control characters and angle brackets", () => {
  assert.equal(A.cleanName(""), A.NAME_DEFAULT);
  assert.equal(A.cleanName("   "), A.NAME_DEFAULT);
  assert.equal(A.cleanName("  Ming  "), "Ming");
  assert.equal(A.cleanName("a".repeat(40)).length, 16);
  assert.equal(A.cleanName("\u0007bad"), "bad");
  assert.equal(A.cleanName("<b>x</b>").includes("<"), false);
  assert.equal(A.cleanName("<b>x</b>").includes(">"), false);
  assert.equal(A.cleanName("蟹仔"), "蟹仔");
  assert.ok(A.cleanName("Ming\u202Eevil").indexOf("\u202E") === -1, "bidi override must not survive");
});

test("cleanEmail: undefined when empty, null when malformed, trimmed when valid", () => {
  assert.equal(A.cleanEmail(""), undefined);
  assert.equal(A.cleanEmail(null), undefined);
  assert.equal(A.cleanEmail("   "), undefined);
  assert.equal(A.cleanEmail("bad"), null);
  assert.equal(A.cleanEmail("no@tld"), null);
  assert.equal(A.cleanEmail("a b@c.co"), null);
  assert.equal(A.cleanEmail("a".repeat(250) + "@b.co"), null);
  assert.equal(A.cleanEmail("a@b.co"), "a@b.co");
  assert.equal(A.cleanEmail(" A@B.CO "), "A@B.CO");
});

test("monthKey and isoWeek follow the Hong Kong calendar", () => {
  assert.equal(A.monthKey(new Date("2026-11-09T12:00:00Z"), TZ), "2026-11");
  assert.equal(A.monthKey(new Date("2026-01-31T20:00:00Z"), TZ), "2026-02");   // 04:00 on 1 Feb in HK
  assert.equal(A.isoWeek(new Date("2026-01-01T12:00:00Z"), TZ), "2026-W01");
  assert.equal(A.isoWeek(new Date("2026-11-09T12:00:00Z"), TZ), "2026-W46");
});

test("cleanAnswers: accepts known questions, drops junk, counts right answers", () => {
  const ok = A.cleanAnswers([{ q: "fakeapp", pick: 1 }]);
  assert.equal(ok.length, 1);
  assert.equal(ok[0].q, "fakeapp");
  assert.equal(ok[0].pick, 1);
  assert.equal(ok[0].ok, 1);
  assert.deepEqual(A.cleanAnswers([{ q: "nope", pick: 0 }]), []);
  assert.deepEqual(A.cleanAnswers([{ q: "fakeapp", pick: 99 }]), []);
  assert.deepEqual(A.cleanAnswers("nope"), []);
  assert.equal(A.cleanAnswers([{ q: "fakeapp", pick: 1 }, { q: "fakeapp", pick: 2 }]).length, 1, "duplicates collapse");
});

test("implausible: refuses impossible games, allows ordinary ones", () => {
  assert.equal(A.implausible({ score: 0, height: 0, stage: 0 }, 0, 0), null);
  assert.equal(A.implausible({ score: 200, height: 1, stage: 0 }, 1, 5), null);
  assert.equal(A.implausible({ score: 115, height: 2, stage: 0 }, 1, 4), "score_step");
  assert.equal(A.implausible({ score: 500, height: 0, stage: 0 }, 0, 3), "no_height");
  assert.equal(A.implausible({ score: 9999990, height: 20, stage: 3 }, 0, 20), "score");
});

test("networkKey: IPv4 passes through, IPv6 collapses to its /64", () => {
  assert.equal(A.networkKey("1.2.3.4"), "1.2.3.4");
  assert.equal(A.networkKey("::ffff:1.2.3.4"), "1.2.3.4");
  const a = A.networkKey("2001:db8:1234:5678:aaaa:bbbb:cccc:dddd");
  const b = A.networkKey("2001:db8:1234:5678:eeee:ffff:1111:2222");
  assert.equal(a, b, "one /64 must share a rate-limit key");
  assert.notEqual(a, A.networkKey("2001:db8:9999:5678:aaaa:bbbb:cccc:dddd"));
});

test("migrations are declared once each", () => {
  assert.ok(A.SCHEMA.length > 0 && A.ADDED.length > 0);
  const all = [...A.SCHEMA, ...A.ADDED].map((s) => (typeof s === "string" ? s : s.id || s.name || JSON.stringify(s)));
  assert.equal(new Set(all).size, all.length, "duplicate migration");
});
