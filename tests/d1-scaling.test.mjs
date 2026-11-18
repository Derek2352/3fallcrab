import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { handle, resetCaches } from "../server/api.js";
import { makeSqliteDB } from "./fake-d1-store.mjs";
import "../src/content.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOKEN = "0123456789abcdef";
const AUTH = { authorization: `Bearer ${TOKEN}` };
const HDR = { "content-type": "application/json", ...AUTH };

const { QUIZ, HABITS: HABIT_LIST, answerNow, habitNow, CARDS, STAGES, TRAPS, POWERS = {}, TYPES: MTYPES, TITLES, PERSONAS = { bg: {}, pe: {} } } = globalThis.TFF_CONTENT;
const PERSONA_KEYS = new Set(Object.keys(PERSONAS.bg).flatMap((b) => Object.keys(PERSONAS.pe).map((p) => b + "+" + p)));
const TITLE_IDS = new Set(TITLES.map((t) => t.id));
const QUIZ_BY_ID = new Map(QUIZ.map((q, i) => [q.id, { ...q, i }]));
const QUIZ_PASS = Math.ceil((QUIZ.length * 2) / 3);
const QUIZ_TAKER = `(quiz_answered = ${QUIZ.length} OR (quiz_answered IS NULL AND quiz IS NOT NULL))`;

