// Full real-browser E2E suite driving built public/ in headless Chromium via CDP:
// desktop play, intro skip, all modals, Instagram exit intent & mobile back guard,
// challenge link /c + mobile IAB viewport fit, low-gfx detection, offline SW mode,
// 4-step end screen -> live /api/scores POST, /admin dashboard, and /poster QR toggle.
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { launchBrowser } from "./e2e/cdp.mjs";
import { startE2EServer } from "./e2e/server.mjs";

let browser, srv;

before(async () => {
  srv = await startE2EServer();
  browser = await launchBrowser();
});

after(async () => {
  await browser?.close();
  await srv?.close();
});

// Time-acceleration preload script used ONLY in the full-game simulation test.
const CLOCK_HOOK = `(() => {
  let prng = 0x2468ace1;
  const origRand = Math.random.bind(Math);
  Math.random = () => {
    const st = new Error().stack || "";
    if (st.includes("kaspersky-labs.com") || st.includes("NoCacheParameter")) return origRand();
    prng = (prng + 0x6d2b79f5) | 0;
    let t = Math.imul(prng ^ (prng >>> 15), 1 | prng);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const origRAF = window.requestAnimationFrame.bind(window);
  let rafCbs = [], simNow = performance.now(), hooksEnabled = false;
  const origNow = performance.now.bind(performance);
  window.requestAnimationFrame = (cb) => {
    if (!hooksEnabled) {
      return origRAF((ts) => {
        if (hooksEnabled) { rafCbs.push(cb); return; }
        cb(ts);
      });
    }
    rafCbs.push(cb);
    return rafCbs.length;
  };
  window.__enableSimClock = () => {
    if (hooksEnabled) return;
    hooksEnabled = true;
    prng = 0x2468ace1;
    simNow = origNow();
    performance.now = () => simNow;
  };
  window.__simReady = () => hooksEnabled && rafCbs.length > 0;
  window.__advanceFrames = (count, stepMs = 50) => {
    for (let i = 0; i < count; i++) {
      simNow += stepMs;
      const run = rafCbs;
      rafCbs = [];
      for (const cb of run) cb(simNow);
    }
  };
})();`;

