-- Post-booth Daily Habit Tracker (/daily — Harbour Keep 海傍小天地)
CREATE TABLE IF NOT EXISTS daily_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uid TEXT NOT NULL UNIQUE,
  auth_hash TEXT NOT NULL,
  sync_code TEXT NOT NULL UNIQUE,
  name TEXT,
  email TEXT,
  note TEXT,
  avatar TEXT NOT NULL DEFAULT 'crab',
  sky TEXT NOT NULL DEFAULT 'auto',
  streak INTEGER NOT NULL DEFAULT 0,
  best_streak INTEGER NOT NULL DEFAULT 0,
  total_days INTEGER NOT NULL DEFAULT 0,
  shields INTEGER NOT NULL DEFAULT 0,
  shields_used INTEGER NOT NULL DEFAULT 0,
  rescues INTEGER NOT NULL DEFAULT 0,
  last_date TEXT,
  sprint_done_at TEXT,
  claimed_at TEXT,
  ip_hash TEXT,
  hidden INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS daily_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  day_date TEXT NOT NULL,
  week TEXT NOT NULL,
  month TEXT NOT NULL,
  day_num INTEGER NOT NULL,
  qid TEXT NOT NULL,
  first_pick TEXT NOT NULL,
  status TEXT NOT NULL,
  shield_saved INTEGER NOT NULL DEFAULT 0,
  streak_after INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(user_id, day_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_users_created ON daily_users (created_at);
CREATE INDEX IF NOT EXISTS idx_daily_users_board ON daily_users (hidden, total_days DESC, id DESC);
CREATE INDEX IF NOT EXISTS idx_daily_users_ip ON daily_users (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_daily_logs_date ON daily_logs (day_date);
CREATE INDEX IF NOT EXISTS idx_daily_logs_week ON daily_logs (week);
CREATE INDEX IF NOT EXISTS idx_daily_logs_month ON daily_logs (month);
CREATE INDEX IF NOT EXISTS idx_daily_logs_qid ON daily_logs (qid, status);
