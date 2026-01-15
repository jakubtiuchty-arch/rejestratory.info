-- Skrypt SQL do dodania urządzeń dla Nadleśnictwa Bierzwnik
-- 11 urządzeń Posnet Temo Online
-- Data fiskalizacji: 15.01.2026
-- Następny przegląd: 15.01.2028 (24 miesiące od fiskalizacji)
-- NOWE URZĄDZENIA - bez przeglądu

INSERT INTO devices (
  client_name,
  device_name,
  serial_number,
  fiscalization_date,
  last_inspection_date,
  next_inspection_date,
  created_at
) VALUES
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150001', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150002', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150003', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150004', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150005', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150006', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150007', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150008', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150009', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150010', '2026-01-15', NULL, '2028-01-15', NOW()),
  ('Nadleśnictwo Bierzwnik', 'Posnet Temo Online', 'CAZ 2501150011', '2026-01-15', NULL, '2028-01-15', NOW());

-- Po wykonaniu tego skryptu:
-- - Wszystkie 11 urządzeń będą widoczne w Panelu Klienta jako NOWE
-- - Klienci będą mogli się zalogować dowolnym numerem seryjnym
-- - Status wszystkich urządzeń: "NOWE" (niebieski badge)
-- - Przegląd wymagany do: 15.01.2028
-- - Zarobek: 11 × 150 zł = 1650 zł
