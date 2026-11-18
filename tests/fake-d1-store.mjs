// A small in-memory stand-in for D1, storing real rows in a `scores` table. It implements only the statements
// server/api.js issues, matched on their shape -- enough to test ordering, ranking, uniqueness, the rate limit
// and what the board exposes, without a database.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const COLS = ["id", "gid", "edit_hash", "name", "email", "score", "stage", "height", "drops", "wise", "risky",
  "missed", "fall_spend", "fall_scam", "fall_delay", "choices", "habit", "quiz", "quiz_answered", "quiz_answers",
  "ended", "week", "month", "persona", "title", "sil", "ip_hash", "posted", "hidden", "created_at", "updated_at", "edits",
  "items", "real_ms", "quiz_prior", "jackpot", "troll_revive", "troll_invest", "troll_tickets", "avatar", "mtype", "via"];

function groupCount(list, keyFn) {
  const m = new Map();
  for (const r of list) {
    const k = keyFn(r);
    if (k !== undefined) m.set(k, (m.get(k) || 0) + 1);
  }
  return [...m.entries()].map(([k, n]) => ({ k, n }));
}

function summarizeTrend(list) {
  const n = list.length;
  const quizTakers = list.filter((r) => (r.quiz_answered === 3) || (r.quiz_answered == null && r.quiz != null));
  const emails = list.filter((r) => r.email != null).length;
  return {
    games: n,
    posted: list.filter((r) => r.posted === 1).length,
    quizTakers: quizTakers.length,
    quizPass: quizTakers.filter((r) => (r.quiz || 0) >= 2).length,
    habits: list.filter((r) => r.habit != null).length,
    emails,
    avgScore: n ? Math.round(list.reduce((s, r) => s + (r.score || 0), 0) / n) : null,
    wise: list.reduce((s, r) => s + (r.wise || 0), 0),
    risky: list.reduce((s, r) => s + (r.risky || 0), 0),
    missed: list.reduce((s, r) => s + (r.missed || 0), 0),
    spend: list.reduce((s, r) => s + (r.fall_spend || 0), 0),
    scam: list.reduce((s, r) => s + (r.fall_scam || 0), 0),
    delay: list.reduce((s, r) => s + (r.fall_delay || 0), 0),
    jack: list.filter((r) => r.avatar === "jack").length,
    jackie: list.filter((r) => r.avatar === "jackie").length,
  };
}

