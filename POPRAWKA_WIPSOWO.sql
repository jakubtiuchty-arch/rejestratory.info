-- ============================================
-- POPRAWKA NAZWY KLIENTA
-- ============================================
-- Zmiana "Nadleśnictwo Wpisowo" na "Nadleśnictwo Wipsowo"
-- Wykonaj ten skrypt w Supabase SQL Editor

-- 1. Poprawka w tabeli devices (urządzenia fiskalne)
UPDATE devices 
SET client_name = 'Nadleśnictwo Wipsowo'
WHERE client_name = 'Nadleśnictwo Wpisowo';

-- 2. Poprawka w tabeli registrators (rejestratory)
UPDATE registrators 
SET client_name = 'Nadleśnictwo Wipsowo'
WHERE client_name = 'Nadleśnictwo Wpisowo';

-- 3. Poprawka w tabeli inspections (protokoły przeglądów)
UPDATE inspections 
SET client_name = 'Nadleśnictwo Wipsowo'
WHERE client_name = 'Nadleśnictwo Wpisowo';

-- 4. Poprawka w tabeli client_documents (dokumenty klienta)
UPDATE client_documents 
SET client_name = 'Nadleśnictwo Wipsowo'
WHERE client_name = 'Nadleśnictwo Wpisowo';

-- 5. Poprawka w tabeli reminders (przypomnienia)
UPDATE reminders 
SET client_name = 'Nadleśnictwo Wipsowo'
WHERE client_name = 'Nadleśnictwo Wpisowo';

-- ============================================
-- Sprawdzenie
-- ============================================
SELECT 'devices' as tabela, COUNT(*) as zmienione FROM devices WHERE client_name = 'Nadleśnictwo Wipsowo'
UNION ALL
SELECT 'registrators', COUNT(*) FROM registrators WHERE client_name = 'Nadleśnictwo Wipsowo'
UNION ALL
SELECT 'inspections', COUNT(*) FROM inspections WHERE client_name = 'Nadleśnictwo Wipsowo'
UNION ALL
SELECT 'client_documents', COUNT(*) FROM client_documents WHERE client_name = 'Nadleśnictwo Wipsowo'
UNION ALL
SELECT 'reminders', COUNT(*) FROM reminders WHERE client_name = 'Nadleśnictwo Wipsowo';
