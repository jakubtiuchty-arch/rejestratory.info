"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TabelaPorownania from '@/components/TabelaPorownania'
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Placeholder produkty dla kategorii Akcesoria komputerowe
const products = [
  {
    id: 1,
    name: "Torba na laptopa 15,6\u2033",
    category: "Akcesoria komputerowe",
    description: "Wytrzymała torba na laptopa z miejscem na dokumenty i akcesoria",
    specifications: "Laptopy 14–15,6\u2033, odporna na wilgoć, pasek na ramię, otwór na rączkę walizki",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "torba_na_laptopa_15.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/torba-na-laptopa-15"
  },
  {
    id: 2,
    name: "Podkładka pod mysz",
    category: "Akcesoria komputerowe", 
    description: "Płaska podkładka pod mysz do pracy biurowej",
    specifications: "Powierzchnia antypoślizgowa, ok. 20 × 20–22 × 22 cm",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "podkladka_pod_myszke_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/podkladka-pod-mysz"
  },
  {
    id: 3,
    name: "Podnóżek biurowy",
    category: "Akcesoria komputerowe",
    description: "Regulowany podnóżek biurowy poprawiający ergonomię pracy",
    specifications: "Regulacja kąta nachylenia, powierzchnia antypoślizgowa",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA", 
    image: "podnozek_pod_biurko_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/podnozek-biurowy"
  },
  {
    id: 4,
    name: "Samsung SSD T9 1TB",
    category: "Akcesoria komputerowe",
    description: "Szybki zewnętrzny dysk SSD z interfejsem USB 3.2 Gen 2x2",
    specifications: "Pojemność 1TB, USB-C, szybkość do 2000 MB/s",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "ssd_t7_1.png", 
    badge: null,
    featured: true,
    customUrl: "/produkt/samsung-ssd-t9"
  },
  {
    id: 5,
    name: "Samsung SSD T7 Shield 2 TB",
    category: "Akcesoria komputerowe",
    description: "Wytrzymały zewnętrzny dysk SSD w gumowej obudowie IP65",
    specifications: "2 TB, USB-C, odczyt do 1050 MB/s, IP65, upadek z 3 m",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "ssd_t9_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/samsung-ssd-t7"
  },
  {
    id: 6,
    name: "Microsoft 365 Business Standard",
    category: "Akcesoria komputerowe",
    description: "Pakiet aplikacji biurowych z chmurą OneDrive i Teams",
    specifications: "Licencja roczna, 1 użytkownik, pełny pakiet Office",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "ms365_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/ms-365"
  },
  {
    id: 7,
    name: "Dell Pro KM5221W — klawiatura i mysz",
    category: "Akcesoria komputerowe",
    description: "Bezprzewodowy zestaw klawiatura + mysz z długą żywotnością baterii",
    specifications: "2,4 GHz, bateria do 36 miesięcy, mysz do 4000 dpi",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "km5221_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/dell-km5221"
  },
  {
    id: 8,
    name: "Dell Pro Plus KM7321W — klawiatura i mysz",
    category: "Akcesoria komputerowe",
    description: "Zestaw bezprzewodowy z przełączaniem między trzema urządzeniami",
    specifications: "Bluetooth 5.0 i 2,4 GHz, do 3 urządzeń, mechanizm nożycowy",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "km7321_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/dell-km7321"
  },
  {
    id: 9,
    name: "HP 655 — klawiatura i mysz",
    category: "Akcesoria komputerowe",
    description: "Ergonomiczny zestaw klawiatura + mysz dla komfortowej pracy",
    specifications: "2,4 GHz, zasięg do 10 m, mysz 4000 dpi",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "hp655_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/hp-655"
  },
  {
    id: 10,
    name: "Zasilacz UPS Vertiv Liebert itON 600 VA",
    category: "Akcesoria komputerowe",
    description: "Niezawodny zasilacz UPS typu line-interactive do ochrony komputerów i sprzętu IT",
    specifications: "600 VA / 360 W, 230V, 2 gniazda Schuko, bateria VRLA 7Ah 12V",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "vertin_600_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/vertin-600"
  },
  {
    id: 11,
    name: "Zasilacz UPS Vertiv Liebert itON 1000 VA",
    category: "Akcesoria komputerowe",
    description: "Niezawodny zasilacz UPS line-interactive z AVR do ochrony sprzętu IT w nadleśnictwach",
    specifications: "1000 VA / 600 W, 230V, bateria VRLA 2x7Ah 12V, 2x Schuko + 2x C13, USB",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "vertin_1000_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/vertin-1000"
  },
  {
    id: 12,
    name: "HP 460 Multi-device Keyboard",
    category: "Akcesoria komputerowe",
    description: "Bezprzewodowa klawiatura Bluetooth obsługująca trzy urządzenia",
    specifications: "Bluetooth 5.3, do 3 urządzeń, blok numeryczny, 2 × AAA do 24 miesięcy",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "hp460_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/hp-460"
  },
  {
    id: 13,
    name: "HP 715 Rechargeable Mouse",
    category: "Akcesoria komputerowe",
    description: "Bezprzewodowa mysz dla osób oburęcznych, pracuje także na szkle",
    specifications: "Bluetooth 5.3 + 2,4 GHz, do 3 urządzeń, do 3000 dpi, akumulator do 90 dni",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "hp715_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/hp-715"
  },
  {
    id: 14,
    name: "Torba HP do laptopów 15,6\"",
    category: "Akcesoria komputerowe",
    description: "Dwukomorowa torba na laptopa z otworem na uchwyt walizki",
    specifications: "Laptopy 15,6\", dwie komory z przegrodami, odporna na wilgoć i zarysowania, 600 g",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "torba_hp_15.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/torba-hp-15"
  }
];

