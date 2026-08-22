'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'bixolon-sppr410',
  name: 'Bixolon SPP-R410',
  category: 'Drukarki do rejestratora',
  categoryHref: '/kategoria/drukarki-do-rejestratora',
  images: ['/sppr410_1.png'],
  inquiry: {
    description: 'Najlżejsza mobilna drukarka 4-calowa w katalogu',
    specifications: '203 dpi · do 90 mm/s · 530 g · Bluetooth · IP54 · upadek 1,8 m',
  },
  whyNavLabel: 'Dlaczego SPP-R410',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Przy odbiorze drewna',
  highlights: [
    { icon: ICON.waga, label: 'Waga', value: '530 g z baterią' },
    { icon: ICON.kompakt, label: 'Wymiary', value: '143 × 138 × 66 mm' },
    { icon: ICON.bluetooth, label: 'Łączność', value: 'Bluetooth' },
    { icon: ICON.upadek, label: 'Odporność', value: 'IP54, upadki z 1,8 m' },
  ],
  specGroups: [
    {
      title: 'Obudowa',
      rows: [
        { k: 'Wymiary', v: '143 × 138 × 66 mm' },
        { k: 'Waga z baterią', v: '530 g' },
        { k: 'Pamięć', v: '8 MB SDRAM, 4 MB Flash' },
        { k: 'Gwarancja', v: '2 lata' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość', v: 'do 90 mm/s dla paragonów, 60 mm/s bez podkładu' },
        { k: 'Rozdzielczość', v: '203 dpi' },
        { k: 'Szerokość druku', v: 'do 104 mm' },
        { k: 'Technologia', v: 'termiczna' },
      ],
    },
    {
      title: 'Nośniki',
      rows: [
        { k: 'Rodzaje', v: 'paragony i etykiety z podkładem' },
        { k: 'Szerokość', v: '112 mm lub 105 mm' },
        { k: 'Średnica rolki', v: 'do 57 mm' },
        { k: 'Ładowanie', v: 'system łatwej wymiany rolki' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Bateria', v: 'Li-Ion 7,3 V, 2850 mAh' },
        { k: 'Czas ładowania', v: 'do 4 godzin' },
        { k: 'Transmisja', v: 'Bluetooth' },
        { k: 'Parowanie', v: 'Easy Bluetooth Pairing' },
        { k: 'Szczelność', v: 'IP54' },
        { k: 'Upadki', v: 'z 1,8 m' },
        { k: 'Temperatura pracy', v: 'od -15 °C do +50 °C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.bluetooth,
      title: 'Parowanie z rejestratorem jednym dotknięciem',
      body:
        'Transmisja Bluetooth z funkcją Easy Bluetooth Pairing — połączenie z rejestratorem zestawia się bez wpisywania kodów.',
    },
    {
      icon: ICON.waga,
      title: 'Pięćset trzydzieści gramów',
      body:
        'Najlżejsza drukarka 4-calowa w katalogu — o ćwierć kilograma lżejsza od typowego konkurenta, co odczuwalne jest przy noszeniu przez cały dzień.',
    },
    {
      icon: ICON.kompakt,
      title: 'Najmniejsza obudowa w zestawieniu',
      body:
        'Wymiary 143 × 138 × 66 mm mieszczą się w kieszeni kurtki roboczej albo w małej kaburze przy pasie.',
    },
    {
      icon: ICON.rolka,
      title: 'Łatwa wymiana rolki',
      body:
        'System szybkiego ładowania papieru skraca wymianę do otwarcia klapy i włożenia rolki — bez zdejmowania rękawic.',
    },
  ],
  usedBy: { device: 'Bixolon SPP-R410' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.waga,
      title: 'Najlżejsza drukarka w katalogu',
      body:
        'Pięćset trzydzieści gramów wraz z baterią i najmniejsza obudowa w zestawieniu. Wybór tam, gdzie urządzenie towarzyszy leśniczemu przez cały dzień.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Seiko MP-A40',
      href: '/produkt/seiko-mpa40',
      note: 'Nieco cięższa, z dłuższą żywotnością mechanizmu',
    },
  ],
}

export default function BixolonSPPR410Page() {
  return <ProductPage data={data} />
}
