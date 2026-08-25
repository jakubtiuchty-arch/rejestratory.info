# PROGRESS — rejestratory.info

## 2026-08-25 — newsletter: urządzenia Apple (wydanie na 01.09)

`public/newsletter/editions/2026-09-01-apple-iphone-ipad.html`, kampania `apple-2026-09-01`. Manifest przestawiony na to wydanie z `bulkAt` 01.09 8:30, kolejka przesunięta: TC58e na 07.09, Brother na 14.09.

**Hero.** Jakub chciał kadru z filmu ze strony głównej — leśniczy mierzy stos iPhone'em, siatka LiDAR z wymiarami — tylko z mniejszym ruchem, bo to mail. Wycięte z `hero-nadlesnictwo.mp4` (19,0–23,4 s), kadr 600 × 250 z przesunięciem pionowym 117 px, sześć klatek tam i z powrotem po 0,5 s. Ruch to łagodne odjechanie kamery i powrót, bez przeskoku na pętli.

Rozmiar był tu prawdziwym ograniczeniem: las w mgle to sama faktura, więc każda klatka waży ~90 kB niezależnie od palety i ditheringu (sprawdzone: 48/64/96/128 kolorów, `none`/`bayer`/`sierra2_4a` — różnice poniżej 2%). Jedyna dźwignia to liczba klatek. Stąd sześć zamiast dwudziestu: **374 kB** wobec 1,6 MB produkcyjnego `las-it-anim.gif`.

**Zdjęcia.** Z kart produktu (`public/products/*.webp`) spłaszczone na biel — źródłowe pliki mają półprzezroczystą obwódkę wokół ekranu, która na białym tle maila zostawiała białe plamy. Kolejność ma znaczenie: najpierw `-alpha remove` na bieli, dopiero potem `-trim` i skalowanie. Cztery duże po ~60–90 kB, trzy kafelki po ~10 kB. Cały mail to 720 kB obrazów i 36 kB HTML-a (limit obcięcia w Gmailu: 102 kB).

**Treść.** Fakty wyłącznie z czterech kart w repo. Model wiodący to iPhone 17 Pro (siedem wierszy specyfikacji), pozostałe trzy jako kafelki. Bloku ceny nie ma, bo żadna karta Apple nie ma oferty składnicy — zamiast niego czarny blok „Wycena indywidualna" z logo Apple, w stylu marki, i przycisk mailowy. Zwykły baner Apple z poprzednich wydań wypadł, bo cały mail jest o Apple.

Logo Apple w dwóch miejscach: mały znak nad nagłówkiem w zielonym bloku i większy w czarnym bloku wyceny. W stopce dopisana nota o znakach towarowych Apple Inc. Kafelek „Serwery i All-in-One" zastąpiony przez „Komputery All-in-One", a „Telefony" rozszerzone na „Telefony i tablety" z Apple na pierwszym miejscu.

## 2026-08-25 — serwery zdjęte z oferty

Jakub: „Nie mamy już w ofercie serwerów". Kategoria usunięta z części katalogowej w całości — listing `app/kategoria/serwery/`, trzy karty (`dell-poweredge-r360`, `-r550`, `-r660xs`), kafelek na stronie głównej, pozycja w stopce, blok `"serwery"` w nieużywanym `lib/products-data.ts` i akapit na starej trasie `/produkty/[category]`. Z generatora indeksu wypadły etykieta i synonimy, po czym `data/liczby-kategorii.ts` i `data/wyszukiwarka.ts` przeliczone: **79 kart w 12 kategoriach** (było 82 w 13).

Trzy wysłane newslettery niosą kafelek „Serwery i All-in-One" z linkiem `rejestratory.info/kategoria/serwery` prosto do skrzynek nadleśnictw — ostatni poszedł dziś rano do 590 adresów. Te linki będą klikane jeszcze długo, więc zamiast 404 stoi teraz przekierowanie 308 w `next.config.js`: `/kategoria/serwery`, `/produkt/dell-poweredge-*` i `/produkty/serwery` prowadzą na `/kategoria/all-in-one`, czyli do drugiej połowy tej samej obietnicy. Niewysłane wydanie `newsletter/2026-08-posnet-pospay-2.html` ma już kafelek „Komputery All-in-One / Dell Pro 24, z systemem i bez".

W panelu handlowca zniknęły serwery z listy do wyboru (`PRODUCT_CATEGORIES` i `PRODUCTS_BY_CATEGORY`), więc nowej oferty z PowerEdge nie da się złożyć.

**Świadomie nietknięte**: mapy etykiet, kolorów i ikon dla `serwery` w `/handlowy`, `/szef` i `/panel-klienta`. To ścieżki odczytu danych z localStorage — jeśli nadleśnictwo ma u siebie zapisany serwer albo w archiwum leży stara oferta, ma się dalej wyświetlać z nazwą, a nie z surowym identyfikatorem. Filtr u szefa pokaże po prostu „Serwery (0)", kiedy takich rekordów nie ma.

## 2026-08-25 — komplet brakujących zdjęć, katalog bez dziur

Sześć renderów dostarczonych przez Jakuba, wgranych bez przeróbek pod nazwy, które karty nosiły od początku:

- `pc42e_t_1.png`, `zebra-ds2278.png`, `honeywell-1250g.png` — po 800 × 800 (sprzęt EZD),
- `hp460_1.png`, `hp715_1.png`, `torba_hp_15.png` — po 1200 × 1200, jak obie klawiatury Dell i HP 655 w Akcesoriach.

Wszystkie PNG z wyciętym tłem. Kadr HP 460 mieści urządzenie na 991 px szerokości przy 1049 px w `km5221_1.png` i 1119 px w `hp655_1.png` — w listingu obok siebie wygląda spójnie, więc nic nie przycinałem.

Audyt całego repo (396 odwołań do plików graficznych w `app/`, `components/`, `data/`) wykazał jedno martwe: `app/products-data.ts` wskazywało na `/images/zebra-em45.jpg`, ścieżkę, której nigdy nie było. To stara warstwa danych, ale trasa `/produkty/[category]` nadal odpowiada 200, więc kafelek EM45 świecił pustym miejscem. Podmienione na istniejące `/em45_1.webp`.

Po tej rundzie **żadna karta w katalogu nie ma brakującego ani zastępczego zdjęcia**.

## 2026-08-25 — przycisk „Zobacz produkt” równo na dole każdej karty

Na listingach przycisk stał zaraz pod tekstem, więc w rzędzie czterech kart siedział na czterech różnych wysokościach — im dłuższy opis, tym niżej. Poprawka to trzy klasy Tailwinda na kartę:

- kafelek dostaje `flex flex-col h-full` (w widoku listy `flex gap-6 h-full`), żeby rozciągał się na wysokość rzędu,
- kontener treści `p-6 flex-1 flex flex-col`,
- owijka przycisku `mt-auto` — wolna przestrzeń ląduje nad przyciskiem, nie pod nim.

Rozjechane były cztery listingi: Monitory, EZD, Serwery, Urządzenia wielofunkcyjne. Przy okazji `h-full` dopisane w Laptopach i Urządzeniach fiskalnych — działały dzięki domyślnemu `stretch` siatki, ale wyglądały inaczej niż reszta.

Sprawdzone pomiarem przez CDP przy szerokości 1600 px na wszystkich czternastu listingach: w każdym rzędzie dolna krawędź przycisku ma tę samą współrzędną, a odstęp do dolnej krawędzi karty wynosi wszędzie 24 px.

## 2026-08-25 — zdjęcia trzech monitorów HP

Rendery dostarczone przez Jakuba: `524pu_1.png`, `524pm_1.png`, `527pm_1.png` — po 1600 × 1200, PNG z przezroczystością (sprawdzona średnia alfa ≈ 0,4, więc tło faktycznie jest wycięte, a nie czarne). Karty wskazywały te nazwy od chwili powstania, więc wystarczyło wgrać pliki.

**Kategoria Monitory jest kompletna**: dwanaście modeli z oferty ZUP, wszystkie z cenami i ze zdjęciami.

Galeria używa `object-contain`, więc dokładny rozmiar nie ma znaczenia — karty mają zdjęcia od 800 × 800 do 4462 × 3427 i wszystkie wyglądają poprawnie. Znaczenie ma przezroczyste tło (kontener ma gradient z bieli do szarości, na którym wypalona biel zrobiłaby prostokąt) i poziomy kadr z zapasem wokół produktu.

**Nadal brakuje sześciu zdjęć**: `pc42e_t_1.png`, `zebra-ds2278.png`, `honeywell-1250g.png`, `hp460_1.png`, `hp715_1.png`, `torba_hp_15.png`.

