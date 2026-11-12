'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Galaxy A37 5G. Do 12.11.2026 karta opisywała Galaxy A36; ZUP Łódź sprzedaje od 23.09.2026
// następcę, więc karta przeszła na nowy model. Parametry: samsung.com/pl (tabela specyfikacji),
// Samsung Newsroom (25.03.2026), nazwa procesora za samsung.com/us.
const data: ProductData = {
  slug: 'samsung-a37',
  name: 'Samsung Galaxy A37',
  category: 'Telefony',
  categoryHref: '/kategoria/telefony',
  images: ['/a37_1.png'],
  inquiry: {
    description: 'Smartfon służbowy do biura i objazdu',
    specifications: 'Android 16 · 6,7″ FHD+ AMOLED 120 Hz · Exynos 1480 · 6/128 GB · 5000 mAh · IP68',
  },
  whyNavLabel: 'Dlaczego A37',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W pracy terenowej',
  highlights: [
    { icon: ICON.przekatna, label: 'Ekran', value: '6,7″ Super AMOLED, 120 Hz' },
    { icon: ICON.procesor, label: 'Procesor', value: 'Exynos 1480, 8 rdzeni' },
    { icon: ICON.czaspracy, label: 'Bateria', value: '5000 mAh, ładowanie 45 W' },
    { icon: ICON.woda, label: 'Odporność', value: 'IP68' },
  ],
  variants: [
    { id: 'pamiec', label: 'Pamięć', options: ['6 GB / 128 GB'] },
  ],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6,7″' },
        { k: 'Rozdzielczość', v: '1080 × 2340 Full HD+' },
        { k: 'Matryca', v: 'Super AMOLED' },
        { k: 'Odświeżanie', v: '120 Hz' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 16, One UI 8.5 w dniu premiery (04.2026)' },
        { k: 'Aktualizacje systemu', v: '6 generacji Androida' },
        { k: 'Aktualizacje zabezpieczeń', v: 'do 03.2032' },
        { k: 'Procesor', v: 'Exynos 1480, 8 rdzeni' },
        { k: 'Pamięć RAM', v: '6 GB' },
        { k: 'Pamięć wbudowana', v: '128 GB' },
      ],
    },
    {
      title: 'Aparaty',
      rows: [
        { k: 'Główny', v: '50 Mpx' },
        { k: 'Ultraszerokokątny', v: '8 Mpx' },
        { k: 'Makro', v: '5 Mpx' },
        { k: 'Przedni', v: '12 Mpx' },
      ],
    },
    {
      title: 'Odporność i zasilanie',
      rows: [
        { k: 'Klasa szczelności', v: 'IP68' },
        { k: 'Bateria', v: '5000 mAh' },
        { k: 'Czas pracy', v: 'odtwarzanie wideo do 29 godzin' },
        { k: 'Ładowanie', v: 'USB-C, do 45 W' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.czaspracy,
      title: 'Bateria na cały objazd',
      body:
        'Ogniwo 5000 mAh to według Samsunga do 29 godzin odtwarzania wideo, a ładowanie z mocą do 45 W uzupełnia zapas w czasie przerwy na kawę.',
    },
    {
      icon: ICON.woda,
      title: 'Deszcz mu nie szkodzi',
      body:
        'Klasa IP68 oznacza szczelność na pył i zanurzenie w słodkiej wodzie (według Samsunga do 1,5 m przez 30 minut) — telefon zniesie pracę w deszczu, choć nie ma wzmocnionej obudowy jak modele przemysłowe.',
    },
    {
      icon: ICON.przekatna,
      title: 'Duży ekran do dokumentów',
      body:
        'Panel 6,7″ Super AMOLED Full HD+ mieści formularz i mapę bez ciągłego przewijania, co ułatwia pracę z systemami w terenie.',
    },
    {
      icon: ICON.tarcza,
      title: 'Zarządzanie flotą telefonów',
      body:
        'Samsung Knox pozwala wpiąć urządzenie w politykę bezpieczeństwa jednostki i zarządzać nim zdalnie razem z resztą sprzętu.',
    },
  ],
  usedBy: { device: 'Samsung A37' },
  related: [
    {
      name: 'Samsung Galaxy A57',
      href: '/produkt/samsung-a57',
      note: 'Mocniejszy wariant: Exynos 1680 i 8 GB RAM',
    },
  ],
}

export default function SamsungA37Page() {
  return <ProductPage data={data} />
}
