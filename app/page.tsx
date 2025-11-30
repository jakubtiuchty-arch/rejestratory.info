"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInquiry } from '@/components/InquiryContext';
import SearchAutocomplete from './components/SearchAutocomplete';
import CrispChat from '@/components/CrispChat';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Monitor,
  Printer,
  Laptop,
  Database,
  FolderOpen,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Vibrate,
  Smartphone,
  Package
} from "lucide-react";

// Placeholder data
const categories = [
  { id: 1, name: "Rejestratory", count: 15, icon: Vibrate },
  { id: 2, name: "Telefony", count: 12, icon: Smartphone },
  { id: 3, name: "Laptopy", count: 11, icon: Laptop },
  { id: 4, name: "Urządzenia wielofunkcyjne", count: 7, icon: Printer },
  { id: 5, name: "Monitory", count: 8, icon: Monitor },
  { id: 7, name: "Serwery", count: 6, icon: Database },
  { id: 8, name: "Drukarki do rejestratora", count: 9, icon: Printer },
  { id: 9, name: "Drukarki laserowe", count: 14, icon: Printer },
  { id: 10, name: "All in One", count: 5, icon: Monitor },
  { id: 11, name: "Elektroniczne Zarządzanie Dokumentacją", count: 8, icon: FolderOpen },
  { id: 12, name: "Urządzenia fiskalne", count: 3, icon: CreditCard },
  { id: 13, name: "Akcesoria komputerowe", count: 18, icon: Package }
];

// Funkcja do mapowania nazw kategorii na URLe
const getCategoryUrl = (categoryName: string) => {
  const urlMap: Record<string, string> = {
    "Rejestratory": "/kategoria/rejestratory",
    "Telefony": "/kategoria/telefony", 
    "Laptopy": "/kategoria/laptopy",
    "Urządzenia wielofunkcyjne": "/kategoria/urzadzenia-wielofunkcyjne",
    "Monitory": "/kategoria/monitory",
    "Serwery": "/kategoria/serwery",
    "Drukarki do rejestratora": "/kategoria/drukarki-do-rejestratora",
    "Drukarki laserowe": "/kategoria/drukarki-laserowe",
    "All in One": "/kategoria/all-in-one",
    "Elektroniczne Zarządzanie Dokumentacją": "/kategoria/ezd",
    "Urządzenia fiskalne": "/kategoria/urzadzenia-fiskalne",
    "Akcesoria komputerowe": "/kategoria/akcesoria-komputerowe"
  };
  return urlMap[categoryName] || "#";
};

