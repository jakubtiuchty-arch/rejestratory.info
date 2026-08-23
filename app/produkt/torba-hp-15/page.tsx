'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'torba-hp-15',
  name: 'Torba HP do laptopów 15,6″',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/torba_hp_15.png'],
  inquiry: {
    description: 'Dwukomorowa torba HP na laptopa',
    specifications: 'Laptopy 15,6″ · dwie komory · odporna na wilgoć i zarysowania · 600 g',
  },
  whyNavLabel: 'Dlaczego torba HP',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.torba, label: 'Rozmiar', value: 'laptopy 15,6″' },
    { icon: ICON.dokumenty, label: 'Komory', value: 'dwie, z przegrodami' },
    { icon: ICON.woda, label: 'Materiał', value: 'odporny na wilgoć' },
    { icon: ICON.waga, label: 'Waga', value: '600 g' },
  ],
  specGroups: [
    {
      title: 'Przeznaczenie',
      rows: [
        { k: 'Laptopy', v: '15,6 cala' },
        { k: 'Budowa', v: 'dwukomorowa, z przegrodami na akcesoria' },
        { k: 'Mocowanie do walizki', v: 'otwór na uchwyt' },
      ],
    },
    {
      title: 'Wykonanie',
      rows: [
        { k: 'Odporność', v: 'na wilgoć i zarysowania' },
        { k: 'Kolor', v: 'czarny lub ciemnoszary' },
        { k: 'Waga', v: '600 g' },
        { k: 'Gwarancja', v: '12 miesięcy' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.dokumenty,
      title: 'Dwie komory zamiast jednej',
      body:
        'Laptop w jednej, dokumenty i akcesoria w drugiej — sprzęt nie jedzie w jednej przestrzeni z segregatorem i ładowarką.',
    },
    {
      icon: ICON.torba,
      title: 'Wchodzi na uchwyt walizki',
      body:
        'Otwór na rączkę walizki trzyma torbę na miejscu przy przejściu przez parking i dworzec, zamiast zsuwać się z ramienia.',
    },
    {
      icon: ICON.woda,
      title: 'Deszcz jej nie robi różnicy',
      body:
        'Materiał odporny na wilgoć i zarysowania — przejście z auta do biura w deszczu nie kończy się mokrą obudową.',
    },
    {
      icon: ICON.waga,
      title: 'Sześćset gramów pustej torby',
      body:
        'Lekka konstrukcja nie dokłada ciężaru do sprzętu, który i tak trzeba nieść — istotne przy dojazdach do leśnictw.',
    },
  ],
  related: [
    {
      name: 'Torba na laptopa 15,6″',
      href: '/produkt/torba-na-laptopa-15',
      note: 'Wersja z wyściełaną komorą i paskiem na ramię',
    },
    {
      name: 'HP EliteBook 6 G1ah 14',
      href: '/produkt/hp-elitebook-6-g1ah-14',
      note: 'Laptop, który się w niej mieści',
    },
  ],
}

export default function TorbaHP15Page() {
  return <ProductPage data={data} />
}