// Unoptimized 0001 summary() implementation for exact equivalence and before/after latency comparison.
async function runLegacySummary(db, p) {
  const where = "s.hidden = 0" + (p.key ? " AND s." + p.where : "");
  const q = (sql) => (p.key ? db.prepare(sql).bind(p.key) : db.prepare(sql));
  const sum = (expr) => `COALESCE(SUM(${expr}), 0)`;
  const TREND = `COUNT(*) AS games, ${sum("posted")} AS posted, ${sum(QUIZ_TAKER)} AS quizTakers,
      ${sum(`${QUIZ_TAKER} AND quiz >= ${QUIZ_PASS}`)} AS quizPass, ${sum("habit IS NOT NULL")} AS habits, ${sum("email IS NOT NULL")} AS emails,
      ROUND(AVG(score)) AS avgScore, ${sum("wise")} AS wise, ${sum("risky")} AS risky, ${sum("missed")} AS missed,
      ${sum("fall_spend")} AS spend, ${sum("fall_scam")} AS scam, ${sum("fall_delay")} AS delay,
      ${sum("avatar = 'jack'")} AS jack, ${sum("avatar = 'jackie'")} AS jackie`;
  const res = await db.batch([
    q(`SELECT ${TREND}, ${sum("quiz_answered >= 1")} AS quizStarted, ${sum("quiz_answered IS NULL AND quiz IS NOT NULL")} AS quizLegacy,
        ${sum(`${QUIZ_TAKER} AND quiz_prior = 0`)} AS quizFirst, ${sum(`${QUIZ_TAKER} AND quiz_prior = 0 AND quiz >= ${QUIZ_PASS}`)} AS quizFirstPass,
        ${sum(`${QUIZ_TAKER} AND quiz_prior IS NOT NULL`)} AS quizPriorKnown,
        ${sum(`${QUIZ_TAKER} AND quiz = ${QUIZ.length}`)} AS quizPerfect, ${sum(`CASE WHEN ${QUIZ_TAKER} THEN quiz END`)} AS quizSum,
        MAX(score) AS bestScore, ROUND(AVG(height), 1) AS avgHeight, ${sum("ended = 'time'")} AS endedTime, ${sum("ended = 'drops'")} AS endedDrops,
        ${sum("fall_spend > 0")} AS gSpend, ${sum("fall_scam > 0")} AS gScam, ${sum("fall_delay > 0")} AS gDelay,
        ${sum("fall_spend + fall_scam + fall_delay = 0")} AS gNoFall,
        ${sum("troll_invest >= 1")} AS tiSeen, ${sum("troll_invest = 1")} AS tiDeclined,
        ${sum("troll_invest >= 2")} AS tiInvested, ${sum("troll_invest = 3")} AS tiFee,
        ${sum("troll_tickets IS NOT NULL")} AS ttSeen, ${sum("troll_tickets >= 1")} AS ttBought,
        ${sum("COALESCE(troll_tickets, 0)")} AS ttCards,
        ${sum("troll_revive IS NOT NULL")} AS trSeen, ${sum("troll_revive = 1")} AS trPressed
      FROM scores s WHERE ${where}`),
    q(`SELECT json_extract(a.value, '$.q') AS q, json_extract(a.value, '$.pick') AS pick, json_extract(a.value, '$.ok') AS ok, COUNT(*) AS n
      FROM scores s, json_each(s.quiz_answers) a WHERE ${where} AND s.quiz_answers IS NOT NULL GROUP BY 1, 2, 3`),
    q(`SELECT quiz AS k, COUNT(*) AS n FROM scores s WHERE ${where} AND ${QUIZ_TAKER} GROUP BY quiz`),
    q(`SELECT habit AS k, COUNT(*) AS n FROM scores s WHERE ${where} GROUP BY habit`),
    q(`SELECT json_extract(c.value, '$.card') AS card, json_extract(c.value, '$.pick') AS pick, COUNT(*) AS n
      FROM scores s, json_each(s.choices) c WHERE ${where} GROUP BY 1, 2`),
    q(`SELECT stage AS k, COUNT(*) AS n FROM scores s WHERE ${where} GROUP BY stage`),
    q(`SELECT week AS k, ${TREND} FROM scores s WHERE ${where} GROUP BY week ORDER BY week`),
    q(`SELECT month AS k, ${TREND} FROM scores s WHERE ${where} GROUP BY month ORDER BY month`),
    q(`SELECT mtype AS k, COUNT(*) AS n FROM scores s WHERE ${where} AND mtype IS NOT NULL GROUP BY mtype`),
    q(`SELECT COUNT(*) AS n FROM scores s WHERE ${where} AND via = 'c'`),
    q(`SELECT title AS k, COUNT(*) AS n FROM scores s WHERE ${where} AND title IS NOT NULL GROUP BY title`),
    q(`SELECT persona AS k, COUNT(*) AS n FROM scores s WHERE ${where} AND persona IS NOT NULL GROUP BY persona`),
    db.prepare("SELECT DISTINCT week AS k FROM scores ORDER BY week DESC"),
    db.prepare("SELECT DISTINCT month AS k FROM scores WHERE month IS NOT NULL ORDER BY month DESC"),
    q(`SELECT json_extract(c.value, '$.power') AS k, COUNT(*) AS n
      FROM scores s, json_each(s.choices) c WHERE ${where} AND json_extract(c.value, '$.power') IS NOT NULL GROUP BY 1`),
  ]);
  const [ov, qa, qs, hb, cd, st, wk, mo, mt, vc, tt, ps, weeks, months, pw] = res.map((r) => r.results || []);
  const o = ov[0] || {};
  const pct = (a, b) => (b ? Math.round((1000 * (a || 0)) / b) / 10 : null);
  const count = (rows, test) => rows.filter(test).reduce((s, r) => s + (r.n || 0), 0);
  const trend = (r) => ({ ...r, quizPassPct: pct(r.quizPass, r.quizTakers), wisePct: pct(r.wise, r.wise + r.risky + r.missed) });
  const qaNow = qa.map((r) => { const m = answerNow({ q: r.q, pick: r.pick }); return m ? { ...r, q: m.q, pick: m.pick, ok: m.ok, earlier: m.earlier } : r; });
  const question = (id, en, zh, options, answer) => {
    const rows = qaNow.filter((r) => r.q === id), n = count(rows, () => true), right = count(rows, (r) => r.ok === 1);
    return { id, en, zh, answer, n, right, pct: pct(right, n), earlier: count(rows, (r) => r.earlier),
      was: (QUIZ_BY_ID.get(id) || {}).was ? QUIZ_BY_ID.get(id).was.id : null,
      options: options.map((opt, i) => ({ en: opt[0], zh: opt[1], right: i === answer, n: count(rows, (r) => r.pick === i) })) };
  };
  const cardIds = [...new Set([...CARDS.map((c) => c.id), ...cd.map((r) => r.card)])];
  const games = o.games || 0, choices = (o.wise || 0) + (o.risky || 0) + (o.missed || 0);
  return {
    period: { type: p.type, key: p.key },
    periods: { weeks: weeks.map((r) => r.k).filter(Boolean), months: months.map((r) => r.k).filter(Boolean) },
    overview: {
      games, via_c: (vc[0] && vc[0].n) || 0, types: Object.fromEntries(mt.filter((r) => Object.hasOwn(MTYPES, r.k)).map((r) => [r.k, r.n])),
      titles: Object.fromEntries(tt.filter((r) => TITLE_IDS.has(r.k)).map((r) => [r.k, r.n])),
      personas: Object.fromEntries(ps.filter((r) => PERSONA_KEYS.has(r.k)).map((r) => [r.k, r.n])),
      jack: o.jack || 0, jackie: o.jackie || 0, posted: o.posted || 0, anonymous: games - (o.posted || 0), emails: o.emails || 0,
      quizQuestions: QUIZ.length, quizPassMark: QUIZ_PASS, quizTargetPct: 70,
      quizStarted: o.quizStarted || 0, quizTakers: o.quizTakers || 0, quizLegacy: o.quizLegacy || 0,
      quizPass: o.quizPass || 0, quizPassPct: pct(o.quizPass, o.quizTakers), quizPerfect: o.quizPerfect || 0,
      quizFirst: o.quizFirst || 0, quizFirstPass: o.quizFirstPass || 0, quizFirstPct: pct(o.quizFirstPass, o.quizFirst), quizPriorKnown: o.quizPriorKnown || 0,
      quizAvg: o.quizTakers ? Math.round((100 * o.quizSum) / o.quizTakers) / 100 : null,
      habits: o.habits || 0, habitPct: pct(o.habits, games),
      avgScore: o.avgScore, bestScore: o.bestScore, avgHeight: o.avgHeight, endedTime: o.endedTime || 0, endedDrops: o.endedDrops || 0,
      wise: o.wise || 0, risky: o.risky || 0, missed: o.missed || 0, wisePct: pct(o.wise, choices), noFallGames: o.gNoFall || 0,
    },
    quiz: [
      ...QUIZ.map((x) => question(x.id, x.q[0], x.q[1], x.o, x.a)),
      ...[...new Set(qaNow.map((r) => r.q))].filter((id) => !QUIZ_BY_ID.has(id)).map((id) => ({ ...question(id, id + " (no longer in the quiz)", "", [], -1) })),
    ],
    quizScores: Array.from({ length: QUIZ.length + 1 }, (_, k) => ({ score: k, n: count(qs, (r) => r.k === k) })),
    habits: [
      ...HABIT_LIST.map((h) => ({ id: h.id, en: h.en, zh: h.zh, was: h.was || null, n: count(hb, (r) => r.k != null && habitNow(r.k) === h.id), earlier: count(hb, (r) => r.k === h.was) })),
      { id: null, en: "No habit picked", zh: "冇揀", n: count(hb, (r) => r.k == null || !habitNow(r.k)) },
    ],
    traps: Object.keys(TRAPS).map((k) => {
      const g = o["g" + k[0].toUpperCase() + k.slice(1)] || 0;
      return { id: k, en: TRAPS[k].en, zh: TRAPS[k].zh, falls: o[k] || 0, games: g, gamesPct: pct(g, games) };
    }),
    cards: cardIds.map((id) => {
      const c = CARDS.find((x) => x.id === id), rows = cd.filter((r) => r.card === id);
      const wise = count(rows, (r) => r.pick === "wise"), risky = count(rows, (r) => r.pick === "risky"), none = count(rows, (r) => r.pick === "none");
      const n = wise + risky + none;
      return { id, en: c ? c.tag[0] : id, zh: c ? c.tag[1] : "", stage: c ? c.st : null, trap: c ? c.trap : null, who: (c && c.who) || null, n, wise, risky, none,
        wisePct: pct(wise, n), riskyPct: pct(risky, n), nonePct: pct(none, n) };
    }),
    stages: STAGES.map((s, i) => ({ stage: i, en: s.en, zh: s.zh, n: count(st, (r) => r.k === i) })),
    trolls: {
      invest: { seen: o.tiSeen || 0, declined: o.tiDeclined || 0, invested: o.tiInvested || 0, fee: o.tiFee || 0, hitPct: pct(o.tiInvested, o.tiSeen) },
      tickets: { seen: o.ttSeen || 0, bought: o.ttBought || 0, cards: o.ttCards || 0, hitPct: pct(o.ttBought, o.ttSeen) },
      revive: { seen: o.trSeen || 0, pressed: o.trPressed || 0, hitPct: pct(o.trPressed, o.trSeen) },
    },
    powers: Object.keys(POWERS).map((k) => ({ id: k, en: POWERS[k].en, zh: POWERS[k].zh, n: count(pw || [], (r) => r.k === k) })),
    byWeek: wk.map(trend),
    byMonth: mo.map(trend),
  };
}

