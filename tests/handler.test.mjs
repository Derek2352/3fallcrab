// The request handler, exercised without a database. This is the path a deploy runs on before D1 is bound, and
// the path a bad request takes, so it must answer with JSON rather than throw.
import test from "node:test";
import assert from "node:assert/strict";
import { handle } from "../server/api.js";

const req = (path, method = "GET", body) => new Request("https://example.test" + path, { method, body });
const call = async (path, method = "GET", body) => {
  const r = await handle(req(path, method, body), {});
  return { status: r.status, type: r.headers.get("content-type") || "", body: await r.json().catch(() => null) };
};

test("health answers without a database", async () => {
  const r = await call("/api/health");
  assert.equal(r.status, 200);
  assert.equal(r.body.ok, true);
  assert.equal(r.body.database, false);
});

test("scores degrade to a clear 503 rather than throwing", async () => {
  const r = await call("/api/scores");
  assert.equal(r.status, 503);
  assert.equal(r.body.ok, false);
  assert.equal(r.body.error, "no_database");
});

test("an unknown route is a JSON 404", async () => {
  const r = await call("/api/nope");
  assert.equal(r.status, 404);
  assert.equal(r.body.error, "not_found");
  assert.match(r.type, /application\/json/);
});

test("posting without a database is refused, not crashed", async () => {
  const r = await call("/api/scores", "POST", "{}");
  assert.equal(r.status, 503);
  assert.equal(r.body.error, "no_database");
});

test("every answer is JSON", async () => {
  for (const [p, m] of [["/api/health", "GET"], ["/api/scores", "GET"], ["/api/nope", "GET"]]) {
    const r = await call(p, m);
    assert.match(r.type, /application\/json/, p + " did not answer with JSON");
  }
});
