# PROGRESS — rejestratory.info

## 2026-08-23 — akcesoria wyglądały na zaznaczone od startu

Kwadrat wyboru miał w środku ikonę ptaszka zawsze, a stan niezaznaczony ukrywał ją klasą `text-transparent` — która działa na tekst, nie na `<img>`. Efekt: każda pozycja wyglądała na wybraną, mimo że `aria-pressed` było `false`.

Ptaszek renderuje się teraz dopiero po zaznaczeniu, a w stanie zaznaczonym używa wariantu białego (ciemnozielona ikona na zielonym tle była i tak nieczytelna). Sprawdzone klikiem: 0 zaznaczonych na wejściu, 2 po kliknięciu dwóch pozycji, przycisk „Dodaj (2)” pojawia się dopiero z wyborem.

## 2026-08-23 — drukarki mobilne: kwity wywozowe, nie etykiety

Karty sześciu drukarek mobilnych sprzedawały druk etykiet i przywieszek. Leśniczy drukuje w terenie **kwit wywozowy** — dokument wystawiany w Leśniku+, stanowiący podstawę rozchodu drewna i po podpisaniu przez odbiorcę dowód dostawy (Encyklopedia Leśna, dokumentacja SILP). ZILP prowadzi listę drukarek mobilnych współpracujących z Leśnikiem+ — są na niej m.in. Sewoo LK-P43, Seiko MP-A40, Bixolon SPP-R410, Honeywell RP4D i Zebra ZQ520.

Poprawione karty: `zebra-zq521`, `honeywell-rp4`, `sewoo-lkp43`, `sewoo-lkp400`, `seiko-mpa40`, `bixolon-sppr410`. Wyróżniki „Nośniki: paragony, etykiety, przywieszki” zamienione na papier w rolce z podaną szerokością, wiersze „Rodzaje” w specyfikacji na „Rodzaj: papier termiczny w rolce”, a boksy w rodzaju „Kwity, etykiety i przywieszki” przepisane pod rzeczywisty scenariusz (ZQ521: „Kwit wywozowy prosto z powierzchni”).

Przy okazji: usunięta wzmianka o linerless w odsyłaczu LK-P43 → LK-P400 i dwie nowe kolizje ikon (ta sama ikona pod dwoma wyróżnikami), które powstały przy tej zamianie. Audyt całego katalogu: zero kolizji.

## 2026-08-23 — „Polecane produkty” liczone z panelu

Sekcja na stronie głównej miała trzy modele wpisane na sztywno (EM45, Dell Pro 16 Plus, Brother MFC-L8690CDW) — dwa ostatnie to nie są urządzenia, które faktycznie najczęściej stoją u klientów.

Nowe `/api/najczestsze-urzadzenia`: ranking liczony z `registrators` + `devices`, z odsianiem materiałów i akcesoriów, zwracający tylko modele mające kartę produktu. Strona główna pobiera trójkę po stronie klienta, z zapasem na wypadek braku odpowiedzi (dzisiejsza czołówka wpisana w kod).

Wynik: **Zebra ZQ521** (194 szt., 56 nadleśnictw), **Zebra EM45** (186 szt., 20), **Samsung Galaxy A56** (159 szt., 16). Ranking po liczbie sztuk i po liczbie nadleśnictw daje tę samą trójkę.

Karty dostały liczbę nadleśnictw jako dowód („Pracuje w 56 nadleśnictwach”) i styl kart produktu; podpis sekcji zmieniony z „Najpopularniejsze rozwiązania w naszej ofercie” na „Sprzęt, który najczęściej pracuje w nadleśnictwach” — bo teraz to zdanie jest prawdziwe, a nie deklaratywne.

## 2026-08-22 — /panel-klienta dostosowany do nowego wyglądu