function summaryQuery(rows, sql, args) {
  let list = rows.filter((r) => !r.hidden);
  if (/AND (?:s\.)?week = \?1/.test(sql)) list = list.filter((r) => r.week === args[0]);
  else if (/AND (?:s\.)?month = \?1/.test(sql)) list = list.filter((r) => r.month === args[0]);
  if (/AS quizStarted/.test(sql)) {
    const tr = summarizeTrend(list);
    const quizTakers = list.filter((r) => (r.quiz_answered === 3) || (r.quiz_answered == null && r.quiz != null));
    const quizFirst = quizTakers.filter((r) => r.quiz_prior === 0);
    return [{
      ...tr,
      quizStarted: list.filter((r) => (r.quiz_answered || 0) >= 1).length,
      quizLegacy: list.filter((r) => r.quiz_answered == null && r.quiz != null).length,
      quizFirst: quizFirst.length,
      quizFirstPass: quizFirst.filter((r) => (r.quiz || 0) >= 2).length,
      quizPriorKnown: quizTakers.filter((r) => r.quiz_prior != null).length,
      quizPerfect: quizTakers.filter((r) => r.quiz === 3).length,
      quizSum: quizTakers.reduce((s, r) => s + (r.quiz || 0), 0),
      bestScore: list.length ? Math.max(...list.map((r) => r.score || 0)) : null,
      avgHeight: list.length ? Math.round((10 * list.reduce((s, r) => s + (r.height || 0), 0)) / list.length) / 10 : null,
      endedTime: list.filter((r) => r.ended === "time").length,
      endedDrops: list.filter((r) => r.ended === "drops").length,
      gSpend: list.filter((r) => (r.fall_spend || 0) > 0).length,
      gScam: list.filter((r) => (r.fall_scam || 0) > 0).length,
      gDelay: list.filter((r) => (r.fall_delay || 0) > 0).length,
      gNoFall: list.filter((r) => (r.fall_spend || 0) + (r.fall_scam || 0) + (r.fall_delay || 0) === 0).length,
      tiSeen: list.filter((r) => (r.troll_invest || 0) >= 1).length,
      tiDeclined: list.filter((r) => r.troll_invest === 1).length,
      tiInvested: list.filter((r) => (r.troll_invest || 0) >= 2).length,
      tiFee: list.filter((r) => r.troll_invest === 3).length,
      ttSeen: list.filter((r) => r.troll_tickets != null).length,
      ttBought: list.filter((r) => (r.troll_tickets || 0) >= 1).length,
      ttCards: list.reduce((s, r) => s + (r.troll_tickets || 0), 0),
      trSeen: list.filter((r) => r.troll_revive != null).length,
      trPressed: list.filter((r) => r.troll_revive === 1).length,
    }];
  }
  if (/json_each\(s\.quiz_answers\)|FROM score_quiz_answers\b/.test(sql)) {
    const out = new Map();
    for (const r of list) {
      let arr = []; try { arr = JSON.parse(r.quiz_answers || "[]"); } catch {}
      for (const a of Array.isArray(arr) ? arr : []) {
        const k = `${a.q}|${a.pick}|${a.ok}`;
        const prev = out.get(k) || { q: a.q, pick: a.pick, ok: a.ok, n: 0 };
        prev.n++; out.set(k, prev);
      }
    }
    return [...out.values()];
  }
  if (/json_each\(s\.choices\).*AS card|FROM score_choices\b.*GROUP BY card/.test(sql)) {
    const out = new Map();
    for (const r of list) {
      let arr = []; try { arr = JSON.parse(r.choices || "[]"); } catch {}
      for (const c of Array.isArray(arr) ? arr : []) {
        const k = `${c.card}|${c.pick}`;
        const prev = out.get(k) || { card: c.card, pick: c.pick, n: 0 };
        prev.n++; out.set(k, prev);
      }
    }
    return [...out.values()];
  }
  if (/json_each\(s\.choices\).*AS k|FROM score_choices\b.*power IS NOT NULL/.test(sql)) {
    const out = new Map();
    for (const r of list) {
      let arr = []; try { arr = JSON.parse(r.choices || "[]"); } catch {}
      for (const c of Array.isArray(arr) ? arr : []) if (c.power) out.set(c.power, (out.get(c.power) || 0) + 1);
    }
    return [...out.entries()].map(([k, n]) => ({ k, n }));
  }
  if (/GROUP BY quiz\b/.test(sql)) return groupCount(list.filter((r) => (r.quiz_answered === 3) || (r.quiz_answered == null && r.quiz != null)), (r) => r.quiz);
  if (/GROUP BY habit\b/.test(sql)) return groupCount(list, (r) => r.habit ?? null);
  if (/GROUP BY stage\b/.test(sql)) return groupCount(list, (r) => r.stage);
  if (/GROUP BY week ORDER BY week/.test(sql)) {
    const wks = [...new Set(list.map((r) => r.week).filter(Boolean))].sort();
    return wks.map((k) => ({ k, ...summarizeTrend(list.filter((r) => r.week === k)) }));
  }
  if (/GROUP BY month ORDER BY month/.test(sql)) {
    const mos = [...new Set(list.map((r) => r.month).filter(Boolean))].sort();
    return mos.map((k) => ({ k, ...summarizeTrend(list.filter((r) => r.month === k)) }));
  }
  if (/GROUP BY mtype\b/.test(sql)) return groupCount(list.filter((r) => r.mtype != null), (r) => r.mtype);
  if (/GROUP BY title\b/.test(sql)) return groupCount(list.filter((r) => r.title != null), (r) => r.title);
  if (/GROUP BY persona\b/.test(sql)) return groupCount(list.filter((r) => r.persona != null), (r) => r.persona);
  if (/AND via = 'c'/.test(sql)) return [{ n: list.filter((r) => r.via === "c").length }];
  return [];
}

