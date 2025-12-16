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
  Maximize2
} from 'lucide-react'
import { useInquiry } from '@/components/InquiryContext'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const allImages = ['/527pu_1.png', '/527pu_2.png', '/527pu_3.png', '/527pu_4.png']

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
          alt="HP Seria 5 QHD USB-C"
          className="object-contain"
          style={{ width: '93%', height: '93%' }}
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
              style={{ width: '93%', height: '93%' }}
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
                alt="HP Seria 5 QHD USB-C - powiększenie"
                className="object-contain"
                style={{ width: '93%', height: '93%' }}
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
      { name: "Rozmiar", value: "27 cali (68,6 cm)" },
      { name: "Rozdzielczość", value: "QHD (2560 × 1440)" },
      { name: "Częstotliwość odświeżania", value: "100 Hz" },
      { name: "Matryca", value: "IPS, kąty widzenia 178°/178°" },
      { name: "Jasność", value: "350 nitów, kontrast 1500:1" },
      { name: "Czas odpowiedzi", value: "5 ms GtG (z Overdrive)" },
      { name: "Gama kolorów", value: "100% sRGB, 16,7 mln kolorów" },
      { name: "Obramowanie", value: "Mikrokrawędzie z 3 stron" }
    ]},
    { category: "Łączność", items: [
      { name: "Porty wideo", value: "HDMI 2.0, DisplayPort 1.4 (in/out), USB-C" },
      { name: "USB Type-C", value: "Tak, z obsługą obrazu i danych" },
      { name: "Ethernet", value: "RJ-45 (10/100/1000 Mb/s)" },
      { name: "HDCP", value: "Tak (DisplayPort, HDMI, USB-C)" },
      { name: "Daisy Chain", value: "Tak, przez DisplayPort" }
    ]},
    { category: "Ergonomia", items: [
      { name: "Regulacja wysokości", value: "150 mm" },
      { name: "Przechylanie", value: "-5° / +20°" },
      { name: "Obrót poziomy", value: "±45°" },
      { name: "Obrót pionowy", value: "±90°" },
      { name: "Mocowanie VESA", value: "100 × 100 mm" },
      { name: "Waga", value: "7,2 kg (z podstawą)" }
    ]},
    { category: "Dodatkowe funkcje", items: [
      { name: "HP Display Center", value: "Tak" },
      { name: "HP Eye Ease", value: "Tak (certyfikat TÜV Low Blue Light)" },
      { name: "Eliminacja migotania", value: "Tak" },
      { name: "Powłoka", value: "Antyrefleksyjna 3H" },
      { name: "Certyfikaty", value: "TCO, EPEAT Gold, ENERGY STAR" },
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
                  HP Seria 5 QHD USB-C jest objęty 3-letnią ograniczoną gwarancją HP na sprzęt. 
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
export default function HPSeries5QHDUSBCProductPage() {
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
          <a href="/produkt/hp-series-5-qhd-usb-c" className="text-gray-900">HP Seria 5 QHD USB-C</a>
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
                HP Seria 5 QHD USB-C
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                HP Seria 5 QHD USB-C to profesjonalny monitor biznesowy 27 cali oferujący wyjątkową jakość obrazu w rozdzielczości QHD 2560×1440. Matryca IPS z częstotliwością odświeżania 100 Hz zapewnia płynny, wyraźny obraz i doskonałe kąty widzenia. Jasność 350 nitów i pokrycie 100% sRGB gwarantują precyzyjne odwzorowanie kolorów. Port USB-C z funkcją DisplayPort oraz wbudowany hub Ethernet sprawiają, że monitor staje się centrum produktywności. Mikrokrawędzie z trzech stron maksymalizują przestrzeń roboczą, a zaawansowana ergonomia z regulacją wysokości i obrotem umożliwia idealne dopasowanie stanowiska. Technologia HP Eye Ease chroni wzrok podczas całodziennej pracy.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'hp-seria-5-qhd-usb-c',
                      name: 'HP Seria 5 QHD USB-C',
                      image: '/527pu_1.png',
                      category: 'Monitory',
                      description: 'Profesjonalny monitor 27" QHD 100Hz z USB-C',
                      specifications: '27" QHD (2560x1440), IPS, 100Hz, USB-C, Ethernet'
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

              {/* Monitor QHD - pełna szerokość */}
              <div className="mb-6">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-3">
                    <Maximize2 className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Rozdzielczość QHD 2560×1440</h4>
                      <p className="text-sm text-purple-50">
                        HP Seria 5 oferuje rozdzielczość QHD na 27-calowej matrycy IPS. O 77% więcej przestrzeni roboczej niż Full HD – idealne dla pracy wielozadaniowej i profesjonalnych aplikacji.
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
      <CourierServiceSection productName="HP Seria 5 QHD USB-C" />

{/* Footer */}
<Footer />
</div>
  )
}
