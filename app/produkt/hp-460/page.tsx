'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-460',
  name: 'HP 460 Multi-device Keyboard',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/hp460_1.png'],
  inquiry: {
    description: 'Bezprzewodowa klawiatura do trzech urządzeń',
    specifications: 'Bluetooth 5.3 i 2,4 GHz · do 3 urządzeń · ładowanie USB-C · bateria do 24 miesięcy',
  },
  whyNavLabel: 'Dlaczego HP 460',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.urzadzenia, label: 'Urządzenia', value: 'do 3 zapisanych, przełączanie kanałem' },
    { icon: ICON.czaspracy, label: 'Bateria', value: 'do 24 miesięcy, ładowanie USB-C' },
    { icon: ICON.klawiatura, label: 'Układ', value: 'kompaktowy z blokiem numerycznym' },
    { icon: ICON.woda, label: 'Obudowa', value: 'odporna na zalanie' },
  ],
  specGroups: [
    {
      title: 'Łączność',
      rows: [
        { k: 'Bluetooth', v: '5.3' },
        { k: 'Odbiornik', v: 'klucz sprzętowy 2,4 GHz' },
        { k: 'Zapisane urządzenia', v: 'do 3, przełączane kanałem' },
        { k: 'Zasięg', v: 'do 10 m w otwartej przestrzeni' },
        { k: 'Parowanie', v: 'Swift Pair' },
        { k: 'Systemy', v: 'Windows 11 i 10, macOS, ChromeOS' },
      ],
    },
    {
      title: 'Klawiatura',
      rows: [
        { k: 'Układ', v: 'kompaktowy dwustrefowy z blokiem numerycznym' },
        { k: 'Klawisze do przypisania', v: '12' },
        { k: 'Klawisze specjalne', v: 'wyciszenie mikrofonu, przełącznik języka' },
        { k: 'Klawisze kierunkowe', v: 'z wklęsłymi nakładkami' },
        { k: 'Wskaźniki LED', v: 'Caps Lock, Num Lock, bateria, kanał' },
        { k: 'Regulacja', v: 'nachylenie na nóżkach' },
        { k: 'Wykrywanie systemu', v: 'automatyczne' },
      ],
    },
    {
      title: 'Zasilanie i obudowa',
      rows: [
        { k: 'Akumulator', v: 'wbudowany, ładowany przez USB-C' },
        { k: 'Czas pracy', v: 'do 24 miesięcy' },
        { k: 'Odporność', v: 'na zalanie' },
        { k: 'Waga', v: '660 g' },
        { k: 'Wymiary', v: '376 × 153 × 20 mm' },
        { k: 'Gwarancja', v: '12 miesięcy' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.urzadzenia,
      title: 'Trzy urządzenia, jedna klawiatura',
      body:
        'Zapisuje trzy sparowane urządzenia i przełącza się między nimi klawiszem kanału — komputer w kancelarii, laptop służbowy i tablet obsługuje się jednym sprzętem na biurku.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Dwa lata bez ładowania',
      body:
        'Wbudowany akumulator wystarcza do 24 miesięcy, a uzupełnia się kablem USB-C — takim samym, jakim ładuje się laptop, więc nie trzeba trzymać zapasu baterii AAA.',
    },
    {
      icon: ICON.klawiatura,
      title: 'Blok numeryczny w kompaktowej obudowie',
      body:
        'Układ dwustrefowy mieści część numeryczną przy szerokości 376 mm — wprowadzanie liczb z protokołów nie wymaga pełnowymiarowej klawiatury zajmującej pół biurka.',
    },
    {
      icon: ICON.woda,
      title: 'Wytrzyma rozlaną kawę',
      body:
        'Obudowa jest odporna na zalanie, a klawisze specjalne wyciszają mikrofon i przełączają język — przydatne przy naradach online.',
    },
  ],
  signature: [
    {
      icon: ICON.urzadzenia,
      title: 'Bluetooth i odbiornik na jednej klawiaturze',
      body:
        'Bluetooth 5.3 do sprzętu, który go ma, i klucz sprzętowy 2,4 GHz do komputerów bez modułu — klawiatura obsłuży stanowisko niezależnie od tego, jak jest wyposażone.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'HP 715 Rechargeable Mouse',
      href: '/produkt/hp-715',
      note: 'Mysz z tym samym trybem trzech urządzeń',
    },
    {
      name: 'HP 655 Wireless Keyboard and Mouse',
      href: '/produkt/hp-655',
      note: 'Zestaw z myszą, na bateriach AAA',
    },
  ],
}

export default function HP460Page() {
  return <ProductPage data={data} />
}
