// Unit tests for pure gameplay, scoring, silhouette, challenge, and verdict logic (src/game-core.js),
// including cross-checks against server/api.js invariants (cleanSil, implausible).
import test from "node:test";
import assert from "node:assert/strict";
import "../src/content.js";
import "../src/game-core.js";
import * as API from "../server/api.js";

const CORE = globalThis.TFF_CORE;
const { TITLES, STAGES, PERSONAS } = globalThis.TFF_CONTENT;

test("warmupFactor and fallSpeedFor ramp smoothly and accelerate after putting-off-saving curse", () => {
  assert.equal(CORE.warmupFactor(0), CORE.WARMUP_FROM);
  assert.equal(CORE.warmupFactor(CORE.WARMUP_MS), 1);
  assert.equal(CORE.warmupFactor(CORE.WARMUP_MS * 2), 1);
  assert.equal(CORE.fallSpeedFor(0, 0, 0), CORE.FALL[0] * CORE.WARMUP_FROM);
  assert.ok(Math.abs(CORE.fallSpeedFor(2, CORE.WARMUP_MS, 0) - CORE.FALL[2]) < 1e-9);
  assert.ok(Math.abs(CORE.fallSpeedFor(1, 50000, 70000) - CORE.FALL[1] * 1.7) < 1e-9);
});

test("drop grace, auto-anchoring, and rarity slices honor invariants", () => {
  assert.equal(CORE.canTriggerDrop(1500, 1000), false);
  assert.equal(CORE.canTriggerDrop(1000 + CORE.DROP_GRACE_MS, 1000), true);
  assert.equal(CORE.shouldAnchorBody(CORE.ANCHOR_REST - 1, 0, 20000, 200, -10), false);
  assert.equal(CORE.shouldAnchorBody(CORE.ANCHOR_REST, 15000, 20000, 200, -10), false);
  assert.equal(CORE.shouldAnchorBody(CORE.ANCHOR_REST, 0, 20000, CORE.ANCHOR_DEPTH - 1, -10), false);
  assert.equal(CORE.shouldAnchorBody(CORE.ANCHOR_REST, 0, 20000, 300, -250), false);
  assert.equal(CORE.shouldAnchorBody(CORE.ANCHOR_REST, 0, 20000, 300, -20), true);

  const traits = [0, 0.05, 0.13, 0.2, 0.5, 0.99].map(CORE.rollItemTrait);
  assert.deepEqual(traits, ["vine", "vine", "lock", "slime", "plain", "plain"]);
});

test("computePayout aligns with server implausible() ceiling", () => {
  const [g1, m1, e1] = CORE.computePayout(500, 1.4, false);
  assert.deepEqual([g1, m1, e1], [700, 1, 0]);
  const [g2, m2, e2] = CORE.computePayout(2000, 1.8, true);
  assert.deepEqual([g2, m2, e2], [5400, 1.5, 1800]);
  assert.equal(g2 % 10, 0);
  // 5 wise answers => boost 2.0; 10 floors, 25 items placed, jackpot hit
  const maxItemGain = CORE.computePayout(500, 2, true)[0] * 25;
  const maxFloorGain = CORE.computePayout(2000, 2, true)[0] * 10;
  const total = CORE.JACKPOT_BONUS + maxItemGain + maxFloorGain;
  assert.equal(API.implausible({ score: total, height: 10, stage: 2, jackpot: 1 }, 5, 25), null);
});

test("encodeSilhouette produces strings accepted by decodeSilhouette and server cleanSil()", () => {
  const parts = [
    {
      minY: -60,
      maxY: -10,
      vertices: [{ x: 160, y: -10 }, { x: 280, y: -10 }, { x: 280, y: -60 }, { x: 160, y: -60 }],
    },
  ];
  const encoded = CORE.encodeSilhouette(parts);
  assert.ok(encoded && encoded.length >= 4);
  assert.equal(API.cleanSil(encoded), encoded);
  const rows = CORE.decodeSilhouette(encoded);
  assert.ok(Array.isArray(rows) && rows.length >= 4);
  assert.equal(CORE.decodeSilhouette("zzzz"), null);
  assert.equal(CORE.decodeSilhouette("bad!"), null);
});