function applyAdminWhere(list, sql, args) {
  const m = /\bWHERE\s+([\s\S]+?)(?:\s+ORDER BY|\s+LIMIT|\s*$)/i.exec(sql);
  if (!m) return list;
  const w = m[1], arg = (tok) => args[Number(tok.slice(1)) - 1];
  const wk = /\bweek = (\?\d+)/.exec(w); if (wk) list = list.filter((r) => r.week === arg(wk[1]));
  const mo = /\bmonth = (\?\d+)/.exec(w); if (mo) list = list.filter((r) => r.month === arg(mo[1]));
  if (/\bhidden = 0\b/.test(w)) list = list.filter((r) => !r.hidden);
  if (/\bhidden = 1\b/.test(w)) list = list.filter((r) => !!r.hidden);
  if (/\bposted = 1\b/.test(w)) list = list.filter((r) => r.posted === 1);
  if (/\bposted = 0\b/.test(w)) list = list.filter((r) => !r.posted);
  if (/ended = 'time' AND real_ms > 270000/.test(w)) list = list.filter((r) => r.ended === "time" && (r.real_ms || 0) > 270000);
  if (/via = 'c'/.test(w)) list = list.filter((r) => r.via === "c");
  if (/troll_invest >= 2 OR troll_tickets > 0/.test(w)) list = list.filter((r) => (r.troll_invest || 0) >= 2 || (r.troll_tickets || 0) > 0);
  const lt = /\bid < (\?\d+)/.exec(w); if (lt) list = list.filter((r) => r.id < arg(lt[1]));
  const gt = /\bid > (\?\d+)/.exec(w); if (gt) list = list.filter((r) => r.id > arg(gt[1]));
  const like = /LOWER\(name\) LIKE (\?\d+)/.exec(w);
  if (like) {
    const rawPat = String(arg(like[1]) || "").slice(1, -1).replace(/\\(.)/g, "$1");
    const idEq = /\(id = (\?\d+)/.exec(w);
    const idNum = idEq ? arg(idEq[1]) : null;
    list = list.filter((r) =>
      (idNum != null && r.id === idNum) ||
      String(r.name || "").toLowerCase().includes(rawPat) ||
      String(r.email || "").toLowerCase().includes(rawPat) ||
      String(r.title || "").toLowerCase().includes(rawPat)
    );
  }
  return list;
}

export function makeStore() {
  const rows = [];
  let seq = 0;

  const select = (sql, args) => {
    let list = rows.slice();
    if (/WHERE id = \?1\b/.test(sql)) list = list.filter((r) => r.id === args[0]);
    else if (/WHERE gid = \?1\b/.test(sql)) list = list.filter((r) => r.gid === args[0]);
    else if (/month IS NULL/.test(sql)) list = list.filter((r) => r.month == null);
    else if (/WHERE week = \?1\b/.test(sql) && /hidden = 0/.test(sql) && /posted = 1/.test(sql)) {
      list = list.filter((r) => r.week === args[0] && !r.hidden && r.posted === 1);
    } else if (/score < \?1\b/.test(sql)) {
      list = list.filter((r) => !r.hidden && (r.score || 0) < args[0]);
    } else {
      list = applyAdminWhere(list, sql, args);
    }
    if (/ORDER BY score DESC, id ASC/.test(sql)) list.sort((a, b) => (b.score - a.score) || (a.id - b.id));
    else if (/ORDER BY id DESC/.test(sql)) list.sort((a, b) => b.id - a.id);
    else if (/ORDER BY id ASC/.test(sql)) list.sort((a, b) => a.id - b.id);
    const offP = /OFFSET \?(\d+)/.exec(sql);
    if (offP) list = list.slice(args[Number(offP[1]) - 1] || 0);
    const limP = /LIMIT \?(\d+)/.exec(sql);
    const lim = /LIMIT (\d+)/.exec(sql);
    if (limP) list = list.slice(0, args[Number(limP[1]) - 1]);
    else if (lim) list = list.slice(0, +lim[1]);
    // honour the SELECT list, including aliases: a row must carry only what was asked for (never, for example,
    // the email, which the public board deliberately does not project)
    const proj = /SELECT (.+?) FROM scores/.exec(sql);
    if (proj && !/COUNT\(/i.test(proj[1]) && !/SUM\(/i.test(proj[1])) {
      const cols = proj[1].split(",").map((c) => c.trim()).map((c) => {
        const as = /^(.+?)\s+AS\s+(\w+)$/i.exec(c);
        return as ? { src: as[1].trim(), key: as[2] } : { src: c, key: c.split(".").pop() };
      });
      list = list.map((r) => { const o = {}; for (const c of cols) o[c.key] = r[c.src]; return o; });
    }
    return list;
  };

  const insert = (sql, args) => {
    const cols = /INSERT INTO scores \(([^)]+)\)/.exec(sql)[1].split(",").map((s) => s.trim());
    const values = {};
    cols.forEach((c, i) => { values[c] = args[i]; });
    const since = args[cols.length], limit = args[cols.length + 1];
    const ip = values.ip_hash;
    if (ip) {
      const recent = rows.filter((r) => r.ip_hash === ip && r.created_at > since).length;
      if (recent >= limit) return { changes: 0, last_row_id: null };
    }
    if (values.gid && rows.some((r) => r.gid === values.gid)) return { changes: 0, last_row_id: null };  // ON CONFLICT DO NOTHING
    values.id = ++seq;
    values.hidden = values.hidden || 0;
    values.posted = values.posted || 0;
    values.edits = values.edits || 0;
    rows.push(values);
    return { changes: 1, last_row_id: values.id };
  };

  const run = (sql, args) => {
    if (/^PRAGMA table_info/i.test(sql)) return { results: COLS.map((name) => ({ name })) };
    if (/^\s*(CREATE|ALTER|DROP)/i.test(sql)) return { meta: { changes: 0 } };
    if (/FROM sqlite_master\b/i.test(sql)) return { results: [{ n: 0 }] };
    if (/INSERT OR IGNORE INTO score_(?:choices|quiz_answers)/i.test(sql)) return { meta: { changes: 0 } };
    if (/INSERT INTO scores/.test(sql)) return { meta: insert(sql, args) };
    if (/UPDATE scores SET month = \?1 WHERE id = \?2/.test(sql)) {
      const r = rows.find((x) => x.id === args[1]); if (r) r.month = args[0];
      return { meta: { changes: r ? 1 : 0 } };
    }
    if (/UPDATE scores SET hidden = \?1 WHERE id IN \(/.test(sql)) {
      const ids = new Set(args.slice(1)); let changes = 0;
      for (const r of rows) if (ids.has(r.id)) { r.hidden = args[0]; changes++; }
      return { meta: { changes } };
    }
    if (/UPDATE scores SET name = \?1 WHERE id IN \(/.test(sql)) {
      const ids = new Set(args.slice(1)); let changes = 0;
      for (const r of rows) if (ids.has(r.id)) { r.name = args[0]; changes++; }
      return { meta: { changes } };
    }
    if (/UPDATE scores SET hidden = \?1 WHERE id = \?2/.test(sql)) {
      const r = rows.find((x) => x.id === args[1]); if (r) r.hidden = args[0];
      return { meta: { changes: r ? 1 : 0 } };
    }
    if (/UPDATE scores SET name = \?1 WHERE id = \?2/.test(sql)) {
      const r = rows.find((x) => x.id === args[1]); if (r) r.name = args[0];
      return { meta: { changes: r ? 1 : 0 } };
    }
    if (/UPDATE scores SET ip_hash = NULL/.test(sql)) {
      rows.filter((r) => r.ip_hash && r.created_at < args[0]).forEach((r) => { r.ip_hash = null; });
      return { meta: { changes: 1 } };
    }
    if (/UPDATE scores SET quiz_answers/.test(sql)) {
      const [qa, qn, q, habit, posted, name, email, updated, week, month] = args;
      const r = rows.find((x) => x.id === args[args.length - 1]);
      if (r) Object.assign(r, { quiz_answers: qa, quiz_answered: qn, quiz: q, habit, posted, name,
        email: r.email ?? email, edits: (r.edits || 0) + 1, updated_at: updated, week, month: month ?? r.month });
      return { meta: { changes: r ? 1 : 0 } };
    }
    if (/SELECT COUNT\(\*\) AS n, COALESCE\(SUM\(hidden\), 0\)/.test(sql)) {
      return { results: [{
        n: rows.length,
        hidden: rows.filter((r) => !!r.hidden).length,
        posted: rows.filter((r) => r.posted === 1 && !r.hidden).length,
        emails: rows.filter((r) => r.email != null).length,
      }] };
    }
    if (/^\s*SELECT COUNT\(\*\) AS n FROM \(SELECT 1 FROM scores WHERE week/.test(sql)) {
      const [week, score, id] = args;
      const list = rows.filter((r) => r.week === week && !r.hidden && r.posted === 1 &&
        (r.score > score || (r.score === score && r.id < id)));
      return { results: [{ n: Math.min(list.length, 500) }] };
    }
    if (/SELECT COUNT\(\*\) AS n FROM scores WHERE hidden = 0 AND score < \?1/.test(sql))
      return { results: [{ n: rows.filter((r) => !r.hidden && (r.score || 0) < args[0]).length }] };
    if (/SELECT COUNT\(\*\) AS n FROM scores WHERE hidden = 0\s*$/.test(sql))
      return { results: [{ n: rows.filter((r) => !r.hidden).length }] };
    if (/SELECT COUNT\(\*\) AS n FROM scores WHERE/.test(sql))
      return { results: [{ n: applyAdminWhere(rows.slice(), sql, args).length }] };
    if (/SELECT DISTINCT week AS k FROM scores/.test(sql)) {
      return { results: [...new Set(rows.map((r) => r.week).filter(Boolean))].sort().reverse().map((k) => ({ k })) };
    }
    if (/SELECT DISTINCT month AS k FROM scores/.test(sql)) {
      return { results: [...new Set(rows.map((r) => r.month).filter(Boolean))].sort().reverse().map((k) => ({ k })) };
    }
    if (/SELECT COUNT\(\*\) AS scanned/.test(sql)) {
      const sample = rows.slice(-1000).filter((r) => !r.hidden);
      const tr = summarizeTrend(sample);
      return { results: [{ scanned: rows.length, games: tr.games, wise: tr.wise, risky: tr.risky, missed: tr.missed, spend: tr.spend, scam: tr.scam, delay: tr.delay, quizSum: sample.reduce((s, r) => s + (r.quiz || 0), 0), quizN: tr.quizTakers, quizPass: tr.quizPass }] };
    }
    if (/FROM (?:scores s|score_choices|score_quiz_answers)\b|json_each\(s\./.test(sql)) return { results: summaryQuery(rows, sql, args) };
    if (/SELECT COUNT\(\*\) AS n FROM admin_fails/.test(sql)) return { results: [{ n: 0 }] };
    if (/^\s*SELECT/i.test(sql)) return { results: select(sql, args) };
    return { meta: { changes: 0 } };
  };

  const stmt = (sql, args = []) => {
    const s = { sql, args, bind: (...a) => stmt(sql, a) };
    s.all = async () => run(sql, args);
    s.first = async () => { const r = run(sql, args); return r.results && r.results.length ? r.results[0] : null; };
    s.run = async () => run(sql, args);
    return s;
  };

  return {
    prepare: (sql) => stmt(sql),
    batch: async (list) => (list || []).map((s) => run(s.sql, s.args)),
    exec: async () => {},
    _rows: rows,
  };
}

const MIGRATIONS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");
const MAX_D1_PARAMS = 100;

function validateBind(sql, args) {
  if (args.length > MAX_D1_PARAMS) throw new Error("D1_ERROR: too many SQL variables");
  const stripped = sql
    .replace(/'(?:''|[^'])*'/g, "''")
    .replace(/"(?:""|[^"])*"/g, '""')
    .replace(/--[^\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");
  let anon = 0;
  for (const m of stripped.matchAll(/\?(\d+)?/g)) {
    if (m[1]) {
      const n = Number(m[1]);
      if (n < 1 || n > MAX_D1_PARAMS) throw new Error("D1_ERROR: too many SQL variables");
    } else {
      anon++;
      if (anon > MAX_D1_PARAMS) throw new Error("D1_ERROR: too many SQL variables");
    }
  }
  for (let i = 0; i < args.length; i++) {
    const v = args[i];
    const ok =
      v === null ||
      typeof v === "string" ||
      (typeof v === "number" && Number.isFinite(v)) ||
      v instanceof Uint8Array ||
      v instanceof ArrayBuffer;
    if (!ok) {
      throw new TypeError(`D1_TYPE_ERROR: Type '${v === undefined ? "undefined" : typeof v}' not supported for parameter ${i + 1}`);
    }
  }
}

export function makeSqliteDB(opts = {}) {
  const require = createRequire(import.meta.url);
  const { DatabaseSync } = require("node:sqlite");
  const rawDb = opts.readonly
    ? new DatabaseSync(opts.path || ":memory:", { readOnly: true })
    : new DatabaseSync(opts.path || ":memory:");

  const migrationList = [];
  if (opts.migrations === "0001") {
    migrationList.push(readFileSync(join(MIGRATIONS_DIR, "0001_create_scores.sql"), "utf8"));
  } else if (opts.migrations === "0001+0002") {
    migrationList.push(readFileSync(join(MIGRATIONS_DIR, "0001_create_scores.sql"), "utf8"));
    migrationList.push(readFileSync(join(MIGRATIONS_DIR, "0002_optimize_summary.sql"), "utf8"));
  } else if (Array.isArray(opts.migrations)) {
    for (const m of opts.migrations) {
      migrationList.push(m.endsWith(".sql") ? readFileSync(join(MIGRATIONS_DIR, m), "utf8") : m);
    }
  }
  if (Array.isArray(opts.sql)) migrationList.push(...opts.sql);
  for (const sqlText of migrationList) rawDb.exec(sqlText);

  const prepare = (sql) => {
    let compiled = null;
    const getStmt = () => (compiled ||= rawDb.prepare(sql));

    const makeBound = (args) => {
      const execSync = () => {
        validateBind(sql, args);
        const st = getStmt();
        if (st.columns().length > 0) {
          const results = st.all(...args).map((r) => ({ ...r }));
          return {
            results,
            success: true,
            meta: { served_by: "node:sqlite", duration: 0, changes: 0, last_row_id: 0, changed_db: false },
          };
        }
        const r = st.run(...args);
        const changes = Number(r.changes);
        return {
          results: [],
          success: true,
          meta: {
            served_by: "node:sqlite",
            duration: 0,
            changes,
            last_row_id: changes > 0 ? Number(r.lastInsertRowid) : 0,
            changed_db: changes > 0,
          },
        };
      };

      return {
        sql,
        args,
        _execSync: execSync,
        bind: (...a) => {
          validateBind(sql, a);
          return makeBound(a);
        },
        all: async () => execSync(),
        run: async () => execSync(),
        first: async (col) => {
          const r = execSync();
          const row = r.results[0] ?? null;
          if (!row) return null;
          return col !== undefined ? (Object.hasOwn(row, col) ? row[col] : null) : row;
        },
        raw: async () => execSync().results.map(Object.values),
      };
    };

    return makeBound([]);
  };

  return {
    prepare,
    batch: async (stmts) => {
      if (!stmts || !stmts.length) return [];
      rawDb.exec("SAVEPOINT d1_batch");
      try {
        const out = stmts.map((s) => s._execSync());
        rawDb.exec("RELEASE SAVEPOINT d1_batch");
        return out;
      } catch (e) {
        rawDb.exec("ROLLBACK TO SAVEPOINT d1_batch; RELEASE SAVEPOINT d1_batch");
        throw e;
      }
    },
    exec: async (sqlText) => {
      rawDb.exec(sqlText);
      return { count: 1, duration: 0 };
    },
    close: () => rawDb.close(),
    _raw: rawDb,
  };
}
