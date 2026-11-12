'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Honeywell CT32 w konfiguracji bez skanera („No Scanner”, np. CT32-X1N-30S1FBG: 5G, 6/128 GB).
// Według Configuration Guide i Quick Start Guide Honeywella różni się od wersji ze skanerem
// tylko brakiem skanera i jego okienka — ekran, procesor, łączność, akumulator i odporność są
// te same, boczne przyciski skanowania zostają (można im przypisać inne funkcje).
// Sprzedaje ją ZPUH Olsztyn (formularz z 6.11.2026). Karta dodana 12.11.2026.
const data: ProductData = {
  slug: 'honeywell-ct32-bez-skanera',
  name: 'Honeywell CT32 bez skanera',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  // widok z przodu jest taki sam w obu wersjach; pozostałe zdjęcia pokazują skaner
  images: ['/ct32_2.png'],
  inquiry: {
    description: 'Rejestrator leśniczego bez skanera kodów',
    specifications: 'Android 14, aktualizacja do 16 i 18 · 6″ FHD+ · 6/128 GB · 5G · bez skanera · 4500 mAh',
  },
  whyNavLabel: 'Dlaczego CT32 bez skanera',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.pamiec, label: 'Pamięć', value: '6 GB RAM + 128 GB' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6″ FHD+, 450 nitów' },
    { icon: ICON.siec, label: 'Sieć', value: '5G, nano SIM + eSIM, GPS' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4500 mAh' },
  ],
  variants: [{ id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6″' },
        { k: 'Rozdzielczość', v: '1080 × 2160 Full HD+, 450 nitów' },
        { k: 'Szkło', v: 'Corning Gorilla Glass 5' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 14, aktualizacja do 16 i 18 (zależnie od wsparcia Qualcomma)' },
        { k: 'Procesor', v: 'Qualcomm 4490, 8 rdzeni, do 2,4 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB' },
        { k: 'Karta pamięci', v: 'micro SD 64 GB w zestawie' },
      ],
    },
    {
      title: 'Łączność i odczyt',
      rows: [
        { k: 'Skaner', v: 'brak — wersja bez skanera kodów' },
        { k: 'Aparaty', v: '13 Mpx z tyłu, 8 Mpx z przodu' },
        { k: 'Sieć', v: '5G i LTE, nano SIM i eSIM' },
        { k: 'Wi-Fi i NFC', v: 'Wi-Fi 6E, NFC' },
        { k: 'Lokalizacja', v: 'GPS L1+L5, A-GPS, GLONASS, Galileo, BeiDou' },
        { k: 'Bluetooth', v: '5.3' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP65 i IP68' },
        { k: 'Upadki', v: 'z 1,5 m na beton, z 1,8 m w etui' },
        { k: 'Temperatura pracy', v: 'od −20 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie i obsługa',
      rows: [
        { k: 'Akumulator', v: '3,8 V, 4500 mAh' },
        { k: 'W zestawie', v: 'ładowarka sieciowa i samochodowa' },
        { k: 'Dostawa i serwis', v: 'TAKMA' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.przekatna,
      title: 'Te same parametry, bez skanera',
      body:
        'Obudowa, ekran 6″, pamięć, 5G, akumulator i odporność są jak w CT32 ze skanerem. ' +
        'Wersja dla tych, którzy pracują głównie na mapach i formularzach, a kody czytają rzadko.',
    },
    {
      icon: ICON.klawiszskrotu,
      title: 'Boczne przyciski do własnych skrótów',
      body:
        'Dwa przyciski po bokach zostają — w ustawieniach Honeywella można im przypisać aparat, ' +
        'aplikację albo inną funkcję, z której korzysta się najczęściej w terenie.',
    },
    {
      icon: ICON.siec,
      title: '5G i dwie karty: fizyczna i eSIM',
      body:
        'Służbowa karta nano SIM i zapasowy profil eSIM w jednym urządzeniu — w miejscach, gdzie ' +
        'jeden operator nie łapie, drugi zwykle tak. GPS działa na dwóch pasmach (L1 i L5).',
    },
    {
      icon: ICON.wsparcie,
      title: 'Android z drogą aktualizacji',
      body:
        'Urządzenie wychodzi z Androidem 14, a Honeywell zapowiada aktualizacje do wersji 16 i 18, ' +
        'więc nie wypadnie z obiegu razem z pierwszą zmianą wymagań systemowych.',
    },
  ],
  usedBy: { device: 'Honeywell CT32 bez skanera' },
  serviceContract: '3 lata',
  related: [
    {
      name: 'Honeywell CT32',
      href: '/produkt/honeywell-ct32',
      note: 'Ta sama obudowa i parametry, ze skanerem kodów 1D i 2D',
    },
    {
      name: 'Zebra EM45',
      href: '/produkt/zebra-em45',
      note: 'Też bez skanera, większy ekran 6,7″',
    },
  ],
}

export default function HoneywellCT32BezSkaneraPage() {
  return <ProductPage data={data} />
}
