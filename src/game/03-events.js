// ---------- life events ----------
// The next Life Event card: one for this life stage, never one already seen this game. Cards of the rolled type (`who`
// in content.js) come first, about 3 in 4; the general ones fill in. Other types' cards never come up.
const OWN_SHARE = 0.75;
const ownCard = k => { const p = S.persona; return !!p && !!k.who && (k.who === p.bg || k.who === p.pe || k.who === p.bg + "+" + p.pe); };
function pickCard(){
  const free = CARDS.filter(k => !S.used.has(k.id) && (!k.who || ownCard(k)));
  let at = free.filter(k => k.st === S.stage);
  if (!at.length) at = free.filter(k => k.st <= S.stage);   // this stage's all seen: an earlier one
  if (!at.length) at = free.length ? free : CARDS.filter(k => !k.who);
  const own = at.filter(ownCard), general = at.filter(k => !k.who);
  const pool = own.length && (!general.length || Math.random() < OWN_SHARE) ? own : general.length ? general : at;
  return pool[Math.floor(Math.random() * pool.length)];
}
// The next card and the items pictured on its two choices are picked a few seconds before it opens, so their
// pictures are made in spare time and the card deals in smoothly.
function planCard(){
  const c = pickCard(), order = Math.random() < 0.5 ? ["w","r"] : ["r","w"];
  const thumbs = order.map(k => {
    const named = c.thumb && c.thumb[k] && DEFS.find(d => d.id === c.thumb[k]); if (named) return named;   // the phone for "Buy the latest phone"
    const pool = k === "w" ? POOLS.wise : (c.trap === "scam" ? POOLS.scam : POOLS.risky); return pool[Math.floor(Math.random() * pool.length)]; });
  thumbs.forEach(d => wantSprite(d, 0, 1));
  return {c, order, thumbs, stage: S.stage};
}
function openCard(){
  const plan = S.plan && S.plan.stage === S.stage ? S.plan : planCard(), c = plan.c;
  S.plan = null; S.used.add(c.id);
  S.cardCount++;
  S.card = {c, t:0, flip:false, flipAt:0, order: plan.order, lastTick:4};
  S.mode = "card"; softHeld = false; keys.left = keys.right = false; S.dragX = null;
  A.sfx("cardOpen"); setTimeout(() => { A.sfx("clap"); haptic(22, 0.45, 0.55); }, 300); A.mode("card");
  const st = STAGES[S.stage], act = ACTS[ACT_OF_STAGE[S.stage] || 0], sc = String(S.cardCount).padStart(2, "0");   // the slate: act (by life stage), scene, take
  $("cardSlate").replaceChildren("ACT " + act.n + " · SCENE ", Object.assign(document.createElement("b"), {id: "cardNo", textContent: sc}), " · TAKE " + takes);
  $("cardSlateZh").textContent = act.z + " · 第" + S.cardCount + "場";
  document.querySelector(".lc-body").dataset.no = act.z + " 第" + S.cardCount + "場";
  $("cardStage").textContent = st.en + " · " + st.zh;
  $("cardTitle").textContent = c.en; $("cardTitleZh").textContent = c.zh;
  $("cardTag").textContent = c.tag ? c.tag[0] + " · " + c.tag[1] : "";   // shown instead of the question once it's answered
  const forT = c.who && S.persona ? c.who.split("+").map(k => PERSONAS.bg[k] || PERSONAS.pe[k]).filter(Boolean) : [], fr = $("cardFor");   // which part of who you are brought it
  fr.hidden = !forT.length;
  if (forT.length){ const z = document.createElement("span"); z.lang = "zh-HK"; z.textContent = "為你而設 · " + forT.map(t => t.zh).join(" × "); fr.replaceChildren(z, "For you"); fr.title = "For you: " + forT.map(t => t.en).join(" × "); }
  const box = $("cardChoices"); box.replaceChildren(); box.hidden = false;
  S.card.order.forEach((k, i) => {
    const b = document.createElement("button"); b.className = "choice"; b.type = "button";
    const key = document.createElement("span"); key.className = "key"; key.textContent = root.classList.contains("gamepad") ? (i === 0 ? "X" : "Y") : (i === 0 ? "1" : "2");
    const th = document.createElement("canvas"); th.className = "thumb"; th.width = 88; th.height = 88; th.setAttribute("aria-hidden", "true");
    const t = document.createElement("span");
    const be = document.createElement("b"); be.textContent = c[k][0];
    const bz = document.createElement("small"); bz.textContent = c[k][1];
    t.append(be, bz); b.append(key, t, th);
    requestAnimationFrame(() => previewInto(th, plan.thumbs[i]));
    b.addEventListener("click", e => { if (!tapTooSoon(e, 0)) choose(k === "w" ? "wise" : "risky"); });
    box.appendChild(b);
  });
  $("cardOutcome").hidden = true; $("cardBar").style.transform = "scaleX(1)";
  $("cardHint").textContent = "Life Event card: Act " + act.n + ", scene " + S.cardCount + ". Choose within " + cardMs() / 1000 + " seconds: press 1 or 2" + (root.classList.contains("gamepad") ? ", or X or Y on the controller" : ", or tap a choice") + "." +
    (slowRead ? "" : " For more time on later cards, pause the game and set the card timer to 30 seconds.");
  $("cardModal").hidden = false;
  const sheet = $("cardSheet"); sheet.classList.remove("done"); sheet.style.animation = "none"; void sheet.offsetWidth; sheet.style.animation = "";
  modalOpen(true); $("cardSheet").focus({preventScroll:true});
}
// A tap meant for the board or the pad can land on a card that has just popped up (or on Continue, where a
// choice was a moment ago): taps in the first 0.45 s are ignored. Keyboard presses (detail 0) always count.
function tapTooSoon(e, since){ return e.detail !== 0 && !!S.card && S.card.t - since < 450; }
function choose(kind){
  if (!S.card || S.card.flip) return;
  const c = S.card.c; S.card.flip = true; S.card.flipAt = S.card.t;
  S.choices.push({card: c.id, pick: kind});
  const head = $("ocHead"); head.replaceChildren();
  const txt = document.createElement("span"); txt.dataset.fit = 15;
  let en, zh, loss = 0;
  if (kind === "wise"){
    const overflow = S.fund >= 3 && S.best > 0;
    S.wise++; S.rate = Math.min(2, +(S.rate + 0.2).toFixed(1)); S.fund = Math.min(3, S.fund + 1); S.hand = "piggy";
    let bonus = 0;
    if (overflow){ [bonus] = pay(1000); S.score += bonus; S.compounded += bonus; ledger({zh: "應急錢儲滿利息", en: "Full-fund interest"}, bonus); }
    S.forced = {type: "wise", n: 4};
    S.wiseRun++; S.afterCard = S.rate >= 2 && !S.said.has("boost") ? (S.said.add("boost"), "boost") : S.wiseRun === 3 ? "wise3" : "wise";
    head.className = "oc-head good"; head.appendChild(svgUse("i-good")); txt.textContent = "Good call! 揀得好！";
    en = "Next 4 items are stable · boost ×" + S.rate.toFixed(1) + " · " + (bonus ? "full-fund interest +" + fmt(bonus) : "emergency fund +1");   // and a reward of the player's choice (showPowers)
    zh = "之後4件平穩·加成×" + S.rate.toFixed(1) + "·" + (bonus ? "應急錢儲滿利息+" + fmt(bonus) : "應急錢+1");
    $("ocEffect").style.color = "var(--green-t)"; A.sfx("wise"); haptic([15, 30, 25], 0.4, 0.55);
  } else {
    const trap = kind === "risky" ? c.trap : "delay";
    S.hand = trap === "spend" ? "bags" : trap === "scam" ? "phone" : "hourglass";
    if (kind === "risky") S.risky++; else S.missed++;
    S.wiseRun = 0; S.afterCard = trap;
    S.falls[trap]++;
    head.className = "oc-head bad"; const ic = svgUse(ICON[trap]); ic.style.background = trap === "spend" ? "var(--orange)" : trap === "scam" ? "var(--purple)" : "var(--blue)"; ic.style.borderRadius = "10px"; ic.style.padding = "3px"; head.appendChild(ic);
    txt.textContent = TRAPS[trap].en + " " + TRAPS[trap].zh;
    [en, zh] = TRAPS[trap].hit;
    if (kind === "none"){ en = "Time ran out, so it was put off · " + en; zh = "諗太耐，即係拖延·" + zh; }
    $("ocEffect").style.color = "var(--red-d)"; A.sfx("risky"); haptic([40, 35, 65], 0.75, 0.55);
    if (trap === "spend"){ S.rate = Math.max(1, +(S.rate - 0.2).toFixed(1)); S.forced = {type: "risky", n: 3}; S.pendingDebt++; }
    else if (trap === "scam"){ const sl = Math.min(S.score, 5000); loss = sl; S.score -= sl; ledger({zh: "被騙", en: "Scam"}, -sl); S.forced = {type: "scam", n: 3}; S.scamLock = 4; A.sfx("scam"); }
    else { S.speedUntil = S.play + 20000; S.rate = 1; S.forced = {type: "risky", n: 2}; setRotLock(3); }   // too late to turn: the falling item and the next 2
  }
  head.appendChild(txt);
  const fxEn = en.replace("{loss}", fmt(-loss)).split(" · "), fxZh = zh.replace("{loss}", fmt(-loss)).split("·"), eff = $("ocEffect");
  eff.replaceChildren();
  if (fxEn.length === fxZh.length) fxEn.forEach((e, i) => {   // one chip per effect
    const fx = document.createElement("span"); fx.className = "fx"; fx.textContent = e[0].toUpperCase() + e.slice(1);   // a chip starts with a capital
    const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = fxZh[i]; fx.appendChild(z); eff.appendChild(fx);
  });
  else { const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = fxZh.join(" · "); eff.append(fxEn.join(" · "), z); }
  $("cardSheet").classList.add("done");
  const later = laterOf(c, kind, S.choices.length - 1), os = $("ocStory"); os.hidden = !later; os.replaceChildren();   // what happened to Jack or Jackie next
  if (later){ const lab = document.createElement("b"); lab.className = "os-lab"; lab.textContent = "Later ";
    const lz = document.createElement("span"); lz.lang = "zh-HK"; lz.textContent = "後來"; lab.appendChild(lz);
    const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = tell(later[1]); os.append(lab, tell(later[0]), z); }
  const tip = $("ocTip"); tip.replaceChildren(document.createTextNode(c.tip[0]));
  const tz = document.createElement("small"); tz.textContent = c.tip[1]; tip.appendChild(tz);
  crab(c.tip[0], c.tip[1]);
  $("cardChoices").hidden = true; $("cardOutcome").hidden = false; fitOutcome(); requestAnimationFrame(() => { fitLine(txt); fitOutcome(); });   // after its Chinese is marked
  $("cardContinue").focus({preventScroll:true});
  S.queue = []; refill();
  if (kind === "wise") showPowers(c);   // the reward: the card's own by default (vines for spending, a fixed deposit for saving early, insurance for scams)
  else { $("ocPowers").hidden = true; if (S.afterCard === "spend") S.queue[0] = bigOf(S.queue[0]); }   // lifestyle inflation: the first awkward item comes giant
  fitOutcome();
  drawPreviews(); updateHUD(); prewarm();
}
// The answered card fits the screen: when its result (story, effects, tip) is too tall, that part scrolls inside the card
// and Continue stays in view at the bottom (style.css keeps a rough cap for the moment before this runs)
function fitOutcome(){
  const oc = $("cardOutcome"); if (oc.hidden) return;
  oc.style.maxHeight = "none";
  const pad = parseFloat(getComputedStyle($("cardModal")).paddingTop) || 16;
  const over = $("cardSheet").offsetHeight - (innerHeight - 2 * pad - 8);   // the modal's padding, and a little for the card's tilt
  oc.style.maxHeight = over > 0 ? Math.max(150, oc.offsetHeight - over) + "px" : "none";
}
addEventListener("resize", () => { if (S && S.card && S.card.flip) fitOutcome(); });
// ---------- the ghost of the player above: someone else's tower on screen ----------
// Each finished game sends its tower's outline with its record (sil: the leftmost and rightmost x of every 12.5 px
// row, from the platform up). A game shows the outline of this week's board game with the lowest score still above
// the player's own, as a pale silhouette standing on the same platform, behind the tower; passing it brings the next
// one up. Games from before outlines were kept show as a dashed line at their height. Looks only: no physics, no score.
function outlineOf(){
  const parts = [];
  for (const b of engine.world.bodies){
    if (!b.tff || b === S.active || !b.tff.released || b.position.y > 5) continue;   // what stands on the tower, not what is still falling
    for (const part of (b.parts.length > 1 ? b.parts.slice(1) : b.parts)){
      parts.push({minY: part.bounds.min.y, maxY: part.bounds.max.y, vertices: part.vertices});
    }
  }
  return encodeSilhouette(parts);
}
let GHOSTS = [];   // this week's board games, lowest score first: {name, score, height, rows}
function chalGhost(){
  if (!CHAL || CHAL.s <= 0) return null;
  const rows = CHAL.sil ? decodeSilhouette(CHAL.sil) : null;
  const h = rows ? +(rows.length * SIL_ROW / FLOOR).toFixed(1) : Math.max(1, Math.min(20, Math.round(CHAL.s / 2500)));
  return {name: CHAL.n || "Friend 朋友", score: CHAL.s, height: h, rows, chal: true};
}
function loadGhosts(){
  fetch("/api/scores?view=ghosts").then(r => r.ok ? r.json() : null).then(j => {
    if (!j || !Array.isArray(j.ghosts)) return;
    const list = j.ghosts.filter(g => g && typeof g.score === "number" && typeof g.name === "string").map(g => {
      const rows = typeof g.sil === "string" ? decodeSilhouette(g.sil) : null;
      return {name: g.name, score: g.score, height: +g.height || 0, rows};
    });
    const cg = chalGhost();
    if (cg && !list.some(x => x.score === cg.score && x.name === cg.name)) list.push(cg);
    GHOSTS = list.sort((a, b) => a.score - b.score);
  }).catch(() => {});
}
function ghostNow(){   // the one to chase: the lowest score still above the player's
  const g = GHOSTS.find(x => x.score > S.score) || null;
  if (g === S.ghost) return;
  if (S.ghost && S.ghost.score <= S.score && S.mode === "playing"){ stamp("Passed " + S.ghost.name + "!", "爬過咗 " + S.ghost.name + "！", "gold"); A.sfx("rival"); haptic([25, 35, 45], 0.6, 0.7); }
  S.ghost = g; S.ghostAt = S.play;
}
function drawGhost(c, g){
  const a = clamp((S.play - S.ghostAt) / 700, 0, 1); let top = 0, cx = W / 2;
  c.save();
  if (g.rows){
    c.globalAlpha = 0.36 * a; c.fillStyle = "#FFFFFF"; c.beginPath();
    g.rows.forEach((r, i) => { if (r){ c.rect(r[0], -(i + 1) * SIL_ROW, r[1] - r[0], SIL_ROW + 0.2); top = -(i + 1) * SIL_ROW; cx = (r[0] + r[1]) / 2; } });
    c.fill();
  } else {
    top = -g.height * FLOOR; c.globalAlpha = 0.75 * a; c.strokeStyle = "#FFFFFF"; c.lineWidth = 2; c.setLineDash([9, 7]);
    c.beginPath(); c.moveTo(W/2 - PW/2, top); c.lineTo(W/2 + PW/2, top); c.stroke(); c.setLineDash([]);
  }
  const t = g.tag || (g.tag = "▲ " + g.name + " · " + fmt(g.score));   // whose it is
  c.font = "800 11px " + K.FONTS.sans; c.textAlign = "center"; c.textBaseline = "middle";
  const tw = g.tw || (g.tw = c.measureText(t).width + 14), x = clamp(cx, tw / 2 + 4, W - tw / 2 - 4), y = top - 12;
  c.globalAlpha = 0.85 * a; c.fillStyle = "#25317A"; roundRect(c, x - tw / 2, y - 9, tw, 18, 9); c.fill();
  c.globalAlpha = a; c.fillStyle = "#FFFFFF"; c.fillText(t, x, y + 0.5);
  c.restore();
}
function setRotLock(n){ S.rotLock = n; root.classList.toggle("rotlock", n > 0); }
function closeCard(){
  if (!S.card) return;
  const power = S.card.flip ? S.card.power : null;
  if (power && S.choices.length){
    const lastCh = S.choices[S.choices.length - 1];
    if (lastCh && lastCh.card === S.card.c.id && lastCh.pick === "wise") lastCh.power = power;
  }
  $("cardModal").hidden = true; S.card = null; modalOpen(false);
  if (S.mode === "card"){
    if (power) applyPower(power);
    S.mode = "playing"; S.nextEvent = S.play + CARD_GAP;
    S.fastOn = S.play < S.speedUntil; A.mode(musicMode());
    while (S.pendingDebt > 0){ S.pendingDebt--; dropDebt(); }
    if (S.afterNet){ S.afterNet = false; raiseNet("Insurance net: falls get caught", "保險網：跌落嚟都接得住"); }
    if (S.afterCard){ quip(S.afterCard, 2); S.afterCard = null; }
    if (S.falls.delay && S.fastOn) stamp("Time flies!", "時間加速", "info");
  }
  $("board").focus({preventScroll:true});
}
function shock(){
  const sh = SHOCKS[Math.floor(Math.random() * SHOCKS.length)];
  if (S.fund > 0){
    S.fund--; A.sfx("shield"); haptic([20, 30, 30], 0.45, 0.55); stamp(sh[0], sh[1] + "：應急錢頂住咗", "good"); quip("shockOk", 2);
    crab("Life happens: " + (sh[0][0].toLowerCase() + sh[0].slice(1)) + ". Your emergency fund kept the tower steady.", "突發：" + sh[1] + "。好彩有應急錢，座塔企得穩。");
  } else {
    S.quakeUntil = S.play + 1700; if (!reduceMotion) S.shake = 10; haptic([60, 40, 90], 0.8, 0.6); A.sfx("quake"); mood("worried", 2200); quip("shockBad", 2);
    stamp(sh[0], sh[1] + "：冇應急錢，座塔震！", "bad");
    crab("Life happens: " + (sh[0][0].toLowerCase() + sh[0].slice(1)) + ". With no emergency fund, everything wobbles.", "突發：" + sh[1] + "。冇應急錢，成座塔都震。");
  }
  updateHUD();
}