**Metoda: przestylowanie w miejscu, nie przepisanie.** Dashboard ma 2236 linii i obsługuje urządzenia fiskalne, rejestratory w kategoriach, wyszukiwanie, filtr po leśnictwie, edycję leśnictwa (inline i w oknie), kontrakty, protokoły, dokumenty, instrukcje czasowe i modal kuriera. Przepisanie tego od zera to prosta droga do zgubienia sekcji, więc zmienione zostały wyłącznie klasy i ikony — logika, zapytania do Supabase i struktura JSX nietknięte.

Kontrola, że nic nie zniknęło: zrzut `innerText` plus lista nagłówków, przycisków, linków i pól przed zmianą i po niej, dla dwóch kont — Nadleśnictwo Kolumna (104 rejestratory) i Nadleśnictwo Pieńsk (11 fiskalnych + 72 rejestratory).

| | przed | po |
|---|---|---|
| nagłówki | 141 / 93 | 141 / 93 identyczne |
| przyciski | 138 / 99 | 138 / 99 identyczne |
| linki | 30 / 32 | 30 / 32 identyczne |
| pola formularzy | 0 / 2 | 0 / 2 identyczne |
| tekst strony | — | **bajt w bajt**, poza dodanym nadtytułem „PANEL KLIENTA” |

Zmiany wizualne: paleta gray → stone, niebieskie i pomarańczowe akcenty → zieleń, `rounded-lg` → `rounded-2xl`, cienie → jednolite obramowania, ikony UI z Higgsfielda (ikony kategorii sprzętu zostają z lucide, zgodnie z wcześniejszą decyzją). Nowe ikony: pobierz, wyloguj, edytuj, zapisz, instrukcja, umowa. Spinnery zamienione na pierścienie CSS.

**Zdjęcia zamiast placeholderów**: mapa `ZDJECIA_SPRZETU` ma 47 pozycji zamiast pięciu, więc zdjęcie ma **1303 z 1576 pozycji** w bazie (83 %). Dopasowanie po nazwie znormalizowanej (bez spacji, myślników, wielkości liter), klucze sortowane od najdłuższego, żeby „Dell Pro 16 Plus” wygrało z „Dell Pro 16”. Przy okazji naprawione: „Samsung S25 FE” pokazywał zdjęcie S25+ (w kodzie stał komentarz „używamy s25plus jako placeholder”), a plik `s25fe_1.png` był w repo od dawna.

Pułapka: dopasowanie po zawieraniu podstawiało akcesoriom zdjęcie urządzenia z nazwy — „Papier termiczny do drukarki ZEBRA ZQ521” dostawał zdjęcie drukarki, a „Szkło ochronne ZEBRA EM45” zdjęcie telefonu. Stąd wzorzec `AKCESORIUM`: dla materiałów i dodatków dopuszczamy wyłącznie trafienie dokładne. Bez zdjęcia zostają tylko akcesoria i pięć modeli, których w repo nie ma (XCover Pro 6, CT32, DS2278, 1250g, Novitus Bono).

Poprawki przy okazji: adres e-mail Posnetu przestał być czerwony (czerwień sugerowała błąd) i stał się klikalnym `mailto:`; „Wyloguj” z czerwonego przycisku na neutralny — wylogowanie to nie stan awaryjny.

## 2026-08-22 — stopka przebudowana

Wytyczne: **NN/g „Web Page Footers 101”** — utility links (kontakt, obsługa) w stopce zawsze, bo tam ludzie ich szukają; site map z realnymi kategoriami; linki pogrupowane w kolumny z **konkretnymi** nagłówkami, nie ogólnikami; bez zwijania i bez mikrodruku.

Co było nie tak:

