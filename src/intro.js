// The opening manga: before the title, on every visit, a short story in three comic pages. Jack and Jackie start
// Year 1 at HSUHK, get their first pay, meet the 3 Falls, and the 3 Fall Crab sends them off to stack their lives.
// The pictures are the game's own clay (CLAY, TFF_AVATAR, the crab); the words are real text for screen readers.
// About 20 seconds: it plays by itself, a tap (Enter, Space, →, or A on a pad) goes on, Skip (Esc, B) ends it.
// ?intro=0 or localStorage tff_intro = "off" leaves it out (booth staff, tests).
(function(){
"use strict";
const el = document.getElementById("intro");
if (!el) return;
const K = window.CLAY, AV = window.TFF_AVATAR, ART = window.TFF_ART || {};
let off = /[?&]intro=0\b/.test(location.search);
try { if (localStorage.getItem("tff_intro") === "off") off = true; } catch(e){}
if (off || !K || !AV){ el.hidden = true; return; }
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const behind = [...document.body.children].filter(n => n !== el && n.tagName !== "SCRIPT"), was = behind.map(n => n.inert);
behind.forEach(n => { n.inert = true; });

// ---------- the pictures ----------
const F = K.FONTS;
const fig = (g, look, cx, foot, h) => { const s = h / 230; g.save(); g.translate(cx - 60 * s, foot - 222 * s); g.scale(s, s); AV.draw(g, look); g.restore(); };
const jack = o => Object.assign({who: "jack", stage: 0, tier: 1, hand: null, mood: "happy", drops: 0, boost: false}, o);
const jackie = o => jack(Object.assign({who: "jackie"}, o));
const sky = (g, w, h, a, b) => { const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(0, 0, w, h); };
const coin = (g, x, y, r) => { K.blob(g, K.ball(x, y, r, r, {lump: 0.15, seed: Math.round(x + y)}), "#FFC83D", {depth: 1.2, soft: 1.6, sheen: {x: x - r * 0.3, y: y - r * 0.35, rx: r * 0.35, ry: r * 0.2}});
  g.fillStyle = "#B8860B"; g.font = "900 " + Math.round(r * 1.1) + "px " + F.display; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("$", x, y + r * 0.05); };
const sparkle = (g, x, y, r, col) => { g.fillStyle = col || "#fff"; g.beginPath(); for (let i = 0; i < 8; i++){ const a = i * Math.PI / 4, q = i % 2 ? r * 0.32 : r; g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } g.closePath(); g.fill(); };
const word = (g, t, x, y, size, fill, rot) => { g.save(); g.translate(x, y); g.rotate(rot || 0); g.font = "900 " + size + "px " + F.display; g.textAlign = "center"; g.textBaseline = "middle";
  g.lineJoin = "round"; g.lineWidth = size * 0.18; g.strokeStyle = "#1E1A24"; g.strokeText(t, 0, 0); g.fillStyle = fill; g.fillText(t, 0, 0); g.restore(); };

const SCENES = {
  // Year 1: a hillside campus, the two of them walking in
  campus(g, w, h){
    sky(g, w, h, "#5EC4FF", "#CDEFFF");
    K.blob(g, K.ball(w * 0.85, h * 0.16, h * 0.07, h * 0.07, {lump: 0.4, seed: 2}), "#FFE45C", {depth: 1, soft: 2});
    K.blob(g, K.blobPoly([[-20, h * 0.66], [w * 0.22, h * 0.5], [w * 0.5, h * 0.56], [w * 0.78, h * 0.44], [w + 20, h * 0.52], [w + 20, h + 20], [-20, h + 20]], {lump: 1, seed: 4, step: 14}), "#4FB774", {depth: 4, soft: 8, sheen: false});
    const bld = (x, wd, ht, col, seed) => { const top = h * 0.6 - ht; K.blob(g, K.slab(x, top + ht / 2, wd, ht, 5, {lump: 0.5, seed}), col, {depth: 3, soft: 5});
      for (let yy = top + 10; yy < h * 0.58 - 8; yy += 13) for (let xx = x - wd / 2 + 8; xx < x + wd / 2 - 8; xx += 11) K.press(g, K.rrc(xx + 3, yy, 6, 7, 1.5), "#FFF6C8", {sheen: false, texture: 0, depth: 0.5, soft: 0.8, rim: 0.3}); };
    bld(w * 0.2, w * 0.2, h * 0.3, "#F2E3C6", 11); bld(w * 0.42, w * 0.22, h * 0.42, "#F7F1E6", 12); bld(w * 0.66, w * 0.18, h * 0.34, "#E9D4B5", 13);
    K.blob(g, K.slab(w * 0.42, h * 0.6 - h * 0.42 - 10, w * 0.17, 16, 4, {lump: 0.2, seed: 9}), "#2C3566", {depth: 1.5, soft: 2});
    g.fillStyle = "#fff"; g.font = "900 " + Math.round(Math.min(12, w * 0.032)) + "px " + F.display; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("HSUHK", w * 0.42, h * 0.6 - h * 0.42 - 9);
    for (const [x, r] of [[w * 0.06, 0.07], [w * 0.88, 0.08], [w * 0.55, 0.05]]){ K.blob(g, K.tube([[x, h * 0.62], [x, h * 0.52]], 6), "brown", {depth: 1, soft: 1.5, sheen: false}); K.blob(g, K.ball(x, h * 0.5, h * r, h * r * 0.9, {lump: 0.9, seed: Math.round(x)}), "#3E9E4F", {depth: 2.5, soft: 4, sheen: false}); }
    K.blob(g, K.blobPoly([[w * 0.36, h + 10], [w * 0.47, h * 0.62], [w * 0.53, h * 0.62], [w * 0.7, h + 10]], {lump: 0.4, seed: 6}), "#E8C895", {depth: 1.5, soft: 3, sheen: false});
    const fh = Math.min(h * 0.56, w * 0.5);
    fig(g, jack({}), w * 0.4, h * 0.97, fh); fig(g, jackie({}), w * 0.6, h * 0.97, fh);
  },
  // the first pay
  pay(g, w, h){
    sky(g, w, h, "#FFE9A6", "#FFC56B");
    for (let i = 0; i < 9; i++) coin(g, w * (0.12 + (i * 0.37) % 0.8), h * (0.3 + ((i * 0.53) % 0.35)), Math.min(w, h) * 0.035 + (i % 3) * 2);
    const ex = w * 0.5, ey = h * 0.42, ew = Math.min(w * 0.3, 120), eh = ew * 0.62;
    K.blob(g, K.slab(ex, ey, ew, eh, 6, {lump: 0.3, seed: 3}), "#FFFDF7", {depth: 1.6, soft: 2.4});
    K.blob(g, K.slab(ex, ey - eh * 0.1, ew, eh * 0.2, 2, {lump: 0.1, seed: 4}), "#F2463E", {depth: 0.6, soft: 1, sheen: false});
    g.fillStyle = "#1F9E4A"; g.font = "900 " + Math.round(ew * 0.17) + "px " + F.display; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("HK$4,000", ex, ey + eh * 0.22);
    sparkle(g, ex + ew * 0.55, ey - eh * 0.6, 9); sparkle(g, ex - ew * 0.6, ey - eh * 0.3, 6);
    const fh = Math.min(h * 0.6, w * 0.55);
    fig(g, jackie({hand: "piggy"}), w * 0.27, h * 1.02, fh); fig(g, jack({}), w * 0.75, h * 1.02, fh);
  },
  // Fall 1: a shiny phone on instalments
  spend(g, w, h){
    sky(g, w, h, "#FFD2A8", "#FF9A5C");
    const px = w * 0.66, py = h * 0.5, pw = Math.min(w * 0.3, h * 0.42), ph = pw * 1.8;
    K.blob(g, K.slab(px, py, pw, ph, pw * 0.16, {lump: 0.2, seed: 5}), "#2E2838", {depth: 2, soft: 3});
    K.blob(g, K.slab(px, py, pw * 0.82, ph * 0.84, pw * 0.1, {lump: 0.1, seed: 6}), "#FFF1DA", {depth: 0.6, soft: 1, sheen: false});
    word(g, "BUY", px, py - ph * 0.22, Math.round(pw * 0.24), "#FF7B35", -0.08); word(g, "NOW!", px, py - ph * 0.05, Math.round(pw * 0.22), "#FF5FA2", 0.06);
    g.fillStyle = "#1E1A24"; g.font = "800 " + Math.round(pw * 0.11) + "px " + F.display; g.textAlign = "center"; g.fillText("0% · 24 months", px, py + ph * 0.16);
    for (const [x, y, r] of [[px - pw * 0.7, py - ph * 0.4, 9], [px + pw * 0.62, py - ph * 0.2, 7], [px - pw * 0.5, py + ph * 0.3, 6]]) sparkle(g, x, y, r, "#FFF6C8");
    fig(g, jack({hand: "phone"}), w * 0.27, h * 1.02, Math.min(h * 0.82, w * 0.95));
  },
  // Fall 2: a "guaranteed" offer from a shadow
  scam(g, w, h){
    sky(g, w, h, "#2C1F57", "#6E4FD8");
    const sx = w * 0.72, sy = h * 0.62, sr = Math.min(w, h) * 0.24;
    K.blob(g, K.ball(sx, sy, sr, sr * 1.2, {lump: 1.4, seed: 8}), "#1A1430", {depth: 2, soft: 6, sheen: false});
    g.fillStyle = "#FFE45C"; for (const d of [-1, 1]){ g.beginPath(); g.ellipse(sx + d * sr * 0.32, sy - sr * 0.3, sr * 0.16, sr * 0.06, d * 0.3, 0, 7); g.fill(); }
    g.strokeStyle = "#FFE45C"; g.lineWidth = 3; g.lineCap = "round"; g.beginPath(); g.arc(sx, sy - sr * 0.05, sr * 0.38, 0.2, Math.PI - 0.2); g.stroke();
    for (let i = 0; i < 5; i++){ const x = w * (0.42 + i * 0.05), y = h * (0.86 - i * 0.04); coin(g, x, y, Math.min(w, h) * 0.03); }
    fig(g, jack({hand: "phone", mood: "worried"}), w * 0.24, h * 1.02, Math.min(h * 0.8, w * 0.95));
  },
  // Fall 3: "next year", half asleep
  delay(g, w, h){
    sky(g, w, h, "#18305E", "#3A6FC4");
    K.blob(g, K.ball(w * 0.82, h * 0.2, Math.min(w, h) * 0.08, Math.min(w, h) * 0.08, {lump: 0.3, seed: 2}), "#FFF6C8", {depth: 1, soft: 2});
    for (const [x, y] of [[0.1, 0.15], [0.3, 0.08], [0.55, 0.18], [0.92, 0.45], [0.18, 0.4]]) sparkle(g, w * x, h * y, 4, "#FFF6C8");
    word(g, "Z", w * 0.62, h * 0.42, Math.round(h * 0.09), "#9DD8FF", -0.2); word(g, "z", w * 0.7, h * 0.32, Math.round(h * 0.07), "#9DD8FF", 0.1); word(g, "z", w * 0.76, h * 0.24, Math.round(h * 0.055), "#9DD8FF", -0.1);
    const cx = w * 0.78, cy = h * 0.72, cw = Math.min(w * 0.22, 90);
    K.blob(g, K.slab(cx, cy, cw, cw * 0.9, 5, {lump: 0.2, seed: 7}), "#FFFDF7", {depth: 1.6, soft: 2});
    K.blob(g, K.slab(cx, cy - cw * 0.34, cw, cw * 0.22, 3, {lump: 0.1, seed: 8}), "#F2463E", {depth: 0.6, soft: 1, sheen: false});
    g.fillStyle = "#1E1A24"; g.font = "900 " + Math.round(cw * 0.3) + "px " + F.display; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("2027?", cx, cy + cw * 0.08);
    fig(g, jackie({hand: "hourglass", mood: "idle"}), w * 0.3, h * 1.02, Math.min(h * 0.82, w * 0.95));
  },
  // your life tower: blocks up through the four stages
  tower(g, w, h){
    const cols = ["#4CC36A", "#3A9BF0", "#FF7B35", "#8B6CF2", "#FFC83D", "#20C1B3", "#FF5FA2", "#F2463E"], tx = w * 0.62, bw = Math.min(w * 0.2, 120), base = h * 0.98;
    let y = base; const bh = (h * 0.8) / cols.length;
    cols.forEach((c, i) => { const ww = bw * (1 - (i % 3) * 0.12), x = tx + ((i % 2) ? 6 : -6); K.blob(g, K.slab(x, y - bh / 2, ww, bh - 3, 6, {lump: 0.6, seed: i + 3}), c, {depth: 2.4, soft: 3.6}); y -= bh; });
    const stages = [["University 大學", 0.12], ["First Job 第一份工", 0.36], ["Family 成家", 0.6], ["Retirement 退休", 0.86]];
    g.textBaseline = "middle"; g.font = "800 " + Math.round(Math.max(11, Math.min(15, w * 0.03))) + "px " + F.zh;
    for (const [t, f] of stages){ const yy = base - h * 0.8 * f, tw = g.measureText(t).width, right = tx + bw * 0.62, x = right + tw + 20 <= w ? right : tx - bw * 0.62 - tw - 16;   // the side with room
      g.fillStyle = "rgba(37,49,122,.92)"; g.beginPath(); g.roundRect ? g.roundRect(x, yy - 12, tw + 16, 24, 10) : g.rect(x, yy - 12, tw + 16, 24); g.fill();
      g.fillStyle = "#FFE45C"; g.textAlign = "left"; g.fillText(t, x + 8, yy + 1); }
  },
  crab(g, w, h){
    if (!ART.crab) return;
    const s = Math.min(4, Math.min(w, h) / 64 * 0.42); g.save(); g.translate(w * 0.27, h * 0.66); g.scale(s, s); ART.crab(g, "happy"); g.restore();
    const fh = Math.min(h * 0.42, w * 0.32);
    fig(g, jack({}), w * 0.12, h * 1.0, fh); fig(g, jackie({}), w * 0.42, h * 1.0, fh);
  }
};
function paint(cv){
  try {
    const r = {width: cv.clientWidth, height: cv.clientHeight}; if (!r.width || !r.height) return;   // layout size: a pop-in scale doesn't change it
    const dpr = Math.min(2, window.devicePixelRatio || 1), w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (cv._drawn === w + "x" + h) return;
    cv.width = w; cv.height = h; const g = cv.getContext("2d"); g.setTransform(dpr, 0, 0, dpr, 0, 0);
    SCENES[cv.dataset.art](g, r.width, r.height); cv._drawn = w + "x" + h;
  } catch(e){}
}
const paintPage = page => page.querySelectorAll("canvas[data-art]").forEach(paint);

// ---------- the story, step by step ----------
const steps = [...el.querySelectorAll("[data-step]")].sort((a, b) => a.dataset.step - b.dataset.step);
const pages = [...el.querySelectorAll(".mpage")], dots = [...el.querySelectorAll(".mdots li")];
const HOLD = [3300, 3000, 2600, 2600, 2700, 3200, 3000];   // about 20 s
let i = -1, timer = 0, done = false;
function go(n){
  i = n; const s = steps[n], page = s.closest(".mpage");
  if (page.hidden){
    pages.forEach(p => { p.hidden = p !== page; p.classList.remove("turn"); });
    paintPage(page); if (!reduce){ void page.offsetWidth; page.classList.add("turn"); }
  }
  dots.forEach((d, k) => d.classList.toggle("on", k === pages.indexOf(page)));
  s.classList.add("on");
  if (n && ART.sfx) ART.sfx("uiNext");
  clearTimeout(timer); timer = setTimeout(next, HOLD[n] || 3000);
}
function next(){ if (done) return; if (i < steps.length - 1) go(i + 1); else end(); }
function end(){
  if (done) return; done = true; clearTimeout(timer);
  window.removeEventListener("keydown", onKey, true);
  behind.forEach((n, k) => { n.inert = was[k]; });
  el.classList.add("out");
  setTimeout(() => { el.hidden = true; }, reduce ? 0 : 460);
  const start = document.getElementById("startBtn"); if (start && start.offsetParent) start.focus({preventScroll: true});
}
function onKey(e){
  if (done) return;
  const k = e.key;
  if (k === "Escape"){ end(); }
  else if (k === "Enter" || k === " " || k === "ArrowRight"){ if (e.target && e.target.id === "introSkip" && k !== "ArrowRight") return; next(); }
  else return;
  if (ART.sound) ART.sound();   // a key is a first touch too: sound on
  e.preventDefault(); e.stopImmediatePropagation();
}
window.addEventListener("keydown", onKey, true);
el.addEventListener("click", e => { if (e.target.closest("#introSkip")) end(); else next(); });
let rz = 0; window.addEventListener("resize", () => { if (done) return; clearTimeout(rz); rz = setTimeout(() => pages.forEach(p => { if (!p.hidden) paintPage(p); }), 200); });
window.TFF_INTRO = {on: () => !done, next, skip: end};
try { paintPage(pages[0]); requestAnimationFrame(() => go(0)); $skipFocus(); } catch(e){ end(); }
function $skipFocus(){ const b = document.getElementById("introSkip"); if (b) b.focus({preventScroll: true}); }
setTimeout(() => { if (!done) end(); }, 45000);   // never stuck
})();