## 2026-08-25 — EDA52 także z ZPUH Olsztyn

Cennik ze zrzutu ekranu (bez pliku źródłowego), więc wpis ręczny w `data/oferty-reczne.ts`: **Honeywell EDA 52 — 2 838,00 zł netto**, ZPUH Olsztyn, plus kontrakt serwisowy i siedem akcesoriów. Karta pokazuje teraz porównanie dwóch składnic.

**Ta sama maszyna jest w Łodzi o 77 zł taniej** — 2 761,00 zł — a wszystkie akcesoria kosztują w obu składnicach dokładnie tyle samo, co do grosza. Różnica leży wyłącznie w cenie samego urządzenia i w zawartości zestawu: Łódź dokłada pasek na rękę, Olsztyn deklaruje 24 miesiące gwarancji.

**Nazwy pozycji ujednolicone z drukiem ZUP Łódź.** Obie składnice opisują te same akcesoria innymi słowami („Akumulator" kontra „Akumulator 4500mAh", „szkło ochronne" kontra „szkło lub folia ochronna") i po tych samych cenach. Przy dosłownym przepisaniu tabela robiła z nich osiem osobnych wierszy z myślnikiem w drugiej kolumnie — czyli sugerowała, że składnica danego akcesorium nie ma. Kwoty i dostępność pozostają zgodne ze źródłem; zmieniony jest wyłącznie zapis nazwy.

73 oferty.

## 2026-08-25 — All in One: obie wersje z oferty ZUP

`Oferta na komputery ALL IN ONE HP 17.04.2026.docx` wymienia **dwie pozycje**, obie prowadzące w druku do tej samej karty, choć różnią się nie tylko systemem:

| wersja | RAM | dysk | system | cena netto |
|---|---|---|---|---|
| z systemem operacyjnym | 16 GB | 512 GB | Windows 11 Pro | 6 260,00 zł |
| bez systemu operacyjnego | 8 GB | 256 GB | brak | 4 687,00 zł |

Istniejąca karta `aio-dell-pro-24` opisywała wersję z Windows, więc powstała druga: **`aio-dell-pro-24-bez-systemu`**. Rozwiązanie takie samo, jakie katalog ma już przy laptopach (Dell Pro 16 bez licencji obok Dell Pro 16 Plus). Karty linkują do siebie i wprost podają, na czym polega różnica — ekran, procesor, gwarancja i zestaw z klawiaturą są identyczne, różni je licencja, pamięć i dysk.

Karta bez systemu mówi „dostarczany bez systemu operacyjnego", zgodnie z drukiem — bez dopisywania Ubuntu, którego dokument nie wymienia.

**Parser rozróżnia obie pozycje** po dopisku przy nazwie („DELL PRO 24 AiO bez systemu" / „z systemem"), bo link w druku jest w obu wierszach ten sam. 72 oferty, 82 karty.

**Cena w listingu poprawiona**: kafelek All in One podawał 3 400 PLN, czyli kwotę bez pokrycia w jakiejkolwiek ofercie.

**Wyjaśnione**: karta `dell-pro-16` deklaruje Ubuntu 24.04 LTS, choć druk ZUP mówi „System: BEZ SYSTEMU" — Ubuntu wgrywa z automatu producent, więc karta jest w porządku i nie należy jej „poprawiać". W nomenklaturze ZUP „bez systemu" znaczy bez licencji Windows.

## 2026-08-25 — film w hero: szerszy plan, przesunięty w prawo, prawdziwy pomiar

Trzecia wersja filmu, po uwagach z przeglądu. **26,8 s, pięć ujęć, 5,9 MB.**

**Szerszy plan.** Poprzednia wersja miała kamerę blisko, więc przycięcie w hero ścinało głowy i blaty. Wszystkie ujęcia wygenerowane od nowa z cofniętą kamerą i warunkiem kompozycyjnym: górna i dolna ćwiartka kadru to zapas (korony sosen, ściółka, sufit, podłoga), a treść mieści się w środkowej połowie. Sprawdzone symulacją przycięcia do 53% wysokości — nic istotnego nie wypada.

**Plan przesunięty w prawo.** Tekst hero leży po lewej i zasłaniał sceny. Lewa trzecia każdego kadru jest teraz pusta: pnie i mgła w lesie, ciemna ściana z bali w biurze. Nie dało się tego załatwić przesunięciem wideo w CSS — przy tej proporcji sekcji film jest skalowany do szerokości i nie ma zapasu na boki, więc musiało wejść w kompozycję. Sprawdzone symulacją z zaciemnioną lewą trzecią.

**Pomiar stosu to teraz pomiar bryły.** Pojedyncza linia na połowie stosu była nieuczciwa — LiDAR mierzy bryłę. Ujęcie ma siatkę prostopadłościanu obejmującą cały stos, z trzema opisanymi krawędziami: **10,00 m** długości wzdłuż czoła, **2,00 m** wysokości przy bliższym końcu, **2,40 m** głębokości wzdłuż górnej krawędzi (długość wyrzynków). Te same liczby na ekranie telefonu.

**Ostatnie ujęcie wydłużone do 9 s** (reszta po 5 s), z ciągłym ruchem przez całą długość — przy pięciu sekundach wyglądało na zdjęcie z jedną sekundą życia.

Poprzednie wersje filmu zachowane w `~/Downloads`: `hero-nadlesnictwo-bliski-kadr.mp4` i `hero-nadlesnictwo-szeroki.mp4`.

**Zapamiętane na przyszłość**: udział widocznego kadru zależy od szerokości okna, nie od poziomu powiększenia — przy oknie ~2500 px (monitor 2560 px albo zoom 80%) hero pokazuje ~43% kadru. Przesunięcie `object-position` z 42% na 58% ratuje wtedy pierwsze ujęcie i nie psuje pozostałych; zmiana jednej wartości, gdyby okazała się potrzebna.

## 2026-08-25 — wyszukiwarka w nagłówku

Pas z wyszukiwarką nad filmem zabierał 75–150 px każdej strony, a pod filmem lista podpowiedzi wypadała poniżej zgięcia. Wyszukiwarka trafiła więc tam, gdzie wytyczne ją widzą od początku — **do nagłówka**, jako lupa rozwijająca pole.

- ikona w rzędzie nagłówka (desktop i mobile), po kliknięciu rozwija się pole na całą szerokość pod nagłówkiem, z przyciskiem „Szukaj"
- kursor ląduje w polu od razu, Escape zamyka i czyści
- podpowiedzi rozwijają się nad treścią strony; przy oknie 900 px lista kończy się na 369 px, więc mieści się z zapasem
- **wyszukiwarka działa teraz na każdej podstronie**, nie tylko na stronie głównej — nagłówek jest wspólny

**Animacja lupy.** Sama ikona w rzędzie ikon bywa przeoczana, więc co cztery sekundy obwódka rozbłyska i rozpływa się w ciągu sekundy, po czym ikona wraca do spokoju na trzy sekundy. Rytm celowo z długą przerwą — ma raz na jakiś czas złapać wzrok, a nie migać. Klatki `@keyframes puls-lupy` w `globals.css`, animacja gaśnie przy `prefers-reduced-motion` i po otwarciu pola (wtedy ikona zmienia się w krzyżyk zamykający).

Ze strony głównej zniknęła sekcja z wyszukiwarką razem z nieużywanym już stanem `searchQuery`.

## 2026-08-24 — wyszukiwarka: własny pas, przycisk i generowany indeks

**Wyszukiwarka nie znajdowała iPhone'ów ani iPadów** — i nie tylko ich. Indeks był wpisany ręcznie w `SearchAutocomplete.tsx` i rozjechał się z katalogiem: **brakowało dziesięciu kart** (oba iPhone'y, oba iPady, EliteBook 6 G1ah 14, Bixolon SPP-R410, Galaxy Tab Active5, Galaxy S25 FE, oba UPS-y Vertiv), a wpis Bixolona prowadził na `bixolon-spp-r410`, czyli adres, którego nie ma — klik kończył się błędem 404.

Indeks buduje teraz `scripts/indeks-wyszukiwarki.mjs` → `data/wyszukiwarka.ts`, wpięty w hook `prebuild` obok licznika kart. Nazwa i kategoria pochodzą z karty, słowa kluczowe z nazwy, sluga i kategorii, a do tego tabela synonimów: „ekran" znajduje monitory, „czytnik" i „skaner" czytniki kodów, „ksero" urządzenia wielofunkcyjne, „ups" zasilacze awaryjne. Sprawdzone czternaście fraz, wszystkie trafiają.

