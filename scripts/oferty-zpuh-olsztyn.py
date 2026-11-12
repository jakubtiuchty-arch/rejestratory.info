#!/usr/bin/env python3
"""
Oferty ZPUH Olsztyn → `data/oferty-zpuh-olsztyn.ts` i formularze przy kartach.

Olsztyn zamawia na naszych formularzach (scripts/formularz-oferty.mjs, 16.10.2026):
wpisuje do nich ceny i publikuje na swojej stronie razem z cennikami PDF. Źródłem
cen są więc pola tych formularzy — każda kwota jest też w cenniku Olsztyna
(sprawdzone 12.11.2026). Kopie leżą w `oferty-zrodla/zpuh-olsztyn-2026-11/`, a karta
linkuje formularz na stronie Olsztyna — zawsze w wersji, którą składnica publikuje.

    python3 scripts/oferty-zpuh-olsztyn.py

Nazwy pozycji są ujednolicone z ofertą ZUP Łódź tam, gdzie to ta sama rzecz
(ten sam rodzaj, wydajność i kolor) — tabela na karcie paruje wiersze po nazwie.
Pozycje bez odpowiednika (np. toner o innej wydajności) dostają własną nazwę
z kodem producenta i własny wiersz.
"""
import json
from urllib.parse import quote_plus
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
ZRODLA = ROOT / 'oferty-zrodla/zpuh-olsztyn-2026-11'
WYJSCIE = ROOT / 'data/oferty-zpuh-olsztyn.ts'
OKRES = {'od': '2026-11-06', 'do': None}  # pole „oferta od” w formularzach, bez daty końcowej
STRONA = 'https://zpuh.olsztyn.lasy.gov.pl/'
DOKUMENTY = 'https://zpuh.olsztyn.lasy.gov.pl/documents/21871640/54943230/'
# identyfikatory plików w bibliotece dokumentów Olsztyna (z linków na stronach działów, 12.11.2026)
UUID = {
    'Druk zamówień Zebra-TC27 6.11.2026.pdf': 'c44e0e37-57f6-b52f-844f-2671db109f04',
    'Druk zamówień Zebra EM45 6.11.2026.pdf': 'f12a529c-6978-b697-ac33-73ef561f8228',
    'Druk zamówień Honeywell CT32 ze skanerem 6.11.2026.pdf': 'c978d8cb-d3d6-d5d8-48cf-8f5116cf00cd',
    'Druk zamówień Honeywell CT32 bez skanera 6.11.2026.pdf': '6ebc8227-9731-ec0f-08a4-8462acdaa2df',
    'Druk zamówień Samsung S25 FE 6.11.2026.pdf': '970e9995-e407-e6e4-7b09-d9dd70f8d57b',
    'Druk zamówień Zebra ZQ521 6.11.2026.pdf': 'e10f537f-e6be-ec88-ee8a-10e5a19e6923',
    'Druk zamówień Seiko MP-A40 6.11.2026.pdf': 'f5df67ac-70e7-a66d-1eec-3ff751a189bd',
    'Druk zamówień Sewoo LK-P 400 6.11.2026.pdf': 'bc48c24d-ec9a-7025-09b5-09fa813d3a9a',
    'Druk zamówień Honeywell RP4 6.11.2026.pdf': '47fed63d-83df-9bec-b15a-f8028b9bb9d9',
    'Druk zamówień Bixolon SPP-R410 6.11.2026.pdf': '3edbf36b-09c3-6b50-88c0-a908109da1ec',
    'Druk zamówień Brother DCP-B7620DW 6.11.2026.pdf': '03832221-b76b-f1e2-adaf-c765fa9f0a9b',
    'Druk zamówień Brother DCP-L5510DW 6.11.2026.pdf': 'd5b368c4-0719-f2d5-0ed6-0f4fa24ea856',
    'Druk zamówień Brother MFC-l8970CDW 6.11.2026.pdf': 'f35c6c52-2cea-4f32-74c9-e3bd8d77d213',
    'Druk zamówień Brother MFC-L6710DW 6.11.2026.pdf': '12f459a9-0d01-69de-4514-da70bc3108b8',
    'Druk zamówień Brother MFC-L8390CDW 6.11.2026.pdf': 'caf3be32-06ce-1c56-f498-654e64016844',
    'Druk zamówień Brother MFC-L8730CDW 6.11.2026.pdf': 'a3fcb02f-3eac-f5b1-65e6-a5d1c1ca6a67',
    'Druk zamówień Brother MFC-L5710DW 6.11.2026.pdf': '012b2bcb-84c8-2a10-4b34-6999327e66d9',
    'Druk zamówień Brother HL-L6210DW 6.11.2026.pdf': '1018ccd9-18fd-e03a-0c29-8d3fa95fb1b8',
    'Druk zamówień Brother HL-L6410DN 6.11.2026.pdf': '654be07a-cce5-c5de-a7dd-aaa8aa999588',
    'Druk zamówień Zebra ZD421c 6.11.2026.pdf': '236652c4-931b-fea7-e687-9a397c6b37e6',
    'Druk zamówień Epson DS-730N 6.11.2026.pdf': '23d20bee-484c-bece-0b19-9e17a3b5f210',
    'Druk zamówień Zebra DS2208 6.11.2026.pdf': '76f5f738-c632-d078-3fe0-ad8084e2f6c2',
}

