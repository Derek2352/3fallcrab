// Hybrid Node + headless Chromium OfflineAudioContext test suite for src/audio.js:
// Suite A: fast Node import + vm + spy-AudioContext unit tests (pre-unlock, persistence, clamping, fades, throttling, SONG invariants).
// Suite B: real Blink OfflineAudioContext DSP checks across all 53 SFX + variants, 10 impacts + pan, 9 film cues + 4 VIA cuts,
//          32-bar LEAD_SRC sweep, stages 0..3, modes, late-stage stem isolation/distinctness, and mute/fade silence.
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { launchBrowser } from "./e2e/cdp.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const audioSrc = readFileSync(join(root, "src/audio.js"), "utf8");

const ALL_SFX = [
  "uiOpen", "uiClose", "uiNext", "uiBack", "uiToggle", "uiSelect", "uiDone", "lock", "netCatch", "rescue",
  "uiNope", "go", "reel", "reelStop", "rival", "click", "spawn", "move", "rotate", "hold", "release",
  "harddrop", "deposit", "floor", "stage", "splash", "cardOpen", "clap", "cardTick", "wise", "risky",
  "stamp", "debt", "scam", "quake", "shield", "timeWarn", "timeUp", "gameOver", "win", "vine", "slime",
  "vineGet", "jackpot", "frenzyTick", "frenzyEnd", "post", "offerPop", "profitTick", "scratch",
  "nearMiss", "heartbeat", "reviveFail",
];

const ALL_IMPACTS = ["card", "wood", "plastic", "metal", "glass", "fabric", "rubber", "food", "slick", "platform"];
const ALL_FILM_CUES = ["open", "campus", "pay", "spend", "scam", "delay", "tower", "title", "hook"];
const ALL_VIA_CUTS = ["dissolve", "whip", "white", "hook"];

function createAudioSandbox({
  storedMuted = null,
  localStorageThrows = false,
  hidden = false,
  hasAudioContext = true,
  hasOfflineAudioContext = true,
} = {}) {
  let now = 0;
  let nextTimerId = 1;
  const intervals = new Map();
  const timeouts = [];
  const clearedIntervals = [];
  const docListeners = new Map();
  const store = new Map();
  if (storedMuted != null) store.set("tff_muted", storedMuted);

  const paramCalls = [];
  const createdNodes = [];
  const ctxInstances = [];

  function makeParam(owner, name, initial = 0) {
    let val = initial;
    const p = {
      get value() { return val; },
      set value(v) {
        assert.ok(Number.isFinite(v), `${owner}.${name} assigned non-finite value: ${v}`);
        val = v;
      },
      setValueAtTime(v, t) {
        assert.ok(Number.isFinite(v) && Number.isFinite(t) && t >= 0, `${owner}.${name}.setValueAtTime(${v}, ${t})`);
        val = v;
        paramCalls.push({ owner, name, op: "setValueAtTime", v, t });
      },
      linearRampToValueAtTime(v, t) {
        assert.ok(Number.isFinite(v) && Number.isFinite(t) && t >= 0, `${owner}.${name}.linearRampToValueAtTime(${v}, ${t})`);
        val = v;
        paramCalls.push({ owner, name, op: "linearRampToValueAtTime", v, t });
      },
      exponentialRampToValueAtTime(v, t) {
        assert.ok(Number.isFinite(v) && v > 0 && Number.isFinite(t) && t >= 0, `${owner}.${name}.exponentialRampToValueAtTime(${v}, ${t})`);
        val = v;
        paramCalls.push({ owner, name, op: "exponentialRampToValueAtTime", v, t });
      },
      setTargetAtTime(v, t, tau) {
        assert.ok(Number.isFinite(v) && Number.isFinite(t) && t >= 0 && Number.isFinite(tau) && tau > 0, `${owner}.${name}.setTargetAtTime(${v}, ${t}, ${tau})`);
        val = v;
        paramCalls.push({ owner, name, op: "setTargetAtTime", v, t, tau });
      },
      setValueCurveAtTime(curve, t, dur) {
        assert.ok(curve && curve.length >= 2 && Number.isFinite(t) && t >= 0 && Number.isFinite(dur) && dur > 0, `${owner}.${name}.setValueCurveAtTime`);
        paramCalls.push({ owner, name, op: "setValueCurveAtTime", t, dur });
      },
      cancelScheduledValues(t) {
        assert.ok(Number.isFinite(t) && t >= 0, `${owner}.${name}.cancelScheduledValues(${t})`);
        paramCalls.push({ owner, name, op: "cancelScheduledValues", t });
      },
    };
    return p;
  }

  function makeNode(kind, extra = {}) {
    const n = {
      kind,
      connectedTo: [],
      disconnected: false,
      connect(dest) { this.connectedTo.push(dest); return dest; },
      disconnect() { this.disconnected = true; },
      ...extra,
    };
    createdNodes.push(n);
    return n;
  }

  class SpyAudioContext {
    constructor(opts) {
      this.opts = opts;
      this.sampleRate = 44100;
      this.state = "suspended";
      this.suspendCount = 0;
      this.resumeCount = 0;
      this.destination = makeNode("destination");
      ctxInstances.push(this);
    }
    get currentTime() { return now; }
    resume() { this.resumeCount++; this.state = "running"; return Promise.resolve(); }
    suspend() { this.suspendCount++; this.state = "suspended"; return Promise.resolve(); }
    createGain() { const n = makeNode("gain"); n.gain = makeParam("gain", "gain", 1); return n; }
    createBiquadFilter() {
      const n = makeNode("filter", { type: "lowpass" });
      n.frequency = makeParam("filter", "frequency", 350);
      n.Q = makeParam("filter", "Q", 1);
      return n;
    }
    createOscillator() {
      const n = makeNode("osc", { type: "sine", startedAt: null, stoppedAt: null, periodicWave: null });
      n.frequency = makeParam("osc", "frequency", 440);
      n.detune = makeParam("osc", "detune", 0);
      n.setPeriodicWave = (w) => { n.periodicWave = w; };
      n.start = (t = 0) => { assert.ok(Number.isFinite(t) && t >= 0); n.startedAt = t; };
      n.stop = (t = 0) => { assert.ok(Number.isFinite(t) && t >= 0); n.stoppedAt = t; };
      return n;
    }
    createBuffer(ch, len, sr) {
      const channels = Array.from({ length: ch }, () => new Float32Array(len));
      return { numberOfChannels: ch, length: len, sampleRate: sr, getChannelData: (i) => channels[i] };
    }
    createBufferSource() {
      const n = makeNode("bufsrc", { buffer: null, loop: false, startedAt: null, stoppedAt: null });
      n.start = (t = 0) => { assert.ok(Number.isFinite(t) && t >= 0); n.startedAt = t; };
      n.stop = (t = 0) => { assert.ok(Number.isFinite(t) && t >= 0); n.stoppedAt = t; };
      return n;
    }
    createStereoPanner() { const n = makeNode("panner"); n.pan = makeParam("panner", "pan", 0); return n; }
    createWaveShaper() { return makeNode("shaper", { curve: null, oversample: "none" }); }
    createDynamicsCompressor() {
      const n = makeNode("comp");
      n.threshold = makeParam("comp", "threshold", -24);
      n.knee = makeParam("comp", "knee", 30);
      n.ratio = makeParam("comp", "ratio", 12);
      n.attack = makeParam("comp", "attack", 0.003);
      n.release = makeParam("comp", "release", 0.25);
      return n;
    }
    createDelay() { const n = makeNode("delay"); n.delayTime = makeParam("delay", "delayTime", 0); return n; }
    createPeriodicWave(re, im) { return { re, im }; }
  }

  class SpyOfflineAudioContext extends SpyAudioContext {
    constructor(ch, len, sr) {
      if (!(len > 0 && Number.isFinite(len))) throw new RangeError("Invalid offline buffer length");
      super({ ch, len, sr });
      this._ch = ch;
      this._len = len;
      this._sr = sr;
      this.state = "running";
    }
    startRendering() {
      return Promise.resolve(this.createBuffer(this._ch, this._len, this._sr));
    }
  }

  const sandbox = {
    Math, Number, String, Boolean, Array, Object, Promise, Error, RangeError, TypeError, RegExp, Float32Array,
    isNaN, parseFloat, parseInt,
    localStorage: {
      getItem(k) {
        if (localStorageThrows) throw new Error("SecurityError");
        return store.has(k) ? store.get(k) : null;
      },
      setItem(k, v) {
        if (localStorageThrows) throw new Error("SecurityError");
        store.set(k, String(v));
      },
    },
    document: {
      hidden,
      addEventListener(type, fn) {
        if (!docListeners.has(type)) docListeners.set(type, new Set());
        docListeners.get(type).add(fn);
      },
    },
    setInterval(fn, ms) { const id = nextTimerId++; intervals.set(id, { fn, ms }); return id; },
    clearInterval(id) { intervals.delete(id); clearedIntervals.push(id); },
    setTimeout(fn, ms) {
      assert.ok(Number.isFinite(ms) && ms >= 0, `setTimeout received invalid delay: ${ms}`);
      const id = nextTimerId++;
      timeouts.push({ id, fn, ms });
      return id;
    },
  };
  if (hasAudioContext) sandbox.AudioContext = SpyAudioContext;
  if (hasOfflineAudioContext) sandbox.OfflineAudioContext = SpyOfflineAudioContext;
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;

  vm.runInNewContext(audioSrc, sandbox, { filename: "src/audio.js" });
  return {
    sandbox,
    GameAudio: sandbox.GameAudio,
    store,
    paramCalls,
    createdNodes,
    ctxInstances,
    intervals,
    timeouts,
    clearedIntervals,
    getTime: () => now,
    advance(dt) { now += dt; },
    runIntervalTicks(count = 1) {
      for (let i = 0; i < count; i++) {
        for (const { fn } of intervals.values()) fn();
      }
    },
    flushTimeouts() {
      while (timeouts.length) timeouts.shift().fn();
    },
    setHidden(v) {
      sandbox.document.hidden = v;
      for (const fn of docListeners.get("visibilitychange") || []) fn();
    },
  };
}

