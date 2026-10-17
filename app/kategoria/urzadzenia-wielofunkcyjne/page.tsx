"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Placeholder produkty dla kategorii Urządzenia wielofunkcyjne
const products = [
  {
    id: 1,
    name: "Brother MFC-L8690CDW",
    category: "Urządzenia wielofunkcyjne",
    description: "Kolorowe urządzenie wielofunkcyjne z drukiem dwustronnym i Wi-Fi",
    specifications: "Drukarka kolorowa, skaner, kopiarka, fax, A4, 31 ppm",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/MFCL8690CDW_1.png",
    badge: "Bestseller",
    featured: true
  },
  {
    id: 2,
    name: "Brother MFC-L5710DW",
    category: "Urządzenia wielofunkcyjne", 
    description: "Czarno-białe urządzenie wielofunkcyjne z automatycznym podajnikiem",
    specifications: "Drukarka monochromatyczna, skaner, kopiarka, fax, A4, 40 ppm",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/MFCL5710DW_1.png",
    badge: null,
    featured: false
  },
  {
    id: 3,
    name: "Brother MFC-L8900CDW",
    category: "Urządzenia wielofunkcyjne",
    description: "Profesjonalne kolorowe urządzenie wielofunkcyjne A4 z NFC",
    specifications: "Drukarka kolorowa, skaner, kopiarka, fax, A4, 31 ppm, NFC",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA", 
    image: "/MFCL8900CDW_1.png",
    badge: "Nowość",
    featured: true
  },
  {
    id: 4,
    name: "Brother MFC-L6710DW",
    category: "Urządzenia wielofunkcyjne",
    description: "Wydajne czarno-białe urządzenie wielofunkcyjne dla średnich biur",
    specifications: "Drukarka monochromatyczna, skaner, kopiarka, fax, A4, 46 ppm",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/MFCL6710DW_1.png", 
    badge: null,
    featured: false
  },
  {
    id: 5,
    name: "Brother DCP-L5510DW",
    category: "Urządzenia wielofunkcyjne",
    description: "Kompaktowe urządzenie 3w1 bez funkcji faxu z drukiem dwustronnym",
    specifications: "Drukarka monochromatyczna, skaner, kopiarka, A4, 40 ppm",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/DCPL5510DW_1.png",
    badge: "Ekonomiczne",
    featured: true
  },
  {
    id: 6,
    name: "Brother MFC-L8390CDW",
    category: "Urządzenia wielofunkcyjne",
    description: "Zaawansowane kolorowe urządzenie wielofunkcyjne z dużą wydajnością",
    specifications: "Drukarka kolorowa, skaner, kopiarka, fax, A4, 31 ppm, duplex",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/MFCL8390CDW_1.png",
    badge: null,
    featured: true
  },
  {
    id: 7,
    name: "Brother MFC-L8730CDW",
    category: "Urządzenia wielofunkcyjne",
    description: "Kolorowe urządzenie wielofunkcyjne z podajnikiem ADF na 80 arkuszy",
    specifications: "Drukarka kolorowa, skaner dwustronny, kopiarka, fax, A4, 31 ppm, NFC",
    availability: "Dostępność wkrótce",
    whereToBuy: "",
    image: "/MFCL8730CDW_1.png",
    badge: null,
    featured: false
  },
  {
    id: 8,
    name: "Brother MFC-L8970CDW",
    category: "Urządzenia wielofunkcyjne",
    description: "Kolorowe urządzenie wielofunkcyjne z ekranem 7″ i skanerem do 100 obrazów/min",
    specifications: "Drukarka kolorowa, skaner dwustronny, kopiarka, fax, A4, 31 ppm, NFC",
    availability: "Dostępność wkrótce",
    whereToBuy: "",
    image: "/MFCL8970CDW_1.png",
    badge: null,
    featured: false
  }
];

// Porównanie pod kafelkami — tylko to, czym modele się różnią. Wspólne cechy
// (druk dwustronny A4, Wi-Fi, LAN) stoją raz w nagłówku. Dane z kart produktu
// i store.brother.pl (17.10.2026). `naj` = wartość wyróżniona w kolumnie.
type Wiersz = {
  model: string
  druk: string
  faks: boolean
  skan: string
  adf: string
  ekran: string
  naj?: Array<'druk' | 'skan' | 'adf' | 'ekran'>
}

