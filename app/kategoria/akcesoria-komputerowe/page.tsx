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
  Package,
  ChevronRight,
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Eye,
  Heart,
  ArrowUpDown
} from "lucide-react";

// Placeholder produkty dla kategorii Akcesoria komputerowe
const products = [
  {
    id: 1,
    name: "Torba na laptop",
    category: "Akcesoria komputerowe",
    description: "Wytrzymała torba na laptopa z miejscem na dokumenty i akcesoria",
    specifications: "Do laptopów 15,6\", wodoodporna, wyściełane wnętrze",
    price: "150 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "torba_na_laptopa_15.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/torba-na-laptopa-15"
  },
  {
    id: 2,
    name: "Podkładka pod mysz",
    category: "Akcesoria komputerowe", 
    description: "Ergonomiczna podkładka pod mysz z podpórką nadgarstka",
    specifications: "Powierzchnia antypoślizgowa, wymiary 25x20cm",
    price: "45 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
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
    price: "120 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA", 
    image: "podnozek_biurowy_1.png",
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
    price: "650 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "ssd_t9_1.png", 
    badge: null,
    featured: true,
    customUrl: "/produkt/samsung-ssd-t9"
  },
  {
    id: 5,
    name: "Samsung SSD T7 3.2TB",
    category: "Akcesoria komputerowe",
    description: "Pojemny zewnętrzny dysk SSD z zabezpieczeniem hasłem",
    specifications: "Pojemność 3.2TB, USB-C, szybkość do 1050 MB/s",
    price: "1 850 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "ssd_t7_1.png",
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
    price: "550 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "ms365_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/ms-365"
  },
  {
    id: 7,
    name: "Klawiatura i mysz bezprzewodowa Dell KM5221",
    category: "Akcesoria komputerowe",
    description: "Bezprzewodowy zestaw klawiatura + mysz z długą żywotnością baterii",
    specifications: "Połączenie USB, zasięg do 10m, cicha praca",
    price: "180 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "km5221_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/dell-km5221"
  },
  {
    id: 8,
    name: "Klawiatura i mysz bezprzewodowa Dell KM7321",
    category: "Akcesoria komputerowe",
    description: "Premium zestaw bezprzewodowy z podświetleniem klawiszy",
    specifications: "Bluetooth + USB, wielozadaniowość, aluminiowa obudowa",
    price: "320 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "km7321_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/dell-km7321"
  },
  {
    id: 9,
    name: "Klawiatura i mysz bezprzewodowa HP 655",
    category: "Akcesoria komputerowe",
    description: "Ergonomiczny zestaw klawiatura + mysz dla komfortowej pracy",
    specifications: "Połączenie USB, cicha klawiatura, optyczna mysz 1600 DPI",
    price: "140 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
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
    price: "450 PLN",
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
    specifications: "1000 VA / 600 W, 230V, bateria VRLA 2x7Ah 12V, 3x Schuko + 3x C13",
    price: "650 PLN",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "vertin_1000_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/vertin-1000"
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
            <a href="/kategoria/akcesoria-komputerowe" className="text-gray-600 hover:text-emerald-600">Produkty</a>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">Akcesoria komputerowe</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Package className="h-8 w-8 text-emerald-600" />
            </div>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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