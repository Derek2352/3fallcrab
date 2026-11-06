// The scenes tools/clips.mjs films for How to play. Each one: a screen size (vp), the part of the screen kept
// (crop, CSS px), its length (secs), a setup run before filming, and cues: [ms after filming starts, what happens].
// g.run(code) runs code inside the game (S is the game state; spawn, shock, raiseNet... are the game's own functions),
// g.pad(act, down) presses the on-screen pad (shown with a tap mark), g.tap(selector) taps a button, g.wait(ms) lets
// time pass without filming.
const PHONE = { viewport: { width: 390, height: 760 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true };
const BOARD = { x: 0, y: 128, width: 390, height: 632 };   // under the status bar, down to the pad
const HUD = { x: 0, y: 48, width: 390, height: 632 };      // the status bar and the board (same size)

// A game under way with nothing random coming: no Life Event cards, shocks or offers unless a scene asks. `tower`
// builds a pile first, unfilmed (ids from src/items, until it's `floors` high; fixed in place unless `loose`), and
// `queue` is the items to come, the first one in play at once. `more` is code run at the end (game scope).
const QUIET = `S.nextEvent = 1e12; S.shocks = []; S.troll.investAt = S.troll.ticketAt = 1e12; S.plan = null;`;
async function play(g, { queue, tower, floors = 0, loose = false, more = "" }) {
  await g.tap("#startBtn"); await g.wait(700);
  await g.run(`${QUIET} if (S.active){ Composite.remove(engine.world, S.active); S.active = null; } S.spawnAt = 0; hush();`);
  for (let i = 0; tower && i < 30; i++) {
    const h = await g.run(`(() => { const top = Math.max(0, ...engine.world.bodies.filter(b => b.tff).map(b => -b.bounds.min.y));
      if (top >= ${floors} * FLOOR) return top;
      const b = addItem(DEFS.find(d => d.id === ${JSON.stringify(tower[i % tower.length])}), W / 2 + ${loose ? "(Math.random() - .5) * 16" : 0}, -top - 45, false);
      Body.setVelocity(b, {x: 0, y: 1}); return -1; })()`);
    if (h >= 0) break;
    await g.wait(1100);
    if (!loose) await g.run(`engine.world.bodies.filter(b => b.tff && !b.isStatic && b.speed < 0.4).forEach(b => Body.setStatic(b, true))`);
  }
  await g.wait(900);
  await g.run(`S.queue = ${JSON.stringify(queue)}.map(id => DEFS.find(d => d.id === id)); nextPiece(); hush(); ${more}`);
  await g.wait(300);
}
const tapPad = (act, at, ms = 140) => [[at, g => g.pad(act, true)], [at + ms, g => g.pad(act, false)]];
const run = (at, code) => [at, g => g.run(code)];
// a Life Event card, dealt in a moment: the card and the order of its answers (its own pictures on the buttons)
const deal = (id, at) => run(at, `(() => { const c = CARDS.find(k => k.id === ${JSON.stringify(id)}), order = ["w", "r"];
  const thumbs = order.map(k => (c.thumb && c.thumb[k] && DEFS.find(d => d.id === c.thumb[k])) || POOLS.wise[0]);
  thumbs.forEach(d => wantSprite(d, 0, 1)); S.plan = {c, order, thumbs, stage: S.stage}; S.nextEvent = S.play; })()`);

export const SCENES = [
  { // 1. steer, drop; turn and drop; the third one lands on the edge, rolls off and splashes into the harbour
    id: "steer", vp: PHONE, crop: BOARD, secs: 6.4, still: 1.0,
    setup: g => play(g, { queue: ["textbooks", "lunchbox", "piggybank"] }),
    cues: [...tapPad("right", 150, 400), ...tapPad("left", 900, 400), ...tapPad("drop", 1600),
      ...tapPad("rotate", 2300), ...tapPad("drop", 2750),
      ...tapPad("right", 3350, 620), ...tapPad("drop", 4200)],
  },
  { // 2. the tower passes 4F: First Job (new clothes, faster items) and an insurance net for the new stage
    id: "climb", vp: PHONE, crop: HUD, secs: 5.6, still: 2.6,
    setup: g => play(g, { tower: ["textbooks", "passbook", "calculator", "lunchbox", "tissuebox", "ricesack"], floors: 3.55, queue: ["steamer", "piggybank"] }),
    cues: [...tapPad("drop", 500)],
  },
  { // 3. roll who you are: two reels, family money and personality
    id: "roll", vp: PHONE, crop: HUD, secs: 5.2, still: 3.6, roll: true,
    setup: async g => { await g.tap("#startBtn"); await g.wait(900); },
    cues: [[500, g => g.run(`(() => { const q = [0.01, 0.01], R = Math.random; Math.random = () => q.length ? q.shift() : R(); })()`)],
      [520, g => g.tap("#rollGo")]],
  },
  { // 4. a Life Event card: the wise answer, what happened next, and the next item comes vine-wrapped and sticks
    id: "card", vp: PHONE, crop: HUD, secs: 8.0, still: 3.4,
    setup: g => play(g, { tower: ["ricesack"], floors: 0.3, queue: ["passbook", "lunchbox", "tissuebox"] }),
    cues: [deal("newphone", 200), [1900, g => g.tap("#cardChoices .choice >> nth=0")], [5200, g => g.tap("#cardContinue")],
      ...tapPad("drop", 5700), ...tapPad("drop", 6700)],
  },
  { // 5. a shock with no emergency fund: the tower shakes
    id: "shock", vp: PHONE, crop: BOARD, secs: 4.6, still: 1.6,
    setup: g => play(g, { tower: ["ricesack", "textbooks", "lunchbox", "calculator", "piggybank"], floors: 2.6, loose: true, queue: ["passbook"], more: "S.fund = 0;" }),
    cues: [run(500, "shock()")],
  },
  { // 6. helpers: a vine item sticks, a fixed-deposit item locks, the insurance net catches what falls
    id: "helpers", vp: PHONE, crop: BOARD, secs: 9.4, still: 2.0,
    setup: g => play(g, { tower: ["ricesack"], floors: 0.3, queue: ["lunchbox"], more: `S.queue[0] = vineOf(S.queue[0]); S.queue[1] = lockOf(DEFS.find(d => d.id === "passbook")); S.queue[2] = DEFS.find(d => d.id === "piggybank");
      Composite.remove(engine.world, S.active); S.active = null; nextPiece();` }),
    cues: [...tapPad("drop", 600), ...tapPad("drop", 2500), run(4700, `raiseNet("Insurance net: falls get caught", "保險網：跌落嚟都接得住")`),
      ...tapPad("right", 5200, 700), ...tapPad("drop", 6100)],
  },
  { // the 3 Falls. Overspending: a debt ball crashes onto the tower, then awkward shapes
    id: "fall-spend", vp: PHONE, crop: BOARD, secs: 5.4, still: 1.4,
    setup: g => play(g, { tower: ["ricesack", "textbooks", "lunchbox"], floors: 1.6, queue: ["guitar", "racket"] }),
    cues: [run(300, `Composite.remove(engine.world, S.active); S.active = null; S.spawnAt = S.play + 2600; S.forced = {type: "risky", n: 3}; dropDebt(); quip("spend", 2);`),
      ...tapPad("drop", 3800)],
  },
  { // Scams: HK$5,000 gone (the status bar), slippery bouncy items, and Hold locked. Each Fall starts the way the game
    // does after the risky answer's card closes: its effect, and the crab's line for it
    id: "fall-scam", vp: PHONE, crop: HUD, secs: 6.0, still: 1.2,
    setup: g => play(g, { tower: ["ricesack", "textbooks"], floors: 1.0, queue: ["passbook"], more: "S.score = 9300; updateHUD();" }),
    cues: [run(300, `(() => { const sl = Math.min(S.score, 5000); S.score -= sl; ledger({zh: "被騙", en: "Scam"}, -sl); A.sfx("scam");
        S.queue = [DEFS.find(d => d.id === "cryptocoin"), DEFS.find(d => d.id === "freegift"), DEFS.find(d => d.id === "hottip")];
        Composite.remove(engine.world, S.active); S.active = null; S.scamLock = 4; S.spawnAt = S.play + 200;
        quip("scam", 2); updateHUD(); })()`),
      ...tapPad("drop", 1300), ...tapPad("hold", 3300), ...tapPad("drop", 3900)],
  },
  { // Putting off saving: time speeds up, the savings boost drops back to ×1.0
    id: "fall-delay", vp: PHONE, crop: HUD, secs: 5.0, still: 1.6,
    setup: g => play(g, { tower: ["ricesack", "textbooks"], floors: 1.0, queue: ["banana", "sneaker", "umbrella"], more: "S.rate = 1.6; updateHUD();" }),
    cues: [run(300, `S.speedUntil = S.play + 20000; S.rate = 1; S.forced = {type: "risky", n: 2}; S.fastOn = true; A.mode(musicMode()); quip("delay", 2); stamp("Time flies!", "時間加速", "info"); updateHUD();`),
      ...tapPad("drop", 2600)],
  },
];
