# Instrukcja dodawania nowych urządzeń

## 1. Migracja bazy danych

Przed pierwszym użyciem nowej funkcjonalności, wykonaj skrypt SQL w Supabase:

```sql
-- Pełny skrypt znajduje się w pliku: MIGRACJA_BAZY_URZADZENIA.sql
```

Skrypt dodaje:
- Kolumnę `fiscalization_date` do tabeli `devices`
- Tabelę `reminders` - automatyczne przypomnienia
- Tabelę `client_documents` - umowy i dokumenty
- Trigger automatycznie tworzący przypomnienie 14 dni przed terminem przeglądu

---

## 2. Dodawanie nowych urządzeń (Panel Admin)

### Dostęp: `/admin` → Zaloguj się → "Dodaj urządzenia"

### Kroki:
1. **Wpisz nazwę nadleśnictwa** (np. "Nadleśnictwo Mrągowo")
   - System podpowiada istniejących klientów
   
2. **Wybierz typ urządzenia:**
   - Posnet Pospay
   - Posnet Temo Online

3. **Wybierz datę fiskalizacji**
   - System automatycznie obliczy termin przeglądu (fiskalizacja + 24 miesiące)
   - Automatycznie utworzy przypomnienie na 14 dni przed terminem

4. **Wklej numery seryjne (N/U)**
   - Każdy numer w nowej linii
   - Możesz skopiować bezpośrednio z Excela
   - System wykrywa duplikaty

5. **Kliknij "Dodaj urządzenia"**

---

## 3. Status urządzeń w Panelu Klienta

| Status | Kolor | Opis |
|--------|-------|------|
| **NOWE** | 🔵 Niebieski | Nowe urządzenie bez przeglądu |
| **Po przeglądzie** | 🟢 Zielony | Przegląd wykonany, >90 dni do następnego |
| **Zbliża się przegląd** | 🟡 Żółty | ≤90 dni do terminu przeglądu |
| **Wymaga przeglądu** | 🔴 Czerwony | Przeterminowane |

### Co widzi klient:
- **Nowe urządzenia:** Data fiskalizacji + data wymaganego przeglądu
- **Po przeglądzie:** Data ostatniego + data następnego przeglądu
- **Protokoły:** Pojawiają się TYLKO po wykonaniu przeglądu
- **Dokumenty:** Umowy i inne dokumenty dodane przez admina

---

## 4. Dodawanie dokumentów (Umów)

### Dostęp: `/admin` → Zaloguj się → "Dokumenty klientów"

### Kroki:
1. Kliknij "Dodaj dokument"
2. Wybierz klienta (nadleśnictwo)
3. Wybierz typ: Umowa / Protokół / Inny
4. Wpisz nazwę dokumentu
5. Wklej link do pliku (Google Drive, Supabase Storage, itp.)
6. Opcjonalnie: dodaj notatki

---

## 5. Przypomnienia (automatyczne)

System automatycznie tworzy przypomnienia:
- **14 dni przed terminem przeglądu**
- Oddzielne dla urządzeń NOWYCH i PO PRZEGLĄDZIE

### Widok przypomnień (Supabase):
```sql
SELECT * FROM v_pending_reminders;
```

### Oznaczanie jako wysłane:
```sql
UPDATE reminders SET is_sent = TRUE, sent_at = NOW() WHERE id = 'xxx';
```

---

## 6. Struktura tabel

### devices (zaktualizowana)
| Kolumna | Typ | Opis |
|---------|-----|------|
| fiscalization_date | DATE | Data fiskalizacji (nowe urządzenia) |
| last_inspection_date | DATE (NULL) | NULL = urządzenie NOWE |
| next_inspection_date | DATE | Termin przeglądu |

### reminders (nowa)
| Kolumna | Typ | Opis |
|---------|-----|------|
| device_id | UUID | Powiązanie z urządzeniem |
| reminder_date | DATE | Kiedy wysłać (14 dni przed) |
| reminder_type | TEXT | 'first_inspection' / 'inspection_due' |
| is_sent | BOOLEAN | Czy wysłano |

### client_documents (nowa)
| Kolumna | Typ | Opis |
|---------|-----|------|
| client_name | TEXT | Nazwa nadleśnictwa |
| document_type | TEXT | 'contract' / 'protocol' / 'other' |
| document_url | TEXT | Link do dokumentu |