const porownanie: { grupa: string; wiersze: Wiersz[] }[] = [
  {
    grupa: 'Czarno-białe',
    wiersze: [
      { model: 'DCP-L5510DW', druk: '48 str./min', faks: false, skan: 'tylko jednostronnie', adf: '50 ark.', ekran: '8,9 cm' },
      { model: 'MFC-L5710DW', druk: '48 str./min', faks: true, skan: '56 obr./min', adf: '50 ark.', ekran: '8,9 cm' },
      { model: 'MFC-L6710DW', druk: '50 str./min', faks: true, skan: '56 obr./min', adf: '70 ark.', ekran: '12,7 cm', naj: ['druk'] },
    ],
  },
  {
    grupa: 'Kolorowe',
    wiersze: [
      { model: 'MFC-L8390CDW', druk: '30 str./min', faks: true, skan: '56 obr./min', adf: '50 ark.', ekran: '8,8 cm' },
      { model: 'MFC-L8690CDW', druk: '31 str./min', faks: true, skan: '56 obr./min', adf: '50 ark.', ekran: '9,3 cm' },
      { model: 'MFC-L8730CDW', druk: '31 str./min', faks: true, skan: '56 obr./min', adf: '80 ark.', ekran: '8,8 cm', naj: ['adf'] },
      { model: 'MFC-L8900CDW', druk: '31 str./min', faks: true, skan: '56 obr./min', adf: '50 ark.', ekran: '12,6 cm' },
      { model: 'MFC-L8970CDW', druk: '31 str./min', faks: true, skan: '100 obr./min', adf: '80 ark.', ekran: '17,6 cm', naj: ['skan', 'adf', 'ekran'] },
    ],
  },
]

const hrefModelu = (model: string) => `/produkt/brother-${model.toLowerCase()}`

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
            <span className="text-gray-900 font-medium">Urządzenia wielofunkcyjne</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Urządzenia wielofunkcyjne</h1>
              <p className="text-gray-600">{products.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Profesjonalne urządzenia wielofunkcyjne dostosowane do potrzeb pracowników leśnictwa. 
            Urządzenia łączące funkcje drukarki, skanera, kopiarki i faxu w jednym kompaktowym rozwiązaniu biurowym.
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
                placeholder="Szukaj w urządzeniach wielofunkcyjnych..."
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
        {filteredProducts.map((product) => {
          // Tworzenie slug z nazwy produktu
          const productSlug = product.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');
          
          return (
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
              <div className={`relative border-b border-gray-200 ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"}`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-contain"
                  style={
                    product.id === 2 || product.id === 4 
                      ? { transform: 'scale(0.8)' }
                      : product.id === 3
                      ? { transform: 'scale(1.03) translateY(3%)' }
                      // L8730CDW i L8970CDW: pierwiastek z (wysokość × szerokość) urządzenia jak średnia
                      // L8690CDW/L8900CDW (68% kafelka), dół na tej samej linii (91,4%)
                      : product.id === 7 || product.id === 8
                      ? { transform: 'translateY(5%) scale(0.94)' }
                      : {}
                  }
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
                      {product.availability}{product.whereToBuy ? ` • ${product.whereToBuy}` : ''}
                    </div>
                  </div>
                </div>

                <a 
                  href={`/produkt/${productSlug}`}
                  className="mt-auto block w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                >
                  Zobacz produkt
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    )}
  </div>
</section>

      {/* Porównanie — tylko różnice */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">Który wybrać?</h2>
          <p className="mt-1 text-gray-600">
            Wszystkie drukują dwustronnie w A4 i mają Wi-Fi oraz sieć LAN. Różnią się tym, co poniżej.
          </p>

          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="w-full min-w-[680px] whitespace-nowrap text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="sticky left-0 bg-white px-4 py-3 font-medium">Model</th>
                  <th className="px-4 py-3 font-medium">Druk</th>
                  <th className="px-4 py-3 font-medium">Faks</th>
                  <th className="px-4 py-3 font-medium">Skan dwustronny</th>
                  <th className="px-4 py-3 font-medium">Podajnik dokumentów</th>
                  <th className="px-4 py-3 font-medium">Ekran dotykowy</th>
                </tr>
              </thead>
              {porownanie.map((g) => (
                <tbody key={g.grupa}>
                  <tr className="bg-gray-50">
                    <th colSpan={6} className="py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <span className="sticky left-0 inline-block px-4">
                        {g.grupa === 'Kolorowe' ? (
                          <span className="bg-gradient-to-r from-cyan-600 via-fuchsia-600 to-amber-500 bg-clip-text text-transparent">
                            {g.grupa}
                          </span>
                        ) : (
                          g.grupa
                        )}
                      </span>
                    </th>
                  </tr>
                  {g.wiersze.map((w) => {
                    const kom = (k: 'druk' | 'skan' | 'adf' | 'ekran') =>
                      w.naj?.includes(k) ? 'font-semibold text-emerald-700' : 'text-gray-700'
                    return (
                      <tr key={w.model} className="border-t border-gray-100">
                        <td className="sticky left-0 bg-white px-4 py-3 font-medium">
                          <a href={hrefModelu(w.model)} className="text-gray-900 hover:text-emerald-700">
                            {w.model}
                          </a>
                        </td>
                        <td className={`px-4 py-3 ${kom('druk')}`}>{w.druk}</td>
                        <td className="px-4 py-3 text-gray-700">
                          {w.faks ? 'tak' : <span className="text-gray-400">nie</span>}
                        </td>
                        <td className={`px-4 py-3 ${w.skan.startsWith('tylko') ? 'text-gray-400' : kom('skan')}`}>
                          {w.skan}
                        </td>
                        <td className={`px-4 py-3 ${kom('adf')}`}>{w.adf}</td>
                        <td className={`px-4 py-3 ${kom('ekran')}`}>{w.ekran}</td>
                      </tr>
                    )
                  })}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
<Footer />
</div>
  );
}