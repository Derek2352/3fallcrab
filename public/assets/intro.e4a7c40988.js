// The opening film: before the title, on every visit, a short stop-motion film in seven shots (src/film/, made with
// GPT Image 2 from the cast's model sheets). Jack and Jackie start Year 1 at HSUHK, get their first pay, meet the 3 Falls,
// and the 3 Fall Crab sends them off to stack their lives; then the title, and the question: what would you do?
// Each shot fills the screen with a slow camera move, cut to the next with a film cut (fade, dissolve, whip pan,
// lightning flash, dawn white-out), with film grain, subtitles (real text, for screen readers too), a synthesized
// score and sound for every shot (GameAudio.film in src/audio.js) once sound is on.
// About 28 seconds: it plays by itself, a tap (Enter, Space, →, or A on a pad) goes on, Skip (Esc, B) ends it, and
// "Your turn" at the end starts the game.
// ?intro=0 or localStorage tff_intro = "off" leaves it out (booth staff, tests).
(function(){
"use strict";
const el = document.getElementById("intro");
if (!el) return;
const ART = window.TFF_ART || {}, GA = window.GameAudio;
let off = /[?&]intro=0\b/.test(location.search);
try { if (localStorage.getItem("tff_intro") === "off") off = true; } catch(e){}
if (off){ el.hidden = true; return; }
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const behind = [...document.body.children].filter(n => n !== el && n.tagName !== "SCRIPT"), was = behind.map(n => n.inert);
behind.forEach(n => { n.inert = true; });

const scr = document.getElementById("fScreen"), flashEl = el.querySelector(".fflash"), bar = document.getElementById("fBar");
const beats = [...el.querySelectorAll(".fbeat")].sort((a, b) => a.dataset.step - b.dataset.step);
const shots = {}; el.querySelectorAll(".fshot").forEach(s => { shots[s.dataset.shot] = s; });
const TOTAL = beats.reduce((t, b) => t + (+b.dataset.hold || 3000), 0);

// ---------- the pictures: the first is in the page; the rest load in order, while the credit is up
const ready = {};
Object.entries(shots).forEach(([k, s]) => {
  const img = s.querySelector("img");
  const ok = () => { ready[k] = true; img.classList.add("ok"); };
  if (img.complete && img.naturalWidth) ok(); else img.addEventListener("load", ok);
  img.addEventListener("error", () => { img.remove(); });   // the shot's own colour stands in
});
(async () => { for (const s of Object.values(shots)){ const img = s.querySelector("img"); if (!img || !img.dataset.src) continue;
  img.src = img.dataset.src; delete img.dataset.src;
  await new Promise(r => { if (img.complete) r(); else { img.addEventListener("load", r, {once: true}); img.addEventListener("error", r, {once: true}); setTimeout(r, 4000); } }); } })();

// ---------- the screen: a 4:5 (phone) to 1.85:1 (wide) window on the square shots, black round it
function fit(){
  const W = innerWidth, H = innerHeight, port = W / H < 0.9;
  const resT = port ? Math.min(64, H * 0.08) : 0, resB = port ? Math.min(170, H * 0.22) : 0;   // a phone: room for the subtitles under the picture
  const ar = Math.max(0.8, Math.min(1.85, W / (H - resT - resB)));
  let w = Math.min(W, (H - resT - resB) * ar), h = w / ar;
  el.style.setProperty("--fw", Math.floor(w) + "px"); el.style.setProperty("--fh", Math.floor(h) + "px");
  el.style.setProperty("--fpad-t", resT + "px"); el.style.setProperty("--fpad-b", resB + "px");
  el.classList.toggle("port", port);
}
fit();

// ---------- sound: the film's own score and effects, once the player has given the page a tap
const film = GA && GA.film;
let cued = -1;
const soundBtn = document.getElementById("introSound");
function soundState(){ const live = !!(GA && film && film.live()); soundBtn.hidden = live || done; return live; }
function cue(n){ if (!film || cued === n) return; if (film.cue(beats[n].dataset.cue || cueName(n), {via: beats[n].dataset.via})) cued = n; }
const cueName = n => beats[n].dataset.shot ? (n === 8 ? "hook" : beats[n].dataset.shot) : "open";
function soundOn(){
  if (ART.sound) ART.sound(); else if (GA) GA.unlock();
  if (GA && GA.isMuted && GA.isMuted()) GA.setMuted(false);
  setTimeout(() => { cue(i); soundState(); }, 60);
}

// ---------- the film, beat by beat
let i = -1, timer = 0, done = false, shown = null;
function cut(n){
  const b = beats[n], via = b.dataset.via, k = b.dataset.shot, hold = +b.dataset.hold || 3000;
  beats.forEach((x, j) => x.classList.toggle("on", j === n));
  scr.classList.toggle("hook", via === "hook");
  if (k && shots[k] !== shown){
    const prev = shown, next = shots[k];
    Object.values(shots).forEach(s => { if (s !== prev && s !== next) s.className = "fshot"; });
    if (prev){ prev.className = "fshot off via-" + via; }
    next.style.setProperty("--dur", (hold + (k === "title" ? +beats[8].dataset.hold : 0) + 1600) + "ms");
    if (via === "white" && !reduce){   // dawn: up to white, then the shot comes out of it
      flashEl.className = "fflash"; void flashEl.offsetWidth; flashEl.className = "fflash white";
      setTimeout(() => { if (shown === next){ next.className = "fshot on via-cut"; if (prev) prev.className = "fshot"; } }, 520);
    } else {
      void next.offsetWidth; next.className = "fshot on via-" + via;
      if (via === "flash" && !reduce){ flashEl.className = "fflash"; void flashEl.offsetWidth; flashEl.className = "fflash flash"; }
      setTimeout(() => { if (shown === next && prev && prev !== next) prev.className = "fshot"; }, 1200);
    }
    shown = next;
  }
  bar.style.width = (100 * beats.slice(0, n + 1).reduce((t, x) => t + (+x.dataset.hold || 3000), 0) / TOTAL) + "%";
  cue(n);
}
function go(n){
  i = n; cut(n);
  clearTimeout(timer);
  let hold = +beats[n].dataset.hold || 3000;
  if (n === 0 && !ready.campus) hold += 1500;   // the credit waits a little for the first picture
  timer = setTimeout(next, hold);
}
function next(){ if (done) return; if (i < beats.length - 1) go(i + 1); else end(); }
function end(play){
  if (done) return; done = true; clearTimeout(timer);
  window.removeEventListener("keydown", onKey, true); removeEventListener("resize", fit);
  behind.forEach((n, k) => { n.inert = was[k]; });
  if (film) film.stop(play ? 0.25 : 0.8);
  if (ART.music) ART.music();   // the title's own music, if sound is on
  el.classList.add("out");
  setTimeout(() => { el.hidden = true; }, reduce ? 0 : 600);
  const start = document.getElementById("startBtn");
  if (play && start){ start.click(); return; }
  if (start && start.offsetParent) start.focus({preventScroll: true});
}
function onKey(e){
  if (done) return;
  const k = e.key;
  if (k === "Escape"){ end(); }
  else if (k === "Enter" || k === " " || k === "ArrowRight"){ if (e.target && e.target.closest && e.target.closest("button")) return; tapped(); next(); }
  else return;
  e.preventDefault(); e.stopImmediatePropagation();
}
function tapped(){ el.classList.add("tapped"); askFs(); setTimeout(() => { if (cued !== i) cue(i); soundState(); }, 80); }
window.addEventListener("keydown", onKey, true);
// The first tap or key on the film also asks for the browser's own full screen (a page may only ask on a tap or a
// key), so the title is already free of the browser's bars. Left untouched, it waits for Start as before.
let fsAsked = false;
function askFs(){ if (fsAsked) return; fsAsked = true; try { if (ART.fs) ART.fs(); } catch(e){} }
el.addEventListener("click", e => {
  if (e.target.closest("#introSkip")){ askFs(); end(); return; }
  if (e.target.closest("#introGo")){ askFs(); end(true); return; }
  if (e.target.closest("#introSound")){ el.classList.add("tapped"); soundOn(); return; }
  tapped(); next();
});
addEventListener("resize", fit);
window.TFF_INTRO = {on: () => !done, next: () => { tapped(); next(); }, skip: () => end(), go: () => end(true)};
try { go(0); soundState(); setTimeout(soundState, 1200); const s = document.getElementById("introSkip"); if (s) s.focus({preventScroll: true}); } catch(e){ end(); }
setTimeout(() => { if (!done) end(); }, 60000);   // never stuck
})();
