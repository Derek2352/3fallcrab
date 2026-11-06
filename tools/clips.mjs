// Records the short looping clips in How to play (src/clips/) from the real game: it serves public/ locally, plays
// each scene in a headless browser, and films it frame by frame. The browser runs on a fake clock that moves only
// when a frame is taken, and the page's CSS animations are stepped with it, so every clip is smooth and exact
// however slow the machine is. Then ffmpeg makes a small looping MP4 and a still (WebP) for each.
//
//   npm run clips                                   build, then film all the scenes (src/clips/)
//   node tools/clips.mjs steer card                 some of them (public/ must be built)
//   CLIPS_DEBUG=1 node tools/clips.mjs steer        also print what's in play every 0.2 s, to time a scene's cues
//
// Needs Playwright with Chromium (npm i -g playwright && npx playwright install chromium) and ffmpeg. Nothing is
// sent anywhere: the game runs from public/ on 127.0.0.1, and its API calls get a 404.
// Run it again when the game's look changes; then `npm run build` fingerprints the new clips.
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { SCENES } from "./clips-scenes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public"), out = join(root, "src", "clips");
const require = createRequire(import.meta.url);
let chromium;
for (const p of ["playwright", "/opt/node22/lib/node_modules/playwright", "/usr/local/lib/node_modules/playwright", "/usr/lib/node_modules/playwright"]) {
  try { ({ chromium } = require(p)); break; } catch (e) {}
}
if (!chromium) { console.error("Needs Playwright: npm i -g playwright && npx playwright install chromium"); process.exit(1); }
if (!existsSync(join(pub, "index.html"))) { console.error("Run `npm run build` first (the clips are filmed from public/)."); process.exit(1); }

const FPS = 30, STEP = 1000 / FPS, WIDTH = 360;   // clips are 360 px wide: sharp at the 180 px they're shown at
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".png": "image/png",
  ".svg": "image/svg+xml", ".json": "application/json", ".webmanifest": "application/manifest+json", ".mp4": "video/mp4", ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon" };
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.startsWith("/api/")) { res.writeHead(404, { "content-type": "application/json" }); res.end("{}"); return; }
  let f = join(pub, path.endsWith("/") ? path + "index.html" : path);
  if (!f.startsWith(pub) || !existsSync(f) || statSync(f).isDirectory()) f = existsSync(f + ".html") ? f + ".html" : null;
  if (!f) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": TYPES[extname(f)] || "application/octet-stream" }); res.end(readFileSync(f));
});
await new Promise(r => server.listen(0, "127.0.0.1", r));
const BASE = "http://127.0.0.1:" + server.address().port;

// Inside the game's own scope: run(code) evaluates code there (S, spawn, shock, keys...), so a scene can set things up.
const HOOK = "window.__run = function(src){ return eval(src); };\n";
// A tap shown on screen (the browser's pointer isn't filmed), and the CSS animations stepped with the fake clock.
const PAGE = `
window.__tap = (x, y, hold) => { const d = document.createElement("i"); d.className = "__tap"; d.style.left = x + "px"; d.style.top = y + "px";
  if (hold) d.dataset.hold = "1"; document.body.appendChild(d); return d; };
window.__untap = () => document.querySelectorAll(".__tap[data-hold]").forEach(d => { delete d.dataset.hold; d.classList.add("__up"); });
window.__stepAnims = (() => { const t = new WeakMap(); return ms => {
  for (const a of document.getAnimations()){ const v = (t.has(a) ? t.get(a) : 0) + ms; t.set(a, v); a.pause(); a.currentTime = v; }
  for (const d of document.querySelectorAll(".__tap")){ d.__t = (d.__t || 0) + ms; const k = Math.min(1, d.__t / 450);
    if (d.dataset.hold){ d.style.transform = "translate(-50%,-50%) scale(" + (0.6 + 0.4 * Math.min(1, d.__t / 120)) + ")"; d.style.opacity = 0.85; d.__t = Math.min(d.__t, 120); }
    else { d.style.transform = "translate(-50%,-50%) scale(" + (0.7 + 0.8 * k) + ")"; d.style.opacity = String(0.85 * (1 - k)); if (k >= 1) d.remove(); } }
}; })();
addEventListener("DOMContentLoaded", () => { const s = document.createElement("style");
  s.textContent = ".__tap{position:fixed;z-index:9999;width:46px;height:46px;border-radius:50%;pointer-events:none;background:rgba(255,255,255,.55);" +
    "border:3px solid rgba(46,40,56,.75);box-shadow:0 2px 8px rgba(0,0,0,.25);transform:translate(-50%,-50%) scale(.6)}";
  document.head.appendChild(s); });`;

