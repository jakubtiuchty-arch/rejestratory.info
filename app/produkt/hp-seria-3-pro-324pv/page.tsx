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
  Laptop,
  Monitor,
  Video,
  Mic,
  Speaker,
  Zap,
  Award,
  Layout,
  DollarSign
} from 'lucide-react'
import { useInquiry } from '@/components/InquiryContext'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const allImages = ['/hp_series_1.png', '/hp_series_2.png', '/hp_series_3.png', '/hp_series_4.png']

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="relative bg-white rounded-lg overflow-hidden aspect-video cursor-pointer flex items-center justify-center"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={allImages[currentImage]}
          alt="HP Seria 3 Pro 324pv"
          className="object-contain"
          style={{ width: '80%', height: '80%' }}
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/80 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { index: 1, src: allImages[1] },
          { index: 2, src: allImages[2] },
          { index: 3, src: allImages[3] }
        ].map((item) => (
          <motion.div
            key={item.index}
            className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer border-2 flex items-center justify-center ${
              currentImage === item.index ? 'border-emerald-600' : 'border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentImage(item.index)}
          >
            <img
              src={item.src}
              alt={`View ${item.index + 1}`}
              className="object-contain"
              style={{ width: '80%', height: '80%' }}
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
              className="relative max-w-4xl max-h-full flex items-center justify-center"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
            >
              <img
                src={allImages[currentImage]}
                alt="HP Seria 3 Pro 324pv - powiększenie"
                className="object-contain"
                style={{ width: '80%', height: '80%' }}
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
      { name: "Rozmiar", value: "23,8 cala (60,5 cm)" },
      { name: "Rozdzielczość", value: "Full HD (1920 × 1080)" },
      { name: "Częstotliwość odświeżania", value: "100 Hz" },
      { name: "Matryca", value: "VA, kąty widzenia 178°/178°" },
      { name: "Jasność", value: "250 nitów, kontrast 3000:1" },
      { name: "Czas odpowiedzi", value: "5 ms GtG (z Overdrive)" },
      { name: "Gama kolorów", value: "72% NTSC, 16,7 mln kolorów" },
      { name: "Obramowanie", value: "Mikrokrawędzie z 3 stron" }
    ]},
    { category: "Łączność", items: [
      { name: "Porty wideo", value: "HDMI 1.4, VGA" },
      { name: "HDCP", value: "Tak (HDMI)" },
      { name: "Wyświetlanie częstotliwości", value: "50–100 Hz (HDMI), 50–60 Hz (VGA)" }
    ]},
    { category: "Ergonomia", items: [
      { name: "Przechylanie", value: "-5° / +23°" },
      { name: "Mocowanie VESA", value: "100 × 100 mm" },
      { name: "Typ podstawy", value: "Stojak o stałej wysokości" },
      { name: "Waga", value: "3,56 kg" }
    ]},
    { category: "Dodatkowe funkcje", items: [
      { name: "HP Display Center", value: "Tak" },
      { name: "HP Eye Ease", value: "Tak (certyfikat TÜV Low Blue Light)" },
      { name: "Eliminacja migotania", value: "Tak (certyfikat TÜV)" },
      { name: "Powłoka", value: "Antyrefleksyjna 3H" },
      { name: "Zasilanie", value: "Wewnętrzne, 100–240 V AC" },
      { name: "Gwarancja", value: "3 lata ograniczona HP" }
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
                <h3 className="text-xl font-bold text-gray-900">Gwarancja HP</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  HP Seria 3 Pro 324pv jest objęty 3-letnią ograniczoną gwarancją HP na sprzęt. 
                  To podstawowe wsparcie zapewnia bezpieczeństwo inwestycji i niezawodność działania.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-3">Co zyskuje administrator i użytkownik?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>3 lata gwarancji standardowej HP</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Wsparcie techniczne HP</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Przewidywalne koszty przez 3 lata</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Niezawodność marki HP</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Korzyści dla Nadleśnictwa:
                  </p>
                  <p className="text-sm">
                    Standardowa gwarancja HP zapewnia podstawową ochronę i wsparcie techniczne. 
                    Administrator ma pewność działania sprzętu przez cały okres gwarancji przy 
                    zachowaniu kontroli nad budżetem.
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
export default function HPSeries3Pro324pvProductPage() {
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
          <a href="/kategoria/monitory" className="hover:text-emerald-600">Monitory</a>
          <span className="mx-2">/</span>
          <a href="/produkt/hp-series-3-pro-324pv" className="text-gray-900">HP Seria 3 Pro 324pv</a>
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
                  Monitor
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                HP Seria 3 Pro 324pv
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                HP Seria 3 Pro 324pv to ekonomiczny monitor biznesowy 23,8 cala stworzony z myślą o efektywnej pracy biurowej. Matryca VA Full HD z odświeżaniem 100 Hz gwarantuje płynny i wyraźny obraz podczas codziennych zadań. Technologia HP Eye Ease z certyfikatem TÜV oraz eliminacja migotania chronią wzrok podczas długotrwałego użytkowania. Mikrokrawędzie z trzech stron maksymalizują przestrzeń roboczą, a ergonomiczna podstawa pozwala na wygodne ustawienie monitora. Porty HDMI i VGA zapewniają uniwersalną kompatybilność ze sprzętem. Doskonały wybór dla instytucji poszukujących niezawodnego rozwiązania w przystępnej cenie - objęty 3-letnią gwarancją HP.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'hp-series-3-pro-324pv',
                      name: 'HP Seria 3 Pro 324pv',
                      image: '/hp_series_1.png',
                      category: 'Monitory',
                      description: 'Ekonomiczny monitor biznesowy 23,8" Full HD',
                      specifications: '23,8", Full HD, 100Hz, VA, HP Eye Ease, 3 lata gwarancji'
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

              {/* Ekonomiczne rozwiązanie - pełna szerokość */}
              <div className="mb-6">
                {/* Ekonomiczne rozwiązanie */}
                <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-3">
                    <DollarSign className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Ekonomiczne rozwiązanie biznesowe</h4>
                      <p className="text-sm text-teal-50">
                        HP Seria 3 Pro 324pv oferuje doskonały stosunek jakości do ceny. Niezawodny monitor dla administracji publicznej, który łączy funkcjonalność z oszczędnością budżetu.
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
                  { title: "Karta katalogowa", type: "PDF", size: "1.1 MB" },
                  { title: "Instrukcja obsługi", type: "PDF", size: "2.5 MB" },
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
      <CourierServiceSection productName="HP Seria 3 Pro 324pv" />

    {/* Footer */}
<Footer />
</div>
  )
}