// Opcje filtrowania i sortowania
const sortOptions = [
  { value: "name", label: "Nazwa A-Z" },
  { value: "price-asc", label: "Cena rosnąco" },
  { value: "price-desc", label: "Cena malejąco" },
  { value: "newest", label: "Najnowsze" }
];

const availabilityOptions = [
  { value: "all", label: "Wszystkie" },
  { value: "available", label: "Dostępne" }
];

// Porównanie pod kafelkami — osobne tabele tam, gdzie jest z czego wybierać (podkładka, podnóżek
// i Microsoft 365 są pojedyncze). Dane z dell.com, hp.com, samsung semiconductor i vertiv.com,
// sprawdzone 17.10.2026. Decyzje Jakuba 17.10: T7 Shield 2 TB (oferta ZUP), HP 460 wg HP, UPS tylko TAKMA.
const klawiaturyKolumny = [
  { klucz: 'zestaw', naglowek: 'Zestaw' },
  { klucz: 'lacznosc', naglowek: 'Łączność' },
  { klucz: 'zasilanie', naglowek: 'Zasilanie' },
  { klucz: 'klawiatura', naglowek: 'Klawiatura' },
]

const klawiaturyGrupy = [
  {
    wiersze: [
      { model: 'Dell Pro KM5221W', href: '/produkt/dell-km5221', wartosci: { zestaw: 'klawiatura + mysz', lacznosc: '2,4 GHz (odbiornik USB)', zasilanie: 'baterie AA/AAA, do 36 mies.', klawiatura: 'pełnowymiarowa, cicha' } },
      { model: 'Dell Pro Plus KM7321W', href: '/produkt/dell-km7321', wartosci: { zestaw: 'klawiatura + mysz', lacznosc: '2,4 GHz i Bluetooth, 3 urządzenia', zasilanie: 'baterie AA/AAA, do 36 mies.', klawiatura: 'kompaktowa z blokiem numerycznym' }, naj: ['lacznosc'] },
      { model: 'HP 655', href: '/produkt/hp-655', wartosci: { zestaw: 'klawiatura + mysz', lacznosc: '2,4 GHz (odbiornik USB)', zasilanie: 'baterie AAA, do 20 mies.', klawiatura: 'pełnowymiarowa, odporna na zachlapanie' } },
      { model: 'HP 460', href: '/produkt/hp-460', wartosci: { zestaw: 'sama klawiatura', lacznosc: 'Bluetooth, 3 urządzenia', zasilanie: '2 × AAA, do 24 mies.', klawiatura: 'kompaktowa z blokiem numerycznym, cicha' } },
      { model: 'HP 715', href: '/produkt/hp-715', wartosci: { zestaw: 'sama mysz', lacznosc: '2,4 GHz i Bluetooth, 3 urządzenia', zasilanie: 'akumulator USB-C, do 3 mies.', klawiatura: '—' }, naj: ['lacznosc'] },
    ],
  },
]

