'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'sewoo-lkp43',
  name: 'Sewoo LK-P43',
  category: 'Drukarki do rejestratora',
  categoryHref: '/kategoria/drukarki-do-rejestratora',
  images: ['/lkp43_1.png'],
  inquiry: {
    description: 'Podstawowa mobilna drukarka termiczna 4-calowa',
    specifications: '203 dpi · 100 mm/s · szerokość druku 104 mm · Bluetooth',
  },
  whyNavLabel: 'Dlaczego LK-P43',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Przy odbiorze drewna',
  highlights: [
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: '100 mm/s, 203 dpi' },
    { icon: ICON.rolka, label: 'Rolka', value: 'do Ø 56 mm, szerokość 50–112 mm' },
    { icon: ICON.bluetooth, label: 'Łączność', value: 'Bluetooth' },
    { icon: ICON.waga, label: 'Waga', value: '0,52 kg z akumulatorem' },
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
        { k: 'Prędkość', v: '100 mm/s' },
        { k: 'Szerokość druku', v: '104 mm' },
        { k: 'Punkty na linię', v: '832' },
      ],
    },
    {
      title: 'Nośniki',
      rows: [
        { k: 'Rodzaj', v: 'papier termiczny w rolce' },
        { k: 'Szerokość papieru', v: '50–112 mm' },
        { k: 'Grubość', v: '0,06–0,16 mm' },
        { k: 'Średnica rolki', v: 'do Ø 56 mm' },
        { k: 'Rdzeń', v: '12,5 mm' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Transmisja', v: 'Bluetooth' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.bluetooth,
      title: 'Łączy się z rejestratorem po Bluetooth',
      body:
        'Drukarka pracuje w parze z rejestratorem leśniczego bez kabla i bez konfiguracji sieci — jedno parowanie wystarcza na cały sezon.',
    },
    {
      icon: ICON.szybkosc,
      title: 'Sto milimetrów na sekundę',
      body:
        'Prędkość wystarczająca do kwitów wywozowych — model dla leśnictw o umiarkowanym wywozie.',
    },
    {
      icon: ICON.rolka,
      title: 'Rolka do 112 mm szerokości',
      body:
        'Ten sam zakres nośników co w wyższym modelu, więc materiały eksploatacyjne pozostają wspólne.',
    },
  ],
  usedBy: { device: 'Sewoo LKP43' },
  signature: [
    {
      icon: ICON.szybkosc,
      title: 'Podstawowy model do kwitów odbioru',
      body:
        'Prosta konstrukcja z transmisją Bluetooth — wybór tam, gdzie drukarka ma wystawiać kwity wywozowe przy rejestratorze, bez rozbudowanej łączności sieciowej.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Sewoo LK-P400',
      href: '/produkt/sewoo-lkp400',
      note: 'Szybszy druk, Wi-Fi i NFC w standardzie',
    },
  ],
}

export default function SewooLKP43Page() {
  return <ProductPage data={data} />
}
