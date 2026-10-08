// 3 Fall Fun leaderboard API.
// Runs as a Cloudflare Pages Function (see functions/api/[[path]].js) and stores games in D1 (binding name: DB).
//
//   GET  /api/health               -> is the database connected?
//   GET  /api/scores               -> this week's top 10 + all-time top 10
//   GET  /api/scores?view=stats    -> anonymised decision data for the Stats tab
//   POST /api/scores               -> save one finished game
//   GET  /api/admin/scores         -> latest games incl. hidden ones        (needs ADMIN_TOKEN)
//   POST /api/admin/hide           -> hide / unhide a game {id, hidden}     (needs ADMIN_TOKEN)
//   GET  /api/admin/export         -> every game as CSV                     (needs ADMIN_TOKEN)
//
// Optional environment variables (Pages > Settings > Variables and Secrets):
//   ADMIN_TOKEN         secret, 16+ characters; turns on the /api/admin routes and admin.html
//   LEADERBOARD_CLOSED  "1" stops new scores (e.g. after the event); the board stays visible
//   TIMEZONE            IANA zone for the weekly reset, default Asia/Hong_Kong
//   RATE_LIMIT          max posts per minute from one network, default 20
//   IP_SALT             extra salt for the hashed network id used only for rate limiting

const NAME_DEFAULT = "Anonymous crab 匿名蟹";
const MAX_SCORE = 500000;
const MAX_BODY = 4096;
const RANK_CAP = 500;
const STATS_SAMPLE = 1000; // Stats tab uses the latest N games, so each request reads at most N rows
const HABITS = ["save20", "payfull", "check", "track"];
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

let schemaReady = null;
function ensureSchema(db) {
  if (!schemaReady) schemaReady = db.batch(SCHEMA.map((s) => db.prepare(s))).catch((e) => { schemaReady = null; throw e; });
  return schemaReady;
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

// ISO week ("2026-W41") of the calendar date in the event's time zone, so the board resets at Monday 00:00 local time.
export function isoWeek(date, tz) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(date).map((x) => [x.type, x.value]),
  );
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
  const cols = "id, name, score, height, stage, created_at AS at";
  const [w, a] = await db.batch([
    db.prepare(`SELECT ${cols} FROM scores WHERE week = ?1 AND hidden = 0 ORDER BY score DESC, id ASC LIMIT 10`).bind(week),
    db.prepare(`SELECT ${cols} FROM scores WHERE hidden = 0 ORDER BY score DESC, id ASC LIMIT 10`),
  ]);
  return json({ ok: true, week, closed: closed(env), weekTop: w.results, allTop: a.results });
}

