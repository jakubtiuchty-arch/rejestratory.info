// PLIK GENEROWANY — nie edytować ręcznie.
// Źródło: oferty składnic (.docx). Odświeżenie:
//   node scripts/parsuj-oferty-zup.mjs "<katalog z ofertami>"

import type { KodSkladnicy } from './skladnice'

export type PozycjaOferty = {
  nazwa: string
  cenaNetto: number
  promocja?: boolean
  /** co dokument wymienia jako wchodzące w tę cenę */
  wZestawie?: string[]
}

export type OfertaSkladnicy = {
  /** slug karty produktu */
  slug: string
  /** która składnica prowadzi tę ofertę */
  skladnica: KodSkladnicy
  /** nazwa źródłowego pliku z ofertą */
  plik: string
  /** formularz do pobrania z naszego serwera, jeśli został przygotowany */
  formularz: string | null
  /** podstrona składnicy z tym asortymentem; bez niej link idzie na `www` składnicy */
  strona?: string
  /** okres, w którym składnica przyjmuje zamówienia po tych cenach */
  okres: { od: string; do: string | null } | null
  /** kto według dokumentu odpowiada za dostawę i serwis; null, gdy nie jest podany */
  dostawca?: string | null
  urzadzenie: PozycjaOferty
  dodatki: PozycjaOferty[]
}