test("verdictOf selects all 13 titles in documented disaster-first priority", () => {
  const base = { over: "time", stage: 1, wise: 0, missed: 0, score: 0, best: 0, jpAt: -1, falls: { spend: 0, scam: 0, delay: 0 }, troll: {} };
  assert.equal(CORE.verdictOf({ ...base, over: "drops", stage: 0 }, TITLES, STAGES.length).id, "diver");
  assert.equal(CORE.verdictOf({ ...base, falls: { spend: 0, scam: 2, delay: 0 } }, TITLES, STAGES.length).id, "scamvip");
  assert.equal(CORE.verdictOf({ ...base, troll: { invest: 2 } }, TITLES, STAGES.length).id, "believer");
  assert.equal(CORE.verdictOf({ ...base, falls: { spend: 2, scam: 0, delay: 0 } }, TITLES, STAGES.length).id, "future");
  assert.equal(CORE.verdictOf({ ...base, falls: { spend: 0, scam: 0, delay: 1 }, missed: 1 }, TITLES, STAGES.length).id, "tomorrow");
  assert.equal(CORE.verdictOf({ ...base, troll: { ticketSeen: 1, tickets: 2 } }, TITLES, STAGES.length).id, "scratch");
  assert.equal(CORE.verdictOf({ ...base, wise: 3 }, TITLES, STAGES.length).id, "zero");
  assert.equal(CORE.verdictOf({ ...base, stage: 3, wise: 1 }, TITLES, STAGES.length).id, "retire");
  assert.equal(CORE.verdictOf({ ...base, jpAt: 12000 }, TITLES, STAGES.length).id, "lucky");
  assert.equal(CORE.verdictOf({ ...base, best: 12 * CORE.FLOOR }, TITLES, STAGES.length).id, "stacker");
  assert.equal(CORE.verdictOf({ ...base, score: 30000 }, TITLES, STAGES.length).id, "tycoon");
  assert.equal(CORE.verdictOf({ ...base, score: 1200 }, TITLES, STAGES.length).id, "steady");
  assert.equal(CORE.verdictOf({ ...base, score: 0 }, TITLES, STAGES.length).id, "moonlight");
  assert.equal(CORE.tierOf({ id: "zero" }), "gold");
  assert.equal(CORE.tierOf({ id: "steady" }), "silver");
  assert.equal(CORE.tierOf({ id: "diver" }), "bronze");
});

test("parseChallenge validates metadata, query params, persona, and silhouette", () => {
  const validPersona = p => {
    const [b, pe] = p.split("+");
    return !!(PERSONAS.bg[b] && PERSONAS.pe[pe]);
  };
  const ch = CORE.parseChallenge({
    metaJson: JSON.stringify({ s: 9800, n: "<b>Ming</b>", v: "zero", p: "sub+grind", sil: "0a1b" }),
    titles: TITLES,
    isValidPersona: validPersona,
  });
  assert.equal(ch.s, 9800);
  assert.equal(ch.n, "bMing/b");
  assert.equal(ch.v.id, "zero");
  assert.equal(ch.p, "sub+grind");
  assert.equal(ch.sil, "0a1b");
  assert.equal(CORE.parseChallenge({ search: "?s=notanumber", titles: TITLES }), null);
});

test("hapticSegments and aggregateStats handle pulse arrays and mixed game records", () => {
  assert.deepEqual(CORE.hapticSegments(25), [{ delay: 0, dur: 25 }]);
  assert.deepEqual(CORE.hapticSegments([20, 30, 40]), [{ delay: 0, dur: 20 }, { delay: 50, dur: 40 }]);
  const agg = CORE.aggregateStats([
    { wise: 2, risky: 1, missed: 0, falls: { spend: 1 }, habit: "buffer", answers: [1, 2, 3], quiz: 2 },
    { wise: 1, risky: 0, missed: 1, falls: { delay: 1 }, habit: "buffer", quiz: 1 },
  ]);
  assert.deepEqual(agg, { games: 2, wise: 3, risky: 1, missed: 1, falls: { spend: 1, scam: 0, delay: 1 }, habits: { buffer: 2 }, quizSum: 3, quizN: 2, quizPass: 1, sample: false });
});
