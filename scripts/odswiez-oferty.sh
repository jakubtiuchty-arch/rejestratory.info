#!/bin/bash
# Odświeża `data/oferty-skladnicy.ts` ze wszystkich druków, które składają się
# na katalog. Trzymamy to w skrypcie, bo lista miejsc nie jest oczywista:
# rejestratory mają własny folder, reszta leży w folderach tematycznych,
# a cztery druki stoją luzem w Pobranych obok dokumentów, których do katalogu
# nie chcemy — dlatego są wskazane pojedynczo, a nie całym folderem.
#
#   bash scripts/odswiez-oferty.sh
#
# Druki modeli wycofanych z produkcji pomija sam parser (stała WYCOFANE).
# Oferty z druków, których nie ma już na dysku, parser przenosi ze starego
# pliku i wypisuje na końcu — sprawdź tę listę, zanim zacommitujesz.
set -euo pipefail
cd "$(dirname "$0")/.."

P=~/Downloads

node scripts/parsuj-oferty-zup.mjs \
  "$P/REJESTRATORY 3" \
  "$P/MONITORY" \
  "$P/KOMPUTERY ALL IN ONE" \
  "$P/TABLETY" \
  "$P/URZĄDZENIA WIELOFUNKCYJNE" \
  "$P/Oferta na akcesoria komputerow_03.2026r.docx" \
  "$P/Oferta na drukarki termiczne_01.07.2026.docx" \
  "$P/Oferta na sprzęt do EZD 03.2026.docx" \
  "$P/Druk zamówienia na dostawę drukarek termicznych i akcesoriów 16.10.2024.docx"
