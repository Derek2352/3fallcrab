-- Same schema the API creates on first use (server/api.js -> SCHEMA), kept here for `npm run db:migrate`.
CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  stage INTEGER NOT NULL DEFAULT 0,
  height REAL NOT NULL DEFAULT 0,
  drops INTEGER NOT NULL DEFAULT 0,
  wise INTEGER NOT NULL DEFAULT 0,
  risky INTEGER NOT NULL DEFAULT 0,
  missed INTEGER NOT NULL DEFAULT 0,
  fall_spend INTEGER NOT NULL DEFAULT 0,
  fall_scam INTEGER NOT NULL DEFAULT 0,
  fall_delay INTEGER NOT NULL DEFAULT 0,
  choices TEXT NOT NULL DEFAULT '[]',
  habit TEXT,
  quiz INTEGER,
  ended TEXT,
  week TEXT NOT NULL,
  created_at TEXT NOT NULL,
  ip_hash TEXT,
  hidden INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_scores_week ON scores (week, hidden, score DESC, id);
CREATE INDEX IF NOT EXISTS idx_scores_all ON scores (hidden, score DESC, id);
CREATE INDEX IF NOT EXISTS idx_scores_ip ON scores (ip_hash, created_at);
