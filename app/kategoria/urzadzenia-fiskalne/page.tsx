"use client";
import React from "react";
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
  Laptop,
  Printer,
  Monitor,
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
  FileText,
  Calendar,
  CheckCircle2
} from "lucide-react";

// Produkty dla kategorii Urządzenia fiskalne
const products = [
  {
    id: 1,
    name: "Posnet Pospay 2",
    category: "Urządzenia fiskalne",
    description: "Fiskalny terminal płatniczy",
    specifications: "Płatność kartą, BLIK, kompatybilny z Leśnik+",
    price: "2 100 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "/pospay_3.png",
    badge: "Terminal",
    featured: true,
    link: "/produkt/posnet-pospay-2"
  },
  {
    id: 2,
    name: "Posnet Temo Online",
    category: "Urządzenia fiskalne",
    description: "Mobilna kasa fiskalna online do rozliczeń w terenie",
    specifications: "Online, bateria 8h, Bluetooth, Wi-Fi, drukarka termiczna 58mm",
    price: "1 450 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/temo_online_1.png",
    badge: "Bestseller",
    featured: true,
    link: "/produkt/posnet-temo-online"
  },
  {
    id: 3,
    name: "Panel Klienta",
    category: "Urządzenia fiskalne",
    description: "Sprawdź status swoich urządzeń i historię przeglądów",
    specifications: "Dostęp do protokołów, terminów przeglądów i statusu urządzeń",
    price: "",
    availability: "Dostępny",
    whereToBuy: "",
    image: "",
    badge: "Nowość",
    featured: true,
    link: "/panel-klienta",
    isDashboard: true
  }
];

// Opcje filtrowania i sortowania
const sortOptions = [
  { value: "default", label: "Domyślne" },
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
    if (sortBy !== "default") {
      filtered.sort((a, b) => {
        switch (sortBy) {
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
    }

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
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <a href="/#produkty" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Urządzenia fiskalne</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Monitor className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Urządzenia fiskalne</h1>
              <p className="text-gray-600">{products.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Profesjonalne urządzenia fiskalne Posnet dla urzędów leśnych. 
            Kasy fiskalne online i stacjonarne z terminalami płatniczymi do rozliczeń administracyjnych.
          </p>
        </div>
      </section>

      {/* Filtry i wyszukiwarka */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Wyszukiwarka po lewej */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj w urządzeniach fiskalnych..."
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
                    viewMode === "list" ? "flex gap-6" : "flex flex-col"
                  }`}
                >
                  {/* Obrazek lub grafika dla Panelu Klienta */}
                  {product.isDashboard ? (
                    <div className={`relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"} flex items-center justify-center p-8`}>
                      <div className="text-center">
                        <div className="grid grid-cols-3 gap-3">
                          <motion.div
                            className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [0.95, 1.05, 0.95]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0
                            }}
                          >
                            <FileText className="h-8 w-8 text-white/90 mx-auto" />
                          </motion.div>
                          <motion.div
                            className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [0.95, 1.05, 0.95]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.4
                            }}
                          >
                            <Calendar className="h-8 w-8 text-white/90 mx-auto" />
                          </motion.div>
                          <motion.div
                            className="bg-white/20 backdrop-blur-sm rounded-lg p-3"
                            animate={{
                              opacity: [0.5, 1, 0.5],
                              scale: [0.95, 1.05, 0.95]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: 0.8
                            }}
                          >
                            <CheckCircle2 className="h-8 w-8 text-white/90 mx-auto" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`relative border-b border-gray-200 ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/* Treść */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <p className="text-sm text-gray-500 mb-4">{product.specifications}</p>
                    
                    {!product.isDashboard && (
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm text-gray-500">
                            {product.availability} • {product.whereToBuy}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 mt-auto">
                      <a
                        href={product.link}
                        className={`flex-1 ${
                          product.isDashboard
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        } text-white px-4 py-2 rounded-lg font-medium transition-colors text-center`}
                      >
                        {product.isDashboard ? (
                          <>
                            <Eye className="h-4 w-4 inline mr-2" />
                            Przejdź do panelu
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4 inline mr-2" />
                            Zobacz produkt
                          </>
                        )}
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