let statsMemo = null;
async function stats(db) {
  if (statsMemo && Date.now() - statsMemo.at < 30000) return json(statsMemo.body);
  const v = (col) => `COALESCE(SUM(CASE WHEN hidden = 0 THEN ${col} END), 0)`;
  const habitCols = HABITS.map((h, i) => `COALESCE(SUM(hidden = 0 AND habit = '${h}'), 0) AS h${i}`).join(", ");
  const r = (await db.prepare(`SELECT COUNT(*) AS scanned, COALESCE(SUM(hidden = 0), 0) AS games, ${v("wise")} AS wise, ${v("risky")} AS risky,
      ${v("missed")} AS missed, ${v("fall_spend")} AS spend, ${v("fall_scam")} AS scam, ${v("fall_delay")} AS delay,
      ${v("quiz")} AS quizSum, COUNT(CASE WHEN hidden = 0 THEN quiz END) AS quizN, ${habitCols}
      FROM (SELECT wise, risky, missed, fall_spend, fall_scam, fall_delay, quiz, habit, hidden FROM scores ORDER BY id DESC LIMIT ${STATS_SAMPLE})`).first()) || {};
  const body = {
    ok: true,
    stats: {
      games: r.games || 0, wise: r.wise || 0, risky: r.risky || 0, missed: r.missed || 0,
      falls: { spend: r.spend || 0, scam: r.scam || 0, delay: r.delay || 0 },
      habits: Object.fromEntries(HABITS.map((h, i) => [h, r["h" + i] || 0]).filter(([, n]) => n > 0)),
      quizSum: r.quizSum || 0, quizN: r.quizN || 0,
      sample: (r.scanned || 0) >= STATS_SAMPLE,
    },
  };
  statsMemo = { at: Date.now(), body };
  return json(body);
}

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

  const now = new Date();
  const week = isoWeek(now, timeZone(env));
  const at = now.toISOString();
  const falls = b.falls && typeof b.falls === "object" ? b.falls : {};
  const row = [
    cleanName(b.name),
    Math.round(score),
    int(b.stage, 0, 3),
    Math.round(Math.min(999, Math.max(0, Number(b.height) || 0)) * 10) / 10,
    int(b.drops, 0, 3),
    int(b.wise, 0, 99), int(b.risky, 0, 99), int(b.missed, 0, 99),
    int(falls.spend, 0, 99), int(falls.scam, 0, 99), int(falls.delay, 0, 99),
    JSON.stringify(cleanChoices(b.choices)),
    HABITS.includes(b.habit) ? b.habit : null,
    Number.isInteger(b.quiz) && b.quiz >= 0 && b.quiz <= 3 ? b.quiz : null,
    ENDS.includes(b.ended) ? b.ended : null,
    week,
    at,
  ];

  // Rate limit by a salted hash of the network (rotates weekly; the address itself is never stored).
  // The count and the insert are one statement, so a burst of parallel posts cannot all slip past the limit.
  const ip = request.headers.get("cf-connecting-ip") || "";
  const ipHash = ip ? (await sha256(networkKey(ip) + "|" + week + "|" + (env.IP_SALT || "3-fall-fun"))).slice(0, 24) : null;
  const limit = int(env.RATE_LIMIT || 20, 1, 1000);
  const since = new Date(now.getTime() - 60000).toISOString();
  const ins = await db
    .prepare(`INSERT INTO scores (name, score, stage, height, drops, wise, risky, missed, fall_spend, fall_scam, fall_delay,
      choices, habit, quiz, ended, week, created_at, ip_hash)
      SELECT ?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18
      WHERE ?18 IS NULL OR (SELECT COUNT(*) FROM scores WHERE ip_hash = ?18 AND created_at > ?19) < ?20`)
    .bind(...row, ipHash, since, limit)
    .run();
  if (!ins.meta.changes) return fail("rate_limited", 429, { "retry-after": "60" });
  const id = ins.meta.last_row_id;
  // Weekly rank, counting at most RANK_CAP rows so a low score in a busy week stays cheap (null = beyond the cap).
  const ahead = await db
    .prepare(`SELECT COUNT(*) AS n FROM (SELECT 1 FROM scores WHERE week = ?1 AND hidden = 0 AND (score > ?2 OR (score = ?2 AND id < ?3)) LIMIT ${RANK_CAP})`)
    .bind(week, row[1], id)
    .first();
  const n = ahead?.n || 0;
  return json({ ok: true, id, rank: n < RANK_CAP ? n + 1 : null, rankCap: RANK_CAP, week, name: row[0] }, 201);
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

const ADMIN_COLS = "id, name, score, stage, height, drops, wise, risky, missed, fall_spend, fall_scam, fall_delay, choices, habit, quiz, ended, week, created_at, hidden";

async function admin(path, request, env, db) {
  if (String(env.ADMIN_TOKEN || "").length < 16) return fail("admin_disabled", 404);
  if (!(await authorised(request, env))) return fail("unauthorised", 401);
  const url = new URL(request.url);
  if (path === "scores" && request.method === "GET") {
    const limit = int(url.searchParams.get("limit") || 100, 1, 500);
    const offset = int(url.searchParams.get("offset") || 0, 0, 1e9);
    const week = url.searchParams.get("week");
    const q = week && /^\d{4}-W\d{2}$/.test(week)
      ? db.prepare(`SELECT ${ADMIN_COLS} FROM scores WHERE week = ?1 ORDER BY id DESC LIMIT ?2 OFFSET ?3`).bind(week, limit, offset)
      : db.prepare(`SELECT ${ADMIN_COLS} FROM scores ORDER BY id DESC LIMIT ?1 OFFSET ?2`).bind(limit, offset);
    const [rows, count] = await db.batch([q, db.prepare("SELECT COUNT(*) AS n, SUM(hidden) AS hidden FROM scores")]);
    return json({ ok: true, week: isoWeek(new Date(), timeZone(env)), total: count.results[0]?.n || 0, hiddenTotal: count.results[0]?.hidden || 0, rows: rows.results });
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
      await ensureSchema(env.DB);
      return json({ ok: true, database: true, closed: closed(env), week: isoWeek(new Date(), timeZone(env)), admin: String(env.ADMIN_TOKEN || "").length >= 16 });
    }
    if (path === "/api/scores" || path.startsWith("/api/admin/")) {
      if (!env.DB) return fail("no_database", 503);
      await ensureSchema(env.DB);
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
