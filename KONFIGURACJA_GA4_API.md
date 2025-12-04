# Konfiguracja Google Analytics Data API

## Krok 1: Google Cloud Console - Utworzenie projektu

1. **Przejdź do Google Cloud Console:**
   - Otwórz: https://console.cloud.google.com/
   - Zaloguj się tym samym kontem Google, które ma dostęp do GA4

2. **Utwórz nowy projekt (lub wybierz istniejący):**
   - Kliknij na nazwę projektu w górnym pasku
   - Kliknij "NEW PROJECT" / "NOWY PROJEKT"
   - Nazwa: `katalog-it-lasy-analytics` (lub dowolna)
   - Kliknij "CREATE" / "UTWÓRZ"
   - Poczekaj aż projekt się utworzy (ok. 30 sekund)

## Krok 2: Włączenie Google Analytics Data API

1. **Przejdź do API & Services:**
   - W menu nawigacji (☰) wybierz "APIs & Services" → "Library"
   - Lub bezpośrednio: https://console.cloud.google.com/apis/library

2. **Wyszukaj i włącz API:**
   - W polu wyszukiwania wpisz: `Google Analytics Data API`
   - Kliknij na "Google Analytics Data API"
   - Kliknij przycisk "ENABLE" / "WŁĄCZ"
   - Poczekaj na aktywację (kilka sekund)

## Krok 3: Utworzenie Service Account

1. **Przejdź do Credentials:**
   - W menu "APIs & Services" wybierz "Credentials"
   - Lub: https://console.cloud.google.com/apis/credentials

2. **Utwórz Service Account:**
   - Kliknij "+ CREATE CREDENTIALS" → "Service account"
   - **Service account name:** `ga4-data-reader` (lub dowolna nazwa)
   - **Service account ID:** automatycznie uzupełni się
   - **Description:** "Service account for reading GA4 data"
   - Kliknij "CREATE AND CONTINUE"

3. **Przypisz rolę (opcjonalne na tym etapie):**
   - Możesz pominąć - kliknij "CONTINUE"
   - Następnie "DONE"

## Krok 4: Wygenerowanie klucza JSON

1. **Znajdź utworzony Service Account:**
   - W zakładce "Credentials" znajdź sekcję "Service Accounts"
   - Kliknij na email service account (np. `ga4-data-reader@...`)

2. **Wygeneruj klucz:**
   - Przejdź do zakładki "KEYS"
   - Kliknij "ADD KEY" → "Create new key"
   - Wybierz typ: **JSON**
   - Kliknij "CREATE"
   - **Plik JSON zostanie automatycznie pobrany** na Twój komputer
   - ⚠️ **WAŻNE:** Zapisz ten plik bezpiecznie! Nie będziesz mógł go ponownie pobrać

3. **Skopiuj email Service Account:**
   - Z górnej części strony skopiuj email (np. `ga4-data-reader@katalog-it-lasy-analytics.iam.gserviceaccount.com`)
   - Będzie potrzebny w następnym kroku

## Krok 5: Dodanie dostępu do Google Analytics

1. **Przejdź do Google Analytics:**
   - Otwórz: https://analytics.google.com/
   - Zaloguj się na swoje konto

2. **Wybierz właściwość:**
   - Przejdź do Admin (ikona koła zębatego w lewym dolnym rogu)
   - Upewnij się, że wybrałeś właściwość z ID: **G-FDR8NNEMJN**

3. **Dodaj użytkownika:**
   - W kolumnie "Property" kliknij "Property Access Management"
   - Kliknij niebieski przycisk "+" w prawym górnym rogu
   - Wybierz "Add users"

4. **Wklej email Service Account:**
   - W pole "Email addresses" wklej skopiowany wcześniej email service account
   - Np: `ga4-data-reader@katalog-it-lasy-analytics.iam.gserviceaccount.com`

5. **Ustaw uprawnienia:**
   - Zaznacz: **"Viewer"** (wystarczy do odczytu danych)
   - Odznacz "Notify new users by email" (to bot, nie potrzebuje emaila)
   - Kliknij "Add" / "Dodaj"

## Krok 6: Konfiguracja w projekcie Next.js

1. **Umieść plik JSON w projekcie:**
   ```bash
   # Przenieś pobrany plik JSON do katalogu projektu
   # WAŻNE: Zmień nazwę na coś prostszego
   mv ~/Downloads/katalog-it-lasy-*.json ./ga4-service-account.json
   ```

2. **Dodaj do .gitignore:**
   ```bash
   echo "ga4-service-account.json" >> .gitignore
   ```

3. **Dodaj zmienną środowiskową do .env.local:**
   ```env
   # Dodaj na końcu pliku .env.local
   GOOGLE_APPLICATION_CREDENTIALS=./ga4-service-account.json
   GA4_PROPERTY_ID=424588076
   ```

   **Jak znaleźć GA4_PROPERTY_ID:**
   - Przejdź do https://analytics.google.com/
   - Admin → Property Settings
   - Na górze zobaczysz "Property ID" (liczba, np. 424588076)
   - Lub użyj URL: w URL analytics zobaczysz `/p424588076/` - to jest Twoje Property ID

## Krok 7: Weryfikacja

**Sprawdź czy plik JSON zawiera:**
```json
{
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "ga4-data-reader@....iam.gserviceaccount.com",
  ...
}
```

**Sprawdź czy .env.local zawiera:**
```env
NEXT_PUBLIC_ADMIN_PASSWORD=TwojeHasloAdmin123!
GOOGLE_APPLICATION_CREDENTIALS=./ga4-service-account.json
GA4_PROPERTY_ID=424588076
```

## ✅ Gotowe!

Teraz Twoja aplikacja może pobierać dane z Google Analytics 4.

## 🔐 Bezpieczeństwo

### Lokalnie (development):
- ✅ Plik JSON w `.gitignore`
- ✅ Nie commituj pliku JSON do Git!
- ✅ `.env.local` też jest w `.gitignore`

### Produkcja (Vercel/inne):
**Nie uploaduj pliku JSON na serwer!** Zamiast tego:

1. **Otwórz plik JSON** i skopiuj całą jego zawartość
2. **W Vercel (lub innym hostingu):**
   - Przejdź do ustawień projektu
   - Environment Variables
   - Dodaj zmienną: `GA4_SERVICE_ACCOUNT_JSON`
   - Wklej całą zawartość pliku JSON jako wartość
3. **Dodaj również:**
   - `GA4_PROPERTY_ID` = `424588076`

Kod API będzie automatycznie używał tych zmiennych.

## 🆘 Troubleshooting

### Błąd: "Permission denied"
- Sprawdź czy Service Account ma dostęp w Google Analytics (Krok 5)
- Upewnij się, że ustawiłeś rolę "Viewer"

### Błąd: "Property not found"
- Sprawdź czy `GA4_PROPERTY_ID` jest poprawne (to liczba, nie G-...)
- Property ID znajdziesz w Admin → Property Settings

### Błąd: "Invalid credentials"
- Sprawdź czy plik JSON nie został uszkodzony
- Wygeneruj nowy klucz JSON

### Błąd: "API not enabled"
- Wróć do Kroku 2 i włącz Google Analytics Data API

## 📚 Przydatne linki:

- Google Cloud Console: https://console.cloud.google.com/
- Google Analytics: https://analytics.google.com/
- GA4 Data API Docs: https://developers.google.com/analytics/devguides/reporting/data/v1
- Vercel Env Variables: https://vercel.com/docs/environment-variables
