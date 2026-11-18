// Keyboard-only navigation, focus containment, and screen-reader AXTree checks across all modals and /admin.html.
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { launchBrowser } from "./e2e/cdp.mjs";
import { startE2EServer } from "./e2e/server.mjs";

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

let browser, srv;
before(async () => {
  srv = await startE2EServer();
  browser = await launchBrowser();
});
after(async () => {
  await browser?.close();
  await srv?.close();
});

async function tabKey(ctx) {
  await ctx.pressKey("Tab", "Tab", 9);
}

async function pressEnter(ctx) {
  await ctx.cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r", unmodifiedText: "\r" });
  await ctx.cdp("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  await ctx.sleep(70);
}

async function pressSpace(ctx) {
  await ctx.cdp("Input.dispatchKeyEvent", { type: "keyDown", key: " ", code: "Space", windowsVirtualKeyCode: 32, text: " ", unmodifiedText: " " });
  await ctx.cdp("Input.dispatchKeyEvent", { type: "keyUp", key: " ", code: "Space", windowsVirtualKeyCode: 32 });
  await ctx.sleep(70);
}

async function shiftTab(ctx) {
  await ctx.cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, modifiers: 8 });
  await ctx.cdp("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, modifiers: 8 });
  await ctx.sleep(50);
}

async function activeInfo(ctx) {
  return ctx.evalJs(`(() => {
    const a = document.activeElement;
    return {
      isBody: a === document.body,
      tag: a ? a.tagName : "",
      id: a ? a.id : "",
      cls: a ? a.className : "",
      ariaDisabled: a ? a.getAttribute("aria-disabled") : null,
      ariaChecked: a ? a.getAttribute("aria-checked") : null,
      tabIndex: a ? a.tabIndex : null,
    };
  })()`);
}

async function tabCycle(ctx, containerSel, maxSteps = 25) {
  // Move onto a tabbable inside container if focus starts on a tabindex="-1" dialog/sheet container
  let st = await ctx.evalJs(`(() => {
    const c = document.querySelector(${JSON.stringify(containerSel)});
    const a = document.activeElement;
    return { inC: !!(c && c.contains(a)), tabIdx: a ? a.tabIndex : -1, isBody: a === document.body };
  })()`);
  assert.equal(st.isBody, false, `Focus on <body> before tabCycle(${containerSel})`);
  assert.equal(st.inC, true, `Focus outside ${containerSel} before tabCycle`);
  if (st.tabIdx < 0) await tabKey(ctx);

  const visited = [];
  for (let step = 0; step < maxSteps; step++) {
    const cur = await ctx.evalJs(`(() => {
      const c = document.querySelector(${JSON.stringify(containerSel)});
      const a = document.activeElement;
      if (!c || !a || a === document.body || !c.contains(a)) return { ok: false, isBody: a === document.body, id: a ? a.id : "" };
      const key = a.id || (a.tagName + ":" + (a.textContent || "").trim().slice(0, 24) + ":" + a.dataset?.k);
      return { ok: true, key };
    })()`);
    assert.equal(cur.ok, true, `Tab escaped ${containerSel} or hit body at step ${step}: ${JSON.stringify(cur)}`);
    if (step > 0 && cur.key === visited[0]) break;
    visited.push(cur.key);
    await tabKey(ctx);
  }
  assert.ok(visited.length >= 1, `No tabbables visited in ${containerSel}`);

  // Verify Shift+Tab stays inside container and never hits <body>
  await shiftTab(ctx);
  const back = await ctx.evalJs(`(() => {
    const c = document.querySelector(${JSON.stringify(containerSel)});
    const a = document.activeElement;
    return { isBody: a === document.body, inC: !!(c && c.contains(a)), id: a ? a.id : "" };
  })()`);
  assert.equal(back.isBody, false, `Shift+Tab dropped focus to <body> in ${containerSel}`);
  assert.equal(back.inC, true, `Shift+Tab escaped ${containerSel}: ${back.id}`);
}

