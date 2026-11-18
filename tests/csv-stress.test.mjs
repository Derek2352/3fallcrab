import test from "node:test";
import assert from "node:assert/strict";
import { handle } from "../server/api.js";
import { makeSqliteDB } from "./fake-d1-store.mjs";

const TOKEN = "0123456789abcdef";
const AUTH = { authorization: `Bearer ${TOKEN}` };

const EXPECTED_HEADER = "id,name,email,posted,score,stage,height,drops,wise,risky,missed,fall_spend,fall_scam,fall_delay,choices,habit,quiz,quiz_answered,quiz_answers,ended,week,month,created_at,updated_at,hidden,items,real_ms,quiz_prior,jackpot,troll_revive,troll_invest,troll_tickets,avatar,mtype,via,title,persona";
const EXPECTED_COLS = EXPECTED_HEADER.split(",");

// Streaming RFC 4180 parser that yields complete records (each record is an array of fields)
// and verifies CRLF record termination outside quotes without buffering the whole file.
function createCsvStreamParser(onRecord) {
  let inQuotes = false;
  let justClosedQuote = false;
  let field = "";
  let row = [];
  let sawCr = false;

  const finishRow = () => {
    row.push(field);
    field = "";
    onRecord(row);
    row = [];
    justClosedQuote = false;
  };

  return {
    push(chunk) {
      for (let i = 0; i < chunk.length; i++) {
        const ch = chunk[i];
        if (sawCr) {
          sawCr = false;
          if (!inQuotes && ch === "\n") {
            finishRow();
            continue;
          }
          if (inQuotes) {
            field += "\r";
          } else {
            throw new Error("Unexpected bare CR outside quotes");
          }
        }
        if (inQuotes) {
          if (justClosedQuote) {
            if (ch === '"') {
              field += '"';
              justClosedQuote = false;
            } else {
              inQuotes = false;
              justClosedQuote = false;
              if (ch === ",") {
                row.push(field);
                field = "";
              } else if (ch === "\r") {
                sawCr = true;
              } else if (ch === "\n") {
                throw new Error("Unexpected bare LF outside quotes");
              } else {
                throw new Error(`Unexpected char '${ch}' after closing quote`);
              }
            }
          } else if (ch === '"') {
            justClosedQuote = true;
          } else {
            field += ch;
          }
        } else {
          if (ch === '"' && field === "") {
            inQuotes = true;
          } else if (ch === ",") {
            row.push(field);
            field = "";
          } else if (ch === "\r") {
            sawCr = true;
          } else if (ch === "\n") {
            throw new Error("Unexpected bare LF outside quotes");
          } else {
            field += ch;
          }
        }
      }
    },
    end() {
      if (sawCr) throw new Error("Trailing bare CR at EOF");
      if (inQuotes && !justClosedQuote) throw new Error("Unterminated quoted field at EOF");
      if (field.length > 0 || row.length > 0) finishRow();
    },
  };
}

const SPECIAL_ROWS = [
  { name: "陳大文 🦀 香港加油", email: "canton@example.com", title: "zero" },
  { name: "儲蓄小蟹仔🏠💰", email: "emoji@example.com", title: "retire" },
  { name: "點解咁好味🍜蟹", email: "dimsum@example.com", title: null },
  { name: "=CMD()|'/C calc'!A0", email: "=1+1@example.com", title: "=HYPERLINK()" },
  { name: "+1+1", email: "+cmd@example.com", title: "+2+2" },
  { name: "-2+3", email: "-cmd@example.com", title: "-3+3" },
  { name: "@SUM(1+1)", email: "@evil@example.com", title: "@AVG(1)" },
  { name: "\t=1+1", email: "\t+1@example.com", title: "\t@x" },
  { name: "\r=1+1", email: "\r-1@example.com", title: "\r+x" },
  { name: "Ming, Jr.", email: "comma,user@example.com", title: null },
  { name: 'He said "Hi"', email: 'quote"user@example.com', title: null },
  { name: "line1\nline2", email: "lf@example.com", title: null },
  { name: "line1\rline2", email: "cr@example.com", title: null },
];

const TOTAL_ROWS = 50123;
const EXACT_BATCH_WEEK = "2025-W01"; // exactly 1,000 rows for 2x500 boundary check

