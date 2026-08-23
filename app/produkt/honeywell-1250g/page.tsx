'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-1250g',
  name: 'Honeywell Voyager 1250g',
  category: 'Elektroniczne Zarządzanie Dokumentacją',
  categoryHref: '/kategoria/ezd',
  images: ['/honeywell-1250g.png'],
  inquiry: {
    description: 'Czytnik laserowy kodów kreskowych z podstawką',
    specifications: 'Kody 1D · laser jednoliniowy · 100 odczytów na sekundę · odczyt do 58 cm · USB',
  },
  whyNavLabel: 'Dlaczego Voyager 1250g',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W obiegu dokumentów',
  highlights: [
    { icon: ICON.skaner, label: 'Odczyt', value: 'kody kreskowe 1D' },
    { icon: ICON.szybkosc, label: 'Tempo', value: '100 odczytów na sekundę' },
    { icon: ICON.lupa, label: 'Zasięg', value: 'do 58 cm dla kodu 13 mil' },
    { icon: ICON.dok, label: 'Podstawka', value: 'tryb prezentacyjny, w ofercie' },
  ],
  specGroups: [
    {
      title: 'Odczyt',
      rows: [
        { k: 'Rodzaj', v: 'laser jednoliniowy' },
        { k: 'Kody', v: 'kreskowe 1D' },
        { k: 'Tempo skanowania', v: '100 odczytów na sekundę' },
        { k: 'Zasięg dla kodu 13 mil', v: 'do 44,7 cm' },
        { k: 'Maksymalny zasięg', v: 'do 58,4 cm dla kodów liniowych' },
      ],
    },
    {
      title: 'Praca ze stanowiskiem',
      rows: [
        { k: 'Złącze', v: 'USB, kabel w ofercie osobno' },
        { k: 'Podstawka', v: 'tryb prezentacyjny — czytnik działa bez trzymania w ręce' },
        { k: 'Uruchomienie', v: 'bez sterowników, czytnik zgłasza się jako klawiatura' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.szybkosc,
      title: 'Sto odczytów na sekundę',
      body:
        'Przy wprowadzaniu korespondencji liczy się tempo — czytnik łapie kod od razu po zbliżeniu, bez celowania i powtarzania.',
    },
    {
      icon: ICON.lupa,
      title: 'Czyta z pół metra',
      body:
        'Kod 13 mil odczytuje z 44 cm, a szersze kody liniowe nawet z 58 cm — pismo nie musi trafić pod samo okienko czytnika.',
    },
    {
      icon: ICON.dok,
      title: 'Na podstawce pracuje bez rąk',
      body:
        'Postawiony w podstawce przechodzi w tryb prezentacyjny: wystarczy przesunąć dokument przed czytnikiem, obie ręce zostają wolne.',
    },
    {
      icon: ICON.skaner,
      title: 'Do kodów kreskowych na pismach',
      body:
        'Model jednoliniowy do klasycznych kodów kreskowych — tańszy od czytnika obszarowego tam, gdzie kody 2D nie występują.',
    },
  ],
  related: [
    {
      name: 'Honeywell Voyager 1450g',
      href: '/produkt/honeywell-1450g',
      note: 'Ten sam kształt, ale czyta też kody 2D',
    },
    {
      name: 'Zebra DS2208',
      href: '/produkt/zebra-ds2208',
      note: 'Czytnik obszarowy 1D i 2D',
    },
  ],
}

export default function Honeywell1250gPage() {
  return <ProductPage data={data} />
}
