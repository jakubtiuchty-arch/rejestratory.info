# Kolejka urządzeń tygodnia — newsletter dla nadleśnictw

Format: data poniedziałku (przygotowanie) → urządzenie. Wysyłka bulk: wtorek 8:30.
Wydanie budowane wg `newsletter/PLAYBOOK.md`, plik trafia do `public/newsletter/editions/RRRR-MM-DD-slug.html`,
a `public/newsletter/manifest.json` wskazuje bieżące wydanie.

| Poniedziałek | Urządzenie | Strona produktu | Status |
|---|---|---|---|
| 2026-08-04 | Posnet Pospay 2 | /produkt/posnet-pospay-2 | wysłane (bulk 05.08 8:30) |
| 2026-08-11 | Zebra EM45 | /produkt/zebra-em45 | wysłane (bulk 12.08 8:30) — 587/588 dostarczonych, 5 kliknięć |
| 2026-08-17 | Dell Pro 16 Plus | /produkt/dell-pro-16-plus | ZATWIERDZONE — zaplanowane 603 maile na 18.08 8:30 |
| 2026-08-24 | Monitory Dell Pro (P2725HE) | /produkt/dell-pro-27-plus-p2725he-usbc | ZATWIERDZONE — 602 maile zaplanowane na 25.08 8:30 |
| 2026-08-31 | Apple iPhone 17 Pro i iPad Pro | /produkt/iphone-17-pro | ZAPLANOWANE ręcznie — 603 maile na **środę 02.09 8:30**. ID w `scheduled-2026-09-02.json`. **Nie zatwierdzać testówki z poniedziałku** — wysyłka jest już w Resend, drugie zatwierdzenie wysłałoby duplikat (rezerwacja w `newsletter_sends` blokuje, ale nie ryzykować). |
| 2026-09-07 | Urządzenia wielofunkcyjne Brother (wiodący MFC-L8900CDW) | /kategoria/urzadzenia-wielofunkcyjne | ZAPLANOWANE ręcznie 04.09 (po akceptacji wersji bez cen) — 607 maili na **wtorek 08.09 8:30**, ID w `scheduled-2026-09-08.json`; pierwsza próba z 02.09 anulowana (`scheduled-2026-09-08.cancelled.json`). Rezerwacja w `newsletter_sends` blokuje poniedziałkowy przycisk — **nie zatwierdzać testówki**. |
| ~~2026-09-14~~ | **Smartfony Samsung Galaxy** (wiodący XCover7) | /kategoria/telefony | **WSTRZYMANE** 13.09 (decyzja Jakuba: „Samsung nie idzie na razie"). Wydanie gotowe w `editions/2026-09-15-samsung-galaxy.html`, nic nie zaplanowano w Resend, brak wpisu w `newsletter_sends`. Manifest przełączony na wydanie HP, żeby przypadkowe zatwierdzenie testówki go nie wypuściło. Do przełożenia na wolny termin. |
| 2026-09-16 | **Laptopy HP EliteBook** (wiodący 6 G1ah 16", obok 14" ze Smart Card i stacja HP Dock G6) | /kategoria/laptopy | ZAPLANOWANE ręcznie 15.09 — **611 maili na środę 16.09 8:30**, ID w `scheduled-2026-09-16.json`. Pierwotny termin 22.09 anulowany na prośbę Jakuba (`scheduled-2026-09-22-cancel-errors.json` = 13 adresów `suppressed`, nie do anulowania i tak niewysyłanych). Rezerwacja w `newsletter_sends` blokuje przycisk — **nie zatwierdzać testówki**. |
| 2026-09-28 | Zebra TC58e | /produkt/zebra-tc58e | do przygotowania (przesunięty z 14.09, potem z 21.09) |
| 2026-10-05 | Zebra ZD421c (drukarka etykiet) | /produkt/zebra-zd421c | propozycja — do akceptacji |
| 2026-10-12 | Samsung Galaxy Tab Active5 (tablet terenowy) | /produkt/samsung-galaxy-tab-active5 | propozycja — do akceptacji |

Kolejne pozycje dopisuje Jakub albo Claude — utrzymywać minimum 3 tygodnie zapasu.

## Problemy

- **2026-09-14** — wiersz na ten poniedziałek to Samsung Galaxy, ale urządzenie jest
  **WSTRZYMANE** decyzją Jakuba z 13.09 („Samsung nie idzie na razie"). Wydanie
  (`editions/2026-09-15-samsung-galaxy.html`) już istnieje, ale `manifest.json` świadomie
  wskazuje wydanie HP (`2026-09-22-laptopy-hp.html`, `bulkAt` 2026-09-22 8:30) — ono jest już
  zaplanowane w Resend (ID w `scheduled-2026-09-22.json`) na własny termin, a manifest ma w ten
  sposób chronić przed przypadkowym zatwierdzeniem testówki, które wypuściłoby Samsunga. W tym
  przebiegu nic nie budowałem i nie zmieniałem manifestu — przestawienie go z powrotem na
  Samsunga odwróciłoby tę zabezpieczającą decyzję. Kolejka ma 4 przyszłe pozycje po tym
  tygodniu (21.09, 28.09, 05.10, 12.10), zapas ≥3 tygodnie zachowany.

- **2026-09-21** — w tabeli nie ma wiersza z dzisiejszą datą (poniedziałek). Wiersz HP
  EliteBook jest datowany na 2026-09-16 (środa, wyjątkowo — zastąpił wstrzymanego Samsunga
  i poszedł ręcznie na 16.09), a kolejny wiersz to dopiero 2026-09-28 (Zebra TC58e), którego
  własna notatka mówi wprost: „przesunięty z 14.09, potem z 21.09" — czyli slot na dzisiejszy
  poniedziałek był już świadomie opróżniony przez wcześniejsze przesunięcie. Nie ma więc
  urządzenia przypisanego na 21.09 ani gotowego pliku wydania w `public/newsletter/editions/`.
  Zgodnie z zasadą „nie budować na ślepo" nic nie tworzę w tym przebiegu — `manifest.json`
  zostaje bez zmian (nadal wskazuje `2026-09-16-laptopy-hp.html`). Jakub: proszę o decyzję —
  albo przywrócić Zebrę TC58e na 21.09 (i przesunąć kolejne wiersze o tydzień), albo
  potwierdzić, że tydzień 21.09 celowo zostaje bez wydania.
