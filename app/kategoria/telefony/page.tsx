"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICON, naCiemnym } from '@/components/product/icons'
import { porownajCeny } from '@/data/oferty'

// Placeholder produkty dla kategorii Telefony
const products = [
  {
    id: 1,
    name: "Samsung Galaxy A36",
    category: "Telefony",
    description: "Wszechstronny smartfon z wydajnym procesorem i długą żywotnością baterii",
    specifications: "Android 15, 6,7\" FHD+, Snapdragon 6 Gen 3, 6GB RAM, 128GB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "a36_1.png",
    badge: null,
    featured: false,
    customUrl: "/produkt/samsung-a36"
  },
  {
    id: 2,
    name: "Samsung Galaxy A56",
    category: "Telefony", 
    description: "Zaawansowany smartfon z profesjonalnym aparatem i szybkim ładowaniem",
    specifications: "Android 15, 6,7\" FHD+, Exynos 1580, 8GB RAM, 256GB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "a56_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/samsung-a56"
  },
  {
    id: 3,
    name: "Samsung Galaxy S25+",
    category: "Telefony",
    description: "Flagowy smartfon z AI i aparatem 50MP idealny do dokumentacji terenowej",
    specifications: "Android 15, 6,7\" QHD+, Snapdragon 8 Elite, 12GB RAM, 256GB",
    availability: "Dostępny",
    whereToBuy: "TAKMA", 
    image: "s25plus_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/samsung-s25-plus"
  },
  {
    id: 4,
    name: "Samsung Galaxy S25 Ultra",
    category: "Telefony",
    description: "Topowy smartfon z S Pen i aparatem 200MP do profesjonalnej dokumentacji",
    specifications: "Android 15, 6,9\" QHD+, Snapdragon 8 Elite, 12GB RAM, 512GB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "s25ultra_1.png", 
    badge: null,
    featured: true,
    customUrl: "/produkt/samsung-s25-ultra"
  },
  {
    id: 5,
    name: "Samsung Galaxy S25 FE",
    category: "Telefony",
    description: "Flagowe funkcje w przystępnej cenie — smartfon z AI i aparatem 50MP",
    specifications: "Android 16, 6,7\" FHD+ AMOLED 120Hz, Exynos 2400, 8GB RAM, 128GB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "s25fe_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/samsung-s25-fe"
  },
  {
    id: 6,
    name: "Samsung Galaxy XCover6 Pro",
    category: "Telefony",
    description: "Wytrzymały smartfon przemysłowy z certyfikatem IP68 i wymienną baterią",
    specifications: "Android 12, 6,6\" FHD+ 120 Hz, Snapdragon 778G, 6GB RAM, 128GB",
    availability: "Dostępny",
    whereToBuy: "ZUP Łódź, TAKMA",
    image: "xcover6pro_1.png",
    badge: null,
    featured: true,
    customUrl: "/produkt/samsung-xcover7"
  },
  {
    id: 7,
    name: "Apple iPhone 17 Pro",
    category: "Telefony",
    description: "Aparat 48 Mpx z teleobiektywem i obudowa aluminiowa — do dokumentacji terenowej",
    specifications: "iOS 26, 6,3\" Super Retina XDR 120 Hz, A19 Pro, 3 × aparat 48 Mpx, USB-C",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "products/iphone-17-pro-1.webp",
    badge: "Nowość",
    featured: true,
    customUrl: "/produkt/iphone-17-pro"
  },
  {
    id: 8,
    name: "Apple iPhone 17 Pro Max",
    category: "Telefony",
    description: "Największy ekran i najdłuższy czas pracy w rodzinie iPhone 17 Pro",
    specifications: "iOS 26, 6,9\" Super Retina XDR 120 Hz, A19 Pro, 3 × aparat 48 Mpx, USB-C",
    availability: "Dostępny",
    whereToBuy: "TAKMA",
    image: "products/iphone-17-pro-max-1.webp",
    badge: "Nowość",
    featured: true,
    customUrl: "/produkt/iphone-17-pro-max"
  }
];

// Porównanie pod kafelkami — tylko to, czym telefony się różnią. Dane od producentów
// (samsung.com/pl, news.samsung.com, support.apple.com/pl-pl, karty informacyjne UE Apple),
// sprawdzone 17.10.2026. Akumulator iPhone'ów: karta informacyjna produktu UE (modele A3523/A3526).
type Kol = 'ekran' | 'zabezp' | 'aku' | 'odpornosc' | 'aparat'
type Wiersz = {
  model: string
  href: string
  ekran: string
  zabezp: string
  aku: string
  odpornosc: string
  aparat: string
  naj?: Kol[]
  slabe?: Kol[]
}

