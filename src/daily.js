// Harbour Keep (/daily) — Forest-style daily financial check-in & clay Victoria Harbour pier builder.
(() => {
  "use strict";
  const D = window.TFF_DAILY;
  const K = window.CLAY;
  const A = window.GameAudio;
  const AV = window.TFF_AVATAR;
  const DEFS = new Map((window.ITEM_DEFS || []).map((d) => [d.id, d]));
  const $ = (id) => document.getElementById(id);

  // ---------- Storage & Browser Environment ----------
  const LS = {
    uid: "tff_daily_uid",
    key: "tff_daily_key",
    state: "tff_daily_state",
    email: "tff_daily_email",
  };
  const lsGet = (k, fb) => { try { const v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); } catch { return fb; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const lsRaw = (k) => { try { return localStorage.getItem(k) || ""; } catch { return ""; } };
  const lsRawSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  function randHex(len) {
    const a = new Uint8Array(Math.ceil(len / 2));
    crypto.getRandomValues(a);
    return [...a].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, len);
  }
  let uid = lsRaw(LS.uid);
  let key = lsRaw(LS.key);
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(uid)) { uid = randHex(24); lsRawSet(LS.uid, uid); }
  if (!/^[A-Za-z0-9_-]{16,128}$/.test(key)) { key = randHex(32); lsRawSet(LS.key, key); }

  const UA = navigator.userAgent || "";
  const IOS = /iPhone|iPad|iPod/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const ANDROID = /Android/i.test(UA);
  const IAB = (() => {
    const apps = [["Instagram", /Instagram/i], ["Threads", /Barcelona/], ["Messenger", /Messenger|FBAN\/Messenger/],
      ["Facebook", /FBAN|FBAV|FB_IAB|FBIOS|FB4A/], ["LINE", /\bLine\//i], ["WeChat", /MicroMessenger/i],
      ["TikTok", /musical_ly|BytedanceWebview|TikTok/i], ["Weibo", /Weibo/i], ["Xiaohongshu", /xhsdiscover|XiaoHongShu/i]];
    for (const [n, re] of apps) if (re.test(UA)) return n;
    if (ANDROID && /; wv\)/.test(UA)) return "app";
    if (IOS && !/Safari\//.test(UA) && !/CriOS|FxiOS|EdgiOS/.test(UA)) return "app";
    return "";
  })();

  const reduceMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function hktToday() {
    const parts = Object.fromEntries(
      new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Hong_Kong", year: "numeric", month: "2-digit", day: "2-digit" })
        .formatToParts(new Date()).map((x) => [x.type, x.value]),
    );
    return `${parts.year}-${parts.month}-${parts.day}`;
  }
  function daysBetween(a, b) {
    const pa = /^(\d{4})-(\d{2})-(\d{2})$/.exec(a || "");
    const pb = /^(\d{4})-(\d{2})-(\d{2})$/.exec(b || "");
    if (!pa || !pb) return 999999;
    return Math.round((Date.UTC(+pb[1], +pb[2] - 1, +pb[3]) - Date.UTC(+pa[1], +pa[2] - 1, +pa[3])) / 86400000);
  }
  function hktMidnightLeft() {
    const now = Date.now();
    const hktMs = now + 8 * 3600000;
    const nextMid = (Math.floor(hktMs / 86400000) + 1) * 86400000;
    const rem = Math.max(0, nextMid - hktMs);
    const h = Math.floor(rem / 3600000), m = Math.floor((rem % 3600000) / 60000);
    return `${h}h ${String(m).padStart(2, "0")}m`;
  }

  // ---------- Local + Server State ----------
  let state = lsGet(LS.state, null) || {
    today: hktToday(),
    syncCode: "CRAB-LOCAL",
    profile: {
      totalDays: 0, streak: 0, streakPreview: 0, bestStreak: 0, shields: 0, shieldsUsed: 0,
      rescues: 0, lastDate: null, sprintDoneAt: null, claimedAt: null, avatar: "crab", sky: "auto",
      name: "", hasEmail: false, note: "",
    },
    logs: [],
    pending: [],
  };
  let curQ = null;
  let rescueTimerId = 0, rescueStartedAt = 0, rescueRemain = 60, rescueActive = false;
  let popScale = 1, popAt = 0, crabMood = "idle", crabMoodTimer = 0;
  let audioUnlocked = false;
  let deferredInstall = null;

  function saveLocal() { lsSet(LS.state, state); }

  function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    if (A) {
      A.unlock();
      A.music.setMode("menu");
      A.music.setStage(Math.min(3, Math.floor((state.profile.totalDays || 0) / 4)));
      A.music.start();
    }
    const hint = $("dailySoundHint");
    if (hint) {
      hint.textContent = A && A.isMuted()
        ? "🔇 Sound muted · Tap 🔊 anytime to unmute · 音效已靜音"
        : "🔊 Harbour music & SFX on · Tap 🔊 anytime to mute · 音效已開啟";
    }
  }
  const sfx = (name) => { try { if (A) { A.unlock(); A.sfx(name); } } catch {} };

  function setCrabMood(m, ms = 2600) {
    crabMood = m;
    clearTimeout(crabMoodTimer);
    drawPier();
    if (ms > 0) crabMoodTimer = setTimeout(() => { crabMood = "idle"; drawPier(); }, ms);
  }

  function sayTalk(en, zh) {
    $("talkEn").textContent = en;
    $("talkZh").textContent = zh;
  }

  function addStamp(en, zh, cls = "good") {
    const wrap = $("pierStamp");
    if (!wrap) return;
    const s = document.createElement("div");
    s.className = "stamp " + cls;
    const b = document.createElement("span"); b.textContent = en;
    const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = zh;
    s.append(b, z);
    wrap.replaceChildren(s);
    setTimeout(() => { if (s.parentNode === wrap) s.remove(); }, 2200);
  }

  // ---------- Clay Artwork Rendering ----------
  const itemCache = new Map();
  function drawItemOn(g, id, x, y, scale = 1, rot = 0) {
    const def = DEFS.get(id);
    if (!def) return;
    let sp = itemCache.get(id);
    if (!sp) {
      const pad = 16, w = 136, h = 136;
      const c = document.createElement("canvas"); c.width = w * 2; c.height = h * 2;
      const cg = c.getContext("2d"); cg.setTransform(2, 0, 0, 2, w, h);
      try { def.draw(cg); } catch {}
      sp = { c, w, h };
      itemCache.set(id, sp);
    }
    g.save();
    g.translate(x, y);
    if (rot) g.rotate(rot);
    if (scale !== 1) g.scale(scale, scale);
    g.drawImage(sp.c, -sp.w / 2, -sp.h / 2, sp.w, sp.h);
    g.restore();
  }

  function drawCrabLogo() {
    const c = $("dailyCrabLogo");
    if (!c) return;
    const g = c.getContext("2d");
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.clearRect(0, 0, c.width, c.height);
    g.setTransform(c.width / 80, 0, 0, c.width / 80, 40 * (c.width / 80), 32 * (c.width / 80));
    drawCrabCharacter(g, "happy", crabHatFor(state.profile.totalDays));
  }

  function crabHatFor(days) {
    if (days >= 100) return "tophat";
    if (days >= 30) return "straw";
    if (days >= 14) return "halo";
    return null;
  }

  function drawCrabCharacter(g, mood, hat) {
    if (AV && AV.crab && AV.crab(g, mood)) {
      if (hat) drawCrabHat(g, hat, mood, true);
      return;
    }
    const shell = K.ball(0, 6, 24, 15, { lump: 0.6, seed: 9 });
    const claw = (sx) => {
      const up = mood === "happy" ? -16 : (mood === "worried" ? -4 : 0);
      const cx = sx * 30, cy = -2 + up;
      K.blob(g, K.tube([[sx * 16, 6], [sx * 24, up * 0.5], [cx, cy + 4]], 6), "orange", { depth: 1.5, soft: 2, sheen: false });
      const pinch = K.merge(K.ball(cx, cy - 2, 8, 7, { lump: 0.3, seed: sx + 4 }), K.ball(cx + sx * 4, cy - 9, 4.5, 5, { lump: 0.2, seed: sx + 8 }));
      K.blob(g, pinch, "red", { depth: 2, soft: 2.6, sheen: false });
    };
    for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) K.blob(g, K.tube([[sx * (12 + i * 5), 14], [sx * (19 + i * 6), 22], [sx * (21 + i * 6), 26]], 3.4), "orange", { depth: 1, soft: 1.4, sheen: false, rim: 0.6 });
    claw(-1); claw(1);
    K.blob(g, shell, "red", { sheen: { x: -8, y: 0, rx: 7, ry: 3 } });
    for (const sx of [-1, 1]) {
      K.blob(g, K.tube([[sx * 6, -2], [sx * 7, -12]], 3), "red", { depth: 1, soft: 1.4, sheen: false, rim: 0.6 });
      K.eye(g, sx * 7, -15, 4.6, 0, mood === "happy" ? -0.4 : 0.2);
    }
    K.groove(g, K.poly(mood === "happy" ? [[-6, 9], [0, 13], [6, 9]] : [[-5, 10], [0, 12], [5, 10]], false), 1.4);
    K.press(g, K.ball(-12, 8, 3, 2, { lump: 0.05 }), "pink", { sheen: false, texture: 0 });
    K.press(g, K.ball(12, 8, 3, 2, { lump: 0.05 }), "pink", { sheen: false, texture: 0 });
    if (hat) drawCrabHat(g, hat, mood, false);
  }

  function drawCrabHat(g, hat, mood, photo) {
    const EYES = { photo: { idle: [-7.5, 8, -15, -20.5], happy: [-6, 9, -10, -15.5], worried: [-7.5, 7.5, -10.5, -16] }, clay: [-7, 7, -15, -20] };
    const e = photo ? EYES.photo[mood === "happy" ? "happy" : mood === "worried" ? "worried" : "idle"] : EYES.clay;
    const cx = (e[0] + e[1]) / 2, top = e[3] + 3;
    const o = { depth: 1.2, soft: 1.6, sheen: false, rim: 0.5 };
    g.save(); g.translate(cx, top); g.scale(1.25, 1.25);
    if (hat === "halo") {
      g.translate(0, -5.5);
      g.strokeStyle = "rgba(255,200,61,.35)"; g.lineWidth = 5; g.beginPath(); g.ellipse(0, 0, 10.5, 3, 0, 0, 7); g.stroke();
      g.strokeStyle = "#FFC83D"; g.lineWidth = 2.6; g.beginPath(); g.ellipse(0, 0, 10.5, 3, 0, 0, 7); g.stroke();
    } else if (hat === "straw") {
      K.blob(g, K.ball(0, -0.4, 16, 2.9, { lump: 0.3, seed: 5 }), "#E8C56A", o);
      K.blob(g, K.blobPoly([[-7.5, -1.2], [-6.5, -7.2], [0, -8.6], [6.5, -7.2], [7.5, -1.2]], { lump: 0.3, seed: 6 }), "#F0D282", o);
      K.press(g, K.slab(0, -2.5, 14.6, 2, 0.8, { lump: 0.1 }), "red", { sheen: false, texture: 0 });
    } else if (hat === "tophat") {
      K.blob(g, K.slab(0, -0.4, 20, 2.8, 1.3, { lump: 0.2, seed: 3 }), "black", o);
      K.blob(g, K.slab(0, -5.3, 12, 8.4, 1.6, { lump: 0.2, seed: 4 }), "black", o);
      K.press(g, K.slab(0, -2.6, 12, 2, 0.6, { lump: 0.05 }), "yellow", { sheen: false, texture: 0 });
    }
    g.restore();
  }

  function skyModeFor(pref, days) {
    if (pref && pref !== "auto") return pref;
    if (days >= 21) return "night";
    if (days >= 13) return "dusk";
    const hr = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Hong_Kong", hour: "2-digit", hour12: false }).format(new Date()));
    if (hr >= 17 && hr <= 19) return "dusk";
    if (hr >= 20 || hr <= 5) return "night";
    return "day";
  }

  // Clickable prop regions on the pier canvas (filled during drawPier)
  const hitZones = [];

  function drawPier() {
    const cv = $("pierCv");
    if (!cv) return;
    const W = 520, H = 410, dpr = Math.min(2, window.devicePixelRatio || 1);
    if (cv.width !== W * dpr || cv.height !== H * dpr) { cv.width = W * dpr; cv.height = H * dpr; }
    const g = cv.getContext("2d");
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    hitZones.length = 0;

    const p = state.profile, days = p.totalDays || 0;
    const skyMode = skyModeFor(p.sky, days);
    const SKY = {
      day: ["#58BAFF", "#8CD9FF", "#D2F2FF"],
      dusk: ["#694EA6", "#FF8E6E", "#FFD38A"],
      night: ["#12183C", "#25317A", "#4A499A"],
    }[skyMode];

    // 1. Sky + Sun/Moon + Clouds + Twinkles
    const sg = g.createLinearGradient(0, 0, 0, 290);
    sg.addColorStop(0, SKY[0]); sg.addColorStop(0.55, SKY[1]); sg.addColorStop(1, SKY[2]);
    g.fillStyle = sg; g.fillRect(0, 0, W, H);

    if (skyMode !== "day") {
      const sr = K.rng(53);
      for (let i = 0; i < (skyMode === "night" ? 18 : 8); i++) {
        const sx = 22 + sr() * (W - 44), sy = 22 + sr() * 140;
        g.fillStyle = "rgba(255,248,200,0.88)";
        g.beginPath(); g.arc(sx, sy, 1.5 + sr() * 1.4, 0, 7); g.fill();
      }
    }
    if (skyMode === "night") {
      g.save(); g.translate(W - 68, 66); g.rotate(-0.35);
      g.fillStyle = "#FFF1A8"; g.beginPath(); g.moveTo(0, -16); g.quadraticCurveTo(-22, 0, 0, 16); g.quadraticCurveTo(-7, 0, 0, -16); g.fill();
      g.restore();
    } else {
      const sunY = skyMode === "dusk" ? 132 : 84;
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4 + 0.2;
        K.blob(g, K.tube([[92 + 30 * Math.cos(a), sunY + 30 * Math.sin(a)], [92 + 40 * Math.cos(a), sunY + 40 * Math.sin(a)]], 5), "orange", { depth: 1.2, soft: 1.8, sheen: false, rim: 0.4 });
      }
      K.blob(g, K.ball(92, sunY, 24, 24, { lump: 0.5, seed: 3 }), "#FFE45C", { sheen: { x: 84, y: sunY - 9, rx: 7, ry: 4 } });
      K.press(g, K.ball(84, sunY - 4, 2, 2.5, { lump: 0.05 }), "black", { sheen: false, texture: 0 });
      K.press(g, K.ball(100, sunY - 4, 2, 2.5, { lump: 0.05 }), "black", { sheen: false, texture: 0 });
      K.groove(g, K.poly([[84, sunY + 4], [92, sunY + 9], [100, sunY + 4]], false), 1.3);
    }

    const cloud = (cx, cy, s, seed) => K.blob(g, K.merge(K.ball(cx, cy, 22 * s, 12 * s, { lump: 0.5, seed }), K.ball(cx + 18 * s, cy - 5 * s, 15 * s, 12 * s, { lump: 0.5, seed: seed + 1 }), K.ball(cx - 18 * s, cy + 2 * s, 13 * s, 10 * s, { lump: 0.5, seed: seed + 2 })), skyMode === "night" ? "#9AA8E8" : "white", { depth: 2.5, soft: 4 });
    cloud(355, 76, 1, 11); cloud(210, 124, 0.7, 21);

    // 2. Lion Rock + Peak Terrace (Day 90) + Lion Rock Pavilion (Day 75) + HK Skyline
    const hill = [[-10, 260], [36, 225], [96, 206], [142, 180], [174, 174], [202, 194], [260, 212], [355, 225], [440, 206], [W + 10, 224], [W + 10, 310], [-10, 310]];
    K.blob(g, K.blobPoly(hill, { lump: 1, seed: 4, step: 16 }), skyMode === "night" ? "#266858" : "#3FAE6A", { depth: 4, soft: 7, sheen: false });
    if (days >= 75) {
      K.blob(g, K.slab(174, 170, 14, 7, 1.5, { lump: 0.2 }), "#D9C3B0", { depth: 1, sheen: false });
      K.blob(g, K.blobPoly([[162, 166], [186, 166], [190, 159], [158, 159]], { lump: 0.2 }), "orange", { depth: 1, sheen: false });
    }
    if (days >= 90) {
      K.blob(g, K.slab(438, 198, 30, 10, 3, { lump: 0.3 }), "#FFF4E2", { depth: 1.5, sheen: false });
      K.blob(g, K.blobPoly([[418, 192], [458, 192], [464, 184], [412, 184]], { lump: 0.2 }), "teal", { depth: 1.5, sheen: false });
    }

    const r = K.rng(77), cols = ["pink", "teal", "purple", "orange", "blue", "green", "red", "yellow"];
    let sx = 6, bi = 0;
    while (sx < W - 12) {
      const bw = 30 + r() * 24, bh = 55 + r() * 75, col = cols[bi % cols.length]; bi++;
      const top = 300 - bh;
      K.blob(g, K.slab(sx + bw / 2, top + bh / 2, bw, bh, 5, { lump: 0.7, seed: bi * 11 }), col, { depth: 3, soft: 5 });
      for (let wy = top + 12; wy < 285; wy += 14) {
        for (let wx = sx + 6; wx < sx + bw - 8; wx += 9) {
          if (r() > 0.5) K.press(g, K.rrc(wx + 2, wy, 4, 6, 1), skyMode === "day" ? "cream" : "#FFF3A6", { sheen: false, texture: 0, depth: 0.5, soft: 0.7, rim: 0.2 });
        }
      }
      if (days >= 21 && bi % 3 === 0) {
        const bx = sx + bw / 2, gr = g.createLinearGradient(bx, top, bx + (bi % 2 ? 25 : -25), 25);
        gr.addColorStop(0, "rgba(255,216,77,0.35)"); gr.addColorStop(1, "rgba(255,216,77,0)");
        g.fillStyle = gr; g.beginPath(); g.moveTo(bx - 2, top); g.lineTo(bx + (bi % 2 ? 32 : -32), 25); g.lineTo(bx + (bi % 2 ? 18 : -18), 25); g.closePath(); g.fill();
      }
      sx += bw + 4 + r() * 6;
    }
    // Haze behind pier
    g.fillStyle = skyMode === "night" ? "rgba(24,33,90,0.35)" : "rgba(255,255,255,0.28)";
    g.fillRect(0, 150, W, 155);

    // Day 45 Clock Tower on right promenade
    if (days >= 45) {
      K.blob(g, K.slab(456, 260, 26, 90, 4, { lump: 0.4, seed: 45 }), "#D84D3F", { depth: 2.5, soft: 4 });
      K.blob(g, K.blobPoly([[441, 215], [471, 215], [456, 192]], { lump: 0.3 }), "#EAE2D2", { depth: 1.5, sheen: false });
      K.press(g, K.ball(456, 232, 8, 8, { lump: 0.1 }), "white", { sheen: false });
      K.groove(g, K.poly([[456, 232], [456, 227], [460, 232]], false), 1.3);
      hitZones.push({ x: 438, y: 192, w: 38, h: 112, milestone: D.milestoneFor(45) });
    }

    // 3. Harbour Sea & Boats
    K.blob(g, K.slab(W / 2, 355, W + 24, 120, 0, { lump: 0.4, seed: 5 }), skyMode === "night" ? "#1E66B8" : "blue", { depth: 4, soft: 7, sheen: false, texture: 0.12 });
    for (let row = 0; row < 4; row++) {
      const pts = []; for (let x = -8; x <= W + 8; x += 14) pts.push([x, 304 + row * 24 + Math.sin(x / 22 + row) * 3]);
      K.blob(g, K.tube(pts, 5 - row * 0.5), row % 2 ? "#5DB3F5" : "sky", { depth: 1.4, soft: 2, sheen: false, rim: 0.4 });
    }
    // Day 7 Star Ferry
    if (days >= 7) {
      g.save(); g.translate(362, 286);
      K.blob(g, K.blobPoly([[4, 24], [84, 24], [78, 36], [10, 36]], { lump: 0.3, seed: 3 }), "#1E7A4C", { depth: 1.5, sheen: false });
      K.blob(g, K.slab(44, 17, 68, 12, 3, { lump: 0.25 }), "white", { depth: 1, sheen: false });
      K.blob(g, K.slab(44, 7, 56, 9, 2, { lump: 0.2 }), "#2E8B57", { depth: 1, sheen: false });
      g.restore();
      hitZones.push({ x: 362, y: 284, w: 88, h: 42, milestone: D.milestoneFor(7) });
    }
    // Day 13 Red-Sail Junk (or Day 60 Golden Sail)
    if (days >= 13) {
      const sailCol = days >= 60 ? "yellow" : "red";
      g.save(); g.translate(28, 282);
      K.blob(g, K.tube([[34, 4], [34, 34]], 2.2), "brown", { depth: 0.8, sheen: false });
      K.blob(g, K.blobPoly([[16, 8], [32, 6], [34, 30], [14, 32]], { lump: 0.3 }), sailCol, { depth: 1.5, sheen: false });
      K.blob(g, K.blobPoly([[38, 12], [52, 10], [54, 30], [36, 31]], { lump: 0.3 }), sailCol, { depth: 1.5, sheen: false });
      K.blob(g, K.blobPoly([[4, 32], [64, 30], [58, 42], [10, 42]], { lump: 0.3 }), "#A0522D", { depth: 1.5, sheen: false });
      g.restore();
      hitZones.push({ x: 28, y: 282, w: 68, h: 44, milestone: D.milestoneFor(days >= 60 ? 60 : 13) });
    }

    // Day 7+ Insurance Net across harbour when shields > 0
    if (p.shields > 0) {
      g.save();
      g.strokeStyle = "#FFE45C"; g.lineWidth = 2.4;
      g.beginPath(); g.moveTo(95, 340); g.quadraticCurveTo(260, 362, 425, 340); g.stroke();
      for (let i = 0; i < p.shields; i++) {
        const bx = 225 + i * 70, by = 351;
        K.blob(g, K.ball(bx, by, 9, 9, { lump: 0.2 }), "red", { depth: 1, sheen: false });
        K.press(g, K.ball(bx, by, 4, 4, { lump: 0.1 }), "white", { sheen: false });
      }
      g.restore();
    }

    // 4. Clay Pier Platform + Tower Floors
    const baseY = 304;
    // Pillar
    K.blob(g, K.slab(260, 355, 76, 94, 8, { lump: 0.7, seed: 2 }), "#3A3F9E", { depth: 4, soft: 6 });
    // Day 4+ Bamboo Scaffold under wings
    if (days >= 4) {
      g.save();
      for (const sx of [-1, 1]) {
        const px = 260 + sx * 96;
        for (const ox of [-26, 0, 24]) K.blob(g, K.tube([[px + ox, baseY + 6], [px + ox - sx * 10, baseY + 62]], 3), "#D4B060", { depth: 0.8, sheen: false });
        for (const oy of [baseY + 22, baseY + 42]) K.blob(g, K.tube([[px - 32, oy], [px + 32, oy]], 2.8), "#D4B060", { depth: 0.8, sheen: false });
      }
      g.restore();
    }
    // Pier Deck Slab (wider once Day 1+)
    const deckW = days >= 1 ? 268 : 200;
    K.blob(g, K.slab(260, baseY, deckW, 26, 7, { lump: 0.8, seed: 6 }), "yellow", { sheen: { x: 185, y: baseY - 6, rx: 28, ry: 3 } });
    K.text(g, days >= 1 ? "海傍小天地 · HARBOUR KEEP" : "STARTER PIER · 起步碼頭", 260, baseY + 1, { size: 11, font: "display", color: "#25317A", weight: 900 });

    // Tower Floors (Days 4, 6, 9, 12, 14 + Infinite floors above)
    const floors = days >= 14 ? 5 + Math.min(4, Math.floor((days - 14) / 3)) : (days >= 12 ? 4 : days >= 9 ? 3 : days >= 6 ? 2 : days >= 4 ? 1 : 0);
    const floorCols = ["#FFF4E2", "#FFE1EB", "#E3F7F4", "#EFEAFF", "#FFF0A8", "#DDF4E5", "#FFE6D8", "#E6EFFF", "#FFF4E2"];
    const flH = 29, flW = 148;
    let topDeckY = baseY - 13;

    g.save();
    if (!reduceMotion() && popAt && performance.now() - popAt < 500) {
      const u = (performance.now() - popAt) / 500;
      const sc = 1 + Math.sin(u * Math.PI) * 0.06;
      g.translate(260, baseY); g.scale(sc, sc); g.translate(-260, -baseY);
    }

    for (let f = 0; f < floors; f++) {
      const fy = baseY - 13 - flH / 2 - f * flH;
      topDeckY = fy - flH / 2;
      K.blob(g, K.slab(260, fy, flW - f * 3, flH, 5, { lump: 0.5, seed: 20 + f }), floorCols[f % floorCols.length], { depth: 2.5, soft: 4, sheen: false });
      for (const wx of [-42, -14, 14, 42]) {
        K.press(g, K.rrc(260 + wx - 6, fy - 7, 12, 13, 3), skyMode === "night" ? "#FFE45C" : "#7FD3FF", { sheen: false, texture: 0, depth: 0.8 });
      }
      K.text(g, `${f + 1}F`, 260 - (flW - f * 3) / 2 + 13, fy + 1, { size: 9, font: "display", color: "#25317A", weight: 900 });
    }
    if (days >= 14) {
      // Rooftop Arch (5F+)
      K.blob(g, K.slab(260, topDeckY - 4, flW - floors * 2 + 10, 9, 4, { lump: 0.4 }), "pink", { depth: 1.5, sheen: false });
      topDeckY -= 8;
    }

    // Day 1: Piggy Bank
    if (days >= 1) {
      drawItemOn(g, "piggybank", 172, baseY - 25, 0.36);
      hitZones.push({ x: 148, y: baseY - 47, w: 48, h: 40, milestone: D.milestoneFor(1) });
    }
    // Day 2: Pineapple Bun Bakery Cart
    if (days >= 2) {
      drawItemOn(g, "polobun", 354, baseY - 24, 0.36);
      hitZones.push({ x: 330, y: baseY - 46, w: 48, h: 38, milestone: D.milestoneFor(2) });
    }
    // Day 3: Octopus & Passbook Kiosk (visible on right front pier wing)
    if (days >= 3) {
      drawItemOn(g, "passbook", 316, baseY - 19, 0.3);
      hitZones.push({ x: 294, y: baseY - 38, w: 44, h: 34, milestone: D.milestoneFor(3) });
    }
    // Day 5: Rice Sack (visible on left front pier wing)
    if (days >= 5 && floors >= 1) {
      drawItemOn(g, "ricesack", 204, baseY - 24, 0.28);
      hitZones.push({ x: 186, y: baseY - 42, w: 38, h: 34, milestone: D.milestoneFor(5) });
    }
    // Day 6: Cha Chaan Teng Neon Sign bracketed to 2F
    if (days >= 6 && floors >= 2) {
      const ny = baseY - 13 - flH * 1.5;
      K.blob(g, K.tube([[330, ny], [338, ny]], 3), "#2E2838", { depth: 0.8, sheen: false });
      K.blob(g, K.slab(354, ny, 38, 18, 4, { lump: 0.2 }), "#2E2838", { depth: 1.5, sheen: false });
      K.text(g, "茶餐廳", 354, ny + 1, { size: 9, font: "zh", color: "#FF5FA2", weight: 700 });
      hitZones.push({ x: 332, y: ny - 10, w: 44, h: 22, milestone: D.milestoneFor(6) });
    }
    // Day 8: Gold Padlock Vault
    if (days >= 8) {
      K.blob(g, K.slab(142, baseY - 22, 18, 16, 4, { lump: 0.2 }), "yellow", { depth: 1.5, sheen: false });
      K.blob(g, K.tube([[136, baseY - 28], [136, baseY - 35], [148, baseY - 35], [148, baseY - 28]], 3), "yellow", { depth: 1, sheen: false });
      hitZones.push({ x: 128, y: baseY - 40, w: 28, h: 30, milestone: D.milestoneFor(8) });
    }
    // Day 9: Bamboo Laundry Pole attached into 3F wall
    if (days >= 9 && floors >= 3) {
      const ly = baseY - 13 - flH * 2.5;
      K.blob(g, K.tube([[154, ly], [192, ly - 3]], 2), "#D4B060", { depth: 0.6, sheen: false });
      K.press(g, K.rrc(160, ly, 7, 10, 1), "pink", { sheen: false, texture: 0 });
      K.press(g, K.rrc(170, ly - 1, 7, 10, 1), "sky", { sheen: false, texture: 0 });
      hitZones.push({ x: 150, y: ly - 12, w: 44, h: 24, milestone: D.milestoneFor(9) });
    }
    // Day 10: 18222 Anti-Scam Lighthouse
    if (days >= 10) {
      K.blob(g, K.blobPoly([[96, baseY - 6], [116, baseY - 6], [112, baseY - 64], [100, baseY - 64]], { lump: 0.3 }), "white", { depth: 2, sheen: false });
      K.blob(g, K.slab(106, baseY - 68, 14, 12, 3, { lump: 0.2 }), "red", { depth: 1.2, sheen: false });
      K.press(g, K.ball(106, baseY - 68, 4.5, 4.5, { lump: 0.1 }), "#FFE45C", { sheen: false });
      hitZones.push({ x: 92, y: baseY - 78, w: 30, h: 74, milestone: D.milestoneFor(10) });
    }
    // Day 12: Calculator on 4F side shelf
    if (days >= 12 && floors >= 4) {
      const cy = baseY - 13 - flH * 3.5;
      K.blob(g, K.slab(339, cy + 10, 24, 5, 2, { lump: 0.2 }), "yellow", { depth: 1, sheen: false });
      drawItemOn(g, "calculator", 341, cy - 1, 0.24);
      hitZones.push({ x: 326, y: cy - 16, w: 28, h: 30, milestone: D.milestoneFor(12) });
    }
    // Day 25: Striped Parasol Deck
    if (days >= 25) {
      K.blob(g, K.tube([[402, baseY - 12], [402, baseY - 42]], 2.5), "brown", { depth: 0.8, sheen: false });
      K.blob(g, K.blobPoly([[380, baseY - 40], [424, baseY - 40], [402, baseY - 56]], { lump: 0.3 }), "pink", { depth: 1.5, sheen: false });
    }
    // Day 30: Ding-Ding Tram on right edge
    if (days >= 30) {
      g.save(); g.translate(418, baseY - 28);
      K.blob(g, K.slab(24, 0, 34, 34, 4, { lump: 0.3 }), "#2F9A4C", { depth: 1.5, sheen: false });
      K.press(g, K.rrc(12, -10, 24, 8, 2), "#FFF4E2", { sheen: false });
      K.press(g, K.rrc(12, 2, 24, 8, 2), "#FFF4E2", { sheen: false });
      g.restore();
    }
    // Day 35: Lanterns
    if (days >= 35) {
      for (const lx of [195, 238, 282, 325]) {
        K.blob(g, K.ball(lx, topDeckY - 6, 5.5, 6.5, { lump: 0.2 }), "red", { depth: 1, sheen: false });
      }
    }
    // Day 100: Golden Crab Statue
    if (days >= 100) {
      K.blob(g, K.slab(134, baseY - 38, 20, 12, 3, { lump: 0.2 }), "yellow", { depth: 1.5, sheen: false });
      K.blob(g, K.ball(134, baseY - 52, 11, 8, { lump: 0.2 }), "#FFE45C", { depth: 1.5 });
    }

    // 5. Companion Figures: Crab + Jack (Day 11+) + Jackie (Day 14+) or chosen Avatar on Rooftop!
    if (AV && AV.draw) {
      if (days >= 11) {
        g.save(); g.translate(194, topDeckY - 54); g.scale(0.24, 0.24);
        AV.draw(g, { who: "jack", stage: days >= 14 ? 1 : 0, tier: days >= 30 ? 3 : 2, hand: "piggy", mood: crabMood === "happy" ? "happy" : "idle", drops: 0, boost: days >= 14 });
        g.restore();
      }
      if (days >= 14) {
        g.save(); g.translate(296, topDeckY - 54); g.scale(0.24, 0.24);
        AV.draw(g, { who: "jackie", stage: days >= 21 ? 2 : 1, tier: days >= 30 ? 3 : 2, hand: "piggy", mood: crabMood === "happy" ? "happy" : "idle", drops: 0, boost: true });
        g.restore();
      }
    }
    // Main companion (Crab or chosen Jack/Jackie)
    const comp = p.avatar || "crab";
    if (comp === "crab" || !AV || !AV.draw) {
      g.save(); g.translate(260, topDeckY - 20); g.scale(0.78, 0.78);
      drawCrabCharacter(g, crabMood, crabHatFor(days));
      g.restore();
    } else {
      g.save(); g.translate(242, topDeckY - 72); g.scale(0.32, 0.32);
      AV.draw(g, { who: comp, stage: Math.min(3, Math.floor(days / 10)), tier: days >= 14 ? 3 : 1, hand: "piggy", mood: crabMood === "happy" ? "happy" : "idle", drops: 0, boost: days >= 7 });
      g.restore();
      g.save(); g.translate(284, topDeckY - 14); g.scale(0.55, 0.55);
      drawCrabCharacter(g, crabMood, crabHatFor(days));
      g.restore();
    }

    // Day 18+: Seagulls
    if (days >= 18) {
      for (const [gx, gy] of [[310, 56], [346, 44], [380, 62]]) {
        g.strokeStyle = "#fff"; g.lineWidth = 2.4; g.lineCap = "round";
        g.beginPath(); g.moveTo(gx - 8, gy); g.quadraticCurveTo(gx - 3, gy - 6, gx, gy); g.quadraticCurveTo(gx + 3, gy - 6, gx + 8, gy); g.stroke();
      }
    }
    g.restore();
  }

  // ---------- UI Rendering ----------
  function todayLog() {
    return (state.logs || []).find((l) => l.day_date === state.today) || null;
  }

  function renderAll() {
    const p = state.profile, days = p.totalDays || 0;
    const shownStreak = p.streakPreview != null ? p.streakPreview : (p.streak || 0);
    $("streakNum").textContent = String(shownStreak);
    $("shieldNum").textContent = String(p.shields || 0);
    const flNum = days >= 14 ? 5 + Math.floor((days - 14) / 3) : (days >= 12 ? 4 : days >= 9 ? 3 : days >= 6 ? 2 : days >= 4 ? 1 : 0);
    $("hudFloor").textContent = flNum === 0 ? "G/F" : `${flNum}F`;
    $("hudMode").textContent = days >= 14 ? "Infinite Keep" : "Starter Sprint";
    $("hudTotal").textContent = `Day ${days}`;
    $("hudBest").textContent = `Best ${p.bestStreak || 0}d`;

    // Sprint Track 1..14
    $("sprintProg").textContent = `${Math.min(14, days)} / 14`;
    const nodes = [];
    for (let i = 1; i <= 14; i++) {
      const li = document.createElement("li");
      li.className = "sprint-node" + (i <= days ? " done" : i === days + 1 ? " next" : "");
      const num = document.createElement("b"); num.textContent = i === 7 ? "7 🛟" : i === 14 ? "14 🎓" : String(i);
      const st = document.createElement("span"); st.textContent = i <= days ? "✓" : i === days + 1 ? "Today" : "·";
      li.title = D.milestoneFor(i).en + " · " + D.milestoneFor(i).zh;
      li.append(num, st);
      nodes.push(li);
    }
    $("sprintTrack").replaceChildren(...nodes);

    if (days >= 14) {
      const nextM = D.nextMilestoneAfter(days);
      const prevM = D.PIER_MILESTONES.filter((m) => m.day <= days).slice(-1)[0] || { day: 14 };
      const span = Math.max(1, nextM.day - prevM.day), pct = Math.min(100, Math.max(6, Math.round(((days - prevM.day) / span) * 100)));
      $("infBar").hidden = false;
      $("infNextText").textContent = `${nextM.en} · ${nextM.zh}`;
      $("infNextCount").textContent = `${days} / ${nextM.day}d`;
      $("infFill").style.width = pct + "%";
    } else {
      $("infBar").hidden = true;
    }

    const finBar = $("finisherBanner");
    if (days >= 14) {
      finBar.hidden = false;
      $("finisherSub").textContent = p.claimedAt
        ? "Entry saved! Download your 14-Day Commemorative Pass anytime."
        : "Claim your 14-Day Commemorative Pass & optional finisher prize registration.";
      $("certBtn").hidden = false;
      $("claimLockNote").textContent = p.claimedAt
        ? "Your Day-14 Sprint finish is registered! You can update your nickname/note or download your pass below."
        : "Unlocked! Leave an optional nickname & email for finisher follow-up, or download your pass right away.";
    } else {
      finBar.hidden = true;
      $("certBtn").hidden = true;
    }

    // Question selection & Card state
    const log = todayLog();
    const q = (log && D.questionById(log.qid)) || D.pickQuestion(uid, days, state.today, (state.logs || []).map((l) => l.qid));
    curQ = q;
    const dayNum = log && (log.status === "direct" || log.status === "rescued") ? log.day_num : days + 1;
    $("qSlate").innerHTML = dayNum <= 14
      ? `STARTER SPRINT · <b>DAY ${String(dayNum).padStart(2, "0")}</b> OF 14`
      : `INFINITE KEEP · <b>DAY ${dayNum}</b>`;
    $("qSlateZh").textContent = dayNum <= 14 ? `14日新手衝刺 · 第${dayNum}日打卡` : `無限擴建 · 第${dayNum}日打卡`;
    $("qDateChip").textContent = state.today;

    const cat = D.CATEGORIES[q.cat] || D.CATEGORIES.spend;
    const catEl = $("qCat");
    catEl.textContent = `${cat.en} · ${cat.zh}`;
    catEl.style.backgroundColor = cat.badgeBg;
    catEl.style.color = cat.badgeFg;

    const tc = $("qThumbCv"), tg = tc.getContext("2d");
    tg.setTransform(1, 0, 0, 1, 0, 0); tg.clearRect(0, 0, tc.width, tc.height);
    drawItemOn(tg, q.item, 48, 48, 0.86);

    $("qEn").textContent = q.en;
    $("qZh").textContent = q.zh;
    $("yesEn").textContent = q.yesText[0]; $("yesZh").textContent = q.yesText[1];
    $("noEn").textContent = q.noText[0]; $("noZh").textContent = q.noText[1];
    $("rescueText").textContent = q.rescue[0];
    $("rescueTextZh").textContent = q.rescue[1];
    $("doneTipEn").textContent = q.tip[0];
    $("doneTipZh").textContent = q.tip[1];

    if (log && (log.status === "direct" || log.status === "rescued")) {
      stopRescueTimer();
      $("qAsk").hidden = true; $("qRescue").hidden = true; $("qDone").hidden = false;
      $("doneHead").className = "oc-head good";
      $("doneTitle").textContent = log.status === "rescued" ? "Checked in via 60s Action!" : "Checked in for today!";
      $("doneTitleZh").textContent = log.status === "rescued" ? "60秒即場補救打卡成功！" : "今日打卡成功！";
      $("skipRescueWrap").hidden = true;
      $("nextCountdown").textContent = `Next daily question in ${hktMidnightLeft()} (HKT midnight) · 距離下一題仲有 ${hktMidnightLeft()}`;
    } else if (rescueActive) {
      $("qAsk").hidden = true; $("qRescue").hidden = false; $("qDone").hidden = true;
    } else if (log && log.status === "skipped") {
      $("qAsk").hidden = true; $("qRescue").hidden = true; $("qDone").hidden = false;
      $("doneHead").className = "oc-head skip";
      $("doneTitle").textContent = "Honest check-in paused for today";
      $("doneTitleZh").textContent = "今日先休息一陣，聽日再試！";
      $("skipRescueWrap").hidden = false;
      $("nextCountdown").textContent = `You can still do the 60s rescue before HKT midnight (${hktMidnightLeft()} left).`;
    } else {
      $("qAsk").hidden = false; $("qRescue").hidden = true; $("qDone").hidden = true;
    }

    $("syncCodeText").textContent = state.syncCode || "CRAB-LOCAL";
    document.querySelectorAll(".av-opt").forEach((b) => {
      b.setAttribute("aria-checked", String(b.dataset.av === (p.avatar || "crab")));
    });
    drawPier();
    drawCrabLogo();
  }

  // ---------- 60-second Rescue Countdown ----------
  function startRescue() {
    rescueActive = true;
    rescueStartedAt = Date.now();
    rescueRemain = 60;
    const btn = $("btnRescueDone");
    if (window.__dailyFastRescue) {
      btn.removeAttribute("aria-disabled");
    } else {
      btn.setAttribute("aria-disabled", "true");
    }
    $("rescueTimer").textContent = "60s";
    $("rescueBar").style.width = "100%";
    renderAll();
    clearInterval(rescueTimerId);
    rescueTimerId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - rescueStartedAt) / 1000);
      rescueRemain = Math.max(0, 60 - elapsed);
      $("rescueTimer").textContent = rescueRemain + "s";
      $("rescueBar").style.width = Math.max(0, (rescueRemain / 60) * 100) + "%";
      if (elapsed >= 3 || window.__dailyFastRescue) btn.removeAttribute("aria-disabled");
      if (rescueRemain <= 0) clearInterval(rescueTimerId);
    }, 250);
  }
  function stopRescueTimer() {
    rescueActive = false;
    clearInterval(rescueTimerId);
  }

  // ---------- API Sync & Offline Queue ----------
  async function apiPost(payload) {
    const r = await fetch("/api/daily", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ uid, key, ...payload }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j || !j.ok) {
      const err = new Error((j && j.error) || ("http_" + r.status));
      err.code = j && j.error;
      throw err;
    }
    return j;
  }

  function applyLocalCheckin(qid, firstPick, status) {
    const today = state.today || hktToday();
    const p = state.profile;
    const existing = (state.logs || []).find((l) => l.day_date === today);
    if (status === "skipped") {
      const entry = { day_date: today, day_num: (p.totalDays || 0) + 1, qid, first_pick: firstPick, status: "skipped", shield_saved: 0, streak_after: p.streak || 0 };
      state.logs = [entry, ...(state.logs || []).filter((l) => l.day_date !== today)];
      saveLocal();
      return { shieldSaved: 0, earnedShield: 0, sprintJustDone: false };
    }
    if (existing && (existing.status === "direct" || existing.status === "rescued")) return { shieldSaved: 0, earnedShield: 0, sprintJustDone: false };
    let streak = 1, shieldSaved = 0, shields = p.shields || 0;
    if (p.lastDate) {
      const diff = daysBetween(p.lastDate, today);
      if (diff === 1) streak = (p.streak || 0) + 1;
      else if (diff > 1 && p.streak > 0 && diff - 1 <= shields) {
        shieldSaved = diff - 1; shields -= shieldSaved; p.shieldsUsed = (p.shieldsUsed || 0) + shieldSaved; streak = p.streak + 1;
      }
    }
    const prevTotal = p.totalDays || 0;
    p.totalDays = prevTotal + 1;
    p.streak = streak; p.streakPreview = streak;
    p.bestStreak = Math.max(p.bestStreak || 0, streak);
    let earnedShield = 0;
    if (streak % 7 === 0 && shields < 2) { shields += 1; earnedShield = 1; }
    p.shields = shields;
    if (status === "rescued") p.rescues = (p.rescues || 0) + 1;
    p.lastDate = today;
    if (p.totalDays >= 14 && !p.sprintDoneAt) p.sprintDoneAt = new Date().toISOString();
    const entry = { day_date: today, day_num: p.totalDays, qid, first_pick: existing ? existing.first_pick : firstPick, status, shield_saved: shieldSaved, streak_after: streak };
    state.logs = [entry, ...(state.logs || []).filter((l) => l.day_date !== today)];
    saveLocal();
    return { shieldSaved, earnedShield, sprintJustDone: prevTotal < 14 && p.totalDays >= 14 };
  }

  async function submitCheckin(firstPick, status) {
    if (!curQ) return;
    unlockAudio();
    const qid = curQ.id;
    stopRescueTimer();
    const localRes = applyLocalCheckin(qid, firstPick, status);
    let res = localRes;
    try {
      const srv = await apiPost({ action: "checkin", qid, firstPick, status });
      state.today = srv.today || state.today;
      state.syncCode = srv.syncCode || state.syncCode;
      if (srv.profile) state.profile = srv.profile;
      if (Array.isArray(srv.logs)) state.logs = srv.logs;
      saveLocal();
      res = srv;
      $("saveStatus").textContent = "";
      $("saveStatus").className = "save-status";
    } catch {
      state.pending = [{ action: "checkin", qid, firstPick, status }];
      saveLocal();
      $("saveStatus").textContent = "Saved on this device — will sync next time online. · 已暫存於此裝置。";
      $("saveStatus").className = "save-status";
    }

    if (status === "skipped") {
      sfx("uiClose");
      sayTalk("Honest reflection counts too! Tap below anytime before midnight if you manage the 60s action.", "坦白面對都係一步！今日午夜前做到60秒行動隨時可以補救打卡！");
      $("shieldNotice").hidden = true;
    } else {
      const days = state.profile.totalDays;
      const m = D.milestoneFor(days);
      popAt = performance.now();
      if (!reduceMotion()) requestAnimationFrame(() => drawPier());
      sfx(res.sprintJustDone || res.earnedShield || days === 7 || days === 14 ? "stage" : "wise");
      if (A) A.music.setStage(Math.min(3, Math.floor(days / 4)));
      setCrabMood("happy", 3200);
      addStamp(
        res.sprintJustDone ? "14 DAYS COMPLETE! 🎓" : (status === "rescued" ? "60s RESCUE! ✓" : "CHECKED IN! ✓"),
        m.zh,
        res.sprintJustDone ? "gold" : "good",
      );
      sayTalk(`Unlocked Day ${days}: ${m.en}!`, `解鎖第${days}日：${m.zh}！`);

      const notes = [];
      if (res.shieldSaved) notes.push(`🛟 Insurance Net saved your streak across ${res.shieldSaved} missed day${res.shieldSaved > 1 ? "s" : ""}! 保險網幫你保住連勝！`);
      if (res.earnedShield) notes.push("🛟 Bonus! 7-day streak earned you an Insurance Net Streak Shield! 連勝7日送你一個保險網護盾！");
      $("shieldNotice").textContent = notes.join(" ");
      $("shieldNotice").hidden = !notes.length;
    }
    renderAll();
  }

  async function initSession() {
    try {
      const srv = await apiPost({ action: "init" });
      state.today = srv.today || state.today;
      state.syncCode = srv.syncCode || state.syncCode;
      if (srv.profile) state.profile = srv.profile;
      if (Array.isArray(srv.logs)) state.logs = srv.logs;
      saveLocal();
      if (state.pending && state.pending.length) {
        const job = state.pending.shift();
        await apiPost(job).then((s) => {
          if (s.profile) state.profile = s.profile;
          if (Array.isArray(s.logs)) state.logs = s.logs;
          saveLocal();
        }).catch(() => {});
      }
      renderAll();
    } catch {
      renderAll();
    }
  }

  // ---------- Event Wiring ----------
  document.addEventListener("pointerdown", unlockAudio, { once: true });
  document.addEventListener("keydown", unlockAudio, { once: true });

  $("btnYes").addEventListener("click", () => {
    if (!curQ) return;
    if (curQ.good === "yes") submitCheckin("yes", "direct");
    else { sfx("uiOpen"); setCrabMood("worried", 2500); sayTalk("Honesty is step 1! Try this 60-second micro-action right now to turn today around.", "肯面對已經贏咗一半！試吓用60秒即刻做個小補救！"); startRescue(); }
  });
  $("btnNo").addEventListener("click", () => {
    if (!curQ) return;
    if (curQ.good === "no") submitCheckin("no", "direct");
    else { sfx("uiOpen"); setCrabMood("worried", 2500); sayTalk("No worries at all — try this 60-second micro-action right now and still earn today's pier piece!", "唔緊要！用60秒即刻做一次呢個微行動，一樣可以今日打卡起碼頭！"); startRescue(); }
  });
  $("btnRescueDone").addEventListener("click", () => {
    if ($("btnRescueDone").getAttribute("aria-disabled") === "true") { sfx("uiNope"); return; }
    submitCheckin(curQ && curQ.good === "yes" ? "no" : "yes", "rescued");
  });
  $("btnRescueSkip").addEventListener("click", () => {
    submitCheckin(curQ && curQ.good === "yes" ? "no" : "yes", "skipped");
  });
  $("btnLateRescue").addEventListener("click", () => { sfx("uiOpen"); startRescue(); });

  $("dailyMute").addEventListener("click", () => {
    if (!A) return;
    A.unlock();
    const m = A.toggleMute();
    $("dailyMute").setAttribute("aria-pressed", String(m));
    if (!m) sfx("uiToggle");
  });
  if (A) $("dailyMute").setAttribute("aria-pressed", String(A.isMuted()));

  const SKIES = ["auto", "day", "dusk", "night"];
  $("skyBtn").addEventListener("click", () => {
    sfx("uiToggle");
    const i = (SKIES.indexOf(state.profile.sky || "auto") + 1) % SKIES.length;
    state.profile.sky = SKIES[i];
    saveLocal();
    drawPier();
    sayTalk(`Sky set to ${SKIES[i].toUpperCase()}.`, `天空切換為：${{ auto: "自動跟時段", day: "日光維港", dusk: "黃昏日落", night: "璀璨夜景" }[SKIES[i]]}。`);
    apiPost({ action: "claim", sky: state.profile.sky }).catch(() => {});
  });

  $("pierCv").addEventListener("click", (ev) => {
    unlockAudio();
    const r = $("pierCv").getBoundingClientRect();
    const x = ((ev.clientX - r.left) / r.width) * 520;
    const y = ((ev.clientY - r.top) / r.height) * 410;
    const hit = hitZones.slice().reverse().find((z) => x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h);
    if (hit && hit.milestone) {
      sfx("uiSelect");
      setCrabMood("happy", 1800);
      sayTalk(`Day ${hit.milestone.day}: ${hit.milestone.en} — ${hit.milestone.descEn}`, `第${hit.milestone.day}日：${hit.milestone.zh} — ${hit.milestone.descZh}`);
    } else {
      sfx("click");
      setCrabMood("happy", 1200);
      sayTalk("One small habit a day stacks taller than giant promises once a year!", "每日一個細習慣，疊起上嚟勁過一年一次空口講白話！");
    }
  });

  // ---------- Accessible Modals ----------
  let activeModal = null, modalOpener = null;
  function getTabbables(root) {
    return [...root.querySelectorAll('button:not([hidden]), a[href], input:not([hidden]), select:not([hidden]), [tabindex]:not([tabindex="-1"])')]
      .filter((el) => !el.closest("[hidden]") && el.offsetParent !== null);
  }
  function openModal(id, opener) {
    if (activeModal) closeModal(true);
    const m = $(id);
    if (!m) return;
    sfx("uiOpen");
    modalOpener = opener || document.activeElement;
    activeModal = m;
    $("dailyShell").inert = true;
    m.hidden = false;
    const tabs = getTabbables(m);
    if (tabs[0]) tabs[0].focus({ preventScroll: true });
  }
  function closeModal(quiet) {
    if (!activeModal) return;
    if (!quiet) sfx("uiClose");
    activeModal.hidden = true;
    $("dailyShell").inert = false;
    activeModal = null;
    if (modalOpener && typeof modalOpener.focus === "function") modalOpener.focus({ preventScroll: true });
    modalOpener = null;
  }

  document.addEventListener("keydown", (ev) => {
    if (activeModal) {
      if (ev.key === "Escape") { ev.preventDefault(); closeModal(); return; }
      if (ev.key === "Tab") {
        const tabs = getTabbables(activeModal);
        if (!tabs.length) { ev.preventDefault(); return; }
        const idx = tabs.indexOf(document.activeElement);
        if (ev.shiftKey && (idx <= 0 || idx === -1)) { ev.preventDefault(); tabs[tabs.length - 1].focus(); }
        else if (!ev.shiftKey && idx === tabs.length - 1) { ev.preventDefault(); tabs[0].focus(); }
      }
      return;
    }
    if (ev.target && /INPUT|TEXTAREA|SELECT/.test(ev.target.tagName)) return;
    if (!$("qAsk").hidden) {
      if (ev.key === "1") $("btnYes").click();
      else if (ev.key === "2") $("btnNo").click();
    }
    if (ev.key === "m" || ev.key === "M") $("dailyMute").click();
  });

  for (const [mId, cId] of [["logModal", "logClose"], ["remindModal", "remindClose"], ["syncModal", "syncClose"]]) {
    $(cId).addEventListener("click", () => closeModal());
    $(mId).addEventListener("click", (ev) => { if (ev.target === $(mId)) closeModal(); });
  }

  $("logBtn").addEventListener("click", () => {
    const logs = state.logs || [], days = state.profile.totalDays || 0;
    $("histGrid").replaceChildren(...(logs.length ? logs.slice(0, 28).map((l) => {
      const s = document.createElement("span");
      s.className = "hist-dot " + l.status;
      s.textContent = `${l.day_date.slice(5)} · ${l.status === "direct" ? "✓" : l.status === "rescued" ? "⏱✓" : "–"}`;
      return s;
    }) : [Object.assign(document.createElement("p"), { className: "modal-intro", textContent: "No check-ins recorded yet — answer today's question to place Day 1! 仲未有紀錄，答今日第一題就開始！" })]));
    $("mileList").replaceChildren(...D.PIER_MILESTONES.map((m) => {
      const li = document.createElement("li");
      if (days >= m.day) li.className = "unlocked";
      const badge = document.createElement("span"); badge.className = "md"; badge.textContent = `Day ${m.day}`;
      const body = document.createElement("div");
      const b = document.createElement("b"); b.textContent = `${m.en} · ${m.zh}`;
      const sm = document.createElement("small"); sm.textContent = `${m.descEn} ${m.descZh}`;
      body.append(b, sm); li.append(badge, body);
      return li;
    }));
    openModal("logModal", $("logBtn"));
  });

  $("remindBtn").addEventListener("click", () => openModal("remindModal", $("remindBtn")));
  $("syncBtn").addEventListener("click", () => {
    if (!$("claimName").value && state.profile.name) $("claimName").value = state.profile.name;
    if (!$("claimEmail").value && lsRaw(LS.email)) $("claimEmail").value = lsRaw(LS.email);
    if (!$("claimNote").value && state.profile.note) $("claimNote").value = state.profile.note;
    openModal("syncModal", $("syncBtn"));
  });
  $("openClaimBtn").addEventListener("click", () => $("syncBtn").click());

  // ---------- .ics Calendar Download & PWA Install ----------
  $("icsDownloadBtn").addEventListener("click", () => {
    sfx("uiDone");
    const t = ($("icsTime").value || "21:00").split(":");
    const hh = String(Math.max(0, Math.min(23, Number(t[0]) || 21))).padStart(2, "0");
    const mm = String(Math.max(0, Math.min(59, Number(t[1]) || 0))).padStart(2, "0");
    const d0 = hktToday().replace(/-/g, "");
    const uidIcs = `tff-daily-${uid.slice(0, 12)}@3fallcrab.com`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//3 Fall Crab//Harbour Keep Daily//EN",
      "BEGIN:VEVENT",
      `UID:${uidIcs}`,
      `DTSTAMP:${d0}T000000Z`,
      `DTSTART;TZID=Asia/Hong_Kong:${d0}T${hh}${mm}00`,
      "DURATION:PT5M",
      "RRULE:FREQ=DAILY;COUNT=30",
      "SUMMARY:3 Fall Crab Daily Check-in 每日理財打卡",
      "DESCRIPTION:30-second daily financial habit check-in to grow your clay Victoria Harbour pier: https://3fallcrab.com/daily",
      "URL:https://3fallcrab.com/daily",
      "BEGIN:VALARM",
      "TRIGGER:PT0M",
      "ACTION:DISPLAY",
      "DESCRIPTION:3 Fall Crab Daily Check-in",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "3fallcrab-daily-reminder.ics";
    document.body.append(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    $("icsStatus").textContent = "Calendar file downloaded! Open it to add your 30-day reminder. · 已下載行事曆檔案！";
    $("icsStatus").className = "post-status ok";
  });

  window.addEventListener("beforeinstallprompt", (ev) => {
    ev.preventDefault();
    deferredInstall = ev;
    $("pwaInstallWrap").hidden = false;
  });
  $("pwaInstallBtn").addEventListener("click", async () => {
    if (!deferredInstall) return;
    sfx("uiSelect");
    deferredInstall.prompt();
    try { await deferredInstall.userChoice; } catch {}
    deferredInstall = null;
    $("pwaInstallWrap").hidden = true;
  });

  // ---------- Companion, Sync Code, Claim & Day-14 Certificate ----------
  document.querySelectorAll(".av-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      sfx("uiSelect");
      const av = btn.dataset.av;
      state.profile.avatar = av;
      saveLocal();
      renderAll();
      apiPost({ action: "claim", avatar: av }).catch(() => {});
    });
  });

  $("copySyncBtn").addEventListener("click", async () => {
    sfx("uiDone");
    try {
      await navigator.clipboard.writeText(state.syncCode || "");
      $("syncStatus").textContent = "Sync Code copied! · 備份碼已複製！";
      $("syncStatus").className = "post-status ok";
    } catch {
      $("syncStatus").textContent = "Copy code: " + (state.syncCode || "");
      $("syncStatus").className = "post-status";
    }
  });

  $("restoreForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const code = $("restoreInput").value.trim();
    if (!code) return;
    $("restoreBtn").setAttribute("aria-disabled", "true");
    try {
      const srv = await apiPost({ action: "restore", syncCode: code });
      state.today = srv.today || state.today;
      state.syncCode = srv.syncCode || code.toUpperCase();
      if (srv.profile) state.profile = srv.profile;
      if (Array.isArray(srv.logs)) state.logs = srv.logs;
      saveLocal();
      renderAll();
      sfx("uiDone");
      $("syncStatus").textContent = "Progress restored! · 進度已還原！";
      $("syncStatus").className = "post-status ok";
      $("restoreInput").value = "";
    } catch (e) {
      sfx("uiNope");
      $("syncStatus").textContent = e.code === "rate_limited" ? "Too many attempts — wait a few minutes." : "Sync Code not found. Check spelling (e.g. CRAB-XXXX-YYYY).";
      $("syncStatus").className = "post-status bad";
    } finally {
      $("restoreBtn").removeAttribute("aria-disabled");
    }
  });

  $("claimForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const name = $("claimName").value.trim();
    const email = $("claimEmail").value.trim();
    const note = $("claimNote").value.trim();
    $("claimSubmitBtn").setAttribute("aria-disabled", "true");
    try {
      const srv = await apiPost({ action: "claim", name, email, note, claim: true });
      if (email) lsRawSet(LS.email, email);
      if (srv.profile) state.profile = srv.profile;
      saveLocal();
      renderAll();
      sfx("uiDone");
      $("claimStatus").textContent = state.profile.totalDays >= 14
        ? "Saved & Day-14 Sprint claimed! You can download your pass below. · 已儲存並完成登記！"
        : "Preferences saved! Keep checking in toward Day 14. · 已儲存資料！";
      $("claimStatus").className = "post-status ok";
    } catch (e) {
      sfx("uiNope");
      $("claimStatus").textContent = e.code === "bad_email" ? "That email does not look valid. 請檢查電郵格式。" : "Could not save right now — try again shortly.";
      $("claimStatus").className = "post-status bad";
    } finally {
      $("claimSubmitBtn").removeAttribute("aria-disabled");
    }
  });

  $("certBtn").addEventListener("click", () => {
    sfx("uiDone");
    const c = document.createElement("canvas");
    c.width = 1080; c.height = 1350;
    const g = c.getContext("2d");
    // Background matching 3 Fall Fun clay cards
    g.fillStyle = "#FFD23F"; g.fillRect(0, 0, 1080, 1350);
    K.blob(g, K.slab(540, 675, 960, 1210, 44, { lump: 2, seed: 8 }), "#FFF4E2", { depth: 8, soft: 14, sheen: false });
    K.blob(g, K.slab(540, 145, 960, 150, 38, { lump: 1.5, seed: 9 }), "#FF5FA2", { depth: 5, soft: 8, sheen: false });
    K.text(g, "3 FALL CRAB · HARBOUR KEEP", 540, 120, { size: 38, font: "display", color: "#2E2838", weight: 900 });
    K.text(g, "14日理財衝刺完成證書 · STARTER SPRINT PASS", 540, 174, { size: 28, font: "zh", color: "#2E2838", weight: 700 });

    // Copy current pier diorama into centre frame
    const pier = $("pierCv");
    if (pier) {
      g.save();
      g.beginPath(); g.roundRect(140, 260, 800, 630, 32); g.clip();
      g.drawImage(pier, 140, 260, 800, 630);
      g.restore();
    }

    const p = state.profile;
    const who = (p.name || $("claimName").value.trim() || "Harbour Keeper").slice(0, 18);
    K.text(g, who, 540, 965, { size: 54, font: "display", color: "#25317A", weight: 900 });
    K.text(g, `Total Days: ${p.totalDays}   ·   Best Streak: ${p.bestStreak} days   ·   Shields: ${p.shields}/2`, 540, 1035, { size: 28, font: "sans", color: "#1D6631", weight: 800 });
    const keeper = (p.note || $("claimNote").value.trim() || "One small steady money step every day.").slice(0, 64);
    K.text(g, `“${keeper}”`, 540, 1110, { size: 26, font: "zh", color: "#5B516C", weight: 700 });
    K.text(g, `3fallcrab.com/daily  ·  HSUHK Personal Finance Ambassador 2026`, 540, 1215, { size: 22, font: "sans", color: "#2E2838", weight: 700 });

    c.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `3fallcrab-day${p.totalDays}-pass.png`;
      document.body.append(a); a.click();
      setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    }, "image/png");
  });

  // ---------- In-app browser tip & Service Worker ----------
  if (IAB) {
    $("dailyIab").hidden = false;
    $("dailyIabText").textContent = `Opened inside ${IAB}. Open in your phone browser to pin Harbour Keep to your home screen & keep reminders working.`;
    if (ANDROID) {
      $("dailyIabOpen").hidden = false;
      $("dailyIabOpen").textContent = "Open in Chrome";
      $("dailyIabOpen").addEventListener("click", () => {
        location.href = `intent://${location.host}${location.pathname}${location.search}#Intent;scheme=https;package=com.android.chrome;end`;
      });
    }
    $("dailyIabCopy").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(location.href); $("dailyIabStatus").textContent = "Copied link! 已複製連結"; } catch {}
    });
    $("dailyIabClose").addEventListener("click", () => { $("dailyIab").hidden = true; });
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }
  if (AV && AV.onCast) AV.onCast(() => { drawPier(); drawCrabLogo(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { drawPier(); });

  renderAll();
  initSession();
})();
