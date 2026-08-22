'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'torba-na-laptopa-15',
  name: 'Torba na laptopa 15,6″',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/torba_na_laptopa_15.png'],
  inquiry: {
    description: 'Torba na laptopa z przegrodą na dokumenty',
    specifications: 'Laptopy do 15,6″ · wyściełana komora · materiał wodoodporny · kieszeń na dokumenty',
  },
  whyNavLabel: 'Dlaczego Torba',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.torba, label: 'Rozmiar', value: 'laptopy do 15,6″' },
    { icon: ICON.woda, label: 'Materiał', value: 'wodoodporny' },
    { icon: ICON.wyscielenie, label: 'Komora na laptop', value: 'wyściełana' },
    { icon: ICON.dokumenty, label: 'Dokumenty', value: 'osobna przegroda' },
  ],
  specGroups: [
    {
      title: 'Przeznaczenie',
      rows: [
        { k: 'Laptopy', v: 'do 15,6 cala' },
        { k: 'Komora główna', v: 'wyściełana, na laptopa' },
        { k: 'Przegroda', v: 'na dokumenty i akcesoria' },
      ],
    },
    {
      title: 'Wykonanie',
      rows: [
        { k: 'Materiał', v: 'wodoodporny' },
        { k: 'Noszenie', v: 'uchwyt i pasek na ramię' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.wyscielenie,
      title: 'Wyściełana komora na sprzęt',
      body:
        'Laptop jedzie w wyściełanej przegrodzie, a nie luzem między dokumentami — najczęstsza przyczyna pękniętej matrycy odpada.',
    },
    {
      icon: ICON.woda,
      title: 'Materiał wodoodporny',
      body:
        'Przejście z parkingu do biura w deszczu nie kończy się mokrą klawiaturą.',
    },
    {
      icon: ICON.dokumenty,
      title: 'Dokumenty osobno',
      body:
        'Segregator i wydruki mają własną przegrodę, więc nie trą o obudowę laptopa przy każdym kroku.',
    },
    {
      icon: ICON.torba,
      title: 'Do noszenia, nie do przenoszenia raz',
      body:
        'Uchwyt i pasek na ramię — torba jest przewidziana na codzienny dojazd, a nie na jednorazową przeprowadzkę sprzętu.',
    },
  ],
  whereToBuy: [
    { name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe' },
    { name: 'TAKMA' },
  ],
  hideService: true,
  related: [
    {
      name: 'Samsung SSD T7',
      href: '/produkt/samsung-ssd-t7',
      note: 'Dysk, który zmieści się w przedniej kieszeni',
    },
  ],
}

export default function TorbaNaLaptopaPage() {
  return <ProductPage data={data} />
}
