// 3 Fall Fun leaderboard API.
// Runs in the Worker (server/worker.js) or as a Pages Function (functions/api/[[path]].js) and stores games in
// D1 (binding name: DB).
//
//   GET  /api/health               -> is the database connected?
//   GET  /api/scores               -> this week's top 10 + all-time top 10 (nicknames only, never emails)
//   GET  /api/scores?view=stats    -> anonymised decision and quiz data for the Stats tab
//   POST /api/scores               -> save one finished game, then update it (see post() below)
//   GET  /api/admin/scores         -> latest games incl. hidden ones, with emails   (needs ADMIN_TOKEN)
//   GET  /api/admin/summary        -> survey and decision analysis, ?week= / ?month= (needs ADMIN_TOKEN)
//   GET  /api/admin/winners        -> top posted scores of a ?week= or ?month=, with emails (needs ADMIN_TOKEN)
//   GET  /api/admin/rows           -> every game, 500 at a time (?after=<id>), for the analysis CSVs (needs ADMIN_TOKEN)
//   POST /api/admin/hide           -> hide / unhide a game {id, hidden}                 (needs ADMIN_TOKEN)
//   GET  /api/admin/export         -> every game as one CSV                             (needs ADMIN_TOKEN)
//
// Optional environment variables (Pages > Settings > Variables and Secrets):
//   ADMIN_TOKEN         secret, 16+ characters; turns on the /api/admin routes and admin.html
//   LEADERBOARD_CLOSED  "1" stops new games being saved (e.g. after the event); the board stays visible
//   TIMEZONE            IANA zone for the weekly reset and the months, default Asia/Hong_Kong
//   RATE_LIMIT          max new games per minute from one network, default 30
//   IP_SALT             extra salt for the hashed network id used only for rate limiting

import "../src/content.js"; // quiz, habits and cards, shared with the game page (sets globalThis.TFF_CONTENT)

const { QUIZ, HABITS: HABIT_LIST, CARDS, STAGES, TRAPS } = globalThis.TFF_CONTENT;
const NAME_DEFAULT = "Anonymous crab 匿名蟹";
const MAX_SCORE = 500000;
const MAX_BODY = 4096;
const RANK_CAP = 500;
const STATS_SAMPLE = 1000; // Stats tab uses the latest N games, so each request reads at most N rows
const HABITS = HABIT_LIST.map((h) => h.id);
const QUIZ_BY_ID = new Map(QUIZ.map((q, i) => [q.id, { ...q, i }]));
const QUIZ_PASS = Math.ceil((QUIZ.length * 2) / 3); // the programme's target: 70%+ of players score 2/3 or better
// Finished the quiz. Games saved before per-question answers were kept only have the number right (quiz).
const QUIZ_TAKER = `(quiz_answered = ${QUIZ.length} OR (quiz_answered IS NULL AND quiz IS NOT NULL))`;
const EDIT_HOURS = 24; // the game page can add answers / post the score for this long after the game ends
const MAX_EDITS = 60;
const PICKS = ["wise", "risky", "none"];
const ENDS = ["time", "drops"];
// Nicknames that hit these become the anonymous name. Anything else unpleasant: hide it from admin.html.
// Short Latin words only match at the start of a word (or as a whole word) so "Grape", "Jason99" and "Fukuda" stay.
const BLOCK_ANYWHERE = ["fuck", "nigg", "dllm", "nmsl", "屌", "撚", "𨳒", "閪", "柒", "仆街", "冚家", "鳩", "㞗", "𨳊", "賤人", "死全家"];
const BLOCK_PREFIX = ["shit", "cunt", "bitch", "rape", "porn", "nazi", "on9"];
const BLOCK_WORD = ["fuk", "fck", "fk", "fag"];
const ALLOW_WORD = ["nazir", "nazira", "nazim", "shitake"]; // real names/words that start like a blocked word
const LEET = { 0: "o", 1: "i", "!": "i", 3: "e", 4: "a", "@": "a", 5: "s", $: "s", 7: "t" };

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    stage INTEGER NOT NULL DEFAULT 0,
    height REAL NOT NULL DEFAULT 0,
    drops INTEGER NOT NULL DEFAULT 0,
    wise INTEGER NOT NULL DEFAULT 0,
    risky INTEGER NOT NULL DEFAULT 0,
    missed INTEGER NOT NULL DEFAULT 0,
    fall_spend INTEGER NOT NULL DEFAULT 0,
    fall_scam INTEGER NOT NULL DEFAULT 0,
    fall_delay INTEGER NOT NULL DEFAULT 0,
    choices TEXT NOT NULL DEFAULT '[]',
    habit TEXT,
    quiz INTEGER,
    ended TEXT,
    week TEXT NOT NULL,
    created_at TEXT NOT NULL,
    ip_hash TEXT,
    hidden INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE INDEX IF NOT EXISTS idx_scores_week ON scores (week, hidden, score DESC, id)`,
  `CREATE INDEX IF NOT EXISTS idx_scores_all ON scores (hidden, score DESC, id)`,
  `CREATE INDEX IF NOT EXISTS idx_scores_ip ON scores (ip_hash, created_at)`,
];

// Columns added after launch. ADD COLUMN keeps every existing row as it is; games saved before have posted = 1
// (they were all posted to the board) and no email, quiz answers or game id. Never remove or rename a column.
export const ADDED = [
  ["posted", "INTEGER NOT NULL DEFAULT 1"], // 1 = on the board (player pressed Post), 0 = saved anonymously for the analysis
  ["email", "TEXT"], // optional, private: only to contact weekly/monthly winners. No public route ever returns it.
  ["month", "TEXT"], // "2026-10" in the event's time zone
  ["quiz_answers", "TEXT"], // JSON [{"q":"mule","pick":1,"ok":1}, ...], the first answer to each question
  ["quiz_answered", "INTEGER"], // how many quiz questions were answered (quiz = how many were right)
  ["gid", "TEXT"], // random id the game page picks for each game, so retries and updates hit the same row
  ["edit_hash", "TEXT"], // SHA-256 of the game page's secret key for this row
  ["edits", "INTEGER NOT NULL DEFAULT 0"],
  ["updated_at", "TEXT"],
];
const SCHEMA_2 = [
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_scores_gid ON scores (gid)`,
  `CREATE INDEX IF NOT EXISTS idx_scores_month ON scores (month, hidden, score DESC, id)`,
];

