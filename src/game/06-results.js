// ---------- the result: the top of the statement, and a picture of it to save or share ----------
// The statement opens on the result: the player as the game left them, the net worth counting up (the number pops),
// what they reached. "Save image" makes a 1080 x 1350 JPEG card of it (the game's own sky, city and harbour, the
// player, the amount, the stage, the 3 Falls, the address); "Share" hands it to the phone's share sheet (Instagram,
// WhatsApp...) where the browser can share files. The card is made in advance: a share must happen right on the tap.
let cardBlob = null, cardKey = "", heroRun = 0, takes = 0;
const canShareFiles = () => { try { return !!(navigator.share && navigator.canShare && navigator.canShare({ files: [new File([new Uint8Array([255, 216, 255])], "x.jpg", { type: "image/jpeg" })] })); } catch (e) { return false; } };
// The nickname on the result card: the board's version once posted (its filter may have hidden it), otherwise
// whatever the player typed (it's their own picture).
const cardName = () => { if (!S) return ""; const n = S.posted ? S.boardName || (S.rec && S.rec.name) : sanitizeName($("nickname").value); return n && n !== ANON ? n : ""; };
function heroUp() {
  const up = S.score > 0, cong = $("heroCong"), en = document.createElement("span"), hero = $("stHero");
  en.textContent = up ? "Congrats! You saved" : "Your net worth"; cong.replaceChildren(up ? "恭喜你儲到" : "你嘅淨資產", en);
  avKeys.delete($("endAvatar")); paintAvatar($("endAvatar"), lookNow());   // as the game left them
  hero.classList.remove("pop"); void hero.offsetWidth; if (!reduceMotion) hero.classList.add("pop");
  const to = Math.round(S.score), t0 = performance.now(), ms = reduceMotion ? 0 : 900, run = ++heroRun, amt = $("heroAmt"), box = amt.parentNode;
  box.style.fontSize = ""; amt.textContent = fmt(to);   // sized to fit the final amount first, so the count doesn't jump
  for (let fs = parseFloat(getComputedStyle(box).fontSize); box.scrollWidth > box.clientWidth + 1 && fs > 20;) box.style.fontSize = (fs -= 2) + "px";
  const step = now => { if (run !== heroRun) return; const k = ms ? Math.min(1, (now - t0) / ms) : 1, e = 1 - Math.pow(1 - k, 3); amt.textContent = fmt(Math.round(to * e / 10) * 10); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
  $("shareStatus").textContent = ""; $("cardImg").removeAttribute("src");
  cardBlob = null; setTimeout(() => { if (run === heroRun) readyCard().catch(() => { }); }, 1200);
}
// The statement is four steps, pressed through in order like the title screen: 1 the result, 2 the survey (all three
// questions answered and a habit picked before going on), 3 the leaderboard (nickname and email to post, or skip),
// 4 the result card (save, share), then See tower or Play again. Play again on the tower view waits for step 4 too.
const STEP_FOCUS = ["endTitle", "quizHead", "infoHead", "cardHead"];
const surveyDone = () => !!S && S.quiz.every(Boolean) && !!S.habit;
function stepButtons() {
  const n = S.step, next = $("stNext"), posted = !!S.posted;
  $("stBack").hidden = n === 1 || n === 4; next.hidden = n === 4; $("closeEnd").hidden = $("againBtn").hidden = n !== 4;
  next.disabled = n === 2 && !surveyDone();
  next.classList.toggle("alt", n === 3 && !posted);
  label(next, n === 3 ? (posted ? ["See my card", "睇結果卡"] : ["Skip posting", "唔上榜"]) : ["Next", "下一步"]);
  $("surveyGate").textContent = n === 2 && !surveyDone() ? "Answer all 3 questions and pick a habit to go on. 答晒3題同揀一個習慣，先可以繼續。" : "";
}
function setStep(n, focus) {
  if (S.step && n !== S.step) A.sfx(n > S.step ? "uiNext" : "uiBack");
  S.step = n; if (n === 4) S.flowDone = true;
  const sheet = document.querySelector("#endModal .statement"); sheet.dataset.step = n;
  [...$("stSteps").children].forEach((li, i) => { li.classList.toggle("done", i + 1 < n); if (i + 1 === n) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current"); });
  stepButtons();
  const body = $("stBody"); body.classList.remove("enter"); void body.offsetWidth; if (!reduceMotion) body.classList.add("enter");
  $("stScroll").scrollTop = 0;
  if (n === 4) showCard();
  if (focus !== false) $(STEP_FOCUS[n - 1]).focus({ preventScroll: true });
}
async function showCard() {
  const img = $("cardImg"), ps = $("postStatus");
  $("cardRank").textContent = S.posted ? ps.textContent : "";
  img.alt = "Your result card: " + fmt(S.score) + ", " + (S.stage === STAGES.length - 1 ? "made it to Retirement" : "reached " + STAGES[S.stage].en) + ". 你的結果卡";
  $("shareImg").hidden = !canShareFiles(); $("iabSave").hidden = !IAB;
  threadsLink();
  try {
    const b = await readyCard();
    if (IAB) img.src = await new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(b); });   // press-and-hold can save it
    else { if (img._url) URL.revokeObjectURL(img._url); img._url = URL.createObjectURL(b); img.src = img._url; }
  } catch (e) { }
}
$("stNext").addEventListener("click", () => { if (S.step < 4 && !(S.step === 2 && !surveyDone())) setStep(S.step + 1); });
$("stBack").addEventListener("click", () => { if (S.step > 1) setStep(S.step - 1); });
// ---------- the result card as a film poster ----------
// One of seven posters (src/share/posters/, made with GPT Image 2 from the cast's model sheets), picked by where and how
// the game ended: Overspending twice (or once at University) gets the trolley (使少啲，笑多啲) at any stage; else at
// Retirement, the rooftop (跌咗，再疊過) after two or more items in the harbour, otherwise the ferry; at Family the
// studio portrait; at First Job the diner; at University (out early, on the third item in the harbour) the estate for a
// 劏房 or 公屋 roll, otherwise the diver. Every poster comes up in real play (the kit's posters test tries every way a
// game can end). The card is 1080 x 1920, an Instagram story's shape: the poster untouched on top, and under it a
// credits panel like a film poster's billing. Without the poster (offline, too slow) the card is drawn as before.
const POSTER_URL = (() => { try { return JSON.parse((document.querySelector('meta[name="tff-posters"]') || {}).content || "{}"); } catch (e) { return {}; } })();
function posterFor(s) {
  // A full 3-minute game ends at Retirement (with fewer than 3 items lost, the pile passes 15F), so the earlier stages are
  // mostly games that ended on the third item in the harbour: each stage has its own posters, so every one comes up.
  const uni = s.stage === 0, homely = !!(s.persona && (s.persona.bg === "sub" || s.persona.bg === "estate"));
  if (s.falls.spend >= 2 || (uni && s.falls.spend >= 1)) return "trolley";   // 使少啲，笑多啲
  if (s.stage >= 3) return s.drops >= 2 ? "rooftop" : "ferry";               // 跌咗，再疊過 / 疊咗一世，慢慢嘆
  if (s.stage === 2) return "family";                                        // 成家，就係一齊疊
  if (s.stage === 1) return "diner";                                         // 第一份糧，先儲兩成
  if (homely) return "estate";                                               // 一格一格，疊出人生
  return s.over === "drops" ? "diver" : "rooftop";                           // 跌落海，笑住浮返上嚟
}
const posterPics = new Map();
function loadPoster(key) {   // starts as the game ends, so it's there by the time the card is made
  if (!POSTER_URL[key]) return Promise.resolve(null);
  if (!posterPics.has(key)) posterPics.set(key, new Promise(res => {
    const im = new Image(); im.decoding = "async";
    im.onload = () => res(im); im.onerror = () => { posterPics.delete(key); res(null); }; im.src = POSTER_URL[key];
  }));
  return posterPics.get(key);
}
const CARD_H = 1920, PANEL = 1350;   // the poster's height: the panel starts there
const CARD_R = 60, NOTCH = 30;   // the ticket's rounded corners, and the notches where its stub tears off
function drawPosterCard(g, img, medalPic) {
  const F = K.FONTS, v = S.verdict || verdictOf(S), st = STAGES[S.stage], top = S.stage === STAGES.length - 1;
  const P = personaOf(S.persona), who = WHO === "jackie" ? "Jackie" : "Jack", nm = cardName() || who;
  const CREAM = "#F6F0D8", GOLD = "#C9A35A", DIM = "#B5AFC4", SERIF = 'Georgia,"Times New Roman","Noto Serif",serif';
  const fit = (t, w, size, min, font) => { let f = size; g.font = font(f); while (g.measureText(t).width > w && f > min) { f -= 1; g.font = font(f); } return g.font; };
  const say = (t, x, y, w, size, min, font, color, align) => { g.textAlign = align || "left"; g.fillStyle = color; g.font = fit(t, w, size, min, font); g.fillText(t, x, y); };
  const spaced = (px) => { if ("letterSpacing" in g) g.letterSpacing = px + "px"; };
  const label = (t, x, y, align, w) => { spaced(4); say(t, x, y, w || 400, 21, 13, f => "800 " + f + "px " + F.sans, GOLD, align); spaced(0); };
  const zh = w => f => w + " " + f + "px " + F.zh, it = f => "italic 700 " + f + "px " + SERIF;
  // the ticket's shape: rounded corners (the picture is a PNG, so they stay round when saved)
  g.save(); g.beginPath(); g.moveTo(CARD_R, 0); g.arcTo(1080, 0, 1080, CARD_H, CARD_R); g.arcTo(1080, CARD_H, 0, CARD_H, CARD_R); g.arcTo(0, CARD_H, 0, 0, CARD_R); g.arcTo(0, 0, 1080, 0, CARD_R); g.closePath(); g.clip();
  g.drawImage(img, 0, 0, 1080, PANEL);   // the poster, untouched
  // the stub: a deep night-blue, a fine film grain
  const bg = g.createLinearGradient(0, PANEL, 0, CARD_H); bg.addColorStop(0, "#171A33"); bg.addColorStop(1, "#0B0C17"); g.fillStyle = bg; g.fillRect(0, PANEL, 1080, CARD_H - PANEL);
  let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 2600; i++) { g.fillStyle = "rgba(255,255,255," + (0.02 + rnd() * 0.05).toFixed(3) + ")"; g.fillRect(rnd() * 1080, PANEL + rnd() * (CARD_H - PANEL), 1.6, 1.6); }
  const rule = y => { g.fillStyle = "rgba(201,163,90,0.45)"; g.fillRect(60, y, 960, 2); };
  const tear = y => {
    g.save(); g.setLineDash([10, 9]); g.strokeStyle = "rgba(246,240,216,0.55)"; g.lineWidth = 3; g.beginPath(); g.moveTo(NOTCH + 14, y); g.lineTo(1080 - NOTCH - 14, y); g.stroke();
    g.setLineDash([]); g.fillStyle = "rgba(11,12,23,0.42)";
    for (let px = NOTCH + 24; px < 1080 - NOTCH - 20; px += 22) { g.beginPath(); g.arc(px, y, 2.2, 0, Math.PI * 2); g.fill(); }
    g.restore();
  };
  const p0 = PANEL, no = String(Math.abs(Math.round(S.endAt || Date.now())) % 10000000).padStart(7, "0");
  tear(p0);
  // the header: ADMIT ONE, the programme, the ticket's number
  label("ADMIT ONE · 入場券", 60, p0 + 44);
  say("HSUHK 個人理財大使計劃 2026 · 3 Fall Crab 整冧咗team", 548, p0 + 44, 400, 18, 12, zh(500), DIM, "center");
  label("No. " + no, 1020, p0 + 44, "right", 200);
  // the 稱號 with its medal and roast
  if (medalPic) { g.save(); g.shadowColor = "rgba(0,0,0,0.5)"; g.shadowBlur = 16; g.shadowOffsetY = 6; g.drawImage(medalPic, 60, p0 + 64, 136, 160); g.restore(); }
  else flatMedal(g, 128, p0 + 150, 48, tierOf(v));
  label("我的稱號 · MY TITLE", 230, p0 + 94);
  const foil = g.createLinearGradient(230, p0 + 104, 230, p0 + 162);
  foil.addColorStop(0, "#FFF8DC"); foil.addColorStop(0.5, "#FFE08A"); foil.addColorStop(0.85, "#D4A24C"); foil.addColorStop(1, "#FFFDF0");
  say(v.zh, 230, p0 + 152, 790, 58, 32, zh(700), foil);
  say(v.en, 230, p0 + 190, 790, 29, 18, it, "#E8C98A");
  say(v.line[1], 230, p0 + 225, 790, 24, 16, zh(500), DIM);
  rule(p0 + 252);
  // 票房 (what was saved), 場次 (how far), the 3 Falls
  const saved = S.score > 0;
  label(saved ? "票房 · SAVED" : "淨資產 · NET WORTH", 60, p0 + 292);
  say(fmt(S.score), 60, p0 + 354, 360, 62, 34, f => "700 " + f + "px " + SERIF, "#FFD98A");
  label("場次 · REACHED", 450, p0 + 292);
  say(top ? "退休 Retirement" : st.zh + " " + st.en, 450, p0 + 346, 300, 38, 22, zh(700), CREAM);
  say("最高 Best · " + floorTxt(S.best / FLOOR), 450, p0 + 380, 300, 23, 16, zh(500), DIM);
  label("三大陷阱 · 3 FALLS", 780, p0 + 292);
  [["spend", "#E8661F"], ["scam", "#7B5BE8"], ["delay", "#2F86D6"]].forEach(([k, col], i) => {   // a tick, or how many times
    const x = 803 + i * 66, y = p0 + 338; g.beginPath(); g.arc(x, y, 22, 0, Math.PI * 2); g.fillStyle = col; g.fill(); g.lineWidth = 3; g.strokeStyle = "rgba(255,255,255,0.85)"; g.stroke();
    g.fillStyle = "#fff"; g.textAlign = "center"; g.font = "900 23px " + F.display; g.fillText(S.falls[k] ? "×" + S.falls[k] : "✓", x, y + 8);
  });
  rule(p0 + 404);
  // the billing: who starred, as what, how it ranks, a beaten challenge
  spaced(2);
  say("領銜主演  " + nm + (P ? "  ·  " + P.zh + (P.c.en ? " " + P.c.en : "") : ""), 540, p0 + 436, 960, 28, 18, zh(700), CREAM, "center");
  const extra = [S.pct != null ? "贏咗 " + S.pct + "% 玩家 · Beat " + S.pct + "% of players" : "", S.chal && S.chal.beat ? "挑戰成功！Beat " + ((CHAL && CHAL.n) || "my friend") : ""].filter(Boolean).join("   ·   ");
  if (extra) say(extra, 540, p0 + 466, 960, 23, 15, zh(500), DIM, "center");
  spaced(0);
  // the stub's foot: a QR code, a barcode, where to play, the show's date and the seat
  tear(p0 + 488);
  let bx0 = 62;
  if (typeof window.qrcode === "function") {
    try {
      const qr = window.qrcode(0, "L");
      qr.addData(challengeUrl(true)); qr.make();
      const cnt = qr.getModuleCount(), sz = 58, pad = 3, mod = (sz - pad * 2) / cnt;
      g.fillStyle = CREAM; g.fillRect(60, p0 + 496, sz, sz);
      g.fillStyle = "#171A33";
      for (let r = 0; r < cnt; r++) for (let col = 0; col < cnt; col++) if (qr.isDark(r, col))
        g.fillRect(60 + pad + col * mod, p0 + 496 + pad + r * mod, mod + 0.3, mod + 0.3);
      bx0 = 132;
    } catch (e) { }
  }
  let x = bx0; seed = Number(no) + 7;
  while (x < 290) { const w = 2 + Math.floor(rnd() * 4); if (rnd() > 0.35) { g.fillStyle = CREAM; g.fillRect(x, p0 + 504, w, 32); } x += w + 2; }
  say(no.split("").join(" "), bx0 > 62 ? 211 : 175, p0 + 550, bx0 > 62 ? 160 : 230, 13, 10, f => "700 " + f + "px " + F.sans, DIM, "center");
  if (S.sil && S.sil.length >= 4) {
    const rc = S.sil.length / 4, sy0 = p0 + 498, sx0 = 304, sw = 34, sh = 48, rh = Math.min(4, (sh - 8) / rc);
    g.save(); g.fillStyle = "rgba(255,255,255,0.06)"; roundRect(g, sx0, sy0, sw, sh, 6); g.fill();
    g.fillStyle = "rgba(255,217,138,0.85)";
    for (let i = 0; i < rc; i++) {
      const l = parseInt(S.sil.slice(i * 4, i * 4 + 2), 36), r = parseInt(S.sil.slice(i * 4 + 2, i * 4 + 4), 36);
      if (r > l) g.fillRect(sx0 + 3 + (l / W) * (sw - 6), sy0 + sh - 4 - (i + 1) * rh, Math.max(1.5, ((r - l) / W) * (sw - 6)), rh + 0.3);
    }
    g.restore();
  }
  say("3fallcrab.com", 540, p0 + 536, 360, 38, 26, f => "900 " + f + "px " + F.display, "#FF7AB4", "center");
  const d = new Date(S.endAt || Date.now()), mon = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][d.getMonth()];
  label(String(d.getDate()).padStart(2, "0") + " " + mon + " " + d.getFullYear() + " · " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"), 1020, p0 + 518, "right", 300);
  label("ACT " + ACTS[ACT_OF_STAGE[Math.min(3, S.stage)]].n + " · SEAT " + floorTxt(S.best / FLOOR), 1020, p0 + 548, "right", 300);
  g.restore();
  // the notches at the tear lines, cut right through
  g.save(); g.globalCompositeOperation = "destination-out";
  for (const cx of [0, 1080]) {
    g.beginPath(); g.arc(cx, p0, NOTCH, 0, Math.PI * 2); g.fill();
    g.beginPath(); g.arc(cx, p0 + 488, NOTCH * 0.55, 0, Math.PI * 2); g.fill();
  }
  g.restore();
}
let qrP = null;
function loadQr() {
  if (typeof window.qrcode === "function") return Promise.resolve(window.qrcode);
  if (qrP) return qrP;
  qrP = new Promise(res => {
    const sc = document.createElement("script"); sc.src = "/vendor/qrcode-1.4.4.js"; sc.async = true;
    sc.onload = () => res(window.qrcode || null); sc.onerror = () => res(null);
    document.head.appendChild(sc);
  });
  return qrP;
}
async function readyCard() {
  const k = [S.endAt, Math.round(S.score), cardName(), WHO, S.pct, S.verdict && S.verdict.id, S.chal && S.chal.beat, personaKey(S.persona), posterFor(S), S.posted ? myLastId : ""].join("|");
  if (cardBlob && cardKey === k) return cardBlob;
  const b = await makeResultCard(); cardBlob = b; cardKey = k; return b;
}
async function makeResultCard() {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  const pkey = posterFor(S), posterP = loadPoster(pkey);
  const [M] = await Promise.all([
    Promise.race([loadMedal(), new Promise(r => setTimeout(() => r(null), 4000))]),
    Promise.race([loadQr(), new Promise(r => setTimeout(() => r(null), 2000))]),
  ]);
  let medalPic = null; try { medalPic = M && M.snapshot(tierOf(S.verdict || verdictOf(S)), 240, 282); } catch (e) { }
  const poster = await Promise.race([posterP, new Promise(r => setTimeout(() => r(null), 5000))]);
  const CW = 1080, CH = 1350, c = document.createElement("canvas"); c.width = CW; c.height = poster ? CARD_H : CH;
  if (poster) { drawPosterCard(c.getContext("2d"), poster, medalPic); return await new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error("no image")), "image/png")); }   // PNG: the round corners and notches stay see-through
  const g = c.getContext("2d"), F = K.FONTS, st = STAGES[S.stage], top = S.stage === STAGES.length - 1;
  const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
  const outlined = (txt, x, y, font, fill, sw) => { g.font = font; g.textAlign = "center"; g.lineJoin = "round"; g.strokeStyle = "rgba(37,49,122,0.3)"; g.lineWidth = sw + 6; g.strokeText(txt, x + 5, y + 8); g.strokeStyle = "#fff"; g.lineWidth = sw; g.strokeText(txt, x, y); g.fillStyle = fill; g.fillText(txt, x, y); };
  // the game's own sky, city and harbour
  const sky = g.createLinearGradient(0, 0, 0, CH); sky.addColorStop(0, "#3FB4FF"); sky.addColorStop(0.6, "#8EDBFF"); sky.addColorStop(1, "#C8F0FF"); g.fillStyle = sky; g.fillRect(0, 0, CW, CH);
  const tile = (img, y, h) => { if (!img || !img.width) return; const w = h * img.width / img.height, x0 = (CW - w) / 2; for (let x = x0 - Math.ceil(x0 / w) * w; x < CW; x += w) g.drawImage(img, x, y, w, h); };
  tile(L.sky, 0, 330); tile(L.city, CH - 500, 340); tile(L.sea, CH - 200, 230);
  // the title
  const word = ["3", "F", "a", "l", "l", "F", "u", "n"], cols = ["#FF5FA2", "#3A9BF0", "#4CC36A", "#FF7B35", "#8B6CF2", "#F2463E", "#20C1B3", "#FF5FA2"];
  g.font = "900 124px " + F.display; const gaps = [26, 0, 0, 0, 22, 0, 0, 0], ws = word.map(ch => g.measureText(ch).width), tw = ws.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0);
  let x = (CW - tw) / 2; word.forEach((ch, i) => { outlined(ch, x + ws[i] / 2, 160, g.font, cols[i], 14); x += ws[i] + gaps[i]; });
  if ("letterSpacing" in g) g.letterSpacing = "14px";
  outlined("人生跌塔", CW / 2 + 7, 278, "700 88px " + F.zh, "#25317A", 16);
  if ("letterSpacing" in g) g.letterSpacing = "0px";
  // the card
  g.save(); g.shadowColor = "rgba(37,49,122,0.28)"; g.shadowOffsetY = 16; rr(70, 330, 940, 700, 48); g.fillStyle = "#FFF6E6"; g.fill(); g.restore();
  g.save(); rr(70, 330, 940, 700, 48); g.clip(); const gl = g.createLinearGradient(0, 330, 0, 1030); gl.addColorStop(0, "#FFFDF7"); gl.addColorStop(1, "#FFE6BE"); g.fillStyle = gl; g.fillRect(70, 330, 940, 700); g.restore();
  // the player, as the game left them
  g.save(); g.translate(100, 380); g.scale(2.45, 2.45); AV.draw(g, lookNow()); g.restore();
  // the result
  const cx = 705, hasPct = S.pct != null, dy = hasPct ? 0 : -30, v = S.verdict || verdictOf(S); g.textAlign = "center";
  const fitFont = (txt, w, size, min, weight, fam) => { let f = size; g.font = weight + " " + f + "px " + fam; while (g.measureText(txt).width > w && f > min) { f -= 2; g.font = weight + " " + f + "px " + fam; } return g.font; };
  const nm = cardName();
  if (nm) outlined(nm, cx, 400, fitFont(nm, 520, 42, 26, 900, F.display), "#DF1B72", 10);
  g.textAlign = "center"; g.fillStyle = "#25317A"; g.font = "700 52px " + F.zh; g.fillText(S.score > 0 ? "恭喜你儲到" : "我嘅淨資產", cx, 470);
  g.fillStyle = "#5B516C"; g.font = "800 29px " + F.sans; g.fillText(S.score > 0 ? "I saved" : "My net worth", cx, 512);
  const amt = fmt(S.score); outlined(amt, cx, 630 - dy / 2, fitFont(amt, 540, 120, 56, 900, F.display), "#1F9E4A", 14);
  if (hasPct) {   // where it ranks, as a sticker
    g.save(); g.translate(cx, 692); g.rotate(-0.025);
    g.shadowColor = "rgba(37,49,122,0.25)"; g.shadowOffsetY = 6; rr(-240, -33, 480, 66, 33); g.fillStyle = "#FFD23F"; g.fill(); g.shadowColor = "transparent";
    g.lineWidth = 4; g.strokeStyle = "#fff"; g.stroke();
    g.fillStyle = "#25317A"; g.font = "700 35px " + F.zh; const zt = "贏咗 " + S.pct + "% 玩家", et = " · Beat " + S.pct + "%";
    const zw = g.measureText(zt).width; g.font = "900 27px " + F.sans; const ew = g.measureText(et).width, x0 = -(zw + ew) / 2;
    g.textAlign = "left"; g.font = "700 35px " + F.zh; g.fillText(zt, x0, 12); g.font = "900 27px " + F.sans; g.fillStyle = "#5B3B00"; g.fillText(et, x0 + zw, 11);
    g.restore(); g.textAlign = "center";
  }
  g.fillStyle = "#25317A"; g.font = "700 42px " + F.zh; g.fillText(top ? "成功退休！" : "去到「" + st.zh + "」", cx, 784 + dy);
  g.fillStyle = "#5B516C"; g.font = "800 28px " + F.sans; g.fillText((top ? "Made it to Retirement" : "Reached " + st.en) + " · " + floorTxt(S.best / FLOOR), cx, 826 + dy);
  [["spend", "#E8661F", "過度消費"], ["scam", "#7B5BE8", "騙局"], ["delay", "#2F86D6", "拖延"]].forEach(([k, col, zh], i) => {
    const bx = 445 + i * 182, by = 860 + dy * 0.6; rr(bx, by, 170, 104, 26); g.fillStyle = col; g.fill();
    g.fillStyle = "#fff"; g.font = "700 30px " + F.zh; g.fillText(zh, bx + 85, by + 42); g.font = "900 34px " + F.display; g.fillText(S.falls[k] ? "×" + S.falls[k] : "✓", bx + 85, by + 86);
  });
  const who = WHO === "jackie" ? "Jackie" : "Jack", Pc = personaOf(S.persona);   // the player, and who they rolled
  if (Pc) { g.fillStyle = "#25317A"; g.font = fitFont(who + " · " + Pc.zh, 300, 30, 20, 700, F.zh); g.fillText(who + " · " + Pc.zh, 247, 990); }
  else { g.fillStyle = "#25317A"; g.font = "800 28px " + F.sans; g.fillText("Played as " + who, 247, 990); }
  // a friend's challenge, beaten: a sticker on the corner
  if (S.chal && S.chal.beat) {
    const who = CHAL.n || "my friend";
    g.save(); g.translate(232, 336); g.rotate(-0.12); g.shadowColor = "rgba(37,49,122,0.3)"; g.shadowOffsetY = 8;
    rr(-170, -38, 340, 76, 24); g.fillStyle = "#DF1B72"; g.fill(); g.shadowColor = "transparent"; g.lineWidth = 5; g.strokeStyle = "#fff"; g.stroke();
    g.fillStyle = "#fff"; g.textAlign = "center"; g.font = "700 30px " + F.zh; g.fillText("挑戰成功！", 0, -2);
    g.font = fitFont("Beat " + who, 300, 24, 16, 900, F.sans); g.fillText("Beat " + who, 0, 27);
    g.restore(); g.textAlign = "center";
  }
  // the 稱號 (title), on a ribbon under the card: its medal (3D), the title, its one-line roast
  g.save(); g.shadowColor = "rgba(37,49,122,0.3)"; g.shadowOffsetY = 10; rr(90, 1050, 900, 126, 40); g.fillStyle = "#25317A"; g.fill(); g.restore();
  rr(262, 1028, 250, 44, 22); g.fillStyle = "#DF1B72"; g.fill();
  g.fillStyle = "#fff"; g.font = "700 24px " + F.zh; g.fillText("我的稱號 · MY TITLE", 387, 1059);
  if (medalPic) { g.save(); g.shadowColor = "rgba(20,30,90,0.45)"; g.shadowBlur = 14; g.shadowOffsetY = 6; g.drawImage(medalPic, 76, 980, 196, 230); g.restore(); }
  else flatMedal(g, 173, 1118, 48, tierOf(v));
  g.textAlign = "left"; g.fillStyle = "#fff"; g.font = fitFont(v.zh, 430, 56, 32, 700, F.zh); g.fillText(v.zh, 266, 1116);
  const zw = g.measureText(v.zh).width; g.fillStyle = "#FFE7A0"; g.font = fitFont(v.en, Math.max(120, 690 - zw), 26, 16, 800, F.sans); g.fillText(v.en, 280 + zw, 1114);
  g.fillStyle = "#DCE3FF"; g.font = fitFont(v.line[1], 690, 27, 18, 700, F.zh); g.fillText(v.line[1], 268, 1158); g.textAlign = "center";
  // where to play
  rr(250, 1186, 580, 96, 48); g.fillStyle = "rgba(255,253,247,0.96)"; g.fill();
  g.fillStyle = "#25317A"; g.font = "900 46px " + F.display; g.fillText("3fallcrab.com", CW / 2, 1250);
  g.save(); g.shadowColor = "rgba(20,30,90,0.55)"; g.shadowBlur = 6; g.fillStyle = "#fff"; g.font = "700 26px " + F.zh; g.fillText("HSUHK 個人理財大使計劃 2026 · 3 Fall Crab 整冧咗team", CW / 2, 1326); g.restore();
  return await new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error("no image")), "image/jpeg", 0.92));
}
async function exportResult(share) {
  const out = $("shareStatus");
  out.textContent = cardBlob ? "" : "Making your picture… 製作緊…";
  let blob;
  try { blob = await readyCard(); } catch (e) { out.textContent = "Couldn't make the picture. 整唔到圖片。"; return; }
  const file = new File([blob], blob.type === "image/png" ? "3fallfun-result.png" : "3fallfun-result.jpg", { type: blob.type || "image/jpeg" });
  if (share && canShareFiles()) {
    try { await navigator.share({ files: [file], title: "3 Fall Fun 人生跌塔", text: shareText() + "\n" + challengeUrl() }); out.textContent = "Shared 已分享"; A.sfx("uiDone"); return; }
    catch (e) { if (e && e.name === "AbortError") { out.textContent = ""; return; } }   // closed the share sheet: nothing more to do
  }
  if (IAB) {   // an app's browser drops downloads: the picture is saved by pressing and holding it
    out.textContent = "Press and hold the picture, then choose Save. 長按圖片，揀「儲存圖片」。";
    const img = $("cardImg"); img.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    img.classList.remove("hint"); void img.offsetWidth; img.classList.add("hint"); return;
  }
  const a = document.createElement("a"), url = URL.createObjectURL(blob);
  a.href = url; a.download = cardBlob && cardBlob.type === "image/png" ? "3fallfun-result.png" : "3fallfun-result.jpg"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
  out.textContent = "Saved to your device 已下載"; A.sfx("uiDone");
}
$("saveImg").addEventListener("click", () => exportResult(false));
$("shareImg").addEventListener("click", () => exportResult(true));

