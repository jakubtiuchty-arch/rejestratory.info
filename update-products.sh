#!/bin/bash

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Aktualizacja produktów${NC}"
echo -e "${BLUE}========================================${NC}\n"

if [ ! -d "app/produkt" ]; then
    echo -e "${RED}Błąd: app/produkt nie istnieje!${NC}"
    exit 1
fi

BACKUP_DIR="backup_products_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo -e "${GREEN}✓${NC} Backup: ${BACKUP_DIR}\n"

SUCCESS=0
SKIP=0

for file in app/produkt/*/page.tsx; do
    [ ! -f "$file" ] && continue
    
    NAME=$(basename $(dirname "$file"))
    echo -e "${YELLOW}►${NC} $NAME"
    
    if grep -q "import CourierServiceSection from" "$file"; then
        echo -e "  ${BLUE}→${NC} Już OK"
        ((SKIP++))
        continue
    fi
    
    mkdir -p "$BACKUP_DIR/$NAME"
    cp "$file" "$BACKUP_DIR/$NAME/page.tsx"
    
    awk '
    /^.use client./ && !done {
        print $0
        print ""
        print "import CourierServiceSection from \"@/components/CourierServiceSection\";"
        done=1
        next
    }
    /^\/\/ Courier Service Section Component/,/^}$/ { next }
    { print }
    ' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
    
    echo -e "  ${GREEN}✓${NC} OK"
    ((SUCCESS++))
done

echo -e "\n${GREEN}✓ Zaktualizowane: $SUCCESS${NC}"
echo -e "${BLUE}→ Pominięte: $SKIP${NC}"
