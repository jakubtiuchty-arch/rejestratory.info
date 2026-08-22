'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'seiko-mpa40',
  name: 'Seiko MP-A40',
  category: 'Drukarki do rejestratora',
  categoryHref: '/kategoria/drukarki-do-rejestratora',
  images: ['/mpa40_1.png'],
  inquiry: {
    description: 'Lekka drukarka mobilna o długiej żywotności mechanizmu',
    specifications: '203 dpi · do 105 mm/s · 760 g · IP54 · upadek 2 m · żywotność 50 km',
  },
  whyNavLabel: 'Dlaczego MP-A40',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Przy odbiorze drewna',
  highlights: [
    { icon: ICON.waga, label: 'Waga', value: 'około 760 g' },
    { icon: ICON.upadek, label: 'Odporność', value: 'IP54, upadki z 2 m' },
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: 'do 105 mm/s' },
    { icon: ICON.wsparcie5, label: 'Żywotność', value: 'mechanizm na 50 km wydruku' },
  ],
  specGroups: [
    {
      title: 'Obudowa',
      rows: [
        { k: 'Wymiary', v: '156 × 152 × 71 mm' },
        { k: 'Waga', v: 'około 760 g' },
        { k: 'Szczelność', v: 'IP54' },
        { k: 'Upadki', v: 'z 2 m, wielokrotnie' },
        { k: 'Certyfikaty', v: 'FCC, CE, VCCI' },
      ],
    },
    {
      title: 'Drukowanie',
      rows: [
        { k: 'Metoda', v: 'termiczna liniowa' },
        { k: 'Prędkość', v: 'do 105 mm/s' },
        { k: 'Rozdzielczość', v: '203 dpi' },
        { k: 'Szerokość druku', v: '104 mm' },
        { k: 'Punkty na linię', v: '832' },
        { k: 'Żywotność', v: '50 km wydruku' },
      ],
    },
    {
      title: 'Nośniki',
      rows: [
        { k: 'Rodzaje', v: 'papier w rolce, etykiety w rolce' },
        { k: 'Szerokość', v: '80 / 100 / 105 / 112 mm' },
        { k: 'Średnica rolki', v: 'do Ø 58 mm' },
        { k: 'Odcinanie', v: 'listwa tear bar' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Zasilanie', v: 'bateria Li-Ion, zasilacz opcjonalnie' },
        { k: 'Interfejsy', v: 'USB, Bluetooth' },
        { k: 'Polecenia', v: 'ESC/POS, CPCL, Markup Language' },
        { k: 'Platformy', v: 'Windows CE, Android, iOS' },
        { k: 'Temperatura pracy', v: 'od -20 °C do +50 °C' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.waga,
      title: 'Siedemset sześćdziesiąt gramów',
      body:
        'Jedna z lżejszych drukarek 4-calowych w katalogu — różnicę czuć po całym dniu z urządzeniem u pasa.',
    },
    {
      icon: ICON.wsparcie5,
      title: 'Mechanizm przewidziany na 50 kilometrów',
      body:
        'Producent podaje żywotność serwisową w metrach wydruku, co ułatwia oszacowanie okresu eksploatacji przy znanej liczbie kwitów.',
    },
    {
      icon: ICON.rolka,
      title: 'Cztery szerokości nośnika',
      body:
        'Papier 80, 100, 105 lub 112 mm pozwala dopasować rolkę do formularza używanego w jednostce.',
    },
    {
      icon: ICON.upadek,
      title: 'IP54 i upadki z dwóch metrów',
      body:
        'Uszczelnienie i wzmocniona obudowa odpowiadają warunkom pracy przy odbiórce, także w deszczu.',
    },
  ],
  usedBy: { device: 'Seiko MPA40' },
  whereToBuy: [{ name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/rejestratory' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.wsparcie5,
      title: 'Żywotność mechanizmu 50 kilometrów',
      body:
        'Producent określa trwałość głowicy w metrach wydruku — przy znanej liczbie kwitów dziennie łatwo policzyć, na ile lat wystarczy urządzenie.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Bixolon SPP-R410',
      href: '/produkt/bixolon-sppr410',
      note: 'Jeszcze lżejsza konstrukcja, 530 g',
    },
  ],
}

export default function SeikoMPA40Page() {
  return <ProductPage data={data} />
}
