# Instrukcja dodawania protokołu przeglądu - Nadleśnictwo Mrągowo

## Krok 1: Przygotowanie pliku PDF

1. **Skopiuj plik PDF** do folderu `/public`:
   ```bash
   cp /ścieżka/do/Przegląd_dwuletni_Nadleśnictwo_Mrągowo_2025.pdf public/
   ```

   Lub ręcznie:
   - Otwórz folder projektu w Finderze
   - Wejdź do folderu `public`
   - Przeciągnij tam plik `Przegląd_dwuletni_Nadleśnictwo_Mrągowo_2025.pdf`

2. **Sprawdź czy plik jest w miejscu:**
   ```bash
   ls public/Przegląd_dwuletni_Nadleśnictwo_Mrągowo_2025.pdf
   ```

## Krok 2: Dodanie wpisu do bazy Supabase

### Opcja A - Przez Supabase Dashboard (polecam):

1. **Otwórz Supabase:**
   - Wejdź na: https://supabase.com/dashboard
   - Zaloguj się
   - Wybierz swój projekt

2. **Przejdź do SQL Editor:**
   - W menu bocznym kliknij "SQL Editor"
   - Kliknij "+ New query"

3. **Wklej i wykonaj skrypt:**
   - Otwórz plik `ADD_INSPECTION_MRAGOWO.sql`
   - Skopiuj całą zawartość
   - Wklej do SQL Editora
   - Kliknij "Run" (lub Ctrl/Cmd + Enter)

4. **Sprawdź wynik:**
   - Powinieneś zobaczyć komunikat "Success. No rows returned"
   - To normalne - INSERT nie zwraca wierszy

### Opcja B - Przez Table Editor (alternatywa):

1. **Otwórz Table Editor:**
   - W Supabase Dashboard kliknij "Table Editor"
   - Wybierz tabelę `inspections`

2. **Dodaj nowy wiersz:**
   - Kliknij "+ Insert row"
   - Wypełnij pola:
     - `client_name`: `Nadleśnictwo Mrągowo`
     - `inspection_date`: `2025-11-12`
     - `device_count`: `14`
     - `pdf_url`: `/Przegląd_dwuletni_Nadleśnictwo_Mrągowo_2025.pdf`
     - `created_at`: zostaw puste (auto-uzupełni się)
   - Kliknij "Save"

## Krok 3: Weryfikacja

1. **Zaloguj się do Panelu Klienta:**
   - Otwórz: http://localhost:3004/panel-klienta
   - Wprowadź numer seryjny urządzenia z Nadleśnictwa Mrągowo

2. **Sprawdź sekcję "Protokoły przeglądów":**
   - Powinieneś zobaczyć nowy wpis: **12 listopada 2025**
   - Liczba urządzeń: **14 urządzeń**
   - Przycisk **PDF** powinien być aktywny (zielony)

3. **Przetestuj pobieranie PDF:**
   - Kliknij przycisk "PDF"
   - PDF powinien się otworzyć w nowej karcie

## 🎉 Gotowe!

Protokół jest teraz dostępny dla wszystkich urządzeń z Nadleśnictwa Mrągowo.

## 📝 Uwagi:

- **Nazwa pliku PDF**: Upewnij się, że nazwa pliku w `pdf_url` dokładnie pasuje do nazwy pliku w folderze `/public`
- **Wielkie/małe litery**: Nazwy plików są case-sensitive (na serwerach Linux)
- **Znaki specjalne**: Unikaj polskich znaków w nazwach plików (ą, ę, ł itp.) - mogą powodować problemy
- **Data**: Format daty w bazie to YYYY-MM-DD (rok-miesiąc-dzień)

## 🔄 Dodawanie kolejnych protokołów:

Możesz użyć tego samego procesu dla innych przeglądów. Wystarczy:
1. Zmienić wartości w pliku SQL (data, nadleśnictwo, liczba urządzeń, nazwa PDF)
2. Dodać odpowiedni plik PDF do `/public`
3. Wykonać SQL w Supabase
