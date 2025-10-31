"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  ShoppingCart, 
  Shield, 
  Truck, 
  Headphones, 
  ArrowRight,
  Monitor,
  Printer,
  Phone,
  Mail,
  MapPin,
  Laptop,
  Database,
  FolderOpen,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Vibrate,
  Smartphone,
  TreePine,
  Trees
} from "lucide-react";

// Placeholder data
const categories = [
  { id: 1, name: "Rejestratory", count: 15, icon: Vibrate },
  { id: 2, name: "Telefony", count: 12, icon: Smartphone },
  { id: 3, name: "Laptopy", count: 11, icon: Laptop },
  { id: 4, name: "Urządzenia wielofunkcyjne", count: 7, icon: Printer },
  { id: 5, name: "Monitory", count: 8, icon: Monitor },
  { id: 6, name: "Drukarki", count: 12, icon: Printer },
  { id: 7, name: "Serwery", count: 6, icon: Database },
  { id: 8, name: "Drukarki do rejestratora", count: 9, icon: Printer },
  { id: 9, name: "Drukarki laserowe", count: 14, icon: Printer },
  { id: 10, name: "All in One", count: 5, icon: Monitor },
  { id: 11, name: "Elektroniczne Zarządzanie Dokumentacją", count: 8, icon: FolderOpen },
  { id: 12, name: "Urządzenia fiskalne", count: 3, icon: CreditCard }
];

// Funkcja do mapowania nazw kategorii na URLe
const getCategoryUrl = (categoryName: string) => {
  const urlMap: Record<string, string> = {
    "Rejestratory": "/kategoria/rejestratory",
    "Telefony": "/kategoria/telefony", 
    "Laptopy": "/kategoria/laptopy",
    "Urządzenia wielofunkcyjne": "/kategoria/urzadzenia-wielofunkcyjne",
    "Monitory": "/kategoria/monitory",
    "Drukarki": "/kategoria/drukarki",
    "Serwery": "/kategoria/serwery",
    "Drukarki do rejestratora": "/kategoria/drukarki-do-rejestratora",
    "Drukarki laserowe": "/kategoria/drukarki-laserowe",
    "All in One": "/kategoria/all-in-one",
    "Elektroniczne Zarządzanie Dokumentacją": "/kategoria/ezd",
    "Urządzenia fiskalne": "/kategoria/urzadzenia-fiskalne"
  };
  return urlMap[categoryName] || "#";
};

const featuredProducts = [
  {
    id: 1,
    name: "Zebra EM45",
    category: "Rejestrator",
    description: "To nie tylko smartfon!",
    price: "Cena na zapytanie"
  },
  {
    id: 2,
    name: "AIO Dell Pro 24 All-In-One ", 
    category: "All in One",
    description: "Wydajny komputer dla biura leśnika",
    price: "3 299 PLN"
  },
  {
    id: 3,
    name: "Brother MFC-L8690CDW",
    category: "Urządzenie wielofunkcyjne", 
    description: "Wszechstronne urządzenie biurowe",
    price: "899 PLN"
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
          background: "linear-gradient(90deg, #122F0b, #275F3E, #44785B, #6F9D87, #B5CABA)"
        }}
      >
        <div className="container mx-auto px-4">
          <motion.button
            onClick={() => setPromoOpen(!promoOpen)}
            className="w-full py-3 flex items-center justify-center gap-3 transition-all relative"
            whileHover={{ 
              backgroundColor: "rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-semibold text-lg">
              PROMOCJA: Laptopy Dell do -20%!
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
              <ChevronDown className="h-6 w-6" />
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
        </div>
        
        {/* Dropdown z opisem promocji */}
        <motion.div
          initial={false}
          animate={{ 
            height: promoOpen ? 'auto' : 0,
            opacity: promoOpen ? 1 : 0
          }}
          transition={{ 
            height: { duration: 0.4, ease: "easeInOut" },
            opacity: { duration: 0.3, ease: "easeInOut" }
          }}
          className="overflow-hidden"
        >
          <motion.div 
            className="container mx-auto px-4 pb-4"
            initial={false}
            animate={{ 
              y: promoOpen ? 0 : -20
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="bg-white/15 backdrop-blur-md rounded-lg p-6 max-w-3xl mx-auto border border-white/20 shadow-xl">
              <h3 className="font-bold text-xl mb-3">Laptopy Dell w promocyjnych cenach!</h3>
              <p className="mb-4">
                Specjalna oferta na wybrane modele laptopów Dell – idealne rozwiązanie dla biur leśnictwa. 
                Wydajne procesory, długi czas pracy na baterii i solidna konstrukcja.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300">✓</span>
                  <span>Dell Latitude 5540 – teraz tylko 3 999 PLN (zamiast 4 999 PLN)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300">✓</span>
                  <span>Dell Precision 3581 – rabat 15% na konfiguracje z SSD 1TB</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-300">✓</span>
                  <span>Darmowa dostawa i przedłużona gwarancja do 3 lat</span>
                </li>
              </ul>
              <motion.a 
                href="/kategoria/laptopy"
                className="inline-block bg-white text-emerald-600 font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                Zobacz laptopy Dell →
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </div>
            
            <div className="flex items-center gap-8">
              <ul className="hidden md:flex items-center gap-8">
                <li><a href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</a></li>
                <li><a href="#produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</a></li>
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

      {/* Hero Section */}
      <section className="text-white py-16 relative overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/las-video.mp4" type="video/mp4" />
        </video>
        
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
                Rejestartory.info,
                <span className="block text-emerald-200">jedyne takie miejsce w internecie</span>
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                Od 25 lat specjalizujemy się w dostarczaniu nowoczesnego sprzętu IT dostosowanego 
                do potrzeb leśnictwa. Terminale terenowe, komputery, drukarki i więcej.
              </p>
              
              <div className="flex gap-4">
                <button className="bg-white text-emerald-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Zobacz produkty
                </button>
                <button className="border border-white text-white hover:bg-emerald-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Skontaktuj się
                </button>
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
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Szukaj produktów..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  />
                </div>
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
                <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-400 text-center px-4">{product.name}</span>
                </div>
                <div className="p-6">
                  <div className="text-sm text-emerald-600 font-medium mb-2">{product.category}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-end">
                <a 
  href={`/produkt/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
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
<footer className="relative text-white py-12 overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover"
    style={{ backgroundImage: 'url(/las_footer.png)', backgroundPosition: 'center -800px' }}
  ></div>
  
  {/* Ciemna nakładka dla czytelności tekstu */}
  <div className="absolute inset-0 bg-black/60"></div>
  
  <div className="container mx-auto px-4 relative z-10">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <img src="/rejestratory_logo_footer.png" alt="TAKMA" className="h-8 w-auto" />
        </div>
        <div className="text-gray-400 text-justify">
          <div>Administratorem serwisu</div>
          <div>Rejestratory.info,</div>
          <div>jest firma TAKMA</div>
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-4">Produkty</h4>
        <ul className="space-y-2 text-gray-400">
          <li><a href="/kategoria/rejestratory" className="hover:text-white">Rejestratory</a></li>
          <li><a href="/kategoria/telefony" className="hover:text-white">Telefony</a></li>
          <li><a href="/kategoria/laptopy" className="hover:text-white">Laptopy</a></li>
          <li><a href="/kategoria/drukarki" className="hover:text-white">Drukarki</a></li>
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
    
    <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-gray-400">
      <p>&copy; 2024 Rejestratory.info. Wszystkie prawa zastrzeżone.</p>
    </div>
  </div>
</footer>
</div>
  );
}