'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'ms-365',
  name: 'Microsoft 365 Business Standard',
  category: 'Akcesoria komputerowe',
  categoryHref: '/kategoria/akcesoria-komputerowe',
  images: ['/ms365_1.png'],
  inquiry: {
    description: 'Roczna licencja na pakiet biurowy z pocztą i chmurą',
    specifications: 'Licencja roczna dla 1 użytkownika · aplikacje Office · 1 TB OneDrive · skrzynka 50 GB · Teams',
  },
  whyNavLabel: 'Dlaczego Microsoft 365',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W biurze nadleśnictwa',
  highlights: [
    { icon: ICON.klucz, label: 'Licencja', value: 'roczna, 1 użytkownik' },
    { icon: ICON.aplikacje, label: 'Aplikacje', value: 'Word, Excel, PowerPoint, Outlook' },
    { icon: ICON.chmura, label: 'OneDrive', value: '1 TB na użytkownika' },
    { icon: ICON.koperta, label: 'Poczta', value: 'skrzynka 50 GB z własną domeną' },
  ],
  specGroups: [
    {
      title: 'Licencja',
      rows: [
        { k: 'Rodzaj', v: 'subskrypcja roczna' },
        { k: 'Zakres', v: '1 użytkownik' },
        { k: 'Instalacje', v: '5 komputerów, 5 tabletów i 5 telefonów na użytkownika' },
        { k: 'Wsparcie', v: 'telefoniczne i internetowe Microsoftu, całodobowo' },
      ],
    },
    {
      title: 'Aplikacje',
      rows: [
        { k: 'Pakiet biurowy', v: 'Word, Excel, PowerPoint, Outlook, OneNote' },
        { k: 'Wersje', v: 'komputerowa, przeglądarkowa i mobilna' },
        { k: 'Dodatkowo', v: 'Teams, SharePoint, Bookings, Planner, Forms, Clipchamp, Loop' },
      ],
    },
    {
      title: 'Poczta i chmura',
      rows: [
        { k: 'Skrzynka pocztowa', v: 'Exchange Online, 50 GB' },
        { k: 'Własna domena', v: 'tak' },
        { k: 'OneDrive', v: '1 TB na użytkownika' },
        { k: 'Witryny zespołu', v: 'SharePoint' },
      ],
    },
    {
      title: 'Bezpieczeństwo',
      rows: [
        { k: 'Szyfrowanie danych', v: 'tak' },
        { k: 'Uwierzytelnianie wieloskładnikowe', v: 'tak' },
        { k: 'Zarządzanie urządzeniami', v: 'podstawowe' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.koperta,
      title: 'Poczta pod adresem nadleśnictwa',
      body:
        'Skrzynka 50 GB w Exchange Online działa na własnej domenie, więc korespondencja wychodzi spod służbowego adresu, a nie z konta prywatnego.',
    },
    {
      icon: ICON.chmura,
      title: 'Terabajt na dokumentację',
      body:
        'OneDrive trzyma pliki poza dyskiem komputera — awaria laptopa w terenie przestaje oznaczać utratę pracy.',
    },
    {
      icon: ICON.aplikacje,
      title: 'Pakiet na komputerze i w przeglądarce',
      body:
        'Word, Excel i Outlook w wersji instalowanej oraz przez przeglądarkę — dokument otwiera się także na komputerze zastępczym.',
    },
    {
      icon: ICON.klucz,
      title: 'Pięć komputerów na jedną licencję',
      body:
        'Jeden użytkownik instaluje pakiet na pięciu komputerach, pięciu tabletach i pięciu telefonach — bez dokupowania licencji na sprzęt zapasowy.',
    },
  ],
  whereToBuy: [
    { name: 'ZUP Łódź', href: 'https://zup.lodz.lasy.gov.pl/akcesoria-komputerowe' },
    { name: 'TAKMA' },
  ],
  hideService: true,
  related: [
    {
      name: 'Samsung SSD T9 1 TB',
      href: '/produkt/samsung-ssd-t9',
      note: 'Kopia zapasowa poza chmurą',
    },
  ],
}

export default function MS365Page() {
  return <ProductPage data={data} />
}