// =========================================================================
// Suite A — Fast Node Unit Tests
// =========================================================================

test("A0: direct ESM import without window attaches globalThis.GameAudio safely", async () => {
  const hadWindow = "window" in globalThis;
  assert.equal(hadWindow, false, "test assumes Node global has no window");
  await import("../src/audio.js");
  const ga = globalThis.GameAudio;
  assert.ok(ga && typeof ga === "object", "globalThis.GameAudio missing");
  for (const k of ["unlock", "isMuted", "setMuted", "toggleMute", "setMusicVolume", "setSfxVolume", "suspend", "resume", "sfx", "impact", "renderOffline"]) {
    assert.equal(typeof ga[k], "function", `missing GameAudio.${k}`);
  }
  assert.equal(typeof ga.film?.cue, "function");
  assert.equal(typeof ga.film?.stop, "function");
  assert.equal(typeof ga.film?.live, "function");
  assert.equal(typeof ga.film?.cues, "function");
  assert.equal(typeof ga.music?.start, "function");
  assert.equal(typeof ga.music?.stop, "function");
  assert.equal(typeof ga.music?.setStage, "function");
  assert.equal(typeof ga.music?.setMode, "function");
  assert.doesNotThrow(() => {
    ga.unlock();
    ga.sfx("click");
    ga.impact("card", 0.7, 0);
    ga.film.cue("open");
    ga.film.stop(0.2);
    ga.music.start();
    ga.music.setStage(2);
    ga.music.setMode("normal");
    ga.music.stop();
  });
  await assert.rejects(() => ga.renderOffline("sfx", "click", 0.5), /OfflineAudioContext unavailable/);
});

test("A1: pre-unlock safety, missing AudioContext, and deferred music state", () => {
  const noAc = createAudioSandbox({ hasAudioContext: false });
  assert.doesNotThrow(() => {
    noAc.GameAudio.sfx("click");
    noAc.GameAudio.impact("card", 0.8, 0);
    assert.equal(noAc.GameAudio.film.cue("open"), false);
    assert.equal(noAc.GameAudio.film.live(), false);
    noAc.GameAudio.film.stop(0.2);
    noAc.GameAudio.music.start();
    noAc.GameAudio.music.setStage(2);
    noAc.GameAudio.music.setMode("frenzy");
    noAc.GameAudio.setMuted(true);
    assert.equal(noAc.GameAudio.isMuted(), true);
    assert.equal(noAc.GameAudio.toggleMute(), false);
    noAc.GameAudio.setMusicVolume(0.5);
    noAc.GameAudio.setSfxVolume(0.5);
    noAc.GameAudio.suspend();
    noAc.GameAudio.resume();
    noAc.GameAudio.unlock();
  });
  assert.equal(noAc.ctxInstances.length, 0);

  // Deferred music stage/mode/start before unlock()
  const env = createAudioSandbox();
  env.GameAudio.music.setStage(3);
  env.GameAudio.music.setMode("frenzy");
  env.GameAudio.music.start();
  assert.equal(env.ctxInstances.length, 0);

  env.GameAudio.unlock();
  assert.equal(env.ctxInstances.length, 1);
  assert.equal(env.ctxInstances[0].state, "running");
  assert.equal(env.intervals.size, 1, "deferred startMusic should schedule tick interval on unlock");
  const oscNodes = env.createdNodes.filter((n) => n.kind === "osc");
  assert.ok(oscNodes.length > 0, "deferred frenzy/stage-3 music should synthesize oscillators immediately on unlock");
});