let schemaReady = null;
function ensureSchema(env) {
  if (!schemaReady) schemaReady = migrate(env.DB, timeZone(env)).catch((e) => { schemaReady = null; throw e; });
  return schemaReady;
}
async function migrate(db, tz) {
  await db.batch(SCHEMA.map((s) => db.prepare(s)));
  const have = new Set((await db.prepare("PRAGMA table_info(scores)").all()).results.map((c) => c.name));
  for (const [col, type] of ADDED) {
    if (have.has(col)) continue;
    try { await db.prepare(`ALTER TABLE scores ADD COLUMN ${col} ${type}`).run(); }
    catch (e) { if (!/duplicate column/i.test(String(e && e.message))) throw e; } // another request added it first
  }
  await db.batch(SCHEMA_2.map((s) => db.prepare(s)));
  // Games saved before the month column existed get their month once.
  for (let round = 0; round < 100; round++) {
    const { results } = await db.prepare("SELECT id, created_at FROM scores WHERE month IS NULL LIMIT 100").all();
    if (!results.length) break;
    await db.batch(results.map((r) => {
      const d = new Date(r.created_at);
      return db.prepare("UPDATE scores SET month = ?1 WHERE id = ?2").bind(Number.isNaN(d.getTime()) ? "unknown" : monthKey(d, tz), r.id);
    }));
  }
}

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });
const fail = (error, status, headers) => json({ ok: false, error }, status, headers);

const int = (v, lo, hi) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : lo;
};
const truthy = (v) => v === "1" || v === "true" || v === "yes";
const closed = (env) => truthy(String(env.LEADERBOARD_CLOSED || "").toLowerCase());

function timeZone(env) {
  const tz = env.TIMEZONE || "Asia/Hong_Kong";
  try { new Intl.DateTimeFormat("en-CA", { timeZone: tz }); return tz; } catch { return "Asia/Hong_Kong"; }
}

const localDate = (date, tz) => Object.fromEntries(
  new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" })
    .formatToParts(date).map((x) => [x.type, x.value]),
);
// Calendar month ("2026-10") in the event's time zone.
export function monthKey(date, tz) {
  const p = localDate(date, tz);
  return p.year + "-" + p.month;
}
// ISO week ("2026-W41") of the calendar date in the event's time zone, so the board resets at Monday 00:00 local time.
export function isoWeek(date, tz) {
  const p = localDate(date, tz);
  const t = new Date(Date.UTC(+p.year, +p.month - 1, +p.day));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = Date.UTC(t.getUTCFullYear(), 0, 1);
  return t.getUTCFullYear() + "-W" + String(Math.ceil(((t - y0) / 86400000 + 1) / 7)).padStart(2, "0");
}

export function cleanName(raw) {
  if (raw === NAME_DEFAULT) return NAME_DEFAULT; // longer than 16 characters, so it must skip the cut below
  const name = cut(
    String(raw ?? "")
      .normalize("NFC")
      .replace(/[<>]/g, "")
      // Control and format characters (bidi overrides, zero-width space, soft hyphen, tag characters...) and
      // blank-looking letters (CGJ, Hangul fillers, braille blank). ZWJ/ZWNJ stay: emoji sequences need them.
      .replace(/(?![\u200c\u200d])[\p{Cc}\p{Cf}\u034f\u115f\u1160\u17b4\u17b5\u2800\u3164\uffa0]/gu, "")
      .replace(/\s+/g, " ")
      .trim(),
    16,
  ).trim();
  return !/[\p{L}\p{N}\p{S}\p{P}]/u.test(name) || blocked(name) ? NAME_DEFAULT : name;
}

