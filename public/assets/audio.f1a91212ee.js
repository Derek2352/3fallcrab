/* audio.js — 3 Fall Fun 人生跌塔 · synthesized music + sound effects.
   Pure Web Audio: no audio files, no network, no dependencies. Exposes window.GameAudio.
   Nothing is created until GameAudio.unlock() is called from a user gesture; before that every
   call is a silent no-op (music/mute/volume/stage/mode calls only remember the wanted state).
   All synthesis functions take a "rig" (context + buses) so the same code renders live or offline. */
(function () {
  "use strict";
  var W = window;
  var noop = function () {};
  var STORE_KEY = "tff_muted";
  var MUSIC_BASE = 0.12;       // music bus level at setMusicVolume(1) (calibrated: music RMS ~ -20 dBFS, well under SFX)
  var SFX_BASE = 0.8;          // sfx bus level at setSfxVolume(1)
  var BPM = 116, FAST_MUL = 1.35;
  var LOOKAHEAD = 0.12, TICK_MS = 25;

  // ------------------------------------------------------------------ utils
  function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
  function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
  function prng(seed) {
    var s = (seed | 0) || 0x2545f491;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; };
  }
  function K(r, m) { return m + (r.key || 0); }            // transpose into the current music key
  var PC = { C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11 };
  // D major pentatonic (gong mode) from D3 up — used for SFX melodies and harmonies
  var PENT = [50, 52, 54, 57, 59, 62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 86, 88, 90, 93, 95, 98, 100, 102];
  function pentBelow(m, steps) { var i = PENT.indexOf(m); return i < 0 ? m - 5 : PENT[Math.max(0, i - steps)]; }

  // ------------------------------------------------------------------ song data
  // "Harbour Lights Hop" — 32 bars, D major (stage 3 lifts to E), 116 BPM, 4/4, 16th grid.
  // Form: A (8) · A' (8, new cadence) · B (8, chorus) · B' (8, extended turnaround back to A).
  var CHORDS = [
    "D", "A/C#", "Bm", "F#m", "G", "D/F#", "Em", "A",       // A  — Canon progression, the Canto-pop staple
    "D", "A/C#", "Bm", "F#m", "G", "D/F#", "Em", "A",       // A'
    "G", "A", "F#m", "Bm", "G", "A", "D", "D",              // B  — IV V iii vi
    "G", "A", "F#m", "Bm", "Em", "F#m", "G", "A"            // B' — turnaround to V, loops into A
  ];
  // lead: "step NoteOct.len16" — strictly D major pentatonic (D E F# A B)
  var HOOK = ["0F#5.2 3E5.1 4F#5.2 6A5.2 8B5.3 11A5.1 12F#5.4",
              "0E5.2 2D5.2 4E5.4 10A4.2 12D5.2 14E5.2",
              "0F#5.2 3E5.1 4F#5.2 6A5.2 8D6.4 12B5.2 14A5.2",
              "0A5.6 6F#5.2 8E5.4"];
  var CHORUS = ["0D6.2 2B5.2 4A5.2 6B5.4 10A5.2 12B5.2 14D6.2",
                "0A5.6 6E5.2 8A5.2 10B5.2 12A5.4",
                "0F#5.2 2A5.2 4B5.2 6A5.4 10F#5.2 12E5.2 14F#5.2"];
  var LEAD_SRC = [].concat(HOOK, [
    "0D5.2 2E5.2 4D5.2 6B4.2 8D5.4 12E5.2 14F#5.2",
    "0A5.4 4F#5.2 6E5.2 8D5.4 14A4.2",
    "0B4.2 2D5.2 4E5.2 6F#5.2 8E5.2 10D5.2 12E5.4",
    "0E5.8 10A4.2 12D5.2 14E5.2"
  ], HOOK, [
    "0B5.2 2A5.2 4F#5.2 6E5.2 8D5.2 10E5.2 12F#5.4",
    "0A5.2 2F#5.2 4A5.2 6B5.2 8D6.6 14B5.2",
    "0A5.2 2F#5.2 4E5.4 8D5.2 10E5.2 12F#5.2 14E5.2",
    "0E5.6 8E5.2 10F#5.2 12A5.2 14B5.2"
  ], CHORUS, [
    "0D5.6 6B4.2 8D5.2 10E5.2 12F#5.4",
    CHORUS[0],
    "0E6.4 4D6.2 6B5.2 8A5.4 12B5.2 14A5.2",
    "0F#5.2 2A5.2 4F#5.2 6E5.2 8D5.8",
    "6D5.2 8E5.2 10F#5.2 12A5.2 14B5.2"
  ], CHORUS, [
    "0D5.4 4E5.2 6F#5.2 8A5.4 12B5.4",
    "0B5.2 2A5.2 4B5.2 6D6.2 8B5.4 12A5.2 14F#5.2",
    "0A5.4 4F#5.2 6E5.2 8F#5.4 12A5.4",
    "0B5.6 6A5.2 8B5.2 10D6.2 12B5.2 14A5.2",
    "0A5.8 12D5.2 14E5.2"
  ]);
  // counter-melody (stage 2+): a falling Canon line in the A sections, comping thirds in the B sections
  var CTR_A = ["0F#4.6 6E4.2 8F#4.8", "0E4.6 6D4.2 8E4.8", "0D4.6 6C#4.2 8D4.8", "0C#4.6 6B3.2 8C#4.4 12A3.4",
               "0B3.6 6A3.2 8B3.8", "0A3.6 6G3.2 8A3.8", "0B3.6 6C#4.2 8D4.4 12E4.4", "0C#4.8 8E4.4 12C#4.4"];
  var CTR_B = ["0B4.4 4D5.4 8B4.8", "0C#5.4 4E5.4 8C#5.8", "0A4.4 4C#5.4 8A4.8"];
  var CTR_SRC = [].concat(CTR_A, CTR_A, CTR_B, [
    "0B4.4 4D5.4 8F#4.8", "0B4.4 4D5.4 8G4.8", "0C#5.4 4E5.4 8A4.8", "0A4.4 4D5.4 8F#4.8", "0A4.8 8F#4.8"
  ], CTR_B, [
    "0F#4.4 4B4.4 8D5.8", "0G4.4 4B4.4 8E5.8", "0F#4.4 4A4.4 8C#5.8", "0G4.4 4B4.4 8D5.8", "0E5.8 8C#5.8"
  ]);
  function parseBar(str) {
    var out = {};
    (str || "").split(/\s+/).forEach(function (tok) {
      var m = /^(\d+)([A-G]#?)(\d)\.(\d+)$/.exec(tok);
      if (m) out[+m[1]] = { m: PC[m[2]] + 12 * (+m[3] + 1), len: +m[4] };
    });
    return out;
  }
  function parseChord(s) {
    var m = /^([A-G]#?)(m?)(?:\/([A-G]#?))?$/.exec(s), r = PC[m[1]], third = m[2] ? 3 : 4;
    var bass = m[3] ? PC[m[3]] : r, bm = 36 + bass; if (bm < 40) bm += 12;     // bass in E2..D#3
    var tones = [r, (r + third) % 12, (r + 7) % 12].map(function (pc) { var x = 60 + pc; while (x < 66) x += 12; while (x >= 78) x -= 12; return x; });
    tones.sort(function (a, b) { return a - b; });
    return { bass: bm, arp: [tones[0], tones[1], tones[2], tones[0] + 12] };
  }
  var BARS = CHORDS.length;
  var SONG = { lead: LEAD_SRC.map(parseBar), ctr: CTR_SRC.map(parseBar), ch: CHORDS.map(parseChord) };
  var ARP_SEQ = [0, 1, 2, 3, 2, 1, 2, 1];
  // bass patterns: step -> [semitone offset, length in 16ths]
  var BASS_PAT = [
    { 0: [0, 3], 6: [0, 2], 8: [0, 3], 14: [12, 2] },
    { 0: [0, 3], 3: [0, 1], 6: [0, 2], 8: [0, 3], 11: [0, 1], 12: [12, 2], 14: [0, 2] },
    { 0: [0, 2], 2: [12, 2], 4: [0, 2], 6: [12, 2], 8: [0, 2], 10: [12, 2], 12: [0, 2], 14: [12, 2] }
  ];

  // ------------------------------------------------------------------ rig (context + master chain)
  function clipCurve() {               // linear to 0.7, soft knee, hard ceiling ~0.90
    var N = 4097, c = new Float32Array(N);
    for (var i = 0; i < N; i++) {
      var x = i / 2048 - 1, ax = Math.abs(x), y = ax <= 0.7 ? ax : 0.7 + 0.24 * Math.tanh((ax - 0.7) / 0.24);
      c[i] = x < 0 ? -y : y;
    }
    return c;
  }
  function crushCurve() {              // 5-level staircase = lo-fi "bitcrush" for the scam zap
    var c = new Float32Array(1025);
    for (var i = 0; i < 1025; i++) c[i] = Math.round((i / 512 - 1) * 2.5) / 2.5;
    return c;
  }
  function makeWaves(ctx) {
    function wave(n, fn) {
      var re = new Float32Array(n + 1), im = new Float32Array(n + 1);
      for (var k = 1; k <= n; k++) { var c = fn(k); re[k] = c[0]; im[k] = c[1]; }
      return ctx.createPeriodicWave(re, im);
    }
    function pulse(d) {
      return function (k) { return [Math.sin(2 * Math.PI * k * d) / (k * Math.PI), 2 * Math.pow(Math.sin(Math.PI * k * d), 2) / (k * Math.PI)]; };
    }
    return {
      pulse25: wave(40, pulse(0.25)),
      pulse12: wave(40, pulse(0.125)),
      bass: wave(24, function (k) {
        var tri = (k % 2) ? (8 / (Math.PI * Math.PI)) / (k * k) * ((((k - 1) / 2) % 2) ? -1 : 1) : 0;
        return [0, tri + 0.3 / k * Math.exp(-k / 7)];
      }),
      brass: wave(32, function (k) { return [0, (1 / k) / (1 + Math.pow(k / 9, 2))]; }),
      flute: wave(6, function (k) { return [0, [0, 1, 0.22, 0.1, 0.04, 0.02, 0.01][k]]; })
    };
  }
  function buildRig(ctx, seed) {
    var r = { ctx: ctx, nodes: 0, rand: prng(seed), key: 0, vib: {}, vibN: 0 };
    function N(n) { r.nodes++; return n; }
    r.out = N(ctx.createGain());                                   // mute gain (last)
    r.clip = N(ctx.createWaveShaper()); r.clip.curve = clipCurve(); r.clip.oversample = "none";
    r.comp = N(ctx.createDynamicsCompressor());                    // glue + peak limiter
    r.comp.threshold.value = -12; r.comp.knee.value = 6; r.comp.ratio.value = 12;
    r.comp.attack.value = 0.002; r.comp.release.value = 0.15;
    r.master = N(ctx.createGain()); r.master.gain.value = 0.9;
    r.sfxIn = N(ctx.createGain()); r.sfxIn.gain.value = SFX_BASE;
    r.musicIn = N(ctx.createGain());                               // duck (card / paused)
    r.musicLP = N(ctx.createBiquadFilter()); r.musicLP.type = "lowpass"; r.musicLP.frequency.value = 18000; r.musicLP.Q.value = 0;
    r.musicVol = N(ctx.createGain()); r.musicVol.gain.value = MUSIC_BASE;
    r.musicIn.connect(r.musicLP); r.musicLP.connect(r.musicVol); r.musicVol.connect(r.master);
    r.sfxIn.connect(r.master);
    r.master.connect(r.comp); r.comp.connect(r.clip); r.clip.connect(r.out); r.out.connect(ctx.destination);
    var len = Math.floor(ctx.sampleRate * 2), nb = ctx.createBuffer(1, len, ctx.sampleRate), d = nb.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = r.rand() * 2 - 1;
    r.noise = nb;
    r.crush = crushCurve();
    r.waves = makeWaves(ctx);
    return r;
  }
  // delayed-onset vibrato / wobble curve for AudioParam.setValueCurveAtTime (no extra nodes)
  function vibCurve(r, dur, rate, depth, delay, decay) {
    dur = Math.max(0.02, Math.round(dur * 100) / 100);
    var key = dur + "|" + rate + "|" + depth + "|" + (delay || 0) + "|" + (decay || 0);
    var c = r.vib[key]; if (c) return c;
    if (++r.vibN > 300) { r.vib = {}; r.vibN = 1; }
    var n = Math.max(8, Math.min(2048, Math.ceil(dur * 300)));
    c = new Float32Array(n);
    for (var i = 0; i < n; i++) {
      var tt = i / (n - 1) * dur, amp = tt < (delay || 0) ? 0 : Math.min(1, (tt - (delay || 0)) / 0.12);
      if (decay) amp *= Math.exp(-tt * decay);
      c[i] = depth * amp * Math.sin(2 * Math.PI * rate * tt);
    }
    r.vib[key] = c; return c;
  }
  function curveAt(param, curve, t, dur) { try { param.setValueCurveAtTime(curve, t, Math.max(0.02, Math.round(dur * 100) / 100)); } catch (e) {} }

  // ------------------------------------------------------------------ voice: tracks nodes, frees them when sources end
  function Voice(r, dest, level, pan) {
    this.r = r; this.c = r.ctx; this.n = []; this.live = 0; this.end = 0; this.done = false;
    if (level == null) { this.out = dest; return; }
    var g = this.gain(level), c = this.c;
    if (pan && c.createStereoPanner) { var p = this.track(c.createStereoPanner()); p.pan.value = clamp(pan, -1, 1); g.connect(p); p.connect(dest); }
    else g.connect(dest);
    this.out = g;
  }
  var VP = Voice.prototype;
  VP.track = function (x) { this.n.push(x); this.r.nodes++; return x; };
  VP.gain = function (v, dest) { var g = this.track(this.c.createGain()); g.gain.value = v; if (dest) g.connect(dest); return g; };
  VP.filter = function (type, f, q, dest, t) {
    var b = this.track(this.c.createBiquadFilter()); b.type = type; b.frequency.value = f;
    if (t != null) b.frequency.setValueAtTime(f, t);
    if (q != null) b.Q.value = q; if (dest) b.connect(dest); return b;
  };
  VP.osc = function (wave, f, t0, t1, dest) {
    var o = this.track(this.c.createOscillator()), pw = this.r.waves[wave];
    if (pw) o.setPeriodicWave(pw); else o.type = wave;
    o.frequency.setValueAtTime(f, t0);
    o.connect(dest || this.out); this.src(o, t0, t1, 0); return o;
  };
  VP.noise = function (t0, t1, dest) {
    var s = this.track(this.c.createBufferSource()); s.buffer = this.r.noise; s.loop = true;
    s.connect(dest || this.out); this.src(s, t0, t1, 0.01 + this.r.rand() * 1.8); return s;
  };
  VP.src = function (s, t0, t1, off) {
    var self = this; this.live++; if (t1 > this.end) this.end = t1;
    s.onended = function () { if (--self.live <= 0) self.dispose(); };
    if (off) s.start(t0, off); else s.start(t0);
    s.stop(t1);
  };
  VP.dispose = function () {
    if (this.done) return; this.done = true;
    for (var i = 0; i < this.n.length; i++) { try { this.n[i].disconnect(); } catch (e) {} }
    this.n.length = 0;
  };

  // ------------------------------------------------------------------ envelope + building blocks
  function envAD(p, t, a, pk, d) {
    p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + a);
    p.exponentialRampToValueAtTime(0.0002, t + a + d); p.linearRampToValueAtTime(0, t + a + d + 0.004);
    return t + a + d + 0.005;
  }
  function ahdsr(p, t, dur, pk, a, d, sus, rel) {        // note-on t, note-off t+dur
    dur = Math.max(dur, a + 0.002);
    p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + a);
    var td = Math.min(t + a + d, t + dur), sv = pk + (sus * pk - pk) * Math.min(1, (td - t - a) / d);
    p.linearRampToValueAtTime(sv, td);
    if (t + dur > td) p.setValueAtTime(sv, t + dur);
    p.linearRampToValueAtTime(0, t + dur + rel);
    return t + dur + rel;
  }
  function tone(v, wave, f, t, a, pk, d, dest) {
    var g = v.gain(0, dest || v.out), e = envAD(g.gain, t, a, pk, d);
    return { g: g, o: v.osc(wave, f, t, e + 0.002, g), end: e };
  }
  function toneH(v, wave, f, t, a, pk, hold, rel, dest) {
    var g = v.gain(0, dest || v.out), p = g.gain;
    p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + a); p.setValueAtTime(pk, t + a + hold);
    p.linearRampToValueAtTime(0, t + a + hold + rel);
    return { g: g, o: v.osc(wave, f, t, t + a + hold + rel + 0.002, g) };
  }
  function noiseHit(v, t, a, pk, d, type, f, q, dest) {
    var g = v.gain(0, dest || v.out), e = envAD(g.gain, t, a, pk, d), fl = v.filter(type, f, q, g, t);
    v.noise(t, e + 0.002, fl);
    return { g: g, f: fl };
  }
  function coinTing(v, t, f, cents, d, pk) {           // bright chip coin: pulse + octave sine
    var a = tone(v, "pulse25", f, t, 0.002, pk * 0.55, d); a.o.detune.value = cents;
    var b = tone(v, "sine", f * 2, t, 0.002, pk * 0.35, d * 0.8); b.o.detune.value = cents;
  }
  function bell(v, t, f, pk, d) {                      // small struck bell (inharmonic partials)
    [[1, 1, 1], [2.0, 0.45, 0.6], [2.76, 0.32, 0.45], [5.4, 0.12, 0.25]].forEach(function (p) {
      if (f * p[0] < 12000) tone(v, "sine", f * p[0], t, 0.002, pk * p[1], d * p[2]);
    });
  }
  function brass(v, m, t, dur, pk, dest) {             // synth brass: saw-ish wave + swelling lowpass
    var f = mtof(m), g = v.gain(0, dest || v.out), p = g.gain;
    p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + 0.018); p.linearRampToValueAtTime(pk * 0.78, t + 0.1);
    p.setValueAtTime(pk * 0.78, t + Math.max(0.1, dur)); p.linearRampToValueAtTime(0, t + Math.max(0.1, dur) + 0.09);
    var lp = v.filter("lowpass", f * 1.5, 2, g, t);
    lp.frequency.linearRampToValueAtTime(Math.min(f * 7, 9000), t + 0.04);
    lp.frequency.exponentialRampToValueAtTime(Math.min(f * 3.5, 6000), t + 0.3);
    return v.osc("brass", f, t, t + Math.max(0.1, dur) + 0.1, lp);
  }
  function wahNote(v, m, t, d, pk, bend) {             // comic muted-trombone "wah"
    var f = mtof(m), g = v.gain(0, v.out), p = g.gain;
    p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + 0.025); p.setValueAtTime(pk, t + d - 0.05); p.linearRampToValueAtTime(0, t + d);
    var lp = v.filter("lowpass", 350, 7, g, t);
    lp.frequency.exponentialRampToValueAtTime(1900, t + Math.min(0.12, d * 0.4));
    lp.frequency.exponentialRampToValueAtTime(420, t + d);
    var o = v.osc("brass", f, t, t + d + 0.01, lp);
    if (bend) {
      o.frequency.setValueAtTime(f, t + 0.12); o.frequency.exponentialRampToValueAtTime(f * bend, t + d);
      curveAt(o.detune, vibCurve(v.r, d - 0.1, 5.5, 38, 0.05), t + 0.08, d - 0.1);
    }
    return o;
  }

  // ------------------------------------------------------------------ SFX (each: function (voice, t, opts))
  var SFX = {
    click: function (v, t) {
      var x = tone(v, "triangle", 1700, t, 0.002, 0.6, 0.05); x.o.frequency.exponentialRampToValueAtTime(1000, t + 0.04);
      tone(v, "sine", 3400, t, 0.001, 0.15, 0.02);
      noiseHit(v, t, 0.001, 0.3, 0.012, "highpass", 4000, 0.7);
    },
    spawn: function (v, t) {
      var x = tone(v, "sine", 330, t, 0.01, 0.5, 0.12); x.o.frequency.exponentialRampToValueAtTime(820, t + 0.08);
      var m = K(v.r, [81, 83, 86][Math.floor(v.r.rand() * 3)]);
      tone(v, "pulse12", mtof(m), t + 0.05, 0.004, 0.22, 0.14);
    },
    move: function (v, t) {
      var f = 2100 * (1 + (v.r.rand() - 0.5) * 0.14);
      tone(v, "triangle", f, t, 0.001, 0.5, 0.022);
      noiseHit(v, t, 0.001, 0.15, 0.01, "highpass", 6000, 0.7);
    },
    rotate: function (v, t) {
      var n = noiseHit(v, t, 0.02, 0.6, 0.08, "bandpass", 1200, 2.5);
      n.f.frequency.exponentialRampToValueAtTime(4200, t + 0.09);
      tone(v, "triangle", 1900 * (1 + (v.r.rand() - 0.5) * 0.1), t + 0.075, 0.001, 0.3, 0.03);
    },
    hold: function (v, t) {
      tone(v, "pulse25", mtof(K(v.r, 81)), t, 0.003, 0.3, 0.06);
      tone(v, "pulse25", mtof(K(v.r, 86)), t + 0.065, 0.003, 0.3, 0.09);
    },
    release: function (v, t) {
      var x = tone(v, "sine", 950, t, 0.004, 0.55, 0.09); x.o.frequency.exponentialRampToValueAtTime(430, t + 0.08);
      noiseHit(v, t, 0.003, 0.18, 0.05, "bandpass", 2200, 1.2);
    },
    harddrop: function (v, t) {
      var g = v.gain(0, v.out); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.85, t + 0.13);
      g.gain.exponentialRampToValueAtTime(0.0005, t + 0.28); g.gain.linearRampToValueAtTime(0, t + 0.285);
      var f = v.filter("bandpass", 3500, 1.4, g, t); f.frequency.exponentialRampToValueAtTime(450, t + 0.26);
      v.noise(t, t + 0.29, f);
      var x = tone(v, "sine", 230, t + 0.1, 0.01, 0.55, 0.17); x.o.frequency.exponentialRampToValueAtTime(65, t + 0.27);
    },
    deposit: function (v, t, o) {
      var amt = +o.amount || 0, cents = (v.r.rand() - 0.5) * 30;
      if (amt < 0) {                                   // money out: dull falling fourth
        tone(v, "triangle", mtof(K(v.r, 76)), t, 0.003, 0.45, 0.07);
        tone(v, "triangle", mtof(K(v.r, 71)), t + 0.07, 0.003, 0.45, 0.16);
        return;
      }
      var n = amt >= 2000 ? 3 : amt >= 500 ? 2 : 1;
      coinTing(v, t, mtof(K(v.r, 88)), cents, 0.05, 0.5);           // E6
      coinTing(v, t + 0.055, mtof(K(v.r, 93)), cents, 0.2, 0.55);  // A6
      if (n >= 2) coinTing(v, t + 0.11, mtof(K(v.r, 98)), cents, 0.18, 0.4);
      if (n >= 3) coinTing(v, t + 0.165, mtof(K(v.r, 100)), cents, 0.16, 0.35);
    },
    floor: function (v, t, o) {
      var fl = clamp(Math.round(+o.floor || 1), 1, 20), P = [74, 76, 78, 81, 83, 86, 88, 90, 93, 95, 98];
      var st = Math.min(Math.floor((fl - 1) * 0.6), 6);
      [st, st + 1, st + 2, st + 4].forEach(function (i, k) {
        var m = K(v.r, P[Math.min(i, P.length - 1)]), tt = t + k * 0.065, last = k === 3;
        tone(v, "pulse25", mtof(m), tt, 0.003, 0.24, last ? 0.3 : 0.08);
        tone(v, "triangle", mtof(m), tt, 0.003, 0.3, last ? 0.34 : 0.09);
      });
    },
    stage: function (v, t, o) {
      var st = clamp(Math.round(+o.stage || 1), 1, 3), r = v.r;
      var mel = st === 1 ? [[74, 0, 0.08], [78, 0.1, 0.08], [81, 0.2, 0.08], [86, 0.3, 0.5]]
              : st === 2 ? [[74, 0, 0.07], [78, 0.09, 0.07], [81, 0.18, 0.07], [86, 0.27, 0.2], [83, 0.5, 0.08], [86, 0.6, 0.62]]
              : [[81, 0, 0.07], [81, 0.09, 0.07], [81, 0.18, 0.07], [86, 0.27, 0.24], [83, 0.54, 0.08], [86, 0.64, 0.08], [90, 0.74, 0.78]];
      var pk = [0, 0.32, 0.34, 0.36][st];
      mel.forEach(function (n) {
        brass(v, K(r, n[0]), t + n[1], n[2], pk);
        if (st >= 2) brass(v, K(r, pentBelow(n[0], 2)), t + n[1], n[2], pk * 0.6);
        if (st >= 3) brass(v, K(r, n[0] - 24), t + n[1], n[2], pk * 0.5);
      });
      var last = mel[mel.length - 1], tl = t + last[1];
      tone(v, "triangle", mtof(K(r, 86 + 12)), tl, 0.003, 0.12, 0.35);        // sparkle on the top note
      if (st >= 2) { noiseHit(v, tl - 0.03, 0.001, 0.25, 0.05, "bandpass", 1900, 0.8); noiseHit(v, tl, 0.001, 0.35, 0.09, "bandpass", 1900, 0.8); }
      if (st >= 3) {
        var k = tone(v, "sine", 150, tl, 0.002, 0.8, 0.25); k.o.frequency.exponentialRampToValueAtTime(48, tl + 0.12);
        noiseHit(v, tl, 0.002, 0.22, 0.75, "highpass", 6000, 0.7);
      }
    },
    splash: function (v, t) {
      var r = v.r;
      noiseHit(v, t, 0.003, 0.6, 0.12, "highpass", 1800, 0.7);
      var b = noiseHit(v, t, 0.01, 0.55, 0.32, "bandpass", 1600, 1.3); b.f.frequency.exponentialRampToValueAtTime(420, t + 0.3);
      var p = tone(v, "sine", 760, t + 0.02, 0.005, 0.6, 0.14); p.o.frequency.exponentialRampToValueAtTime(170, t + 0.15);
      for (var i = 0; i < 3; i++) {
        var tt = t + 0.13 + i * 0.075 + r.rand() * 0.02, f = 600 + r.rand() * 700;
        var q = tone(v, "sine", f, tt, 0.003, 0.25, 0.05); q.o.frequency.exponentialRampToValueAtTime(f * 1.7, tt + 0.045);
      }
    },
    cardOpen: function (v, t) {
      var a = noiseHit(v, t, 0.01, 0.45, 0.06, "bandpass", 1800, 1.5); a.f.frequency.exponentialRampToValueAtTime(6000, t + 0.07);
      noiseHit(v, t + 0.075, 0.001, 0.5, 0.018, "highpass", 3500, 0.7);
      tone(v, "pulse12", mtof(K(v.r, 86)), t + 0.09, 0.003, 0.2, 0.15);
      tone(v, "pulse12", mtof(K(v.r, 93)), t + 0.16, 0.003, 0.2, 0.19);
    },
    cardTick: function (v, t, o) {
      var n = clamp(Math.round(+o.n || +o.remaining || 3), 1, 3), f = [2400, 2000, 1700][n - 1];
      tone(v, "sine", f, t, 0.001, 0.6, 0.06);
      tone(v, "triangle", f * 1.5, t, 0.001, 0.15, 0.03);
      noiseHit(v, t, 0.001, 0.3, 0.012, "bandpass", 2600, 6);
    },
    wise: function (v, t) {
      var r = v.r;
      noiseHit(v, t, 0.002, 0.5, 0.04, "bandpass", 3500, 1.2);              // "cha-" (drawer)
      noiseHit(v, t + 0.045, 0.002, 0.5, 0.06, "bandpass", 5200, 1.0);
      bell(v, t + 0.08, mtof(K(r, 98)), 0.32, 0.5);                          // "-ching"
      [86, 90, 93, 98].forEach(function (m, k) { tone(v, "pulse25", mtof(K(r, m)), t + 0.1 + k * 0.05, 0.003, 0.14, 0.12); });
      var P = [86, 88, 90, 93, 95, 98, 100];
      for (var i = 0; i < 5; i++) coinTing(v, t + 0.16 + i * 0.05 + r.rand() * 0.012, mtof(K(r, P[Math.floor(r.rand() * P.length)])), (r.rand() - 0.5) * 20, 0.12, 0.22);
    },
    risky: function (v, t) {                               // comic wah-wah, chromatic fall
      wahNote(v, 69, t, 0.16, 0.42);
      wahNote(v, 68, t + 0.18, 0.16, 0.42);
      wahNote(v, 67, t + 0.36, 0.36, 0.45, 0.94);
    },
    stamp: function (v, t) {
      var x = tone(v, "sine", 170, t, 0.002, 0.9, 0.17); x.o.frequency.exponentialRampToValueAtTime(48, t + 0.1);
      noiseHit(v, t, 0.001, 0.7, 0.06, "lowpass", 1100, 0.7);
      noiseHit(v, t + 0.004, 0.001, 0.4, 0.025, "bandpass", 1700, 4);
    },
    debt: function (v, t, o) {
      var part = o.part || "all", t2 = t, r = v.r;
      if (part !== "clank") {                              // falling whistle
        var g = v.gain(0, v.out), p = g.gain;
        p.setValueAtTime(0, t); p.linearRampToValueAtTime(0.32, t + 0.06); p.setValueAtTime(0.32, t + 0.45); p.linearRampToValueAtTime(0, t + 0.56);
        var w = v.osc("sine", 1900, t, t + 0.58, g); w.frequency.exponentialRampToValueAtTime(480, t + 0.56);
        curveAt(w.detune, vibCurve(r, 0.5, 7, 25, 0.05), t + 0.03, 0.5);
        t2 = t + 0.56;
      }
      if (part === "whistle") return;
      var f = 155;                                         // iron clank
      [[1, 0.5, 0.7], [2.76, 0.4, 0.5], [5.4, 0.28, 0.32], [8.93, 0.16, 0.18]].forEach(function (q) {
        tone(v, "sine", f * q[0] * (1 + (r.rand() - 0.5) * 0.02), t2, 0.001, q[1], q[2]);
      });
      var th = tone(v, "sine", 90, t2, 0.001, 0.9, 0.22); th.o.frequency.exponentialRampToValueAtTime(38, t2 + 0.18);
      noiseHit(v, t2, 0.001, 0.75, 0.12, "lowpass", 2600, 0.7);
      noiseHit(v, t2, 0.001, 0.3, 0.05, "highpass", 5000, 0.7);
      var tt = t2 + 0.07;                                  // chain rattle
      for (var i = 0; i < 10; i++) {
        tt += 0.03 + r.rand() * 0.035;
        var amp = 0.32 * (1 - i / 12), ff = 2800 + r.rand() * 2400;
        noiseHit(v, tt, 0.001, amp, 0.02, "bandpass", ff, 7);
        tone(v, "sine", ff * 0.9, tt, 0.001, amp * 0.4, 0.03);
      }
    },
    scam: function (v, t) {                                // glitchy descending zap
      var r = v.r, cr = v.track(v.c.createWaveShaper()); cr.curve = r.crush; cr.connect(v.out);
      var g = v.gain(0, cr), p = g.gain;
      p.setValueAtTime(0, t); p.linearRampToValueAtTime(0.8, t + 0.005); p.setValueAtTime(0.8, t + 0.28); p.linearRampToValueAtTime(0, t + 0.34);
      var rm = v.gain(0, g);                               // ring mod by a 43 Hz square
      v.osc("square", 43, t, t + 0.35, rm.gain);
      var o = v.osc("square", 1800, t, t + 0.35, rm);
      for (var i = 0; i < 15; i++) o.frequency.setValueAtTime(1800 * Math.pow(150 / 1800, i / 14) * (0.75 + r.rand() * 0.6), t + i * 0.022);
      var z = tone(v, "sawtooth", 3000, t, 0.002, 0.12, 0.3); z.o.frequency.exponentialRampToValueAtTime(180, t + 0.3);
      for (var j = 0; j < 3; j++) noiseHit(v, t + 0.04 + j * 0.085 + r.rand() * 0.03, 0.001, 0.3, 0.02, "highpass", 3000, 0.7);
    },
    quake: function (v, t) {
      var D = 1.7, r = v.r;
      var env = v.gain(0, v.out), p = env.gain;
      p.setValueAtTime(0, t); p.linearRampToValueAtTime(1, t + 0.18); p.setValueAtTime(1, t + 0.85);
      p.exponentialRampToValueAtTime(0.002, t + D - 0.03); p.linearRampToValueAtTime(0, t + D);
      var trem = v.gain(0.7, env), depth = v.gain(0.3, trem.gain);
      v.osc("sine", 9, t, t + D, depth);                   // shaking tremolo
      var nlow = v.gain(2.2), lp = v.filter("lowpass", 150, 1, trem); nlow.connect(lp); v.noise(t, t + D, nlow);
      var subG = v.gain(0.35, trem), sub = v.osc("sine", 52, t, t + D, subG);
      var wob = new Float32Array(32); for (var i = 0; i < 32; i++) wob[i] = 44 + r.rand() * 18;
      try { sub.frequency.setValueCurveAtTime(wob, t + 0.001, D - 0.01); } catch (e) {}
      var nmid = v.gain(0.9), bp = v.filter("bandpass", 320, 1.2, trem); nmid.connect(bp); v.noise(t, t + D, nmid);
      for (var k = 0; k < 14; k++) {                       // things rattling on the shelves
        var tt = t + 0.12 + r.rand() * 1.33;
        noiseHit(v, tt, 0.001, 0.14 + r.rand() * 0.12, 0.025, "bandpass", 1800 + r.rand() * 2600, 6);
        if (k % 3 === 0) tone(v, "triangle", 300 + r.rand() * 300, tt, 0.001, 0.15, 0.04);
      }
    },
    shield: function (v, t) {
      var r = v.r, g = v.gain(0, v.out);
      envAD(g.gain, t, 0.12, 0.22, 0.33);
      var bp = v.filter("bandpass", 400, 2, g, t); bp.frequency.exponentialRampToValueAtTime(1800, t + 0.35);
      var o = v.osc("sawtooth", 220, t, t + 0.47, bp); o.frequency.exponentialRampToValueAtTime(660, t + 0.35);
      [86, 90, 93, 98].forEach(function (m, k) {
        var f = mtof(K(r, m)), tt = t + 0.06 + k * 0.06;
        tone(v, "sine", f, tt, 0.004, 0.22, 0.62);
        tone(v, "sine", f * 2, tt, 0.004, 0.06, 0.3);
      });
      noiseHit(v, t, 0.15, 0.08, 0.3, "highpass", 7000, 0.7);
    },
    timeWarn: function (v, t) {
      var lp = v.filter("lowpass", 3500, 0.7, v.out);
      [81, 76, 81, 76].forEach(function (m, k) { toneH(v, "pulse25", mtof(K(v.r, m)), t + k * 0.13, 0.004, 0.3, 0.085, 0.025, lp); });
    },
    timeUp: function (v, t) {                              // "ding ding ding" round bell
      var f = 1180;
      [0, 0.26, 0.52].forEach(function (dt, i) {
        var tt = t + dt, last = i === 2, d = last ? 1.0 : 0.3;
        [[1, 0.4, 1], [2.32, 0.2, 0.6], [3.1, 0.12, 0.4], [4.6, 0.07, 0.25]].forEach(function (q) { tone(v, "sine", f * q[0], tt, 0.001, q[1], d * q[2]); });
        noiseHit(v, tt, 0.001, 0.25, 0.012, "highpass", 4000, 0.7);
      });
    },
    gameOver: function (v, t) {                            // wah, wah, wah, waaaah ... bonk
      wahNote(v, 67, t, 0.3, 0.42);
      wahNote(v, 66, t + 0.36, 0.3, 0.42);
      wahNote(v, 65, t + 0.72, 0.3, 0.42);
      wahNote(v, 64, t + 1.08, 0.85, 0.46, 0.96);
      var b = tone(v, "triangle", 110, t + 1.98, 0.002, 0.5, 0.2); b.o.frequency.exponentialRampToValueAtTime(70, t + 2.12);
      noiseHit(v, t + 1.98, 0.001, 0.3, 0.05, "lowpass", 800, 0.7);
    },
    win: function (v, t) {
      var r = v.r;
      for (var i = 0; i < 8; i++) noiseHit(v, t + i * 0.035, 0.001, 0.1 + i * 0.03, 0.05, "bandpass", 1900, 0.8);   // snare roll
      [[74, 0.3, 0.08], [78, 0.39, 0.08], [81, 0.48, 0.08]].forEach(function (n) {
        brass(v, K(r, n[0]), t + n[1], n[2], 0.34); brass(v, K(r, pentBelow(n[0], 2)), t + n[1], n[2], 0.2);
      });
      var tl = t + 0.57;
      [[86, 0.34], [81, 0.24], [78, 0.22], [62, 0.26]].forEach(function (n) { brass(v, K(r, n[0]), tl, 0.85, n[1]); });
      var k = tone(v, "sine", 150, tl, 0.002, 0.85, 0.25); k.o.frequency.exponentialRampToValueAtTime(48, tl + 0.12);
      noiseHit(v, tl, 0.002, 0.26, 0.9, "highpass", 6000, 0.7);
      var P = [93, 95, 98, 100, 102];
      for (var j = 0; j < 6; j++) coinTing(v, tl + 0.12 + j * 0.08, mtof(K(r, P[Math.floor(r.rand() * P.length)])), (r.rand() - 0.5) * 20, 0.12, 0.18);
    },
    vine: function (v, t) {                                // vines grab on: leafy rustle, woody creak, springy "thwip"
      var r = v.r;
      for (var i = 0; i < 9; i++) noiseHit(v, t + i * 0.028 + r.rand() * 0.02, 0.002, 0.28 - i * 0.022, 0.035, "bandpass", 2600 + r.rand() * 3200, 1.6);
      var cg = v.gain(0, v.out), cp = cg.gain;
      cp.setValueAtTime(0, t); cp.linearRampToValueAtTime(0.18, t + 0.03); cp.setValueAtTime(0.18, t + 0.16); cp.linearRampToValueAtTime(0, t + 0.24);
      var bp = v.filter("bandpass", 700, 7, cg, t); bp.frequency.exponentialRampToValueAtTime(1300, t + 0.22);
      var co = v.osc("sawtooth", 95, t, t + 0.25, bp); co.frequency.exponentialRampToValueAtTime(150, t + 0.22);
      var th = tone(v, "sine", 520, t + 0.05, 0.003, 0.5, 0.12); th.o.frequency.exponentialRampToValueAtTime(1250, t + 0.11);
      tone(v, "triangle", mtof(K(r, 86)), t + 0.13, 0.003, 0.22, 0.25);
      tone(v, "triangle", mtof(K(r, 93)), t + 0.2, 0.003, 0.18, 0.3);
    },
    vineGet: function (v, t) {                             // a vine-wrapped item is on its way: rustle + rising sparkle
      var r = v.r;
      noiseHit(v, t, 0.06, 0.16, 0.25, "bandpass", 3800, 1.2);
      [81, 86, 90, 93, 98].forEach(function (m, k) {
        tone(v, "triangle", mtof(K(r, m)), t + 0.04 + k * 0.06, 0.003, 0.2, 0.22);
        tone(v, "sine", mtof(K(r, m)) * 2, t + 0.04 + k * 0.06, 0.003, 0.06, 0.15);
      });
      bell(v, t + 0.34, mtof(K(r, 98)), 0.18, 0.5);
    },
    post: function (v, t) {                                // passbook dot-matrix printer + ding
      var bp = v.filter("bandpass", 2400, 1.2, v.out);
      for (var b = 0; b < 3; b++) {
        var tt = t + b * 0.11, g = v.gain(0, bp), p = g.gain;
        p.setValueAtTime(0, tt); p.linearRampToValueAtTime(0.7, tt + 0.004); p.setValueAtTime(0.7, tt + 0.075); p.linearRampToValueAtTime(0, tt + 0.085);
        var gm = v.gain(0, g);
        v.osc("square", 95, tt, tt + 0.09, gm.gain);
        v.osc("square", 820 + b * 60, tt, tt + 0.09, gm);
      }
      noiseHit(v, t + 0.34, 0.001, 0.45, 0.05, "lowpass", 700, 0.7);
      var c = tone(v, "sine", 140, t + 0.34, 0.002, 0.4, 0.07); c.o.frequency.exponentialRampToValueAtTime(70, t + 0.4);
      bell(v, t + 0.38, mtof(K(v.r, 98)), 0.3, 0.35);
    }
  };
  // per-sound output trim (calibrated by out/audiotest.js measurements)
  var LEVEL = {
    click: 0.7, spawn: 0.7, move: 1.35, rotate: 0.7, hold: 0.75, release: 0.7, harddrop: 0.85, deposit: 0.7,
    floor: 0.8, stage: 0.95, splash: 0.85, cardOpen: 0.8, cardTick: 0.75, wise: 0.9, risky: 0.85, stamp: 0.9,
    debt: 0.95, scam: 0.75, quake: 1.0, shield: 0.9, timeWarn: 0.75, timeUp: 0.9, gameOver: 0.9, win: 1.0, post: 0.85,
    vine: 0.85, vineGet: 0.8
  };
  var THROTTLE = { move: 0.055, rotate: 0.05, click: 0.035, deposit: 0.045, spawn: 0.08, cardTick: 0.15, splash: 0.08,
                   hold: 0.06, release: 0.05, harddrop: 0.08, stamp: 0.08, cardOpen: 0.1, vine: 0.06, vineGet: 0.3 };
  var LOW_PRIORITY = { move: 1, click: 1, spawn: 1, rotate: 1, hold: 1, release: 1, deposit: 1, cardTick: 1 };

  // ------------------------------------------------------------------ impacts
  var IMPACT = {
    card: function (v, t, s, r) {
      noiseHit(v, t, 0.001, 0.8, 0.025 + 0.025 * s, "bandpass", 1800 + 2600 * s, 1.1);
      tone(v, "sine", 420 * (1 + (r() - 0.5) * 0.2), t, 0.001, 0.25, 0.03);
    },
    wood: function (v, t, s, r) {
      var f = 340 * (1 + (r() - 0.5) * 0.25);
      var x = tone(v, "triangle", f, t, 0.001, 0.8, 0.07 + 0.06 * s); x.o.frequency.exponentialRampToValueAtTime(f * 0.88, t + 0.06);
      noiseHit(v, t, 0.001, 0.5, 0.03 + 0.02 * s, "bandpass", f * 2.4, 7);
    },
    plastic: function (v, t, s, r) {
      noiseHit(v, t, 0.001, 0.65, 0.02 + 0.015 * s, "bandpass", 2600 + 1600 * s, 3);
      tone(v, "square", 1250 * (1 + (r() - 0.5) * 0.2), t, 0.001, 0.12, 0.018);
      noiseHit(v, t + 0.012 + r() * 0.01, 0.001, 0.28, 0.015, "bandpass", 3200, 3);
    },
    metal: function (v, t, s, r) {
      var f = 560 * (1 + (r() - 0.5) * 0.18), d = 0.18 + 0.4 * s;
      [[1, 0.5, 1], [2.76, 0.35, 0.6], [5.4, 0.05 + 0.22 * s, 0.35]].forEach(function (p) { tone(v, "sine", f * p[0], t, 0.001, p[1], d * p[2]); });
      noiseHit(v, t, 0.001, 0.1 + 0.35 * s, 0.012, "highpass", 4000, 0.7);
    },
    glass: function (v, t, s, r) {
      var f = 2700 * (1 + (r() - 0.5) * 0.2);
      tone(v, "sine", f, t, 0.001, 0.45, 0.12 + 0.18 * s);
      tone(v, "sine", f * 2.32, t, 0.001, 0.2, 0.06 + 0.08 * s);
      noiseHit(v, t, 0.001, 0.2, 0.008, "highpass", 6000, 0.7);
    },
    fabric: function (v, t, s) {
      noiseHit(v, t, 0.004, 1.0, 0.06 + 0.03 * s, "lowpass", 280 + 520 * s, 0.7);
      var x = tone(v, "sine", 95, t, 0.003, 0.45, 0.07); x.o.frequency.exponentialRampToValueAtTime(55, t + 0.07);
    },
    rubber: function (v, t, s, r) {
      var f = 190 * (1 + (r() - 0.5) * 0.2), d = 0.16 + 0.12 * s;
      var x = tone(v, "triangle", f, t, 0.003, 0.7, d);
      x.o.frequency.exponentialRampToValueAtTime(f * 1.9, t + 0.05); x.o.frequency.exponentialRampToValueAtTime(f * 1.45, t + d);
      curveAt(x.o.detune, vibCurve(v.r, d, 14, 70, 0, 6), t, d);
      noiseHit(v, t, 0.001, 0.3, 0.02, "lowpass", 600, 0.7);
    },
    food: function (v, t, s) {
      var n = noiseHit(v, t, 0.006, 0.85, 0.09 + 0.04 * s, "bandpass", 1300, 2.2); n.f.frequency.exponentialRampToValueAtTime(320, t + 0.1);
      var x = tone(v, "sine", 130, t, 0.003, 0.45, 0.06); x.o.frequency.exponentialRampToValueAtTime(70, t + 0.06);
    },
    slick: function (v, t, s, r) {
      var f = 1150 * (1 + (r() - 0.5) * 0.2), d = 0.08 + 0.06 * s;
      var x = tone(v, "triangle", f, t, 0.006, 0.4, d); x.o.frequency.exponentialRampToValueAtTime(f * 1.7, t + d);
      curveAt(x.o.detune, vibCurve(v.r, d, 32, 60, 0), t, d);
    },
    platform: function (v, t, s, r) {
      var x = tone(v, "sine", 125, t, 0.002, 1.0, 0.16 + 0.1 * s); x.o.frequency.exponentialRampToValueAtTime(48, t + 0.13);
      noiseHit(v, t, 0.001, 0.6, 0.06, "lowpass", 500 + 700 * s, 0.7);
      tone(v, "triangle", 215 * (1 + (r() - 0.5) * 0.1), t, 0.001, 0.45, 0.09);
    }
  };
  var IMP_LEVEL = { card: 0.75, wood: 0.7, plastic: 2.1, metal: 0.6, glass: 0.6, fabric: 0.8, rubber: 0.6, food: 0.75, slick: 1.7, platform: 0.8 };
  function playImpact(r, material, s, pan, t) {
    var fn = IMPACT[material] || IMPACT.card, lvl = (IMP_LEVEL[material] || 0.6) * (0.14 + 0.86 * Math.pow(s, 1.3));
    var v = new Voice(r, r.sfxIn, lvl, pan || 0);
    fn(v, t, s, r.rand);
    return v;
  }

  // ------------------------------------------------------------------ music engine
  function Engine(r) {
    var c = r.ctx, self = this;
    this.r = r; this.c = c; this.nodes = [];
    function N(n) { self.nodes.push(n); r.nodes++; return n; }
    function filt(type, f, q, dest) { var b = N(c.createBiquadFilter()); b.type = type; b.frequency.value = f; b.Q.value = q; if (dest) b.connect(dest); return b; }
    function gn(v, dest) { var g = N(c.createGain()); g.gain.value = v; if (dest) g.connect(dest); return g; }
    this.bus = gn(1, r.musicIn);
    this.drums = gn(1, this.bus);
    this.hatF = filt("highpass", 7000, 0.7, this.drums);
    this.snF = filt("bandpass", 1900, 0.9, this.drums);
    this.clapF = filt("bandpass", 1300, 1.4, this.drums);
    this.bassF = filt("lowpass", 950, 1, this.bus);
    this.leadF = filt("lowpass", 3400, 0.5, this.bus);
    var send = gn(0.2, null); this.leadF.connect(send);
    this.delay = N(c.createDelay(1.0)); this.delay.delayTime.value = 0.75 * 60 / BPM;
    send.connect(this.delay);
    var fbF = filt("lowpass", 2200, 0, null), fb = gn(0.3, this.delay);
    this.delay.connect(fbF); fbF.connect(fb); this.delay.connect(this.bus);
    this.arpF = filt("lowpass", 2600, 0.7, this.bus);
    if (c.createStereoPanner) {
      this.arpL = N(c.createStereoPanner()); this.arpL.pan.value = -0.4; this.arpL.connect(this.arpF);
      this.arpR = N(c.createStereoPanner()); this.arpR.pan.value = 0.4; this.arpR.connect(this.arpF);
    } else { this.arpL = this.arpR = this.arpF; }
    this.ctrF = filt("lowpass", 2400, 0, this.bus);
    this.pos = 0; this.next = 0; this.stage = 0; this.pend = null; this.key = 0; this.mul = 1; this.solo = null;
    this.halted = false; this.dead = false;
  }
  var EP = Engine.prototype;
  EP.sd = function () { return 60 / (BPM * this.mul) / 4; };
  EP.voice = function (dest) { return new Voice(this.r, dest, null); };
  EP.setStage = function (st, t) {
    this.stage = st; this.key = st >= 3 ? 2 : 0; this.r.key = this.key;
    this.leadF.frequency.setTargetAtTime(st >= 3 ? 5200 : 3400, t, 0.05);
    this.arpF.frequency.setTargetAtTime(st >= 3 ? 3600 : 2600, t, 0.05);
  };
  EP.setMul = function (m, t) {
    this.mul = m;
    try { this.delay.delayTime.setTargetAtTime(0.75 * 60 / (BPM * m), t, 0.05); } catch (e) {}
  };
  EP.step = function (t, silent) {
    var s = this.pos & 15, bar = (this.pos >> 4) % BARS;
    if (s === 0 && this.pend != null) { this.setStage(this.pend, t); this.pend = null; }
    if (!silent) this.play(bar, s, t);
    this.pos = (this.pos + 1) % (BARS * 16);
    this.next = t + this.sd();
  };
  EP.on = function (part) { return !this.solo || this.solo === part; };
  EP.play = function (bar, s, t) {
    var st = this.stage, fast = this.mul > 1, sd = this.sd(), k = this.key, ch = SONG.ch[bar], phraseEnd = (bar % 8) === 7;
    if (this.on("drums")) {
      var kv = 0;
      if (st >= 3 || fast) kv = (s % 4 === 0) ? (s === 0 ? 1 : 0.85) : (phraseEnd && s === 14 ? 0.6 : 0);
      else if (st >= 1) kv = s === 0 ? 1 : s === 8 ? 0.85 : s === 10 ? 0.55 : (st === 2 && s === 6) ? 0.45 : 0;
      else kv = s === 0 ? 0.75 : s === 8 ? 0.55 : 0;
      if (kv) this.kick(t, kv);
      if (st >= 1 && (s === 4 || s === 12)) this.snare(t, 0.8);
      if (st >= 1 && phraseEnd && s >= 13) this.snare(t, 0.3 + (s - 13) * 0.2);
      if (st >= 2 && (s === 4 || s === 12)) this.clap(t, 0.8);
      var hv = 0, open = false;
      if (fast) { hv = [1, 0.5, 0.75, 0.5][s % 4]; open = (s % 8) === 6; }
      else if (st >= 2) { hv = [0.5, 0.22, 0.75, 0.28][s % 4]; open = s === 14; }
      else if (st === 1) hv = s % 2 ? 0 : (s % 4 === 2 ? 0.75 : 0.4);
      else hv = (s % 4 === 2) ? 0.6 : 0;
      if (hv) this.hat(t, hv * (0.9 + this.r.rand() * 0.2), open);
      if (st >= 3 && s === 0 && bar % 8 === 0) this.crash(t, 0.55);
    }
    if (this.on("bass")) {
      var bp = BASS_PAT[Math.min(st, 2)][s];
      if (bp) this.bass(t, ch.bass + bp[0] + k, bp[1] * sd * 0.85, s === 0 ? 1 : 0.8);
    }
    var ev = SONG.lead[bar][s];
    if (ev && this.on("lead")) this.lead(t, ev.m + k, ev.len * sd, st);
    if (st >= 1 && this.on("arp")) {
      var ix = -1;
      if (st === 1) { if (s % 2 === 0) ix = ARP_SEQ[(s >> 1) % 8]; }
      else ix = ARP_SEQ[s % 8];
      if (ix >= 0) this.arp(t, ch.arp[ix] + k, s % 4 === 0 ? 1 : 0.6, (s >> 1) & 1);
    }
    var ce = SONG.ctr[bar][s];
    if (st >= 2 && ce && this.on("counter")) this.counter(t, ce.m + k, ce.len * sd);
  };
  EP.kick = function (t, vel) {
    var x = this.voice(this.drums), g = x.gain(0, x.out);
    envAD(g.gain, t, 0.003, 0.9 * vel, 0.25);
    var o = x.osc("sine", 150, t, t + 0.27, g); o.frequency.exponentialRampToValueAtTime(48, t + 0.11);
  };
  EP.snare = function (t, vel) {
    var x = this.voice(this.snF), g = x.gain(0, x.out);
    envAD(g.gain, t, 0.001, 0.7 * vel, 0.13); x.noise(t, t + 0.15, g);
    var g2 = x.gain(0, this.drums); envAD(g2.gain, t, 0.001, 0.3 * vel, 0.07);
    var o = x.osc("triangle", 190, t, t + 0.09, g2); o.frequency.exponentialRampToValueAtTime(140, t + 0.06);
  };
  EP.clap = function (t, vel) {
    var x = this.voice(this.clapF), g = x.gain(0, x.out), p = g.gain, a = 0.75 * vel;
    p.setValueAtTime(0, t); p.linearRampToValueAtTime(a, t + 0.001); p.exponentialRampToValueAtTime(a * 0.15, t + 0.01);
    p.linearRampToValueAtTime(a, t + 0.011); p.exponentialRampToValueAtTime(a * 0.15, t + 0.02);
    p.linearRampToValueAtTime(a, t + 0.021); p.exponentialRampToValueAtTime(0.0003, t + 0.15); p.linearRampToValueAtTime(0, t + 0.155);
    x.noise(t, t + 0.16, g);
  };
  EP.hat = function (t, vel, open) {
    var x = this.voice(this.hatF), g = x.gain(0, x.out), d = open ? 0.2 : 0.035;
    envAD(g.gain, t, 0.001, 0.32 * vel, d); x.noise(t, t + d + 0.01, g);
  };
  EP.crash = function (t, vel) {
    var x = this.voice(this.hatF), g = x.gain(0, x.out);
    envAD(g.gain, t, 0.002, 0.3 * vel, 1.1); x.noise(t, t + 1.11, g);
  };
  EP.bass = function (t, m, dur, vel) {
    var x = this.voice(this.bassF), g = x.gain(0, x.out);
    var e = ahdsr(g.gain, t, dur, 0.5 * vel, 0.006, 0.08, 0.7, 0.03);
    x.osc("bass", mtof(m), t, e + 0.005, g);
  };
  EP.lead = function (t, m, dur, st) {
    var x = this.voice(this.leadF), g = x.gain(0, x.out), d = dur * 0.9, f = mtof(m);
    var e = ahdsr(g.gain, t, d, 0.26, 0.006, 0.1, 0.7, 0.06);
    var o = x.osc("pulse25", f, t, e + 0.005, g);
    if (d > 0.3) curveAt(o.detune, vibCurve(this.r, d, 5.8, 14, 0.15), t, d);
    if (st >= 3) { var g2 = x.gain(0, x.out); ahdsr(g2.gain, t, d, 0.1, 0.006, 0.1, 0.7, 0.06); x.osc("triangle", f * 2, t, e + 0.005, g2); }
  };
  EP.arp = function (t, m, vel, side) {
    var x = this.voice(side ? this.arpR : this.arpL), g = x.gain(0, x.out);
    var e = envAD(g.gain, t, 0.002, 0.2 * vel, 0.15);
    x.osc("pulse12", mtof(m), t, e + 0.002, g);
  };
  EP.counter = function (t, m, dur) {
    var x = this.voice(this.ctrF), g = x.gain(0, x.out), d = dur * 0.95;
    var e = ahdsr(g.gain, t, d, 0.3, 0.04, 0.15, 0.8, 0.12);
    var o = x.osc("flute", mtof(m), t, e + 0.005, g);
    if (d > 0.35) curveAt(o.detune, vibCurve(this.r, d, 5, 10, 0.2), t, d);
  };
  EP.dispose = function () {
    this.dead = true;
    for (var i = 0; i < this.nodes.length; i++) { try { this.nodes[i].disconnect(); } catch (e) {} }
    this.nodes.length = 0;
  };

  // ------------------------------------------------------------------ live state
  var ctx = null, rig = null, engine = null, timer = null;
  var muted = readMuted(), musicVolume = 1, sfxVolume = 1;
  var wantMusic = false, mStage = 0, mMode = "normal", pauseAt = 0;
  var userSuspended = false, hidden = false, unlockedOnce = false;
  var lastSfx = {}, sfxEnds = [], impEnds = [], impTokens = 4, impLastT = 0, impLastMat = {};

  function readMuted() { try { return W.localStorage.getItem(STORE_KEY) === "1"; } catch (e) { return false; } }
  function writeMuted(v) { try { W.localStorage.setItem(STORE_KEY, v ? "1" : "0"); } catch (e) {} }
  function now() { return ctx ? ctx.currentTime : 0; }
  function running() { return !!(ctx && rig && ctx.state === "running"); }
  function promiseSafe(p) { if (p && typeof p.catch === "function") p.catch(noop); }
  function rampTo(param, v, tau) {
    var t = now();
    try { param.cancelScheduledValues(t); param.setValueAtTime(param.value, t); param.setTargetAtTime(v, t, tau); } catch (e) { try { param.value = v; } catch (e2) {} }
  }
  function applyRun() {
    if (!ctx) return;
    var want = !userSuspended && !hidden;
    try {
      if (want && ctx.state !== "running" && ctx.state !== "closed") promiseSafe(ctx.resume());
      else if (!want && ctx.state === "running") promiseSafe(ctx.suspend());
    } catch (e) {}
  }
  function applyMute() { if (rig) rampTo(rig.out.gain, muted ? 0 : 1, 0.015); }
  function applyMode(mode) {
    if (!rig) return;
    var mi = rig.musicIn.gain, lp = rig.musicLP.frequency;
    if (mode === "card") { rampTo(mi, 0.3, 0.08); rampTo(lp, 900, 0.08); }
    else if (mode === "paused") { rampTo(mi, 0, 0.25); rampTo(lp, 700, 0.2); pauseAt = now() + 1.0; }
    else if (mode !== "over") { rampTo(mi, 1, 0.12); rampTo(lp, 18000, 0.1); }
    if (engine) {
      if (mode === "fast") engine.setMul(FAST_MUL, now());
      else if (mode === "normal") engine.setMul(1, now());
      if (mode !== "paused" && engine.halted) { engine.halted = false; engine.next = now() + 0.05; }
    }
  }
  function tick() {
    var E = engine;
    if (!E || !running()) return;
    var t = ctx.currentTime;
    if (mMode === "paused") { if (t > pauseAt) { E.halted = true; return; } }
    if (E.halted) return;
    if (E.next < t - 0.25) E.next = t + 0.03;            // resync after a long stall instead of bursting notes
    var guard = 0;
    while (E.next < t + LOOKAHEAD && guard++ < 48) {
      try { E.step(E.next, muted); } catch (e) { E.next = t + 0.05; break; }
    }
  }
  function startMusic() {
    wantMusic = true;
    if (!rig || (engine && !engine.dead)) return;
    if (mMode === "over" || mMode === "paused") mMode = "normal";
    engine = new Engine(rig);
    engine.setStage(mStage, now());
    engine.setMul(mMode === "fast" ? FAST_MUL : 1, now());
    engine.next = now() + 0.06;
    applyMode(mMode);
    if (!timer) timer = W.setInterval(tick, TICK_MS);
    tick();
  }
  function stopMusic(fade) {
    wantMusic = false;
    if (timer) { W.clearInterval(timer); timer = null; }
    var E = engine; engine = null;
    if (!E || !ctx) return;
    rampTo(E.bus.gain, 0, Math.max(0.01, fade / 4));
    W.setTimeout(function () { E.dispose(); }, (fade + 0.8) * 1000);
  }
  function onVisibility() { hidden = !!document.hidden; applyRun(); }

  // ------------------------------------------------------------------ offline rendering (tests)
  var SFX_OPT_KEY = { floor: "floor", stage: "stage", deposit: "amount", cardTick: "n", debt: "part" };
  function renderOffline(kind, name, seconds, opts) {
    return new Promise(function (resolve, reject) {
      try {
        var OAC = W.OfflineAudioContext || W.webkitOfflineAudioContext;
        if (!OAC) throw new Error("OfflineAudioContext unavailable");
        var sr = 44100;
        seconds = +seconds || (kind === "music" ? 16 : kind === "impact" ? 1.5 : 3);
        var oc = new OAC(2, Math.ceil(sr * seconds), sr), r = buildRig(oc, 1234567), o = opts || {};
        var parts = String(name || "").split(":");
        if (kind === "sfx") {
          var fn = SFX[parts[0]]; if (!fn) throw new Error("unknown sfx " + parts[0]);
          if (parts.length > 1 && SFX_OPT_KEY[parts[0]]) o[SFX_OPT_KEY[parts[0]]] = isNaN(+parts[1]) ? parts[1] : +parts[1];
          fn(new Voice(r, r.sfxIn, LEVEL[parts[0]] || 0.8, o.pan || 0), 0.01, o);
        } else if (kind === "impact") {
          playImpact(r, parts[0], clamp(parts.length > 1 ? +parts[1] : 0.6, 0, 1), o.pan || 0, 0.01);
        } else if (kind === "music") {
          var E = new Engine(r), stg = 0, mode = "normal";
          String(name || "").split(/[:,\s]+/).forEach(function (tok) {
            if (/^[0-3]$/.test(tok)) stg = +tok;
            else if (/^(normal|fast|card|paused)$/.test(tok)) mode = tok;
            else if (/^bar=\d+$/.test(tok)) E.pos = (+tok.slice(4) % BARS) * 16;
            else if (/^solo=\w+$/.test(tok)) E.solo = tok.slice(5);
          });
          E.setStage(stg, 0); E.setMul(mode === "fast" ? FAST_MUL : 1, 0);
          if (mode === "card") { r.musicIn.gain.value = 0.3; r.musicLP.frequency.value = 900; }
          E.next = 0.05;
          while (E.next < seconds) E.step(E.next, false);
        } else throw new Error("unknown kind " + kind);
        var done = function (buf) { resolve([buf.getChannelData(0), buf.getChannelData(1)]); };
        var p = oc.startRendering();
        if (p && typeof p.then === "function") p.then(done, reject);
        else oc.oncomplete = function (e) { done(e.renderedBuffer); };
      } catch (e) { reject(e); }
    });
  }

  // ------------------------------------------------------------------ public API
  var GameAudio = {
    unlock: function () {
      try {
        if (!ctx) {
          var AC = W.AudioContext || W.webkitAudioContext;
          if (!AC) return;
          try { ctx = new AC({ latencyHint: "interactive" }); } catch (e) { ctx = new AC(); }
          rig = buildRig(ctx, (Math.random() * 4294967296) >>> 0);
          rig.musicVol.gain.value = MUSIC_BASE * musicVolume;
          rig.sfxIn.gain.value = SFX_BASE * sfxVolume;
          rig.out.gain.value = muted ? 0 : 1;
          hidden = !!(W.document && document.hidden);
          if (W.document) document.addEventListener("visibilitychange", onVisibility);
        }
        if (!unlockedOnce) {                     // iOS: play one silent sample inside the gesture
          unlockedOnce = true;
          var b = ctx.createBuffer(1, 1, 22050), s = ctx.createBufferSource();
          s.buffer = b; s.connect(ctx.destination); s.start(0);
          s.onended = function () { try { s.disconnect(); } catch (e) {} };
        }
        if (!userSuspended && !hidden && ctx.state !== "running") promiseSafe(ctx.resume());
        if (wantMusic && !engine) startMusic();
      } catch (e) {}
    },
    isMuted: function () { return muted; },
    setMuted: function (v) { muted = !!v; writeMuted(muted); applyMute(); },
    toggleMute: function () { GameAudio.setMuted(!muted); return muted; },
    setMusicVolume: function (v) { musicVolume = clamp(+v || 0, 0, 1); if (rig) rampTo(rig.musicVol.gain, MUSIC_BASE * musicVolume, 0.05); },
    setSfxVolume: function (v) { sfxVolume = clamp(+v || 0, 0, 1); if (rig) rampTo(rig.sfxIn.gain, SFX_BASE * sfxVolume, 0.05); },
    suspend: function () { userSuspended = true; applyRun(); },
    resume: function () { userSuspended = false; applyRun(); },
    sfx: function (name, opts) {
      try {
        if (!running() || muted) return;
        var fn = SFX[name]; if (!fn) return;
        var t = ctx.currentTime, gap = THROTTLE[name] || 0.03;
        if (lastSfx[name] != null && t - lastSfx[name] < gap) return;
        var live = 0; for (var i = sfxEnds.length - 1; i >= 0; i--) { if (sfxEnds[i] <= t) sfxEnds.splice(i, 1); else live++; }
        if (live >= 24 || (live >= 14 && LOW_PRIORITY[name])) return;
        lastSfx[name] = t;
        opts = opts || {};
        var v = new Voice(rig, rig.sfxIn, (LEVEL[name] || 0.8) * (opts.volume == null ? 1 : clamp(+opts.volume, 0, 1)), opts.pan || 0);
        fn(v, t + 0.005, opts);
        sfxEnds.push(v.end);
      } catch (e) {}
    },
    impact: function (material, strength, pan) {
      try {
        if (!running() || muted) return;
        var s = +strength; if (!(s >= 0.05)) return; if (s > 1) s = 1;
        var t = ctx.currentTime;
        impTokens = Math.min(4, impTokens + (t - impLastT) * 10); impLastT = t;     // ≤ 4 burst + 10/s  => ≤ 14 in any second
        if (impTokens < 1 || (impTokens < 2 && s < 0.3)) return;
        for (var i = impEnds.length - 1; i >= 0; i--) if (impEnds[i] <= t) impEnds.splice(i, 1);
        if (impEnds.length >= 8) return;
        var m = IMPACT[material] ? material : "card";
        if (impLastMat[m] != null && t - impLastMat[m] < 0.025) return;
        impTokens -= 1; impLastMat[m] = t;
        var v = playImpact(rig, m, s, clamp(+pan || 0, -1, 1), t + 0.003);
        impEnds.push(v.end);
      } catch (e) {}
    },
    music: {
      start: function () { try { startMusic(); } catch (e) {} },
      stop: function () { try { stopMusic(0.4); } catch (e) {} },
      setStage: function (st) {
        try {
          mStage = clamp(Math.round(+st || 0), 0, 3);
          if (engine) { if (mStage !== engine.stage) engine.pend = mStage; else engine.pend = null; }
        } catch (e) {}
      },
      setMode: function (mode) {
        try {
          if (!/^(normal|fast|card|paused|over)$/.test(mode)) return;
          mMode = mode;
          if (mode === "over") { stopMusic(0.5); applyMode("normal"); return; }
          applyMode(mode);
        } catch (e) {}
      }
    },
    renderOffline: renderOffline
  };
  W.GameAudio = GameAudio;
})();
