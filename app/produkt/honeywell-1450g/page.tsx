'use client'

import CourierServiceSection from "@/components/CourierServiceSection";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
          src="/1450g_1.png"
          alt="Honeywell 1450g"
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
                src="/1450g_1.png"
                alt="Honeywell 1450g - powiększenie"
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
    { category: "Podstawowe informacje", items: [
      { name: "Producent", value: "Honeywell" },
      { name: "Typ czytnika", value: "Przewodowy, obszarowy" },
      { name: "Szablon skanowania", value: "Obszar (640 x 480)" },
      { name: "Wielokierunkowy", value: "Tak" },
      { name: "Minimalny kontrast kodu", value: "35%" }
    ]},
    { category: "Odczyt kodów", items: [
      { name: "Typy kodów", value: "1D, PDF417, 2D" },
      { name: "Specjalne możliwości", value: "Kody z wyświetlaczy LCD, urządzeń mobilnych" },
      { name: "Dodatkowe opcje", value: "Uszkodzone kody, niski kontrast, kody Aztec (dowód rejestracyjny)" },
      { name: "Zasięg odczytu", value: "3,7 – 26 cm (dla typowego kodu UPC 13 mil)" }
    ]},
    { category: "Wyzwalanie i sygnalizacja", items: [
      { name: "Wyzwalanie odczytu", value: "Ręczne, automatyczne" },
      { name: "Sygnalizacja", value: "Dźwiękowa, świetlna" }
    ]},
    { category: "Zastosowanie", items: [
      { name: "Handel i obsługa klienta", value: "Wysoko zalecany (++)" },
      { name: "Gastronomia", value: "Zalecany (+)" },
      { name: "Administracja, biblioteki", value: "Wysoko zalecany (++)" },
      { name: "Apteki", value: "Wysoko zalecany (++)" },
      { name: "Ochrona zdrowia", value: "Zalecany (+)" },
      { name: "Logistyka", value: "Zalecany (+)" }
    ]},
    { category: "Parametry fizyczne", items: [
      { name: "Klasa szczelności", value: "IP40" },
      { name: "Odporność na upadki", value: "30 x 1,5 m na beton" },
      { name: "Temperatura pracy", value: "0℃ do +40℃" },
      { name: "Wymiary", value: "62 x 169 x 82 mm" },
      { name: "Waga", value: "130 g" }
    ]},
    { category: "Interfejsy i opcje", items: [
      { name: "Interfejsy", value: "USB, KBW/PS2, RS232" },
      { name: "Multi-interface", value: "Tak" },
      { name: "Kolory obudowy", value: "Biały, czarny" },
      { name: "Podstawka", value: "Dostępna opcjonalnie" },
      { name: "Unikalna funkcja", value: "Możliwość zakupu wersji 1D i późniejszej aktualizacji do 2D" }
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
                  Honeywell 1450g jest objęty profesjonalnym wsparciem serwisowym, 
                  zapewniającym kompleksową ochronę i wsparcie techniczne.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-3">Korzyści ze wsparcia serwisowego:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Szybka reakcja serwisu</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Wsparcie techniczne</span>
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
export default function Honeywell1450gProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const [isServiceLightboxOpen, setIsServiceLightboxOpen] = useState(false)
  const { inquiryCount, addToInquiry, openCart } = useInquiry()
  const [showRipple, setShowRipple] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="produkty" />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-500">
          <a href="/" className="hover:text-emerald-600">Strona główna</a>
          <span className="mx-2">/</span>
          <a href="/kategoria/ezd" className="hover:text-emerald-600">EZD</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Honeywell 1450g</span>
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
                  Czytnik kodów 2D
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Honeywell 1450g
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Honeywell 1450g to uniwersalny czytnik kodów kreskowych, który łączy w sobie wszechstronność odczytu 1D i 2D 
                z ergonomicznym designem i doskonałą wydajnością. Dzięki obszarowej technologii skanowania odczytuje wszystkie 
                popularne kody, w tym te z wyświetlaczy urządzeń mobilnych. Idealny dla punktów sprzedaży, aptek, bibliotek 
                oraz placówek administracyjnych. Kompaktowa konstrukcja i niska waga zapewniają komfort podczas całodziennej pracy.
              </p>
              
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'honeywell-1450g',
                      name: 'Honeywell 1450g',
                      image: '/1450g_1.png',
                      category: 'Czytniki kodów',
                      description: 'Uniwersalny czytnik kodów kreskowych 1D i 2D',
                      specifications: 'Obszarowy, wielokierunkowy, IP40'
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
      <CourierServiceSection productName="Honeywell 1450g" />

{/* Footer */}
<Footer />
</div>
  )
}