async function assertModalA11y(ctx, id, { backgroundSel = ".set", isPause = false } = {}) {
  const dom = await ctx.evalJs(`(() => {
    const m = document.getElementById(${JSON.stringify(id)});
    if (!m || m.hidden) return { ok: false, reason: "missing or hidden" };
    const role = m.getAttribute("role");
    const modal = m.getAttribute("aria-modal");
    const lb = (m.getAttribute("aria-labelledby") || "").trim().split(/\\s+/).filter(Boolean);
    const lbNodes = lb.map((x) => {
      const el = document.getElementById(x);
      if (!el) return { id: x, exists: false, visible: false, text: "" };
      const cs = getComputedStyle(el);
      const visible = cs.display !== "none" && cs.visibility !== "hidden" && !el.closest("[hidden]");
      return { id: x, exists: true, visible, text: (el.textContent || "").trim() };
    });
    const hasVisibleLabel = lbNodes.some((n) => n.exists && n.visible && n.text.length > 0);
    const allExist = lbNodes.length > 0 && lbNodes.every((n) => n.exists);
    const bgInert = ${isPause ? "!!document.getElementById('board')?.closest('[inert]')" : `!!document.querySelector(${JSON.stringify(backgroundSel)})?.inert`};
    return { ok: true, role, modal, lb, lbNodes, hasVisibleLabel, allExist, bgInert };
  })()`);
  assert.equal(dom.ok, true, `Dialog #${id} not open: ${JSON.stringify(dom)}`);
  assert.equal(dom.role, "dialog", `#${id} missing role=dialog`);
  assert.equal(dom.modal, "true", `#${id} missing aria-modal=true`);
  assert.equal(dom.allExist, true, `#${id} aria-labelledby target missing: ${JSON.stringify(dom.lbNodes)}`);
  assert.equal(dom.hasVisibleLabel, true, `#${id} aria-labelledby has no visible text: ${JSON.stringify(dom.lbNodes)}`);
  assert.equal(dom.bgInert, true, `#${id} did not mark background inert`);

  await ctx.cdp("Accessibility.enable");
  const { nodes } = await ctx.cdp("Accessibility.getFullAXTree");
  const dialogs = nodes.filter((n) => !n.ignored && n.role?.value === "dialog");
  const modalDialog = dialogs.find((n) =>
    (n.properties || []).some((p) => p.name === "modal" && p.value?.value === true) &&
    n.name?.value && n.name.value.trim().length > 0
  );
  assert.ok(modalDialog, `AXTree missing unignored modal dialog with non-empty name for #${id}`);

  const interactiveRoles = new Set(["button", "link", "textbox", "radio", "checkbox", "combobox", "tab"]);
  const unnamed = nodes.filter((n) =>
    !n.ignored &&
    interactiveRoles.has(n.role?.value) &&
    !(n.name?.value && n.name.value.trim().length > 0)
  );
  assert.deepEqual(
    unnamed.map((n) => ({ role: n.role?.value, nodeId: n.nodeId })),
    [],
    `Unnamed interactive AXNodes while #${id} is open`
  );
}

