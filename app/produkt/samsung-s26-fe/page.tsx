'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Galaxy S26 FE (SM-S741B), premiera 27.08.2026. Parametry: samsung.com/pl (specyfikacja wersji
// 8/256 GB), Samsung Newsroom Polska (27.08.2026). Sprzedaje go ZPUH Olsztyn (formularz z 6.11.2026,
// który podaje błędnie Androida 16 i Bluetooth 5.3). Karta dodana 12.11.2026.
const data: ProductData = {
  slug: 'samsung-s26-fe',
  name: 'Samsung Galaxy S26 FE',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/s26fe_1.png'],
  inquiry: {
    description: 'Flagowe funkcje w przystępniejszej cenie',
    specifications: 'Android 17 · 6,7″ FHD+ AMOLED 120 Hz · Exynos 2500 · 8/256 GB · 4900 mAh · IP68',
  },
  whyNavLabel: 'Dlaczego S26 FE',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,7″ FHD+ AMOLED, 120 Hz' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Exynos 2500' },
    { icon: ICON.aparat, label: 'Aparaty', value: '50 Mpx z OIS + 12 i 8 Mpx' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, Gorilla Glass Victus+' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['8 GB / 256 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,7″' },
        { k: 'Rozdzielczość', v: '1080 × 2340 FHD+' },
        { k: 'Matryca', v: 'Dynamic AMOLED 2X, do 1900 nitów' },
        { k: 'Odświeżanie', v: '120 Hz' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 17, One UI 9' },
        { k: 'Aktualizacje systemu', v: '7 generacji Androida' },
        { k: 'Aktualizacje zabezpieczeń', v: 'do 09.2033' },
        { k: 'Procesor', v: 'Exynos 2500, 10 rdzeni, do 3,3 GHz' },
        { k: 'Pamięć RAM', v: '8 GB' },
        { k: 'Pamięć wbudowana', v: '256 GB' },
      ],
    },
    {
      title: 'Aparaty',
      rows: [
        { k: 'Główny', v: '50 Mpx z OIS' },
        { k: 'Ultraszerokokątny', v: '12 Mpx' },
        { k: 'Teleobiektyw', v: '8 Mpx z OIS, zoom optyczny 3×' },
        { k: 'Przedni', v: '12 Mpx' },
      ],
    },
    {
      title: 'Odporność i zasilanie',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Szkło', v: 'Gorilla Glass Victus+ z przodu i z tyłu' },
        { k: 'Bateria', v: '4900 mAh' },
        { k: 'Czas pracy', v: 'odtwarzanie wideo do 29 godzin' },
        { k: 'Ładowanie', v: 'USB-C 45 W, bezprzewodowo 15 W' },
        { k: 'Łączność', v: '5G, Wi-Fi 6E, Bluetooth 5.4, NFC, nano SIM i eSIM' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.aparat,
      title: 'Aparat 50 Mpx ze stabilizacją',
      body:
        'Główny obiektyw z OIS i stabilizowany teleobiektyw z zoomem optycznym 3× pozwalają udokumentować szkodę i detal z dystansu bez rozmycia przy pracy z ręki.',
    },
    {
      icon: ICON.plynnosc,
      title: 'Jasny ekran 120 Hz',
      body:
        'AMOLED 120 Hz o jasności do 1900 nitów pozostaje czytelny w słońcu przy przewijaniu map.',
    },
    {
      icon: ICON.szklo,
      title: 'IP68 i wzmocnione szkło',
      body:
        'Uszczelnienie klasy IP68 wraz z Gorilla Glass Victus+ z obu stron i aluminiową ramką znosi deszcz i codzienne obicia w kieszeni kurtki.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Zabezpieczenia do 2033 roku',
      body:
        'Samsung zapowiada siedem generacji Androida i aktualizacje zabezpieczeń do września 2033 — najdłużej spośród telefonów w katalogu.',
    },
  ],
  usedBy: { device: 'Samsung S26 FE' },
  related: [
    {
      name: 'Samsung Galaxy S25 FE',
      href: '/produkt/samsung-s25-fe',
      note: 'Poprzednik: Exynos 2400, zabezpieczenia do 09.2032',
    },
  ],
}

export default function SamsungS26FePage() {
  return <ProductPage data={data} />
}
