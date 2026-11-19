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
      const card = document.querySelector('#startOv .ov-card').getBoundingClientRect();
      const start = document.getElementById('startBtn').getBoundingClientRect();
      const iab = document.getElementById('iabTip').getBoundingClientRect();
      const tsIg = document.getElementById('tsIg').getBoundingClientRect();
      return {
        chalText: document.getElementById('chalT').textContent,
        iabVisible: !document.getElementById('iabTip').hidden,
        scrollW: doc.scrollWidth,
        innerW: window.innerWidth,
        startBottom: start.bottom,
        iabBottom: iab.bottom,
        cardTop: card.top,
        tsIgVis: tsIg.width > 0 && tsIg.height > 0,
      };
    })()`);

    assert.ok(layout.chalText.includes("HK$12,500") && layout.chalText.includes("Friend"), "Challenge banner text wrong: " + layout.chalText);
    assert.equal(layout.iabVisible, true, "In-app browser banner should appear for Instagram UA");
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
