(function () {
"use strict";
var W = typeof window !== "undefined" ? window : globalThis;
var STORE_KEY = "tff_daily_muted";
var noop = function () {};
var SKY_BPM = { day: 78, dusk: 76, night: 72 };
var SKY_FILTER = { day: 9200, dusk: 3900, night: 2650 };
var SKY_BREEZE = { day: 0.20, dusk: 0.18, night: 0.14 };
var SKY_AIR_HZ = { day: 920, dusk: 760, night: 620 };
var SKY_RHODES = { day: 0.85, dusk: 1.12, night: 0.72 };
var LOOKAHEAD = 0.16;
var TICK_MS = 35;
var MAX_SFX_VOICES = 20;
var F_PENT = [65, 67, 69, 72, 74, 77, 79, 81];
function own(map, k) {
return k != null && Object.prototype.hasOwnProperty.call(map, k) ? map[k] : null;
}
function clamp(x, lo, hi) {
return x < lo ? lo : x > hi ? hi : x;
}
function mtof(midi) {
return 440 * Math.pow(2, (midi - 69) / 12);
}
function makePrng(seed) {
var s = (seed | 0) || 0x3f4c8b21;
return function () {
s ^= s << 13;
s ^= s >>> 17;
s ^= s << 5;
return (s >>> 0) / 4294967296;
};
}
function readMuted() {
try {
return !!(W.localStorage && W.localStorage.getItem(STORE_KEY) === "1");
} catch (e) {
return false;
}
}
function writeMuted(v) {
try {
if (W.localStorage) W.localStorage.setItem(STORE_KEY, v ? "1" : "0");
} catch (e) {}
}
function promiseSafe(p) {
if (p && typeof p.catch === "function") p.catch(noop);
}
function softClipCurve() {
var n = 2049;
var curve = new Float32Array(n);
for (var i = 0; i < n; i++) {
var x = (i / 1024) - 1;
var ax = Math.abs(x);
var y = ax <= 0.72 ? ax : 0.72 + 0.24 * Math.tanh((ax - 0.72) / 0.24);
curve[i] = x < 0 ? -y : y;
}
return curve;
}
function buildNoiseBuffers(ctx, rand) {
var sr = ctx.sampleRate || 44100;
var wLen = Math.max(1024, Math.floor(sr * 1.5));
var wBuf = ctx.createBuffer(1, wLen, sr);
var wData = wBuf.getChannelData(0);
for (var i = 0; i < wLen; i++) {
wData[i] = rand() * 2 - 1;
}
var oLen = Math.max(4096, Math.floor(sr * 4.0));
var raw = new Float32Array(oLen + Math.floor(sr * 0.3));
var b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0, brown = 0;
for (var j = 0; j < raw.length; j++) {
var white = rand() * 2 - 1;
b0 = 0.99886 * b0 + white * 0.0555179;
b1 = 0.99332 * b1 + white * 0.0750759;
b2 = 0.96900 * b2 + white * 0.1538520;
b3 = 0.86650 * b3 + white * 0.3104856;
b4 = 0.55000 * b4 + white * 0.5329522;
b5 = -0.7616 * b5 - white * 0.0168980;
var pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.048;
b6 = white * 0.115926;
brown = (brown + white * 0.03) * 0.985;
raw[j] = clamp(pink * 0.65 + brown * 0.95, -0.95, 0.95);
}
var oBuf = ctx.createBuffer(1, oLen, sr);
var oData = oBuf.getChannelData(0);
var xfade = Math.min(Math.floor(sr * 0.25), Math.floor(oLen * 0.12));
for (var k = 0; k < oLen; k++) {
oData[k] = raw[k];
}
for (var m = 0; m < xfade; m++) {
var frac = m / xfade;
var fadeIn = Math.sin(frac * Math.PI * 0.5);
var fadeOut = Math.cos(frac * Math.PI * 0.5);
oData[m] = raw[m] * fadeIn + raw[oLen + m] * fadeOut;
}
return { white: wBuf, ocean: oBuf };
}
var PROGRESSION = [
{ name: "Fmaj9", bass: 41, fifth: 60, chord: [53, 57, 60, 64, 67] },
{ name: "Dm9", bass: 50, fifth: 64, chord: [53, 57, 60, 64] },
{ name: "Bbmaj7", bass: 46, fifth: 62, chord: [53, 57, 60, 62] },
{ name: "C9sus4", bass: 48, fifth: 62, chord: [55, 58, 62, 65] },
{ name: "Fmaj9", bass: 41, fifth: 60, chord: [53, 57, 60, 64, 67] },
{ name: "Dm9", bass: 50, fifth: 64, chord: [53, 57, 60, 64] },
{ name: "Bbmaj9", bass: 46, fifth: 60, chord: [50, 53, 57, 60] },
{ name: "C9sus4", bass: 48, fifth: 62, chord: [55, 58, 62, 64] },
{ name: "Bbmaj7", bass: 46, fifth: 62, chord: [53, 57, 60, 62] },
{ name: "Am11", bass: 45, fifth: 60, chord: [52, 55, 60, 62] },
{ name: "Gm9", bass: 43, fifth: 58, chord: [53, 57, 58, 62] },
{ name: "C9sus4", bass: 48, fifth: 62, chord: [53, 55, 58, 62] },
{ name: "Fmaj9", bass: 41, fifth: 60, chord: [52, 55, 57, 60] },
{ name: "Dm9", bass: 50, fifth: 64, chord: [53, 57, 60, 64] },
{ name: "Bbmaj7", bass: 46, fifth: 62, chord: [53, 57, 60, 62] },
{ name: "C9sus4", bass: 48, fifth: 60, chord: [55, 58, 60, 62] }
];
var KALIMBA_PHRASES = [
[[0, 69, 0.88, 1.25], [2, 72, 0.78, 1.05], [3, 74, 0.84, 1.15], [5, 72, 0.74, 1.0], [7, 69, 0.68, 0.95]],
[[0, 67, 0.82, 1.1], [2, 65, 0.76, 1.25], [4, 69, 0.80, 1.15], [6, 72, 0.74, 1.1]],
[[0, 74, 0.86, 1.25], [2, 72, 0.78, 1.0], [3, 69, 0.74, 1.1], [5, 67, 0.72, 1.05], [7, 69, 0.68, 0.95]],
[[0, 67, 0.84, 1.55], [4, 69, 0.76, 1.1], [6, 72, 0.80, 1.2]],
[[0, 77, 0.90, 1.3], [2, 76, 0.80, 1.15], [3, 72, 0.76, 1.1], [5, 74, 0.82, 1.15], [7, 72, 0.70, 1.0]],
[[0, 69, 0.84, 1.35], [3, 72, 0.76, 1.05], [4, 74, 0.82, 1.2], [6, 69, 0.74, 1.15]],
[[0, 67, 0.80, 1.15], [2, 69, 0.78, 1.1], [4, 72, 0.84, 1.2], [6, 74, 0.80, 1.15]],
[[0, 72, 0.86, 1.4], [3, 69, 0.74, 1.2], [5, 67, 0.70, 1.5]],
[[0, 74, 0.86, 1.25], [2, 77, 0.84, 1.25], [4, 74, 0.78, 1.15], [6, 72, 0.74, 1.15]],
[[0, 72, 0.82, 1.3], [3, 69, 0.76, 1.1], [5, 67, 0.72, 1.1], [7, 69, 0.68, 1.0]],
[[0, 72, 0.84, 1.2], [2, 69, 0.78, 1.1], [4, 65, 0.76, 1.25], [6, 67, 0.74, 1.15]],
[[0, 69, 0.82, 1.45], [3, 67, 0.74, 1.3], [6, 72, 0.78, 1.25]],
[[0, 79, 0.88, 1.35], [2, 77, 0.82, 1.15], [3, 74, 0.78, 1.15], [5, 72, 0.74, 1.1], [7, 69, 0.70, 1.05]],
[[0, 72, 0.84, 1.2], [2, 74, 0.80, 1.15], [4, 72, 0.76, 1.15], [6, 69, 0.74, 1.2]],
[[0, 69, 0.80, 1.2], [2, 72, 0.82, 1.15], [4, 74, 0.84, 1.2], [6, 72, 0.76, 1.2]],
[[0, 67, 0.82, 1.35], [2, 69, 0.76, 1.2], [4, 65, 0.80, 1.75]]
];
var BELL_ACCENTS = [
[[4, 79, 0.58]],
[[6, 88, 0.48]],
[[0, 89, 0.52]],
[[4, 86, 0.55]],
[[2, 84, 0.56]],
[[4, 89, 0.50]],
[[6, 81, 0.54]],
[[0, 91, 0.44]],
[[2, 81, 0.54]],
[[4, 88, 0.48]],
[[0, 86, 0.52]],
[[6, 89, 0.50]],
[[0, 84, 0.56]],
[[4, 88, 0.50]],
[[2, 89, 0.52]],
[[4, 84, 0.56]]
];
var FOCUS_PULSE_NOTES = [65, 72, 69, 67, 65, 72, 74, 69];
function Voice(rig, dest, level, pan) {
this.rig = rig;
this.ctx = rig.ctx;
this.nodes = [];
this.live = 0;
this.end = 0;
this.disposed = false;
if (level == null) {
this.out = dest;
return;
}
var g = this.gain(level);
var pVal = +pan || 0;
if (pVal && typeof this.ctx.createStereoPanner === "function") {
var p = this.track(this.ctx.createStereoPanner());
p.pan.value = clamp(pVal, -1, 1);
g.connect(p);
p.connect(dest);
} else {
g.connect(dest);
}
this.out = g;
}
Voice.prototype.track = function (node) {
this.nodes.push(node);
return node;
};
Voice.prototype.gain = function (val, dest) {
var g = this.track(this.ctx.createGain());
g.gain.value = val;
if (dest) g.connect(dest);
return g;
};
Voice.prototype.filter = function (type, freq, q, dest, t) {
var b = this.track(this.ctx.createBiquadFilter());
b.type = type;
var f = clamp(freq, 20, 18000);
b.frequency.value = f;
if (t != null) b.frequency.setValueAtTime(f, t);
if (q != null) b.Q.value = q;
if (dest) b.connect(dest);
return b;
};
Voice.prototype.osc = function (type, freq, t0, t1, dest) {
var o = this.track(this.ctx.createOscillator());
o.type = type;
o.frequency.setValueAtTime(clamp(freq, 20, 18000), t0);
o.connect(dest || this.out);
this.startSource(o, t0, t1, 0);
return o;
};
Voice.prototype.noise = function (t0, t1, dest, useOcean) {
var s = this.track(this.ctx.createBufferSource());
var buf = useOcean ? this.rig.noise.ocean : this.rig.noise.white;
s.buffer = buf;
s.loop = true;
s.connect(dest || this.out);
var maxOff = Math.max(0.01, (buf.duration || 1) - 0.15);
this.startSource(s, t0, t1, this.rig.rand() * maxOff);
return s;
};
Voice.prototype.startSource = function (src, t0, t1, offset) {
var self = this;
var end = Math.max(t0 + 0.01, t1);
this.live++;
if (end > this.end) this.end = end;
src.onended = function () {
if (--self.live <= 0) self.dispose();
};
if (offset > 0) src.start(t0, offset);
else src.start(t0);
src.stop(end);
};
Voice.prototype.dispose = function () {
if (this.disposed) return;
this.disposed = true;
for (var i = 0; i < this.nodes.length; i++) {
try { this.nodes[i].disconnect(); } catch (e) {}
}
this.nodes.length = 0;
};
function envAD(param, t, attack, peak, decay) {
var a = Math.max(0.002, attack);
var d = Math.max(0.01, decay);
var pk = Math.max(0.0005, peak);
param.setValueAtTime(0, t);
param.linearRampToValueAtTime(pk, t + a);
param.exponentialRampToValueAtTime(0.00018, t + a + d);
param.linearRampToValueAtTime(0, t + a + d + 0.006);
return t + a + d + 0.008;
}
function envASR(param, t, attack, peak, hold, release) {
var a = Math.max(0.004, attack);
var h = Math.max(0.005, hold);
var r = Math.max(0.01, release);
var pk = Math.max(0.0005, peak);
param.setValueAtTime(0, t);
param.linearRampToValueAtTime(pk, t + a);
param.setValueAtTime(pk, t + a + h);
param.exponentialRampToValueAtTime(0.00018, t + a + h + r);
param.linearRampToValueAtTime(0, t + a + h + r + 0.008);
return t + a + h + r + 0.01;
}
function simpleTone(v, type, freq, t, attack, peak, decay, dest) {
var g = v.gain(0, dest || v.out);
var end = envAD(g.gain, t, attack, peak, decay);
var o = v.osc(type, freq, t, end + 0.004, g);
return { g: g, o: o, end: end };
}
function filteredNoise(v, t, attack, peak, decay, filterType, freq, q, dest, useOcean) {
var g = v.gain(0, dest || v.out);
var end = envAD(g.gain, t, attack, peak, decay);
var f = v.filter(filterType, freq, q, g, t);
v.noise(t, end + 0.004, f, useOcean);
return { g: g, f: f, end: end };
}
function makeStereoDelay(ctx, dest, delayLSec, delayRSec, dampL, dampR, fbL, fbR, wetLevel) {
var input = ctx.createGain();
var wet = ctx.createGain();
wet.gain.value = wetLevel;
var dL = ctx.createDelay(2.0);
var dR = ctx.createDelay(2.0);
dL.delayTime.value = delayLSec;
dR.delayTime.value = delayRSec;
var fL = ctx.createBiquadFilter();
fL.type = "lowpass";
fL.frequency.value = dampL;
fL.Q.value = 0.5;
var fR = ctx.createBiquadFilter();
fR.type = "lowpass";
fR.frequency.value = dampR;
fR.Q.value = 0.5;
var gLtoR = ctx.createGain();
gLtoR.gain.value = fbL;
var gRtoL = ctx.createGain();
gRtoL.gain.value = fbR;
input.connect(dL);
dL.connect(fL);
fL.connect(gLtoR);
gLtoR.connect(dR);
dR.connect(fR);
fR.connect(gRtoL);
gRtoL.connect(dL);
if (typeof ctx.createStereoPanner === "function") {
var pL = ctx.createStereoPanner();
pL.pan.value = -0.58;
var pR = ctx.createStereoPanner();
pR.pan.value = 0.58;
fL.connect(pL);
pL.connect(wet);
fR.connect(pR);
pR.connect(wet);
} else {
fL.connect(wet);
fR.connect(wet);
}
wet.connect(dest);
return { input: input, wet: wet, dL: dL, dR: dR };
}
function buildRig(ctx) {
var rand = makePrng((Math.random() * 4294967296) >>> 0);
var r = {
ctx: ctx,
rand: rand,
noise: buildNoiseBuffers(ctx, rand)
};
r.muteGain = ctx.createGain();
r.muteGain.gain.value = muted ? 0 : 1;
r.muteGain.connect(ctx.destination);
r.clip = ctx.createWaveShaper();
r.clip.curve = softClipCurve();
r.clip.oversample = "none";
r.clip.connect(r.muteGain);
r.comp = ctx.createDynamicsCompressor();
r.comp.threshold.value = -14;
r.comp.knee.value = 12;
r.comp.ratio.value = 4;
r.comp.attack.value = 0.008;
r.comp.release.value = 0.22;
r.comp.connect(r.clip);
r.warmShelf = ctx.createBiquadFilter();
r.warmShelf.type = "highshelf";
r.warmShelf.frequency.value = 5600;
r.warmShelf.gain.value = -2.2;
r.warmShelf.connect(r.comp);
r.masterBus = ctx.createGain();
r.masterBus.gain.value = 0.92;
r.masterBus.connect(r.warmShelf);
r.musicFade = ctx.createGain();
r.musicFade.gain.value = 0;
r.musicFade.connect(r.masterBus);
r.musicLevel = ctx.createGain();
r.musicLevel.gain.value = 0.32;
r.musicLevel.connect(r.musicFade);
r.skyFilter = ctx.createBiquadFilter();
r.skyFilter.type = "lowpass";
r.skyFilter.frequency.value = SKY_FILTER[sky] || 9200;
r.skyFilter.Q.value = 0.55;
r.skyFilter.connect(r.musicLevel);
r.melodyBus = ctx.createGain();
r.melodyBus.gain.value = focusMode ? 0 : 1;
r.melodyBus.connect(r.skyFilter);
r.kalimbaBus = ctx.createGain();
r.kalimbaBus.gain.value = 1.0;
r.kalimbaBus.connect(r.melodyBus);
r.rhodesTrem = ctx.createGain();
r.rhodesTrem.gain.value = 0.90;
r.rhodesTrem.connect(r.melodyBus);
r.rhodesBus = ctx.createGain();
r.rhodesBus.gain.value = tier >= 1 ? (SKY_RHODES[sky] || 0.85) : 0;
r.rhodesBus.connect(r.rhodesTrem);
r.bassBus = ctx.createGain();
r.bassBus.gain.value = tier >= 2 ? 1.0 : 0;
r.bassBus.connect(r.melodyBus);
r.bellBus = ctx.createGain();
r.bellBus.gain.value = tier >= 3 ? 1.0 : (sky === "night" ? 0.42 : 0);
r.bellBus.connect(r.melodyBus);
r.musicEcho = makeStereoDelay(ctx, r.skyFilter, 0.384, 0.576, 2400, 1950, 0.34, 0.29, 0.36);
r.focusBus = ctx.createGain();
r.focusBus.gain.value = focusMode ? 1.0 : 0;
r.focusBus.connect(r.musicFade);
r.focusLP = ctx.createBiquadFilter();
r.focusLP.type = "lowpass";
r.focusLP.frequency.value = 1050;
r.focusLP.Q.value = 0.6;
r.focusLP.connect(r.focusBus);
r.breezeFade = ctx.createGain();
r.breezeFade.gain.value = 0;
r.breezeFade.connect(r.masterBus);
r.breezeLevel = ctx.createGain();
r.breezeLevel.gain.value = focusMode ? 0.22 : (SKY_BREEZE[sky] || 0.20);
r.breezeLevel.connect(r.breezeFade);
r.sfxBus = ctx.createGain();
r.sfxBus.gain.value = 0.84;
r.sfxBus.connect(r.masterBus);
r.sfxEcho = makeStereoDelay(ctx, r.sfxBus, 0.23, 0.35, 2700, 2100, 0.24, 0.20, 0.22);
return r;
}
var ambient = null;
var pendingAmbientTimer = null;
var pendingAmbientTeardown = null;
function flushPendingAmbient() {
if (pendingAmbientTimer) {
try { W.clearTimeout(pendingAmbientTimer); } catch (e) {}
pendingAmbientTimer = null;
}
if (pendingAmbientTeardown) {
var fn = pendingAmbientTeardown;
pendingAmbientTeardown = null;
fn();
}
}
function startAmbient(r) {
flushPendingAmbient();
stopAmbient(0);
if (!r || !r.ctx) return;
var ctx = r.ctx;
var t = ctx.currentTime + 0.01;
var nodes = [];
var sources = [];
function track(n) { nodes.push(n); return n; }
function startSrc(s) { sources.push(s); s.start(t); return s; }
var waveBreath = track(ctx.createGain());
waveBreath.gain.value = 0.72;
waveBreath.connect(r.breezeLevel);
var waveFilter = track(ctx.createBiquadFilter());
waveFilter.type = "lowpass";
waveFilter.frequency.value = 285;
waveFilter.Q.value = 0.72;
waveFilter.connect(waveBreath);
var waveNoise = track(ctx.createBufferSource());
waveNoise.buffer = r.noise.ocean;
waveNoise.loop = true;
waveNoise.connect(waveFilter);
startSrc(waveNoise);
var waveLfo = track(ctx.createOscillator());
waveLfo.type = "sine";
waveLfo.frequency.value = 0.14;
var waveFreqDepth = track(ctx.createGain());
waveFreqDepth.gain.value = 125;
waveLfo.connect(waveFreqDepth);
waveFreqDepth.connect(waveFilter.frequency);
var waveAmpDepth = track(ctx.createGain());
waveAmpDepth.gain.value = 0.24;
waveLfo.connect(waveAmpDepth);
waveAmpDepth.connect(waveBreath.gain);
startSrc(waveLfo);
var airBreath = track(ctx.createGain());
airBreath.gain.value = 0.055;
airBreath.connect(r.breezeLevel);
var airFilter = track(ctx.createBiquadFilter());
airFilter.type = "bandpass";
airFilter.frequency.value = SKY_AIR_HZ[sky] || 920;
airFilter.Q.value = 0.9;
airFilter.connect(airBreath);
var airNoise = track(ctx.createBufferSource());
airNoise.buffer = r.noise.ocean;
airNoise.loop = true;
airNoise.connect(airFilter);
airNoise.start(t, 1.7);
sources.push(airNoise);
var airLfo = track(ctx.createOscillator());
airLfo.type = "sine";
airLfo.frequency.value = 0.09;
var airDepth = track(ctx.createGain());
airDepth.gain.value = 0.024;
airLfo.connect(airDepth);
airDepth.connect(airBreath.gain);
startSrc(airLfo);
var tremLfo = track(ctx.createOscillator());
tremLfo.type = "sine";
tremLfo.frequency.value = 2.75;
var tremDepth = track(ctx.createGain());
tremDepth.gain.value = 0.10;
tremLfo.connect(tremDepth);
tremDepth.connect(r.rhodesTrem.gain);
startSrc(tremLfo);
var droneMix = track(ctx.createGain());
droneMix.gain.value = 0.24;
droneMix.connect(r.focusLP);
var droneSpecs = [
{ midi: 53, type: "sine", gain: 0.38, detune: -2.5 },
{ midi: 60, type: "sine", gain: 0.28, detune: 2.0 },
{ midi: 67, type: "triangle", gain: 0.16, detune: -3.0 },
{ midi: 69, type: "sine", gain: 0.14, detune: 3.5 }
];
for (var i = 0; i < droneSpecs.length; i++) {
var sp = droneSpecs[i];
var dg = track(ctx.createGain());
dg.gain.value = sp.gain;
dg.connect(droneMix);
var dOsc = track(ctx.createOscillator());
dOsc.type = sp.type;
dOsc.frequency.value = mtof(sp.midi);
dOsc.detune.value = sp.detune;
dOsc.connect(dg);
startSrc(dOsc);
}
var droneLfo = track(ctx.createOscillator());
droneLfo.type = "sine";
droneLfo.frequency.value = 0.12;
var droneLfoDepth = track(ctx.createGain());
droneLfoDepth.gain.value = 0.06;
droneLfo.connect(droneLfoDepth);
droneLfoDepth.connect(droneMix.gain);
startSrc(droneLfo);
ambient = {
gen: ++ambientGen,
nodes: nodes,
sources: sources,
airFilter: airFilter
};
}
function stopAmbient(delaySec) {
var cur = ambient;
ambient = null;
if (!cur) return;
var teardown = function () {
for (var i = 0; i < cur.sources.length; i++) {
try { cur.sources[i].stop(); } catch (e) {}
}
for (var j = 0; j < cur.nodes.length; j++) {
try { cur.nodes[j].disconnect(); } catch (e) {}
}
cur.sources.length = 0;
cur.nodes.length = 0;
};
if (delaySec && delaySec > 0 && W.setTimeout) {
flushPendingAmbient();
pendingAmbientTeardown = teardown;
pendingAmbientTimer = W.setTimeout(function () {
pendingAmbientTimer = null;
pendingAmbientTeardown = null;
teardown();
}, Math.round(delaySec * 1000));
} else {
teardown();
}
}
function playKalimba(r, midi, t, vel, decaySec, pan, toSfx) {
var f = mtof(midi);
var dest = toSfx ? r.sfxBus : r.kalimbaBus;
var echoDest = toSfx ? r.sfxEcho.input : r.musicEcho.input;
var v = new Voice(r, dest, vel, pan);
var lpCutoff = toSfx ? 3600 : (sky === "dusk" ? 2250 : sky === "night" ? 2600 : 3250);
var bodyLP = v.filter("lowpass", lpCutoff, 0.7, v.out, t);
var sendGain = v.gain(toSfx ? 0.32 : (sky === "night" ? 0.48 : 0.36), echoDest);
bodyLP.connect(sendGain);
var dur = (decaySec || 1.1) * (sky === "night" && !toSfx ? 1.2 : 1.0);
simpleTone(v, "sine", f, t, 0.005, 0.44, dur, bodyLP);
if (f * 2 < 12000) simpleTone(v, "sine", f * 2, t, 0.004, 0.11, dur * 0.32, bodyLP);
if (f * 2.97 < 12000) simpleTone(v, "sine", f * 2.97, t, 0.003, 0.036, dur * 0.16, bodyLP);
var mallet = simpleTone(v, "sine", Math.min(f * 3.1, 6000), t, 0.002, 0.075, 0.014, bodyLP);
mallet.o.frequency.exponentialRampToValueAtTime(Math.max(120, f * 1.4), t + 0.013);
filteredNoise(v, t, 0.002, 0.085, 0.012, "bandpass", clamp(f * 2.3, 950, 3500), 2.2, bodyLP, false);
if (!toSfx && sky === "night" && f * 2 < 10000) {
simpleTone(v, "sine", f * 2, t + 0.008, 0.012, 0.085, dur * 0.95, bodyLP);
} else if (!toSfx && sky === "dusk" && vel >= 0.80 && f * 1.5 < 9000) {
simpleTone(v, "sine", f * 1.5, t + 0.015, 0.025, 0.055, dur * 0.72, bodyLP);
}
return v;
}
function playRhodesChord(r, notes, t, holdSec, vel, extraFifth) {
if (!notes || !notes.length) return null;
var v = new Voice(r, r.rhodesBus, vel, 0);
var lpFreq = sky === "dusk" ? 1750 : sky === "night" ? 1150 : 1450;
var lp = v.filter("lowpass", lpFreq, 0.65, v.out, t);
var list = notes.slice();
if (sky === "dusk" && extraFifth) list.push(extraFifth);
var perNote = 0.24 / Math.sqrt(list.length);
for (var i = 0; i < list.length; i++) {
var nt = t + i * 0.026;
var f = mtof(list[i]);
var gFund = v.gain(0, lp);
var end1 = envASR(gFund.gain, nt, 0.08, perNote, holdSec, 0.72);
v.osc("sine", f, nt, end1 + 0.01, gFund);
var gTri = v.gain(0, lp);
var end2 = envASR(gTri.gain, nt, 0.09, perNote * 0.32, holdSec * 0.85, 0.60);
var oTri = v.osc("triangle", f, nt, end2 + 0.01, gTri);
oTri.detune.value = (i % 2 === 0 ? 3.2 : -3.2);
if (f * 3 < 9500) {
simpleTone(v, "sine", f * 3, nt, 0.005, perNote * 0.14, 0.095, lp);
}
}
return v;
}
function playBassMarimba(r, midi, t, vel) {
var f = mtof(midi);
var v = new Voice(r, r.bassBus, vel, -0.06);
var lp = v.filter("lowpass", 640, 0.7, v.out, t);
var body = simpleTone(v, "sine", f, t, 0.007, 0.44, 0.88, lp);
body.o.frequency.setValueAtTime(f * 1.18, t);
body.o.frequency.exponentialRampToValueAtTime(f, t + 0.018);
simpleTone(v, "sine", f * 2, t, 0.005, 0.12, 0.18, lp);
filteredNoise(v, t, 0.002, 0.06, 0.018, "lowpass", 420, 0.8, lp, false);
return v;
}
function playHarbourBell(r, midi, t, vel, pan, toSfx) {
var f = mtof(midi);
var dest = toSfx ? r.sfxBus : r.bellBus;
var echoDest = toSfx ? r.sfxEcho.input : r.musicEcho.input;
var v = new Voice(r, dest, vel, pan);
var send = v.gain(toSfx ? 0.36 : 0.56, echoDest);
v.out.connect(send);
simpleTone(v, "sine", f, t, 0.005, 0.24, 1.55, v.out);
if (f * 2 < 14000) simpleTone(v, "sine", f * 2, t, 0.004, 0.085, 0.85, v.out);
if (f * 3.01 < 14500) simpleTone(v, "sine", f * 3.01, t, 0.003, 0.032, 0.42, v.out);
return v;
}
function playFocusPulse(r, midi, t, accent) {
var f = mtof(midi);
var v = new Voice(r, r.focusBus, accent ? 0.34 : 0.24, (r.rand() - 0.5) * 0.25);
var lp = v.filter("lowpass", 1500, 0.7, v.out, t);
var send = v.gain(0.40, r.musicEcho.input);
lp.connect(send);
simpleTone(v, "sine", f, t, 0.04, 0.26, 1.8, lp);
var det = simpleTone(v, "sine", f, t, 0.05, 0.14, 1.7, lp);
det.o.detune.value = 4.5;
if (f * 2.756 < 9000) simpleTone(v, "sine", f * 2.756, t, 0.03, 0.045, 0.9, lp);
if (accent) {
var tap = simpleTone(v, "sine", 240, t, 0.004, 0.12, 0.045, lp);
tap.o.frequency.exponentialRampToValueAtTime(165, t + 0.04);
}
return v;
}
function clayPop(v, t, fStart, fEnd, peak, dur, dest) {
var x = simpleTone(v, "sine", fStart, t, 0.003, peak, dur, dest);
x.o.frequency.exponentialRampToValueAtTime(clamp(fEnd, 40, 8000), t + Math.min(dur * 0.75, 0.045));
filteredNoise(v, t, 0.002, peak * 0.22, 0.015, "bandpass", 1100, 1.6, dest, false);
return x;
}
function woodTap(v, t, freq, peak, decay, dest) {
var lp = v.filter("lowpass", clamp(freq * 3.2, 600, 4200), 1.1, dest || v.out, t);
var a = simpleTone(v, "sine", freq, t, 0.002, peak, decay, lp);
a.o.frequency.exponentialRampToValueAtTime(Math.max(60, freq * 0.84), t + Math.min(decay, 0.03));
if (freq * 1.52 < 10000) simpleTone(v, "sine", freq * 1.52, t, 0.002, peak * 0.34, decay * 0.55, lp);
filteredNoise(v, t, 0.002, peak * 0.42, 0.012, "bandpass", clamp(freq * 2.2, 700, 3800), 2.8, lp, false);
}
function celestaTone(v, t, midi, peak, decay, dest, echoDest) {
var f = mtof(midi);
var out = dest || v.out;
if (echoDest) {
var s = v.gain(0.32, echoDest);
var bus = v.gain(1, out);
bus.connect(s);
out = bus;
}
simpleTone(v, "sine", f, t, 0.003, peak, decay, out);
if (f * 2 < 14000) simpleTone(v, "sine", f * 2, t, 0.003, peak * 0.35, decay * 0.55, out);
if (f * 3.01 < 14500) simpleTone(v, "sine", f * 3.01, t, 0.002, peak * 0.14, decay * 0.28, out);
}
function harpPluck(v, t, midi, peak, decay, dest, echoDest) {
var f = mtof(midi);
var lp = v.filter("lowpass", clamp(f * 4.5, 1400, 6200), 0.7, dest || v.out, t);
lp.frequency.exponentialRampToValueAtTime(clamp(f * 1.7, 500, 2600), t + Math.min(decay * 0.8, 0.5));
if (echoDest) {
var s = v.gain(0.30, echoDest);
lp.connect(s);
}
simpleTone(v, "triangle", f, t, 0.004, peak * 0.72, decay, lp);
simpleTone(v, "sine", f, t, 0.004, peak * 0.52, decay * 1.15, lp);
if (f * 2 < 12000) simpleTone(v, "sine", f * 2, t, 0.003, peak * 0.24, decay * 0.4, lp);
}
function marimbaBar(v, t, midi, peak, decay, dest, echoDest) {
var f = mtof(midi);
var lp = v.filter("lowpass", clamp(f * 3.6, 1200, 4800), 0.8, dest || v.out, t);
if (echoDest) {
var s = v.gain(0.28, echoDest);
lp.connect(s);
}
simpleTone(v, "sine", f, t, 0.003, peak, decay, lp);
if (f * 4 < 12000) simpleTone(v, "sine", f * 4, t, 0.002, peak * 0.18, decay * 0.16, lp);
filteredNoise(v, t, 0.002, peak * 0.24, 0.011, "bandpass", clamp(f * 2.5, 900, 3600), 2.4, lp, false);
}
var lastPropNote = -1;
var SFX = {
orbitTick: function (v, t) {
var jitter = 1 + (v.rig.rand() - 0.5) * 0.14;
woodTap(v, t, 560 * jitter, 0.19, 0.022, v.out);
},
tapProp: function (v, t) {
var idx = Math.floor(v.rig.rand() * F_PENT.length);
if (idx === lastPropNote) idx = (idx + 1 + Math.floor(v.rig.rand() * 3)) % F_PENT.length;
lastPropNote = idx;
var midi = F_PENT[idx];
var f = mtof(midi);
clayPop(v, t, 310, 610, 0.24, 0.045, v.out);
marimbaBar(v, t + 0.016, midi, 0.34, 0.42, v.out, v.rig.sfxEcho.input);
if (f * 2.97 < 12000) simpleTone(v, "sine", f * 2.97, t + 0.016, 0.003, 0.055, 0.11, v.out);
},
cardOpen: function (v, t) {
var air = filteredNoise(v, t, 0.018, 0.14, 0.11, "bandpass", 640, 1.3, v.out, false);
air.f.frequency.exponentialRampToValueAtTime(2250, t + 0.11);
marimbaBar(v, t + 0.028, 65, 0.22, 0.14, v.out, null);
marimbaBar(v, t + 0.075, 72, 0.24, 0.22, v.out, v.rig.sfxEcho.input);
},
cardClose: function (v, t) {
var air = filteredNoise(v, t, 0.010, 0.11, 0.09, "bandpass", 1650, 1.2, v.out, false);
air.f.frequency.exponentialRampToValueAtTime(520, t + 0.09);
marimbaBar(v, t + 0.015, 60, 0.22, 0.12, v.out, null);
marimbaBar(v, t + 0.062, 53, 0.24, 0.18, v.out, null);
},
select: function (v, t) {
woodTap(v, t, mtof(77), 0.34, 0.048, v.out);
simpleTone(v, "sine", mtof(84), t + 0.004, 0.002, 0.14, 0.065, v.out);
},
yesBloom: function (v, t) {
var echo = v.rig.sfxEcho.input;
clayPop(v, t, 260, 650, 0.32, 0.055, v.out);
var arp = [65, 69, 72, 76, 79, 81];
for (var i = 0; i < arp.length; i++) {
var nt = t + 0.045 + i * 0.055;
marimbaBar(v, nt, arp[i], 0.28 + i * 0.015, 0.48 + i * 0.06, v.out, echo);
}
var bt = t + 0.36;
celestaTone(v, bt, 84, 0.22, 0.95, v.out, echo);
celestaTone(v, bt + 0.045, 91, 0.18, 1.10, v.out, echo);
filteredNoise(v, bt, 0.04, 0.055, 0.26, "bandpass", 4200, 1.8, v.out, false);
},
rescueStart: function (v, t) {
var echo = v.rig.sfxEcho.input;
woodTap(v, t, mtof(53), 0.28, 0.075, v.out);
var bt = t + 0.06;
var f = mtof(65);
var bowlBus = v.gain(1, v.out);
var bowlSend = v.gain(0.42, echo);
bowlBus.connect(bowlSend);
simpleTone(v, "sine", f, bt, 0.035, 0.34, 1.85, bowlBus);
var beat = simpleTone(v, "sine", f + 1.8, bt, 0.045, 0.18, 1.75, bowlBus);
beat.o.detune.value = 3;
simpleTone(v, "sine", f * 2.756, bt, 0.025, 0.11, 1.15, bowlBus);
simpleTone(v, "sine", f * 5.404, bt, 0.018, 0.04, 0.55, bowlBus);
},
rescueTick: function (v, t) {
woodTap(v, t, mtof(69), 0.26, 0.048, v.out);
simpleTone(v, "sine", mtof(76), t + 0.008, 0.003, 0.07, 0.08, v.out);
},
rescueBloom: function (v, t) {
var echo = v.rig.sfxEcho.input;
var gliss = [65, 67, 69, 72, 74, 76, 79, 81, 84];
for (var i = 0; i < gliss.length; i++) {
harpPluck(v, t + i * 0.044, gliss[i], 0.24, 0.65 + i * 0.05, v.out, echo);
}
var rt = t + 0.40;
celestaTone(v, rt, 89, 0.20, 1.15, v.out, echo);
celestaTone(v, rt + 0.06, 93, 0.16, 1.25, v.out, echo);
filteredNoise(v, rt, 0.05, 0.05, 0.30, "bandpass", 4600, 1.6, v.out, false);
},
shieldCatch: function (v, t) {
var echo = v.rig.sfxEcho.input;
var drops = [[520, 880, 0], [660, 1120, 0.065], [780, 1320, 0.13]];
for (var i = 0; i < drops.length; i++) {
var d = drops[i];
var dt = t + d[2];
var b = simpleTone(v, "sine", d[0], dt, 0.004, 0.24, 0.075, v.out);
b.o.frequency.exponentialRampToValueAtTime(d[1], dt + 0.065);
}
celestaTone(v, t + 0.15, 77, 0.28, 0.85, v.out, echo);
celestaTone(v, t + 0.23, 84, 0.26, 1.05, v.out, echo);
var sh = filteredNoise(v, t + 0.12, 0.06, 0.08, 0.34, "bandpass", 2800, 2.2, v.out, false);
sh.f.frequency.exponentialRampToValueAtTime(5200, t + 0.42);
},
milestone: function (v, t) {
var echo = v.rig.sfxEcho.input;
var cascade = [65, 69, 72, 74, 77, 81, 84];
for (var i = 0; i < cascade.length; i++) {
marimbaBar(v, t + i * 0.058, cascade[i], 0.28, 0.52 + i * 0.05, v.out, echo);
}
var ct = t + 0.38;
celestaTone(v, ct, 89, 0.22, 0.95, v.out, echo);
celestaTone(v, ct + 0.07, 91, 0.20, 1.05, v.out, echo);
celestaTone(v, ct + 0.14, 93, 0.22, 1.25, v.out, echo);
var padLP = v.filter("lowpass", 1600, 0.6, v.out, t + 0.22);
var padNotes = [53, 60, 64, 67];
for (var p = 0; p < padNotes.length; p++) {
var pg = v.gain(0, padLP);
var pe = envASR(pg.gain, t + 0.22, 0.12, 0.10, 0.42, 0.68);
v.osc("sine", mtof(padNotes[p]), t + 0.22, pe + 0.01, pg);
}
},
sprint14: function (v, t) {
var echo = v.rig.sfxEcho.input;
marimbaBar(v, t, 41, 0.34, 0.75, v.out, null);
marimbaBar(v, t + 0.28, 48, 0.30, 0.75, v.out, null);
marimbaBar(v, t + 0.52, 53, 0.36, 1.25, v.out, echo);
var run = [65, 67, 69, 72, 74, 77, 79, 81, 84];
for (var i = 0; i < run.length; i++) {
var rt = t + 0.03 + i * 0.058;
marimbaBar(v, rt, run[i], 0.28, 0.60 + i * 0.05, v.out, echo);
if (i >= 3) harpPluck(v, rt + 0.02, run[i] + 12 <= 96 ? run[i] + 12 : run[i], 0.13, 0.75, v.out, echo);
}
var chordT = t + 0.50;
var padLP = v.filter("lowpass", 2000, 0.65, v.out, chordT);
var chord = [53, 57, 60, 64, 67, 72];
for (var c = 0; c < chord.length; c++) {
var cg = v.gain(0, padLP);
var ce = envASR(cg.gain, chordT + c * 0.02, 0.14, 0.11, 0.65, 1.15);
v.osc("sine", mtof(chord[c]), chordT + c * 0.02, ce + 0.01, cg);
var tri = v.gain(0, padLP);
var te = envASR(tri.gain, chordT + c * 0.02, 0.16, 0.038, 0.55, 0.95);
v.osc("triangle", mtof(chord[c]), chordT + c * 0.02, te + 0.01, tri);
}
var bellT = t + 0.56;
celestaTone(v, bellT, 84, 0.24, 0.95, v.out, echo);
celestaTone(v, bellT + 0.14, 86, 0.24, 0.95, v.out, echo);
celestaTone(v, bellT + 0.28, 89, 0.28, 1.60, v.out, echo);
celestaTone(v, bellT + 0.44, 93, 0.20, 1.55, v.out, echo);
celestaTone(v, bellT + 0.56, 96, 0.16, 1.65, v.out, echo);
filteredNoise(v, bellT + 0.22, 0.08, 0.055, 0.55, "bandpass", 4400, 1.5, v.out, false);
},
skyShift: function (v, t) {
var echo = v.rig.sfxEcho.input;
var notes = sky === "night"
? [81, 84, 88, 91, 93]
: sky === "dusk"
? [84, 79, 81, 88, 89]
: [77, 79, 81, 84, 86, 89];
var airStart = sky === "night" ? 1100 : sky === "dusk" ? 1300 : 1500;
var airEnd = sky === "night" ? 2400 : sky === "dusk" ? 2100 : 3400;
var breeze = filteredNoise(v, t, 0.06, 0.09, 0.34, "bandpass", airStart, 1.4, v.out, true);
breeze.f.frequency.exponentialRampToValueAtTime(airEnd, t + 0.32);
for (var i = 0; i < notes.length; i++) {
celestaTone(v, t + 0.03 + i * 0.052, notes[i], 0.17, 0.72 + i * 0.06, v.out, echo);
}
},
nope: function (v, t) {
woodTap(v, t, mtof(57), 0.28, 0.085, v.out);
woodTap(v, t + 0.085, mtof(52), 0.25, 0.12, v.out);
},
done: function (v, t) {
var echo = v.rig.sfxEcho.input;
celestaTone(v, t, 84, 0.26, 0.42, v.out, echo);
celestaTone(v, t + 0.085, 89, 0.28, 0.62, v.out, echo);
}
};
var SFX_NAMES = Object.keys(SFX).sort();
var SFX_THROTTLE = {
orbitTick: 0.045,
tapProp: 0.060,
select: 0.030
};
var ctx = null;
var rig = null;
var ambientGen = 0;
var timer = null;
var muted = readMuted();
var sky = "day";
var tier = 0;
var focusMode = false;
var playing = false;
var wantMusic = false;
var explicitlyStopped = false;
var hidden = false;
var unlockedOnce = false;
var stepIdx = 0;
var passCount = 0;
var nextStepTime = 0;
var focusPulseIdx = 0;
var lastSfxTime = {};
var lastOrbitMs = 0;
var activeSfxEnds = [];
function rampTo(param, value, tau) {
if (!param || !ctx) return;
var t = ctx.currentTime;
try {
param.cancelScheduledValues(t);
param.setValueAtTime(param.value, t);
param.setTargetAtTime(value, t, Math.max(0.006, tau || 0.05));
} catch (e) {
try { param.value = value; } catch (e2) {}
}
}
function currentEighthSec() {
var bpm = SKY_BPM[sky] || 78;
return 60 / bpm / 2;
}
function applySkyParams(tau) {
if (!rig) return;
var fade = tau == null ? 0.35 : tau;
var targetCutoff = focusMode ? 1850 : (SKY_FILTER[sky] || 9200);
rampTo(rig.skyFilter.frequency, targetCutoff, fade);
rampTo(rig.breezeLevel.gain, focusMode ? 0.22 : (SKY_BREEZE[sky] || 0.20), fade);
if (ambient && ambient.airFilter) {
rampTo(ambient.airFilter.frequency, SKY_AIR_HZ[sky] || 920, fade);
}
applyTierParams(fade);
}
function applyTierParams(tau) {
if (!rig) return;
var fade = tau == null ? 0.38 : tau;
rampTo(rig.rhodesBus.gain, tier >= 1 ? (SKY_RHODES[sky] || 0.85) : 0, fade);
rampTo(rig.bassBus.gain, tier >= 2 ? 1.0 : 0, fade);
var bellLvl = tier >= 3 ? 1.0 : (sky === "night" ? 0.42 : 0);
rampTo(rig.bellBus.gain, bellLvl, fade);
}
function applyFocusParams(tau) {
if (!rig) return;
var fade = tau == null ? 0.45 : tau;
rampTo(rig.melodyBus.gain, focusMode ? 0 : 1.0, fade);
rampTo(rig.focusBus.gain, focusMode ? 1.0 : 0, fade);
applySkyParams(fade);
}
function applyMute(tau) {
if (!rig) return;
rampTo(rig.muteGain.gain, muted ? 0 : 1, tau == null ? 0.025 : tau);
}
function applyVisibility() {
if (!ctx) return;
try {
if (hidden) {
if (ctx.state === "running") promiseSafe(ctx.suspend());
} else {
if (!muted && playing && ctx.state === "suspended") promiseSafe(ctx.resume());
}
} catch (e) {}
}
function onVisibilityChange() {
hidden = !!(W.document && W.document.hidden);
applyVisibility();
}
function scheduleStep(t) {
if (!rig || !ctx) return;
var bar = Math.floor(stepIdx / 8);
var step = stepIdx % 8;
var eighth = currentEighthSec();
var chordData = PROGRESSION[bar];
var st = Math.max(ctx.currentTime + 0.004, t);
if (focusMode) {
if (!muted && (step === 0 || step === 4)) {
var fNote = FOCUS_PULSE_NOTES[focusPulseIdx % FOCUS_PULSE_NOTES.length];
focusPulseIdx++;
playFocusPulse(rig, fNote, st + 0.005, step === 0);
}
} else if (!muted) {
if (step === 0 && tier >= 1) {
playRhodesChord(rig, chordData.chord, st + 0.004, eighth * 6.4, 0.82, chordData.fifth);
}
if (tier >= 2) {
if (step === 0) {
playBassMarimba(rig, chordData.bass, st + 0.004, 0.72);
} else if (step === 5 && (bar % 2 === 0 || passCount % 2 === 1)) {
playBassMarimba(rig, chordData.bass + 7, st + 0.006, 0.44);
}
}
var phrase = KALIMBA_PHRASES[bar];
for (var i = 0; i < phrase.length; i++) {
var note = phrase[i];
if (note[0] === step) {
var humanT = Math.max(ctx.currentTime + 0.005, st + (rig.rand() - 0.5) * 0.014);
var humanVel = note[2] * (0.90 + rig.rand() * 0.18) * (sky === "night" ? 0.84 : 1.0);
var pitchPan = clamp(((note[1] - 72) / 14) * 0.30, -0.32, 0.32);
playKalimba(rig, note[1], humanT, humanVel, note[3], pitchPan, false);
if (passCount > 0 && step === 0 && (bar + passCount) % 4 === 1 && rig.rand() < 0.55) {
playKalimba(rig, note[1] + 12, humanT + eighth * 0.5, humanVel * 0.46, note[3] * 0.85, -pitchPan * 0.7, false);
}
}
}
if (tier >= 3 || sky === "night") {
var bells = BELL_ACCENTS[bar];
for (var b = 0; b < bells.length; b++) {
var bell = bells[b];
if (bell[0] === step) {
if (passCount % 2 === 1 && bar % 3 === 2) continue;
var bPan = (bar % 2 === 0 ? 0.35 : -0.35) + (rig.rand() - 0.5) * 0.14;
playHarbourBell(rig, bell[1], st + 0.008, bell[2] * (0.9 + rig.rand() * 0.16), bPan, false);
}
}
}
}
stepIdx++;
if (stepIdx >= PROGRESSION.length * 8) {
stepIdx = 0;
passCount++;
}
nextStepTime += eighth;
}
function tick() {
if (!playing || !ctx || !rig) return;
if (ctx.state !== "running") return;
var now = ctx.currentTime;
if (nextStepTime < now - 0.30) {
nextStepTime = now + 0.05;
}
var guard = 0;
while (nextStepTime < now + LOOKAHEAD && guard++ < 16) {
try {
scheduleStep(nextStepTime);
} catch (e) {
nextStepTime = now + 0.08;
break;
}
}
}
function startMusicInternal() {
wantMusic = true;
explicitlyStopped = false;
if (!ctx || !rig) return;
if (!playing) {
playing = true;
stepIdx = 0;
passCount = 0;
focusPulseIdx = 0;
nextStepTime = ctx.currentTime + 0.07;
if (!ambient) startAmbient(rig);
applyFocusParams(0.05);
rampTo(rig.musicFade.gain, 1.0, 0.35);
rampTo(rig.breezeFade.gain, 1.0, 0.50);
if (!timer && W.setInterval) {
timer = W.setInterval(tick, TICK_MS);
}
tick();
} else {
rampTo(rig.musicFade.gain, 1.0, 0.25);
rampTo(rig.breezeFade.gain, 1.0, 0.35);
}
}
function stopMusicInternal() {
wantMusic = false;
explicitlyStopped = true;
playing = false;
if (timer) {
try { W.clearInterval(timer); } catch (e) {}
timer = null;
}
if (rig && ctx) {
rampTo(rig.musicFade.gain, 0, 0.14);
rampTo(rig.breezeFade.gain, 0, 0.16);
stopAmbient(0.65);
} else {
stopAmbient(0);
}
}
function dispatchSfx(name, opts) {
if (!ctx || !rig || muted) return;
var fn = own(SFX, name);
if (!fn) return;
var t = ctx.currentTime;
var minGap = own(SFX_THROTTLE, name) || 0.025;
if (own(lastSfxTime, name) != null && (t - lastSfxTime[name]) < minGap) return;
if (name === "orbitTick") {
var nowMs = Date.now();
if (nowMs - lastOrbitMs < 45) return;
lastOrbitMs = nowMs;
}
for (var i = activeSfxEnds.length - 1; i >= 0; i--) {
if (activeSfxEnds[i] <= t) activeSfxEnds.splice(i, 1);
}
if (activeSfxEnds.length >= MAX_SFX_VOICES) return;
lastSfxTime[name] = t;
var vol = opts && opts.volume != null && Number.isFinite(+opts.volume) ? clamp(+opts.volume, 0, 1) : 1;
var pan = opts && opts.pan != null && Number.isFinite(+opts.pan) ? clamp(+opts.pan, -1, 1) : 0;
var v = new Voice(rig, rig.sfxBus, vol, pan);
fn(v, t + 0.006, opts || {});
activeSfxEnds.push(v.end);
}
var DailyAudio = {
unlock: function () {
try {
if (!ctx) {
var AC = W.AudioContext || W.webkitAudioContext;
if (!AC) return;
try {
ctx = new AC({ latencyHint: "interactive" });
} catch (e) {
ctx = new AC();
}
rig = buildRig(ctx);
applyMute(0.01);
applyFocusParams(0.01);
hidden = !!(W.document && W.document.hidden);
if (W.document && typeof W.document.addEventListener === "function") {
W.document.addEventListener("visibilitychange", onVisibilityChange);
}
}
if (!unlockedOnce && ctx && typeof ctx.createBuffer === "function") {
unlockedOnce = true;
try {
var silent = ctx.createBuffer(1, 1, 22050);
var src = ctx.createBufferSource();
src.buffer = silent;
src.connect(ctx.destination);
src.start(0);
src.onended = function () { try { src.disconnect(); } catch (e) {} };
} catch (e) {}
}
if (!hidden && ctx && ctx.state === "suspended") {
promiseSafe(ctx.resume());
}
if ((!muted || wantMusic) && !explicitlyStopped) {
if (!muted) startMusicInternal();
}
} catch (e) {}
},
isMuted: function () {
return muted;
},
toggleMute: function () {
try {
muted = !muted;
writeMuted(muted);
applyMute(0.025);
if (!muted && ctx && rig) {
if (!hidden && ctx.state === "suspended") promiseSafe(ctx.resume());
if (!playing && !explicitlyStopped) startMusicInternal();
}
} catch (e) {}
return muted;
},
setSky: function (nextSky) {
try {
if (nextSky !== "day" && nextSky !== "dusk" && nextSky !== "night") return sky;
if (sky === nextSky) return sky;
sky = nextSky;
applySkyParams(0.40);
} catch (e) {}
return sky;
},
setTier: function (nextTier) {
try {
var n = +nextTier;
if (!Number.isFinite(n)) return tier;
var clamped = clamp(Math.round(n), 0, 3);
if (tier === clamped) return tier;
tier = clamped;
applyTierParams(0.45);
} catch (e) {}
return tier;
},
setFocusMode: function (on) {
try {
var next = !!on;
if (focusMode === next) return focusMode;
focusMode = next;
applyFocusParams(0.50);
} catch (e) {}
return focusMode;
},
sfx: function (name, opts) {
try {
if (muted || !ctx || !rig) return;
if (!own(SFX, name)) return;
if (name === "orbitTick" && (Date.now() - lastOrbitMs) < 45) return;
if (ctx.state === "running") {
dispatchSfx(name, opts);
} else if (ctx.state === "suspended" && !hidden) {
var requestedAt = Date.now();
var p = ctx.resume();
if (p && typeof p.then === "function") {
p.then(function () {
if (!muted && ctx && ctx.state === "running" && (Date.now() - requestedAt) < 160) {
dispatchSfx(name, opts);
}
}, noop);
}
}
} catch (e) {}
},
startMusic: function () {
try {
startMusicInternal();
} catch (e) {}
},
stopMusic: function () {
try {
stopMusicInternal();
} catch (e) {}
},
listSfx: function () {
return SFX_NAMES.slice();
},
getState: function () {
return {
muted: muted,
sky: sky,
tier: tier,
focusMode: focusMode,
playing: playing
};
}
};
W.DailyAudio = DailyAudio;
if (typeof globalThis !== "undefined") {
globalThis.DailyAudio = DailyAudio;
}
})();
