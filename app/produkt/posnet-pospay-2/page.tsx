'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const WDROZENIE_DOKUMENTY = {
  heading: 'Dokumenty do fiskalizacji',
  intro:
    'Po otrzymaniu zamówienia odsyłamy szczegółową listę dokumentów potrzebnych do zgłoszenia urządzenia do eService oraz do Urzędu Skarbowego. Poniżej to, co warto przygotować wcześniej.',
  items: [
    'Dane nadleśnictwa — NIP, REGON, pełna nazwa',
    'Adres miejsca instalacji urządzenia',
    'Nazwy i adresy leśnictw',
    'Skan paragonu dotychczasowych urządzeń fiskalnych, jeśli takie są w użyciu',
    'Numer telefonu kontaktowego',
  ],
  footer:
    'Wypełnienie dokumentów i zgłoszenie do eService prowadzimy razem z Państwem — nie zostawiamy nadleśnictwa z formularzami samego.',
}

const data: ProductData = {
  slug: 'posnet-pospay-2',
  name: 'Posnet Pospay 2',
  category: 'Urządzenia fiskalne',
  categoryHref: '/kategoria/urzadzenia-fiskalne',
  images: ['/pospay_1.png', '/pospay_2.png', '/pospay_3.png', '/pospay_4.png'],
  inquiry: {
    description: 'Kasa fiskalna online z drukarką i terminalem płatniczym',
    specifications:
      'Ekran 4,5″ · terminal płatniczy (karta, BLIK) · akumulator 6800 mAh · GSM i Wi-Fi · zgodny z Leśnik+',
  },
  whyNavLabel: 'Dlaczego Pospay 2',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'Sprzedaż drewna i usług',
  highlights: [
    { icon: ICON.karta, label: 'Płatności', value: 'karta i BLIK w urządzeniu' },
    { icon: ICON.przekatna, label: 'Ekran operatora', value: '4,5″, 1280 × 720' },
    { icon: ICON.bateria, label: 'Akumulator', value: '6800 mAh (drukarka)' },
    { icon: ICON.chmura, label: 'Komunikacja z CRK', value: 'modem GSM i Wi-Fi' },
  ],
  specGroups: [
    {
      title: 'Urządzenie',
      rows: [
        { k: 'Wersja', v: 'ONLINE' },
        { k: 'Pamięć chroniona', v: 'karta micro SDHC 4 GB' },
        { k: 'Komunikacja z CRK', v: 'modem GSM, Wi-Fi' },
        { k: 'Wymiary', v: '15,2 × 8 × 8,1 cm' },
        { k: 'Waga', v: '~0,6 kg z papierem' },
      ],
    },
    {
      title: 'Mechanizm drukujący',
      rows: [
        { k: 'Typ mechanizmu', v: 'termiczny „drop in”' },
        { k: 'Znaków w wierszu', v: 'do 40' },
        { k: 'Szerokość papieru', v: '57 mm' },
        { k: 'Długość rolki', v: '14 m' },
      ],
    },
    {
      title: 'Wyświetlacze',
      rows: [
        { k: 'Operatora', v: '4,5″, 1280 × 720 pikseli' },
        { k: 'Klienta', v: 'LCD 2 × 16 znaków' },
      ],
    },
    {
      title: 'Zasilanie',
      rows: [
        { k: 'Zasilacz', v: 'zewnętrzny, 5 V / 4 A' },
        { k: 'Akumulator drukarki', v: 'Li-ion 6800 mAh' },
        { k: 'Akumulator terminala', v: 'Li-ion 2500 mAh' },
      ],
    },
    {
      title: 'Bazy danych',
      rows: [
        { k: 'Stawki VAT', v: '7 (A…G)' },
        { k: 'Liczba PLU', v: '4000 w aplikacji kasowej, 100 000 w drukarkowej' },
        { k: 'Długość nazwy towaru', v: '80 znaków' },
        { k: 'Kasjerzy', v: '200' },
        { k: 'Formy płatności', v: '16' },
        { k: 'Grupy towarowe', v: '32' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.karta,
      title: 'Kasa, drukarka i terminal w jednej obudowie',
      body:
        'Leśniczy wystawia paragon, drukuje go i przyjmuje płatność kartą lub BLIK-iem na jednym urządzeniu — bez osobnej drukarki, osobnego terminala, drugiego zasilacza i drugiego zestawu kabli.',
    },
    {
      icon: ICON.integracja,
      title: 'Współpracuje z Leśnik+',
      body:
        'Urządzenie jest zgodne z systemem używanym w nadleśnictwach, więc sprzedaż z rejestratora trafia na paragon bez ręcznego przepisywania pozycji.',
    },
    {
      icon: ICON.chmura,
      title: 'Raportuje do CRK bez pilnowania',
      body:
        'Modem GSM i Wi-Fi same wysyłają dane o transakcjach do Centralnego Repozytorium Kas — obowiązek raportowy realizuje się w tle.',
    },
    {
      icon: ICON.paragon,
      title: 'Papier wrzuca się bez wprawy',
      body:
        'Mechanizm „drop in” przyjmuje rolkę 57 mm bez przewlekania — wymianę zrobi każdy, także w kancelarii leśnictwa w środku dnia sprzedaży.',
    },
  ],
  pricing: {
    heading: 'Cennik i prowizje',
    main: { k: 'Zakup urządzenia', v: '1 799 zł', unit: 'netto' },
    rows: [{ k: 'Abonament za terminal', v: '39 zł netto / mies.' }],
    commissions: [
      { label: 'VISA', value: '0,69 %' },
      { label: 'MasterCard', value: '0,79 %' },
      { label: 'BLIK', value: '0,39 %' },
    ],
    note: 'Abonament dotyczy wynajmu terminala płatniczego. Przeglądy ustawowe co 2 lata rozliczane osobno.',
  },
  timeline: {
    label: 'Od zamówienia do pierwszego paragonu',
    heading: 'Proces zakupu i wdrożenia',
    navLabel: 'Wdrożenie',
    lead:
      'Siedem kroków od złożenia zamówienia do przeglądów ustawowych — całość prowadzimy z nadleśnictwem.',
    documents: WDROZENIE_DOKUMENTY,
    steps: [
      { icon: ICON.zamowienie, title: 'Zamówienie', note: 'Posnet Pospay 2 w TAKMA' },
      { icon: ICON.formularz, title: 'Dokumenty', note: 'do fiskalizacji', documents: true },
      { icon: ICON.fiskalizacja, title: 'Fiskalizacja', note: 'i zgłoszenie do eService' },
      { icon: ICON.kurier, title: 'Dostawa', note: 'urządzenia do nadleśnictwa' },
      { icon: ICON.szkolenie, title: 'Szkolenie', note: 'leśniczych z obsługi' },
      { icon: ICON.integracja, title: 'Integracja', note: 'z rejestratorami' },
      { icon: ICON.kalendarz, title: 'Przeglądy', note: 'ustawowe co 2 lata' },
    ],
  },
  whereToBuy: [{ name: 'TAKMA' }],
  // w module przeglądów model zapisywany jest bez „2” — to ten sam sprzęt
  usedBy: { device: 'Posnet Pospay' },
  related: [
    {
      name: 'Posnet Temo Online',
      href: '/produkt/posnet-temo-online',
      note: 'Sama drukarka fiskalna, bez terminala — 315 g',
    },
  ],
}

export default function PosnetPospay2Page() {
  return <ProductPage data={data} />
}
