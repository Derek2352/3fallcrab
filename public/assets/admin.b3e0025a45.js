(() => {
"use strict";
{
const m = document.querySelector('meta[name="site"]'), home = m && /^https:\/\/([^/]+)/.exec(m.content || "");
if (location.protocol === "http:" && home && (location.host === home[1] || location.host === "www." + home[1])) {
location.replace("https://" + location.host + location.pathname + location.search + location.hash); return;
}
}
const $ = (id) => document.getElementById(id);
const KEY = "tff_admin_token";
const PAGE = 100;
const ROWS = 500;
const TOP = 20;
const ANON = "Anonymous crab 匿名蟹";
const C = window.TFF_CONTENT || { STAGES: [], TRAPS: {}, CARDS: [], QUIZ: [], HABITS: [] };
const QN = C.QUIZ.length || 3;
const TABS = ["survey", "decisions", "trends", "daily", "winners", "downloads", "games"];
const WEEK = /^\d{4}-W\d{2}$/, MONTH = /^\d{4}-\d{2}$/;
const MON = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
const HIDE_HINT = $("panelMsg").textContent;
let token = "";
try { token = sessionStorage.getItem(KEY) || ""; } catch { }
let cur = { week: "", month: "" }, periods = { weeks: [], months: [] }, all = null, lastSum = null;
let nextBefore = null, seen = new Set(), selected = new Set(), mails = { week: [], month: [], daily: [] };
let dailyBefore = null, dailySeen = new Set();
const seq = { sum: 0, week: 0, month: 0, games: 0, daily: 0 };
const VIEWS = ["tiles", "kpiMore", "kpiNote", "quizBox", "scoreBox", "habitBox", "trapBox", "stageBox", "trollBox", "powerBox", "cardBox", "trendChartBox", "weekBox", "monthBox",
"dailyTiles", "dailyMsg", "dailyChartBox", "dailyFunnelBox", "dailyFinBox", "dailyFinInfo", "dailyFinMsg", "dailyQBox", "dailyRows", "dailyModMsg", "dailyCount",
"winWeekRows", "winMonthRows", "rows", "sumMsg", "dlMsg", "panelMsg", "winWeekMsg", "winMonthMsg", "winWeekInfo", "winMonthInfo", "gCount", "trafficInfo", "trafficMsg"];
const when = (iso) => {
try { return new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Hong_Kong", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }
catch { return iso; }
};
const hkt = (iso) => { const t = Date.parse(iso); return Number.isNaN(t) ? "" : new Date(t + 8 * 3600e3).toISOString().slice(0, 16).replace("T", " "); };
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
const hadFocusInPanel = ($("panel") && $("panel").contains(document.activeElement)) || $("lockBtn").contains(document.activeElement);
token = ""; try { sessionStorage.removeItem(KEY); } catch { }
for (const k in seq) seq[k]++;
for (const id of VIEWS) $(id).replaceChildren();
all = null; lastSum = null; selected.clear(); mails = { week: [], month: [], daily: [] }; dailySeen.clear(); dailyBefore = null; $("copyBox").value = ""; $("copyBox").hidden = true; if ($("batchBar")) $("batchBar").hidden = true;
show(false); say("loginMsg", text, err);
if (hadFocusInPanel || document.activeElement === document.body) $("token").focus({ preventScroll: true });
}
function openTab(name) {
if (!TABS.includes(name)) name = TABS[0];
for (const t of TABS) {
const on = t === name;
$("tab-" + t).setAttribute("aria-selected", on); $("tab-" + t).tabIndex = on ? 0 : -1; $("pane-" + t).hidden = !on;
}
try { history.replaceState(null, "", "#" + name); } catch { }
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
for (const id of ["periodSel", "gPeriod", "dlPeriod"]) setOpts($(id), [new Option("All time", ""), group("Weeks", weeks, "week", weekLabel), group("Months", months, "month", monthLabel)], "");
const withNow = (ks, now) => [...new Set([now, ...ks])].filter(Boolean).sort().reverse();
setOpts($("winWeekSel"), withNow(weeks, cur.week).map((k) => new Option(weekLabel(k), k)), cur.week);
setOpts($("winMonthSel"), withNow(months, cur.month).map((k) => new Option(monthLabel(k), k)), cur.month);
}
const tile = (label, value, sub, state, cls) =>
el("div", ["tile", state && state[0], cls].filter(Boolean).join(" "), el("span", "tl", label), el("b", "", value), sub && el("span", "ts", sub),
state && el("span", "pill " + state[0], state[1]));
function fromLinks(o) {
const t = tile("From shared links ", fmt(o.via_c || 0), ratio(o.via_c || 0, o.games, "games"));
t.firstChild.append(zh("經分享連結"));
return t;
}
const personaName = (k) => { const P = C.PERSONAS || { bg: {}, pe: {} }, [b, p] = String(k || "").split("+"); return P.bg[b] && P.pe[p] ? { zh: P.bg[b].zh + P.pe[p].zh, en: P.bg[b].en + " × " + P.pe[p].en } : null; };
function personas(o) {
const all = Object.entries(o.personas || {}).filter(([k]) => personaName(k)), total = all.reduce((n, [, v]) => n + v, 0);
const top = all.sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, 3);
const big = el("b", "", top.length ? personaName(top[0][0]).zh : "–"); if (top.length) big.lang = "zh-HK";
const t = el("div", "tile", el("span", "tl", "Rolled as ", zh("抽到嘅身份")), big);
if (!top.length) t.append(el("span", "ts", "no data yet"));
for (const [k, n] of top) t.append(el("span", "ts", zh(personaName(k).zh), ` ${personaName(k).en} · ${fmt(n)} (${pc(Math.round(1000 * n / total) / 10)})`));
return t;
}
function titles(o) {
const T = new Map((C.TITLES || []).map((t) => [t.id, t])), all = Object.entries(o.titles || {}).filter(([k]) => T.has(k)), total = all.reduce((n, [, v]) => n + v, 0);
const top = all.sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, 3);
const big = el("b", "", top.length ? T.get(top[0][0]).zh : "–"); if (top.length) big.lang = "zh-HK";
const t = el("div", "tile", el("span", "tl", "Titles ", zh("稱號")), big);
if (!top.length) t.append(el("span", "ts", "no data yet"));
for (const [k, n] of top) t.append(el("span", "ts", zh(T.get(k).zh), ` ${T.get(k).en} · ${fmt(n)} (${pc(Math.round(1000 * n / total) / 10)})`));
return t;
}
function moneyTypes(o) {
const T = C.TYPES || {}, all = Object.entries(o.types || {}).filter(([k]) => T[k]), total = all.reduce((n, [, v]) => n + v, 0);
const top = all.sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1)).slice(0, 3);
const t = el("div", "tile", el("span", "tl", "Money types ", zh("理財性格")), el("b", "", top.length ? top[0][0] : "–"));
if (!top.length) t.append(el("span", "ts", "no data yet"));
for (const [k, n] of top) {
t.append(el("span", "ts", `${k} ${T[k].en} `, zh(T[k].zh), ` · ${fmt(n)} (${pc(Math.round(1000 * n / total) / 10)})`));
}
return t;
}
function renderSurvey(s) {
const o = s.overview, qn = o.quizQuestions, picked = $("periodSel").selectedOptions[0];
$("kpiPeriod").textContent = picked ? "· " + picked.textContent : "";
const hit = o.quizPassPct == null ? null : o.quizPassPct >= o.quizTargetPct;
$("tiles").replaceChildren(
tile("Games", fmt(o.games), "games saved"),
tile("Jack / Jackie", `${fmt(o.jack || 0)} / ${fmt(o.jackie || 0)}`, ratio(o.jackie || 0, (o.jack || 0) + (o.jackie || 0), "who chose")),
titles(o),
personas(o),
...(Object.keys(o.types || {}).length ? [moneyTypes(o)] : []),
fromLinks(o),
tile("On the board", fmt(o.posted), fmt(o.anonymous) + " saved anonymously"),
tile("Quiz finished", fmt(o.quizTakers), ratio(o.quizTakers, o.games, "games")),
tile(`Scored ${o.quizPassMark}/${qn} or better`, pc(o.quizPassPct), `${fmt(o.quizPass)} of ${fmt(o.quizTakers)} who finished · target ${o.quizTargetPct}%`,
hit == null ? ["", "No quiz data yet"] : hit ? ["ok", "Target met ✓"] : ["bad", "Not met yet ✗"], "kpi"),
tile(`First try: ${o.quizPassMark}/${qn} or better`, pc(o.quizFirstPct), `${fmt(o.quizFirstPass)} of ${fmt(o.quizFirst)} first quizzes on a device` +
(o.quizTakers > o.quizPriorKnown ? ` · ${fmt(o.quizTakers - o.quizPriorKnown)} older ${o.quizTakers - o.quizPriorKnown === 1 ? "game" : "games"} not counted` : "")),
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
qrows.push({
cls: "q", span: true, cells: [[el("b", "", `${i + 1}. ${q.en}`), q.zh && zh(q.zh), el("span", "qs", `${fmt(q.n)} answered · `, el("b", "", q.pct == null ? "–" : pc(q.pct) + " right"),
q.earlier ? ` · includes ${fmt(q.earlier)} ${q.earlier === 1 ? "answer" : "answers"} to the earlier question (${q.was}), grouped right to right, wrong to wrong` : "")]]
});
for (const op of q.options) {
const p = share(op.n, q.n);
qrows.push({
cls: "opt" + (op.right ? " right" : ""), cells: [
el("div", "opt-t", el("span", "mark", op.right ? ["✓", el("span", "sr", " right answer")] : ""), el("span", "", op.en, op.zh && zh(op.zh))),
fmt(op.n), [pc(p), meter(p, op.right ? "ok" : "dim")]]
});
}
});
$("quizBox").replaceChildren(qrows.length
? table([{ h: "Question / answer option", c: "t" }, { h: "Players", c: "num" }, { h: "Share", c: "num" }], qrows, "quiz")
: el("p", "msg", "No quiz questions yet."));
$("scoreBox").replaceChildren(
...s.quizScores.map((x) => el("div", "hrow", el("span", "", `${x.score}/${qn}`), meter(share(x.n, o.quizTakers), x.score >= o.quizPassMark ? "ok" : "pink"),
el("span", "hv", `${fmt(x.n)} · ${pc(share(x.n, o.quizTakers))}`))),
el("p", "hint", o.quizTakers
? `Out of ${fmt(o.quizTakers)} players who finished the quiz. Green bars scored ${o.quizPassMark}/${qn} or better, which counts toward the ${o.quizTargetPct}% target.`
: "No one has finished the quiz yet."));
$("habitBox").replaceChildren(table([{ h: "Habit", c: "t" }, { h: "Players", c: "num" }, { h: "% of games", c: "num" }],
s.habits.map((h) => { const p = share(h.n, o.games); return { cls: h.id ? "" : "dim", cells: [[h.en, h.zh && zh(h.zh), h.earlier ? el("span", "qs", ` includes ${fmt(h.earlier)} for the earlier pledge (${h.was})`) : ""], fmt(h.n), [pc(p), meter(p, h.id ? "" : "dim")]] }; }), "sm"));
}
function renderDecisions(s) {
const o = s.overview;
$("trapBox").replaceChildren(table([{ h: "Trap", c: "t" }, { h: "Falls", c: "num" }, { h: "Games with one", c: "num", t: "Games with at least one fall of this kind" }, { h: "% of games", c: "num" }], [
...s.traps.map((t) => ({ cells: [[t.en, t.zh && zh(t.zh)], fmt(t.falls), fmt(t.games), pc(t.gamesPct)] })),
{ cls: "dim", cells: [["No falls", zh("冇中伏")], "–", fmt(o.noFallGames), pc(share(o.noFallGames, o.games))] },
], "sm"));
$("stageBox").replaceChildren(table([{ h: "Stage", c: "t" }, { h: "Games", c: "num" }, { h: "% of games", c: "num" }],
s.stages.map((x) => { const p = share(x.n, o.games); return { cells: [[x.en, x.zh && zh(x.zh)], fmt(x.n), [pc(p), meter(p)]] }; }), "sm"));
const tr = s.trolls || {}, ti = tr.invest || {}, tt = tr.tickets || {}, rv = tr.revive || {};
$("trollBox").replaceChildren(table([
{ h: "Temptation", c: "t" },
{ h: "Offered", c: "num" },
{ h: "Fell for it", c: "num" },
{ h: "% fell", c: "num" },
], [
{ cells: [["“Guaranteed 30%” scam", zh("炒幣/投資騙局"), ti.fee ? el("span", "qs", `${fmt(ti.fee)} also paid HK$1,000 release fee`) : ""], fmt(ti.seen || 0), fmt(ti.invested || 0), [pc(ti.hitPct), ti.hitPct != null && meter(ti.hitPct, "pink")]] },
{ cells: [["Lucky scratch card", zh("幸運刮刮卡"), tt.cards ? el("span", "qs", `${fmt(tt.cards)} total cards bought`) : ""], fmt(tt.seen || 0), fmt(tt.bought || 0), [pc(tt.hitPct), tt.hitPct != null && meter(tt.hitPct, "pink")]] },
{ cells: [["Fake revive", zh("假復活")], fmt(rv.seen || 0), fmt(rv.pressed || 0), [pc(rv.hitPct), rv.hitPct != null && meter(rv.hitPct, "pink")]] },
], "sm"));
const pws = (s.powers || []).slice().sort((a, b) => b.n - a.n), pwTot = pws.reduce((n, x) => n + x.n, 0);
$("powerBox").replaceChildren(pwTot
? table([{ h: "Reward", c: "t" }, { h: "Picked", c: "num" }, { h: "Share", c: "num" }],
pws.map((x) => { const p = share(x.n, pwTot); return { cells: [[x.en, x.zh && zh(x.zh)], fmt(x.n), [pc(p), meter(p, "ok")]] }; }), "sm")
: el("p", "msg", "No reward picks recorded yet."));
const stage = (i) => (s.stages.find((x) => x.stage === i) || {}).en || "–";
const trap = (id) => (s.traps.find((x) => x.id === id) || {}).en || "–";
const unseen = s.cards.filter((c) => c.who && !c.n).length;
const sorted = s.cards.filter((c) => !c.who || c.n).sort((a, b) => (b.riskyPct ?? -1) - (a.riskyPct ?? -1) || b.n - a.n);
const P = C.PERSONAS || { bg: {}, pe: {} }, whoLabel = (w) => w.split("+").map((k) => (P.bg[k] || P.pe[k] || { zh: k }).zh).join("");
$("cardBox").replaceChildren(table(
[{ h: "#", c: "num" }, { h: "Card", c: "t" }, { h: "Life stage", c: "hide-sm" }, { h: "Trap", c: "hide-sm" }, { h: "Shown", c: "num", t: "Times the card was shown" }, { h: "Wise %", c: "num" }, { h: "Risky %", c: "num" }, { h: "Missed %", c: "num", t: "The timer ran out" }],
sorted.map((c, i) => ({
cells: [i + 1, [c.en, c.zh && zh(c.zh), el("span", "meta", `${stage(c.stage)} · ${trap(c.trap)}` + (c.who ? ` · for ${whoLabel(c.who)}` : ""))], stage(c.stage), trap(c.trap), fmt(c.n), pc(c.wisePct),
[el("b", "", pc(c.riskyPct)), c.riskyPct != null && meter(c.riskyPct, "pink")], pc(c.nonePct)]
})), "mid cards"));
if (unseen) $("cardBox").append(el("p", "msg", `${fmt(unseen)} cards for rolled types haven't come up in this period yet.`));
}
function trendTable(rows, name, label, sel, o) {
if (!rows.length) return el("p", "msg", "No games yet.");
return table([{ h: name, c: "t" }, { h: "Games", c: "num" }, { h: "On board", c: "num" }, { h: "Quiz finished", c: "num" },
{ h: `${o.quizPassMark}/${o.quizQuestions}+ %`, c: "num", t: `Share of those who finished the quiz and scored ${o.quizPassMark}/${o.quizQuestions} or better` },
{ h: "Avg score", c: "num" }, { h: "Wise %", c: "num" }, { h: "Emails", c: "num" }],
rows.slice().reverse().map((r) => ({ cls: r.k === sel ? "cur" : "", cells: [label(r.k), fmt(r.games), fmt(r.posted), fmt(r.quizTakers), pc(r.quizPassPct), fmt(r.avgScore), pc(r.wisePct), fmt(r.emails)] })), "mid stack");
}
function renderTrendChart(rows, targetPct = 70) {
if (!rows || !rows.length) return el("p", "msg", "No weekly chart data yet.");
const data = rows.slice(-12);
const W = 640, H = 190, L = 40, R = 40, T = 16, B = 32, cw = W - L - R, ch = H - T - B;
const maxG = Math.max(1, ...data.map((r) => r.games || 0));
const NS = "http://www.w3.org/2000/svg";
const s = (tag, attrs, ...kids) => {
const node = document.createElementNS(NS, tag);
for (const [k, v] of Object.entries(attrs || {})) if (v != null) node.setAttribute(k, String(v));
node.append(...kids.filter(Boolean));
return node;
};
const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Weekly games played and quiz pass rate chart" });
for (const p of [0, 50, 100]) {
const y = T + ch - (ch * p) / 100;
svg.append(s("line", { x1: L, y1: y, x2: W - R, y2: y, stroke: "#EADBC4", "stroke-width": 1 }));
svg.append(s("text", { x: W - R + 6, y: y + 4, fill: "#5B516C", "font-size": 10 }, p + "%"));
}
const ty = T + ch - (ch * targetPct) / 100;
svg.append(s("line", { x1: L, y1: ty, x2: W - R, y2: ty, stroke: "#2F9A4C", "stroke-dasharray": "4 4", "stroke-width": 1.5 }));
svg.append(s("text", { x: L - 6, y: T + 8, "text-anchor": "end", fill: "#5B516C", "font-size": 10 }, maxG));
svg.append(s("text", { x: L - 6, y: T + ch + 4, "text-anchor": "end", fill: "#5B516C", "font-size": 10 }, 0));
const step = cw / data.length, bw = Math.min(28, Math.max(10, step * 0.56)), pts = [];
data.forEach((r, i) => {
const cx = L + step * (i + 0.5), bh = (ch * (r.games || 0)) / maxG, by = T + ch - bh;
const tip = `${weekLabel(r.k)}: ${fmt(r.games)} games · quiz 2/3+ ${pc(r.quizPassPct)}`;
svg.append(s("rect", { x: cx - bw / 2, y: by, width: bw, height: Math.max(2, bh), rx: 4, fill: "#0E7C73", opacity: 0.78 }, s("title", null, tip)));
svg.append(s("text", { x: cx, y: H - 10, "text-anchor": "middle", fill: "#5B516C", "font-size": 10 }, String(r.k).replace(/^\d{4}-/, "")));
if (r.quizPassPct != null) {
const py = T + ch - (ch * Math.min(100, Math.max(0, r.quizPassPct))) / 100;
pts.push([cx, py, tip, r.quizPassPct]);
}
});
if (pts.length > 1) {
const ptsAttr = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
svg.append(s("polyline", { fill: "none", stroke: "#fff", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round", points: ptsAttr }));
svg.append(s("polyline", { fill: "none", stroke: "#E8418B", "stroke-width": 2.5, "stroke-linecap": "round", "stroke-linejoin": "round", points: ptsAttr }));
}
for (const [cx, py, tip] of pts) {
svg.append(s("circle", { cx, cy: py, r: 4, fill: "#E8418B", stroke: "#fff", "stroke-width": 1.5 }, s("title", null, tip)));
}
return svg;
}
function renderTrends(a, q) {
const [kind, key] = q ? q.split("=") : [];
$("trendChartBox").replaceChildren(renderTrendChart(a.byWeek, (a.overview && a.overview.quizTargetPct) || 70));
$("weekBox").replaceChildren(trendTable(a.byWeek, "Week", weekLabel, kind === "week" && key, a.overview));
$("monthBox").replaceChildren(trendTable(a.byMonth, "Month", monthLabel, kind === "month" && key, a.overview));
}
const sumUrl = (q) => "/api/admin/summary" + (q ? "?" + q : "");
async function loadSummary(fresh) {
const my = ++seq.sum, q = $("periodSel").value;
if (fresh) all = null;
say("sumMsg", "Loading…");
try {
const [s, a] = await Promise.all([call(sumUrl(q)), q && !all ? call(sumUrl("")).catch(() => null) : null]);
if (my !== seq.sum) return;
all = q ? a || all : s;
lastSum = s;
cur = s.current; periods = s.periods;
fillPeriods(); renderSurvey(s); renderDecisions(s);
if (all) renderTrends(all, q);
say("sumMsg", "");
} catch (e) { if (my === seq.sum) oops("sumMsg")(e); }
}
async function copyText(text) {
try { await navigator.clipboard.writeText(text); return true; } catch { }
let ok = false;
const t = el("textarea", "sr"); t.value = text; t.readOnly = true; document.body.append(t); t.select();
try { ok = document.execCommand("copy"); } catch { }
t.remove();
return ok;
}
async function copy(text, btn, msgId, what) {
btn.dataset.label = btn.dataset.label || btn.textContent;
const ok = await copyText(text), box = $("copyBox");
if (ok) {
box.hidden = true; say(msgId, "Copied " + what + ".");
btn.textContent = "Copied ✓"; setTimeout(() => (btn.textContent = btn.dataset.label), 1500);
} else {
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
const floors = Number(r.height).toFixed(1), saved = when(r.created_at);
const slow = r.ended === "time" && r.real_ms > 270000, check = [r.avatar && `played as ${r.avatar === "jackie" ? "Jackie" : "Jack"}`, r.jackpot === 1 && "jackpot game", r.troll_revive === 1 && "tried to revive", r.troll_invest >= 2 && ("invested in the scam" + (r.troll_invest === 3 ? " + paid the fee" : "")), r.troll_tickets > 0 && `${r.troll_tickets} scratch cards`, r.items != null && `${r.items} items`, r.real_ms != null && `${Math.round(r.real_ms / 1000)} s played`, `${r.drops} dropped`].filter(Boolean).join(" · ");
return el("tr", "", el("td", "num", i + 1), el("td", "n", r.name, n > 1 && el("span", "pill rep", `repeat ×${n}`), slow && el("span", "pill rep", "slow motion: check"),
el("span", "meta", `${floors} floors · ${saved}`), el("span", "meta", check)),
el("td", "num", fmt(r.score)), el("td", "num hide-sm", floors), el("td", "sv hide-sm", saved), el("td", "mail", mail ? [mail + " ", b] : "—"));
});
if (!rows.length) { const td = el("td", "t", "Nobody has posted a score in this period yet."); td.colSpan = 6; rows.push(el("tr", "", td)); }
$(K + "Rows").replaceChildren(...rows);
$(K + "Copy").disabled = !mails[kind].length;
const n = mails[kind].length;
$(K + "Info").textContent = !j.rows.length ? "" : `${j.rows.length} ${j.rows.length === 1 ? "player" : "players"} · ${n ? `${n} unique ${n === 1 ? "email" : "emails"}` : "no emails yet"}`;
say(K + "Msg", "");
} catch (e) { if (my === seq[kind]) oops(K + "Msg")(e); }
}
const BOM = String.fromCharCode(0xFEFF);
const csvCell = (v) => {
let s = v == null ? "" : String(v);
if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
};
const csv = (head, rows) => BOM + [head, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";
const list = (text) => { try { const v = JSON.parse(text || "[]"); return Array.isArray(v) ? v.filter((x) => x && typeof x === "object") : []; } catch { return []; } };
const stageName = (i) => (C.STAGES[i] || {}).en || "";
const choice = (c) => (c.pick === "none" ? "missed" : c.pick);
const lead = (r) => [r.id, hkt(r.created_at), r.week, r.month, r.posted && !r.hidden ? 1 : 0];
function gamesCsv(rows) {
const pass = Math.ceil((QN * 2) / 3);
const baseCards = C.CARDS.filter((c) => !c.who);
const sceneCols = [1, 2, 3, 4, 5, 6, 7].flatMap((n) => [`scene_${n}_card`, `scene_${n}_pick`, `scene_${n}_power`]);
const head = ["game_id", "saved_hkt", "week", "month", "on_board", "hidden", "nickname", "email", "score", "floors", "life_stage", "ended", "items_dropped",
"wise_picks", "risky_picks", "missed_picks", "fall_overspending", "fall_scams", "fall_putting_off_saving", "habit_id", "habit", "quiz_answered", "quiz_correct", "quiz_2plus", "quiz_version",
...C.QUIZ.flatMap((q) => ["q_" + q.id, "q_" + q.id + "_correct"]), ...baseCards.map((c) => "card_" + c.id), ...sceneCols, "items_placed", "seconds_played", "quizzes_before", "jackpot", "troll_revive", "troll_invest", "troll_tickets", "player", "money_type", "money_type_name", "via", "title", "title_name", "persona", "persona_name"];
return csv(head, rows.map((r) => {
const raw = list(r.quiz_answers), answers = new Map(raw.map((a) => { const m = C.answerNow(a); return m ? [m.q, m] : [a.q, a]; })), picks = new Map();
const version = !raw.length ? "" : raw.some((a) => C.QUIZ_WAS[a.q]) ? "earlier" : "current";
const evs = list(r.choices);
for (const c of evs) if (!picks.has(c.card)) picks.set(c.card, choice(c));
const scenes = [0, 1, 2, 3, 4, 5, 6].flatMap((i) => { const c = evs[i]; return c ? [c.card, choice(c), c.power || ""] : ["", "", ""]; });
const done = r.quiz_answered === QN || (r.quiz_answered == null && r.quiz != null);
return [...lead(r), r.hidden ? 1 : 0, r.posted ? r.name : "", r.email, r.score, r.height, stageName(r.stage), r.ended, r.drops,
r.wise, r.risky, r.missed, r.fall_spend, r.fall_scam, r.fall_delay, r.habit, (C.HABITS.find((h) => h.id === C.habitNow(r.habit)) || {}).en,
r.quiz_answered, r.quiz, done ? (r.quiz >= pass ? 1 : 0) : "", version,
...C.QUIZ.flatMap((q) => { const a = answers.get(q.id); return a ? [(q.o[a.pick] || [])[0], (a.ok ?? a.pick === q.a) ? 1 : 0] : ["", ""]; }),
...baseCards.map((c) => picks.get(c.id)), ...scenes, r.items, r.real_ms == null ? "" : Math.round(r.real_ms / 1000), r.quiz_prior, r.jackpot ?? "", r.troll_revive ?? "", r.troll_invest ?? "", r.troll_tickets ?? "", r.avatar ?? "", r.mtype ?? "", ((C.TYPES || {})[r.mtype] || {}).en ?? "", r.via ?? "", r.title ?? "", ((C.TITLES || []).find((t) => t.id === r.title) || {}).en ?? "", r.persona ?? "", (personaName(r.persona) || {}).en ?? ""];
}));
}
function answersCsv(rows) {
const head = ["game_id", "saved_hkt", "week", "month", "on_board", "question_no", "question_id", "question", "answer_no", "answer", "correct", "hidden", "grouped_question_no", "grouped_answer"];
return csv(head, rows.flatMap((r) => list(r.quiz_answers).map((a) => {
const i = C.QUIZ.findIndex((q) => q.id === a.q), q = C.QUIZ[i];
const m = C.answerNow(a), gi = m ? C.QUIZ.findIndex((x) => x.id === m.q) : -1, g = C.QUIZ[gi];
const w = !q && C.QUIZ_WAS[a.q] ? C.QUIZ_WAS[a.q].was : null;
return [...lead(r), i < 0 ? "" : i + 1, a.q, q ? q.q[0] : w ? w.q : "", Number.isInteger(a.pick) ? a.pick + 1 : "", q && q.o[a.pick] ? q.o[a.pick][0] : w && w.o[a.pick] ? w.o[a.pick] : "", (a.ok ?? (q && a.pick === q.a)) ? 1 : 0, r.hidden ? 1 : 0,
gi < 0 ? "" : gi + 1, g && g.o[m.pick] ? g.o[m.pick][0] : ""];
})));
}
function eventsCsv(rows) {
const head = ["game_id", "saved_hkt", "week", "month", "on_board", "order", "card_id", "card", "life_stage", "trap", "choice", "persona_who", "reward_picked", "hidden"], byId = new Map(C.CARDS.map((c) => [c.id, c]));
return csv(head, rows.flatMap((r) => list(r.choices).map((c, i) => {
const card = byId.get(c.card);
return [...lead(r), i + 1, c.card, card ? card.tag[0] : "", card ? stageName(card.st) : "", card ? (C.TRAPS[card.trap] || {}).en : "", choice(c), card && card.who ? card.who : "", c.power || "", r.hidden ? 1 : 0];
})));
}
function dlScopeParams() {
const q = new URLSearchParams();
const [k, v] = ($("dlPeriod") && $("dlPeriod").value || "").split("=");
if (v) q.set(k, v);
return q;
}
async function allRows(progress) {
const rows = [], base = dlScopeParams();
for (let after = 0; ;) {
const q = new URLSearchParams(base);
q.set("limit", ROWS); q.set("after", after);
const j = await call(`/api/admin/rows?${q}`);
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
let dlBusy = false;
const busy = (on) => {
dlBusy = on;
for (const id of ["dlGames", "dlAnswers", "dlEvents", "dlDailyUsers", "dlDailyLogs", "csvBtn"]) {
if ($(id)) {
if (on) $(id).setAttribute("aria-disabled", "true");
else $(id).removeAttribute("aria-disabled");
}
}
};
for (const [btn, file, build] of DOWNLOADS) {
$(btn).addEventListener("click", async () => {
if (dlBusy) return;
if (!window.TFF_CONTENT) return say("dlMsg", "The game content file did not load, so the labels are missing. Reload this page.", true);
busy(true); say("dlMsg", "Loading games…");
try {
const rows = await allRows((n) => say("dlMsg", `Loading ${fmt(n)} games…`));
say("dlMsg", `Building the file from ${fmt(rows.length)} games…`);
const scope = ($("dlPeriod") && $("dlPeriod").value || "").split("=")[1] || "";
const name = `3-fall-fun-${file}${scope ? "-" + scope : ""}-${hkt(new Date().toISOString()).slice(0, 10)}.csv`;
saveBlob(new Blob([build(rows)], { type: "text/csv;charset=utf-8" }), name);
say("dlMsg", `Saved ${name} (${fmt(rows.length)} games).`);
} catch (e) { oops("dlMsg")(e); }
busy(false);
});
}
$("csvBtn").addEventListener("click", async () => {
if (dlBusy) return;
busy(true);
try {
const q = dlScopeParams().toString();
const r = await call("/api/admin/export" + (q ? "?" + q : ""));
saveBlob(await r.blob(), ((r.headers.get("content-disposition") || "").match(/filename="([^"]+)"/) || [])[1] || "3-fall-fun-scores.csv");
} catch (e) { oops("dlMsg")(e); }
busy(false);
});
for (const [btnId, kind] of [["dlDailyUsers", "users"], ["dlDailyLogs", "logs"]]) {
if ($(btnId)) $(btnId).addEventListener("click", async () => {
if (dlBusy) return;
busy(true); say("dlMsg", `Loading ${kind} CSV…`);
try {
const q = dlScopeParams();
q.set("kind", kind);
const r = await call("/api/admin/daily-export?" + q);
const name = ((r.headers.get("content-disposition") || "").match(/filename="([^"]+)"/) || [])[1] || `3-fall-crab-daily-${kind}.csv`;
saveBlob(await r.blob(), name);
say("dlMsg", `Saved ${name}.`);
} catch (e) { oops("dlMsg")(e); }
busy(false);
});
}
function renderDailyChart(funnel) {
if (!funnel || !funnel.length || !funnel[0].users) return el("p", "msg", "No daily check-in data yet.");
const W = 560, H = 175, L = 34, R = 16, T = 16, B = 28, cw = W - L - R, ch = H - T - B;
const maxU = Math.max(1, funnel[0].users);
const NS = "http://www.w3.org/2000/svg";
const s = (tag, attrs, ...kids) => {
const n = document.createElementNS(NS, tag);
for (const [k, v] of Object.entries(attrs || {})) if (v != null) n.setAttribute(k, String(v));
n.append(...kids.filter((k) => k != null && k !== false));
return n;
};
const svg = s("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Daily retention funnel Day 1 through Day 30" });
for (const p of [0, 50, 100]) {
const y = T + ch - (ch * p) / 100;
svg.append(s("line", { x1: L, y1: y, x2: W - R, y2: y, stroke: "#EADBC4", "stroke-width": 1 }));
}
svg.append(s("text", { x: L - 6, y: T + 8, "text-anchor": "end", fill: "#5B516C", "font-size": 10 }, maxU));
svg.append(s("text", { x: L - 6, y: T + ch + 4, "text-anchor": "end", fill: "#5B516C", "font-size": 10 }, 0));
const step = cw / funnel.length, bw = Math.min(24, Math.max(10, step * 0.62));
funnel.forEach((f, i) => {
const cx = L + step * (i + 0.5), bh = (ch * f.users) / maxU, by = T + ch - bh;
const col = f.day === 14 ? "#DF1B72" : f.day > 14 ? "#247D3E" : "#0E7C73";
svg.append(s("rect", { x: cx - bw / 2, y: by, width: bw, height: Math.max(2, bh), rx: 3, fill: col, opacity: 0.88 },
s("title", null, `${f.label}: ${fmt(f.users)} (${pc(f.pctOfStarters)})`)));
svg.append(s("text", { x: cx, y: H - 9, "text-anchor": "middle", fill: "#5B516C", "font-size": 9.5 }, f.day > 14 ? `D${f.day}` : String(f.day)));
});
return svg;
}
function dailyRow(r) {
const tr = el("tr", r.hidden ? "hidden" : "");
const td = (v, cls, title) => { const c = el("td", cls, v); if (title) c.title = title; tr.append(c); };
td(r.id, "num"); td(r.sync_code); td(r.name || "–", "n", r.name || ""); td(r.email || "–", "em", r.email || "");
td(fmt(r.total_days), "num"); td(fmt(r.streak), "num"); td(fmt(r.best_streak), "num"); td(fmt(r.rescues), "num");
td(r.last_date || "–");
td(el("span", "pill" + (r.hidden ? " h" : ""), r.hidden ? "hidden" : "shown"));
const b = el("button", r.hidden ? "show" : "hide", r.hidden ? "Unhide" : "Hide");
b.type = "button";
b.setAttribute("aria-label", `${b.textContent} daily visitor ${r.id}`);
b.addEventListener("click", async () => {
if (b.getAttribute("aria-disabled") === "true") return;
b.setAttribute("aria-disabled", "true");
try {
await call("/api/admin/daily-mod", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: r.hidden ? "unhide" : "hide", ids: [r.id] }) });
loadDaily(true);
} catch (e) { oops("dailyModMsg")(e); b.removeAttribute("aria-disabled"); }
});
const anon = r.name && r.name !== ANON && el("button", "ghost mini", "Anonymise");
if (anon) {
anon.type = "button";
anon.setAttribute("aria-label", `Anonymise daily visitor ${r.id}`);
anon.addEventListener("click", async () => {
if (anon.getAttribute("aria-disabled") === "true") return;
anon.setAttribute("aria-disabled", "true");
try {
await call("/api/admin/daily-mod", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "rename", ids: [r.id] }) });
loadDaily(true);
} catch (e) { oops("dailyModMsg")(e); anon.removeAttribute("aria-disabled"); }
});
}
td(anon ? [b, " ", anon] : b);
return tr;
}
async function loadDaily(reset = true) {
if (!$("dailyTiles")) return;
const my = ++seq.daily;
if (reset) { dailyBefore = null; dailySeen.clear(); }
const q = new URLSearchParams({ limit: PAGE });
const [pk, pv] = ($("periodSel").value || "").split("=");
if (pv) q.set(pk, pv);
if ($("dFilter") && $("dFilter").value) q.set("filter", $("dFilter").value);
if ($("dStatus") && $("dStatus").value) q.set("status", $("dStatus").value);
if ($("dSearch") && $("dSearch").value.trim()) q.set("q", $("dSearch").value.trim());
if (!reset && dailyBefore) q.set("before", dailyBefore);
try {
const j = await call("/api/admin/daily?" + q);
if (my !== seq.daily) return;
const o = j.overview || {}, picked = $("periodSel").selectedOptions[0];
$("dailyPeriod").textContent = picked ? "· " + picked.textContent : "";
$("dailyTiles").replaceChildren(
tile("Visitors started", fmt(o.starters), `${fmt(o.initialized)} initialized`),
tile("Active (last 3d)", fmt(o.activeRecent), ratio(o.activeRecent, o.starters, "starters")),
tile("Total check-ins", fmt(o.checkins), `${fmt(o.direct)} direct · ${fmt(o.rescued)} via 60s rescue (${pc(o.rescuePct)})`),
tile("14-Day Finishers", fmt(o.finishers14), `${pc(o.finisherPct)} of starters · ${fmt(o.beyond14)} went Day 15+`,
o.finishers14 > 0 ? ["ok", `${fmt(o.claimed)} claimed`] : null, "kpi"),
tile("Avg / Max days", o.avgDays == null ? "–" : `${o.avgDays}d`, `Best ${fmt(o.maxDays)}d · Top streak ${fmt(o.maxStreak)}d`),
tile("Shields used", fmt(o.shieldsSaved), `${fmt(o.emails)} finisher emails left`)
);
$("dailyChartBox").replaceChildren(renderDailyChart(j.funnel));
$("dailyFunnelBox").replaceChildren(table(
[{ h: "Milestone", c: "t" }, { h: "Visitors", c: "num" }, { h: "% of starters", c: "num" }],
(j.funnel || []).map((f) => ({ cls: f.day === 14 ? "cur" : "", cells: [f.label, fmt(f.users), [pc(f.pctOfStarters), meter(f.pctOfStarters, f.day >= 14 ? "ok" : "")]] })), "sm"));
const finMails = [...new Set((j.finishers || []).map((f) => (f.email || "").trim()).filter(Boolean))];
mails.daily = finMails;
$("dailyCopyEmails").setAttribute("aria-disabled", finMails.length ? "false" : "true");
$("dailyFinInfo").textContent = j.finishers.length ? `${fmt(j.finishers.length)} finishers · ${fmt(finMails.length)} emails` : "No 14-day finishers yet";
$("dailyFinBox").replaceChildren(j.finishers.length
? table([{ h: "Nickname", c: "t" }, { h: "Email", c: "em" }, { h: "Days", c: "num" }, { h: "Best", c: "num" }, { h: "Keep habit", c: "t" }],
j.finishers.map((f) => ({ cells: [f.name || f.sync_code, f.email || "–", fmt(f.total_days), fmt(f.best_streak) + "d", f.note || "–"] })), "sm")
: el("p", "msg", "No visitors have reached Day 14 yet."));
$("dailyQBox").replaceChildren(table(
[{ h: "Day / Pool", c: "num" }, { h: "Question", c: "t" }, { h: "Shown", c: "num" }, { h: "Direct %", c: "num" }, { h: "60s Rescue %", c: "num" }, { h: "Skipped", c: "num" }],
(j.questions || []).map((x) => ({ cells: [x.sprintDay ? `D${x.sprintDay}` : "Inf", [x.en, zh(x.zh)], fmt(x.total), pc(x.directPct), [pc(x.rescuePct), x.rescuePct != null && meter(x.rescuePct, "ok")], fmt(x.skipped)] })), "mid cards"));
if (reset) $("dailyRows").replaceChildren();
for (const r of (j.rows || [])) if (!dailySeen.has(r.id)) { dailySeen.add(r.id); $("dailyRows").append(dailyRow(r)); }
dailyBefore = j.nextBefore || null;
$("dailyMoreBtn").hidden = !dailyBefore;
if (reset && !(j.rows || []).length) { const c = el("td", "", "No daily visitors match."); c.colSpan = 11; $("dailyRows").append(el("tr", "", c)); }
$("dailyCount").textContent = dailySeen.size ? `Showing ${fmt(dailySeen.size)} of ${fmt(j.filteredTotal)}` : "";
say("dailyMsg", "");
} catch (e) { if (my === seq.daily) oops("dailyMsg")(e); }
}
const quizText = (r) => (r.quiz == null ? "–" : `${r.quiz}/${QN}` + (r.quiz_answered != null && r.quiz_answered < QN ? ` (${r.quiz_answered} answered)` : ""));
function syncBatchUI() {
const bar = $("batchBar"), allChk = $("gAll"), boxes = [...$("rows").querySelectorAll("input[type=checkbox]")];
if (bar) { bar.hidden = !selected.size; $("batchCount").textContent = `${fmt(selected.size)} selected`; }
if (allChk) {
allChk.checked = boxes.length > 0 && boxes.every((c) => selected.has(Number(c.dataset.id)));
allChk.indeterminate = !allChk.checked && boxes.some((c) => selected.has(Number(c.dataset.id)));
}
}
function stats(j) {
cur = { week: j.week, month: j.month };
$("sTotal").textContent = fmt(j.total); $("sHidden").textContent = fmt(j.hiddenTotal); $("sBoard").textContent = fmt(j.postedTotal);
$("sEmail").textContent = fmt(j.emailTotal); $("sWeek").textContent = j.week;
}
function afterHide() {
call("/api/admin/scores?limit=1").then(stats).catch(oops("panelMsg"));
loadSummary(true); loadWinners("week"); loadWinners("month");
}
function gameRow(r) {
const tr = el("tr", r.hidden ? "hidden" : "");
tr.dataset.id = r.id;
const chk = document.createElement("input"); chk.type = "checkbox"; chk.dataset.id = r.id; chk.checked = selected.has(r.id);
chk.setAttribute("aria-label", `Select game ${r.id}`);
chk.addEventListener("change", () => { if (chk.checked) selected.add(r.id); else selected.delete(r.id); syncBatchUI(); });
tr.append(el("td", "chk", chk));
const td = (v, cls, title) => { const c = el("td", cls, v); if (title) c.title = title; tr.append(c); };
td(r.id, "num"); td(when(r.created_at)); td(r.week);
td(r.posted ? r.name : "–", "n", r.posted ? r.name : "Saved anonymously");
td(r.email || "–", "em", r.email || "");
td(el("span", "pill" + (r.posted ? " board" : ""), r.posted ? "on board" : "anonymous"));
td(fmt(r.score), "num"); td(Number(r.height).toFixed(1), "num");
td(`${r.wise} / ${r.risky} / ${r.missed}`, "num"); td(r.habit || "–"); td(quizText(r), "num w"); td(r.ended || "–");
td(el("span", "pill" + (r.hidden ? " h" : ""), r.hidden ? "hidden" : "shown"));
const b = el("button", r.hidden ? "show" : "hide", r.hidden ? "Unhide" : "Hide");
b.type = "button";
b.setAttribute("aria-label", `${b.textContent} game ${r.id}`);
b.addEventListener("click", async () => {
if (b.getAttribute("aria-disabled") === "true") return;
const wasFocused = document.activeElement === b;
b.setAttribute("aria-disabled", "true");
try {
await call("/api/admin/hide", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: r.id, hidden: !r.hidden }) });
r.hidden = r.hidden ? 0 : 1; const nr = gameRow(r); tr.replaceWith(nr); afterHide();
if (wasFocused) { const nb = nr.querySelector("td:last-child button"); if (nb) nb.focus({ preventScroll: true }); }
} catch (e) { oops("panelMsg")(e); b.removeAttribute("aria-disabled"); }
});
const anon = r.posted && r.name !== ANON && el("button", "ghost mini", "Anonymise name");
if (anon) {
anon.type = "button";
anon.setAttribute("aria-label", `Anonymise the nickname of game ${r.id}`);
anon.addEventListener("click", async () => {
if (anon.getAttribute("aria-disabled") === "true") return;
const wasFocused = document.activeElement === anon;
anon.setAttribute("aria-disabled", "true");
try {
await call("/api/admin/rename", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: r.id }) });
r.name = ANON; const nr = gameRow(r); tr.replaceWith(nr); afterHide();
if (wasFocused) { const nb = nr.querySelector("td:last-child button"); if (nb) nb.focus({ preventScroll: true }); }
} catch (e) { oops("panelMsg")(e); anon.removeAttribute("aria-disabled"); }
});
}
td(anon ? [b, " ", anon] : b);
return tr;
}
async function loadGames(reset) {
const my = ++seq.games;
if (reset) { nextBefore = null; seen = new Set(); selected.clear(); syncBatchUI(); }
const q = new URLSearchParams({ limit: PAGE }), [k, v] = $("gPeriod").value.split("=");
if (v) q.set(k, v);
if (!reset && nextBefore) q.set("before", nextBefore);
if ($("gBoard").value) q.set("board", $("gBoard").value);
if ($("gStatus") && $("gStatus").value) q.set("status", $("gStatus").value);
if ($("gFlag") && $("gFlag").value) q.set("flag", $("gFlag").value);
const search = $("gSearch") ? $("gSearch").value.trim() : "";
if (search) q.set("q", search);
const j = await call("/api/admin/scores?" + q);
if (my !== seq.games) return false;
stats(j);
if (reset) $("rows").replaceChildren();
for (const r of j.rows) if (!seen.has(r.id)) { seen.add(r.id); $("rows").append(gameRow(r)); }
nextBefore = j.nextBefore || null;
$("moreBtn").hidden = !nextBefore;
if (reset && !j.rows.length) { const c = el("td", "", "No games match."); c.colSpan = 15; $("rows").append(el("tr", "", c)); }
const ft = j.filteredTotal != null ? ` of ${fmt(j.filteredTotal)}` : "";
$("gCount").textContent = seen.size ? `Showing ${fmt(seen.size)}${ft} ${j.filteredTotal === 1 ? "game" : "games"}` : "";
syncBatchUI();
return true;
}
async function unlock() {
const fromLogin = $("loginCard").contains(document.activeElement) || document.activeElement === document.body;
try { if (!(await loadGames(true))) return; }
catch (e) {
show(false); say("loginMsg", e.message, true);
if (e.code === "unauthorised") { token = ""; try { sessionStorage.removeItem(KEY); } catch { } }
return;
}
show(true); say("panelMsg", HIDE_HINT);
fillPeriods(); openTab(location.hash.slice(1));
if (fromLogin) {
const activeTab = document.querySelector('#tabs [aria-selected="true"]') || $("tab-survey");
if (activeTab) activeTab.focus({ preventScroll: true });
}
loadSummary(); loadWinners("week"); loadWinners("month"); loadTraffic(); loadDaily(true);
}
let holdActive = false, trafficBusy = false;
function paintTraffic(t) {
if (!t || !$("trafficInfo") || !$("holdToggleBtn")) return;
holdActive = Boolean(t.adminForceHold);
const on = Boolean(t.forceHold || t.onHold);
$("trafficInfo").textContent = `Traffic: ${fmt(t.active || 0)}/${fmt(t.capacity || 0)} leases · ${fmt(t.waiting || 0)} waiting · ${fmt(t.inFlight || 0)}/${fmt(t.maxConcurrent || 0)} in-flight · Hold ${on ? "ON" : "OFF"}${t.durableObject ? " (DO)" : ""}`;
$("holdToggleBtn").setAttribute("aria-pressed", String(holdActive));
$("holdToggleBtn").textContent = holdActive ? "Resume entry (Hold OFF)" : "Pause entry (Hold ON)";
}
async function loadTraffic() {
try { paintTraffic(await call("/api/admin/traffic")); if ($("trafficMsg")) $("trafficMsg").textContent = ""; }
catch (e) { oops("trafficMsg")(e); }
}
if ($("holdToggleBtn")) {
$("holdToggleBtn").addEventListener("click", async () => {
if (trafficBusy) return;
trafficBusy = true;
$("holdToggleBtn").setAttribute("aria-disabled", "true");
try {
const res = await call("/api/admin/traffic", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ forceHold: !holdActive }) });
paintTraffic(res);
say("trafficMsg", res.adminForceHold ? "Entry paused: new players go to the waiting room." : "Entry resumed.");
} catch (e) { oops("trafficMsg")(e); }
trafficBusy = false;
$("holdToggleBtn").removeAttribute("aria-disabled");
});
}
$("loginForm").addEventListener("submit", (ev) => {
ev.preventDefault(); token = $("token").value.trim(); $("token").value = "";
try { sessionStorage.setItem(KEY, token); } catch { }
unlock();
});
$("lockBtn").addEventListener("click", () => lock("Locked."));
function reportSummary(s) {
if (!s) return "";
const o = s.overview, picked = ($("periodSel").selectedOptions[0] && $("periodSel").selectedOptions[0].textContent) || "All time";
const tr = s.trolls || {}, ti = tr.invest || {}, tt = tr.tickets || {}, rv = tr.revive || {};
const lines = [
`# 3 Fall Fun 人生跌塔 — Programme Summary (${picked})`,
`Games saved: ${fmt(o.games)} (On board: ${fmt(o.posted)}, Anonymous: ${fmt(o.anonymous)}, Shared challenge links: ${fmt(o.via_c || 0)})`,
`Avg score: ${fmt(o.avgScore)} | Best score: ${fmt(o.bestScore)} | Avg floors: ${o.avgHeight ?? "–"}`,
`Quiz finished: ${fmt(o.quizTakers)} (${ratio(o.quizTakers, o.games, "games")}) | Scored ${o.quizPassMark}/${o.quizQuestions}+: ${pc(o.quizPassPct)} (target ${o.quizTargetPct}%) | First-try ${o.quizPassMark}/${o.quizQuestions}+: ${pc(o.quizFirstPct)} (${fmt(o.quizFirstPass)}/${fmt(o.quizFirst)})`,
"",
"## Quiz Questions",
...s.quiz.map((q, i) => `- Q${i + 1}: ${q.en} — ${pc(q.pct)} right (${fmt(q.right)}/${fmt(q.n)})`),
"",
"## Habit Pledges",
...s.habits.map((h) => `- ${h.en}: ${fmt(h.n)} (${pc(share(h.n, o.games))})`),
"",
"## Money Traps (3 Falls)",
...s.traps.map((t) => `- ${t.en}: ${fmt(t.falls)} falls in ${fmt(t.games)} games (${pc(t.gamesPct)})`),
`- No falls: ${fmt(o.noFallGames)} games (${pc(share(o.noFallGames, o.games))})`,
"",
"## Too Good to Be True",
`- "Guaranteed 30%" scam: ${fmt(ti.invested || 0)}/${fmt(ti.seen || 0)} invested (${pc(ti.hitPct)}; ${fmt(ti.fee || 0)} paid release fee)`,
`- Lucky scratch card: ${fmt(tt.bought || 0)}/${fmt(tt.seen || 0)} bought (${pc(tt.hitPct)}; ${fmt(tt.cards || 0)} cards total)`,
`- Fake revive: ${fmt(rv.pressed || 0)}/${fmt(rv.seen || 0)} pressed (${pc(rv.hitPct)})`,
"",
"## Life Stages Reached",
...s.stages.map((st) => `- ${st.en}: ${fmt(st.n)} (${pc(share(st.n, o.games))})`),
];
return lines.join("\n");
}
$("periodSel").addEventListener("change", () => { loadSummary(); loadDaily(true); });
$("refreshBtn").addEventListener("click", () => { loadGames(true).catch(oops("panelMsg")); loadSummary(true); loadWinners("week"); loadWinners("month"); loadTraffic(); loadDaily(true); });
if ($("dailyCopyEmails")) $("dailyCopyEmails").addEventListener("click", () => {
if ($("dailyCopyEmails").getAttribute("aria-disabled") === "true" || !mails.daily.length) return;
copy(mails.daily.join("; "), $("dailyCopyEmails"), "dailyFinMsg", mails.daily.length + " finisher emails");
});
for (const id of ["dFilter", "dStatus"]) if ($(id)) $(id).addEventListener("change", () => loadDaily(true));
let dSearchTimer = 0;
if ($("dSearch")) $("dSearch").addEventListener("input", () => { clearTimeout(dSearchTimer); dSearchTimer = setTimeout(() => loadDaily(true), 220); });
if ($("dailyMoreBtn")) $("dailyMoreBtn").addEventListener("click", () => loadDaily(false));
$("copyReportBtn").addEventListener("click", () => { if (!lastSum) return say("sumMsg", "Summary is still loading.", true); copy(reportSummary(lastSum), $("copyReportBtn"), "sumMsg", "report summary"); });
$("printReportBtn").addEventListener("click", () => window.print());
for (const t of TABS) $("tab-" + t).addEventListener("click", () => openTab(t));
$("tabs").addEventListener("keydown", (ev) => {
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
for (const id of ["gPeriod", "gBoard", "gStatus", "gFlag"]) $(id).addEventListener("change", () => loadGames(true).catch(oops("panelMsg")));
let searchTimer = 0;
$("gSearch").addEventListener("input", () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => loadGames(true).catch(oops("panelMsg")), 220); });
$("gAll").addEventListener("change", () => {
const on = $("gAll").checked;
for (const c of $("rows").querySelectorAll("input[type=checkbox]")) { c.checked = on; const id = Number(c.dataset.id); if (on) selected.add(id); else selected.delete(id); }
syncBatchUI();
});
let batchBusy = false, moreBusy = false;
async function runBatch(action) {
const ids = [...selected]; if (!ids.length || batchBusy) return;
const fromBatch = $("batchBar") && $("batchBar").contains(document.activeElement);
batchBusy = true;
for (const id of ["batchHide", "batchUnhide", "batchRename", "batchClear"]) $(id).setAttribute("aria-disabled", "true");
let done = false;
try {
await call("/api/admin/batch", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, ids }) });
selected.clear(); syncBatchUI();
if ((fromBatch || document.activeElement === document.body) && $("batchBar").hidden && !$("panel").hidden) $("gAll").focus({ preventScroll: true });
await loadGames(true); afterHide();
done = true;
} catch (e) { oops("panelMsg")(e); }
batchBusy = false;
for (const id of ["batchHide", "batchUnhide", "batchRename", "batchClear"]) $(id).removeAttribute("aria-disabled");
syncBatchUI();
if (done) say("panelMsg", `Updated ${fmt(ids.length)} ${ids.length === 1 ? "game" : "games"} (${action}).`);
if ((fromBatch || document.activeElement === document.body) && $("batchBar").hidden && !$("panel").hidden) $("gAll").focus({ preventScroll: true });
}
$("batchHide").addEventListener("click", () => runBatch("hide"));
$("batchUnhide").addEventListener("click", () => runBatch("unhide"));
$("batchRename").addEventListener("click", () => runBatch("rename"));
$("batchClear").addEventListener("click", () => {
if (batchBusy) return;
const fromBatch = $("batchBar") && $("batchBar").contains(document.activeElement);
selected.clear();
for (const c of $("rows").querySelectorAll("input[type=checkbox]")) c.checked = false;
syncBatchUI();
if ((fromBatch || document.activeElement === document.body) && $("batchBar").hidden && !$("panel").hidden) $("gAll").focus({ preventScroll: true });
});
$("moreBtn").addEventListener("click", async () => {
if (moreBusy) return;
const wasFocused = document.activeElement === $("moreBtn");
const prevCount = $("rows").children.length;
moreBusy = true;
$("moreBtn").setAttribute("aria-disabled", "true");
try { await loadGames(false); } catch (e) { oops("panelMsg")(e); }
moreBusy = false;
$("moreBtn").removeAttribute("aria-disabled");
if (wasFocused && $("moreBtn").hidden && !$("panel").hidden) {
const newRow = $("rows").children[prevCount];
const target = (newRow && newRow.querySelector("input, button")) || $("gAll");
if (target) target.focus({ preventScroll: true });
} else if (wasFocused && !$("moreBtn").hidden && !$("panel").hidden && document.activeElement !== $("moreBtn")) {
$("moreBtn").focus({ preventScroll: true });
}
});
if (token) unlock(); else show(false);
})();
