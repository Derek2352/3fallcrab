// Cross-references between content collections: the places where one file names something defined in another.
import test from "node:test";
import assert from "node:assert/strict";
import "../src/content.js";

const C = globalThis.TFF_CONTENT;
const pair = (v) => Array.isArray(v) && v.length === 2 && v.every((s) => typeof s === "string" && s.trim());

test("every card offers two different choices and two different outcomes", () => {
  const bad = C.CARDS.filter((c) => JSON.stringify(c.w) === JSON.stringify(c.r)).map((c) => c.id);
  const sameLater = C.CARDS.filter((c) => JSON.stringify(c.later.w) === JSON.stringify(c.later.r)).map((c) => c.id);
  assert.deepEqual(bad.slice(0, 5), [], "identical choices: " + bad.join(", "));
  assert.deepEqual(sameLater.slice(0, 5), [], "identical later texts: " + sameLater.join(", "));
});

test("every stage and every trap has cards", () => {
  for (const st of C.STAGES.keys()) assert.ok(C.CARDS.some((c) => c.st === st), "no cards for stage " + st);
  for (const t of Object.keys(C.TRAPS)) assert.ok(C.CARDS.some((c) => c.trap === t), "no cards for trap " + t);
});

test("only known placeholders appear in copy", () => {
  const allowed = new Set(["name", "nick", "he", "He", "him", "his", "His", "loss", "n", "k"]);
  const found = new Set();
  const walk = (v) => {
    if (typeof v === "string") for (const m of v.matchAll(/\{(\w+)\}/g)) found.add(m[1]);
    else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === "object") Object.values(v).forEach(walk);
  };
  walk(C);
  const unknown = [...found].filter((t) => !allowed.has(t));
  assert.deepEqual(unknown, [], "unknown placeholders: " + unknown.join(", "));
});

test("titles are unique and complete", () => {
  assert.ok(C.TITLES.length > 0);
  const ids = C.TITLES.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, "duplicate title id");
  for (const t of C.TITLES) {
    assert.ok(t.en && t.zh, "title " + t.id + " missing a name");
    assert.ok(pair(t.line), "title " + t.id + " missing a bilingual line");
  }
});

test("types are complete and bilingual", () => {
  for (const [k, v] of Object.entries(C.TYPES)) {
    assert.ok(v.en && v.zh, "type " + k + " missing a name");
    assert.ok(pair(v.d), "type " + k + " missing a bilingual description");
  }
});

test("every persona named by a card exists", () => {
  const bg = new Set(Object.keys(C.PERSONAS.bg)), pe = new Set(Object.keys(C.PERSONAS.pe));
  const bad = [];
  for (const c of C.CARDS) {
    if (!c.who) continue;
    for (const part of String(c.who).split("+")) if (!bg.has(part) && !pe.has(part)) bad.push(c.id + " -> " + part);
  }
  assert.deepEqual(bad.slice(0, 5), [], "unknown persona: " + bad.join(", "));
});

test("quips are non-empty bilingual lists", () => {
  for (const [k, lines] of Object.entries(C.QUIPS)) {
    assert.ok(Array.isArray(lines) && lines.length > 0, "quip " + k + " is empty");
    for (const l of lines) assert.ok(pair(l), "quip " + k + " has a line that is not a bilingual pair");
  }
});

test("missed-card lines are bilingual pairs", () => {
  for (const l of C.LATER_NONE) assert.ok(pair(l), "LATER_NONE entry is not a bilingual pair");
});

test("retired quiz and habit ids point at live ones", () => {
  const quizIds = new Set(C.QUIZ.map((q) => q.id));
  for (const [was, v] of Object.entries(C.QUIZ_WAS)) {
    const target = v && v.id ? v.id : v;
    assert.ok(quizIds.has(target), "QUIZ_WAS " + was + " -> " + target + " does not exist");
  }
  const habitIds = new Set(C.HABITS.map((h) => h.id));
  for (const [was, id] of Object.entries(C.HABIT_WAS))
    assert.ok(habitIds.has(id), "HABIT_WAS " + was + " -> " + id + " does not exist");
});