// ---------- made for sharing (Threads especially) ----------
// What makes a browser game spread on Threads in Hong Kong: a funny verdict to screenshot, a number to brag about
// ("贏咗99%香港人"), a one-tap post, and a friend to beat. So every game gets
//   a 稱號 (title): the first of TITLES (content.js) whose test passes; disasters first, they're the most shared,
//   where it ranks: the share of recorded games it beat (GET /api/scores?view=pct), "players", never "Hong Kongers",
//   a post: "Threads" opens a Threads post (its web intent) with the text below and a challenge link,
//   a challenge: the link /c?s=score&n=nickname&v=title. A friend who opens it sees the challenge on the title
//   screen, a bubble when they pass the score, and on their result whether they beat it (see "a friend's challenge").
const verdictOf = st => CORE.verdictOf(st, TITLES, STAGES.length);
// The title's medal, drawn in 3D with three.js (src/vendor/medal3d.js, made from tools/medal3d/medal.js by `npm run medal`):
// gold for the brag titles, silver for a steady game, a dented bronze one with a plaster for the disasters. The script
// (500 KB, 130 KB over the wire) loads in the background once the title screen is idle, so it's ready by the end of a
// game; on the result the medal drops in with a spin and sways, on the card it's a still picture. Without it (no WebGL,
// an old browser, a failed load) the result shows a flat medal (CSS) and the card draws one.
let medalP = null;
function loadMedal() {
  if (medalP) return medalP;
  const src = (document.querySelector('meta[name="tff-medal3d"]') || {}).content;
  medalP = !src || /%%/.test(src) ? Promise.resolve(null) : new Promise(res => {
    const sc = document.createElement("script"); sc.src = src; sc.async = true;
    sc.onload = () => res(window.TFF_MEDAL3D || null); sc.onerror = () => res(null);
    document.head.appendChild(sc);
  });
  return medalP;
}
setTimeout(function medalWhenIdle() {   // not during the opening story or a game: parsing it could stutter them
  if ((window.TFF_INTRO && TFF_INTRO.on()) || (S && S.mode === "playing")) { setTimeout(medalWhenIdle, 2500); return; }
  const idle = window.requestIdleCallback || (f => setTimeout(f, 300));
  idle(() => loadMedal().then(M => { if (M && M.warm && !(S && S.mode === "playing")) idle(() => { try { M.warm(null, () => !!S && S.mode === "playing"); } catch (e) { } }); }));   // its first drawing is the slow part: done now, not on the result
}, 3000);
// a flat medal for the card when the 3D one can't be drawn
function flatMedal(g, cx, cy, r, tier) {
  const C = { gold: ["#FFE38A", "#FFBF2E", "#C98A12", "#FFF0A8"], silver: ["#F2F6FB", "#B9C6D6", "#7F8DA0", "#F4F8FF"], bronze: ["#F0A06A", "#C0652A", "#8A4317", "#F2B27A"] }[tier] || [];
  g.save(); g.fillStyle = "#DF1B72"; g.beginPath(); g.moveTo(cx - r * 0.9, cy - r * 2); g.lineTo(cx - r * 0.1, cy - r * 0.6); g.lineTo(cx - r * 0.5, cy - r * 0.6); g.lineTo(cx - r * 1.3, cy - r * 2); g.fill();
  g.beginPath(); g.moveTo(cx + r * 0.9, cy - r * 2); g.lineTo(cx + r * 0.1, cy - r * 0.6); g.lineTo(cx + r * 0.5, cy - r * 0.6); g.lineTo(cx + r * 1.3, cy - r * 2); g.fill();
  const gr = g.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r); gr.addColorStop(0, C[0]); gr.addColorStop(0.55, C[1]); gr.addColorStop(1, C[2]);
  g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); g.lineWidth = r * 0.12; g.strokeStyle = C[2]; g.stroke();
  g.fillStyle = C[3]; g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.27 : r * 0.62; g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } g.fill();
  g.restore();
}
function showVerdict(v) {
  const box = $("heroVerdict"); box.hidden = !v; if (!v) return;
  const nm = $("svName"), en = document.createElement("span"); en.className = "en"; en.lang = "en"; en.textContent = v.en;
  nm.replaceChildren(v.zh, en);
  bi($("svLine"), v.line[0], v.line[1]);
  // the title is kept on this device; the first time, it unlocks its look for the crab (if it has one)
  if (S && S.titled !== v.id) {
    S.titled = v.id; const had = earnedTitles(), fresh = !had.includes(v.id);
    if (fresh) lsSet("tff_titles", [...had, v.id]);
    S.newHat = fresh ? HATS.find(h => h.title === v.id) || null : null;
  }
  const hat = S && S.newHat; $("svNew").hidden = !hat;
  if (hat) bi($("svNew"), "New for your crab: " + hat.en + " (in the Wardrobe)", "蟹仔新造型：" + hat.zh + "（去衣櫃換）");
  const mb = $("svMedal"); mb.dataset.tier = tierOf(v); mb.classList.remove("gl"); if (window.TFF_MEDAL3D) TFF_MEDAL3D.unmount();
  setTimeout(() => loadMedal().then(M => {
    if (!M || !S || S.verdict !== v || $("endModal").hidden) return;
    try { if (M.mount(mb, tierOf(v), { still: reduceMotion })) mb.classList.add("gl"); } catch (e) { }
  }), reduceMotion ? 0 : 950);   // as the title box lands
  box.classList.remove("in"); void box.offsetWidth; box.classList.add("in");
  if (!reduceMotion) setTimeout(() => { if (S && S.verdict === v && !$("endModal").hidden && S.step === 1) { A.sfx("stamp"); haptic(35, 0.6, 0.5); } }, 1050);   // the seal lands after the count
}
// Where this game ranks among all recorded games. Fetched once per game; the hero, the card and the post use it.
function fetchPct(game) {
  game.pct = null; $("heroPct").hidden = true;
  if (!apiAllowed || apiGone) return;
  api(API + "?view=pct&score=" + Math.round(game.score)).then(j => {
    if (S !== game || typeof j.pct !== "number" || !isFinite(j.pct)) return;
    game.pct = Math.max(0, Math.min(99, Math.round(j.pct)));
    showPct();
    if (S.step === 4) showCard(); else if (cardBlob) readyCard().catch(() => { });   // the card and the post carry it too
    threadsLink();
  }).catch(() => { });
}
function showPct() {
  const el = $("heroPct"), p = S.pct; el.hidden = p == null; if (p == null) return;
  const b = document.createElement("b"), z = document.createElement("span"), e = document.createElement("small");
  z.lang = "zh-HK"; z.textContent = "贏咗"; b.textContent = p + "%"; const z2 = document.createElement("span"); z2.lang = "zh-HK"; z2.textContent = "玩家";
  e.textContent = "Beat " + p + "% of players";
  el.replaceChildren(z, b, z2, e); el.style.setProperty("--p", p + "%");
  el.classList.remove("in"); void el.offsetWidth; el.classList.add("in");
}
// The challenge from a friend's link, against this game's result.
function showChal() {
  const el = $("heroChal"), c = S.chal; el.hidden = !c; if (!c) return;
  const who = CHAL.n || "", whoZh = who || "你朋友", whoEn = who || "your friend";
  el.classList.toggle("won", c.beat);
  if (c.beat) bi(el, "You beat " + whoEn + "'s " + fmt(CHAL.s) + "!", "你贏咗" + zhIn(whoZh) + "！🎉");
  else bi(el, fmt(c.gap) + " short of " + whoEn + " (" + fmt(CHAL.s) + ")", "仲差 " + fmt(c.gap) + " 就贏到" + zhIn(whoZh));
}
// The link a post or a share carries: a challenge with this game's result.
function challengeUrl(compact) {
  const q = new URLSearchParams(); q.set("s", String(Math.round(S.score)));
  const n = cardName(); if (n) q.set("n", n);
  const v = S.verdict || verdictOf(S); if (v) q.set("v", v.id);
  if (S.persona) q.set("p", personaKey(S.persona));
  if (S.posted && myLastId) q.set("g", String(myLastId));
  else if (!compact && S.sil && S.sil.length <= 240) q.set("sil", S.sil);
  return location.origin + "/c?" + q.toString();
}
// The words of a post: the result, the title, the type, the brag (or the dare), then a question and a tag, because on
// Threads the replies are what spread it.
function shareText() {
  const v = S.verdict || verdictOf(S), p = S.pct, c = S.chal;
  const Pw = personaOf(S.persona);
  const out = [(Pw ? "我抽到「" + Pw.zh + "」，" : "我") + "喺《3 Fall Fun 人生跌塔》儲到 " + fmt(S.score) + " 🦀", "稱號：「" + v.zh + "」— " + v.line[1]];
  const who = c && CHAL.n ? CHAL.n : "我朋友";
  if (c && c.beat) out.push("我贏咗" + zhIn(who) + " 😎 下一個係你");
  else if (c) out.push("仲差 " + fmt(c.gap) + " 先贏到" + zhIn(who) + "…邊個幫我報仇？");
  else if (p != null) out.push(p >= 50 ? "我算唔算已經贏咗" + p + "%香港人？" : "只係贏咗" + p + "%人…你夠膽同我比？");
  else out.push("你又得唔得？");
  out.push("你又攞到咩稱號？👇 身邊邊個係「" + v.zh + "」？Tag 佢！");
  return out.join("\n");
}
const THREADS = "https://www.threads.com/intent/post";
function threadsLink() {
  if (!S) return;
  const a = $("threadsBtn"); a.href = THREADS + "?text=" + encodeURIComponent(shareText()) + "&url=" + encodeURIComponent(challengeUrl());
}
// A real link (no pop-up blocker, works in apps' browsers): it opens the post. The post can't take a picture, so on a
// computer the card is saved as well, to add to the post; on a phone the status line says to add it.
$("threadsBtn").addEventListener("click", () => {
  threadsLink(); A.sfx("uiDone");
  const out = $("shareStatus");
  if (!IOS && !ANDROID && !IAB && cardBlob) {
    const a = document.createElement("a"), url = URL.createObjectURL(cardBlob);
    a.href = url; a.download = cardBlob && cardBlob.type === "image/png" ? "3fallfun-result.png" : "3fallfun-result.jpg"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
    out.textContent = "Picture saved: add it to your post! 圖片已下載，記得一齊貼上！";
  } else out.textContent = "Add your card picture to the post for more likes! 記得加埋結果卡圖片，多啲like！";
});

