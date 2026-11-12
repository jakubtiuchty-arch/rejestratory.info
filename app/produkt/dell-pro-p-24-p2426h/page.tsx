'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Dell Pro P 24 Monitor – P2426H (sprzedaż od 03.2026). Do 12.11.2026 karta opisywała P2425H;
// ZUP Łódź sprzedaje od 23.09.2026 następcę, więc karta przeszła na nowy model.
// Parametry: dell.com/en-ie (SKU 210-BVKM), polska instrukcja Della (03.2026, Rev. A00), EPREL.
const data: ProductData = {
  slug: 'dell-pro-p-24-p2426h',
  name: 'Dell Pro P 24 P2426H',
  category: 'Monitory',
  categoryHref: '/kategoria/monitory',
  images: ['/P2426H_1.png'],
  inquiry: {
    description: 'Monitor 23,8 cala do codziennej pracy biurowej',
    specifications: '23,8″ Full HD 120 Hz · IPS · 99% sRGB · pivot · 3 lata Premium Panel',
  },
  whyNavLabel: 'Dlaczego P2426H',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Na biurku w nadleśnictwie',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '23,8″ Full HD, 120 Hz' },
    { icon: ICON.oko, label: 'Komfort', value: 'TÜV Eye Comfort 4 gwiazdki' },
    { icon: ICON.ergonomia, label: 'Ergonomia', value: 'regulacja 150 mm, pivot' },
    { icon: ICON.wsparcie, label: 'Gwarancja', value: '3 lata Premium Panel' },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '23,8″' },
        { k: 'Rozdzielczość', v: 'Full HD 1920 × 1080' },
        { k: 'Odświeżanie', v: '120 Hz' },
        { k: 'Matryca', v: 'IPS, kąty 178°/178°' },
        { k: 'Jasność', v: '300 cd/m², kontrast 1500:1' },
        { k: 'Czas reakcji', v: '5 ms GtG w trybie szybkim, 8 ms GtG' },
        { k: 'Gamut', v: '99% sRGB, 99% BT.709' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Wideo', v: 'HDMI 1.4 (do 1920 × 1080 przy 120 Hz), DisplayPort 1.4' },
        { k: 'USB-C', v: '2 × downstream 5 Gb/s na dolnej krawędzi, tylko dane, zasilanie do 15 W' },
        { k: 'USB-A', v: '2 × downstream 5 Gb/s' },
        { k: 'USB-B', v: '1 × upstream 5 Gb/s' },
      ],
    },
    {
      title: 'Komfort pracy',
      rows: [
        { k: 'Oprogramowanie', v: 'Dell Display and Peripheral Manager z Easy Arrange' },
        { k: 'TÜV Eye Comfort', v: '4 gwiazdki, ComfortView Plus' },
        { k: 'Brak migotania', v: 'tak' },
        { k: 'Gwarancja', v: '3 lata z wymianą z wyprzedzeniem i Premium Panel' },
      ],
    },
    {
      title: 'Ergonomia',
      rows: [
        { k: 'Regulacja wysokości', v: 'do 150 mm' },
        { k: 'Przechylanie', v: '-5° / +21°' },
        { k: 'Obrót poziomy', v: '±45°' },
        { k: 'Pivot', v: '±90°' },
        { k: 'VESA', v: '100 × 100 mm' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.oko,
      title: 'Certyfikat komfortu pracy',
      body:
        'TÜV Eye Comfort na cztery gwiazdki i brak migotania — przy ośmiu godzinach nad dokumentacją wzrok męczy się wolniej.',
    },
    {
      icon: ICON.ergonomia,
      title: 'Ustawienie pod stanowisko',
      body:
        'Regulacja wysokości o 150 mm, obrót w obu osiach i pivot do pionu, wygodny przy długich zestawieniach.',
    },
    {
      icon: ICON.rozdzielczosc,
      title: 'Matryca IPS z 99% sRGB',
      body:
        'Kąty widzenia 178° i 99% palety sRGB dają czytelny obraz także wtedy, gdy nad ekranem pochyla się dwoje ludzi.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Trzy lata gwarancji Premium Panel',
      body:
        'Dell wymienia panel w okresie gwarancji nawet przy jednym jasnym pikselu, a po zdalnej diagnozie wysyła monitor zastępczy przed odesłaniem uszkodzonego.',
    },
  ],
  usedBy: { device: 'Dell P2426H', exclude: 'P2426HE' },
  signature: [
    {
      icon: ICON.przekatna,
      title: 'Podstawowy monitor do biura',
      body:
        'Do codziennej pracy biurowej w administracji: matryca IPS 120 Hz, pełna regulacja z pivotem, dwa porty USB-C na dolnej krawędzi i trzyletnia gwarancja Premium Panel.',
      tone: 'akcent',
    },
  ],
  related: [
    {
      name: 'Dell Pro P 24 P2426HE z USB-C',
      href: '/produkt/dell-pro-p-24-p2426he',
      note: 'Ekran o tych samych parametrach, z hubem USB-C do 96 W i RJ45',
    },
  ],
}

export default function DellP2426HPage() {
  return <ProductPage data={data} />
}
