// The POST path's happy ending, and the case where the database will not confirm the write.
import test from "node:test";
import assert from "node:assert/strict";
import { handle } from "../server/api.js";
import { isoWeek } from "../server/api.js";
import { makeDB } from "./fake-d1.mjs";

const game = {
  score: 120, name: "Ming", board: true, email: "a@b.co", stage: 0, height: 1.2, drops: 0,
  choices: [{ card: "newphone", pick: "wise" }], answers: [{ q: "fakeapp", pick: 1 }], habit: "buffer", items: 5,
};
const post = async (body, db) =>
  handle(new Request("https://game.test/api/scores", {
    method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" },
  }), { DB: db });

test("a well-formed game is accepted and placed on the board", async () => {
  const r = await post(game, makeDB());
  assert.equal(r.status, 201);
  const j = await r.json();
  assert.equal(j.ok, true);
  assert.equal(j.board, true);
  assert.equal(typeof j.id, "number");
  assert.equal(typeof j.rank, "number");
  assert.equal(j.week, isoWeek(new Date(), "Asia/Hong_Kong"));
});

test("the nickname is cleaned before it is echoed back", async () => {
  const r = await post({ ...game, name: "<b>Ming</b>" }, makeDB());
  const j = await r.json();
  assert.ok(!String(j.name).includes("<"), "angle brackets reached the client: " + j.name);
  assert.ok(!String(j.name).includes(">"), "angle brackets reached the client: " + j.name);
});

test("a write the database will not confirm is refused, not assumed", async () => {
  const r = await post(game, makeDB({ changes: 0 }));
  assert.equal(r.status, 429);
  const j = await r.json();
  assert.equal(j.error, "rate_limited");
});
