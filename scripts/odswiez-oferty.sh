#!/bin/bash
# Odświeża ceny na kartach: czyta druki z `oferty-zrodla/` i przepisuje
# `data/oferty-skladnicy.ts`, a potem przelicza liczniki kategorii i indeks
# wyszukiwarki, żeby nowy model od razu był do znalezienia.
#
#   bash scripts/odswiez-oferty.sh
#
# Co robić, gdy przychodzi nowy cennik:
#   1. wrzuć plik .docx do `oferty-zrodla/` (stary zostaw albo podmień),
#   2. odpal ten skrypt,
#   3. przejrzyj `git diff data/oferty-skladnicy.ts` — widać każdą zmianę ceny,
#   4. commit.
#
# Druków wycofanych modeli i pozycji innych dostawców parser nie czyta —
# listy WYCOFANE i NIE_NASZE stoją w scripts/parsuj-oferty-zup.mjs i są
# jedynym miejscem, gdzie te decyzje żyją.
set -euo pipefail
cd "$(dirname "$0")/.."

node scripts/parsuj-oferty-zup.mjs oferty-zrodla
node scripts/policz-karty.mjs
node scripts/indeks-wyszukiwarki.mjs
