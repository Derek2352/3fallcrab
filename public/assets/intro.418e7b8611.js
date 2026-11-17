(function () {
"use strict";
const el = document.getElementById("intro");
if (!el) return;
const ART = window.TFF_ART || {}, GA = window.GameAudio;
const forceOn = /[?&]intro=1\b/.test(location.search);
let off = !forceOn && /[?&](?:intro=0|booth=1)\b/.test(location.search);
try {
if (!forceOn && (localStorage.getItem("tff_intro") === "off" || sessionStorage.getItem("tff_intro_seen") === "1" || sessionStorage.getItem("tff_booth") === "1")) off = true;
} catch (e) { }
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const behind = [...document.body.children].filter(n => n !== el && n.tagName !== "SCRIPT");
let was = behind.map(n => n.inert);
const scr = document.getElementById("fScreen"), flashEl = el.querySelector(".fflash"), bar = document.getElementById("fBar");
const beats = [...el.querySelectorAll(".fbeat")].sort((a, b) => a.dataset.step - b.dataset.step);
const shots = {}; el.querySelectorAll(".fshot").forEach(s => { shots[s.dataset.shot] = s; });
const linesOf = n => [...beats[n].querySelectorAll(".fsub")];
const lineMs = x => { const t = x.textContent || ""; let n = 0; for (const ch of t) { const c = ch.codePointAt(0); if (c >= 0x4e00 && c <= 0x9fff) n++; } return Math.max(3600, Math.min(5000, Math.round(n * 130))); };
const holdsOf = n => { const L = linesOf(n); return L.length ? L.map(lineMs) : [(+beats[n].dataset.hold || 3000)]; };
const holdOf = n => holdsOf(n).reduce((a, b) => a + b, 0);
const TOTAL = beats.reduce((t, b, n) => t + holdOf(n), 0);
const ready = {};
Object.entries(shots).forEach(([k, s]) => {
const img = s.querySelector("img");
const ok = () => { ready[k] = true; img.classList.add("ok"); };
if (img.complete && img.naturalWidth) ok(); else img.addEventListener("load", ok);
img.addEventListener("error", () => { img.remove(); });
});
let restLoaded = false;
function loadRest() {
if (restLoaded) return; restLoaded = true;
(async () => {
for (const s of Object.values(shots)) {
const img = s.querySelector("img"); if (!img || !img.dataset.src) continue;
img.src = img.dataset.src; delete img.dataset.src;
await new Promise(r => { if (img.complete) r(); else { img.addEventListener("load", r, { once: true }); img.addEventListener("error", r, { once: true }); setTimeout(r, 4000); } });
}
})();
}
function fit() {
const W = innerWidth, H = innerHeight, port = W / H < 0.9;
const resT = port ? Math.min(64, H * 0.08) : 0, resB = port ? Math.min(230, H * 0.3) : 0;
const ar = Math.max(0.8, Math.min(1.85, W / (H - resT - resB)));
let w = Math.min(W, (H - resT - resB) * ar), h = w / ar;
el.style.setProperty("--fw", Math.floor(w) + "px"); el.style.setProperty("--fh", Math.floor(h) + "px");
el.style.setProperty("--fpad-t", resT + "px"); el.style.setProperty("--fpad-b", resB + "px");
el.classList.toggle("port", port);
}
fit();
const film = GA && GA.film;
let cued = -1;
const soundBtn = document.getElementById("introSound");
function soundState() { const live = !!(GA && film && film.live()); soundBtn.hidden = live || done; return live; }
function cue(n) { if (!film || cued === n) return; if (film.cue(beats[n].dataset.cue || cueName(n), { via: beats[n].dataset.via })) cued = n; }
const cueName = n => beats[n].dataset.shot ? (n === 8 ? "hook" : beats[n].dataset.shot) : "open";
function soundOn() {
if (ART.sound) ART.sound(); else if (GA) GA.unlock();
if (GA && GA.isMuted && GA.isMuted()) GA.setMuted(false);
setTimeout(() => { cue(i); soundState(); }, 60);
}
let i = -1, timer = 0, done = false, shown = null, safetyTimer = 0;
function cut(n) {
const b = beats[n], via = b.dataset.via, k = b.dataset.shot, hold = holdOf(n);
beats.forEach((x, j) => x.classList.toggle("on", j === n));
scr.classList.toggle("hook", via === "hook");
if (k && shots[k] !== shown) {
const prev = shown, next = shots[k];
Object.values(shots).forEach(s => { if (s !== prev && s !== next) s.className = "fshot"; });
if (prev) { prev.className = "fshot off via-" + via; }
next.style.setProperty("--dur", (hold + (k === "title" ? +beats[8].dataset.hold : 0) + 1600) + "ms");
if (via === "white" && !reduce) {
flashEl.className = "fflash"; void flashEl.offsetWidth; flashEl.className = "fflash white";
setTimeout(() => { if (shown === next) { next.className = "fshot on via-cut"; if (prev) prev.className = "fshot"; } }, 520);
} else {
void next.offsetWidth; next.className = "fshot on via-" + via;
if (via === "flash" && !reduce) { flashEl.className = "fflash"; void flashEl.offsetWidth; flashEl.className = "fflash flash"; }
setTimeout(() => { if (shown === next && prev && prev !== next) prev.className = "fshot"; }, 1200);
}
shown = next;
}
bar.style.width = (100 * beats.slice(0, n + 1).reduce((t, x, j) => t + holdOf(j), 0) / TOTAL) + "%";
cue(n);
}
let line = 0, lineTimer = 0;
function showLine(k) { line = k; linesOf(i).forEach((x, j) => x.classList.toggle("now", j === k)); }
function go(n) {
i = n; cut(n);
clearTimeout(timer); clearTimeout(lineTimer);
const H = holdsOf(n), L = H.length;
let hold = H.reduce((a, b) => a + b, 0);
if (n === 0 && !ready.campus) hold += 1500;
showLine(0);
let at = 0;
for (let k = 1; k < L; k++) { at += H[k - 1]; lineTimer = setTimeout(() => { if (i === n) showLine(k); }, at); }
timer = setTimeout(next, hold);
}
function next() {
if (done) return;
const L = linesOf(i).length;
if (line < L - 1) {
clearTimeout(timer); clearTimeout(lineTimer); showLine(line + 1);
timer = setTimeout(next, holdsOf(i)[line] || 3600); return;
}
if (i < beats.length - 1) go(i + 1); else end();
}
function end(play) {
if (done) return; done = true; clearTimeout(timer); clearTimeout(lineTimer); clearTimeout(safetyTimer);
try { sessionStorage.setItem("tff_intro_seen", "1"); } catch (e) { }
window.removeEventListener("keydown", onKey, true); removeEventListener("resize", fit);
behind.forEach((n, k) => { n.inert = was[k]; });
if (film) film.stop(play ? 0.25 : 0.8);
if (ART.music) ART.music();
el.classList.add("out");
setTimeout(() => { if (done) el.hidden = true; }, reduce ? 0 : 600);
const start = document.getElementById("startBtn");
if (play && start) { start.click(); return; }
if (start && start.offsetParent) start.focus({ preventScroll: true });
}
function onKey(e) {
if (done) return;
const k = e.key;
if (k === "Escape") { end(); }
else if (k === "Enter" || k === " " || k === "ArrowRight") { if (e.target && e.target.closest && e.target.closest("button")) return; tapped(); next(); }
else return;
e.preventDefault(); e.stopImmediatePropagation();
}
function tapped() { el.classList.add("tapped"); askFs(); setTimeout(() => { if (cued !== i) cue(i); soundState(); }, 80); }
let fsAsked = false;
function askFs() { if (fsAsked) return; fsAsked = true; try { if (ART.fs) ART.fs(); } catch (e) { } }
el.addEventListener("click", e => {
if (e.target.closest("#introSkip")) { askFs(); end(); return; }
if (e.target.closest("#introGo")) { askFs(); end(true); return; }
if (e.target.closest("#introSound")) { el.classList.add("tapped"); soundOn(); return; }
tapped(); next();
});
function startFilm(isReplay) {
done = false; i = -1; line = 0; cued = -1; shown = null;
was = behind.map(n => n.inert);
behind.forEach(n => { n.inert = true; });
Object.values(shots).forEach(s => { s.className = "fshot"; });
el.hidden = false; el.classList.remove("out");
fit(); addEventListener("resize", fit);
window.addEventListener("keydown", onKey, true);
loadRest();
if (isReplay) { if (GA && GA.music) GA.music.stop(); soundOn(); }
try { go(0); soundState(); setTimeout(soundState, 1200); const s = document.getElementById("introSkip"); if (s) s.focus({ preventScroll: true }); } catch (e) { end(); }
clearTimeout(safetyTimer);
safetyTimer = setTimeout(() => { if (!done) end(); }, TOTAL + 30000);
}
window.TFF_INTRO = { on: () => !done, next: () => { tapped(); next(); }, skip: () => end(), go: () => end(true), replay: () => startFilm(true) };
if (off) { el.hidden = true; done = true; }
else startFilm(false);
})();
