'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'hp-655',
  name: 'HP 655 Wireless Keyboard and Mouse',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/hp655_1.png'],
  inquiry: {
    description: 'Bezprzewodowy zestaw klawiatura i mysz',
    specifications: '2,4 GHz · zasięg do 10 m · mysz 4000 dpi · bateria klawiatury do 20 mies., myszy do 24 mies.',
  },
  whyNavLabel: 'Dlaczego HP 655',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.odbiornik, label: 'Łączność', value: '2,4 GHz, zasięg do 10 m' },
    { icon: ICON.precyzja, label: 'Rozdzielczość myszy', value: '4000 dpi' },
    { icon: ICON.czaspracy, label: 'Bateria', value: 'klawiatura 20, mysz 24 miesiące' },
    { icon: ICON.klawiatura, label: 'Układ', value: 'pełnowymiarowy, niski profil' },
  ],
  specGroups: [
    {
      title: 'Łączność',
      rows: [
        { k: 'Standard', v: 'bezprzewodowy 2,4 GHz' },
        { k: 'Odbiornik', v: 'USB typu A, dołączony' },
        { k: 'Zasięg', v: 'do 10 m w otwartej przestrzeni' },
      ],
    },
    {
      title: 'Klawiatura',
      rows: [
        { k: 'Układ', v: 'pełnowymiarowy, trzystrefowy' },
        { k: 'Skok klawisza', v: '2,0 mm, niski profil' },
        { k: 'Klawisze do przypisania', v: 'ponad 20' },
        { k: 'Zasilanie', v: '2 × AAA' },
        { k: 'Żywotność baterii', v: 'do 20 miesięcy' },
      ],
    },
    {
      title: 'Mysz',
      rows: [
        { k: 'Czujnik', v: 'optyczny, wielopowierzchniowy' },
        { k: 'Rozdzielczość', v: '4000 dpi' },
        { k: 'Budowa', v: 'symetryczna, dla prawo- i leworęcznych' },
        { k: 'Zasilanie', v: '2 × AA' },
        { k: 'Żywotność baterii', v: 'do 24 miesięcy' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.mysz,
      title: 'Działa też na blacie bez podkładki',
      body:
        'Czujnik wielopowierzchniowy radzi sobie na lakierowanym biurku i na kamiennym parapecie — mysz nie wymaga przygotowania stanowiska.',
    },
    {
      icon: ICON.odbiornik,
      title: 'Dziesięć metrów zasięgu',
      body:
        'Odbiornik USB może zostać w komputerze pod biurkiem albo w szafie serwerowej, a zestaw nadal odpowiada.',
    },
    {
      icon: ICON.klawiszskrotu,
      title: 'Ponad dwadzieścia klawiszy do przypisania',
      body:
        'Skróty do najczęstszych czynności ustawia się raz i przestaje szukać ich w menu.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Dwa lata na bateriach myszy',
      body:
        'Deklarowane 24 miesiące pracy myszy i 20 miesięcy klawiatury — wymiana baterii nie wchodzi do kalendarza.',
    },
  ],
  related: [
    {
      name: 'Dell Pro KM5221W',
      href: '/produkt/dell-km5221',
      note: 'Szyfrowana transmisja i bateria na 36 miesięcy',
    },
  ],
}

export default function HP655Page() {
  return <ProductPage data={data} />
}
