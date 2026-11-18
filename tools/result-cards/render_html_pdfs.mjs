// Renders the 7 Front Result Cards and 1 Universal Back Card as high-precision 96 mm x 166 mm
// print-bleed Artwork PDFs using headless Chromium (CDP), self-hosted web fonts, Three.js 3D medals,
// CLAY engine sprites, and crisp vector SVG QR codes.

import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { launchBrowser } from "../../tests/e2e/cdp.mjs";
import { resolveCards } from "./cards-data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const CACHE = join(HERE, ".cache");
const ART_PDF_DIR = join(CACHE, "artwork-pdf");
const MEDAL_DIR = join(CACHE, "medals");
const PROP_DIR = join(CACHE, "props");

const GAME_URL = "https://3fallcrab.com/";
const IG_URL = "https://www.instagram.com/3fallfun_campaign?dlrf=azdibDNjdTk4MzQ4";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function loadQrLib() {
  const ctx = { window: {} };
  ctx.window = ctx;
  vm.runInNewContext(readFileSync(join(ROOT, "src/static/vendor/qrcode-1.4.4.js"), "utf8"), ctx);
  return ctx.window.qrcode;
}

const qrcode = loadQrLib();

function qrSvgString(text, { dark = "#171A33", light = "#FFFFFF", quiet = 4, className = "" } = {}) {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  const size = n + quiet * 2;
  let d = "";
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (qr.isDark(r, c)) {
        d += `M${c + quiet} ${r + quiet}h1v1h-1z`;
      }
    }
  }
  return `<svg class="${className}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="${light}"/><path d="${d}" fill="${dark}"/></svg>`;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fontFacesCss() {
  return `
    @font-face { font-family: "Gluten"; font-style: normal; font-weight: 400 900; src: url("/fonts/gluten.woff2") format("woff2"); }
    @font-face { font-family: "Noto Sans HK"; font-style: normal; font-weight: 400; src: url("/fonts/noto-sans-hk.woff2") format("woff2"); }
    @font-face { font-family: "Noto Sans HK"; font-style: normal; font-weight: 500; src: url("/fonts/noto-sans-hk.woff2") format("woff2"); }
    @font-face { font-family: "Noto Sans HK"; font-style: normal; font-weight: 700; src: url("/fonts/noto-sans-hk.woff2") format("woff2"); }
    @font-face { font-family: "Noto Sans HK"; font-style: normal; font-weight: 900; src: url("/fonts/noto-sans-hk.woff2") format("woff2"); }
    @font-face { font-family: "LXGW WenKai TC"; font-style: normal; font-weight: 400; src: url("/fonts/lxgw-wenkai-tc-regular.woff2") format("woff2"); unicode-range: U+0030-0039,U+2E80-2FDF,U+3000-303F,U+31C0-31EF,U+3200-9FFF,U+F900-FAFF,U+FE30-FE4F,U+FF00-FFEF,U+20000-2FFFF; }
    @font-face { font-family: "LXGW WenKai TC"; font-style: normal; font-weight: 700; src: url("/fonts/lxgw-wenkai-tc-bold.woff2") format("woff2"); unicode-range: U+0030-0039,U+2E80-2FDF,U+3000-303F,U+31C0-31EF,U+3200-9FFF,U+F900-FAFF,U+FE30-FE4F,U+FF00-FFEF,U+20000-2FFFF; }
    @font-face { font-family: "TFF Punct"; font-style: normal; font-weight: 400 650; src: url("/fonts/source-sans-punct-400.woff2") format("woff2"); unicode-range: U+00B7,U+00D7,U+2018-201D; }
    @font-face { font-family: "TFF Punct"; font-style: normal; font-weight: 651 850; src: url("/fonts/source-sans-punct-700.woff2") format("woff2"); unicode-range: U+00B7,U+00D7,U+2018-201D; }
    @font-face { font-family: "TFF Punct"; font-style: normal; font-weight: 851 900; src: url("/fonts/source-sans-punct-900.woff2") format("woff2"); unicode-range: U+00B7,U+00D7,U+2018-201D; }
  `;
}

function barcodeSvg(ticketNo) {
  let seed = Number(ticketNo) + 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let x = 0;
  let rects = "";
  while (x < 100) {
    const w = 1.6 + Math.floor(rnd() * 3.4);
    if (rnd() > 0.34 && x + w <= 100) {
      rects += `<rect x="${x.toFixed(1)}" y="0" width="${w.toFixed(1)}" height="20" fill="#F6F0D8"/>`;
    }
    x += w + 1.6;
  }
  return `<svg class="barcode" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">${rects}</svg>`;
}