- **5 z 13 kategorii** — przypadkowy podzbiór zamiast mapy katalogu. Teraz wszystkie 13 (NN/g dopuszcza do ~25).
- **Nagłówek „Nawigacja”** — dokładnie ten typ ogólnika, przed którym NN/g ostrzega. Teraz „Sprzęt”, „Obsługa”, „Kontakt”.
- **Jeden ogólny numer** — teraz osobno dział handlowy i serwis, plus godziny pracy; stopka jest miejscem, gdzie szuka się wsparcia.
- **Brak danych rejestrowych** — dodane: TAKMA Tadeusz Tiuchty, adres, NIP, w znaczniku `<address>`.
- **Dwa osobne układy** (mobile i desktop) z powielonymi treściami → jeden responsywny; kategorie w dwóch kolumnach także na telefonie (1455 → 1299 px wysokości).
- Wygląd: gradient slate→emerald i rozmyte bąble zamienione na leśny panel `#0A1B12` z teksturą poziomicową — ta sama, co w osi wdrożenia. `ContourTexture` wyniesiona do `components/ContourTexture.tsx`, bo import z `ProductPage` dałby cykl (ProductPage importuje Footer).

Sprawdzone: 21 linków, żaden poniżej 14 px, wszystkie 16 tras wewnętrznych zwraca 200, brak poziomego przewijania na 390 px.

**Polityka prywatności napisana** — `/polityka-prywatnosci`, dziesięć punktów wg art. 13 RODO, podlinkowana w pasku dolnym stopki. Treść oparta na tym, co faktycznie robi kod, nie na szablonie: wymienione są wszystkie cztery formularze z ich rzeczywistymi polami, `localStorage` panelu klienta, oraz dostawcy z repo (Vercel, Resend, Supabase, Google Analytics `G-FDR8NNEMJN`). Do potwierdzenia przez klienta: okresy przechowywania i umowy powierzenia z dostawcami.

## 2026-08-22 — cały widok publiczny bez lucide

Zamienione **wszystkie** ikony z lucide na generowane w Higgsfield — 24 pliki, 40 różnych glifów. `grep lucide-react` po stronie publicznej daje teraz zero trafień (zostały tylko panele `handlowy`/`admin`/`szef` i prymitywy `components/ui/*`).

Trzy nowe arkusze 4×2 (24 ikony) + warianty białe:

- **nawigacja**: chevronPrawo, chevronLewo, chevronGora, chevronDol, strzalka, strzalkaUkos, lupa, menu
- **interfejs**: filtr, lista, uzytkownik, kosz, wyslij, podglad, czat, budynek
- **kategorie sprzętu**: monitor, drukarka, laptop, tablet, smartfon, rejestrator, produkt, serwer

W `icons.ts` doszedł eksport `naCiemnym()` — ten sam helper, co był lokalnie w `ProductPage`.

**Wyjątek: kafelki kategorii.** Ikony urządzeń na stronie głównej i w stopce zostają z lucide (ScanBarcode, Smartphone, Laptop, PrinterCheck, Monitor, Server, ScrollText, Printer, Computer, FolderCheck, ReceiptText, Keyboard) — decyzja użytkownika, wygenerowane odpowiedniki wypadły gorzej przy 28 px.

Pułapka przy wariantach białych: `mix-blend-multiply` na białej ikonie daje kolor tła, czyli ikona znika. Po zamianie na `naCiemnym()` trzeba tę klasę zdjąć — poprawione w 12 miejscach (m.in. chevrony w „Zobacz więcej”, które przez to zniknęły z przycisku).

**Kontrola kontrastu skryptem w przeglądarce**: dla każdego `img[src^="/icons/line/"]` liczona jest jasność pierwszego nieprzezroczystego tła w łańcuchu rodziców; wszystko poniżej 140 dostało wariant biały. Wyłapało to m.in. koszyk w nagłówku, chevrony w „Zobacz więcej”, strzałki w zielonych przyciskach i aktywny przełącznik widoku siatka/lista na kategoriach. Po poprawce: zero ikon na ciemnym tle w wersji ciemnej, zero obrazków 404 na dziewięciu sprawdzonych stronach.

## 2026-08-22 — /kontakt przebudowany

Strona przepisana (482 → ~480 linii), zero komponentów `ui/*` i lucide poza dwiema strzałkami.

Wytyczne:

