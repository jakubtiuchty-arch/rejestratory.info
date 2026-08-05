# PLAYBOOK — cotygodniowy newsletter dla nadleśnictw

## Rytm tygodnia
1. **Poniedziałek (przygotowanie)** — powstaje nowe wydanie z kolejnym urządzeniem z `QUEUE.md`;
   plik `public/newsletter/editions/RRRR-MM-DD-slug.html` + aktualizacja `public/newsletter/manifest.json`
   (`file` + `bulkAt` = wtorek 8:30 czasu PL, ISO z offsetem). Commit + push na `main` (deploy Vercel).
2. **Poniedziałek 9:00 PL** — cron Vercel `/api/cron/newsletter-test` wysyła testówkę
   `[TEST — zatwierdź]` do jakub.tiuchty@takma.com.pl z żółtym pasem i przyciskiem akceptacji.
3. **Akceptacja** — Jakub klika „Zatwierdź wysyłkę" → `/api/newsletter/approve` pokazuje
   podsumowanie (plik, liczba odbiorców, termin) → „Potwierdzam — wysyłaj" planuje wysyłkę
   przez Resend `scheduledAt`. Idempotencja: tabela `newsletter_sends` (drugi klik nic nie robi).
4. **Wtorek 8:30** — Resend wypuszcza bulk (~156 adresów; lista na żywo z Supabase:
   registrators + sales_products + inspections, normalizacja literówek domen LP, dedup).

## Jak zbudować wydanie
- **Baza**: poprzednie wydanie z `editions/` (finalny, zaakceptowany design — NIE zmieniać layoutu).
- **Podmienić**: `<title>` (= temat maila), preheader, H1 w ciemnym bloku, lead (2-3 zdania,
  konkrety z karty produktu w repo `app/produkt/<slug>/page.tsx`), 4 zdjęcia galerii,
  7 wierszy specyfikacji, blok ceny (kwota netto — a gdy „cena na zapytanie":
  wariant „Wycena indywidualna" jak w wydaniu EM45), linki produktowe, listę „po stronie TAKMA".
- **Bez zmian**: nagłówek (logo TAKMA lewa / rejestratory.info prawa), hero
  `las-it-anim.gif` (animowany brand-asset), sekcja „Pełna oferta IT dla nadleśnictw",
  czarny baner Apple, stopka.
- **Zdjęcia produktu**: PNG (nie webp!) w `public/newsletter/`, maks. ~800 px, `sips`/PIL;
  przy podmianie istniejącego pliku pod tym samym URL — dodać `?v=N` (cache proxy Gmaila).
- **Zasady treści**: poprawna polszczyzna, zero AI-slopu (bez kolorowych border-left,
  bez pigułek-badge), konkrety i liczby zamiast ogólników, fakty tylko z karty produktu w repo.

## Awaryjnie / ręcznie
- Test od ręki: `curl -H "Authorization: Bearer $CRON_SECRET" https://www.rejestratory.info/api/cron/newsletter-test`
- Wysyłka ręczna (poza pipeline): `node scripts/send-newsletter.mjs <plik.html> --send --send-at "<ISO>"`
  (czyta lokalne `.env.local`; zapisuje ID maili do `scheduled-*.json` — anulowanie `resend.emails.cancel(id)`).
- Anulowanie zaplanowanego bulku: ID nie są zapisywane w pipeline — anulować można
  do godziny wysyłki przez Resend API po `email_id` z logów `[newsletter-approve]`
  (Vercel logs) lub napisać do Claude.

## Śledzenie skuteczności (od wydania 2)
- Resend: open + click tracking WŁĄCZONE dla domeny rejestratory.info (2026-08-05, przez API).
  Po wysyłce raport per adres: skan `resend.emails.get(id)` po ID z logów — listę „kto kliknął"
  robi Claude na prośbę (wzorzec: sesja 2026-08-05).
- Linki w wydaniach dostają UTM: `utm_source=newsletter&utm_medium=email&utm_campaign=<slug>-<data>`
  (ruch widoczny w GA4 jako kampania). Dodawać przy budowie każdego wydania.