TERMICZNA = ['Akumulator', 'Ładowarka sieciowa i samochodowa', 'Torba', 'Gwarancja 24 miesiące']
TERMICZNA_NAZWY = {'Akumulator standardowy': 'Akumulator', 'Papier termiczny w rolkach': 'Papier termiczny'}
REJESTRATOR = ['Akumulator', 'Karta pamięci micro SD 64 GB', 'Ładowarka sieciowa oraz ładowarka samochodowa', 'Gwarancja 24 miesiące']
BROTHER = lambda mies: ['Toner startowy', 'Kabel zasilający', f'Gwarancja {mies} miesi{"ące" if mies == 24 else "ęcy"}']

CT32_NAZWY = {
        'Kontrakt serwisowy producenta': 'Kontrakt serwisowy producenta (3 letni)',
        'Szkło lub folia ochronna na ekran': 'Folia lub szkło ochronne na ekran',
        'Stacja dokująca USB': 'Stacja dokująca z portem USB + zasilacz +kabel USB',
        'Stacja dokująca USB + Ethernet': 'Stacja dokująca z portem Ethernet + zasilacz',
        'Akumulator standardowy': 'Standardowy akumulator główny 4500 mAh',
    }

# plik formularza → slug karty, folder, dział na stronie Olsztyna, zestaw z cennika, nazwy pozycji
OFERTY = {
    'Druk zamówień Zebra ZQ521 6.11.2026.pdf': ('zebra-zq521', 'drukarki-mobilne', 'drukarki', TERMICZNA, {
        'Akumulator standardowy': 'Akumulator o pojemności standardowej',
        'Akumulator o rozszerzonej pojemności': 'Akumulator o pojemności rozszerzonej',
        'Stacja dokująca do akumulatora': 'Stacja dokująca dla pojedyń. akumulatora w wersji std i rozszerz.',
        'Papier termiczny w rolkach': 'Papier termiczny',
        'Kontrakt serwisowy producenta': 'Kontrakt serwisowy',
    }),
    'Druk zamówień Seiko MP-A40 6.11.2026.pdf': ('seiko-mpa40', 'drukarki-mobilne', 'drukarki', TERMICZNA, TERMICZNA_NAZWY),
    'Druk zamówień Sewoo LK-P 400 6.11.2026.pdf': ('sewoo-lkp400', 'drukarki-mobilne', 'drukarki', TERMICZNA, TERMICZNA_NAZWY),
    'Druk zamówień Honeywell RP4 6.11.2026.pdf': ('honeywell-rp4', 'drukarki-mobilne', 'drukarki', TERMICZNA, TERMICZNA_NAZWY),
    'Druk zamówień Bixolon SPP-R410 6.11.2026.pdf': ('bixolon-sppr410', 'drukarki-mobilne', 'drukarki', TERMICZNA, TERMICZNA_NAZWY),
    # CT32 Olsztyn sprzedaje w dwóch wersjach — każda ma swoją kartę (wersję bez skanera dodano 12.11.2026)
    'Druk zamówień Honeywell CT32 ze skanerem 6.11.2026.pdf': ('honeywell-ct32', 'rejestratory', 'rejestratory', ['System Android 14'] + REJESTRATOR + ['Skaner 1D i 2D'], CT32_NAZWY),
    'Druk zamówień Honeywell CT32 bez skanera 6.11.2026.pdf': ('honeywell-ct32-bez-skanera', 'rejestratory', 'rejestratory', ['System Android 14'] + REJESTRATOR, CT32_NAZWY),
    # plik nazywa się „S25 FE”, ale Olsztyn przerobił formularz na Galaxy S26 FE (8/256 GB) — karta dodana 12.11.2026
    'Druk zamówień Samsung S25 FE 6.11.2026.pdf': ('samsung-s26-fe', 'rejestratory', 'rejestratory', ['Akumulator', 'Ładowarka sieciowa', 'Ładowarka samochodowa', 'Kabel USB-C', 'Gwarancja 24 miesiące'], {}),
    'Druk zamówień Zebra-TC27 6.11.2026.pdf': ('zebra-tc27', 'rejestratory', 'rejestratory', REJESTRATOR + ['Skaner 1D i 2D'], {
        'Stacja dokująca USB': 'Stacja dokująca + port USB + zasilacz +kabel USB',
        'Stacja dokująca USB + Ethernet': 'Stacja dokująca + port USB + zasilacz + kabel USB + port Ethernet',
        'Akumulator standardowy': 'Akumulator o standardowej pojemności 3800 mAh',
        'Akumulator powiększony': 'Akumulator o powiększonej pojemności 5250mAh',
        'Nakładka ochronna na obudowę': 'Nakładka na obudowę zabezpieczająca przed uszkodzeniami',
        'Kontrakt serwisowy producenta': 'Kontrakt serwisowy producenta (3 letni) do ZEBRA TC27',
    }),
    'Druk zamówień Zebra EM45 6.11.2026.pdf': ('zebra-em45', 'rejestratory', 'rejestratory', REJESTRATOR, {
        'Nakładka ochronna na obudowę': 'Nakładka na obudowę zabezpieczająca przed uszkodzeniami',
        'Kontrakt serwisowy producenta': 'Kontrakt serwisowy producenta (3 letni) do ZEBRA EM45',
    }),
    'Druk zamówień Brother DCP-B7620DW 6.11.2026.pdf': ('brother-dcp-b7620dw', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', BROTHER(36), {}),
    'Druk zamówień Brother DCP-L5510DW 6.11.2026.pdf': ('brother-dcp-l5510dw', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', BROTHER(36), {
        'Toner TN3600': 'Toner o standardowej wydajności – min 3000 stron',
        'Toner TN3600XL': 'Toner o zwiększonej wydajności – min. 6000 stron',
        'Toner TN3600XXL': 'Toner superwydajny – 11000 stron BK',
    }),
    'Druk zamówień Brother HL-L6210DW 6.11.2026.pdf': ('brother-hl-l6210dw', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', BROTHER(36), {
        'Toner TN3600': 'Toner o standardowej wydajności – 3000 stron',
        'Toner TN3600XL': 'Toner o zwiększonej wydajności - 6000 stron',
        'Toner TN3600XXL': 'Toner superwydajny – 11000 stron',
        'Toner TN3610': 'Toner ultrawydajny – 18000 stron',
    }),
    # ZUP ma do HL-L6410 tonery 8000/12000/20000 stron, Olsztyn 6000/11000/25000 — osobne wiersze
    'Druk zamówień Brother HL-L6410DN 6.11.2026.pdf': ('brother-hl-l6410', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', BROTHER(24), {
        'Toner TN3600': 'Toner standardowy – 3000 stron',
        'Toner TN3600XL': 'Toner wysokowydajny – 6000 stron (TN3600XL)',
        'Toner TN3600XXL': 'Toner superwydajny – 11000 stron (TN3600XXL)',
        'Toner TN3610XL': 'Toner ultrawydajny – 25000 stron (TN3610XL)',
    }),
    'Druk zamówień Brother MFC-L5710DW 6.11.2026.pdf': ('brother-mfc-l5710dw', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', BROTHER(24), {
        'Toner TN3600': 'Toner standardowy – 3000 stron',
        'Toner TN3600XXL': 'Toner superwydajny – 11000 stron (TN3600XXL)',
    }),
    'Druk zamówień Brother MFC-L6710DW 6.11.2026.pdf': ('brother-mfc-l6710dw', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', BROTHER(36), {
        'Toner TN3600': 'Toner standardowy – 3000 stron',
        'Toner TN3600XL': 'Toner o zwiększonej wydajności – 6000 stron (TN3600XL)',
        'Toner TN3600XXL': 'Toner superwydajny – 11000 stron',
        'Toner TN3610': 'Toner ultrawydajny – 18000 stron (TN3610)',
    }),
    # ZUP podaje do L8390CDW trzy tonery bez koloru (poza BK) — wspólny jest tylko superwydajny czarny
    'Druk zamówień Brother MFC-L8390CDW 6.11.2026.pdf': ('brother-mfc-l8390cdw', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', ['Tonery startowe', 'Kabel zasilający', 'Gwarancja 36 miesięcy'], {
        'TN248BK — czarny': 'Toner standardowy czarny – 1000 stron (TN248BK)',
        'TN248C — cyjan': 'Toner standardowy cyjan – 1000 stron (TN248C)',
        'TN248M — magenta': 'Toner standardowy magenta – 1000 stron (TN248M)',
        'TN248Y — żółty': 'Toner standardowy żółty – 1000 stron (TN248Y)',
        'TN248XLBK — czarny': 'Toner o zwiększonej wydajności czarny – 3000 stron (TN248XLBK)',
        'TN248XLC — cyjan': 'Toner o zwiększonej wydajności cyjan – 2300 stron (TN248XLC)',
        'TN248XLM — magenta': 'Toner o zwiększonej wydajności magenta – 2300 stron (TN248XLM)',
        'TN248XLY — żółty': 'Toner o zwiększonej wydajności żółty – 2300 stron (TN248XLY)',
        'TN249BK — czarny': 'Toner superwydajny – 4500 stron BK',
        'TN249C — cyjan': 'Toner superwydajny cyjan – 4000 stron (TN249C)',
        'TN249M — magenta': 'Toner superwydajny magenta – 4000 stron (TN249M)',
        'TN249Y — żółty': 'Toner superwydajny żółty – 4000 stron (TN249Y)',
    }),
    'Druk zamówień Brother MFC-L8730CDW 6.11.2026.pdf': ('brother-mfc-l8730cdw', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', ['Tonery startowe', 'Kabel zasilający', 'Gwarancja 24 miesiące'], {
        'TN625BK — czarny': 'Toner standardowy czarny – 3000 stron',
        'TN625C — cyjan': 'Toner standardowy cyjan – 1800 stron',
        'TN625M — magenta': 'Toner standardowy magenta – 1800 stron',
        'TN625Y — żółty': 'Toner standardowy żółty – 1800 stron',
        'TN625XLBK — czarny': 'Toner wysokowydajny czarny – 5500 stron (TN625XLBK)',
        'TN625XLC — cyjan': 'Toner wysokowydajny cyjan – 4500 stron (TN625XLC)',
        'TN625XLM — magenta': 'Toner wysokowydajny magenta – 4500 stron (TN625XLM)',
        'TN625XLY — żółty': 'Toner wysokowydajny żółty – 4500 stron (TN625XLY)',
        'Bęben DR625CL': 'Bęben',
    }),
    'Druk zamówień Brother MFC-l8970CDW 6.11.2026.pdf': ('brother-mfc-l8970cdw', 'drukarki-i-urzadzenia-wielofunkcyjne', 'urzadzenia-wielofunkcyjne-drukarki-biurowe', BROTHER(36), {
        'TN625BK — czarny': 'Toner o standardowej wydajności czarny - 3000 stron',
        'TN625C — cyjan': 'Toner o standardowej wydajności cyjan – 1800 stron',
        'TN625M — magenta': 'Toner o standardowej wydajności magenta – 1800 stron',
        'TN625Y — żółty': 'Toner o standardowej wydajności żółty – 1800 stron',
        'TN625XXLBK — czarny': 'Toner o zwiększonej wydajności czarny – 7500 stron (TN625XXLBK)',
        'TN625XXLC — cyjan': 'Toner o zwiększonej wydajności cyjan – 6500 stron (TN625XXLC)',
        'TN625XXLM — magenta': 'Toner o zwiększonej wydajności magenta – 6500 stron (TN625XXLM)',
        'TN625XXLY — żółty': 'Toner o zwiększonej wydajności żółty – 6500 stron (TN625XXLY)',
        'TN627BK — czarny': 'Toner ultrawydajny czarny – 10000 stron (TN627BK)',
        'TN627C — cyjan': 'Toner ultrawydajny cyjan – 10000 stron (TN627C)',
        'TN627M — magenta': 'Toner ultrawydajny magenta – 10000 stron (TN627M)',
        'TN627Y — żółty': 'Toner ultrawydajny żółty – 10000 stron (TN627Y)',
    }),
    'Druk zamówień Zebra ZD421c 6.11.2026.pdf': ('zebra-zd421c', 'sprzet-do-ezd', 'urzadzenia-do-ezd-z-akcesoriami', ['Gwarancja 12 miesięcy'], {
        'Etykiety do drukarki': 'Etykiety',
        'Kaseta z taśmą woskową': 'Kasety z woskową taśmą barwiącą',
        'Kaseta z taśmą żywiczną': 'Kasety z żywiczną taśmą barwiącą',
        'Kaseta z taśmą woskowo-żywiczną': 'Kasety z woskowo/żywiczną taśmą barwiącą',
    }),
    'Druk zamówień Epson DS-730N 6.11.2026.pdf': ('epson-ds730n', 'sprzet-do-ezd', 'urzadzenia-do-ezd-z-akcesoriami', ['Zasilacz sieciowy', 'Kabel USB', 'Gwarancja 12 miesięcy'], {}),
    'Druk zamówień Zebra DS2208 6.11.2026.pdf': ('zebra-ds2208', 'sprzet-do-ezd', 'urzadzenia-do-ezd-z-akcesoriami', ['Kabel USB', 'Stojak', 'Gwarancja 12 miesięcy'], {}),
}


