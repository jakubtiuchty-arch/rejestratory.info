# Druki składnic — źródło cen w katalogu

Tu leżą oryginalne dokumenty `.docx`, z których powstaje `data/oferty-skladnicy.ts`,
czyli wszystkie ceny widoczne na kartach produktu. Karta nie ma własnej ceny —
czyta ją z tego wygenerowanego pliku.

## Skąd się tu wzięły

Do 26.08.2026 druki leżały w Pobranych, w kilku folderach tematycznych. Okazało
się to kruche na dwa sposoby: `Oferta Laptopy_06.2026.docx` po prostu zniknęła
z dysku (a jest jedynym źródłem cen na laptopy), a wskazanie parserowi całego
folderu Pobranych wciągało dokumenty, których w katalogu nie chcemy. Dokumenty
mieszkają więc w repo, razem z kodem, który je czyta.

## Jak dodać nowy cennik

1. Wrzuć plik `.docx` do tego folderu. Stary możesz zostawić — przy dwóch
   ofertach na ten sam model w tej samej składnicy wygrywa nowsza data.
2. `bash scripts/odswiez-oferty.sh`
3. `git diff data/oferty-skladnicy.ts` — widać każdą zmienioną kwotę.
4. Commit razem z drukiem, żeby dało się odtworzyć, skąd wzięła się cena.

## Czego tu nie ma

**`Oferta Laptopy_06.2026.docx`** — zniknęła z Pobranych, zanim dokumenty
trafiły do repo. Ceny laptopów (Dell Pro 14/16/16 Plus, HP EliteBook) żyją
dalej, bo parser przenosi oferty z druków, których nie widzi na dysku, i wypisuje
je na końcu przebiegu. Warto ten druk odzyskać — do tego czasu tych pięciu ofert
nie da się odświeżyć ani zweryfikować.

## Druki, których parser celowo nie czyta

Leżą tu dla porządku, ale do katalogu nie wchodzą. Powody są dwa i są zapisane
w `scripts/parsuj-oferty-zup.mjs`:

- **`WYCOFANE`** — model zszedł z produkcji: Zebra EC55, TC26, TC57, TC77,
  HMD XR21 oraz sam M3 SL20 (SL20+ z osobnego druku zostaje).
- **`NIE_NASZE`** — pozycję prowadzi inny dostawca: Point Mobile PM95 (TAXUS IT).

Toshiba nie ma karty w katalogu, więc jej druk odpada sam — parser pomija
pozycje bez karty produktu.
