-- =============================================================
-- MIGRACJA: Dodanie kolumny forestry_unit (leśnictwo) do tabeli devices
-- =============================================================
-- 
-- Kolumna forestry_unit przechowuje nazwę leśnictwa (jednostki terenowej)
-- w ramach nadleśnictwa. Każde nadleśnictwo może mieć wiele leśnictw.
--
-- Przykład struktury:
--   Nadleśnictwo Mrągowo (client_name)
--     └── Leśnictwo Rybaki (forestry_unit)
--     └── Leśnictwo Kosewo (forestry_unit)
--     └── Leśnictwo Sorkwity (forestry_unit)
--
-- =============================================================

-- 1. Dodaj nową kolumnę forestry_unit do tabeli devices
ALTER TABLE devices 
ADD COLUMN IF NOT EXISTS forestry_unit TEXT;

-- 2. Dodaj komentarz opisujący kolumnę (opcjonalnie)
COMMENT ON COLUMN devices.forestry_unit IS 'Nazwa leśnictwa - jednostki terenowej podległej nadleśnictwu (client_name)';

-- 3. Opcjonalnie: Utwórz indeks dla szybszego wyszukiwania po leśnictwie
CREATE INDEX IF NOT EXISTS idx_devices_forestry_unit ON devices(forestry_unit);

-- =============================================================
-- PO WYKONANIU:
-- - Kolumna forestry_unit będzie dostępna dla wszystkich urządzeń
-- - Początkowo wartość będzie NULL (nieprzypisane)
-- - Użytkownicy będą mogli przypisywać leśnictwa przez Panel Klienta
-- =============================================================