const porownanie: { grupa: string; wiersze: Wiersz[] }[] = [
  {
    grupa: 'Samsung',
    wiersze: [
      { model: 'Galaxy A36', href: '/produkt/samsung-a36', ekran: '6,7″ AMOLED', zabezp: 'do 03.2031', aku: '5000 mAh', odpornosc: 'IP67', aparat: '50 Mpx' },
      { model: 'Galaxy A56', href: '/produkt/samsung-a56', ekran: '6,7″ AMOLED', zabezp: 'do 03.2032', aku: '5000 mAh', odpornosc: 'IP67', aparat: '50 Mpx' },
      { model: 'Galaxy S25 FE', href: '/produkt/samsung-s25-fe', ekran: '6,7″ AMOLED', zabezp: 'do 09.2032', aku: '4900 mAh', odpornosc: 'IP68', aparat: '50 Mpx · zoom 3x', naj: ['zabezp'] },
      { model: 'Galaxy S25+', href: '/produkt/samsung-s25-plus', ekran: '6,7″ AMOLED QHD+', zabezp: 'do 01.2032', aku: '4900 mAh', odpornosc: 'IP68', aparat: '50 Mpx · zoom 3x' },
      { model: 'Galaxy S25 Ultra', href: '/produkt/samsung-s25-ultra', ekran: '6,9″ AMOLED QHD+', zabezp: 'do 01.2032', aku: '5000 mAh', odpornosc: 'IP68', aparat: '200 Mpx · zoom 5x', naj: ['aparat'] },
      { model: 'Galaxy XCover6 Pro', href: '/produkt/samsung-xcover7', ekran: '6,6″ LCD', zabezp: 'do ok. 06.2027', aku: '4050 mAh, wymienny', odpornosc: 'IP68, MIL-STD-810H', aparat: '50 Mpx', naj: ['odpornosc'], slabe: ['zabezp'] },
    ],
  },
  {
    grupa: 'Apple',
    wiersze: [
      { model: 'iPhone 17 Pro', href: '/produkt/iphone-17-pro', ekran: '6,3″ OLED', zabezp: 'min. 5 lat', aku: '3988 mAh', odpornosc: 'IP68', aparat: '48 Mpx · zoom 4x' },
      { model: 'iPhone 17 Pro Max', href: '/produkt/iphone-17-pro-max', ekran: '6,9″ OLED', zabezp: 'min. 5 lat', aku: '4823 mAh', odpornosc: 'IP68', aparat: '48 Mpx · zoom 4x' },
    ],
  },
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
            <span className="text-gray-900 font-medium">Telefony</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Telefony</h1>
              <p className="text-gray-600">{filteredProducts.length} produktów dostępnych</p>
            </div>
          </div>
          
          <p className="text-gray-700 max-w-3xl">
            Nowoczesne smartfony dostosowane do potrzeb pracowników leśnictwa. 
            Urządzenia z zaawansowanymi aparatami do dokumentacji, długą żywotnością baterii i szybką łącznością mobilną.
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
                placeholder="Szukaj w telefonach..."
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

      {/* Porównanie — tylko różnice */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900">Który wybrać?</h2>
          <p className="mt-1 text-gray-600">
            Wszystkie modele obsługują sieć 5G, NFC i ładowanie przez USB-C. Poniższe zestawienie przedstawia różnice między nimi według danych producentów.
          </p>

          <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow-md">
            {/* szerokości kolumn: treść + równy odstęp, żeby wolne miejsce rozkładało się równo */}
            <table className="w-full whitespace-nowrap text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="sticky left-0 bg-white px-4 py-3 font-medium" style={{ width: '15.9%' }}>Model</th>
                  <th className="px-4 py-3 font-medium" style={{ width: '15.9%' }}>Ekran</th>
                  <th className="px-4 py-3 font-medium" style={{ width: '19.4%' }}>Aktualizacje zabezpieczeń</th>
                  <th className="px-4 py-3 font-medium" style={{ width: '16.6%' }}>Akumulator</th>
                  <th className="px-4 py-3 font-medium" style={{ width: '16.6%' }}>Odporność</th>
                  <th className="px-4 py-3 font-medium" style={{ width: '15.6%' }}>Aparat główny</th>
                </tr>
              </thead>
              {porownanie.map((g) => (
                <tbody key={g.grupa}>
                  <tr className="bg-gray-50">
                    <th colSpan={6} className="py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      <span className="sticky left-0 inline-block px-4">{g.grupa}</span>
                    </th>
                  </tr>
                  {g.wiersze.map((w) => {
                    const kom = (k: Kol) =>
                      w.naj?.includes(k)
                        ? 'font-semibold text-emerald-700'
                        : w.slabe?.includes(k)
                          ? 'text-gray-400'
                          : 'text-gray-700'
                    return (
                      <tr key={w.model} className="border-t border-gray-100">
                        <td className="sticky left-0 bg-white px-4 py-3 font-medium">
                          <a href={w.href} className="text-gray-900 hover:text-emerald-700">
                            {w.model}
                          </a>
                        </td>
                        <td className={`px-4 py-3 ${kom('ekran')}`}>{w.ekran}</td>
                        <td className={`px-4 py-3 ${kom('zabezp')}`}>{w.zabezp}</td>
                        <td className={`px-4 py-3 ${kom('aku')}`}>{w.aku}</td>
                        <td className={`px-4 py-3 ${kom('odpornosc')}`}>{w.odpornosc}</td>
                        <td className={`px-4 py-3 ${kom('aparat')}`}>{w.aparat}</td>
                      </tr>
                    )
                  })}
                </tbody>
              ))}
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Aktualizacje zabezpieczeń: daty według Samsung Polska; XCover6 Pro — 5 lat od premiery (06.2022). iPhone: Apple gwarantuje co najmniej 5 lat od zakończenia sprzedaży modelu.
          </p>
        </div>
      </section>

       {/* Footer */}
<Footer />
</div>
  );
}