// The deployable entry points and the transport rules in front of the API: HTTPS only, known methods only, and
// an admin surface that does not advertise itself.
import test from "node:test";
import assert from "node:assert/strict";
import { handle } from "../server/api.js";
import { makeDB } from "./fake-d1.mjs";

const call = async (url, opts = {}, env = {}) =>
  handle(new Request(url, opts), { DB: makeDB(), ...env });

test("the Worker exposes a fetch handler", async () => {
  const w = await import("../server/worker.js");
  assert.ok(w.default, "no default export");
  assert.equal(typeof w.default.fetch, "function");
});

test("the Pages function exposes onRequest", async () => {
  const pf = await import("../functions/api/[[path]].js");
  assert.equal(typeof pf.onRequest, "function");
});

test("plain http is redirected for reads", async () => {
  const r = await call("http://game.test/api/health", { headers: { "x-forwarded-proto": "http" } });
  assert.equal(r.status, 301);
  assert.ok((r.headers.get("location") || "").startsWith("https://"), "redirect must go to https");
});

test("plain http refuses writes outright", async () => {
  const r = await call("http://game.test/api/scores", { method: "POST", headers: { "x-forwarded-proto": "http" } });
  assert.equal(r.status, 403);
  assert.equal((await r.json()).error, "https_required");
});

test("an unsupported method is refused with the allowed list", async () => {
  const r = await call("https://game.test/api/scores", { method: "PUT" });
  assert.equal(r.status, 405);
  assert.equal((await r.json()).error, "method_not_allowed");
});

test("HEAD is served like GET", async () => {
  const r = await call("https://game.test/api/scores", { method: "HEAD" });
  assert.equal(r.status, 200);
});

test("the admin surface does not advertise itself without a token", async () => {
  const r = await call("https://game.test/api/admin/scores");
  assert.equal(r.status, 404);
  assert.equal((await r.json()).error, "admin_disabled");
});

test("admin with a configured token but no credentials is unauthorised, not open", async () => {
  const r = await call("https://game.test/api/admin/scores", {}, { ADMIN_TOKEN: "0123456789abcdef" });
  assert.equal(r.status, 401);
  assert.equal((await r.json()).error, "unauthorised");
});

test("JSON answers carry the security headers", async () => {
  const r = await call("https://game.test/api/health");
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  assert.ok(r.headers.get("strict-transport-security"), "missing HSTS");
});
