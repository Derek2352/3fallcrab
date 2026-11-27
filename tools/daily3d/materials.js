// Procedural CanvasTextures, tactile clay PBR materials, and sculpted geometry helpers for Harbour Keep 3D.
// 100% CSP-safe (zero external assets/URLs) and tuned for crisp SwiftShader + mobile WebGL performance.
import {
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  EquirectangularReflectionMapping,
  ExtrudeGeometry,
  LatheGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  RepeatWrapping,
  Shape,
  SRGBColorSpace,
  TubeGeometry,
  Vector2,
  Vector3,
} from "three";

const CJK_FONT = '"Noto Sans HK", "PingFang HK", "Microsoft JhengHei", sans-serif';
const DISP_FONT = '"Gluten", "Trebuchet MS", "Arial Rounded MT Bold", sans-serif';

function makeCanvas(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  draw(g, w, h);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

function makeLinearCanvas(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  draw(g, w, h);
  const t = new CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

// Deterministic fast PRNG for organic clay grain & wood textures
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function buildTextures() {
  const cache = new Map();
  const builders = {
    clayBump() {
      const t = makeLinearCanvas(256, 256, (g, w, h) => {
        const r = rng(1337);
        g.fillStyle = "#808080";
        g.fillRect(0, 0, w, h);
        // Subtle hand-rubbed clay tool strokes
        for (let i = 0; i < 160; i++) {
          const x = r() * w;
          const y = r() * h;
          const v = Math.floor(118 + r() * 20);
          g.strokeStyle = `rgba(${v},${v},${v},0.22)`;
          g.lineWidth = 1.5 + r() * 3;
          g.beginPath();
          g.moveTo(x, y);
          g.quadraticCurveTo(x + (r() - 0.5) * 28, y + (r() - 0.5) * 16, x + (r() - 0.5) * 40, y + (r() - 0.5) * 24);
          g.stroke();
        }
        // Soft sculptural micro-dimples & mineral stipple
        for (let i = 0; i < 820; i++) {
          const x = r() * w;
          const y = r() * h;
          const rad = 1.2 + r() * 4.8;
          const v = Math.floor(108 + r() * 42);
          g.fillStyle = `rgba(${v},${v},${v},0.3)`;
          g.beginPath();
          g.arc(x, y, rad, 0, Math.PI * 2);
          g.fill();
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    },

    clayRough() {
      const t = makeLinearCanvas(256, 256, (g, w, h) => {
        const r = rng(2026);
        g.fillStyle = "#dcdcdc";
        g.fillRect(0, 0, w, h);
        for (let i = 0; i < 480; i++) {
          const v = Math.floor(196 + r() * 54);
          g.fillStyle = `rgba(${v},${v},${v},0.26)`;
          g.beginPath();
          g.arc(r() * w, r() * h, 4 + r() * 14, 0, Math.PI * 2);
          g.fill();
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    },

    metalBrush() {
      const t = makeLinearCanvas(256, 256, (g, w, h) => {
        const r = rng(909);
        g.fillStyle = "#c8c8c8";
        g.fillRect(0, 0, w, h);
        for (let y = 0; y < h; y += 2) {
          const v = Math.floor(170 + r() * 72);
          g.fillStyle = `rgba(${v},${v},${v},0.35)`;
          g.fillRect(0, y, w, 1 + r() * 1.4);
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    },

    woodPlank() {
      const t = makeCanvas(512, 512, (g, w, h) => {
        const r = rng(42);
        const planks = 6;
        const ph = h / planks;
        const shades = ["#d49f64", "#c78e52", "#daa86f", "#c3894e", "#d19b60", "#ce965a"];
        for (let i = 0; i < planks; i++) {
          const y0 = i * ph;
          const gr = g.createLinearGradient(0, y0, w, y0 + ph);
          gr.addColorStop(0, shades[i % shades.length]);
          gr.addColorStop(0.55, shades[(i + 2) % shades.length]);
          gr.addColorStop(1, shades[(i + 4) % shades.length]);
          g.fillStyle = gr;
          g.fillRect(0, y0, w, ph);
          // Fine teak wood grain & warm varnish sheen ribbons
          for (let k = 0; k < 22; k++) {
            const gy = y0 + 4 + r() * (ph - 8);
            g.strokeStyle = r() > 0.45 ? "rgba(102,58,22,0.18)" : "rgba(255,238,204,0.16)";
            g.lineWidth = 1.2 + r() * 2.2;
            g.beginPath();
            g.moveTo(0, gy);
            g.bezierCurveTo(w * 0.33, gy + (r() - 0.5) * 9, w * 0.66, gy + (r() - 0.5) * 9, w, gy);
            g.stroke();
          }
          // Subtle wood knot
          const kx = ((i * 157 + 90) % (w - 110)) + 55;
          const ky = y0 + ph * (0.35 + (i % 3) * 0.14);
          g.strokeStyle = "rgba(96,52,20,0.2)";
          g.lineWidth = 2;
          g.beginPath();
          g.ellipse(kx, ky, 18, 6, 0, 0, Math.PI * 2);
          g.stroke();
          // Crisp chamfered plank seam + highlight catchlight
          g.fillStyle = "rgba(68,36,14,0.48)";
          g.fillRect(0, y0, w, 4);
          g.fillStyle = "rgba(255,244,218,0.26)";
          g.fillRect(0, y0 + 4, w, 2.5);
          // Cross seam + brass nail heads
          const jx = ((i * 149 + 86) % (w - 84)) + 42;
          g.fillStyle = "rgba(68,36,14,0.38)";
          g.fillRect(jx, y0, 3.5, ph);
          for (const nx of [jx - 13, jx + 16]) {
            for (const ny of [y0 + 18, y0 + ph - 18]) {
              g.fillStyle = "#5c3b1e";
              g.beginPath(); g.arc(nx, ny, 4.6, 0, Math.PI * 2); g.fill();
              g.fillStyle = "#e8c474";
              g.beginPath(); g.arc(nx - 0.8, ny - 0.8, 2.6, 0, Math.PI * 2); g.fill();
              g.fillStyle = "#fff6cf";
              g.beginPath(); g.arc(nx - 1.5, ny - 1.5, 1.1, 0, Math.PI * 2); g.fill();
            }
          }
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    },

    stoneWall() {
      const t = makeCanvas(512, 256, (g, w, h) => {
        const r = rng(88);
        g.fillStyle = "#a59f93";
        g.fillRect(0, 0, w, h);
        const rows = 4;
        const rh = h / rows;
        const tones = ["#d3ccc0", "#c7c0b3", "#dcd5c9", "#bfb8ab", "#cec7ba"];
        for (let row = 0; row < rows; row++) {
          const y = row * rh;
          let x = (row % 2) * -56;
          while (x < w) {
            const bw = 88 + Math.floor(r() * 48);
            g.fillStyle = tones[Math.floor(r() * tones.length)];
            g.fillRect(x + 4, y + 4, bw - 8, rh - 8);
            // Granite mineral speckles
            for (let s = 0; s < 16; s++) {
              g.fillStyle = s % 2 ? "rgba(80,75,68,0.16)" : "rgba(255,252,246,0.22)";
              g.fillRect(x + 8 + r() * (bw - 18), y + 8 + r() * (rh - 18), 3, 2);
            }
            g.fillStyle = "rgba(255,252,244,0.28)";
            g.fillRect(x + 4, y + 4, bw - 8, 5);
            g.fillStyle = "rgba(62,58,52,0.25)";
            g.fillRect(x + 4, y + rh - 9, bw - 8, 5);
            x += bw;
          }
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(4, 1);
      return t;
    },

    pineappleCrust() {
      return makeCanvas(512, 512, (g, w, h) => {
        const gr = g.createRadialGradient(w * 0.48, h * 0.42, 28, w * 0.5, h * 0.5, w * 0.62);
        gr.addColorStop(0, "#ffe48c");
        gr.addColorStop(0.58, "#f3ae3c");
        gr.addColorStop(1, "#c76e1c");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        // Toasted HK Bo Lo Bao diamond sugar crackle crevices & glossy egg-wash facets
        const step = 64;
        g.strokeStyle = "#8f420c";
        g.lineWidth = 9;
        for (let i = -h; i < w + h; i += step) {
          g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke();
          g.beginPath(); g.moveTo(i, h); g.lineTo(i + h, 0); g.stroke();
        }
        g.strokeStyle = "rgba(255,248,210,0.6)";
        g.lineWidth = 3.5;
        for (let i = -h + 7; i < w + h; i += step) {
          g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke();
          g.beginPath(); g.moveTo(i, h); g.lineTo(i + h, 0); g.stroke();
        }
        // Subtle sugar crystal glint dots
        const r = rng(777);
        for (let i = 0; i < 140; i++) {
          g.fillStyle = "rgba(255,252,224,0.45)";
          g.beginPath();
          g.arc(r() * w, r() * h, 1.4 + r() * 1.8, 0, Math.PI * 2);
          g.fill();
        }
      });
    },

    riceSack() {
      return makeCanvas(512, 512, (g, w, h) => {
        g.fillStyle = "#f4e5c8";
        g.fillRect(0, 0, w, h);
        // Crisp burlap warp-and-weft textile weave
        for (let i = 0; i < w; i += 10) {
          g.strokeStyle = i % 20 === 0 ? "rgba(160,126,82,0.22)" : "rgba(255,250,238,0.24)";
          g.lineWidth = 3;
          g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke();
          g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke();
        }
        // Classic HK rice-sack stitched crimson stripes
        g.fillStyle = "#c9352b";
        g.fillRect(0, 48, w, 20);
        g.fillRect(0, h - 68, w, 20);
        g.fillStyle = "#2b7c6e";
        g.fillRect(0, 74, w, 6);
        g.fillRect(0, h - 78, w, 6);
        // Central stamped red-and-gold diamond emblem
        g.save();
        g.translate(w / 2, h / 2 + 4);
        g.fillStyle = "#fff9ed";
        g.strokeStyle = "#c9352b";
        g.lineWidth = 14;
        g.beginPath();
        g.moveTo(0, -134); g.lineTo(134, 0); g.lineTo(0, 134); g.lineTo(-134, 0);
        g.closePath();
        g.fill();
        g.stroke();
        g.strokeStyle = "#e09c2b";
        g.lineWidth = 4.5;
        g.beginPath();
        g.moveTo(0, -110); g.lineTo(110, 0); g.lineTo(0, 110); g.lineTo(-110, 0);
        g.closePath();
        g.stroke();
        g.fillStyle = "#b8241d";
        g.font = `900 142px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("米", 0, 8);
        g.restore();
      });
    },

    checkerTile() {
      const t = makeCanvas(256, 256, (g, w, h) => {
        const s = 64;
        for (let y = 0; y < h; y += s) {
          for (let x = 0; x < w; x += s) {
            const alt = ((x / s) + (y / s)) % 2 === 0;
            g.fillStyle = alt ? "#1d8b79" : "#fff7e5";
            g.fillRect(x, y, s, s);
            // Glazed ceramic bevel highlight + grout line
            g.fillStyle = "rgba(255,255,255,0.28)";
            g.fillRect(x + 3, y + 3, s - 6, 4);
            g.fillRect(x + 3, y + 3, 4, s - 6);
            g.strokeStyle = "rgba(38,52,48,0.22)";
            g.lineWidth = 3;
            g.strokeRect(x + 1.5, y + 1.5, s - 3, s - 3);
          }
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(3, 1.5);
      return t;
    },

    stripeRed() {
      const t = makeCanvas(256, 128, (g, w, h) => {
        const n = 8, sw = w / n;
        for (let i = 0; i < n; i++) {
          g.fillStyle = i % 2 === 0 ? "#df443a" : "#fff8eb";
          g.fillRect(i * sw, 0, sw, h);
        }
        // Subtle canvas awning weave + stitched gold trim
        g.fillStyle = "rgba(255,255,255,0.12)";
        for (let y = 0; y < h; y += 6) g.fillRect(0, y, w, 2);
        g.fillStyle = "#ffd15c";
        g.fillRect(0, h - 14, w, 14);
        g.strokeStyle = "#b83028";
        g.lineWidth = 2;
        g.setLineDash([6, 4]);
        g.beginPath(); g.moveTo(0, h - 17); g.lineTo(w, h - 17); g.stroke();
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      return t;
    },

    stripeCoral() {
      const t = makeCanvas(256, 128, (g, w, h) => {
        const n = 8, sw = w / n;
        for (let i = 0; i < n; i++) {
          g.fillStyle = i % 2 === 0 ? "#ff6b4a" : "#fff8eb";
          g.fillRect(i * sw, 0, sw, h);
        }
        g.fillStyle = "rgba(255,255,255,0.12)";
        for (let y = 0; y < h; y += 6) g.fillRect(0, y, w, 2);
        g.fillStyle = "#14968b";
        g.fillRect(0, h - 15, w, 15);
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      return t;
    },

    brick() {
      const t = makeCanvas(512, 512, (g, w, h) => {
        const r = rng(450);
        g.fillStyle = "#ddd1be";
        g.fillRect(0, 0, w, h);
        const rows = 10, rh = h / rows, bw = 84;
        const reds = ["#b84136", "#c44b3e", "#a9392f", "#cc5545", "#b23e33"];
        for (let row = 0; row < rows; row++) {
          const y = row * rh;
          let x = (row % 2) * (-bw * 0.5);
          while (x < w) {
            g.fillStyle = reds[Math.floor(r() * reds.length)];
            g.fillRect(x + 4, y + 4, bw - 8, rh - 8);
            g.fillStyle = "rgba(255,224,196,0.2)";
            g.fillRect(x + 4, y + 4, bw - 8, 5);
            g.fillStyle = "rgba(70,22,18,0.2)";
            g.fillRect(x + 4, y + rh - 9, bw - 8, 5);
            x += bw;
          }
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(1.5, 2.5);
      return t;
    },

    clockFace() {
      return makeCanvas(512, 512, (g, w, h) => {
        const cx = w / 2, cy = h / 2, rad = w * 0.45;
        const dial = g.createRadialGradient(cx, cy - 30, 24, cx, cy, rad + 12);
        dial.addColorStop(0, "#fffdf6");
        dial.addColorStop(0.85, "#fff4db");
        dial.addColorStop(1, "#e8d8b6");
        g.fillStyle = dial;
        g.beginPath(); g.arc(cx, cy, rad + 12, 0, Math.PI * 2); g.fill();
        g.strokeStyle = "#3a2e28";
        g.lineWidth = 14;
        g.beginPath(); g.arc(cx, cy, rad, 0, Math.PI * 2); g.stroke();
        g.strokeStyle = "#c89b3c";
        g.lineWidth = 6;
        g.beginPath(); g.arc(cx, cy, rad - 20, 0, Math.PI * 2); g.stroke();
        const numerals = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
        g.fillStyle = "#222430";
        g.textAlign = "center";
        g.textBaseline = "middle";
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI) / 6 - Math.PI / 2;
          g.strokeStyle = "#222430";
          g.lineWidth = i % 3 === 0 ? 10 : 5;
          g.beginPath();
          g.moveTo(cx + Math.cos(a) * (rad - 24), cy + Math.sin(a) * (rad - 24));
          g.lineTo(cx + Math.cos(a) * (rad - 48), cy + Math.sin(a) * (rad - 48));
          g.stroke();
          g.font = i % 3 === 0 ? "bold 46px Georgia, serif" : "bold 32px Georgia, serif";
          g.fillText(numerals[i], cx + Math.cos(a) * (rad - 80), cy + Math.sin(a) * (rad - 80));
        }
        g.strokeStyle = "#1b1d28";
        g.lineCap = "round";
        g.lineWidth = 18;
        g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx - 84, cy - 68); g.stroke();
        g.lineWidth = 12;
        g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + 116, cy - 88); g.stroke();
        g.fillStyle = "#d9a426";
        g.beginPath(); g.arc(cx, cy, 20, 0, Math.PI * 2); g.fill();
      });
    },

    badge18222() {
      return makeCanvas(512, 288, (g, w, h) => {
        const bg = g.createLinearGradient(0, 0, 0, h);
        bg.addColorStop(0, "#233368");
        bg.addColorStop(1, "#141e42");
        g.fillStyle = bg;
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#ffd45c";
        g.lineWidth = 14;
        g.strokeRect(14, 14, w - 28, h - 28);
        g.fillStyle = "#ff5c4a";
        g.fillRect(26, 26, w - 52, 68);
        g.fillStyle = "#fff9ec";
        g.font = `900 42px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("防騙易 ANTI-SCAM", w / 2, 62);
        g.fillStyle = "#ffe470";
        g.font = `900 124px ${DISP_FONT}`;
        g.fillText("18222", w / 2, 190);
      });
    },

    neonSign() {
      return makeCanvas(512, 288, (g, w, h) => {
        g.fillStyle = "#171c36";
        g.fillRect(0, 0, w, h);
        g.shadowColor = "#38f3dc";
        g.shadowBlur = 26;
        g.strokeStyle = "#5cffea";
        g.lineWidth = 13;
        g.strokeRect(18, 18, w - 36, h - 36);
        g.shadowColor = "#ff5fa8";
        g.shadowBlur = 28;
        g.strokeStyle = "#ff7eb8";
        g.lineWidth = 6;
        g.strokeRect(38, 38, w - 76, h - 76);
        g.fillStyle = "#ff8ac0";
        g.font = `900 112px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("茶餐廳", w / 2, 132);
        g.shadowColor = "#ffe26a";
        g.shadowBlur = 16;
        g.fillStyle = "#ffeb8e";
        g.font = `800 34px ${DISP_FONT}`;
        g.fillText("CHA CHAAN TENG", w / 2, 224);
      });
    },

    chalkboard() {
      return makeCanvas(512, 384, (g, w, h) => {
        g.fillStyle = "#22342e";
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#b87c42";
        g.lineWidth = 26;
        g.strokeRect(13, 13, w - 26, h - 26);
        g.strokeStyle = "rgba(255,232,175,0.3)";
        g.lineWidth = 4;
        g.strokeRect(36, 36, w - 72, h - 72);
        g.fillStyle = "#ffe588";
        g.font = `900 66px ${CJK_FONT}`;
        g.textAlign = "center";
        g.fillText("新鮮出爐", w / 2, 114);
        g.fillStyle = "#fff8eb";
        g.font = `700 58px ${CJK_FONT}`;
        g.fillText("菠蘿包 $8", w / 2, 212);
        g.fillStyle = "#ffc09c";
        g.font = `700 50px ${CJK_FONT}`;
        g.fillText("港式奶茶 $16", w / 2, 296);
      });
    },

    kioskScreen() {
      return makeCanvas(512, 384, (g, w, h) => {
        const gr = g.createLinearGradient(0, 0, 0, h);
        gr.addColorStop(0, "#125862");
        gr.addColorStop(1, "#0b323e");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        g.fillStyle = "#3bf0c8";
        g.font = `800 40px ${CJK_FONT}`;
        g.textAlign = "center";
        g.fillText("八達通 · 儲蓄餘額", w / 2, 68);
        g.fillStyle = "#fff7d2";
        g.font = `900 84px ${DISP_FONT}`;
        g.fillText("HK$1,888", w / 2, 170);
        const bars = [52, 80, 104, 128, 156];
        bars.forEach((bh, i) => {
          g.fillStyle = i === 4 ? "#ffd552" : "#34e2bc";
          g.fillRect(76 + i * 76, 344 - bh * 0.72, 48, bh * 0.72);
        });
      });
    },

    shopBanner() {
      return makeCanvas(512, 192, (g, w, h) => {
        const bg = g.createLinearGradient(0, 0, 0, h);
        bg.addColorStop(0, "#1b5953");
        bg.addColorStop(1, "#12403c");
        g.fillStyle = bg;
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#f4c652";
        g.lineWidth = 10;
        g.strokeRect(12, 12, w - 24, h - 24);
        g.fillStyle = "#ffe99a";
        g.font = `900 76px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("海傍小天地", w / 2, 76);
        g.fillStyle = "#fff7e8";
        g.font = `800 32px ${DISP_FONT}`;
        g.fillText("HARBOUR KEEP · 1/F", w / 2, 144);
      });
    },

    pierPlaque() {
      return makeCanvas(512, 160, (g, w, h) => {
        const gr = g.createLinearGradient(0, 0, w, h);
        gr.addColorStop(0, "#f7d262");
        gr.addColorStop(0.5, "#d89c2e");
        gr.addColorStop(1, "#f4cb58");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#6c4814";
        g.lineWidth = 10;
        g.strokeRect(12, 12, w - 24, h - 24);
        g.strokeStyle = "rgba(255,248,210,0.65)";
        g.lineWidth = 3;
        g.strokeRect(20, 20, w - 40, h - 40);
        g.fillStyle = "#2b1d0c";
        g.font = `900 56px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("海傍小天地", w / 2, 62);
        g.font = `800 26px ${DISP_FONT}`;
        g.fillText("VICTORIA HARBOUR KEEP", w / 2, 118);
      });
    },

    passbook() {
      return makeCanvas(256, 384, (g, w, h) => {
        g.fillStyle = "#14968b";
        g.fillRect(0, 0, w, h);
        g.fillStyle = "#fff7e6";
        g.fillRect(0, 88, w, 52);
        g.fillStyle = "#ffd354";
        g.fillRect(0, 140, w, 14);
        g.fillStyle = "#134d48";
        g.font = `900 40px ${CJK_FONT}`;
        g.textAlign = "center";
        g.fillText("儲蓄存摺", w / 2, 126);
        g.fillStyle = "#fff6e5";
        g.font = `800 32px ${DISP_FONT}`;
        g.fillText("SAVINGS", w / 2, 256);
      });
    },

    calcScreen() {
      return makeCanvas(256, 340, (g, w, h) => {
        g.fillStyle = "#eee5d4";
        g.fillRect(0, 0, w, h);
        g.fillStyle = "#a8cdb0";
        g.fillRect(22, 24, w - 44, 82);
        g.strokeStyle = "#485a4e";
        g.lineWidth = 6;
        g.strokeRect(22, 24, w - 44, 82);
        g.fillStyle = "#1b3324";
        g.font = "bold 38px monospace";
        g.textAlign = "right";
        g.fillText("APR 0%", w - 34, 78);
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            g.fillStyle = col === 3 ? "#f47e54" : (row === 0 ? "#14968b" : "#3a4556");
            const bx = 24 + col * 53, by = 128 + row * 48;
            g.fillRect(bx, by, 44, 38);
            g.fillStyle = "rgba(255,255,255,0.28)";
            g.fillRect(bx, by, 44, 7);
          }
        }
      });
    },

    tramSign() {
      return makeCanvas(512, 192, (g, w, h) => {
        g.fillStyle = "#145435";
        g.fillRect(0, 0, w, h);
        g.fillStyle = "#fff5dc";
        g.fillRect(16, 18, w - 32, h - 36);
        g.strokeStyle = "#d9a226";
        g.lineWidth = 8;
        g.strokeRect(24, 26, w - 48, h - 52);
        g.fillStyle = "#11442b";
        g.font = `900 62px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("堅尼地城 · 叮叮", w / 2, 78);
        g.font = `800 30px ${DISP_FONT}`;
        g.fillText("HK TRAMWAYS · DAY 30", w / 2, 136);
      });
    },

    laisee() {
      return makeCanvas(256, 320, (g, w, h) => {
        const gr = g.createLinearGradient(0, 0, w, h);
        gr.addColorStop(0, "#e3312c");
        gr.addColorStop(1, "#bc1f1f");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#ffd552";
        g.lineWidth = 10;
        g.strokeRect(18, 18, w - 36, h - 36);
        g.fillStyle = "#ffd552";
        g.beginPath(); g.arc(w / 2, h / 2, 68, 0, Math.PI * 2); g.fill();
        g.fillStyle = "#b81d1d";
        g.font = `900 68px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("大吉", w / 2, h / 2 + 4);
      });
    },

    coinFace() {
      return makeCanvas(256, 256, (g, w, h) => {
        const cx = w / 2, cy = h / 2;
        const gr = g.createRadialGradient(cx - 24, cy - 24, 16, cx, cy, 120);
        gr.addColorStop(0, "#fff4a8");
        gr.addColorStop(0.58, "#f7be34");
        gr.addColorStop(1, "#c27c0e");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#fff6be";
        g.lineWidth = 9;
        g.beginPath(); g.arc(cx, cy, 102, 0, Math.PI * 2); g.stroke();
        g.strokeStyle = "#a8680a";
        g.lineWidth = 3;
        g.beginPath(); g.arc(cx, cy, 88, 0, Math.PI * 2); g.stroke();
        g.fillStyle = "#ffe984";
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          g.save();
          g.translate(cx + Math.cos(a) * 36, cy + Math.sin(a) * 36);
          g.rotate(a);
          g.beginPath();
          g.ellipse(0, 0, 28, 14, 0, 0, Math.PI * 2);
          g.fill();
          g.restore();
        }
        g.fillStyle = "#b3730e";
        g.beginPath(); g.arc(cx, cy, 15, 0, Math.PI * 2); g.fill();
      });
    },

    waterRipple() {
      const t = makeCanvas(256, 256, (g, w, h) => {
        g.clearRect(0, 0, w, h);
        const cx = w / 2, cy = h / 2;
        for (let i = 1; i <= 5; i++) {
          const rad = 22 + i * 21;
          g.strokeStyle = `rgba(230,252,255,${0.28 - i * 0.035})`;
          g.lineWidth = i === 1 ? 5 : 3;
          g.setLineDash([28, 16, 14, 18]);
          g.beginPath();
          g.arc(cx, cy, rad, i * 0.4, Math.PI * 2 + i * 0.4);
          g.stroke();
        }
      });
      return t;
    },

    shadowDisc() {
      return makeCanvas(128, 128, (g, w, h) => {
        const cx = w / 2, cy = h / 2;
        const gr = g.createRadialGradient(cx, cy, 6, cx, cy, w * 0.48);
        gr.addColorStop(0, "rgba(22,30,52,0.58)");
        gr.addColorStop(0.55, "rgba(22,30,52,0.24)");
        gr.addColorStop(1, "rgba(22,30,52,0)");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
      });
    },

    coasterDial() {
      return makeCanvas(512, 512, (g, w, h) => {
        const cx = w / 2, cy = h / 2;
        const gr = g.createRadialGradient(cx - 24, cy - 28, 22, cx, cy, w * 0.5);
        gr.addColorStop(0, "#ebd1a8");
        gr.addColorStop(0.55, "#c59056");
        gr.addColorStop(0.86, "#96602e");
        gr.addColorStop(1, "#6f411a");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        // Subtle hand-rubbed walnut rings
        g.strokeStyle = "rgba(86,46,16,0.16)";
        g.lineWidth = 3;
        for (let r = 34; r < 240; r += 20) {
          g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
        }
        // Double brushed-brass compass inlay ring + 36 ticks + cardinal pips
        g.strokeStyle = "#f4d272";
        g.lineWidth = 7;
        g.beginPath(); g.arc(cx, cy, 214, 0, Math.PI * 2); g.stroke();
        g.lineWidth = 3.5;
        g.beginPath(); g.arc(cx, cy, 192, 0, Math.PI * 2); g.stroke();
        for (let i = 0; i < 36; i++) {
          const a = (i * Math.PI * 2) / 36;
          const card = i % 9 === 0;
          const maj = i % 3 === 0;
          const r0 = card ? 168 : (maj ? 176 : 184);
          g.lineWidth = card ? 6 : (maj ? 3.5 : 2);
          g.beginPath();
          g.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
          g.lineTo(cx + Math.cos(a) * 208, cy + Math.sin(a) * 208);
          g.stroke();
        }
        // Satin felt-like center presentation pad
        g.strokeStyle = "rgba(255,244,212,0.34)";
        g.lineWidth = 3;
        g.beginPath(); g.arc(cx, cy, 126, 0, Math.PI * 2); g.stroke();
      });
    },

    trophy100() {
      return makeCanvas(512, 192, (g, w, h) => {
        const gr = g.createLinearGradient(0, 0, w, h);
        gr.addColorStop(0, "#f5c442");
        gr.addColorStop(0.5, "#cf8f1a");
        gr.addColorStop(1, "#f2bf3c");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#fff5b8";
        g.lineWidth = 10;
        g.strokeRect(14, 14, w - 28, h - 28);
        g.fillStyle = "#3a2204";
        g.font = `900 84px ${DISP_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("100 DAYS", w / 2, h / 2 + 4);
      });
    },
  };

  return {
    get(key) {
      if (!cache.has(key)) {
        const fn = builders[key];
        if (!fn) throw new Error("Unknown texture: " + key);
        cache.set(key, fn());
      }
      return cache.get(key);
    },
    dispose() {
      for (const t of cache.values()) t.dispose();
      cache.clear();
    },
  };
}

export function makeStudioEnv(sky = "day") {
  const palettes = {
    day: ["#ffffff", "#d8f4ff", "#ffeecd", "#82c5cc"],
    dusk: ["#ffe7c2", "#ffab8a", "#c88ec4", "#554c82"],
    night: ["#95b4ff", "#3b5294", "#272e62", "#161a38"],
  };
  const p = palettes[sky] || palettes.day;
  const t = makeCanvas(256, 128, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, p[0]);
    gr.addColorStop(0.36, p[1]);
    gr.addColorStop(0.62, p[2]);
    gr.addColorStop(1, p[3]);
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
    // Crisp horizon bounce ribbon for glossy bevels & glazed vehicles
    const hor = g.createLinearGradient(0, h * 0.44, 0, h * 0.58);
    hor.addColorStop(0, "rgba(255,255,255,0)");
    hor.addColorStop(0.5, sky === "night" ? "rgba(130,210,255,0.45)" : "rgba(255,252,240,0.68)");
    hor.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = hor;
    g.fillRect(0, h * 0.44, w, h * 0.14);
    // Soft radial key & rim studio softboxes for natural 360-degree ceramic & brass reflections
    const box = (cx, cy, r, col) => {
      const rg = g.createRadialGradient(cx, cy, r * 0.1, cx, cy, r);
      rg.addColorStop(0, col);
      rg.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = rg;
      g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill();
    };
    box(w * 0.24, h * 0.2, 34, sky === "night" ? "rgba(200,228,255,0.9)" : "rgba(255,255,255,0.95)");
    box(w * 0.72, h * 0.24, 28, sky === "dusk" ? "rgba(255,214,170,0.85)" : "rgba(255,255,255,0.82)");
    box(w * 0.5, h * 0.08, 26, "rgba(255,255,255,0.75)");
  });
  t.mapping = EquirectangularReflectionMapping;
  return t;
}

export function makeSkyTex(sky = "day") {
  const cfgs = {
    day: {
      stops: [[0.0, "#4ca9e6"], [0.34, "#7cd0f5"], [0.5, "#c9eef6"], [0.68, "#d9f4eb"], [1.0, "#63b7c6"]],
      haze: "rgba(255,250,238,0.34)",
    },
    dusk: {
      stops: [[0.0, "#382f72"], [0.27, "#8e589a"], [0.48, "#f08a6d"], [0.64, "#ffd18c"], [1.0, "#4a4375"]],
      haze: "rgba(255,218,162,0.3)",
    },
    night: {
      stops: [[0.0, "#0b112c"], [0.34, "#16214f"], [0.53, "#273774"], [0.7, "#1f2e62"], [1.0, "#0c1532"]],
      haze: "rgba(110,162,235,0.18)",
    },
  };
  const cfg = cfgs[sky] || cfgs.day;
  return makeCanvas(64, 512, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    for (const [at, col] of cfg.stops) gr.addColorStop(at, col);
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);

    // Silky-smooth horizon atmospheric haze ribbon (zero polygon staircase artifacts)
    const mist = g.createLinearGradient(0, h * 0.42, 0, h * 0.62);
    mist.addColorStop(0, "rgba(255,255,255,0)");
    mist.addColorStop(0.55, cfg.haze);
    mist.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = mist;
    g.fillRect(0, h * 0.42, w, h * 0.2);
  });
}

export function createKit(kitOpts = {}) {
  const tex = buildTextures();
  const mats = new Map();
  const emissives = [];
  const soft = !!kitOpts.softwareGL;
  const bump = soft ? null : tex.get("clayBump");
  const roughMap = soft ? null : tex.get("clayRough");
  const brushMap = soft ? null : tex.get("metalBrush");

  function cached(key, factory) {
    if (!mats.has(key)) mats.set(key, factory());
    return mats.get(key);
  }

  function sheenFor(hex, mix = 0.52) {
    return new Color(hex).lerp(new Color(0xfff7ea), mix);
  }

  const kit = {
    tex,
    emissives,

    // Satin hand-rubbed polymer clay with warm velvety sheen & subtle wax buff on GPU
    clay(hex, opts = {}) {
      const k = `clay:${hex}:${opts.rough ?? 0.46}:${opts.flat ? 1 : 0}:${opts.side ?? 0}`;
      return cached(k, () => {
        if (soft) {
          return new MeshStandardMaterial({
            color: hex,
            roughness: opts.rough ?? 0.46,
            metalness: opts.metalness ?? 0.03,
            envMapIntensity: 0.78,
            flatShading: !!opts.flat,
            side: opts.side || 0,
          });
        }
        return new MeshPhysicalMaterial({
          color: hex,
          roughness: opts.rough ?? 0.48,
          roughnessMap: opts.noBump ? null : roughMap,
          metalness: opts.metalness ?? 0.02,
          bumpMap: opts.noBump ? null : bump,
          bumpScale: opts.noBump ? 0 : 0.007,
          clearcoat: 0.14,
          clearcoatRoughness: 0.45,
          sheen: 0.36,
          sheenRoughness: 0.58,
          sheenColor: sheenFor(hex, 0.55),
          envMapIntensity: 0.85,
          flatShading: !!opts.flat,
          side: opts.side || 0,
        });
      });
    },

    // Kiln-fired glazed porcelain with crisp clearcoat catchlights
    gloss(hex, opts = {}) {
      const k = `gloss:${hex}:${opts.rough ?? 0.16}`;
      return cached(k, () => {
        if (soft) {
          return new MeshStandardMaterial({
            color: hex,
            roughness: opts.rough ?? 0.16,
            metalness: opts.metalness ?? 0.08,
            envMapIntensity: 1.15,
          });
        }
        return new MeshPhysicalMaterial({
          color: hex,
          roughness: opts.rough ?? 0.15,
          metalness: opts.metalness ?? 0.03,
          clearcoat: 0.92,
          clearcoatRoughness: 0.07,
          ior: 1.54,
          reflectivity: 0.78,
          envMapIntensity: 1.32,
        });
      });
    },

    // Collector lacquered enamel paint (for Tram, Star Ferry, Kiosk, Lighthouse, Crab shell!)
    enamel(hex, opts = {}) {
      const k = `enamel:${hex}:${opts.rough ?? 0.24}:${opts.metalness ?? ""}:${opts.side ?? 0}`;
      return cached(k, () => {
        if (soft) {
          return new MeshStandardMaterial({
            color: hex,
            roughness: opts.rough ?? 0.24,
            metalness: Math.min(0.14, opts.metalness ?? 0.08),
            envMapIntensity: 1.05,
            side: opts.side || 0,
          });
        }
        return new MeshPhysicalMaterial({
          color: hex,
          roughness: opts.rough ?? 0.22,
          metalness: opts.metalness ?? 0.08,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
          ior: 1.5,
          reflectivity: 0.72,
          envMapIntensity: 1.24,
          side: opts.side || 0,
        });
      });
    },

    // Soft matte woven fabric (clothing, sails, canopies, cushions)
    fabric(hex, opts = {}) {
      const k = `fabric:${hex}:${opts.rough ?? 0.72}:${opts.side ?? 0}`;
      return cached(k, () => {
        if (soft) {
          return new MeshStandardMaterial({
            color: hex,
            roughness: opts.rough ?? 0.72,
            metalness: 0,
            envMapIntensity: 0.55,
            side: opts.side || 0,
          });
        }
        return new MeshPhysicalMaterial({
          color: hex,
          roughness: opts.rough ?? 0.74,
          metalness: 0,
          bumpMap: bump,
          bumpScale: 0.01,
          sheen: 0.68,
          sheenRoughness: 0.64,
          sheenColor: sheenFor(hex, 0.62),
          envMapIntensity: 0.52,
          side: opts.side || 0,
        });
      });
    },

    // Brushed burnished gold/brass/steel with anisotropic brush sheen
    metal(hex, rough = 0.22, metalness = 0.82) {
      const k = `metal:${hex}:${rough}:${metalness}`;
      return cached(k, () => {
        if (soft) {
          return new MeshStandardMaterial({
            color: hex,
            roughness: Math.max(0.24, rough),
            metalness: Math.min(0.62, metalness),
            envMapIntensity: 1.45,
          });
        }
        return new MeshPhysicalMaterial({
          color: hex,
          roughness: Math.max(0.18, rough),
          roughnessMap: brushMap,
          metalness,
          bumpMap: brushMap,
          bumpScale: 0.003,
          clearcoat: 0.34,
          clearcoatRoughness: 0.18,
          envMapIntensity: 1.58,
        });
      });
    },

    glass(hex = 0xdff6ff, opacity = 0.42) {
      const k = `glass:${hex}:${opacity}`;
      return cached(k, () => {
        const Base = soft ? MeshStandardMaterial : MeshPhysicalMaterial;
        return new Base({
          color: hex,
          roughness: 0.06,
          metalness: 0.08,
          transparent: true,
          opacity,
          depthWrite: false,
          envMapIntensity: 1.55,
          ...(soft ? {} : { clearcoat: 1.0, clearcoatRoughness: 0.04, ior: 1.48 }),
        });
      });
    },

    emissive(hex, baseIntensity = 0.7, nightIntensity = 2.1, opts = {}) {
      const k = `em:${hex}:${baseIntensity}:${nightIntensity}:${opts.transparent ? opts.opacity : 1}`;
      return cached(k, () => {
        const m = new MeshStandardMaterial({
          color: opts.color ?? hex,
          emissive: new Color(hex),
          emissiveIntensity: baseIntensity,
          roughness: opts.rough ?? 0.26,
          metalness: opts.metalness ?? 0.05,
          transparent: !!opts.transparent,
          opacity: opts.opacity ?? 1,
          depthWrite: opts.depthWrite ?? !opts.transparent,
          side: opts.side || 0,
        });
        emissives.push({ mat: m, base: baseIntensity, night: nightIntensity });
        return m;
      });
    },

    textured(texKey, opts = {}) {
      const fin = opts.finish || "default";
      const k = `tx:${texKey}:${fin}:${opts.rough ?? ""}:${opts.metal ?? ""}:${opts.emissive ? 1 : 0}:${opts.side ?? 0}`;
      return cached(k, () => {
        const map = tex.get(texKey);
        const rough = opts.rough ?? (fin === "glaze" ? 0.2 : fin === "lacquer" ? 0.34 : fin === "fabric" ? 0.74 : fin === "metal" ? 0.22 : 0.54);
        const metal = opts.metal ?? (fin === "metal" ? (soft ? 0.55 : 0.76) : 0.04);
        let m;
        if (soft) {
          m = new MeshStandardMaterial({
            map,
            color: opts.color ?? 0xffffff,
            roughness: rough,
            metalness: metal,
            envMapIntensity: fin === "glaze" || fin === "metal" ? 1.25 : 0.75,
            side: opts.side || 0,
            transparent: !!opts.transparent,
            opacity: opts.opacity ?? 1,
          });
        } else {
          m = new MeshPhysicalMaterial({
            map,
            color: opts.color ?? 0xffffff,
            roughness: rough,
            metalness: metal,
            bumpMap: fin === "metal" ? brushMap : (fin === "glaze" ? null : bump),
            bumpScale: fin === "metal" ? 0.003 : (fin === "fabric" ? 0.008 : 0.004),
            clearcoat: fin === "glaze" ? 0.86 : fin === "lacquer" ? 0.48 : fin === "metal" ? 0.35 : 0,
            clearcoatRoughness: fin === "glaze" ? 0.08 : 0.22,
            sheen: fin === "fabric" ? 0.58 : 0,
            sheenRoughness: 0.66,
            sheenColor: new Color(0xfff5e8),
            envMapIntensity: opts.env ?? (fin === "glaze" || fin === "metal" ? 1.25 : 0.78),
            side: opts.side || 0,
            transparent: !!opts.transparent,
            opacity: opts.opacity ?? 1,
          });
        }
        if (opts.emissive) {
          m.emissive = new Color(opts.emissiveColor ?? 0xffffff);
          m.emissiveMap = map;
          m.emissiveIntensity = opts.baseEmissive ?? 0.55;
          emissives.push({ mat: m, base: opts.baseEmissive ?? 0.55, night: opts.nightEmissive ?? 1.65 });
        }
        return m;
      });
    },

    shadowMat(opacity = 0.36) {
      const k = `sh:${opacity}`;
      return cached(k, () => new MeshBasicMaterial({
        map: tex.get("shadowDisc"),
        transparent: true,
        opacity,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
      }));
    },

    // Pearlescent frosted celadon-porcelain mystery finish for upcoming milestones
    lockedMat(variant = 0) {
      const k = `locked:${variant}`;
      const col = variant === 0 ? 0xd4e6f2 : (variant === 1 ? 0xaec8dc : 0xebf4fa);
      return cached(k, () => {
        if (soft) {
          return new MeshStandardMaterial({
            color: col,
            roughness: 0.34,
            metalness: variant === 2 ? 0.28 : 0.1,
            emissive: new Color(0x284361),
            emissiveIntensity: 0.15,
            envMapIntensity: 1.0,
          });
        }
        return new MeshPhysicalMaterial({
          color: col,
          roughness: 0.34,
          metalness: variant === 2 ? 0.26 : 0.08,
          bumpMap: bump,
          bumpScale: 0.005,
          clearcoat: 0.72,
          clearcoatRoughness: 0.18,
          sheen: 0.55,
          sheenColor: new Color(0xb8eeff),
          emissive: new Color(0x284361),
          emissiveIntensity: 0.14,
          envMapIntensity: 1.1,
        });
      });
    },

    setNightFactor(f) {
      const t = Math.max(0, Math.min(1, f));
      for (const e of emissives) {
        e.mat.emissiveIntensity = e.base + (e.night - e.base) * t;
      }
    },

    dispose() {
      for (const m of mats.values()) m.dispose();
      mats.clear();
      emissives.length = 0;
      tex.dispose();
    },
  };

  return kit;
}

// Sculpted rounded-rectangle clay prism centered at (0, 0, 0) with exact final extents (w, h, d).
export function roundedBoxGeo(w, h, d, radius = 0.06, bevel = 0.024, segs = 3) {
  const b = Math.min(bevel, w * 0.22, h * 0.22, d * 0.32);
  const iw = Math.max(0.01, w - b * 2);
  const ih = Math.max(0.01, h - b * 2);
  const id = Math.max(0.01, d - b * 2);
  const r = Math.min(radius, iw * 0.45, ih * 0.45);
  const x = -iw / 2, y = -ih / 2;

  const s = new Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + iw - r, y);
  s.quadraticCurveTo(x + iw, y, x + iw, y + r);
  s.lineTo(x + iw, y + ih - r);
  s.quadraticCurveTo(x + iw, y + ih, x + iw - r, y + ih);
  s.lineTo(x + r, y + ih);
  s.quadraticCurveTo(x, y + ih, x, y + ih - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);

  const geo = new ExtrudeGeometry(s, {
    depth: id,
    bevelEnabled: b > 0.001,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: segs,
    curveSegments: segs + 2,
  });
  geo.center();
  return geo;
}

export function latheGeo(pairs, segs = 24) {
  const pts = pairs.map(([r, y]) => new Vector2(r, y));
  return new LatheGeometry(pts, segs);
}

export function tubeGeo(pts, radius, tubularSegs = 20, radialSegs = 8, closed = false) {
  const curve = new CatmullRomCurve3(pts.map((p) => (p instanceof Vector3 ? p : new Vector3(p[0], p[1], p[2]))), closed);
  return new TubeGeometry(curve, tubularSegs, radius, radialSegs, closed);
}

// Deterministic hand-pinched clay vertex sculpting (position-continuous so UV seams never split).
export function sculptGeo(geo, amp = 0.04, freq = 2.6, seed = 1, opts = {}) {
  const pos = geo.attributes.position;
  if (!pos) return geo;
  let minY = Infinity;
  if (opts.flatBottom) {
    for (let i = 0; i < pos.count; i++) {
      const py = pos.getY(i);
      if (py < minY) minY = py;
    }
  }
  const yScale = opts.yScale ?? 0.82;
  const s1 = seed * 1.73, s2 = seed * 2.31, s3 = seed * 3.17;
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    const pz = pos.getZ(i);
    const wave =
      Math.sin(px * freq + s1) * Math.cos(py * freq * 1.13 + s2)
      + 0.45 * Math.sin((pz - px) * freq * 1.67 + s3)
      + 0.28 * Math.cos((py + pz) * freq * 2.05 - seed * 0.9);
    const len = Math.hypot(px, py, pz) || 1;
    const d = wave * amp * 0.65;
    let ny = py + (py / len) * d * yScale;
    if (opts.flatBottom && py <= minY + 0.04) ny = py;
    pos.setXYZ(i, px + (px / len) * d, ny, pz + (pz / len) * d);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export function mesh(geo, mat, opts = {}) {
  const m = new Mesh(geo, mat);
  m.castShadow = opts.cast !== false;
  m.receiveShadow = opts.recv !== false;
  if (opts.pos) m.position.set(opts.pos[0], opts.pos[1], opts.pos[2]);
  if (opts.rot) m.rotation.set(opts.rot[0], opts.rot[1], opts.rot[2]);
  if (opts.scale != null) {
    if (Array.isArray(opts.scale)) m.scale.set(opts.scale[0], opts.scale[1], opts.scale[2]);
    else m.scale.setScalar(opts.scale);
  }
  return m;
}

export function tagMilestone(root, day, prop) {
  root.userData.milestoneDay = day;
  root.userData.prop = prop;
  root.traverse((o) => {
    o.userData.milestoneDay = day;
    o.userData.prop = prop;
  });
  return root;
}

let sharedShadowPlane = null;
export function addContactShadow(parent, rx, rz, y = 0.012, opacity = 0.34, kit) {
  if (!sharedShadowPlane) sharedShadowPlane = new PlaneGeometry(1, 1);
  const m = new Mesh(sharedShadowPlane, kit.shadowMat(opacity));
  m.rotation.x = -Math.PI / 2;
  m.position.y = y;
  m.scale.set(rx * 2, rz * 2, 1);
  m.renderOrder = 1;
  m.userData.ignoreBounds = true;
  parent.add(m);
  return m;
}

export function applyLockedLook(root, kit) {
  let idx = 0;
  root.traverse((o) => {
    if (!o.isMesh) return;
    if (o.material && o.material.transparent && o.material.opacity < 0.5 && !o.castShadow) {
      // Softly frost transparent glow/beams/shadows
      if (o.material.map === kit.tex.get("shadowDisc")) return;
      o.visible = false;
      return;
    }
    o.material = kit.lockedMat(idx % 3);
    idx++;
  });
}

export { DoubleSide };
