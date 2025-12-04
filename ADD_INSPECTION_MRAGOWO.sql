-- Skrypt SQL do dodania protokołu przeglądu dla Nadleśnictwa Mrągowo
-- Data: 12.11.2025
-- Liczba urządzeń: 14

INSERT INTO inspections (
  client_name,
  inspection_date,
  device_count,
  pdf_url,
  created_at
) VALUES (
  'Nadleśnictwo Mrągowo',
  '2025-11-12',
  14,
  '/Przegląd_dwuletni_Nadleśnictwo_Mrągowo_2025.pdf',
  NOW()
);

-- Po wykonaniu tego skryptu protokół pojawi się w Panelu Klienta dla Nadleśnictwa Mrągowo
