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
      const t = makeLinearCanvas(128, 128, (g, w, h) => {
        const r = rng(1337);
        g.fillStyle = "#808080";
        g.fillRect(0, 0, w, h);
        for (let i = 0; i < 420; i++) {
          const x = r() * w;
          const y = r() * h;
          const rad = 1.5 + r() * 4.5;
          const v = Math.floor(112 + r() * 34);
          g.fillStyle = `rgba(${v},${v},${v},0.35)`;
          g.beginPath();
          g.arc(x, y, rad, 0, Math.PI * 2);
          g.fill();
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    },

    woodPlank() {
      const t = makeCanvas(256, 256, (g, w, h) => {
        const r = rng(42);
        const planks = 6;
        const ph = h / planks;
        const shades = ["#d4a168", "#ca945a", "#d9a972", "#c68d54", "#d29d63", "#cf985e"];
        for (let i = 0; i < planks; i++) {
          const y0 = i * ph;
          g.fillStyle = shades[i % shades.length];
          g.fillRect(0, y0, w, ph);
          // Soft grain lines
          for (let k = 0; k < 14; k++) {
            const gy = y0 + 2 + r() * (ph - 4);
            g.strokeStyle = r() > 0.5 ? "rgba(110,66,30,0.16)" : "rgba(255,235,200,0.13)";
            g.lineWidth = 1 + r() * 1.4;
            g.beginPath();
            g.moveTo(0, gy);
            g.bezierCurveTo(w * 0.33, gy + (r() - 0.5) * 4, w * 0.66, gy + (r() - 0.5) * 4, w, gy);
            g.stroke();
          }
          // Plank seam bevel
          g.fillStyle = "rgba(74,42,18,0.42)";
          g.fillRect(0, y0, w, 2.2);
          g.fillStyle = "rgba(255,244,218,0.2)";
          g.fillRect(0, y0 + 2.2, w, 1.5);
          // Brass nail heads at staggered joints
          const jx = ((i * 73 + 48) % (w - 40)) + 20;
          g.fillStyle = "rgba(74,42,18,0.34)";
          g.fillRect(jx, y0, 2, ph);
          for (const nx of [jx - 7, jx + 9]) {
            for (const ny of [y0 + 10, y0 + ph - 10]) {
              g.fillStyle = "#6c4828";
              g.beginPath();
              g.arc(nx, ny, 2.6, 0, Math.PI * 2);
              g.fill();
              g.fillStyle = "#e8c474";
              g.beginPath();
              g.arc(nx - 0.6, ny - 0.6, 1.2, 0, Math.PI * 2);
              g.fill();
            }
          }
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(2, 2);
      return t;
    },

    stoneWall() {
      const t = makeCanvas(256, 128, (g, w, h) => {
        const r = rng(88);
        g.fillStyle = "#b9b4a8";
        g.fillRect(0, 0, w, h);
        const rows = 4;
        const rh = h / rows;
        const tones = ["#cfc8bc", "#c5beb1", "#d6d0c4", "#beb7aa", "#cbc4b7"];
        for (let row = 0; row < rows; row++) {
          const y = row * rh;
          let x = (row % 2) * -28;
          while (x < w) {
            const bw = 44 + Math.floor(r() * 24);
            g.fillStyle = tones[Math.floor(r() * tones.length)];
            g.fillRect(x + 2, y + 2, bw - 4, rh - 4);
            g.fillStyle = "rgba(255,252,244,0.22)";
            g.fillRect(x + 2, y + 2, bw - 4, 3);
            g.fillStyle = "rgba(70,66,60,0.22)";
            g.fillRect(x + 2, y + rh - 5, bw - 4, 3);
            x += bw;
          }
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(4, 1);
      return t;
    },

    pineappleCrust() {
      return makeCanvas(256, 256, (g, w, h) => {
        const gr = g.createRadialGradient(w * 0.5, h * 0.45, 16, w * 0.5, h * 0.5, w * 0.62);
        gr.addColorStop(0, "#ffd972");
        gr.addColorStop(0.65, "#f0a93b");
        gr.addColorStop(1, "#c97422");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        // Classic HK Bo Lo Bao diamond sugar crackle grid
        g.strokeStyle = "#9c4e12";
        g.lineWidth = 4.5;
        const step = 32;
        for (let i = -h; i < w + h; i += step) {
          g.beginPath();
          g.moveTo(i, 0);
          g.lineTo(i + h, h);
          g.stroke();
          g.beginPath();
          g.moveTo(i, h);
          g.lineTo(i + h, 0);
          g.stroke();
        }
        // Golden raised biscuit facets
        g.strokeStyle = "rgba(255,244,196,0.52)";
        g.lineWidth = 2;
        for (let i = -h + 3; i < w + h; i += step) {
          g.beginPath();
          g.moveTo(i, 0);
          g.lineTo(i + h, h);
          g.stroke();
        }
      });
    },

    riceSack() {
      return makeCanvas(256, 256, (g, w, h) => {
        g.fillStyle = "#f2e3c6";
        g.fillRect(0, 0, w, h);
        // Burlap weave lines
        g.strokeStyle = "rgba(170,136,92,0.22)";
        g.lineWidth = 2;
        for (let i = 0; i < w; i += 8) {
          g.beginPath(); g.moveTo(i, 0); g.lineTo(i, h); g.stroke();
          g.beginPath(); g.moveTo(0, i); g.lineTo(w, i); g.stroke();
        }
        // Classic HK rice-sack red stripes
        g.fillStyle = "#c9382e";
        g.fillRect(0, 26, w, 10);
        g.fillRect(0, h - 36, w, 10);
        // Central red diamond emblem
        g.save();
        g.translate(w / 2, h / 2 + 2);
        g.fillStyle = "#fff8eb";
        g.strokeStyle = "#c9382e";
        g.lineWidth = 8;
        g.beginPath();
        g.moveTo(0, -68); g.lineTo(68, 0); g.lineTo(0, 68); g.lineTo(-68, 0);
        g.closePath();
        g.fill();
        g.stroke();
        g.strokeStyle = "#e09c2b";
        g.lineWidth = 2.5;
        g.beginPath();
        g.moveTo(0, -56); g.lineTo(56, 0); g.lineTo(0, 56); g.lineTo(-56, 0);
        g.closePath();
        g.stroke();
        g.fillStyle = "#b8241d";
        g.font = `900 72px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("米", 0, 4);
        g.restore();
      });
    },

    checkerTile() {
      const t = makeCanvas(128, 128, (g, w, h) => {
        const s = 32;
        for (let y = 0; y < h; y += s) {
          for (let x = 0; x < w; x += s) {
            const alt = ((x / s) + (y / s)) % 2 === 0;
            g.fillStyle = alt ? "#1f8c7a" : "#fff6e3";
            g.fillRect(x, y, s, s);
            g.strokeStyle = "rgba(40,60,55,0.16)";
            g.lineWidth = 1.5;
            g.strokeRect(x + 0.75, y + 0.75, s - 1.5, s - 1.5);
          }
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(3, 1.5);
      return t;
    },

    stripeRed() {
      const t = makeCanvas(256, 64, (g, w, h) => {
        const n = 8, sw = w / n;
        for (let i = 0; i < n; i++) {
          g.fillStyle = i % 2 === 0 ? "#e2473c" : "#fff8eb";
          g.fillRect(i * sw, 0, sw, h);
        }
        g.fillStyle = "rgba(255,212,96,0.85)";
        g.fillRect(0, h - 7, w, 7);
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      return t;
    },

    stripeCoral() {
      const t = makeCanvas(256, 64, (g, w, h) => {
        const n = 8, sw = w / n;
        for (let i = 0; i < n; i++) {
          g.fillStyle = i % 2 === 0 ? "#ff6b4a" : "#fff8eb";
          g.fillRect(i * sw, 0, sw, h);
        }
        g.fillStyle = "#14968b";
        g.fillRect(0, h - 8, w, 8);
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      return t;
    },

    brick() {
      const t = makeCanvas(256, 256, (g, w, h) => {
        const r = rng(450);
        g.fillStyle = "#e2d6c3";
        g.fillRect(0, 0, w, h);
        const rows = 10, rh = h / rows, bw = 42;
        const reds = ["#b84136", "#c44b3e", "#a9392f", "#cc5545", "#b23e33"];
        for (let row = 0; row < rows; row++) {
          const y = row * rh;
          let x = (row % 2) * (-bw * 0.5);
          while (x < w) {
            g.fillStyle = reds[Math.floor(r() * reds.length)];
            g.fillRect(x + 2.5, y + 2.5, bw - 5, rh - 5);
            g.fillStyle = "rgba(255,220,190,0.14)";
            g.fillRect(x + 2.5, y + 2.5, bw - 5, 3);
            x += bw;
          }
        }
      });
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(1.5, 2.5);
      return t;
    },

    clockFace() {
      return makeCanvas(256, 256, (g, w, h) => {
        const cx = w / 2, cy = h / 2, rad = w * 0.45;
        g.fillStyle = "#fff8e8";
        g.beginPath(); g.arc(cx, cy, rad + 6, 0, Math.PI * 2); g.fill();
        g.strokeStyle = "#3a2e28";
        g.lineWidth = 7;
        g.beginPath(); g.arc(cx, cy, rad, 0, Math.PI * 2); g.stroke();
        g.strokeStyle = "#c89b3c";
        g.lineWidth = 3;
        g.beginPath(); g.arc(cx, cy, rad - 10, 0, Math.PI * 2); g.stroke();
        // 12 hour marks + Roman numerals at cardinal points
        const numerals = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
        g.fillStyle = "#222430";
        g.textAlign = "center";
        g.textBaseline = "middle";
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI) / 6 - Math.PI / 2;
          g.strokeStyle = "#222430";
          g.lineWidth = i % 3 === 0 ? 5 : 2.5;
          g.beginPath();
          g.moveTo(cx + Math.cos(a) * (rad - 12), cy + Math.sin(a) * (rad - 12));
          g.lineTo(cx + Math.cos(a) * (rad - 24), cy + Math.sin(a) * (rad - 24));
          g.stroke();
          g.font = i % 3 === 0 ? "bold 24px Georgia, serif" : "bold 17px Georgia, serif";
          g.fillText(numerals[i], cx + Math.cos(a) * (rad - 40), cy + Math.sin(a) * (rad - 40));
        }
        // Classic 10:10 clock hands
        g.strokeStyle = "#1b1d28";
        g.lineCap = "round";
        g.lineWidth = 9;
        g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx - 42, cy - 34); g.stroke();
        g.lineWidth = 6;
        g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + 58, cy - 44); g.stroke();
        g.fillStyle = "#d9a426";
        g.beginPath(); g.arc(cx, cy, 10, 0, Math.PI * 2); g.fill();
      });
    },

    badge18222() {
      return makeCanvas(256, 144, (g, w, h) => {
        g.fillStyle = "#1b2852";
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#ffd154";
        g.lineWidth = 8;
        g.strokeRect(8, 8, w - 16, h - 16);
        g.fillStyle = "#ff5c4a";
        g.fillRect(14, 14, w - 28, 34);
        g.fillStyle = "#fff9ec";
        g.font = `900 22px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("防騙易 ANTI-SCAM", w / 2, 32);
        g.fillStyle = "#ffe066";
        g.font = `900 62px ${DISP_FONT}`;
        g.fillText("18222", w / 2, 95);
      });
    },

    neonSign() {
      return makeCanvas(256, 144, (g, w, h) => {
        g.fillStyle = "#181d38";
        g.fillRect(0, 0, w, h);
        // Double glowing neon border
        g.shadowColor = "#38f3dc";
        g.shadowBlur = 16;
        g.strokeStyle = "#56ffe8";
        g.lineWidth = 7;
        g.strokeRect(10, 10, w - 20, h - 20);
        g.shadowColor = "#ff5fa8";
        g.shadowBlur = 18;
        g.strokeStyle = "#ff7ab8";
        g.lineWidth = 3;
        g.strokeRect(20, 20, w - 40, h - 40);
        // Classic HK Cha Chaan Teng lettering
        g.fillStyle = "#ff85be";
        g.font = `900 58px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("茶餐廳", w / 2, 66);
        g.shadowColor = "#ffe26a";
        g.shadowBlur = 10;
        g.fillStyle = "#ffeb8a";
        g.font = `800 18px ${DISP_FONT}`;
        g.fillText("CHA CHAAN TENG", w / 2, 112);
      });
    },

    chalkboard() {
      return makeCanvas(256, 192, (g, w, h) => {
        g.fillStyle = "#263631";
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#b87c42";
        g.lineWidth = 14;
        g.strokeRect(7, 7, w - 14, h - 14);
        g.fillStyle = "#ffe484";
        g.font = `900 34px ${CJK_FONT}`;
        g.textAlign = "center";
        g.fillText("新鮮出爐", w / 2, 56);
        g.fillStyle = "#fff8eb";
        g.font = `700 30px ${CJK_FONT}`;
        g.fillText("菠蘿包 $8", w / 2, 106);
        g.fillStyle = "#ffb894";
        g.font = `700 26px ${CJK_FONT}`;
        g.fillText("港式奶茶 $16", w / 2, 148);
      });
    },

    kioskScreen() {
      return makeCanvas(256, 192, (g, w, h) => {
        const gr = g.createLinearGradient(0, 0, 0, h);
        gr.addColorStop(0, "#104f58");
        gr.addColorStop(1, "#0b323e");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        g.fillStyle = "#32e6be";
        g.font = `800 22px ${CJK_FONT}`;
        g.textAlign = "center";
        g.fillText("八達通 · 儲蓄餘額", w / 2, 34);
        g.fillStyle = "#fff6cf";
        g.font = `900 44px ${DISP_FONT}`;
        g.fillText("HK$1,888", w / 2, 86);
        // Savings mini bar chart
        const bars = [26, 40, 52, 64, 78];
        bars.forEach((bh, i) => {
          g.fillStyle = i === 4 ? "#ffd34e" : "#34e2bc";
          g.fillRect(38 + i * 38, 174 - bh * 0.72, 24, bh * 0.72);
        });
      });
    },

    shopBanner() {
      return makeCanvas(256, 96, (g, w, h) => {
        g.fillStyle = "#184f4a";
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#f2c14e";
        g.lineWidth = 6;
        g.strokeRect(6, 6, w - 12, h - 12);
        g.fillStyle = "#ffe896";
        g.font = `900 38px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("海傍小天地", w / 2, 38);
        g.fillStyle = "#fff6e5";
        g.font = `800 16px ${DISP_FONT}`;
        g.fillText("HARBOUR KEEP · 1/F", w / 2, 72);
      });
    },

    pierPlaque() {
      return makeCanvas(256, 80, (g, w, h) => {
        const gr = g.createLinearGradient(0, 0, w, h);
        gr.addColorStop(0, "#f5cc58");
        gr.addColorStop(0.5, "#d89c2e");
        gr.addColorStop(1, "#f2c852");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#6c4814";
        g.lineWidth = 5;
        g.strokeRect(6, 6, w - 12, h - 12);
        g.fillStyle = "#2b1d0c";
        g.font = `900 28px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("海傍小天地", w / 2, 31);
        g.font = `800 14px ${DISP_FONT}`;
        g.fillText("VICTORIA HARBOUR KEEP", w / 2, 58);
      });
    },

    passbook() {
      return makeCanvas(128, 192, (g, w, h) => {
        g.fillStyle = "#14968b";
        g.fillRect(0, 0, w, h);
        g.fillStyle = "#fff6e5";
        g.fillRect(0, 44, w, 26);
        g.fillStyle = "#ffd154";
        g.fillRect(0, 70, w, 8);
        g.fillStyle = "#154e49";
        g.font = `900 20px ${CJK_FONT}`;
        g.textAlign = "center";
        g.fillText("儲蓄存摺", w / 2, 64);
        g.fillStyle = "#fff6e5";
        g.font = `800 16px ${DISP_FONT}`;
        g.fillText("SAVINGS", w / 2, 128);
      });
    },

    calcScreen() {
      return makeCanvas(192, 256, (g, w, h) => {
        g.fillStyle = "#ece3d2";
        g.fillRect(0, 0, w, h);
        g.fillStyle = "#a8cdb0";
        g.fillRect(16, 18, w - 32, 62);
        g.strokeStyle = "#485a4e";
        g.lineWidth = 4;
        g.strokeRect(16, 18, w - 32, 62);
        g.fillStyle = "#1b3324";
        g.font = "bold 28px monospace";
        g.textAlign = "right";
        g.fillText("APR 0%", w - 26, 60);
        // 4x4 tactile calculator buttons
        const cols = ["#f47e54", "#6b7d8e", "#6b7d8e", "#6b7d8e"];
        for (let row = 0; row < 4; row++) {
          for (let col = 0; col < 4; col++) {
            g.fillStyle = col === 3 ? cols[0] : (row === 0 ? "#14968b" : "#3a4556");
            const bx = 18 + col * 40, by = 98 + row * 36;
            g.fillRect(bx, by, 32, 28);
            g.fillStyle = "rgba(255,255,255,0.22)";
            g.fillRect(bx, by, 32, 5);
          }
        }
      });
    },

    tramSign() {
      return makeCanvas(256, 96, (g, w, h) => {
        g.fillStyle = "#145435";
        g.fillRect(0, 0, w, h);
        g.fillStyle = "#fff4d9";
        g.fillRect(8, 10, w - 16, h - 20);
        g.strokeStyle = "#d9a226";
        g.lineWidth = 4;
        g.strokeRect(12, 14, w - 24, h - 28);
        g.fillStyle = "#11442b";
        g.font = `900 32px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("堅尼地城 · 叮叮", w / 2, 40);
        g.font = `800 15px ${DISP_FONT}`;
        g.fillText("HK TRAMWAYS · DAY 30", w / 2, 68);
      });
    },

    laisee() {
      return makeCanvas(128, 160, (g, w, h) => {
        g.fillStyle = "#d92b2b";
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#ffd34e";
        g.lineWidth = 6;
        g.strokeRect(10, 10, w - 20, h - 20);
        g.fillStyle = "#ffd34e";
        g.beginPath(); g.arc(w / 2, h / 2, 34, 0, Math.PI * 2); g.fill();
        g.fillStyle = "#b81d1d";
        g.font = `900 34px ${CJK_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("大吉", w / 2, h / 2 + 2);
      });
    },

    coinFace() {
      return makeCanvas(128, 128, (g, w, h) => {
        const cx = w / 2, cy = h / 2;
        const gr = g.createRadialGradient(cx - 12, cy - 12, 8, cx, cy, 60);
        gr.addColorStop(0, "#fff09c");
        gr.addColorStop(0.6, "#f7be34");
        gr.addColorStop(1, "#c98512");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#fff5b8";
        g.lineWidth = 5;
        g.beginPath(); g.arc(cx, cy, 50, 0, Math.PI * 2); g.stroke();
        // Stylized 5-petal bauhinia star
        g.fillStyle = "#ffe87c";
        for (let i = 0; i < 5; i++) {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          g.save();
          g.translate(cx + Math.cos(a) * 18, cy + Math.sin(a) * 18);
          g.rotate(a);
          g.beginPath();
          g.ellipse(0, 0, 14, 7, 0, 0, Math.PI * 2);
          g.fill();
          g.restore();
        }
        g.fillStyle = "#b3730e";
        g.beginPath(); g.arc(cx, cy, 8, 0, Math.PI * 2); g.fill();
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
      return makeCanvas(256, 256, (g, w, h) => {
        const cx = w / 2, cy = h / 2;
        const gr = g.createRadialGradient(cx, cy, 10, cx, cy, w * 0.5);
        gr.addColorStop(0, "#e2ba86");
        gr.addColorStop(0.75, "#c59258");
        gr.addColorStop(1, "#9a6838");
        g.fillStyle = gr;
        g.fillRect(0, 0, w, h);
        // Subtle wood grain arcs
        g.strokeStyle = "rgba(105,62,25,0.14)";
        g.lineWidth = 2;
        for (let r = 18; r < 118; r += 11) {
          g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
        }
        // Brass compass inlay ring
        g.strokeStyle = "#f2cf6d";
        g.lineWidth = 4;
        g.beginPath(); g.arc(cx, cy, 106, 0, Math.PI * 2); g.stroke();
        g.lineWidth = 2;
        g.beginPath(); g.arc(cx, cy, 95, 0, Math.PI * 2); g.stroke();
        for (let i = 0; i < 24; i++) {
          const a = (i * Math.PI * 2) / 24;
          const r0 = i % 6 === 0 ? 86 : 92;
          g.beginPath();
          g.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0);
          g.lineTo(cx + Math.cos(a) * 104, cy + Math.sin(a) * 104);
          g.stroke();
        }
      });
    },

    trophy100() {
      return makeCanvas(256, 96, (g, w, h) => {
        g.fillStyle = "#d99d24";
        g.fillRect(0, 0, w, h);
        g.strokeStyle = "#fff2a8";
        g.lineWidth = 6;
        g.strokeRect(8, 8, w - 16, h - 16);
        g.fillStyle = "#3a2204";
        g.font = `900 44px ${DISP_FONT}`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText("100 DAYS", w / 2, h / 2 + 2);
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
  const t = makeCanvas(128, 64, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    gr.addColorStop(0, p[0]);
    gr.addColorStop(0.38, p[1]);
    gr.addColorStop(0.68, p[2]);
    gr.addColorStop(1, p[3]);
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
    // Two soft studio key softboxes for crisp metal & gloss ceramic reflections
    g.fillStyle = sky === "night" ? "rgba(210,230,255,0.85)" : "rgba(255,255,255,0.92)";
    g.fillRect(18, 6, 26, 13);
    g.fillRect(82, 8, 22, 11);
  });
  t.mapping = EquirectangularReflectionMapping;
  return t;
}

export function makeSkyTex(sky = "day") {
  const stops = {
    day: [
      [0.0, "#4ca9e6"],
      [0.36, "#7fd0f7"],
      [0.54, "#c9f0f7"],
      [0.72, "#d8f5ec"],
      [1.0, "#66b8c7"],
    ],
    dusk: [
      [0.0, "#3b3275"],
      [0.28, "#8e589a"],
      [0.48, "#f08a6d"],
      [0.64, "#ffd08a"],
      [1.0, "#4a4375"],
    ],
    night: [
      [0.0, "#0b112c"],
      [0.34, "#16214f"],
      [0.54, "#293875"],
      [0.72, "#202e63"],
      [1.0, "#0d1633"],
    ],
  }[sky] || [];
  return makeCanvas(32, 256, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h);
    for (const [at, col] of stops) gr.addColorStop(at, col);
    g.fillStyle = gr;
    g.fillRect(0, 0, w, h);
  });
}

export function createKit(kitOpts = {}) {
  const tex = buildTextures();
  const mats = new Map();
  const emissives = [];
  const bump = kitOpts.softwareGL ? null : tex.get("clayBump");

  function cached(key, factory) {
    if (!mats.has(key)) mats.set(key, factory());
    return mats.get(key);
  }

  const kit = {
    tex,
    emissives,

    clay(hex, opts = {}) {
      const k = `clay:${hex}:${opts.rough ?? 0.5}:${opts.flat ? 1 : 0}:${opts.side ?? 0}`;
      return cached(k, () => new MeshStandardMaterial({
        color: hex,
        roughness: opts.rough ?? 0.5,
        metalness: opts.metalness ?? 0.03,
        bumpMap: opts.noBump ? null : bump,
        bumpScale: opts.noBump ? 0 : 0.008,
        envMapIntensity: 0.65,
        flatShading: !!opts.flat,
        side: opts.side || 0,
      }));
    },

    gloss(hex, opts = {}) {
      const k = `gloss:${hex}:${opts.rough ?? 0.22}`;
      return cached(k, () => new MeshStandardMaterial({
        color: hex,
        roughness: opts.rough ?? 0.22,
        metalness: opts.metalness ?? 0.05,
        envMapIntensity: 0.95,
      }));
    },

    metal(hex, rough = 0.24, metalness = 0.78) {
      const k = `metal:${hex}:${rough}:${metalness}`;
      return cached(k, () => new MeshStandardMaterial({
        color: hex,
        roughness: kitOpts.softwareGL ? Math.max(0.32, rough) : rough,
        metalness: kitOpts.softwareGL ? Math.min(0.45, metalness) : metalness,
        envMapIntensity: 1.35,
      }));
    },

    glass(hex = 0xdff6ff, opacity = 0.42) {
      const k = `glass:${hex}:${opacity}`;
      return cached(k, () => new MeshStandardMaterial({
        color: hex,
        roughness: 0.1,
        metalness: 0.1,
        transparent: true,
        opacity,
        depthWrite: false,
        envMapIntensity: 1.2,
      }));
    },

    emissive(hex, baseIntensity = 0.7, nightIntensity = 2.1, opts = {}) {
      const k = `em:${hex}:${baseIntensity}:${nightIntensity}:${opts.transparent ? opts.opacity : 1}`;
      return cached(k, () => {
        const m = new MeshStandardMaterial({
          color: opts.color ?? hex,
          emissive: new Color(hex),
          emissiveIntensity: baseIntensity,
          roughness: opts.rough ?? 0.28,
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
      const k = `tx:${texKey}:${opts.rough ?? 0.56}:${opts.metal ?? 0.04}:${opts.emissive ? 1 : 0}:${opts.side ?? 0}`;
      return cached(k, () => {
        const map = tex.get(texKey);
        const m = new MeshStandardMaterial({
          map,
          color: opts.color ?? 0xffffff,
          roughness: opts.rough ?? 0.56,
          metalness: opts.metal ?? 0.04,
          envMapIntensity: opts.env ?? 0.7,
          side: opts.side || 0,
          transparent: !!opts.transparent,
          opacity: opts.opacity ?? 1,
        });
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

    lockedMat(variant = 0) {
      const k = `locked:${variant}`;
      return cached(k, () => new MeshStandardMaterial({
        color: variant === 0 ? 0xcad8e5 : (variant === 1 ? 0x9eb2c7 : 0xe3ecf4),
        roughness: 0.48,
        metalness: variant === 2 ? 0.25 : 0.08,
        bumpMap: bump,
        bumpScale: 0.006,
        emissive: new Color(0x284361),
        emissiveIntensity: 0.14,
        envMapIntensity: 0.9,
      }));
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