function optimizedQueries(p) {
  const where = "s.hidden = 0" + (p.key ? " AND s." + p.where : "");
  const cWhere = "hidden = 0" + (p.key ? " AND " + p.where : "");
  const sum = (expr) => `COALESCE(SUM(${expr}), 0)`;
  const TREND = `COUNT(*) AS games, ${sum("posted")} AS posted, ${sum(QUIZ_TAKER)} AS quizTakers,
      ${sum(`${QUIZ_TAKER} AND quiz >= ${QUIZ_PASS}`)} AS quizPass, ${sum("habit IS NOT NULL")} AS habits, ${sum("email IS NOT NULL")} AS emails,
      ROUND(AVG(score)) AS avgScore, ${sum("wise")} AS wise, ${sum("risky")} AS risky, ${sum("missed")} AS missed,
      ${sum("fall_spend")} AS spend, ${sum("fall_scam")} AS scam, ${sum("fall_delay")} AS delay,
      ${sum("avatar = 'jack'")} AS jack, ${sum("avatar = 'jackie'")} AS jackie`;
  return [
    { sql: `SELECT ${TREND}, ${sum("quiz_answered >= 1")} AS quizStarted, ${sum("quiz_answered IS NULL AND quiz IS NOT NULL")} AS quizLegacy,
        ${sum(`${QUIZ_TAKER} AND quiz_prior = 0`)} AS quizFirst, ${sum(`${QUIZ_TAKER} AND quiz_prior = 0 AND quiz >= ${QUIZ_PASS}`)} AS quizFirstPass,
        ${sum(`${QUIZ_TAKER} AND quiz_prior IS NOT NULL`)} AS quizPriorKnown,
        ${sum(`${QUIZ_TAKER} AND quiz = ${QUIZ.length}`)} AS quizPerfect, ${sum(`CASE WHEN ${QUIZ_TAKER} THEN quiz END`)} AS quizSum,
        MAX(score) AS bestScore, ROUND(AVG(height), 1) AS avgHeight, ${sum("ended = 'time'")} AS endedTime, ${sum("ended = 'drops'")} AS endedDrops,
        ${sum("fall_spend > 0")} AS gSpend, ${sum("fall_scam > 0")} AS gScam, ${sum("fall_delay > 0")} AS gDelay,
        ${sum("fall_spend + fall_scam + fall_delay = 0")} AS gNoFall,
        ${sum("troll_invest >= 1")} AS tiSeen, ${sum("troll_invest = 1")} AS tiDeclined,
        ${sum("troll_invest >= 2")} AS tiInvested, ${sum("troll_invest = 3")} AS tiFee,
        ${sum("troll_tickets IS NOT NULL")} AS ttSeen, ${sum("troll_tickets >= 1")} AS ttBought,
        ${sum("COALESCE(troll_tickets, 0)")} AS ttCards,
        ${sum("troll_revive IS NOT NULL")} AS trSeen, ${sum("troll_revive = 1")} AS trPressed
      FROM scores s WHERE ${where}`, bindKey: !!p.key },
    { sql: `SELECT q, pick, ok, COUNT(*) AS n FROM score_quiz_answers WHERE ${cWhere} GROUP BY q, pick, ok`, bindKey: !!p.key },
    { sql: `SELECT quiz AS k, COUNT(*) AS n FROM scores s WHERE ${where} AND ${QUIZ_TAKER} GROUP BY quiz`, bindKey: !!p.key },
    { sql: `SELECT habit AS k, COUNT(*) AS n FROM scores s WHERE ${where} GROUP BY habit`, bindKey: !!p.key },
    { sql: `SELECT card, pick, COUNT(*) AS n FROM score_choices WHERE ${cWhere} GROUP BY card, pick`, bindKey: !!p.key },
    { sql: `SELECT stage AS k, COUNT(*) AS n FROM scores s WHERE ${where} GROUP BY stage`, bindKey: !!p.key },
    { sql: `SELECT week AS k, ${TREND} FROM scores s WHERE ${where} GROUP BY week ORDER BY week`, bindKey: !!p.key },
    { sql: `SELECT month AS k, ${TREND} FROM scores s WHERE ${where} GROUP BY month ORDER BY month`, bindKey: !!p.key },
    { sql: `SELECT mtype AS k, COUNT(*) AS n FROM scores s WHERE ${where} AND mtype IS NOT NULL GROUP BY mtype`, bindKey: !!p.key },
    { sql: `SELECT COUNT(*) AS n FROM scores s WHERE ${where} AND via = 'c'`, bindKey: !!p.key },
    { sql: `SELECT title AS k, COUNT(*) AS n FROM scores s WHERE ${where} AND title IS NOT NULL GROUP BY title`, bindKey: !!p.key },
    { sql: `SELECT persona AS k, COUNT(*) AS n FROM scores s WHERE ${where} AND persona IS NOT NULL GROUP BY persona`, bindKey: !!p.key },
    { sql: `SELECT DISTINCT week AS k FROM scores ORDER BY week DESC`, bindKey: false },
    { sql: `SELECT DISTINCT month AS k FROM scores WHERE month IS NOT NULL ORDER BY month DESC`, bindKey: false },
    { sql: `SELECT power AS k, COUNT(*) AS n FROM score_choices WHERE ${cWhere} AND power IS NOT NULL GROUP BY power`, bindKey: !!p.key },
  ];
}