function silhouetteSvg(rows, worldW = 440) {
  const sw = 28, sh = 40;
  const rc = rows.length;
  const rh = Math.min(3.2, (sh - 6) / rc);
  let bars = "";
  for (let i = 0; i < rc; i++) {
    const [l, r] = rows[i];
    if (r > l) {
      const bx = 2.5 + (l / worldW) * (sw - 5);
      const bw = Math.max(1.2, ((r - l) / worldW) * (sw - 5));
      const by = sh - 3.5 - (i + 1) * rh;
      bars += `<rect x="${bx.toFixed(2)}" y="${by.toFixed(2)}" width="${bw.toFixed(2)}" height="${(rh + 0.2).toFixed(2)}" fill="rgba(255,217,138,0.88)"/>`;
    }
  }
  return `<svg class="sil-svg" viewBox="0 0 ${sw} ${sh}" xmlns="http://www.w3.org/2000/svg"><rect width="${sw}" height="${sh}" rx="5" fill="rgba(255,255,255,0.08)"/>${bars}</svg>`;
}

function grainSvg(seedStart = 11, wMm = 96, hMm = 50.5) {
  let seed = seedStart;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let dots = "";
  for (let i = 0; i < 650; i++) {
    const x = (rnd() * wMm).toFixed(2);
    const y = (rnd() * hMm).toFixed(2);
    const a = (0.025 + rnd() * 0.055).toFixed(3);
    const r = (0.08 + rnd() * 0.09).toFixed(2);
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,${a})"/>`;
  }
  return `<svg class="grain-svg" viewBox="0 0 ${wMm} ${hMm}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">${dots}</svg>`;
}

