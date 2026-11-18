-- Additive summary() optimization: normalized child tables for choices & quiz_answers,
-- sync triggers, idempotent backfill, and covering partial indexes (WHERE hidden = 0).
-- Compatible with 0001_create_scores.sql (never references sil).

CREATE TABLE IF NOT EXISTS score_choices (
  score_id INTEGER NOT NULL,
  idx INTEGER NOT NULL,
  week TEXT NOT NULL,
  month TEXT,
  hidden INTEGER NOT NULL DEFAULT 0,
  card TEXT,
  pick TEXT,
  power TEXT,
  PRIMARY KEY (score_id, idx)
);

CREATE TABLE IF NOT EXISTS score_quiz_answers (
  score_id INTEGER NOT NULL,
  idx INTEGER NOT NULL,
  week TEXT NOT NULL,
  month TEXT,
  hidden INTEGER NOT NULL DEFAULT 0,
  q TEXT,
  pick INTEGER,
  ok INTEGER,
  PRIMARY KEY (score_id, idx)
);

CREATE INDEX IF NOT EXISTS idx_sc_card_all ON score_choices (hidden, card, pick) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_sc_card_week ON score_choices (hidden, week, card, pick) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_sc_card_month ON score_choices (hidden, month, card, pick) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_sc_power_all ON score_choices (hidden, power) WHERE hidden = 0 AND power IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sc_power_week ON score_choices (hidden, week, power) WHERE hidden = 0 AND power IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_sc_power_month ON score_choices (hidden, month, power) WHERE hidden = 0 AND power IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_sqa_all ON score_quiz_answers (hidden, q, pick, ok) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_sqa_week ON score_quiz_answers (hidden, week, q, pick, ok) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_sqa_month ON score_quiz_answers (hidden, month, q, pick, ok) WHERE hidden = 0;

CREATE INDEX IF NOT EXISTS idx_scores_qs_all ON scores (hidden, quiz, quiz_answered) WHERE hidden = 0 AND (quiz_answered = 3 OR (quiz_answered IS NULL AND quiz IS NOT NULL));
CREATE INDEX IF NOT EXISTS idx_scores_qs_week ON scores (hidden, week, quiz, quiz_answered) WHERE hidden = 0 AND (quiz_answered = 3 OR (quiz_answered IS NULL AND quiz IS NOT NULL));
CREATE INDEX IF NOT EXISTS idx_scores_qs_month ON scores (hidden, month, quiz, quiz_answered) WHERE hidden = 0 AND (quiz_answered = 3 OR (quiz_answered IS NULL AND quiz IS NOT NULL));

CREATE INDEX IF NOT EXISTS idx_scores_hb_all ON scores (hidden, habit) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_scores_hb_week ON scores (hidden, week, habit) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_scores_hb_month ON scores (hidden, month, habit) WHERE hidden = 0;

CREATE INDEX IF NOT EXISTS idx_scores_st_all ON scores (hidden, stage) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_scores_st_week ON scores (hidden, week, stage) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_scores_st_month ON scores (hidden, month, stage) WHERE hidden = 0;

CREATE INDEX IF NOT EXISTS idx_scores_mt_all ON scores (hidden, mtype) WHERE hidden = 0 AND mtype IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_scores_mt_week ON scores (hidden, week, mtype) WHERE hidden = 0 AND mtype IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_scores_mt_month ON scores (hidden, month, mtype) WHERE hidden = 0 AND mtype IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_scores_vc_week ON scores (hidden, week, month) WHERE hidden = 0 AND via = 'c';
CREATE INDEX IF NOT EXISTS idx_scores_vc_month ON scores (hidden, month) WHERE hidden = 0 AND via = 'c';

CREATE INDEX IF NOT EXISTS idx_scores_tt_all ON scores (hidden, title) WHERE hidden = 0 AND title IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_scores_tt_week ON scores (hidden, week, title) WHERE hidden = 0 AND title IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_scores_tt_month ON scores (hidden, month, title) WHERE hidden = 0 AND title IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_scores_ps_all ON scores (hidden, persona) WHERE hidden = 0 AND persona IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_scores_ps_week ON scores (hidden, week, persona) WHERE hidden = 0 AND persona IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_scores_ps_month ON scores (hidden, month, persona) WHERE hidden = 0 AND persona IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_scores_summary_week ON scores (hidden, week, month, posted, quiz_answered, quiz, habit, email, score, wise, risky, missed, fall_spend, fall_scam, fall_delay, avatar, quiz_prior, height, ended, troll_invest, troll_tickets, troll_revive) WHERE hidden = 0;
CREATE INDEX IF NOT EXISTS idx_scores_summary_month ON scores (hidden, month, week, posted, quiz_answered, quiz, habit, email, score, wise, risky, missed, fall_spend, fall_scam, fall_delay, avatar, quiz_prior, height, ended, troll_invest, troll_tickets, troll_revive) WHERE hidden = 0;

