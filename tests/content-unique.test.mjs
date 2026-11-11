// Content a human would notice: the same prompt twice, an English line pasted into the Chinese field, or an id
// that would break the analytics keys.
import test from "node:test";
import assert from "node:assert/strict";
import "../src/content.js";

const C = globalThis.TFF_CONTENT;
const hasCJK = (s) => /[\u4e00-\u9fff]/.test(s);
const dups = (list) => { const seen = new Set(), out = []; for (const x of list) (seen.has(x) ? out : seen).add(x); return out; };

test("no two cards share an English or Chinese prompt", () => {
  assert.deepEqual(dups(C.CARDS.map((c) => c.en.trim())).slice(0, 3), [], "duplicate English prompt");
  assert.deepEqual(dups(C.CARDS.map((c) => c.zh.trim())).slice(0, 3), [], "duplicate Chinese prompt");
});

test("English and Chinese are never the same string", () => {
  const bad = [];
  const check = (label, en, zh) => { if (en && zh && en.trim() === zh.trim()) bad.push(label); };
  for (const c of C.CARDS) {
    check(c.id, c.en, c.zh);
    check(c.id + ".w", c.w[0], c.w[1]);
    check(c.id + ".r", c.r[0], c.r[1]);
    check(c.id + ".tip", c.tip[0], c.tip[1]);
  }
  assert.deepEqual(bad.slice(0, 5), [], "same string in both languages: " + bad.join(", "));
});

test("every Chinese field actually contains Chinese", () => {
  const bad = [];
  for (const c of C.CARDS) {
    if (!hasCJK(c.zh)) bad.push(c.id + ".zh");
    if (!hasCJK(c.w[1])) bad.push(c.id + ".w");
    if (!hasCJK(c.r[1])) bad.push(c.id + ".r");
    if (!hasCJK(c.tag[1])) bad.push(c.id + ".tag");
  }
  assert.deepEqual(bad.slice(0, 5), [], "no Chinese characters in: " + bad.join(", "));
});

test("titles, types, personas and traps are Chinese too", () => {
  const bad = [];
  for (const t of C.TITLES) if (!hasCJK(t.zh)) bad.push("title " + t.id);
  for (const [k, v] of Object.entries(C.TYPES)) if (!hasCJK(v.zh)) bad.push("type " + k);
  for (const t of Object.values(C.TRAPS)) if (!hasCJK(t.zh)) bad.push("trap " + t.en);
  for (const [group, list] of Object.entries(C.PERSONAS)) {
    if (group === "combos") continue;
    for (const [k, v] of Object.entries(list)) if (!hasCJK(v.zh)) bad.push("persona " + k);
  }
  assert.deepEqual(bad.slice(0, 5), [], "missing Chinese: " + bad.join(", "));
});

test("ids are slug-safe, so they survive as keys and in URLs", () => {
  const slug = /^[a-z0-9]+([_-][a-z0-9]+)*$/;   // ids are keys and HTML targets: lowercase, digits, - or _
  const bad = [
    ...C.CARDS.map((c) => c.id),
    ...C.QUIZ.map((q) => q.id),
    ...C.HABITS.map((h) => h.id),
    ...C.TITLES.map((t) => t.id),
  ].filter((id) => !slug.test(id));
  assert.deepEqual(bad.slice(0, 5), [], "not slug-safe: " + bad.join(", "));
});
