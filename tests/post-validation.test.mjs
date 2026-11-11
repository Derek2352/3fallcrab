// The POST path's refusals. Every one of these returns before the request touches real data, so a stub database
// is enough -- and these are the checks that stop an edited request reaching the leaderboard.
import test from "node:test";
import assert from "node:assert/strict";
import { handle } from "../server/api.js";
import { makeDB } from "./fake-d1.mjs";

const send = async (opts = {}) => {
  const { body = "{}", headers = {}, extraEnv = {}, method = "POST" } = opts;
  const h = { "content-type": "application/json", ...headers };
  const r = await handle(new Request("https://game.test/api/scores", { method, body, headers: h }), { DB: makeDB(), ...extraEnv });
  return { status: r.status, json: await r.json().catch(() => null) };
};

test("a closed leaderboard refuses writes", async () => {
  const r = await send({ extraEnv: { LEADERBOARD_CLOSED: "1" } });
  assert.equal(r.status, 403);
  assert.equal(r.json.error, "closed");
});

test("a post must declare JSON", async () => {
  const r = await send({ headers: { "content-type": "text/plain" } });
  assert.equal(r.status, 415);
  assert.equal(r.json.error, "content_type");
});

test("an oversized body is refused before it is read", async () => {
  const r = await send({ body: "x".repeat(5000) });
  assert.equal(r.status, 413);
  assert.equal(r.json.error, "too_large");
});

test("malformed JSON is refused", async () => {
  const r = await send({ body: "{not json" });
  assert.equal(r.status, 400);
  assert.equal(r.json.error, "bad_json");
});

test("a JSON array is not a game", async () => {
  const r = await send({ body: "[]" });
  assert.equal(r.status, 400);
  assert.equal(r.json.error, "bad_json");
});

test("an impossible score is refused", async () => {
  for (const score of [-1, 99999999, "nan"]) {
    const r = await send({ body: JSON.stringify({ score }) });
    assert.equal(r.status, 400, "score " + score + " was accepted");
    assert.equal(r.json.error, "bad_score");
  }
});

test("a malformed prize email is refused when posting to the board", async () => {
  const r = await send({ body: JSON.stringify({ score: 100, name: "Ming", board: true, email: "not-an-email" }) });
  assert.equal(r.status, 400);
  assert.equal(r.json.error, "bad_email");
});

test("a malformed device key pair is refused", async () => {
  const r = await send({ body: JSON.stringify({ score: 100, gid: "short", key: "alsoshort" }) });
  assert.equal(r.status, 400);
  assert.equal(r.json.error, "bad_key");
});

test("a cross-origin post is refused", async () => {
  const r = await send({ headers: { origin: "https://evil.test" } });
  assert.equal(r.status, 403);
  assert.equal(r.json.error, "origin");
});

test("more cards than a game can open is implausible", async () => {
  const choices = Array.from({ length: 8 }, (_, i) => ({ card: "c" + i, pick: "wise" }));
  const r = await send({ body: JSON.stringify({ score: 100, choices }) });
  assert.equal(r.status, 422);
  assert.equal(r.json.error, "implausible");
});
