-- ============================================
-- MIGRACJA BAZY DANYCH - NOWE URZĄDZENIA
-- ============================================
-- Wykonaj ten skrypt w Supabase SQL Editor
-- Data: 15.01.2026

-- 1. Dodanie kolumny fiscalization_date do tabeli devices
ALTER TABLE devices 
ADD COLUMN IF NOT EXISTS fiscalization_date DATE;

-- 2. Ustawienie last_inspection_date jako opcjonalne (może być NULL dla nowych urządzeń)
ALTER TABLE devices 
ALTER COLUMN last_inspection_date DROP NOT NULL;

-- 3. Tworzenie tabeli dla przypomnień
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  device_id UUID REFERENCES devices(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  serial_number TEXT NOT NULL,
  reminder_date DATE NOT NULL,
  reminder_type TEXT NOT NULL DEFAULT 'inspection_due', -- 'inspection_due', 'first_inspection'
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(device_id, reminder_type)
);

-- 4. Tworzenie tabeli dla dokumentów klienta (umowy)
CREATE TABLE IF NOT EXISTS client_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  client_name TEXT NOT NULL,
  document_type TEXT NOT NULL, -- 'contract', 'protocol', 'other'
  document_name TEXT NOT NULL,
  document_url TEXT NOT NULL,
  uploaded_by TEXT,
  notes TEXT
);

-- 5. Indeksy dla szybszego wyszukiwania
CREATE INDEX IF NOT EXISTS idx_devices_fiscalization_date ON devices(fiscalization_date);
CREATE INDEX IF NOT EXISTS idx_reminders_reminder_date ON reminders(reminder_date);
CREATE INDEX IF NOT EXISTS idx_reminders_is_sent ON reminders(is_sent);
CREATE INDEX IF NOT EXISTS idx_client_documents_client_name ON client_documents(client_name);

-- 6. Funkcja do automatycznego tworzenia przypomnienia przy dodawaniu urządzenia
CREATE OR REPLACE FUNCTION create_inspection_reminder()
RETURNS TRIGGER AS $$
BEGIN
  -- Oblicz datę przypomnienia (14 dni przed next_inspection_date)
  INSERT INTO reminders (device_id, client_name, serial_number, reminder_date, reminder_type)
  VALUES (
    NEW.id,
    NEW.client_name,
    NEW.serial_number,
    NEW.next_inspection_date - INTERVAL '14 days',
    CASE 
      WHEN NEW.last_inspection_date IS NULL THEN 'first_inspection'
      ELSE 'inspection_due'
    END
  )
  ON CONFLICT (device_id, reminder_type) 
  DO UPDATE SET 
    reminder_date = NEW.next_inspection_date - INTERVAL '14 days',
    is_sent = FALSE;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Trigger do automatycznego tworzenia przypomnienia
DROP TRIGGER IF EXISTS trigger_create_inspection_reminder ON devices;
CREATE TRIGGER trigger_create_inspection_reminder
  AFTER INSERT OR UPDATE OF next_inspection_date ON devices
  FOR EACH ROW
  EXECUTE FUNCTION create_inspection_reminder();

-- ============================================
-- WIDOK pomocniczy - urządzenia wymagające przypomnienia
-- ============================================
CREATE OR REPLACE VIEW v_pending_reminders AS
SELECT 
  r.*,
  d.device_name,
  d.next_inspection_date,
  d.fiscalization_date,
  d.last_inspection_date
FROM reminders r
JOIN devices d ON r.device_id = d.id
WHERE r.is_sent = FALSE 
  AND r.reminder_date <= CURRENT_DATE;

-- ============================================
-- Przykładowe zapytanie - urządzenia do wysłania przypomnienia
-- ============================================
-- SELECT * FROM v_pending_reminders;

-- ============================================
-- RLS Policies (Row Level Security)
-- ============================================
-- Upewnij się że RLS jest włączone
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;

-- Polityka dla reminders - dostęp publiczny do odczytu (dla API)
CREATE POLICY "Allow public read on reminders" ON reminders
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on reminders" ON reminders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on reminders" ON reminders
  FOR UPDATE USING (true);

-- Polityka dla client_documents
CREATE POLICY "Allow public read on client_documents" ON client_documents
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert on client_documents" ON client_documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public delete on client_documents" ON client_documents
  FOR DELETE USING (true);
