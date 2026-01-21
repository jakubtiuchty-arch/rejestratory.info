-- =====================================================
-- MIGRACJA: Dodanie kolumny gwarancji
-- =====================================================
-- Data: 21.01.2026
-- Opis: Dodaje kolumnę warranty do tabel sales_products i registrators
-- =====================================================

-- Dodaj kolumnę warranty do tabeli sales_products
ALTER TABLE sales_products 
ADD COLUMN IF NOT EXISTS warranty TEXT DEFAULT NULL;

-- Dodaj kolumnę warranty do tabeli registrators
ALTER TABLE registrators 
ADD COLUMN IF NOT EXISTS warranty TEXT DEFAULT NULL;

-- Komentarze do kolumn
COMMENT ON COLUMN sales_products.warranty IS 'Okres gwarancji w miesiącach: 12, 24, 36, 60 lub NULL (brak)';
COMMENT ON COLUMN registrators.warranty IS 'Okres gwarancji w miesiącach: 12, 24, 36, 60 lub NULL (brak)';

-- =====================================================
-- INSTRUKCJA:
-- 1. Wykonaj ten skrypt w Supabase SQL Editor
-- 2. Po wykonaniu, nowe produkty będą miały możliwość
--    zapisu gwarancji
-- =====================================================
