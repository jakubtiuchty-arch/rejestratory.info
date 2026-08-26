'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Dane wyłącznie z druku ZUP Łódź „Oferta na Rejestrator Honeywell CT32 23.03.2026”.
// Odporności i czasu pracy druk nie podaje, więc karta ich nie deklaruje.
const data: ProductData = {
  slug: 'honeywell-ct32',
  name: 'Honeywell CT32',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/placeholder-produkt.png'],
  inquiry: {
    description: 'Rejestrator leśniczego ze skanerem 1D i 2D',
    specifications: 'Android 13 z aktualizacją do 16 · 5,5″ · 6/128 GB · Dual SIM · 4500 mAh',
  },
  whyNavLabel: 'Dlaczego CT32',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.pamiec, label: 'Pamięć', value: '6 GB RAM + 128 GB' },
    { icon: ICON.skaner, label: 'Skaner', value: 'kody 1D i 2D' },
    { icon: ICON.siec, label: 'Karty SIM', value: 'dwie, z GPS i GSM' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4500 mAh' },
  ],
  variants: [{ id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [{ k: 'Przekątna', v: '5,5″' }],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 13, z aktualizacją do 16' },
        { k: 'Procesor', v: '8 rdzeni, 2,4 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB' },
        { k: 'Karta pamięci', v: 'micro SD 64 GB w zestawie' },
      ],
    },
    {
      title: 'Łączność i odczyt',
      rows: [
        { k: 'Skaner', v: 'kody 1D i 2D' },
        { k: 'Sieć', v: 'moduł GSM/GPRS, dwie karty SIM' },
        { k: 'Lokalizacja', v: 'moduł GPS' },
        { k: 'Bluetooth', v: '5.0' },
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
      title: 'Dwie karty SIM w jednym urządzeniu',
      body:
        'Służbowa i zapasowa karta obok siebie — w miejscach, gdzie jeden operator nie łapie, ' +
        'drugi zwykle tak. GPS i moduł GSM pracują niezależnie od telefonu prywatnego.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Android z drogą aktualizacji',
      body:
        'Urządzenie wychodzi z Androidem 13 z możliwością aktualizacji do wersji 16, więc nie ' +
        'wypadnie z obiegu razem z pierwszą zmianą wymagań systemowych.',
    },
  ],
  usedBy: { device: 'Honeywell CT32' },
  related: [
    {
      name: 'Honeywell CT30P',
      href: '/produkt/honeywell-ct30',
      note: 'Ten sam ekran 5,5″, obudowa odporna na upadki i zachlapanie',
    },
    {
      name: 'Honeywell CT40XP',
      href: '/produkt/honeywell-ct40xp',
      note: 'Większy ekran, gdy liczy się praca z formularzami',
    },
  ],
}

export default function HoneywellCT32Page() {
  return <ProductPage data={data} />
}
