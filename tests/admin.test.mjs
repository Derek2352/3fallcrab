// Tests for admin search, status/flag filters, keyset cursor pagination, batch moderation, and chunked CSV export.
import test from "node:test";
import assert from "node:assert/strict";
import { handle, NAME_DEFAULT } from "../server/api.js";
import { makeStore } from "./fake-d1-store.mjs";

const TOKEN = "0123456789abcdef";
const HDR = { "content-type": "application/json", authorization: `Bearer ${TOKEN}` };

function seed() {
  const store = makeStore();
  const call = (path, opts = {}) => handle(new Request("https://game.test" + path, opts), { DB: store, ADMIN_TOKEN: TOKEN });
  const post = (body) => call("/api/scores", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
  return { store, call, post };
}

test("admin scores supports keyset pagination, text/id search, status, and anomaly flags", async () => {
  const { call, post } = seed();
  await post({ score: 1000, name: "Alice", email: "alice@example.com", board: true, stage: 0, height: 1, drops: 0, choices: [], items: 3, ended: "time", real_ms: 180000 });
  await post({ score: 2500, name: "SlowBob", email: "bob@example.com", board: true, stage: 1, height: 4, drops: 0, choices: [], items: 6, ended: "time", real_ms: 320000 });
  await post({ score: 1500, name: "ChalCara", email: "cara@example.com", board: true, stage: 0, height: 2, drops: 1, choices: [], items: 4, via: "c" });
  await post({ score: 600, name: "AnonDan", board: false, stage: 0, height: 1, drops: 3, choices: [], items: 2 });

  const page1 = await (await call("/api/admin/scores?limit=2", { headers: HDR })).json();
  assert.equal(page1.rows.length, 2);
  assert.equal(page1.filteredTotal, 4);
  assert.deepEqual(page1.rows.map((r) => r.id), [4, 3]);
  assert.equal(page1.nextBefore, 3);

  const page2 = await (await call(`/api/admin/scores?limit=2&before=${page1.nextBefore}`, { headers: HDR })).json();
  assert.deepEqual(page2.rows.map((r) => r.id), [2, 1]);
  assert.equal(page2.nextBefore, null);

  const slow = await (await call("/api/admin/scores?flag=slow", { headers: HDR })).json();
  assert.deepEqual(slow.rows.map((r) => r.name), ["SlowBob"]);

  const links = await (await call("/api/admin/scores?flag=links", { headers: HDR })).json();
  assert.deepEqual(links.rows.map((r) => r.name), ["ChalCara"]);

  const byEmail = await (await call("/api/admin/scores?q=alice@example", { headers: HDR })).json();
  assert.deepEqual(byEmail.rows.map((r) => r.name), ["Alice"]);

  const byId = await (await call("/api/admin/scores?q=3", { headers: HDR })).json();
  assert.ok(byId.rows.some((r) => r.id === 3));
});

test("admin batch moderation hides, unhides, and anonymises rows while clearing board caches", async () => {
  const { call, post } = seed();
  await post({ score: 2000, name: "UserOne", email: "one@example.com", board: true, stage: 0, height: 2, drops: 0, choices: [], items: 5 });
  await post({ score: 3000, name: "UserTwo", email: "two@example.com", board: true, stage: 1, height: 4, drops: 0, choices: [], items: 6 });

  const hRes = await (await call("/api/admin/batch", {
    method: "POST",
    body: JSON.stringify({ action: "hide", ids: [1, 2] }),
    headers: HDR,
  })).json();
  assert.equal(hRes.ok, true);
  assert.equal(hRes.changed, 2);

  const hiddenList = await (await call("/api/admin/scores?status=hidden", { headers: HDR })).json();
  assert.equal(hiddenList.rows.length, 2);
  const boardAfterHide = await (await call("/api/scores")).json();
  assert.equal(boardAfterHide.weekTop.length, 0);

  await call("/api/admin/batch", { method: "POST", body: JSON.stringify({ action: "unhide", ids: [1] }), headers: HDR });
  await call("/api/admin/batch", { method: "POST", body: JSON.stringify({ action: "rename", ids: [1] }), headers: HDR });
  const boardAfter = await (await call("/api/scores")).json();
  assert.equal(boardAfter.weekTop.length, 1);
  assert.equal(boardAfter.weekTop[0].name, NAME_DEFAULT);

  const badAct = await call("/api/admin/batch", { method: "POST", body: JSON.stringify({ action: "wipe", ids: [1] }), headers: HDR });
  assert.equal(badAct.status, 400);
});

test("admin export streams filtered CSV cleanly without exposing wrong rows", async () => {
  const { call, post } = seed();
  await post({ score: 1100, name: "KeepMe", email: "k@example.com", board: true, stage: 0, height: 1, drops: 0, choices: [], items: 3 });
  await post({ score: 900, name: "=CMD()", email: "f@example.com", board: false, stage: 0, height: 1, drops: 0, choices: [], items: 2 });

  const csvRes = await call("/api/admin/export?board=1", { headers: HDR });
  assert.equal(csvRes.status, 200);
  const text = await csvRes.text();
  const lines = text.trim().split("\r\n");
  assert.equal(lines.length, 2, "header + 1 posted row");
  assert.ok(lines[1].includes("KeepMe"));
  assert.equal(lines[1].includes("=CMD()"), false);
});
