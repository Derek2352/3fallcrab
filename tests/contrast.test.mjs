// WCAG 2.1 AA contrast audit across sky gradients (SKY[0..2]), intro film, CSS/admin tokens, and live Chromium DOM.
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./e2e/cdp.mjs";
import { startE2EServer } from "./e2e/server.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const cssText = readFileSync(join(root, "src/style.css"), "utf8");
const indexHtml = readFileSync(join(root, "src/index.html"), "utf8");
const renderText = readFileSync(join(root, "src/game/05-render.js"), "utf8");
const eventsText = readFileSync(join(root, "src/game/03-events.js"), "utf8");
const adminHtml = readFileSync(join(root, "src/static/admin.html"), "utf8");
const adminJs = readFileSync(join(root, "src/static/admin.js"), "utf8");

// ---------- WCAG 2.1 sRGB color math ----------
function parseColor(str) {
  const s = str.trim();
  if (s === "transparent") return { r: 0, g: 0, b: 0, a: 0 };
  if (s.startsWith("#")) {
    let h = s.slice(1);
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }
  const m = /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+%?))?\s*\)/i.exec(s);
  if (!m) throw new Error("Unsupported color: " + str);
  let a = 1;
  if (m[4] !== undefined) a = m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a };
}

function mixRgb(a, b, t) {
  return {
    r: a.r * (1 - t) + b.r * t,
    g: a.g * (1 - t) + b.g * t,
    b: a.b * (1 - t) + b.b * t,
    a: 1,
  };
}