// ---------- too good to be true ----------
// Three moments that promise something, hurry the player, don't deliver, then explain (TROLLS in content.js): a
// "guaranteed return" investment (a scam: its profit is never paid out), a lucky scratch card (always a near miss) and,
// when the third item falls, a revive that never works. The first two cost real money in the game; saying no costs
// nothing. The offers stop the game like a Life Event card, and a press in their first 0.45 s doesn't count (it was
// meant for the falling item). With extra reading time (the card timer at 30 s) their countdowns are longer too.
const TR = window.TFF_CONTENT.TROLLS;
const INVEST = 3000, FEE = 1000, TICKET = 500, MAX_TICKETS = 5, PF_MS = 15000, REVIVE_MS = 10000;
const OFFER_MS = {pitch: 6000, fee: 8000, ticket: 8000, again: 6000};
const offerMs = step => (OFFER_MS[step] || 0) * (slowRead ? 2.5 : 1);
const label = (b, [en, zh]) => { const z = document.createElement("span"); z.className = "zh"; z.lang = "zh-HK"; z.textContent = zh; b.replaceChildren(en, z); };
function planTrolls(){   // when the two offers come: the investment at 50-110 s, the scratch card at 45-150 s, 20 s apart or more
  const T = S.troll; T.investAt = 50000 + Math.random() * 60000; T.ticketAt = 45000 + Math.random() * 105000;
  if (Math.abs(T.ticketAt - T.investAt) < 20000) T.ticketAt = T.investAt + (T.investAt < 120000 ? 25000 : -25000);
}
function charge(amount, zh, en){ S.score -= amount; ledger({zh, en}, -amount); updateHUD(); }
// called from tick(): the portfolio's fake profit, and an offer when one is due and nothing else is going on (it waits
// 8 s at a time for a card that's about to open, the jackpot, money to pay with; after 150 s it's dropped)
function trollTick(){
  if (S.pf && portfolioTick()) return true;
  const T = S.troll;
  if (S.play > GAME_MS - 15000) return false;
  for (const [k, kind, need] of [["investAt", "invest", INVEST + 1000], ["ticketAt", "ticket", TICKET]]){
    if (!T[k] || S.play < T[k]) continue;
    if (S.score < need || S.pf || S.nextEvent - S.play < 6000 || frenzyOn() || !$("jpBan").hidden){ T[k] = S.play > 150000 ? 0 : S.play + 8000; continue; }
    T[k] = 0; openOffer(kind); return true;
  }
  return false;
}
function portfolioTick(){   // +0 to +60% over 15 s of play, in steps of HK$300; then the "withdraw" pop-up
  const p = S.pf, k = clamp((S.play - p.at) / PF_MS, 0, 1), gain = Math.floor(INVEST * 0.6 * k / 300) * 300;
  if (gain !== p.gain){ p.gain = gain; $("pfVal").textContent = "+" + fmt(gain); $("pfPct").textContent = "▲" + Math.round(gain / INVEST * 100) + "%"; if (gain) A.sfx("profitTick");
    p.pts = (p.pts || "0,18") + " " + Math.round(4 + k * 54) + "," + Math.max(2, Math.round(18 - k * 15 + (gain / 300 % 2 ? 2 : 0))); $("pfLine").setAttribute("points", p.pts); }
  $("pfChip").style.top = frenzyOn() ? "64px" : "";
  if (k >= 1 && S.nextEvent - S.play > 3000 && !p.asked){ p.asked = true; openOffer("fee"); return true; }
  return false;
}
function openOffer(kind){
  S.mode = "offer"; softHeld = false; keys.left = keys.right = false; S.dragX = null;
  S.offer = {kind, t: 0, stepAt: 0, step: "", limit: 0, sec: -1};
  if (kind === "invest") S.troll.invest = Math.max(1, S.troll.invest);   // offered: declined unless they invest
  if (kind === "ticket") S.troll.ticketSeen = 1;
  A.sfx("offerPop"); A.mode("card");
  const sh = $("offerSheet"); sh.className = "sheet offer " + (kind === "ticket" ? "lucky" : "ad");
  offerStep(kind === "fee" ? "fee" : "pitch");
  $("offerModal").hidden = false; modalOpen(true); fitLine($("offerTitle"));
  sh.style.animation = "none"; void sh.offsetWidth; sh.style.animation = "";
  sh.focus({preventScroll: true});
}
// one screen of an offer: its words, buttons and countdown (0: none)
function offerStep(step){
  const o = S.offer, I = TR.invest, L = TR.ticket, T = S.troll;
  o.step = step; o.stepAt = o.t; o.limit = offerMs(step === "pitch" && o.kind === "ticket" ? "ticket" : step); o.sec = -1; o.sc = 0;
  const set = (title, pitch) => { $("offerTitle").textContent = title[0]; $("offerTitleZh").textContent = title[1]; $("offerPitch").replaceChildren(); if (pitch) bi($("offerPitch"), pitch[0], pitch[1]); };
  const btns = (yes, no) => { const y = $("offerYes"), n = $("offerNo"); y.hidden = !yes; n.hidden = !no; y.disabled = false; if (yes) label(y, yes); if (no) label(n, no); };
  $("offerTag").replaceChildren(); bi($("offerTag"), ...(o.kind === "ticket" ? L.tag : I.tag));
  $("offerClock").hidden = !o.limit; $("offerNote").textContent = ""; $("scratch").hidden = o.kind !== "ticket" || step === "pitch" || step === "lesson";
  $("offerSheet").classList.toggle("bust", step === "gone" || step === "lesson");
  offerArt(o.kind === "ticket" ? "" : step === "pitch" ? "rise" : step === "fee" ? "peak" : step === "wait" ? "crash" : "crash gone");
  if (o.kind === "invest"){ set(I.title, I.pitch); btns(I.yes, I.no); }
  else if (o.kind === "fee"){
    const worth = fmt(INVEST + S.pf.gain), sub = s => s.replace("{n}", worth);
    if (step === "fee"){ set(I.feeTitle.map(sub), I.fee); btns(I.feeYes, I.feeNo); if (S.score < FEE){ $("offerYes").disabled = true; $("offerNote").textContent = I.feeShort.join(" "); } }
    else if (step === "wait"){ set(I.wait, null); btns(null, null); }
    else {   // gone: the scam is a Fall, and the portfolio shows what it really was
      set(I.goneTitle, null); btns(I.ok, null); lessonInto($("offerNote"), I.lesson, I.fact);
      S.falls.scam++; T.scamSaid = 1; S.hand = "phone"; updateHUD(); A.sfx("scam"); haptic([50, 35, 80], 0.8, 0.6);
      $("pfChip").classList.add("gone"); $("pfVal").textContent = "−" + fmt(INVEST + (T.invest === 3 ? FEE : 0)); $("pfPct").textContent = "▼100%";
      $("pfLine").setAttribute("points", (S.pf.pts || "0,18") + " 60,20");
    }
  } else {
    if (step === "pitch"){ set(L.title, L.pitch); btns(L.yes, L.no); }
    else if (step === "scratch"){
      set(L.title, null); btns(null, null); $("offerNote").textContent = L.scratching.join(" ");
      buildScratch();
    } else if (step === "again"){
      set(L.close, L.closeSub); btns(L.again, L.stop);
      if (T.tickets >= MAX_TICKETS || S.score < TICKET){ $("offerYes").hidden = true; $("offerNote").textContent = T.tickets >= MAX_TICKETS ? L.shut.join(" ") : ""; o.limit = 0; $("offerClock").hidden = true; }
    } else {   // lesson
      set(L.lessonTitle, null); btns(L.ok, null); lessonInto($("offerNote"), L.lesson, L.fact, fmt(T.tickets * TICKET));
      if (T.tickets){ S.falls.spend++; S.hand = "bags"; updateHUD(); A.sfx("risky"); }
    }
  }
  fitLine($("offerTitle"));
  const one = $("offerNo").hidden;   // a single button: Enter, 1 or 2 all press it
  $("offerHint").textContent = one ? "Press Enter to continue." : "Press 1 for the first button or 2 (or Esc) for the second" + (root.classList.contains("gamepad") ? "; on the controller, X or Y." : ".");
  if (!$("offerModal").hidden){ const f = !$("offerYes").hidden && !$("offerYes").disabled ? $("offerSheet") : !$("offerNo").hidden ? $("offerNo") : $("offerSheet"); if (one && !$("offerYes").hidden) $("offerYes").focus({preventScroll: true}); else f.focus({preventScroll: true}); }
}
// yes: the first button (invest, pay, buy, got it); no: the second (no thanks, walk away, skip, stop), or the timer ran out
function offerAnswer(yes, force){
  const o = S.offer; if (!o || (!force && o.t - o.stepAt < 450)) return;
  const T = S.troll, I = TR.invest, L = TR.ticket, step = o.kind + ":" + o.step;
  if (step === "invest:pitch"){
    if (yes){ charge(INVEST, "投資", "Investment"); T.invest = 2; S.pf = {at: S.play, gain: -1, asked: false};
      $("pfChip").classList.remove("gone"); $("pfLine").setAttribute("points", "0,18"); $("pfChip").hidden = false; portfolioTick(); quip("invested", 2); }
    else { stamp(I.dodged[0], I.dodged[1], "good"); quip("investDodged", 2); }
    closeOffer();
  } else if (step === "fee:fee"){
    if (yes){ if (S.score < FEE) return; charge(FEE, "手續費", "Release fee"); T.invest = 3; }
    offerStep("wait");
  } else if (step === "fee:gone"){ S.pf = null; $("pfChip").hidden = true; closeOffer(); }
  else if (step === "ticket:pitch" || step === "ticket:again"){
    if (yes){ if ($("offerYes").hidden || S.score < TICKET || T.tickets >= MAX_TICKETS) return; charge(TICKET, "刮刮卡", "Scratch card"); T.tickets++; offerStep("scratch"); }
    else if (o.step === "pitch"){ stamp(L.dodged[0], L.dodged[1], "good"); quip("ticketDodged", 2); closeOffer(); }
    else { quip("ticketStop", 2); offerStep("lesson"); }
  } else if (step === "ticket:lesson") closeOffer();
}
// a lesson: one line in each language and one fact to remember
function lessonInto(el, [en, zh], fact, n){
  const sub = t => t.replace("{n}", n || ""), mk = (tag, cls, t) => { const e = document.createElement(tag); if (cls) e.className = cls; e.textContent = sub(t); return e; };
  const z = mk("span", "zl", zh); z.lang = "zh-HK";
  const f = mk("span", "fact", fact[0]), fz = mk("small", "", fact[1]); fz.lang = "zh-HK"; f.appendChild(fz);
  el.replaceChildren(mk("b", "", en), z, f);
}
function closeOffer(){
  $("offerModal").hidden = true; S.offer = null; modalOpen(false);
  if (S.mode === "offer"){ S.mode = "playing"; A.mode(musicMode()); }
  $("board").focus({preventScroll: true});
}
// each frame while an offer is up: its countdown (the last 3 seconds tick), the pause before the scam is revealed, the
// scratch card's panels. The third always stops on the crab.
function offerFrame(){
  const o = S.offer, el = o.t - o.stepAt;
  if (o.limit){
    const left = o.limit - el;
    $("offerBar").style.transform = "scaleX(" + clamp(left / o.limit, 0, 1).toFixed(3) + ")";
    const sec = Math.max(0, Math.ceil(left / 1000));
    if (sec !== o.sec){ o.sec = sec; $("offerSec").textContent = sec; if (sec <= 3 && sec > 0) A.sfx("cardTick", {n: sec}); }
    if (left <= 0) offerAnswer(false, true);
  } else if (o.step === "wait" && el >= 1400) offerStep("gone");
  else if (o.step === "scratch"){   // a coin scratches the foil off each panel; the third reel spins, slows past the money and stops on the crab
    const c = $("scratch").children, rm = reduceMotion, at = rm ? [100, 250, 300, 500, 550, 800, 1300] : [100, 600, 700, 1200, 1300, 2750, 3600];
    const reveal = (i, sym) => { c[i].dataset.sym = sym; c[i].querySelector(".sym").textContent = sym; c[i].classList.add("on"); };
    if (o.sc < at.length && el >= at[o.sc]){
      switch (o.sc++){
        case 0: c[0].classList.add("scratching"); A.sfx("scratch"); break;
        case 1: reveal(0, "💰"); haptic(14, 0.25, 0.35); break;
        case 2: c[1].classList.add("scratching"); A.sfx("scratch"); break;
        case 3: reveal(1, "💰"); haptic(14, 0.25, 0.35); break;
        case 4: c[2].classList.add("scratching", "rolling"); A.sfx("scratch"); break;
        case 5: c[2].classList.remove("rolling"); reveal(2, "🦀"); c[2].classList.add("miss"); A.sfx("nearMiss"); haptic([30, 40, 45], 0.6, 0.45); $("offerNote").textContent = TR.ticket.close.join(" "); if (!rm) fizzle(); break;
        case 6: offerStep("again"); break;
      }
    }
  }
}
// the scratch card's three panels under silver foil; the third holds a reel that ends on the crab, the money just before it
const REEL = ["💎", "🍀", "🦀", "💰", "💎", "🍀", "💰", "🦀", "💎", "💰", "🍀", "💰", "🦀"];
function buildScratch(){
  [...$("scratch").children].forEach((c, i) => {
    c.className = "sc"; c.dataset.sym = "";
    const el = cls => { const e = document.createElement("span"); e.className = cls; return e; }, parts = [];
    if (i === 2){ const r = el("reel"); r.style.setProperty("--n", REEL.length - 1); for (const x of REEL){ const e = document.createElement("em"); e.textContent = x; r.appendChild(e); } parts.push(r); }
    const coin = el("coin"); coin.textContent = "🪙";
    c.replaceChildren(...parts, el("sym"), el("foil"), coin);
    for (let d = 0; d < 6; d++){ const g = document.createElement("i"); g.className = "dust"; g.style.cssText = "--dx:" + Math.round(Math.random() * 60 - 30) + "px;--dy:" + Math.round(-10 - Math.random() * 30) + "px;--d:" + (d * 60) + "ms;--x:" + (10 + d * 15) + "%"; c.appendChild(g); }
  });
  const old = $("scratch").querySelector(".confetti"); if (old) old.remove();
}
function fizzle(){   // a party that doesn't happen: confetti bursts, then droops and falls flat
  const box = document.createElement("span"); box.className = "confetti";
  const cols = ["#FFE45C", "#FF5FA2", "#20C1B3", "#3A9BF0", "#FF7B35"];
  for (let i = 0; i < 22; i++){ const e = document.createElement("i"); e.style.cssText = "--dx:" + Math.round(Math.random() * 260 - 130) + "px;--dy:" + Math.round(-40 - Math.random() * 70) + "px;--r:" + Math.round(Math.random() * 720 - 360) + "deg;--c:" + cols[i % cols.length] + ";--d:" + Math.round(Math.random() * 120) + "ms"; box.appendChild(e); }
  $("scratch").appendChild(box);
}
// the ad's chart: it rises with a rocket (the pitch), sits at the top (the fee), then crashes, is stamped SUSPENDED and
// the money flies off (the platform vanishing)
function offerArt(state){
  const a = $("offerArt"); a.hidden = !state; if (!state) return;
  if (!a.firstChild){
    a.innerHTML = '<svg viewBox="0 0 300 100" preserveAspectRatio="none"><path class="grid" d="M0 25H300M0 50H300M0 75H300"/>' +
      '<path class="up" pathLength="1" d="M0 92L25 88L45 90L70 78L95 80L120 66L140 70L165 52L190 56L215 38L240 40L265 20L290 8"/>' +
      '<path class="down" pathLength="1" d="M290 8L294 40L297 30L300 104"/></svg>' +
      '<span class="tag t1">+30%</span><span class="tag t2">+60%</span><span class="rocket">🚀</span>' +
      '<span class="susp">SUSPENDED<small>凍結</small></span>' +
      Array.from({length: 7}, (_, i) => '<i class="cash" style="--dx:' + Math.round(Math.random() * 240 - 120) + 'px;--dy:' + Math.round(-30 - Math.random() * 45) + 'px;--r:' + Math.round(Math.random() * 90 - 45) + 'deg;--d:' + (i * 70) + 'ms">💸</i>').join("");
  }
  a.className = "of-art"; void a.offsetWidth; a.className = "of-art " + state;
}
// The revive: a 10 s CONTINUE? screen after the third drop. Pressing it fills a bar to 99%, then it glitches: there is
// no take two. Then the statement, as always.
function openRevive(){
  if (!S || S.mode !== "over" || S.over !== "drops") return showEnd();
  const R = TR.revive;
  S.revive = {t: 0, phase: "ask", sec: -1, at: 0}; S.troll.reviveSeen = 1;
  $("rvTitle").textContent = R.title[0]; const z = document.createElement("span"); z.className = "zh"; z.lang = "zh-HK"; z.textContent = R.title[1]; $("rvTitle").appendChild(z);
  $("rvSub").replaceChildren(); bi($("rvSub"), R.sub[0], R.sub[1]);
  label($("rvYes"), ["❤ " + R.yes[0], R.yes[1]]); label($("rvNo"), R.no); label($("rvGo"), R.go);
  $("rvActions").hidden = false; $("rvCount").hidden = false; $("rvBarBox").hidden = true; $("rvLesson").hidden = true; $("rvMsg").textContent = "";
  $("rvBar").style.transform = "scaleX(0)"; $("rvSheet").classList.remove("glitch", "dead"); $("rvSub").hidden = false;
  $("reviveModal").hidden = false; modalOpen(true); $("rvYes").focus({preventScroll: true});
}
function reviveFrame(dt){
  const r = S.revive; r.t += dt;
  const limit = REVIVE_MS * (slowRead ? 2 : 1);
  if (r.phase === "ask"){
    const sec = Math.max(0, Math.ceil((limit - r.t) / 1000));
    if (sec !== r.sec){ r.sec = sec; $("rvCount").textContent = sec; if (sec > 0){ A.sfx("heartbeat"); haptic([18, 55, 14], 0.35, 0.25); const c = $("rvCount"); c.classList.remove("beat"); void c.offsetWidth; c.classList.add("beat"); } }
    if (r.t >= limit) reviveAnswer(false, true);
  } else if (r.phase === "busy"){
    const k = Math.min(0.99, (r.t - r.at) / 2500);
    $("rvBar").style.transform = "scaleX(" + k.toFixed(3) + ")"; $("rvMsg").textContent = TR.revive.busy[0] + " " + Math.round(k * 100) + "% " + TR.revive.busy[1];
    if (r.t - r.at >= 2900){
      r.phase = "fail"; r.at = r.t; $("rvSheet").classList.add("glitch", "dead"); if (!reduceMotion) $("boardWrap").classList.add("static");
      $("rvMsg").textContent = TR.revive.fail.join(" "); A.sfx("reviveFail"); haptic([80, 40, 120], 0.9, 0.7); mood("cover", 4000);
    }
  } else if (r.phase === "fail" && r.t - r.at >= 1150 && !r.crt && !reduceMotion){ r.crt = true; $("boardWrap").classList.add("crt"); }   // the screen switches off
  else if (r.phase === "fail" && r.t - r.at >= (reduceMotion ? 1200 : 2000)){
    r.phase = "lesson"; $("boardWrap").classList.remove("static", "crt"); $("rvSheet").classList.remove("glitch"); $("reviveModal").classList.remove("watch");
    lessonInto($("rvLessonText"), TR.revive.lesson, TR.revive.fact);
    $("rvLesson").hidden = false; $("rvGo").focus({preventScroll: true});
  }
}
function reviveAnswer(yes, force){
  const r = S.revive; if (!r || r.phase !== "ask" || (!force && r.t < 600)) return;   // a key mashed as the third item fell
  if (!yes){ closeRevive(); if (!force) quip("reviveGiveUp", 3); showEnd(); return; }
  S.troll.revive = 1; r.phase = "busy"; r.at = r.t; r.splashed = [];
  $("rvActions").hidden = true; $("rvCount").hidden = true; $("rvSub").hidden = true; $("rvBarBox").hidden = false;
  $("reviveModal").classList.add("watch");   // out of the way: the items rising from the harbour are the show
  mood("happy", 3000); A.sfx("vineGet"); $("rvSheet").focus({preventScroll: true});
}
function closeRevive(){ $("reviveModal").hidden = true; $("reviveModal").classList.remove("watch"); S.revive = null; $("boardWrap").classList.remove("static", "crt"); }
// the revive on the board: the items that fell rise out of the harbour, glowing, up to the top of the tower; at 99%
// they hang there flickering, then drop back in with a splash
function drawGhosts(c, k){
  const r = S.revive; if (!S.lost.length || (r.phase !== "busy" && r.phase !== "fail")) return;
  const items = S.lost.slice(-3), n = items.length, top = -S.height, y0 = WATER_Y + 80;
  c.save();
  items.forEach((def, i) => {
    const x = W / 2 + (i - (n - 1) / 2) * 92, ty = top - 130 - (i % 2) * 34;
    let y, a = 0.72;
    if (r.phase === "busy"){
      const p = clamp((r.t - r.at - i * 250) / 2200, 0, 1), e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(2 - 2 * p, 3) / 2;   // ease in and out
      y = y0 + (ty - y0) * e + (reduceMotion ? 0 : Math.sin((r.t + i * 300) / 260) * 3 * e);
      const g = c.createLinearGradient(0, y, 0, WATER_Y);   // a beam of light from the harbour up to it
      g.addColorStop(0, "rgba(255,250,210,0.5)"); g.addColorStop(1, "rgba(255,250,210,0)");
      c.globalAlpha = 1; c.shadowBlur = 0; c.fillStyle = g; c.fillRect(x - 24, y, 48, Math.max(0, WATER_Y - y));
    } else {
      const ft = r.t - r.at, fall = reduceMotion ? 0 : Math.max(0, ft - 350 - i * 120);
      y = ty + 0.0016 * fall * fall; a = reduceMotion ? Math.max(0, 0.72 - ft / 600) : ft < 700 && Math.floor(ft / 60) % 2 ? 0.25 : 0.72;
      if (!r.splashed[i] && y > WATER_Y){ r.splashed[i] = true; S.splashes.push({x, t: 0, big: true}); A.sfx("splash"); }
      if (y > WATER_Y + 90 || a <= 0) return;
    }
    const s = spriteNear(def, 0, true); if (!s) return;
    c.globalAlpha = a; c.shadowColor = "rgba(255,244,190,1)"; c.shadowBlur = 26 * k;
    c.save(); c.translate(x, y); c.drawImage(s.img, s.x0, s.y0, s.w, s.h); c.restore();
    if (r.phase === "busy" && !reduceMotion){ c.shadowBlur = 0;
      for (let j = 0; j < 3; j++) twinkle(c, x + Math.sin(r.t / 170 + i + j * 2.1) * 30, y - 10 + Math.cos(r.t / 210 + j) * 24, 3.5 + Math.sin(r.t / 90 + i * 2 + j) * 2, 0.85); }
  });
  c.restore();
}
$("offerYes").addEventListener("click", () => offerAnswer(true));
$("offerNo").addEventListener("click", () => offerAnswer(false));
$("rvYes").addEventListener("click", () => reviveAnswer(true));
$("rvNo").addEventListener("click", () => reviveAnswer(false));
$("rvGo").addEventListener("click", () => { if (!S.revive || S.revive.phase !== "lesson") return; closeRevive(); showEnd(); });