test("A11y 1: #intro, #startOv, #infoModal (#wardrobeList 3-col Arrow/Home/End nav), and #igModal", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.goto(`${srv.baseUrl}/?intro=1`);
    await ctx.waitFor(() => !document.getElementById("intro").hidden);
    assert.equal(await ctx.evalJs("document.querySelector('.set').inert"), true);
    assert.equal((await activeInfo(ctx)).id, "introSkip");

    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("intro").hidden);
    assert.equal(await ctx.evalJs("document.querySelector('.set').inert"), false);
    assert.equal((await activeInfo(ctx)).id, "startBtn");

    // Verify #hudNext has role=group and #hudHold is aria-hidden
    const hudCheck = await ctx.evalJs(`(() => ({
      nextRole: document.getElementById("hudNext")?.parentElement?.getAttribute("role"),
      holdHidden: document.getElementById("hudHold")?.getAttribute("aria-hidden"),
      holdType: document.getElementById("hudHoldBtn")?.getAttribute("type"),
    }))()`);
    assert.equal(hudCheck.nextRole, "group");
    assert.equal(hudCheck.holdHidden, "true");
    assert.equal(hudCheck.holdType, "button");

    // #startOv Tab traversal & ctStart Arrow toggle
    await ctx.evalJs("document.getElementById('startBtn').focus()");
    await tabKey(ctx);
    assert.equal((await activeInfo(ctx)).id, "tsLb");
    // Open Wardrobe via Enter on #tsWear
    await ctx.evalJs("document.getElementById('tsWear').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("infoModal").hidden);
    await assertModalA11y(ctx, "infoModal");
    assert.equal((await activeInfo(ctx)).id, "infoClose");

    // Tab into #wardrobeList (single tab stop -> roving tabIndex)
    await tabCycle(ctx, "#infoModal");
    const tileCount = await ctx.evalJs("document.querySelectorAll('#wardrobeList .wtile').length");
    assert.equal(tileCount, 9);
    const singleStop = await ctx.evalJs("[...document.querySelectorAll('#wardrobeList .wtile')].filter(x => x.tabIndex === 0).length");
    assert.equal(singleStop, 1, "#wardrobeList must expose a single roving tabIndex=0");

    // Focus tile 0, test ArrowRight, ArrowDown (3-col), ArrowLeft, ArrowUp, End, Home
    await ctx.evalJs("document.querySelectorAll('#wardrobeList .wtile')[0].focus()");
    await ctx.pressKey("ArrowRight", "ArrowRight", 39);
    assert.equal(await ctx.evalJs("[...document.querySelectorAll('#wardrobeList .wtile')].indexOf(document.activeElement)"), 1);
    await ctx.pressKey("ArrowDown", "ArrowDown", 40);
    assert.equal(await ctx.evalJs("[...document.querySelectorAll('#wardrobeList .wtile')].indexOf(document.activeElement)"), 4);
    await ctx.pressKey("ArrowUp", "ArrowUp", 38);
    assert.equal(await ctx.evalJs("[...document.querySelectorAll('#wardrobeList .wtile')].indexOf(document.activeElement)"), 1);
    await ctx.pressKey("ArrowLeft", "ArrowLeft", 37);
    assert.equal(await ctx.evalJs("[...document.querySelectorAll('#wardrobeList .wtile')].indexOf(document.activeElement)"), 0);
    await ctx.pressKey("End", "End", 35);
    assert.equal(await ctx.evalJs("[...document.querySelectorAll('#wardrobeList .wtile')].indexOf(document.activeElement)"), 8);
    await ctx.pressKey("Home", "Home", 36);
    assert.equal(await ctx.evalJs("[...document.querySelectorAll('#wardrobeList .wtile')].indexOf(document.activeElement)"), 0);

    // Escape closes #infoModal and restores focus to #tsWear
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("infoModal").hidden);
    assert.equal((await activeInfo(ctx)).id, "tsWear");

    // #igModal via #tsIg Enter -> tabCycle -> Escape restores #tsIg
    await ctx.evalJs("document.getElementById('tsIg').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("igModal").hidden);
    await assertModalA11y(ctx, "igModal");
    await tabCycle(ctx, "#igModal");
    await ctx.sleep(320);
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("igModal").hidden);
    assert.equal((await activeInfo(ctx)).id, "tsIg");

    assert.deepEqual(ctx.errors, [], "Browser errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});

test("A11y 2: #pickModal, #rollModal (close buttons + Escape focus restore), and #pauseOv dialog containment", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.goto(`${srv.baseUrl}/?intro=0`);
    await ctx.waitFor(() => !document.getElementById("startBtn").hidden);

    // #startBtn Enter -> #pickModal
    await ctx.evalJs("document.getElementById('startBtn').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("pickModal").hidden);
    await assertModalA11y(ctx, "pickModal");

    await ctx.pressKey("ArrowRight", "ArrowRight", 39);
    assert.equal((await activeInfo(ctx)).id, "pickJackie");
    assert.equal((await activeInfo(ctx)).ariaChecked, "true");

    await tabCycle(ctx, "#pickModal");

    // Escape restores #startBtn
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("pickModal").hidden);
    assert.equal((await activeInfo(ctx)).id, "startBtn");

    // Reopen, click #pickClose -> restores #startBtn
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("pickModal").hidden);
    await ctx.sleep(350);
    await ctx.click("#pickClose");
    await ctx.waitFor(() => document.getElementById("pickModal").hidden);
    assert.equal((await activeInfo(ctx)).id, "startBtn");

    // Reopen -> #pickGo -> #rollModal
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("pickModal").hidden);
    await ctx.click("#pickGo");
    await ctx.waitFor(() => !document.getElementById("rollModal").hidden);
    await assertModalA11y(ctx, "rollModal");
    await tabCycle(ctx, "#rollModal");

    // Escape from #rollModal restores #startBtn (never <body>)
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("rollModal").hidden);
    assert.equal((await activeInfo(ctx)).id, "startBtn");

    // Reopen #rollModal -> roll -> start game -> focus on #board
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("rollModal").hidden);
    await ctx.evalJs("document.getElementById('rollGo').focus()");
    await pressSpace(ctx);
    await ctx.waitFor(() => document.getElementById("rollSay").textContent.trim().length > 0, 6000);
    await pressEnter(ctx);
    await ctx.waitFor(() => document.getElementById("rollModal").hidden && document.getElementById("startOv").hidden);
    assert.equal((await activeInfo(ctx)).id, "board");

    // Press 'p' -> #pauseOv dialog + inert isolation + Tab trap + ctPause ArrowRight + Escape resume
    await ctx.pressKey("p", "KeyP", 80);
    await ctx.waitFor(() => !document.getElementById("pauseOv").hidden);
    await assertModalA11y(ctx, "pauseOv", { isPause: true });
    assert.equal((await activeInfo(ctx)).id, "resumeBtn");
    await tabCycle(ctx, "#pauseOv");

    await ctx.evalJs("document.querySelector('input[name=ctPause][value=\"10\"]').focus()");
    await ctx.pressKey("ArrowRight", "ArrowRight", 39);
    assert.equal(await ctx.evalJs("document.querySelector('input[name=ctPause][value=\"30\"]').checked"), true);

    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("pauseOv").hidden);
    assert.equal(await ctx.evalJs("!!document.getElementById('board').closest('[inert]')"), false);
    assert.equal((await activeInfo(ctx)).id, "board");

    assert.deepEqual(ctx.errors, [], "Browser errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});

test("A11y 3: #cardModal flip aria-labelledby & ocPowerRow sync, #offerModal, #reviveModal .watch, #endModal steps 1-4, #seeOv", async () => {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.cdp("Page.addScriptToEvaluateOnNewDocument", { source: CLOCK_HOOK });
    await ctx.goto(`${srv.baseUrl}/?intro=0`);
    await ctx.waitFor(() => !document.getElementById("startBtn").hidden);
    await ctx.click("#startBtn");
    await ctx.waitFor(() => !document.getElementById("pickModal").hidden);
    await ctx.click("#pickGo");
    await ctx.waitFor(() => !document.getElementById("rollModal").hidden);
    await ctx.click("#rollGo");
    await ctx.waitFor(() => document.getElementById("rollSay").textContent.trim().length > 0, 6000);
    await ctx.evalJs("window.__enableSimClock()");
    await ctx.click("#rollGo");
    await ctx.waitFor(() => document.getElementById("rollModal").hidden && document.getElementById("startOv").hidden && window.__simReady());

    let testedCard = false;
    let testedOffer = false;
    let testedRevive = false;
    let playStep = 0;

    async function verifyReviveModal() {
      await assertModalA11y(ctx, "reviveModal");
      await tabCycle(ctx, "#reviveModal");
      await ctx.evalJs("window.__advanceFrames(15, 50)");
      await ctx.evalJs("document.getElementById('rvYes').focus()");
      await pressEnter(ctx);
      await ctx.waitFor(() => document.getElementById("reviveModal").classList.contains("watch"));
      await ctx.evalJs("window.__advanceFrames(10, 50)");
      await assertModalA11y(ctx, "reviveModal");
      for (let i = 0; i < 160; i++) {
        if (await ctx.evalJs("!document.getElementById('rvLesson').hidden")) break;
        await ctx.evalJs("window.__advanceFrames(5, 50)");
      }
      await ctx.waitFor(() => !document.getElementById("rvLesson").hidden);
      await ctx.evalJs("document.getElementById('rvGo').focus()");
      await pressEnter(ctx);
      await ctx.waitFor(() => document.getElementById("reviveModal").hidden);
      testedRevive = true;
    }

    for (let step = 0; step < 300; step++) {
      const state = await ctx.evalJs(`(() => ({
        end: !document.getElementById('endModal').hidden,
        card: !document.getElementById('cardModal').hidden,
        cardFlip: !document.getElementById('cardModal').hidden && !document.getElementById('cardOutcome').hidden,
        offer: !document.getElementById('offerModal').hidden,
        revive: !document.getElementById('reviveModal').hidden,
      }))()`);
      if (state.end || (testedCard && testedOffer)) break;

      if (state.card && !state.cardFlip) {
        const wiseKey = await ctx.evalJs(`(() => {
          const firstTxt = document.querySelector('#cardChoices .choice b')?.textContent?.trim();
          const isWise0 = window.TFF_CONTENT.CARDS.some(c => c.w[0] === firstTxt);
          return isWise0 ? "1" : "2";
        })()`);
        if (!testedCard) {
          await assertModalA11y(ctx, "cardModal");
          await tabCycle(ctx, "#cardModal");
          await ctx.pressKey(wiseKey, wiseKey === "1" ? "Digit1" : "Digit2", wiseKey === "1" ? 49 : 50);
          await ctx.waitFor(() => !document.getElementById("cardOutcome").hidden);
          await assertModalA11y(ctx, "cardModal");
          const postFlipLabel = await ctx.evalJs("document.getElementById('cardModal').getAttribute('aria-labelledby')");
          assert.equal(postFlipLabel, "ocHead cardTag");

          const hasPowers = await ctx.evalJs("!document.getElementById('ocPowers').hidden && document.querySelectorAll('#ocPowerRow .pw').length === 3");
          if (hasPowers) {
            await ctx.evalJs("document.querySelector('#ocPowerRow .pw').focus()");
            await ctx.pressKey("ArrowRight", "ArrowRight", 39);
            const pw1 = await activeInfo(ctx);
            assert.equal(pw1.ariaChecked, "true");
            assert.equal(pw1.tabIndex, 0);
            assert.equal(await ctx.evalJs("document.activeElement === document.querySelectorAll('#ocPowerRow .pw')[1]"), true);

            await ctx.pressKey("ArrowLeft", "ArrowLeft", 37);
            const pw0 = await activeInfo(ctx);
            assert.equal(pw0.ariaChecked, "true");
            assert.equal(pw0.tabIndex, 0);
            assert.equal(await ctx.evalJs("document.activeElement === document.querySelectorAll('#ocPowerRow .pw')[0]"), true);
            await ctx.evalJs(`(() => {
              const pws = [...document.querySelectorAll('#ocPowerRow .pw')];
              const best = pws.find(b => /Insurance/i.test(b.textContent)) || pws.find(b => /Wider/i.test(b.textContent)) || pws.find(b => /Fixed/i.test(b.textContent));
              if (best) best.click();
            })()`);
            testedCard = true;
          }
          await ctx.evalJs("document.getElementById('cardContinue').focus()");
          await pressEnter(ctx);
          await ctx.waitFor(() => document.getElementById("cardModal").hidden);
          assert.equal((await activeInfo(ctx)).id, "board");
        } else {
          await ctx.pressKey(wiseKey, wiseKey === "1" ? "Digit1" : "Digit2", wiseKey === "1" ? 49 : 50);
          await ctx.waitFor(() => !document.getElementById("cardOutcome").hidden);
          await ctx.evalJs(`(() => {
            const pws = [...document.querySelectorAll('#ocPowerRow .pw')];
            const best = pws.find(b => /Insurance/i.test(b.textContent)) || pws.find(b => /Wider/i.test(b.textContent)) || pws.find(b => /Fixed/i.test(b.textContent));
            if (best) best.click();
          })()`);
          await ctx.evalJs("document.getElementById('cardContinue').focus()");
          await pressEnter(ctx);
          await ctx.waitFor(() => document.getElementById("cardModal").hidden);
        }
      } else if (state.offer) {
        if (!testedOffer) {
          await assertModalA11y(ctx, "offerModal");
          assert.match(await ctx.evalJs("document.getElementById('offerModal').getAttribute('aria-labelledby')"), /offerTitleZh/);
          await tabCycle(ctx, "#offerModal");
          testedOffer = true;
        }
        await ctx.evalJs("window.__advanceFrames(10, 50)");
        await ctx.pressKey("2", "Digit2", 50);
        await ctx.evalJs("window.__advanceFrames(5, 50)");
      } else if (state.revive) {
        if (!testedRevive) await verifyReviveModal();
        else {
          const canNo = await ctx.evalJs("!document.getElementById('rvNo').closest('[hidden]') && !document.getElementById('rvActions').hidden");
          const canGo = await ctx.evalJs("!document.getElementById('rvGo').closest('[hidden]') && !document.getElementById('rvLesson').hidden");
          if (canNo) await ctx.click("#rvNo"); else if (canGo) await ctx.click("#rvGo");
          await ctx.evalJs("window.__advanceFrames(15, 50)");
        }
      } else {
        // Spread items evenly across 5 safe alternating lanes (NUDGE = 6px/tap) so the tower stays stable past 110s
        const lanes = [-7, 7, -4, 4, 0];
        const idx = playStep < 5 ? playStep : (playStep % 2 === 0 ? Math.floor(playStep / 2) % lanes.length : -1);
        if (idx >= 0 && lanes[idx] !== 0) {
          const dir = lanes[idx] < 0 ? "ArrowLeft" : "ArrowRight";
          const kc = lanes[idx] < 0 ? 37 : 39;
          const n = Math.abs(lanes[idx]);
          for (let t = 0; t < n; t++) {
            await ctx.cdp("Input.dispatchKeyEvent", { type: "keyDown", key: dir, code: dir, windowsVirtualKeyCode: kc });
            await ctx.cdp("Input.dispatchKeyEvent", { type: "keyUp", key: dir, code: dir, windowsVirtualKeyCode: kc });
          }
        }
        if (playStep < 5) await ctx.pressKey(" ", "Space", 32);
        playStep++;
        await ctx.evalJs("window.__advanceFrames(30, 50)");
      }
    }
    const dbg = await ctx.evalJs("({ end: !document.getElementById('endModal').hidden, card: !document.getElementById('cardModal').hidden, offer: !document.getElementById('offerModal').hidden, revive: !document.getElementById('reviveModal').hidden, nw: document.getElementById('hudNw')?.textContent, drops: document.getElementById('hudDrops')?.textContent, time: document.getElementById('hudTime')?.textContent })");
    assert.equal(testedCard, true, "Never got a wise card with powers to test: " + JSON.stringify(dbg));
    assert.equal(testedOffer, true, "Never encountered #offerModal: " + JSON.stringify(dbg));

    // Trigger 3 drops into the harbour to reach #reviveModal (if not already tested) and #endModal
    for (let attempt = 0; attempt < 260; attempt++) {
      const rvOpen = await ctx.evalJs("(!document.getElementById('reviveModal').hidden) || !document.getElementById('endModal').hidden");
      if (rvOpen) break;
      const modal = await ctx.evalJs("(!document.getElementById('cardModal').hidden && !document.getElementById('cardOutcome').hidden) ? 'flip' : !document.getElementById('cardModal').hidden ? 'card' : !document.getElementById('offerModal').hidden ? 'offer' : ''");
      if (modal === "card") { await ctx.pressKey("1", "Digit1", 49); await ctx.evalJs("window.__advanceFrames(10, 50)"); }
      else if (modal === "flip") { await ctx.pressKey("Enter", "Enter", 13); await ctx.evalJs("window.__advanceFrames(5, 50)"); }
      else if (modal === "offer") { await ctx.pressKey("2", "Digit2", 50); await ctx.evalJs("window.__advanceFrames(10, 50)"); }
      else {
        // Steer hard left so items miss the platform and drop into the harbour
        await ctx.cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
        await ctx.evalJs("window.__advanceFrames(18, 50)");
        await ctx.cdp("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
        await ctx.pressKey(" ", "Space", 32);
        await ctx.evalJs("window.__advanceFrames(35, 50)");
      }
    }
    if (!testedRevive) {
      await ctx.waitFor(() => !document.getElementById("reviveModal").hidden, 6000);
      await verifyReviveModal();
    }
    assert.equal(testedRevive, true, "Never verified #reviveModal");
    await ctx.waitFor(() => !document.getElementById("endModal").hidden, 6000);
    await ctx.evalJs("window.__advanceFrames(20, 50)");

    // Step 1
    await assertModalA11y(ctx, "endModal");
    assert.equal(await ctx.evalJs("document.getElementById('endModal').getAttribute('aria-labelledby')"), "endTitle");
    await tabCycle(ctx, "#endModal");

    // Step 2: Quiz + Habits
    await ctx.click("#stNext");
    await ctx.waitFor(() => document.querySelector("#endModal .statement").dataset.step === "2");
    await assertModalA11y(ctx, "endModal");
    assert.equal(await ctx.evalJs("document.getElementById('endModal').getAttribute('aria-labelledby')"), "quizHead");
    assert.equal(await ctx.evalJs("document.getElementById('habits').getAttribute('role')"), "radiogroup");

    for (let qi = 0; qi < 3; qi++) {
      await ctx.evalJs(`document.querySelectorAll('#quiz .qz')[${qi}].querySelector('.qopt').focus()`);
      await pressEnter(ctx);
      const qState = await activeInfo(ctx);
      assert.equal(qState.isBody, false, `Answering quiz ${qi} dropped focus to <body>`);
      assert.equal(qState.ariaDisabled, "true");
    }

    await ctx.evalJs("document.querySelector('#habits input[type=radio]').focus()");
    await ctx.pressKey("ArrowDown", "ArrowDown", 40);
    await pressSpace(ctx);
    assert.equal(await ctx.evalJs("!!document.querySelector('#habits input[type=radio]:checked')"), true);

    // Step 3: Post score -> #postBtn uses aria-disabled, never drops focus to <body>
    await ctx.click("#stNext");
    await ctx.waitFor(() => document.querySelector("#endModal .statement").dataset.step === "3");
    await assertModalA11y(ctx, "endModal");
    assert.equal(await ctx.evalJs("document.getElementById('endModal').getAttribute('aria-labelledby')"), "infoHead");

    await ctx.evalJs(`(() => {
      document.getElementById('nickname').value = 'A11yCrab';
      document.getElementById('email').value = 'a11y@example.com';
      document.getElementById('postBtn').focus();
    })()`);
    await pressEnter(ctx);
    const postFocus = await activeInfo(ctx);
    assert.equal(postFocus.isBody, false, "#postBtn dropped focus to <body>");
    assert.equal(postFocus.id, "postBtn");
    assert.equal(postFocus.ariaDisabled, "true");

    // Step 4 -> Escape -> #seeOv -> #againBtn2 -> #rollModal -> Escape -> restores #againBtn2
    await ctx.waitFor(() => document.querySelector("#endModal .statement").dataset.step === "4", 6000);
    await assertModalA11y(ctx, "endModal");
    assert.equal(await ctx.evalJs("document.getElementById('endModal').getAttribute('aria-labelledby')"), "cardHead");
    await tabCycle(ctx, "#endModal");

    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("endModal").hidden && !document.getElementById("seeOv").hidden);
    assert.equal((await activeInfo(ctx)).id, "againBtn2");

    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("rollModal").hidden);
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("rollModal").hidden);
    assert.equal((await activeInfo(ctx)).id, "againBtn2");

    assert.deepEqual(ctx.errors, [], "Browser errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }

  // Booth mode (?booth=1): #endModal Step 4 #againBtn -> #pickModal -> #pickGo -> #rollModal -> Escape / #rollClose
  const boothCtx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await boothCtx.cdp("Page.addScriptToEvaluateOnNewDocument", { source: CLOCK_HOOK });
    await boothCtx.goto(`${srv.baseUrl}/?intro=0&booth=1`);
    await boothCtx.waitFor(() => !document.getElementById("startBtn").hidden);
    await boothCtx.click("#startBtn");
    await boothCtx.waitFor(() => !document.getElementById("pickModal").hidden);
    await boothCtx.click("#pickGo");
    await boothCtx.waitFor(() => !document.getElementById("rollModal").hidden);
    await boothCtx.click("#rollGo");
    await boothCtx.waitFor(() => document.getElementById("rollSay").textContent.trim().length > 0, 6000);
    await boothCtx.evalJs("window.__enableSimClock()");
    await boothCtx.click("#rollGo");
    await boothCtx.waitFor(() => document.getElementById("rollModal").hidden && document.getElementById("startOv").hidden && window.__simReady());
    for (let attempt = 0; attempt < 260; attempt++) {
      const done = await boothCtx.evalJs("!document.getElementById('endModal').hidden");
      if (done) break;
      const modal = await boothCtx.evalJs("!document.getElementById('reviveModal').hidden ? 'revive' : (!document.getElementById('cardModal').hidden && !document.getElementById('cardOutcome').hidden) ? 'flip' : !document.getElementById('cardModal').hidden ? 'card' : !document.getElementById('offerModal').hidden ? 'offer' : ''");
      if (modal === "revive") {
        const canNo = await boothCtx.evalJs("!document.getElementById('rvNo').closest('[hidden]') && !document.getElementById('rvActions').hidden");
        const canGo = await boothCtx.evalJs("!document.getElementById('rvGo').closest('[hidden]') && !document.getElementById('rvLesson').hidden");
        if (canNo) await boothCtx.click("#rvNo");
        else if (canGo) await boothCtx.click("#rvGo");
        await boothCtx.evalJs("window.__advanceFrames(15, 50)");
      } else if (modal === "card") { await boothCtx.pressKey("1", "Digit1", 49); await boothCtx.evalJs("window.__advanceFrames(10, 50)"); }
      else if (modal === "flip") { await boothCtx.pressKey("Enter", "Enter", 13); await boothCtx.evalJs("window.__advanceFrames(5, 50)"); }
      else if (modal === "offer") { await boothCtx.pressKey("2", "Digit2", 50); await boothCtx.evalJs("window.__advanceFrames(10, 50)"); }
      else {
        await boothCtx.cdp("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
        await boothCtx.evalJs("window.__advanceFrames(18, 50)");
        await boothCtx.cdp("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowLeft", code: "ArrowLeft", windowsVirtualKeyCode: 37 });
        await boothCtx.pressKey(" ", "Space", 32);
        await boothCtx.evalJs("window.__advanceFrames(35, 50)");
      }
    }
    await boothCtx.waitFor(() => !document.getElementById("endModal").hidden, 6000);
    await boothCtx.evalJs("window.__advanceFrames(20, 50)");

    // Advance Steps 1 -> 2 -> 3 -> 4
    await boothCtx.click("#stNext");
    await boothCtx.waitFor(() => document.querySelector("#endModal .statement").dataset.step === "2");
    for (let qi = 0; qi < 3; qi++) {
      await boothCtx.evalJs(`document.querySelectorAll('#quiz .qz')[${qi}].querySelector('.qopt').click()`);
    }
    await boothCtx.evalJs("document.querySelector('#habits input[type=radio]').click()");
    await boothCtx.click("#stNext");
    await boothCtx.waitFor(() => document.querySelector("#endModal .statement").dataset.step === "3");
    await boothCtx.click("#stNext");
    await boothCtx.waitFor(() => document.querySelector("#endModal .statement").dataset.step === "4");

    // #againBtn -> #pickModal -> Escape -> restores #endModal & #againBtn
    await boothCtx.evalJs("document.getElementById('againBtn').focus()");
    await pressEnter(boothCtx);
    await boothCtx.waitFor(() => !document.getElementById("pickModal").hidden && document.getElementById("endModal").hidden);
    await boothCtx.pressKey("Escape", "Escape", 27);
    await boothCtx.waitFor(() => document.getElementById("pickModal").hidden && !document.getElementById("endModal").hidden);
    assert.equal((await activeInfo(boothCtx)).id, "againBtn");

    // #againBtn -> #pickModal -> #pickGo -> #rollModal -> Escape -> restores #endModal & #againBtn
    await pressEnter(boothCtx);
    await boothCtx.waitFor(() => !document.getElementById("pickModal").hidden);
    await boothCtx.click("#pickGo");
    await boothCtx.waitFor(() => !document.getElementById("rollModal").hidden && document.getElementById("pickModal").hidden);
    await boothCtx.pressKey("Escape", "Escape", 27);
    await boothCtx.waitFor(() => document.getElementById("rollModal").hidden && !document.getElementById("endModal").hidden);
    assert.equal((await activeInfo(boothCtx)).id, "againBtn");

    // #againBtn (whoPicked is now true) -> #rollModal -> #rollClose -> restores #endModal & #againBtn
    await pressEnter(boothCtx);
    await boothCtx.waitFor(() => !document.getElementById("rollModal").hidden && document.getElementById("endModal").hidden);
    await boothCtx.sleep(350);
    await boothCtx.click("#rollClose");
    await boothCtx.waitFor(() => document.getElementById("rollModal").hidden && !document.getElementById("endModal").hidden);
    assert.equal((await activeInfo(boothCtx)).id, "againBtn");

    assert.deepEqual(boothCtx.errors, [], "Booth browser errors: " + boothCtx.errors.join(" | "));
  } finally {
    await boothCtx.close();
  }
});