async function film(scene, frames) {
  const ctx = await (await browser()).newContext({ ...scene.vp, bypassCSP: true, reducedMotion: "no-preference" });
  const p = await ctx.newPage(); const errs = [];
  p.on("pageerror", e => errs.push(e.message));
  await p.addInitScript(o => { try {
    localStorage.setItem("tff_fs", o.fs === false ? "false" : "true"); localStorage.setItem("tff_intro", "off");
    localStorage.setItem("tff_who", JSON.stringify(o.who || "jack"));
    sessionStorage.setItem("tff_picked", "1"); if (!o.roll) sessionStorage.setItem("tff_roll_auto", "1");
  } catch (e) {} }, scene);
  await p.addInitScript(PAGE);
  await p.route("**/assets/game.*.js", async r => { const body = await (await r.fetch()).text(); const i = body.lastIndexOf("})();");
    r.fulfill({ status: 200, contentType: "text/javascript", body: body.slice(0, i) + HOOK + body.slice(i) }); });
  // a fake clock, paused: time moves only when a frame is taken (installed alone, it would still run with real time)
  await p.clock.install({ time: new Date("2026-11-02T10:00:00+08:00") }); await p.clock.pauseAt(new Date("2026-11-02T10:00:01+08:00"));
  await p.goto(BASE + "/"); await p.clock.runFor(1200);
  // what a scene can do: run code in the game, press keys, press the on-screen pad, tap a point or an element
  const g = {
    p, run: src => p.evaluate(s => window.__run(s), src),
    wait: async ms => { for (let t = 0; t < ms; t += STEP) { await p.clock.runFor(STEP); await p.evaluate(m => window.__stepAnims(m), STEP); } },
    key: (k, down = true) => down ? p.keyboard.down(k) : p.keyboard.up(k),
    pad: async (act, down = true) => { const r = await p.locator(`#pad [data-act="${act}"]`).boundingBox(); const x = r.x + r.width / 2, y = r.y + r.height / 2;
      if (down) { await p.evaluate(([x, y]) => window.__tap(x, y, true), [x, y]); await p.mouse.move(x, y); await p.mouse.down(); }
      else { await p.mouse.up(); await p.evaluate(() => window.__untap()); } },
    tap: async sel => { const r = await p.locator(sel).first().boundingBox(); const x = r.x + r.width / 2, y = r.y + r.height / 2;
      await p.evaluate(([x, y]) => window.__tap(x, y), [x, y]); await p.mouse.click(x, y); },
  };
  if (scene.setup) await scene.setup(g);
  const dir = mkdtempSync(join(tmpdir(), "clip-" + scene.id + "-"));
  const n = Math.round(scene.secs * FPS), cues = [...(scene.cues || [])].sort((a, b) => a[0] - b[0]);
  let f = 0;
  for (; f < n; f++) {
    const t = f * STEP;
    while (cues.length && cues[0][0] <= t) await cues.shift()[1](g);
    await p.screenshot({ path: join(dir, String(f).padStart(4, "0") + ".jpg"), type: "jpeg", quality: 95, clip: scene.crop });
    if (process.env.CLIPS_DEBUG && f % 6 === 0) console.log("   ", Math.round(t), await g.run(`JSON.stringify({play: Math.round(S.play), a: S.active && S.active.tff.def.id, x: S.active && Math.round(S.active.position.x), y: S.active && Math.round(S.active.position.y), drops: S.drops, mode: S.mode, best: +(S.best / FLOOR).toFixed(2)})`));
    await p.clock.runFor(STEP); await p.evaluate(m => window.__stepAnims(m), STEP);
  }
  await ctx.close();
  if (errs.length) console.warn(`  ${scene.id}: page errors: ${errs.join(" | ")}`);
  return dir;
}

let _b = null;
const browser = async () => _b || (_b = await chromium.launch());
const pick = process.argv.slice(2), todo = pick.length ? SCENES.filter(s => pick.includes(s.id)) : SCENES;
if (pick.length && todo.length !== pick.length) { console.error("Scenes: " + SCENES.map(s => s.id).join(", ")); process.exit(1); }
mkdirSync(out, { recursive: true });
for (const s of todo) {
  const t0 = Date.now(), dir = await film(s);
  const mp4 = join(out, s.id + ".mp4"), webp = join(out, s.id + ".webp"), dur = s.secs, fade = 0.25;
  // a quick fade from and to the page's cream at the ends, so the loop's jump back to the start is soft
  const vf = `scale=${WIDTH}:-2:flags=lanczos,fade=t=in:st=0:d=${fade}:color=0xFFF4E2,fade=t=out:st=${(dur - fade).toFixed(2)}:d=${fade}:color=0xFFF4E2,format=yuv420p`;
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", join(dir, "%04d.jpg"), "-vf", vf,
    "-c:v", "libx264", "-preset", "slow", "-crf", String(s.crf || 30), "-profile:v", "main", "-movflags", "+faststart", "-an", mp4]);
  const still = Math.min(Math.round((s.still ?? dur / 2) * FPS), Math.round(dur * FPS) - 1);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", join(dir, String(still).padStart(4, "0") + ".jpg"),
    "-vf", `scale=${WIDTH}:-2:flags=lanczos`, "-c:v", "libwebp", "-quality", "72", webp]);
  rmSync(dir, { recursive: true, force: true });
  console.log(`  ${s.id}: ${(statSync(mp4).size / 1024).toFixed(0)} KB video, ${(statSync(webp).size / 1024).toFixed(0)} KB still, ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}
if (_b) await _b.close();
server.close();