// ---------- end screen ----------
// Jack's or Jackie's life story: what happened after each Life Event, in the order they came, and how it all ended
const FALL_BG = { spend: "var(--orange)", scam: "var(--purple)", delay: "var(--blue)" };
function renderStory() {
  const name = (PRON[WHO] || PRON.jack).name, list = $("storyList"); list.replaceChildren();
  $("storyHead").firstChild.textContent = name + "'s story";
  const acts = [];   // the story in the film's three acts: one heading and list per act with events
  const actList = ai => {
    if (acts[ai]) return acts[ai];
    const sec = document.createElement("section"); sec.className = "story-act";
    const h = document.createElement("h5"); const a = ACTS[ai]; h.textContent = "Act " + a.n + " · " + a.en + " "; const hz = document.createElement("span"); hz.lang = "zh-HK"; hz.textContent = a.zh; h.appendChild(hz);
    const ol = document.createElement("ol"); ol.className = "story"; sec.append(h, ol); list.appendChild(sec); return (acts[ai] = ol);
  };
  S.choices.forEach((ch, n) => {
    const c = CARD_BY.get(ch.card), later = c && laterOf(c, ch.pick, n); if (!later) return;
    const trap = ch.pick === "wise" ? null : ch.pick === "risky" ? c.trap : "delay";
    const li = document.createElement("li"); li.className = trap ? "bad" : "good";
    const ic = svgUse(trap ? ICON[trap] : "i-good"); if (trap) { ic.style.background = FALL_BG[trap]; ic.style.borderRadius = "8px"; ic.style.padding = "2px"; }
    const st = STAGES[c.st] || STAGES[0], b = document.createElement("div");
    const h = document.createElement("span"); h.className = "sl-h";
    const sg = document.createElement("small"); sg.textContent = st.en + " " + st.zh + " · " + (trap ? (ch.pick === "none" ? "Put off 拖咗" : TRAPS[trap].en + " " + TRAPS[trap].zh) : "Wise 明智");
    const tg = document.createElement("b"); tg.textContent = c.tag ? c.tag[0] : c.en; const tz = document.createElement("span"); tz.lang = "zh-HK"; tz.textContent = c.tag ? c.tag[1] : c.zh; tg.append(" ", tz);
    h.append(sg, tg);
    const p = document.createElement("p"); p.textContent = tell(later[0]); const pz = document.createElement("small"); pz.lang = "zh-HK"; pz.textContent = tell(later[1]); p.appendChild(pz);
    b.append(h, p); li.append(ic, b); actList(ACT_OF_STAGE[c.st] || 0).appendChild(li);
  });
  if (acts.length && !acts[2]) {   // out before Retirement: the film never got to its last act
    const nf = document.createElement("p"); nf.className = "story-nf"; nf.textContent = "Act III never filmed "; const z = document.createElement("span"); z.lang = "zh-HK"; z.textContent = "第三幕未開拍"; nf.appendChild(z); list.appendChild(nf);
  }
  list.hidden = !acts.length; const ol = list;
  // the ending: the life stage reached × how the picks went (mostly wise, mixed, mostly not)
  const E = ENDINGS[S.stage], end = $("storyEnd"), picks = S.wise + S.risky + S.missed, share = picks ? S.wise / picks : 0.5;
  const k = share >= 0.7 ? "good" : share >= 0.4 ? "mixed" : "rough", P = personaOf(S.persona);
  end.hidden = !(E && E[k]); end.replaceChildren();
  if (E && E[k]) {
    const lab = document.createElement("b"); lab.className = "os-lab"; lab.textContent = "THE END "; const lz = document.createElement("span"); lz.lang = "zh-HK"; lz.textContent = "劇終"; lab.appendChild(lz);
    const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = tell(E[k][1], { nick: P && P.c.zh ? "「" + P.c.zh + "」" : "" });
    end.append(lab, tell(E[k][0], { nick: P && P.c.en ? ", “" + P.c.en + "”," : "" }), z);
  }
  $("storySec").hidden = ol.hidden && end.hidden;
}
function showEnd() {
  const st = STAGES[S.stage];
  S.verdict = verdictOf(S); S.chal = CHAL ? { beat: Math.round(S.score) > CHAL.s, gap: Math.max(10, CHAL.s - Math.round(S.score)) } : null;   // a tie still needs 10 more
  const top = S.stage === STAGES.length - 1;
  $("stDate").textContent = "Statement · " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  $("endEyebrow").textContent = S.over === "drops" ? "整冧咗！ 3 items fell into the harbour" : "夠鐘！ Time's up";
  $("endTitle").textContent = top ? "You made it to Retirement" : "You reached " + st.en;
  const etz = document.createElement("span"); etz.className = "zh"; etz.textContent = top ? "成功退休！" : "去到「" + st.zh + "」"; $("endTitle").appendChild(etz);
  const ft = S.falls.spend + S.falls.scam + S.falls.delay;
  $("endSub").textContent = ft === 0 ? "No money traps at all! 一次都冇中伏！" : "You fell into " + ft + " money trap" + (ft > 1 ? "s" : "") + ". 中咗" + ft + "次伏。";
  const rz = document.createElement("span"); rz.className = "zh"; rz.lang = "zh-HK"; rz.textContent = st.zh; $("rStage").replaceChildren(rz, st.en);
  $("rNw").textContent = fmt(S.score);
  $("rHeight").textContent = floorTxt(S.best / FLOOR);
  const picks = S.wise + S.risky + S.missed; $("rWise").textContent = picks ? S.wise + " of " + picks : "—";
  $("rCompRow").hidden = !(S.compounded > 0);
  if (S.compounded > 0) {
    $("rComp").textContent = "+" + fmt(S.compounded);
    $("rCompRow").title = "Early-floor stage dividends + full emergency-fund interest · 早儲複息加應急錢儲滿利息";
  }
  $("rJpRow").hidden = S.jpAt < 0;   // the windfall plus what jackpot time added
  if (S.jpAt >= 0) { $("rJp").textContent = "+" + fmt(JACKPOT_BONUS + S.jpExtra); $("rJpRow").title = fmt(JACKPOT_BONUS) + " windfall + " + fmt(S.jpExtra) + " from jackpot time · 意外之財加大獎時間收入"; }
  const fr = $("fallRep"); fr.replaceChildren();
  const row = (icon, bg, title, sub, count) => {
    const li = document.createElement("li"); const ic = svgUse(icon); ic.style.background = bg; ic.style.borderRadius = "8px"; ic.style.padding = "2px";
    const m = document.createElement("span"); m.textContent = title; const s = document.createElement("small"); s.textContent = sub; m.appendChild(s);
    const c = document.createElement("span"); c.className = "fc"; c.textContent = "×" + count; c.style.color = count ? "var(--red-d)" : "var(--green-t)";
    li.append(ic, m, c); fr.appendChild(li);
  };
  // a row (with what it is) for each Fall the player hit and for drops; the Falls they dodged share one line
  const FALLS = [["spend", "i-spend", "var(--orange)"], ["scam", "i-scam", "var(--purple)"], ["delay", "i-delay", "var(--blue)"]];
  for (const [k, icon, bg] of FALLS) if (S.falls[k]) row(icon, bg, TRAPS[k].en + " " + TRAPS[k].zh, TRAPS[k].d, S.falls[k]);
  if (S.drops) row("i-drop", "#fff", "Items dropped 跌落海", "Each one cost HK$1,000 每件扣HK$1,000", S.drops);
  const dodged = FALLS.filter(([k]) => !S.falls[k]);
  if (dodged.length) {
    const li = document.createElement("li"); li.className = "dodged";
    const m = document.createElement("span"); m.textContent = dodged.length === 3 ? "Dodged all 3 Falls" : "Dodged: " + dodged.map(([k]) => TRAPS[k].en).join(", ");
    const z = document.createElement("small"); z.textContent = dodged.length === 3 ? "三大陷阱全部避開" : "避開咗：" + dodged.map(([k]) => TRAPS[k].zh).join("、"); m.appendChild(z);
    li.append(svgUse("i-good"), m); fr.appendChild(li);
  }
  // the "too good to be true" moments this game had, and what each one cost
  const T = S.troll, RP = TR.report, tr = $("trollRep"); tr.replaceChildren();
  const trow = (icon, bg, [en, zh, sub], val, bad, vars) => {
    const li = document.createElement("li"); const ic = svgUse(icon); ic.style.background = bg; ic.style.borderRadius = "8px"; ic.style.padding = "2px";
    const m = document.createElement("span"); m.textContent = en + " " + zh; const sm = document.createElement("small"); sm.textContent = sub.replace(/\{n\}/g, vars.n || "").replace(/\{k\}/g, vars.k || ""); m.appendChild(sm);
    const c = document.createElement("span"); c.className = "fc"; c.textContent = val; c.style.color = bad ? "var(--red-d)" : "var(--green-t)";
    li.append(ic, m, c); tr.appendChild(li);
  };
  if (T.reviveSeen) trow("i-drop", "#fff", T.revive ? RP.revive : RP.gaveUp, T.revive ? "✗" : "✓", T.revive, {});
  if (T.invest) {
    const lost = T.invest >= 2 ? INVEST + (T.invest === 3 ? FEE : 0) : 0;
    trow("i-scam", "var(--purple)", lost ? RP.investLost : RP.investDodged, lost ? "−" + fmt(lost) : "✓", lost, { n: fmt(lost) });
  }
  if (T.ticketSeen) trow("i-spend", "var(--orange)", T.tickets ? RP.tickets : RP.ticketDodged, T.tickets ? "−" + fmt(T.tickets * TICKET) : "✓", T.tickets, { n: fmt(T.tickets * TICKET), k: T.tickets });
  $("trollSec").hidden = !tr.children.length;
  renderStory();
  // Quiz: each answer is marked right or wrong the moment it's tapped, with the reason, and then locked.
  const qz = $("quiz"); qz.replaceChildren(); S.quiz = QUIZ.map(() => null);
  const quizScore = () => { $("quizScore").textContent = S.quiz.filter(x => x && x.ok).length + "/" + QUIZ.length; };
  quizScore();
  S.prior = BOOTH ? 0 : Math.min(99, +lsGet("tff_quiz_n", 0) || 0);   // quizzes finished on this device before this game
  QUIZ.forEach((q, qi) => {
    const fs = document.createElement("fieldset"); fs.className = "qz";
    const lg = document.createElement("legend"); lg.textContent = (qi + 1) + ". " + q.q[0];
    const lz = document.createElement("small"); lz.textContent = q.q[1]; lg.appendChild(lz);
    const box = document.createElement("div"); box.className = "qopts";
    const fb = document.createElement("p"); fb.className = "qfb"; fb.setAttribute("role", "status");
    const order = q.o.map((_, idx) => idx);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[order[i], order[j]] = [order[j], order[i]]; }
    order.forEach(oi => {
      const o = q.o[oi];
      const b = document.createElement("button"); b.type = "button"; b.className = "qopt"; b.dataset.oi = String(oi);
      b.textContent = o[0]; const z = document.createElement("small"); z.textContent = o[1]; b.appendChild(z);
      b.addEventListener("click", () => {
        if (S.quiz[qi]) return;
        const ok = oi === q.a; S.quiz[qi] = { pick: oi, ok }; A.sfx(ok ? "deposit" : "risky"); haptic(ok ? [12, 25, 22] : [30, 35, 45], ok ? 0.35 : 0.6, 0.5);
        [...box.children].forEach(bb => { const bj = +bb.dataset.oi; bb.disabled = true; bb.classList.add(bj === q.a ? "is-right" : bj === oi ? "is-wrong" : "is-dim"); });
        b.setAttribute("aria-pressed", "true");
        const head = document.createElement("b"); head.className = "qh";
        head.append(svgUse(ok ? "i-good" : "i-bad"), ok ? "Correct!" : "Not quite. The answer is “" + q.o[q.a][0] + "”");
        const hz = document.createElement("small"); hz.className = "qhz"; hz.textContent = ok ? "答啱咗！" : "答錯咗，答案係「" + q.o[q.a][1] + "」";
        const why = document.createElement("span"); why.textContent = q.why[0];
        const wz = document.createElement("small"); wz.textContent = q.why[1];
        fb.className = "qfb " + (ok ? "ok" : "no"); fb.replaceChildren(head, hz, why, wz);
        if (!S.quizDone && S.quiz.every(Boolean)) { S.quizDone = true; if (!BOOTH) lsSet("tff_quiz_n", (+lsGet("tff_quiz_n", 0) || 0) + 1); }
        if (S.step === 2) stepButtons();
        quizScore(); saveSoon();
      });
      box.appendChild(b);
    });
    fs.append(lg, box, fb); qz.appendChild(fs);
  });
  // Habit: nothing is ticked until the player picks one, so the analysis only counts real pledges.
  const hb = $("habits"); hb.replaceChildren(); S.habit = null;
  HABITS.forEach(h => {
    const lab = document.createElement("label"); lab.className = "habit";
    const inp = document.createElement("input"); inp.type = "radio"; inp.name = "habit"; inp.value = h.id; inp.id = "habit_" + h.id;
    inp.addEventListener("change", () => { if (inp.checked) { S.habit = h.id; A.sfx("uiSelect"); saveSoon(); if (S.step === 2) stepButtons(); } });
    const t = document.createElement("span"); t.textContent = h.en; const z = document.createElement("small"); z.textContent = h.zh; t.appendChild(z);
    lab.append(inp, t); hb.appendChild(lab);
  });
  $("nickname").value = BOOTH ? "" : lsGet("tff_name", "");
  const live = apiAllowed && !apiGone && dbWritable;
  $("email").value = BOOTH ? "" : lsGet("tff_email", ""); emailError(false); $("email").closest(".fld").hidden = $("emailNote").closest(".email-note").hidden = !live;   // kept on this device only, so a returning player does not retype it
  $("postBtn").disabled = false; postLabel("Post score", "上榜");
  const ps = $("postStatus"); ps.className = "post-status";
  ps.textContent = live ? "Only your nickname and score will appear on the leaderboard. 排行榜只會顯示你的暱稱及分數。" : "Your score will be saved on this device only. 分數只會儲存在這部裝置。";
  // end credits: the post-mortem, as a credit sequence
  try {
    const cr = $("endCredits");
    if (cr) {
      cr.replaceChildren();
      const credit = (role, who, sub) => {
        const li = document.createElement("li");
        const r = document.createElement("span"); r.className = "role"; r.textContent = role;
        const w = document.createElement("span"); w.className = "cwho"; w.textContent = who;
        if (sub) { const sm = document.createElement("small"); sm.textContent = sub; w.appendChild(sm); }
        li.append(r, w); cr.appendChild(li);
      };
      const P = typeof personaOf === "function" ? personaOf(S.persona) : null;
      credit("Directed by", "你", P && P.zh ? P.zh : (WHO === "jackie" ? "Jackie" : "Jack"));
      const hits = [];
      if (S.falls.spend) hits.push(TRAPS.spend.zh);
      if (S.falls.scam) hits.push(TRAPS.scam.zh);
      if (S.falls.delay) hits.push(TRAPS.delay.zh);
      credit("Starring", hits.length ? hits.join(" · ") : "無", hits.length ? hits.length + " 次中伏" : "一次都冇中伏");
      const fell = S.lost && S.lost.length ? S.lost[S.lost.length - 1] : null;
      if (fell) credit("Final take", fell.zh || fell.en || "", fell.en && fell.zh ? fell.en : "");
      else credit("Final take", "夠鐘", "Time's up");
      credit("Take", String(takes));
      credit("The end", "《3 Fall Fun》", "人生跌塔");
    }
  } catch (e) { }
  $("endModal").hidden = false; $("stScroll").scrollTop = 0; endScroll = 0;
  S.flowDone = false; setStep(1, false); heroUp(); showVerdict(S.verdict); showChal();
  const P = personaOf(S.persona), hw = $("heroWho"); hw.hidden = !P;   // who you rolled
  if (P) { const z = document.createElement("span"); z.lang = "zh-HK"; z.textContent = "你抽到：" + P.zh; hw.replaceChildren(z, P.c.en || P.en); }
  fitLine($("endTitle"));
  endShownAt = performance.now(); modalOpen(true);
  $("endTitle").focus({ preventScroll: true });
  const game = S; game.rec = newRecord();
  fetchPct(game);
  setTimeout(() => { if (S === game && (S.mode === "over" || S.mode === "idle")) menuMusic(); }, 3200);   // after the end jingle, the menu music again
  saveRecord(game).catch(e => keepForLater(game, e));
  planFirst();
  if (BOOTH) bumpBooth();
}

