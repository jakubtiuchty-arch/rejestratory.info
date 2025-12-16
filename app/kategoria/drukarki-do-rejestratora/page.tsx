"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Search, 
  ShoppingCart, 
  Shield, 
  Truck, 
  Headphones, 
  Phone,
  Mail,
  MapPin,
  Vibrate,
  Smartphone,
  TreePine,
  Trees,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Eye,
  Heart,
  ArrowUpDown,
  Printer
} from "lucide-react";

// Placeholder produkty dla kategorii Drukarki do rejestratora
const products = [
  {
    id: 1,
    name: "Zebra ZQ521",
    category: "Drukarki do rejestratora",
    description: "Mobilna drukarka termiczna o szerokości druku 112 mm, idealna do pracy terenowej w lesie.",
    price: "2 100 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, ZPUH Olsztyn, ZSLP Stargard, TAKMA",
    image: "zq521_1.png",
    badge: "Bestseller",
    featured: false,
    customUrl: "/produkt/zebra-zq521"
  },
  {
    id: 2,
    name: "Sewoo LK-P43",
    category: "Drukarki do rejestratora", 
    description: "Kompaktowa drukarka mobilna 4-calowa z długą żywotnością baterii i łączą Bluetooth.",
    price: "1 800 PLN",
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
    price: "2 400 PLN",
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
    description: "Lekka i kompaktowa drukarka mobilna z obsługą WiFi i Bluetooth oraz długim czasem pracy.",
    price: "1 900 PLN",
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
    price: "1 700 PLN",
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
    description: "Profesjonalna drukarka mobilna z obsługą NFC, Bluetooth 5.0 i długim czasem pracy na baterii.",
    price: "2 200 PLN",
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
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        case "price-desc":
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
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
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <a href="/#produkty" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Drukarki do rejestratora</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Printer className="h-8 w-8 text-emerald-600" />
            </div>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
                <Filter className="h-4 w-4" />
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
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-emerald-600 text-white" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  <List className="h-4 w-4" />
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
                <Search className="h-12 w-12 text-gray-400" />
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
      {/* Footer */}
<Footer />
</div>
  );
}