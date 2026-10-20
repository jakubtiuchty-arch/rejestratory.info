"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Placeholder produkty dla kategorii Drukarki laserowe
const products = [
  {
    id: 1,
    name: "Brother HL-L6410",
    category: "Drukarki laserowe",
    description: "Wydajna drukarka laserowa monochromatyczna dla biur średniej wielkości",
    specifications: "Drukarka laserowa, A4, 50 ppm, duplex, USB, Ethernet, PCL6",
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
    specifications: "Drukarka laserowa, skaner, kopiarka, A4, 34 ppm, Wi-Fi, duplex, PCL6",
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
    specifications: "Drukarka laserowa, A4, 48 ppm, Wi-Fi, duplex, USB, Ethernet, PCL6",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA", 
    image: "/hll6210dwph.png",
    featured: true,
    link: "/produkt/brother-hl-l6210dw"
  }
];

// Porównanie pod kafelkami — tylko to, czym modele się różnią. Wspólne cechy
// (czerń, A4, automatyczny druk dwustronny, LAN) stoją raz w nagłówku. Dane z kart
// produktu i store.brother.pl (17.10.2026). `naj` = wartość wyróżniona w kolumnie.
type Wiersz = {
  model: string
  href: string
  funkcje: string
  druk: string
  papier: string
  wolumen: string
  wifi: string
  ekran: string
  naj?: Array<'funkcje' | 'druk' | 'papier' | 'wolumen' | 'ekran'>
}

const porownanie: Wiersz[] = [
  { model: 'DCP-B7620DW', href: '/produkt/brother-dcp-b7620dw', funkcje: 'druk, skan, kopia', druk: '34 str./min', papier: '250 ark.', wolumen: 'do 2 500 str.', wifi: 'tak', ekran: 'LCD 2-wierszowy', naj: ['funkcje'] },
  { model: 'HL-L6210DW', href: '/produkt/brother-hl-l6210dw', funkcje: 'tylko druk', druk: '50 str./min', papier: '520 + 100 ark.', wolumen: 'do 8 000 str.', wifi: 'tak', ekran: 'LCD 1-wierszowy', naj: ['druk', 'papier'] },
  { model: 'HL-L6410', href: '/produkt/brother-hl-l6410', funkcje: 'tylko druk', druk: '50 str./min', papier: '520 + 100 ark.', wolumen: 'do 16 000 str.', wifi: 'opcja', ekran: 'dotykowy 8,9 cm', naj: ['druk', 'papier', 'wolumen', 'ekran'] },
]

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
            <span className="text-gray-900 font-medium">Drukarki laserowe</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Drukarki laserowe</h1>
              <p className="text-gray-600">{products.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Profesjonalne drukarki laserowe dostosowane do potrzeb pracowników leśnictwa. 
            Szybkie i wydajne urządzenia do druku dokumentów z niskimi kosztami eksploatacji i wysoką jakością wydruku.
          </p>
          <p className="mt-3 max-w-3xl text-gray-900">
            Wszystkie modele obsługują języki druku <strong>PCL6</strong>, BR-Script3 i&nbsp;PDF&nbsp;1.7.
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
                        <img src={ICON.zamowienie} alt="" className="h-4 w-4 inline mr-2 mix-blend-multiply" />
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
            Wszystkie modele to monochromatyczne drukarki laserowe formatu A4 z automatycznym drukiem dwustronnym i interfejsem sieciowym LAN. Poniższe zestawienie przedstawia różnice między nimi.
          </p>

          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="w-full min-w-[680px] whitespace-nowrap text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="sticky left-0 bg-white px-4 py-3 font-medium">Model</th>
                  <th className="px-4 py-3 font-medium">Funkcje</th>
                  <th className="px-4 py-3 font-medium">Druk</th>
                  <th className="px-4 py-3 font-medium">Podajnik papieru</th>
                  <th className="px-4 py-3 font-medium">Zalecane miesięcznie</th>
                  <th className="px-4 py-3 font-medium">Wi-Fi</th>
                  <th className="px-4 py-3 font-medium">Ekran</th>
                </tr>
              </thead>
              <tbody>
                {porownanie.map((w) => {
                  const kom = (k: 'funkcje' | 'druk' | 'papier' | 'wolumen' | 'ekran') =>
                    w.naj?.includes(k) ? 'font-semibold text-emerald-700' : 'text-gray-700'
                  return (
                    <tr key={w.model} className="border-t border-gray-100 first:border-t-0">
                      <td className="sticky left-0 bg-white px-4 py-3 font-medium">
                        <a href={w.href} className="text-gray-900 hover:text-emerald-700">
                          {w.model}
                        </a>
                      </td>
                      <td className={`px-4 py-3 ${kom('funkcje')}`}>{w.funkcje}</td>
                      <td className={`px-4 py-3 ${kom('druk')}`}>{w.druk}</td>
                      <td className={`px-4 py-3 ${kom('papier')}`}>{w.papier}</td>
                      <td className={`px-4 py-3 ${kom('wolumen')}`}>{w.wolumen}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {w.wifi === 'tak' ? 'tak' : <span className="text-gray-400">{w.wifi}</span>}
                      </td>
                      <td className={`px-4 py-3 ${kom('ekran')}`}>{w.ekran}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
<Footer />
</div>
  );
}