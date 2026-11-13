'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Datalogic Memor 17. Parametry: datasheet Memor 12-17 (DS-MEMOR12-17-EN, rev. A) i strona
// produktu datalogic.com. ZUP Łódź kupuje go w umowie NH.271.51.2026 z 02.11.2026 (część 2,
// „Mobilny komputer dotykowy – typ 3”). Zdjęcie: Datalogic pokazuje Memor 17 tylko razem
// z Memor 12, więc to z karty sklepu LDLC (ten sam render producenta). Karta dodana 13.11.2026.
const data: ProductData = {
  slug: 'datalogic-memor-17',
  name: 'Datalogic Memor 17',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/memor17_1.png'],
  inquiry: {
    description: 'Lekki rejestrator leśniczego ze skanerem i ładowaniem bezprzewodowym',
    specifications: 'Android 13, do 19 · 6″ FHD+ · 6/64 GB · 5G · skaner 1D/2D · 4000 mAh · IP68 · 245 g',
  },
  whyNavLabel: 'Dlaczego Memor 17',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.pamiec, label: 'Pamięć', value: '6 GB RAM + 64 GB' },
    { icon: ICON.skaner, label: 'Skaner', value: 'Datalogic DE2121, kody 1D i 2D' },
    { icon: ICON.siec, label: 'Sieć', value: '5G, Wi-Fi 6E, nano SIM + eSIM' },
    { icon: ICON.waga, label: 'Waga', value: '245 g z baterią' },
  ],
  variants: [{ id: 'pamiec', label: 'Pamięć', options: ['6 GB / 64 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6″' },
        { k: 'Rozdzielczość', v: '2160 × 1080 FHD+, 450 nitów' },
        { k: 'Szkło', v: 'Corning Gorilla Glass 7, klejone optycznie' },
        { k: 'Obsługa', v: 'palcem, w rękawicach i rysikiem; ekran ignoruje krople wody' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 13 z GMS, platforma przygotowana do Androida 19' },
        { k: 'Procesor', v: 'Qualcomm QCx4490, 8 rdzeni, 2,4 GHz' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB' },
        { k: 'Karta pamięci', v: 'microSD do 2 TB' },
      ],
    },
    {
      title: 'Łączność i odczyt',
      rows: [
        { k: 'Skaner', v: 'Datalogic DE2121, kody 1D i 2D, zielony punkt potwierdzenia odczytu' },
        { k: 'Sieć', v: '5G i LTE, nano SIM i eSIM' },
        { k: 'Wi-Fi i Bluetooth', v: 'Wi-Fi 6E (2,4 / 5 / 6 GHz), Bluetooth 5.3' },
        { k: 'NFC', v: 'ISO 14443-4 A/B, ISO 15693, Mifare, FeliCa' },
        { k: 'Lokalizacja', v: 'GPS z A-GPS, Galileo, BeiDou — dwuczęstotliwościowe' },
        { k: 'Aparaty', v: '13 Mpx z autofokusem i lampą, 8 Mpx z przodu' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP65 i IP68' },
        { k: 'Upadki', v: 'z 1,5 m na beton w gumowej osłonie, z 1,3 m bez osłony' },
        { k: 'Bębnowanie', v: '500 upadków z 0,5 m, z osłoną z 1 m' },
        { k: 'Temperatura pracy', v: 'od −10 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie i obsługa',
      rows: [
        { k: 'Akumulator', v: '3,87 V, 4000 mAh, wymiana bez utraty danych aplikacji (Safe Swap)' },
        { k: 'Ładowanie', v: 'USB-C i bezprzewodowo (Qi, 7 W)' },
        { k: 'Wymiary', v: '165 × 76,7 × 13,5 mm' },
        { k: 'Waga', v: '245 g z baterią' },
        { k: 'Dostawa i serwis', v: 'TAKMA' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.waga,
      title: '245 gramów w kieszeni',
      body:
        'Memor 17 z baterią waży 245 g i ma 13,5 mm grubości — przy całym dniu w lesie różnica ' +
        'w kieszeni kurtki jest odczuwalna.',
    },
    {
      icon: ICON.skaner,
      title: 'Zielony punkt potwierdza odczyt',
      body:
        'Po zeskanowaniu kodu skaner wyświetla zielony punkt na etykiecie. Widać, że odczyt się udał, ' +
        'bez patrzenia na ekran — przydatne przy seryjnym skanowaniu.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Ładowanie bez kabla',
      body:
        'Akumulator ładuje się bezprzewodowo (Qi), więc w kancelarii wystarczy odłożyć terminal ' +
        'na podstawkę — gniazdo USB-C nie zużywa się od codziennego wpinania kabla.',
    },
    {
      icon: ICON.wymiana,
      title: 'Wymiana baterii bez utraty danych',
      body:
        'Funkcja Safe Swap chroni dane otwartej aplikacji przy wymianie akumulatora, więc rozpoczęty ' +
        'wpis nie przepada, gdy bateria siada w połowie pracy.',
    },
  ],
  usedBy: { device: 'Datalogic Memor 17' },
  serviceContract: '3 lata',
  related: [
    {
      name: 'Newland MT95 Kambur Pro III',
      href: '/produkt/newland-mt95',
      note: 'Bateria 5100 mAh wymieniana bez wyłączania, praca od −20 °C',
    },
    {
      name: 'Zebra TC501',
      href: '/produkt/zebra-tc501',
      note: 'Więcej pamięci (12/256 GB), ekran AMOLED 1500 nitów',
    },
  ],
}

export default function DatalogicMemor17Page() {
  return <ProductPage data={data} />
}
