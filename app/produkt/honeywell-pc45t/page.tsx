'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

const data: ProductData = {
  slug: 'honeywell-pc45t',
  name: 'Honeywell PC45t',
  category: 'Elektroniczne Zarządzanie Dokumentacją',
  categoryHref: '/kategoria/ezd',
  images: ['/pc45t_1.png'],
  inquiry: {
    description: 'Drukarka etykiet z kolorowym ekranem',
    specifications: '203 dpi · do 8 ips · Ethernet i Wi-Fi 6 · ekran 3,5″',
  },
  whyNavLabel: 'Dlaczego PC45t',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W obiegu dokumentów',
  highlights: [
    { icon: ICON.rozdzielczosc, label: 'Rozdzielczość', value: '203 dpi (8 pkt/mm)' },
    { icon: ICON.szybkosc, label: 'Prędkość druku', value: 'do 8 ips' },
    { icon: ICON.przekatna, label: 'Ekran', value: 'kolorowy 3,5″ (320 × 240)' },
    { icon: ICON.lan, label: 'Łączność', value: 'Ethernet, Wi-Fi 802.11ax' },
  ],
  specGroups: [
    {
      title: 'Druk',
      rows: [
        { k: 'Rozdzielczość', v: '203 dpi (8 pkt/mm)' },
        { k: 'Szerokość druku', v: '108 mm' },
        { k: 'Prędkość', v: '2–8 ips' },
        { k: 'Metoda druku', v: 'termotransferowa' },
      ],
    },
    {
      title: 'Nośniki',
      rows: [
        { k: 'Szerokość', v: 'do 118 mm' },
        { k: 'Średnica rolki', v: 'do 127 mm' },
        { k: 'Rdzeń', v: '12,7 / 25,4 / 38,1 mm' },
        { k: 'Rodzaje', v: 'opaski, tagi, papier paragonowy, etykiety z podkładem i bez' },
        { k: 'Wykrywanie', v: 'przerwa, nacięcie, czarny znacznik, nośnik ciągły' },
      ],
    },
    {
      title: 'Łączność',
      rows: [
        { k: 'Standard', v: 'Ethernet 10/100, USB 2.0 Host i Device' },
        { k: 'Opcjonalnie', v: 'RS-232 do 115,2 kB/s' },
        { k: 'Wi-Fi', v: '802.11 a/b/g/n/ac/ax z WPA3' },
        { k: 'Bluetooth', v: '5.2' },
        { k: 'Protokoły', v: 'TCP/IP, LPR/LPD, FTP/SFTP, HTTP/HTTPS, SNMP, IPv4 i IPv6' },
      ],
    },
    {
      title: 'Obudowa i obsługa',
      rows: [
        { k: 'Wymiary', v: '179,6 × 212,9 × 285,5 mm' },
        { k: 'Waga', v: '2,7 kg' },
        { k: 'Wyświetlacz', v: 'kolorowy LCD 3,5″' },
        { k: 'Pamięć', v: '256 MB RAM, 512 MB Flash' },
        { k: 'Temperatura pracy', v: 'od 0 °C do +45 °C' },
        { k: 'Gwarancja', v: '2 lata' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.przekatna,
      title: 'Kolorowy ekran zamiast diod',
      body:
        'Panel 3,5 cala pokazuje stan urządzenia i pozwala zmienić ustawienia bez sięgania po komputer ani liczenia mrugnięć diody.',
    },
    {
      icon: ICON.rolka,
      title: 'Bierze nośniki, jakie są pod ręką',
      body:
        'Opaski, przywieszki, papier paragonowy oraz etykiety z podkładem i bez — czujnik rozpoznaje przerwę, nacięcie i czarny znacznik.',
    },
    {
      icon: ICON.lan,
      title: 'Wpina się w sieć kancelarii',
      body:
        'Ethernet w standardzie, Wi-Fi z zabezpieczeniem WPA3 i pełna obsługa protokołów sieciowych — drukarkę widzi każde stanowisko w kancelarii.',
    },
    {
      icon: ICON.szybkosc,
      title: 'Osiem cali na sekundę',
      body:
        'Partia etykiet do opisania dokumentacji schodzi z drukarki ciągiem, bez przerw między kolejnymi sztukami.',
    },
  ],
  whereToBuy: [{ name: 'ZUP Łódź' }, { name: 'TAKMA' }],
  signature: [
    {
      icon: ICON.tarcza,
      title: 'Bezpieczny kanał druku i konfiguracji',
      body:
        'Secure Net1 szyfruje transmisję zadań i konfiguracji drukarki — ma to znaczenie przy urządzeniu stojącym w sieci obsługującej dokumentację jednostki.',
      tone: 'ciemny',
    },
  ],
  usedBy: { device: 'Honeywell PC45t' },
  related: [
    {
      name: 'Zebra ZD421c',
      href: '/produkt/zebra-zd421c',
      note: 'Prostszy model, najczęściej wybierany w nadleśnictwach',
    },
  ],
}

export default function HoneywellPC45tPage() {
  return <ProductPage data={data} />
}