test("E2E 1: desktop intro, title sheets, Instagram modal, and exit-intent prompts without trapping", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.goto(`${srv.baseUrl}/?intro=1`);

    // 1) Intro renders and skips cleanly into title screen
    await ctx.waitFor(() => !document.getElementById("intro").hidden);
    await ctx.click("#introSkip");
    await ctx.waitFor(() => document.getElementById("intro").hidden);
    assert.equal(await ctx.evalJs("sessionStorage.getItem('tff_intro_seen')"), "1");
    assert.equal(await ctx.evalJs("document.getElementById('startOv').hidden"), false);

    // 2) Title info sheets (Leaderboard -> Stats, How to play, Wardrobe, Privacy)
    await ctx.click("#tsLb");
    await ctx.waitFor(() => !document.getElementById("infoModal").hidden);
    assert.equal(await ctx.evalJs("document.querySelector('.set').inert"), true);
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("infoModal").hidden);
    assert.equal(await ctx.evalJs("document.querySelector('.set').inert"), false);

    // Non-fullscreen page view renders Crab Wardrobe inline
    await ctx.click("#tsFs");
    await ctx.waitFor(() => !document.documentElement.classList.contains("fs"));
    const nonFsWear = await ctx.evalJs(`(() => {
      const list = document.getElementById("wardrobeList");
      const r = list ? list.getBoundingClientRect() : { height: 0 };
      return {
        tiles: document.querySelectorAll("#wardrobeList .wtile").length,
        note: (document.getElementById("wardrobeNote")?.textContent || "").trim(),
        titles: document.querySelectorAll("#wardrobeTitles .wt-chip").length,
        height: Math.round(r.height),
      };
    })()`);
    assert.equal(nonFsWear.tiles, 9);
    assert.ok(nonFsWear.note.length > 0, "Missing wardrobe note in non-fullscreen view");
    assert.equal(nonFsWear.titles, 13);
    assert.ok(nonFsWear.height > 100, "Expected rendered #wardrobeList height > 100, got " + nonFsWear.height);
    await ctx.click("#fsBtn");
    await ctx.waitFor(() => document.documentElement.classList.contains("fs"));

    // 3) Manual Instagram popup & loaded QR image
    await ctx.click("#tsIg");
    await ctx.waitFor(() => !document.getElementById("igModal").hidden);
    const igInfo = await ctx.evalJs(`(() => {
      const img = document.querySelector('#igQrLink img');
      const go = document.getElementById('igGo');
      return {
        href: go && go.getAttribute('href'),
        complete: !!(img && img.complete),
        nw: img ? img.naturalWidth : 0,
        inertBehind: !!document.querySelector('.set').inert,
      };
    })()`);
    assert.equal(igInfo.href, "https://www.instagram.com/3fallfun_campaign?dlrf=azdibDNjdTk4MzQ4");
    assert.ok(igInfo.complete && igInfo.nw > 0, "IG QR image failed to load");
    assert.equal(igInfo.inertBehind, true);

    await ctx.sleep(360);
    await ctx.click("#igDismiss");
    await ctx.waitFor(() => document.getElementById("igModal").hidden);
    assert.equal(await ctx.evalJs("document.querySelector('.set').inert"), false);

    // 4) Reset tff_ig_seen, wait past 1.5s grace window, trigger desktop mouseout top exit-intent once
    await ctx.evalJs("sessionStorage.removeItem('tff_ig_seen')");
    await ctx.sleep(1650);
    await ctx.evalJs(`(() => {
      const ev = new MouseEvent('mouseout', { bubbles: true, cancelable: true, clientX: 300, clientY: 4, relatedTarget: null });
      document.dispatchEvent(ev);
    })()`);
    await ctx.waitFor(() => !document.getElementById("igModal").hidden);
    assert.equal(await ctx.evalJs("sessionStorage.getItem('tff_ig_seen')"), "1");
    await ctx.sleep(360);
    await ctx.click("#igClose");
    await ctx.waitFor(() => document.getElementById("igModal").hidden);

    // 5) Second mouseout in same session does NOT re-open
    await ctx.evalJs(`document.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, clientX: 300, clientY: 3, relatedTarget: null }))`);
    await ctx.sleep(150);
    assert.equal(await ctx.evalJs("document.getElementById('igModal').hidden"), true);

    // 6) Service Worker registered cleanly
    const swScope = await ctx.evalJs(`navigator.serviceWorker ? navigator.serviceWorker.ready.then(r => r.scope) : ''`);
    assert.ok(swScope.startsWith(srv.baseUrl), "Service Worker did not become ready: " + swScope);

    // 7) Service load balancer waiting room (?hold=1): Escape cancels cleanly back to #startOv; Skip enters game
    await ctx.goto(`${srv.baseUrl}/?intro=0&hold=1`);
    await ctx.waitFor(() => !document.getElementById("startBtn").hidden);
    await ctx.click("#startBtn");
    await ctx.waitFor(() => !document.getElementById("holdModal").hidden);
    assert.match(await ctx.evalJs("document.getElementById('holdPos').textContent"), /^#\d+/);
    assert.match(await ctx.evalJs("document.getElementById('holdEta').textContent"), /~\d+s/);
    assert.equal(await ctx.evalJs("document.querySelector('.set').inert"), true);

    // Escape cancels hold back to #startOv without entering #pickModal
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("holdModal").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('pickModal').hidden"), true);
    assert.equal(await ctx.evalJs("document.querySelector('.set').inert"), false);

    // Click Start again -> click Play offline now (#holdSkipBtn) -> opens #pickModal
    await ctx.click("#startBtn");
    await ctx.waitFor(() => !document.getElementById("holdModal").hidden);
    await ctx.click("#holdSkipBtn");
    await ctx.waitFor(() => document.getElementById("holdModal").hidden && !document.getElementById("pickModal").hidden);

    assert.deepEqual(ctx.errors, [], "Unexpected browser errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});

test("E2E 2: mobile in-app browser + /c challenge layout fit and single Back exit prompt", async () => {
  const iabUA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 310.0.0.0";
  const ctx = await browser.newContext({
    viewport: { width: 360, height: 740, deviceScaleFactor: 2, mobile: true },
    userAgent: iabUA,
  });
  try {
    await ctx.goto(`${srv.baseUrl}/c?s=12500&n=Friend&v=zero&p=sub%2Bgrind&intro=0`);
    await ctx.waitFor(() => !document.getElementById("startOv").hidden && !document.getElementById("chal").hidden);

    const layout = await ctx.evalJs(`(() => {
      const doc = document.documentElement;
      const hs = getComputedStyle(doc);
      const bd = document.body.getBoundingClientRect();
      const card = document.querySelector('#startOv .ov-card').getBoundingClientRect();
      const start = document.getElementById('startBtn').getBoundingClientRect();
      const iab = document.getElementById('iabTip').getBoundingClientRect();
      const tsIg = document.getElementById('tsIg').getBoundingClientRect();
      return {
        chalText: document.getElementById('chalT').textContent,
        iabVisible: !document.getElementById('iabTip').hidden,
        scrollW: doc.scrollWidth,
        innerW: window.innerWidth,
        htmlPad: hs.padding,
        htmlBorderL: hs.borderLeftWidth,
        htmlBorderR: hs.borderRightWidth,
        bodyX: Math.round(bd.x),
        bodyW: Math.round(bd.width),
        startBottom: start.bottom,
        iabBottom: iab.bottom,
        cardTop: card.top,
        tsIgVis: tsIg.width > 0 && tsIg.height > 0,
      };
    })()`);

    assert.ok(layout.chalText.includes("HK$12,500") && layout.chalText.includes("Friend"), "Challenge banner text wrong: " + layout.chalText);
    assert.equal(layout.iabVisible, true, "In-app browser banner should appear for Instagram UA");
    assert.equal(layout.htmlPad, "0px", "Root <html> must not inherit challenge banner padding");
    assert.equal(layout.htmlBorderL, "0px", "Root <html> must not have left border on /c");
    assert.equal(layout.htmlBorderR, "0px", "Root <html> must not have right border on /c");
    assert.equal(layout.bodyX, 0, "document.body shifted right on /c: x=" + layout.bodyX);
    assert.equal(layout.bodyW, layout.innerW, `document.body width (${layout.bodyW}) != innerWidth (${layout.innerW})`);
    assert.ok(layout.scrollW <= layout.innerW + 1, `Horizontal overflow: scrollWidth=${layout.scrollW} > innerWidth=${layout.innerW}`);
    assert.ok(layout.cardTop >= layout.iabBottom - 2, `IAB banner (${layout.iabBottom}) overlaps title card (${layout.cardTop})`);
    assert.ok(layout.tsIgVis, "Instagram title chip not visible");

    // Arm history state via a click/pointer gesture then simulate Back (popstate) -> opens #igModal once
    await ctx.click("#tsSound");
    await ctx.sleep(100);
    await ctx.evalJs("window.history.back()");
    await ctx.waitFor(() => !document.getElementById("igModal").hidden);
    await ctx.sleep(360);
    await ctx.click("#igClose");
    await ctx.waitFor(() => document.getElementById("igModal").hidden);

    // Entering gameplay from /c must fill full width without any side borders
    await ctx.goto(`${srv.baseUrl}/c?s=12500&n=Friend&v=zero&p=sub%2Bgrind&intro=0&roll=0`);
    await ctx.waitFor(() => !document.getElementById("startOv").hidden);
    await ctx.click("#startBtn");
    await ctx.waitFor(() => !document.getElementById("pickModal").hidden);
    await ctx.click("#pickGo");
    await ctx.waitFor(() => document.getElementById("startOv").hidden && document.getElementById("pickModal").hidden);
    const playBox = await ctx.evalJs(`(() => {
      const bw = document.getElementById("boardWrap").getBoundingClientRect();
      const cv = document.getElementById("board").getBoundingClientRect();
      return {
        innerW: window.innerWidth,
        bodyX: Math.round(document.body.getBoundingClientRect().x),
        bwX: Math.round(bw.x),
        bwW: Math.round(bw.width),
        cvX: Math.round(cv.x),
        cvW: Math.round(cv.width),
      };
    })()`);
    assert.equal(playBox.bodyX, 0);
    assert.equal(playBox.bwX, 0);
    assert.equal(playBox.cvX, 0);
    assert.ok(playBox.bwW >= playBox.innerW, `Gameplay #boardWrap too narrow on /c: ${playBox.bwW} < ${playBox.innerW}`);
    assert.ok(playBox.cvW >= playBox.innerW, `Gameplay #board too narrow on /c: ${playBox.cvW} < ${playBox.innerW}`);

    assert.deepEqual(ctx.errors, [], "Unexpected mobile browser errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});

test("E2E 3: full gameplay -> pause/resume -> Life Event -> 3-min end -> 4-step wizard -> live /api/scores POST -> share card", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.cdp("Page.addScriptToEvaluateOnNewDocument", { source: CLOCK_HOOK });
    await ctx.goto(`${srv.baseUrl}/?intro=0&roll=0`);
    await ctx.waitFor(() => !document.getElementById("startBtn").hidden);

    await ctx.click("#startBtn");
    await ctx.waitFor(() => !document.getElementById("pickModal").hidden);
    await ctx.click('#pickModal .who[data-who="jackie"]');
    await ctx.evalJs("window.__enableSimClock()");
    await ctx.click("#pickGo");
    await ctx.waitFor(() => document.getElementById("pickModal").hidden && document.getElementById("startOv").hidden && window.__simReady());

    // Step initial placement under accelerated simulation clock
    await ctx.pressKey("ArrowLeft", "ArrowLeft", 37);
    await ctx.evalJs("window.__advanceFrames(20, 50)");

    // Test Pause -> Resume via UI button
    await ctx.click("#pauseBtn");
    await ctx.waitFor(() => !document.getElementById("pauseOv").hidden);
    await ctx.click("#resumeBtn");
    await ctx.waitFor(() => document.getElementById("pauseOv").hidden);

    // Test non-fullscreen prompt (#fsModal) pauses game, re-enables fullscreen, and handles Skip + F
    await ctx.click("#fsBtn");
    await ctx.waitFor(() => !document.getElementById("fsModal").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('pauseBtn').getAttribute('aria-pressed')"), "true");
    assert.equal(await ctx.evalJs("document.querySelector('.set').inert"), true);
    const hudBefore = await ctx.evalJs("document.getElementById('hudTime').textContent");
    await ctx.evalJs("window.__advanceFrames(20, 50)");
    assert.equal(await ctx.evalJs("document.getElementById('hudTime').textContent"), hudBefore);

    await ctx.click("#fsModalGo");
    await ctx.waitFor(() => document.getElementById("fsModal").hidden && !!document.fullscreenElement);
    assert.equal(await ctx.evalJs("document.documentElement.classList.contains('fs')"), true);
    assert.equal(await ctx.evalJs("document.getElementById('pauseBtn').getAttribute('aria-pressed')"), "false");

    await ctx.evalJs("document.exitFullscreen()");
    await ctx.waitFor(() => !document.getElementById("fsModal").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('pauseBtn').getAttribute('aria-pressed')"), "true");
    await ctx.click("#fsModalSkip");
    await ctx.waitFor(() => document.getElementById("fsModal").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('pauseBtn').getAttribute('aria-pressed')"), "false");
    await ctx.click("#fsBtn");
    await ctx.waitFor(() => !!document.fullscreenElement);

    // Step forward cleanly through the 180s round, answering any Life Event / Offer dialogs that pop up!
    let playStep = 0;
    for (let round = 0; round < 320; round++) {
      const done = await ctx.evalJs(`(() => !document.getElementById('endModal').hidden)()`);
      if (done) break;
      const state = await ctx.evalJs(`(() => ({
        card: !document.getElementById('cardModal').hidden,
        cardFlip: !document.getElementById('cardModal').hidden && !document.getElementById('cardOutcome').hidden,
        offer: !document.getElementById('offerModal').hidden,
        revive: !document.getElementById('reviveModal').hidden,
      }))()`);
      if (state.card && !state.cardFlip) {
        await ctx.evalJs("window.__advanceFrames(10, 50)");
        if (await ctx.evalJs("document.getElementById('cardOutcome').hidden")) {
          const wiseIdx = await ctx.evalJs(`(() => {
            const firstTxt = document.querySelector('#cardChoices .choice b')?.textContent || '';
            return window.TFF_CONTENT.CARDS.some(c => c.w[0] === firstTxt) ? 0 : 1;
          })()`);
          await ctx.click(`#cardChoices .choice:nth-child(${wiseIdx + 1})`);
          await ctx.evalJs("window.__advanceFrames(10, 50)");
        }
      } else if (state.cardFlip) {
        await ctx.evalJs("window.__advanceFrames(10, 50)");
        if (await ctx.evalJs("!document.getElementById('cardModal').hidden")) {
          await ctx.evalJs(`(() => {
            const pws = [...document.querySelectorAll('#ocPowerRow .pw')];
            const best = pws.find(b => /Fixed/i.test(b.textContent)) || pws.find(b => /Wider/i.test(b.textContent)) || pws.find(b => /Insurance/i.test(b.textContent));
            if (best) best.click();
          })()`);
          await ctx.click("#cardContinue");
          await ctx.evalJs("window.__advanceFrames(5, 50)");
        }
      } else if (state.offer) {
        await ctx.evalJs("window.__advanceFrames(10, 50)");
        if (await ctx.evalJs("!document.getElementById('offerModal').hidden")) {
          const hasNo = await ctx.evalJs("!document.getElementById('offerNo').hidden");
          await ctx.click(hasNo ? "#offerNo" : "#offerYes");
          await ctx.evalJs("window.__advanceFrames(5, 50)");
        }
      } else if (state.revive) {
        await ctx.evalJs("window.__advanceFrames(15, 50)");
        if (await ctx.evalJs("!document.getElementById('reviveModal').hidden")) {
          const canNo = await ctx.evalJs("!document.getElementById('rvNo').closest('[hidden]') && !document.getElementById('rvActions').hidden");
          await ctx.click(canNo ? "#rvNo" : "#rvGo");
          await ctx.evalJs("window.__advanceFrames(15, 50)");
        }
      } else {
        const top = [-2, 2, 0];
        const nudge = playStep % 3 === 0 ? top[Math.floor(playStep / 3) % top.length] : 0;
        if (nudge !== 0) {
          const dir = nudge < 0 ? "ArrowLeft" : "ArrowRight";
          const kc = nudge < 0 ? 37 : 39;
          for (let t = 0; t < Math.abs(nudge); t++) {
            await ctx.cdp("Input.dispatchKeyEvent", { type: "keyDown", key: dir, code: dir, windowsVirtualKeyCode: kc });
            await ctx.cdp("Input.dispatchKeyEvent", { type: "keyUp", key: dir, code: dir, windowsVirtualKeyCode: kc });
          }
        }
        playStep++;
        await ctx.evalJs("window.__advanceFrames(30, 50)");
      }
    }
    await ctx.waitFor(() => !document.getElementById("endModal").hidden, 5000);

    // Step 1 -> Step 2 (Quiz + Habit)
    await ctx.click("#stNext");
    await ctx.waitFor(() => document.getElementById("quiz").getClientRects().length > 0);
    await ctx.evalJs(`document.querySelectorAll('#quiz .qz').forEach(q => { const btn = q.querySelector('.qopt'); if (btn) btn.click(); })`);
    await ctx.click("#habits label.habit");

    // Step 2 -> Step 3 (Live Leaderboard Post)
    await ctx.click("#stNext");
    await ctx.waitFor(() => document.getElementById("nickname").getClientRects().length > 0);
    const mailCopy = await ctx.evalJs(`({
      label: document.querySelector('label[for="email"]')?.textContent || "",
      note: document.getElementById('emailNote')?.textContent || ""
    })`);
    assert.ok(mailCopy.label.includes("電郵地址* (註：領獎請輸入院校電郵地址)"), "Missing email label copy: " + mailCopy.label);
    assert.ok(mailCopy.note.includes("院校電郵地址"), "Missing email note copy: " + mailCopy.note);
    await ctx.evalJs(`(() => {
      document.getElementById('nickname').value = 'E2ETester';
      document.getElementById('email').value = 'e2e@example.com';
    })()`);
    await ctx.click("#postBtn");
    await ctx.waitFor(() => document.getElementById("postStatus").classList.contains("ok"), 5000);
    assert.equal(srv.store._rows.length, 1, "Live /api/scores POST should store 1 row in fake-D1");
    assert.equal(srv.store._rows[0].name, "E2ETester");
    assert.equal(srv.store._rows[0].email, "e2e@example.com");

    // Step 4 -> Share Card renders & Instagram button opens modal on top cleanly
    await ctx.waitFor(() => document.getElementById("cardHead").getClientRects().length > 0, 8000);
    await ctx.waitFor(() => {
      const img = document.getElementById("cardImg");
      return img && img.complete && img.naturalWidth > 0;
    }, 10000);
    await ctx.click("#endIgBtn");
    await ctx.waitFor(() => !document.getElementById("igModal").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('endModal').inert"), true);
    await ctx.click("#igClose");
    await ctx.waitFor(() => document.getElementById("igModal").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('endModal').inert"), false);

    assert.deepEqual(ctx.errors, [], "Unexpected gameplay errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});

test("E2E 4: low-graphics mode (?gfx=low) and PWA offline reload with queued challenge", async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.goto(`${srv.baseUrl}/?intro=0&gfx=low`);
    await ctx.waitFor(() => document.documentElement.classList.contains("low-gfx"));
    const filmDisplay = await ctx.evalJs("getComputedStyle(document.querySelector('.filmgrain')).display");
    assert.equal(filmDisplay, "none");

    // Ensure Service Worker is active before going offline
    const reg = await ctx.evalJs(`navigator.serviceWorker.ready.then(r => !!r.active)`);
    assert.equal(reg, true);

    await ctx.setOffline(true);
    await ctx.goto(`${srv.baseUrl}/c?s=7700&n=OfflineUser&intro=0`);
    await ctx.waitFor(() => !document.getElementById("startOv").hidden && !document.getElementById("chal").hidden);
    const offlineText = await ctx.evalJs("document.getElementById('chalT').textContent");
    assert.ok(offlineText.includes("HK$7,700") && offlineText.includes("OfflineUser"), "Offline SW fallback failed on /c: " + offlineText);

    await ctx.setOffline(false);
    assert.deepEqual(ctx.errors, [], "Unexpected offline/low-gfx errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});

test("E2E 5: admin dashboard renders SVG trend chart, searches/filters rows, batch hides/unhides, and poster renders IG toggle", async () => {
  const seedPost = async (body) => {
    const r = await fetch(`${srv.baseUrl}/api/scores`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    assert.equal(r.status, 201);
  };
  await seedPost({ score: 4200, name: "SlowAdminTest", email: "slow@example.com", board: true, stage: 1, height: 4.5, drops: 0, choices: [{ card: "newphone", pick: "wise", power: "vine" }], answers: [{ q: "fakeapp", pick: 1 }, { q: "mule", pick: 1 }, { q: "bnpl", pick: 1 }], habit: "buffer", items: 10, ended: "time", real_ms: 310000 });
  await seedPost({ score: 2100, name: "ChalVisitor", email: "chal@example.com", board: true, stage: 0, height: 2.0, drops: 1, choices: [{ card: "cafe", pick: "risky" }], items: 5, via: "c" });

  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.goto(`${srv.baseUrl}/admin.html`);
    await ctx.evalJs(`document.getElementById('token').value = ${JSON.stringify(srv.adminToken)}`);
    await ctx.click("#loginForm button[type=submit]");
    await ctx.waitFor(() => !document.getElementById("panel").hidden);

    // 1) Survey & Decisions & Trends SVG chart
    await ctx.waitFor(() => document.querySelectorAll("#tiles .tile").length > 5);
    await ctx.click("#tab-trends");
    await ctx.waitFor(() => !!document.querySelector("#trendChartBox svg rect"));
    const chartCount = await ctx.evalJs("document.querySelectorAll('#trendChartBox svg rect').length");
    assert.ok(chartCount >= 1, "Expected SVG trend chart bars");

    // 2) Games tab: anomaly filter (slow) + search + batch Hide -> verify reflected on public /api/scores -> batch Unhide
    await ctx.click("#tab-games");
    await ctx.evalJs(`(() => {
      const f = document.getElementById('gFlag');
      f.value = 'slow';
      f.dispatchEvent(new Event('change'));
    })()`);
    await ctx.waitFor(() => [...document.querySelectorAll("#rows tr")].length === 1 && document.getElementById("rows").textContent.includes("SlowAdminTest"));

    await ctx.click("#rows input[type=checkbox]");
    await ctx.waitFor(() => !document.getElementById("batchBar").hidden);
    await ctx.click("#batchHide");
    await ctx.waitFor(() => document.getElementById("rows").textContent.includes("hidden"));

    const pubBoard = await (await fetch(`${srv.baseUrl}/api/scores`)).json();
    assert.equal(pubBoard.weekTop.some((r) => r.name === "SlowAdminTest"), false, "Hidden row still appeared on public board");

    await ctx.click("#rows input[type=checkbox]");
    await ctx.waitFor(() => !document.getElementById("batchBar").hidden);
    await ctx.click("#batchUnhide");
    await ctx.waitFor(() => document.getElementById("rows").textContent.includes("shown"));

    // 2b) Admin live traffic monitor & emergency Hold toggle
    await ctx.waitFor(() => /Traffic:/.test(document.getElementById("trafficInfo").textContent));
    await ctx.click("#holdToggleBtn");
    await ctx.waitFor(() => document.getElementById("holdToggleBtn").getAttribute("aria-pressed") === "true");
    const heldBoard = await (await fetch(`${srv.baseUrl}/api/scores`)).json();
    assert.equal(heldBoard.onHold, true, "Admin Hold ON must reflect on public /api/scores");
    await ctx.click("#holdToggleBtn");
    await ctx.waitFor(() => document.getElementById("holdToggleBtn").getAttribute("aria-pressed") === "false");
    const openBoard = await (await fetch(`${srv.baseUrl}/api/scores`)).json();
    assert.equal(openBoard.onHold, false, "Admin Hold OFF must clear onHold on public /api/scores");

    // 3) Poster with ?booth=1&ig=1
    await ctx.goto(`${srv.baseUrl}/poster.html?booth=1&ig=1`);
    await ctx.waitFor(() => {
      const igImg = document.querySelector("#igBar img");
      return !!(igImg && igImg.complete && igImg.naturalWidth > 0);
    });
    const poster = await ctx.evalJs(`(() => {
      const qr = document.querySelector('#qr path');
      const igImg = document.querySelector('#igBar img');
      return {
        booth: document.getElementById('booth').checked,
        igToggle: document.getElementById('igToggle').checked,
        igVisible: !document.getElementById('igBar').hidden,
        qrLen: qr ? qr.getAttribute('d').length : 0,
        igOk: !!(igImg && igImg.complete && igImg.naturalWidth > 0),
      };
    })()`);
    assert.equal(poster.booth, true);
    assert.equal(poster.igToggle, true);
    assert.equal(poster.igVisible, true);
    assert.ok(poster.qrLen > 50, "Poster SVG QR path empty");
    assert.equal(poster.igOk, true, "Poster IG QR image failed to load");

    assert.deepEqual(ctx.errors, [], "Unexpected admin/poster errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});

test("E2E 6: controller/gamepad navigation across result page steps 1-4 and on-screen keyboard", async () => {
  const beforeRows = srv.store._rows.length;
  const PAD_HOOK = `(() => {
    const gp = {
      connected: true,
      id: "Mock Standard Gamepad",
      index: 0,
      mapping: "standard",
      buttons: Array.from({ length: 16 }, () => ({ pressed: false, touched: false, value: 0 })),
      axes: [0, 0, 0, 0],
    };
    navigator.getGamepads = () => (window.__gpOn ? [gp] : []);
    window.__padSet = (btns = [], axes = [0, 0, 0, 0]) => {
      for (let i = 0; i < 16; i++) {
        const on = btns.includes(i);
        gp.buttons[i] = { pressed: on, touched: on, value: on ? 1 : 0 };
      }
      gp.axes = axes;
    };
    window.__padTap = (btnIdx, framesAfter = 2) => {
      window.__padSet([btnIdx]);
      window.__advanceFrames(1, 50);
      window.__padSet([]);
      window.__advanceFrames(framesAfter, 50);
    };
  })();`;
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.cdp("Page.addScriptToEvaluateOnNewDocument", { source: CLOCK_HOOK + "\n" + PAD_HOOK });
    await ctx.goto(`${srv.baseUrl}/?intro=0&roll=0`);
    await ctx.waitFor(() => !document.getElementById("startBtn").hidden);
    await ctx.click("#startBtn");
    await ctx.waitFor(() => !document.getElementById("pickModal").hidden);
    await ctx.evalJs("window.__enableSimClock()");
    await ctx.click("#pickGo");
    await ctx.waitFor(() => document.getElementById("pickModal").hidden && document.getElementById("startOv").hidden && window.__simReady());

    // Reach endModal rapidly by dropping 3 items off the left edge
    for (let i = 0; i < 240; i++) {
      if (await ctx.evalJs("!document.getElementById('endModal').hidden")) break;
      const st = await ctx.evalJs(`({
        card: !document.getElementById('cardModal').hidden,
        flip: !document.getElementById('cardModal').hidden && !document.getElementById('cardOutcome').hidden,
        offer: !document.getElementById('offerModal').hidden,
        revive: !document.getElementById('reviveModal').hidden,
        rvNo: !document.getElementById('rvNo').closest('[hidden]') && !document.getElementById('rvActions').hidden,
        rvGo: !document.getElementById('rvGo').closest('[hidden]') && !document.getElementById('rvLesson').hidden,
      })`);
      if (st.card && !st.flip) { await ctx.pressKey("1", "Digit1", 49); await ctx.evalJs("window.__advanceFrames(10, 50)"); }
      else if (st.flip) { await ctx.click("#cardContinue"); await ctx.evalJs("window.__advanceFrames(5, 50)"); }
      else if (st.offer) { await ctx.pressKey("2", "Digit2", 50); await ctx.evalJs("window.__advanceFrames(5, 50)"); }
      else if (st.revive) { if (st.rvNo) await ctx.click("#rvNo"); else if (st.rvGo) await ctx.click("#rvGo"); await ctx.evalJs("window.__advanceFrames(15, 50)"); }
      else {
        await ctx.cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
        await ctx.evalJs("window.__advanceFrames(18, 50)");
        await ctx.cdp("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
        await ctx.pressKey(" ", "Space", 32);
        await ctx.evalJs("window.__advanceFrames(35, 50)");
      }
    }
    await ctx.waitFor(() => !document.getElementById("endModal").hidden, 8000);

    // Connect gamepad and clear 900ms accidental-press guard on #endModal
    await ctx.evalJs(`(() => {
      window.__gpOn = true;
      window.dispatchEvent(new Event("gamepadconnected"));
      window.__advanceFrames(22, 50);
    })()`);
    assert.equal(await ctx.evalJs("document.documentElement.classList.contains('gamepad')"), true);

    // Step 1: hint bar visible, right-stick & D-pad scroll #stScroll, A advances to Step 2
    const step1 = await ctx.evalJs(`(() => {
      const bar = document.getElementById("endPadBar");
      const scr = document.getElementById("stScroll");
      scr.scrollTop = 0;
      window.__padSet([], [0, 0, 0, 0.9]);
      window.__advanceFrames(5, 50);
      window.__padSet([], [0, 0, 0, 0]);
      const afterStick = scr.scrollTop;
      window.__padTap(13);
      const afterDpad = scr.scrollTop;
      window.__padTap(0);
      return {
        barShow: getComputedStyle(bar).display !== "none" && bar.textContent.trim().length > 0,
        afterStick,
        afterDpad,
        stepNow: document.querySelector("#endModal .statement").dataset.step,
        activeCls: document.activeElement?.className || "",
      };
    })()`);
    assert.equal(step1.barShow, true);
    assert.ok(step1.afterStick > 0, "Right stick should scroll #stScroll");
    assert.ok(step1.afterDpad > step1.afterStick, "D-pad Down should scroll Step 1 #stScroll");
    assert.equal(step1.stepNow, "2");
    assert.ok(step1.activeCls.includes("qopt"), "Step 2 should focus first quiz option under padnav: " + step1.activeCls);

    // Step 2: B goes back to Step 1 (not See tower), RB goes forward to Step 2, A answers 3 quiz + 1 habit, Start -> Step 3
    const step2 = await ctx.evalJs(`(() => {
      window.__padTap(1);
      const backStep = document.querySelector("#endModal .statement").dataset.step;
      const modalOpenStill = !document.getElementById("endModal").hidden;
      window.__padTap(5);
      const rbStep = document.querySelector("#endModal .statement").dataset.step;
      window.__padTap(0); // Q1
      window.__padTap(0); // Q2
      window.__padTap(0); // Q3 -> focuses habit radio
      const onHabit = document.activeElement?.name === "habit";
      window.__padTap(0); // select habit -> focuses #stNext
      const onNext = document.activeElement?.id === "stNext";
      const nextDisabled = document.getElementById("stNext").disabled;
      window.__padTap(9); // Start -> Step 3
      return {
        backStep, modalOpenStill, rbStep, onHabit, onNext, nextDisabled,
        stepNow: document.querySelector("#endModal .statement").dataset.step,
        activeId: document.activeElement?.id || "",
      };
    })()`);
    assert.equal(step2.backStep, "1");
    assert.equal(step2.modalOpenStill, true);
    assert.equal(step2.rbStep, "2");
    assert.equal(step2.onHabit, true);
    assert.equal(step2.onNext, true);
    assert.equal(step2.nextDisabled, false);
    assert.equal(step2.stepNow, "3");
    assert.equal(step2.activeId, "nickname");

    // Step 3: A opens #padKbModal for Nickname & Email, types via D-pad/X/LB/Y/Start, and posts live score
    const step3 = await ctx.evalJs(`(() => {
      window.__padTap(0); // A on #nickname opens controller keyboard (focuses 'q')
      const kbOpen = !document.getElementById("padKbModal").hidden && document.getElementById("endModal").inert;
      const keyCount = document.querySelectorAll("#padKbGrid .pk-key").length;
      window.__padTap(0);  // 'q'
      window.__padTap(15); // right -> 'w'
      window.__padTap(0);  // 'w'
      window.__padTap(4);  // LB toggles shift
      window.__padTap(0);  // 'W'
      window.__padTap(2);  // X deletes 'W'
      window.__padTap(9);  // Start -> Done -> focuses #email
      const afterNick = { val: document.getElementById("nickname").value, activeId: document.activeElement?.id || "" };

      window.__padTap(0);  // A on #email opens controller keyboard (focuses 'q')
      window.__padTap(13); // down -> 'a'
      window.__padTap(0);  // 'a'
      window.__padTap(3);  // Y -> '@hsu.edu.hk'
      window.__padTap(9);  // Start -> Done -> focuses #postBtn
      const afterMail = { val: document.getElementById("email").value, activeId: document.activeElement?.id || "" };

      window.__padTap(0);  // A on #postBtn submits score
      return { kbOpen, keyCount, afterNick, afterMail };
    })()`);
    assert.equal(step3.kbOpen, true);
    assert.ok(step3.keyCount >= 40, "Expected full QWERTY controller keyboard grid");
    assert.equal(step3.afterNick.val, "qw");
    assert.equal(step3.afterNick.activeId, "email");
    assert.equal(step3.afterMail.val, "a@hsu.edu.hk");
    assert.equal(step3.afterMail.activeId, "postBtn");

    await ctx.waitFor(() => document.getElementById("postStatus").classList.contains("ok"), 5000);
    assert.equal(srv.store._rows.length, beforeRows + 1);
    const postedRow = srv.store._rows[srv.store._rows.length - 1];
    assert.equal(postedRow.name, "qw");
    assert.equal(postedRow.email, "a@hsu.edu.hk");

    // Step 4: reaches card, B switches to #seeOv, B returns to #endModal Step 4
    await ctx.waitFor(() => document.querySelector("#endModal .statement").dataset.step === "4", 4000);
    const step4 = await ctx.evalJs(`(() => {
      const barText = document.getElementById("endPadBar").textContent;
      window.__padTap(1); // B -> See tower
      const seeVisible = document.getElementById("endModal").hidden && !document.getElementById("seeOv").hidden;
      window.__padTap(1); // B -> back to Statement Step 4
      const backVisible = !document.getElementById("endModal").hidden && document.getElementById("seeOv").hidden;
      return { barText, seeVisible, backVisible };
    })()`);
    assert.ok(step4.barText.includes("Play again"), "Expected Step 4 gamepad hint: " + step4.barText);
    assert.equal(step4.seeVisible, true);
    assert.equal(step4.backVisible, true);

    assert.deepEqual(ctx.errors, [], "Unexpected gamepad result errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});
