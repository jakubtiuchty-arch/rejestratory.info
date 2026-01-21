-- =====================================================
-- MIGRACJA: Dodanie pola client_email do tabel
-- Data: 2026-01-21
-- =====================================================

-- Dodaj kolumnę client_email do tabeli sales_products
ALTER TABLE sales_products 
ADD COLUMN IF NOT EXISTS client_email TEXT DEFAULT NULL;

-- Dodaj kolumnę client_email do tabeli registrators
ALTER TABLE registrators 
ADD COLUMN IF NOT EXISTS client_email TEXT DEFAULT NULL;

-- Komentarze
COMMENT ON COLUMN sales_products.client_email IS 'Email administratora / osoby kontaktowej u klienta (opcjonalny)';
COMMENT ON COLUMN registrators.client_email IS 'Email administratora / osoby kontaktowej u klienta (opcjonalny)';

-- =====================================================
-- WERYFIKACJA
-- =====================================================
-- Po wykonaniu migracji sprawdź:
-- 1. SELECT column_name FROM information_schema.columns WHERE table_name = 'sales_products';
-- 2. SELECT column_name FROM information_schema.columns WHERE table_name = 'registrators';
