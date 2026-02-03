-- ============================================
-- MIGRACJA BAZY DANYCH - KATEGORIE W REGISTRATORS
-- ============================================
-- Wykonaj ten skrypt w Supabase SQL Editor
-- Data: 03.02.2026

-- 1. Dodanie kolumny category do tabeli registrators
ALTER TABLE registrators ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'rejestratory';

-- 2. Aktualizacja istniejących rekordów na podstawie nazwy urządzenia
-- Drukarki termiczne
UPDATE registrators SET category = 'drukarki_termiczne' 
WHERE device_name ILIKE '%ZQ%' 
   OR device_name ILIKE '%ZD%'
   OR device_name ILIKE '%Brother HL%'
   OR device_name ILIKE '%Brother DCP%';

-- Laptopy
UPDATE registrators SET category = 'laptopy' 
WHERE device_name ILIKE '%Lenovo%' 
   OR device_name ILIKE '%Dell Latitude%'
   OR device_name ILIKE '%HP ProBook%';

-- Monitory
UPDATE registrators SET category = 'monitory' 
WHERE device_name ILIKE '%Monitor%'
   OR device_name ILIKE '%Dell P%'
   OR device_name ILIKE '%Dell U%';

-- Serwery
UPDATE registrators SET category = 'serwery' 
WHERE device_name ILIKE '%PowerEdge%'
   OR device_name ILIKE '%ProLiant%';

-- All in One
UPDATE registrators SET category = 'all_in_one' 
WHERE device_name ILIKE '%AIO%'
   OR device_name ILIKE '%All in One%'
   OR device_name ILIKE '%Dell AIO%';

-- Urządzenia wielofunkcyjne
UPDATE registrators SET category = 'urzadzenia_wielofunkcyjne' 
WHERE device_name ILIKE '%Brother MFC%'
   OR device_name ILIKE '%Xerox%';

-- Drukarki laserowe
UPDATE registrators SET category = 'drukarki_laserowe' 
WHERE device_name ILIKE '%Brother HL-L%'
   OR device_name ILIKE '%Brother DCP-B%';

-- 3. Indeks dla szybszego wyszukiwania po kategorii
CREATE INDEX IF NOT EXISTS idx_registrators_category ON registrators(category);

-- ============================================
-- Sprawdzenie
-- ============================================
-- SELECT category, device_name, COUNT(*) FROM registrators GROUP BY category, device_name ORDER BY category;