// ---------- leaderboard: live board from /api/scores (Cloudflare Pages Function + D1); this device is the fallback ----------
const API = "/api/scores";
const apiAllowed = /^https?:$/.test(location.protocol);
let db = null, dbWritable = true, tab = "week", lbAll = [], lbWeek = [], myLastId = null, myLocalAt = null;
let liveWeek = null, lbSig = "", pollTimer = 0, pollFails = 0, apiGone = false, lbVisible = true, lastFetch = -1e9, fetching = null;
const localWeek = () => isoWeek(new Date());
const curWeek = () => liveWeek || localWeek();
const localScores = () => lsGet("tff_scores_v3", []);
const localList = () => { const wk = localWeek(); return localScores().filter(e => tab === "all" || e.week === wk); };
const myIds = new Set(lsGet("tff_my_ids", []));
let myPost = lsGet("tff_my_post", null);   // last live post {id, rank, week, name, score, height}: shown under the top 10 when it is not in it
function bi(el, en, zh) { const z = document.createElement("span"); z.className = "zl"; z.lang = "zh-HK"; z.textContent = zh; el.replaceChildren(en, z); return el; }
// ---------- a friend's challenge ----------
// A shared result links to /c?s=score&n=nickname&v=title. server/worker.js serves the game there, with link
// previews about the friend's result, and puts what the link says after its checks (the nickname has passed the
// board's filter) in <meta name="tff-chal">. Only that is used, never the address itself, so a made-up link can't put
// words on the screen. It lasts for this visit (Play again keeps the target): the title screen shows it, a bubble
// pops when the score passes it, the result says who won, and the game record says the player came from a link.
// A Latin-letter nickname in a Chinese sentence gets a space on each side ("贏咗 Ming！"), a Chinese one doesn't.
CHAL = (() => {
  const m = document.querySelector('meta[name="tff-chal"]');
  const out = parseChallenge({
    metaJson: m ? m.getAttribute("content") : null,
    search: location.search,
    storedJson: ssGet("tff_chal"),
    titles: TITLES,
    isValidPersona: p => { const [bg, pe] = p.split("+"); return !!personaOf({ bg, pe }); }
  });
  if (out) ssSet("tff_chal", JSON.stringify({ s: out.s, n: out.n, v: out.v ? out.v.id : "", p: out.p, sil: out.sil }));
  return out;
})();
(function chalBanner() {
  const box = $("chal"); if (!CHAL) { box.hidden = true; return; }
  const who = CHAL.n, v = CHAL.v;
  const amt = document.createElement("b"); amt.textContent = fmt(CHAL.s);
  const t = $("chalT"); t.replaceChildren(zhName(who || "你朋友") + "儲到 ", amt);
  if (v) { const i = document.createElement("i"); i.textContent = v.zh; t.append(i); }   // their 稱號
  const Pp = CHAL.p ? personaOf({ bg: CHAL.p.split("+")[0], pe: CHAL.p.split("+")[1] }) : null;
  if (Pp) { const sp = document.createElement("span"); sp.textContent = " · " + Pp.zh; t.append(sp); }
  const z = document.createElement("span"); z.lang = "zh-HK"; z.textContent = "你夠唔夠膽挑戰？";
  $("chalE").replaceChildren(z, "Can you beat " + (who || "your friend") + "?");
  box.hidden = false; root.classList.add("chal");
})();
function chalCheck() {   // while playing: the moment the score passes the friend's
  if (!CHAL || !S || S.chalSaid || S.mode !== "playing" || CHAL.s <= 0 || S.score <= CHAL.s) return;
  S.chalSaid = true; const who = CHAL.n;
  stamp("You beat " + (who || "your friend") + "!", "贏咗" + zhIn(who || "你朋友") + "！", "gold"); A.sfx("rival"); haptic([25, 35, 45], 0.6, 0.7); mood("happy", 2200);
  quip(who ? "chalBeat" : "chalBeatAnon", 3, who);
}
async function api(url, opts = {}) {
  const ctl = typeof AbortController === "function" ? new AbortController() : null;
  const to = ctl ? setTimeout(() => ctl.abort(), 9000) : 0;
  try {
    const r = await fetch(url, {
      ...opts, cache: "no-store", credentials: "same-origin", signal: ctl ? ctl.signal : undefined,
      headers: { accept: "application/json", ...(opts.headers || {}) }
    });
    let j = null;
    try { const t = await r.text(); const v = JSON.parse(t); if (v && typeof v === "object" && "ok" in v) j = v; } catch (e) { }
    if (!j) { const e = new Error("no api"); e.status = r.status; e.noApi = true; throw e; }
    if (!r.ok || j.ok !== true) { const e = new Error(j.error || "HTTP " + r.status); e.status = r.status; e.code = j.error; throw e; }
    return j;
  } finally { if (to) clearTimeout(to); }
}
function refreshLB(force) {
  if (apiGone || !apiAllowed) return Promise.resolve(false);
  if (fetching) return force ? fetching.then(() => refreshLB()) : fetching;
  lastFetch = performance.now();
  fetching = api(API).then(j => {
    const first = !db;
    db = db || { live: true }; liveWeek = j.week || null; dbWritable = !j.closed;
    lbWeek = (j.weekTop || []).map(e => ({ ...e, _id: e.id }));
    lbAll = (j.allTop || []).map(e => ({ ...e, _id: e.id }));
    if (tab !== "insights" || first) renderLB();
    flushOutboxSoon();
    return true;
  }).catch(e => {
    // Static-only hosting answers "static_only" (public/api/scores); a Worker without D1 answers "no_database".
    // Anything else (offline, captive portal, error page) is treated as temporary and retried.
    if (e.code === "no_database" || e.code === "static_only") apiGone = true;
    if (!db && tab !== "insights") renderLB();
    return false;
  }).finally(() => { fetching = null; });
  return fetching;
}
function schedulePoll(ms) {
  clearTimeout(pollTimer); if (apiGone || !apiAllowed) return;
  pollTimer = setTimeout(async () => {
    if (document.visibilityState === "visible" && lbVisible) { pollFails = (await refreshLB()) ? 0 : pollFails + 1; }
    schedulePoll(45000 * Math.pow(2, Math.min(pollFails, 3)));
  }, ms);
}
// ---------- this game's record ----------
// Every finished game is saved as soon as the statement opens, anonymously: it feeds the Stats tab and the team's
// survey analysis, not the board. It is saved again as the player answers the quiz, picks a habit and posts. Each
// save sends the whole state with the game's random id and key, so the API keeps one row per game in whatever
// order saves arrive. A save that can't get through waits on this device (without name or email) for the next visit.
const hex = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return Array.from(a, b => b.toString(16).padStart(2, "0")).join(""); };
const newRecord = () => ({ gid: hex(16), key: hex(24), board: false, name: "", email: "", sent: "", last: null, chain: Promise.resolve(), timer: 0 });
const answersOf = st => st.quiz.flatMap((x, i) => x ? [{ q: QUIZ[i].id, pick: x.pick }] : []);
function recordBody(st) {
  const r = st.rec;
  return {
    gid: r.gid, key: r.key, board: r.board, name: r.board ? r.name : undefined, email: r.board && r.email ? r.email : undefined,
    score: Math.round(st.score), stage: st.stage, height: +(st.best / FLOOR).toFixed(1), drops: st.drops,
    wise: st.wise, risky: st.risky, missed: st.missed, falls: { ...st.falls }, choices: st.choices.slice(0, 20), ended: st.over,
    answers: answersOf(st), habit: st.habit || null,
    items: st.items, real_ms: Math.round(st.realMs), at: st.endAt || undefined, prior: st.prior,   // checked by the server; at buckets a late retry
    jackpot: st.jpAt >= 0 ? 1 : 0,   // its windfall and jackpot time raise the server's score limit
    avatar: WHO,   // Jack or Jackie
    sil: st.sil || undefined,   // the tower's outline (the ghost another player may chase)
    title: st.verdict ? st.verdict.id : undefined,   // the 稱號 (title) id, e.g. "zero"
    via: CHAL ? "c" : undefined,   // came from a friend's challenge link
    persona: st.persona ? personaKey(st.persona) : undefined,   // the rolled type, e.g. "sub+grind"
    troll_revive: st.troll.reviveSeen ? st.troll.revive : null, troll_invest: st.troll.invest, troll_tickets: st.troll.ticketSeen ? st.troll.tickets : null
  };
}
// Saves go out one at a time; each sends the latest state, and only if it changed since the last one.
function saveRecord(st, opts = {}) {
  const r = st.rec; if (!r) return Promise.resolve(null);
  clearTimeout(r.timer); r.timer = 0;
  const run = async () => {
    if (!db && apiAllowed && !apiGone) await refreshLB();
    if (!db || !dbWritable) { const e = new Error("offline"); e.offline = true; if (db) e.code = "closed"; throw e; }
    const body = JSON.stringify(recordBody(st));
    if (body === r.sent) return r.last;
    const j = await api(API, { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: !!opts.keepalive });
    r.sent = body; r.last = j; dropOutbox(r.gid); flushOutboxSoon();
    return j;
  };
  const p = r.chain.then(run);
  r.chain = p.catch(() => { });
  return p;
}
function saveSoon() {
  const st = S, r = st && st.rec; if (!r) return;
  clearTimeout(r.timer);
  r.timer = setTimeout(() => { r.timer = 0; saveRecord(st).catch(e => keepForLater(st, e)); }, 700);
}
function flushRecord(st, leaving) {   // send a waiting save now (new game, or the page is being hidden)
  const r = st && st.rec; if (!r || !r.timer) return;
  saveRecord(st, { keepalive: leaving }).catch(e => keepForLater(st, e));
}
const OUTBOX = "tff_outbox";
function keepForLater(st, e) {
  if (!apiAllowed || apiGone || !st.rec) return;   // no live board here at all
  if (e && (e.code === "closed" || e.code === "locked" || e.code === "bad_key" || (e.status >= 400 && e.status < 500 && e.status !== 429))) return;
  const body = recordBody(st); body.board = false; delete body.name; delete body.email;   // a later retry never posts to the board
  body.t = Date.now();
  lsSet(OUTBOX, lsGet(OUTBOX, []).filter(x => x.gid !== body.gid).concat([body]).slice(-100));   // under 1 KB each
}
function dropOutbox(gid) { const box = lsGet(OUTBOX, []); if (box.some(x => x.gid === gid)) lsSet(OUTBOX, box.filter(x => x.gid !== gid)); }
async function flushOutbox() {
  const all = lsGet(OUTBOX, []), box = all.filter(x => x && x.gid && Date.now() - (x.t || 0) < 2 * 86400000);
  if (box.length !== all.length) lsSet(OUTBOX, box);
  if (!box.length || !db || !dbWritable) return;
  for (const x of box) {
    const body = { ...x }; delete body.t;
    try { await api(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }); dropOutbox(x.gid); }
    catch (e) { if (e.status >= 400 && e.status < 500 && e.status !== 429) dropOutbox(x.gid); else break; }
  }
}
// Games kept on this device go out whenever the board is reachable again: after any save gets through, when the
// board refreshes, and when the device comes back online (a booth tablet may stay open all day). One at a time.
let flushing = null;
function flushOutboxSoon() { if (!flushing) flushing = flushOutbox().catch(() => { }).finally(() => { flushing = null; }); }