def kwota(tekst):
    x = round(float(tekst.replace(' ', '').replace(' ', '').replace(',', '.')), 2)
    return int(x) if x == int(x) else x


def main():
    oferty = []
    for plik, (slug, folder, dzial, zestaw, nazwy) in OFERTY.items():
        doc = fitz.open(ZRODLA / plik)
        pola = [(w.field_label.replace('Cena netto — ', '').replace(' (zł)', ''), w.field_value)
                for strona in doc for w in strona.widgets() if w.field_name.startswith('cena')]
        if not pola or any(not v.strip() for _, v in pola):
            raise SystemExit(f'{plik}: brak ceny w formularzu')
        (urzadzenie, cena), *dodatki = pola
        # wspólna mapa drukarek termicznych obejmuje warianty nazw, których dany formularz nie musi mieć
        nieuzyte = set() if nazwy is TERMICZNA_NAZWY else set(nazwy) - {n for n, _ in dodatki}
        if nieuzyte:
            raise SystemExit(f'{plik}: w formularzu nie ma pozycji {sorted(nieuzyte)}')
        oferty.append({
            'slug': slug,
            'skladnica': 'zpuh-olsztyn',
            'plik': plik,
            'formularz': DOKUMENTY + quote_plus(plik) + '/' + UUID[plik],
            'strona': STRONA + dzial,
            'okres': OKRES,
            # formularze Olsztyna (nasz szablon) podają serwis gwarancyjny i pogwarancyjny TAKMA
            'dostawca': 'TAKMA',
            'urzadzenie': {'nazwa': urzadzenie, 'cenaNetto': kwota(cena), 'promocja': False, 'wZestawie': zestaw},
            'dodatki': [{'nazwa': nazwy.get(n, n), 'cenaNetto': kwota(v), 'promocja': False, 'wZestawie': []} for n, v in dodatki],
        })
    oferty.sort(key=lambda o: o['slug'])
    WYJSCIE.write_text(
        '// PLIK GENEROWANY — nie edytować ręcznie.\n'
        '// Źródło: formularze zamówień ZPUH Olsztyn z 6.11.2026 (oferty-zrodla/zpuh-olsztyn-2026-11).\n'
        '// Odświeżenie: python3 scripts/oferty-zpuh-olsztyn.py\n\n'
        "import type { OfertaSkladnicy } from './oferty-skladnicy'\n\n"
        f'export const OFERTY_ZPUH_OLSZTYN: OfertaSkladnicy[] = {json.dumps(oferty, ensure_ascii=False, indent=2)}\n',
        encoding='utf-8')
    print(f'{WYJSCIE.relative_to(ROOT)}: {len(oferty)} ofert')
    for o in oferty:
        print(f"  {o['slug']:24} {o['urzadzenie']['cenaNetto']:>8} zł  + {len(o['dodatki'])} pozycji  {o['formularz']}")


if __name__ == '__main__':
    main()
