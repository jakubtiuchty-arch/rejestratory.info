// PLIK GENEROWANY — nie edytować ręcznie.
// Menu „Produkty” w nagłówku: kategorie i ich produkty z kart w `app/produkt/`.
// Odświeżenie: node scripts/menu-produktow.mjs (odpala się przed `npm run build`).

export type ProduktMenu = { name: string; href: string }
export type PolecanyMenu = {
  name: string
  href: string
  image: string | null
  opis: string | null
  cechy: string[]
  /** najniższa cena netto ze składnic, null gdy model jest wyceniany indywidualnie */
  cenaOd: number | null
  /** pionowy: telefon przechylony w wąskiej kolumnie; szeroki: tablet, laptop */
  uklad: 'pionowy' | 'szeroki'
}
export type KategoriaMenu = {
  slug: string
  name: string
  href: string
  produkty: ProduktMenu[]
  polecany?: PolecanyMenu
}

export const MENU_PRODUKTOW: KategoriaMenu[] = [
  {
    "slug": "rejestratory",
    "name": "Rejestratory",
    "href": "/kategoria/rejestratory",
    "produkty": [
      {
        "name": "Honeywell CT30P",
        "href": "/produkt/honeywell-ct30"
      },
      {
        "name": "M3 Mobile SL20+",
        "href": "/produkt/m3-sl20"
      },
      {
        "name": "Honeywell CT32",
        "href": "/produkt/honeywell-ct32"
      },
      {
        "name": "Honeywell CT32 bez skanera",
        "href": "/produkt/honeywell-ct32-bez-skanera"
      },
      {
        "name": "Zebra TC501",
        "href": "/produkt/zebra-tc501"
      },
      {
        "name": "Newland MT95 Kambur Pro III",
        "href": "/produkt/newland-mt95"
      },
      {
        "name": "Datalogic Memor 17",
        "href": "/produkt/datalogic-memor-17"
      },
      {
        "name": "Zebra EM45",
        "href": "/produkt/zebra-em45"
      },
      {
        "name": "Zebra TC27",
        "href": "/produkt/zebra-tc27"
      },
      {
        "name": "Zebra TC58e",
        "href": "/produkt/zebra-tc58e"
      },
      {
        "name": "Honeywell CT47",
        "href": "/produkt/honeywell-ct47"
      },
      {
        "name": "Honeywell CT40XP",
        "href": "/produkt/honeywell-ct40xp"
      },
      {
        "name": "Honeywell EDA52",
        "href": "/produkt/honeywell-eda52"
      },
      {
        "name": "Unitech EA660",
        "href": "/produkt/unitech-ea660"
      },
      {
        "name": "Unitech PA768",
        "href": "/produkt/unitech-pa768"
      }
    ],
    "polecany": {
      "name": "Zebra EM45",
      "href": "/produkt/zebra-em45",
      "image": "/menu/polecany-zebra-em45.webp",
      "opis": "Terminal terenowy w obudowie smartfona",
      "cechy": [
        "IP68, upadek z 1,2 m (1,5 m w etui)",
        "4750 mAh, do 25 h pracy",
        "6,7″ FHD+, 120 Hz, 450 nitów"
      ],
      "cenaOd": 2728.5,
      "uklad": "pionowy"
    }
  },
  {
    "slug": "telefony",
    "name": "Telefony",
    "href": "/kategoria/telefony",
    "produkty": [
      {
        "name": "Samsung Galaxy A37",
        "href": "/produkt/samsung-a37"
      },
      {
        "name": "Samsung Galaxy A57",
        "href": "/produkt/samsung-a57"
      },
      {
        "name": "Samsung Galaxy S25+",
        "href": "/produkt/samsung-s25-plus"
      },
      {
        "name": "Samsung Galaxy S25 Ultra",
        "href": "/produkt/samsung-s25-ultra"
      },
      {
        "name": "Samsung Galaxy S25 FE",
        "href": "/produkt/samsung-s25-fe"
      },
      {
        "name": "Samsung Galaxy S26 FE",
        "href": "/produkt/samsung-s26-fe"
      },
      {
        "name": "Samsung Galaxy XCover7 Pro",
        "href": "/produkt/samsung-xcover7"
      },
      {
        "name": "Apple iPhone 17 Pro",
        "href": "/produkt/iphone-17-pro"
      },
      {
        "name": "Apple iPhone 17 Pro Max",
        "href": "/produkt/iphone-17-pro-max"
      },
      {
        "name": "Motorola Edge 60 Pro",
        "href": "/produkt/motorola-edge-60-pro"
      }
    ],
    "polecany": {
      "name": "Samsung Galaxy A57",
      "href": "/produkt/samsung-a57",
      "image": "/menu/polecany-samsung-a57.webp",
      "opis": "Smartfon służbowy z zapasem pamięci",
      "cechy": [
        "6,7″ Super AMOLED+, 120 Hz",
        "Exynos 1680, 8 rdzeni",
        "5000 mAh, ładowanie 45 W"
      ],
      "cenaOd": 1980,
      "uklad": "pionowy"
    }
  },
  {
    "slug": "tablety",
    "name": "Tablety",
    "href": "/kategoria/tablety",
    "produkty": [
      {
        "name": "Samsung Galaxy Tab Active5",
        "href": "/produkt/samsung-galaxy-tab-active5"
      },
      {
        "name": "Apple iPad Pro 11″ (M4)",
        "href": "/produkt/ipad-pro-11-m4-a2837"
      },
      {
        "name": "Apple iPad Pro 11″ (M5)",
        "href": "/produkt/ipad-pro-11-m5-a3358"
      }
    ],
    "polecany": {
      "name": "Samsung Galaxy Tab Active5",
      "href": "/produkt/samsung-galaxy-tab-active5",
      "image": "/menu/polecany-samsung-galaxy-tab-active5.webp",
      "opis": "Wzmocniony tablet terenowy z wymienną baterią",
      "cechy": [
        "8″ 1920 × 1200, 120 Hz",
        "Exynos 1380",
        "IP68, MIL-STD-810H"
      ],
      "cenaOd": 2119,
      "uklad": "szeroki"
    }
  },
  {
    "slug": "laptopy",
    "name": "Laptopy",
    "href": "/kategoria/laptopy",
    "produkty": [
      {
        "name": "Dell Pro 14 Plus",
        "href": "/produkt/dell-pro-14-plus"
      },
      {
        "name": "HP EliteBook 6 G1a 14",
        "href": "/produkt/hp-elitebook-6-g1ah-14"
      },
      {
        "name": "Dell Pro 16 Plus",
        "href": "/produkt/dell-pro-16-plus"
      },
      {
        "name": "HP EliteBook 6 G1ah 16",
        "href": "/produkt/hp-elitebook-6-g1ah-16"
      },
      {
        "name": "Dell Pro 16",
        "href": "/produkt/dell-pro-16"
      }
    ],
    "polecany": {
      "name": "HP EliteBook 6 G1a 14",
      "href": "/produkt/hp-elitebook-6-g1ah-14",
      "image": "/menu/polecany-hp-elitebook-6-g1ah-14.webp",
      "opis": "Laptop biznesowy 14 cali ze stacją dokującą HP",
      "cechy": [
        "14″ WUXGA",
        "AMD Ryzen 5 220",
        "16 GB + SSD 512 GB"
      ],
      "cenaOd": 5329,
      "uklad": "szeroki"
    }
  },
  {
    "slug": "urzadzenia-wielofunkcyjne",
    "name": "Urządzenia wielofunkcyjne",
    "href": "/kategoria/urzadzenia-wielofunkcyjne",
    "produkty": [
      {
        "name": "Brother DCP-L5510DW",
        "href": "/produkt/brother-dcp-l5510dw"
      },
      {
        "name": "Brother MFC-L5710DW",
        "href": "/produkt/brother-mfc-l5710dw"
      },
      {
        "name": "Brother MFC-L6710DW",
        "href": "/produkt/brother-mfc-l6710dw"
      },
      {
        "name": "Brother MFC-L8390CDW",
        "href": "/produkt/brother-mfc-l8390cdw"
      },
      {
        "name": "Brother MFC-L8690CDW",
        "href": "/produkt/brother-mfc-l8690cdw"
      },
      {
        "name": "Brother MFC-L8730CDW",
        "href": "/produkt/brother-mfc-l8730cdw"
      },
      {
        "name": "Brother MFC-L8900CDW",
        "href": "/produkt/brother-mfc-l8900cdw"
      },
      {
        "name": "Brother MFC-L8970CDW",
        "href": "/produkt/brother-mfc-l8970cdw"
      }
    ]
  },
  {
    "slug": "monitory",
    "name": "Monitory",
    "href": "/kategoria/monitory",
    "produkty": [
      {
        "name": "HP Pro S5 QHD USB-C 527pu",
        "href": "/produkt/hp-seria-5-pro-527pu"
      },
      {
        "name": "HP Pro S5 QHD 527pq",
        "href": "/produkt/hp-seria-5-pro-527pq"
      },
      {
        "name": "Dell Pro P 24 P2426HE z USB-C",
        "href": "/produkt/dell-pro-p-24-p2426he"
      },
      {
        "name": "Dell Pro P 24 P2426H",
        "href": "/produkt/dell-pro-p-24-p2426h"
      },
      {
        "name": "Dell Pro 27 P2726HE z USB-C",
        "href": "/produkt/dell-pro-27-p2726he"
      },
      {
        "name": "Dell Pro 27 P2726H",
        "href": "/produkt/dell-pro-27-p2726h"
      },
      {
        "name": "Dell Pro 24 P2424HEB",
        "href": "/produkt/dell-pro-24-plus-p2424heb"
      },
      {
        "name": "Dell Pro 27 P2724DEB",
        "href": "/produkt/dell-pro-27-plus-p2724deb"
      },
      {
        "name": "HP S3 Pro 324pf",
        "href": "/produkt/hp-seria-3-pro-324pv"
      },
      {
        "name": "HP Pro S5 FHD USB-C 524pu",
        "href": "/produkt/hp-seria-5-pro-524pu"
      },
      {
        "name": "HP Pro S5 FHD USB-C Conferencing 524pm",
        "href": "/produkt/hp-seria-5-pro-524pm"
      },
      {
        "name": "HP Pro S5 QHD USB-C Conferencing 527pm",
        "href": "/produkt/hp-seria-5-pro-527pm"
      }
    ]
  },
  {
    "slug": "drukarki-do-rejestratora",
    "name": "Drukarki do rejestratora",
    "href": "/kategoria/drukarki-do-rejestratora",
    "produkty": [
      {
        "name": "Zebra ZQ521",
        "href": "/produkt/zebra-zq521"
      },
      {
        "name": "Sewoo LK-P43II",
        "href": "/produkt/sewoo-lkp43"
      },
      {
        "name": "Honeywell RP4",
        "href": "/produkt/honeywell-rp4"
      },
      {
        "name": "Seiko MP-A40",
        "href": "/produkt/seiko-mpa40"
      },
      {
        "name": "Sewoo LK-P400",
        "href": "/produkt/sewoo-lkp400"
      },
      {
        "name": "Bixolon SPP-R410",
        "href": "/produkt/bixolon-sppr410"
      }
    ]
  },
  {
    "slug": "drukarki-laserowe",
    "name": "Drukarki laserowe",
    "href": "/kategoria/drukarki-laserowe",
    "produkty": [
      {
        "name": "Brother HL-L6410",
        "href": "/produkt/brother-hl-l6410"
      },
      {
        "name": "Brother DCP-B7620DW",
        "href": "/produkt/brother-dcp-b7620dw"
      },
      {
        "name": "Brother HL-L6210DW",
        "href": "/produkt/brother-hl-l6210dw"
      }
    ]
  },
  {
    "slug": "all-in-one",
    "name": "All in One",
    "href": "/kategoria/all-in-one",
    "produkty": [
      {
        "name": "Dell Pro 24 All in One",
        "href": "/produkt/aio-dell-pro-24"
      },
      {
        "name": "Dell Pro 24 All in One bez systemu",
        "href": "/produkt/aio-dell-pro-24-bez-systemu"
      }
    ]
  },
  {
    "slug": "ezd",
    "name": "Zarządzanie dokumentacją (EZD)",
    "href": "/kategoria/ezd",
    "produkty": [
      {
        "name": "Zebra ZD421c",
        "href": "/produkt/zebra-zd421c"
      },
      {
        "name": "Honeywell PC45t",
        "href": "/produkt/honeywell-pc45t"
      },
      {
        "name": "Honeywell PC42E-T",
        "href": "/produkt/honeywell-pc42e-t"
      },
      {
        "name": "Honeywell Voyager 1250g",
        "href": "/produkt/honeywell-1250g"
      },
      {
        "name": "Honeywell Voyager XP 1470g",
        "href": "/produkt/honeywell-1450g"
      },
      {
        "name": "Zebra DS2208",
        "href": "/produkt/zebra-ds2208"
      },
      {
        "name": "Zebra DS2278",
        "href": "/produkt/zebra-ds2278"
      },
      {
        "name": "Epson WorkForce DS-730N",
        "href": "/produkt/epson-ds730n"
      }
    ]
  },
  {
    "slug": "urzadzenia-fiskalne",
    "name": "Urządzenia fiskalne",
    "href": "/kategoria/urzadzenia-fiskalne",
    "produkty": [
      {
        "name": "Posnet Pospay 2",
        "href": "/produkt/posnet-pospay-2"
      },
      {
        "name": "Posnet Temo Online",
        "href": "/produkt/posnet-temo-online"
      }
    ]
  },
  {
    "slug": "akcesoria-komputerowe",
    "name": "Akcesoria komputerowe",
    "href": "/kategoria/akcesoria-komputerowe",
    "produkty": [
      {
        "name": "Torba na laptopa 15,6″",
        "href": "/produkt/torba-na-laptopa-15"
      },
      {
        "name": "Podkładka pod mysz",
        "href": "/produkt/podkladka-pod-mysz"
      },
      {
        "name": "Podnóżek biurowy",
        "href": "/produkt/podnozek-biurowy"
      },
      {
        "name": "Samsung SSD T9 1 TB",
        "href": "/produkt/samsung-ssd-t9"
      },
      {
        "name": "Samsung SSD T7 Shield 2 TB",
        "href": "/produkt/samsung-ssd-t7"
      },
      {
        "name": "Microsoft 365 Business Standard",
        "href": "/produkt/ms-365"
      },
      {
        "name": "Dell Pro KM5221W",
        "href": "/produkt/dell-km5221"
      },
      {
        "name": "Dell Pro Plus KM7321W",
        "href": "/produkt/dell-km7321"
      },
      {
        "name": "HP 655 Wireless Keyboard and Mouse",
        "href": "/produkt/hp-655"
      },
      {
        "name": "Vertiv Liebert itON 600 VA",
        "href": "/produkt/vertin-600"
      },
      {
        "name": "Vertiv Liebert itON 1000 VA",
        "href": "/produkt/vertin-1000"
      },
      {
        "name": "HP 460 Multi-device Keyboard",
        "href": "/produkt/hp-460"
      },
      {
        "name": "HP 715 Rechargeable Mouse",
        "href": "/produkt/hp-715"
      },
      {
        "name": "Torba HP do laptopów 15,6″",
        "href": "/produkt/torba-hp-15"
      }
    ]
  },
  {
    "slug": "wideokonferencje",
    "name": "Wideokonferencje",
    "href": "/kategoria/wideokonferencje",
    "produkty": [
      {
        "name": "Logitech Rally Bar",
        "href": "/produkt/logitech-rally-bar"
      },
      {
        "name": "Logitech Rally Plus",
        "href": "/produkt/logitech-rally-plus"
      },
      {
        "name": "Logitech Rally Board 65",
        "href": "/produkt/logitech-rally-board-65"
      }
    ]
  }
]
