// Curated specification for the 7 unique physical souvenir result cards (90 mm x 160 mm).
// Every card mirrors a valid real-game result state, verified against TFF_CORE.verdictOf and posterFor.

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

export function loadGameData() {
  const ctx = { window: {}, globalThis: {} };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.runInNewContext(readFileSync(join(ROOT, "src/game-core.js"), "utf8"), ctx);
  vm.runInNewContext(readFileSync(join(ROOT, "src/content.js"), "utf8"), ctx);
  return { CORE: ctx.TFF_CORE, CONTENT: ctx.TFF_CONTENT };
}

function posterFor(s) {
  const uni = s.stage === 0;
  const homely = !!(s.persona && (s.persona.bg === "sub" || s.persona.bg === "estate"));
  if (s.falls.spend >= 2 || (uni && s.falls.spend >= 1)) return "trolley";
  if (s.stage >= 3) return s.drops >= 2 ? "rooftop" : "ferry";
  if (s.stage === 2) return "family";
  if (s.stage === 1) return "diner";
  if (homely) return "estate";
  return s.over === "drops" ? "diver" : "rooftop";
}

// Generate deterministic tower silhouettes (encoded like encodeSilhouette) proportional to floor height
function makeSilhouette(floors, seed, w = 440, floorPx = 50, rowH = 12.5) {
  let s = (seed * 9301 + 49297) % 233280;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const rows = Math.max(4, Math.min(120, Math.round((floors * floorPx) / rowH)));
  const out = [];
  let cx = w / 2;
  for (let i = 0; i < rows; i++) {
    const t = i / rows;
    const half = Math.max(26, (95 - t * 48) + (rnd() - 0.5) * 24);
    cx = Math.max(95, Math.min(w - 95, cx + (rnd() - 0.5) * 16));
    const l = Math.round(Math.max(0, cx - half));
    const r = Math.round(Math.min(w, cx + half));
    out.push([l, r]);
  }
  return out;
}

export const CARDS_SPEC = [
  {
    index: 1,
    slug: "01-ferry",
    poster: "ferry",
    who: "jackie",
    playerName: "Jackie",
    persona: { bg: "estate", pe: "grind" },
    score: 78200,
    stage: 3,
    bestFloors: 18,
    drops: 0,
    wise: 6,
    risky: 0,
    missed: 0,
    falls: { spend: 0, scam: 0, delay: 0 },
    over: "time",
    pct: 96,
    ticketNo: "2026001",
    dateLabel: "18 NOV 2026 · 14:20",
    seed: 101,
  },
  {
    index: 2,
    slug: "02-rooftop",
    poster: "rooftop",
    who: "jack",
    playerName: "Jack",
    persona: { bg: "mid", pe: "hustle" },
    score: 51600,
    stage: 3,
    bestFloors: 15,
    drops: 2,
    wise: 4,
    risky: 1,
    missed: 0,
    falls: { spend: 0, scam: 0, delay: 1 },
    over: "time",
    pct: 84,
    ticketNo: "2026002",
    dateLabel: "18 NOV 2026 · 14:45",
    seed: 202,
  },
  {
    index: 3,
    slug: "03-family",
    poster: "family",
    who: "jackie",
    playerName: "Jackie",
    persona: { bg: "mid", pe: "artsy" },
    score: 39400,
    stage: 2,
    bestFloors: 13,
    drops: 1,
    wise: 4,
    risky: 1,
    missed: 0,
    falls: { spend: 0, scam: 1, delay: 0 },
    over: "time",
    pct: 72,
    ticketNo: "2026003",
    dateLabel: "18 NOV 2026 · 15:10",
    seed: 303,
  },
  {
    index: 4,
    slug: "04-diner",
    poster: "diner",
    who: "jack",
    playerName: "Jack",
    persona: { bg: "estate", pe: "genius" },
    score: 19800,
    stage: 1,
    bestFloors: 8,
    drops: 1,
    wise: 3,
    risky: 1,
    missed: 0,
    falls: { spend: 1, scam: 0, delay: 0 },
    over: "time",
    pct: 54,
    ticketNo: "2026004",
    dateLabel: "18 NOV 2026 · 15:35",
    seed: 404,
  },
  {
    index: 5,
    slug: "05-trolley",
    poster: "trolley",
    who: "jack",
    playerName: "Jack",
    persona: { bg: "rich", pe: "social" },
    score: 7400,
    stage: 1,
    bestFloors: 6,
    drops: 2,
    wise: 1,
    risky: 2,
    missed: 1,
    falls: { spend: 2, scam: 0, delay: 1 },
    over: "time",
    pct: 28,
    ticketNo: "2026005",
    dateLabel: "18 NOV 2026 · 16:00",
    seed: 505,
  },
  {
    index: 6,
    slug: "06-estate",
    poster: "estate",
    who: "jackie",
    playerName: "Jackie",
    persona: { bg: "sub", pe: "grind" },
    score: 4600,
    stage: 0,
    bestFloors: 3,
    drops: 1,
    wise: 1,
    risky: 0,
    missed: 2,
    falls: { spend: 0, scam: 0, delay: 2 },
    over: "time",
    pct: 17,
    ticketNo: "2026006",
    dateLabel: "18 NOV 2026 · 16:25",
    seed: 606,
  },
  {
    index: 7,
    slug: "07-diver",
    poster: "diver",
    who: "jack",
    playerName: "Jack",
    persona: { bg: "rich", pe: "gamer" },
    score: 2100,
    stage: 0,
    bestFloors: 2,
    drops: 3,
    wise: 1,
    risky: 1,
    missed: 0,
    falls: { spend: 0, scam: 1, delay: 0 },
    over: "drops",
    pct: 9,
    ticketNo: "2026007",
    dateLabel: "18 NOV 2026 · 16:50",
    seed: 707,
  },
];

