// Data integrity for the game's content layer. These are the guarantees the page relies on: ids are stable,
// every string is bilingual, every card points at a real trap, and the quiz's answer keys are in range.
import test from "node:test";
import assert from "node:assert/strict";
import "../src/content.js";

const C = globalThis.TFF_CONTENT;
const TRAPS = ["spend", "scam", "delay"];
const pair = (v) => Array.isArray(v) && v.length === 2 && v.every((s) => typeof s === "string" && s.trim());

test("content exports every collection the page uses", () => {
  for (const k of ["ACTS", "ACT_OF_STAGE", "POWERS", "POWER_OF_TRAP", "STAGES", "TRAPS", "CARDS", "QUIZ", "HABITS", "TYPES", "TITLES", "PERSONAS", "ENDINGS"])
    assert.ok(C[k] != null, "missing " + k);
});

test("cards: ids are unique and non-empty", () => {
  const ids = C.CARDS.map((c) => c.id);
  assert.ok(ids.length > 100, "expected a large deck, got " + ids.length);
  assert.equal(new Set(ids).size, ids.length, "duplicate card id");
  for (const id of ids) assert.ok(typeof id === "string" && id.trim(), "empty id");
});

test("cards: every card is complete and bilingual", () => {
  for (const c of C.CARDS) {
    assert.ok(Number.isInteger(c.st) && c.st >= 0 && c.st < C.STAGES.length, c.id + ": bad stage " + c.st);
    assert.ok(TRAPS.includes(c.trap), c.id + ": bad trap " + c.trap);
    assert.ok(pair(c.tag), c.id + ": tag not bilingual");
    assert.ok(typeof c.en === "string" && c.en.trim(), c.id + ": no en");
    assert.ok(typeof c.zh === "string" && c.zh.trim(), c.id + ": no zh");
    assert.ok(pair(c.w), c.id + ": wise choice not bilingual");
    assert.ok(pair(c.r), c.id + ": risky choice not bilingual");
    assert.ok(pair(c.tip), c.id + ": tip not bilingual");
    assert.ok(c.later && pair(c.later.w) && pair(c.later.r), c.id + ": later not bilingual");
  }
});

test("quiz: keys are in range and options are bilingual", () => {
  assert.ok(C.QUIZ.length >= 1);
  const ids = C.QUIZ.map((q) => q.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate quiz id");
  for (const q of C.QUIZ) {
    assert.ok(pair(q.q), q.id + ": question not bilingual");
    assert.ok(Array.isArray(q.o) && q.o.length >= 2, q.id + ": needs options");
    for (const o of q.o) assert.ok(pair(o), q.id + ": option not bilingual");
    assert.ok(Number.isInteger(q.a) && q.a >= 0 && q.a < q.o.length, q.id + ": answer key out of range");
    assert.ok(pair(q.why), q.id + ": why not bilingual");
  }
});

test("habits and endings are bilingual and non-empty", () => {
  assert.ok(C.HABITS.length > 0);
  for (const h of C.HABITS) assert.ok(h.id && h.en && h.zh, "habit " + h.id);
  assert.ok(Array.isArray(C.ENDINGS) && C.ENDINGS.length > 0, "no endings");
  for (const block of C.ENDINGS)
    for (const k of ["good", "mixed", "rough"]) assert.ok(pair(block[k]), "ending " + k + " not a bilingual pair");
});


test("stages ascend from zero and acts cover them", () => {
  assert.equal(C.STAGES.length, 4);
  assert.equal(C.STAGES[0].at, 0);
  for (let i = 1; i < C.STAGES.length; i++) assert.ok(C.STAGES[i].at > C.STAGES[i - 1].at, "stages must ascend");
  assert.equal(C.ACT_OF_STAGE.length, C.STAGES.length);
  for (const a of C.ACT_OF_STAGE) assert.ok(Number.isInteger(a) && a >= 0 && a < C.ACTS.length, "act out of range");
});

test("every trap maps to a real power", () => {
  for (const t of Object.keys(C.TRAPS)) assert.ok(t in C.POWER_OF_TRAP, "trap " + t + " has no power");
  for (const [t, p] of Object.entries(C.POWER_OF_TRAP)) {
    assert.ok(t in C.TRAPS, "POWER_OF_TRAP names an unknown trap: " + t);
    assert.ok(p in C.POWERS, "POWER_OF_TRAP names an unknown power: " + p);
  }
});

test("copy contains no simplified characters", () => {
  const simplified = new Set([...("们这说时会对为与国学觉应该现点开关门问题电话认识语词义让从见视听买卖钱银铁长间网络级别单双号码团队领导员会议场业务产")]);
  const bad = [];
  const walk = (v) => {
    if (typeof v === "string") for (const ch of v) if (simplified.has(ch)) bad.push(ch + " in " + v.slice(0, 30));
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(C);
  assert.deepEqual(bad.slice(0, 5), [], "simplified characters found: " + bad.length);
});
