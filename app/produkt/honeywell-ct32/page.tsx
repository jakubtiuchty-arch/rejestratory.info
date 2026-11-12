'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Parametry według Honeywella: datasheet CT32 (Rev A 05/25), Configuration Guide (Global Rev A),
// Quick Start Guide (Rev D 04/26). Do 12.11.2026 karta szła za drukiem ZUP Łódź, który podaje
// błędnie 5,5″, Androida 13, Bluetooth 5.0 i GSM/GPRS. Wersja bez skanera ma osobną kartę.
const data: ProductData = {
  slug: 'honeywell-ct32',
  name: 'Honeywell CT32',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/ct32_2.png', '/ct32_1.png', '/ct32_3.png'],
  inquiry: {
    description: 'Rejestrator leśniczego ze skanerem 1D i 2D',
    specifications: 'Android 14, aktualizacja do 16 i 18 · 6″ FHD+ · 6/128 GB · 5G · skaner 1D/2D · 4500 mAh',
  },
  whyNavLabel: 'Dlaczego CT32',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.pamiec, label: 'Pamięć', value: '6 GB RAM + 128 GB' },
    { icon: ICON.skaner, label: 'Skaner', value: 'kody 1D i 2D' },
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
        { k: 'Skaner', v: 'kody 1D i 2D' },
        { k: 'Sieć', v: '5G i LTE, nano SIM i eSIM' },
        { k: 'Wi-Fi i NFC', v: 'Wi-Fi 6E, NFC' },
        { k: 'Lokalizacja', v: 'GPS L1+L5, A-GPS, GLONASS, Galileo, BeiDou' },
        { k: 'Bluetooth', v: '5.3' },
        { k: 'Aparaty', v: '13 Mpx z tyłu, 8 Mpx z przodu' },
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
      icon: ICON.skaner,
      title: 'Skaner zamiast aparatu',
      body:
        'Dedykowany moduł czyta kody 1D i 2D bez celowania aparatem i bez zdejmowania rękawic — ' +
        'przy kilkuset odczytach dziennie to różnica między pracą a walką ze sprzętem.',
    },
    {
      icon: ICON.pamiec,
      title: 'Zapas pamięci na aplikacje i mapy',
      body:
        '6 GB RAM i 128 GB pamięci wbudowanej, a do tego karta micro SD 64 GB w zestawie. ' +
        'Warstwy map i dokumentacja mieszczą się bez czyszczenia urządzenia co tydzień.',
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
  usedBy: { device: 'Honeywell CT32' },
  related: [
    {
      name: 'Honeywell CT32 bez skanera',
      href: '/produkt/honeywell-ct32-bez-skanera',
      note: 'Ta sama obudowa i parametry, bez skanera kodów',
    },
    {
      name: 'Zebra TC58e',
      href: '/produkt/zebra-tc58e',
      note: 'Terminal ze skanerem, praca od −20 °C i upadek z 1,8 m',
    },
  ],
}

export default function HoneywellCT32Page() {
  return <ProductPage data={data} />
}
