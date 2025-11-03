'use client'

import CourierServiceSection from "@/components/CourierServiceSection";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ZoomIn,
  Shield,
  Battery,
  Wifi,
  Smartphone,
  Download,
  X,
  Calculator,
  BarChart3,
  FileText,
  Phone,
  Mail,
  MapPin,
  Check,
  Package,
  ShoppingCart,
  Info,
  Truck,
  AlertTriangle,
  Palette,
  Nfc,
  Server,
  HardDrive,
  Cpu
} from 'lucide-react'
import { useInquiry } from '@/components/InquiryContext'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div>
      {/* Main Image */}
      <motion.div 
        className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[4/3] cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src="/ds730_1.png"
          alt="Epson DS-730n"
          className="w-full h-full object-contain"
          style={{ transform: 'scale(0.935) translateY(-2%)' }}
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/80 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              className="relative max-w-4xl max-h-full"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <img
                src="/ds730_1.png"
                alt="Epson DS-730n - powiększenie"
                className="max-w-full max-h-full object-contain"
              />
              <button
                className="absolute top-4 right-4 bg-white/20 rounded-full p-2 text-white hover:bg-white/30"
                onClick={() => setIsZoomed(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


// Specifications Component
const Specifications = () => {
  const specs = [
    { category: "Technologia", items: [
      { name: "Typ skanera", value: "Skaner z podajnikiem" },
      { name: "Rozdzielczość optyczna (automatyczny podajnik dokumentów)", value: "600 DPI x 600 DPI (poziomo x pionowo)" },
      { name: "Rozdzielczość skanowania", value: "600 DPI x 600 DPI (poziomo x pionowo)" },
      { name: "Minimalny rozmiar dokumentu na ADF", value: "50,8 mm x 50,8 mm (poziomo x pionowo)" },
      { name: "Maksymalny rozmiar dokumentu — automatyczny podajnik dokumentów", value: "215,9 mm x 6.096 mm (poziomo x pionowo)" },
      { name: "Formaty papieru", value: "A4 (21.0x29,7 cm), A5 (14,8x21,0 cm), A6 (10,5x14,8 cm), B4, B5, B6, Letter, Legal, Pocztówka, Wizytówki, Plastikowe karty, DL (koperta)" },
      { name: "Głębia kolorów skanowania", value: "Wejście: 30 Bit Kolor / 10 Bit Monochromatyczny, Wyjście: 24 Bit Kolor / 8 Bit Monochromatyczny" },
      { name: "Ultradźwiękowy czujnik", value: "Tak" }
    ]},
    { category: "Wydajność", items: [
      { name: "Łączność", value: "Wi-Fi i sieć, Biuro" },
      { name: "Skaner", value: "Optical Sensor" },
      { name: "Optical Sensor", value: "CIS (stykowy przetwornik obrazu)" },
      { name: "Źródło światła", value: "Technologia diodowa ReadyScan" },
      { name: "Rozdzielczość wyjściowa", value: "75, 100, 150, 200, 240, 300, 600, 1200 DPI" }
    ]},
    { category: "Szybkość skanowania", items: [
      { name: "Prędkość skanowania", value: "monochromatyczny: 40 Str./min. - Kolor: 40 Str./min. pomiar za pomocą Rozmiar: A4, Rozdzielczość: 200 / 300 dpi, monochromatyczny: 80 obrazów/min - Kolor: 80 obrazów/min pomiar za pomocą Rozmiar: A4, Rozdzielczość: 200 / 300 dpi" }
    ]},
    { category: "Obsługa papieru / nośników", items: [
      { name: "Gramatura papieru na ADF", value: "Ładowanie automatyczne: 27 - 413 g/m²" },
      { name: "Rodzaj automatycznego podajnika dokumentów", value: "Skanowanie dwustronne jednoprzebiegowe" },
      { name: "Dzienna wydajność niezawodnej pracy", value: "6.500 strony" },
      { name: "Automatyczny podajnik dokumentów", value: "100 strony" },
      { name: "Skanowanie dwustronne (dupleks)", value: "Tak" }
    ]},
    { category: "Funkcje skanowania", items: [
      { name: "Automatyczna korekta położenia", value: "Tak" },
      { name: "Pomijanie pustych stron", value: "Tak" },
      { name: "Rozpoznawanie kodu kreskowego", value: "Tak" },
      { name: "Skanowanie do chmury", value: "Tak (Cloud Storage)" },
      { name: "Formaty edycji", value: "BMP, JPEG, TIFF, PDF, PDF/A, PNG, DOCX, XLSX, PPTX" },
      { name: "Wolumen skanowania", value: "6.500 stron dziennie" }
    ]},
    { category: "Złącza", items: [
      { name: "Przyłącza", value: "USB 2.0, Interfejs Ethernet (1000 Base-T/ 100-Base TX/ 10-Base-T), Hi-Speed USB — zgodne ze specyfikacją USB 2.0" },
      { name: "Panel interfejsu sieciowego", value: "Wbudowany" },
      { name: "Ustawienia Ethernet", value: "10BASE-T/100BASE-TX/1000BASE-T/pełny druk dwustronny/połowiczny druk dwustronny" },
      { name: "obsługa IPv6", value: "Tak" },
      { name: "Funkcje Push Scan", value: "Tak (z rozwiązaniami Document Capture Pro)" },
      { name: "Blokada panelu z hasłem", value: "Tak (z rozwiązaniami Document Capture Pro)" }
    ]},
    { category: "Informacje ogólne", items: [
      { name: "Napięcie zasilania", value: "AC 100 V - 240 V, 50 Hz - 60 Hz" },
      { name: "Zużycie energii", value: "14 W (Operation), 5,9 W Gotowy, 1,5 W (tryb uśpienia), 0,1 W (wyłączyć)" },
      { name: "Wymiary produktu", value: "296‎ x 169 x 167 mm (Szerokość x Głębokość x Wysokość)" },
      { name: "Waga produktu", value: "3,6 kg" },
      { name: "Sterowniki", value: "TWAIN, ISIS (nettnedlasting), Epson Scan2 (TWAIN), SANE (Linux), WIA (Windows), ICA (Mac)" },
      { name: "Załączone oprogramowanie", value: "Epson Device Admin, Epson Document Capture (tylko Mac), Epson Document Capture Pro, Epson Document Capture Pro Server (bezpłatne pobieranie), Epson Event Manager, Epson Scan 2, Interfejs przeglądarki" },
      { name: "Kompatybilne systemy operacyjne", value: "Mac OS 10.6+, Windows 10, Windows 10 (32/64 bit), Windows 11, Windows 7, Windows 8, Windows 8.1, Windows Server 2003, Windows Server 2008 (32/64-bitowy), Windows Server 2012 R2, Windows Vista, Windows XP SP3" },
      { name: "Wilgotność powietrza", value: "Praca 15% - 80%, Składowanie -25% - 60%" },
      { name: "Temperatura", value: "Praca 5°C - 35°C, Składowanie 25°C - 60°C" },
      { name: "Opcje", value: "Roller Assembly Kit" }
    ]},
    { category: "Wyświetlacz ciekłokrystaliczny i karty pamięci", items: [
      { name: "Wyświetlacz LCD", value: "Typ: Kolor, Przekątna: 3,7 cm" }
    ]}
  ]

  return (
    <div className="space-y-6">
      {specs.map((category, index) => (
        <motion.div
          key={category.category}
          className="bg-white rounded-lg border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-200">
            <h4 className="font-semibold text-emerald-700">{category.category}</h4>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Service Contract Lightbox Component
const ServiceContractLightbox = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Wsparcie serwisowe Epson</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Epson DS-730n jest objęty profesjonalnym wsparciem serwisowym, 
                  zapewniającym kompleksową ochronę i wsparcie techniczne.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-3">Korzyści z wsparcia serwisowego:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Profesjonalna diagnostyka i naprawa</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Wsparcie techniczne</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Oryginalne części zamienne</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gwarancja producenta</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


// Main Product Page Component
export default function EpsonDS730nProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const [isServiceLightboxOpen, setIsServiceLightboxOpen] = useState(false)
  const [showRipple, setShowRipple] = useState(false)
  
  // ✅ HOOK Z KONTEKSTU ZAPYTAŃ
  const { inquiryCount, addToInquiry, openCart } = useInquiry()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - IDENTYCZNY JAK STRONA GŁÓWNA */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo_footer_header.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </div>
            
            <div className="flex items-center gap-8">
              <ul className="hidden md:flex items-center gap-8">
                <li><a href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</a></li>
                <li><a href="#produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</a></li>
                <li><a href="/serwis" className="text-gray-700 hover:text-emerald-600 transition-colors">Serwis</a></li>
                <li><a href="/kontakt" className="text-gray-700 hover:text-emerald-600 transition-colors">Kontakt</a></li>
              </ul>
              
              {/* ✅ PRZYCISK ZAPYTANIE Z onClick={openCart} */}
              <motion.button 
                onClick={openCart}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 relative overflow-hidden"
                animate={showRipple ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCart className="h-4 w-4" />
                Zapytanie ({inquiryCount})
                
                {/* Ripple Effect */}
                <AnimatePresence>
                  {showRipple && (
                    <>
                      <motion.span
                        className="absolute inset-0 bg-white rounded-lg"
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <motion.span
                        className="absolute inset-0 bg-white rounded-lg"
                        initial={{ scale: 0, opacity: 0.4 }}
                        animate={{ scale: 3, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                      />
                      <motion.span
                        className="absolute inset-0 bg-white rounded-lg"
                        initial={{ scale: 0, opacity: 0.3 }}
                        animate={{ scale: 3.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                      />
                    </>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </nav>
        </div>
      </header>
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-emerald-600">Strona główna</a>
          <span className="mx-2">/</span>
          <a href="/kategoria/ezd" className="hover:text-emerald-600">EZD</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Epson DS-730n</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={[]} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  Skaner dokumentowy
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Epson DS-730n
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Epson DS-730n to wydajny skaner dokumentowy z automatycznym podajnikiem na 100 arkuszy. Oferuje szybkie skanowanie dwustronne z prędkością do 40 stron na minutę i rozdzielczością 600 DPI. Dzięki wbudowanemu interfejsowi sieciowemu i Wi-Fi można udostępnić urządzenie wielu użytkownikom w biurze lub nadleśnictwie. Zaawansowane funkcje obejmują automatyczne wykrywanie dokumentów, usuwanie pustych stron oraz rozpoznawanie kodów kreskowych. Idealny do digitalizacji dokumentów leśnych i biurowych.
              </p>
              
              {/* ✅ PRZYCISK DODAJ DO ZAPYTANIA Z OBIEKTEM PRODUKTU */}
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'epson-ds-730n',
                      name: 'Epson DS-730n',
                      image: '/ds730_1.png',
                      category: 'Skanery',
                      description: 'Wydajny skaner dokumentowy z automatycznym podajnikiem na 100 arkuszy',
                      specifications: '40 str/min, 600 DPI, Wi-Fi, ADF 100 arkuszy'
                    })
                    setShowRipple(true)
                    setTimeout(() => setShowRipple(false), 1000)
                  }}
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Zapytaj o produkt
                </motion.button>
              </div>

              {/* Gdzie kupić - prosty design */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gdzie kupić?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <span className="font-medium text-gray-900">ZUP Łódź</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <span className="font-medium text-gray-900">TAKMA</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'specs', label: 'Specyfikacja' },
              { id: 'downloads', label: 'Pliki do pobrania' },
              { id: 'service', label: 'Serwis', isScroll: true }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  tab.id === 'service'
                    ? 'border-transparent text-orange-600 hover:text-orange-700 hover:border-orange-300'
                    : activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => {
                  if (tab.isScroll) {
                    // Scroll to service section
                    const serviceSection = document.getElementById('service-section')
                    if (serviceSection) {
                      serviceSection.scrollIntoView({ behavior: 'smooth' })
                    }
                  } else {
                    setActiveTab(tab.id)
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mb-16">
          <AnimatePresence mode="wait">


            {activeTab === 'specs' && (
              <motion.div
                key="specs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Specifications />
              </motion.div>
            )}



            {activeTab === 'downloads' && (
              <motion.div
                key="downloads"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {[
                  { title: "Karta katalogowa", type: "PDF", size: "1.2 MB" },
                  { title: "Instrukcja obsługi", type: "PDF", size: "3.4 MB" },
                  { title: "Specyfikacja techniczna", type: "PDF", size: "0.8 MB" }
                ].map((file, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg p-6 border border-gray-200 hover:border-emerald-300 cursor-pointer transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                        <FileText className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{file.title}</h4>
                        <p className="text-sm text-gray-500">{file.type} • {file.size}</p>
                      </div>
                    </div>
                    <button className="w-full bg-emerald-50 text-emerald-600 py-2 rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center">
                      <Download className="w-4 h-4 mr-2" />
                      Pobierz
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Service Contract Lightbox */}
      <ServiceContractLightbox 
        isOpen={isServiceLightboxOpen} 
        onClose={() => setIsServiceLightboxOpen(false)} 
      />

      {/* Courier Service Section */}
      <CourierServiceSection productName="Epson DS-730n" />

{/* Footer */}
<footer className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/20 py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-10">
        <img src="/takma_logo_footer.png" alt="TAKMA" className="h-14 w-auto" />
        <span className="text-gray-700 text-lg">takma@takma.com.pl</span>
        <span className="text-gray-700 text-lg">607 819 688</span>
        <span className="text-gray-700 text-lg">51-128 Wrocław, ul. Poświęcka 1a</span>
      </div>
      <div className="w-full max-w-4xl border-t border-gray-300"></div>
      <div className="text-gray-500 text-sm">
        © 2024 Rejestratory.info. Wszystkie prawa zastrzeżone.
      </div>
    </div>
  </div>
</footer>
</div>
  )
}