export const OFERTY_SKLADNICY: OfertaSkladnicy[] = [
  {
    "slug": "aio-dell-pro-24",
    "skladnica": "zup-lodz",
    "plik": "Oferta na komputery ALL IN ONE HP 17.04.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "SCANTER",
    "urzadzenie": {
      "nazwa": "Komputer typu ALL IN ONE – DELL PRO 24 AiO z systemem operacyjnym",
      "cenaNetto": 6260,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "aio-dell-pro-24-bez-systemu",
    "skladnica": "zup-lodz",
    "plik": "Oferta na komputery ALL IN ONE HP 17.04.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "SCANTER",
    "urzadzenie": {
      "nazwa": "Komputer typu ALL IN ONE – DELL PRO 24 AiO bez systemu operacyjnego",
      "cenaNetto": 4687,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "bixolon-sppr410",
    "skladnica": "zup-lodz",
    "plik": "Oferta na drukarki termiczne_01.07.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka BIOXOLON SPP-R410 - w zestawie:",
      "cenaNetto": 1921,
      "promocja": true,
      "wZestawie": [
        "Moduł Bluetooth",
        "Akumulator, ładowarka sieciowa i samochodowa",
        "Torba na zestaw z rejestratorem"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 126.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 113.3,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 408.1,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Papier termiczny",
        "cenaNetto": 7.6,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "brother-dcp-b7620dw",
    "skladnica": "zup-lodz",
    "plik": "Oferta na urządzenia wielofunkcyjne_04.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/urzadzenia-wielofunkcyjne-",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka do stanowiska leśniczego",
      "cenaNetto": 958,
      "promocja": false,
      "wZestawie": [
        "Akcesoria: Kabel zasilający, toner startowy na min.2000 stron"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Bęben",
        "cenaNetto": 181.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner",
        "cenaNetto": 169.4,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "brother-dcp-l5510dw",
    "skladnica": "zup-lodz",
    "plik": "Oferta na urządzenie wielofunkcyjne Brother_03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/urzadzenia-wielofunkcyjne-",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "BROTHER DCPL 5510DW",
      "cenaNetto": 1375,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Toner o standardowej wydajności – min 3000 stron",
        "cenaNetto": 306.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o zwiększonej wydajności – min. 6000 stron",
        "cenaNetto": 539,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner superwydajny – 11000 stron BK",
        "cenaNetto": 709.5,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "brother-hl-l6210dw",
    "skladnica": "zup-lodz",
    "plik": "Oferta na urządzenia wielofunkcyjne_04.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/urzadzenia-wielofunkcyjne-",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "BROTHER HLL – 6210DW",
      "cenaNetto": 1337,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Toner o standardowej wydajności – 3000 stron",
        "cenaNetto": 385,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o zwiększonej wydajności - 6000 stron",
        "cenaNetto": 638,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner superwydajny – 11000 stron",
        "cenaNetto": 803,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner ultrawydajny – 18000 stron",
        "cenaNetto": 1023,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "brother-hl-l6410",
    "skladnica": "zup-lodz",
    "plik": "Oferta na urządzenia wielofunkcyjne_04.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/urzadzenia-wielofunkcyjne-",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka",
      "cenaNetto": 2407,
      "promocja": false,
      "wZestawie": [
        "Akcesoria: Kabel zasilający, toner startowy na min. 12000 stron"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Toner standardowy – 3000 stron",
        "cenaNetto": 327.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner wysokowydajny – 8000 stron",
        "cenaNetto": 583,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner superwydajny – 12000 stron",
        "cenaNetto": 896.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner ultrawydajny – 20000 stron",
        "cenaNetto": 918.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kabel interfejsu do PC",
        "cenaNetto": 44,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "brother-mfc-l5710dw",
    "skladnica": "zup-lodz",
    "plik": "Oferta na urządzenia wielofunkcyjne_04.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/urzadzenia-wielofunkcyjne-",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka – urządzenie wielofunkcyjne",
      "cenaNetto": 2119,
      "promocja": false,
      "wZestawie": [
        "Akcesoria: Kabel zasilający, toner startowy na min. 2000 stron"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Toner standardowy – 3000 stron",
        "cenaNetto": 327.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner wysokowydajny – 8000 stron",
        "cenaNetto": 720.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kabel interfejsu do PC",
        "cenaNetto": 44,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "brother-mfc-l6710dw",
    "skladnica": "zup-lodz",
    "plik": "Oferta na urządzenia wielofunkcyjne_04.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/urzadzenia-wielofunkcyjne-",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "BROTHER MFCL-6710DW",
      "cenaNetto": 2300,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Toner standardowy – 3000 stron",
        "cenaNetto": 385,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner zwiększonej wydajności – 8000 stron",
        "cenaNetto": 638,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner superwydajny – 11000 stron",
        "cenaNetto": 803,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "brother-mfc-l8390cdw",
    "skladnica": "zup-lodz",
    "plik": "Oferta na urządzenie wielofunkcyjne Brother_03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/urzadzenia-wielofunkcyjne-",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "BROTHER MFC L8390CDW",
      "cenaNetto": 1700,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Toner o standardowej wydajności – min 1000 stron",
        "cenaNetto": 196.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o zwiększonej wydajności – min. 3000 stron",
        "cenaNetto": 328.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner superwydajny – 4500 stron BK",
        "cenaNetto": 400.4,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "brother-mfc-l8900cdw",
    "skladnica": "zup-lodz",
    "plik": "Oferta na urządzenia wielofunkcyjne_04.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/urzadzenia-wielofunkcyjne-",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "BROTHER MFCL-8900CDW",
      "cenaNetto": 3103,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Toner o standardowej wydajności czarny - 3000 stron",
        "cenaNetto": 446.6,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o standardowej wydajności cyjan, – 1800 st",
        "cenaNetto": 392.7,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o standardowej wydajności magenta – 1800 st",
        "cenaNetto": 392.7,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o standardowej wydajności żółty – 1800 st",
        "cenaNetto": 392.7,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o zwiększonej wydajności czarny – 9000 stron",
        "cenaNetto": 511.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o zwiększonej wydajności cyjan– 5000 stron",
        "cenaNetto": 693,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o zwiększonej wydajności magenta – 5000 stron",
        "cenaNetto": 693,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner o zwiększonej wydajności żółty – 5000 stron",
        "cenaNetto": 693,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner ultrawydajny czarny-9000 stron",
        "cenaNetto": 544.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner ultrawydajny cyjan-6500 stron",
        "cenaNetto": 1023,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner ultrawydajny magenta-6500 stron",
        "cenaNetto": 1023,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Toner ultrawydajny żółty-6500 stron",
        "cenaNetto": 1023,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "dell-km5221",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "SCANTER",
    "urzadzenie": {
      "nazwa": "Klawiatura i mysz bezprzewodowa DELL",
      "cenaNetto": 211.2,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "dell-km7321",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "SCANTER",
    "urzadzenie": {
      "nazwa": "Klawiatura i mysz bezprzewodowa DELL",
      "cenaNetto": 401.5,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "dell-pro-14-plus",
    "skladnica": "zup-lodz",
    "plik": "Oferta Laptopy_06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Komputer przenośny typu LAPTOP",
      "cenaNetto": 5885,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Stacja dokująca do laptopa – Dell PRO SMART DOCK SD25",
        "cenaNetto": 859.1,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "dell-pro-16",
    "skladnica": "zup-lodz",
    "plik": "Oferta Laptopy_06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "SCANTER",
    "urzadzenie": {
      "nazwa": "Komputer przenośny typu LAPTOP",
      "cenaNetto": 4259,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Stacja dokująca do laptopa – Dell PRO SMART DOCK SD25",
        "cenaNetto": 859.1,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "dell-pro-16-plus",
    "skladnica": "zup-lodz",
    "plik": "Oferta Laptopy_06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "SCANTER",
    "urzadzenie": {
      "nazwa": "Komputer przenośny typu LAPTOP",
      "cenaNetto": 5939,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Stacja dokująca do laptopa – Dell PRO SMART DOCK SD25",
        "cenaNetto": 859.1,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "dell-pro-24-plus-p2424heb",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy DELL P2424HEB idealny do videokonferencji",
      "cenaNetto": 1698,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "dell-pro-24-plus-p2425he",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy DELL P2425H wyróżniony 4-gwiazdkowym certyfikatem TÜV w zakresie komfortu oczu",
      "cenaNetto": 673,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "dell-pro-24-plus-p2425he-usbc",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy DELL P2425HE z koncentratorem USB-C",
      "cenaNetto": 953,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "dell-pro-27-p2726h",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy DELL P2726H wyróżniony 4-gwiazdkowym certyfikatem TÜV w zakresie komfortu oczu",
      "cenaNetto": 705,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "dell-pro-27-p2726he",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy DELL P2726HE z koncentratorem USB-C",
      "cenaNetto": 1046,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "dell-pro-27-plus-p2724deb",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy DELL P2724DEB idealny do videokonferencji",
      "cenaNetto": 1924,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "epson-ds730n",
    "skladnica": "zup-lodz",
    "plik": "Oferta na sprzęt do EZD 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/sprzet-do-ezd",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Skaner biurowy z podajnikiem arkuszy",
      "cenaNetto": 2247,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "honeywell-1250g",
    "skladnica": "zup-lodz",
    "plik": "Oferta na sprzęt do EZD 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/sprzet-do-ezd",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Czytnik kodów kreskowych z kablem USB",
      "cenaNetto": 294,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Podstawka do czytnika",
        "cenaNetto": 130.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kabel USB",
        "cenaNetto": 104.5,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "honeywell-1450g",
    "skladnica": "zup-lodz",
    "plik": "Oferta na sprzęt do EZD 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/sprzet-do-ezd",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Czytnik kodów kreskowych z kablem USB",
      "cenaNetto": 408,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Podstawka do czytnika",
        "cenaNetto": 168.3,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kabel USB",
        "cenaNetto": 93.5,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "honeywell-ct30",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator Honeywell CT30P_23.03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-21",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy HONEYWELL CT30P - rejestrator leśniczego",
      "cenaNetto": 3906,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do HONEYWELL CT30P",
        "cenaNetto": 792,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Rysik do ekranu",
        "cenaNetto": 71.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Szkło lub folia ochronna na ekran",
        "cenaNetto": 71.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 115.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 121,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca służąca z osłoną gumową i portami USB + zasilacz + kabel USB",
        "cenaNetto": 781,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator 3400mAh",
        "cenaNetto": 308,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "honeywell-ct40xp",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator Honeywell CT40XP_23.03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-21",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy HONEYWELL CT40XP - rejestrator leśniczego",
      "cenaNetto": 5575,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do HONEYWELL CT40XP",
        "cenaNetto": 759,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 49.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Rysik do ekranu",
        "cenaNetto": 71.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Szkło lub folia ochronna na ekran",
        "cenaNetto": 71.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 167.2,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 117.7,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca do ładowania urządzenia z portami USB + zasilacz + kabel USB",
        "cenaNetto": 1094.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca do ładowania urządzenia z portami USB + Ethernet + zasilacz + kabel USB",
        "cenaNetto": 1320,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Pasek na rękę",
        "cenaNetto": 173.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator 4020mAh",
        "cenaNetto": 363,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "honeywell-ct47",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator Honeywell CT47_23.03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-21",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy HONEYWELL CT47 - rejestrator leśniczego",
      "cenaNetto": 5232,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do HONEYWELL CT47",
        "cenaNetto": 935,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Rysik do ekranu",
        "cenaNetto": 71.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Szkło lub folia ochronna na ekran",
        "cenaNetto": 70.4,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 118.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 178.2,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca z portami USB + zasilacz + kabel USB",
        "cenaNetto": 869,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator 4750mAh",
        "cenaNetto": 379.5,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "honeywell-eda52",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator Honeywell EDA52_03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy HONEYWELL EDA52 - rejestrator leśniczego",
      "cenaNetto": 2761,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Pasek na rękę",
        "Ładowarka sieciowa z możliwością wykorzystania do transmisji danych i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do HONEYWELL EDA52",
        "cenaNetto": 649,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 82.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Pasek na rękę",
        "cenaNetto": 44,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Szkło lub folia ochronna na ekran",
        "cenaNetto": 64.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca służąca jedynie od ładowania urządzenia + zasilacz",
        "cenaNetto": 715,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator 4500mAh",
        "cenaNetto": 275,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "honeywell-pc42e-t",
    "skladnica": "zup-lodz",
    "plik": "Oferta na sprzęt do EZD 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/sprzet-do-ezd",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka termotransferowa do etykiet",
      "cenaNetto": 556,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Etykiety",
        "cenaNetto": 21.78,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Taśma termotransferowa",
        "cenaNetto": 103.4,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Dyspenser (odklejak)",
        "cenaNetto": 126.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Gilotyna",
        "cenaNetto": 1056,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Głowica 203 dpi",
        "cenaNetto": 313.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Głowica 300 dpi",
        "cenaNetto": 418,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "honeywell-pc45t",
    "skladnica": "zup-lodz",
    "plik": "Oferta na sprzęt do EZD 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/sprzet-do-ezd",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "SCANTER",
    "urzadzenie": {
      "nazwa": "Drukarka termotransferowa do etykiet",
      "cenaNetto": 2087,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Etykiety",
        "cenaNetto": 21.78,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Taśma termotransferowa",
        "cenaNetto": 52.8,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "honeywell-rp4",
    "skladnica": "zup-lodz",
    "plik": "Oferta na drukarki termiczne_01.07.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka HONEYWELL RP4 w zestawie:",
      "cenaNetto": 2525,
      "promocja": false,
      "wZestawie": [
        "Moduł Bluetooth",
        "Akumulator, ładowarka sieciowa i samochodowa",
        "Torba na zestaw z rejestratorem"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 192.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 126.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 429,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Papier termiczny",
        "cenaNetto": 7.48,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "hp-460",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Klawiatura komputerowa bezprzewodowa z możliwością ładowania – producent HP, model 460 Multi-device",
      "cenaNetto": 189.2,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "hp-655",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Klawiatura i mysz bezprzewodowa WRLS KB/MSE Combo",
      "cenaNetto": 272.8,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "hp-715",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Mysz komputerowa bezprzewodowa z możliwością ładowania – Producent HP model 715-6E6FOAA",
      "cenaNetto": 273.9,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "hp-elitebook-6-g1ah-14",
    "skladnica": "zup-lodz",
    "plik": "Oferta Laptopy_06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one",
    "okres": {
      "od": "2026-05-30",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Komputer przenośny typu LAPTOP z systemem operacyjnym",
      "cenaNetto": 5329,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Stacja dokująca do laptopów HP",
        "cenaNetto": 648,
        "promocja": false,
        "wZestawie": [
          "Zasilanie – 120W przez USB-C, zasilacz 120W",
          "1 x kabel USB-C® do podłączenia do systemu hosta (długość kabla 1m)",
          "1x wejście 4.5mm na zasilacz min 120W"
        ]
      }
    ]
  },
  {
    "slug": "hp-elitebook-6-g1ah-16",
    "skladnica": "zup-lodz",
    "plik": "Oferta Laptopy_06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/komputery-pc-laptopy-all-in-one",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Komputer przenośny typu LAPTOP",
      "cenaNetto": 4646,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "hp-seria-3-pro-324pv",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-05-30",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy HP Series 3 Pro FHD 324pf",
      "cenaNetto": 524,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "hp-seria-5-pro-524pm",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-05-30",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Monitor komputerowy HP Series 5 Pro FHD USB-C Conferencig 524pm",
      "cenaNetto": 1390,
      "promocja": false,
      "wZestawie": [
        "Zasilacz zintegrowany/wbudowany trwale w monitor",
        "kabel zasilający."
      ]
    },
    "dodatki": []
  },
  {
    "slug": "hp-seria-5-pro-524pu",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-05-30",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy HP Series 5 Pro FHD USB-C 524pu",
      "cenaNetto": 1022,
      "promocja": false,
      "wZestawie": [
        "Zasilacz zintegrowany/wbudowany trwale w monitor"
      ]
    },
    "dodatki": []
  },
  {
    "slug": "hp-seria-5-pro-527pm",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-05-30",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy HP Series 5 Pro QHD USB-C Conferencing 527pm",
      "cenaNetto": 1733,
      "promocja": false,
      "wZestawie": [
        "Zasilacz zintegrowany/wbudowany trwale w monitor",
        "kabel zasilający."
      ]
    },
    "dodatki": []
  },
  {
    "slug": "hp-seria-5-pro-527pq",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-05-30",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy HP Series 5 Pro 27 QHD 527pq",
      "cenaNetto": 1263,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "hp-seria-5-pro-527pu",
    "skladnica": "zup-lodz",
    "plik": "Oferta na monitory.HP.Dell 01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/monitory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Monitor komputerowy HP Series 5 Pro QHD USB-C Conferencing 527pu",
      "cenaNetto": 1386,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "m3-sl20",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator M3 Mobile SL20+_01.07.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy M3.MOBILE SL20+ rejestrator leśniczego",
      "cenaNetto": 2113,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do M3.Mobile SL20+",
        "cenaNetto": 384.45,
        "promocja": true,
        "wZestawie": []
      },
      {
        "nazwa": "Pasek na rękę",
        "cenaNetto": 84.7,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Folia lub szkło ochronne na ekran",
        "cenaNetto": 82.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca z portem USB + zasilacz +kabel USB",
        "cenaNetto": 163.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca z portem Ethernet + zasilacz",
        "cenaNetto": 280.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Standardowy akumulator główny",
        "cenaNetto": 182.6,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniem",
        "cenaNetto": 88,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "ms-365",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Program biurowy kompatybilny z systemem operacyjnym Windows 11 professional",
      "cenaNetto": 616,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "podkladka-pod-mysz",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Podkładka pod mysz",
      "cenaNetto": 12.1,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "podnozek-biurowy",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Podnóżek biurowy do pracy przy komputerze",
      "cenaNetto": 165,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "samsung-a36",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator typu Smartfon SAMSUNG GALAXY A36_03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "SCANTER",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy SAMSUNG GALAXY A36 - rejestrator leśniczego",
      "cenaNetto": 1451,
      "promocja": false,
      "wZestawie": [
        "Ładowarka sieciowa z kablem USB i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 129.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 63.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Folia lub szkoło ochronne na ekran",
        "cenaNetto": 64.9,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "samsung-a56",
    "skladnica": "zup-lodz",
    "plik": "Oferta na rejestrator typu Smartfon SAMSUNG GALAXY A56_01.06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-05-30",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy SAMSUNG GALAXY A56- rejestrator leśniczego",
      "cenaNetto": 1980,
      "promocja": false,
      "wZestawie": [
        "Ładowarka sieciowa z kablem USB i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 129.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator 5000mAh",
        "cenaNetto": 214.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 63.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Folia lub szkoło ochronne na ekran",
        "cenaNetto": 64.9,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "samsung-galaxy-tab-active5",
    "skladnica": "zup-lodz",
    "plik": "Oferta na tablety 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/tablety",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "WZMOCNIONY TABLET Samsung Tab Active 5",
      "cenaNetto": 2119,
      "promocja": false,
      "wZestawie": [
        "Ładowarka sieciowa"
      ]
    },
    "dodatki": []
  },
  {
    "slug": "samsung-s25-fe",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator typu Smartfon SAMSUNG GALAXY S25 FE_06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy SAMSUNG Galaxy S25 FE 5G 8/128GB 6.7\" 120Hz SM-S731- rejestrator leśniczego",
      "cenaNetto": 2386,
      "promocja": true,
      "wZestawie": [
        "Ładowarka sieciowa z kablem USB i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 126.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 125.4,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 95.7,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Folia lub szkoło ochronne na ekran",
        "cenaNetto": 86.9,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "samsung-s25-ultra",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator typu Smartfon SAMSUNG Galaxy S25 Ultra_03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy SAMSUNG GALAXY S25 ULTRA 5G - rejestrator leśniczego",
      "cenaNetto": 5564,
      "promocja": false,
      "wZestawie": [
        "Ładowarka sieciowa i i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 253,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 93.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Szkło lub folia ochronna na ekran",
        "cenaNetto": 121,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "samsung-ssd-t7",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny dysk twardy zewnętrzny Samsung model SSD T7 Shield USB 3.2 2TB",
      "cenaNetto": 858,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "samsung-ssd-t9",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny dysk twardy zewnętrzny Samsung model SSD T9 USB 3.2 Gen 2x2 1 TB",
      "cenaNetto": 605,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "samsung-xcover7",
    "skladnica": "zup-lodz",
    "plik": "Oferta na rejestrator typu Smartfon SAMSUNG GALAXY XCOVER PRO6_03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy SAMSUNG GALAXY XCOVER PRO6 - rejestrator leśniczego",
      "cenaNetto": 2301,
      "promocja": false,
      "wZestawie": [
        "Ładowarka sieciowa z kablem USB i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 129.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 97.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator 4050mAh",
        "cenaNetto": 214.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 63.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Folia lub szkło ochronne na ekran",
        "cenaNetto": 64.9,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "seiko-mpa40",
    "skladnica": "zup-lodz",
    "plik": "Oferta na drukarki termiczne_01.07.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka SEIKO MPA-40 - w zestawie:",
      "cenaNetto": 2078,
      "promocja": false,
      "wZestawie": [
        "Moduł Bluetooth",
        "Akumulator, ładowarka sieciowa i samochodowa",
        "Torba na zestaw z rejestratorem"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 214.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 209,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 492.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Papier termiczny",
        "cenaNetto": 7.5,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "sewoo-lkp400",
    "skladnica": "zup-lodz",
    "plik": "Oferta na drukarki termiczne_01.07.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka SEWOO LK-P400 - w zestawie:",
      "cenaNetto": 2536,
      "promocja": false,
      "wZestawie": [
        "Moduł Bluetooth",
        "Akumulator, ładowarka sieciowa i samochodowa",
        "Torba na zestaw z rejestratorem"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 104.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 64.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 496.1,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Papier termiczny",
        "cenaNetto": 7.09,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "sewoo-lkp43",
    "skladnica": "zpuh-olsztyn",
    "plik": "Druk zamówienia na dostawę drukarek termicznych i akcesoriów 16.10.2024.docx",
    "formularz": null,
    "strona": "https://zpuh.olsztyn.lasy.gov.pl/drukarki",
    "okres": {
      "od": "2024-10-16",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Drukarka termiczna SEWOO LK-P43",
      "cenaNetto": 2744.5,
      "promocja": false,
      "wZestawie": [
        "Akumulator",
        "Ładowarka sieciowa i samochodowa",
        "Torba",
        "Gwarancja 24 miesiące"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 231,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 231,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 434.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Papier termiczny 110/30 (karton 60 szt.)",
        "cenaNetto": 7.54,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "sewoo-lkp43",
    "skladnica": "zup-lodz",
    "plik": "Oferta na drukarki termiczne_01.07.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka SEWOO LK-P43 - w zestawie:",
      "cenaNetto": 2654,
      "promocja": false,
      "wZestawie": [
        "Moduł Bluetooth",
        "Akumulator, ładowarka sieciowa i samochodowa",
        "Torba na zestaw z rejestratorem"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 231,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 231,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 434.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kabel RS",
        "cenaNetto": 74.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Papier termiczny",
        "cenaNetto": 7.48,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "torba-hp-15",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Torba do laptopów HP",
      "cenaNetto": 148.5,
      "promocja": false,
      "wZestawie": [
        "otwór na uchwyt od walizki"
      ]
    },
    "dodatki": []
  },
  {
    "slug": "torba-na-laptopa-15",
    "skladnica": "zup-lodz",
    "plik": "Oferta na akcesoria komputerow_03.2026r.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Torba na LAPTOP",
      "cenaNetto": 275,
      "promocja": false,
      "wZestawie": [
        "wyposażona w otwór na uchwyt walizki",
        "posiada wykładane uchwyty do przenoszenia"
      ]
    },
    "dodatki": []
  },
  {
    "slug": "unitech-ea660",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator Unitech EA660_06.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-05-30",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy Unitech EA660 rejestrator leśniczego",
      "cenaNetto": 2440,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni)",
        "cenaNetto": 676.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Pasek na rękę",
        "cenaNetto": 100.1,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Rysik do ekranu",
        "cenaNetto": 75.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Folia lub szkło ochronne na ekran",
        "cenaNetto": 74.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca z portem USB + zasilacz +kabel USB",
        "cenaNetto": 195.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca z portem Ethernet + zasilacz",
        "cenaNetto": 478.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 246.4,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 119.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 123.2,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniem",
        "cenaNetto": 203.5,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "unitech-pa768",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator UnitechPA768_03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy UNITECH PA768 - rejestrator leśniczego",
      "cenaNetto": 3103,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do UNITECH PA768",
        "cenaNetto": 984.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Futerał",
        "cenaNetto": 231,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Rysik do ekranu",
        "cenaNetto": 93.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Folia lub szkło ochronne na ekran",
        "cenaNetto": 82.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 71.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 71.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca z możliwością ładowania samego akumulatora + zasilacz",
        "cenaNetto": 407,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca + port USB Host i Ethernet + zasilacz + kabel USB + możliwość ładowania samego akumulatora",
        "cenaNetto": 544.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Pasek na rękę",
        "cenaNetto": 104.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator standardowy 5100mAh",
        "cenaNetto": 297,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator powiększony 7700mAh",
        "cenaNetto": 429,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "zebra-ds2208",
    "skladnica": "zup-lodz",
    "plik": "Oferta na sprzęt do EZD 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/sprzet-do-ezd",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Czytnik kodów kreskowych z kablem USB",
      "cenaNetto": 487,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": []
  },
  {
    "slug": "zebra-ds2278",
    "skladnica": "zup-lodz",
    "plik": "Oferta na sprzęt do EZD 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/sprzet-do-ezd",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Czytnik kodów kreskowych z kablem USB",
      "cenaNetto": 486,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Podstawka do czytnika",
        "cenaNetto": 236.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kabel USB",
        "cenaNetto": 141.9,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 185.9,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "zebra-em45",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestratotor Zebra EM45 + STACJA_06.2026.docx",
    "formularz": "/formularze/zup-lodz-zebra-em45-2026-07.pdf",
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy ZEBRA EM45 rejestrator leśniczego",
      "cenaNetto": 2563,
      "promocja": true,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do ZEBRA EM45",
        "cenaNetto": 318.45,
        "promocja": true,
        "wZestawie": []
      },
      {
        "nazwa": "Szkło lub folia ochronna na ekran",
        "cenaNetto": 77,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Rysik do ekranu",
        "cenaNetto": 77,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 103.4,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 107.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 198,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca do rejestratora Zebra EM45",
        "cenaNetto": 1991,
        "promocja": false,
        "wZestawie": [
          "W zestawie wkładki (shimy) umożliwiające korzystanie ze stacji i mobilnego komputera dotykowego wyposażonego w etui ochronne + zasilacz z przewodem"
        ]
      }
    ]
  },
  {
    "slug": "zebra-tc27",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestrator Zebra TC27_01.07.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy ZEBRA TC27 - rejestrator leśniczego",
      "cenaNetto": 2873,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa z możliwością wykorzystania do transmisji danych i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do ZEBRA TC27",
        "cenaNetto": 657.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 121,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Szkło lub folia ochronna na ekran",
        "cenaNetto": 57.2,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca + port USB + zasilacz +kabel USB",
        "cenaNetto": 605,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca + port USB + zasilacz + kabel USB + port Ethernet",
        "cenaNetto": 1452,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Moduł Ethernet do stacji dokującej",
        "cenaNetto": 385,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 77,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 77,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator o standardowej pojemności 3100mAh",
        "cenaNetto": 231,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator o powiększonej pojemności 5250mAh",
        "cenaNetto": 324.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Pasek na rękę",
        "cenaNetto": 126.5,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "zebra-tc58e",
    "skladnica": "zup-lodz",
    "plik": "Oferta na Rejestratotor Zebra TC58E_03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Mobilny komputer dotykowy ZEBRA TC58E - rejestrator leśniczego",
      "cenaNetto": 3691,
      "promocja": false,
      "wZestawie": [
        "Dodatkowa karta pamięci micro SD 64 GB",
        "Ładowarka sieciowa i ładowarka samochodowa"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Kontrakt serwisowy producenta (3 letni) do ZEBRA TC58E",
        "cenaNetto": 715,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Szkło lub folia ochronna na ekran",
        "cenaNetto": 77,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Rysik do ekranu",
        "cenaNetto": 77,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 118.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 115.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca z portami USB + zasilacz + kabel USB z gniazdem ładowania dodatkowej baterii",
        "cenaNetto": 1045,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca z portami USB + Ethernet + zasilacz + kabel USB z gniazdem ładowania dodatkowej baterii",
        "cenaNetto": 1364,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Moduł Ethernet do stacji dokującej",
        "cenaNetto": 379.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Pasek na rękę montowany do nakładki na obudowę",
        "cenaNetto": 132,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Nakładka na obudowę zabezpieczająca przed uszkodzeniami",
        "cenaNetto": 159.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator standardowy min. 4400 mAh",
        "cenaNetto": 324.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator o zwiększonej pojemności min. 6600 mAh",
        "cenaNetto": 434.5,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "zebra-zd421c",
    "skladnica": "zup-lodz",
    "plik": "Oferta na sprzęt do EZD 03.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/sprzet-do-ezd",
    "okres": {
      "od": "2026-03-10",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Drukarka termotransferowa do etykiet",
      "cenaNetto": 1552,
      "promocja": false,
      "wZestawie": []
    },
    "dodatki": [
      {
        "nazwa": "Moduł RS232",
        "cenaNetto": 148.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Moduł Ethernet",
        "cenaNetto": 357.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Etykiety",
        "cenaNetto": 21.78,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kasety z woskową taśmą barwiącą",
        "cenaNetto": 38.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kasety z żywiczną taśmą barwiącą",
        "cenaNetto": 85.8,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kasety z woskowo/żywiczną taśmą barwiącą",
        "cenaNetto": 58.3,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "zebra-zq521",
    "skladnica": "zpuh-olsztyn",
    "plik": "Druk zamówienia na dostawę drukarek termicznych i akcesoriów 16.10.2024.docx",
    "formularz": null,
    "strona": "https://zpuh.olsztyn.lasy.gov.pl/drukarki",
    "okres": {
      "od": "2024-10-16",
      "do": null
    },
    "dostawca": null,
    "urzadzenie": {
      "nazwa": "Drukarka termiczna ZEBRA ZQ521",
      "cenaNetto": 2596,
      "promocja": false,
      "wZestawie": [
        "Akumulator",
        "Ładowarka sieciowa i samochodowa",
        "Torba",
        "Gwarancja 24 miesiące"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 181.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 143,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator",
        "cenaNetto": 466.4,
        "promocja": false,
        "wZestawie": []
      }
    ]
  },
  {
    "slug": "zebra-zq521",
    "skladnica": "zup-lodz",
    "plik": "Oferta na drukarki termiczne_01.07.2026.docx",
    "formularz": null,
    "strona": "https://zup.lodz.lasy.gov.pl/rejestratory",
    "okres": {
      "od": "2026-07-01",
      "do": "2026-08-31"
    },
    "dostawca": "TAKMA",
    "urzadzenie": {
      "nazwa": "Drukarka ZEBRA ZQ521- w zestawie:",
      "cenaNetto": 2514.5,
      "promocja": false,
      "wZestawie": [
        "Moduł Bluetooth",
        "Akumulator, ładowarka sieciowa i samochodowa",
        "Torba na zestaw z rejestratorem"
      ]
    },
    "dodatki": [
      {
        "nazwa": "Ładowarka sieciowa",
        "cenaNetto": 104.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Ładowarka samochodowa",
        "cenaNetto": 99,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator o pojemności standardowej",
        "cenaNetto": 467.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Akumulator o pojemności rozszerzonej",
        "cenaNetto": 665.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Stacja dokująca dla pojedyń. akumulatora w wersji std i rozszerz.",
        "cenaNetto": 544.5,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Papier termiczny",
        "cenaNetto": 6.55,
        "promocja": false,
        "wZestawie": []
      },
      {
        "nazwa": "Kontrakt serwisowy",
        "cenaNetto": 460.9,
        "promocja": false,
        "wZestawie": []
      }
    ]
  }
]

/** Wszystkie oferty na dany model — po jednej z każdej składnicy, która go ma. */
export const ofertyDla = (slug: string): OfertaSkladnicy[] =>
  OFERTY_SKLADNICY.filter((o) => o.slug === slug)
