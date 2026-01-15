# Konfiguracja przypomnień email

## 1. Zmienne środowiskowe

Dodaj do pliku `.env.local` (utwórz go jeśli nie istnieje):

```env
# Resend API Key (z dashboard.resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Sekretny klucz do autoryzacji cron joba (wymyśl dowolny)
CRON_SECRET=twoj-tajny-klucz-123

# Email na który będą wysyłane przypomnienia
ADMIN_EMAIL=jakub.tiuchty@gmail.com
```

## 2. Konfiguracja domeny w Resend

Upewnij się, że w Resend masz:
- Zweryfikowaną domenę `rejestratory.info`
- Lub zmień adres nadawcy w `app/api/reminders/send/route.ts` na domenę którą masz zweryfikowaną

## 3. Konfiguracja Cron Job

### Opcja A: cron-job.org (darmowe)

1. Zarejestruj się na https://cron-job.org
2. Utwórz nowy cron job:
   - **URL**: `https://rejestratory.info/api/reminders/send?secret=twoj-tajny-klucz-123`
   - **Schedule**: Codziennie o 8:00 rano
   - **Method**: GET

### Opcja B: Vercel Cron (jeśli hostujesz na Vercel)

Dodaj do `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/reminders/send?secret=twoj-tajny-klucz-123",
    "schedule": "0 8 * * *"
  }]
}
```

## 4. Testowanie

Możesz ręcznie przetestować endpoint:
```
https://rejestratory.info/api/reminders/send?secret=twoj-tajny-klucz-123
```

Odpowiedź:
```json
{
  "message": "Reminders processed",
  "sent": 5,
  "clients": 2
}
```

## 5. Jak to działa

1. Cron job uruchamia się codziennie o 8:00
2. Endpoint sprawdza widok `v_pending_reminders` (przypomnienia gdzie `reminder_date <= dziś` i `is_sent = false`)
3. Grupuje przypomnienia po kliencie
4. Wysyła jeden email per klient z listą urządzeń do przeglądu
5. Oznacza przypomnienia jako wysłane (`is_sent = true`)

## 6. Zmiana adresu email nadawcy

W pliku `app/api/reminders/send/route.ts` znajdź linię:
```typescript
from: 'Rejestratory.info <przypomnienia@rejestratory.info>',
```

I zmień na swoją zweryfikowaną domenę, np.:
```typescript
from: 'Przeglądy <noreply@twoja-domena.pl>',
```