function buildFrontHtml(card) {
  const fZh = '"LXGW WenKai TC","TFF Punct","Noto Sans HK","PingFang HK",sans-serif';
  const fSans = '"TFF Punct","Noto Sans HK","PingFang HK",sans-serif';
  const fDisplay = '"Gluten","Arial Rounded MT Bold",sans-serif';
  const fSerif = 'Georgia,"Times New Roman","Noto Serif",serif';

  const stageLabel = card.stage === 3 ? "退休 Retirement" : `${card.stageObj.zh} ${card.stageObj.en}`;
  const falls = [
    ["spend", "#E8661F", card.falls.spend],
    ["scam", "#7B5BE8", card.falls.scam],
    ["delay", "#2F86D6", card.falls.delay],
  ];
  const challengeQr = qrSvgString(card.challengeUrl, { dark: "#171A33", light: "#F6F0D8", quiet: 2, className: "mini-qr-svg" });

  // Adapt font sizes gracefully for longer titles/personas so nothing overflows
  const zhLen = Array.from(card.verdict.zh).length;
  const zhSvgSize = zhLen >= 6 ? 18.5 : 21;
  const enTitleSize = card.verdict.en.length >= 24 ? "6.6pt" : "7.5pt";
  const billingStr = `領銜主演  ${card.playerName}  ·  ${card.personaZh} ${card.comboEn}`;
  const billingSize = billingStr.length > 36 ? "6.1pt" : "6.7pt";
  const stageSize = stageLabel.length > 14 ? "7.4pt" : "8.6pt";
  const savedSize = card.formattedScore.length >= 9 ? "12.0pt" : "12.8pt";

  return `<!doctype html>
<html lang="zh-HK">
<head>
<meta charset="utf-8">
<style>
${fontFacesCss()}
@page { size: 96mm 166mm; margin: 0; }
* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0; width: 96mm; height: 166mm; overflow: hidden;
  background: #0B0C17;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.page { position: relative; width: 96mm; height: 166mm; overflow: hidden; }
.poster-bleed {
  position: absolute; left: 0; top: 0; width: 96mm; height: 118.5mm;
  object-fit: fill; display: block;
}
.stub {
  position: absolute; left: 0; top: 115.5mm; width: 96mm; height: 50.5mm;
  background: linear-gradient(180deg, #171A33 0%, #0B0C17 100%);
  color: #F6F0D8;
  overflow: hidden;
}
.grain-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.perf-line {
  position: absolute; left: 8.5mm; right: 8.5mm; top: 0;
  border-top: 0.35mm dashed rgba(246, 240, 216, 0.48);
}
.stub-inner {
  position: absolute;
  left: 8.5mm; right: 8.5mm; top: 3.7mm; bottom: 8.0mm;
  display: flex; flex-direction: column; justify-content: space-between;
}
.hdr {
  display: flex; align-items: baseline; justify-content: space-between;
  line-height: 1;
}
.gold-label {
  font-family: ${fSans}; font-weight: 800; font-size: 4.9pt;
  letter-spacing: 0.35mm; color: #C9A35A; text-transform: uppercase;
}
.hdr-mid {
  font-family: ${fZh}; font-weight: 500; font-size: 4.5pt; color: #B5AFC4;
}
.verdict-row {
  display: flex; align-items: center; gap: 2.2mm;
  margin-top: 0.4mm;
}
.medal-pic {
  width: 11.8mm; height: 13.8mm; flex: none; object-fit: contain;
  filter: drop-shadow(0 0.7mm 1.1mm rgba(0,0,0,0.55));
}
.verdict-text { min-width: 0; flex: 1; }
.title-zh-svg {
  display: block; width: 100%; height: 5.5mm; overflow: visible;
}
.title-zh-txt {
  font-family: ${fZh}; font-weight: 700;
}
.title-en {
  margin: 0.25mm 0 0; font-family: ${fSerif}; font-style: italic; font-weight: 700;
  font-size: ${enTitleSize}; line-height: 1.12; color: #E8C98A; white-space: nowrap;
}
.roast {
  margin: 0.45mm 0 0; font-family: ${fZh}; font-weight: 500; font-size: 6.1pt;
  line-height: 1.18; color: #C3BDD3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.rule {
  height: 0.22mm; width: 100%; background: rgba(201, 163, 90, 0.45);
}
.metrics {
  display: grid; grid-template-columns: 29.0mm 1fr 20.5mm; align-items: start; gap: 2.2mm;
}
.m-label { display: block; margin-bottom: 0.55mm; }
.saved-val {
  font-family: ${fSerif}; font-weight: 700; font-size: ${savedSize}; line-height: 1.02;
  color: #FFD98A; white-space: nowrap;
}
.stage-val {
  font-family: ${fZh}; font-weight: 700; font-size: ${stageSize}; line-height: 1.08;
  color: #F6F0D8; white-space: nowrap;
}
.best-val {
  margin-top: 0.45mm; font-family: ${fZh}; font-weight: 500; font-size: 5.8pt;
  line-height: 1.1; color: #B5AFC4;
}
.falls-wrap { text-align: right; }
.falls-row {
  display: flex; justify-content: flex-end; gap: 1.3mm; margin-top: 0.3mm;
}
.fall-badge {
  width: 4.5mm; height: 4.5mm; border-radius: 50%;
  border: 0.28mm solid rgba(255,255,255,0.88);
  display: inline-flex; align-items: center; justify-content: center;
  font-family: ${fDisplay}; font-weight: 900; font-size: 5.5pt; line-height: 1; color: #FFFFFF;
}
.billing { text-align: center; line-height: 1.18; }
.billing-main {
  font-family: ${fZh}; font-weight: 700; font-size: ${billingSize};
  color: #F6F0D8; letter-spacing: 0.14mm; white-space: nowrap;
}
.billing-sub {
  margin-top: 0.3mm; font-family: ${fZh}; font-weight: 500; font-size: 5.4pt; color: #B5AFC4;
}
.dash-foot {
  border-top: 0.3mm dashed rgba(246, 240, 216, 0.42);
}
.foot {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 0.35mm;
}
.foot-left { display: flex; align-items: center; gap: 1.3mm; }
.mini-qr-svg { width: 5.2mm; height: 5.2mm; display: block; border-radius: 0.4mm; }
.bc-col { display: flex; flex-direction: column; align-items: center; width: 13mm; }
.barcode { width: 13mm; height: 3.1mm; display: block; }
.bc-no {
  margin-top: 0.4mm; font-family: ${fSans}; font-weight: 700; font-size: 3.7pt;
  letter-spacing: 0.22mm; color: #B5AFC4; line-height: 1;
}
.sil-svg { width: 3.2mm; height: 4.6mm; display: block; }
.foot-url {
  font-family: ${fDisplay}; font-weight: 900; font-size: 9.2pt; line-height: 1;
  color: #FF7AB4; letter-spacing: 0.05mm;
}
.foot-right { text-align: right; line-height: 1.25; }
.foot-right div {
  font-family: ${fSans}; font-weight: 800; font-size: 4.6pt; letter-spacing: 0.25mm; color: #C9A35A;
}
</style>
</head>
<body>
<div class="page">
  <img class="poster-bleed" src="/cache/posters/${card.poster}-bleed.jpg" alt="">
  <div class="stub">
    ${grainSvg(11 + card.index * 7)}
    <div class="perf-line"></div>
    <div class="stub-inner">
      <div class="hdr">
        <span class="gold-label">ADMIT ONE · 入場券</span>
        <span class="hdr-mid">HSUHK 個人理財大使計劃 2026</span>
        <span class="gold-label">No. ${card.ticketNo}</span>
      </div>

      <div class="verdict-row">
        <img class="medal-pic" src="/cache/medals/medal-${card.tier}.png" alt="">
        <div class="verdict-text">
          <span class="gold-label" style="display:block;margin-bottom:0.35mm;">我的稱號 · MY TITLE</span>
          <svg class="title-zh-svg" viewBox="0 0 240 24" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldFoil" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFF8DC"/>
                <stop offset="48%" stop-color="#FFE08A"/>
                <stop offset="85%" stop-color="#D4A24C"/>
                <stop offset="100%" stop-color="#FFFDF0"/>
              </linearGradient>
            </defs>
            <text class="title-zh-txt" x="0" y="19.5" fill="url(#goldFoil)" font-size="${zhSvgSize}">${escapeHtml(card.verdict.zh)}</text>
          </svg>
          <p class="title-en">${escapeHtml(card.verdict.en)}</p>
          <p class="roast">${escapeHtml(card.verdict.line[1])}</p>
        </div>
      </div>

      <div class="rule"></div>

      <div class="metrics">
        <div>
          <span class="gold-label m-label">票房 · SAVED</span>
          <div class="saved-val">${escapeHtml(card.formattedScore)}</div>
        </div>
        <div>
          <span class="gold-label m-label">場次 · REACHED</span>
          <div class="stage-val">${escapeHtml(stageLabel)}</div>
          <div class="best-val">最高 Best · ${escapeHtml(card.bestText)}</div>
        </div>
        <div class="falls-wrap">
          <span class="gold-label m-label">三大陷阱 · 3 FALLS</span>
          <div class="falls-row">
            ${falls.map(([, col, cnt]) => `<span class="fall-badge" style="background:${col}">${cnt ? `×${cnt}` : "✓"}</span>`).join("")}
          </div>
        </div>
      </div>

      <div class="rule"></div>

      <div class="billing">
        <div class="billing-main">${escapeHtml(billingStr)}</div>
        <div class="billing-sub">贏咗 ${card.pct}% 玩家 · Beat ${card.pct}% of players</div>
      </div>

      <div class="dash-foot"></div>

      <div class="foot">
        <div class="foot-left">
          ${challengeQr}
          <div class="bc-col">
            ${barcodeSvg(card.ticketNo)}
            <div class="bc-no">${card.ticketNo.split("").join(" ")}</div>
          </div>
          ${silhouetteSvg(card.silhouetteRows)}
        </div>
        <div class="foot-url">3fallcrab.com</div>
        <div class="foot-right">
          <div>${escapeHtml(card.dateLabel)}</div>
          <div>ACT ${escapeHtml(card.act.n)} · SEAT ${escapeHtml(card.bestText)}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
}

function buildBackHtml() {
  const fZh = '"LXGW WenKai TC","TFF Punct","Noto Sans HK","PingFang HK",sans-serif';
  const fSans = '"TFF Punct","Noto Sans HK","PingFang HK",sans-serif';
  const fDisplay = '"Gluten","Arial Rounded MT Bold",sans-serif';

  const qrGame = qrSvgString(GAME_URL, { dark: "#171A33", light: "#FFFFFF", quiet: 3, className: "qr-svg" });
  const qrIg = qrSvgString(IG_URL, { dark: "#171A33", light: "#FFFFFF", quiet: 3, className: "qr-svg" });

  // Stylized Victoria Harbour skyline silhouette in soft pastel game colors behind protagonists
  const harbourSvg = `
  <svg class="harbour-svg" viewBox="0 0 96 42" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="skyBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(127,211,255,0)"/>
        <stop offset="55%" stop-color="rgba(142,219,255,0.42)"/>
        <stop offset="100%" stop-color="rgba(58,155,240,0.32)"/>
      </linearGradient>
    </defs>
    <rect width="96" height="42" fill="url(#skyBack)"/>
    <!-- Soft Lion Rock mountain ridge -->
    <path d="M0 34 Q14 23 26 27 Q38 19 52 26 Q68 20 82 26 L96 29 L96 42 L0 42 Z" fill="rgba(76,195,106,0.22)"/>
    <!-- Stylized HK skyscrapers -->
    <g fill="rgba(58,155,240,0.24)">
      <rect x="3" y="21" width="7" height="19" rx="1"/>
      <rect x="11" y="16" width="6" height="24" rx="1"/>
      <polygon points="21,40 21,21 25,13 29,21 29,40"/>
      <rect x="32" y="18" width="7" height="22" rx="1"/>
      <rect x="44" y="12" width="8" height="28" rx="1.5"/>
      <rect x="47" y="8" width="2" height="5" rx="0.5"/>
      <rect x="55" y="17" width="7" height="23" rx="1"/>
      <rect x="65" y="15" width="7" height="25" rx="1"/>
      <rect x="75" y="19" width="6" height="21" rx="1"/>
      <rect x="83" y="14" width="8" height="26" rx="1"/>
    </g>
    <!-- Harbour water waves -->
    <path d="M0 35 Q12 33 24 35 T48 35 T72 35 T96 35 L96 42 L0 42 Z" fill="rgba(58,155,240,0.38)"/>
    <path d="M0 37.5 Q12 36 24 37.5 T48 37.5 T72 37.5 T96 37.5" fill="none" stroke="rgba(255,253,247,0.55)" stroke-width="0.6"/>
  </svg>`;

  const letters = [
    ["3", "#FF5FA2", -6, "0", "0.9mm"],
    ["F", "#3A9BF0", 0, "0", "0"],
    ["a", "#4CC36A", 0, "0.4mm", "0"],
    ["l", "#FF7B35", 0, "0", "0"],
    ["l", "#8B6CF2", 4, "0", "0.8mm"],
    ["F", "#F2463E", 0, "0", "0"],
    ["u", "#20C1B3", 0, "-0.3mm", "0"],
    ["n", "#FF5FA2", 5, "0", "0"],
  ];

  return `<!doctype html>
<html lang="zh-HK">
<head>
<meta charset="utf-8">
<style>
${fontFacesCss()}
@page { size: 96mm 166mm; margin: 0; }
* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0; width: 96mm; height: 166mm; overflow: hidden;
  background: #FFD23F;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.page { position: relative; width: 96mm; height: 166mm; overflow: hidden; }
.top-zone {
  position: absolute; left: 0; top: 0; width: 96mm; height: 115.5mm;
  background-color: #FFD23F;
  background-image:
    radial-gradient(66mm 44mm at 50% 62%, rgba(255, 250, 224, 0.72) 0%, rgba(255, 250, 224, 0) 75%),
    radial-gradient(80mm 42mm at 50% 0%, #FFE682 0%, rgba(255, 230, 130, 0) 72%),
    radial-gradient(circle at 12% 18%, rgba(255,255,255,0.42) 0 0.55mm, transparent 0.7mm),
    radial-gradient(circle at 72% 60%, rgba(160,90,10,0.09) 0 0.55mm, transparent 0.7mm);
  background-size: auto, auto, 9.5mm 9.5mm, 11.5mm 11.5mm;
  overflow: hidden;
}
.harbour-svg {
  position: absolute; left: 0; top: 27mm; width: 96mm; height: 37mm;
  pointer-events: none;
}
.header {
  position: relative; z-index: 3;
  padding-top: 8.0mm; text-align: center;
}
.edition-pill {
  display: inline-block;
  padding: 0.8mm 3.0mm;
  border-radius: 999px;
  background: #25317A;
  color: #FFE45C;
  font-family: ${fSans}; font-weight: 800; font-size: 4.6pt; letter-spacing: 0.35mm;
  box-shadow: 0 0.5mm 0 rgba(0,0,0,0.16);
}
.word {
  margin: 1.6mm 0 0;
  font-family: ${fDisplay}; font-weight: 900; font-size: 23.5pt; line-height: 0.92;
  white-space: nowrap;
}
.word span {
  display: inline-block;
  -webkit-text-stroke: 0.9mm #FFFDF7;
  paint-order: stroke fill;
  filter: drop-shadow(0 0.65mm 0 rgba(37, 49, 122, 0.28));
}
.zh-title {
  margin: 0.6mm 0 0;
  font-family: ${fZh}; font-weight: 700; font-size: 12.2pt; line-height: 1.1;
  letter-spacing: 1.5mm; color: #25317A;
  text-shadow: 0 0.35mm 0 rgba(255,255,255,0.75);
}
.tagline {
  margin: 0.6mm 0 0;
  font-family: ${fSans}; font-weight: 700; font-size: 5.5pt; color: #5B516C;
}
/* Protagonists stage resting cleanly on top of the yellow Savings Foundation shelf */
.stage-cast {
  position: absolute; left: 3mm; right: 3mm; top: 27.2mm; height: 34.0mm; z-index: 6;
  pointer-events: none;
}
.cast-jack {
  position: absolute; left: 5.5mm; bottom: 0; height: 31.8mm; width: auto;
  filter: drop-shadow(0 0.8mm 1.0mm rgba(60,30,15,0.28));
}
.cast-jackie {
  position: absolute; right: 5.5mm; bottom: 0; height: 31.8mm; width: auto;
  filter: drop-shadow(0 0.8mm 1.0mm rgba(60,30,15,0.28));
}
.prop-books {
  position: absolute; left: 19.2mm; bottom: 0; width: 11.2mm; height: auto;
  filter: drop-shadow(0 0.45mm 0.65mm rgba(60,30,15,0.24));
}
.prop-bun {
  position: absolute; left: 21.0mm; bottom: 4.0mm; width: 7.6mm; height: auto;
  transform: rotate(-5deg);
  filter: drop-shadow(0 0.4mm 0.55mm rgba(60,30,15,0.24));
}
.prop-piggy {
  position: absolute; right: 19.0mm; bottom: 0; width: 10.6mm; height: auto;
  filter: drop-shadow(0 0.45mm 0.65mm rgba(60,30,15,0.24));
}
.prop-laisee {
  position: absolute; right: 28.8mm; bottom: 0.2mm; width: 8.2mm; height: auto;
  transform: rotate(-7deg);
  filter: drop-shadow(0 0.4mm 0.55mm rgba(60,30,15,0.22));
}
.cast-crab {
  position: absolute; left: 50%; bottom: 0; transform: translateX(-50%);
  width: 15.8mm; height: auto; z-index: 7;
  filter: drop-shadow(0 0.6mm 0.9mm rgba(60,30,15,0.30));
}
/* Yellow clay savings foundation bar crowning the QR plaque */
.platform-bar {
  position: absolute; left: 50%; top: 60.8mm; transform: translateX(-50%);
  width: 74mm; height: 3.4mm; z-index: 5;
  border-radius: 1.7mm;
  background: linear-gradient(180deg, #FFE169 0%, #FFC83D 65%, #E8A622 100%);
  border: 0.35mm solid #FFF6D6;
  box-shadow: 0 0.7mm 0 rgba(120,62,12,0.25);
  display: flex; align-items: center; justify-content: center; gap: 2mm;
  font-family: ${fZh}; font-weight: 700; font-size: 4.5pt; color: #25317A; letter-spacing: 0.2mm;
}
/* Centerpiece Dual-QR Collector Plaque right in the middle of the card */
.qr-plaque {
  position: absolute; left: 9.5mm; right: 9.5mm; top: 63.4mm; height: 44.8mm; z-index: 4;
  background: #FFFDF7;
  border-radius: 4.2mm;
  border: 0.5mm solid #F2CB6B;
  box-shadow: 0 1.4mm 0 rgba(120, 62, 12, 0.24), 0 3.0mm 5.0mm rgba(120, 62, 12, 0.14);
  padding: 2.8mm 3.4mm 2.3mm;
  display: flex; flex-direction: column; justify-content: space-between;
}
.qr-head {
  text-align: center;
  font-family: ${fZh}; font-weight: 700; font-size: 5.5pt; color: #25317A; letter-spacing: 0.25mm;
}
.qr-grid {
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 2.2mm;
}
.qr-sep {
  width: 0.25mm; height: 32mm; background: linear-gradient(180deg, transparent, #E6D3A8 20%, #E6D3A8 80%, transparent);
}
.qr-col {
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
.qr-frame {
  width: 24.5mm; height: 24.5mm; padding: 0.9mm;
  background: #FFFFFF;
  border-radius: 2.4mm;
}
.qr-frame.game {
  border: 0.45mm solid #3A9BF0;
  box-shadow: 0 0.7mm 0 rgba(58, 155, 240, 0.22);
}
.qr-frame.ig {
  border: 0.45mm solid #FF5FA2;
  box-shadow: 0 0.7mm 0 rgba(255, 95, 162, 0.22);
}
.qr-svg { width: 100%; height: 100%; display: block; }
.qr-pill {
  margin-top: 1.4mm; padding: 0.65mm 2.8mm; border-radius: 999px;
  font-family: ${fSans}; font-weight: 900; font-size: 5.1pt; color: #FFFFFF; letter-spacing: 0.25mm;
}
.qr-pill.game { background: #2275C6; }
.qr-pill.ig { background: linear-gradient(90deg, #E1306C 0%, #F77737 100%); }
.qr-zh {
  margin-top: 0.9mm; font-family: ${fZh}; font-weight: 700; font-size: 5.8pt;
  line-height: 1.1; color: #2E2838; white-space: nowrap;
}
.qr-handle {
  margin-top: 0.45mm; font-family: ${fSans}; font-weight: 800; font-size: 5.2pt;
  line-height: 1.1; white-space: nowrap;
}
.qr-handle.game { color: #2275C6; }
.qr-handle.ig { color: #C12770; }

/* Bottom Ticket Stub matching front stub back-to-back */
.stub {
  position: absolute; left: 0; top: 115.5mm; width: 96mm; height: 50.5mm;
  background: linear-gradient(180deg, #171A33 0%, #0B0C17 100%);
  color: #F6F0D8; overflow: hidden;
}
.grain-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.perf-line {
  position: absolute; left: 8.5mm; right: 8.5mm; top: 0;
  border-top: 0.35mm dashed rgba(246, 240, 216, 0.48);
}
.stub-inner {
  position: absolute; left: 8.5mm; right: 8.5mm; top: 4.2mm; bottom: 8.0mm;
  display: flex; flex-direction: column; justify-content: space-between; text-align: center;
}
.gold-label {
  font-family: ${fSans}; font-weight: 800; font-size: 4.9pt;
  letter-spacing: 0.32mm; color: #C9A35A; text-transform: uppercase;
}
.falls-pills {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.8mm;
}
.fpill {
  border-radius: 2.2mm; padding: 1.4mm 1.0mm;
  border: 0.25mm solid rgba(255,255,255,0.22);
  color: #FFFFFF;
}
.fpill b {
  display: block; font-family: ${fZh}; font-weight: 700; font-size: 6.6pt; line-height: 1.15;
}
.fpill small {
  display: block; margin-top: 0.3mm; font-family: ${fSans}; font-weight: 700;
  font-size: 4.4pt; opacity: 0.92; letter-spacing: 0.05mm;
}
.stages-strip {
  background: rgba(255,255,255,0.07);
  border: 0.22mm solid rgba(201,163,90,0.32);
  border-radius: 999px;
  padding: 1.05mm 2.5mm;
  font-family: ${fZh}; font-weight: 700; font-size: 5.2pt; color: #FFE7A0;
  white-space: nowrap;
}
.stages-strip span { color: #C9A35A; margin: 0 0.8mm; }
.quote-zh {
  font-family: ${fZh}; font-weight: 700; font-size: 6.8pt; color: #F6F0D8; line-height: 1.2;
}
.quote-en {
  margin-top: 0.35mm; font-family: ${fSans}; font-weight: 500; font-size: 5.2pt; color: #B5AFC4;
}
.rule { height: 0.22mm; width: 100%; background: rgba(201, 163, 90, 0.38); }
.credit-row {
  display: flex; justify-content: space-between; align-items: baseline;
  font-family: ${fZh}; font-size: 4.8pt;
}
.credit-row b { color: #C9A35A; font-family: ${fSans}; font-weight: 800; letter-spacing: 0.2mm; }
.credit-row span { color: #B5AFC4; }
</style>
</head>
<body>
<div class="page">
  <div class="top-zone">
    ${harbourSvg}
    <div class="header">
      <span class="edition-pill">SOUVENIR EDITION · HSUHK 個人理財大使計劃 2026</span>
      <h1 class="word">${letters.map(([ch, c, r, y, mr]) => `<span style="color:${c};transform:rotate(${r}deg) translateY(${y});margin-right:${mr}">${ch}</span>`).join("")}</h1>
      <p class="zh-title">人生跌塔</p>
      <p class="tagline">Build your future, one block at a time · 疊出你嘅未來</p>
    </div>

    <div class="stage-cast">
      <img class="cast-jack" src="/cache/cast/jack_uni.png" alt="">
      <img class="prop-books" src="/cache/props/textbooks.png" alt="">
      <img class="prop-bun" src="/cache/props/polobun.png" alt="">
      <img class="prop-laisee" src="/cache/props/laisee.png" alt="">
      <img class="prop-piggy" src="/cache/props/piggybank.png" alt="">
      <img class="cast-jackie" src="/cache/cast/jackie_uni.png" alt="">
      <img class="cast-crab" src="/cache/cast/crab_happy.png" alt="">
    </div>

    <div class="platform-bar"><span>儲蓄基礎</span><span>·</span><span style="font-family:${fDisplay};font-weight:900;">SAVINGS FOUNDATION</span></div>

    <div class="qr-plaque">
      <div class="qr-head">SCAN TO PLAY &amp; FOLLOW · 掃碼即玩 追蹤最新消息</div>
      <div class="qr-grid">
        <div class="qr-col">
          <div class="qr-frame game">${qrGame}</div>
          <span class="qr-pill game">PLAY GAME</span>
          <div class="qr-zh">掃一掃即玩（3分鐘）</div>
          <div class="qr-handle game">3fallcrab.com</div>
        </div>
        <div class="qr-sep"></div>
        <div class="qr-col">
          <div class="qr-frame ig">${qrIg}</div>
          <span class="qr-pill ig">INSTAGRAM</span>
          <div class="qr-zh">最新貼士同每月有獎</div>
          <div class="qr-handle ig">@3fallfun_campaign</div>
        </div>
      </div>
    </div>
  </div>

  <div class="stub">
    ${grainSvg(99)}
    <div class="perf-line"></div>
    <div class="stub-inner">
      <div class="gold-label">WATCH OUT FOR THE 3 FALLS · 避開三大理財陷阱</div>
      <div class="falls-pills">
        <div class="fpill" style="background:#D95514;"><b>過度消費</b><small>Overspending</small></div>
        <div class="fpill" style="background:#6A48D8;"><b>騙局</b><small>Scams</small></div>
        <div class="fpill" style="background:#2176C7;"><b>拖延儲錢</b><small>Putting off saving</small></div>
      </div>
      <div class="stages-strip">大學 University<span>▸</span>第一份工 First Job<span>▸</span>成家 Family<span>▸</span>退休 Retirement</div>
      <div>
        <div class="quote-zh">「你每個決定都係一嚿磚，疊出你嘅未來！」</div>
        <div class="quote-en">Every choice is a block — stack yours wisely.</div>
      </div>
      <div class="rule"></div>
      <div class="credit-row">
        <b>COLLECTOR SERIES · 紀念版 7 款</b>
        <span>3 Fall Crab 整冧咗team · HSUHK</span>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;
}

function spriteExporterHtml() {
  return `<!doctype html>
<html>
<head><meta charset="utf-8"></head>
<body>
<script src="/src/vendor/matter-0.19.0.min.js"></script>
<script src="/src/clay.js"></script>
<script src="/src/items/wise.js"></script>
<script src="/src/items/hk.js"></script>
<script src="/src/vendor/medal3d.js"></script>
<script>
window.exportAssets = async function() {
  const medals = {};
  for (const tier of ["gold", "silver", "bronze"]) {
    const cv = window.TFF_MEDAL3D.snapshot(tier, 720, 846);
    medals[tier] = cv.toDataURL("image/png");
  }
  const props = {};
  const want = ["piggybank", "textbooks", "polobun", "laisee", "eggtart", "lunchbox"];
  for (const id of want) {
    const def = (window.ITEM_DEFS || []).find(d => d.id === id);
    if (!def) continue;
    const body = def.make(0, 0);
    const bb = body.bounds;
    const pad = 16;
    const w = bb.max.x - bb.min.x + pad * 2;
    const h = bb.max.y - bb.min.y + pad * 2;
    const scale = 5;
    const cv = document.createElement("canvas");
    cv.width = Math.ceil(w * scale);
    cv.height = Math.ceil(h * scale);
    const g = cv.getContext("2d");
    g.setTransform(scale, 0, 0, scale, -(bb.min.x - pad) * scale, -(bb.min.y - pad) * scale);
    def.draw(g);
    props[id] = cv.toDataURL("image/png");
  }
  return { medals, props };
};
</script>
</body>
</html>`;
}

async function main() {
  mkdirSync(ART_PDF_DIR, { recursive: true });
  mkdirSync(MEDAL_DIR, { recursive: true });
  mkdirSync(PROP_DIR, { recursive: true });

  const cards = resolveCards();
  const routes = new Map();

  const server = createServer((req, res) => {
    const p = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
    if (routes.has(p)) {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(routes.get(p));
      return;
    }
    let file = null;
    if (p.startsWith("/fonts/")) file = join(ROOT, "src", p);
    else if (p.startsWith("/src/")) file = join(ROOT, p.slice(1));
    else if (p.startsWith("/cache/")) file = join(CACHE, p.slice("/cache/".length));
    if (file && existsSync(file)) {
      res.writeHead(200, { "content-type": MIME[extname(file)] || "application/octet-stream" });
      res.end(readFileSync(file));
      return;
    }
    res.writeHead(404);
    res.end("not found");
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchBrowser();

  try {
    // 1) Export 3D WebGL medals + CLAY props
    routes.set("/export.html", spriteExporterHtml());
    const ctx = await browser.newContext({ viewport: { width: 1000, height: 1000, deviceScaleFactor: 1, mobile: false } });
    await ctx.goto(`${baseUrl}/export.html`);
    const exported = await ctx.evalJs("window.exportAssets()");
    for (const [tier, dataUrl] of Object.entries(exported.medals)) {
      const b64 = dataUrl.split(",")[1];
      writeFileSync(join(MEDAL_DIR, `medal-${tier}.png`), Buffer.from(b64, "base64"));
    }
    for (const [id, dataUrl] of Object.entries(exported.props)) {
      const b64 = dataUrl.split(",")[1];
      writeFileSync(join(PROP_DIR, `${id}.png`), Buffer.from(b64, "base64"));
    }
    console.log("Exported 3D medals & CLAY props");

    const pdfParams = {
      printBackground: true,
      preferCSSPageSize: true,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      paperWidth: 96 / 25.4,
      paperHeight: 166 / 25.4,
      scale: 1,
    };

    // 2) Render 7 Front Artwork PDFs
    for (const card of cards) {
      const route = `/front-${card.slug}.html`;
      routes.set(route, buildFrontHtml(card));
      await ctx.goto(`${baseUrl}${route}`);
      await ctx.evalJs("document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))");
      const { data } = await ctx.cdp("Page.printToPDF", pdfParams);
      const outPdf = join(ART_PDF_DIR, `front-${card.slug}.pdf`);
      writeFileSync(outPdf, Buffer.from(data, "base64"));
      console.log(`Rendered artwork PDF: front-${card.slug}.pdf`);
    }

    // 3) Render Universal Back Artwork PDF
    routes.set("/back.html", buildBackHtml());
    await ctx.goto(`${baseUrl}/back.html`);
    await ctx.evalJs("document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))");
    const { data: backData } = await ctx.cdp("Page.printToPDF", pdfParams);
    writeFileSync(join(ART_PDF_DIR, "universal-back.pdf"), Buffer.from(backData, "base64"));
    console.log("Rendered artwork PDF: universal-back.pdf");

    await ctx.close();
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
