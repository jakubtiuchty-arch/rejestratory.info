"use client";
import React from "react";
import { motion } from "framer-motion";
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
  ArrowUpDown
} from "lucide-react";

// Placeholder produkty dla kategorii Monitory
const products = [
  {
    id: 1,
    name: "HP Pro S5 QHD USB-C 527pu",
    category: "Monitory",
    description: "Profesjonalny monitor QHD 27 cali do pracy biurowej",
    specifications: "27\" QHD 2560x1440, IPS, 75Hz, HDMI, DisplayPort, USB-A",
    price: "1 400 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź",
    image: "/527pu_1.png",
    badge: null,
    featured: true,
    link: "/produkt/hp-seria-5-pro-527pu"
  },
  {
    id: 2,
    name: "HP Pro S5 QHD 527pq",
    category: "Monitory", 
    description: "Monitor QHD 27 cali z zaawansowanymi funkcjami zarządzania",
    specifications: "27\" QHD 2560x1440, IPS, 75Hz, HDMI, DisplayPort, USB-C, pivot",
    price: "1 600 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź",
    image: "/527pq_1.png",
    badge: null,
    featured: true,
    link: "/produkt/hp-seria-5-pro-527pq"
  },
  {
    id: 3,
    name: "Dell Pro 24 Plus P2425HE z USBC",
    category: "Monitory",
    description: "Monitor biznesowy 24 cale z ładowaniem USB-C do laptopów",
    specifications: "24\" FHD 1920x1080, IPS, 60Hz, HDMI, DisplayPort, USB-C 90W",
    price: "1 200 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź", 
    image: "/P2425HE_1.png",
    imageScale: 0.8,
    badge: "USB-C",
    featured: true,
    link: "/produkt/dell-pro-24-plus-p2425he-usbc"
  },
  {
    id: 4,
    name: "Dell Pro 24 Plus P2425HE",
    category: "Monitory",
    description: "Kompaktowy monitor biznesowy 24 cale do codziennej pracy",
    specifications: "24\" FHD 1920x1080, IPS, 60Hz, HDMI, DisplayPort, USB-A",
    price: "1 000 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź",
    image: "/P2425HE_1.png",
    imageScale: 0.8,
    badge: null,
    featured: false,
    link: "/produkt/dell-pro-24-plus-p2425he"
  },
  {
    id: 5,
    name: "Dell Pro 27 Plus P2725HE z USBC",
    category: "Monitory",
    description: "Duży monitor 27 cali z ładowaniem USB-C i wysoką rozdzielczością",
    specifications: "27\" QHD 2560x1440, IPS, 60Hz, HDMI, DisplayPort, USB-C 90W",
    price: "1 800 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź",
    image: "/P2425HE_1.png",
    imageScale: 0.8,
    badge: "USB-C",
    featured: true,
    link: "/produkt/dell-pro-27-plus-p2725he-usbc"
  },
  {
    id: 6,
    name: "Dell Pro 27 Plus P2725HE",
    category: "Monitory",
    description: "Profesjonalny monitor 27 cali QHD do zastosowań biurowych",
    specifications: "27\" QHD 2560x1440, IPS, 60Hz, HDMI, DisplayPort, USB-A",
    price: "1 500 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź",
    image: "/P2425HE_1.png",
    imageScale: 0.8,
    badge: null,
    featured: false,
    link: "/produkt/dell-pro-27-plus-p2725he"
  },
  {
    id: 7,
    name: "Dell Pro 24 P2424HEB",
    category: "Monitory",
    description: "Ergonomiczny monitor 24 cale z regulacją wysokości",
    specifications: "24\" FHD 1920x1080, IPS, 60Hz, HDMI, DisplayPort, regulowana podstawa",
    price: "1 100 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź",
    image: "/P2424HEB_1.png",
    imageScale: 0.8,
    badge: null,
    featured: true,
    link: "/produkt/dell-pro-24-plus-p2424heb"
  },
  {
    id: 8,
    name: "Dell Pro 27 P2724HEB",
    category: "Monitory",
    description: "Ergonomiczny monitor 27 cali z pełną regulacją i pivot",
    specifications: "27\" FHD 1920x1080, IPS, 75Hz, HDMI, DisplayPort, regulowana podstawa",
    price: "1 300 PLN",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź",
    image: "/P2424HEB_1.png",
    imageScale: 0.8,
    badge: null,
    featured: true,
    link: "/produkt/dell-pro-27-plus-p2724heb"
  },
  {
    id: 9,
    name: "HP S3 Pro 324pv",
    category: "Monitory",
    description: "Monitor biznesowy 24 cale z funkcją pivot i regulacją wysokości",
    specifications: "24\" FHD 1920x1080, IPS, 75Hz, HDMI, DisplayPort, VGA, pivot",
    price: "",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź",
    image: "/hp_series_1.png",
    imageScale: 0.8,
    badge: null,
    featured: true,
    link: "/produkt/hp-seria-3-pro-324pv"
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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo.png" alt="Rejestartory.info" className="h-8 w-auto" />
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
            <span className="text-gray-900 font-medium">Monitory</span>
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
              <h1 className="text-3xl font-bold text-gray-900">Monitory</h1>
              <p className="text-gray-600">{products.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Profesjonalne monitory dostosowane do potrzeb pracowników leśnictwa. 
            Wysokiej jakości ekrany do pracy biurowej z różnymi przekątnymi i rozdzielczościami oraz złączami USB-C do laptopów.
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
                placeholder="Szukaj w monitorach..."
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
                    viewMode === "list" ? "flex gap-6" : ""
                  }`}
                >
                  {/* Obrazek */}
                  <div className={`relative border-b border-gray-200 ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"}`}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-contain p-4" 
                      style={product.imageScale ? { transform: `scale(${product.imageScale})` } : undefined}
                    />
                    {product.badge && (
                      <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
                        product.badge === "Bestseller" ? "bg-emerald-100 text-emerald-800" :
                        product.badge === "Nowość" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Treść */}
                  <div className="p-6 flex-1">
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

                    <div className="flex gap-2">
                      {product.link ? (
                        <a 
                          href={product.link}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                        >
                          Zobacz produkt
                        </a>
                      ) : (
                        <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                          Zobacz produkt
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <img src="/rejestratory_logo.png" alt="Rejestartory.info" className="h-8 w-auto" />
                </div>
              </div>
              <div className="text-gray-400">
                <div>Administratorem serwisu</div>
                <div>Rejestratory.info,</div>
                <div>jest firma TAKMA</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produkty</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Rejestratory</a></li>
                <li><a href="#" className="hover:text-white">Telefony</a></li>
                <li><a href="#" className="hover:text-white">Laptopy</a></li>
                <li><a href="#" className="hover:text-white">Drukarki</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Firma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">O nas</a></li>
                <li><a href="#" className="hover:text-white">Serwis</a></li>
                <li><a href="#" className="hover:text-white">Kontakt</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>71 781 71 28</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>takma@takma.com.pl</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Wrocław, Poświęcka 1a, 51-128 Wrocław</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Rejestratory.info. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}