-- Same schema the API creates on first use (server/api.js -> SCHEMA and ADDED), kept here for `npm run db:migrate`.
-- The API adds any of the newer columns (posted ... updated_at) to an older table by itself, keeping every row.
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
  hidden INTEGER NOT NULL DEFAULT 0,
  posted INTEGER NOT NULL DEFAULT 1,   -- 1 = on the leaderboard; 0 = saved anonymously for the analysis
  email TEXT,                          -- optional, private: only for contacting winners; never shown publicly
  month TEXT,                          -- e.g. 2026-10, in the event's time zone
  quiz_answers TEXT,                   -- JSON [{"q":"mule","pick":1,"ok":1}, ...]
  quiz_answered INTEGER,
  gid TEXT,                            -- the game page's id for this game
  edit_hash TEXT,
  edits INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_scores_week ON scores (week, hidden, score DESC, id);
CREATE INDEX IF NOT EXISTS idx_scores_all ON scores (hidden, score DESC, id);
CREATE INDEX IF NOT EXISTS idx_scores_ip ON scores (ip_hash, created_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_scores_gid ON scores (gid);
CREATE INDEX IF NOT EXISTS idx_scores_month ON scores (month, hidden, score DESC, id);
