'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Logitech Rally Board 65 (grafitowy, EU 960-001698). Parametry: strona produktu logitech.com
// (en-eu), datasheet Rally Board 65 (08/2025), FAQ i tabela certyfikacji w Logitech Sync Hub.
// ZUP Łódź kupuje go w umowie NH.271.51.2026 z 02.11.2026 (część 2, „Urządzenie wielofunkcyjne
// z ekranem dotykowym w formacie all-in-one”). Karta dodana 13.11.2026.
const data: ProductData = {
  slug: 'logitech-rally-board-65',
  name: 'Logitech Rally Board 65',
  category: 'Wideokonferencje',
  categoryHref: '/kategoria/wideokonferencje',
  images: ['/rallyboard65_1.png', '/rallyboard65_2.png'],
  inquiry: {
    description: 'Ekran dotykowy 65″ z kamerą, mikrofonami i głośnikami',
    specifications: '65″ 4K UHD, dotyk 20 punktów · kamera 4K 1″ · mikrofony 7 m · Teams, Zoom, Google Meet',
  },
  whyNavLabel: 'Dlaczego Rally Board 65',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W sali narad',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '65″ 4K UHD, dotyk 20 punktów' },
    { icon: ICON.kamera, label: 'Kamera', value: '4K, matryca 1″, 20 Mpx' },
    { icon: ICON.glosnik, label: 'Dźwięk', value: 'mikrofony 7 m, głośniki stereo' },
    { icon: ICON.rysik, label: 'Rysiki', value: '2 w zestawie' },
  ],
  specGroups: [
    {
      title: 'Ekran',
      rows: [
        { k: 'Przekątna', v: '65″, 3840 × 2160 (4K UHD)' },
        { k: 'Dotyk', v: '20 punktów jednocześnie, 2 rysiki w zestawie' },
        { k: 'Jasność i kontrast', v: '400 nitów, 5000:1' },
        { k: 'Powłoka', v: 'antyodblaskowa i przeciw odciskom palców' },
      ],
    },
    {
      title: 'Kamera i dźwięk',
      rows: [
        { k: 'Kamera', v: '4K, matryca 1″ (20 Mpx), pole widzenia 115,7°, zoom cyfrowy 4×' },
        { k: 'Prywatność', v: 'zmotoryzowana przesłona obiektywu' },
        { k: 'Mikrofony', v: 'z przodu i z tyłu, zasięg 7 m, redukcja szumów i pogłosu' },
        { k: 'Głośniki', v: '2 × 70 mm i 2 głośniki wysokotonowe 31 mm' },
        { k: 'Rozbudowa', v: 'do 2 paneli Rally Mic Pod 2' },
      ],
    },
    {
      title: 'Praca i złącza',
      rows: [
        { k: 'Platformy', v: 'Microsoft Teams Rooms, Zoom Rooms i Google Meet — certyfikowane (licencja platformy osobno)' },
        { k: 'Laptop gościa', v: 'tryb BYOD — laptopem steruje się dotykiem z ekranu' },
        { k: 'Obraz', v: 'HDMI in i HDMI out, oba 4K60' },
        { k: 'USB', v: '3 × USB-A 3.1, 1 × USB-C 3.1 z DisplayPort' },
        { k: 'Sieć', v: 'Ethernet 1 Gb/s, Wi-Fi 6, Bluetooth LE' },
        { k: 'Zarządzanie', v: 'Logitech Sync' },
      ],
    },
    {
      title: 'Montaż i zestaw',
      rows: [
        { k: 'Montaż', v: 'ściana (VESA 400 × 400), nóżki na stół lub szafkę, wózek osobno' },
        { k: 'Wymiary i waga', v: '1500 × 989 × 76 mm, 46 kg' },
        { k: 'W zestawie', v: 'nóżki, 2 rysiki, kabel zasilający, uchwyt VESA na komputer, osprzęt montażowy' },
        { k: 'Gwarancja', v: '2 lata, z możliwością przedłużenia do 5 lat' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.przekatna,
      title: 'Ekran, kamera i dźwięk w jednym',
      body:
        'Telewizor, kamera, mikrofony i głośniki to jedno urządzenie — wystarczy powiesić go ' +
        'na ścianie albo postawić na nóżkach, żeby sala była gotowa do narady.',
    },
    {
      icon: ICON.rysik,
      title: 'Notatki na ekranie',
      body:
        'Dotyk 20-punktowy i dwa rysiki pozwalają rysować po mapie czy planie w trakcie spotkania, ' +
        'tak jak na tablicy.',
    },
    {
      icon: ICON.chmura,
      title: 'Teams, Zoom albo Meet bez komputera',
      body:
        'Wbudowany system ma certyfikaty Microsoft Teams Rooms, Zoom Rooms i Google Meet, a laptop ' +
        'gościa podłącza się kablem i steruje nim dotykiem z ekranu.',
    },
    {
      icon: ICON.oko,
      title: 'Przesłona prywatności',
      body:
        'Obiektyw zasłania się automatycznie, gdy kamera nie pracuje — w sali, w której odbywają się ' +
        'też spotkania bez transmisji.',
    },
  ],
  related: [
    {
      name: 'Logitech Rally Bar',
      href: '/produkt/logitech-rally-bar',
      note: 'Wideobar pod własny telewizor',
    },
    {
      name: 'Logitech Rally Plus',
      href: '/produkt/logitech-rally-plus',
      note: 'System modułowy do dużych sal z projektorem',
    },
  ],
}

export default function LogitechRallyBoard65Page() {
  return <ProductPage data={data} />
}