- **NN/g** — użytkownicy oczekują na stronie kontaktu **adresu, telefonu i e-maila** i nie wolno zastępować ich formularzem. Stąd dane firmy (nazwa, adres, NIP, godziny) w nagłówku jako tekst, trzy działy z klikalnymi numerami, a formularz dopiero pod nimi jako jeden z kanałów.
- **Konwencja B2B** — kierowanie sprawy do właściwego działu skraca czas odpowiedzi, bo osoba odbierająca ma kontekst; stąd trzy karty działów i pole „Do kogo” w formularzu.
- **GOV.UK** — etykiety nad polami, pola nieobowiązkowe oznaczone słowem „(opcjonalnie)”, gwiazdki usunięte, nad formularzem zdanie o godzinach odbioru wiadomości.

Zmiany merytoryczne: dodane dane rejestrowe (TAKMA Tadeusz Tiuchty, NIP 915-100-43-77 — z generatora ofert w panelu handlowym), adres jako tekst obok mapy (wcześniej tylko w iframie i stopce), odsyłacz do `/serwis` przy sprawach serwisowych. Usunięta pigułka „Jesteśmy do Twojej dyspozycji” nad H1 i kolorowe słowo w nagłówku.

Sprawdzone w przeglądarce: 7 pól, wszystkie z etykietami, 5 linków `tel:` i 5 `mailto:`, karty działów wyrównane co do piksela, pełne przejście formularza z potwierdzeniem.

Czas odpowiedzi: przyjęty standard B2B — **jeden dzień roboczy**. Podany w trzech miejscach: nad formularzem kontaktu, w potwierdzeniu wysłania i przy opisie działów. Ta sama deklaracja trafiła nad formularz na `/serwis`.

## 2026-08-22 — /serwis przebudowany na język kart produktu

Strona przepisana od zera (908 → ~560 linii), zero ikon z lucide poza strzałką w przyciskach.

Wytyczne, na których to stoi:

- **GOV.UK „start page”** — najpierw tyle informacji, żeby użytkownik wiedział, czy trafił dobrze; stąd sekcja **„Co przygotować”** (numer seryjny, opis usterki, adres odbioru) przed formularzem.
- **GOV.UK „structuring forms”** — pola pogrupowane w `fieldset` z legendą: Kto zgłasza / Adres odbioru / Urządzenie / Warunki obsługi.
- **GOV.UK „designing good questions”** — pytania zamknięte („Jak sprzęt trafi do serwisu?” zamiast „Czy zamówić kuriera?”), podpowiedzi tylko tam, gdzie coś naprawdę wymaga wyjaśnienia.
- **GOV.UK — oznaczanie pól** — pola nieobowiązkowe dostają „(opcjonalnie)”, obowiązkowe nie mają gwiazdek; nad formularzem jedno zdanie o tym, że reszta jest wymagana.
- **WCAG / a11y** — każde pole ma `id` + `label for`; sprawdzone skryptem: 9 pól, zero bez etykiety.

Wizualnie: zielony gradient hero i kolorowe kółka timeline'u wyleciały; proces naprawy używa **tej samej osi, co karty fiskalne** (`Wdrozenie` wyeksportowane z `ProductPage`, `Timeline.lead` doszedł jako pole, bo zdanie wiodące było zaszyte na sztywno). Modal potwierdzenia przeniesiony na portal, w stylu modalu dokumentów.

Nowe ikony: diagnoza, telefon, zegar, wycena.

Układ formularza — dwa podejścia, drugie zostaje:

1. Siatka 12-kolumnowa, do czterech pól w rzędzie. **Odrzucone** — badanie CXL (n≈700) pokazuje, że formularz jednokolumnowy wypełnia się średnio o 15,4 s szybciej niż dwukolumnowy, bo wzrok idzie jedną ścieżką w dół; przy czterech polach w rzędzie doszedł do tego brak logiki szerokości (pole na imię tej samej szerokości co adres).
2. Formularz w jednej kolumnie plus panel pomocniczy obok. **Odrzucone** — panel powielał „Co przygotować” i kartę kontaktową, które są już w nagłówku strony.
3. **Formularz w jednej kolumnie, `max-w-3xl`, bez panelu** — materiały pomocnicze zostają tam, gdzie były: „Co przygotować” i kontakt w nagłówku, adres serwisu w oknie po wysłaniu, informacja o kontrakcie przy samym pytaniu w formularzu. Każda treść w jednym miejscu. Szerokość pola podpowiada długość odpowiedzi (GOV.UK: text input): telefon 12 rem, numer seryjny 13 rem, adres pełna szerokość.

