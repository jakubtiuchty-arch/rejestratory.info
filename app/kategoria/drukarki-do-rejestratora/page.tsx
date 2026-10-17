"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TabelaPorownania from '@/components/TabelaPorownania'
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Placeholder produkty dla kategorii Drukarki do rejestratora
const products = [
  {
    id: 1,
    name: "Zebra ZQ521",
    category: "Drukarki do rejestratora",
    description: "Mobilna drukarka termiczna z szerokością druku 104 mm, idealna do pracy terenowej w lesie.",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, ZPUH Olsztyn, ZSLP Stargard, TAKMA",
    image: "zq521_1.png",
    badge: "Bestseller",
    featured: false,
    customUrl: "/produkt/zebra-zq521"
  },
  {
    id: 2,
    name: "Sewoo LK-P43II",
    category: "Drukarki do rejestratora", 
    description: "Drukarka mobilna 4-calowa z Bluetooth, portem RS-232 i kolorowym wyświetlaczem.",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, ZPUH Olsztyn, TAKMA",
    image: "lkp43_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/sewoo-lkp43"
  },
  {
    id: 3,
    name: "Honeywell RP4",
    category: "Drukarki do rejestratora",
    description: "Wytrzymała drukarka mobilna 4-calowa z certyfikatem IP54, odporna na upadki i trudne warunki.",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA", 
    image: "rp4_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/honeywell-rp4"
  },
  {
    id: 4,
    name: "Seiko MP-A40",
    category: "Drukarki do rejestratora",
    description: "Lekka i kompaktowa drukarka mobilna 4-calowa z Bluetooth.",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "mpa40_1.png", 
    badge: null,
    featured: true,
    customUrl: "/produkt/seiko-mpa40"
  },
  {
    id: 5,
    name: "Sewoo LK-P400",
    category: "Drukarki do rejestratora",
    description: "Wydajna drukarka mobilna 4-calowa z szybkim drukiem i obsługą różnych systemów operacyjnych.",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "lkp400_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/sewoo-lkp400"
  },
  {
    id: 6,
    name: "Bixolon SPP-R410",
    category: "Drukarki do rejestratora",
    description: "Najlżejsza w zestawieniu drukarka mobilna 4-calowa z Bluetooth i parowaniem przez NFC.",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "sppr410_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/bixolon-sppr410"
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

// Porównanie pod kafelkami — tylko to, czym drukarki się różnią. Dane od producentów
// (zebra.com, honeywell, miniprinter.com, sii.co.jp, bixolon.com), sprawdzone 17.10.2026.
const porownanieKolumny = [
  { klucz: 'waga', naglowek: 'Waga' },
  { klucz: 'predkosc', naglowek: 'Prędkość druku' },
  { klucz: 'aku', naglowek: 'Akumulator' },
  { klucz: 'teren', naglowek: 'Praca od · upadek' },
  { klucz: 'lacznosc', naglowek: 'Łączność' },
  { klucz: 'jezyki', naglowek: 'Języki drukarki' },
]

const porownanieGrupy = [
  {
    wiersze: [
      { model: 'Zebra ZQ521', href: '/produkt/zebra-zq521', wartosci: { waga: '0,79 kg', predkosc: '127 mm/s', aku: '3250 mAh (opcja 6500)', teren: '−20 °C · 2 m', lacznosc: 'Bluetooth 4.1 · NFC', jezyki: 'CPCL, ZPL' } },
      { model: 'Honeywell RP4', href: '/produkt/honeywell-rp4', wartosci: { waga: '1,02 kg', predkosc: '127 mm/s', aku: '4900 mAh', teren: '−20 °C · 2 m', lacznosc: 'Bluetooth 5.0 · NFC', jezyki: 'CPCL, ZPL (emulacja)' }, naj: ['aku'] },
      { model: 'Sewoo LK-P43II', href: '/produkt/sewoo-lkp43', wartosci: { waga: '1,0 kg', predkosc: '100 mm/s', aku: '3350 mAh (opcja 6700)', teren: '−21 °C · 1,8 m', lacznosc: 'Bluetooth 4.2', jezyki: 'ESC/POS, CPCL, ZPL' } },
      { model: 'Seiko MP-A40', href: '/produkt/seiko-mpa40', wartosci: { waga: '0,76 kg', predkosc: '105 mm/s', aku: '1950 mAh', teren: '−20 °C · 2 m', lacznosc: 'Bluetooth 4.1', jezyki: 'ESC/POS, CPCL' }, slabe: ['aku'] },
      { model: 'Sewoo LK-P400', href: '/produkt/sewoo-lkp400', wartosci: { waga: '0,84 kg', predkosc: '127 mm/s', aku: '2500 mAh (opcja 5000)', teren: '−20 °C · 2 m', lacznosc: 'Bluetooth 4.2 · Wi-Fi · NFC', jezyki: 'ESC/POS, CPCL, ZPL' }, naj: ['lacznosc'] },
      { model: 'Bixolon SPP-R410', href: '/produkt/bixolon-sppr410', wartosci: { waga: '0,53 kg', predkosc: '90 mm/s', aku: '3200 mAh', teren: '−15 °C · 1,8 m', lacznosc: 'Bluetooth 4.1 · NFC', jezyki: 'ESC/POS' }, naj: ['waga'], slabe: ['teren'] },
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
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-emerald-600">Strona główna</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <a href="/#produkty" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <span className="text-gray-900 font-medium">Drukarki do rejestratora</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Drukarki do rejestratora</h1>
              <p className="text-gray-600">{filteredProducts.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Mobilne drukarki termiczne przeznaczone do współpracy z rejestratorami danych i terminalami mobilnymi. Wytrzymałe urządzenia zaprojektowane do pracy w trudnych warunkach terenowych.
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
                placeholder="Szukaj w drukarkach..."
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
                  <div className={`relative border-b border-gray-200 ${viewMode === "list" ? "w-44 flex-shrink-0 p-3" : "aspect-square p-5"}`}>
                    {product.badge && (
                      <div className="absolute top-2 left-2 bg-orange-100 text-orange-700 px-3 py-1 rounded text-xs font-semibold z-10">
                        {product.badge}
                      </div>
                    )}
                    <div className="relative w-full h-full" style={product.image === "sppr410_1.png" ? { transform: "scale(0.85)" } : {}}>
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
      {/* Porównanie — tylko różnice */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">Który wybrać?</h2>
          <p className="mt-1 text-gray-600">
            Wszystkie modele drukują na papierze do 112 mm (szerokość druku 104 mm) w rozdzielczości 203 dpi, mają klasę szczelności IP54 i wymienny akumulator. Poniższe zestawienie przedstawia różnice między nimi według danych producentów.
          </p>
          <TabelaPorownania kolumny={porownanieKolumny} grupy={porownanieGrupy} przypis="Waga z akumulatorem standardowym. Praca od: dolna granica temperatury pracy; upadek na beton. Prędkość maksymalna według producenta." />
        </div>
      </section>

      {/* Footer */}
<Footer />
</div>
  );
}