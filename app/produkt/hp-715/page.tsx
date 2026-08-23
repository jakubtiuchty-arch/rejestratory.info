'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-715',
  name: 'HP 715 Rechargeable Mouse',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/hp715_1.png'],
  modelCode: '6E6F0AA',
  inquiry: {
    description: 'Bezprzewodowa mysz do trzech urządzeń',
    specifications: 'Bluetooth 5.3 i 2,4 GHz · do 3 urządzeń · 1200–3000 dpi · ładowanie USB-C',
  },
  whyNavLabel: 'Dlaczego HP 715',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.urzadzenia, label: 'Urządzenia', value: 'do 3 zapisanych' },
    { icon: ICON.precyzja, label: 'Czujnik', value: '1200 dpi, do 3000 dpi' },
    { icon: ICON.czaspracy, label: 'Akumulator', value: 'do 90 dni, ładowanie USB-C' },
    { icon: ICON.jednareka, label: 'Kształt', value: 'dla osób oburęcznych' },
  ],
  specGroups: [
    {
      title: 'Łączność',
      rows: [
        { k: 'Bluetooth', v: '5.3' },
        { k: 'Odbiornik', v: 'klucz sprzętowy 2,4 GHz' },
        { k: 'Zapisane urządzenia', v: 'do 3' },
        { k: 'Zasięg', v: 'do 10 m w otwartej przestrzeni' },
        { k: 'Systemy', v: 'Windows 11 i 10, ChromeOS, macOS 10.13 lub nowszy' },
      ],
    },
    {
      title: 'Czujnik i obsługa',
      rows: [
        { k: 'Rozdzielczość', v: '1200 dpi nominalnie, do 3000 dpi' },
        { k: 'Powierzchnie', v: 'czujnik pracuje także na szkle' },
        { k: 'Przyciski do przypisania', v: '6' },
        { k: 'Kółko', v: 'uchylne, z szybkim przewijaniem' },
        { k: 'Kształt', v: 'symetryczny, dla osób oburęcznych' },
      ],
    },
    {
      title: 'Zasilanie i wymiary',
      rows: [
        { k: 'Akumulator', v: 'wbudowany, ładowany przez USB-C' },
        { k: 'Czas pracy', v: 'do 90 dni po pełnym naładowaniu' },
        { k: 'Wskaźniki', v: 'stan akumulatora, kanał' },
        { k: 'Waga', v: 'do 85 g' },
        { k: 'Wymiary', v: '102,1 × 57,1 × 36,5 mm' },
        { k: 'Gwarancja', v: '12 miesięcy' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.urzadzenia,
      title: 'Przeskakuje między trzema komputerami',
      body:
        'Trzy zapisane urządzenia i przełączanie kanałem — jedna mysz obsługuje stanowisko w kancelarii, laptop terenowy i tablet, bez wypinania odbiornika.',
    },
    {
      icon: ICON.precyzja,
      title: 'Działa na blacie ze szkłem',
      body:
        'Czujnik radzi sobie z powierzchniami, na których zwykła mysz gubi ruch — także ze szklanym blatem, gdzie podkładka nie zawsze jest pod ręką.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Trzy miesiące na jednym ładowaniu',
      body:
        'Wbudowany akumulator wystarcza na 90 dni pracy i uzupełnia się kablem USB-C — bez wymiany paluszków i bez martwej myszy w środku dnia.',
    },
    {
      icon: ICON.klawiszskrotu,
      title: 'Sześć przycisków pod własne skróty',
      body:
        'Programowalne przyciski i uchylne kółko skracają pracę z długimi zestawieniami — przewijanie i cofanie bez sięgania po klawiaturę.',
    },
  ],
  signature: [
    {
      icon: ICON.jednareka,
      title: 'Symetryczna, dla praworęcznych i leworęcznych',
      body:
        'Kształt bez profilowania pod jedną dłoń — ta sama mysz pasuje każdemu na stanowisku współdzielonym i nie trzeba zamawiać osobnego modelu.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP 460 Multi-device Keyboard',
      href: '/produkt/hp-460',
      note: 'Klawiatura z tym samym trybem trzech urządzeń',
    },
    {
      name: 'Podkładka pod mysz',
      href: '/produkt/podkladka-pod-mysz',
      note: 'Z podpórką pod nadgarstek',
    },
  ],
}

export default function HP715Page() {
  return <ProductPage data={data} />
}