// First `max` code points, never cutting through an emoji or other joined character.
function cut(text, max) {
  const parts = typeof Intl.Segmenter === "function"
    ? Array.from(new Intl.Segmenter("en", { granularity: "grapheme" }).segment(text), (x) => x.segment)
    : Array.from(text);
  let out = "", n = 0;
  for (const g of parts) {
    const len = Array.from(g).length;
    if (n + len > max) break;
    out += g; n += len;
  }
  return out;
}

function blocked(name) {
  const base = name.normalize("NFKC").toLowerCase(); // NFKC folds full-width and styled letters
  for (const v of [base, base.replace(/[01!34@5$7]/g, (c) => LEET[c])]) {
    const squashed = v.replace(/[^\p{L}\p{N}]/gu, "");
    if (BLOCK_ANYWHERE.some((w) => squashed.includes(w))) return true;
    if (!ALLOW_WORD.some((w) => squashed.startsWith(w)) && BLOCK_PREFIX.some((w) => squashed.startsWith(w))) return true;
    const words = v.split(/[^\p{L}\p{N}]+/u).filter((t) => t && !ALLOW_WORD.includes(t));
    if (words.some((t) => BLOCK_WORD.includes(t) || BLOCK_PREFIX.some((w) => t.startsWith(w)))) return true;
  }
  return false;
}

function cleanChoices(list) {
  if (!Array.isArray(list)) return [];
  return list.slice(0, 20).flatMap((c) =>
    c && typeof c.card === "string" && /^[a-z0-9_-]{1,24}$/.test(c.card) && PICKS.includes(c.pick) ? [{ card: c.card, pick: c.pick }] : [],
  );
}

// Optional contact email for prize winners: trimmed, otherwise kept exactly as typed.
// Returns undefined when none was given and null when it doesn't look like an email address.
const EMAIL = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:".]{2,}$/;
export function cleanEmail(raw) {
  const s = String(raw ?? "").trim();
  if (!s) return undefined;
  const control = [...s].some((ch) => ch.charCodeAt(0) < 32 || ch.charCodeAt(0) === 127);
  return s.length <= 254 && !control && EMAIL.test(s) ? s : null;
}

// Quiz answers from the game page, [{q: "mule", pick: 1}, ...]: unknown questions and repeats are dropped and
// whether each one is right is worked out here.
export function cleanAnswers(list) {
  const out = [];
  if (!Array.isArray(list)) return out;
  for (const a of list.slice(0, 20)) {
    const q = a && typeof a.q === "string" ? QUIZ_BY_ID.get(a.q) : undefined;
    if (!q || out.some((x) => x.q === q.id) || !Number.isInteger(a.pick) || a.pick < 0 || a.pick >= q.o.length) continue;
    out.push({ q: q.id, pick: a.pick, ok: a.pick === q.a ? 1 : 0 });
  }
  return out;
}
// The first answer to each question counts: the game locks a question once it is answered.
function mergeAnswers(saved, add) {
  const out = saved.slice();
  for (const a of add) if (!out.some((x) => x.q === a.q)) out.push(a);
  const at = (a) => (QUIZ_BY_ID.get(a.q) || { i: 99 }).i;
  return out.sort((x, y) => at(x) - at(y));
}
function savedAnswers(text) {
  try { const v = JSON.parse(text || "[]"); return Array.isArray(v) ? v.filter((a) => a && typeof a.q === "string") : []; }
  catch { return []; }
}
const quizRight = (answers) => (answers.length ? answers.filter((a) => a.ok).length : null);

// Reads at most `max` bytes of the body; returns null if it is bigger (also for chunked uploads with no Content-Length).
async function readBody(request, max) {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) { await reader.cancel().catch(() => {}); return null; }
    chunks.push(value);
  }
  const buf = new Uint8Array(size);
  let o = 0;
  for (const c of chunks) { buf.set(c, o); o += c.byteLength; }
  return new TextDecoder().decode(buf);
}