async function seedCsvDb() {
  const db = makeSqliteDB({ migrations: "0001+0002" });
  // Run ensureSchema once before bulk seeding so sil is added and schemaReady is cached
  await handle(new Request("https://game.test/api/health"), { DB: db });

  const ins = db._raw.prepare(`INSERT INTO scores (
    name, email, posted, score, stage, height, drops, wise, risky, missed,
    fall_spend, fall_scam, fall_delay, choices, habit, quiz, quiz_answered, quiz_answers,
    ended, week, month, created_at, updated_at, hidden, items, real_ms, quiz_prior,
    jackpot, troll_revive, troll_invest, troll_tickets, avatar, mtype, via, title, persona
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  db._raw.exec("BEGIN");
  try {
    for (let i = 0; i < TOTAL_ROWS; i++) {
      const sp = i < SPECIAL_ROWS.length ? SPECIAL_ROWS[i] : null;
      const isBatch1000 = i >= 100 && i < 1100;
      const week = isBatch1000 ? EXACT_BATCH_WEEK : (i % 2 === 0 ? "2026-W46" : "2026-W45");
      const month = isBatch1000 ? "2025-01" : (i % 2 === 0 ? "2026-11" : "2026-10");
      const posted = isBatch1000 ? 1 : (i < SPECIAL_ROWS.length ? 1 : (i % 3 === 0 ? 0 : 1));
      const hidden = isBatch1000 ? 0 : (i < SPECIAL_ROWS.length ? 0 : (i % 17 === 0 ? 1 : 0));
      const name = sp ? sp.name : `Crab#${i}`;
      const email = sp ? sp.email : (i % 4 === 0 ? `u${i}@example.com` : null);
      const title = sp ? sp.title : (i % 5 === 0 ? "zero" : null);
      ins.run(
        name, email, posted, 1000 + (i % 100) * 10, i % 4, 2.5, i % 4, 1, 0, 0,
        0, 0, 0, "[]", "buffer", 2, 3, "[]",
        "time", week, month, "2026-11-10T00:00:00.000Z", "2026-11-10T00:00:00.000Z", hidden,
        5, 120000, 0, 0, null, 0, null, i % 2 === 0 ? "jack" : "jackie", "SGPC", i % 5 === 0 ? "c" : null,
        title, "sub+grind",
      );
    }
    db._raw.exec("COMMIT");
  } catch (e) {
    db._raw.exec("ROLLBACK");
    throw e;
  }
  return db;
}

test("50,123-row streaming /api/admin/export produces valid BOM, CRLF, formula escaping, UTF-8, exact count, and bounded heap", async (t) => {
  const db = await seedCsvDb();
  try {
    const res = await handle(new Request("https://game.test/api/admin/export", { headers: AUTH }), { DB: db, ADMIN_TOKEN: TOKEN });
    assert.equal(res.status, 200);
    assert.match(res.headers.get("content-type") || "", /text\/csv; charset=utf-8/i);

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8", { fatal: true });
    let chunkCount = 0;
    let firstBytes = null;
    let header = null;
    let dataRows = 0;
    const capturedSpecial = new Map();

    const parser = createCsvStreamParser((fields) => {
      if (header === null) {
        header = fields;
        assert.deepEqual(header, EXPECTED_COLS);
        return;
      }
      assert.equal(fields.length, EXPECTED_COLS.length, `row ${dataRows + 1} column count mismatch`);
      dataRows++;
      const id = Number(fields[0]);
      if (id <= SPECIAL_ROWS.length) capturedSpecial.set(id, fields);
    });

    const baselineHeap = process.memoryUsage().heapUsed;
    let maxHeapDelta = 0;

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunkCount++;
      if (!firstBytes) {
        assert.ok(value.length >= 3);
        firstBytes = [value[0], value[1], value[2]];
        assert.deepEqual(firstBytes, [0xef, 0xbb, 0xbf], "missing UTF-8 BOM");
      }
      let text = decoder.decode(value, { stream: true });
      if (chunkCount === 1 && text.charCodeAt(0) === 0xfeff) text = text.slice(1);
      parser.push(text);
      const delta = process.memoryUsage().heapUsed - baselineHeap;
      if (delta > maxHeapDelta) maxHeapDelta = delta;
    }
    const tail = decoder.decode();
    if (tail) parser.push(tail);
    parser.end();

    assert.ok(chunkCount >= Math.ceil(TOTAL_ROWS / 500), `expected >= 101 chunks, got ${chunkCount}`);
    assert.equal(dataRows, TOTAL_ROWS);
    assert.ok(maxHeapDelta < 64 * 1024 * 1024, `heap delta too high: ${(maxHeapDelta / 1048576).toFixed(1)} MB`);
    t.diagnostic(`50,123-row export: chunks=${chunkCount}, maxHeapDelta=${(maxHeapDelta / 1048576).toFixed(2)} MB`);

    // Verify UTF-8 Cantonese/emojis, formula escaping, and RFC 4180 quoting verbatim
    assert.equal(capturedSpecial.get(1)[1], "陳大文 🦀 香港加油");
    assert.equal(capturedSpecial.get(2)[1], "儲蓄小蟹仔🏠💰");
    assert.equal(capturedSpecial.get(3)[1], "點解咁好味🍜蟹");
    for (let id = 4; id <= 9; id++) {
      const sp = SPECIAL_ROWS[id - 1];
      const rec = capturedSpecial.get(id);
      assert.equal(rec[1], "'" + sp.name, `name formula escape failed for row ${id}`);
      assert.equal(rec[2], "'" + sp.email, `email formula escape failed for row ${id}`);
      assert.equal(rec[35], "'" + sp.title, `title formula escape failed for row ${id}`);
    }
    assert.equal(capturedSpecial.get(10)[1], "Ming, Jr.");
    assert.equal(capturedSpecial.get(11)[1], 'He said "Hi"');
    assert.equal(capturedSpecial.get(12)[1], "line1\nline2");
    assert.equal(capturedSpecial.get(13)[1], "line1\rline2");
  } finally {
    db.close();
  }
});