function postLabel(en, zh) { const b = $("postBtn"); b.firstChild.textContent = en; b.querySelector(".zh").textContent = zh; }
const EMAIL_OK = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:".]{2,}$/;
function emailError(on) {   // red outline plus aria-invalid, and the message under the button is read out with the field
  const em = $("email"), notes = ["emailNote", "privacyNote"].filter(id => $(id)).join(" ");
  em.classList.toggle("bad", on);
  if (on) em.setAttribute("aria-invalid", "true"); else em.removeAttribute("aria-invalid");
  em.setAttribute("aria-describedby", (on ? "postStatus " : "") + notes);
}
// the result of posting appears under the button: scroll it into view if it's below the visible part
const showStatus = () => requestAnimationFrame(() => {
  const box = $("stScroll"), over = $("postStatus").getBoundingClientRect().bottom - box.getBoundingClientRect().bottom + 8;
  if (over > 0) box.scrollBy({ top: over, behavior: reduceMotion ? "auto" : "smooth" });
});
$("postBtn").addEventListener("click", async () => {
  const st = S; if (st.posted || st.posting) return;
  const ps = $("postStatus"), btn = $("postBtn"), em = $("email");
  const email = em.closest(".fld").hidden ? "" : em.value.trim(), nick = $("nickname");
  nick.classList.remove("bad"); nick.removeAttribute("aria-invalid");
  if (!$("nickname").value.trim()) {   // posting needs a nickname...
    nick.classList.add("bad"); nick.setAttribute("aria-invalid", "true"); nick.focus(); ps.className = "post-status bad";
    ps.textContent = "Add a nickname to post your score. 請填暱稱先可以上榜。"; return;
  }
  if (!em.closest(".fld").hidden && (!email || email.length > 254 || !EMAIL_OK.test(email))) {   // ...and, on the live board, an email for the prizes
    emailError(true); em.focus(); ps.className = "post-status bad";
    ps.textContent = email ? "That email doesn't look right. Please check it. 電郵地址好似唔啱，請再檢查。" : "Add your email to post: it's how we reach prize winners. 請填電郵先可以上榜，我哋會用嚟聯絡得獎者。";
    return;
  }
  emailError(false); st.posting = true;
  const name = sanitizeName($("nickname").value); if (!BOOTH) lsSet("tff_name", name === ANON ? "" : name);
  if (email && !BOOTH) lsSet("tff_email", email);   // remembered here, like the nickname
  const answers = answersOf(st), right = st.quiz.filter(x => x && x.ok).length;
  const entry = {
    name, score: Math.round(st.score), stage: st.stage, height: +(st.best / FLOOR).toFixed(1), drops: st.drops,
    wise: st.wise, risky: st.risky, missed: st.missed, falls: { ...st.falls }, choices: st.choices.slice(0, 20), habit: st.habit || null,
    title: st.verdict ? st.verdict.id : undefined, persona: st.persona ? personaKey(st.persona) : undefined,
    answers, quiz: answers.length ? right : null, ended: st.over, at: new Date().toISOString(), week: localWeek()
  };   // the device copy never holds the email
  btn.disabled = true; postLabel("Posting…", "上載中"); ps.className = "post-status";
  if (!db && apiAllowed && !apiGone) await refreshLB();
  const saveLocal = () => { const arr = localScores(); arr.push(entry); lsSet("tff_scores_v3", arr.slice(-100)); };
  if (db && dbWritable) {
    const r = st.rec || (st.rec = newRecord());
    r.board = true; r.name = name; r.email = email;
    try {
      const j = await saveRecord(st);
      myLastId = j.id; myIds.add(j.id); lsSet("tff_my_ids", [...myIds].slice(-30)); st.posted = true; st.posting = false; st.boardName = j.name || name;
      myPost = { id: j.id, rank: j.rank || (j.rankCap || 500) + 1, week: j.week, name: j.name || name, score: entry.score, height: entry.height, title: entry.title, persona: entry.persona }; lsSet("tff_my_post", myPost);
      if (st === S) {
        A.sfx("post"); ps.className = "post-status ok";
        ps.textContent = (j.rank ? "You're #" + j.rank + " this week! 今個星期排第" + j.rank + "！ " : "On the live board! 已上榜！ ") +
          (email ? "We'll email you if you win a prize. 如果你得獎，我哋會電郵通知你。" : "");
        postLabel("Posted ✓", "已上榜"); showStatus(); cardBlob = null; stepButtons(); threadsLink();   // the picture will carry the nickname
        setTimeout(() => { if (st === S && S.step === 3) setStep(4); }, 1600);   // a moment to read the rank, then the card
      }
      lbSig = ""; refreshLB(true);
      return;
    } catch (e) {
      r.board = false; r.name = ""; r.email = "";   // posting happens only on a tap, so a later survey save mustn't post it
      if (e.code === "bad_email") {
        st.posting = false;
        if (st === S) {
          btn.disabled = false; postLabel("Post score", "上榜"); emailError(true); em.focus(); ps.className = "post-status bad";
          ps.textContent = "That email doesn't look right. Please check it. 電郵地址好似唔啱，請再檢查。";
        }
        return;
      }
      if (!e.status || e.status === 429 || (e.status >= 500 && e.code !== "no_database")) {
        // Busy or offline: keep the button so they can try again.
        st.posting = false;
        if (st === S) {
          btn.disabled = false; postLabel("Try again", "再試");
          ps.textContent = e.status === 429 ? "Lots of crabs posting at once. Wait a moment, then try again. 太多人同時上榜，等陣再試吓。"
            : "Couldn't reach the live board. Check your connection, then try again. 連唔到排行榜，檢查吓網絡再試。";
          showStatus();
        }
        return;
      }
      if (e.code === "closed" || e.code === "no_database" || e.status === 403) dbWritable = false;
      if (st === S) ps.textContent = e.code === "closed" ? "The live board is closed for new scores, so yours was saved on this device. 排行榜已經截止，分數存咗喺呢部機。"
        : "The live board couldn't take this score, so it was saved on this device. 排行榜收唔到呢個分數，已經存咗喺呢部機。";
    }
  } else ps.textContent = "Saved on this device. 已經存咗喺呢部機。";
  saveLocal(); myLocalAt = entry.at; st.posted = true; st.posting = false;
  if (st === S) { A.sfx("post"); ps.className = "post-status ok"; postLabel("Saved ✓", "已儲存"); showStatus(); cardBlob = null; stepButtons(); setTimeout(() => { if (st === S && S.step === 3) setStep(4); }, 1600); }
  lbSig = ""; renderLB();
});
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => {
  tab = b.dataset.tab; document.querySelectorAll(".tab").forEach(x => x.setAttribute("aria-pressed", String(x === b))); renderLB();
  if (tab !== "insights" && performance.now() - lastFetch > 15000) refreshLB();
}));
function lbRow(e, rank, mine) {
  const li = document.createElement("li"); if (mine) li.className = "me";
  const r = document.createElement("span"); r.className = "r"; r.textContent = rank;
  const n = document.createElement("span"); n.className = "n"; n.textContent = sanitizeName(e.name);
  const tv = e.title && TITLES.find(t => t.id === e.title), pv = e.persona && personaOf({ bg: String(e.persona).split("+")[0], pe: String(e.persona).split("+")[1] });
  if (tv || pv) {
    const sub = document.createElement("small"); sub.className = "lb-sub";
    sub.textContent = [pv && pv.zh, tv && tv.zh].filter(Boolean).join(" · ");
    sub.title = [pv && (pv.c.en || pv.en), tv && tv.en].filter(Boolean).join(" · ");
    n.appendChild(sub);
  }
  const f = document.createElement("span"); f.className = "fl"; f.textContent = typeof e.height === "number" ? floorTxt(e.height) : "";
  const s = document.createElement("span"); s.className = "s"; s.textContent = fmt(Number(e.score) || 0);
  li.append(r, n, f, s); return li;
}
function lbRows(list, extra) {
  const body = $("lbBody"); body.replaceChildren();
  if (!list.length) { const p = document.createElement("p"); p.className = "lb-empty"; bi(p, "No scores yet. Be the first crab on the board.", "仲未有人上榜，做第一隻蟹！"); body.appendChild(p); return; }
  const ol = document.createElement("ol"); ol.className = "lb";
  list.slice(0, 10).forEach((e, i) => {
    ol.appendChild(lbRow(e, i + 1, (e._id != null && (e._id === myLastId || myIds.has(e._id))) || (e._id == null && e.at && e.at === myLocalAt)));
  });
  if (extra) {
    const sep = document.createElement("li"); sep.className = "sep"; sep.setAttribute("aria-hidden", "true"); sep.textContent = "···"; ol.appendChild(sep);
    const you = lbRow(extra, extra.rank > 500 ? "500+" : extra.rank > 10 ? extra.rank : "10+", true); you.classList.add("you");
    you.title = "Your latest score this week, ranked when you posted 你今個星期最新嘅分數"; ol.appendChild(you);
  }
  body.appendChild(ol);
}
// "2026-W45" as the dates people know: ["2–8 Nov", "11月2日至8日"]
function weekDates(key) {
  const m = /^(\d{4})-W(\d{1,2})$/.exec(key || ""); if (!m) return null;
  const jan4 = Date.UTC(+m[1], 0, 4), dow = (new Date(jan4).getUTCDay() + 6) % 7, mon = new Date(jan4 - dow * 864e5 + (+m[2] - 1) * 7 * 864e5), sun = new Date(mon.getTime() + 6 * 864e5);
  const en = d => d.getUTCDate() + " " + d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
  const zh = (d, withMonth) => (withMonth ? (d.getUTCMonth() + 1) + "月" : "") + d.getUTCDate() + "日";
  const same = mon.getUTCMonth() === sun.getUTCMonth();
  return [(same ? mon.getUTCDate() : en(mon)) + "–" + en(sun), zh(mon, true) + "至" + zh(sun, !same)];
}
function renderLB() {
  const note = $("lbNote");
  if (tab === "insights") { lbSig = ""; renderInsights(); return; }
  let list, txt;
  if (db) {
    list = tab === "week" ? lbWeek : lbAll;
    if (!dbWritable) list = list.concat(localList());
    const wd = weekDates(curWeek());
    txt = tab === "week" ? "This week" + (wd ? ", " + wd[0] : "") + " · a new board every Monday 本週" + (wd ? "（" + wd[1] + "）" : "") + "，逢星期一重新計算" : "All-time, every player 所有玩家總排名";
  }
  else { list = localList(); txt = "Scores on this device 本機紀錄"; }
  list = list.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
  const extra = db && tab === "week" && myPost && myPost.week === curWeek() && myPost.rank > 0 && !list.slice(0, 10).some(e => e._id === myPost.id) ? myPost : null;
  const sig = tab + "|" + txt + "|" + myLastId + "|" + myLocalAt + "|" + (extra ? extra.id : "") + "|" + list.slice(0, 10).map(e => (e._id != null ? e._id : e.at) + ":" + e.score + ":" + e.name + ":" + (e.title || "") + ":" + (e.persona || "")).join(",");
  if (sig === lbSig) return;
  lbSig = sig; lbRows(list, extra); note.textContent = txt;
}
function bar(label, val, max, cls) {
  const d = document.createElement("div"); d.className = "bar2" + (cls ? " " + cls : "");
  const l = document.createElement("span"); l.textContent = label;
  const v = document.createElement("b"); v.textContent = String(val);
  const tr = document.createElement("span"); tr.className = "track"; const i = document.createElement("i");
  i.style.width = (max ? Math.round(100 * (parseFloat(val) || 0) / max) : 0) + "%"; tr.appendChild(i);
  d.append(l, v, tr); return d;
}
// Same shape the API's ?view=stats returns, so live and on-device data render through one path.
// Quiz figures count finished quizzes only (older saved games kept just the number right).
const aggregate = games => CORE.aggregateStats(games, QUIZ.length, window.TFF_CONTENT.habitNow);
const addAgg = (a, b) => CORE.mergeStats(a, b);
async function renderInsights() {
  const body = $("lbBody"), note = $("lbNote");
  body.replaceChildren(); const p = document.createElement("p"); p.className = "lb-empty"; p.textContent = "Loading… 載入中"; body.appendChild(p);
  let agg, label;
  if (db) {
    try { const j = await api(API + "?view=stats"); agg = addAgg(aggregate([]), j.stats); agg.sample = !!j.stats.sample; } catch (e) { agg = aggregate([]); }
    if (!dbWritable) agg = addAgg(agg, aggregate(localScores()));
    label = agg.games ? (agg.sample ? "From the latest " : "From ") + agg.games + " game" + (agg.games === 1 ? "" : "s") + ", anonymised 匿名數據" : "";
  } else { agg = aggregate(localScores()); label = "From games saved on this device 本機數據"; }
  if (tab !== "insights") return;
  note.textContent = label;
  body.replaceChildren();
  if (!agg.games) { const q = document.createElement("p"); q.className = "lb-empty"; bi(q, "Insights appear once players post scores.", "有人上榜後就會見到數據。"); body.appendChild(q); return; }
  const falls = agg.falls, total = agg.wise + agg.risky + agg.missed;
  const wrap = document.createElement("div"); wrap.className = "insight";
  wrap.appendChild(bar("Wise choices 明智選擇", (total ? Math.round(100 * agg.wise / total) : 0) + "%", 100));
  const fmax = Math.max(1, falls.spend, falls.scam, falls.delay);
  for (const kk in falls) wrap.appendChild(bar(TRAPS[kk].en + " " + TRAPS[kk].zh, String(falls[kk]), fmax, "t-" + kk));
  const topFall = Object.entries(falls).sort((a, b) => b[1] - a[1])[0];
  const hl = document.createElement("p"); hl.style.margin = "2px 0 0";
  if (topFall[1]) bi(hl, "Most common fall: " + TRAPS[topFall[0]].en, "最多人中嘅陷阱：" + TRAPS[topFall[0]].zh); else bi(hl, "No falls recorded yet.", "暫時冇人中伏。");
  wrap.appendChild(hl);
  const topHabit = Object.entries(agg.habits).sort((a, b) => b[1] - a[1])[0];
  if (topHabit) { const h = HABITS.find(x => x.id === topHabit[0]); const hp = document.createElement("p"); hp.style.margin = "0"; bi(hp, "Top habit pledged: " + (h ? h.en : topHabit[0]) + " (" + topHabit[1] + ")", h ? "最多人揀嘅習慣：" + h.zh : ""); wrap.appendChild(hp); }
  if (agg.quizN) {
    const qp = document.createElement("p"); qp.style.margin = "0"; const pass = Math.round(100 * agg.quizPass / agg.quizN);
    bi(qp, "Quiz: " + pass + "% got 2 or 3 right · average " + (agg.quizSum / agg.quizN).toFixed(1) + "/3 · " + agg.quizN + " player" + (agg.quizN === 1 ? "" : "s"),
      "測驗：有" + pass + "%人答啱2題或以上，平均" + (agg.quizSum / agg.quizN).toFixed(1) + "/3，共" + agg.quizN + "人");
    wrap.appendChild(qp);
  }
  body.appendChild(wrap);
}
async function initDB() {
  if (!apiAllowed) { renderLB(); return; }
  const body = $("lbBody"); body.replaceChildren(); const p = document.createElement("p"); p.className = "lb-empty"; p.textContent = "Loading the live board… 載入排行榜中"; body.appendChild(p);
  await refreshLB();
  if (apiGone) return;
  schedulePoll(45000);
  window.addEventListener("online", () => { flushOutboxSoon(); refreshLB(true); });
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && performance.now() - lastFetch > 20000) refreshLB(); });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(es => {
      lbVisible = es.some(e => e.isIntersecting);
      if (lbVisible && performance.now() - lastFetch > 20000) refreshLB();
    }).observe(document.querySelector(".lbx"));
  }
}

