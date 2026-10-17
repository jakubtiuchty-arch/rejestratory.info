"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TabelaPorownania from '@/components/TabelaPorownania'
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Placeholder produkty dla kategorii Monitory
const products = [
  {
    id: 1,
    name: "HP Pro S5 QHD USB-C 527pu",
    category: "Monitory",
    description: "Profesjonalny monitor QHD 27 cali do pracy biurowej",
    specifications: "27\" QHD 2560x1440, IPS, 100Hz, USB-C 100W, RJ-45, HDMI, DisplayPort",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
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
    specifications: "27\" QHD 2560x1440, IPS, 100Hz, HDMI, DisplayPort, hub USB, pivot",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
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
    specifications: "23,8\" FHD 1920x1080, IPS, 100Hz, USB-C 90W, RJ-45, HDMI, DisplayPort",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA", 
    image: "/P2425HE_1.png",
    imageScale: 0.8,
    badge: "USB-C",
    featured: true,
    link: "/produkt/dell-pro-24-plus-p2425he-usbc"
  },
  {
    id: 4,
    name: "Dell Pro 24 Plus P2425H",
    category: "Monitory",
    description: "Kompaktowy monitor biznesowy 24 cale do codziennej pracy",
    specifications: "23,8\" FHD 1920x1080, IPS, 100Hz, HDMI, DisplayPort, hub USB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/P2425HE_1.png",
    imageScale: 0.8,
    badge: null,
    featured: false,
    link: "/produkt/dell-pro-24-plus-p2425he"
  },
  {
    id: 5,
    name: "Dell Pro 27 P2726HE z USB-C",
    category: "Monitory",
    description: "Duży monitor 27 cali z ładowaniem USB-C i odświeżaniem 120 Hz",
    specifications: "27\" FHD 1920x1080, IPS, 120Hz, USB-C 100W, RJ-45, HDMI, DisplayPort",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/P2425HE_1.png",
    imageScale: 0.8,
    badge: "USB-C",
    featured: true,
    link: "/produkt/dell-pro-27-p2726he"
  },
  {
    id: 6,
    name: "Dell Pro 27 P2726H",
    category: "Monitory",
    description: "Monitor 27 cali Full HD z odświeżaniem 120 Hz do zastosowań biurowych",
    specifications: "27\" FHD 1920x1080, IPS, 120Hz, HDMI, DisplayPort, hub USB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/P2425HE_1.png",
    imageScale: 0.8,
    badge: null,
    featured: false,
    link: "/produkt/dell-pro-27-p2726h"
  },
  {
    id: 7,
    name: "Dell Pro 24 P2424HEB",
    category: "Monitory",
    description: "Monitor 24 cale do wideokonferencji z kamerą 4 Mpx i głośnikami",
    specifications: "23,8\" FHD 1920x1080, IPS, 60Hz, kamera 4 Mpx + IR, USB-C 90W, RJ-45",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/P2424HEB_1.png",
    imageScale: 0.8,
    badge: null,
    featured: true,
    link: "/produkt/dell-pro-24-plus-p2424heb"
  },
  {
    id: 8,
    name: "Dell Pro 27 P2724DEB",
    category: "Monitory",
    description: "Monitor 27 cali QHD do wideokonferencji z kamerą 4 Mpx i głośnikami",
    specifications: "27\" QHD 2560x1440, IPS, 60Hz, kamera 4 Mpx + IR, USB-C 90W, RJ-45",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/P2424HEB_1.png",
    imageScale: 0.8,
    badge: null,
    featured: true,
    link: "/produkt/dell-pro-27-plus-p2724deb"
  },
  {
    id: 9,
    name: "HP S3 Pro 324pf",
    category: "Monitory",
    description: "Podstawowy monitor biznesowy 24 cale z matrycą IPS",
    specifications: "23,8\" FHD 1920x1080, IPS, 100Hz, HDMI, DisplayPort, VGA",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/hp_series_1.png",
    imageScale: 0.8,
    badge: null,
    featured: true,
    link: "/produkt/hp-seria-3-pro-324pv"
  },
  {
    id: 10,
    name: "HP Pro S5 FHD USB-C 524pu",
    category: "Monitory",
    description: "Monitor 23,8 cala ze stacją dokującą i gniazdem sieciowym w obudowie",
    specifications: "23,8\" FHD 1920x1080, IPS, 100Hz, USB-C 100W, RJ-45, DisplayPort, HDMI",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/524pu_1.png",
    badge: null,
    featured: false,
    link: "/produkt/hp-seria-5-pro-524pu"
  },
  {
    id: 11,
    name: "HP Pro S5 FHD USB-C Conferencing 524pm",
    category: "Monitory",
    description: "Monitor 23,8 cala z chowaną kamerą 5 Mpix, czterema głośnikami i stacją dokującą",
    specifications: "23,8\" FHD 1920x1080, IPS, 100Hz, kamera 5 Mpix, 4 głośniki, USB-C 100W",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/524pm_1.png",
    badge: null,
    featured: false,
    link: "/produkt/hp-seria-5-pro-524pm"
  },
  {
    id: 12,
    name: "HP Pro S5 QHD USB-C Conferencing 527pm",
    category: "Monitory",
    description: "Monitor 27 cali QHD z chowaną kamerą 5 Mpix, czterema głośnikami i stacją dokującą",
    specifications: "27\" QHD 2560x1440, IPS, 100Hz, kamera 5 Mpix, 4 głośniki, USB-C 100W, RJ-45",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "/527pm_1.png",
    badge: null,
    featured: false,
    link: "/produkt/hp-seria-5-pro-527pm"
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

// Porównanie pod kafelkami — tylko to, czym monitory się różnią. Dane z dell.com i QuickSpecs HP,
// sprawdzone 17.10.2026. HP 324pf zamiast 324pv (oferta ZUP Łódź, decyzja Jakuba 17.10).
const porownanieKolumny = [
  { klucz: 'ekran', naglowek: 'Ekran' },
  { klucz: 'hz', naglowek: 'Odświeżanie' },
  { klucz: 'dok', naglowek: 'Dok USB-C' },
  { klucz: 'kamera', naglowek: 'Kamera · głośniki' },
  { klucz: 'regulacja', naglowek: 'Regulacja' },
  { klucz: 'oczy', naglowek: 'Komfort oczu' },
]

const bezDoku = { dok: '—', kamera: '—' }
const pelnaRegulacja = 'wysokość, pivot'

const porownanieGrupy = [
  {
    grupa: 'Podstawowe',
    wiersze: [
      { model: 'Dell P2425H', href: '/produkt/dell-pro-24-plus-p2425he', wartosci: { ekran: '23,8″ FHD', hz: '100 Hz', ...bezDoku, regulacja: pelnaRegulacja, oczy: 'TÜV 4★' } },
      { model: 'Dell P2726H', href: '/produkt/dell-pro-27-p2726h', wartosci: { ekran: '27″ FHD', hz: '120 Hz', ...bezDoku, regulacja: pelnaRegulacja, oczy: 'TÜV 4★' }, naj: ['hz'] },
      { model: 'HP 324pf', href: '/produkt/hp-seria-3-pro-324pv', wartosci: { ekran: '23,8″ FHD', hz: '100 Hz', ...bezDoku, regulacja: 'tylko pochylenie', oczy: 'TÜV Low Blue Light' }, slabe: ['regulacja'] },
      { model: 'HP 527pq', href: '/produkt/hp-seria-5-pro-527pq', wartosci: { ekran: '27″ QHD', hz: '100 Hz', ...bezDoku, regulacja: pelnaRegulacja, oczy: 'TÜV Low Blue Light' } },
    ],
  },
  {
    grupa: 'Ze stacją dokującą USB-C',
    wiersze: [
      { model: 'Dell P2425HE', href: '/produkt/dell-pro-24-plus-p2425he-usbc', wartosci: { ekran: '23,8″ FHD', hz: '100 Hz', dok: '90 W · RJ-45', kamera: '—', regulacja: pelnaRegulacja, oczy: 'TÜV 4★' } },
      { model: 'Dell P2726HE', href: '/produkt/dell-pro-27-p2726he', wartosci: { ekran: '27″ FHD', hz: '120 Hz', dok: '100 W · RJ-45', kamera: '—', regulacja: pelnaRegulacja, oczy: 'TÜV 4★' }, naj: ['hz'] },
      { model: 'HP 524pu', href: '/produkt/hp-seria-5-pro-524pu', wartosci: { ekran: '23,8″ FHD', hz: '100 Hz', dok: '100 W · RJ-45', kamera: '—', regulacja: pelnaRegulacja, oczy: 'TÜV Low Blue Light' } },
      { model: 'HP 527pu', href: '/produkt/hp-seria-5-pro-527pu', wartosci: { ekran: '27″ QHD', hz: '100 Hz', dok: '100 W · RJ-45', kamera: '—', regulacja: pelnaRegulacja, oczy: 'TÜV Low Blue Light' } },
    ],
  },
  {
    grupa: 'Do wideokonferencji',
    wiersze: [
      { model: 'Dell P2424HEB', href: '/produkt/dell-pro-24-plus-p2424heb', wartosci: { ekran: '23,8″ FHD', hz: '60 Hz', dok: '90 W · RJ-45', kamera: '4 Mpx + IR · 2 × 5 W', regulacja: pelnaRegulacja, oczy: 'TÜV ComfortView Plus' } },
      { model: 'Dell P2724DEB', href: '/produkt/dell-pro-27-plus-p2724deb', wartosci: { ekran: '27″ QHD', hz: '60 Hz', dok: '90 W · RJ-45', kamera: '4 Mpx + IR · 2 × 5 W', regulacja: pelnaRegulacja, oczy: 'TÜV ComfortView Plus' } },
      { model: 'HP 524pm', href: '/produkt/hp-seria-5-pro-524pm', wartosci: { ekran: '23,8″ FHD', hz: '100 Hz', dok: '100 W · RJ-45', kamera: '5 Mpx + IR · 4 × 3 W', regulacja: pelnaRegulacja, oczy: 'TÜV Low Blue Light' }, naj: ['kamera'] },
      { model: 'HP 527pm', href: '/produkt/hp-seria-5-pro-527pm', wartosci: { ekran: '27″ QHD', hz: '100 Hz', dok: '100 W · RJ-45', kamera: '5 Mpx + IR · 4 × 3 W', regulacja: pelnaRegulacja, oczy: 'TÜV Low Blue Light' }, naj: ['kamera'] },
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
            <span className="text-gray-900 font-medium">Monitory</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
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
              <img src={ICON.lupa} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 mix-blend-multiply" />
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

                    <div className="mt-auto flex gap-2">
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

      {/* Porównanie — tylko różnice */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">Który wybrać?</h2>
          <p className="mt-1 text-gray-600">
            Wszystkie modele mają matrycę IPS i 3 lata gwarancji producenta. Poniższe zestawienie przedstawia różnice między nimi według danych producentów.
          </p>
          <TabelaPorownania kolumny={porownanieKolumny} grupy={porownanieGrupy} przypis="Dok USB-C: moc ładowania laptopa przez jeden kabel i gniazdo sieciowe RJ-45 w monitorze. Gwarancja Dell obejmuje wymianę z wyprzedzeniem (Advanced Exchange) i Premium Panel; HP — 3 lata na części i robociznę." />
        </div>
      </section>

      {/* Footer */}
<Footer />
</div>
  );
}