const dyskiKolumny = [
  { klucz: 'pojemnosc', naglowek: 'Pojemność' },
  { klucz: 'predkosc', naglowek: 'Odczyt / zapis' },
  { klucz: 'zlacze', naglowek: 'Złącze' },
  { klucz: 'odpornosc', naglowek: 'Odporność' },
]

const dyskiGrupy = [
  {
    wiersze: [
      { model: 'Samsung SSD T9', href: '/produkt/samsung-ssd-t9', wartosci: { pojemnosc: '1 TB', predkosc: '2000 / 1950 MB/s', zlacze: 'USB 3.2 Gen 2x2 (20 Gb/s)', odpornosc: 'upadek z 3 m' }, naj: ['predkosc'] },
      { model: 'Samsung SSD T7 Shield', href: '/produkt/samsung-ssd-t7', wartosci: { pojemnosc: '2 TB', predkosc: '1050 / 1000 MB/s', zlacze: 'USB 3.2 Gen 2 (10 Gb/s)', odpornosc: 'IP65 · upadek z 3 m' }, naj: ['pojemnosc', 'odpornosc'] },
    ],
  },
]

const upsKolumny = [
  { klucz: 'moc', naglowek: 'Moc' },
  { klucz: 'gniazda', naglowek: 'Gniazda' },
  { klucz: 'akumulator', naglowek: 'Akumulator' },
  { klucz: 'usb', naglowek: 'Port USB' },
]

const upsGrupy = [
  {
    wiersze: [
      { model: 'Vertiv Liebert itON 600 VA', href: '/produkt/vertin-600', wartosci: { moc: '600 VA / 360 W', gniazda: '2 × Schuko', akumulator: '1 × 12 V 7 Ah', usb: 'nie' }, slabe: ['usb'] },
      { model: 'Vertiv Liebert itON 1000 VA', href: '/produkt/vertin-1000', wartosci: { moc: '1000 VA / 600 W', gniazda: '2 × Schuko + 2 × IEC C13', akumulator: '2 × 12 V 7 Ah', usb: 'tak, zamykanie systemu' }, naj: ['moc', 'usb'] },
    ],
  },
]

const torbyKolumny = [
  { klucz: 'laptop', naglowek: 'Laptop' },
  { klucz: 'komory', naglowek: 'Komory' },
  { klucz: 'noszenie', naglowek: 'Noszenie' },
]

const torbyGrupy = [
  {
    wiersze: [
      { model: 'Torba HP 15,6″', href: '/produkt/torba-hp-15', wartosci: { laptop: 'do 15,6″', komory: '2, z przegrodami na akcesoria', noszenie: 'uchwyt, otwór na rączkę walizki' } },
      { model: 'Torba na laptopa 15,6″', href: '/produkt/torba-na-laptopa-15', wartosci: { laptop: '14–15,6″', komory: '2: laptop oraz dokumenty i akcesoria', noszenie: 'pasek na ramię, otwór na rączkę walizki' }, naj: ['noszenie'] },
    ],
  },
]

