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

// Placeholder produkty dla kategorii Rejestratory
const products = [
  {
    id: 1,
    name: "Zebra EM45",
    category: "Rejestratory",
    description: "To nie tylko zwykły smartfon!",
    specifications: "Android 14, 6,7'' FHD+, 8GB RAM, Snapdragon 2,2 GHz",
    price: "Cena na zapytanie",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/em45_1.webp",
    badges: ["Bestseller", "Nowość"],
    featured: true
  },
  {
    id: 2,
    name: "Zebra TC27",
    category: "Rejestratory", 
    description: "Wytrzymały terminal mobilny do pracy w trudnych warunkach",
    specifications: "Android 14, 6\" FHD, Qualcomm 2,2 GHz, 4GB RAM",
    price: "4 200 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/tc27_1.png",
    badges: [],
    featured: false
  },
  {
    id: 3,
    name: "Zebra TC58e",
    category: "Rejestratory",
    description: "Zaawansowany terminal do najtrudniejszych warunków terenowych",
    specifications: "Android 14, 6\" FHD+, Snapdragon 6490, 8GB RAM",
    price: "5 100 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/tc58_1.png", 
    badges: [],
    featured: false
  },
  {
    id: 4,
    name: "Honeywell CT47",
    category: "Rejestratory",
    description: "Mobilny komputer 5G z najwyższej półki do zastosowań terenowych",
    specifications: "Android 13, 5,5\" FHD, Snapdragon 6490, 6GB RAM",
    price: "5 300 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/ct47_1.png",
    badges: [],
    featured: true
  },
  {
    id: 5,
    name: "Unitech EA660",
    category: "Rejestratory",
    description: "Wszechstronny komputer mobilny z wydajnymi podzespołami",
    specifications: "Android 12, 6\" FHD+, Snapdragon 662, 6GB RAM",
    price: "4 600 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/ea660_1.png",
    badges: [],
    featured: true
  },
  {
    id: 6,
    name: "Unitech PA768",
    category: "Rejestratory",
    description: "Profesjonalny terminal przemysłowy z zaawansowanymi funkcjami",
    specifications: "Android 12, 6,45\" FHD+, Snapdragon 660, 4GB RAM",
    price: "4 900 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/pa768_1.png",
    badges: [],
    featured: false
  },
  {
    id: 7,
    name: "Honeywell EDA52",
    category: "Rejestratory",
    description: "Kompaktowy komputer mobilny idealny dla leśników",
    specifications: "Android 13, 5,5\" HD+, Snapdragon 2,0 GHz, 4GB RAM",
    price: "3 800 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA, ZPUH Olsztyn", 
    image: "/eda52_1.png",
    badges: [],
    featured: true
  },
  {
    id: 8,
    name: "Honeywell CT40XP",
    category: "Rejestratory",
    description: "Ekstremalnie wytrzymały terminal do najtrudniejszych zadań",
    specifications: "Android 12, 5\" HD, Snapdragon 662, 4GB RAM",
    price: "3 900 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/ct40xp_1.png",
    badges: [],
    featured: false
  },
  {
    id: 9,
    name: "Honeywell CT30P",
    category: "Rejestratory",
    description: "Lekki i wytrzymały terminal z długą żywotnością baterii",
    specifications: "Android 13, 5,5\" FHD, Snapdragon 662, 4GB RAM",
    price: "3 400 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/ct30p_1.png",
    badges: [],
    featured: false,
    customUrl: "/produkt/honeywell-ct30"
  },
  {
    id: 10,
    name: "M3 SL20+",
    category: "Rejestratory",
    description: "Ekonomiczne rozwiązanie dla mniej wymagających",
    specifications: "Android 12, 8\" WXGA, MSM8953 2,2 GHz, 4GB RAM",
    price: "4 700 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/sl20_1.png",
    badges: [],
    featured: false,
    customUrl: "/produkt/m3-sl20"
  }
];

// Opcje filtrowania i sortowania
const sortOptions = [
  { value: "default", label: "Domyślna kolejność" },
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
          return a.id - b.id; // Sortowanie według id zachowuje oryginalną kolejność
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
      {/* STARY_HEADER_START
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </div>
            
            <div className="flex items-center gap-8">
              <ul className="hidden md:flex items-center gap-8">
                <li><a href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</a></li>
                <li><a href="/#produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</a></li>
                <li><a href="/serwis" className="text-gray-700 hover:text-emerald-600 transition-colors">Serwis</a></li>
                <li><a href="/kontakt" className="text-gray-700 hover:text-emerald-600 transition-colors">Kontakt</a></li>
              </ul>
              
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Zapytanie (0)
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-gray-600 hover:text-emerald-600">Strona główna</a>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <a href="/#produkty" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Rejestratory</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Vibrate className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Rejestratory</h1>
              <p className="text-gray-600">{filteredProducts.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Profesjonalne rejestratory terenowe dostosowane do pracy w trudnych warunkach leśnych. 
            Urządzenia odporne na deszcz, błoto i upadki z długą żywotnością baterii i wbudowanymi skenerami kodów.
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
                placeholder="Szukaj w rejestratorach..."
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
                  <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"} border-b border-gray-200`}>
                    <div className="h-full flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={product.image === '/em45_1.webp' ? "object-contain" : "object-contain p-4"}
                        style={{ 
                          width: product.image === '/em45_1.webp' ? '86%' : '82%',
                          height: product.image === '/em45_1.webp' ? '86%' : '82%'
                        }}
                      />
                    </div>
                    {product.badges && product.badges.length > 0 && (
                      <div className="absolute top-3 left-3 flex flex-row gap-2">
                        {product.badges.map((badge, index) => (
                          <span 
                            key={index}
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              badge === "Bestseller" ? "bg-emerald-100 text-emerald-800" :
                              badge === "Nowość" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
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