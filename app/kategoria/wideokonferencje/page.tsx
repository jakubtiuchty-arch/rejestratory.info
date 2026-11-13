"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TabelaPorownania from '@/components/TabelaPorownania'
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Sprzęt do sal narad z umowy ZUP Łódź NH.271.51.2026 z 02.11.2026. Parametry od Logitecha
// (logitech.com, datasheety, Logitech Sync Hub), sprawdzone 13.11.2026.
const products = [
  {
    id: 1,
    name: "Logitech Rally Bar",
    category: "Wideokonferencje",
    description: "Wideobar do średnich i dużych sal — kamera, mikrofony i głośniki w jednej belce.",
    specifications: "Kamera 4K PTZ, zoom 15×, 6 mikrofonów (7 m), 2 głośniki, Teams, Zoom, Google Meet",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "rallybar_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/logitech-rally-bar"
  },
  {
    id: 2,
    name: "Logitech Rally Plus",
    category: "Wideokonferencje",
    description: "Modułowy system do dużych sal z projektorem — kamera, 2 głośniki i 2 panele mikrofonowe.",
    specifications: "Kamera 4K PTZ, zoom 15×, mikrofony do 7 paneli, do 46 osób, USB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "rallyplus_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/logitech-rally-plus"
  },
  {
    id: 3,
    name: "Logitech Rally Board 65",
    category: "Wideokonferencje",
    description: "Ekran dotykowy 65″ z wbudowaną kamerą, mikrofonami i głośnikami.",
    specifications: "65″ 4K UHD, dotyk 20 punktów, kamera 4K 1″, Teams, Zoom, Google Meet",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "rallyboard65_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/logitech-rally-board-65"
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

// Porównanie pod kafelkami — tylko to, czym zestawy się różnią (dane od Logitecha, 13.11.2026).
const porownanieKolumny = [
  { klucz: 'typ', naglowek: 'Rodzaj' },
  { klucz: 'ekran', naglowek: 'Ekran' },
  { klucz: 'kamera', naglowek: 'Kamera' },
  { klucz: 'praca', naglowek: 'Praca bez komputera' },
]

const porownanieGrupy = [
  {
    wiersze: [
      { model: 'Rally Bar', href: '/produkt/logitech-rally-bar', wartosci: { typ: 'wideobar pod telewizor', ekran: 'własny telewizor', kamera: '4K PTZ, zoom 15×', praca: 'tak — Teams, Zoom, Meet' }, naj: ['kamera'] },
      { model: 'Rally Plus', href: '/produkt/logitech-rally-plus', wartosci: { typ: 'system modułowy', ekran: 'własny ekran lub projektor', kamera: '4K PTZ, zoom 15×', praca: 'nie — komputer lub laptop przez USB' }, naj: ['kamera'] },
      { model: 'Rally Board 65', href: '/produkt/logitech-rally-board-65', wartosci: { typ: 'ekran z kamerą', ekran: '65″ 4K, dotykowy', kamera: '4K, zoom cyfrowy 4×', praca: 'tak — Teams, Zoom, Meet' }, naj: ['ekran'] },
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

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-emerald-600">Strona główna</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <a href="/#produkty" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <span className="text-gray-900 font-medium">Wideokonferencje</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wideokonferencje</h1>
              <p className="text-gray-600">{filteredProducts.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Sprzęt do sal narad w nadleśnictwach: wideobar, system modułowy z projektorem i ekran dotykowy z kamerą. Wszystkie pracują z Microsoft Teams, Zoom i Google Meet, a ZUP Łódź kupuje je w umowie z TAKMA.
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
                placeholder="Szukaj w wideokonferencjach..."
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
            Wszystkie trzy mają certyfikaty Microsoft Teams, Zoom i Google Meet oraz zdalne zarządzanie Logitech Sync. Poniższe zestawienie przedstawia różnice między nimi.
          </p>
          <TabelaPorownania kolumny={porownanieKolumny} grupy={porownanieGrupy} przypis="Praca bez komputera wymaga licencji platformy (Microsoft Teams Rooms, Zoom Rooms lub Google Meet), kupowanej osobno." />
        </div>
      </section>

       {/* Footer */}
<Footer />
</div>
  );
}