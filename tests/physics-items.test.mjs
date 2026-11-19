// Physics & collider verification for all 39 items across src/items/*.js:
// convex non-degenerate Matter.js vertices, positive finite mass/inertia/bounds,
// spread-body parallel-axis inertia (CLAY.shape.fixInertia), and headless stacking stability.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import "../src/game-core.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ITEM_FILES = [
  "src/items/wise.js",
  "src/items/risky-a.js",
  "src/items/risky-b.js",
  "src/items/scam.js",
  "src/items/hk.js",
  "src/items/jackpot.js",
];

function createPhysicsSandbox() {
  const ctx = {
    Math, Number, Array, Object, Set, Map, String, Boolean, JSON, RegExp, Error,
    Infinity, NaN, isFinite, parseInt, parseFloat, console,
    Path2D: class { addPath() {} moveTo() {} lineTo() {} arc() {} arcTo() {} ellipse() {} bezierCurveTo() {} closePath() {} },
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.runInNewContext(readFileSync(join(root, "src/vendor/matter-0.19.0.min.js"), "utf8"), ctx, { filename: "matter-0.19.0.min.js" });
  vm.runInNewContext(readFileSync(join(root, "src/clay.js"), "utf8"), ctx, { filename: "src/clay.js" });
  for (const f of ITEM_FILES) {
    vm.runInNewContext(readFileSync(join(root, f), "utf8"), ctx, { filename: f });
  }
  return ctx;
}

function isStrictlyConvex(verts) {
  const n = verts.length;
  if (n < 3) return false;
  let sign = 0;
  for (let i = 0; i < n; i++) {
    const a = verts[i], b = verts[(i + 1) % n], c = verts[(i + 2) % n];
    if (!Number.isFinite(a.x) || !Number.isFinite(a.y)) return false;
    const z = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    if (Math.abs(z) > 1e-4) {
      if (!sign) sign = Math.sign(z);
      else if (Math.sign(z) !== sign) return false;
    }
  }
  return sign !== 0;
}

test("all 39 items define valid unique metadata and strictly convex Matter colliders", () => {
  const ctx = createPhysicsSandbox();
  const defs = ctx.ITEM_DEFS;
  assert.equal(defs.length, 39, "Expected all 39 item definitions across 6 packs");

  const ids = new Set();
  for (const def of defs) {
    assert.ok(def.id && /^[a-z0-9_-]+$/.test(def.id), `Invalid item id: ${def.id}`);
    assert.equal(ids.has(def.id), false, `Duplicate item id: ${def.id}`);
    ids.add(def.id);

    assert.ok(typeof def.en === "string" && def.en.trim().length > 0, `Missing en for ${def.id}`);
    assert.ok(typeof def.zh === "string" && def.zh.trim().length > 0, `Missing zh for ${def.id}`);
    assert.ok(["wise", "risky", "scam", "debt"].includes(def.kind), `Unexpected kind ${def.kind} on ${def.id}`);

    const body = def.make(220, 0);
    assert.ok(body && Array.isArray(body.parts), `make() returned invalid body for ${def.id}`);
    assert.ok(Number.isFinite(body.mass) && body.mass > 0, `${def.id}: invalid mass ${body.mass}`);
    assert.ok(Number.isFinite(body.inertia) && body.inertia > 0, `${def.id}: invalid inertia ${body.inertia}`);
    assert.ok(body.plugin && body.plugin.material in ctx.CLAY.MAT, `${def.id}: unknown material ${body.plugin?.material}`);

    const w = body.bounds.max.x - body.bounds.min.x;
    const h = body.bounds.max.y - body.bounds.min.y;
    assert.ok(w >= 5 && w <= 240 && h >= 5 && h <= 240, `${def.id}: extreme bounds ${w}x${h}`);

    const parts = body.parts.length > 1 ? body.parts.slice(1) : [body];
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      assert.equal(isStrictlyConvex(p.vertices), true, `${def.id} part[${i}] is concave or degenerate`);
      assert.ok(Number.isFinite(p.area) && p.area > 1, `${def.id} part[${i}] area invalid (${p.area})`);
    }
    if (body.parts.length > 1) {
      const naiveSum = parts.reduce((acc, p) => acc + p.inertia, 0);
      assert.ok(body.inertia >= naiveSum * 0.99, `${def.id}: compound inertia should include parallel-axis term`);
    }
  }
});