test("filtered, exact 500-multiple (1,000 rows), 0-row, and filename-scoped exports stream cleanly", async () => {
  const db = await seedCsvDb();
  try {
    // 1) Filtered export: week=2026-W46&board=1&status=shown
    const expectedFiltered = (await db.prepare("SELECT COUNT(*) AS n FROM scores WHERE week = '2026-W46' AND posted = 1 AND hidden = 0").first()).n;
    const res1 = await handle(new Request("https://game.test/api/admin/export?week=2026-W46&board=1&status=shown", { headers: AUTH }), { DB: db, ADMIN_TOKEN: TOKEN });
    assert.equal(res1.status, 200);
    assert.match(res1.headers.get("content-disposition") || "", /3-fall-fun-scores-2026-W46-\d{4}-\d{2}-\d{2}\.csv/);

    let rows1 = 0, seenHeader1 = false;
    const p1 = createCsvStreamParser((fields) => {
      if (!seenHeader1) { seenHeader1 = true; assert.deepEqual(fields, EXPECTED_COLS); return; }
      assert.equal(fields[20], "2026-W46");
      assert.equal(fields[3], "1");
      assert.equal(fields[24], "0");
      rows1++;
    });
    const text1 = (await res1.text()).replace(/^\ufeff/, "");
    p1.push(text1);
    p1.end();
    assert.equal(rows1, expectedFiltered);

    // 2) Exact 500-multiple (1,000 rows)
    const res2 = await handle(new Request(`https://game.test/api/admin/export?week=${EXACT_BATCH_WEEK}`, { headers: AUTH }), { DB: db, ADMIN_TOKEN: TOKEN });
    assert.equal(res2.status, 200);
    let rows2 = 0, seenHeader2 = false;
    const p2 = createCsvStreamParser((fields) => {
      if (!seenHeader2) { seenHeader2 = true; return; }
      rows2++;
    });
    p2.push((await res2.text()).replace(/^\ufeff/, ""));
    p2.end();
    assert.equal(rows2, 1000);

    // 3) 0-row filter
    const res3 = await handle(new Request("https://game.test/api/admin/export?q=nonexistent_sentinel_999", { headers: AUTH }), { DB: db, ADMIN_TOKEN: TOKEN });
    assert.equal(res3.status, 200);
    const buf3 = new Uint8Array(await res3.arrayBuffer());
    assert.deepEqual([...buf3.slice(0, 3)], [0xef, 0xbb, 0xbf]);
    const text3 = new TextDecoder("utf-8").decode(buf3).replace(/^\ufeff/, "");
    assert.equal(text3, EXPECTED_HEADER + "\r\n");

    // 4) Scope filename cap (<= 32 chars)
    const longScope = "A".repeat(80);
    const res4 = await handle(new Request(`https://game.test/api/admin/export?week=${longScope}&q=nonexistent_sentinel_999`, { headers: AUTH }), { DB: db, ADMIN_TOKEN: TOKEN });
    assert.equal(res4.status, 200);
    const cd4 = res4.headers.get("content-disposition") || "";
    assert.ok(cd4.includes(`3-fall-fun-scores-${"A".repeat(32)}-`), `scope not capped to 32 chars: ${cd4}`);
    assert.equal(cd4.includes("A".repeat(33)), false);
  } finally {
    db.close();
  }
});
