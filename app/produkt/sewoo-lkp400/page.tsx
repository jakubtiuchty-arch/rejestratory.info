'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'sewoo-lkp400',
  name: 'Sewoo LK-P400',
  category: 'Drukarki do rejestratora',
  categoryHref: '/kategoria/drukarki-do-rejestratora',
  images: ['/lkp400_1.png'],
  inquiry: {
    description: 'Mobilna drukarka termiczna z obsługą nośników bez podkładu',
    specifications: '203 dpi · 127 mm/s · Wi-Fi ac · Bluetooth 4.2 · NFC',
  },
  whyNavLabel: 'Dlaczego LK-P400',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Przy odbiorze drewna',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '127 mm/s, 203 dpi' },
    { icon: ICON.etykieta, label: 'Nośniki', value: 'paragony termiczne, etykiety' },
    { icon: ICON.siec, label: 'Łączność', value: 'Wi-Fi ac, Bluetooth 4.2, NFC' },
    { icon: ICON.rolka, label: 'Rolka', value: 'do Ø 57,5 mm, szerokość 50–112 mm' },
  ],
  specGroups: [
    {
      title: 'Ogólne',
      rows: [
        { k: 'Typ', v: 'mobilna, termiczna' },
        { k: 'Metoda druku', v: 'termiczna bezpośrednia' },
        { k: 'Rozdzielczość', v: '203 dpi' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Prędkość', v: '127 mm/s' },
        { k: 'Szerokość druku', v: '104 mm' },
        { k: 'Punkty na linię', v: '832' },
      ],
    },
    {
      title: 'Nośniki',
      rows: [
        { k: 'Rodzaje', v: 'paragony termiczne, etykiety' },
        { k: 'Szerokość papieru', v: '50–112 mm' },
        { k: 'Grubość', v: '0,06–0,16 mm' },
        { k: 'Średnica rolki', v: 'do Ø 57,5 mm' },
        { k: 'Rdzeń', v: '12,5 mm' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Standard', v: 'USB, znacznik NFC' },
        { k: 'Wi-Fi', v: '802.11 a/b/g/n/ac' },
        { k: 'Bluetooth', v: '4.2 + BLE' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.bluetooth,
      title: 'Trzy drogi łączności z rejestratorem',
      body:
        'Wi-Fi w standardzie ac, Bluetooth 4.2 i znacznik NFC do parowania — drukarka dopasuje się do sposobu pracy przyjętego w jednostce.',
    },
    {
      icon: ICON.szybkosc,
      title: 'Sto dwadzieścia siedem milimetrów na sekundę',
      body:
        'Najwyższa prędkość druku wśród drukarek Sewoo w katalogu — kwit wychodzi natychmiast po zatwierdzeniu.',
    },
    {
      icon: ICON.nfc,
      title: 'Parowanie zbliżeniowe',
      body:
        'Znacznik NFC skraca łączenie z rejestratorem do przyłożenia urządzenia, bez wpisywania kodów.',
    },
    {
      icon: ICON.rolka,
      title: 'Szeroki zakres nośników',
      body:
        'Papier od 50 do 112 mm szerokości pozwala używać tej samej drukarki do kwitów i etykiet.',
    },
  ],
  usedBy: { device: 'Sewoo LKP400' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.szybkosc,
      title: 'Najszybszy druk wśród drukarek Sewoo',
      body:
        'Sto dwadzieścia siedem milimetrów na sekundę przy rozdzielczości 203 dpi — kwit odbioru wychodzi natychmiast po zatwierdzeniu w rejestratorze.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Sewoo LK-P43',
      href: '/produkt/sewoo-lkp43',
      note: 'Tańszy model tej samej rodziny',
    },
  ],
}

export default function SewooLKP400Page() {
  return <ProductPage data={data} />
}
