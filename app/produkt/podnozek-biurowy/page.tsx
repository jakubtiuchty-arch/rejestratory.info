'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'podnozek-biurowy',
  name: 'Podnóżek biurowy',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/podnozek_pod_biurko_1.png'],
  inquiry: {
    description: 'Podnóżek z regulacją kąta nachylenia',
    specifications: 'Regulacja kąta nachylenia · powierzchnia antypoślizgowa · pod biurko',
  },
  whyNavLabel: 'Dlaczego Podnóżek',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.podnozek, label: 'Pozycja', value: 'kolana ustawione pod kątem prostym' },
    { icon: ICON.kat, label: 'Regulacja', value: 'kąt nachylenia' },
    { icon: ICON.antyposlizg, label: 'Powierzchnia', value: 'antypoślizgowa' },
    { icon: ICON.biurko, label: 'Montaż', value: 'stawiany pod biurkiem, bez mocowania' },
  ],
  specGroups: [
    {
      title: 'Wykonanie',
      rows: [
        { k: 'Regulacja', v: 'kąt nachylenia' },
        { k: 'Powierzchnia', v: 'antypoślizgowa' },
        { k: 'Ustawienie', v: 'wolnostojący, pod biurkiem' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.podnozek,
      title: 'Stopy dosięgają podłoża',
      body:
        'Przy biurku o stałej wysokości niższa osoba siedzi z nogami w powietrzu. Podnóżek podnosi podparcie i zdejmuje nacisk z ud.',
    },
    {
      icon: ICON.kat,
      title: 'Kąt do ustawienia',
      body:
        'Nachylenie dobiera się pod wzrost i wysokość krzesła, a nie pod jeden uśredniony wzorzec.',
    },
    {
      icon: ICON.antyposlizg,
      title: 'Nie ucieka spod nóg',
      body:
        'Antypoślizgowa powierzchnia trzyma stopy na miejscu przy zmianie pozycji.',
    },
    {
      icon: ICON.biurko,
      title: 'Bez montażu',
      body:
        'Stawia się pod biurkiem i gotowe — nie trzeba wiercić ani wymieniać mebla.',
    },
  ],
  whereToBuy: [
    { name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe' },
    { name: 'TAKMA' },
  ],
  hideService: true,
  related: [
    {
      name: 'Podkładka pod mysz z podpórką',
      href: '/produkt/podkladka-pod-mysz',
      note: 'Ergonomia od strony blatu',
    },
  ],
}

export default function PodnozekBiurowyPage() {
  return <ProductPage data={data} />
}
