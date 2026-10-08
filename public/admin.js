// Leaderboard admin: list games, hide/unhide nicknames, export CSV. Talks to /api/admin/* with the ADMIN_TOKEN.
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const KEY = "tff_admin_token";
  const PAGE = 100;
  let token = "";
  try { token = sessionStorage.getItem(KEY) || ""; } catch {}
  let offset = 0, week = "", curWeek = "";

  const when = (iso) => {
    try { return new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Hong_Kong", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }); }
    catch { return iso; }
  };
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
  function cell(tr, text, cls) { const td = document.createElement("td"); td.textContent = text; if (cls) td.className = cls; tr.appendChild(td); return td; }
  function row(r) {
    const tr = document.createElement("tr"); if (r.hidden) tr.className = "hidden";
    cell(tr, r.id, "num"); cell(tr, when(r.created_at)); cell(tr, r.week);
    const n = cell(tr, r.name, "n"); n.title = r.name;
    cell(tr, Number(r.score).toLocaleString("en-US"), "num"); cell(tr, Number(r.height).toFixed(1), "num");
    cell(tr, r.wise + " / " + r.risky + " / " + r.missed, "num"); cell(tr, r.habit || "–"); cell(tr, r.quiz == null ? "–" : r.quiz + "/3", "num");
    cell(tr, r.ended || "–");
    const st = document.createElement("span"); st.className = "pill" + (r.hidden ? " h" : ""); st.textContent = r.hidden ? "hidden" : "public";
    cell(tr, "").appendChild(st);
    const b = document.createElement("button"); b.className = r.hidden ? "show" : "hide"; b.textContent = r.hidden ? "Unhide" : "Hide";
    b.addEventListener("click", async () => {
      b.disabled = true;
      try {
        await call("/api/admin/hide", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: r.id, hidden: !r.hidden }) });
        r.hidden = r.hidden ? 0 : 1; tr.replaceWith(row(r)); load(true, true);
      } catch (e) { $("panelMsg").textContent = e.message; $("panelMsg").className = "msg err"; b.disabled = false; }
    });
    cell(tr, "").appendChild(b);
    return tr;
  }
  async function load(reset, statsOnly) {
    if (reset && !statsOnly) offset = 0;
    const q = new URLSearchParams({ limit: statsOnly ? 1 : PAGE, offset: statsOnly ? 0 : offset });
    if (week) q.set("week", week);
    const j = await call("/api/admin/scores?" + q);
    curWeek = j.week; $("sTotal").textContent = j.total.toLocaleString("en-US"); $("sHidden").textContent = j.hiddenTotal; $("sWeek").textContent = j.week;
    if (statsOnly) return;
    if (reset) $("rows").replaceChildren();
    j.rows.forEach((r) => $("rows").appendChild(row(r)));
    offset += j.rows.length;
    $("moreBtn").hidden = j.rows.length < PAGE;
    if (reset && !j.rows.length) { const tr = document.createElement("tr"); cell(tr, "No games yet.").colSpan = 12; $("rows").appendChild(tr); }
  }
  async function unlock() {
    try { await load(true); show(true); $("panelMsg").className = "msg"; }
    catch (e) { show(false); $("loginMsg").textContent = e.message; $("loginMsg").className = "msg err"; if (e.code === "unauthorised") { token = ""; try { sessionStorage.removeItem(KEY); } catch {} } }
  }
  $("loginForm").addEventListener("submit", (ev) => {
    ev.preventDefault(); token = $("token").value.trim(); $("token").value = "";
    try { sessionStorage.setItem(KEY, token); } catch {}
    unlock();
  });
  $("lockBtn").addEventListener("click", () => { token = ""; try { sessionStorage.removeItem(KEY); } catch {} $("rows").replaceChildren(); show(false); $("loginMsg").className = "msg"; $("loginMsg").textContent = "Locked."; });
  $("weekSel").addEventListener("change", () => { week = $("weekSel").value === "cur" ? curWeek : ""; load(true).catch((e) => { $("panelMsg").textContent = e.message; }); });
  $("refreshBtn").addEventListener("click", () => load(true).catch((e) => { $("panelMsg").textContent = e.message; }));
  $("moreBtn").addEventListener("click", () => load(false).catch((e) => { $("panelMsg").textContent = e.message; }));
  $("csvBtn").addEventListener("click", async () => {
    $("csvBtn").disabled = true;
    try {
      const r = await call("/api/admin/export");
      const blob = await r.blob();
      const name = ((r.headers.get("content-disposition") || "").match(/filename="([^"]+)"/) || [])[1] || "3-fall-fun-scores.csv";
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    } catch (e) { $("panelMsg").textContent = e.message; $("panelMsg").className = "msg err"; }
    $("csvBtn").disabled = false;
  });
  if (token) unlock(); else show(false);
})();
