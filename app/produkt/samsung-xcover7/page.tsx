'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Galaxy XCover7 Pro (SM-G766B). Do 12.11.2026 karta opisywała XCover6 Pro;
// ZUP Łódź sprzedaje od 23.09.2026 następcę, więc karta przeszła na XCover7 Pro.
// Parametry: samsung.com/pl, Samsung Business Polska, Samsung Newsroom Polska (14.04.2025).
const data: ProductData = {
  slug: 'samsung-xcover7',
  name: 'Samsung Galaxy XCover7 Pro',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/xcover7pro_1.png'],
  inquiry: {
    description: 'Wzmocniony smartfon z wymienną baterią',
    specifications: 'Android 15 · 6,6″ FHD+ LCD 120 Hz · Snapdragon 7s Gen 3 · 6/128 GB · 4350 mAh wymienna · IP68, MIL-STD-810H',
  },
  whyNavLabel: 'Dlaczego XCover7 Pro',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.norma, label: 'Odporność', value: 'IP68, MIL-STD-810H' },
    { icon: ICON.wymiana, label: 'Bateria', value: '4350 mAh, wymienna' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6,6″ FHD+ LCD, 120 Hz' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Snapdragon 7s Gen 3' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,6″' },
        { k: 'Rozdzielczość', v: '1080 × 2408 FHD+' },
        { k: 'Matryca', v: 'PLS LCD' },
        { k: 'Odświeżanie', v: '120 Hz' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 15 w dniu premiery, 04.2025' },
        { k: 'Aktualizacje systemu', v: 'do 7 wersji Androida (Samsung Business)' },
        { k: 'Aktualizacje zabezpieczeń', v: 'do 31.05.2032' },
        { k: 'Procesor', v: 'Snapdragon 7s Gen 3, 8 rdzeni' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB, karta microSD do 2 TB' },
      ],
    },
    {
      title: 'Odporność i obsługa',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Norma', v: 'MIL-STD-810H' },
        { k: 'Szkło', v: 'Gorilla Glass Victus+' },
        { k: 'Przyciski', v: '2 programowalne' },
        { k: 'Ekran dotykowy', v: 'obsługa mokrymi palcami i w rękawicach' },
        { k: 'Masa', v: '240 g' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Bateria', v: '4350 mAh, wymienna' },
        { k: 'Czas pracy', v: 'odtwarzanie wideo do 22 godzin' },
        { k: 'Ładowanie', v: 'USB-C 15 W oraz złącze POGO' },
        { k: 'Aparaty', v: '50 Mpx + 8 Mpx' },
        { k: 'Łączność', v: '5G, Wi-Fi 6E, Bluetooth 5.4, NFC, Samsung DeX' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.wymiana,
      title: 'Bateria do wymiany w terenie',
      body:
        'Ogniwo 4350 mAh wyjmuje się z obudowy, więc zapasowa bateria w plecaku zastępuje szukanie gniazdka i przedłuża pracę na drugą zmianę.',
    },
    {
      icon: ICON.norma,
      title: 'Norma wojskowa i IP68',
      body:
        'Obudowa przeszła testy MIL-STD-810H, a klasa IP68 oznacza szczelność na pył i wodę. Ekran chroni szkło Gorilla Glass Victus+.',
    },
    {
      icon: ICON.rekawica,
      title: 'Obsługa w rękawicach',
      body:
        'Ekran reaguje na dotyk mokrymi palcami i w cienkich rękawicach skórzanych, a dwa programowalne przyciski uruchamiają wybraną aplikację jednym naciśnięciem.',
    },
    {
      icon: ICON.dok,
      title: 'Ładowanie przez złącze POGO',
      body:
        'Poza USB-C telefon ładuje się stykami POGO w stacji dokującej — wygodne w samochodzie i na stanowisku w kancelarii.',
    },
  ],
  usedBy: { device: 'Samsung XCover7 Pro' },
  related: [
    {
      name: 'Zebra EM45',
      href: '/produkt/zebra-em45',
      note: 'Terminal leśniczego z kontraktem serwisowym',
    },
  ],
}

export default function SamsungXCover7ProPage() {
  return <ProductPage data={data} />
}
