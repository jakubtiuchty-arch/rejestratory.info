-- ============================================
-- MIGRACJA BAZY DANYCH - PANEL HANDLOWY
-- ============================================
-- Wykonaj ten skrypt w Supabase SQL Editor
-- Data: 16.01.2026

-- 1. Tworzenie tabeli dla produktów sprzedanych
CREATE TABLE IF NOT EXISTS sales_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category TEXT NOT NULL, -- rejestratory, drukarki_termiczne, etc.
  device_type TEXT NOT NULL, -- np. "Zebra EM45", "Brother HL-L6210DW"
  serial_number TEXT NOT NULL,
  client_name TEXT NOT NULL,
  sale_date DATE NOT NULL,
  accessories TEXT[] DEFAULT '{}', -- tablica akcesoriów
  notes TEXT,
  added_by TEXT NOT NULL, -- email użytkownika który dodał
  
  -- Constraint na unikalność numeru seryjnego
  CONSTRAINT unique_serial_number UNIQUE (serial_number)
);

-- 2. Indeksy dla szybszego wyszukiwania
CREATE INDEX IF NOT EXISTS idx_sales_products_category ON sales_products(category);
CREATE INDEX IF NOT EXISTS idx_sales_products_client_name ON sales_products(client_name);
CREATE INDEX IF NOT EXISTS idx_sales_products_sale_date ON sales_products(sale_date);
CREATE INDEX IF NOT EXISTS idx_sales_products_added_by ON sales_products(added_by);

-- 3. RLS Policies (Row Level Security)
ALTER TABLE sales_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on sales_products" ON sales_products
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on sales_products" ON sales_products
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on sales_products" ON sales_products
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete on sales_products" ON sales_products
  FOR DELETE USING (true);

-- ============================================
-- Sprawdzenie
-- ============================================
-- SELECT * FROM sales_products;

-- ============================================
-- Przykładowe kategorie:
-- ============================================
-- rejestratory
-- drukarki_termiczne
-- drukarki_laserowe
-- laptopy
-- urzadzenia_wielofunkcyjne
-- monitory
-- serwery
-- all_in_one