Wysokość sekcji: 2161 px → 1743 px po sparowaniu telefon+e-mail, rodzaj+numer seryjny i ustawieniu opcji odbioru obok siebie. Lista „Co przygotować” zniknęła z hero (była teraz w dwóch miejscach). Na telefonie wszystko wraca do jednej kolumny, bez poziomego przewijania (sprawdzone na 390 px).

## 2026-08-22 — sekcja serwisu przemalowana na alert awaryjny — wycofane

Pierwsze podejście (bursztynowy pas, ramka `amber-300`, przycisk `amber-700`) było błędne. Wytyczne mówią coś przeciwnego:

- **Material** — dla treści trwałych używa się nagłówka sekcji, nie banera; baner służy komunikatowi, który da się odrzucić.
- **USWDS** — alert komunikuje *zmianę stanu* (status systemu, walidacja), a nie stałą zawartość strony. Do tego wprost: mocna czerwień i pomarańcz wywołują reakcję lękową, a przy dobrym umiejscowieniu bloku są zbędne.
- **NN/g** — kolorowe bloki wyglądające jak reklama wpadają w banner blindness i są pomijane.
- **GOV.UK** — ostrzeżenie to `warning text`: ikona plus wytłuszczony tekst, dla rzeczy z konsekwencjami przy zaniechaniu.
- **WCAG 1.4.1 / USWDS** — sens nie może zależeć od samego koloru; potrzebne ikona i słowo nazywające rodzaj komunikatu.

Wersja finalna: sekcja `border-y border-stone-200 bg-white`, nadtytuł „AWARIA I SERWIS”, nagłówek **„Urządzenie nie działa?”** (sytuacja klienta zamiast etykiety), pod nim jedno ostrzeżenie we wzorcu GOV.UK — trójkąt plus wytłuszczony tekst o pakowaniu i etykiecie. Przycisk **„Zgłoś usterkę”** w ciemnej zieleni. Zero bursztynu; `public/icons/amber/` usunięte.

Rozpoznawalność bierze się z nazwania rzeczy i z pozycji w układzie, nie z koloru alarmowego.

## 2026-08-22 — akcesoria komputerowe (ostatnia kategoria)

11 kart na nowym szablonie: torba, podkładka, podnóżek, 2 × SSD, Microsoft 365, 3 × zestaw klawiatura+mysz, 2 × UPS Vertiv. Wszystkie 200 na :3006, `tsc` czysty.

Nowe w szablonie: `hideService` — chowa blok serwisu kurierskiego i wpis „Serwis” w nawigacji (licencja, torba, podkładka, podnóżek — nikt tego nie odsyła do naprawy).

Nowe ikony (trzy arkusze 4×2 + warianty białe): torba, mysz, podkladka, klodka, aplikacje, gniazdo, napiecie, klucz oraz — po uwadze użytkownika, że ikony podnóżka nie pasują — podnozek, kat, antyposlizg, nadgarstek, wyscielenie, dokumenty, odbiornik, moc, transfer, dyskzew, urzadzenia, coldstart, biurko, pojemnosc, precyzja, klawiszskrotu.

Przegląd wszystkich 11 kart akcesoriów pod kątem ikon: wyleciały pożyczki z innych kategorii (`ergonomia` = monitor z regulacją wysokości przy podnóżku, `wymiana` = strzałki wymiany przy regulacji kąta, `tarcza` = tarcza ochronna przy powierzchni antypoślizgowej, `zasilacze` = zasilacze serwerowe przy mocy UPS, `dyski` = dyski serwerowe przy pojemności SSD, `integracja` = puzzle przy przełączaniu urządzeń, `siec` = maszt antenowy przy odbiorniku 2,4 GHz).

