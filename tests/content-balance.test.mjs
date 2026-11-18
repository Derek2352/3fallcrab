// Bilingual option-length balance and prototype-key safety checks for src/content.js.
import test from "node:test";
import assert from "node:assert/strict";
import "../src/content.js";

const C = globalThis.TFF_CONTENT;

const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
const nonWs = (s) => s.replace(/\s+/g, "").length;

test("cards: every card's wise vs risky options meet per-card length balance thresholds", () => {
  assert.equal(C.CARDS.length, 148);
  const bad = [];
  for (const c of C.CARDS) {
    const ecW = nonWs(c.w[0]), ecR = nonWs(c.r[0]);
    const ewW = words(c.w[0]), ewR = words(c.r[0]);
    const zcW = nonWs(c.w[1]), zcR = nonWs(c.r[1]);

    const minEC = Math.min(ecW, ecR), maxEC = Math.max(ecW, ecR);
    const minEW = Math.min(ewW, ewR), maxEW = Math.max(ewW, ewR);
    const minZC = Math.min(zcW, zcR), maxZC = Math.max(zcW, zcR);

    if (!(maxEC / minEC <= 1.50 || (maxEC - minEC) <= 10)) {
      bad.push(`${c.id} EN chars ${ecW}/${ecR} (${(maxEC / minEC).toFixed(2)}x)`);
    }
    if (!(maxEW / minEW <= 1.60 || (minEW <= 4 && (maxEW - minEW) <= 2))) {
      bad.push(`${c.id} EN words ${ewW}/${ewR} (${(maxEW / minEW).toFixed(2)}x)`);
    }
    if (!(maxZC / minZC <= 1.50 || (maxZC - minZC) <= 5)) {
      bad.push(`${c.id} ZH chars ${zcW}/${zcR} (${(maxZC / minZC).toFixed(2)}x)`);
    }
  }
  assert.deepEqual(bad, [], "Unbalanced card options:\n" + bad.join("\n"));
});

test("cards: aggregate directional split (<58%) and mean ratio [0.90, 1.10] across 148 cards", () => {
  const n = C.CARDS.length;
  for (const [label, fn, idx] of [
    ["EN words", words, 0],
    ["EN chars", nonWs, 0],
    ["ZH chars", nonWs, 1],
  ]) {
    let wLonger = 0, rLonger = 0, ratioSum = 0;
    for (const c of C.CARDS) {
      const w = fn(c.w[idx]);
      const r = fn(c.r[idx]);
      if (w > r) wLonger++;
      else if (r > w) rLonger++;
      ratioSum += w / r;
    }
    const wPct = wLonger / n;
    const rPct = rLonger / n;
    const meanRatio = ratioSum / n;
    assert.ok(wPct < 0.58, `${label}: wise longer in ${(wPct * 100).toFixed(1)}% of cards (>= 58%)`);
    assert.ok(rPct < 0.58, `${label}: risky longer in ${(rPct * 100).toFixed(1)}% of cards (>= 58%)`);
    assert.ok(meanRatio >= 0.90 && meanRatio <= 1.10, `${label}: mean wise/risky ratio ${meanRatio.toFixed(3)} outside [0.90, 1.10]`);
  }
});

test("quiz: option lengths balanced and correct answer neither uniquely longest nor shortest", () => {
  assert.equal(C.QUIZ.length, 3);
  for (const q of C.QUIZ) {
    const ec = q.o.map((o) => nonWs(o[0]));
    const ew = q.o.map((o) => words(o[0]));
    const zc = q.o.map((o) => nonWs(o[1]));

    const minEC = Math.min(...ec), maxEC = Math.max(...ec);
    const minZC = Math.min(...zc), maxZC = Math.max(...zc);
    assert.ok(
      maxEC / minEC <= 1.65 || (maxEC - minEC) <= 12,
      `${q.id} EN chars spread too wide: ${ec.join("/")} (${(maxEC / minEC).toFixed(2)}x)`
    );
    assert.ok(
      maxZC / minZC <= 1.65 || (maxZC - minZC) <= 6,
      `${q.id} ZH chars spread too wide: ${zc.join("/")} (${(maxZC / minZC).toFixed(2)}x)`
    );

    for (const [metric, arr] of [["EN words", ew], ["EN chars", ec], ["ZH chars", zc]]) {
      const mx = Math.max(...arr), mn = Math.min(...arr);
      const maxCount = arr.filter((v) => v === mx).length;
      const minCount = arr.filter((v) => v === mn).length;
      const uniquelyLongest = maxCount === 1 && arr[q.a] === mx;
      const uniquelyShortest = minCount === 1 && arr[q.a] === mn;
      assert.ok(!uniquelyLongest, `${q.id} (${metric}): correct option a=${q.a} is uniquely longest (${arr.join("/")})`);
      assert.ok(!uniquelyShortest, `${q.id} (${metric}): correct option a=${q.a} is uniquely shortest (${arr.join("/")})`);
    }
  }
});

test("habits: all 4 pledge options within 1.35x length spread across EN and ZH", () => {
  assert.equal(C.HABITS.length, 4);
  for (const [label, vals] of [
    ["EN words", C.HABITS.map((h) => words(h.en))],
    ["EN chars", C.HABITS.map((h) => nonWs(h.en))],
    ["ZH chars", C.HABITS.map((h) => nonWs(h.zh))],
  ]) {
    const ratio = Math.max(...vals) / Math.min(...vals);
    assert.ok(ratio <= 1.35, `HABITS ${label} ratio ${ratio.toFixed(2)}x > 1.35 (${vals.join("/")})`);
  }
});

test("QUIZ_WAS, HABIT_WAS, answerNow, habitNow reject Object.prototype keys and bad inputs", () => {
  for (const k of ["toString", "__proto__", "constructor", "valueOf", "hasOwnProperty"]) {
    assert.equal(C.QUIZ_WAS[k], undefined, `QUIZ_WAS leaked ${k}`);
    assert.equal(C.HABIT_WAS[k], undefined, `HABIT_WAS leaked ${k}`);
    assert.equal(C.answerNow({ q: k, pick: 0 }), null, `answerNow leaked ${k}`);
    assert.equal(C.habitNow(k), null, `habitNow leaked ${k}`);
  }
  assert.equal(C.answerNow(null), null);
  assert.equal(C.answerNow({ q: 123, pick: 0 }), null);
  assert.equal(C.habitNow(null), null);
  assert.equal(C.habitNow(123), null);

  assert.deepEqual(C.answerNow({ q: "fakeapp", pick: 1 }), { q: "fakeapp", pick: 1, ok: 1, earlier: false });
  assert.deepEqual(C.answerNow({ q: "mule", pick: 1 }), { q: "fakeapp", pick: 1, ok: 1, earlier: true });
  assert.equal(C.habitNow("buffer"), "buffer");
  assert.equal(C.habitNow("save20"), "buffer");
});