const featuredProducts = [
  {
    id: 1,
    name: "Zebra EM45",
    category: "Rejestrator",
    description: "To nie tylko smartfon!",
    price: "Cena na zapytanie",
    image: "em45_1.webp"
  },
  {
    id: 2,
    name: "Dell Pro 16\" Plus", 
    category: "Laptop",
    description: "Wydajny komputer dla biura leśnika",
    price: "3 299 PLN",
    image: "dell_16_1.png"
  },
  {
    id: 3,
    name: "Brother MFC-L8690CDW",
    category: "Urządzenie wielofunkcyjne", 
    description: "Wszechstronne urządzenie biurowe",
    price: "899 PLN",
    image: "MFCL8690CDW_1.png"
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoriesView, setCategoriesView] = React.useState(0); // 0=4, 1=8, 2=all
  const [promoOpen, setPromoOpen] = React.useState(false);
  
  // Logika wyświetlania kategorii w trzech krokach
  const getVisibleCategories = () => {
    switch (categoriesView) {
      case 0: return categories.slice(0, 4);  // Pierwsze 4
      case 1: return categories.slice(0, 8);  // Pierwsze 8
      default: return categories;             // Wszystkie
    }
  };
  
  const visibleCategories = getVisibleCategories();
  const hasMoreCategories = categories.length > 4;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banerek promocyjny */}
      <motion.div
        className="text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('/baner_em45_header.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        animate={{
          height: promoOpen ? 'auto' : 'auto'
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
      >
        {/* Ciemny overlay - tylko gdy zamknięte */}
        <motion.div
          className="absolute inset-0 bg-black/80"
          animate={{
            opacity: promoOpen ? 0 : 1
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
        ></motion.div>

        {/* Subtelny gradient overlay dla lepszej czytelności CTA */}
        {promoOpen && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col">
          <motion.button
            onClick={() => setPromoOpen(!promoOpen)}
            className="w-full py-3 flex items-center justify-center gap-3 transition-all relative"
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-semibold text-base sm:text-lg drop-shadow-lg">
              Zobacz nasz bestseller - Zebra EM45
            </span>
            <motion.div
              animate={{
                rotate: promoOpen ? 180 : 0,
                scale: promoOpen ? 1 : [1, 1.3, 1]
              }}
              transition={{
                rotate: { duration: 0.3, ease: "easeInOut" },
                scale: {
                  duration: 1.5,
                  repeat: promoOpen ? 0 : Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                scale: 1.4,
                y: [0, -3, 0],
                transition: {
                  y: {
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
              className="relative"
            >
              <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={{
                  scale: promoOpen ? 0 : [1, 1.8, 1],
                  opacity: promoOpen ? 0 : [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: promoOpen ? 0 : Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.button>

          {/* CTA Button - subtelny, elegancki design */}
          {promoOpen && (
            <motion.div
              className="flex-1 flex items-end justify-center sm:justify-end pb-6 sm:pb-8 md:pb-12 pt-48 sm:pt-64 md:pt-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.a
                href="/produkt/zebra-em45"
                className="inline-flex items-center gap-2 text-white font-medium px-6 py-2.5 rounded-full border-2 border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all shadow-lg"
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(255, 255, 255, 0.6)",
                  backgroundColor: "rgba(255, 255, 255, 0.25)"
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-sm sm:text-base">Sprawdź</span>
                <motion.span
                  animate={{
                    x: [0, 4, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Header */}
      <Header activeTab="home" />

      {/* Hero Section */}
      <section className="text-white py-16 relative">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/las_video.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Ciemne nakładka dla lepszej czytelności tekstu */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Zakomentowane zielone tło - może wrócić */}
        {/* bg-gradient-to-r from-emerald-600 to-emerald-800 */}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Rejestartory.info
                <span className="block text-emerald-200">jedyne takie miejsce w internecie</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Od 25 lat specjalizujemy się w dostarczaniu nowoczesnego sprzętu IT dostosowanego 
                do potrzeb leśnictwa. Terminale terenowe, komputery, drukarki i więcej.
              </p>
              
              <div className="flex gap-4">
                <a href="#produkty" className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Zobacz produkty
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-4">Szukasz konkretnego produktu?</h3>
                <SearchAutocomplete value={searchQuery} onChange={setSearchQuery} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="produkty" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Kategorie produktów</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferujemy szeroki wybór sprzętu IT dostosowanego do specyficznych potrzeb Lasów Państwowych
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.a
                  key={category.id}
                  href={getCategoryUrl(category.name)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: category.id * 0.1 }}
                  className="border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group block"
                >
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-50 transition-colors">
                      <IconComponent className="h-8 w-8 text-gray-600 group-hover:text-emerald-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.count} produktów</p>
                    <div className="w-full bg-emerald-600 group-hover:bg-emerald-700 text-white font-medium text-sm py-2 px-4 rounded-lg transition-colors">
                      Zobacz produkty
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
          
          {hasMoreCategories && (
            <div className="text-center mt-12">
              <motion.button
                onClick={() => {
                  if (categoriesView === 0) {
                    setCategoriesView(1); // 4 → 8 kategorii
                  } else if (categoriesView === 1) {
                    setCategoriesView(2); // 8 → wszystkie
                  } else {
                    setCategoriesView(0); // wszystkie → 4
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 mx-auto shadow-lg hover:shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, -4, 0],
                  boxShadow: [
                    "0 10px 20px rgba(0, 0, 0, 0.1)",
                    "0 15px 30px rgba(0, 0, 0, 0.15)",
                    "0 10px 20px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {categoriesView === 0 && (
                  <>
                    <ChevronDown className="h-5 w-5" />
                    Zobacz więcej
                    <ChevronDown className="h-5 w-5" />
                  </>
                )}
                {categoriesView === 1 && (
                  <>
                    <ChevronDown className="h-5 w-5" />
                    Zobacz wszystkie kategorie
                    <ChevronDown className="h-5 w-5" />
                  </>
                )}
                {categoriesView === 2 && (
                  <>
                    <ChevronUp className="h-5 w-5" />
                    Pokaż mniej
                    <ChevronUp className="h-5 w-5" />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Polecane produkty</h2>
            <p className="text-gray-600">Najpopularniejsze rozwiązania w naszej ofercie</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: product.id * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square rounded-t-lg flex items-center justify-center overflow-hidden">
                  <img 
                    src={`/${product.image}`} 
                    alt={product.name}
                    className="w-4/5 h-4/5 object-contain"
                  />
                </div>
                <div className="border-t border-gray-200"></div>
                <div className="p-6">
                  <div className="text-sm text-emerald-600 font-medium mb-2">{product.category}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-end">
                    <a 
                      href={`/produkt/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/"/g, '')}`}
                      className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Zobacz więcej
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Crisp Chat */}
      <CrispChat />
    </div>
  );
}