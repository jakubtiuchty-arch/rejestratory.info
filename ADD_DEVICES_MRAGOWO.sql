-- Skrypt SQL do dodania urządzeń dla Nadleśnictwa Mrągowo
-- 14 urządzeń Posnet Temo
-- Ostatni przegląd: 12.11.2025
-- Następny przegląd: 12.11.2027

INSERT INTO devices (
  client_name,
  device_name,
  serial_number,
  last_inspection_date,
  next_inspection_date,
  created_at
) VALUES
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291857', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291772', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291813', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291867', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291781', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291804', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291777', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291773', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291852', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291784', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291785', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291805', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291563', '2025-11-12', '2027-11-12', NOW()),
  ('Nadleśnictwo Mrągowo', 'Posnet Temo', 'CAZ 1802291866', '2025-11-12', '2027-11-12', NOW());

-- Po wykonaniu tego skryptu:
-- - Wszystkie 14 urządzeń będą widoczne w Panelu Klienta
-- - Klienci będą mogli się zalogować dowolnym numerem seryjnym (np. CAZ 1802291857)
-- - Status wszystkich urządzeń: "Po przeglądzie" (zielony badge)
