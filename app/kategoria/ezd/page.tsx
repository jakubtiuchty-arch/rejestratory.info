"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TabelaPorownania from '@/components/TabelaPorownania'
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Produkty dla kategorii Elektroniczne Zarządzanie Dokumentacją
const products = [
  {
    id: 1,
    name: "Zebra ZD421c",
    slug: "zebra-zd421c",
    category: "Elektroniczne Zarządzanie Dokumentacją",
    description: "Kompaktowa drukarka etykiet z taśmą w kasecie do oznaczania dokumentów",
    specifications: "Termotransfer z kasetą 74 m, 203 dpi, USB, Ethernet lub Wi-Fi jako moduł",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/zd421c_1.png",
    featured: true
  },
  {
    id: 2,
    name: "Honeywell PC45t",
    slug: "honeywell-pc45t",
    category: "Elektroniczne Zarządzanie Dokumentacją", 
    description: "Biurkowa drukarka etykiet z kolorowym wyświetlaczem do dokumentacji leśnej",
    specifications: "Termotransfer i termika, 203 dpi, do 8 ips, USB, Ethernet",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/pc45t_1.png",
    featured: true
  },
  {
    id: 3,
    name: "Epson WorkForce DS-730N",
    slug: "epson-ds730n",
    category: "Elektroniczne Zarządzanie Dokumentacją",
    description: "Sieciowy skaner dokumentów do digitalizacji archiwów leśnych",
    specifications: "A4, 600 dpi, 40 str/min, duplex, ADF 100 arkuszy, USB 2.0, Ethernet",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/ds730_1.png",
    featured: true
  },
  {
    id: 4,
    name: "Zebra DS2208",
    slug: "zebra-ds2208",
    category: "Elektroniczne Zarządzanie Dokumentacją",
    description: "Uniwersalny skaner kodów kreskowych 1D/2D do biura",
    specifications: "Imager 2D, USB, czytanie z ekranu, zasięg do 37 cm",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/zebra-ds2208.png",
    featured: true
  },
  {
    id: 5,
    name: "Honeywell Voyager XP 1470g",
    slug: "honeywell-1450g",
    category: "Elektroniczne Zarządzanie Dokumentacją",
    description: "Ręczny skaner kodów kreskowych 2D do szybkiego skanowania",
    specifications: "Imager 2D, USB, czytanie z ekranu, IP52, upadki z 1,8 m",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/1450g_1.png",
    featured: false
  },
  {
    id: 6,
    name: "Honeywell PC42E-T",
    slug: "honeywell-pc42e-t",
    category: "Elektroniczne Zarządzanie Dokumentacją",
    description: "Biurkowa drukarka etykiet z Ethernetem, z opcjonalną gilotyną i dyspenserem",
    specifications: "Termotransfer, 203 lub 300 dpi, do 6 ips, Ethernet i USB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/pc42e_t_1.png",
    featured: false
  },
  {
    id: 7,
    name: "Zebra DS2278",
    slug: "zebra-ds2278",
    category: "Elektroniczne Zarządzanie Dokumentacją",
    description: "Bezprzewodowy czytnik kodów 1D i 2D z podstawką ładującą",
    specifications: "Bluetooth, akumulator 2400 mAh do 84 h, kody 1D i 2D, IP52",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/zebra-ds2278.png",
    featured: false
  },
  {
    id: 8,
    name: "Honeywell Voyager 1250g",
    slug: "honeywell-1250g",
    category: "Elektroniczne Zarządzanie Dokumentacją",
    description: "Laserowy czytnik kodów kreskowych 1D z trybem prezentacyjnym na podstawce",
    specifications: "Laser jednoliniowy, kody 1D, zasięg do 45 cm, USB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/honeywell-1250g.png",
    featured: false
  }
];

// Opcje filtrowania i sortowania
const sortOptions = [
  { value: "default", label: "Domyślnie" },
  { value: "name", label: "Nazwa A-Z" },
  { value: "price-asc", label: "Cena rosnąco" },
  { value: "price-desc", label: "Cena malejąco" },
  { value: "newest", label: "Najnowsze" }
];

const availabilityOptions = [
  { value: "all", label: "Wszystkie" },
  { value: "available", label: "Dostępne" }
];

// Porównanie pod kafelkami — osobno drukarki etykiet i czytniki kodów (skaner dokumentów jest jeden).
// Dane z zebra.com i honeywell, sprawdzone 17.10.2026. Honeywell 1470g zamiast wycofanego 1450g
// (oferta ZUP Łódź, decyzja Jakuba 17.10).
const drukarkiKolumny = [
  { klucz: 'tasma', naglowek: 'Taśma' },
  { klucz: 'druk', naglowek: 'Rozdzielczość · prędkość' },
  { klucz: 'siec', naglowek: 'Sieć Ethernet' },
  { klucz: 'panel', naglowek: 'Panel' },
  { klucz: 'gwarancja', naglowek: 'Gwarancja producenta' },
]