export function resolveCards() {
  const { CORE, CONTENT } = loadGameData();
  const seenPosters = new Set();
  const seenTitles = new Set();

  return CARDS_SPEC.map((spec) => {
    const state = {
      score: spec.score,
      stage: spec.stage,
      best: spec.bestFloors * CORE.FLOOR,
      drops: spec.drops,
      wise: spec.wise,
      risky: spec.risky,
      missed: spec.missed,
      falls: spec.falls,
      over: spec.over,
      persona: spec.persona,
      troll: {},
      jpAt: -1,
    };

    const computedPoster = posterFor(state);
    if (computedPoster !== spec.poster) {
      throw new Error(`Card ${spec.slug}: expected poster ${spec.poster}, got ${computedPoster}`);
    }
    const verdict = CORE.verdictOf(state, CONTENT.TITLES, CONTENT.STAGES.length);
    const tier = CORE.tierOf(verdict);

    if (seenPosters.has(computedPoster)) throw new Error(`Duplicate poster: ${computedPoster}`);
    if (seenTitles.has(verdict.id)) throw new Error(`Duplicate title: ${verdict.id}`);
    seenPosters.add(computedPoster);
    seenTitles.add(verdict.id);

    const bg = CONTENT.PERSONAS.bg[spec.persona.bg];
    const pe = CONTENT.PERSONAS.pe[spec.persona.pe];
    const comboKey = `${spec.persona.bg}+${spec.persona.pe}`;
    const combo = CONTENT.PERSONAS.combos[comboKey];
    const stageObj = CONTENT.STAGES[spec.stage];
    const act = CONTENT.ACTS[CONTENT.ACT_OF_STAGE[Math.min(3, spec.stage)]];

    const chalParams = new URLSearchParams({
      s: String(spec.score),
      v: verdict.id,
      p: comboKey,
    });

    return {
      ...spec,
      verdict,
      tier,
      stageObj,
      act,
      personaZh: `${bg.zh}${pe.zh}`,
      comboEn: combo.en,
      comboZh: combo.zh,
      formattedScore: CORE.fmt(spec.score),
      bestText: CORE.floorTxt(spec.bestFloors),
      challengeUrl: `https://3fallcrab.com/c?${chalParams.toString()}`,
      silhouetteRows: makeSilhouette(spec.bestFloors, spec.seed, CORE.W, CORE.FLOOR, CORE.SIL_ROW),
    };
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cards = resolveCards();
  for (const c of cards) {
    console.log(
      `${c.slug}: poster=${c.poster} | ${c.verdict.zh} (${c.verdict.en}) [${c.tier}] | ${c.formattedScore} | ${c.stageObj.zh} ${c.bestText} | ${c.playerName} · ${c.personaZh} ${c.comboEn}`
    );
  }
}