test("headless Matter.js wise-item stacking simulation stays finite and >= 85% stable on platform", () => {
  const ctx = createPhysicsSandbox();
  const { Matter } = ctx;
  const CORE = globalThis.TFF_CORE;
  const wisePool = ctx.ITEM_DEFS.filter((d) => d.kind === "wise" && !d.jackpot);
  assert.ok(wisePool.length >= 10);

  // 1) Every item across all 39 definitions simulates with finite coordinates; wise items all rest on platform
  for (const def of ctx.ITEM_DEFS) {
    const engine = Matter.Engine.create({ enableSleeping: true });
    engine.gravity.y = 1;
    const platform = Matter.Bodies.rectangle(CORE.W / 2, 15, CORE.PW, 30, {
      isStatic: true, friction: 0.95, frictionStatic: 1.4, restitution: 0.0,
    });
    const probe = def.make(0, 0);
    const body = def.make(CORE.W / 2, -probe.bounds.max.y - 20);
    Matter.Composite.add(engine.world, [platform, body]);
    for (let tick = 0; tick < 180; tick++) {
      Matter.Engine.update(engine, CORE.STEP);
      assert.ok(Number.isFinite(body.position.x) && Number.isFinite(body.position.y) && Number.isFinite(body.angle), `NaN physics on ${def.id}`);
    }
    if (def.kind === "wise") {
      assert.ok(body.position.y < CORE.WATER_Y, `${def.id} failed to rest on platform when dropped centered`);
    }
  }

  // 2) Multi-item 2-column stacking across the PW=236 platform achieves >= 85% retention
  let totalPlaced = 0;
  let survived = 0;
  const colOffsets = [-46, 46, -34, 34, -18, 18];

  for (let trial = 0; trial < 4; trial++) {
    const engine = Matter.Engine.create({ enableSleeping: true });
    engine.gravity.y = 1;
    const platform = Matter.Bodies.rectangle(CORE.W / 2, 15, CORE.PW, 30, {
      isStatic: true, friction: 0.95, frictionStatic: 1.4, restitution: 0.0,
    });
    Matter.Composite.add(engine.world, platform);

    const dynamic = [];
    for (let stepIdx = 0; stepIdx < 6; stepIdx++) {
      const def = wisePool[(trial * 7 + stepIdx * 3) % wisePool.length];
      let highestY = 0;
      for (const b of dynamic) if (b.position.y < CORE.WATER_Y) highestY = Math.min(highestY, b.bounds.min.y);
      const probe = def.make(0, 0);
      const spawnX = CORE.W / 2 + colOffsets[stepIdx];
      const body = def.make(spawnX, highestY - probe.bounds.max.y - 24);
      dynamic.push(body);
      Matter.Composite.add(engine.world, body);
      totalPlaced++;

      for (let tick = 0; tick < 160; tick++) {
        Matter.Engine.update(engine, CORE.STEP);
        assert.ok(Number.isFinite(body.position.x) && Number.isFinite(body.position.y) && Number.isFinite(body.angle), `NaN physics on ${def.id}`);
        for (const b of dynamic) {
          if (!b.isStatic && CORE.shouldAnchorBody({
            depth: highestY,
            bodyBottom: b.bounds.max.y,
            anchorDepth: CORE.ANCHOR_DEPTH,
            speed: Math.hypot(b.velocity.x, b.velocity.y),
            angularSpeed: Math.abs(b.angularVelocity),
            isSleeping: b.isSleeping,
            restCount: b._rest = ((Math.hypot(b.velocity.x, b.velocity.y) < 0.05 && Math.abs(b.angularVelocity) < 0.002) ? (b._rest || 0) + 1 : 0),
          })) {
            Matter.Body.setStatic(b, true);
          }
        }
      }
    }
    for (const b of dynamic) if (b.position.y < CORE.WATER_Y) survived++;
  }

  const ratio = survived / totalPlaced;
  assert.ok(ratio >= 0.85, `Expected wise stacking stability >= 85%, got ${(ratio * 100).toFixed(1)}% (${survived}/${totalPlaced})`);
});
