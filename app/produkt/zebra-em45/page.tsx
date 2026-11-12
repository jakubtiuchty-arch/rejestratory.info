'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Parametry sprawdzone 12.11.2026 według Zebry: spec sheet EM45 (05.2025), strona produktu,
// lista wersji Androida, przewodnik akcesoriów EM45 (07.2026). Dokument ZUP Łódź podaje
// błędnie 4900 mAh i „upgrade do v.18”.
const data: ProductData = {
  slug: 'zebra-em45',
  name: 'Zebra EM45',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/em45_1.webp', '/em45_2.webp', '/em45_3.webp', '/em45_4.webp'],
  inquiry: {
    description: 'Terminal terenowy w obudowie smartfona',
    specifications: 'IP68 · 6,7″ FHD+ 120 Hz · 5G · Android 14/15, do 16 · 4750 mAh · do 25 h pracy',
  },
  highlights: [
    { icon: ICON.woda, label: 'Odporność', value: 'IP68, upadek z 1,2 m (1,5 m w etui)' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '4750 mAh, do 25 h pracy' },
    { icon: ICON.przekatna, label: 'Ekran', value: '6,7″ FHD+, 120 Hz, 450 nitów' },
    { icon: ICON.wsparcie, label: 'System', value: 'Android 14 lub 15, aktualizacja do 16' },
  ],
  variants: [
    { id: 'kontrakt', label: 'Kontrakt serwisowy', options: ['3 lata', 'bez kontraktu'] },
  ],
  related: [
    {
      name: 'Zebra TC58e',
      href: '/produkt/zebra-tc58e',
      note: 'Terminal z wbudowanym skanerem 2D, gdy liczy się tempo skanowania',
    },
  ],
  whyNavLabel: 'Dlaczego EM45',
  whyHeading: 'Dlaczego nie zwykły telefon',
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,7″' },
        { k: 'Rozdzielczość', v: '2400 × 1080 FHD+, 120 Hz' },
        { k: 'Jasność', v: '450 nitów' },
        { k: 'Obsługa', v: 'gołym palcem lub w cienkich rękawicach, ekran ignoruje krople wody' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 14 lub 15, ostatnia wspierana wersja 16' },
        { k: 'Procesor', v: 'Qualcomm 5430, 8 rdzeni, 2,2 GHz' },
        { k: 'Pamięć RAM', v: '8 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB, karta microSD do 2 TB' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68 i IP65' },
        { k: 'Upadki', v: 'z 1,2 m na beton, z 1,5 m w etui ochronnym' },
        { k: 'Temperatura pracy', v: 'od 0 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie i łączność',
      rows: [
        { k: 'Bateria', v: '4750 mAh (18,43 Wh), wymiana w serwisie' },
        { k: 'Czas pracy', v: 'do 25 godzin (szacunek Zebry)' },
        { k: 'Ładowanie', v: 'USB-C 3.1, od 0 do 50% w 30 minut' },
        { k: 'Sieć', v: '5G i LTE, Wi-Fi 6E, Bluetooth 5.3, NFC' },
        { k: 'SIM', v: 'nano SIM i eSIM' },
      ],
    },
    {
      title: 'Stacja dokująca (wyposażenie dodatkowe)',
      rows: [
        { k: 'Model', v: 'Zebra Workstation Connect Cradle, CRD-EM4X-1SNWS-01' },
        { k: 'Obraz', v: 'HDMI do monitora zewnętrznego' },
        { k: 'Sieć', v: 'gniazdo Ethernet — połączenie przewodowe z siecią jednostki' },
        { k: 'Peryferia', v: '4 × USB-A: klawiatura, mysz i inne urządzenia USB' },
        { k: 'Audio', v: 'gniazdo 3,5 mm' },
        { k: 'Zasilanie', v: 'w ofercie ZUP Łódź zasilacz z przewodem i wkładki pod etui są w zestawie' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.woda,
      title: 'Deszcz i błoto nie kończą dnia',
      body:
        'Obudowa w klasach IP68 i IP65 znosi ulewę, zachlapanie i strumień wody. ' +
        'Według Zebry telefon wytrzymuje wielokrotne upadki z 1,2 m na beton, a w etui ochronnym z 1,5 m.',
    },
    {
      icon: ICON.czaspracy,
      title: 'Jedna bateria na całą zmianę',
      body:
        'Akumulator 4750 mAh według Zebry wystarcza do 25 godzin typowej pracy, a szybkie ładowanie ' +
        'uzupełnia połowę zapasu w pół godziny — bez powerbanku i szukania gniazdka w połowie objazdu.',
    },
    {
      icon: ICON.jasnosc,
      title: 'Duży ekran do map i formularzy',
      body:
        'Panel 6,7″ FHD+ 120 Hz o jasności 450 nitów mieści mapę i formularz bez ciągłego przewijania, ' +
        'a dotyk działa w cienkich rękawicach i nie reaguje na krople deszczu.',
    },
    {
      icon: ICON.wsparcie,
      title: 'Sprzęt pod aplikacje terenowe',
      body:
        'Android 14 lub 15 z aktualizacją do 16, przewidywalna dostępność modelu ' +
        'i trzyletni kontrakt serwisowy producenta — zamiast wymiany telefonu co dwa sezony.',
    },
  ],
  signature: [
    {
      icon: ICON.dok,
      title: 'Stacja dokująca zamienia telefon w stanowisko biurowe',
      body:
        'Zebra Workstation Connect Cradle udostępnia wyjście HDMI, gniazdo Ethernet oraz cztery porty USB-A. ' +
        'Po umieszczeniu telefonu w stacji obraz trafia na monitor, a obsługa odbywa się ' +
        'klawiaturą i myszą — na danych zebranych w terenie, bez przenoszenia ich na inny ' +
        'komputer. Jedno urządzenie obsługuje zatem pracę terenową i stanowisko w biurze. ' +
        'W ofercie ZUP Łódź zasilacz z przewodem jest w zestawie ze stacją.',
      tone: 'akcent',
      video: '/stacja-dokujaca-em45.mp4',
      image: '/stacja-dokujaca-em45-poster.jpg',
      imageAlt:
        'Zebra EM45 w stacji dokującej — animacja pokazuje, jak po podłączeniu ' +
        'monitora, klawiatury i myszy telefon staje się stanowiskiem biurowym',
    },
  ],
  usedBy: { device: 'Zebra EM45' },
  serviceContract: '3 lata',
}

export default function ZebraEM45Page() {
  return <ProductPage data={data} />
}
