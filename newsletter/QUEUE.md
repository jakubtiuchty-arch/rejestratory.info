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
| 2026-09-23 | **Smartfony Samsung Galaxy** (wiodący S25 FE) | /kategoria/telefony | ZAPLANOWANE ręcznie 21.09 — **614 maili na środę 23.09 8:30**, ID w `scheduled-2026-09-23.json`. Wydanie wstrzymane 13.09 wróciło po przebudowie: model tygodnia zmieniony z XCover7 na S25 FE, nowe hero (nocny las, animowane tylko świetliki), zdjęcie modelu z key visuala producenta. Rezerwacja w `newsletter_sends` blokuje przycisk — **nie zatwierdzać testówki**. |
| 2026-09-16 | **Laptopy HP EliteBook** (wiodący 6 G1ah 16", obok 14" ze Smart Card i stacja HP Dock G6) | /kategoria/laptopy | ZAPLANOWANE ręcznie 15.09 — **611 maili na środę 16.09 8:30**, ID w `scheduled-2026-09-16.json`. Pierwotny termin 22.09 anulowany na prośbę Jakuba (`scheduled-2026-09-22-cancel-errors.json` = 13 adresów `suppressed`, nie do anulowania i tak niewysyłanych). Rezerwacja w `newsletter_sends` blokuje przycisk — **nie zatwierdzać testówki**. |
| 2026-09-28 | Zebra TC58e | /produkt/zebra-tc58e | wydanie gotowe (2026-09-28-zebra-tc58e.html) |
| 2026-10-05 | Zebra ZD421c (drukarka etykiet) | /produkt/zebra-zd421c | wydanie gotowe (2026-10-05-zebra-zd421c.html) |
| 2026-10-12 | Samsung Galaxy Tab Active5 (tablet terenowy) | /produkt/samsung-galaxy-tab-active5 | wydanie gotowe (2026-10-12-samsung-tab-active5.html) |
| 2026-10-19 | **Rejestratory — zakupy przed końcem roku** (bez urządzenia tygodnia; marki Zebra, Honeywell, Samsung, Unitech, M3 Mobile; dostępność w ZUP Łódź i ZPUH Olsztyn) | /kategoria/rejestratory | ZAPLANOWANE ręcznie 16.10 — **627 maili na poniedziałek 19.10 9:00** (624 + 3 adresy dopisane 16.10), ID w `scheduled-2026-10-19.json`, plik `2026-10-20-rejestratory.html`. Rezerwacja w `newsletter_sends` blokuje przycisk — **nie zatwierdzać testówki**. **Nie budować w tym tygodniu nowego wydania** (CT47 przesunięty na 26.10). |
| 2026-10-26 | Honeywell CT47 (terminal terenowy, alternatywa dla Zebry) | /produkt/honeywell-ct47 | propozycja — do akceptacji (przesunięty z 19.10) |
| 2026-11-02 | Epson DS-730n (skaner dokumentowy sieciowy, do EZD) | /produkt/epson-ds730n | propozycja — do akceptacji |
| 2026-11-09 | Vertiv Liebert itON 1000 VA (UPS do serwerowni/kancelarii) | /produkt/vertin-1000 | propozycja — do akceptacji |

Kolejne pozycje dopisuje Jakub albo Claude — utrzymywać minimum 3 tygodnie zapasu.

## Problemy

- **2026-09-14** — wpis nieaktualny: wstrzymane wydanie Samsunga zostało przebudowane
  i zaplanowane na środę 23.09. Manifest wskazuje już to wydanie.
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
- **2026-09-28** — wydanie Zebra TC58e zbudowane, ale ze dwoma odstępstwami od standardu,
  wynikającymi z ograniczonych materiałów w repo (nie zmyślałem, tylko pracowałem z tym, co jest):
  w `public/` i w źródłowej ofercie (`oferty-zrodla/...TC58E_03.2026.docx`) istnieje tylko
  **jedno** zdjęcie produktu (`tc58_1.png`) — galeria w wydaniu pokazuje więc jedno zdjęcie
  zamiast czterech. Hero zostawiłem jako istniejący, pasujący tematycznie plik
  `las-em45-anim.gif` (leśniczy z rejestratorem w terenie) zamiast tworzyć nową animację —
  zgodnie z poleceniem z tego przebiegu, żeby hero GIF zostawić bez zmian; podmieniłem tylko
  alt-text, żeby nie sugerował błędnie modelu EM45. Cena: w repo jest realna oferta ZUP Łódź
  (`data/oferty-skladnicy.ts`, 3691 zł netto za urządzenie + akcesoria) — nie użyłem wariantu
  „wycena indywidualna", bo dane były dostępne.
- **2026-10-05** — wydanie Zebra ZD421c zbudowane na bazie TC58e, z dwoma odstępstwami
  wynikającymi z materiałów dostępnych w repo (nie zmyślałem, pracowałem z tym, co jest):
  w `public/` istnieje tylko **jedno** zdjęcie produktu (`zd421c_1.png`, 800×800) — galeria
  pokazuje jedno zdjęcie zamiast czterech, tak jak w wydaniu TC58e. Hero zostawiłem jako
  istniejący plik `kancelaria-brother-anim.gif` (scena biurowa/kancelaryjna, tematycznie
  bliższa drukarce etykiet do EZD niż leśne hero z poprzednich wydań) — podmieniłem tylko
  alt-text, bez tworzenia nowej animacji, zgodnie z precedensem z 28.09. Cena: w repo jest
  realna oferta ZUP Łódź (`data/oferty-skladnicy.ts`, 1552 zł netto za samą drukarkę, bez
  modułów dodatkowych) — użyta wprost, bez wariantu „wycena indywidualna". Do tile „z poprzedniego
  wydania" dorobiłem miniaturę `tc58e_small.png` (zmiana rozmiaru istniejącego zdjęcia produktu,
  nie nowa grafika).
- **2026-10-12** — wydanie Samsung Galaxy Tab Active5 zbudowane na bazie ZD421c, z jednym
  odstępstwem od standardu: w `public/products/` istnieją tylko **trzy** zdjęcia produktu
  (`tab-active5-1/2/3.webp`, 900×900, wszystkie w formacie przód+tył pod różnym kątem) — galeria
  pokazuje trzy zdjęcia zamiast czterech. Przekonwertowałem je do PNG 800×800 (`convert`/ImageMagick,
  PIL niedostępny w środowisku) do `public/newsletter/tab-active5_1/2/3.png`. Hero zostawiłem jako
  istniejący plik `las-em45-anim.gif` (leśniczy z urządzeniem w terenie — tematycznie pasuje do
  tabletu terenowego), podmieniłem tylko alt-text, zgodnie z precedensem z 28.09 i 05.10. Cena:
  w repo jest realna oferta ZUP Łódź (`data/oferty-skladnicy.ts`, 2119 zł netto z ładowarką
  sieciową w zestawie) — użyta wprost. Do tile „z poprzedniego wydania" (Zebra ZD421c) dorobiłem
  miniaturę `zd421c_small.png` (zmiana rozmiaru istniejącego zdjęcia produktu, nie nowa grafika).
  Uwaga: wiersz na 12.10 w tabeli miał status „propozycja — do akceptacji" (dopisany przy
  poprzednim przebiegu jako zapas kolejki) — zbudowałem wydanie zgodnie z poleceniem z tego
  przebiegu („znajdź wiersz z dzisiejszą datą — to urządzenie tygodnia"); gdyby Jakub chciał
  inne urządzenie na ten tydzień, proszę o korektę przed akceptacją testówki w poniedziałek.
