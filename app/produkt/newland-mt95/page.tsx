'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Newland MT95 Kambur Pro III (NLS-MT9557). Parametry: datasheet Newland (PL), strona produktu
// newland-id.com, roadmapa Androida Newlanda. ZUP Łódź kupuje go w umowie NH.271.51.2026
// z 02.11.2026 (część 1, „Mobilny komputer dotykowy – typ 1”). Rozdzielczości ekranu, wagi
// i liczby gniazd SIM nie podajemy: datasheet Newlanda i umowa podają tu różne wartości.
// Karta dodana 13.11.2026.
const data: ProductData = {
  slug: 'newland-mt95',
  name: 'Newland MT95 Kambur Pro III',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/mt95_1.png', '/mt95_2.png'],
  inquiry: {
    description: 'Rejestrator leśniczego ze skanerem i baterią wymienianą bez wyłączania',
    specifications: 'Android 15 · 6″ · 6/64 GB · 5G · skaner 1D/2D · 5100 mAh hot-swap · IP67',
  },
  whyNavLabel: 'Dlaczego MT95',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.pamiec, label: 'Pamięć', value: '6 GB RAM + 64 GB' },
    { icon: ICON.skaner, label: 'Skaner', value: 'kody 1D i 2D, celownik laserowy' },
    { icon: ICON.siec, label: 'Sieć', value: '5G, Wi-Fi 6, NFC, GPS' },
    { icon: ICON.wymiana, label: 'Bateria', value: '5100 mAh, wymiana bez wyłączania' },
  ],
  variants: [{ id: 'pamiec', label: 'Pamięć', options: ['6 GB / 64 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6″' },
        { k: 'Szkło', v: 'Corning Gorilla Glass' },
        { k: 'Dotyk', v: 'pojemnościowy, wielodotykowy' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 15 z GMS, Android Enterprise Recommended' },
        { k: 'Poprawki zabezpieczeń', v: 'do końca 2029 roku (plan Newlanda)' },
        { k: 'Procesor', v: '8 rdzeni, 64-bit, 2,4 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
        { k: 'Karta pamięci', v: 'microSD do 2 TB' },
      ],
    },
    {
      title: 'Łączność i odczyt',
      rows: [
        { k: 'Skaner', v: 'imager 2D Newland, kody 1D i 2D, celownik laserowy' },
        { k: 'Sieć', v: '5G i LTE' },
        { k: 'Wi-Fi i Bluetooth', v: 'Wi-Fi 6, Bluetooth 5.2' },
        { k: 'NFC', v: 'ISO 14443 A/B, ISO 15693, MIFARE, FeliCa' },
        { k: 'Lokalizacja', v: 'GPS z A-GPS, GLONASS, Galileo, BeiDou' },
        { k: 'Aparaty', v: '13 Mpx z autofokusem i lampą, 8 Mpx z przodu' },
        { k: 'Czytnik linii papilarnych', v: 'tak' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP67' },
        { k: 'Upadki', v: 'z 1,5 m na beton' },
        { k: 'Temperatura pracy', v: 'od −20 °C do +50 °C' },
        { k: 'Przechowywanie', v: 'od −30 °C do +60 °C' },
      ],
    },
    {
      title: 'Zasilanie i obsługa',
      rows: [
        { k: 'Akumulator', v: '3,87 V, 5100 mAh, wymiana bez wyłączania (hot-swap)' },
        { k: 'Ładowanie', v: 'USB-C, 18 W' },
        { k: 'Dostawa i serwis', v: 'TAKMA' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.wymiana,
      title: 'Bateria wymieniana w biegu',
      body:
        'Akumulator 5100 mAh wymienia się bez wyłączania terminala. Zapasowa bateria w kieszeni ' +
        'kurtki wystarcza, żeby dokończyć pomiary bez szukania gniazdka i bez utraty otwartej aplikacji.',
    },
    {
      icon: ICON.skaner,
      title: 'Skaner z celownikiem laserowym',
      body:
        'Imager czyta kody 1D i 2D, a krzyżowy celownik pokazuje, co jest skanowane — ' +
        'także w słońcu, gdy obraz z aparatu jest słabo widoczny.',
    },
    {
      icon: ICON.siec,
      title: '5G, Wi-Fi 6 i cztery systemy nawigacji',
      body:
        'Modem 5G i LTE do pracy w terenie, Wi-Fi 6 w kancelarii, a lokalizacja z GPS, GLONASS, ' +
        'Galileo i BeiDou jednocześnie.',
    },
    {
      icon: ICON.woda,
      title: 'IP67 i praca od −20 °C',
      body:
        'Obudowa szczelna na deszcz i kurz, upadki z 1,5 m na beton i praca w zimie do −20 °C — ' +
        'parametry pod całoroczną pracę leśniczego.',
    },
  ],
  usedBy: { device: 'Newland MT95' },
  serviceContract: '3 lata',
  related: [
    {
      name: 'Zebra TC501',
      href: '/produkt/zebra-tc501',
      note: 'Więcej pamięci (12/256 GB), Wi-Fi 7 i upadki z 2,44 m',
    },
    {
      name: 'Honeywell CT32',
      href: '/produkt/honeywell-ct32',
      note: 'Ekran 6″ FHD+, 6/128 GB i Android do 18',
    },
  ],
}

export default function NewlandMT95Page() {
  return <ProductPage data={data} />
}