function compositeOver(fg, bg) {
  const a = fg.a;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

function luminance(c) {
  const ch = (v) => {
    const x = v / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
}

function contrastRatio(fg, bg) {
  const f = fg.a < 1 ? compositeOver(fg, bg) : fg;
  const l1 = luminance(f), l2 = luminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function parseRootVars(src) {
  const vars = {};
  const clean = src.replace(/\/\*[\s\S]*?\*\//g, "");
  for (const m of clean.matchAll(/:root\s*\{([^}]+)\}/g)) {
    for (const decl of m[1].split(";")) {
      const idx = decl.indexOf(":");
      if (idx < 0) continue;
      const k = decl.slice(0, idx).trim();
      const v = decl.slice(idx + 1).trim();
      if (k.startsWith("--")) vars[k] = v;
    }
  }
  return vars;
}

const cssVars = parseRootVars(cssText);
const adminVars = parseRootVars(adminHtml);
const resolveVar = (val, vars = cssVars) => {
  let out = val.trim();
  for (let i = 0; i < 4; i++) {
    const m = /^var\(\s*(--[^,)\s]+)\s*\)$/.exec(out);
    if (!m || !(m[1] in vars)) break;
    out = vars[m[1]].trim();
  }
  return parseColor(out);
};

// ---------- Part A: SKY[0..2] stops, dusk blends, HUD, and canvas overlays ----------
test("Part A: SKY[0..2] stops and dusk blends meet WCAG AA for HUD and canvas ruler pills", () => {
  const skyMatch = /const SKY\s*=\s*(\[\[[\s\S]*?\]\]);/.exec(renderText);
  assert.ok(skyMatch, "Could not locate SKY constant in src/game/05-render.js");
  const SKY = JSON.parse(skyMatch[1].replace(/\/\/[^\n]*/g, ""));
  assert.equal(SKY.length, 3);

  const hudMobMatch = /html\.fs:not\(\.title\)\s*\.hud\s*\{[^}]*background\s*:\s*([^;]+)/.exec(cssText);
  assert.ok(hudMobMatch, "Missing mobile html.fs:not(.title) .hud rule");
  const hudMobBg = parseColor(hudMobMatch[1]);

  const hudWideMatch = /html\.fs\.wide\s*\.hud\s*\{[^}]*background\s*:\s*([^;]+)/.exec(cssText);
  assert.ok(hudWideMatch, "Missing wide .hud rule");
  const hudWideBg = parseColor(hudWideMatch[1]);

  const padMatch = /html\.fs:not\(\.title\)\s*\.pad button:not\(\.drop\)\s*\{[^}]*background\s*:\s*([^;]+)/.exec(cssText);
  assert.ok(padMatch, "Missing html.fs:not(.title) .pad button:not(.drop) rule");
  const padBg = parseColor(padMatch[1]);

  const mastMatch = /html\.fs:not\(\.title\)\s*\.mast \.iconbtn\s*\{[^}]*background\s*:\s*([^;]+)/.exec(cssText);
  assert.ok(mastMatch, "Missing html.fs:not(.title) .mast .iconbtn rule");
  const mastBg = parseColor(mastMatch[1]);

  const muteBtnSvg = /id="muteBtn"[\s\S]*?<\/button>/.exec(indexHtml)?.[0] || "";
  const muteWaveHex = /class="w"[^>]*stroke="(#[0-9a-fA-F]+)"/.exec(muteBtnSvg)?.[1];
  const muteXHex = /class="x"[^>]*stroke="(#[0-9a-fA-F]+)"/.exec(muteBtnSvg)?.[1];
  assert.ok(muteWaveHex && muteXHex, "Missing #muteBtn SVG stroke colors in src/index.html");
  const pausePlayHex = /id="pauseBtn"[\s\S]*?class="pl"[^>]*fill="(#[0-9a-fA-F]+)"/.exec(indexHtml)?.[1];
  assert.ok(pausePlayHex, "Missing #pauseBtn .pl fill color in src/index.html");

  const rulerMatch = /c\.fillStyle\s*=\s*st\s*\?\s*"#FFE45C"\s*:\s*skyDusk\s*>=\s*\.5\s*\?\s*"([^"]+)"\s*:\s*"([^"]+)"/.exec(renderText);
  assert.ok(rulerMatch, "Missing drawRuler pill fillStyle in src/game/05-render.js");
  const rulerDuskBg = parseColor(rulerMatch[1]);
  const rulerDayBg = parseColor(rulerMatch[2]);

  const popTagMatch = /\/\/ the ×1\.5 tag[\s\S]*?c\.fillStyle\s*=\s*"([^"]+)";\s*roundRect\([^)]*\);\s*c\.fill\(\);\s*c\.fillStyle\s*=\s*"([^"]+)";\s*c\.fillText\(tag/.exec(eventsText);
  assert.ok(popTagMatch, "Missing drawPops ×1.5 tag colors in src/game/03-events.js");
  const popTagBg = parseColor(popTagMatch[1]);
  const popTagFg = parseColor(popTagMatch[2]);

  const ghostMatch = /function drawGhost[\s\S]*?c\.globalAlpha\s*=\s*([\d.]+)\s*\*\s*a;\s*c\.fillStyle\s*=\s*"([^"]+)";\s*roundRect\([^)]*\);\s*c\.fill\(\);\s*c\.globalAlpha\s*=\s*a;\s*c\.fillStyle\s*=\s*"([^"]+)";\s*c\.fillText\(t/.exec(eventsText);
  assert.ok(ghostMatch, "Missing drawGhost label colors in src/game/03-events.js");
  const ghostBg = parseColor(ghostMatch[2]);
  ghostBg.a = Number(ghostMatch[1]);
  const ghostFg = parseColor(ghostMatch[3]);

  const ink = resolveVar("var(--ink)");
  const ink2 = resolveVar("var(--ink-2)");
  const greenT = resolveVar("var(--green-t)");
  const redD = resolveVar("var(--red-d)");
  const jp = resolveVar("var(--jp)");
  const white = parseColor("#FFFFFF");
  const muteWave = parseColor(muteWaveHex);
  const muteX = parseColor(muteXHex);
  const pausePlay = parseColor(pausePlayHex);

  for (const dusk of [0, 0.25, 0.5, 0.75, 1.0]) {
    const seg = dusk < 0.5 ? 0 : 1;
    const t = seg ? dusk * 2 - 1 : dusk * 2;
    for (let i = 0; i < 3; i++) {
      const skyColor = mixRgb(parseColor(SKY[seg][i]), parseColor(SKY[seg + 1][i]), t);

      for (const [hudLabel, hudAlphaBg] of [["mobile .hud", hudMobBg], ["wide .hud", hudWideBg]]) {
        const compHud = compositeOver(hudAlphaBg, skyColor);
        for (const [fgName, fg] of [["--ink", ink], ["--ink-2", ink2], ["--green-t", greenT], ["--red-d", redD], ["--jp", jp]]) {
          const r = contrastRatio(fg, compHud);
          assert.ok(r >= 4.5, `${hudLabel} ${fgName} at dusk=${dusk} stop=${i}: ${r.toFixed(2)} < 4.5`);
        }
      }

      const compPad = compositeOver(padBg, skyColor);
      for (const [fgName, fg] of [["--ink", ink], ["--ink-2", ink2]]) {
        const r = contrastRatio(fg, compPad);
        assert.ok(r >= 4.5, `.pad button:not(.drop) ${fgName} at dusk=${dusk} stop=${i}: ${r.toFixed(2)} < 4.5`);
      }

      const compMast = compositeOver(mastBg, skyColor);
      assert.ok(contrastRatio(ink, compMast) >= 4.5, `.mast .iconbtn --ink at dusk=${dusk} stop=${i} < 4.5`);
      for (const [sName, sCol] of [["muteWave", muteWave], ["muteX", muteX], ["pausePlay", pausePlay]]) {
        const r = contrastRatio(sCol, compMast);
        assert.ok(r >= 3.0, `.mast .iconbtn ${sName} at dusk=${dusk} stop=${i}: ${r.toFixed(2)} < 3.0`);
      }

      const rulerBg = dusk >= 0.5 ? rulerDuskBg : rulerDayBg;
      const compRuler = compositeOver(rulerBg, skyColor);
      const rRuler = contrastRatio(white, compRuler);
      assert.ok(rRuler >= 4.5, `Ruler pill #fff at dusk=${dusk} stop=${i}: ${rRuler.toFixed(2)} < 4.5`);

      const compPopTag = compositeOver(popTagBg, skyColor);
      const rPopTag = contrastRatio(popTagFg, compPopTag);
      assert.ok(rPopTag >= 4.5, `drawPops ×1.5 tag (${popTagMatch[2]} on ${popTagMatch[1]}) at dusk=${dusk} stop=${i}: ${rPopTag.toFixed(2)} < 4.5`);

      const compGhost = compositeOver(ghostBg, skyColor);
      const rGhost = contrastRatio(ghostFg, compGhost);
      assert.ok(rGhost >= 4.5, `drawGhost label (${ghostMatch[3]} on ${ghostMatch[2]} @ ${ghostMatch[1]}) at dusk=${dusk} stop=${i}: ${rGhost.toFixed(2)} < 4.5`);
    }
  }

  // Night-sky worst-case stops (#12183C, #1E2761, #3D3B8E) for fullscreen .pad and .mast .iconbtn
  for (const nightHex of ["#12183C", "#1E2761", "#3D3B8E"]) {
    const nightBg = parseColor(nightHex);
    const compPad = compositeOver(padBg, nightBg);
    for (const [fgName, fg] of [["--ink", ink], ["--ink-2", ink2]]) {
      const r = contrastRatio(fg, compPad);
      assert.ok(r >= 4.5, `.pad button:not(.drop) ${fgName} over ${nightHex}: ${r.toFixed(2)} < 4.5`);
    }
    const compMast = compositeOver(mastBg, nightBg);
    assert.ok(contrastRatio(ink, compMast) >= 4.5, `.mast .iconbtn --ink over ${nightHex} < 4.5`);
    for (const [sName, sCol] of [["muteWave", muteWave], ["muteX", muteX], ["pausePlay", pausePlay]]) {
      const r = contrastRatio(sCol, compMast);
      assert.ok(r >= 3.0, `.mast .iconbtn ${sName} over ${nightHex}: ${r.toFixed(2)} < 3.0`);
    }
  }

  // Stage label & milestone pill
  const stageBg = compositeOver(parseColor("rgba(37,49,122,0.92)"), parseColor(SKY[0][2]));
  assert.ok(contrastRatio(parseColor("#FFE45C"), stageBg) >= 4.5);
  assert.ok(contrastRatio(parseColor("#25317A"), parseColor("#FFE45C")) >= 4.5);
});

// ---------- Part B: Intro film gradients & overlays ----------
test("Part B: Intro film shot gradients and overlays meet WCAG AA", () => {
  const shots = {};
  for (const m of cssText.matchAll(/\.fshot\[data-shot="([^"]+)"\]\{[^}]*--bg:\s*linear-gradient\(([^)]+)\)/g)) {
    shots[m[1]] = m[2].split(",").map((p) => parseColor(p.trim().split(/\s+/)[0]));
  }
  assert.deepEqual(Object.keys(shots).sort(), ["campus", "delay", "pay", "scam", "spend", "title", "tower"]);

  const fslugRule = /\.fslug\{([^}]+)\}/.exec(cssText);
  assert.ok(fslugRule, "Missing .fslug rule");
  const fslugBgM = /background\s*:\s*([^;]+)/.exec(fslugRule[1]);
  assert.ok(fslugBgM, ".fslug needs opaque/scrim background over light shots");
  const fslugBg = parseColor(fslugBgM[1]);

  const fchapRule = /\.fchap\{([^}]+)\}/.exec(cssText);
  assert.ok(fchapRule);
  const fchapBg = parseColor(/background\s*:\s*([^;]+)/.exec(fchapRule[1])[1]);

  const fframeBefore = /\.fframe::before\{[^}]*linear-gradient\(transparent,\s*(rgba?\([^)]+\)|#[0-9a-fA-F]+)\)/.exec(cssText);
  assert.ok(fframeBefore);
  const bottomScrim = parseColor(fframeBefore[1]);

  const mhintRule = /\.intro \.mhint\{[^}]*color\s*:\s*([^;]+)/.exec(cssText);
  assert.ok(mhintRule);
  const mhintColor = parseColor(mhintRule[1]);

  const white = parseColor("#FFFFFF");
  for (const [name, stops] of Object.entries(shots)) {
    for (const stop of stops) {
      assert.ok(contrastRatio(white, compositeOver(fslugBg, stop)) >= 4.5, `.fslug on ${name} < 4.5`);
      for (const [fcName, fcHex] of [["f1", "#FF7B35"], ["f2", "#A88BFF"], ["f3", "#5BB2FF"]]) {
        assert.ok(contrastRatio(parseColor(fcHex), compositeOver(fchapBg, stop)) >= 4.5, `.fchap.${fcName} on ${name} < 4.5`);
      }
      const scrimStop = compositeOver(bottomScrim, stop);
      assert.ok(contrastRatio(white, scrimStop) >= 4.5, `.fsub on ${name} < 4.5`);
      assert.ok(contrastRatio(mhintColor, scrimStop) >= 4.5, `.mhint on ${name} < 4.5`);
    }
  }
  // Portrait mode & controls
  assert.ok(contrastRatio(mhintColor, parseColor("#09080C")) >= 4.5);
  assert.ok(contrastRatio(white, parseColor("rgba(10,8,14,.55)")) >= 4.5);
  assert.ok(contrastRatio(parseColor("#25317A"), parseColor("#FFFFFF")) >= 3.0, ".mlogo .zh stroke AA large");
});

// ---------- Part C: Static token & component contrast checks ----------
test("Part C: Static CSS and /admin tokens meet WCAG AA thresholds", () => {
  const cream = resolveVar("var(--cream)");
  const ink = resolveVar("var(--ink)");
  const ink2 = resolveVar("var(--ink-2)");
  const white = parseColor("#FFFFFF");

  const checks = [
    ["--jp on --cream", resolveVar("var(--jp)"), cream, 4.5],
    ["--pink-t on --cream", resolveVar("var(--pink-t)"), cream, 4.5],
    [".lb 1st rank on --cream", parseColor("#B8420A"), cream, 4.5],
    [".lb 2nd rank on --cream", parseColor("#1C66B0"), cream, 4.5],
    [".lb li.me .s on #FFF0A8", resolveVar("var(--good)"), parseColor("#FFF0A8"), 4.5],
    [".steps li.done::before #fff on #11837B", white, parseColor("#11837B"), 4.5],
    [".btn.teal:disabled #fff on #0F766E", white, parseColor("#0F766E"), 4.5],
    [".jpban b #8C1D18 on #FFD23F", parseColor("#8C1D18"), parseColor("#FFD23F"), 4.5],
    [".jpban .zh #890C47 on #F5A623", parseColor("#890C47"), parseColor("#F5A623"), 4.5],
    [".jpban em #134E24 on #F5A623", parseColor("#134E24"), parseColor("#F5A623"), 4.5],
    [".frenzy b #fff on #C35117", white, parseColor("#C35117"), 4.5],
    [".frenzy span small #8E0D4A on #FFC21F", parseColor("#8E0D4A"), parseColor("#FFC21F"), 4.5],
    [".igbtn start #fff on #C7490A", white, parseColor("#C7490A"), 4.5],
    [".igbtn mid #fff on #C91E6A", white, parseColor("#C91E6A"), 4.5],
    [".igbtn end #fff on #7A2EA8", white, parseColor("#7A2EA8"), 4.5],
    [".who[aria-checked=true] b on #FFC6DD", resolveVar("var(--hot-d)"), parseColor("#FFC6DD"), 4.5],
    [".qopt.is-dim text", parseColor("#473E54"), parseColor("#F6F1E8"), 4.5],
    [".wt-chip.locked text", ink2, parseColor("#EDE3D2"), 4.5],
    [".habit input border on #fff", parseColor("#9A8B7A"), white, 3.0],
    [".pbs .v.urgent #FFE45C on .36 scrim over --red", parseColor("#FFE45C"), compositeOver(parseColor("rgba(0,0,0,.36)"), resolveVar("var(--red)")), 4.5],
    [".chal-t b var(--green-t) on #FFF8EC", resolveVar("var(--green-t)"), parseColor("#FFF8EC"), 4.5],
    [".chal-t b var(--green-t) on fs.title .chal over SKY[2][0]", resolveVar("var(--green-t)"), compositeOver(parseColor("rgba(255,248,236,.96)"), parseColor("#8C6FE0")), 4.5],
    [".avfx.rich .avfx-t #fff on var(--green-t)", white, resolveVar("var(--green-t)"), 4.5],
    ["admin :focus-visible on --yellow", resolveVar("var(--ink)", adminVars), resolveVar("var(--yellow)", adminVars), 3.0],
    ["admin .meter i on --track", parseColor("#11837B"), resolveVar("var(--track)", adminVars), 3.0],
    ["admin .meter.ok i on --track", parseColor("#247D3E"), resolveVar("var(--track)", adminVars), 3.0],
    ["admin .meter.dim i on --track", parseColor("#6F647B"), resolveVar("var(--track)", adminVars), 3.0],
    ["admin .meter.pink i on --track", resolveVar("var(--pink)", adminVars), resolveVar("var(--track)", adminVars), 3.0],
  ];

  for (const [label, fg, bg, minRatio] of checks) {
    const r = contrastRatio(fg, bg);
    assert.ok(r >= minRatio, `${label}: ${r.toFixed(2)} < ${minRatio}`);
  }

  // Verify actual CSS/HTML/JS values in source match expectations
  assert.match(cssText, /\.pbs \.v\.urgent\{color:#FFE45C;background:rgba\(0,0,0,\.36\)/);
  assert.match(cssText, /\.btn\.teal:disabled,\s*\.btn\.teal\[aria-disabled="true"\]\{opacity:1;background:#0F766E/);
  assert.match(cssText, /\.qopt\.is-dim\{background:#F6F1E8;color:#473E54\}/);
  assert.match(cssText, /\.wt-chip\.locked\{background:#EDE3D2;color:var\(--ink-2\)\}/);
  assert.match(cssText, /\.chal-t b\{[^}]*color:var\(--green-t\)/);
  assert.match(cssText, /\.avfx\.rich \.avfx-t\{background:var\(--green-t\)\}/);
  assert.match(cssText, /0 0 0 2px #9A8B7A/);
  assert.match(adminHtml, /\.meter i\{[^}]*background:#11837B/);
  assert.match(adminHtml, /\.meter\.ok i\{background:#247D3E\}/);
  assert.match(adminHtml, /\.meter\.dim i\{background:#6F647B\}/);
  assert.match(adminHtml, /:focus-visible\{outline:3px solid var\(--ink\)/);

  const svgBarMatch = /s\("rect",\s*\{[^}]*fill:\s*"([^"]+)",\s*opacity:\s*([\d.]+)/.exec(adminJs);
  assert.ok(svgBarMatch, "Missing SVG bar rect in admin.js");
  const svgBarColor = parseColor(svgBarMatch[1]);
  svgBarColor.a = Number(svgBarMatch[2]);
  const barRatio = contrastRatio(svgBarColor, white);
  assert.ok(barRatio >= 3.0, `admin.js SVG bar vs #fff: ${barRatio.toFixed(2)} < 3.0`);
  assert.match(adminJs, /stroke:\s*"#fff",\s*"stroke-width":\s*5/, "Missing white halo under #E8418B polyline");
});

// ---------- Part D: Live headless Chromium computed-style contrast audit ----------
const DOM_CONTRAST_SCRIPT = `(() => {
  const parse = (s) => {
    const m = /rgba?\\(\\s*([\\d.]+)\\s*,\\s*([\\d.]+)\\s*,\\s*([\\d.]+)(?:\\s*,\\s*([\\d.]+))?\\s*\\)/i.exec(s || "");
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
  };
  const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  const lum = (c) => {
    const ch = (v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); };
    return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
  };
  const ratio = (a, b) => {
    const la = lum(a), lb = lum(b);
    return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  };
  const resolveBg = (el) => {
    const layers = [];
    let cur = el;
    while (cur && cur.nodeType === 1) {
      const bg = parse(getComputedStyle(cur).backgroundColor);
      if (bg && bg.a > 0) {
        layers.push(bg);
        if (bg.a >= 0.999) break;
      }
      cur = cur.parentElement;
    }
    let acc = { r: 255, g: 244, b: 226, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) acc = over(layers[i], acc);
    return acc;
  };
  const fails = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!node.nodeValue || !node.nodeValue.trim()) continue;
    const el = node.parentElement;
    if (!el || el.closest("[hidden], [aria-hidden='true'], .sr, script, style, noscript")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) continue;
    if (el.closest(".word, .mword, .mlogo, .ts-zh, .sh-amt, .fslug, .fchap, .fsub, .mskip, .fsound, .fpresents, .fhook, .ig-badge, .igbtn, .jpban, .frenzy")) continue;
    if (el.disabled || el.closest(":disabled")) continue;
    const fg = parse(cs.color);
    if (!fg || fg.a === 0) continue;
    const bg = resolveBg(el);
    const candidates = [bg];
    const hudEl = el.closest("html.fs:not(.title) .hud");
    const padBtn = el.closest("html.fs:not(.title) .pad button");
    const mastBtn = el.closest("html.fs:not(.title) .mast .iconbtn");
    const chalBox = el.closest("html.fs.title .chal");
    if (hudEl) {
      const hb = parse(getComputedStyle(hudEl).backgroundColor);
      if (hb && hb.a < 1) candidates.push(over(hb, { r: 140, g: 111, b: 224, a: 1 }));
    }
    if (padBtn || mastBtn) {
      const pb = parse(getComputedStyle(padBtn || mastBtn).backgroundColor);
      if (pb && pb.a < 1) {
        candidates.push(over(pb, { r: 140, g: 111, b: 224, a: 1 }));
        candidates.push(over(pb, { r: 18, g: 24, b: 60, a: 1 }));
      }
    }
    if (chalBox) {
      const cb = parse(getComputedStyle(chalBox).backgroundColor);
      if (cb && cb.a < 1) candidates.push(over(cb, { r: 140, g: 111, b: 224, a: 1 }));
    }
    const fs = parseFloat(cs.fontSize) || 14;
    const fw = parseInt(cs.fontWeight, 10) || 400;
    const large = fs >= 24 || (fs >= 18.67 && fw >= 700);
    const min = large ? 3.0 : 4.5;
    for (const candBg of candidates) {
      const r = ratio(fg.a < 1 ? over(fg, candBg) : fg, candBg);
      if (r < min) {
        fails.push({ text: node.nodeValue.trim().slice(0, 30), tag: el.tagName, cls: el.className, r: +r.toFixed(2), min });
        break;
      }
    }
  }
  return fails;
})()`;

let browser, srv;
before(async () => {
  srv = await startE2EServer();
  browser = await launchBrowser();
});
after(async () => {
  await browser?.close();
  await srv?.close();
});

test("Part D: Live headless Chromium computed-style contrast on / (mobile & desktop) and /admin.html", async () => {
  // 1) Mobile 390x844: intro + fullscreen gameplay HUD
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true } });
    try {
      await ctx.goto(`${srv.baseUrl}/?intro=1&roll=0`);
      await ctx.waitFor(() => !document.getElementById("intro").hidden);
      const introAmb = await ctx.evalJs(`(() => {
        const intro = document.getElementById("intro");
        const amb = document.getElementById("fAmb");
        const frame = document.querySelector(".fframe");
        const r = amb ? amb.getBoundingClientRect() : { width: 0, height: 0 };
        return {
          hasPort: intro.classList.contains("port"),
          hasAmb: !!amb,
          w: r.width,
          h: r.height,
          frameBg: frame ? getComputedStyle(frame).backgroundColor : "",
        };
      })()`);
      assert.equal(introAmb.hasPort, true);
      assert.equal(introAmb.hasAmb, true);
      assert.ok(introAmb.w >= 390 && introAmb.h >= 844, `Expected #fAmb to cover 390x844 viewport, got ${introAmb.w}x${introAmb.h}`);
      assert.equal(introAmb.frameBg, "rgba(0, 0, 0, 0)");
      await ctx.click("#introSkip");
      await ctx.waitFor(() => document.getElementById("startOv").hidden === false);
      await ctx.click("#startBtn");
      await ctx.waitFor(() => !document.getElementById("pickModal").hidden);
      await ctx.click("#pickGo");
      await ctx.waitFor(() => document.getElementById("startOv").hidden && document.getElementById("pickModal").hidden);

      const mobFails = await ctx.evalJs(DOM_CONTRAST_SCRIPT);
      assert.deepEqual(mobFails, [], "Mobile gameplay contrast failures: " + JSON.stringify(mobFails));

      const hudAlpha = await ctx.evalJs("getComputedStyle(document.querySelector('.hud')).backgroundColor");
      assert.match(hudAlpha, /0\.94/);
      const padAlpha = await ctx.evalJs("getComputedStyle(document.querySelector('.pad button:not(.drop)')).backgroundColor");
      assert.match(padAlpha, /0\.94/);
      const mastAlpha = await ctx.evalJs("getComputedStyle(document.querySelector('.mast .iconbtn')).backgroundColor");
      assert.match(mastAlpha, /0\.94/);

      await ctx.click("#fsBtn");
      await ctx.waitFor(() => !document.getElementById("fsModal").hidden);
      assert.deepEqual(await ctx.evalJs(DOM_CONTRAST_SCRIPT), [], "Mobile #fsModal contrast failures");
      await ctx.click("#fsModalGo");
      await ctx.waitFor(() => document.getElementById("fsModal").hidden);

      assert.deepEqual(ctx.errors, []);
    } finally {
      await ctx.close();
    }
  }

  // 2) Desktop 1280x800: title + live challenge banner (/c?...), info sheets, igModal
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
    try {
      await ctx.goto(`${srv.baseUrl}/c?s=15000&n=Ming&v=zero&p=sub%2Bgrind&intro=0&roll=0`);
      await ctx.waitFor(() => !document.getElementById("startOv").hidden && !document.getElementById("chal").hidden);
      assert.match(await ctx.evalJs("document.querySelector('#chal .chal-t b')?.textContent || ''"), /15,000/);
      assert.deepEqual(await ctx.evalJs(DOM_CONTRAST_SCRIPT), []);

      // Check #infoModal (Leaderboard, How to play, Wardrobe)
      for (const btnId of ["#tsLb", "#tsHow", "#tsWear"]) {
        await ctx.click(btnId);
        await ctx.waitFor(() => !document.getElementById("infoModal").hidden);
        const f = await ctx.evalJs(DOM_CONTRAST_SCRIPT);
        assert.deepEqual(f, [], `Contrast fail in ${btnId}: ` + JSON.stringify(f));
        await ctx.click("#infoClose");
        await ctx.waitFor(() => document.getElementById("infoModal").hidden);
      }

      // Check #igModal
      await ctx.click("#tsIg");
      await ctx.waitFor(() => !document.getElementById("igModal").hidden);
      assert.deepEqual(await ctx.evalJs(DOM_CONTRAST_SCRIPT), []);
      await ctx.click("#igClose");
      await ctx.waitFor(() => document.getElementById("igModal").hidden);

      assert.deepEqual(ctx.errors, []);
    } finally {
      await ctx.close();
    }
  }

  // 3) /admin.html 1280x800: seed games, check all 6 tabs, hidden row, SVG chart bars, and .meter bars
  {
    for (const body of [
      { score: 5200, name: "ContrastOne", email: "c1@example.com", board: true, stage: 1, height: 5.0, drops: 0, choices: [{ card: "newphone", pick: "wise", power: "vine" }], answers: [{ q: "fakeapp", pick: 1 }, { q: "flatrate", pick: 1 }, { q: "ming", pick: 0 }], habit: "buffer", items: 10 },
      { score: 2400, name: "ContrastTwo", email: "c2@example.com", board: true, stage: 0, height: 2.0, drops: 1, choices: [{ card: "mule", pick: "risky" }], answers: [{ q: "fakeapp", pick: 0 }, { q: "flatrate", pick: 0 }, { q: "ming", pick: 1 }], habit: "apr", items: 6 },
    ]) {
      const r = await fetch(`${srv.baseUrl}/api/scores`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      assert.equal(r.status, 201);
    }

    const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
    try {
      await ctx.goto(`${srv.baseUrl}/admin.html`);
      await ctx.evalJs(`document.getElementById('token').value = ${JSON.stringify(srv.adminToken)}`);
      await ctx.click("#loginForm button[type=submit]");
      await ctx.waitFor(() => !document.getElementById("panel").hidden);
      await ctx.waitFor(() => document.querySelectorAll("#tiles .tile").length > 5);

      for (const tabId of ["#tab-survey", "#tab-decisions", "#tab-trends", "#tab-winners", "#tab-downloads", "#tab-games"]) {
        await ctx.click(tabId);
        await ctx.sleep(80);
        const f = await ctx.evalJs(DOM_CONTRAST_SCRIPT);
        assert.deepEqual(f, [], `Admin contrast fail on ${tabId}: ` + JSON.stringify(f));
      }

      // Check computed SVG bar contrast & .meter fill contrast
      await ctx.click("#tab-survey");
      await ctx.waitFor(() => !!document.querySelector("#pane-survey .meter i"));
      const meters = await ctx.evalJs(`[...document.querySelectorAll("#pane-survey .meter")].map(m => {
        const i = m.querySelector("i");
        return i ? { fg: getComputedStyle(i).backgroundColor, bg: getComputedStyle(m).backgroundColor } : null;
      }).filter(Boolean)`);
      assert.ok(meters.length >= 1, "Expected .meter bars on #tab-survey");
      for (const m of meters) {
        const mr = contrastRatio(parseColor(m.fg), parseColor(m.bg));
        assert.ok(mr >= 3.0, `Computed .meter fill vs track ${mr.toFixed(2)} < 3.0 (${m.fg} on ${m.bg})`);
      }

      await ctx.click("#tab-trends");
      await ctx.waitFor(() => !!document.querySelector("#trendChartBox svg rect"));
      const svgCheck = await ctx.evalJs(`(() => {
        const r = document.querySelector('#trendChartBox svg rect');
        const cs = getComputedStyle(r);
        return { fill: cs.fill, opacity: parseFloat(cs.opacity) };
      })()`);
      const svgCol = parseColor(svgCheck.fill);
      svgCol.a = svgCheck.opacity;
      assert.ok(contrastRatio(svgCol, parseColor("#FFFFFF")) >= 3.0);

      await ctx.click("#tab-games");
      await ctx.waitFor(() => document.querySelectorAll("#rows tr").length >= 2);
      await ctx.click("#rows tr button.hide");
      await ctx.waitFor(() => document.querySelectorAll("#rows tr.hidden").length >= 1);
      const hiddenFails = await ctx.evalJs(DOM_CONTRAST_SCRIPT);
      assert.deepEqual(hiddenFails, [], "Admin hidden row contrast fail: " + JSON.stringify(hiddenFails));
      assert.deepEqual(ctx.errors, []);
    } finally {
      await ctx.close();
    }
  }
});