export default function CategoryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("name");
  const [availabilityFilter, setAvailabilityFilter] = React.useState("all");
  const [viewMode, setViewMode] = React.useState("grid"); // grid lub list
  const [showFilters, setShowFilters] = React.useState(false);

  // Filtrowanie i sortowanie produktów
  const filteredProducts = React.useMemo(() => {
    let filtered = products;

    // Filtr wyszukiwania
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtr dostępności
    if (availabilityFilter !== "all") {
      filtered = filtered.filter(product => {
        if (availabilityFilter === "available") return product.availability === "Dostępny";
        return true;
      });
    }

    // Sortowanie
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name, "pl");
        case "price-asc":
          return porownajCeny(a, b, 1);
        case "price-desc":
          return porownajCeny(a, b, -1);
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, sortBy, availabilityFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header activeTab="produkty" />


      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-emerald-600">Strona główna</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <a href="/kategoria/akcesoria-komputerowe" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <span className="text-gray-900 font-medium">Akcesoria komputerowe</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Akcesoria komputerowe</h1>
              <p className="text-gray-600">{filteredProducts.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Profesjonalne akcesoria komputerowe dla biur leśnictwa. 
            Torby, podkładki, dyski zewnętrzne, oprogramowanie i zestawy klawiatura + mysz od sprawdzonych producentów.
          </p>
        </div>
      </section>

      {/* Filtry i sortowanie */}
      <section className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Wyszukiwarka */}
            <div className="relative flex-1 max-w-md">
              <img src={ICON.lupa} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 mix-blend-multiply" />
              <input
                type="text"
                placeholder="Szukaj w akcesoriach..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Kontrolki */}
            <div className="flex items-center gap-4">
              {/* Filtry */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <img src={ICON.filtr} alt="" className="h-4 w-4 mix-blend-multiply" />
                Filtry
              </button>

              {/* Sortowanie */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Widok */}
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <img src={viewMode === "grid" ? naCiemnym(ICON.aplikacje) : ICON.aplikacje} alt="" className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <img src={viewMode === "list" ? naCiemnym(ICON.lista) : ICON.lista} alt="" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandowane filtry */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dostępność</label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  >
                    {availabilityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lista produktów */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src={ICON.lupa} alt="" className="h-12 w-12 mix-blend-multiply" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Brak produktów</h3>
              <p className="text-gray-600">Spróbuj zmienić filtry lub wyszukiwaną frazę</p>
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    viewMode === "list" ? "flex gap-6 h-full" : "flex flex-col h-full"
                  }`}
                >
                  {/* Obrazek */}
                  <div className={`relative ${viewMode === "list" ? "w-44 flex-shrink-0 p-3" : "aspect-square p-5"} border-b border-gray-200`}>
                    <div className="relative w-full h-full">
                      <Image 
                        src={`/${product.image}`}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes={viewMode === "list" ? "176px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 20vw"}
                      />
                    </div>
                  </div>

                  {/* Treść */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <p className="text-sm text-gray-500 mb-4">{product.specifications}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-500">
                          {product.availability} • {product.whereToBuy}
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <a 
                        href={product.customUrl || `/produkt/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                      >
                        Zobacz produkt
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Porównanie — osobne tabele dla grup, w których jest z czego wybierać */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">Który wybrać?</h2>
          <p className="mt-1 text-gray-600">
            Poniższe zestawienia przedstawiają różnice między akcesoriami tego samego rodzaju według danych producentów.
          </p>
          <TabelaPorownania tytul="Klawiatury i myszy" kolumny={klawiaturyKolumny} grupy={klawiaturyGrupy} />
          <TabelaPorownania
            tytul="Dyski zewnętrzne SSD"
            kolumny={dyskiKolumny}
            grupy={dyskiGrupy}
            przypis="Oba dyski mają złącze USB-C i sprzętowe szyfrowanie AES 256. Pełną prędkość T9 daje tylko port USB 3.2 Gen 2x2."
          />
          <TabelaPorownania
            tytul="Zasilacze awaryjne UPS"
            kolumny={upsKolumny}
            grupy={upsGrupy}
            przypis="Oba to zasilacze line-interactive z automatyczną regulacją napięcia (AVR) i 2 latami gwarancji producenta."
          />
          <TabelaPorownania
            tytul="Torby na laptopa"
            kolumny={torbyKolumny}
            grupy={torbyGrupy}
            przypis="Obie torby są odporne na wilgoć."
          />
        </div>
      </section>

       {/* Footer */}
<Footer />
</div>
  );
}