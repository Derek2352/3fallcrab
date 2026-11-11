// The leaderboard with real rows in it: ordering, ties, the unique device id, the weekly rank and the rate limit.
// These are the behaviours a player would notice, and the ones a stub returning empty sets cannot show.
import test from "node:test";
import assert from "node:assert/strict";
import { handle } from "../server/api.js";
import { makeStore } from "./fake-d1-store.mjs";

const game = (score, name, extra = {}) => ({
  score, name, board: true, email: "a@b.co", stage: 0, height: 1.2, drops: 0,
  choices: [{ card: "newphone", pick: "wise" }], answers: [{ q: "fakeapp", pick: 1 }], habit: "buffer", items: 5, ...extra,
});

const make = (envOpts = {}) => {
  const store = makeStore();
  const env = { DB: store, ...envOpts };
  const call = (path, opts = {}) => handle(new Request("https://game.test" + path, opts), env);
  const post = (body, headers = {}) => call("/api/scores", {
    method: "POST", body: JSON.stringify(body),
    headers: { "content-type": "application/json", ...headers },
  });
  return { store, env, call, post };
};

test("the board orders by score, highest first", async () => {
  const { post, call } = make();
  assert.equal((await post(game(120, "Low"))).status, 201);
  assert.equal((await post(game(480, "High"))).status, 201);
  assert.equal((await post(game(260, "Mid"))).status, 201);
  const j = await (await call("/api/scores")).json();
  assert.deepEqual(j.weekTop.map((r) => r.name), ["High", "Mid", "Low"]);
  assert.deepEqual(j.weekTop.map((r) => r.score), [480, 260, 120]);
});

test("a tie is broken by the earlier game", async () => {
  const { post, call } = make();
  await post(game(300, "First"));
  await post(game(300, "Second"));
  const j = await (await call("/api/scores")).json();
  assert.deepEqual(j.weekTop.map((r) => r.name), ["First", "Second"]);
});

test("the same device id cannot save twice", async () => {
  const { post, call, store } = make();
  const gid = "abcdefghijklmnop1234", key = "0123456789abcdefghijklmn";
  assert.equal((await post(game(200, "Once", { gid, key }))).status, 201);
  await post(game(999, "Again", { gid, key }));
  const j = await (await call("/api/scores")).json();
  assert.equal(j.weekTop.length, 1, "a second row was created for the same gid");
  assert.equal(store._rows.length, 1);
});

test("the weekly rank counts the games above", async () => {
  const { post } = make();
  await post(game(500, "Top"));
  const r = await post(game(150, "Under"));
  const j = await r.json();
  assert.equal(j.rank, 2);
  assert.equal(j.rankCap, 500);
});

test("the rate limit stops a burst from one network", async () => {
  const { post } = make({ RATE_LIMIT: "2" });
  const ip = { "cf-connecting-ip": "203.0.113.9" };
  assert.equal((await post(game(100, "A"), ip)).status, 201);
  assert.equal((await post(game(110, "B"), ip)).status, 201);
  const third = await post(game(120, "C"), ip);
  assert.equal(third.status, 429);
  assert.equal((await third.json()).error, "rate_limited");
});

test("the board never exposes an email address", async () => {
  const { post, call } = make();
  await post(game(200, "Ming"));
  const text = await (await call("/api/scores")).text();
  assert.equal(text.includes("a@b.co"), false, "an email appeared in the public board");
  assert.equal(text.includes("email"), false, "an email field appeared in the public board");
});
