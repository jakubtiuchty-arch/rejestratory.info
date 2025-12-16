'use client'

import CourierServiceSection from "@/components/CourierServiceSection";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useInquiry } from '@/components/InquiryContext'
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
  Laptop,
  Cpu
} from 'lucide-react'

// Image Gallery Component
const ImageGallery = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const galleryImages = [
    '/aio_dell_1.png',
    '/aio_dell_2.png',
    '/aio_dell_3.png',
    '/aio_dell_4.png'
  ]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={galleryImages[currentImage]}
          alt="Dell Pro 24 All in One"
          className="w-full h-full object-contain"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/80 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
              currentImage === index ? 'border-emerald-600' : 'border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentImage(index)}
          >
            <img
              src={galleryImages[index]}
              alt={`View ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </motion.div>
        ))}
      </div>

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
                src={galleryImages[currentImage]}
                alt="Dell Pro 24 All in One - powiększenie"
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
    { category: "Wyświetlacz", items: [
      { name: "Rozmiar", value: "23,8 cala" },
      { name: "Typ", value: "FHD, 100 Hz, bez obsługi dotykowej" },
      { name: "Kamera", value: "FHD HDR" }
    ]},
    { category: "Wydajność", items: [
      { name: "Procesor", value: "Intel® Core™ Ultra 5 235" },
      { name: "NPU", value: "13 TOPS, 14 rdzeni, do 5,0 GHz" },
      { name: "RAM", value: "16 GB DDR5, 5600 MT/s" },
      { name: "Dysk", value: "SSD 512 GB" },
      { name: "Karta graficzna", value: "Zintegrowany układ graficzny" }
    ]},
    { category: "Łączność i akcesoria", items: [
      { name: "Sieć bezprzewodowa", value: "Wi-Fi 6E AX211, 2x2, 802.11ax" },
      { name: "Bluetooth", value: "Bluetooth®" },
      { name: "Klawiatura", value: "Multimedialna Dell KB216" },
      { name: "Mysz", value: "Przewodowa Dell MS116" }
    ]},
    { category: "System i gwarancja", items: [
      { name: "System operacyjny", value: "Windows 11 Pro" },
      { name: "Podstawa", value: "Regulowana wysokość (HAS)" },
      { name: "Gwarancja", value: "ProSupport 60 miesięcy (5 lat)" },
      { name: "Serwis", value: "Na miejscu w następnym dniu roboczym" }
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
                <h3 className="text-xl font-bold text-gray-900">Dell ProSupport - Gwarancja Premium</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Dell Pro 24 All in One jest objęty 5-letnią gwarancją Dell ProSupport z serwisem na miejscu 
                  w następnym dniu roboczym po przeprowadzeniu zdalnej diagnozy. To kompleksowe wsparcie 
                  zapewnia ciągłość pracy i bezpieczeństwo inwestycji.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-3">Co zyskuje administrator i użytkownik?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Serwis na miejscu w następnym dniu roboczym - zero przestojów</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pomoc techniczna 24/7 w zakresie sprzętu i oprogramowania</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Zdalna diagnostyka przed wizytą technika</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gwarancja na 5 lat - przewidywalne koszty i spokój</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priorytetowe wsparcie dla urządzeń biznesowych</span>
                    </li>
                
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Korzyści dla Nadleśnictwa:
                  </p>
                  <p className="text-sm">
                    Dell ProSupport oznacza całkowite bezpieczeństwo operacyjne - każda awaria jest 
                    rozwiązywana następnego dnia roboczego bezpośrednio na miejscu. Administrator ma 
                    pełną kontrolę i przewidywalność kosztów przez 5 lat.
                  </p>
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
export default function DellPro24AIOProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const [isServiceLightboxOpen, setIsServiceLightboxOpen] = useState(false)
  
  // ← ZMIENIONE: Używamy Context zamiast lokalnego state
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
          <a href="/kategoria/all-in-one" className="hover:text-emerald-600">All in One</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Dell Pro 24 All in One</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  All-in-One
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dell Pro 24 All in One
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Dell Pro 24 All in One to kompaktowe rozwiązanie biznesowe łączące wydajność komputera stacjonarnego z elegancją jednolitej konstrukcji. Wyposażony w duży 23,8-calowy wyświetlacz FHD 100 Hz zapewnia komfortową pracę z dokumentami i aplikacjami biurowymi. Nowoczesny procesor Intel Core Ultra 5 z zintegrowanym NPU 13 TOPS gwarantuje płynną wielozadaniowość i długą żywotność inwestycji. Komputer wyposażony w podstawę o regulowanej wysokości umożliwia dostosowanie pozycji ekranu do indywidualnych potrzeb. Kompleksowa 5-letnia gwarancja Dell ProSupport z serwisem na miejscu zapewnia całkowite bezpieczeństwo operacyjne i przewidywalność kosztów dla nadleśnictw.
              </p>
              
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'dell-pro-24-aio',
                      name: 'Dell Pro 24 All in One',
                      image: '/aio_dell_1.png',
                      category: 'All-in-One',
                      description: 'Kompaktowe rozwiązanie biznesowe z 23,8" wyświetlaczem FHD',
                      specifications: 'Intel Core Ultra 5 235, 16GB RAM, 512GB SSD, Windows 11 Pro'
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

              {/* Gwarancja Dell ProSupport i Intel Ultra 5 - grid 2 kolumny */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Gwarancja Dell ProSupport */}
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-emerald-700">5-letnia gwarancja Dell ProSupport</h4>
                        <motion.button
                          onClick={() => setIsServiceLightboxOpen(true)}
                          className="p-1 hover:bg-emerald-200 rounded-full transition-colors"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                        >
                          <Info className="w-4 h-4 text-emerald-600" />
                        </motion.button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Objęty kompleksową gwarancją ProSupport z serwisem na miejscu w następnym dniu roboczym po zdalnej diagnozie. 
                        Pełne wsparcie techniczne 24/7, brak przestojów i gwarancja ciągłości pracy przez 5 lat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Intel Ultra 5 */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-3">
                    <Cpu className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Procesor Intel® Core™ Ultra 5</h4>
                      <p className="text-sm text-blue-50">
                        Najnowszy procesor z NPU 13 TOPS i 14 rdzeniami zapewnia wyjątkową wydajność 
                        w pracy z dokumentami, aplikacjami i wielozadaniowości do 5,0 GHz.
                      </p>
                    </div>
                  </div>
                </div>
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
                  { title: "Karta katalogowa", type: "PDF", size: "1.8 MB" },
                  { title: "Instrukcja obsługi", type: "PDF", size: "3.2 MB" },
                  { title: "Specyfikacja techniczna", type: "PDF", size: "1.1 MB" }
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
      <CourierServiceSection productName="Dell Pro 24 All in One" />

      {/* Footer */}
<Footer />
</div>
  )
}
