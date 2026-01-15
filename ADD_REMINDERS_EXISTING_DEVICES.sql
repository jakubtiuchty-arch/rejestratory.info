-- ============================================
-- DODANIE PRZYPOMNIEŃ DLA ISTNIEJĄCYCH URZĄDZEŃ
-- ============================================
-- Uruchom ten skrypt w Supabase SQL Editor
-- Ten skrypt doda przypomnienia dla wszystkich urządzeń,
-- które jeszcze nie mają przypomnienia w tabeli reminders
-- Data: 15.01.2026

-- Dodaj przypomnienia dla wszystkich urządzeń, które ich nie mają
INSERT INTO reminders (device_id, client_name, serial_number, reminder_date, reminder_type)
SELECT 
  d.id,
  d.client_name,
  d.serial_number,
  d.next_inspection_date - INTERVAL '14 days',
  CASE 
    WHEN d.last_inspection_date IS NULL THEN 'first_inspection'
    ELSE 'inspection_due'
  END
FROM devices d
WHERE NOT EXISTS (
  SELECT 1 FROM reminders r WHERE r.device_id = d.id
)
AND d.next_inspection_date IS NOT NULL;

-- Pokaż ile przypomnień zostało dodanych
SELECT 
  'Dodano przypomnienia dla urządzeń:' as info,
  COUNT(*) as count
FROM reminders;

-- Pokaż podsumowanie przypomnień per klient
SELECT 
  client_name,
  COUNT(*) as liczba_przypomnien,
  MIN(reminder_date) as najblizsze_przypomnienie,
  MAX(reminder_date) as najdalsze_przypomnienie
FROM reminders
GROUP BY client_name
ORDER BY najblizsze_przypomnienie;