test("A2: mute persistence, localStorage resilience, volume & stage/mode clamping", () => {
  const preMuted = createAudioSandbox({ storedMuted: "1" });
  assert.equal(preMuted.GameAudio.isMuted(), true);

  const throwingStore = createAudioSandbox({ localStorageThrows: true });
  assert.equal(throwingStore.GameAudio.isMuted(), false);
  throwingStore.GameAudio.setMuted(true);
  assert.equal(throwingStore.GameAudio.isMuted(), true);
  assert.equal(throwingStore.GameAudio.toggleMute(), false);

  const env = createAudioSandbox();
  env.GameAudio.unlock();
  env.GameAudio.setMuted(true);
  assert.equal(env.store.get("tff_muted"), "1");
  assert.equal(env.paramCalls.filter((c) => c.v === 0 && c.op === "setTargetAtTime").length >= 1, true);
  assert.equal(env.GameAudio.toggleMute(), false);
  assert.equal(env.store.get("tff_muted"), "0");

  env.paramCalls.length = 0;
  env.GameAudio.setMusicVolume(-1);
  env.GameAudio.setMusicVolume(5);
  env.GameAudio.setMusicVolume(NaN);
  const musicVolTargets = env.paramCalls.filter((c) => c.op === "setTargetAtTime").map((c) => c.v);
  assert.equal(musicVolTargets[0], 0);
  assert.ok(Math.abs(musicVolTargets[1] - 0.12) < 1e-9);
  assert.equal(musicVolTargets[2], 0);

  env.paramCalls.length = 0;
  env.GameAudio.setSfxVolume(-2);
  env.GameAudio.setSfxVolume(9);
  env.GameAudio.setSfxVolume(NaN);
  const sfxVolTargets = env.paramCalls.filter((c) => c.op === "setTargetAtTime").map((c) => c.v);
  assert.equal(sfxVolTargets[0], 0);
  assert.ok(Math.abs(sfxVolTargets[1] - 0.8) < 1e-9);
  assert.equal(sfxVolTargets[2], 0);

  // Stage & mode validation
  assert.doesNotThrow(() => {
    env.GameAudio.music.setStage(-5);
    env.GameAudio.music.setStage(99);
    env.GameAudio.music.setStage(NaN);
    env.GameAudio.music.setMode("bogus");
    env.GameAudio.music.setMode(null);
  });
  env.GameAudio.music.start();
  env.advance(0.1);
  env.runIntervalTicks(1);
  env.GameAudio.music.setMode("over");
  assert.equal(env.intervals.size, 0, "mode='over' should stop music interval");
  assert.equal(env.timeouts.length, 1, "mode='over' should schedule engine disposal timeout");
  env.flushTimeouts();
});

test("A3: film cues, negative/NaN/Infinity fades, stopMusic cleanup, and suspend/resume/visibility", () => {
  const env = createAudioSandbox();
  env.GameAudio.unlock();
  assert.deepEqual(env.GameAudio.film.cues(), ALL_FILM_CUES);
  assert.equal(env.GameAudio.film.cue("nonexistent"), false);

  for (const fade of [0, -1, NaN, "bad", Infinity, undefined]) {
    assert.equal(env.GameAudio.film.cue("open"), true);
    assert.doesNotThrow(() => env.GameAudio.film.stop(fade));
  }
  const ramps = env.paramCalls.filter((c) => c.op === "linearRampToValueAtTime");
  assert.ok(ramps.every((c) => Number.isFinite(c.v) && Number.isFinite(c.t) && c.t >= 0));

  const beforeMusicNodes = env.createdNodes.length;
  env.GameAudio.music.start();
  const engineFilters = env.createdNodes.slice(beforeMusicNodes).filter((n) => n.kind === "filter");
  assert.equal(engineFilters.length, 10, "Engine should register 10 filter buses including padF and brassF");
  env.GameAudio.music.stop();
  assert.equal(env.timeouts.length, 1);
  assert.ok(Number.isFinite(env.timeouts[0].ms) && env.timeouts[0].ms >= 0);
  env.flushTimeouts();
  assert.ok(engineFilters.every((n) => n.disconnected === true), "Engine.dispose() must disconnect all tracked buses including padF and brassF");

  const ctx = env.ctxInstances[0];
  const rBefore = ctx.resumeCount;
  const sBefore = ctx.suspendCount;
  env.GameAudio.suspend();
  assert.equal(ctx.suspendCount, sBefore + 1);
  assert.equal(ctx.state, "suspended");
  env.GameAudio.resume();
  assert.equal(ctx.resumeCount, rBefore + 1);
  assert.equal(ctx.state, "running");

  env.setHidden(true);
  assert.equal(ctx.state, "suspended");
  env.setHidden(false);
  assert.equal(ctx.state, "running");
});

test("A4: sfx/impact throttling, polyphony caps, NaN/string pan/volume guards, and invalid renderOffline", async () => {
  const env = createAudioSandbox();
  env.GameAudio.unlock();

  // Unknown SFX & malformed opts
  assert.doesNotThrow(() => {
    env.GameAudio.sfx("nonexistent");
    env.GameAudio.sfx("click", { volume: NaN, pan: "bad" });
  });
  const nodesAfterBad = env.createdNodes.length;
  // Throttling: click gap is 0.035s
  env.GameAudio.sfx("click");
  assert.equal(env.createdNodes.length, nodesAfterBad, "immediate repeat click should be throttled");
  env.advance(0.05);
  env.GameAudio.sfx("click");
  assert.ok(env.createdNodes.length > nodesAfterBad, "click after >0.035s gap should fire");

  // Polyphony cap: 14 <= live < 24 blocks LOW_PRIORITY while allowing high-priority; >= 24 blocks all
  env.advance(10);
  const lowPrioSet = new Set(["move", "click", "spawn", "rotate", "hold", "release", "deposit", "cardTick"]);
  const highPrio = ALL_SFX.filter((k) => !lowPrioSet.has(k));
  assert.ok(highPrio.length >= 26, "expected >= 26 non-low-priority SFX for polyphony test");
  for (let i = 0; i < 14; i++) env.GameAudio.sfx(highPrio[i]);
  const at14Nodes = env.createdNodes.length;
  env.GameAudio.sfx("click");
  assert.equal(env.createdNodes.length, at14Nodes, "LOW_PRIORITY sfx must be blocked when 14 <= live < 24");
  env.GameAudio.sfx(highPrio[14]);
  assert.ok(env.createdNodes.length > at14Nodes, "high-priority sfx must still play when 14 <= live < 24");
  for (let i = 15; i < 24; i++) env.GameAudio.sfx(highPrio[i]);
  const at24Nodes = env.createdNodes.length;
  env.GameAudio.sfx(highPrio[24]);
  assert.equal(env.createdNodes.length, at24Nodes, "high-priority sfx must be blocked when live >= 24");
  env.GameAudio.sfx("move");
  assert.equal(env.createdNodes.length, at24Nodes, "LOW_PRIORITY sfx must be blocked when live >= 24");

  // Impact guards & token bucket
  env.advance(5);
  const beforeImp = env.createdNodes.length;
  env.GameAudio.impact("card", 0.04, 0);
  env.GameAudio.impact("card", NaN, 0);
  assert.equal(env.createdNodes.length, beforeImp, "sub-threshold or NaN impact strength should no-op");

  env.GameAudio.impact("unknown_material", 0.8, -5);
  const panners = env.createdNodes.filter((n) => n.kind === "panner");
  assert.equal(panners[panners.length - 1].pan.value, -1, "pan should clamp to -1");

  // Burst > 4 simultaneous impacts at same timestamp should stop once tokens run out
  env.advance(5);
  let lastCount = env.createdNodes.length;
  let fired = 0;
  for (const mat of ALL_IMPACTS) {
    env.GameAudio.impact(mat, 0.9, 0);
    if (env.createdNodes.length > lastCount) {
      fired++;
      lastCount = env.createdNodes.length;
    }
  }
  assert.ok(fired <= 4, `expected token bucket <= 4 simultaneous impacts, got ${fired}`);

  // Invalid renderOffline calls reject cleanly
  await assert.rejects(() => env.GameAudio.renderOffline("bogus", "x", 1), /unknown kind/);
  await assert.rejects(() => env.GameAudio.renderOffline("sfx", "nope", 1), /unknown sfx/);
  await assert.rejects(() => env.GameAudio.renderOffline("film", "nope", 1), /unknown film/);
  await assert.rejects(() => env.GameAudio.renderOffline("sfx", "click", -1));
});

