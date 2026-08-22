'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'podkladka-pod-mysz',
  name: 'Podkładka pod mysz z podpórką',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/podkladka_pod_myszke_1.png'],
  inquiry: {
    description: 'Podkładka z żelową podpórką pod nadgarstek',
    specifications: 'Podpórka pod nadgarstek · spód antypoślizgowy · wymiary ok. 25 × 20 cm',
  },
  whyNavLabel: 'Dlaczego Podkładka',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.podkladka, label: 'Podpórka', value: 'pod nadgarstek' },
    { icon: ICON.nadgarstek, label: 'Ustawienie ręki', value: 'nadgarstek uniesiony' },
    { icon: ICON.mysz, label: 'Powierzchnia', value: 'gładka, pod czujnik optyczny' },
    { icon: ICON.antyposlizg, label: 'Spód', value: 'antypoślizgowy' },
  ],
  specGroups: [
    {
      title: 'Wykonanie',
      rows: [
        { k: 'Podpórka', v: 'pod nadgarstek' },
        { k: 'Spód', v: 'antypoślizgowy' },
        { k: 'Wymiary', v: 'ok. 25 × 20 cm' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.nadgarstek,
      title: 'Nadgarstek nie leży na krawędzi biurka',
      body:
        'Podpórka unosi rękę tak, żeby nacisk rozłożył się na przedramię — to najprostsza zmiana w stanowisku, jaką da się wprowadzić w jedno popołudnie.',
    },
    {
      icon: ICON.podkladka,
      title: 'Jedna rzecz, nie dwie',
      body:
        'Podkładka i podpórka w jednym elemencie, bez osobnej poduszki, która i tak ucieka spod ręki.',
    },
    {
      icon: ICON.antyposlizg,
      title: 'Nie jedzie po blacie',
      body:
        'Antypoślizgowy spód trzyma podkładkę w miejscu przy szybkim ruchu myszą.',
    },
    {
      icon: ICON.mysz,
      title: 'Powierzchnia pod czujnik optyczny',
      body:
        'Gładka, jednolita faktura — mysz nie gubi śledzenia tak jak na lakierowanym blacie.',
    },
  ],
  whereToBuy: [
    { name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe' },
    { name: 'TAKMA' },
  ],
  hideService: true,
  related: [
    {
      name: 'Podnóżek biurowy',
      href: '/produkt/podnozek-biurowy',
      note: 'Druga strona tego samego stanowiska',
    },
  ],
}

export default function PodkladkaPodMyszPage() {
  return <ProductPage data={data} />
}