**Błędy w danych znalezione przy weryfikacji specyfikacji** (źródła: samsung.com, dell.com, hp.com, vertiv.com, microsoft.com):

- zdjęcia SSD były **zamienione miejscami** — `ssd_t9_1.png` to w rzeczywistości T7, a `ssd_t7_1.png` to T9. Poprawione na kartach i w kategorii.
- „Samsung SSD T7 3.2TB” — taka pojemność nie istnieje (T7: 500 GB / 1 / 2 TB). Karta nazywa się teraz „Samsung SSD T7” z wybierakiem pojemności. **Do decyzji: którą pojemność faktycznie sprzedajemy** (cena 1 850 PLN sugeruje 2 TB).
- Dell KM7321W: „podświetlenie klawiszy” i „aluminiowa obudowa” — brak w danych producenta, usunięte.
- HP 655: „mysz 1600 DPI” → 4000 dpi wg karty HP.
- kategoria wskazywała `podnozek_biurowy_1.png`, plik nazywa się `podnozek_pod_biurko_1.png` — martwy obrazek naprawiony.
- Vertiv itON 1000 VA: repo podaje 3 × Schuko + 3 × C13, Icecat dla LI32131CT20 mówi o 4 gniazdach. Zostawiłem wersję z repo — **warto potwierdzić u dostawcy**.

Przy okazji audyt całego katalogu: zero kart z tą samą ikoną pod dwoma różnymi wyróżnikami (naprawione Sewoo LK-P43 i LK-P400), zero brakujących plików graficznych, 71 kart i 13 kategorii zwraca 200.

## 2026-08-22 — sekcja „Proces zakupu i wdrożenia” na leśnym panelu

Oś wdrożenia **przejeżdża sama**, gdy sekcja wejdzie w kadr (IntersectionObserver, próg 0,2, jednorazowo, `animate()` na `useMotionValue`, ~8,8 s w równym rytmie (`ease: linear`), `prefers-reduced-motion` przeskakuje do końca). Wersja sterowana przewijaniem odpadła — nie każdy scrolluje niżej, a proces ma się pokazać w całości bez udziału czytelnika. Ciemny panel `#0A1B12` z teksturą poziomicową, tor z gradientem emerald → `#A8F000`, świecąca kropka na czole paska, węzły zapalają się tuż przed jej dojazdem (`useTransform` na progu `i/(n-1)`). Na lg poziomo, niżej pionowo — jedna warstwa markupu, dwa tory.

**Ikony na ciemnym tle**: `invert` na ikonie z białym tłem daje magentę, a `mix-blend-screen` nie zadziała, bo `opacity` na rodzicu izoluje grupę blendu. Rozwiązanie: `public/icons/white/**` — te same 85 ikon z przezroczystym tłem i białą kreską (`-transparent white -fill white -colorize 100`), wybierane helperem `naCiemnym()`. Przy okazji naprawia różowy odcień ikon w każdym ciemnym boksie wyróżnika w całym katalogu.

Okno „Jakie dokumenty?” przeniesione na **portal do `body`** — siedziało w sekcji z `overflow-hidden` i było przycinane do jej krawędzi (ucięta stopka). Przy okazji przemalowane na leśny panel z teksturą, żeby czytało się jako część sekcji wdrożenia, a nie wtręt z reszty karty. Escape zamyka.

Cennik przeniesiony nad wyróżniki i przebudowany na hierarchię: `pricing.main` to kwota wiodąca (1 799 zł, 30 px bold), `pricing.rows` to pozycje dodatkowe, prowizje w wydzielonym polu z wartościami na zielono.

## 2026-08-22 — urządzenia fiskalne + timeline wdrożenia w szablonie

