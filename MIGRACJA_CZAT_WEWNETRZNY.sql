-- =====================================================
-- MIGRACJA: Czat wewnętrzny dla panelu handlowego
-- =====================================================
-- Data: 22.01.2026
-- Opis: Tworzy tabelę dla wiadomości czatu między użytkownikami
-- =====================================================

-- Utwórz tabelę wiadomości czatu
CREATE TABLE IF NOT EXISTS internal_chat (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sender_email TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  message TEXT NOT NULL,
  read_by TEXT[] DEFAULT '{}'
);

-- Indeks dla szybszego pobierania wiadomości
CREATE INDEX IF NOT EXISTS idx_internal_chat_created_at ON internal_chat(created_at DESC);

-- Włącz RLS
ALTER TABLE internal_chat ENABLE ROW LEVEL SECURITY;

-- Polityka: wszyscy mogą czytać
CREATE POLICY "Allow read for all" ON internal_chat
  FOR SELECT USING (true);

-- Polityka: wszyscy mogą dodawać
CREATE POLICY "Allow insert for all" ON internal_chat
  FOR INSERT WITH CHECK (true);

-- Polityka: wszyscy mogą aktualizować (dla oznaczania jako przeczytane)
CREATE POLICY "Allow update for all" ON internal_chat
  FOR UPDATE USING (true);

-- =====================================================
-- INSTRUKCJA:
-- 1. Wykonaj ten skrypt w Supabase SQL Editor
-- 2. Po wykonaniu, czat będzie działał w panelu handlowym
-- =====================================================