const drukarkiGrupy = [
  {
    wiersze: [
      { model: 'Zebra ZD421c', href: '/produkt/zebra-zd421c', wartosci: { tasma: 'kaseta 74 m', druk: '203 dpi · 152 mm/s', siec: 'moduł za dopłatą', panel: 'ikony stanu', gwarancja: '2 lata' }, slabe: ['siec'] },
      { model: 'Honeywell PC45t', href: '/produkt/honeywell-pc45t', wartosci: { tasma: 'rolka', druk: '203 dpi · 203 mm/s', siec: 'w standardzie', panel: 'kolorowy LCD 3,5″', gwarancja: '2 lata' }, naj: ['druk', 'panel'] },
      { model: 'Honeywell PC42E-T', href: '/produkt/honeywell-pc42e-t', wartosci: { tasma: 'rolka do 300 m', druk: '203 dpi · 152 mm/s', siec: 'w standardzie', panel: 'dioda LED', gwarancja: '1 rok' }, slabe: ['gwarancja'] },
    ],
  },
]

const czytnikiKolumny = [
  { klucz: 'polaczenie', naglowek: 'Połączenie' },
  { klucz: 'kody', naglowek: 'Kody' },
  { klucz: 'ekran', naglowek: 'Kod z ekranu telefonu' },
  { klucz: 'zasieg', naglowek: 'Zasięg' },
  { klucz: 'odpornosc', naglowek: 'Odporność' },
  { klucz: 'gwarancja', naglowek: 'Gwarancja producenta' },
]

const czytnikiGrupy = [
  {
    wiersze: [
      { model: 'Honeywell Voyager 1250g', href: '/produkt/honeywell-1250g', wartosci: { polaczenie: 'kabel USB', kody: '1D (laser)', ekran: 'nie', zasieg: 'do 45 cm', odpornosc: 'IP41 · 1,5 m', gwarancja: '5 lat' }, slabe: ['kody', 'ekran'] },
      { model: 'Honeywell Voyager XP 1470g', href: '/produkt/honeywell-1450g', wartosci: { polaczenie: 'kabel USB', kody: '1D i 2D', ekran: 'tak', zasieg: 'do 40 cm', odpornosc: 'IP52 · 1,8 m', gwarancja: '5 lat' }, naj: ['odpornosc'] },
      { model: 'Zebra DS2208', href: '/produkt/zebra-ds2208', wartosci: { polaczenie: 'kabel USB', kody: '1D i 2D', ekran: 'tak', zasieg: 'do 37 cm', odpornosc: 'IP52 · 1,5 m', gwarancja: '5 lat' } },
      { model: 'Zebra DS2278', href: '/produkt/zebra-ds2278', wartosci: { polaczenie: 'Bluetooth, podstawka', kody: '1D i 2D', ekran: 'tak', zasieg: 'do 37 cm', odpornosc: 'IP52 · 1,5 m', gwarancja: '3 lata' }, naj: ['polaczenie'] },
    ],
  },
]

export default function CategoryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("default");
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
        case "default":
          return a.id - b.id;
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
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-emerald-600">Strona główna</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <a href="/#produkty" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <span className="text-gray-900 font-medium">Elektroniczne Zarządzanie Dokumentacją</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Elektroniczne Zarządzanie Dokumentacją</h1>
              <p className="text-gray-600">{products.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Profesjonalne urządzenia do elektronicznego zarządzania dokumentacją. 
            Drukarki etykiet, skanery kodów kreskowych i dokumentów do digitalizacji procesów biurowych.
          </p>
        </div>
      </section>

      {/* Filtry i wyszukiwarka */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Wyszukiwarka po lewej */}
            <div className="relative flex-1 max-w-md">
              <img src={ICON.lupa} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 mix-blend-multiply" />
              <input
                type="text"
                placeholder="Szukaj w EZD..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Kontrolki po prawej */}
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
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"}`}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain bg-white scale-[0.8]"
                    />
                  </div>

                  {/* Cienka linia oddzielająca */}
                  <div className="border-t border-gray-200"></div>

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

                    <div className="mt-auto flex gap-2">
                      <a 
                        href={`/produkt/${product.slug}`}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
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

      {/* Porównanie — tylko różnice, osobno dla drukarek etykiet i czytników kodów */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">Który wybrać?</h2>
          <p className="mt-1 text-gray-600">
            Poniższe zestawienia przedstawiają różnice między drukarkami etykiet i czytnikami kodów według danych producentów. Skaner dokumentów Epson DS-730N jest jedynym urządzeniem w swojej grupie.
          </p>
          <TabelaPorownania
            tytul="Drukarki etykiet"
            kolumny={drukarkiKolumny}
            grupy={drukarkiGrupy}
            przypis="Wszystkie trzy drukują termotransferowo i termicznie, mają szerokość druku ok. 104–108 mm i obsługują język ZPL. Rozdzielczość 300 dpi jest dostępna jako opcja."
          />
          <TabelaPorownania
            tytul="Czytniki kodów kreskowych"
            kolumny={czytnikiKolumny}
            grupy={czytnikiGrupy}
            przypis="Zasięg dla typowego kodu kreskowego (13 mil). Odporność: klasa szczelności i wysokość upadku na beton."
          />
        </div>
      </section>

      {/* Footer */}
<Footer />
</div>
  );
}