Dwie karty na nowym szablonie (`posnet-pospay-2`, `posnet-temo-online`, obie 200 na :3006).

Nowe w `ProductPage.tsx`:

- `timeline` — sekcja „Proces zakupu i wdrożenia”, oś rysuje się przy wejściu w kadr (IntersectionObserver, jednorazowo), kroki wchodzą kaskadą; na lg poziomo (flex), niżej siatka. Wpina się w nawigację jako „Wdrożenie”.
- `DokumentyModal` — okno „Jakie dokumenty?” w stylu modalu kuriera (przypięty nagłówek i stopka, `bez-paska`, ikony z Higgsfielda).
- `pricing` — cennik + prowizje w prawej kolumnie (Pospay 2: 1 799 zł netto, abonament 39 zł, VISA/MC/BLIK).

Nowe ikony (arkusz 4×2, `Erode Disk:2`): zamowienie, fiskalizacja, szkolenie, integracja, kalendarz, karta, chmura, paragon. Do rejestru doszły też aliasy `formularz` i `kurier` (pliki z `icons/em45/line/`).

**Naprawiony błąd w `/api/uzytkownicy-sprzetu`**: Supabase twardo tnie odpowiedź do 1000 wierszy — ani `.limit(5000)`, ani szeroki `.range()` tego nie omijają. Tabele mają po 1288 wierszy, więc co czwarte nadleśnictwo nie trafiało na listy. Po przejściu na czytanie porcjami: EM45 17 → 20, ZQ521 37 → 56. API czyta teraz też tabelę `devices` (moduł przeglądów), bo urządzeń fiskalnych nie ma w `sales_products`.

Ustalenia z użytkownikiem: „Posnet Pospay” w `devices` to ten sam sprzęt co Pospay 2 — sekcja „pracuje w nadleśnictwach” na tej karcie jest poprawna. Natomiast „Posnet Temo” w `devices` to egzemplarze **OFFLINE**, nie Temo Online — dlatego karta Temo Online NIE ma `usedBy` (w pliku jest komentarz ostrzegawczy). Cena ujednolicona na 1 799 zł netto w kafelku kategorii i na karcie.

## 2026-08-22 — kategoria EZD na nowym szablonie karty

Przebudowane na `components/product/ProductPage.tsx` (5 kart, wszystkie 200 na localhost:3006):

- `zebra-zd421c` — drukarka etykiet, sygnatura „Najczęściej wybierana drukarka w cyfryzacji nadleśnictw”
- `honeywell-pc45t` — drukarka z ekranem 3,5″, sygnatura ciemna o module RFID UHF
- `epson-ds730n` — skaner ADF, sygnatura o wydajności 6500 stron dziennie
- `zebra-ds2208` — czytnik 2D, sygnatura o 5-letniej gwarancji
- `honeywell-1450g` — czytnik z rozbudową 1D → 2D

Przy okazji:

- naprawione zdjęcie DS2208 (`/ds2208_1.png` → `/zebra-ds2208.png`, 4 miejsca), 9 kart z `/placeholder.png` → `/placeholder-produkt.png`, usunięte martwe `temo_online_3/4.png`. Audyt całego katalogu: zero brakujących plików.
- nowe ikony z Higgsfield: `termotransfer`, `archiwum`; `linerless` przemianowane na `etykieta` (jedyne użycie było na nowej karcie ZD421c).
- **uwaga do pipeline'u ikon**: kreskę pogrubia `-morphology Erode Disk:3`, nie `Dilate` — Dilate na ciemnej kresce na białym tle ją zjada.
- `usedBy` podpięte na wszystkich pięciu kartach, ale system sprzedaży nie ma jeszcze żadnego z tych modeli (są tylko DS2278 i 1250g), więc sekcja sama się ukrywa.

TODO: pozostałe kategorie do przebudowy — Urządzenia fiskalne, Akcesoria komputerowe. Nic nie commitowane, nic na produkcję (czeka na decyzję).