CREATE INDEX IF NOT EXISTS idx_scores_board_week ON scores (week, score DESC, id) WHERE hidden = 0 AND posted = 1;
CREATE INDEX IF NOT EXISTS idx_scores_board_all ON scores (score DESC, id) WHERE hidden = 0 AND posted = 1;
CREATE INDEX IF NOT EXISTS idx_scores_board_month ON scores (month, score DESC, id) WHERE hidden = 0 AND posted = 1;

CREATE TRIGGER IF NOT EXISTS trg_scores_ai_children AFTER INSERT ON scores
BEGIN
  INSERT OR IGNORE INTO score_choices (score_id, idx, week, month, hidden, card, pick, power)
  SELECT NEW.id, c.key, NEW.week, NEW.month, NEW.hidden,
    json_extract(c.value, '$.card'), json_extract(c.value, '$.pick'), json_extract(c.value, '$.power')
  FROM json_each(NEW.choices) c
  WHERE NEW.choices IS NOT NULL AND json_valid(NEW.choices) AND json_type(NEW.choices) = 'array'
    AND json_type(c.value) = 'object';

  INSERT OR IGNORE INTO score_quiz_answers (score_id, idx, week, month, hidden, q, pick, ok)
  SELECT NEW.id, a.key, NEW.week, NEW.month, NEW.hidden,
    json_extract(a.value, '$.q'), json_extract(a.value, '$.pick'), json_extract(a.value, '$.ok')
  FROM json_each(NEW.quiz_answers) a
  WHERE NEW.quiz_answers IS NOT NULL AND json_valid(NEW.quiz_answers) AND json_type(NEW.quiz_answers) = 'array'
    AND json_type(a.value) = 'object';
END;

CREATE TRIGGER IF NOT EXISTS trg_scores_au_meta AFTER UPDATE OF hidden, week, month ON scores
WHEN OLD.hidden IS NOT NEW.hidden OR OLD.week IS NOT NEW.week OR OLD.month IS NOT NEW.month
BEGIN
  UPDATE score_choices SET hidden = NEW.hidden, week = NEW.week, month = NEW.month WHERE score_id = NEW.id;
  UPDATE score_quiz_answers SET hidden = NEW.hidden, week = NEW.week, month = NEW.month WHERE score_id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_scores_au_choices AFTER UPDATE OF choices ON scores
WHEN OLD.choices IS NOT NEW.choices
BEGIN
  DELETE FROM score_choices WHERE score_id = OLD.id;
  INSERT OR IGNORE INTO score_choices (score_id, idx, week, month, hidden, card, pick, power)
  SELECT NEW.id, c.key, NEW.week, NEW.month, NEW.hidden,
    json_extract(c.value, '$.card'), json_extract(c.value, '$.pick'), json_extract(c.value, '$.power')
  FROM json_each(NEW.choices) c
  WHERE NEW.choices IS NOT NULL AND json_valid(NEW.choices) AND json_type(NEW.choices) = 'array'
    AND json_type(c.value) = 'object';
END;

CREATE TRIGGER IF NOT EXISTS trg_scores_au_qa AFTER UPDATE OF quiz_answers ON scores
WHEN OLD.quiz_answers IS NOT NEW.quiz_answers
BEGIN
  DELETE FROM score_quiz_answers WHERE score_id = OLD.id;
  INSERT OR IGNORE INTO score_quiz_answers (score_id, idx, week, month, hidden, q, pick, ok)
  SELECT NEW.id, a.key, NEW.week, NEW.month, NEW.hidden,
    json_extract(a.value, '$.q'), json_extract(a.value, '$.pick'), json_extract(a.value, '$.ok')
  FROM json_each(NEW.quiz_answers) a
  WHERE NEW.quiz_answers IS NOT NULL AND json_valid(NEW.quiz_answers) AND json_type(NEW.quiz_answers) = 'array'
    AND json_type(a.value) = 'object';
END;

CREATE TRIGGER IF NOT EXISTS trg_scores_ad_children AFTER DELETE ON scores
BEGIN
  DELETE FROM score_choices WHERE score_id = OLD.id;
  DELETE FROM score_quiz_answers WHERE score_id = OLD.id;
END;

INSERT OR IGNORE INTO score_choices (score_id, idx, week, month, hidden, card, pick, power)
SELECT s.id, c.key, s.week, s.month, s.hidden,
  json_extract(c.value, '$.card'), json_extract(c.value, '$.pick'), json_extract(c.value, '$.power')
FROM scores s, json_each(s.choices) c
WHERE s.choices IS NOT NULL AND s.choices != '[]' AND json_valid(s.choices) AND json_type(s.choices) = 'array'
  AND json_type(c.value) = 'object';

INSERT OR IGNORE INTO score_quiz_answers (score_id, idx, week, month, hidden, q, pick, ok)
SELECT s.id, a.key, s.week, s.month, s.hidden,
  json_extract(a.value, '$.q'), json_extract(a.value, '$.pick'), json_extract(a.value, '$.ok')
FROM scores s, json_each(s.quiz_answers) a
WHERE s.quiz_answers IS NOT NULL AND s.quiz_answers != '[]' AND json_valid(s.quiz_answers) AND json_type(s.quiz_answers) = 'array'
  AND json_type(a.value) = 'object';