**Pas z wyszukiwarką przeprojektowany według wytycznych.** Wcześniejsza wersja podkreślała pole zieloną obwódką — czyli tym, co w formularzach czyta się jak stan walidacji. NN/g: pole ma być widoczne i wystarczająco szerokie na typowe zapytanie. Baymard wskazuje trzy dźwignie — pozycję (wyśrodkowana mocniejsza niż w rogu), kontrast otoczenia i rozmiar — oraz przycisk zatwierdzenia obok pola. Stąd: jasnozielony pas odcinający się od ciemnego filmu nad nim, nagłówek i pole wyśrodkowane, neutralna ramka pola, a kolor marki przeniesiony na przycisk **„Szukaj"**. Placeholder podpowiada zakres.

**Przycisk musiał zacząć działać.** Katalog nie ma osobnej strony wyników, więc Enter reagował wyłącznie po strzałkowaniu do pozycji. Teraz Enter i „Szukaj" otwierają podświetloną podpowiedź, a gdy żadna nie jest wybrana — pierwszą z listy. Sprawdzone: „em45" + „Szukaj" prowadzi na `/produkt/zebra-em45`.

## 2026-08-24 — film w hero: dwie poprawki po przeglądzie

**Morfing biurka wycofany.** Pomysł, żeby laptop zamienił się w dwa monitory w jednym ujęciu, dał efekt monitorów wyrastających z blatu — fizycznie nie do przyjęcia. Zamiast tego dwa osobne ujęcia tego samego biurka złączone zwykłym przenikaniem: praca na laptopie, potem to samo miejsce z dwoma monitorami. Zmiana stanowiska nadal się czyta. W promptach obu klipów jawnie: nic się nie pojawia, nic nie znika, sprzęt nie rusza się z miejsca.

**iPhone — dwie pomyłki pod rząd, w tym moja.** Ujęcie pokazywało telefon z **ekranem na plecach** — interfejs pomiaru i wysepka aparatu na tej samej ścianie. Defekt był już na kadrze zatwierdzonym wcześniej i przeszedł niezauważony. Poprawiłem to odwracając telefon tyłem — i to było **błędne rozumowanie**: skoro LiDAR mierzy stos, obiektywy muszą celować w drewno, a leśniczy patrzy na ekran. Czyli od strony kamery widać **ekran**, a soczewek nie widać wcale. Wersja końcowa: ekran zwrócony do nas z podglądem stosu i odczytem „2,45 m", ta sama linia wymiarowa narysowana na prawdziwym stosie, obiektywy po drugiej stronie. Bez wiązki, bez połączenia telefonu z drewnem.

Film ma teraz **pięć ujęć, 22,8 s, 5,0 MB**. Sprawdzone na pięciu momentach w hero przy 1440 px.

**Drobiazg do ewentualnej poprawki**: w ostatnim ujęciu etykieta „2,45 m" wypada za akapitem w hero. Jest przygaszona gradientem i czyta się jako tło, ale gdyby przeszkadzała, wystarczy przesunąć linię wymiarową wyżej przy kolejnym generowaniu.

## 2026-08-24 — nowy film w hero strony głównej

`public/las_video.mp4` (ujęcie ściółki, 20 s) zastąpiony filmem opowiadającym dzień leśniczego: **`public/hero-nadlesnictwo.mp4`, 22,8 s, 1920 × 1080, bez dźwięku, 4,0 MB**.

Pięć ujęć, sklejonych przenikaniami po 0,6 s:

1. **las** — leśniczy z rejestratorem przy stosie, w tle dźwig ładujący drewno (5 s)
2. **biuro** — praca na laptopie (5 s)
2b. **biuro, drugie stanowisko** — to samo biurko z dwoma monitorami (5 s)
3. **drukarka** — wyciąga wydruk z Brothera MFC i podnosi go do oczu (5 s)
4. **pomiar** — mierzy stos iPhone'em 17 Pro w zachodzącym słońcu (5 s)

Ostatnie ujęcie wraca do lasu w tej samej porze dnia, więc pętla domyka się bez zgrzytu.

**Materiał źródłowy.** Ujęcia 1–3 powstały z grafik newsletterowych (`biuro-nadlesnictwa-anim`, `biuro-monitory-anim`, `las-em45-anim`), które miały tylko 600 × 338 px — odtworzone wiernie w 2688 × 1520 przed animacją. Ujęcia z drukarką i pomiarem trzeba było stworzyć od zera; drukarka jest 1:1 z renderu MFC-L6710DW, iPhone 1:1 z renderu karty produktu.

**Dwa razy trzeba było powtórzyć generowanie**, bo model dorabiał leśniczemu naszywkę **„Straż Leśna" z godłem** — emblemat prawdziwej służby państwowej. Prompty mają teraz jawny zakaz naszywek, emblematów i symboli narodowych. Poza tym: żadnych obrotów urządzeń (model zmyśla niewidoczne ścianki) i żadnej wiązki lasera przy pomiarze.

**Nakładka w hero przebudowana.** Płaskie `bg-black/40` na całej szerokości gasiło film — z kadru 16:9 w sekcji 1440 × 460 widać i tak tylko środkowe 57% wysokości. Teraz gradient od lewej (`from-black/75 via-black/45 to-black/20`) plus delikatny cień od dołu: nagłówek i akapit zachowują kontrast, wyszukiwarka po prawej pozostaje czytelna, a film jest widoczny. Sprawdzone na czterech momentach filmu w 1440 px i na 390 px.

