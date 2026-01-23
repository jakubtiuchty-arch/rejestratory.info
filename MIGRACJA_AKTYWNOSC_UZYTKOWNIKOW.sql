-- Migracja: Śledzenie aktywności użytkowników w panelu handlowym
-- Data: 2026-01-23

CREATE TABLE IF NOT EXISTS user_activity (
  email TEXT PRIMARY KEY,
  user_name TEXT NOT NULL,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  is_online BOOLEAN DEFAULT true
);

-- Indeks na last_seen dla szybkiego sprawdzania kto jest online
CREATE INDEX IF NOT EXISTS idx_user_activity_last_seen ON user_activity(last_seen DESC);

-- RLS
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

-- Polityka: każdy może czytać
CREATE POLICY "Allow read for all" ON user_activity FOR SELECT USING (true);

-- Polityka: każdy może wstawiać/aktualizować
CREATE POLICY "Allow upsert for all" ON user_activity FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update for all" ON user_activity FOR UPDATE USING (true);