test("A5: SONG structure, bar tokens, BASS_PAT[3] octave safety, and SFX/IMPACT catalog parity", () => {
  const ctx = {};
  const mChords = /var CHORDS = (\[[\s\S]*?\]);/.exec(audioSrc);
  const mHook = /var HOOK = (\[[\s\S]*?\]);/.exec(audioSrc);
  const mChorus = /var CHORUS = (\[[\s\S]*?\]);/.exec(audioSrc);
  const mLead = /var LEAD_SRC = (\[\]\.concat\([\s\S]*?\));/.exec(audioSrc);
  const mCtrA = /var CTR_A = (\[[\s\S]*?\]);/.exec(audioSrc);
  const mCtrB = /var CTR_B = (\[[\s\S]*?\]);/.exec(audioSrc);
  const mCtr = /var CTR_SRC = (\[\]\.concat\([\s\S]*?\));/.exec(audioSrc);
  const mBassPat = /var BASS_PAT = (\[[\s\S]*?\]);/.exec(audioSrc);
  assert.ok(mChords && mHook && mChorus && mLead && mCtrA && mCtrB && mCtr && mBassPat, "failed to extract song constants");

  vm.runInNewContext(
    `${mChords[0]}\n${mHook[0]}\n${mChorus[0]}\n${mLead[0]}\n${mCtrA[0]}\n${mCtrB[0]}\n${mCtr[0]}\n${mBassPat[0]}`,
    ctx,
  );
  assert.equal(ctx.CHORDS.length, 32);
  assert.equal(ctx.LEAD_SRC.length, 32);
  assert.equal(ctx.CTR_SRC.length, 32);
  assert.deepEqual(ctx.LEAD_SRC.slice(0, 4), ctx.HOOK);
  assert.deepEqual(ctx.LEAD_SRC.slice(8, 12), ctx.HOOK);
  assert.deepEqual(ctx.LEAD_SRC.slice(16, 19), ctx.CHORUS);
  assert.deepEqual(ctx.LEAD_SRC.slice(24, 27), ctx.CHORUS);

  for (const [label, arr] of [["LEAD_SRC", ctx.LEAD_SRC], ["CTR_SRC", ctx.CTR_SRC]]) {
    arr.forEach((barStr, idx) => {
      const toks = barStr.trim().split(/\s+/).filter(Boolean);
      assert.ok(toks.length >= 1, `${label}[${idx}] is empty`);
      for (const tok of toks) {
        const m = /^(\d+)([A-G]#?)(\d)\.(\d+)$/.exec(tok);
        assert.ok(m, `invalid token ${tok} in ${label}[${idx}]`);
        const step = +m[1];
        const len = +m[4];
        assert.ok(step >= 0 && step <= 15, `step out of range in ${label}[${idx}]: ${tok}`);
        assert.ok(len >= 1, `non-positive length in ${label}[${idx}]: ${tok}`);
      }
    });
  }

  assert.equal(ctx.BASS_PAT.length, 4, "BASS_PAT should have 4 stage patterns (0..3)");
  for (const [step, pair] of Object.entries(ctx.BASS_PAT[3])) {
    const s = +step;
    assert.ok(s >= 0 && s <= 15, `BASS_PAT[3] invalid step ${step}`);
    assert.ok([0, 12, 24].includes(pair[0]), `BASS_PAT[3] offset must be octave-safe (0/12/24), got ${pair[0]}`);
    assert.ok(pair[1] >= 1, `BASS_PAT[3] step ${step} length must be >= 1`);
  }

  // Verify SFX <-> LEVEL parity and IMPACT catalog completeness
  const env = createAudioSandbox();
  assert.deepEqual(env.GameAudio.film.cues(), ALL_FILM_CUES);
  for (const sfx of ALL_SFX) {
    assert.match(audioSrc, new RegExp(`\\b${sfx}:\\s*function\\b`), `missing SFX.${sfx}`);
    assert.match(audioSrc, new RegExp(`\\b${sfx}:\\s*[0-9.]+`), `missing LEVEL.${sfx}`);
  }
  for (const mat of ALL_IMPACTS) {
    assert.match(audioSrc, new RegExp(`\\b${mat}:\\s*function\\b`), `missing IMPACT.${mat}`);
  }
});

test("A6: Object.prototype key guards, Engine bar-boundary pend transition, and frozen opts in strict mode", async () => {
  const env = createAudioSandbox();
  env.GameAudio.unlock();

  const protoKeys = ["toString", "constructor", "hasOwnProperty", "__proto__"];
  for (const key of protoKeys) {
    const nodesBeforeSfx = env.createdNodes.length;
    env.GameAudio.sfx(key);
    assert.equal(env.createdNodes.length, nodesBeforeSfx, `sfx("${key}") must be a no-op with 0 nodes created`);

    env.advance(1);
    const nodesBeforeImp = env.createdNodes.length;
    env.GameAudio.impact(key, 0.8, 0);
    assert.ok(env.createdNodes.length > nodesBeforeImp, `impact("${key}") should fall back to card impact`);

    const nodesBeforeFilm = env.createdNodes.length;
    assert.equal(env.GameAudio.film.cue(key), false, `film.cue("${key}") must return false`);
    assert.equal(env.createdNodes.length, nodesBeforeFilm, `film.cue("${key}") must create 0 nodes`);

    assert.equal(env.GameAudio.film.cue("open", { via: key }), true, `film.cue("open", { via: "${key}" }) must ignore prototype via`);
    env.GameAudio.film.stop(0);

    await assert.rejects(() => env.GameAudio.renderOffline("sfx", key, 0.5), new RegExp(`unknown sfx ${key}`));
    await assert.rejects(() => env.GameAudio.renderOffline("film", key, 0.5), new RegExp(`unknown film cue ${key}`));
    const [fL, fR] = await env.GameAudio.renderOffline("film", "open", 0.5, { via: key });
    assert.equal(fL.length, 22050);
    assert.equal(fR.length, 22050);

    const nodesBeforeOfflineImp = env.createdNodes.length;
    const [iL, iR] = await env.GameAudio.renderOffline("impact", `${key}:0.8`, 0.5);
    assert.equal(iL.length, 22050);
    assert.equal(iR.length, 22050);
    const offlineImpGains = env.createdNodes.slice(nodesBeforeOfflineImp).filter((n) => n.kind === "gain");
    const cardLevel = 0.75 * (0.14 + 0.86 * Math.pow(0.8, 1.3));
    assert.ok(
      offlineImpGains.some((g) => Math.abs(g.gain.value - cardLevel) < 1e-6),
      `renderOffline("impact", "${key}:0.8") must fall back to IMP_LEVEL.card (${cardLevel})`,
    );
  }

  // Engine bar-boundary pend stage transition (1 bar @ 116 BPM = 2.069s)
  const musicEnv = createAudioSandbox();
  musicEnv.GameAudio.unlock();
  musicEnv.GameAudio.music.setStage(0);
  musicEnv.GameAudio.music.start();
  musicEnv.paramCalls.length = 0;
  musicEnv.GameAudio.music.setStage(3);
  for (let i = 0; i < 18; i++) {
    musicEnv.advance(0.1);
    musicEnv.runIntervalTicks(1);
  }
  const midBarTargets = musicEnv.paramCalls.filter((c) => c.op === "setTargetAtTime").map((c) => c.v);
  assert.equal(midBarTargets.includes(4600), false, "Stage 3 brassF must defer until bar boundary");
  assert.equal(midBarTargets.includes(2400), false, "Stage 3 padF must defer until bar boundary");

  for (let i = 0; i < 6; i++) {
    musicEnv.advance(0.1);
    musicEnv.runIntervalTicks(1);
  }
  const nextBarTargets = musicEnv.paramCalls.filter((c) => c.op === "setTargetAtTime").map((c) => c.v);
  assert.equal(nextBarTargets.includes(4600), true, "Stage 3 brassF should apply at bar 1 downbeat");
  assert.equal(nextBarTargets.includes(2400), true, "Stage 3 padF should apply at bar 1 downbeat");
  musicEnv.GameAudio.music.stop();
  musicEnv.flushTimeouts();

  // Object.freeze(opts) in strict mode
  const frozenOpts = Object.freeze({ volume: 0.5, pan: 0.25, via: "dissolve", fade: 0.2, fadeAt: 0.1 });
  assert.doesNotThrow(() => {
    env.GameAudio.sfx("deposit", frozenOpts);
    env.GameAudio.film.cue("open", frozenOpts);
  });
  await env.GameAudio.renderOffline("sfx", "deposit:2000", 0.5, frozenOpts);
  await env.GameAudio.renderOffline("film", "open", 0.5, frozenOpts);
  await env.GameAudio.renderOffline("music", "3", 0.5, frozenOpts);
});

// =========================================================================
// Suite B — Real Chromium OfflineAudioContext DSP Tests
// =========================================================================

let browser;
let pageCtx;

before(async () => {
  browser = await launchBrowser();
  pageCtx = await browser.newContext();
  await pageCtx.evalJs(audioSrc);
  await pageCtx.evalJs(`(() => {
    window.__tffAudioTest = {
      analyze(L, R) {
        if (!L || !R || L.length !== R.length || L.length === 0) {
          return { ok: false, reason: "invalid buffer lengths" };
        }
        let peakL = 0, peakR = 0, sumL = 0, sumR = 0;
        for (let i = 0; i < L.length; i++) {
          const l = L[i], r = R[i];
          if (!Number.isFinite(l) || !Number.isFinite(r)) {
            return { ok: false, reason: "non-finite sample at " + i + ": " + l + "," + r };
          }
          const al = Math.abs(l), ar = Math.abs(r);
          if (al > 1.0 || ar > 1.0) {
            return { ok: false, reason: "clipping at " + i + ": " + l + "," + r };
          }
          if (al > peakL) peakL = al;
          if (ar > peakR) peakR = ar;
          sumL += l * l;
          sumR += r * r;
        }
        const n = L.length;
        return {
          ok: true,
          len: n,
          peakL,
          peakR,
          peak: Math.max(peakL, peakR),
          rmsL: Math.sqrt(sumL / n),
          rmsR: Math.sqrt(sumR / n),
          rms: Math.sqrt((sumL + sumR) / (2 * n)),
        };
      },
      sliceStats(L, R, startSec, endSec, sr = 44100) {
        const s = Math.max(0, Math.floor(startSec * sr));
        const e = Math.min(L.length, Math.floor(endSec * sr));
        let peak = 0, sum = 0;
        for (let i = s; i < e; i++) {
          const al = Math.abs(L[i]), ar = Math.abs(R[i]);
          if (al > peak) peak = al;
          if (ar > peak) peak = ar;
          sum += L[i] * L[i] + R[i] * R[i];
        }
        const n = Math.max(1, e - s);
        return { peak, rms: Math.sqrt(sum / (2 * n)) };
      },
      diff(L1, R1, L2, R2, limitSamples) {
        const n = Math.min(L1.length, L2.length, limitSamples || L1.length);
        let sumDiff = 0, sum1 = 0, sum2 = 0, maxAbsDiff = 0;
        for (let i = 0; i < n; i++) {
          const dl = L1[i] - L2[i], dr = R1[i] - R2[i];
          const md = Math.max(Math.abs(dl), Math.abs(dr));
          if (md > maxAbsDiff) maxAbsDiff = md;
          sumDiff += dl * dl + dr * dr;
          sum1 += L1[i] * L1[i] + R1[i] * R1[i];
          sum2 += L2[i] * L2[i] + R2[i] * R2[i];
        }
        const rmsDiff = Math.sqrt(sumDiff / (2 * n));
        const rms1 = Math.sqrt(sum1 / (2 * n));
        const rms2 = Math.sqrt(sum2 / (2 * n));
        return { rmsDiff, maxAbsDiff, normDiff: rmsDiff / Math.max(rms1, rms2, 1e-12) };
      },
      async runBatch(items, concurrency = 4) {
        const out = new Array(items.length);
        let next = 0;
        async function worker() {
          while (next < items.length) {
            const idx = next++;
            const it = items[idx];
            const [L, R] = await window.GameAudio.renderOffline(it.kind, it.name, it.seconds, it.opts);
            out[idx] = { id: it.id || it.name, ...window.__tffAudioTest.analyze(L, R) };
          }
        }
        await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
        return out;
      },
    };
  })()`);
  const ok = await pageCtx.evalJs("typeof window.GameAudio?.renderOffline === 'function'");
  assert.equal(ok, true);
});

after(async () => {
  try {
    if (pageCtx) {
      assert.deepEqual(pageCtx.errors, [], `Unexpected browser errors: ${pageCtx.errors.join("; ")}`);
      await pageCtx.close();
    }
  } finally {
    await browser?.close();
  }
});

test("B1: all 53 SFX + 26 parameterized variants + SFX.reel determinism + stereo pan + opts non-mutation", async () => {
  const LONG_SFX = { jackpot: 3.0, stage: 2.6, gameOver: 2.4, quake: 2.0, win: 1.8, timeUp: 1.7, debt: 1.6, reviveFail: 1.4 };
  const baseTasks = ALL_SFX.map((name) => ({ kind: "sfx", name, seconds: LONG_SFX[name] || 0.7 }));

  for (const batch of [baseTasks.slice(0, 27), baseTasks.slice(27)]) {
    const res = await pageCtx.evalJs(`window.__tffAudioTest.runBatch(${JSON.stringify(batch)}, 4)`);
    for (const r of res) {
      assert.equal(r.ok, true, `SFX ${r.id} invalid PCM: ${r.reason}`);
      assert.ok(r.peak >= 0.01, `SFX ${r.id} peak too low: ${r.peak}`);
      assert.ok(r.rms >= 1e-4, `SFX ${r.id} rms too low: ${r.rms}`);
    }
  }

  const variants = [
    { id: "deposit:-500", kind: "sfx", name: "deposit:-500", seconds: 0.6 },
    { id: "deposit:0", kind: "sfx", name: "deposit:0", seconds: 0.6 },
    { id: "deposit:100", kind: "sfx", name: "deposit:100", seconds: 0.6 },
    { id: "deposit:500", kind: "sfx", name: "deposit:500", seconds: 0.6 },
    { id: "deposit:2000", kind: "sfx", name: "deposit:2000", seconds: 0.7 },
    { id: "deposit:2000+frenzy", kind: "sfx", name: "deposit:2000", seconds: 1.0, opts: { frenzy: true } },
    { id: "deposit:1e12", kind: "sfx", name: "deposit:1e12", seconds: 0.7 },
    { id: "floor:0", kind: "sfx", name: "floor:0", seconds: 0.8 },
    { id: "floor:1", kind: "sfx", name: "floor:1", seconds: 0.8 },
    { id: "floor:10", kind: "sfx", name: "floor:10", seconds: 0.8 },
    { id: "floor:20", kind: "sfx", name: "floor:20", seconds: 0.8 },
    { id: "floor:25", kind: "sfx", name: "floor:25", seconds: 0.8 },
    { id: "stage:0", kind: "sfx", name: "stage:0", seconds: 1.4 },
    { id: "stage:1", kind: "sfx", name: "stage:1", seconds: 1.4 },
    { id: "stage:2", kind: "sfx", name: "stage:2", seconds: 2.0 },
    { id: "stage:3", kind: "sfx", name: "stage:3", seconds: 2.6 },
    { id: "stage:5", kind: "sfx", name: "stage:5", seconds: 2.6 },
    { id: "cardTick:1", kind: "sfx", name: "cardTick:1", seconds: 0.4 },
    { id: "cardTick:2", kind: "sfx", name: "cardTick:2", seconds: 0.4 },
    { id: "cardTick:3", kind: "sfx", name: "cardTick:3", seconds: 0.4 },
    { id: "debt:all", kind: "sfx", name: "debt:all", seconds: 1.6 },
    { id: "debt:whistle", kind: "sfx", name: "debt:whistle", seconds: 0.8 },
    { id: "debt:clank", kind: "sfx", name: "debt:clank", seconds: 1.2 },
    { id: "frenzyTick:1", kind: "sfx", name: "frenzyTick:1", seconds: 0.4 },
    { id: "frenzyTick:2", kind: "sfx", name: "frenzyTick:2", seconds: 0.4 },
    { id: "frenzyTick:3", kind: "sfx", name: "frenzyTick:3", seconds: 0.4 },
  ];
  const varRes = await pageCtx.evalJs(`window.__tffAudioTest.runBatch(${JSON.stringify(variants)}, 4)`);
  for (const r of varRes) {
    assert.equal(r.ok, true, `Variant ${r.id} invalid PCM: ${r.reason}`);
    assert.ok(r.peak >= 0.01, `Variant ${r.id} peak too low: ${r.peak}`);
    assert.ok(r.rms >= 1e-4, `Variant ${r.id} rms too low: ${r.rms}`);
  }

  const extra = await pageCtx.evalJs(`(async () => {
    const T = window.__tffAudioTest, GA = window.GameAudio;
    const [r1L, r1R] = await GA.renderOffline("sfx", "reel", 0.5);
    const [r2L, r2R] = await GA.renderOffline("sfx", "reel", 0.5);
    const reelDiff = T.diff(r1L, r1R, r2L, r2R);

    const [pLL, pLR] = await GA.renderOffline("sfx", "click", 0.4, { pan: -1 });
    const [pRL, pRR] = await GA.renderOffline("sfx", "click", 0.4, { pan: 1 });
    const panL = T.analyze(pLL, pLR), panR = T.analyze(pRL, pRR);

    const callerOpts = { pan: 0.1 };
    await GA.renderOffline("sfx", "deposit:2000", 0.7, callerOpts);

    const [dNegL, dNegR] = await GA.renderOffline("sfx", "deposit:-500", 0.7);
    const [dPosL, dPosR] = await GA.renderOffline("sfx", "deposit:2000", 0.7);
    const [s1L, s1R] = await GA.renderOffline("sfx", "stage:1", 2.0);
    const [s3L, s3R] = await GA.renderOffline("sfx", "stage:3", 2.0);
    const [dwL, dwR] = await GA.renderOffline("sfx", "debt:whistle", 1.2);
    const [dcL, dcR] = await GA.renderOffline("sfx", "debt:clank", 1.2);

    return {
      reelMaxDiff: reelDiff.maxAbsDiff,
      panL,
      panR,
      optsMutated: "amount" in callerOpts || Object.keys(callerOpts).length !== 1,
      depDiff: T.diff(dNegL, dNegR, dPosL, dPosR).normDiff,
      stageDiff: T.diff(s1L, s1R, s3L, s3R).normDiff,
      debtDiff: T.diff(dwL, dwR, dcL, dcR).normDiff,
    };
  })()`);
  assert.equal(extra.reelMaxDiff, 0, "SFX.reel must be deterministic");
  assert.equal(extra.panL.ok && extra.panR.ok, true);
  assert.ok(extra.panL.rmsL > extra.panL.rmsR * 1.5, "SFX pan=-1 should favor left channel");
  assert.ok(extra.panR.rmsR > extra.panR.rmsL * 1.5, "SFX pan=1 should favor right channel");
  assert.equal(extra.optsMutated, false, "renderOffline must not mutate caller opts");
  assert.ok(extra.depDiff > 0.1, "deposit:-500 vs deposit:2000 should differ");
  assert.ok(extra.stageDiff > 0.1, "stage:1 vs stage:3 should differ");
  assert.ok(extra.debtDiff > 0.1, "debt:whistle vs debt:clank should differ");
});

test("B2: all 10 IMPACT materials + stereo panning + strength & NaN/fallback guards", async () => {
  const tasks = [];
  for (const mat of ALL_IMPACTS) {
    for (const pan of [-1, 0, 1]) {
      tasks.push({ id: `${mat}@${pan}`, kind: "impact", name: `${mat}:0.8`, seconds: 0.6, opts: { pan } });
    }
  }
  const res = await pageCtx.evalJs(`window.__tffAudioTest.runBatch(${JSON.stringify(tasks)}, 4)`);
  for (const r of res) {
    assert.equal(r.ok, true, `IMPACT ${r.id} invalid PCM: ${r.reason}`);
    assert.ok(r.peak >= 0.005, `IMPACT ${r.id} peak too low: ${r.peak}`);
    assert.ok(r.rms >= 1e-4, `IMPACT ${r.id} rms too low: ${r.rms}`);
    if (r.id.endsWith("@-1")) assert.ok(r.rmsL > r.rmsR * 1.5, `${r.id} should pan left`);
    else if (r.id.endsWith("@1")) assert.ok(r.rmsR > r.rmsL * 1.5, `${r.id} should pan right`);
    else assert.ok(Math.abs(r.rmsL - r.rmsR) <= Math.max(r.rmsL, r.rmsR) * 0.05, `${r.id} pan=0 should be centered`);
  }

  const edge = await pageCtx.evalJs(`(async () => {
    const T = window.__tffAudioTest, GA = window.GameAudio;
    const [mLowL, mLowR] = await GA.renderOffline("impact", "metal:0.1", 0.8);
    const [mHighL, mHighR] = await GA.renderOffline("impact", "metal:1.0", 0.8);
    const [badL, badR] = await GA.renderOffline("impact", "wood:bad", 0.8);
    const [unkL, unkR] = await GA.renderOffline("impact", "unknown_mat:0.6", 0.6);
    return {
      mLow: T.analyze(mLowL, mLowR),
      mHigh: T.analyze(mHighL, mHighR),
      bad: T.analyze(badL, badR),
      unk: T.analyze(unkL, unkR),
    };
  })()`);
  assert.ok(edge.mLow.ok && edge.mHigh.ok && edge.bad.ok && edge.unk.ok);
  assert.ok(edge.mHigh.rms > edge.mLow.rms * 2, "metal:1.0 should be substantially louder than metal:0.1");
  assert.ok(edge.bad.peak >= 0.005, "wood:bad should fall back cleanly to valid strength");
  assert.ok(edge.unk.peak >= 0.005, "unknown material should fall back to card impact");
});

test("B3: all 9 FILM cues + 4 VIA cuts", async () => {
  const cueDur = { title: 8.8, hook: 7.2 };
  const cueTasks = ALL_FILM_CUES.map((c) => ({ kind: "film", name: c, seconds: cueDur[c] || 6.5 }));
  const cueRes = await pageCtx.evalJs(`window.__tffAudioTest.runBatch(${JSON.stringify(cueTasks)}, 4)`);
  for (const r of cueRes) {
    assert.equal(r.ok, true, `FILM ${r.id} invalid PCM: ${r.reason}`);
    assert.ok(r.peak >= 0.01, `FILM ${r.id} peak too low: ${r.peak}`);
    assert.ok(r.rms >= 1e-4, `FILM ${r.id} rms too low: ${r.rms}`);
  }

  const viaRes = await pageCtx.evalJs(`(async () => {
    const T = window.__tffAudioTest, GA = window.GameAudio;
    const [bL, bR] = await GA.renderOffline("film", "open", 1.5, {});
    const base = T.analyze(bL, bR);
    const cuts = {};
    for (const via of ${JSON.stringify(ALL_VIA_CUTS)}) {
      const [L, R] = await GA.renderOffline("film", "open", 1.5, { via });
      cuts[via] = { stats: T.analyze(L, R), diff: T.diff(L, R, bL, bR, Math.floor(0.7 * 44100)) };
    }
    return { base, cuts };
  })()`);
  assert.equal(viaRes.base.ok, true);
  for (const via of ALL_VIA_CUTS) {
    const c = viaRes.cuts[via];
    assert.equal(c.stats.ok, true, `VIA ${via} invalid PCM: ${c.stats.reason}`);
    assert.ok(c.stats.peak >= 0.01, `VIA ${via} peak too low: ${c.stats.peak}`);
    assert.ok(c.diff.rmsDiff > 1e-4, `VIA ${via} did not alter opening segment`);
  }
});

test("B4: full 32-bar HOOK / CHORUS / LEAD_SRC sweep (bar=0..31 via solo=lead)", async () => {
  const bars = Array.from({ length: 32 }, (_, b) => ({
    id: `bar=${b}`,
    kind: "music",
    name: `0 solo=lead bar=${b}`,
    seconds: 2.25,
  }));
  for (const batch of [bars.slice(0, 16), bars.slice(16)]) {
    const res = await pageCtx.evalJs(`window.__tffAudioTest.runBatch(${JSON.stringify(batch)}, 4)`);
    for (const r of res) {
      assert.equal(r.ok, true, `LEAD_SRC ${r.id} invalid PCM: ${r.reason}`);
      assert.ok(r.peak >= 0.005, `LEAD_SRC ${r.id} silent/too quiet: ${r.peak}`);
      assert.ok(r.rms >= 1e-4, `LEAD_SRC ${r.id} rms too low: ${r.rms}`);
    }
  }

  const stage3Lead = await pageCtx.evalJs(`window.__tffAudioTest.runBatch([
    { id: "hook-s3", kind: "music", name: "3 solo=lead bar=0", seconds: 8.5 },
    { id: "chorus-s3", kind: "music", name: "3 solo=lead bar=16", seconds: 6.5 }
  ], 2)`);
  for (const r of stage3Lead) {
    assert.equal(r.ok, true, `${r.id} invalid PCM: ${r.reason}`);
    assert.ok(r.peak >= 0.01, `${r.id} peak too low: ${r.peak}`);
    assert.ok(r.rms >= 1e-4, `${r.id} rms too low: ${r.rms}`);
  }
});

test("B5: music stages 0..3, modes, late-stage stem isolation, and Stage 3 vs Stage 2 distinctness", async () => {
  const stages = [0, 1, 2, 3].map((s) => ({ id: `stage-${s}`, kind: "music", name: `${s} bar=0`, seconds: 8.5 }));
  const stageRes = await pageCtx.evalJs(`window.__tffAudioTest.runBatch(${JSON.stringify(stages)}, 4)`);
  for (const r of stageRes) {
    assert.equal(r.ok, true, `${r.id} invalid PCM: ${r.reason}`);
    assert.ok(r.peak >= 0.01, `${r.id} peak too low: ${r.peak}`);
    assert.ok(r.rms >= 1e-4, `${r.id} rms too low: ${r.rms}`);
  }

  const stems = await pageCtx.evalJs(`window.__tffAudioTest.runBatch([
    { id: "s0-pad", kind: "music", name: "0 solo=pad bar=0", seconds: 8.5 },
    { id: "s0-brass", kind: "music", name: "0 solo=brass bar=0", seconds: 8.5 },
    { id: "s0-arp", kind: "music", name: "0 solo=arp bar=0", seconds: 4.5 },
    { id: "s0-counter", kind: "music", name: "0 solo=counter bar=0", seconds: 4.5 },
    { id: "s2-pad", kind: "music", name: "2 solo=pad bar=0", seconds: 8.5 },
    { id: "s2-brass", kind: "music", name: "2 solo=brass bar=0", seconds: 8.5 },
    { id: "s3-pad", kind: "music", name: "3 solo=pad bar=0", seconds: 8.5 },
    { id: "s3-brass", kind: "music", name: "3 solo=brass bar=0", seconds: 8.5 },
    { id: "s3-drums", kind: "music", name: "3 solo=drums bar=0", seconds: 8.5 },
    { id: "s3-bass", kind: "music", name: "3 solo=bass bar=0", seconds: 8.5 },
    { id: "s3-lead", kind: "music", name: "3 solo=lead bar=0", seconds: 8.5 },
    { id: "s3-arp", kind: "music", name: "3 solo=arp bar=0", seconds: 8.5 },
    { id: "s3-counter", kind: "music", name: "3 solo=counter bar=0", seconds: 8.5 }
  ], 4)`);
  const byId = Object.fromEntries(stems.map((r) => [r.id, r]));
  for (const r of stems) assert.equal(r.ok, true, `${r.id} invalid PCM: ${r.reason}`);

  // Stage 0 late stems strictly silent
  assert.equal(byId["s0-pad"].peak, 0, "Stage 0 solo=pad must be strictly silent");
  assert.equal(byId["s0-brass"].peak, 0, "Stage 0 solo=brass must be strictly silent");
  assert.equal(byId["s0-arp"].peak, 0, "Stage 0 solo=arp must be strictly silent");
  assert.equal(byId["s0-counter"].peak, 0, "Stage 0 solo=counter must be strictly silent");

  // Stage 2 pad softly enters; Stage 2 brass remains strictly silent
  assert.ok(byId["s2-pad"].peak >= 0.005, `Stage 2 solo=pad should be audible: ${byId["s2-pad"].peak}`);
  assert.equal(byId["s2-brass"].peak, 0, "Stage 2 solo=brass must be strictly silent");

  // Stage 3 isolated late stems pass production thresholds
  for (const late of ["s3-pad", "s3-brass"]) {
    assert.ok(byId[late].peak >= 0.01, `${late} peak too low: ${byId[late].peak}`);
    assert.ok(byId[late].rms >= 5e-4, `${late} rms too low: ${byId[late].rms}`);
  }
  for (const leg of ["s3-drums", "s3-bass", "s3-lead", "s3-arp", "s3-counter"]) {
    assert.ok(byId[leg].peak >= 0.01, `${leg} peak too low: ${byId[leg].peak}`);
  }

  // Distinctness & mode comparison
  const cmp = await pageCtx.evalJs(`(async () => {
    const T = window.__tffAudioTest, GA = window.GameAudio;
    const [[s2L, s2R], [s3L, s3R], [b2L, b2R], [b3L, b3R]] = await Promise.all([
      GA.renderOffline("music", "2 bar=0", 8.5),
      GA.renderOffline("music", "3 bar=0", 8.5),
      GA.renderOffline("music", "2 solo=bass bar=0", 8.5),
      GA.renderOffline("music", "3 solo=bass bar=0", 8.5),
    ]);
    const [[nL, nR], [fL, fR], [zL, zR], [cL, cR], [mL, mR]] = await Promise.all([
      GA.renderOffline("music", "3 normal", 4.5),
      GA.renderOffline("music", "3 fast", 4.5),
      GA.renderOffline("music", "3 frenzy", 4.5),
      GA.renderOffline("music", "3 card", 4.5),
      GA.renderOffline("music", "3 menu", 4.5),
    ]);
    return {
      s23Diff: T.diff(s3L, s3R, s2L, s2R).normDiff,
      bass23Diff: T.diff(b3L, b3R, b2L, b2R).normDiff,
      norm: T.analyze(nL, nR),
      fast: T.analyze(fL, fR),
      frenzy: T.analyze(zL, zR),
      card: T.analyze(cL, cR),
      menu: T.analyze(mL, mR),
      fastDiff: T.diff(fL, fR, nL, nR).normDiff,
      frenzyDiff: T.diff(zL, zR, nL, nR).normDiff,
    };
  })()`);
  assert.ok(cmp.s23Diff >= 0.25, `Stage 3 vs Stage 2 normalized diff ${cmp.s23Diff} < 0.25`);
  assert.ok(cmp.bass23Diff >= 0.25, `Stage 3 vs Stage 2 bass diff ${cmp.bass23Diff} < 0.25`);
  for (const m of ["norm", "fast", "frenzy", "card", "menu"]) {
    assert.equal(cmp[m].ok, true, `mode ${m} invalid PCM: ${cmp[m].reason}`);
    assert.ok(cmp[m].peak >= 0.01, `mode ${m} peak too low: ${cmp[m].peak}`);
  }
  assert.ok(cmp.card.rms < cmp.norm.rms, "card mode should be ducked below normal");
  assert.ok(cmp.menu.rms < cmp.norm.rms, "menu mode should be ducked below normal");
  assert.ok(cmp.fastDiff > 0.1, "fast mode should differ from normal");
  assert.ok(cmp.frenzyDiff > 0.1, "frenzy mode should differ from normal");
});

test("B6: mute, paused mode, zero-volume, fade-to-zero edge cases, and live resilience in Chromium", async () => {
  const res = await pageCtx.evalJs(`(async () => {
    const T = window.__tffAudioTest, GA = window.GameAudio;
    const [[pL, pR], [mmL, mmR], [msL, msR], [zvML, zvMR], [zvSL, zvSR]] = await Promise.all([
      GA.renderOffline("music", "3 paused", 4.5),
      GA.renderOffline("music", "3", 2.0, { muted: true }),
      GA.renderOffline("sfx", "win", 1.5, { muted: true }),
      GA.renderOffline("music", "3", 2.0, { musicVolume: 0 }),
      GA.renderOffline("sfx", "win", 1.5, { sfxVolume: 0 }),
    ]);

    const [[fmL, fmR], [fm0L, fm0R], [ffL, ffR], [fsL, fsR]] = await Promise.all([
      GA.renderOffline("music", "3", 3.0, { fade: 0.4, fadeAt: 0.5 }),
      GA.renderOffline("music", "3", 1.5, { fade: 0 }),
      GA.renderOffline("film", "open", 2.0, { fade: 0.3, fadeAt: 0.4 }),
      GA.renderOffline("sfx", "win", 1.5, { fade: 0.2, fadeAt: 0.3 }),
    ]);

    // Live API stress on about:blank
    GA.unlock();
    GA.setMuted(true);
    const mutedState = GA.isMuted();
    GA.film.stop(0);
    GA.film.stop(-1);
    GA.film.stop(NaN);
    GA.music.setStage(NaN);
    GA.music.setMode("over");
    GA.sfx("nonexistent");
    GA.sfx("click", { volume: NaN, pan: "bad" });

    return {
      paused: T.analyze(pL, pR),
      mutedMusic: T.analyze(mmL, mmR),
      mutedSfx: T.analyze(msL, msR),
      zeroMusicVol: T.analyze(zvML, zvMR),
      zeroSfxVol: T.analyze(zvSL, zvSR),
      fadeMusicAll: T.analyze(fmL, fmR),
      fadeMusicHead: T.sliceStats(fmL, fmR, 0, 0.5),
      fadeMusicTail: T.sliceStats(fmL, fmR, 2.5, 3.0),
      fadeZeroMusic: T.analyze(fm0L, fm0R),
      fadeFilmAll: T.analyze(ffL, ffR),
      fadeFilmHead: T.sliceStats(ffL, ffR, 0, 0.4),
      fadeFilmTail: T.sliceStats(ffL, ffR, 1.5, 2.0),
      fadeSfxAll: T.analyze(fsL, fsR),
      fadeSfxHead: T.sliceStats(fsL, fsR, 0, 0.3),
      fadeSfxTail: T.sliceStats(fsL, fsR, 1.1, 1.5),
      mutedState,
    };
  })()`);

  for (const k of ["paused", "mutedMusic", "mutedSfx", "zeroMusicVol", "zeroSfxVol", "fadeMusicAll", "fadeZeroMusic", "fadeFilmAll", "fadeSfxAll"]) {
    assert.equal(res[k].ok, true, `${k} invalid PCM: ${res[k].reason}`);
  }
  for (const k of ["paused", "mutedMusic", "mutedSfx", "zeroMusicVol", "zeroSfxVol", "fadeZeroMusic"]) {
    assert.ok(res[k].peak <= 1e-4, `${k} expected silence <= 1e-4, got peak ${res[k].peak}`);
  }
  assert.ok(res.fadeMusicHead.peak >= 0.01, `fadeMusic head should be active: ${res.fadeMusicHead.peak}`);
  assert.ok(res.fadeMusicTail.peak <= 1e-4, `fadeMusic tail should reach silence: ${res.fadeMusicTail.peak}`);
  assert.ok(res.fadeFilmHead.peak >= 0.01, `fadeFilm head should be active: ${res.fadeFilmHead.peak}`);
  assert.ok(res.fadeFilmTail.peak <= 1e-4, `fadeFilm tail should reach silence: ${res.fadeFilmTail.peak}`);
  assert.ok(res.fadeSfxHead.peak >= 0.01, `fadeSfx head should be active: ${res.fadeSfxHead.peak}`);
  assert.ok(res.fadeSfxTail.peak <= 1e-4, `fadeSfx tail should reach silence: ${res.fadeSfxTail.peak}`);
  assert.equal(res.mutedState, true);
});