**Zauważone przy okazji, nie naprawione**: na 390 px placeholder w polu wyszukiwarki jest ucięty („min. 3 zr") — pole jest węższe niż tekst. Defekt wcześniejszy, niezwiązany z filmem.

Pliki robocze: `~/Downloads/hero-kadry/` (pięć kadrów 2k + cztery klipy), gotowy film także w `~/Downloads/hero-nadlesnictwo.mp4`.

## 2026-08-23 — drukarki termiczne ZUP Łódź, koniec wpisów ręcznych

`Oferta na drukarki termiczne_01.07.2026.docx` — **sześć drukarek z wyposażeniem**, wszystkie z kartami. 70 ofert w pliku generowanym.

| model | cena netto | pozycji dodatkowych |
|---|---|---|
| Bixolon SPP-R410 | **1 921,00 zł — promocja** | 4 |
| Seiko MPA-40 | 2 078,00 zł | 4 |
| Zebra ZQ521 | 2 514,50 zł | 7 |
| Honeywell RP4 | 2 525,00 zł | 4 |
| Sewoo LK-P400 | 2 536,00 zł | 4 |
| Sewoo LK-P43 | 2 654,00 zł | 5 |

**Uwaga terminowa: cała ta oferta wygasa 31.08.2026** — cron zgłosi ją tego dnia.

**Sewoo LK-P43 ma teraz dwie składnice** — Łódź 2 654,00 zł i Olsztyn 2 744,50 zł — więc karta pokazuje porównanie.

**Zawartość zestawu czytana z dokumentu, nie zgadywana.** Druki otwierają listę słowami „w zestawie:”, a parser dotąd wybierał z niej pozycje po słowach kluczowych i gubił „Moduł Bluetooth”, „Torba”, „Gwarancja 24 miesiące”. Teraz bierze dokładnie to, co dokument wypisał pod nagłówkiem, kończąc listę na zdaniu albo na nocie o dostawie i serwisie. Poprawione dane na dziewięciu ofertach.

**`data/oferty-reczne.ts` schudł do jednego wpisu.** ZQ521 z Łodzi i z Olsztyna były przepisywane ze zrzutów, bo nie mieliśmy dokumentów źródłowych — teraz mamy oba, i to z okresami obowiązywania, których zrzuty nie zawierały. Zostaje wyłącznie ZSLP Stargard (cennik przetargowy, bez pliku). Pozycję „Papier termiczny 104/33/25”, której nie pokazujemy na karcie, pomija teraz sam parser (`POMIJANE_POZYCJE`) — wcześniej trzymała ją ręczna edycja, którą regeneracja by nadpisała.

**Poprawki w tabeli cen:** oznaczenie „najtaniej” pojawia się tylko wtedy, gdy któraś składnica jest realnie tańsza (przy 231,00 zł kontra 231,00 zł znikło z obu kolumn), a z nazw pozycji zniknęły spacje wewnątrz nawiasów („( karton 60 szt. )” → „(karton 60 szt.)”).

## 2026-08-23 — pierwszy druk spoza ZUP Łódź: Sewoo LK-P43 z Olsztyna

`Druk zamówienia na dostawę drukarek termicznych i akcesoriów 16.10.2024.docx` (ZPUH Olsztyn). Dodany **Sewoo LK-P43 — 2 744,50 zł netto**, oferta od 16.10.2024 do odwołania, w cenie ładowarka sieciowa i samochodowa; osobno ładowarki po 231,00 zł, akumulator 434,50 zł i papier termiczny 110/30 za 7,54 zł. Brother RJ-4230B pominięty — nie jest z naszej oferty. 64 oferty w pliku generowanym.

**Parser rozpoznaje składnicę.** Dotąd każdy dokument szedł jako ZUP Łódź. Teraz składnica wynika z nagłówka dokumentu (ZPUH/Olsztyn, ZSLP/Stargard, domyślnie ZUP Łódź), a `strona` z linkiem do asortymentu jest dobierana per składnica.

**Czwarty format okresu**: „( oferta ważna od dnia 16.10.2024r.)”.

**Wpis ręczny wygrywa z generowanym.** Ten sam plik zawiera ofertę na Zebrę ZQ521 z Olsztyna, którą mamy przepisaną ręcznie w `data/oferty-reczne.ts` — bez pozycji „Papier termiczny 104/33/25”, usuniętej na wyraźne polecenie. Gdyby wersja generowana miała pierwszeństwo, papier wracałby na kartę przy każdym uruchomieniu parsera, a karta pokazywałaby dwie kolumny Olsztyna. `data/oferty.ts` scala więc listy tak, że przy tym samym modelu w tej samej składnicy zostaje wpis ręczny. Sprawdzone na karcie ZQ521: trzy kolumny, Olsztyn bez papieru.

**Myślniki wypunktowania** usuwane z listy „W cenie” — druk Olsztyna wypunktowuje zawartość zestawu i na karcie wychodziło „W cenie: - Ładowarka sieciowa i samochodowa”.

## 2026-08-23 — trzy karty sprzętu EZD

Domknięta oferta na sprzęt do EZD: **wszystkie osiem urządzeń na kartach**, 61 ofert, 81 kart produktu.

| nowa karta | cena netto | wyposażenie z oferty |
|---|---|---|
| `honeywell-pc42e-t` — Honeywell PC42E-T | 556,00 zł | etykiety, taśma, dyspenser, gilotyna, głowice 203 i 300 dpi |
| `zebra-ds2278` — Zebra DS2278 | 486,00 zł | podstawka, kabel USB, akumulator |
| `honeywell-1250g` — Honeywell Voyager 1250g | 294,00 zł | podstawka, kabel USB |

Druk podaje przy tych trzech wyłącznie nazwę modelu i link do karty katalogowej producenta, więc specyfikacja pochodzi od Honeywella i Zebry: PC42E-T — termotransfer, 203 lub 300 dpi, do 6 ips, Ethernet i USB w standardzie, 128 MB RAM i Flash, zgodność akcesoriów z PC42T; DS2278 — Bluetooth, akumulator 2400 mAh na 84 godziny i 110 000 odczytów, IP52, 250 upadków z 0,5 m; Voyager 1250g — laser jednoliniowy, 100 odczytów na sekundę, zasięg do 58 cm.

**Voyager 1250g jest przewodowy**, mimo że druk pisze „(bezprzewodowy)”. Świadczy o tym również jego własne wyposażenie w tej samej ofercie: podstawka i kabel USB, bez akumulatora — w odróżnieniu od DS2278, który akumulator ma. Karta opisuje go jako przewodowy.

**Do rozstrzygnięcia przy okazji:** nagłówek „Akcesoria dodatkowe do czytnika ZEBRA DS2208” stoi w druku pod pozycją DS2278 i zawiera akumulator, więc podstawka, kabel i akumulator trafiły na kartę DS2278. Karta DS2208 nie ma w tej ofercie żadnego wyposażenia — jeżeli składnica sprzedaje podstawkę także do wersji przewodowej, trzeba to dopisać ręcznie.

**Brakujące zdjęcia — dziewięć sztuk:** `pc42e_t_1.png`, `zebra-ds2278.png`, `honeywell-1250g.png`, `hp460_1.png`, `hp715_1.png`, `torba_hp_15.png`, `524pu_1.png`, `524pm_1.png`, `527pm_1.png`.

## 2026-08-23 — sprzęt do EZD

`Oferta na sprzęt do EZD 03.2026.docx` — **wszystkie pięć urządzeń, które mamy w katalogu**, z ich wyposażeniem. 58 ofert łącznie.

| model | cena netto | wyposażenie |
|---|---|---|
| Zebra ZD421c | 1 552,00 zł | moduł RS232, moduł Ethernet, etykiety, trzy rodzaje kaset z taśmą |
| Honeywell PC45t | 2 087,00 zł | etykiety, taśma termotransferowa |
| Epson DS-730n | 2 247,00 zł | — |
| Zebra DS2208 | 487,00 zł | — |
| Honeywell Voyager 1450g | 408,00 zł | podstawka, kabel USB |

**Trzeci format daty.** Ten druk pisze „Oferta obowiązuje od 10.03.2026r. do odwołania” — trzecie sformułowanie po „w okresie od…” i „na zamówienia złożone od…”.

**Urządzenie rozpoznawane po nagłówku bloku.** Czytniki i drukarki są tu opisane jedną, dwiema linijkami, więc dotychczasowe rozpoznawanie po bloku parametrów ich nie łapało i wyposażenie jednego przeciekało do drugiego (PC45t zebrał dziewięć pozycji zamiast dwóch). Dokument ma jednak regularną sekwencję: urządzenie, nagłówek „Akcesoria i materiały eksploatacyjne do…”, lista pozycji. Parser patrzy więc jeden wiersz w przód — pozycja stojąca tuż nad takim nagłówkiem jest urządzeniem, choćby opisana jedną linijką. Puste rzędy między wierszami są przy tym pomijane.

**Wyposażenie idzie za pozycją w dokumencie, nie za nazwą w nagłówku.** Warto to odnotować, bo nagłówek bywa nieaktualny: pod bezprzewodowym czytnikiem ZEBRA DS2278 stoi nagłówek nazywający DS2208, a wśród pozycji jest akumulator — którego przewodowy DS2208 nie ma. Gdyby decydowała nazwa z nagłówka, nasza karta DS2208 dostałaby akumulator. Ta sama zasada oszczędziła nam wcześniej tonerów Brothera MFC-L8690CDW dopisanych pod MFC-L8730CDW.

**Bez kart, z oferty wypadły** (razem z wyposażeniem): Honeywell PC42E-T (556,00 zł), Zebra DS2278 bezprzewodowa (486,00 zł), Honeywell 1250g bezprzewodowy (294,00 zł).

## 2026-08-23 — trzy karty akcesoriów HP

Domknięta oferta na akcesoria: **12 z 12 pozycji na kartach**, 53 oferty łącznie, 78 kart produktu.

| nowa karta | cena netto | z oferty |
|---|---|---|
| `hp-460` — HP 460 Multi-device Keyboard | 189,20 zł | Bluetooth 5.3 i 2,4 GHz, do 3 urządzeń, blok numeryczny, 12 klawiszy programowalnych, ładowanie USB-C, do 24 miesięcy, odporna na zalanie, 660 g |
| `hp-715` — HP 715 Rechargeable Mouse | 273,90 zł | Bluetooth 5.3 i 2,4 GHz, do 3 urządzeń, 1200–3000 dpi, czujnik działa na szkle, 6 programowalnych przycisków, akumulator do 90 dni, 85 g |
| `torba-hp-15` — Torba HP do laptopów 15,6″ | 148,50 zł | dwie komory z przegrodami, otwór na uchwyt walizki, odporna na wilgoć i zarysowania, 600 g |

Specyfikacja przepisana z oferty, bez uzupełniania z zewnątrz — druk podaje komplet parametrów. Torba HP to **osobny produkt** od naszej „Torby na laptopa 15,6″” za 275 zł; ZUP prowadzi obie, więc karty linkują do siebie.

Dopisane do listingu akcesoriów i do wyszukiwarki.

**Brakujące zdjęcia — sześć sztuk:** `hp460_1.png`, `hp715_1.png`, `torba_hp_15.png` oraz monitory `524pu_1.png`, `524pm_1.png`, `527pm_1.png`.

## 2026-08-23 — akcesoria komputerowe

`Oferta na akcesoria komputerow_03.2026r.docx` — **dziewięć pozycji z dwunastu** trafiło na karty, 50 ofert łącznie:

| pozycja | cena netto |
|---|---|
| Podkładka pod mysz | 12,10 zł |
| Torba na laptopa 15,6″ | 275,00 zł |
| Podnóżek biurowy | 165,00 zł |
| Dell Pro KM5221W | 211,20 zł |
| HP 655 Wireless Keyboard and Mouse | 272,80 zł |
| Dell Pro Plus KM7321W | 401,50 zł |
| Samsung SSD T9 1 TB | 605,00 zł |
| Microsoft 365 Business Standard | 616,00 zł |
| Samsung SSD T7 Shield 2 TB | 858,00 zł |

**Dopasowanie po tekście z linkami.** Dwie pozycje Della nazywają się identycznie — „Klawiatura i mysz bezprzewodowa DELL” — i różnią się wyłącznie modelem w adresie (`km5221w` kontra `km7321w`), więc porównanie musi widzieć linki, a nie sam widoczny tekst.

**HP 655 rozpoznany po parametrach.** Wiersz nazywa się „Klawiatura i mysz bezprzewodowa WRLS KB/MSE Combo”, bez modelu. Zgodność jest jednak jednoznaczna: 2,4 GHz, zasięg 10 m, bateria klawiatury 20 miesięcy i myszy 24 miesiące — dokładnie to, co ma nasza karta HP 655.

Cała oferta to płaska lista niezależnych produktów, więc każdy wiersz idzie przez mechanizm pozycji samodzielnych (ten sam, co przy tablecie Samsunga) — normalna reguła zrobiłaby z drugiego i kolejnych wierszy wyposażenie pierwszego.

**Bez kart, do decyzji:** klawiatura HP 460 Multi-device (189,20 zł), torba do laptopów HP 15,6″ (148,50 zł), mysz HP 715 6E6F0AA (273,90 zł).

## 2026-08-23 — urządzenia wielofunkcyjne i drukarki Brother

Dwa druki ZUP (`Brother_03.2026` i `wielofunkcyjne_04.2026`) — **osiem urządzeń z materiałami eksploatacyjnymi**, 41 ofert łącznie:

| model | cena netto | tonerów i akcesoriów |
|---|---|---|
| Brother DCP-B7620DW | 958,00 zł | 2 |
| Brother HL-L6210DW | 1 337,00 zł | 4 |
| Brother MFC-L8390CDW | 1 700,00 zł | 3 |
| Brother DCP-L5510DW | 1 375,00 zł | 3 |
| Brother MFC-L5710DW | 2 119,00 zł | 3 |
| Brother MFC-L6710DW | 2 300,00 zł | 3 |
| Brother HL-L6410 | 2 407,00 zł | 5 |
| Brother MFC-L8900CDW | 3 103,00 zł | 12 |

Te druki mają zupełnie inną budowę niż wcześniejsze i wymusiły cztery zmiany w parserze. Po każdej sprawdzone pole po polu, że **żadna z 15 pierwotnych ofert się nie ruszyła**:

1. **Okres bez słowa „okresie”.** Te dokumenty piszą „na zamówienia złożone od 10.03.2026r. do odwołania”, więc dotychczasowe wyrażenie nie łapało daty i bramka jakości odrzucała cały plik.
2. **Tabela bez nagłówka.** Wiersz „Nazwa | Cena sprzedaży…” bywa tu osobną tabelą nad danymi, więc rozpoznajemy też tabele po zawartości: nazwa w pierwszej komórce, kwota w drugiej.
3. **Model rozpoznawany po nazwie, nie tylko po linku.** Większość wierszy prowadzi na brother.pl, nie na naszą kartę. Porównanie idzie po samych literach i cyfrach, bo druki piszą raz „MFCL-6710DW”, raz „MFC L 6710 DW”.
4. **Materiały eksploatacyjne wiązane nagłówkiem.** Nagłówek „Materiały eksploatacyjne do drukarki BROTHER DCPB7620DW” wskazuje model wprost — bez tego tonery jednej drukarki dopisywały się do poprzedniej pozycji w tabeli (DCP-B7620DW zebrał 13 pozycji zamiast dwóch). Wiersz, który ma blok parametrów, ale nie ma karty w katalogu, zamyka poprzednią grupę i wypada, zamiast udawać akcesorium sąsiada.

**Do decyzji — Brother MFC-L8730CDW, 2 086,00 zł.** Nie ma karty w katalogu. Model istnieje (kolor 33 str./min, duplex, ADF 80 arkuszy), ale w druku ZUP pod jego pozycją stoi nagłówek „Materiały eksploatacyjne do urządzenia wielofunkcyjnego BROTHER - MFCL - 8690CDW” — czyli materiały starszego modelu, na który **mamy** kartę, tyle że bez ceny w tym druku. Kolejna niespójność u ZUP. Do rozstrzygnięcia: czy L8730CDW zastąpił L8690CDW i robimy nową kartę, czy to pomyłka w druku. Dziesięć pozycji materiałów czeka i nie zostało nigdzie przypisane.

## 2026-08-23 — tablet Samsung z oferty ZUP

`Oferta na tablety 03.2026.docx` obejmuje trzy urządzenia — Zebrę ET45, Samsunga Tab Active 5 i Zebrę XSLATE L10 — a katalog prowadzi tylko Samsunga. Dodany **Samsung Galaxy Tab Active5: 2 119,00 zł netto**, ZUP Łódź od 10.03.2026 do odwołania, w cenie ładowarka sieciowa. 33 oferty.

**Wyjmowanie pojedynczej pozycji.** Parser dostał tabelę `POJEDYNCZE_POZYCJE`: wskazany wiersz staje się osobną ofertą **bez wyposażenia**, a reszta dokumentu jego nie dotyczy. To istotne akurat tutaj, bo ładowarki, akumulatory i stacje w tym dokumencie są wymieszane między trzema modelami — normalna reguła (wyposażenie idzie do urządzenia, pod którym stoi) przypisałaby Samsungowi ładowarkę Zebry L10. Pozostałe dwa urządzenia lądują jak dotąd w pominiętych, bo nie mają kart.

Sprawdzone po zmianie parsera: **żadna z 15 pierwotnych ofert się nie ruszyła** (jedyna różnica to zmiana nazwy pola `druk` → `formularz`).

## 2026-08-23 — monitory: rocznik 2026 i trzy nowe karty HP

**Karty 27″ Della podmienione na nowszą generację.** `dell-pro-27-plus-p2725he` → **`dell-pro-27-p2726h`**, `dell-pro-27-plus-p2725he-usbc` → **`dell-pro-27-p2726he`**. Zmiany w specyfikacji wzięte z kart katalogowych Della, nie przepisane w ciemno:

| | P2725H(E) — było | P2726H(E) — jest |
|---|---|---|
| odświeżanie | 100 Hz | **120 Hz** |
| czas reakcji | nie podawany | 5 ms GtG w trybie szybkim, 8 ms GtG |
| wideo | HDMI 1.4, DP 1.2, VGA | HDMI z 1920 × 1080 przy 120 Hz, DP 1.4 (bez VGA) |
| USB | 3 × USB-A, 1 × USB-B | 2 × USB-A 5 Gb/s, 1 × USB-B 5 Gb/s, 2 × USB-C 5 Gb/s (15 W) |
| USB-C upstream (HE) | 90 W | **100 W** |
| gwarancja | 3 lata Premium Panel | 3 lata z wymianą z wyprzedzeniem i Premium Panel |

Zdjęto `usedBy` z obu kart — w panelu leżą sztuki sprzedane jako P2725HE, więc po zmianie modelu ta sekcja mówiłaby o innym urządzeniu. **Nazw w panelu klienta i w panelu handlowym nie ruszono** z tego samego powodu: opisują sprzęt już sprzedany, a nie ofertę.

**Trzy nowe karty HP Series 5 Pro** — specyfikacja z oferty ZUP (kamera, dźwięk, porty stacji, ergonomia, wagi) uzupełniona parametrami matrycy z kart HP:

| karta | cena netto | wyróżnik |
|---|---|---|
| `hp-seria-5-pro-524pu` | 1 022,00 zł | 23,8″ FHD 100 Hz, stacja dokująca, USB-C 100 W, RJ-45 z MAPT/WoL/PXE |
| `hp-seria-5-pro-524pm` | 1 390,00 zł | jw. plus kamera 5 Mpix pop-up z IR, 4 głośniki, 2 mikrofony DNN |
| `hp-seria-5-pro-527pm` | 1 733,00 zł | 27″ QHD 100 Hz, ten sam zestaw konferencyjny |

Dopisane do listingu monitorów i do wyszukiwarki. **Brakuje zdjęć** — karty wskazują `/524pu_1.png`, `/524pm_1.png`, `/527pm_1.png`; Jakub prześle rendery.

Cała oferta monitorów jest już w katalogu: **12 z 12 modeli**, łącznie 32 oferty ze składnic. 75 kart produktu.

## 2026-08-23 — ceny monitorów z ZUP Łódź

`Oferta na monitory.HP.Dell 01.06.2026.docx` — dwanaście modeli, każdy w osobnej sekcji z własnym terminem. **Siedem weszło na karty**:

| model | cena netto | od |
|---|---|---|
| Dell Pro 24 Plus P2425H | 673,00 zł | 10.03.2026 |
| Dell Pro 24 Plus P2425HE z USB-C | 953,00 zł | 10.03.2026 |
| Dell Pro 24 P2424HEB | 1 698,00 zł | 10.03.2026 |
| Dell Pro 27 P2724DEB | 1 924,00 zł | 10.03.2026 |
| HP S3 Pro 324pf | 524,00 zł | 30.05.2026 |
| HP Pro S5 QHD 527pq | 1 263,00 zł | 30.05.2026 |
| HP Pro S5 QHD USB-C 527pu | 1 386,00 zł | 10.03.2026 |

Sześć z nich ZUP linkuje wprost do naszych kart, więc dopasowanie było automatyczne. 27 ofert w sumie.

**Skracanie zbyt długich nazw.** Bramka jakości zatrzymała import, bo nazwa pozycji w tabeli monitorów to całe zdanie reklamowe („Monitor komputerowy DELL P2425H wyróżniony 4-gwiazdkowym certyfikatem TÜV…, zapewnia większą wygodę i płynną łączność” — 141 znaków). Parser ucina nazwę **dopiero po przekroczeniu limitu**, na pierwszym przecinku lub kropce; krótsze zostają nietknięte, żeby nie zjeść wariantu z nazw w rodzaju „…, wersja standardowa i rozszerzona”.

**Dwie nasze karty miały błędne oznaczenia — poprawione:**
- `hp-seria-5-pro-527pu` nazywała się „HP Pro S5 QHD USB-C **527pv**”, choć slug i plik zdjęcia od początku mówiły `527pu`. W gamie HP Series 5 Pro 27″ są 527pq, 527pu i 527pm — modelu „527pv” nie ma. Poprawione w karcie, listingu monitorów, wyszukiwarce i karcie 527pq.
- `dell-pro-27-plus-p2724heb` → **`dell-pro-27-plus-p2724deb`**. „P2724HEB” nie istnieje: konferencyjna 24-calówka to P2424HEB, a 27-calowa QHD z kamerą to **P2724DEB** — dokładnie to, co opisuje nasza karta (27″, QHD 2560 × 1440, kamera 4 Mpx, USB-C 90 W). Zmieniony folder, nazwa, slug i wszystkie odwołania (listing, wyszukiwarka, panel handlowy, karta P2424HEB).

**Do decyzji — pięć pozycji z oferty bez pokrycia w katalogu:**
- **Dell P2726H (705,00 zł)** i **Dell P2726HE z USB-C (1 046,00 zł)** — to rocznik 2026, a nasze karty opisują poprzednią generację P2725H i P2725HE. Oba modele istnieją u Della. Pytanie: podmieniamy istniejące karty na nowszą generację czy dokładamy osobne?
- **HP S5 Pro FHD USB-C 524pu (1 022,00 zł)**, **HP S5 Pro FHD USB-C Conferencing 524pm (1 390,00 zł)**, **HP S5 Pro QHD USB-C Conferencing 527pm (1 733,00 zł)** — brak kart. Wszystkie trzy istnieją w gamie HP; do zbudowania potrzebne rendery.

Build 72 kart przechodzi.

## 2026-08-23 — liczby na kafelkach liczone, nie wpisywane

Kafelek „All in One — 5 produktów” przy jednej karcie. Liczby na stronie głównej były wpisane ręcznie w `app/page.tsx` i rozjechały się w **10 z 13 kategorii**: drukarki laserowe obiecywały 14 przy trzech kartach, akcesoria 18 przy jedenastu, rejestratory 15 przy dziesięciu, a monitory odwrotnie — 8 przy dziewięciu.

Teraz liczy to `scripts/policz-karty.mjs` → `data/liczby-kategorii.ts`, podpięty pod hook **`prebuild`**, więc odświeża się sam przed każdym buildem. Kafelek trzyma `href`, nie `count`; `getCategoryUrl` czyta z tej samej listy zamiast z osobnej mapy. Dorzucona odmiana liczebnika: „1 produkt”, „3 produkty”, „11 produktów”.

**Skąd ubytek w All in One — sprawdzone w historii, nie z tej sesji.** Listing miał dwie pozycje (HP ProOne 440 G9 23,8″ i Dell Pro 24); HP wypadł **1.11.2025** w commicie `1c438c1`. Porównanie wszystkich listingów `d0ab73b` ↔ drzewo robocze: jedyna różnica to laptopy 4 → 5, czyli dzisiejszy EliteBook.

Ten sam mechanizm zjadł kiedyś 14-calowego HP: pierwotny katalog miał **EliteBook 645 G11 14″** i **665 G11 16″**, po odświeżeniu generacji został sam 16″. Dlatego ZUP wciąż pisze w ofercie „645 14” G11” — przekleja nazwę poprzedniej generacji.

**Wstrzymane do weryfikacji przez Jakuba (24.08):**
- czy przywracamy HP ProOne 440 G9 (stary wpis był zaślepką: placeholder zamiast zdjęcia, ogólnikowa specyfikacja, brak karty; w aktualnej ofercie ZUP na all-in-one jest wyłącznie Dell)
- ceny Dell Pro 24 AiO: **bez systemu 8 GB / 256 GB — 4 687,00 zł** i **z Windows 11 Pro 16 GB / 512 GB — 6 260,00 zł**, obie pozycje linkują do jednej karty `aio-dell-pro-24`, która opisuje wyłącznie wersję z Windows. Do rozstrzygnięcia: dwa wiersze w cenniku jednej karty czy dwie karty. Plik oferty nazywa się „ALL IN ONE HP”, a w środku jest sam DELL — kolejna literówka ZUP po tej z EliteBookiem.

Oferta na all-in-one **nie jest jeszcze wciągnięta** — `data/oferty-skladnicy.ts` ma nadal 20 ofert bez AiO.

Build 72 kart przechodzi.

## 2026-08-23 — koniec ze słowem „druk zamówienia”

Zakaz obejmuje treść, kod i ścieżki. Wymiecione z:

- **karty produktu** — etykieta wiersza w cenniku „Druk zamówienia” → **„Jak zamówić”**, link „Pobierz druk” → **„Pobierz formularz”**
- **treści kart** — „Stacja jest w tym samym druku zamówienia” → „w tej samej ofercie ZUP Łódź”; „Druk zamówienia ZUP Łódź obejmuje 36 miesięcy gwarancji” → „Oferta ZUP Łódź obejmuje…”
- **maila z crona** i etykiet źródeł w `data/oferty-reczne.ts`
- **ścieżki publicznej**: `public/druki/` → **`public/formularze/`** (link do PDF EM45 przepięty i sprawdzony)
- **modelu danych**: pole oferty `druk` → **`formularz`**, `DRUKI_PDF` → `FORMULARZE_PDF`
- **komentarzy** w `ProductPage`, cronie i parserze

„Druk” w sensie technologii (prędkość druku, druk dwustronny, termotransfer) zostaje — zakaz dotyczy znaczenia „dokument do wypełnienia”. Reguła zapisana w pamięci.

Build 72 kart przechodzi.

## 2026-08-23 — karta EliteBook 6 G1ah 14″, koniec „Gdzie kupić”

**Boks „Gdzie kupić” usunięty z kart** (prawa kolumna nagłówka) razem z polem `whereToBuy` — z typu `ProductData`, z typu `Seller` i z 71 plików kart. Zanim wypadło, wyciągnąłem z niego to, co było w nim wartościowe: linki do właściwych działów ZUP. Trafiły do parsera jako `DZIALY_ZUP` (monitory, akcesoria-komputerowe, komputery-pc-laptopy-all-in-one; domyślnie rejestratory), więc cennik i cron prowadzą teraz laptopy pod `/komputery-pc-laptopy-all-in-one`, a nie pod rejestratory. Listingi kategorii mają własne, niezależne pole o tej samej nazwie — ich nie ruszałem.

**Nowa karta: HP EliteBook 6 G1ah 14″** (`hp-elitebook-6-g1ah-14`), 5 329,00 zł netto + stacja HP Dock G6 USB-C 100 W 648,00 zł, ZUP Łódź od 30.05.2026 do odwołania.

**Druk myli nazwę modelu.** ZUP wpisał „Producent HP Model Elite Book 645 14” G11 C51 GKET”, ale numer katalogowy **C51GKET to HP EliteBook 6 G1ah 14″** — AMD Ryzen 5 220, 14″ WUXGA, 16 GB DDR5, 512 GB SSD, Wi-Fi 6E, Windows 11 Pro, srebrny. Potwierdzone u trzech polskich dystrybutorów (SuperTech, mak24h, hppartner); EliteBook 645 G11 to poprzednia generacja na Ryzenach 7000. Karta idzie za numerem katalogowym, nie za nazwą z druku — to również młodsza siostra istniejącej karty EliteBook 6 G1ah 16″, więc obie trzymają wspólne nazewnictwo. Warto to zgłosić ZUP.

Reszta specyfikacji z druku: 16 GB z rozbudową do 64 GB, SSD 512 GB, USB4 40 Gb/s ×2 z PD i DP 1.4, USB-A ×2 (jeden dosilony), HDMI 2.1, RJ-45, Smart Card, czytnik linii papilarnych, klawiatura 98 klawiszy podświetlana, 56 Wh, 1,4 kg, gwarancja 36 miesięcy. Ekran: druk pisze „FullHD”, karta podaje dokładne WUXGA 1920 × 1200 za specyfikacją modelu. Procesora druk nie wymienia — wziąłem go z numeru katalogowego. Render dostarczony przez Jakuba (`public/hp_elite_14_1.png`), karta podlinkowana z `/kategoria/laptopy`.

Parser rozpoznaje ten model przez tabelę MODELE (druk nie ma linku do karty), a dopasowanie idzie teraz po **całej komórce**, nie po pierwszej linijce — nazwa pozycji brzmi „Komputer przenośny typu LAPTOP z systemem operacyjnym”, a model stoi wiersz niżej. 20 ofert z 24 druków.

**Do naprawy osobno**: pole `price` w listingach kategorii jest tekstem („5 400 PLN”), więc sortowanie po cenie czyta z niego `parseFloat` = 5 i nie działa w żadnej kategorii. Kwoty nie są nigdzie wyświetlane, więc nie wprowadzają w błąd — ale sortowanie jest martwe.

**Kontrola strony w cronie z bezpiecznikiem**: znacznik krótszy niż trzy znaki (`16` ze sluga `dell-pro-16`) trafiałby na przypadkowy numer w treści, więc taka oferta jest oznaczana jako „nie da się sprawdzić automatem” zamiast fałszywego „model nadal na stronie”.

Build 72 kart przechodzi.

## 2026-08-23 — ceny laptopów z ZUP Łódź

`Oferta Laptopy_06.2026.docx` — cztery laptopy z kartami wchodzą na strony, plus stacja dokująca jako pozycja dodatkowa:

| model | cena netto | pozycje dodatkowe |
|---|---|---|
| Dell Pro 16 | 4 259,00 zł | Dell PRO SMART DOCK SD25 — 859,10 zł |
| Dell Pro 16 Plus | 5 939,00 zł | jw. |
| Dell Pro 14 Plus | 5 885,00 zł | jw. |
| HP EliteBook 6 G1ah 16″ | 4 646,00 zł | — |

Okres: od 10.03.2026 do odwołania. Tylko ZUP Łódź.

**Parser rozbity na sekcje i wiele modeli.** Dotąd zakładał jeden druk = jedno urządzenie; ten plik łamie oba założenia: ma cztery modele w jednej tabeli i dwie części z osobnymi terminami (sam laptop od 10.03, laptop ze stacją od 30.05). Teraz akapit „Oferta aktualna… w okresie” otwiera sekcję, tabele z cenami trafiają do sekcji otwartej przed nimi, a model rozpoznaje się po **linku do naszej karty**, który ZUP wstawia przy nazwie — pewniejszym niż nazwa, bo „DELL PRO 16” jest przedrostkiem „DELL PRO 16 PLUS”. Pozycja bez linku to wyposażenie i idzie do modeli tej samej marki (stacja Dell do trzech Delli, nie do stojącego obok HP), a gdy marki nie widać — pod urządzenie, przy którym stoi w druku. Druki jednomodelowe idą starą ścieżką; **regeneracja nie ruszyła żadnej z 15 dotychczasowych ofert** (porównane pole po polu).

**Dostawca czytany z druku, nie zakładany.** Sekcja cen pisała „dostawę oraz serwis prowadzi TAKMA” na sztywno, a druk wskazuje to przy każdym urządzeniu osobno — przy Dell Pro 16, Dell Pro 16 Plus i Galaxy A36 stoi tam SCANTER. Parser wyciąga tę nazwę do pola `dostawca`, a karta podaje ją tylko wtedy, gdy wszystkie druki na dany model mówią to samo; przy rozbieżności albo braku informacji zdanie się urywa na „Zamówienie składa nadleśnictwo w składnicy.”. Ręczne oferty ZQ521 nie mają tej informacji (przepisane ze zrzutów), więc ta karta zdania nie pokazuje.

**Pominięte z tego druku**: HP EliteBook 645 14″ G11 (5 329,00 zł) i stacja HP Dock G6 USB-C 100 W (648,00 zł) z drugiej sekcji — nie ma karty produktu dla tego laptopa.

Build 71 kart przechodzi.

## 2026-08-23 — cechy wyróżnione do siatki „dlaczego”

Zielone boksy z prawej kolumny nagłówka (`signature`) przeniesione do sekcji „Do czego przyda się w nadleśnictwie”. Zostają zielone — ta sama forma kafelka co reszta, tylko w kolorze wyróżnienia; wariant `ciemny` też działa (ikona z `/icons/white/`).

**Powtórzenia scalone.** 32 z 42 kart miały cechę wyróżnioną o tej samej ikonie i tym samym temacie co jeden z powodów („Pięć lat gwarancji producenta” obok „Pięć lat gwarancji”, „Zaprojektowana pod upadki z 2 metrów” obok „Upadek z dwóch metrów, wielokrotnie”). Rozdzielone po karcie tego nie było widać, w jednej siatce czytało się jak zacinająca się płyta. Parę o wspólnej ikonie karta łączy więc w jeden kafelek i zostawia ten z obszerniejszym opisem — oba mówią o tym samym fakcie, więc nic nie ginie. Logika w `ProductPage`, dane kart nietknięte.

**Siatka kończy się równo.** Przy nieparzystej liczbie kafelków pierwszy (wyróżniony) rozpina się na obie kolumny, zamiast zostawiać dziurę w ostatnim wierszu.

Build 71 kart przechodzi.

## 2026-08-23 — terminy do crona, druki do tabeli

Cztery poprawki po przeglądzie tabeli cen:

**Żadnych okresów na karcie.** „obowiązuje do 3 kwietnia 2027” zniknęło z nagłówków kolumn — zostaje sama nazwa składnicy (miasto siedzi już w nazwie, więc podpis pod spodem tylko je powtarzał). Wypadła też cała logika datowa z `CenySkladnic` i `CenaWSkrocie` (`dzis`, `wygasla`, `czynne`, blok „Cennik wymaga odświeżenia”) oraz pomocnicze `dataPL`/`MIESIACE`.

**Aktualności pilnuje cron.** Nowy `app/api/cron/kontrola-ofert/route.ts`, codziennie 6:00 UTC (`vercel.json`), za `Bearer CRON_SECRET`. W dniu wygaśnięcia i każdego kolejnego dnia zbiera oferty z `okres.do <= dziś`, zagląda na stronę składnicy sprawdzając, czy model nadal tam jest, i przysyła raport mailem (Resend, ten sam nadawca co newsletter). Podgląd bez wysyłki: `?dry=1`. Cron **nic nie kasuje sam** — składnice publikują druki jako .docx/.pdf i przebudowują strony, więc kontrola strony to tylko sygnał, decyzję podejmuje człowiek. `data/oferty.ts` eksportuje teraz `WSZYSTKIE_OFERTY` na potrzeby crona.

**Papier termiczny z Olsztyna usunięty** z `data/oferty-reczne.ts`. Pozycja „Papier termiczny” z druku ZUP Łódź (6,55 zł) zostaje — to inna pozycja z innego dokumentu.

**Bez komentarza o pustym zestawie.** „W cenie: druk nie wymienia zawartości zestawu” wypadło; gdy cennik milczy o zawartości (Stargard), komórka po prostu nie ma tego wiersza.

**Druki wciągnięte do tabeli.** Linki ze stopki przeniesione do ostatniego wiersza cennika, każdy w kolumnie swojej składnicy, pod etykietą „Druk zamówienia”. Tam, gdzie mamy PDF (EM45, ZUP Łódź) — „Pobierz druk”; gdzie nie — „Otwórz stronę składnicy”. W stopce została sama nota o VAT i płatnościach.

**Link celuje w konkretną podstronę.** Oferta ma teraz opcjonalne `strona` — adres działu składnicy z tym asortymentem, z fallbackiem na `www` składnicy. ZPUH Olsztyn prowadzi drukarki pod `/drukarki`, ZUP Łódź trzyma rejestratory i drukarki razem pod `/rejestratory`. Tego samego adresu używa wpis w „Gdzie kupić” oraz kontrola strony w cronie — dzięki temu cron sprawdza dokładnie tę stronę, którą widzi klient (test na cofniętej dacie Olsztyna: „model nadal na stronie”). Stargard nie ma działu z elektroniką — jego oferta pochodzi z cennika przetargowego, więc link zostaje na stronie głównej.

**Naprawione przy okazji — dwa martwe adresy składnic.** Kontrola strony wywaliła się na obu i tak wyszło, że karty linkowały w próżnię: `zslp.stargard.lasy.gov.pl` w ogóle nie istnieje (NXDOMAIN), poprawnie jest `zslpstargard.szczecin.lasy.gov.pl`, a jednostka nazywa się Zespół Składnic Lasów Państwowych w Stargardzie, nie „Zakład Składnica”. Olsztyn nie odpowiadał na wariancie z `www` — zostało `zpuh.olsztyn.lasy.gov.pl`. Te adresy karta pokazuje też w boksie „Gdzie kupić”.

Build 71 kart przechodzi. Bez commita — czeka na akceptację.

## 2026-08-23 — ZQ521: porównanie trzech składnic

Ceny ZQ521 z trzech źródeł, przepisane ręcznie ze zrzutów (cenniki nie są w formacie, który da się sparsować):

| składnica | urządzenie | okres | pozycji dodatkowych |
|---|---|---|---|
| ZSLP Stargard | 2 444,00 zł | 16.04.2025 – 03.04.2027 | 0 |
| ZUP Łódź | 2 514,50 zł | nie podano | 7 |
| ZPUH Olsztyn | 2 596,00 zł | nie podano | 4 |

Ręczne wpisy trafiły do `data/oferty-reczne.ts`, bo `oferty-skladnicy.ts` jest generowany i nadpisywany. Oba źródła łączy `data/oferty.ts` — karta odpytuje jedno wejście.

**Zestaw przeniesiony do kolumn.** Każda składnica sprzedaje inny komplet: Łódź dokłada moduł Bluetooth i torbę, Olsztyn torbę i 24 miesiące gwarancji, a cennik Stargardu nie mówi o zawartości nic. Wiersz „W cenie” pod nazwą urządzenia sugerowałby, że dotyczy wszystkich kolumn, więc przy kilku składnicach opis idzie do komórki z ceną — a gdy druk milczy, kolumna mówi to wprost („druk nie wymienia zawartości zestawu”). Przy jednej składnicy zostaje pod nazwą, bo nie ma czego mylić.

To istotne przy tym konkretnym porównaniu: najtańszy jest Stargard, ale jako jedyny nie deklaruje, co jest w pudełku.

**Znalezione przy okazji, nie naprawione**: karty produktu mają poziome przewijanie na 390 px (`scrollWidth` 514 zamiast 390) — także te bez tabeli cen, więc to defekt wcześniejszy, nie skutek tej zmiany. Tabela cen jest prawidłowo zamknięta we własnym kontenerze `overflow-x-auto`.

## 2026-08-23 — ceny w składnicach: osobna sekcja i porównanie

Poprawki po pierwszej wersji (blok w prawej kolumnie rozciągał nagłówek karty — przy TC27 z jedenastoma pozycjami dodatkowymi kolumna była dwa razy dłuższa od galerii):

- Ceny przeniesione do **sekcji na pełną szerokość** `#ceny`, umieszczonej **pod specyfikacją** i wpiętej w nawigację karty jako „Ceny”. W prawej kolumnie został jednoliniowy skrót („Cena w składnicy · od 2 563 zł netto”) prowadzący do sekcji — cena zostaje nad zgięciem, ale nie rozciąga nagłówka.
- **Tabela porównawcza składnic**: wiersz to pozycja z druku, kolumna to składnica, kolumny sortowane od najtańszej, najniższa cena w wierszu oznaczona „najtaniej”, brak pozycji w danej składnicy to „—”. Przy jednej składnicy tabela degeneruje się do czytelnych dwóch kolumn, więc to jeden komponent na oba przypadki.
- Model danych rozszerzony o **składnicę** (`data/skladnice.ts`: ZUP Łódź, ZSLP Stargard, ZPUH Olsztyn) — klucz unikalności to teraz model + składnica, nie sam model.
- Składnica z ofertą dopisuje się automatycznie do boksu „Gdzie kupić”, nawet jeśli karta jej nie wymienia.
- Pod nazwą urządzenia wiersz **„W cenie: …”** — druk wymienia w komórce urządzenia, co wchodzi w kwotę (ładowarka sieciowa i samochodowa, dodatkowa karta pamięci, przy niektórych modelach pasek na rękę). Bez tego czytelnik nie wiedział, czy ładowarki trzeba dokupić, zwłaszcza że niżej w tabeli stoi płatna „Ładowarka sieciowa 103,40 zł” (to sztuka zapasowa). Parser bierze tylko wiersze nazywające przedmioty, pomijając specyfikację i akapity „UWAGA / można doposażyć”. Trafienie: 15 z 15 ofert. W stopce tabeli dopisane, że pozycje pod urządzeniem są płatne dodatkowo.
- **Druk PDF** dla EM45 (przerobiony wcześniej z Worda) leży w `public/druki/` i jest podpięty pod „Druk zamówienia — ZUP Łódź”. Pozostałe składnice prowadzą na razie do swoich stron.

**Brakujące dane**: mam wyłącznie druki ZUP Łódź. Do porównania cen potrzebne są oferty ZSLP Stargard i ZPUH Olsztyn, a także pakiet drukarek ZUP (ZIP ze strony składnicy) — bez nich ZQ521 nie ma jeszcze żadnej ceny.

## 2026-08-23 — ceny ze składnicy na kartach produktu

Decyzja: parser dokumentów ZUP, wszystkie modele, ceny jawnie na karcie.

**Dlaczego jawnie** — NN/g: cena to potrzeba informacyjna numer jeden także w zakupach służbowych, a firmy jej nieujawniające są odbierane jako wymijające. Dziś ZUP publikuje kwoty wyłącznie w środku plików Worda; na stronie składnicy cen nie ma. Druk ZUP na EM45 linkuje przy tym do karty na rejestratory.info — pętla była domknięta tylko w jedną stronę.

**Parser** `scripts/parsuj-oferty-zup.mjs` → `data/oferty-skladnicy.ts`. Czyta `.docx` bez zależności npm (unzip + regex po `word/document.xml`), rozpoznaje okres obowiązywania w obu wariantach („do 31.08.2026” i „do odwołania”), wyciąga tabelę cen, obsługuje wiersze-podtytuły (nazwa pozycji bywa w wierszu nad ceną) i formaty kwot `2.563,00`, `121,-`, `77,-.`. Ma bramkę jakości: przerywa, jeśli slug nie ma karty, brakuje okresu albo kwota wygląda podejrzanie.

Wynik: **15 ofert** z 23 dokumentów. Siedem pominiętych, bo nie mają karty produktu (CT32, EC55, TC26, TC57, TC77, HMD XR21, Point Mobile).

**Blok na karcie**: cena netto dla LP jako liczba wiodąca, brutto obok, znacznik promocji, pozycje dodatkowe z cenami (dla EM45 siedem, ze stacją dokującą 1 991 zł), stopka z okresem obowiązywania i odsyłaczem do druku.

**Wygaszanie po terminie** — sprawdzenie daty siedzi w `useEffect`, nie w renderze. Karty są generowane statycznie, więc `new Date()` w trakcie renderowania zamarłoby w chwili builda i oferta nigdy by nie wygasła bez ponownego wdrożenia. Przetestowane: po podmianie daty końcowej na przeszłą blok przestaje pokazywać kwoty i prosi o aktualny cennik.

Formatowanie kwot i dat robione ręcznie, bez `toLocaleString` — Node na serwerze bywa budowany z okrojonym ICU i gubił spację tysięczną („2563,00 zł” w HTML).

**Zostaje do decyzji**: 72 ceny w danych kategorii nadal nie są nigdzie renderowane i służą wyłącznie sortowaniu „cena rosnąco”. Sortowanie działa więc na liczbach, których nikt nie widzi i nikt nie aktualizuje — do zasilenia z ofert albo do wyłączenia.

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
