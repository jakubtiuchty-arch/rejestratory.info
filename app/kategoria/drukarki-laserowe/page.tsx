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
  TreePine,
  Trees,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Eye,
  Heart,
  ArrowUpDown
} from "lucide-react";

// Placeholder produkty dla kategorii Drukarki laserowe
const products = [
  {
    id: 1,
    name: "Brother HL-L6410",
    category: "Drukarki laserowe",
    description: "Wydajna drukarka laserowa monochromatyczna dla biur średniej wielkości",
    specifications: "Drukarka laserowa, A4, 50 ppm, duplex, USB, Ethernet",
    price: "1 800 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/hll6410ph.png",
    featured: true,
    link: "/produkt/brother-hl-l6410"
  },
  {
    id: 2,
    name: "Brother DCP-B7620DW",
    category: "Drukarki laserowe", 
    description: "Kompaktowa drukarka 3w1 z funkcją skanowania i kopiowania - idealna do stanowiska leśniczego",
    specifications: "Drukarka laserowa, skaner, kopiarka, A4, 34 ppm, Wi-Fi, duplex",
    price: "1 200 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/dcpb75620dwph.png",
    featured: true,
    link: "/produkt/brother-dcp-b7620dw"
  },
  {
    id: 3,
    name: "Brother HL-L6210DW",
    category: "Drukarki laserowe",
    description: "Profesjonalna drukarka laserowa z bezprzewodowym połączeniem Wi-Fi",
    specifications: "Drukarka laserowa, A4, 48 ppm, Wi-Fi, duplex, USB, Ethernet",
    price: "1 600 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA", 
    image: "/hll6210dwph.png",
    featured: true,
    link: "/produkt/brother-hl-l6210dw"
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
            <span className="text-gray-900 font-medium">Drukarki laserowe</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Drukarki laserowe</h1>
              <p className="text-gray-600">{products.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Profesjonalne drukarki laserowe dostosowane do potrzeb pracowników leśnictwa. 
            Szybkie i wydajne urządzenia do druku dokumentów z niskimi kosztami eksploatacji i wysoką jakością wydruku.
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
                placeholder="Szukaj w drukarkach laserowych..."
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
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch" : "space-y-4"}>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    viewMode === "list" ? "flex gap-6" : "flex flex-col h-full"
                  }`}
                >
                  {/* Obrazek */}
                  <div className={`relative border-b border-gray-200 ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
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
                        href={product.link}
                        className="w-full block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                      >
                        <ShoppingCart className="h-4 w-4 inline mr-2" />
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