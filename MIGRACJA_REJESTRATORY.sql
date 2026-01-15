-- ============================================
-- MIGRACJA BAZY DANYCH - REJESTRATORY
-- ============================================
-- Wykonaj ten skrypt w Supabase SQL Editor
-- Data: 15.01.2026

-- 1. Tworzenie tabeli dla rejestratorów
CREATE TABLE IF NOT EXISTS registrators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_name TEXT NOT NULL,
  device_name TEXT NOT NULL,
  serial_number TEXT NOT NULL UNIQUE,
  purchase_date DATE NOT NULL,
  service_contract_years INTEGER, -- NULL = brak, 3 = 3 lata, 5 = 5 lat
  service_contract_end DATE, -- Data końca kontraktu (purchase_date + years)
  notes TEXT
);

-- 2. Dodanie kolumn kontraktu do istniejącej tabeli (jeśli tabela już istnieje)
ALTER TABLE registrators 
  ADD COLUMN IF NOT EXISTS service_contract_years INTEGER,
  ADD COLUMN IF NOT EXISTS service_contract_end DATE;

-- 3. Indeksy dla szybszego wyszukiwania
CREATE INDEX IF NOT EXISTS idx_registrators_client_name ON registrators(client_name);
CREATE INDEX IF NOT EXISTS idx_registrators_serial_number ON registrators(serial_number);
CREATE INDEX IF NOT EXISTS idx_registrators_purchase_date ON registrators(purchase_date);
CREATE INDEX IF NOT EXISTS idx_registrators_contract_end ON registrators(service_contract_end);

-- 4. RLS Policies (Row Level Security)
ALTER TABLE registrators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on registrators" ON registrators
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on registrators" ON registrators
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on registrators" ON registrators
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on registrators" ON registrators
  FOR DELETE USING (true);

-- ============================================
-- Sprawdzenie
-- ============================================
-- SELECT * FROM registrators;
