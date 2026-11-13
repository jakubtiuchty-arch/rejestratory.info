'use client'

import ProductPage, { type ProductData } from '@/components/product/ProductPage'
import { ICON } from '@/components/product/icons'

// Zebra TC501 (TC5010, ogłoszony 18.02.2026). Parametry: spec sheet Zebry (rev. 02/18/26),
// release notes pierwszego wydania Androida 15 GMS, lista wspieranych wersji Androida Zebry.
// Konfiguracja 12/256 GB — taką ZUP Łódź kupuje w umowie NH.271.51.2026 z 02.11.2026
// (część 3, „Mobilny komputer dotykowy – typ 4”). Karta dodana 13.11.2026.
// Czujnik ToF: spec sheet („Time of Flight (iToF) — available on select SKUs”, 3D data
// in any lighting), PRG TC501 (moduł iToF na tylnej ściance), Zebra TechDocs Mobile Parcel 3.0
// (VGA iToF, paczki 10–120 cm, palety w becie z dwóch ujęć, framework wgrany fabrycznie).
// Umowa ZUP Łódź wymaga czujnika („Czujnik Time of Flight (ToF sensor)” w wierszu Skaner).
// Szerokokątnego aparatu 13 Mpx nie podajemy — to osobna opcja, umowa go nie wymaga.
const data: ProductData = {
  slug: 'zebra-tc501',
  name: 'Zebra TC501',
  category: 'Rejestratory',
  categoryHref: '/kategoria/rejestratory',
  images: ['/tc501_1.png', '/tc501_2.png'],
  inquiry: {
    description: 'Rejestrator leśniczego z czujnikiem 3D ToF, ekranem 1500 nitów i Wi-Fi 7',
    specifications: 'Android 15, do 19 · 6″ FHD+ AMOLED · 12/256 GB · 5G · skaner 1D/2D · czujnik ToF · 5000 mAh hot-swap · IP68',
  },
  whyNavLabel: 'Dlaczego TC501',
  whyHeading: 'Do czego przyda się w nadleśnictwie',
  whyLabel: 'W warunkach leśnych',
  highlights: [
    { icon: ICON.pamiec, label: 'Pamięć', value: '12 GB RAM + 256 GB' },
    { icon: ICON.jasnosc, label: 'Ekran', value: '6″ AMOLED, do 1500 nitów' },
    { icon: ICON.lidar, label: 'Pomiar 3D', value: 'czujnik ToF, kamera głębi VGA' },
    { icon: ICON.upadek, label: 'Upadki', value: 'z 2,44 m na beton' },
  ],
  variants: [{ id: 'pamiec', label: 'Pamięć', options: ['12 GB / 256 GB'] }],
  specGroups: [
    {
      title: 'Wyświetlacz',
      rows: [
        { k: 'Przekątna', v: '6″' },
        { k: 'Rozdzielczość', v: '2160 × 1080 FHD+, AMOLED' },
        { k: 'Jasność', v: '600 nitów, w słońcu 1000, szczytowo 1500' },
        { k: 'Szkło', v: 'Corning Gorilla Glass Victus, klejone optycznie' },
        { k: 'Obsługa', v: 'palcem, w rękawicach i rysikiem; ekran ignoruje krople wody' },
      ],
    },
    {
      title: 'Wydajność',
      rows: [
        { k: 'System', v: 'Android 15 z GMS, aktualizacje do Androida 19' },
        { k: 'Procesor', v: 'Qualcomm Dragonwing Q-6690, do 2,9 GHz' },
        { k: 'Pamięć RAM', v: '12 GB LPDDR5' },
        { k: 'Pamięć wbudowana', v: '256 GB UFS 3.1' },
        { k: 'Karta pamięci', v: 'microSD do 2 TB' },
      ],
    },
    {
      title: 'Łączność i odczyt',
      rows: [
        { k: 'Skaner', v: 'kody 1D i 2D' },
        { k: 'RFID', v: 'UHF krótkiego zasięgu, do 2 m' },
        { k: 'Sieć', v: '5G i LTE, SIM i 2 × eSIM' },
        { k: 'Wi-Fi i Bluetooth', v: 'Wi-Fi 7 (2,4 / 5 / 6 GHz), Bluetooth 6.0' },
        { k: 'NFC', v: 'ISO 14443 A/B, ISO 15693, Mifare, FeliCa' },
        { k: 'Lokalizacja', v: 'GPS, GLONASS, Galileo, BeiDou, QZSS' },
        { k: 'Aparaty', v: '50 Mpx z autofokusem, 8 Mpx z przodu' },
      ],
    },
    {
      title: 'Czujnik ToF (pomiar 3D)',
      rows: [
        { k: 'Technologia', v: 'iToF — pomiar czasu przelotu światła, kamera głębi VGA na tylnej ściance' },
        { k: 'Co mierzy', v: 'głębię, odległość, obecność przedmiotu i objętość — w każdym oświetleniu' },
        { k: 'Wymiary paczek', v: 'Zebra Dimensioning: od 10 do 120 cm, prostopadłościenne i o nieregularnym kształcie' },
        { k: 'Palety', v: 'pomiar z dwóch ujęć (wersja beta)' },
        { k: 'Oprogramowanie', v: 'moduł pomiarowy wgrany fabrycznie, wynik trafia do aplikacji przez API Zebry' },
        { k: 'Dostępność', v: 'tylko wybrane wersje TC501 — umowa ZUP Łódź wymaga czujnika ToF' },
      ],
    },
    {
      title: 'Odporność',
      rows: [
        { k: 'Klasa szczelności', v: 'IP65 i IP68' },
        { k: 'Upadki', v: 'z 2,44 m na beton (z 1,83 m w −20…+50 °C), w osłonie z 2,74 m' },
        { k: 'Bębnowanie', v: '2000 upadków z 0,5 m, w osłonie z 1 m' },
        { k: 'Temperatura pracy', v: 'od −20 °C do +50 °C' },
      ],
    },
    {
      title: 'Zasilanie i obsługa',
      rows: [
        { k: 'Akumulator', v: '5000 mAh, wymiana bez wyłączania (hot-swap)' },
        { k: 'Akumulator powiększony', v: '7240 mAh, osobno' },
        { k: 'Wymiary', v: '163 × 78 × 15,5 mm' },
        { k: 'Waga', v: '273 g z baterią 5000 mAh' },
        { k: 'Dostawa i serwis', v: 'TAKMA' },
      ],
    },
  ],
  why: [
    {
      icon: ICON.jasnosc,
      title: 'Ekran czytelny w pełnym słońcu',
      body:
        'Wyświetlacz AMOLED rozjaśnia się do 1500 nitów, więc mapy i formularze są czytelne ' +
        'na otwartej powierzchni zrębu w środku dnia.',
    },
    {
      icon: ICON.upadek,
      title: 'Upadki z 2,44 m na beton',
      body:
        'Zebra podaje upadki z 2,44 m bez osłony i 2000 cykli bębnowania — terminal znosi upadek ' +
        'z ambony czy z paki samochodu.',
    },
    {
      icon: ICON.pamiec,
      title: '12 GB RAM i 256 GB na lata',
      body:
        'Zapas pamięci na mapy, zdjęcia z inwentaryzacji i kolejne wersje aplikacji, a Zebra ' +
        'zapowiada aktualizacje aż do Androida 19.',
    },
    {
      icon: ICON.wymiana,
      title: 'Bateria wymieniana w biegu',
      body:
        'Akumulator 5000 mAh wymienia się bez wyłączania terminala, a na dłuższe wyjazdy jest ' +
        'wersja 7240 mAh.',
    },
  ],
  signature: [
    {
      icon: ICON.lidar,
      title: 'Czujnik ToF mierzy w trzech wymiarach',
      body:
        'Obok aparatu pracuje czujnik ToF (time-of-flight) z kamerą głębi VGA. Oświetla kadr ' +
        'modulowanym światłem i z opóźnienia odbitego sygnału liczy odległość każdego punktu — ' +
        'powstaje mapa głębi, która nie zależy od oświetlenia. Terminal mierzy więc odległość, ' +
        'wykrywa obecność przedmiotu i podaje jego objętość. Wgrany fabrycznie moduł Zebra ' +
        'Dimensioning mierzy paczki od 10 do 120 cm, także o nieregularnym kształcie, a palety ' +
        'z dwóch ujęć — w magazynie nadleśnictwa czy w szkółce wymiary przesyłki do listu ' +
        'przewozowego zmierzy się bez taśmy. Czujnik mają tylko wybrane wersje TC501; ' +
        'umowa ZUP Łódź go wymaga.',
      tone: 'ciemny',
      // Baner na wzór sceny ze stosem z hero strony głównej (uwaga Jakuba 13.11.2026):
      // gpt_image_2_6 21:9 (wzór: klatka z hero-nadlesnictwo.mp4 + zdjęcia tc501_1/2),
      // leśniczy przy stosie trzyma terminal poziomo, tył z aparatem na stos.
      // Terminal z AI przekłamywał wygląd, więc w dłonie wklejone jest prawdziwe
      // tc501_1.png (obrót 90°, skala 158 px w klatce 2688 × 1152, kciuki z AI na
      // wierzchu); na ekranie mapa głębi stosu. Ruch mgły i promieni: Seedance 2.5,
      // klatki wyrównane do kompozytu (SIFT) i z wklejonym prawdziwym terminalem w
      // każdej klatce. Pomiar dorysowany w kodzie (uwaga Jakuba: ma wyglądać jak
      // mierzenie, nie kolorowy stos): od rogu najbliżej terminala rosną kolejno linie
      // wysokości, szerokości i głębokości z licznikiem, potem przerywany obrys bryły;
      // ekran terminala pokazuje podgląd stosu z tymi samymi liniami. Wartości są
      // poglądowe — Zebra nie ma aplikacji do pomiaru stosów. Pasek 2000 × 566.
      video: '/czujnik-tof-tc501.mp4?v=7',
      image: '/czujnik-tof-tc501-poster.jpg?v=7',
      backgroundMedia: true,
      imageAlt:
        'Leśniczy przy stosie drewna na leśnej drodze o zachodzie słońca trzyma Zebra TC501 ' +
        'poziomo i mierzy stos — na kłodach pojawiają się linie wysokości, szerokości ' +
        'i głębokości z wymiarami, a na ekranie terminala podgląd z tymi samymi liniami',
    },
  ],
  usedBy: { device: 'Zebra TC501' },
  serviceContract: '3 lata',
  related: [
    {
      name: 'Zebra TC58e',
      href: '/produkt/zebra-tc58e',
      note: 'Poprzednia generacja: Android do 18, upadki z 1,8 m',
    },
    {
      name: 'Newland MT95 Kambur Pro III',
      href: '/produkt/newland-mt95',
      note: 'Bateria 5100 mAh hot-swap, 6/64 GB',
    },
  ],
}

export default function ZebraTC501Page() {
  return <ProductPage data={data} />
}
