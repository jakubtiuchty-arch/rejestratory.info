-- Migracja: Dodanie kolumny service_contract
-- Data: 2026-01-22
-- Opis: Dodaje kolumnę "service_contract" do tabel sales_products i registrators
--       dla przechowywania informacji o kontrakcie serwisowym (3 lub 5 lat)

-- Dodaj kolumnę service_contract do tabeli sales_products
ALTER TABLE sales_products 
ADD COLUMN IF NOT EXISTS service_contract TEXT DEFAULT NULL;

COMMENT ON COLUMN sales_products.service_contract IS 'Kontrakt serwisowy: "3" lub "5" (lata)';

-- Dodaj kolumnę service_contract do tabeli registrators
ALTER TABLE registrators 
ADD COLUMN IF NOT EXISTS service_contract TEXT DEFAULT NULL;

COMMENT ON COLUMN registrators.service_contract IS 'Kontrakt serwisowy: "3" lub "5" (lata)';