// Rate-limit key: IPv4 address, or the /64 network for IPv6 (one home or phone usually owns a whole /64).
export function networkKey(ip) {
  const v4 = ip.match(/(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (v4 || !ip.includes(":")) return v4 ? v4[1] : ip;
  const [head, tail] = ip.includes("::") ? ip.split("::") : [ip, null];
  const h = head ? head.split(":") : [];
  const t = tail ? tail.split(":") : [];
  const groups = tail === null ? h : [...h, ...Array(Math.max(0, 8 - h.length - t.length)).fill("0"), ...t];
  return groups.slice(0, 4).map((g) => (parseInt(g, 16) || 0).toString(16)).join(":") + "::/64";
}

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ---------- public routes ----------

async function board(env, db) {
  const week = isoWeek(new Date(), timeZone(env));
  const cols = "id, name, score, height, stage, created_at AS at"; // never the email
  const [w, a] = await db.batch([
    db.prepare(`SELECT ${cols} FROM scores WHERE week = ?1 AND hidden = 0 AND posted = 1 ORDER BY score DESC, id ASC LIMIT 10`).bind(week),
    db.prepare(`SELECT ${cols} FROM scores WHERE hidden = 0 AND posted = 1 ORDER BY score DESC, id ASC LIMIT 10`),
  ]);
  return json({ ok: true, week, closed: closed(env), weekTop: w.results, allTop: a.results });
}

// Every saved game counts here, posted to the board or not.
let statsMemo = null;
async function stats(db) {
  if (statsMemo && Date.now() - statsMemo.at < 30000) return json(statsMemo.body);
  const v = (col) => `COALESCE(SUM(CASE WHEN hidden = 0 THEN ${col} END), 0)`;
  const habitCols = HABITS.map((h, i) => `COALESCE(SUM(hidden = 0 AND habit = '${h}'), 0) AS h${i}`).join(", ");
  const r = (await db.prepare(`SELECT COUNT(*) AS scanned, COALESCE(SUM(hidden = 0), 0) AS games, ${v("wise")} AS wise, ${v("risky")} AS risky,
      ${v("missed")} AS missed, ${v("fall_spend")} AS spend, ${v("fall_scam")} AS scam, ${v("fall_delay")} AS delay,
      ${v(`CASE WHEN ${QUIZ_TAKER} THEN quiz END`)} AS quizSum, ${v(`${QUIZ_TAKER}`)} AS quizN,
      ${v(`${QUIZ_TAKER} AND quiz >= ${QUIZ_PASS}`)} AS quizPass, ${habitCols}
      FROM (SELECT wise, risky, missed, fall_spend, fall_scam, fall_delay, quiz, quiz_answered, habit, hidden FROM scores ORDER BY id DESC LIMIT ${STATS_SAMPLE})`).first()) || {};
  const body = {
    ok: true,
    stats: {
      games: r.games || 0, wise: r.wise || 0, risky: r.risky || 0, missed: r.missed || 0,
      falls: { spend: r.spend || 0, scam: r.scam || 0, delay: r.delay || 0 },
      habits: Object.fromEntries(HABITS.map((h, i) => [h, r["h" + i] || 0]).filter(([, n]) => n > 0)),
      // finished quizzes only: the total right (quizSum), how many (quizN) and how many scored 2/3 or better (quizPass)
      quizSum: r.quizSum || 0, quizN: r.quizN || 0, quizPass: r.quizPass || 0, quizOf: QUIZ.length, quizPassMark: QUIZ_PASS,
      sample: (r.scanned || 0) >= STATS_SAMPLE,
    },
  };
  statsMemo = { at: Date.now(), body };
  return json(body);
}

// Saves one finished game. The game page sends it as soon as the statement opens (board: false: it only feeds the
// analysis), then again as the player answers the quiz, picks a habit and posts to the board (board: true, with
// the nickname and an optional email). Every request carries the whole state plus the game's random id (gid) and
// secret key, so the first one inserts the row and later ones update it, in any order and with retries. The score
// and the game data are fixed once saved; only the quiz answers, habit, board flag, nickname and email change.
// Older game pages send a single request without gid or board: the game is saved and posted at once, as before.
async function post(request, env, db) {
  if (closed(env)) return fail("closed", 403);
  const origin = request.headers.get("origin");
  if (origin) {
    let host = "";
    try { host = new URL(origin).host; } catch {}
    if (host !== new URL(request.url).host) return fail("origin", 403);
  }
  if (!(request.headers.get("content-type") || "").toLowerCase().includes("application/json")) return fail("content_type", 415);
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > MAX_BODY) return fail("too_large", 413);
  const text = await readBody(request, MAX_BODY);
  if (text === null) return fail("too_large", 413);
  let b;
  try { b = JSON.parse(text); } catch { return fail("bad_json", 400); }
  if (!b || typeof b !== "object" || Array.isArray(b)) return fail("bad_json", 400);
  const score = Number(b.score);
  if (!Number.isFinite(score) || score < 0 || score > MAX_SCORE) return fail("bad_score", 400);
  const board = b.board !== false;
  const email = board ? cleanEmail(b.email) : undefined;
  if (email === null) return fail("bad_email", 400);
  let gid = null, key = null;
  if (b.gid !== undefined || b.key !== undefined) {
    gid = typeof b.gid === "string" && /^[A-Za-z0-9-]{16,64}$/.test(b.gid) ? b.gid : null;
    key = typeof b.key === "string" && /^[A-Za-z0-9_-]{24,128}$/.test(b.key) ? b.key : null;
    if (!gid || !key) return fail("bad_key", 400);
  }
  const answers = cleanAnswers(b.answers);
  const habit = HABITS.includes(b.habit) ? b.habit : null;
  const change = { key, board, name: b.name, email, answers, habit };
  if (gid) {
    const saved = await findGame(db, gid);
    if (saved) return update(db, saved, change);
  }

  const now = new Date(), tz = timeZone(env);
  const week = isoWeek(now, tz);
  const at = now.toISOString();
  const falls = b.falls && typeof b.falls === "object" ? b.falls : {};
  const perQuestion = Array.isArray(b.answers);
  const values = {
    name: board ? cleanName(b.name) : NAME_DEFAULT,
    score: Math.round(score),
    stage: int(b.stage, 0, 3),
    height: Math.round(Math.min(999, Math.max(0, Number(b.height) || 0)) * 10) / 10,
    drops: int(b.drops, 0, 3),
    wise: int(b.wise, 0, 99), risky: int(b.risky, 0, 99), missed: int(b.missed, 0, 99),
    fall_spend: int(falls.spend, 0, 99), fall_scam: int(falls.scam, 0, 99), fall_delay: int(falls.delay, 0, 99),
    choices: JSON.stringify(cleanChoices(b.choices)),
    habit,
    // older game pages send only how many they got right (quiz); newer ones send each answer
    quiz: perQuestion ? quizRight(answers) : Number.isInteger(b.quiz) && b.quiz >= 0 && b.quiz <= QUIZ.length ? b.quiz : null,
    quiz_answered: perQuestion ? answers.length : null,
    quiz_answers: perQuestion ? JSON.stringify(answers) : null,
    ended: ENDS.includes(b.ended) ? b.ended : null,
    week,
    month: monthKey(now, tz),
    created_at: at,
    updated_at: at,
    posted: board ? 1 : 0,
    email: email ?? null,
    gid,
    edit_hash: key ? await sha256(key) : null,
    ip_hash: null,
  };

  // Rate limit by a salted hash of the network (rotates weekly; the address itself is never stored).
  // The count and the insert are one statement, so a burst of parallel posts cannot all slip past the limit.
  const ip = request.headers.get("cf-connecting-ip") || "";
  values.ip_hash = ip ? (await sha256(networkKey(ip) + "|" + week + "|" + (env.IP_SALT || "3-fall-fun"))).slice(0, 24) : null;
  const limit = int(env.RATE_LIMIT || 30, 1, 1000);
  const since = new Date(now.getTime() - 60000).toISOString();
  const cols = Object.keys(values), n = cols.length, ipAt = cols.indexOf("ip_hash") + 1;
  const ins = await db
    .prepare(`INSERT INTO scores (${cols.join(", ")}) SELECT ${cols.map((_, i) => "?" + (i + 1)).join(", ")}
      WHERE ?${ipAt} IS NULL OR (SELECT COUNT(*) FROM scores WHERE ip_hash = ?${ipAt} AND created_at > ?${n + 1}) < ?${n + 2}
      ON CONFLICT (gid) DO NOTHING`)
    .bind(...cols.map((c) => values[c]), since, limit)
    .run();
  if (!ins.meta.changes) {
    const saved = gid && (await findGame(db, gid)); // a parallel request saved this game first
    return saved ? update(db, saved, change) : fail("rate_limited", 429, { "retry-after": "60" });
  }
  const id = ins.meta.last_row_id;
  if (!board) return json({ ok: true, id, week, board: false }, 201);
  return json({ ok: true, id, board: true, ...(await rankOf(db, week, values.score, id)), week, name: values.name }, 201);
}

const findGame = (db, gid) =>
  db.prepare("SELECT id, edit_hash, posted, name, email, habit, quiz_answers, score, week, created_at, edits FROM scores WHERE gid = ?1").bind(gid).first();

async function update(db, saved, c) {
  if (!saved.edit_hash || (await sha256(c.key)) !== saved.edit_hash) return fail("bad_key", 403);
  const answers = mergeAnswers(savedAnswers(saved.quiz_answers), c.answers);
  const habit = c.habit ?? saved.habit;
  const posted = saved.posted || c.board ? 1 : 0;
  const name = !saved.posted && c.board ? cleanName(c.name) : saved.name; // the nickname is set once, when posting
  const email = saved.email ?? (c.board ? c.email ?? null : null); // write once: a saved email is never changed or cleared
  const same = JSON.stringify(answers) === (saved.quiz_answers || "[]") && habit === saved.habit && posted === saved.posted && email === saved.email;
  if (!same) {
    if (saved.edits >= MAX_EDITS || Date.now() - Date.parse(saved.created_at) > EDIT_HOURS * 3600000) return fail("locked", 409);
    await db
      .prepare(`UPDATE scores SET quiz_answers = ?1, quiz_answered = ?2, quiz = ?3, habit = ?4, posted = ?5, name = ?6,
        email = COALESCE(email, ?7), edits = edits + 1, updated_at = ?8 WHERE id = ?9`)
      .bind(JSON.stringify(answers), answers.length, quizRight(answers), habit, posted, name, email, new Date().toISOString(), saved.id)
      .run();
  }
  if (!posted) return json({ ok: true, id: saved.id, week: saved.week, board: false });
  return json({ ok: true, id: saved.id, board: true, ...(await rankOf(db, saved.week, saved.score, saved.id)), week: saved.week, name });
}

// Weekly rank, counting at most RANK_CAP rows so a low score in a busy week stays cheap (null = beyond the cap).
async function rankOf(db, week, score, id) {
  const ahead = await db
    .prepare(`SELECT COUNT(*) AS n FROM (SELECT 1 FROM scores WHERE week = ?1 AND hidden = 0 AND posted = 1 AND (score > ?2 OR (score = ?2 AND id < ?3)) LIMIT ${RANK_CAP})`)
    .bind(week, score, id)
    .first();
  const n = ahead?.n || 0;
  return { rank: n < RANK_CAP ? n + 1 : null, rankCap: RANK_CAP };
}

// ---------- admin routes ----------

async function authorised(request, env) {
  const token = String(env.ADMIN_TOKEN || "");
  if (token.length < 16) return false;
  const given = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  const [a, b] = await Promise.all([sha256(token), sha256(given)]);
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const ADMIN_COLS = "id, name, email, posted, score, stage, height, drops, wise, risky, missed, fall_spend, fall_scam, fall_delay, choices, habit, quiz, quiz_answered, quiz_answers, ended, week, month, created_at, updated_at, hidden";

// ?week=2026-W41 or ?month=2026-10 narrows a view; neither means every game.
function period(url) {
  const week = url.searchParams.get("week") || "", month = url.searchParams.get("month") || "";
  if (/^\d{4}-W\d{2}$/.test(week)) return { type: "week", key: week, where: "week = ?1" };
  if (/^\d{4}-\d{2}$/.test(month)) return { type: "month", key: month, where: "month = ?1" };
  return { type: "all", key: null, where: "1 = 1" };
}

// Survey and decision analysis for /admin, counted in SQL so the Worker does little work however many games there
// are. Hidden games are left out. Every saved game counts, posted to the board or not.
async function summary(db, p) {
  const where = "s.hidden = 0" + (p.key ? " AND s." + p.where : "");
  const q = (sql) => (p.key ? db.prepare(sql).bind(p.key) : db.prepare(sql));
  const sum = (expr) => `COALESCE(SUM(${expr}), 0)`;
  const TREND = `COUNT(*) AS games, ${sum("posted")} AS posted, ${sum(QUIZ_TAKER)} AS quizTakers,
      ${sum(`${QUIZ_TAKER} AND quiz >= ${QUIZ_PASS}`)} AS quizPass, ${sum("habit IS NOT NULL")} AS habits, ${sum("email IS NOT NULL")} AS emails,
      ROUND(AVG(score)) AS avgScore, ${sum("wise")} AS wise, ${sum("risky")} AS risky, ${sum("missed")} AS missed,
      ${sum("fall_spend")} AS spend, ${sum("fall_scam")} AS scam, ${sum("fall_delay")} AS delay`;
  const res = await db.batch([
    q(`SELECT ${TREND}, ${sum("quiz_answered >= 1")} AS quizStarted, ${sum("quiz_answered IS NULL AND quiz IS NOT NULL")} AS quizLegacy,
        ${sum(`${QUIZ_TAKER} AND quiz = ${QUIZ.length}`)} AS quizPerfect, ${sum(`CASE WHEN ${QUIZ_TAKER} THEN quiz END`)} AS quizSum,
        MAX(score) AS bestScore, ROUND(AVG(height), 1) AS avgHeight, ${sum("ended = 'time'")} AS endedTime, ${sum("ended = 'drops'")} AS endedDrops,
        ${sum("fall_spend > 0")} AS gSpend, ${sum("fall_scam > 0")} AS gScam, ${sum("fall_delay > 0")} AS gDelay,
        ${sum("fall_spend + fall_scam + fall_delay = 0")} AS gNoFall
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
    db.prepare("SELECT DISTINCT week AS k FROM scores ORDER BY week DESC"),
    db.prepare("SELECT DISTINCT month AS k FROM scores WHERE month IS NOT NULL ORDER BY month DESC"),
  ]);
  const [ov, qa, qs, hb, cd, st, wk, mo, weeks, months] = res.map((r) => r.results || []);
  const o = ov[0] || {};
  const pct = (a, b) => (b ? Math.round((1000 * (a || 0)) / b) / 10 : null);
  const count = (rows, test) => rows.filter(test).reduce((s, r) => s + (r.n || 0), 0);
  const trend = (r) => ({ ...r, quizPassPct: pct(r.quizPass, r.quizTakers), wisePct: pct(r.wise, r.wise + r.risky + r.missed) });
  const question = (id, en, zh, options, answer) => {
    const rows = qa.filter((r) => r.q === id), n = count(rows, () => true), right = count(rows, (r) => r.ok === 1);
    return { id, en, zh, answer, n, right, pct: pct(right, n),
      options: options.map((opt, i) => ({ en: opt[0], zh: opt[1], right: i === answer, n: count(rows, (r) => r.pick === i) })) };
  };
  const cardIds = [...new Set([...CARDS.map((c) => c.id), ...cd.map((r) => r.card)])];
  const games = o.games || 0, choices = (o.wise || 0) + (o.risky || 0) + (o.missed || 0);
  return {
    period: { type: p.type, key: p.key },
    periods: { weeks: weeks.map((r) => r.k).filter(Boolean), months: months.map((r) => r.k).filter(Boolean) },
    overview: {
      games, posted: o.posted || 0, anonymous: games - (o.posted || 0), emails: o.emails || 0,
      quizQuestions: QUIZ.length, quizPassMark: QUIZ_PASS, quizTargetPct: 70,
      quizStarted: o.quizStarted || 0, quizTakers: o.quizTakers || 0, quizLegacy: o.quizLegacy || 0,
      quizPass: o.quizPass || 0, quizPassPct: pct(o.quizPass, o.quizTakers), quizPerfect: o.quizPerfect || 0,
      quizAvg: o.quizTakers ? Math.round((100 * o.quizSum) / o.quizTakers) / 100 : null,
      habits: o.habits || 0, habitPct: pct(o.habits, games),
      avgScore: o.avgScore, bestScore: o.bestScore, avgHeight: o.avgHeight, endedTime: o.endedTime || 0, endedDrops: o.endedDrops || 0,
      wise: o.wise || 0, risky: o.risky || 0, missed: o.missed || 0, wisePct: pct(o.wise, choices), noFallGames: o.gNoFall || 0,
    },
    // per question: answers given, how many right, and how the answers split across the options
    quiz: [
      ...QUIZ.map((x) => question(x.id, x.q[0], x.q[1], x.o, x.a)),
      ...[...new Set(qa.map((r) => r.q))].filter((id) => !QUIZ_BY_ID.has(id)).map((id) => ({ ...question(id, id + " (no longer in the quiz)", "", [], -1) })),
    ],
    quizScores: Array.from({ length: QUIZ.length + 1 }, (_, k) => ({ score: k, n: count(qs, (r) => r.k === k) })),
    habits: [
      ...HABIT_LIST.map((h) => ({ id: h.id, en: h.en, zh: h.zh, n: count(hb, (r) => r.k === h.id) })),
      { id: null, en: "No habit picked", zh: "冇揀", n: count(hb, (r) => r.k == null) },
    ],
    traps: Object.keys(TRAPS).map((k) => {
      const g = o["g" + k[0].toUpperCase() + k.slice(1)] || 0;
      return { id: k, en: TRAPS[k].en, zh: TRAPS[k].zh, falls: o[k] || 0, games: g, gamesPct: pct(g, games) };
    }),
    cards: cardIds.map((id) => {
      const c = CARDS.find((x) => x.id === id), rows = cd.filter((r) => r.card === id);
      const wise = count(rows, (r) => r.pick === "wise"), risky = count(rows, (r) => r.pick === "risky"), none = count(rows, (r) => r.pick === "none");
      const n = wise + risky + none;
      return { id, en: c ? c.tag[0] : id, zh: c ? c.tag[1] : "", stage: c ? c.st : null, trap: c ? c.trap : null, n, wise, risky, none,
        wisePct: pct(wise, n), riskyPct: pct(risky, n), nonePct: pct(none, n) };
    }),
    stages: STAGES.map((s, i) => ({ stage: i, en: s.en, zh: s.zh, n: count(st, (r) => r.k === i) })),
    byWeek: wk.map(trend),
    byMonth: mo.map(trend),
  };
}


async function admin(path, request, env, db) {
  if (String(env.ADMIN_TOKEN || "").length < 16) return fail("admin_disabled", 404);
  if (!(await authorised(request, env))) return fail("unauthorised", 401);
  const url = new URL(request.url), now = new Date(), tz = timeZone(env);
  const current = { week: isoWeek(now, tz), month: monthKey(now, tz) };
  if (path === "scores" && request.method === "GET") {
    const limit = int(url.searchParams.get("limit") || 100, 1, 500);
    const offset = int(url.searchParams.get("offset") || 0, 0, 1e9);
    const p = period(url), args = p.key ? [p.key] : [];
    const on = url.searchParams.get("board"); // "1": posted to the board only, "0": saved anonymously only
    const where = p.where + (on === "1" ? " AND posted = 1" : on === "0" ? " AND posted = 0" : "");
    const [rows, count] = await db.batch([
      db.prepare(`SELECT ${ADMIN_COLS} FROM scores WHERE ${where} ORDER BY id DESC LIMIT ?${args.length + 1} OFFSET ?${args.length + 2}`).bind(...args, limit, offset),
      db.prepare("SELECT COUNT(*) AS n, COALESCE(SUM(hidden), 0) AS hidden, COALESCE(SUM(posted), 0) AS posted, COALESCE(SUM(email IS NOT NULL), 0) AS emails FROM scores"),
    ]);
    const c = count.results[0] || {};
    return json({ ok: true, ...current, total: c.n || 0, hiddenTotal: c.hidden || 0, postedTotal: c.posted || 0, emailTotal: c.emails || 0, rows: rows.results });
  }
  if (path === "rows" && request.method === "GET") {
    const after = int(url.searchParams.get("after") || 0, 0, Number.MAX_SAFE_INTEGER);
    const limit = int(url.searchParams.get("limit") || 500, 1, 1000);
    const { results } = await db.prepare(`SELECT ${ADMIN_COLS} FROM scores WHERE id > ?1 ORDER BY id ASC LIMIT ?2`).bind(after, limit).all();
    return json({ ok: true, rows: results, next: results.length === limit ? results[results.length - 1].id : null });
  }
  if (path === "summary" && request.method === "GET") return json({ ok: true, current, ...(await summary(db, period(url))) });
  if (path === "winners" && request.method === "GET") {
    const asked = period(url), p = asked.key ? asked : { type: "week", key: current.week, where: "week = ?1" };
    const limit = int(url.searchParams.get("limit") || 20, 1, 100);
    const { results } = await db
      .prepare(`SELECT id, name, email, score, height, stage, created_at, week, month FROM scores
        WHERE posted = 1 AND hidden = 0 AND ${p.where} ORDER BY score DESC, id ASC LIMIT ?2`)
      .bind(p.key, limit)
      .all();
    return json({ ok: true, period: { type: p.type, key: p.key }, current, rows: results });
  }
  if (path === "hide" && request.method === "POST") {
    let b;
    try { b = JSON.parse((await readBody(request, MAX_BODY)) ?? "x"); } catch { return fail("bad_json", 400); }
    const id = int(b && b.id, 0, Number.MAX_SAFE_INTEGER);
    if (!id) return fail("bad_id", 400);
    const res = await db.prepare("UPDATE scores SET hidden = ?1 WHERE id = ?2").bind(b.hidden === false ? 0 : 1, id).run();
    statsMemo = null;
    return json({ ok: true, id, hidden: b.hidden !== false, changed: res.meta.changes || 0 });
  }
  if (path === "export" && request.method === "GET") {
    const { results } = await db.prepare(`SELECT ${ADMIN_COLS} FROM scores ORDER BY id ASC`).all();
    const cols = ADMIN_COLS.split(", ");
    const cell = (v) => {
      let s = v === null || v === undefined ? "" : String(v);
      if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // keep spreadsheet apps from running formulas
      return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const csv = "\ufeff" + [cols.join(","), ...results.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\r\n") + "\r\n";
    return new Response(csv, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="3-fall-fun-scores-${new Date().toISOString().slice(0, 10)}.csv"`,
        "cache-control": "no-store",
      },
    });
  }
  return fail("not_found", 404);
}

// ---------- entry ----------

export async function handle(request, env) {
  const path = new URL(request.url).pathname.replace(/\/+$/, "");
  const method = request.method;
  try {
    if (path === "/api/health") {
      if (!env.DB) return json({ ok: true, database: false, closed: closed(env) });
      await ensureSchema(env);
      return json({ ok: true, database: true, closed: closed(env), week: isoWeek(new Date(), timeZone(env)), admin: String(env.ADMIN_TOKEN || "").length >= 16 });
    }
    if (path === "/api/scores" || path.startsWith("/api/admin/")) {
      if (!env.DB) return fail("no_database", 503);
      await ensureSchema(env);
      if (path.startsWith("/api/admin/")) return await admin(path.slice("/api/admin/".length), request, env, env.DB);
      if (method === "GET" || method === "HEAD") {
        return new URL(request.url).searchParams.get("view") === "stats" ? await stats(env.DB) : await board(env, env.DB);
      }
      if (method === "POST") return await post(request, env, env.DB);
      return fail("method_not_allowed", 405, { allow: "GET, HEAD, POST" });
    }
    return fail("not_found", 404);
  } catch (e) {
    console.error("api error", path, e && e.stack ? e.stack : e);
    return fail("server_error", 500);
  }
}
