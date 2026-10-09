// Leaderboard admin: survey and decision analysis, winners to contact, CSV downloads and the games list
// (hide / unhide nicknames). Talks to /api/admin/* with the ADMIN_TOKEN. content.js (loaded first) names the quiz,
// cards and stages in the CSVs. Text always goes in with textContent / append(text), never as HTML.
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const KEY = "tff_admin_token";
  const PAGE = 100; // games per page in the table
  const ROWS = 500; // games per request while a CSV is being built
  const TOP = 20; // winners listed per week / month
  const C = window.TFF_CONTENT || { STAGES: [], TRAPS: {}, CARDS: [], QUIZ: [], HABITS: [] };
  const QN = C.QUIZ.length || 3; // questions in the quiz
  const TABS = ["survey", "decisions", "trends", "winners", "downloads", "games"];
  const WEEK = /^\d{4}-W\d{2}$/, MONTH = /^\d{4}-\d{2}$/;
  const MON = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  const HIDE_HINT = $("panelMsg").textContent;
  let token = "";
  try { token = sessionStorage.getItem(KEY) || ""; } catch {}
  let cur = { week: "", month: "" }, periods = { weeks: [], months: [] }, all = null; // current week / month, known periods, all-time summary
  let offset = 0, seen = new Set(), mails = { week: [], month: [] };
  const seq = { sum: 0, week: 0, month: 0, games: 0 }; // the newest request wins; Lock bumps them all so late answers are dropped
  // Everything that holds data or emails: emptied on Lock.
  const VIEWS = ["tiles", "kpiMore", "kpiNote", "quizBox", "scoreBox", "habitBox", "trapBox", "stageBox", "cardBox", "weekBox", "monthBox",
    "winWeekRows", "winMonthRows", "rows", "sumMsg", "dlMsg", "panelMsg", "winWeekMsg", "winMonthMsg", "winWeekInfo", "winMonthInfo", "gCount"];

  // ---------- helpers ----------
  const when = (iso) => {
    try { return new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Hong_Kong", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return iso; }
  };
  const HKT = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  function hkt(iso) { // "2026-10-09 17:38" in Hong Kong time, for the CSVs
    const t = Date.parse(iso);
    if (Number.isNaN(t)) return "";
    const p = {};
    for (const x of HKT.formatToParts(t)) p[x.type] = x.value;
    return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}`;
  }
  const fmt = (n) => (n == null ? "–" : Number(n).toLocaleString("en-US"));
  const pc = (v) => (v == null ? "–" : +Number(v).toFixed(1) + "%");
  const share = (a, b) => (b ? Math.round((1000 * a) / b) / 10 : null);
  const ratio = (a, b, what) => (b ? `${pc(share(a, b))} of ${what}` : "–");
  const weekLabel = (k) => (WEEK.test(k) ? `Week ${+k.slice(6)} (${k})` : String(k));
  const monthLabel = (k) => (MONTH.test(k) ? `${MON[+k.slice(5) - 1]} ${k.slice(0, 4)}` : String(k));
  function el(tag, cls, ...kids) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    e.append(...kids.flat().filter((k) => k != null && k !== false));
    return e;
  }
  const zh = (t) => { const s = el("small", "zh", t); s.lang = "zh-HK"; return s; };
  const meter = (v, cls) => { const i = document.createElement("i"); i.style.width = Math.min(100, v || 0) + "%"; return el("span", "meter " + (cls || ""), i); };
  // cols: [{h: header, c: class, t: tooltip}], rows: [{cls, span, cells: [text | node | [nodes]]}]; span: the first cell runs across every column
  function table(cols, rows, cls) {
    const th = (c) => { const h = el("th", c.c, c.h); h.scope = "col"; if (c.t) h.title = c.t; return h; };
    return el("table", cls, el("thead", "", el("tr", "", cols.map(th))),
      el("tbody", "", rows.map((r) => el("tr", r.cls, r.cells.map((v, i) => {
        const d = el("td", cols[i].c, v); d.dataset.label = cols[i].h;
        if (r.span && !i) d.colSpan = cols.length;
        return d;
      })))));
  }
  const say = (id, text, err) => { const m = $(id); m.textContent = text; m.className = "msg" + (err ? " err" : ""); };
  const oops = (id) => (e) => (e.code === "unauthorised" ? lock("That token is not right.", true) : say(id, e.message, true));

  async function call(path, opts = {}) {
    const r = await fetch(path, { ...opts, cache: "no-store", headers: { authorization: "Bearer " + token, ...(opts.headers || {}) } });
    if ((r.headers.get("content-type") || "").includes("text/csv") && r.ok) return r;
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || !j.ok) {
      const code = j && j.error;
      const e = new Error(
        code === "unauthorised" ? "That token is not right." :
        code === "admin_disabled" ? "Admin is off. Set a secret named ADMIN_TOKEN (16+ characters) with npm run admin-token, then try again." :
        code === "no_database" ? "No database is connected to this site yet. Deploy with npm run deploy." :
        !j ? "The API is not available here (static-only hosting)." : "Error: " + (code || r.status));
      e.code = code; throw e;
    }
    return j;
  }
  function show(unlocked) {
    $("loginCard").hidden = unlocked; $("panel").hidden = !unlocked; $("lockBtn").hidden = !unlocked;
  }
  function lock(text, err) {
    token = ""; try { sessionStorage.removeItem(KEY); } catch {}
    for (const k in seq) seq[k]++;
    for (const id of VIEWS) $(id).replaceChildren();
    all = null; mails = { week: [], month: [] }; $("copyBox").value = ""; $("copyBox").hidden = true;
    show(false); say("loginMsg", text, err);
  }

  // ---------- tabs and period selectors ----------
  function openTab(name) {
    if (!TABS.includes(name)) name = TABS[0];
    for (const t of TABS) {
      const on = t === name;
      $("tab-" + t).setAttribute("aria-selected", on); $("tab-" + t).tabIndex = on ? 0 : -1; $("pane-" + t).hidden = !on;
    }
    try { history.replaceState(null, "", "#" + name); } catch {}
  }
  function setOpts(sel, nodes, dflt) {
    const keep = sel.value;
    sel.replaceChildren(...nodes.filter(Boolean));
    sel.value = [...sel.options].some((o) => o.value === keep) ? keep : dflt;
  }
  function fillPeriods() {
    const weeks = periods.weeks.filter((k) => WEEK.test(k)), months = periods.months.filter((k) => MONTH.test(k));
    const group = (label, ks, name, text) => {
      if (!ks.length) return null;
      const g = document.createElement("optgroup"); g.label = label;
      g.append(...ks.map((k) => new Option(text(k), name + "=" + k)));
      return g;
    };
    for (const id of ["periodSel", "gPeriod"]) setOpts($(id), [new Option("All time", ""), group("Weeks", weeks, "week", weekLabel), group("Months", months, "month", monthLabel)], "");
    const withNow = (ks, now) => [...new Set([now, ...ks])].filter(Boolean).sort().reverse();
    setOpts($("winWeekSel"), withNow(weeks, cur.week).map((k) => new Option(weekLabel(k), k)), cur.week);
    setOpts($("winMonthSel"), withNow(months, cur.month).map((k) => new Option(monthLabel(k), k)), cur.month);
  }

  // ---------- survey and decision analysis ----------
  const tile = (label, value, sub, state, cls) =>
    el("div", ["tile", state && state[0], cls].filter(Boolean).join(" "), el("span", "tl", label), el("b", "", value), sub && el("span", "ts", sub),
      state && el("span", "pill " + state[0], state[1]));

  function renderSurvey(s) {
    const o = s.overview, qn = o.quizQuestions, picked = $("periodSel").selectedOptions[0];
    $("kpiPeriod").textContent = picked ? "· " + picked.textContent : "";
    const hit = o.quizPassPct == null ? null : o.quizPassPct >= o.quizTargetPct;
    $("tiles").replaceChildren(
      tile("Players", fmt(o.games), "games saved"),
      tile("On the board", fmt(o.posted), fmt(o.anonymous) + " saved anonymously"),
      tile("Quiz finished", fmt(o.quizTakers), ratio(o.quizTakers, o.games, "games")),
      tile(`Scored ${o.quizPassMark}/${qn} or better`, pc(o.quizPassPct), `${fmt(o.quizPass)} of ${fmt(o.quizTakers)} who finished · target ${o.quizTargetPct}%`,
        hit == null ? ["", "No quiz data yet"] : hit ? ["ok", "Target met ✓"] : ["bad", "Not met yet ✗"], "kpi"),
      tile("Average quiz score", o.quizAvg == null ? "–" : `${o.quizAvg}/${qn}`, "of those who finished"),
      tile(`Perfect ${qn}/${qn}`, fmt(o.quizPerfect), ratio(o.quizPerfect, o.quizTakers, "those who finished")),
      tile("Pledged a habit", pc(o.habitPct), fmt(o.habits) + " players"),
      tile("Emails left", fmt(o.emails), ratio(o.emails, o.posted, "board players")),
      tile("Wise choices", pc(o.wisePct), `${fmt(o.wise)} wise · ${fmt(o.risky)} risky · ${fmt(o.missed)} missed`));
    $("kpiMore").textContent = `Average score ${fmt(o.avgScore)} · Best score ${fmt(o.bestScore)} · Average floors ${o.avgHeight == null ? "–" : o.avgHeight}`;
    say("kpiNote", o.quizLegacy > 0
      ? `Note: ${fmt(o.quizLegacy)} older ${o.quizLegacy === 1 ? "game stored" : "games stored"} only a total quiz score, not each answer. ${o.quizLegacy === 1 ? "It counts" : "They count"} in the quiz totals and the score bars, but not in the question table.`
      : "");

    const qrows = [];
    s.quiz.forEach((q, i) => {
      qrows.push({ cls: "q", span: true, cells: [[el("b", "", `${i + 1}. ${q.en}`), q.zh && zh(q.zh), el("span", "qs", `${fmt(q.n)} answered · `, el("b", "", q.pct == null ? "–" : pc(q.pct) + " right"))]] });
      for (const op of q.options) {
        const p = share(op.n, q.n);
        qrows.push({ cls: "opt" + (op.right ? " right" : ""), cells: [
          el("div", "opt-t", el("span", "mark", op.right ? ["✓", el("span", "sr", " right answer")] : ""), el("span", "", op.en, op.zh && zh(op.zh))),
          fmt(op.n), [pc(p), meter(p, op.right ? "" : "dim")]] });
      }
    });
    $("quizBox").replaceChildren(qrows.length
      ? table([{ h: "Question / answer option", c: "t" }, { h: "Players", c: "num" }, { h: "Share", c: "num" }], qrows, "quiz")
      : el("p", "msg", "No quiz questions yet."));

    $("scoreBox").replaceChildren(
      ...s.quizScores.map((x) => el("div", "hrow", el("span", "", `${x.score}/${qn}`), meter(share(x.n, o.quizTakers), x.score >= o.quizPassMark ? "" : "pink"),
        el("span", "hv", `${fmt(x.n)} · ${pc(share(x.n, o.quizTakers))}`))),
      el("p", "hint", o.quizTakers
        ? `Out of ${fmt(o.quizTakers)} players who finished the quiz. Teal bars scored ${o.quizPassMark}/${qn} or better, which counts toward the ${o.quizTargetPct}% target.`
        : "No one has finished the quiz yet."));

    $("habitBox").replaceChildren(table([{ h: "Habit", c: "t" }, { h: "Players", c: "num" }, { h: "% of games", c: "num" }],
      s.habits.map((h) => { const p = share(h.n, o.games); return { cls: h.id ? "" : "dim", cells: [[h.en, h.zh && zh(h.zh)], fmt(h.n), [pc(p), meter(p, h.id ? "" : "dim")]] }; }), "sm"));
  }

  function renderDecisions(s) {
    const o = s.overview;
    $("trapBox").replaceChildren(table([{ h: "Trap", c: "t" }, { h: "Falls", c: "num" }, { h: "Games with one", c: "num", t: "Games with at least one fall of this kind" }, { h: "% of games", c: "num" }], [
      ...s.traps.map((t) => ({ cells: [[t.en, t.zh && zh(t.zh)], fmt(t.falls), fmt(t.games), pc(t.gamesPct)] })),
      { cls: "dim", cells: [["No falls", zh("冇中伏")], "–", fmt(o.noFallGames), pc(share(o.noFallGames, o.games))] },
    ], "sm"));
    $("stageBox").replaceChildren(table([{ h: "Stage", c: "t" }, { h: "Games", c: "num" }, { h: "% of games", c: "num" }],
      s.stages.map((x) => { const p = share(x.n, o.games); return { cells: [[x.en, x.zh && zh(x.zh)], fmt(x.n), [pc(p), meter(p)]] }; }), "sm"));
    const stage = (i) => (s.stages.find((x) => x.stage === i) || {}).en || "–";
    const trap = (id) => (s.traps.find((x) => x.id === id) || {}).en || "–";
    const sorted = s.cards.slice().sort((a, b) => (b.riskyPct ?? -1) - (a.riskyPct ?? -1) || b.n - a.n);
    $("cardBox").replaceChildren(table(
      [{ h: "#", c: "num" }, { h: "Card", c: "t" }, { h: "Life stage", c: "hide-sm" }, { h: "Trap", c: "hide-sm" }, { h: "Shown", c: "num", t: "Times the card was shown" }, { h: "Wise %", c: "num" }, { h: "Risky %", c: "num" }, { h: "Missed %", c: "num", t: "The timer ran out" }],
      sorted.map((c, i) => ({ cells: [i + 1, [c.en, c.zh && zh(c.zh), el("span", "meta", `${stage(c.stage)} · ${trap(c.trap)}`)], stage(c.stage), trap(c.trap), fmt(c.n), pc(c.wisePct),
        [el("b", "", pc(c.riskyPct)), c.riskyPct != null && meter(c.riskyPct, "pink")], pc(c.nonePct)] })), "mid cards"));
  }

  function trendTable(rows, name, label, sel, o) {
    if (!rows.length) return el("p", "msg", "No games yet.");
    return table([{ h: name, c: "t" }, { h: "Games", c: "num" }, { h: "On board", c: "num" }, { h: "Quiz finished", c: "num" },
      { h: `${o.quizPassMark}/${o.quizQuestions}+ %`, c: "num", t: `Share of those who finished the quiz and scored ${o.quizPassMark}/${o.quizQuestions} or better` },
      { h: "Avg score", c: "num" }, { h: "Wise %", c: "num" }, { h: "Emails", c: "num" }],
    rows.slice().reverse().map((r) => ({ cls: r.k === sel ? "cur" : "", cells: [label(r.k), fmt(r.games), fmt(r.posted), fmt(r.quizTakers), pc(r.quizPassPct), fmt(r.avgScore), pc(r.wisePct), fmt(r.emails)] })), "mid stack");
  }
  function renderTrends(a, q) {
    const [kind, key] = q ? q.split("=") : [];
    $("weekBox").replaceChildren(trendTable(a.byWeek, "Week", weekLabel, kind === "week" && key, a.overview));
    $("monthBox").replaceChildren(trendTable(a.byMonth, "Month", monthLabel, kind === "month" && key, a.overview));
  }

  const sumUrl = (q) => "/api/admin/summary" + (q ? "?" + q : "");
  async function loadSummary(fresh) {
    const my = ++seq.sum, q = $("periodSel").value;
    if (fresh) all = null;
    say("sumMsg", "Loading…");
    try {
      // the trends always cover every period, so a week or month view also needs the all-time numbers (kept until Refresh)
      const [s, a] = await Promise.all([call(sumUrl(q)), q && !all ? call(sumUrl("")).catch(() => null) : null]);
      if (my !== seq.sum) return;
      all = q ? a || all : s;
      cur = s.current; periods = s.periods;
      fillPeriods(); renderSurvey(s); renderDecisions(s);
      if (all) renderTrends(all, q);
      say("sumMsg", "");
    } catch (e) { if (my === seq.sum) oops("sumMsg")(e); }
  }

  // ---------- winners (private contact list) ----------
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch {}
    let ok = false;
    const t = el("textarea", "sr"); t.value = text; t.readOnly = true; document.body.append(t); t.select();
    try { ok = document.execCommand("copy"); } catch {}
    t.remove();
    return ok;
  }
  async function copy(text, btn, msgId, what) {
    btn.dataset.label = btn.dataset.label || btn.textContent;
    const ok = await copyText(text), box = $("copyBox");
    if (ok) {
      box.hidden = true; say(msgId, "Copied " + what + ".");
      btn.textContent = "Copied ✓"; setTimeout(() => (btn.textContent = btn.dataset.label), 1500);
    } else { // no clipboard access: show the text selected, ready for Ctrl+C
      box.value = text; box.hidden = false; box.focus(); box.select();
      say(msgId, "This browser blocked copying. The text is selected below: press Ctrl+C (Cmd+C on a Mac).", true);
    }
  }
  async function loadWinners(kind) {
    const my = ++seq[kind], K = kind === "week" ? "winWeek" : "winMonth";
    try {
      const j = await call(`/api/admin/winners?${kind}=${encodeURIComponent($(K + "Sel").value || cur[kind])}&limit=${TOP}`);
      if (my !== seq[kind]) return;
      const key = (r) => String(r.email || "").trim().toLowerCase(), times = new Map(), uniq = new Map();
      for (const r of j.rows) if (key(r)) { times.set(key(r), (times.get(key(r)) || 0) + 1); if (!uniq.has(key(r))) uniq.set(key(r), r.email.trim()); }
      mails[kind] = [...uniq.values()];
      const rows = j.rows.map((r, i) => {
        const n = times.get(key(r)) || 0, mail = key(r) && r.email.trim(), b = el("button", "ghost mini", "Copy");
        b.title = "Copy this email"; b.setAttribute("aria-label", "Copy email of " + r.name); b.addEventListener("click", () => copy(mail, b, K + "Msg", mail));
        const floors = Number(r.height).toFixed(1), saved = when(r.created_at); // on a phone these two sit under the nickname
        return el("tr", "", el("td", "num", i + 1), el("td", "n", r.name, n > 1 && el("span", "pill rep", `repeat ×${n}`), el("span", "meta", `${floors} floors · ${saved}`)),
          el("td", "num", fmt(r.score)), el("td", "num hide-sm", floors), el("td", "hide-sm", saved), el("td", "mail", mail ? [mail + " ", b] : "—"));
      });
      if (!rows.length) { const td = el("td", "t", "Nobody has posted a score in this period yet."); td.colSpan = 6; rows.push(el("tr", "", td)); }
      $(K + "Rows").replaceChildren(...rows);
      $(K + "Copy").disabled = !mails[kind].length;
      $(K + "Info").textContent = mails[kind].length ? `${mails[kind].length} unique ${mails[kind].length === 1 ? "email" : "emails"}` : "No emails yet";
      say(K + "Msg", "");
    } catch (e) { if (my === seq[kind]) oops(K + "Msg")(e); }
  }

  // ---------- CSV downloads, built here from /api/admin/rows ----------
  const BOM = String.fromCharCode(0xFEFF); // so Excel reads the file as UTF-8
  const csvCell = (v) => {
    let s = v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; // keeps spreadsheet apps from running formulas (same as the server export)
    return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  const csv = (head, rows) => BOM + [head, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";
  const list = (text) => { try { const v = JSON.parse(text || "[]"); return Array.isArray(v) ? v.filter((x) => x && typeof x === "object") : []; } catch { return []; } };
  const stageName = (i) => (C.STAGES[i] || {}).en || "";
  const choice = (c) => (c.pick === "none" ? "missed" : c.pick);
  const lead = (r) => [r.id, hkt(r.created_at), r.week, r.month, r.posted ? 1 : 0]; // game_id, saved_hkt, week, month, on_board

  function gamesCsv(rows) {
    const pass = Math.ceil((QN * 2) / 3); // same rule as the server: 2 of 3
    const head = ["game_id", "saved_hkt", "week", "month", "on_board", "hidden", "nickname", "email", "score", "floors", "life_stage", "ended", "items_dropped",
      "wise_picks", "risky_picks", "missed_picks", "fall_overspending", "fall_scams", "fall_putting_off_saving", "habit_id", "habit", "quiz_answered", "quiz_correct", "quiz_2plus",
      ...C.QUIZ.flatMap((q) => ["q_" + q.id, "q_" + q.id + "_correct"]), ...C.CARDS.map((c) => "card_" + c.id)];
    return csv(head, rows.map((r) => {
      const answers = new Map(list(r.quiz_answers).map((a) => [a.q, a])), picks = new Map();
      for (const c of list(r.choices)) if (!picks.has(c.card)) picks.set(c.card, choice(c));
      const done = r.quiz_answered === QN || (r.quiz_answered == null && r.quiz != null); // older games kept only the score
      return [...lead(r), r.hidden ? 1 : 0, r.posted ? r.name : "", r.email, r.score, r.height, stageName(r.stage), r.ended, r.drops,
        r.wise, r.risky, r.missed, r.fall_spend, r.fall_scam, r.fall_delay, r.habit, (C.HABITS.find((h) => h.id === r.habit) || {}).en,
        r.quiz_answered, r.quiz, done ? (r.quiz >= pass ? 1 : 0) : "",
        ...C.QUIZ.flatMap((q) => { const a = answers.get(q.id); return a ? [(q.o[a.pick] || [])[0], (a.ok ?? a.pick === q.a) ? 1 : 0] : ["", ""]; }),
        ...C.CARDS.map((c) => picks.get(c.id))];
    }));
  }
  function answersCsv(rows) {
    const head = ["game_id", "saved_hkt", "week", "month", "on_board", "question_no", "question_id", "question", "answer_no", "answer", "correct"];
    return csv(head, rows.flatMap((r) => list(r.quiz_answers).map((a) => {
      const i = C.QUIZ.findIndex((q) => q.id === a.q), q = C.QUIZ[i];
      return [...lead(r), i < 0 ? "" : i + 1, a.q, q ? q.q[0] : "", Number.isInteger(a.pick) ? a.pick + 1 : "", q && q.o[a.pick] ? q.o[a.pick][0] : "", (a.ok ?? (q && a.pick === q.a)) ? 1 : 0];
    })));
  }
  function eventsCsv(rows) {
    const head = ["game_id", "saved_hkt", "week", "month", "on_board", "order", "card_id", "card", "life_stage", "trap", "choice"], byId = new Map(C.CARDS.map((c) => [c.id, c]));
    return csv(head, rows.flatMap((r) => list(r.choices).map((c, i) => {
      const card = byId.get(c.card);
      return [...lead(r), i + 1, c.card, card ? card.tag[0] : "", card ? stageName(card.st) : "", card ? (C.TRAPS[card.trap] || {}).en : "", choice(c)];
    })));
  }
  async function allRows(progress) { // every game, page by page
    const rows = [];
    for (let after = 0; ;) {
      const j = await call(`/api/admin/rows?limit=${ROWS}&after=${after}`);
      rows.push(...j.rows); progress(rows.length);
      if (j.next == null || j.next <= after) return rows;
      after = j.next;
    }
  }
  function saveBlob(blob, name) {
    const a = el("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  const DOWNLOADS = [["dlGames", "games", gamesCsv], ["dlAnswers", "quiz-answers", answersCsv], ["dlEvents", "life-events", eventsCsv]];
  const busy = (on) => { for (const id of ["dlGames", "dlAnswers", "dlEvents", "csvBtn"]) $(id).disabled = on; };
  for (const [btn, file, build] of DOWNLOADS) {
    $(btn).addEventListener("click", async () => {
      if (!window.TFF_CONTENT) return say("dlMsg", "The game content file did not load, so the labels are missing. Reload this page.", true);
      busy(true); say("dlMsg", "Loading games…");
      try {
        const rows = await allRows((n) => say("dlMsg", `Loading ${fmt(n)} games…`));
        say("dlMsg", `Building the file from ${fmt(rows.length)} games…`);
        const name = `3-fall-fun-${file}-${hkt(new Date().toISOString()).slice(0, 10)}.csv`;
        saveBlob(new Blob([build(rows)], { type: "text/csv;charset=utf-8" }), name);
        say("dlMsg", `Saved ${name} (${fmt(rows.length)} games).`);
      } catch (e) { oops("dlMsg")(e); }
      busy(false);
    });
  }
  $("csvBtn").addEventListener("click", async () => {
    busy(true);
    try {
      const r = await call("/api/admin/export");
      saveBlob(await r.blob(), ((r.headers.get("content-disposition") || "").match(/filename="([^"]+)"/) || [])[1] || "3-fall-fun-scores.csv");
    } catch (e) { oops("dlMsg")(e); }
    busy(false);
  });

  // ---------- games table ----------
  const quizText = (r) => (r.quiz == null ? "–" : `${r.quiz}/${QN}` + (r.quiz_answered != null && r.quiz_answered < QN ? ` (${r.quiz_answered} answered)` : ""));
  function stats(j) {
    cur = { week: j.week, month: j.month };
    $("sTotal").textContent = fmt(j.total); $("sHidden").textContent = fmt(j.hiddenTotal); $("sBoard").textContent = fmt(j.postedTotal);
    $("sEmail").textContent = fmt(j.emailTotal); $("sWeek").textContent = j.week;
  }
  function afterHide() { // hidden games drop out of the stats, the trends and the winners
    call("/api/admin/scores?limit=1").then(stats).catch(oops("panelMsg"));
    loadSummary(true); loadWinners("week"); loadWinners("month");
  }
  function gameRow(r) {
    const tr = el("tr", r.hidden ? "hidden" : "");
    const td = (v, cls, title) => { const c = el("td", cls, v); if (title) c.title = title; tr.append(c); };
    td(r.id, "num"); td(when(r.created_at)); td(r.week);
    td(r.posted ? r.name : "–", "n", r.posted ? r.name : "Saved anonymously");
    td(r.email || "–", "em", r.email || "");
    td(el("span", "pill" + (r.posted ? " board" : ""), r.posted ? "on board" : "anonymous"));
    td(fmt(r.score), "num"); td(Number(r.height).toFixed(1), "num");
    td(`${r.wise} / ${r.risky} / ${r.missed}`, "num"); td(r.habit || "–"); td(quizText(r), "num w"); td(r.ended || "–");
    td(el("span", "pill" + (r.hidden ? " h" : ""), r.hidden ? "hidden" : "shown"));
    const b = el("button", r.hidden ? "show" : "hide", r.hidden ? "Unhide" : "Hide");
    b.addEventListener("click", async () => {
      b.disabled = true;
      try {
        await call("/api/admin/hide", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: r.id, hidden: !r.hidden }) });
        r.hidden = r.hidden ? 0 : 1; tr.replaceWith(gameRow(r)); afterHide();
      } catch (e) { oops("panelMsg")(e); b.disabled = false; }
    });
    td(b);
    return tr;
  }
  async function loadGames(reset) { // false when a newer request or Lock got in first
    const my = ++seq.games;
    if (reset) { offset = 0; seen = new Set(); }
    const q = new URLSearchParams({ limit: PAGE, offset }), [k, v] = $("gPeriod").value.split("=");
    if (v) q.set(k, v);
    if ($("gBoard").value) q.set("board", $("gBoard").value);
    const j = await call("/api/admin/scores?" + q);
    if (my !== seq.games) return false;
    stats(j);
    if (reset) $("rows").replaceChildren();
    for (const r of j.rows) if (!seen.has(r.id)) { seen.add(r.id); $("rows").append(gameRow(r)); } // new games can shift the pages: skip repeats
    offset += j.rows.length;
    $("moreBtn").hidden = j.rows.length < PAGE;
    if (reset && !j.rows.length) { const c = el("td", "", "No games match."); c.colSpan = 14; $("rows").append(el("tr", "", c)); }
    $("gCount").textContent = seen.size ? `Showing ${fmt(seen.size)} ${seen.size === 1 ? "game" : "games"}` : "";
    return true;
  }

  // ---------- start-up and events ----------
  async function unlock() {
    try { if (!(await loadGames(true))) return; }
    catch (e) {
      show(false); say("loginMsg", e.message, true);
      if (e.code === "unauthorised") { token = ""; try { sessionStorage.removeItem(KEY); } catch {} }
      return;
    }
    show(true); say("panelMsg", HIDE_HINT);
    fillPeriods(); openTab(location.hash.slice(1));
    loadSummary(); loadWinners("week"); loadWinners("month");
  }
  $("loginForm").addEventListener("submit", (ev) => {
    ev.preventDefault(); token = $("token").value.trim(); $("token").value = "";
    try { sessionStorage.setItem(KEY, token); } catch {}
    unlock();
  });
  $("lockBtn").addEventListener("click", () => lock("Locked."));
  $("periodSel").addEventListener("change", () => loadSummary());
  $("refreshBtn").addEventListener("click", () => { loadGames(true).catch(oops("panelMsg")); loadSummary(true); loadWinners("week"); loadWinners("month"); });
  for (const t of TABS) $("tab-" + t).addEventListener("click", () => openTab(t));
  $("tabs").addEventListener("keydown", (ev) => { // arrow keys move between tabs
    const i = TABS.findIndex((t) => $("tab-" + t) === document.activeElement);
    const to = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: TABS.length - 1 }[ev.key];
    if (i < 0 || to == null) return;
    ev.preventDefault(); const t = TABS[(to + TABS.length) % TABS.length]; openTab(t); $("tab-" + t).focus();
  });
  window.addEventListener("hashchange", () => { if (!$("panel").hidden) openTab(location.hash.slice(1)); });
  for (const [kind, K] of [["week", "winWeek"], ["month", "winMonth"]]) {
    $(K + "Sel").addEventListener("change", () => loadWinners(kind));
    $(K + "Copy").addEventListener("click", () => { const n = mails[kind].length; copy(mails[kind].join("; "), $(K + "Copy"), K + "Msg", n + (n === 1 ? " email" : " emails")); });
  }
  for (const id of ["gPeriod", "gBoard"]) $(id).addEventListener("change", () => loadGames(true).catch(oops("panelMsg")));
  $("moreBtn").addEventListener("click", async () => {
    $("moreBtn").disabled = true;
    try { await loadGames(false); } catch (e) { oops("panelMsg")(e); }
    $("moreBtn").disabled = false;
  });
  if (token) unlock(); else show(false);
})();
