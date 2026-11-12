'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Do 12.11.2026 karta była kopią karty TC27. Parametry według Zebry: spec sheet TC53e/TC58e
// (08.2026), strona produktu TC58e, zebra.com/android-versions, przewodnik akcesoriów (12.2025).
const data: ProductData = {
  slug: 'zebra-tc58e',
  name: 'Zebra TC58e',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/tc58_1.png'],
  inquiry: {
    description: 'Terminal mobilny 5G ze skanerem do pracy w terenie',
    specifications: 'Android do 18 · 5G · 6″ FHD+ · 6/64–8/128 GB · 4680 mAh · IP68 · upadek z 1,8 m',
  },
  whyNavLabel: 'Dlaczego TC58e',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, upadek z 1,8 m' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4680 mAh, do 15 h' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6″ FHD+' },
    { icon: ICON.mroz, label: 'Temperatura', value: 'od −20 °C do +50 °C' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 64 GB', '8 GB / 64 GB', '8 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6″' },
        { k: 'Rozdzielczość', v: '2160 × 1080 Full HD+, 600 nitów' },
        { k: 'Szkło', v: 'Corning Gorilla Glass' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 13 w dniu premiery, aktualizacje do Androida 18' },
        { k: 'Procesor', v: 'Qualcomm 4490, 8 rdzeni, do 2,4 GHz' },
        { k: 'Pamięć RAM', v: '6 GB lub 8 GB' },
        { k: 'Pamięć wbudowana', v: '64 GB lub 128 GB, karta microSD do 2 TB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68 i IP65' },
        { k: 'Upadki', v: 'z 1,8 m na płytki na betonie, z 2,4 m w etui' },
        { k: 'Test przewrotów', v: '1000 × z 0,5 m' },
        { k: 'Temperatura pracy', v: 'od −20 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Bateria', v: '4680 mAh, wymiana bez wyłączania (warm swap); opcjonalnie 7000 mAh' },
        { k: 'Czas pracy', v: 'do 15 godzin (bateria standardowa)' },
        { k: 'Ładowanie', v: 'USB-C 3.1, szybkie ładowanie' },
        { k: 'Sieć', v: '5G i LTE, Wi-Fi 6E, Bluetooth 5.3, NFC' },
        { k: 'Skaner', v: 'SE4720, SE4770 lub SE55, kody 1D i 2D' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.skaner,
      title: 'Skaner do intensywnego odczytu',
      body:
        'Wbudowany skaner (SE4720, SE4770 albo SE55) czyta kody 1D i 2D z płytek i dokumentów, SE4770 także w pełnym słońcu — przy inwentaryzacji i odbiorze drewna nie trzeba celować aparatem.',
    },
    {
      icon: ICON.woda,
      title: 'Uszczelniony na deszcz i pył',
      body:
        'Klasy IP68 i IP65 znoszą ulewę i strumień wody, a obudowa według Zebry wytrzymuje upadek z 1,8 m bez etui i 1000 przewrotów z 0,5 m.',
    },
    {
      icon: ICON.ladowanie,
      title: 'Akumulator wymieniany bez wyłączania',
      body:
        'Akumulator 4680 mAh według Zebry wystarcza do 15 godzin, a wymiana w trybie warm swap nie wymaga wyłączania terminala. Na dłuższe zmiany jest wersja 7000 mAh.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Aktualizacje do Androida 18',
      body:
        'Zebra zapowiada aktualizacje od Androida 13 do 18 z poprawkami bezpieczeństwa LifeGuard. Naprawy po zużyciu i przypadkowych uszkodzeniach obejmuje kontrakt serwisowy producenta.',
    },
  ],
  usedBy: { device: 'Zebra TC58e' },
  related: [
    {
      name: 'Zebra EM45',
      href: '/produkt/zebra-em45',
      note: 'Zebra w obudowie smartfona, kody czyta aparatem',
    },
  ],
}

export default function ZebraTC58ePage() {
  return <ProductPage data={data} />
}
