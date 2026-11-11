// A small in-memory stand-in for D1, storing real rows in a `scores` table. It implements only the statements
// server/api.js issues, matched on their shape -- enough to test ordering, ranking, uniqueness, the rate limit
// and what the board exposes, without a database.
const COLS = ["id", "gid", "edit_hash", "name", "email", "score", "stage", "height", "drops", "wise", "risky",
  "missed", "fall_spend", "fall_scam", "fall_delay", "choices", "habit", "quiz", "quiz_answered", "quiz_answers",
  "ended", "week", "month", "persona", "ip_hash", "posted", "hidden", "created_at", "updated_at", "edits"];

export function makeStore() {
  const rows = [];
  let seq = 0;

  const select = (sql, args) => {
    let list = rows.slice();
    if (/WHERE gid = \?1/.test(sql)) list = list.filter((r) => r.gid === args[0]);
    if (/month IS NULL/.test(sql)) list = list.filter((r) => r.month == null);
    if (/WHERE week = \?1/.test(sql)) list = list.filter((r) => r.week === args[0]);
    if (/hidden = 0/.test(sql)) list = list.filter((r) => !r.hidden);
    if (/posted = 1/.test(sql)) list = list.filter((r) => r.posted === 1);
    if (/score < \?1/.test(sql)) list = list.filter((r) => (r.score || 0) < args[0]);
    if (/ORDER BY score DESC, id ASC/.test(sql)) list.sort((a, b) => (b.score - a.score) || (a.id - b.id));
    const lim = /LIMIT (\d+)/.exec(sql);
    if (lim) list = list.slice(0, +lim[1]);
    // honour the SELECT list, including aliases: a row must carry only what was asked for (never, for example,
    // the email, which the public board deliberately does not project)
    const proj = /SELECT (.+?) FROM scores/.exec(sql);
    if (proj && !/COUNT\(/i.test(proj[1])) {
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
    if (/^(CREATE|ALTER|DROP)/i.test(sql)) return { meta: { changes: 0 } };
    if (/INSERT INTO scores/.test(sql)) return { meta: insert(sql, args) };
    if (/UPDATE scores SET month = \?1 WHERE id = \?2/.test(sql)) {
      const r = rows.find((x) => x.id === args[1]); if (r) r.month = args[0];
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
    if (/^\s*SELECT COUNT\(\*\) AS n FROM \(SELECT 1 FROM scores WHERE week/.test(sql)) {
      const [week, score, id] = args;
      const list = rows.filter((r) => r.week === week && !r.hidden && r.posted === 1 &&
        (r.score > score || (r.score === score && r.id < id)));
      return { results: [{ n: Math.min(list.length, 500) }] };
    }
    if (/SELECT COUNT\(\*\) AS n FROM scores WHERE hidden = 0 AND score < \?1/.test(sql))
      return { results: [{ n: rows.filter((r) => !r.hidden && (r.score || 0) < args[0]).length }] };
    if (/SELECT COUNT\(\*\) AS n FROM scores WHERE hidden = 0/.test(sql))
      return { results: [{ n: rows.filter((r) => !r.hidden).length }] };
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