// ---------- boot: a settled sample tower behind the start card ----------
// Where the plan below settles (id, x, y, angle, outline points): running it takes ~600 physics steps at load,
// so the settled tower is placed directly. If an item's shape has changed since, the plan runs as before.
const TOWER = [["lunchbox", 152.06, -21.076, -0.0027, 52], ["textbooks", 261.858, -20.288, 0.0062, 24], ["steamer", 180.307, -68.17, -0.0086, 44],
["piggybank", 281.871, -76.162, 0.0083, 62], ["handbag", 224.615, -131.694, -0.0968, 52]];
function sampleTower() {
  S = newState(); makeEngine();
  const pick = id => DEFS.find(d => d.id === id);
  const points = b => b.parts.reduce((s, q, i) => s + (i || b.parts.length === 1 ? q.vertices.length : 0), 0);
  const placed = TOWER.every(([id, x, y, a, n]) => {
    const def = pick(id); if (!def) return false;
    const b = addItem(def, x, y, false); Body.setAngle(b, a); Body.setPosition(b, { x, y }); Sleeping.set(b, true);
    return points(b) === n;
  });
  if (!placed) {
    for (const b of engine.world.bodies.slice()) if (b.tff) Composite.remove(engine.world, b);
    const plan = [["lunchbox", -70, -26], ["textbooks", 42, -24], ["steamer", -40, -70], ["piggybank", 60, -75], ["calculator", -80, -120],
    ["handbag", 10, -125], ["bubbletea", 80, -140], ["football", -30, -175], ["passbook", 40, -190]];
    const fallback = DEFS.filter(d => d.kind !== "debt");
    plan.forEach(([id, x, y], i) => {
      const def = pick(id) || fallback[i % fallback.length]; if (!def) return;
      addItem(def, W / 2 + x, y, false); for (let s = 0; s < 45; s++) Engine.update(engine, STEP);
    });
    for (let s = 0; s < 200; s++) Engine.update(engine, STEP);
    for (const b of engine.world.bodies.slice()) if (b.tff && b.position.y > WATER_Y) Composite.remove(engine.world, b);
  }
  let h = 0; for (const b of engine.world.bodies) if (b.tff && b.position.y < 5) h = Math.max(h, -b.bounds.min.y);
  S.height = h; S.camTop = Math.min(camBase(), -h - 330);
  S.queue = [pick("football") || fallback[0], pick("textbooks") || fallback[1] || fallback[0], pick("banana") || fallback[2] || fallback[0]];
  crab("Hi! I'm the 3 Fall Crab. Every item you stack is a money decision.", "我係3 Fall Crab！你疊嘅每件嘢，都係一個理財決定。");
}
fsOn = !!lsGet("tff_fs", true); root.classList.toggle("fs", fsOn); root.classList.toggle("title", fsOn); $("fsBtn").setAttribute("aria-pressed", String(fsOn));   // full screen by default
buildStatic(); sampleTower(); resize(); drawCrabs(); updateHUD(); renderLedger(); setMuteUI(); planFirst();
if (AV && AV.onCast) AV.onCast(() => {   // the photographed cast has loaded: everything drawn in clay so far, again
  avKeys.clear(); buildLayers(false, "crab"); drawCrabs(); talk.mood = null; needDraw = true;
  if (S && S.mode !== "idle") updateAvatar(true);
  if (!$("pickModal").hidden) setPick(pickSel, true);
  if (!$("rollModal").hidden) paintAvatar($("rollAvatar"), { who: WHO, stage: 0, tier: 1, hand: null, mood: "happy", drops: 0, boost: false });
  if (!$("endModal").hidden) paintAvatar($("endAvatar"), lookNow());
});
document.querySelectorAll(".falls .clip").forEach(clipAdd);
markZh(document.body); zhWatch.observe(document.body, ZH_WATCH);
// Card timer, 10 s or 30 s: the same choice on the start and pause cards
const syncTimer = () => document.querySelectorAll(".ctime input").forEach(r => { r.checked = r.value === (slowRead ? "30" : "10"); });
document.querySelectorAll(".ctime input").forEach(r => r.addEventListener("change", () => {
  A.sfx("uiToggle");
  if (!r.checked) return;
  slowRead = r.value === "30"; lsSet("tff_slow_read", slowRead); syncTimer();
}));
syncTimer();
initDB();
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => { }));
}
// Pictures with lettering are remade once the web fonts have arrived, in spare time; until then the first ones stay up.
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
  for (const s of SPR.values()) if (s.text) s.k = -1;
  buildLayers(true, "plat"); needDraw = true; drawPreviews(true);
  if (root.classList.contains("wide")) { lastFit = ""; resize(); }   // the status bar was measured in the fallback font
});
requestAnimationFrame(frame);