// ---------- jackpot ----------
// The Jackpot crab's moment: money rains over the whole screen (a canvas laid over the page), a banner pops up on the
// board, the windfall goes in, and jackpot time starts: every item and floor pays FRENZY_X for FRENZY_MS of play (a card
// or the pause stops its clock too), with a badge counting down, a gold glow round the board (CSS, so it costs the
// game's frame nothing) and each item's pay floating up from it. With reduced motion the rain is a gold flash, and
// nothing shakes or pulses.
const frenzyOn = () => !!S && S.play < S.frenzyUntil;
const musicMode = () => frenzyOn() ? "frenzy" : S.play < S.speedUntil ? "fast" : "normal";
function pay(base){   // what an item (500 / 300) or a floor (2000) pays right now, and the multiplier
  const [gain, x, extra] = computePayout(base, S.rate, frenzyOn(), FRENZY_X);
  if (extra > 0) S.jpExtra += extra;
  return [gain, x];
}
function jackpotHit(){
  S.jpAt = S.play; S.frenzyUntil = S.play + FRENZY_MS; S.frenzySec = 0;
  S.score += JACKPOT_BONUS; ledger({zh: "大獎", en: "Jackpot windfall"}, JACKPOT_BONUS);
  A.sfx("jackpot"); A.mode(musicMode());
  haptic([70, 50, 70, 50, 180], 0.9, 0.7);
  if (!reduceMotion){ const bw = $("boardWrap"); bw.classList.remove("jpshake"); void bw.offsetWidth; bw.classList.add("jpshake"); }   // moved as a whole: the tower stays cached
  mood("happy", 3500); quip("jackpot", 3);
  const sec = FRENZY_MS / 1000;
  crab("A " + fmt(JACKPOT_BONUS) + " windfall, and ×" + FRENZY_X + " pay for " + sec + " seconds. Luck pays once; good habits keep paying.",
       "意外之財 " + fmt(JACKPOT_BONUS) + "，加" + sec + "秒" + FRENZY_X + "倍收入。好運只係一次，好習慣先會一直有回報。");
  moneyRain(); jackpotBanner(); frenzyUI(); updateHUD();
  const st = S;   // once the banner has gone: what the crab itself does
  setTimeout(() => { if (S === st && S.mode === "playing") stamp("Its claws catch what lands", "對鉗接住跌落嚟嘅嘢", "gold"); }, 3100);
}
function frenzyTick(){
  const left = S.frenzyUntil - S.play;
  if (left <= 0){ frenzyEnd(); return; }
  const sec = Math.ceil(left / 1000);
  if (sec !== S.frenzySec){ S.frenzySec = sec; if (sec <= 3) A.sfx("frenzyTick", {n: sec}); }
  frenzyUI();
}
function frenzyEnd(){
  S.frenzyUntil = 0; frenzyUI(); A.sfx("frenzyEnd"); A.mode(musicMode());
  stamp("Jackpot time is over", "大獎時間完", "info"); quip("frenzyEnd", 2, fmt(JACKPOT_BONUS + S.jpExtra));
}
const FZ = {el: $("frenzy"), sec: $("frenzySec"), bar: $("frenzyBar"), shown: false, s: -1};
$("frenzyX").textContent = "×" + FRENZY_X;
function frenzyUI(){   // the countdown badge on the board and the glowing balance
  const on = frenzyOn() && S.mode !== "over";
  if (on !== FZ.shown){ FZ.shown = on; FZ.el.hidden = !on; document.documentElement.classList.toggle("jp", on); document.documentElement.classList.remove("jp-end"); FZ.s = -1; }
  if (!on) return;
  const left = S.frenzyUntil - S.play, sec = Math.ceil(left / 1000);
  if (sec !== FZ.s){ FZ.s = sec; FZ.sec.textContent = sec; FZ.el.classList.toggle("ending", sec <= 3); document.documentElement.classList.toggle("jp-end", sec <= 3); }
  FZ.bar.style.transform = "scaleX(" + clamp(left / FRENZY_MS, 0, 1).toFixed(3) + ")";
}
let banT = 0;
function jackpotBanner(){
  const b = $("jpBan"), sec = FRENZY_MS / 1000; $("jpAmt").textContent = "+" + fmt(JACKPOT_BONUS);
  $("jpNote").textContent = "Everything pays ×" + FRENZY_X + " for " + sec + " s · " + sec + "秒內存入" + FRENZY_X + "倍";
  b.hidden = false; b.classList.remove("show"); void b.offsetWidth; b.classList.add("show");
  clearTimeout(banT); banT = setTimeout(() => { b.hidden = true; b.classList.remove("show"); }, 2400);
}
// each item's pay floats up from it in jackpot time (world units, drawn with the tower)
function popMoney(m, gain){
  const p = poseOf(m);
  S.pops.push({x: clamp(p.x, 50, W - 50), y: hostOf(m).bounds.min.y - 8, t: 0, txt: "+" + fmt(gain)});
  if (S.pops.length > 8) S.pops.shift();
}
function drawPops(c, f){
  c.save(); c.textAlign = "center"; c.textBaseline = "middle"; c.lineJoin = "round";
  for (const q of S.pops){
    q.t += f; const k = q.t / 75, s = reduceMotion ? 1 : Math.min(1, 0.55 + q.t / 9);
    const y = q.y - (reduceMotion ? 0 : 30 * (1 - Math.pow(1 - Math.min(1, k), 2)));
    c.globalAlpha = k < 0.7 ? 1 : Math.max(0, 1 - (k - 0.7) / 0.3);
    c.font = "900 " + (16 * s).toFixed(1) + "px " + K.FONTS.display;
    const tw = c.measureText(q.txt).width, x = q.x - 14 * s;
    c.lineWidth = 4.5 * s; c.strokeStyle = "rgba(96,52,0,0.9)"; c.strokeText(q.txt, x, y);
    c.fillStyle = "#FFE45C"; c.fillText(q.txt, x, y);
    c.font = "900 " + (11 * s).toFixed(1) + "px " + K.FONTS.display;   // the ×1.5 tag
    const tag = "×" + FRENZY_X, bx = x + tw / 2 + 4 * s, bw = c.measureText(tag).width + 10 * s, bh = 15 * s;
    c.fillStyle = "#FF7B35"; roundRect(c, bx, y - bh / 2, bw, bh, bh / 2); c.fill();
    c.fillStyle = "#fff"; c.fillText(tag, bx + bw / 2, y + 0.5);
  }
  c.restore();
  S.pops = S.pops.filter(q => q.t < 75); needDraw = true;
}
function twinkle(c, x, y, r, a){
  if (r < 0.6) return;
  c.globalAlpha = a; c.fillStyle = "#FFF7C9"; c.beginPath(); c.moveTo(x, y - r);
  c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r);
  c.fill(); c.globalAlpha = 1;
}
// The rain fills the whole window, over the page: banknotes (HK$20 blue, 100 red, 500 brown, 1000 gold) flutter and
// flip as they fall, coins spin, and a burst of coins first leaps up from the board. Each picture is made once per
// size, so a frame draws ~200 small images; it stops itself (and hides its canvas) once the last one has fallen.
const RAIN = {cv: null, g: null, parts: [], sparks: [], t0: 0, last: 0, raf: 0, w: 0, h: 0, dpr: 1, spr: null, sprKey: ""};
const NOTES = [["#3B7FD4", "20"], ["#D9433B", "100"], ["#9A5A2C", "500"], ["#E19A26", "1000"]];
function rainSprites(u, dpr){
  const key = u + "|" + dpr; if (RAIN.sprKey === key) return RAIN.spr;
  const mk = (w, h, fn) => { const c = document.createElement("canvas"); c.width = Math.ceil(w * dpr); c.height = Math.ceil(h * dpr); const g = c.getContext("2d"); g.scale(dpr, dpr); fn(g); return c; };
  const nw = u, nh = Math.round(u * 0.5), cr = Math.round(u * 0.22);
  const notes = NOTES.map(([col, val]) => [false, true].map(back => mk(nw, nh, g => {
    roundRect(g, 0.5, 0.5, nw - 1, nh - 1, nh * 0.12); g.fillStyle = col; g.fill();
    g.save(); g.clip(); g.lineWidth = Math.max(1.5, u / 28);   // clay rim, as everything else
    g.strokeStyle = "rgba(255,255,255,0.55)"; roundRect(g, 1.5, 1.5, nw - 1, nh - 1, nh * 0.12); g.stroke();
    g.strokeStyle = "rgba(0,0,0,0.18)"; roundRect(g, -0.5, -0.5, nw - 1, nh - 1, nh * 0.12); g.stroke(); g.restore();
    const sh = g.createLinearGradient(0, 0, nw, nh); sh.addColorStop(0, "rgba(255,255,255,0.3)"); sh.addColorStop(0.5, "rgba(255,255,255,0.04)"); sh.addColorStop(1, "rgba(0,0,0,0.2)");
    g.fillStyle = sh; g.fill();
    g.strokeStyle = "rgba(255,255,255,0.6)"; g.lineWidth = Math.max(1, u / 45); roundRect(g, nh * 0.12, nh * 0.12, nw - nh * 0.24, nh * 0.76, nh * 0.08); g.stroke();
    g.fillStyle = "rgba(255,255,255,0.3)"; g.beginPath(); g.ellipse(back ? nw * 0.7 : nw * 0.3, nh / 2, nh * 0.25, nh * 0.29, 0, 0, 7); g.fill();   // the watermark window
    g.fillStyle = "#fff"; g.textBaseline = "middle"; g.textAlign = "center";
    g.font = "900 " + (nh * 0.38).toFixed(1) + "px " + K.FONTS.display;
    if (back){ g.fillText(val, nw * 0.7, nh * 0.54); return; }
    g.fillText("$", nw * 0.3, nh * 0.54);
    g.textAlign = "right"; g.font = "900 " + (nh * 0.3).toFixed(1) + "px " + K.FONTS.display; g.fillText(val, nw - nh * 0.24, nh * 0.38);
    g.font = "800 " + (nh * 0.17).toFixed(1) + "px " + K.FONTS.display; g.fillText("HK$", nw - nh * 0.24, nh * 0.7);
  })));
  const coin = mk(cr * 2 + 2, cr * 2 + 2, g => {
    const x = cr + 1, y = cr + 1, gr = g.createRadialGradient(x - cr * 0.35, y - cr * 0.4, cr * 0.1, x, y, cr);
    gr.addColorStop(0, "#FFF6C2"); gr.addColorStop(0.45, "#FFD23F"); gr.addColorStop(1, "#C98A0E");
    g.fillStyle = gr; g.beginPath(); g.arc(x, y, cr, 0, 7); g.fill();
    g.strokeStyle = "#A86A08"; g.lineWidth = Math.max(1, cr * 0.12); g.stroke();
    g.strokeStyle = "rgba(168,106,8,0.55)"; g.lineWidth = Math.max(0.8, cr * 0.07); g.beginPath(); g.arc(x, y, cr * 0.72, 0, 7); g.stroke();
    g.fillStyle = "#A86A08"; g.textAlign = "center"; g.textBaseline = "middle"; g.font = "900 " + (cr * 1.05).toFixed(1) + "px " + K.FONTS.display; g.fillText("$", x, y + cr * 0.06);
  });
  RAIN.spr = {notes, coin, nw, nh, cr}; RAIN.sprKey = key; return RAIN.spr;
}
function moneyRain(){
  if (!RAIN.cv){ const c = RAIN.cv = document.createElement("canvas"); c.className = "rain"; c.setAttribute("aria-hidden", "true"); document.body.appendChild(c); RAIN.g = c.getContext("2d"); }
  const c = RAIN.cv; c.hidden = false;
  const w = c.clientWidth || window.innerWidth, h = c.clientHeight || window.innerHeight, dpr = lowGfx ? 1 : Math.min(1.5, window.devicePixelRatio || 1);   // all in motion: no need for more
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)){ c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
  Object.assign(RAIN, {w, h, dpr, parts: [], sparks: [], t0: performance.now(), last: 0, box: cv.getBoundingClientRect()});
  if (!reduceMotion){
    const u = clamp(Math.round(Math.min(w, h) / 9), 36, 84), spr = rainSprites(u, lowGfx ? 1 : Math.min(2, window.devicePixelRatio || 1)), n = Math.round(clamp(w * h / (lowGfx ? 16000 : 6500), lowGfx ? 24 : 60, lowGfx ? 60 : 180));
    for (let i = 0; i < n; i++){
      const note = Math.random() < 0.68;
      RAIN.parts.push({note, imgs: note ? spr.notes[Math.floor(Math.random() * spr.notes.length)] : null, x: Math.random() * w, y: -u - Math.random() * h * 0.2,
        vx: (Math.random() - 0.5) * 50, vy: (note ? 0.15 : 0.35) * h + Math.random() * 0.2 * h, delay: Math.random() * 1700 * (0.25 + i / n),
        a: (Math.random() - 0.5) * 1.2, va: (Math.random() - 0.5) * (note ? 2.4 : 1), flip: Math.random() * 6.28, vf: (note ? 3 : 9) + Math.random() * 5,
        sway: note ? 25 + Math.random() * 45 : 0, sp: Math.random() * 6.28, s: 0.7 + Math.random() * 0.55, term: (0.28 + Math.random() * 0.16) * h});
    }
    const r = cv.getBoundingClientRect(), bx = r.left + r.width / 2, by = r.top + r.height * 0.42;   // a burst of coins from the board
    const burstN = lowGfx ? 10 : 28, sparkN = lowGfx ? 10 : 30;
    for (let i = 0; i < burstN; i++){
      const ang = -Math.PI / 2 + (Math.random() - 0.5) * 2.3, v = (0.55 + Math.random() * 0.75) * h;
      RAIN.parts.push({note: false, x: bx, y: by, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, delay: Math.random() * 120, a: 0, va: 0,
        flip: Math.random() * 6.28, vf: 10 + Math.random() * 8, sway: 0, sp: 0, s: 0.8 + Math.random() * 0.5, term: 0});
    }
    for (let i = 0; i < sparkN; i++) RAIN.sparks.push({x: Math.random() * w, y: Math.random() * h, delay: Math.random() * 2600, life: 380 + Math.random() * 320, r: 7 + Math.random() * 11});
  }
  if (!RAIN.raf) RAIN.raf = requestAnimationFrame(rainFrame);
}
function rainFrame(now){
  const R = RAIN, g = R.g, el = now - R.t0, dt = R.last ? Math.min(0.05, (now - R.last) / 1000) : 0.016; R.last = now;
  g.setTransform(R.dpr, 0, 0, R.dpr, 0, 0); g.clearRect(0, 0, R.w, R.h);
  const fl = reduceMotion ? (el < 300 ? el / 300 : Math.max(0, 1 - (el - 300) / 1400)) * 0.22 : Math.max(0, 1 - el / 480) * 0.55;
  if (fl > 0){   // the flash: the whole effect when motion is reduced
    const B = reduceMotion ? R.box : {left: 0, top: 0, width: R.w, height: R.h}, cx = B.left + B.width / 2, cy = B.top + B.height / 2;
    const gr = g.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(B.width, B.height) / 2);
    gr.addColorStop(0, "rgba(255,246,190," + fl.toFixed(3) + ")"); gr.addColorStop(1, "rgba(255,186,40," + (fl * 0.85).toFixed(3) + ")");
    g.fillStyle = gr; g.fillRect(B.left, B.top, B.width, B.height);
  }
  const spr = R.spr, grav = R.h * 1.7; let left = el < (reduceMotion ? 1700 : 480);   // the flash still to come
  for (const p of R.parts){
    if (p.done) continue; left = true;
    if (el < p.delay) continue;
    if (p.note){ p.vy += (p.term - p.vy) * Math.min(1, dt * 2.2); p.a += Math.sin(el / 420 + p.sp) * p.va * dt; }   // paper: drifts to its slow fall, rocking
    else p.vy += grav * dt;
    p.x += (p.vx + (p.sway ? Math.cos(el / 330 + p.sp) * p.sway : 0)) * dt; p.y += p.vy * dt; p.flip += p.vf * dt;
    if (p.y > R.h + 80 || p.x < -120 || p.x > R.w + 120){ p.done = true; continue; }
    const fc = Math.cos(p.flip), D = R.dpr;   // one transform per piece: place, turn, and squash for the flip or spin
    if (p.note){
      const fy = Math.max(0.08, Math.abs(fc)), ca = Math.cos(p.a), sa = Math.sin(p.a), w = spr.nw * p.s, h = spr.nh * p.s;
      g.setTransform(D * ca, D * sa, -D * sa * fy, D * ca * fy, D * p.x, D * p.y);
      g.drawImage(p.imgs[fc < 0 ? 1 : 0], -w / 2, -h / 2, w, h);
    } else {
      const d = (spr.cr * 2 + 2) * p.s;
      g.setTransform(D * Math.max(0.12, Math.abs(fc)), 0, 0, D, D * p.x, D * p.y);
      g.drawImage(spr.coin, -d / 2, -d / 2, d, d);
    }
  }
  g.setTransform(R.dpr, 0, 0, R.dpr, 0, 0);
  for (const s of R.sparks){
    const t = el - s.delay; if (t > s.life) continue; left = true; if (t < 0) continue;
    const k = Math.sin(t / s.life * Math.PI); twinkle(g, s.x, s.y, s.r * k, k);
  }
  if (left && el < 8000){ R.raf = requestAnimationFrame(rainFrame); return; }
  g.clearRect(0, 0, R.w, R.h); R.cv.hidden = true; R.raf = 0; R.parts = []; R.sparks = [];
}

