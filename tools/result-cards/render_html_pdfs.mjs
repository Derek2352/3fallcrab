// Renders the 7 Front Result Cards and 1 Universal Back Card as high-precision 96 mm x 114 mm
// (90 mm x 108 mm trim + 3 mm bleed) Artwork PDFs using headless Chromium (CDP),
// self-hosted web fonts, Three.js 3D medals, CLAY engine sprites, and crisp vector SVG QR codes.

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

function qrSvgString(text, { dark = "#171A33", light = "#FFFFFF", quiet = 3, className = "" } = {}) {
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

function grainSvg(seedStart = 11, wMm = 96, hMm = 41) {
  let seed = seedStart;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let dots = "";
  for (let i = 0; i < 520; i++) {
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

  const zhLen = Array.from(card.verdict.zh).length;
  const zhSvgSize = zhLen >= 6 ? 17.5 : 20;
  const enTitleSize = card.verdict.en.length >= 24 ? "6.1pt" : "6.8pt";
  const billingStr = `領銜主演  ${card.playerName}  ·  ${card.personaZh} ${card.comboEn}`;
  const billingSize = billingStr.length > 36 ? "5.6pt" : "6.0pt";
  const stageSize = stageLabel.length > 14 ? "6.9pt" : "7.8pt";
  const savedSize = card.formattedScore.length >= 9 ? "10.6pt" : "11.4pt";

  // Subtle 35mm cinema sprocket perforations along outer wings of the zoomed-out poster frame
  const sprockets = Array.from({ length: 11 }, (_, i) => `<i style="top:${(9.2 + i * 5.6).toFixed(1)}mm"></i>`).join("");

  return `<!doctype html>
<html lang="zh-HK">
<head>
<meta charset="utf-8">
<style>
${fontFacesCss()}
@page { size: 96mm 114mm; margin: 0; }
* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0; width: 96mm; height: 114mm; overflow: hidden;
  background: #0B0C17;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.page { position: relative; width: 96mm; height: 114mm; overflow: hidden; }
.top-stage {
  position: absolute; left: 0; top: 0; width: 96mm; height: 75mm;
  overflow: hidden; background: #13162D;
}
.ambient-bg {
  position: absolute; left: 0; top: 0; width: 96mm; height: 74mm;
  object-fit: cover; display: block;
}
.stage-vignette {
  position: absolute; inset: 0;
  background: radial-gradient(54mm 42mm at 50% 48%, rgba(23,26,51,0.0) 40%, rgba(11,12,23,0.58) 100%);
}
.cinema-frame {
  position: absolute; left: 8.5mm; right: 8.5mm; top: 5.5mm; height: 65.5mm;
  border: 0.25mm solid rgba(201, 163, 90, 0.34);
  border-radius: 2.6mm;
  pointer-events: none;
}
.sprockets-l, .sprockets-r {
  position: absolute; top: 0; width: 2.8mm; height: 72mm; pointer-events: none;
}
.sprockets-l { left: 10.3mm; }
.sprockets-r { right: 10.3mm; }
.sprockets-l i, .sprockets-r i {
  position: absolute; left: 0; width: 2.8mm; height: 2.0mm;
  border-radius: 0.5mm;
  background: rgba(246, 240, 216, 0.16);
  border: 0.16mm solid rgba(201, 163, 90, 0.28);
}
.poster-wrap {
  position: absolute; left: 50%; top: 6.2mm; transform: translateX(-50%);
  width: 51.2mm; height: 64.0mm;
  border-radius: 2.0mm;
  overflow: hidden;
  border: 0.35mm solid rgba(232, 201, 138, 0.78);
  box-shadow: 0 1.4mm 4.2mm rgba(0, 0, 0, 0.68);
}
.poster-sharp {
  width: 100%; height: 100%; object-fit: cover; display: block;
}

.stub {
  position: absolute; left: 0; top: 73.0mm; width: 96mm; height: 41.0mm;
  background: linear-gradient(180deg, #171A33 0%, #0B0C17 100%);
  color: #F6F0D8;
  overflow: hidden;
}
.grain-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.perf-line {
  position: absolute; left: 8.5mm; right: 8.5mm; top: 0;
  border-top: 0.32mm dashed rgba(246, 240, 216, 0.48);
}
.stub-inner {
  position: absolute;
  left: 8.5mm; right: 8.5mm; top: 3.1mm; bottom: 7.5mm;
  display: flex; flex-direction: column; justify-content: space-between;
}
.hdr {
  display: flex; align-items: baseline; justify-content: space-between; line-height: 1;
}
.gold-label {
  font-family: ${fSans}; font-weight: 800; font-size: 4.4pt;
  letter-spacing: 0.30mm; color: #C9A35A; text-transform: uppercase;
}
.hdr-mid {
  font-family: ${fZh}; font-weight: 500; font-size: 4.2pt; color: #B5AFC4;
}
.verdict-row {
  display: flex; align-items: center; gap: 2.0mm;
}
.medal-pic {
  width: 9.0mm; height: 10.6mm; flex: none; object-fit: contain;
  filter: drop-shadow(0 0.5mm 0.9mm rgba(0,0,0,0.55));
}
.verdict-text { min-width: 0; flex: 1; }
.title-zh-svg {
  display: block; width: 100%; height: 4.3mm; overflow: visible;
}
.title-zh-txt {
  font-family: ${fZh}; font-weight: 700;
}
.title-en {
  margin: 0.15mm 0 0; font-family: ${fSerif}; font-style: italic; font-weight: 700;
  font-size: ${enTitleSize}; line-height: 1.08; color: #E8C98A; white-space: nowrap;
}
.roast {
  margin: 0.3mm 0 0; font-family: ${fZh}; font-weight: 500; font-size: 5.4pt;
  line-height: 1.12; color: #C3BDD3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.rule {
  height: 0.20mm; width: 100%; background: rgba(201, 163, 90, 0.45);
}
.metrics {
  display: grid; grid-template-columns: 27.5mm 1fr 19.5mm; align-items: start; gap: 2.0mm;
}
.m-label { display: block; margin-bottom: 0.4mm; }
.saved-val {
  font-family: ${fSerif}; font-weight: 700; font-size: ${savedSize}; line-height: 1.02;
  color: #FFD98A; white-space: nowrap;
}
.stage-val {
  font-family: ${fZh}; font-weight: 700; font-size: ${stageSize}; line-height: 1.05;
  color: #F6F0D8; white-space: nowrap;
}
.best-val {
  margin-top: 0.3mm; font-family: ${fZh}; font-weight: 500; font-size: 5.0pt;
  line-height: 1.08; color: #B5AFC4;
}
.falls-wrap { text-align: right; }
.falls-row {
  display: flex; justify-content: flex-end; gap: 1.1mm; margin-top: 0.25mm;
}
.fall-badge {
  width: 3.9mm; height: 3.9mm; border-radius: 50%;
  border: 0.25mm solid rgba(255,255,255,0.88);
  display: inline-flex; align-items: center; justify-content: center;
  font-family: ${fDisplay}; font-weight: 900; font-size: 4.8pt; line-height: 1; color: #FFFFFF;
}
.billing { text-align: center; line-height: 1.14; }
.billing-main {
  font-family: ${fZh}; font-weight: 700; font-size: ${billingSize};
  color: #F6F0D8; letter-spacing: 0.10mm; white-space: nowrap;
}
.billing-sub {
  margin-top: 0.2mm; font-family: ${fZh}; font-weight: 500; font-size: 4.8pt; color: #B5AFC4;
}
.dash-foot {
  border-top: 0.28mm dashed rgba(246, 240, 216, 0.42);
}
.foot {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 0.25mm;
}
.foot-left { display: flex; align-items: center; gap: 1.1mm; }
.mini-qr-svg { width: 4.4mm; height: 4.4mm; display: block; border-radius: 0.35mm; }
.bc-col { display: flex; flex-direction: column; align-items: center; width: 11.5mm; }
.barcode { width: 11.5mm; height: 2.6mm; display: block; }
.bc-no {
  margin-top: 0.3mm; font-family: ${fSans}; font-weight: 700; font-size: 3.3pt;
  letter-spacing: 0.20mm; color: #B5AFC4; line-height: 1;
}
.sil-svg { width: 2.7mm; height: 3.9mm; display: block; }
.foot-url {
  font-family: ${fDisplay}; font-weight: 900; font-size: 8.1pt; line-height: 1;
  color: #FF7AB4; letter-spacing: 0.04mm;
}
.foot-right { text-align: right; line-height: 1.22; }
.foot-right div {
  font-family: ${fSans}; font-weight: 800; font-size: 4.1pt; letter-spacing: 0.22mm; color: #C9A35A;
}
</style>
</head>
<body>
<div class="page">
  <div class="top-stage">
    <img class="ambient-bg" src="/cache/posters/${card.poster}-ambient.jpg" alt="">
    <div class="stage-vignette"></div>
    <div class="cinema-frame"></div>
    <div class="sprockets-l">${sprockets}</div>
    <div class="sprockets-r">${sprockets}</div>
    <div class="poster-wrap">
      <img class="poster-sharp" src="/cache/posters/${card.poster}-sharp.jpg" alt="">
    </div>
  </div>

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
          <span class="gold-label" style="display:block;margin-bottom:0.25mm;">我的稱號 · MY TITLE</span>
          <svg class="title-zh-svg" viewBox="0 0 240 22" preserveAspectRatio="xMinYMid meet" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="goldFoil" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FFF8DC"/>
                <stop offset="48%" stop-color="#FFE08A"/>
                <stop offset="85%" stop-color="#D4A24C"/>
                <stop offset="100%" stop-color="#FFFDF0"/>
              </linearGradient>
            </defs>
            <text class="title-zh-txt" x="0" y="18" fill="url(#goldFoil)" font-size="${zhSvgSize}">${escapeHtml(card.verdict.zh)}</text>
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

  const harbourSvg = `
  <svg class="harbour-svg" viewBox="0 0 96 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <defs>
      <linearGradient id="skyBack" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(127,211,255,0)"/>
        <stop offset="55%" stop-color="rgba(142,219,255,0.40)"/>
        <stop offset="100%" stop-color="rgba(58,155,240,0.30)"/>
      </linearGradient>
    </defs>
    <rect width="96" height="24" fill="url(#skyBack)"/>
    <path d="M0 19 Q14 12 26 15 Q38 9 52 14 Q68 10 82 14 L96 16 L96 24 L0 24 Z" fill="rgba(76,195,106,0.20)"/>
    <g fill="rgba(58,155,240,0.22)">
      <rect x="3" y="10" width="7" height="14" rx="0.8"/>
      <rect x="11" y="7" width="6" height="17" rx="0.8"/>
      <polygon points="21,24 21,11 25,5 29,11 29,24"/>
      <rect x="32" y="9" width="7" height="15" rx="0.8"/>
      <rect x="44" y="4" width="8" height="20" rx="1.2"/>
      <rect x="55" y="8" width="7" height="16" rx="0.8"/>
      <rect x="65" y="7" width="7" height="17" rx="0.8"/>
      <rect x="75" y="10" width="6" height="14" rx="0.8"/>
      <rect x="83" y="6" width="8" height="18" rx="0.8"/>
    </g>
    <path d="M0 19.5 Q12 18 24 19.5 T48 19.5 T72 19.5 T96 19.5 L96 24 L0 24 Z" fill="rgba(58,155,240,0.36)"/>
  </svg>`;

  const letters = [
    ["3", "#FF5FA2", -6, "0", "0.7mm"],
    ["F", "#3A9BF0", 0, "0", "0"],
    ["a", "#4CC36A", 0, "0.3mm", "0"],
    ["l", "#FF7B35", 0, "0", "0"],
    ["l", "#8B6CF2", 4, "0", "0.6mm"],
    ["F", "#F2463E", 0, "0", "0"],
    ["u", "#20C1B3", 0, "-0.25mm", "0"],
    ["n", "#FF5FA2", 5, "0", "0"],
  ];

  return `<!doctype html>
<html lang="zh-HK">
<head>
<meta charset="utf-8">
<style>
${fontFacesCss()}
@page { size: 96mm 114mm; margin: 0; }
* { box-sizing: border-box; }
html, body {
  margin: 0; padding: 0; width: 96mm; height: 114mm; overflow: hidden;
  background: #FFD23F;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.page { position: relative; width: 96mm; height: 114mm; overflow: hidden; }
.top-zone {
  position: absolute; left: 0; top: 0; width: 96mm; height: 73.0mm;
  background-color: #FFD23F;
  background-image:
    radial-gradient(66mm 36mm at 50% 62%, rgba(255, 250, 224, 0.72) 0%, rgba(255, 250, 224, 0) 75%),
    radial-gradient(80mm 34mm at 50% 0%, #FFE682 0%, rgba(255, 230, 130, 0) 72%),
    radial-gradient(circle at 12% 18%, rgba(255,255,255,0.42) 0 0.5mm, transparent 0.65mm),
    radial-gradient(circle at 72% 60%, rgba(160,90,10,0.09) 0 0.5mm, transparent 0.65mm);
  background-size: auto, auto, 9.0mm 9.0mm, 11.0mm 11.0mm;
  overflow: hidden;
}
.harbour-svg {
  position: absolute; left: 0; top: 15.5mm; width: 96mm; height: 22mm;
  pointer-events: none;
}
.header {
  position: relative; z-index: 3;
  padding-top: 7.5mm; text-align: center;
  width: 56mm; margin: 0 auto;
}
.edition-pill {
  display: inline-block;
  padding: 0.6mm 2.4mm;
  border-radius: 999px;
  background: #25317A;
  color: #FFE45C;
  font-family: ${fSans}; font-weight: 800; font-size: 4.1pt; letter-spacing: 0.25mm;
  box-shadow: 0 0.4mm 0 rgba(0,0,0,0.16);
}
.word {
  margin: 1.1mm 0 0;
  font-family: ${fDisplay}; font-weight: 900; font-size: 18.0pt; line-height: 0.92;
  white-space: nowrap;
}
.word span {
  display: inline-block;
  -webkit-text-stroke: 0.72mm #FFFDF7;
  paint-order: stroke fill;
  filter: drop-shadow(0 0.5mm 0 rgba(37, 49, 122, 0.28));
}
.zh-title {
  margin: 0.4mm 0 0;
  font-family: ${fZh}; font-weight: 700; font-size: 9.8pt; line-height: 1.08;
  letter-spacing: 1.2mm; color: #25317A;
  text-shadow: 0 0.3mm 0 rgba(255,255,255,0.75);
}
.tagline {
  margin: 0.35mm 0 0;
  font-family: ${fSans}; font-weight: 700; font-size: 4.6pt; color: #5B516C; white-space: nowrap;
}
/* Protagonists flanking header & perched on the yellow shelf right above the Dual-QR plaque */
.stage-cast {
  position: absolute; left: 3mm; right: 3mm; top: 8.0mm; height: 28.5mm; z-index: 6;
  pointer-events: none;
}
.cast-jack {
  position: absolute; left: 6.2mm; bottom: 0; height: 26.2mm; width: auto;
  filter: drop-shadow(0 0.65mm 0.85mm rgba(60,30,15,0.28));
}
.cast-jackie {
  position: absolute; right: 6.2mm; bottom: 0; height: 26.2mm; width: auto;
  filter: drop-shadow(0 0.65mm 0.85mm rgba(60,30,15,0.28));
}
.prop-books {
  position: absolute; left: 19.5mm; bottom: 0; width: 9.2mm; height: auto;
  filter: drop-shadow(0 0.4mm 0.55mm rgba(60,30,15,0.24));
}
.prop-bun {
  position: absolute; left: 21.0mm; bottom: 3.3mm; width: 6.2mm; height: auto;
  transform: rotate(-5deg);
  filter: drop-shadow(0 0.35mm 0.45mm rgba(60,30,15,0.22));
}
.prop-piggy {
  position: absolute; right: 19.2mm; bottom: 0; width: 8.8mm; height: auto;
  filter: drop-shadow(0 0.4mm 0.55mm rgba(60,30,15,0.24));
}
.prop-laisee {
  position: absolute; right: 27.6mm; bottom: 0.1mm; width: 6.8mm; height: auto;
  transform: rotate(-7deg);
  filter: drop-shadow(0 0.35mm 0.45mm rgba(60,30,15,0.22));
}
.cast-crab {
  position: absolute; left: 50%; bottom: 0; transform: translateX(-50%);
  width: 12.2mm; height: auto; z-index: 7;
  filter: drop-shadow(0 0.5mm 0.75mm rgba(60,30,15,0.30));
}
.platform-bar {
  position: absolute; left: 50%; top: 36.2mm; transform: translateX(-50%);
  width: 74mm; height: 2.8mm; z-index: 5;
  border-radius: 1.4mm;
  background: linear-gradient(180deg, #FFE169 0%, #FFC83D 65%, #E8A622 100%);
  border: 0.3mm solid #FFF6D6;
  box-shadow: 0 0.55mm 0 rgba(120,62,12,0.24);
  display: flex; align-items: center; justify-content: center; gap: 1.8mm;
  font-family: ${fZh}; font-weight: 700; font-size: 3.9pt; color: #25317A; letter-spacing: 0.15mm;
}
/* Centerpiece Dual-QR Collector Plaque right in the middle of the 90x108 mm card */
.qr-plaque {
  position: absolute; left: 9.5mm; right: 9.5mm; top: 38.4mm; height: 32.4mm; z-index: 4;
  background: #FFFDF7;
  border-radius: 3.4mm;
  border: 0.45mm solid #F2CB6B;
  box-shadow: 0 1.1mm 0 rgba(120, 62, 12, 0.24), 0 2.4mm 4.0mm rgba(120, 62, 12, 0.14);
  padding: 1.8mm 3.0mm 1.6mm;
  display: flex; flex-direction: column; justify-content: space-between;
}
.qr-head {
  text-align: center;
  font-family: ${fZh}; font-weight: 700; font-size: 4.8pt; color: #25317A; letter-spacing: 0.20mm;
}
.qr-grid {
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1.8mm;
}
.qr-sep {
  width: 0.22mm; height: 24.5mm; background: linear-gradient(180deg, transparent, #E6D3A8 20%, #E6D3A8 80%, transparent);
}
.qr-col {
  display: flex; flex-direction: column; align-items: center; text-align: center;
}
.qr-frame {
  width: 18.8mm; height: 18.8mm; padding: 0.65mm;
  background: #FFFFFF; border-radius: 1.8mm;
}
.qr-frame.game {
  border: 0.4mm solid #3A9BF0;
  box-shadow: 0 0.5mm 0 rgba(58, 155, 240, 0.20);
}
.qr-frame.ig {
  border: 0.4mm solid #FF5FA2;
  box-shadow: 0 0.5mm 0 rgba(255, 95, 162, 0.20);
}
.qr-svg { width: 100%; height: 100%; display: block; }
.qr-pill {
  margin-top: 1.0mm; padding: 0.45mm 2.2mm; border-radius: 999px;
  font-family: ${fSans}; font-weight: 900; font-size: 4.3pt; color: #FFFFFF; letter-spacing: 0.20mm;
}
.qr-pill.game { background: #2275C6; }
.qr-pill.ig { background: linear-gradient(90deg, #E1306C 0%, #F77737 100%); }
.qr-zh {
  margin-top: 0.65mm; font-family: ${fZh}; font-weight: 700; font-size: 4.9pt;
  line-height: 1.08; color: #2E2838; white-space: nowrap;
}
.qr-handle {
  margin-top: 0.3mm; font-family: ${fSans}; font-weight: 800; font-size: 4.5pt;
  line-height: 1.08; white-space: nowrap;
}
.qr-handle.game { color: #2275C6; }
.qr-handle.ig { color: #C12770; }

/* Bottom Ticket Stub matching front stub back-to-back */
.stub {
  position: absolute; left: 0; top: 73.0mm; width: 96mm; height: 41.0mm;
  background: linear-gradient(180deg, #171A33 0%, #0B0C17 100%);
  color: #F6F0D8; overflow: hidden;
}
.grain-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.perf-line {
  position: absolute; left: 8.5mm; right: 8.5mm; top: 0;
  border-top: 0.32mm dashed rgba(246, 240, 216, 0.48);
}
.stub-inner {
  position: absolute; left: 8.5mm; right: 8.5mm; top: 3.3mm; bottom: 7.5mm;
  display: flex; flex-direction: column; justify-content: space-between; text-align: center;
}
.gold-label {
  font-family: ${fSans}; font-weight: 800; font-size: 4.4pt;
  letter-spacing: 0.28mm; color: #C9A35A; text-transform: uppercase;
}
.falls-pills {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5mm;
}
.fpill {
  border-radius: 1.8mm; padding: 1.0mm 0.8mm;
  border: 0.22mm solid rgba(255,255,255,0.22);
  color: #FFFFFF;
}
.fpill b {
  display: block; font-family: ${fZh}; font-weight: 700; font-size: 5.8pt; line-height: 1.12;
}
.fpill small {
  display: block; margin-top: 0.2mm; font-family: ${fSans}; font-weight: 700;
  font-size: 4.0pt; opacity: 0.92;
}
.stages-strip {
  background: rgba(255,255,255,0.07);
  border: 0.20mm solid rgba(201,163,90,0.32);
  border-radius: 999px;
  padding: 0.8mm 2.0mm;
  font-family: ${fZh}; font-weight: 700; font-size: 4.6pt; color: #FFE7A0;
  white-space: nowrap;
}
.stages-strip span { color: #C9A35A; margin: 0 0.6mm; }
.quote-zh {
  font-family: ${fZh}; font-weight: 700; font-size: 5.8pt; color: #F6F0D8; line-height: 1.15;
}
.quote-en {
  margin-top: 0.2mm; font-family: ${fSans}; font-weight: 500; font-size: 4.6pt; color: #B5AFC4;
}
.rule { height: 0.20mm; width: 100%; background: rgba(201, 163, 90, 0.38); }
.credit-row {
  display: flex; justify-content: space-between; align-items: baseline;
  font-family: ${fZh}; font-size: 4.3pt;
}
.credit-row b { color: #C9A35A; font-family: ${fSans}; font-weight: 800; letter-spacing: 0.16mm; }
.credit-row span { color: #B5AFC4; }
</style>
</head>
<body>
<div class="page">
  <div class="top-zone">
    ${harbourSvg}
    <div class="header">
      <span class="edition-pill">SOUVENIR EDITION · HSUHK 2026</span>
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
    routes.set("/export.html", spriteExporterHtml());
    const ctx = await browser.newContext({ viewport: { width: 1000, height: 1000, deviceScaleFactor: 1, mobile: false } });
    await ctx.goto(`${baseUrl}/export.html`);
    const exported = await ctx.evalJs("window.exportAssets()");
    for (const [tier, dataUrl] of Object.entries(exported.medals)) {
      writeFileSync(join(MEDAL_DIR, `medal-${tier}.png`), Buffer.from(dataUrl.split(",")[1], "base64"));
    }
    for (const [id, dataUrl] of Object.entries(exported.props)) {
      writeFileSync(join(PROP_DIR, `${id}.png`), Buffer.from(dataUrl.split(",")[1], "base64"));
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
      paperHeight: 114 / 25.4,
      scale: 1,
    };

    for (const card of cards) {
      const route = `/front-${card.slug}.html`;
      routes.set(route, buildFrontHtml(card));
      await ctx.goto(`${baseUrl}${route}`);
      await ctx.evalJs("document.fonts.ready.then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))");
      const { data } = await ctx.cdp("Page.printToPDF", pdfParams);
      writeFileSync(join(ART_PDF_DIR, `front-${card.slug}.pdf`), Buffer.from(data, "base64"));
      console.log(`Rendered artwork PDF: front-${card.slug}.pdf`);
    }

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
