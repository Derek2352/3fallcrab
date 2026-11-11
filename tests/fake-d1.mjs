// A stand-in for the D1 binding. It stores nothing: reads return empty result sets, writes report one row changed
// with a row id of 1. Pass { changes: 0 } to simulate a write the database refused (rate limit, or a conflict).
export function makeDB(opts = {}) {
  const forced = opts.changes;
  const make = (sql) => ({
    sql,
    bind: (...args) => make(sql),
    all: async () => ({ results: [] }),
    first: async () => null,
    run: async () => ({
      success: true,
      meta: { changes: forced !== undefined ? forced : (/^\s*(INSERT|UPDATE)/i.test(sql) ? 1 : 0), last_row_id: 1 },
    }),
  });
  return {
    prepare: (sql) => make(sql),
    batch: async (list) => (list || []).map(() => ({ success: true })),
    exec: async () => {},
  };
}