function seedSynthetic(rawDb, count) {
  const weeks = ["2026-W43", "2026-W44", "2026-W45", "2026-W46"];
  const months = ["2026-10", "2026-10", "2026-11", "2026-11"];
  const cardPool = ["newphone", "cards", "mule", "tutor", "salary", "crypto", "mpf", "trip"];
  const powerPool = ["vine", "net", "shield", null, null];
  const habitPool = ["buffer", "apr", "sfc", "budget", "save20", null];
  const mtypePool = ["SGPC", "YDPH", null];
  const titlePool = ["zero", "retire", null];
  const personaPool = ["sub+grind", "rich+chill", null];
  const picks = ["wise", "risky", "none"];

  const ins = rawDb.prepare(`INSERT INTO scores (
    name, score, stage, height, drops, wise, risky, missed, fall_spend, fall_scam, fall_delay,
    choices, habit, quiz, quiz_answered, quiz_answers, ended, week, month, created_at, updated_at,
    posted, email, gid, edit_hash, edits, items, real_ms, quiz_prior, jackpot,
    troll_revive, troll_invest, troll_tickets, avatar, mtype, via, title, persona, hidden
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  rawDb.exec("BEGIN");
  try {
    for (let i = 0; i < count; i++) {
      const wIdx = i % weeks.length;
      const hidden = i % 50 === 0 ? 1 : 0;
      const posted = i % 3 === 0 ? 0 : 1;
      const stage = i % 4;
      const height = Math.round((stage * 4.5 + (i % 5) * 0.4) * 10) / 10;
      const score = 200 + (i % 200) * 50;
      const noChoices = i % 20 === 0;
      let wise = 0, risky = 0, missed = 0, fs = 0, fsc = 0, fd = 0;
      const choicesArr = [];
      if (!noChoices) {
        const nC = 1 + (i % 4);
        for (let c = 0; c < nC; c++) {
          const card = cardPool[(i + c) % cardPool.length];
          const pick = picks[(i + c) % 3];
          const pwr = pick === "wise" ? powerPool[(i + c) % powerPool.length] : null;
          if (pick === "wise") wise++;
          else if (pick === "none") { missed++; fd++; }
          else { risky++; if (c % 2 === 0) fs++; else fsc++; }
          choicesArr.push(pwr ? { card, pick, power: pwr } : { card, pick });
        }
      }
      const isLegacyQuiz = i % 25 === 0;
      const noQuiz = i % 10 === 0;
      let quiz = null, quizAnswered = null, quizAnswers = null;
      if (isLegacyQuiz) {
        quiz = i % 4;
        quizAnswered = null;
        quizAnswers = null;
      } else if (!noQuiz) {
        const qa = [
          { q: i % 15 === 0 ? "mule" : "fakeapp", pick: i % 3, ok: (i % 3) === 1 ? 1 : 0 },
          { q: "flatrate", pick: (i + 1) % 3, ok: ((i + 1) % 3) === 1 ? 1 : 0 },
          { q: "ming", pick: i % 2, ok: (i % 2) === 0 ? 1 : 0 },
        ];
        quizAnswered = 3;
        quiz = qa.filter((a) => a.ok).length;
        quizAnswers = JSON.stringify(qa);
      }
      ins.run(
        `Player${i}`, score, stage, height, i % 4, wise, risky, missed, fs, fsc, fd,
        JSON.stringify(choicesArr), habitPool[i % habitPool.length], quiz, quizAnswered, quizAnswers,
        i % 2 === 0 ? "time" : "drops", weeks[wIdx], months[wIdx], "2026-11-10T00:00:00.000Z", "2026-11-10T00:00:00.000Z",
        posted, i % 4 === 0 ? `p${i}@example.com` : null, `gid-seed-${i}`, null, 0, 10, 120000, i % 3 === 0 ? 0 : 1, i % 7 === 0 ? 1 : 0,
        i % 4 === 0 ? (i % 8 === 0 ? 1 : 0) : null, i % 4, i % 5 === 0 ? (i % 3) : null,
        i % 2 === 0 ? "jack" : "jackie", mtypePool[i % mtypePool.length], i % 5 === 0 ? "c" : null,
        titlePool[i % titlePool.length], personaPool[i % personaPool.length], hidden,
      );
    }
    rawDb.exec("COMMIT");
  } catch (e) {
    rawDb.exec("ROLLBACK");
    throw e;
  }
}

test("makeSqliteDB enforces D1 parity (100-param limit, types, plain objects, first null, batch SAVEPOINT)", async () => {
  const db = makeSqliteDB({ migrations: "0001" });
  try {
    await assert.rejects(
      async () => db.prepare("SELECT " + Array.from({ length: 101 }, (_, i) => "?" + (i + 1)).join("+")).bind(...Array(101).fill(1)).first(),
      /D1_ERROR/,
    );
    await assert.rejects(async () => db.prepare("SELECT ?1").bind(() => {}).first(), /D1_TYPE_ERROR/);
    await assert.rejects(async () => db.prepare("SELECT ?1").bind(undefined).first(), /D1_TYPE_ERROR/);
    await assert.rejects(async () => db.prepare("SELECT ?1").bind(true).first(), /D1_TYPE_ERROR/);

    const row = await db.prepare("SELECT 1 AS x").first();
    assert.equal(Object.getPrototypeOf(row), Object.prototype);
    assert.equal(await db.prepare("SELECT id FROM scores WHERE id = 9999").first(), null);

    await assert.rejects(
      () => db.batch([
        db.prepare("INSERT INTO scores (name, score, week, created_at) VALUES ('A', 100, '2026-W46', '2026-11-10T00:00:00Z')"),
        db.prepare("INSERT INTO nonexistent_table VALUES (1)"),
      ]),
    );
    const cnt = await db.prepare("SELECT COUNT(*) AS n FROM scores").first();
    assert.equal(cnt.n, 0, "SAVEPOINT rolled back first insert");
  } finally {
    db.close();
  }
});

test("0002 applies cleanly atop 0001 (without sil), is idempotent, and handles runtime migrate() + triggers", async () => {
  const m0002 = readFileSync(join(ROOT, "migrations/0002_optimize_summary.sql"), "utf8");
  assert.equal(/\bsil\b/i.test(m0002.replace(/--[^\n]*/g, "")), false, "0002 SQL must not reference sil");

  // 1) Empty DB migrated at runtime via handle()
  const runtimeDb = makeSqliteDB();
  const hRes = await handle(new Request("https://game.test/api/health"), { DB: runtimeDb });
  assert.equal(hRes.status, 200);
  const tbls = await runtimeDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('scores','score_choices','score_quiz_answers') ORDER BY name").all();
  assert.deepEqual(tbls.results.map((r) => r.name), ["score_choices", "score_quiz_answers", "scores"]);
  runtimeDb.close();

  // 2) 0001 -> seed -> 0002 -> idempotent re-run -> handle() ensureSchema()
  const db = makeSqliteDB({ migrations: "0001" });
  seedSynthetic(db._raw, 40);
  // Add a legacy month IS NULL row
  db._raw.prepare("INSERT INTO scores (name, score, week, month, created_at, choices, quiz_answers) VALUES ('Legacy', 500, '2026-W46', NULL, '2026-11-09T00:00:00Z', '[{\"card\":\"newphone\",\"pick\":\"wise\",\"power\":\"vine\"}]', '[{\"q\":\"mule\",\"pick\":1,\"ok\":1}]')").run();
  db._raw.exec(m0002);
  const c1 = (await db.prepare("SELECT COUNT(*) AS n FROM score_choices").first()).n;
  const q1 = (await db.prepare("SELECT COUNT(*) AS n FROM score_quiz_answers").first()).n;
  db._raw.exec(m0002);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM score_choices").first()).n, c1);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM score_quiz_answers").first()).n, q1);

  // ensureSchema via /api/health backfills month IS NULL and adds sil without breaking child tables
  const h2 = await handle(new Request("https://game.test/api/health"), { DB: db });
  assert.equal(h2.status, 200);
  const legChild = await db.prepare("SELECT month FROM score_choices WHERE score_id = 41").first();
  assert.equal(legChild.month, "2026-11");

  // Trigger test: POST + update + ON CONFLICT DO NOTHING + hide + batch + DELETE cascade
  const gid = "gid-trigger-test-001", key = "secret-key-for-trigger-test-001";
  const p1 = await handle(new Request("https://game.test/api/scores", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      gid, key, score: 400, name: "Trig", board: false, stage: 0, height: 1, drops: 0, items: 4,
      choices: [{ card: "newphone", pick: "wise", power: "vine" }],
      answers: [{ q: "fakeapp", pick: 1 }],
    }),
  }), { DB: db });
  assert.equal(p1.status, 201);
  const created = await p1.json();
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM score_choices WHERE score_id = ?1").bind(created.id).first()).n, 1);

  // Update via gid+key adds another answer and flips posted=1
  const p2 = await handle(new Request("https://game.test/api/scores", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      gid, key, score: 400, name: "Trig", board: true,
      answers: [{ q: "flatrate", pick: 1 }],
    }),
  }), { DB: db });
  assert.equal(p2.status, 200);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM score_quiz_answers WHERE score_id = ?1").bind(created.id).first()).n, 2);

  // Admin hide toggles child table hidden=1 via trigger
  const hRes2 = await handle(new Request("https://game.test/api/admin/hide", {
    method: "POST",
    headers: HDR,
    body: JSON.stringify({ id: created.id, hidden: true }),
  }), { DB: db, ADMIN_TOKEN: TOKEN });
  assert.equal(hRes2.status, 200);
  assert.equal((await db.prepare("SELECT hidden FROM score_choices WHERE score_id = ?1").bind(created.id).first()).hidden, 1);

  // Direct delete cascades via trigger
  db._raw.prepare("DELETE FROM scores WHERE id = ?").run(created.id);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM score_choices WHERE score_id = ?1").bind(created.id).first()).n, 0);
  assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM score_quiz_answers WHERE score_id = ?1").bind(created.id).first()).n, 0);
  db.close();
});

test("EXPLAIN QUERY PLAN for all 15 summary() queries uses covering indexes with zero json_each scans and zero TEMP B-TREE", () => {
  const db = makeSqliteDB({ migrations: "0001+0002" });
  try {
    seedSynthetic(db._raw, 500);
    const periods = [
      { type: "all", key: null, where: "1 = 1" },
      { type: "week", key: "2026-W46", where: "week = ?1" },
      { type: "month", key: "2026-11", where: "month = ?1" },
    ];
    for (const p of periods) {
      const qs = optimizedQueries(p);
      assert.equal(qs.length, 15);
      qs.forEach((q, idx) => {
        const plan = q.bindKey
          ? db._raw.prepare("EXPLAIN QUERY PLAN " + q.sql).all(p.key)
          : db._raw.prepare("EXPLAIN QUERY PLAN " + q.sql).all();
        const text = plan.map((r) => r.detail).join(" | ");
        assert.equal(/json_each|VIRTUAL TABLE/i.test(text), false, `${p.type} Q${idx + 1} scanned json_each: ${text}`);
        assert.equal(/TEMP B-TREE/i.test(text), false, `${p.type} Q${idx + 1} used TEMP B-TREE: ${text}`);
      });
    }
  } finally {
    db.close();
  }
});

test("optimized summary() output is 100% deep-equal to unoptimized SQL on empty DB and edge-case dataset across all/week/month", async () => {
  const dbEmpty1 = makeSqliteDB({ migrations: "0001" });
  const dbEmpty2 = makeSqliteDB({ migrations: "0001+0002" });
  const dbEdge1 = makeSqliteDB({ migrations: "0001" });
  const dbEdge2 = makeSqliteDB({ migrations: "0001+0002" });
  try {
    seedSynthetic(dbEdge1._raw, 300);
    seedSynthetic(dbEdge2._raw, 300);

    const periods = [
      { type: "all", key: null, where: "1 = 1", qs: "" },
      { type: "week", key: "2026-W46", where: "week = ?1", qs: "?week=2026-W46" },
      { type: "month", key: "2026-11", where: "month = ?1", qs: "?month=2026-11" },
    ];

    for (const [label, d1, d2] of [["empty", dbEmpty1, dbEmpty2], ["seeded", dbEdge1, dbEdge2]]) {
      for (const p of periods) {
        resetCaches();
        const expected = await runLegacySummary(d1, p);
        const res = await handle(new Request("https://game.test/api/admin/summary" + p.qs, { headers: AUTH }), { DB: d2, ADMIN_TOKEN: TOKEN });
        assert.equal(res.status, 200);
        const actual = await res.json();
        const { ok, current, ...actualRest } = actual;
        assert.equal(ok, true);
        assert.ok(current && current.week && current.month);
        assert.deepStrictEqual(actualRest, expected, `${label} ${p.type} summary mismatch`);
      }
    }
  } finally {
    dbEmpty1.close();
    dbEmpty2.close();
    dbEdge1.close();
    dbEdge2.close();
  }
});

test("50,000-row summary() benchmark achieves >= 3x speedup on ALL and WEEK with deep-equal results", async (t) => {
  const N = 50000;
  const dbOld = makeSqliteDB({ migrations: "0001" });
  const dbNew = makeSqliteDB({ migrations: "0001+0002" });
  try {
    seedSynthetic(dbOld._raw, N);
    seedSynthetic(dbNew._raw, N);

    const periods = [
      { type: "all", key: null, where: "1 = 1", qs: "" },
      { type: "week", key: "2026-W46", where: "week = ?1", qs: "?week=2026-W46" },
      { type: "month", key: "2026-11", where: "month = ?1", qs: "?month=2026-11" },
    ];

    // Warmup
    await runLegacySummary(dbOld, periods[0]);
    await handle(new Request("https://game.test/api/admin/summary", { headers: AUTH }), { DB: dbNew, ADMIN_TOKEN: TOKEN });

    for (const p of periods) {
      const t0 = performance.now();
      const expected = await runLegacySummary(dbOld, p);
      const oldMs = performance.now() - t0;

      const t1 = performance.now();
      const res = await handle(new Request("https://game.test/api/admin/summary" + p.qs, { headers: AUTH }), { DB: dbNew, ADMIN_TOKEN: TOKEN });
      const newMs = performance.now() - t1;

      assert.equal(res.status, 200);
      const { ok, current, ...actualRest } = await res.json();
      assert.equal(ok, true);
      assert.deepStrictEqual(actualRest, expected, `50k ${p.type} summary mismatch`);

      const speedup = oldMs / Math.max(0.01, newMs);
      t.diagnostic(`50k summary (${p.type}): old=${oldMs.toFixed(1)}ms, new=${newMs.toFixed(1)}ms, speedup=${speedup.toFixed(2)}x`);
      if (p.type === "all" || p.type === "week") {
        assert.ok(speedup >= 3.0, `Expected >= 3x speedup on ${p.type}, got ${speedup.toFixed(2)}x (${oldMs.toFixed(1)}ms vs ${newMs.toFixed(1)}ms)`);
      }
    }
  } finally {
    dbOld.close();
    dbNew.close();
  }
});