test("A11y 4: /admin.html keyboard flows, live regions, scroll regions, CSV labels, and focus restoration", async () => {
  // Seed 203 background rows first so total rows (205) exercise multi-page #moreBtn pagination (PAGE = 100)
  for (let off = 0; off < 203; off += 25) {
    const batch = [];
    for (let j = off; j < Math.min(203, off + 25); j++) {
      batch.push(fetch(`${srv.baseUrl}/api/scores`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ score: 1000 + j * 10, board: false, stage: 1, height: 4.1, drops: 0, choices: [{ card: "newphone", pick: "wise" }], answers: [{ q: "fakeapp", pick: 1 }], habit: "buffer", items: 8 }),
      }));
    }
    const resList = await Promise.all(batch);
    for (const r of resList) assert.equal(r.status, 201);
  }
  for (let i = 0; i < 2; i++) {
    const r = await fetch(`${srv.baseUrl}/api/scores`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ score: 3000 + i * 500, name: `AdminA11y${i}`, email: `a${i}@example.com`, board: true, stage: 1, height: 4.1, drops: 0, choices: [{ card: "newphone", pick: "wise", power: "vine" }], answers: [{ q: "fakeapp", pick: 1 }], habit: "buffer", items: 8 }),
    });
    assert.equal(r.status, 201);
  }

  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.goto(`${srv.baseUrl}/admin.html`);
    await ctx.waitFor(() => !document.getElementById("loginCard").hidden);

    // Check live regions & scroll regions & distinct CSV labels in DOM
    const markup = await ctx.evalJs(`(() => ({
      loginMsgRole: document.getElementById("loginMsg")?.getAttribute("role"),
      kpiNoteRole: document.getElementById("kpiNote")?.getAttribute("role"),
      panelMsgRole: document.getElementById("panelMsg")?.getAttribute("role"),
      wrapsOk: [...document.querySelectorAll(".wrap, .chartbox")].every(w => w.tabIndex === 0 && w.getAttribute("role") === "region" && !!(w.getAttribute("aria-label") || "").trim()),
      dlLabels: ["dlGames", "dlAnswers", "dlEvents"].map(id => document.getElementById(id)?.getAttribute("aria-label")),
    }))()`);
    assert.equal(markup.loginMsgRole, "status");
    assert.equal(markup.kpiNoteRole, "status");
    assert.equal(markup.panelMsgRole, "status");
    assert.equal(markup.wrapsOk, true);
    assert.equal(new Set(markup.dlLabels).size, 3);
    assert.ok(markup.dlLabels.every((s) => s && s.includes(".csv")));

    // Bad token keeps focus inside #loginCard and updates #loginMsg
    await ctx.evalJs("document.getElementById('token').value = 'wrong-token-123'; document.getElementById('token').focus();");
    await pressEnter(ctx);
    await ctx.waitFor(() => document.getElementById("loginMsg").classList.contains("err"));
    assert.equal(await ctx.evalJs("document.getElementById('loginCard').contains(document.activeElement)"), true);

    // Valid token moves focus into #panel (#tab-survey), never <body>
    await ctx.evalJs(`document.getElementById('token').value = ${JSON.stringify(srv.adminToken)}; document.getElementById('token').focus();`);
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("panel").hidden);
    const afterLogin = await activeInfo(ctx);
    assert.equal(afterLogin.isBody, false);
    assert.equal(afterLogin.id, "tab-survey");

    // ArrowRight / End / Home / ArrowLeft across all 6 tabs
    await ctx.pressKey("ArrowRight", "ArrowRight", 39);
    assert.equal((await activeInfo(ctx)).id, "tab-decisions");
    await ctx.pressKey("End", "End", 35);
    assert.equal((await activeInfo(ctx)).id, "tab-games");
    await ctx.pressKey("Home", "Home", 36);
    assert.equal((await activeInfo(ctx)).id, "tab-survey");

    // AXTree check: zero unnamed interactive controls
    await ctx.cdp("Accessibility.enable");
    const { nodes } = await ctx.cdp("Accessibility.getFullAXTree");
    const interactiveRoles = new Set(["button", "link", "textbox", "checkbox", "combobox", "tab"]);
    const unnamed = nodes.filter((n) => !n.ignored && interactiveRoles.has(n.role?.value) && !(n.name?.value && n.name.value.trim().length > 0));
    assert.deepEqual(unnamed.map((n) => n.role?.value), []);

    // Downloads tab: #dlGames and #csvBtn keep focus (never drop to <body> via .disabled = true)
    await ctx.click("#tab-downloads");
    await ctx.evalJs("document.getElementById('dlGames').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => document.getElementById("dlMsg").textContent.includes("Saved") && !document.getElementById("dlGames").hasAttribute("aria-disabled"), 8000);
    const afterDlGames = await activeInfo(ctx);
    assert.equal(afterDlGames.isBody, false, "#dlGames dropped focus to <body>");
    assert.equal(afterDlGames.id, "dlGames");

    await ctx.evalJs("document.getElementById('csvBtn').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("csvBtn").hasAttribute("aria-disabled"), 8000);
    const afterCsvBtn = await activeInfo(ctx);
    assert.equal(afterCsvBtn.isBody, false, "#csvBtn dropped focus to <body>");
    assert.equal(afterCsvBtn.id, "csvBtn");

    // Switch to Games tab and verify #moreBtn pagination + Hide / Anonymise / batchHide / Lock focus restoration
    await ctx.click("#tab-games");
    await ctx.waitFor(() => document.querySelectorAll("#rows tr").length === 100 && !document.getElementById("moreBtn").hidden);

    // Page 2 (still has more rows -> #moreBtn stays visible and retains focus)
    await ctx.evalJs("document.getElementById('moreBtn').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => document.querySelectorAll("#rows tr").length === 200 && !document.getElementById("moreBtn").hasAttribute("aria-disabled"), 6000);
    assert.equal(await ctx.evalJs("document.getElementById('moreBtn').hidden"), false);
    const afterMoreStay = await activeInfo(ctx);
    assert.equal(afterMoreStay.isBody, false, "#moreBtn dropped focus to <body> while more pages remain");
    assert.equal(afterMoreStay.id, "moreBtn");

    // Page 3 (final rows -> #moreBtn hides and moves focus to first newly added row)
    await pressEnter(ctx);
    await ctx.waitFor(() => document.querySelectorAll("#rows tr").length >= 205 && document.getElementById("moreBtn").hidden, 6000);
    const afterMoreDone = await activeInfo(ctx);
    assert.equal(afterMoreDone.isBody, false, "#moreBtn dropped focus to <body> after hiding");
    assert.equal(await ctx.evalJs("document.getElementById('rows').children[200]?.contains(document.activeElement)"), true);

    await ctx.evalJs("document.querySelector('#rows tr button.hide').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => document.querySelector("#rows tr").classList.contains("hidden"));
    const afterHideFocus = await activeInfo(ctx);
    assert.equal(afterHideFocus.isBody, false, "Hide button dropped focus to <body>");
    assert.equal(await ctx.evalJs("document.activeElement.textContent"), "Unhide");

    await ctx.evalJs("document.querySelector('#rows tr td:last-child button.ghost').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.querySelector("#rows tr:first-child td:last-child button.ghost"));
    const afterAnonFocus = await activeInfo(ctx);
    assert.equal(afterAnonFocus.isBody, false, "Anonymise button dropped focus to <body>");

    // Batch clear -> #batchBar hides and focus moves to #gAll (never <body>)
    await ctx.click("#rows tr input[type=checkbox]");
    await ctx.waitFor(() => !document.getElementById("batchBar").hidden);
    await ctx.evalJs("document.getElementById('batchClear').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => document.getElementById("batchBar").hidden);
    const afterBatchClear = await activeInfo(ctx);
    assert.equal(afterBatchClear.isBody, false, "#batchClear dropped focus to <body>");
    assert.equal(afterBatchClear.id, "gAll");

    // Batch hide -> focus moves to #gAll
    await ctx.click("#rows tr input[type=checkbox]");
    await ctx.waitFor(() => !document.getElementById("batchBar").hidden);
    await ctx.evalJs("document.getElementById('batchHide').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => document.getElementById("batchBar").hidden && !document.getElementById("batchHide").hasAttribute("aria-disabled"));
    assert.equal((await activeInfo(ctx)).id, "gAll");

    // Lock -> focus moves to #token
    await ctx.evalJs("document.getElementById('lockBtn').focus()");
    await pressEnter(ctx);
    await ctx.waitFor(() => !document.getElementById("loginCard").hidden);
    assert.equal((await activeInfo(ctx)).id, "token");

    assert.deepEqual(ctx.errors, [], "Admin browser errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});
