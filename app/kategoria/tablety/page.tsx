"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Produkty w kategorii Tablety
const products = [
  {
    id: 1,
    name: "Samsung Galaxy Tab Active5",
    category: "Tablety",
    description: "Wzmocniony tablet do pracy w terenie — IP68, upadki z 1,8 m i wymienna bateria",
    specifications: "Android 14 (One UI 6), 8\" 1920 × 1200 120 Hz, Exynos 1380, 6/8 GB RAM, 128/256 GB + microSD, 5050 mAh (wymienna), IP68 i MIL-STD-810H, 5G, S Pen w zestawie",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "products/tab-active5-2.webp",
    badge: "Wzmocniony",
    featured: true,
    customUrl: "/produkt/samsung-galaxy-tab-active5"
  },
  {
    id: 2,
    name: "Apple iPad Pro 11\" (M4)",
    category: "Tablety",
    description: "Wersja Wi-Fi + Cellular z 2024 roku — ekran Ultra Retina XDR i chip M4",
    specifications: "iPadOS, 11\" Ultra Retina XDR (tandem OLED) 2420 × 1668, ProMotion 10–120 Hz, Apple M4, 8 lub 16 GB RAM, 256 GB – 2 TB, aparaty 12 Mpx, Wi-Fi 6E i 5G, Thunderbolt / USB 4, Face ID, 5,3 mm",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "products/ipad-pro-11-1.webp",
    badge: null,
    featured: true,
    customUrl: "/produkt/ipad-pro-11-m4-a2837"
  },
  {
    id: 3,
    name: "Apple iPad Pro 11\" (M5)",
    category: "Tablety",
    description: "Najnowsza wersja Wi-Fi + Cellular z 2025 roku — chip M5 i modem Apple C1X",
    specifications: "iPadOS 26, 11\" Ultra Retina XDR (tandem OLED) 2420 × 1668, ProMotion 10–120 Hz, Apple M5, 12 lub 16 GB RAM, 256 GB – 2 TB, aparaty 12 Mpx, Wi-Fi 7 i 5G (modem Apple C1X), Thunderbolt / USB 4, Face ID, 5,3 mm",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "products/ipad-pro-11-2.webp",
    badge: "Nowość",
    featured: true,
    customUrl: "/produkt/ipad-pro-11-m5-a3358"
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
            <a href="/#produkty" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <img src={ICON.chevronPrawo} alt="" className="h-4 w-4 mix-blend-multiply" />
            <span className="text-gray-900 font-medium">Tablety</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tablety</h1>
              <p className="text-gray-600">{filteredProducts.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Tablety do pracy w biurze nadleśnictwa i w terenie — od modeli wzmocnionych,
            odpornych na deszcz i upadki, po urządzenia do fotooptycznego pomiaru drewna.
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
                placeholder="Szukaj w tabletach..."
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

       {/* Footer */}
<Footer />
</div>
  );
}