'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// UWAGA: wartości oznaczone // ? są sprzeczne między app/produkt/zebra-em45/page.tsx
// a lib/products-data.ts — do potwierdzenia przed publikacją.
const data: ProductData = {
  slug: 'zebra-em45',
  name: 'Zebra EM45',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/em45_1.webp', '/em45_2.webp', '/em45_3.webp', '/em45_4.webp'],
  inquiry: {
    description: 'Terminal terenowy w obudowie smartfona',
    specifications: 'IP68 · 6,5″ FHD+ · Android 14 · 4700 mAh · 14 h pracy',
  },
  highlights: [
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, upadek z 1,5 m' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4700 mAh, do 14 h pracy' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6,5″ FHD+, 450 nitów' },
    { icon: ICON.wsparcie, label: 'System', value: 'Android 14 z aktualizacjami' },
  ],
  variants: [
    { id: 'kontrakt', label: 'Kontrakt serwisowy', options: ['3 lata', '5 lat', 'bez kontraktu'] },
  ],
  related: [
    {
      name: 'Zebra TC58e',
      href: '/produkt/zebra-tc58e',
      note: 'Terminal ze skanerem laserowym, gdy liczy się tempo skanowania',
    },
  ],
  whyNavLabel: 'Dlaczego EM45',
  whyHeading: 'Dlaczego nie zwykły telefon',
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,5″' }, // ? stara karta: 6,7"
        { k: 'Rozdzielczość', v: '2400 × 1080 FHD+' },
        { k: 'Jasność', v: '450 nitów' },
        { k: 'Obsługa', v: 'w rękawicach i po mokrym ekranie' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 14' }, // ? stara karta: Android 11
        { k: 'Procesor', v: 'Qualcomm Octa-core, 2,2 GHz' },
        { k: 'Pamięć RAM', v: '8 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Upadki', v: 'z 1,5 m' }, // ? stara karta w innym miejscu: 2,4 m
        { k: 'Temperatura pracy', v: 'od 0 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Bateria', v: '4700 mAh' },
        { k: 'Czas pracy', v: 'do 14 godzin' },
        { k: 'Ładowanie', v: 'USB-C' },
        { k: 'Sieć', v: 'LTE, Wi-Fi 6, Bluetooth 5.0' }, // ? do potwierdzenia 5G
      ],
    },
    {
      title: 'Stacja dokująca (wyposażenie dodatkowe)',
      rows: [
        { k: 'Model', v: 'Zebra Connect Cradle, CRD-EM4X-1SNWS-01' },
        { k: 'Obraz', v: 'HDMI do monitora zewnętrznego' },
        { k: 'Sieć', v: 'gniazdo Ethernet — połączenie przewodowe z siecią jednostki' },
        { k: 'Peryferia', v: '4 × USB-A: klawiatura, mysz, drukarka' },
        { k: 'Audio', v: 'gniazdo 3,5 mm' },
        { k: 'Zasilanie', v: 'zasilacz i przewody zamawiane oddzielnie' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.woda,
      title: 'Deszcz i błoto nie kończą dnia',
      body:
        'Uszczelniona obudowa klasy IP68 znosi ulewę, zachlapanie i mycie pod bieżącą wodą. ' +
        'Upadek na leśną drogę z wysokości 1,5 m nie jest zdarzeniem serwisowym.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Jedna bateria na całą zmianę',
      body:
        '4700 mAh wystarcza na 14 godzin pracy z GPS i transmisją danych — bez powerbanku ' +
        'i bez szukania gniazdka w połowie objazdu.',
    },
    {
      icon: ICON.jasnosc,
      title: 'Ekran czytelny w słońcu i w rękawicach',
      body:
        '6,5-calowy panel FHD+ o jasności 450 nitów pozostaje czytelny na otwartej powierzchni, ' +
        'a dotyk działa w rękawicach roboczych i po zmoczeniu szyby.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Sprzęt pod aplikacje terenowe',
      body:
        'Android 14 z aktualizacjami bezpieczeństwa, przewidywalna dostępność modelu ' +
        'i kontrakt serwisowy na 3 lub 5 lat — zamiast wymiany telefonu co dwa sezony.',
    },
  ],
  signature: [
    {
      icon: ICON.dok,
      title: 'Stacja dokująca zamienia telefon w stanowisko biurowe',
      body:
        'Zebra Connect Cradle udostępnia wyjście HDMI, gniazdo Ethernet oraz cztery porty USB-A. ' +
        'Po umieszczeniu telefonu w stacji obraz trafia na monitor, a obsługa odbywa się ' +
        'klawiaturą i myszą — na danych zebranych w terenie, bez przenoszenia ich na inny ' +
        'komputer. Jedno urządzenie obsługuje zatem pracę terenową i stanowisko w biurze. ' +
        'Zasilacz oraz przewody zamawiane są oddzielnie.',
      tone: 'akcent',
      video: '/stacja-dokujaca-em45.mp4',
      image: '/stacja-dokujaca-em45-poster.jpg',
      imageAlt:
        'Zebra EM45 w stacji dokującej — animacja pokazuje, jak po podłączeniu ' +
        'monitora, klawiatury i myszy telefon staje się stanowiskiem biurowym',
    },
  ],
  usedBy: { device: 'Zebra EM45' },
  serviceContract: '3 lub 5 lat',
}

export default function ZebraEM45Page() {
  return <ProductPage data={data} />
}
