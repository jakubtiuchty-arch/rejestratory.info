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

import { useInquiry } from '@/components/InquiryContext' // ← DODANE

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
          src="/pc45t_1.png"
          alt="Honeywell PC45t"
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
                src="/pc45t_1.png"
                alt="Honeywell PC45t - powiększenie"
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
    { category: "Charakterystyka mechaniczna", items: [
      { name: "Wymiary (DxSxW)", value: "179.6 mm x 212.9 mm x 285.5 mm (7.1 in x 8.4 in x 11.1 in)" },
      { name: "Waga", value: "2.7 kg (5.9 lbs)" }
    ]},
    { category: "Warunki środowiskowe", items: [
      { name: "Temperatura pracy", value: "0°C do 45°C (32°F do 113°F)" },
      { name: "Temperatura przechowywania", value: "-20°C do 70°C (-4°F do 152°F)" },
      { name: "Wilgotność", value: "10% do 90%, bez kondensacji" }
    ]},
    { category: "Specyfikacja druku", items: [
      { name: "Maksymalna szerokość przy 203 dpi", value: "108 mm (4.25 in)" },
      { name: "Maksymalna szerokość przy 300 dpi", value: "106 mm (4.12 in)" }
    ]},
    { category: "Prędkość druku", items: [
      { name: "Przy 203 dpi", value: "2ips do 8ips" },
      { name: "Przy 300 dpi", value: "2ips do 6ips" }
    ]},
    { category: "Rozdzielczość druku", items: [
      { name: "Przy 203 dpi", value: "8 dots/mm" },
      { name: "Przy 300 dpi", value: "12 dots/mm" }
    ]},
    { category: "Łączność bezprzewodowa", items: [
      { name: "WLAN", value: "IEEE 802.11 a/b/g/n/ac/ax; Wi-Fi certified" },
      { name: "Bezpieczeństwo WLAN", value: "OPEN, WEP, WPA/WPA2/WPA3 (Personal and Enterprise)" },
      { name: "FAST roaming", value: "802.11r" },
      { name: "Obsługiwane EAP", value: "TTLS, TLS, PEAP, LEAP" },
      { name: "Bluetooth", value: "Bluetooth® 5.2 (montaż fabryczny lub terenowy)" }
    ]},
    { category: "Specyfikacja nośników i taśmy", items: [
      { name: "Maksymalna szerokość nośnika", value: "118mm (4.65 in)" },
      { name: "Maksymalna średnica rolki nośnika", value: "127 mm (5 in) O.D" },
      { name: "Średnica wewnętrzna rdzenia", value: "12.7 mm (0.5 in), 25.4 mm (1 in), 38.1 mm (1.5 in)" },
      { name: "Minimalna długość nośnika", value: "6.35 mm (0.25 in)" },
      { name: "Grubość nośnika", value: "0.05 mm (2 mil) do 0.16 mm (6.3 mil)" },
      { name: "Typy nośników", value: "Opaski, tagi, papier do paragonów, etykiety z lainerem i bez lainera, etykiety z czarnym znacznikiem lub przerwą" },
      { name: "Wykrywanie nośnika", value: "Przerwa, nacięcie, czarny znacznik, ciągły" },
      { name: "Inne wykrywanie", value: "Niski poziom nośnika" }
    ]},
    { category: "Interfejsy", items: [
      { name: "Standard", value: "Ethernet 10/100 Mbps, USB 2.0 Host High Speed, USB 2.0 Device High Speed" },
      { name: "Opcjonalnie", value: "RS-232, do 115.2 KB/s" },
      { name: "Protokoły sieciowe", value: "TCP/IP suite (TCP, UDP, IGMP), LPR/LPD, Telnet/SSH, FTP/SFTP, BOOTP, DHCP, HTTP/HTTPS, SNMPv1/2c/3" },
      { name: "Obsługa", value: "IPv4 i IPv6" }
    ]},
    { category: "RFID", items: [
      { name: "Standard", value: "ISO 18000-6C / EPC Class 1 Generation 2" },
      { name: "Zgodność", value: "Radio skonfigurowane zgodnie z lokalnymi przepisami UHF RFID, w tym FCC i ETSI" }
    ]},
    { category: "Bezpieczne kanały sieciowe", items: [
      { name: "Secure Net1", value: "Bezpieczny kanał drukowania" },
      { name: "Konfiguracja", value: "Bezpieczny kanał konfiguracji drukarki" }
    ]},
    { category: "Opcje i akcesoria", items: [
      { name: "Dostępne akcesoria", value: "Moduł samoobsługowy z LTS, Czujnik niskiego poziomu nośnika, RFID UHF, Moduł tnący (z lainerem i bez lainera), Zewnętrzny uchwyt na nośnik, Modem komórkowy" }
    ]},
    { category: "Interfejs użytkownika", items: [
      { name: "Wyświetlacz", value: "88.9 mm (3.5 in) 320 x 240 kolorowy LCD" },
      { name: "Przyciski", value: "1 przycisk Print/Feed i dioda LED gotowości" }
    ]},
    { category: "Pamięć", items: [
      { name: "RAM", value: "256 MB" },
      { name: "Flash", value: "512 MB" }
    ]},
    { category: "Zasilanie", items: [
      { name: "Wejście", value: "100–240V AC/50–60 Hz, 1.5 A" },
      { name: "Wyjście", value: "24V DC, 3.15 A" }
    ]},
    { category: "Oprogramowanie", items: [
      { name: "Języki poleceń drukarki", value: "Fingerprint (FP), Direct Protocol (DP), Intermec Printer Language (IPL), ZSim2 (ZPL-II), DPL, XML (SAP AII i Oracle WMS), PDF, C#" },
      { name: "Aplikacje/Sterowniki", value: "InterDriver Windows printer driver, CUPS driver dla Linux, Honeywell Device Types dla SAP, Honeywell label design and print package" },
      { name: "Języki Smart Printing", value: "C# for Printers: Honeywell Smart Printing Developer Resource Kit" },
      { name: "Konfiguracja i zarządzanie", value: "PrintSet 6 dla konfiguracji drukarki; zaawansowany interfejs webowy dla konfiguracji, aktualizacji i zarządzania 1:1" }
    ]},
    { category: "Certyfikaty i zgodność", items: [
      { name: "Zgodność", value: "RoHS Compliant, CE (EN55032 Class B), FCC Class B, Energy Star 3.2 Qualified" },
      { name: "Szczegóły", value: "Pełna lista certyfikatów dostępna na www.honeywell.com/PSScompliance" }
    ]},
    { category: "Gwarancja", items: [
      { name: "Gwarancja standardowa", value: "Dwa lata" },
      { name: "Rozszerzone pakiety serwisowe", value: "Dostępne przez Honeywell Repair Services" }
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
                <h3 className="text-xl font-bold text-gray-900">Wsparcie serwisowe Honeywell</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Honeywell PC45t jest objęty profesjonalnym wsparciem serwisowym, 
                  zapewniającym kompleksową ochronę i wsparcie techniczne.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-3">Korzyści z pakietu serwisowego:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dwuletnia gwarancja standardowa</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Wsparcie techniczne Honeywell</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Rozszerzone pakiety serwisowe dostępne</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Możliwość wykupienia dodatkowego wsparcia</span>
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
export default function HoneywellPC45tProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const [isServiceLightboxOpen, setIsServiceLightboxOpen] = useState(false)
  const [showRipple, setShowRipple] = useState(false)

  const { inquiryCount, addToInquiry, openCart } = useInquiry() // ← DODANE

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
              
              <motion.button 
                onClick={openCart} // ← DODANE: otwieranie panelu zapytań
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 relative overflow-hidden"
                animate={showRipple ? { scale: [1, 1.05, 1] } : {}}
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
          <span className="text-gray-900">Honeywell PC45t</span>
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
                  Drukarka etykiet
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Honeywell PC45t
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Honeywell PC45t to kompaktowa drukarka termotransferowa stworzona z myślą o wymagających środowiskach pracy. 
                Łączy niezawodność, prostotę obsługi i wszechstronność w niewielkiej obudowie. Dzięki intuicyjnemu 
                kolorowemu ekranowi LCD 3.5 cala oraz zaawansowanym opcjom łączności bezprzewodowej (Wi-Fi 6 i Bluetooth 5.2), 
                urządzenie świetnie sprawdzi się w biurach leśnych, magazynach i punktach terenowych. Obsługuje szeroką gamę 
                nośników - od etykiet, przez tagi, po opaski identyfikacyjne, oferując elastyczność w codziennych zadaniach 
                drukowania.
              </p>
              
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'honeywell-pc45t',                 // ← unikalny ID produktu
                      name: 'Honeywell PC45t',
                      image: '/pc45t_1.png',
                      category: 'Drukarki etykiet',
                      description: 'Kompaktowa drukarka termotransferowa z Wi-Fi 6 i BT 5.2',
                      specifications: '203/300 dpi, do 8 ips, 118 mm media, LCD 3.5”'
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
      <CourierServiceSection productName="Honeywell PC45t" />

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
