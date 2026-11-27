// Harbour Keep (/daily) — Full-screen Forest-inspired 3D daily habit check-in & turntable gallery.
(() => {
  "use strict";
  const D = window.TFF_DAILY;
  const A = window.DailyAudio;
  const S3D = window.TFF_DAILY3D;
  const $ = (id) => document.getElementById(id);

  // ---------- Storage & Browser Environment ----------
  const LS = {
    uid: "tff_daily_uid",
    key: "tff_daily_key",
    state: "tff_daily_state",
    email: "tff_daily_email",
    dragSeen: "tff_daily_drag_seen",
    lang: "tff_daily_lang",
  };
  const lsGet = (k, fb) => { try { const v = localStorage.getItem(k); return v == null ? fb : JSON.parse(v); } catch { return fb; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  const lsRaw = (k) => { try { return localStorage.getItem(k) || ""; } catch { return ""; } };
  const lsRawSet = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  let lang = (() => {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (q === "zh" || q === "en") return q;
    } catch {}
    const saved = lsRaw(LS.lang);
    if (saved === "zh" || saved === "en") return saved;
    const navLang = (navigator.language || "").toLowerCase();
    return navLang.startsWith("zh") ? "zh" : "en";
  })();
  const t = (en, zh) => (lang === "zh" ? zh : en);

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

  // ---------- Day-0 Starter Island + Complete 3D Showcase Catalog ----------
  const DAY0_INFO = {
    day: 0,
    prop: "crab",
    en: "3 Fall Crab & Starter Pier",
    zh: "蟹仔與起步碼頭",
    descEn: "Your clay Victoria Harbour pier and 3 Fall Crab mascot, ready to grow one steady day at a time.",
    descZh: "漂浮喺維港海面嘅黏土碼頭同開朗蟹仔，陪你一日一步慢慢起好呢座小天地。",
  };

  function floorLabelFor(days) {
    if (days <= 0) return t("G/F", "地下");
    const fl = days >= 14 ? 5 + Math.floor((days - 14) / 3) : (days >= 12 ? 4 : days >= 9 ? 3 : days >= 6 ? 2 : days >= 4 ? 1 : 0);
    return fl === 0 ? t("G/F", "地下") : (lang === "zh" ? `${fl}樓` : `${fl}F`);
  }

  function milestoneInfo(day) {
    const d = Math.max(0, Math.floor(Number(day) || 0));
    if (d === 0) return DAY0_INFO;
    return D.milestoneFor(d);
  }

  function showcaseDays() {
    const days = [0, ...D.PIER_MILESTONES.map((m) => m.day)];
    const cur = state.profile.totalDays || 0;
    if (cur > 100) {
      for (let w = 114; w <= cur + 14; w += 14) days.push(w);
      if (!days.includes(cur)) days.push(cur);
    }
    return [...new Set(days)].sort((a, b) => a - b);
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
  let rescueTimerId = 0, rescueStartedAt = 0, rescueRemain = 60, rescueActive = false, lastRescueChime = 60;
  let mood = "idle", moodTimer = 0;
  let dockCollapsed = false;
  let viewMode = "island"; // 'island' | 'item'
  let inspectDay = null;
  let lastTappedDay = null;
  let audioUnlocked = false;
  let deferredInstall = null;
  let stage = null;

  const RING_CIRC = 2 * Math.PI * 116; // 728.849...

  function saveLocal() { lsSet(LS.state, state); }

  function tierFor(days) {
    if (days >= 14) return 3;
    if (days >= 7) return 2;
    if (days >= 3) return 1;
    return 0;
  }

  function resolvedSky(pref, days) {
    if (pref === "day" || pref === "dusk" || pref === "night") return pref;
    if (days >= 21) return "night";
    if (days >= 13) return "dusk";
    const hr = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Hong_Kong", hour: "2-digit", hour12: false }).format(new Date()));
    if (hr >= 17 && hr <= 19) return "dusk";
    if (hr >= 20 || hr <= 5) return "night";
    return "day";
  }

  function applySkyTheme(sky) {
    document.body.dataset.sky = sky;
    const meta = $("themeColorMeta");
    if (meta) {
      meta.setAttribute("content", sky === "night" ? "#121C38" : sky === "dusk" ? "#C76B6B" : "#14968B");
    }
    if (A && typeof A.setSky === "function") {
      try { A.setSky(sky); } catch {}
    }
  }

  // ---------- Audio Integration (Reinvented DailyAudio) ----------
  function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    if (A) {
      try {
        A.setSky(resolvedSky(state.profile.sky, state.profile.totalDays || 0));
        A.setTier(tierFor(state.profile.totalDays || 0));
        A.unlock();
      } catch {}
    }
  }
  const sfx = (name) => {
    try {
      if (A && typeof A.sfx === "function") {
        if (!audioUnlocked) unlockAudio();
        A.sfx(name);
      }
    } catch {}
  };

  function syncMuteBtn(muted) {
    const btn = $("dailyMute");
    if (!btn) return;
    btn.setAttribute("aria-pressed", String(muted));
    btn.setAttribute("aria-label", muted ? t("Unmute sound", "開啟音效") : t("Mute sound", "靜音"));
  }

  function applyLangUI() {
    document.documentElement.lang = lang === "zh" ? "zh-HK" : "en";
    document.body.dataset.lang = lang;
    const lb = $("langBtn");
    if (lb) {
      lb.textContent = lang === "zh" ? "EN" : "粵";
      lb.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切換至廣東話");
      lb.setAttribute("title", lang === "zh" ? "Switch to English (L)" : "切換廣東話 (L)");
    }
    document.querySelectorAll(".lang-opt").forEach((b) => {
      b.setAttribute("aria-checked", String(b.dataset.langOpt === lang));
    });
    if ($("skyBtn")) $("skyBtn").setAttribute("aria-label", t("Cycle sky mood", "切換天空時間"));
    if ($("dockToggle")) $("dockToggle").setAttribute("aria-label", t("Collapse check-in card", "收起打卡卡"));
    if ($("orbitLeftBtn")) $("orbitLeftBtn").setAttribute("aria-label", t("Rotate left", "向左旋轉"));
    if ($("orbitResetBtn")) $("orbitResetBtn").setAttribute("aria-label", t("Reset 3D angle", "重設視角"));
    if ($("orbitRightBtn")) $("orbitRightBtn").setAttribute("aria-label", t("Rotate right", "向右旋轉"));
    if ($("inspectPrevBtn")) $("inspectPrevBtn").setAttribute("aria-label", t("Previous 3D Thing", "上一個景物"));
    if ($("inspectNextBtn")) $("inspectNextBtn").setAttribute("aria-label", t("Next 3D Thing", "下一個景物"));
    if ($("logClose")) $("logClose").setAttribute("aria-label", t("Close collection", "關閉圖鑑"));
    if ($("remindClose")) $("remindClose").setAttribute("aria-label", t("Close reminders", "關閉提醒"));
    if ($("syncClose")) $("syncClose").setAttribute("aria-label", t("Close pass and settings", "關閉證書與設定"));
    if ($("claimName")) $("claimName").placeholder = t("e.g. Ming", "例如：小明");
    if ($("claimNote")) $("claimNote").placeholder = t("e.g. Autopay credit card in full", "例如：信用卡自動轉賬全數找清");
    if ($("restoreInput")) $("restoreInput").placeholder = "CRAB-XXXX-YYYY";
    if (A && typeof A.isMuted === "function") syncMuteBtn(A.isMuted());
  }

  function svgUse(symId, cls = "ui-ico") {
    const NS = "http://www.w3.org/2000/svg";
    const s = document.createElementNS(NS, "svg");
    s.setAttribute("class", cls);
    s.setAttribute("aria-hidden", "true");
    const u = document.createElementNS(NS, "use");
    u.setAttribute("href", "#" + symId);
    s.appendChild(u);
    return s;
  }

  let talkTimer = 0;
  function sayTalk(en, zh, holdMs = 4500) {
    $("talkEn").textContent = en;
    $("talkZh").textContent = zh;
    const pill = $("pierTalk");
    if (!pill) return;
    pill.classList.remove("is-quiet");
    clearTimeout(talkTimer);
    if (holdMs > 0) {
      talkTimer = setTimeout(() => {
        pill.classList.add("is-quiet");
      }, holdMs);
    }
  }

  function addStamp(en, zh, cls = "good") {
    const wrap = $("pierStamp");
    if (!wrap) return;
    const s = document.createElement("div");
    s.className = "stamp " + cls;
    const b = document.createElement("span");
    b.textContent = t(en, zh);
    s.append(b);
    wrap.replaceChildren(s);
    setTimeout(() => { if (s.parentNode === wrap) s.remove(); }, 2300);
  }

  function setMood(m, ms = 2600) {
    mood = m;
    clearTimeout(moodTimer);
    sync3DState();
    if (ms > 0) moodTimer = setTimeout(() => { mood = "idle"; sync3DState(); }, ms);
  }

  // ---------- Three.js 3D World Bridge ----------
  function computeVerticalOffset() {
    const mobile = window.innerWidth < 640;
    const isDone = $("checkinCard")?.classList.contains("is-done");
    if (rescueActive) return 0.25;
    if (viewMode === "item") return 0.25;
    if (dockCollapsed) return 0.04;
    if (isDone) return mobile ? 0.34 : 0.32;
    return mobile ? 0.26 : 0.24;
  }

  function sync3DState() {
    const p = state.profile, days = p.totalDays || 0;
    const sky = resolvedSky(p.sky, days);
    applySkyTheme(sky);
    if (A && typeof A.setTier === "function") {
      try { A.setTier(tierFor(days)); } catch {}
    }
    if (!stage) return;
    try {
      stage.setState({
        totalDays: days,
        streak: p.streakPreview != null ? p.streakPreview : (p.streak || 0),
        shields: p.shields || 0,
        sky,
        avatar: p.avatar || "crab",
        mood,
      });
      stage.setVerticalOffset(computeVerticalOffset());
    } catch {}
  }

  function mount3D() {
    const el = $("stage3d");
    if (!el || !S3D || !S3D.isSupported || !S3D.isSupported()) {
      $("stageFallback").hidden = false;
      return;
    }
    const p = state.profile, days = p.totalDays || 0;
    const sky = resolvedSky(p.sky, days);
    try {
      stage = S3D.mount(el, {
        totalDays: days,
        streak: p.streakPreview != null ? p.streakPreview : (p.streak || 0),
        shields: p.shields || 0,
        sky,
        avatar: p.avatar || "crab",
        mood,
        onFirstDrag: () => {
          unlockAudio();
          const hint = $("swipeHint");
          if (hint) hint.classList.add("seen");
          lsRawSet(LS.dragSeen, "1");
        },
        onOrbitTick: () => {
          if (audioUnlocked) sfx("orbitTick");
        },
        onTapProp: (payload) => {
          unlockAudio();
          sfx("tapProp");
          const tappedDay = typeof payload === "number"
            ? payload
            : (payload && typeof payload.day === "number" ? payload.day : null);
          if (tappedDay != null) {
            lastTappedDay = tappedDay;
            const m = milestoneInfo(tappedDay);
            setMood("happy", 1800);
            sayTalk(
              `Day ${m.day}: ${m.en}. Tap "Closer Look" to spin it up close.`,
              `第${m.day}日：${m.zh}。撳「近睇模型」可以 360° 近距離旋轉欣賞。`,
            );
          } else {
            setMood("happy", 1400);
            sayTalk(
              "One small habit a day outlasts big promises made once a year.",
              "每日一個小習慣，疊起上嚟勁過一年講一次宏願。",
            );
          }
        },
      });
      if (!stage) {
        $("stageFallback").hidden = false;
      } else {
        window.__dailyStage = stage;
        stage.setVerticalOffset(computeVerticalOffset());
      }
    } catch {
      stage = null;
      $("stageFallback").hidden = false;
    }
  }

  // ---------- 3D Individual Thing Inspect Mode ----------
  function enterInspect(day) {
    if (rescueActive) return;
    const targetDay = Math.max(0, Math.floor(Number(day) || 0));
    const days = state.profile.totalDays || 0;
    const locked = targetDay > 0 && targetDay > days;
    viewMode = "item";
    inspectDay = targetDay;
    sfx("select");
    if (stage && typeof stage.inspectMilestone === "function") {
      try {
        stage.inspectMilestone(targetDay, { locked });
        stage.setVerticalOffset(computeVerticalOffset());
      } catch {}
    }
    const m = milestoneInfo(targetDay);
    sayTalk(
      locked ? `Previewing Day ${m.day}: ${m.en}` : `Inspecting Day ${m.day}: ${m.en}`,
      locked ? `預覽第${m.day}日：${m.zh}` : `近睇第${m.day}日：${m.zh}`,
      3600,
    );
    renderModeUI();
  }

  function exitInspect(quiet) {
    if (viewMode === "island") return;
    viewMode = "island";
    inspectDay = null;
    if (!quiet) sfx("cardClose");
    if (stage && typeof stage.inspectMilestone === "function") {
      try {
        stage.inspectMilestone(null);
        stage.setVerticalOffset(computeVerticalOffset());
      } catch {}
    }
    renderModeUI();
  }

  function stepInspect(delta) {
    const list = showcaseDays();
    const cur = inspectDay == null ? 0 : inspectDay;
    let idx = list.indexOf(cur);
    if (idx === -1) {
      idx = list.findIndex((d) => d >= cur);
      if (idx === -1) idx = list.length - 1;
    }
    const nextIdx = (idx + delta + list.length) % list.length;
    enterInspect(list[nextIdx]);
  }

  function setDockCollapsed(collapsed, quiet) {
    dockCollapsed = !!collapsed;
    const card = $("checkinCard");
    card.dataset.collapsed = String(dockCollapsed);
    $("dockExpandBtn").hidden = !dockCollapsed;
    $("dockExpandedBody").hidden = dockCollapsed;
    if (!quiet) sfx(dockCollapsed ? "cardClose" : "cardOpen");
    if (stage) {
      try { stage.setVerticalOffset(computeVerticalOffset()); } catch {}
    }
  }

  function renderModeUI() {
    const inInspect = viewMode === "item" && !rescueActive;
    $("stagePill").hidden = inInspect;
    $("backIslandBtn").hidden = !inInspect;
    $("orbitStrip").hidden = rescueActive;
    $("checkinCard").hidden = rescueActive || inInspect;
    $("qRescue").hidden = !rescueActive;
    $("focusRingOverlay").hidden = !rescueActive;
    $("inspectBar").hidden = !inInspect;
    $("inspectToggleBtn").hidden = rescueActive || inInspect;
    $("inspectToggleBtn").setAttribute("aria-pressed", String(inInspect));
    $("inspectToggleText").textContent = "Closer Look";

    // Nav tab active indicator
    $("navPier").classList.toggle("active", !inInspect);
    $("navPier").setAttribute("aria-current", !inInspect ? "page" : "false");
    $("logBtn").classList.toggle("active", inInspect);

    if (inInspect && inspectDay != null) {
      const days = state.profile.totalDays || 0;
      const m = milestoneInfo(inspectDay);
      const locked = m.day > 0 && m.day > days;
      const fl = m.day === 0 ? t("Pier", "碼頭") : floorLabelFor(m.day);
      $("inspectDayPill").textContent = t(`Day ${String(m.day).padStart(2, "0")} · ${fl}`, `第${m.day}日 · ${fl}`);
      const st = $("inspectStatusPill");
      st.className = "inspect-status " + (locked ? "locked" : "unlocked");
      st.replaceChildren(
        svgUse(locked ? "ico-sym-lock" : "ico-sym-check", "ui-ico xs"),
        document.createTextNode(locked ? t(`Unlocks Day ${m.day}`, `第${m.day}日解鎖`) : t("Unlocked", "已解鎖")),
      );
      $("inspectTitleEn").textContent = m.en;
      $("inspectTitleZh").textContent = m.zh;
      $("inspectDescEn").textContent = m.descEn;
      $("inspectDescZh").textContent = m.descZh;
    }

    if (stage) {
      try { stage.setVerticalOffset(computeVerticalOffset()); } catch {}
    }
  }

  // ---------- UI Rendering ----------
  function todayLog() {
    return (state.logs || []).find((l) => l.day_date === state.today) || null;
  }

  function renderAll() {
    applyLangUI();
    const p = state.profile, days = p.totalDays || 0;
    const shownStreak = p.streakPreview != null ? p.streakPreview : (p.streak || 0);
    $("streakNum").textContent = String(shownStreak);
    $("shieldNum").textContent = String(p.shields || 0);
    $("hudFloor").textContent = floorLabelFor(days);
    $("hudTotal").textContent = t(`Day ${days}`, `第 ${days} 日`);
    $("hudMode").textContent = days >= 14 ? t("Infinite Keep", "無限擴建") : t("Starter Sprint", "14日新手衝刺");
    $("hudBest").textContent = t(`Best ${p.bestStreak || 0}d`, `最佳 ${p.bestStreak || 0} 日`);

    // Sprint Track 1..14 inside Field Guide Sheet (every chip clicks directly into 3D Inspect)
    $("sprintProg").textContent = `${Math.min(14, days)} / 14`;
    const nodes = [];
    for (let i = 1; i <= 14; i++) {
      const li = document.createElement("li");
      li.className = "sprint-node";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sprint-chip" + (i <= days ? " done" : i === days + 1 ? " next" : "");
      const m = D.milestoneFor(i);
      btn.title = t(m.en, m.zh);
      btn.setAttribute("aria-label", t(`Day ${i}: ${m.en}, inspect in 3D`, `第${i}日：${m.zh}，近睇3D模型`));
      const num = document.createElement("b");
      num.textContent = String(i);
      if (i === 7 || i === 14) {
        num.append(" ", svgUse(i === 7 ? "ico-sym-buoy" : "ico-sym-cap", "ui-ico xs"));
      }
      const st = document.createElement("span");
      if (i <= days) {
        st.append(svgUse("ico-sym-check", "ui-ico xs"));
      } else {
        st.textContent = i === days + 1 ? t("Next", "下個") : "3D";
      }
      btn.append(num, st);
      btn.addEventListener("click", () => {
        closeModal(true);
        enterInspect(i);
      });
      li.append(btn);
      nodes.push(li);
    }
    $("sprintTrack").replaceChildren(...nodes);

    if (days >= 14) {
      const nextM = D.nextMilestoneAfter(days);
      const prevM = D.PIER_MILESTONES.filter((m) => m.day <= days).slice(-1)[0] || { day: 14 };
      const span = Math.max(1, nextM.day - prevM.day);
      const pct = Math.min(100, Math.max(6, Math.round(((days - prevM.day) / span) * 100)));
      $("infBar").hidden = false;
      $("infNextText").textContent = t(nextM.en, nextM.zh);
      $("infNextCount").textContent = t(`${days} / ${nextM.day}d`, `第 ${days} / ${nextM.day} 日`);
      $("infFill").style.width = pct + "%";
    } else {
      $("infBar").hidden = true;
    }

    const finBar = $("finisherBanner");
    if (days >= 14) {
      finBar.hidden = false;
      $("finisherSub").textContent = p.claimedAt
        ? t("Entry saved! Download your 3D 14-Day Commemorative Pass anytime.", "登記已儲存！隨時可下載你嘅3D 14日完成證書。")
        : t("Claim your 3D 14-Day Commemorative Pass & optional finisher prize registration.", "領取3D 14日紀念證書及登記完成獎賞（選填）。");
      $("certBtn").hidden = false;
      $("claimLockNote").textContent = p.claimedAt
        ? t("Your Day-14 Sprint finish is registered! You can update your details or download your 3D pass below.", "你已完成14日衝刺登記！隨時可更新資料或下載3D紀念證書。")
        : t("Unlocked! Leave an optional nickname & email for finisher follow-up, or download your 3D pass right away.", "已解鎖！歡迎填寫暱稱同電郵登記完成獎賞，或即刻下載3D證書。");
    } else {
      finBar.hidden = true;
      $("certBtn").hidden = true;
      $("claimLockNote").textContent = t(
        "Complete 14 check-in days to unlock your 3D Commemorative Pass & finisher entry!",
        "累積滿14日打卡即可領取3D紀念證書同登記完成獎賞！",
      );
    }

    // Question selection & Check-in Card state
    const log = todayLog();
    const q = (log && D.questionById(log.qid)) || D.pickQuestion(uid, days, state.today, (state.logs || []).map((l) => l.qid));
    curQ = q;
    const dayNum = log && (log.status === "direct" || log.status === "rescued") ? log.day_num : days + 1;
    $("qSlate").textContent = dayNum <= 14
      ? t(`DAY ${String(dayNum).padStart(2, "0")} · 14`, `第 ${dayNum} / 14 日`)
      : t(`DAY ${dayNum} · INFINITE`, `第 ${dayNum} 日 · 無限模式`);
    $("qSlateZh").textContent = dayNum <= 14 ? `14日新手衝刺 · 第${dayNum}日打卡` : `無限擴建 · 第${dayNum}日打卡`;
    $("qDateChip").textContent = state.today;

    const cat = D.CATEGORIES[q.cat] || D.CATEGORIES.spend;
    const catEl = $("qCat");
    catEl.textContent = t(cat.en, cat.zh);
    catEl.style.backgroundColor = cat.badgeBg;
    catEl.style.color = cat.badgeFg;

    $("qEn").textContent = q.en;
    $("qZh").textContent = q.zh;
    $("yesEn").textContent = q.yesText[0]; $("yesZh").textContent = q.yesText[1];
    $("noEn").textContent = q.noText[0]; $("noZh").textContent = q.noText[1];
    $("rescueText").textContent = q.rescue[0];
    $("rescueTextZh").textContent = q.rescue[1];
    $("doneTipEn").textContent = q.tip[0];
    $("doneTipZh").textContent = q.tip[1];

    const card = $("checkinCard");
    if (log && (log.status === "direct" || log.status === "rescued")) {
      stopRescueTimer();
      card.classList.add("is-done");
      $("qAsk").hidden = true;
      $("qDone").hidden = false;
      $("doneHead").className = "oc-head good";
      $("doneTitle").textContent = log.status === "rescued" ? "Checked in with 60s fix!" : "Checked in for today!";
      $("doneTitleZh").textContent = log.status === "rescued" ? "60秒即場補救打卡成功！" : "今日打卡成功！";
      $("skipRescueWrap").hidden = true;
      $("inspectTodayBtn").hidden = false;
      const left = hktMidnightLeft();
      $("nextCountdown").textContent = t(`Next question in ${left} (HKT midnight)`, `下一題仲有 ${left}（香港時間午夜更新）`);
      $("collapsedIco").replaceChildren(svgUse("ico-sym-check", "ui-ico sm"));
      $("collapsedLabelEn").textContent = `Day ${log.day_num} Checked in · View Note`;
      $("collapsedLabelZh").textContent = `已完成第${log.day_num}日打卡 · 展開睇筆記`;
    } else if (rescueActive) {
      card.classList.remove("is-done");
      $("qAsk").hidden = true;
      $("qDone").hidden = true;
    } else if (log && log.status === "skipped") {
      card.classList.add("is-done");
      $("qAsk").hidden = true;
      $("qDone").hidden = false;
      $("doneHead").className = "oc-head skip";
      $("doneTitle").textContent = "Resting for today";
      $("doneTitleZh").textContent = "今日先抖一抖，聽日再試";
      $("skipRescueWrap").hidden = false;
      $("inspectTodayBtn").hidden = true;
      const left = hktMidnightLeft();
      $("nextCountdown").textContent = t(
        `Quick 60s fix stays open until HKT midnight (${left} left).`,
        `午夜前仲可以做60秒補救打卡（仲有 ${left}）。`,
      );
      $("collapsedIco").replaceChildren(svgUse("ico-sym-timer", "ui-ico sm"));
      $("collapsedLabelEn").textContent = "Resting today · Tap for 60s fix";
      $("collapsedLabelZh").textContent = "今日休息 · 撳入做60秒補救";
    } else {
      card.classList.remove("is-done");
      $("qAsk").hidden = false;
      $("qDone").hidden = true;
      $("collapsedIco").replaceChildren(svgUse("ico-sym-sprout", "ui-ico sm"));
      $("collapsedLabelEn").textContent = `Today's Check-in · Day ${String(dayNum).padStart(2, "0")}`;
      $("collapsedLabelZh").textContent = `今日打卡 · 第${dayNum}日題目`;
    }

    $("syncCodeText").textContent = state.syncCode || "CRAB-LOCAL";
    document.querySelectorAll(".av-opt[data-av]").forEach((b) => {
      b.setAttribute("aria-checked", String(b.dataset.av === (p.avatar || "crab")));
    });

    renderModeUI();
    sync3DState();
  }

  // ---------- 60-Second Forest-Style Circular Focus Rescue ----------
  function startRescue() {
    if (viewMode === "item") exitInspect(true);
    setDockCollapsed(false, true);
    rescueActive = true;
    rescueStartedAt = Date.now();
    rescueRemain = 60;
    lastRescueChime = 60;
    const btn = $("btnRescueDone");
    if (window.__dailyFastRescue) {
      btn.removeAttribute("aria-disabled");
    } else {
      btn.setAttribute("aria-disabled", "true");
    }
    $("rescueTimer").textContent = "60s";
    $("rescueBar").style.width = "100%";
    const arc = $("focusRingArc");
    if (arc) {
      arc.setAttribute("stroke-dasharray", RING_CIRC.toFixed(2));
      arc.setAttribute("stroke-dashoffset", "0");
    }
    mood = "focus";
    if (A && typeof A.setFocusMode === "function") {
      try { A.setFocusMode(true); } catch {}
    }
    if (stage && typeof stage.setFocusProgress === "function") {
      try { stage.setFocusProgress(0.02); } catch {}
    }
    renderAll();

    clearInterval(rescueTimerId);
    rescueTimerId = setInterval(() => {
      const elapsedMs = Date.now() - rescueStartedAt;
      const elapsedSec = elapsedMs / 1000;
      const progress = Math.min(1, Math.max(0.02, elapsedSec / 60));
      rescueRemain = Math.max(0, Math.ceil(60 - elapsedSec));
      $("rescueTimer").textContent = rescueRemain + "s";
      $("rescueBar").style.width = Math.max(0, ((60 - Math.min(60, elapsedSec)) / 60) * 100) + "%";
      if (arc) {
        arc.setAttribute("stroke-dashoffset", (RING_CIRC * Math.min(1, elapsedSec / 60)).toFixed(2));
      }
      if (stage && typeof stage.setFocusProgress === "function") {
        try { stage.setFocusProgress(progress); } catch {}
      }
      // Subtle mindful wood-pulse every 15 seconds (45s, 30s, 15s)
      if ((rescueRemain === 45 || rescueRemain === 30 || rescueRemain === 15) && lastRescueChime !== rescueRemain) {
        lastRescueChime = rescueRemain;
        sfx("rescueTick");
      }
      if (elapsedSec >= 3 || window.__dailyFastRescue) btn.removeAttribute("aria-disabled");
      if (rescueRemain <= 0) clearInterval(rescueTimerId);
    }, 150);
  }

  function stopRescueTimer() {
    const wasActive = rescueActive;
    rescueActive = false;
    clearInterval(rescueTimerId);
    if (wasActive) {
      if (A && typeof A.setFocusMode === "function") {
        try { A.setFocusMode(false); } catch {}
      }
      if (stage && typeof stage.setFocusProgress === "function") {
        try { stage.setFocusProgress(0); } catch {}
      }
      if (mood === "focus") mood = "idle";
    }
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
    if (existing && (existing.status === "direct" || existing.status === "rescued")) {
      return { shieldSaved: 0, earnedShield: 0, sprintJustDone: false };
    }
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
      $("saveStatus").textContent = t("Saved on this phone; it will sync when back online.", "已暫存於手機，恢復連線後自動同步。");
      $("saveStatus").className = "save-status";
    }

    if (status === "skipped") {
      sfx("cardClose");
      sayTalk(
        "Honest tracking counts too. The 60s fix stays open until midnight.",
        "坦白面對都係一步。午夜前做到60秒小行動隨時補救打卡。",
      );
      $("shieldNotice").hidden = true;
    } else {
      const days = state.profile.totalDays;
      const m = D.milestoneFor(days);
      const isSpecial = res.sprintJustDone || res.earnedShield || days === 7 || days === 14 || D.PIER_MILESTONES.some((x) => x.day === days && days > 14);
      if (res.sprintJustDone) sfx("sprint14");
      else if (isSpecial) sfx("milestone");
      else if (status === "rescued") sfx("rescueBloom");
      else sfx("yesBloom");
      if (res.shieldSaved) setTimeout(() => sfx("shieldCatch"), 380);

      setMood(res.sprintJustDone ? "proud" : "happy", 3400);
      if (stage && typeof stage.celebrate === "function") {
        try {
          stage.celebrate(
            res.sprintJustDone ? "sprint14"
              : res.shieldSaved ? "shield"
              : isSpecial ? "milestone"
              : status === "rescued" ? "rescue" : "yes",
          );
        } catch {}
      }

      addStamp(
        res.sprintJustDone ? "14 DAYS COMPLETE!" : (status === "rescued" ? "60s FIX COMPLETE" : "CHECKED IN"),
        res.sprintJustDone ? "14日衝刺完成！" : (status === "rescued" ? "60秒補救打卡！" : "今日打卡成功！"),
        res.sprintJustDone ? "gold" : "good",
      );
      sayTalk(`Unlocked Day ${days}: ${m.en}`, `解鎖第${days}日：${m.zh}`);

      const notes = [];
      if (res.shieldSaved) {
        notes.push(t(
          `Insurance Net saved your streak across ${res.shieldSaved} missed day${res.shieldSaved > 1 ? "s" : ""}.`,
          `保險網幫你遮擋咗 ${res.shieldSaved} 日斷纜，保住連勝！`,
        ));
      }
      if (res.earnedShield) {
        notes.push(t(
          "Bonus: your 7-day streak earned an Insurance Net Shield.",
          "獎勵：連勝7日送你一個「保險網」防斷纜護盾！",
        ));
      }
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
  if (lsRaw(LS.dragSeen) === "1") {
    const hint = $("swipeHint");
    if (hint) hint.classList.add("seen");
  }

  $("btnYes").addEventListener("click", () => {
    if (!curQ) return;
    if (curQ.good === "yes") submitCheckin("yes", "direct");
    else {
      sfx("rescueStart");
      sayTalk(
        "No problem. Take 60 seconds right now to turn today around.",
        "唔緊要，用60秒即刻做個小補救，一樣可以打卡。",
      );
      startRescue();
    }
  });
  $("btnNo").addEventListener("click", () => {
    if (!curQ) return;
    if (curQ.good === "no") submitCheckin("no", "direct");
    else {
      sfx("rescueStart");
      sayTalk(
        "No problem. Try this 60-second action now to place today's piece.",
        "唔緊要！用60秒做一次微行動，一樣可以打卡解鎖今日景物。",
      );
      startRescue();
    }
  });
  $("btnRescueDone").addEventListener("click", () => {
    if ($("btnRescueDone").getAttribute("aria-disabled") === "true") { sfx("nope"); return; }
    submitCheckin(curQ && curQ.good === "yes" ? "no" : "yes", "rescued");
  });
  $("btnRescueSkip").addEventListener("click", () => {
    submitCheckin(curQ && curQ.good === "yes" ? "no" : "yes", "skipped");
  });
  $("btnLateRescue").addEventListener("click", () => {
    sfx("rescueStart");
    startRescue();
  });

  // Dock collapse / expand
  $("dockToggle").addEventListener("click", () => setDockCollapsed(true));
  $("dockExpandBtn").addEventListener("click", () => setDockCollapsed(false));

  // Orbit & 3D Inspect controls
  $("orbitLeftBtn").addEventListener("click", () => {
    unlockAudio();
    sfx("orbitTick");
    if (stage && typeof stage.nudgeOrbit === "function") stage.nudgeOrbit(-0.45, 0);
  });
  $("orbitRightBtn").addEventListener("click", () => {
    unlockAudio();
    sfx("orbitTick");
    if (stage && typeof stage.nudgeOrbit === "function") stage.nudgeOrbit(0.45, 0);
  });
  $("orbitResetBtn").addEventListener("click", () => {
    unlockAudio();
    sfx("select");
    if (stage && typeof stage.resetCamera === "function") stage.resetCamera();
  });
  $("inspectToggleBtn").addEventListener("click", () => {
    unlockAudio();
    if (viewMode === "item") {
      exitInspect();
    } else {
      const target = lastTappedDay != null ? lastTappedDay : (state.profile.totalDays || 0);
      enterInspect(target);
    }
  });
  $("inspectTodayBtn").addEventListener("click", () => {
    unlockAudio();
    enterInspect(state.profile.totalDays || 0);
  });
  $("backIslandBtn").addEventListener("click", () => exitInspect());
  $("inspectBackBtn").addEventListener("click", () => exitInspect());
  $("inspectPrevBtn").addEventListener("click", () => stepInspect(-1));
  $("inspectNextBtn").addEventListener("click", () => stepInspect(1));

  // Nav Pier button: exit inspect or toggle check-in sheet cleanly
  $("navPier").addEventListener("click", () => {
    unlockAudio();
    if (viewMode === "item") {
      exitInspect();
      setDockCollapsed(false, true);
    } else if (!rescueActive) {
      setDockCollapsed(!dockCollapsed);
    }
  });

  // Sound Mute Toggle
  $("dailyMute").addEventListener("click", () => {
    if (!A) return;
    const m = A.toggleMute();
    if (!m) {
      unlockAudio();
      try { A.unlock(); } catch {}
      sfx("select");
    }
    syncMuteBtn(m);
  });
  if (A && typeof A.isMuted === "function") {
    syncMuteBtn(A.isMuted());
  }

  // Language Toggle (English <-> Cantonese 廣東話)
  function setLang(next, announce = true) {
    const clean = next === "zh" ? "zh" : "en";
    if (lang === clean) return;
    lang = clean;
    lsRawSet(LS.lang, lang);
    renderAll();
    if (activeModal && activeModal.id === "logModal") renderLogSheet();
    if (announce) {
      sfx("select");
      sayTalk("Switched to English.", "已切換至廣東話介面。");
    }
  }
  $("langBtn").addEventListener("click", () => {
    unlockAudio();
    setLang(lang === "zh" ? "en" : "zh", true);
  });
  document.querySelectorAll(".lang-opt").forEach((btn) => {
    btn.addEventListener("click", () => {
      unlockAudio();
      setLang(btn.dataset.langOpt, true);
    });
  });

  // Sky Mood Toggle: cycles day -> dusk -> night -> day from currently displayed sky
  const SKY_ORDER = ["day", "dusk", "night"];
  $("skyBtn").addEventListener("click", () => {
    unlockAudio();
    const cur = resolvedSky(state.profile.sky, state.profile.totalDays || 0);
    const next = SKY_ORDER[(SKY_ORDER.indexOf(cur) + 1) % SKY_ORDER.length];
    state.profile.sky = next;
    saveLocal();
    sync3DState();
    sfx("skyShift");
    const labels = {
      day: ["Daylight Harbour", "日光維港"],
      dusk: ["Golden Hour Dusk", "黃昏日落"],
      night: ["Starlit Harbour Night", "璀璨夜景"],
    }[next];
    sayTalk(`Sky switched to ${labels[0]}.`, `天空已切換為：${labels[1]}。`);
    apiPost({ action: "claim", sky: next }).catch(() => {});
  });

  window.addEventListener("resize", () => {
    if (stage) {
      try {
        stage.resize();
        stage.setVerticalOffset(computeVerticalOffset());
      } catch {}
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
    sfx("cardOpen");
    modalOpener = opener || document.activeElement;
    activeModal = m;
    $("dailyShell").inert = true;
    m.hidden = false;
    const tabs = getTabbables(m);
    if (tabs[0]) tabs[0].focus({ preventScroll: true });
  }
  function closeModal(quiet) {
    if (!activeModal) return;
    if (!quiet) sfx("cardClose");
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

    if (ev.key === "Escape" && viewMode === "item") {
      ev.preventDefault();
      exitInspect();
      return;
    }
    if (!$("qAsk").hidden && !$("checkinCard").hidden && !dockCollapsed) {
      if (ev.key === "1") { $("btnYes").click(); return; }
      if (ev.key === "2") { $("btnNo").click(); return; }
    }
    if (ev.key === "l" || ev.key === "L") { $("langBtn").click(); return; }
    if (ev.key === "m" || ev.key === "M") { $("dailyMute").click(); return; }
    if (ev.key === "r" || ev.key === "R") { $("orbitResetBtn").click(); return; }
    if (stage && typeof stage.nudgeOrbit === "function") {
      if (ev.key === "ArrowLeft") { ev.preventDefault(); stage.nudgeOrbit(-0.28, 0); return; }
      if (ev.key === "ArrowRight") { ev.preventDefault(); stage.nudgeOrbit(0.28, 0); return; }
      if (ev.key === "ArrowUp") { ev.preventDefault(); stage.nudgeOrbit(0, -0.14); return; }
      if (ev.key === "ArrowDown") { ev.preventDefault(); stage.nudgeOrbit(0, 0.14); return; }
    }
  });

  for (const [mId, cId] of [["logModal", "logClose"], ["remindModal", "remindClose"], ["syncModal", "syncClose"]]) {
    $(cId).addEventListener("click", () => closeModal());
    $(mId).addEventListener("click", (ev) => { if (ev.target === $(mId)) closeModal(); });
  }

  function renderLogSheet() {
    const logs = state.logs || [], days = state.profile.totalDays || 0;
    $("histGrid").replaceChildren(...(logs.length ? logs.slice(0, 28).map((l) => {
      const s = document.createElement("span");
      s.className = "hist-dot " + l.status;
      s.textContent = `${l.day_date.slice(5)} · ${l.status === "direct" ? t("Done", "打卡") : l.status === "rescued" ? t("60s fix", "補救") : t("Rest", "休息")}`;
      return s;
    }) : [Object.assign(document.createElement("p"), {
      className: "modal-intro",
      textContent: t(
        "No entries yet. Answer today's card to place your Day 1 landmark.",
        "仲未有紀錄，答今日第一題就放到第1日景物。",
      ),
    })]));

    const items = showcaseDays().map((d) => milestoneInfo(d));
    $("mileList").replaceChildren(...items.map((m) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      const unlocked = m.day === 0 || days >= m.day;
      btn.className = "mile-btn" + (unlocked ? " unlocked" : "");
      const badge = document.createElement("span");
      badge.className = "md";
      badge.textContent = m.day === 0 ? t("Day 0", "第0日") : t(`Day ${m.day}`, `第${m.day}日`);
      const body = document.createElement("div");
      const b = document.createElement("b");
      b.textContent = t(m.en, m.zh);
      const sm = document.createElement("small");
      sm.textContent = t(m.descEn, m.descZh);
      body.append(b, sm);
      const go = document.createElement("span");
      go.className = "mile-go";
      go.append(
        svgUse(unlocked ? "ico-sym-loupe" : "ico-sym-lock", "ui-ico xs"),
        document.createTextNode(unlocked ? t("Spin", "旋轉") : "3D"),
      );
      btn.append(badge, body, go);
      btn.addEventListener("click", () => {
        closeModal(true);
        enterInspect(m.day);
      });
      li.append(btn);
      return li;
    }));
  }

  $("logBtn").addEventListener("click", () => {
    renderLogSheet();
    openModal("logModal", $("logBtn"));
  });

  $("remindBtn").addEventListener("click", () => openModal("remindModal", $("remindBtn")));
  $("syncBtn").addEventListener("click", () => {
    if (!$("claimName").value && state.profile.name) $("claimName").value = state.profile.name;
    if (!$("claimEmail").value && lsRaw(LS.email)) $("claimEmail").value = lsRaw(LS.email);
    if (!$("claimNote").value && state.profile.note) $("claimNote").value = state.profile.note;
    openModal("syncModal", $("syncBtn"));
  });
  $("openClaimBtn").addEventListener("click", () => {
    closeModal(true);
    $("syncBtn").click();
  });

  // ---------- .ics Calendar Download & PWA Install ----------
  $("icsDownloadBtn").addEventListener("click", () => {
    sfx("done");
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
      "DESCRIPTION:30-second daily financial habit check-in to grow your 3D clay Victoria Harbour island: https://3fallcrab.com/daily",
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
    $("icsStatus").textContent = t(
      "Calendar file downloaded! Open it to add your 30-day reminder.",
      "已下載行事曆檔案！打開即可加入每日提醒。",
    );
    $("icsStatus").className = "post-status ok";
  });

  window.addEventListener("beforeinstallprompt", (ev) => {
    ev.preventDefault();
    deferredInstall = ev;
    $("pwaInstallWrap").hidden = false;
  });
  $("pwaInstallBtn").addEventListener("click", async () => {
    if (!deferredInstall) return;
    sfx("select");
    deferredInstall.prompt();
    try { await deferredInstall.userChoice; } catch {}
    deferredInstall = null;
    $("pwaInstallWrap").hidden = true;
  });

  // ---------- Companion, Sync Code, Claim & Day-14 3D Commemorative Pass ----------
  document.querySelectorAll(".av-opt[data-av]").forEach((btn) => {
    btn.addEventListener("click", () => {
      sfx("select");
      const av = btn.dataset.av;
      state.profile.avatar = av;
      saveLocal();
      renderAll();
      apiPost({ action: "claim", avatar: av }).catch(() => {});
    });
  });

  $("copySyncBtn").addEventListener("click", async () => {
    sfx("done");
    try {
      await navigator.clipboard.writeText(state.syncCode || "");
      $("syncStatus").textContent = t("Sync Code copied!", "備份碼已複製！");
      $("syncStatus").className = "post-status ok";
    } catch {
      $("syncStatus").textContent = t("Copy code: ", "請複製備份碼：") + (state.syncCode || "");
      $("syncStatus").className = "post-status";
    }
  });

  $("restoreForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const code = $("restoreInput").value.trim();
    if (!code) return;
    $("restoreBtn").setAttribute("aria-disabled", "true");
    try {
      // Mint a fresh device uid/key so restoring onto an already-initialized browser avoids 409 uid_conflict.
      const nextUid = randHex(24);
      const nextKey = randHex(32);
      const srv = await apiPost({ action: "restore", syncCode: code, uid: nextUid, key: nextKey });
      uid = nextUid;
      key = nextKey;
      lsRawSet(LS.uid, uid);
      lsRawSet(LS.key, key);
      state.today = srv.today || state.today;
      state.syncCode = srv.syncCode || code.toUpperCase();
      if (srv.profile) state.profile = srv.profile;
      if (Array.isArray(srv.logs)) state.logs = srv.logs;
      state.pending = [];
      saveLocal();
      renderAll();
      sfx("done");
      $("syncStatus").textContent = t("Progress restored!", "進度已還原！");
      $("syncStatus").className = "post-status ok";
      $("restoreInput").value = "";
    } catch (e) {
      sfx("nope");
      $("syncStatus").textContent = e.code === "rate_limited"
        ? t("Too many attempts — wait a few minutes.", "嘗試太頻密，請稍候再試。")
        : t("Sync Code not found. Check spelling (e.g. CRAB-XXXX-YYYY).", "搵唔到此備份碼，請檢查輸入（例如 CRAB-XXXX-YYYY）。");
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
      sfx("done");
      $("claimStatus").textContent = state.profile.totalDays >= 14
        ? t("Saved & Day-14 Sprint claimed! You can download your 3D pass below.", "已儲存並完成登記！可於下方下載你嘅3D證書。")
        : t("Preferences saved! Keep checking in toward Day 14.", "已儲存資料！繼續向14日進發。");
      $("claimStatus").className = "post-status ok";
    } catch (e) {
      sfx("nope");
      $("claimStatus").textContent = e.code === "bad_email"
        ? t("That email does not look valid.", "請檢查電郵格式。")
        : t("Could not save right now — try again shortly.", "暫時未能儲存，請稍後再試。");
      $("claimStatus").className = "post-status bad";
    } finally {
      $("claimSubmitBtn").removeAttribute("aria-disabled");
    }
  });

  function loadImg(src) {
    return new Promise((resolve) => {
      if (!src) { resolve(null); return; }
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  $("certBtn").addEventListener("click", async () => {
    sfx("done");
    const c = document.createElement("canvas");
    c.width = 1080; c.height = 1350;
    const g = c.getContext("2d");

    // Warm HK Passbook Commemorative Card
    const bg = g.createLinearGradient(0, 0, 0, 1350);
    bg.addColorStop(0, "#14968B");
    bg.addColorStop(1, "#0D565E");
    g.fillStyle = bg;
    g.fillRect(0, 0, 1080, 1350);

    // Warm cream main passbook sheet + inner double border
    g.save();
    g.shadowColor = "rgba(10,30,40,0.28)";
    g.shadowBlur = 36;
    g.shadowOffsetY = 14;
    g.fillStyle = "#FFF8EC";
    g.beginPath();
    g.roundRect(64, 64, 952, 1222, 42);
    g.fill();
    g.restore();

    g.strokeStyle = "#DECFAF";
    g.lineWidth = 3;
    g.beginPath();
    g.roundRect(84, 84, 912, 1182, 30);
    g.stroke();

    // Top coral celebratory ribbon
    g.save();
    g.beginPath();
    g.roundRect(64, 64, 952, 174, [42, 42, 16, 16]);
    const rib = g.createLinearGradient(64, 64, 1016, 238);
    rib.addColorStop(0, "#FF7B35");
    rib.addColorStop(1, "#D84D18");
    g.fillStyle = rib;
    g.fill();
    g.restore();

    // Perforated ticket seam below photo + traditional HK red ink stamp chop
    g.save();
    g.setLineDash([12, 10]);
    g.strokeStyle = "#D4C29F";
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(106, 1154); g.lineTo(974, 1154); g.stroke();
    g.restore();

    g.save();
    g.translate(876, 978);
    g.rotate(-0.14);
    g.strokeStyle = "#C9352B";
    g.lineWidth = 5;
    g.beginPath(); g.roundRect(-72, -38, 144, 76, 12); g.stroke();
    g.fillStyle = "#C9352B";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = '900 22px "Noto Sans HK",sans-serif';
    g.fillText("海傍印記", 0, -11);
    g.font = '900 18px "Gluten",sans-serif';
    g.fillText(`DAY ${state.profile.totalDays}`, 0, 16);
    g.restore();

    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = "#FFFFFF";
    g.font = '900 38px "Gluten","Arial Rounded MT Bold",sans-serif';
    g.fillText("3 FALL CRAB · HARBOUR KEEP", 540, 128);
    g.font = '700 26px "LXGW WenKai TC","Noto Sans HK",sans-serif';
    g.fillText(t("STARTER SPRINT 14-DAY 3D PASS", "14日理財衝刺完成 3D 紀念證書"), 540, 184);

    // 3D Live Snapshot Window
    let snapUrl = "";
    if (stage && typeof stage.snapshot === "function") {
      try { snapUrl = await Promise.resolve(stage.snapshot(800, 620)); } catch {}
    }
    const snapImg = await loadImg(snapUrl);
    g.save();
    g.beginPath();
    g.roundRect(140, 272, 800, 620, 32);
    g.clip();
    const frameBg = g.createLinearGradient(140, 272, 140, 892);
    frameBg.addColorStop(0, "#AEEAE4");
    frameBg.addColorStop(1, "#54AECB");
    g.fillStyle = frameBg;
    g.fillRect(140, 272, 800, 620);
    if (snapImg) {
      // Cover-fit snapshot cleanly inside frame
      const ir = snapImg.width / Math.max(1, snapImg.height);
      const fr = 800 / 620;
      let dw = 800, dh = 620, dx = 140, dy = 272;
      if (ir > fr) { dw = 620 * ir; dx = 140 - (dw - 800) / 2; }
      else { dh = 800 / ir; dy = 272 - (dh - 620) / 2; }
      g.drawImage(snapImg, dx, dy, dw, dh);
    }
    g.restore();
    g.strokeStyle = "#E5DAC6";
    g.lineWidth = 4;
    g.beginPath();
    g.roundRect(140, 272, 800, 620, 32);
    g.stroke();

    const p = state.profile;
    const who = (p.name || $("claimName").value.trim() || t("Harbour Keeper", "海傍守望者")).slice(0, 18);
    g.fillStyle = "#1E2430";
    g.font = '900 54px "Gluten","Arial Rounded MT Bold",sans-serif';
    g.fillText(who, 540, 962);

    g.fillStyle = "#1D6F36";
    g.font = '800 27px "Noto Sans HK",system-ui,sans-serif';
    g.fillText(
      t(
        `Total Days: ${p.totalDays}   ·   Best Streak: ${p.bestStreak}d   ·   Shields: ${p.shields}/2`,
        `累積打卡：${p.totalDays} 日   ·   最長連勝：${p.bestStreak} 日   ·   護盾：${p.shields}/2`,
      ),
      540,
      1032,
    );

    const keeper = (p.note || $("claimNote").value.trim() || t("One small steady money step every day.", "每日一個小習慣，慢慢儲起更好嘅未來。")).slice(0, 64);
    g.fillStyle = "#4B5668";
    g.font = '700 25px "LXGW WenKai TC","Noto Sans HK",sans-serif';
    g.fillText(`“${keeper}”`, 540, 1106);

    g.fillStyle = "#0F766E";
    g.font = '700 22px "Noto Sans HK",system-ui,sans-serif';
    g.fillText("3fallcrab.com/daily  ·  HSUHK Personal Finance Ambassador 2026", 540, 1212);

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
    $("dailyIabText").textContent = t(
      `Opened inside ${IAB}. Open in your phone browser to pin Harbour Keep to your home screen & keep reminders working.`,
      `你而家正用 ${IAB} 內置瀏覽器開啟，建議轉用手機瀏覽器打開以加到主畫面及設定提醒。`,
    );
    if (ANDROID) {
      $("dailyIabOpen").hidden = false;
      $("dailyIabOpen").textContent = t("Open in Chrome", "以 Chrome 開啟");
      $("dailyIabOpen").addEventListener("click", () => {
        location.href = `intent://${location.host}${location.pathname}${location.search}#Intent;scheme=https;package=com.android.chrome;end`;
      });
    }
    $("dailyIabCopy").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(location.href);
        $("dailyIabStatus").textContent = t("Copied link!", "已複製連結！");
      } catch {}
    });
    $("dailyIabClose").addEventListener("click", () => { $("dailyIab").hidden = true; });
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  }

  // Expose lightweight controller hook for tests & diagnostics
  window.__dailyApp = {
    getStage: () => stage,
    inspectDay: (d) => enterInspect(d),
    exitInspect: () => exitInspect(true),
    setDockCollapsed: (v) => setDockCollapsed(v, true),
    getState: () => state,
    getLang: () => lang,
    setLang: (v) => setLang(v, false),
  };

  mount3D();
  renderAll();
  sayTalk("Drag to spin the harbour, or answer today's card below.", "左右拖曳轉動維港，答下面今日一題。", 4200);
  initSession();
  // Pre-warm Cantonese webfont silently after mount so switching to 粵 swaps with zero paint delay
  if (document.fonts && typeof document.fonts.load === "function") {
    setTimeout(() => {
      document.fonts.load('700 16px "LXGW WenKai TC"').catch(() => {});
      document.fonts.load('400 16px "LXGW WenKai TC"').catch(() => {});
    }, 120);
  }
})();
