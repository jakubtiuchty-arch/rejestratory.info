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
  AlertTriangle
} from 'lucide-react'
import { useInquiry } from '@/components/InquiryContext'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  const productImages = [
    '/em45_1.webp',
    '/em45_2.webp',
    '/em45_3.webp',
    '/em45_4.webp'
  ]

  const thumbnailImages = [
    '/em45_2.webp',
    '/em45_3.webp',
    '/em45_4.webp'
  ]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="relative bg-white rounded-lg overflow-hidden aspect-video cursor-pointer border border-gray-200"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={productImages[currentImage]}
          alt="Zebra EM45"
          className="w-full h-full object-contain"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/80 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-3 gap-2">
        {thumbnailImages.map((image, index) => (
          <motion.div
            key={index}
            className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer border-2 ${
              currentImage === index + 1 ? 'border-emerald-600' : 'border-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentImage(index + 1)}
          >
            <img
              src={image}
              alt={`View ${index + 2}`}
              className="w-full h-full object-contain p-2"
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
                src={productImages[currentImage]}
                alt="Zebra EM45 - powiększenie"
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

// TCO Calculator Component
const TCOCalculator = () => {
  const [usage, setUsage] = useState(100)
  const [years, setYears] = useState(3)
  
  const zebraCost = 2890
  const phoneCost = 1200
  const zebraTotal = zebraCost + (usage * 0.1 * years * 12)
  const phoneTotal = phoneCost + (usage * 0.8 * years * 12) + (300 * years)

  return (
    <motion.div
      className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <Calculator className="w-6 h-6 text-emerald-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">Kalkulator TCO</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Użycie dziennie (skanów)
          </label>
          <input
            type="range"
            min="50"
            max="500"
            value={usage}
            onChange={(e) => setUsage(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-emerald-600 font-semibold">{usage} skanów</span>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Okres (lata)
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-emerald-600 font-semibold">{years} lat</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border border-emerald-200">
          <h4 className="font-semibold text-emerald-700 mb-2">Zebra EM45</h4>
          <div className="text-2xl font-bold text-emerald-600">
            {zebraTotal.toLocaleString()} zł
          </div>
          <div className="text-sm text-gray-600">
            Koszt całkowity przez {years} lat
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">Smartphone</h4>
          <div className="text-2xl font-bold text-gray-600">
            {phoneTotal.toLocaleString()} zł
          </div>
          <div className="text-sm text-gray-600">
            Koszt całkowity przez {years} lat
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-100 rounded-lg">
        <div className="flex items-center text-emerald-700">
          <BarChart3 className="w-5 h-5 mr-2" />
          <span className="font-semibold">
            Oszczędności: {(phoneTotal - zebraTotal).toLocaleString()} zł ({Math.round((phoneTotal - zebraTotal) / phoneTotal * 100)}%)
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Specifications Component
const Specifications = () => {
  const specs = [
    { category: "Wyświetlacz", items: [
      { name: "Rozmiar", value: "6.7 cala" },
      { name: "Rozdzielczość", value: "2400 x 1080 FHD+, 450 nitów," },
    ]},
    { category: "Wydajność", items: [
      { name: "Procesor", value: "Qualcomm® 5430 Octa-core, 2.2 GHz" },
      { name: "RAM", value: "8GB" },
      { name: "Pamięć", value: "128 GB" }
    ]},
    { category: "Wytrzymałość", items: [
      { name: "Norma", value: "IP68 - pyłoszczelny i wodoodporny" },
      { name: "Upadki", value: "Wytrzymuje upadki z 1.5 m" },
      { name: "Temperatura", value: "0°C do +50°C" }
    ]},
    { category: "Bateria", items: [
      { name: "Pojemność", value: "4700 mAh" },
      { name: "Czas pracy", value: "Do 14 godzin" },
      { name: "Ładowanie", value: "USB-C" }
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
                <h3 className="text-xl font-bold text-gray-900">Kontrakty serwisowe Zebra</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <p>
                  Kontrakty serwisowe Zebra to kompleksowe programy wsparcia technicznego, 
                  które zapewniają ciągłość działania Twoich urządzeń mobilnych.
                </p>
                
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 mb-2">Co obejmuje kontrakt?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Priorytetowe wsparcie techniczne 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Gwarancja wymiany urządzenia w 24h</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Regularne aktualizacje bezpieczeństwa</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Zdalne rozwiązywanie problemów</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Pokrycie kosztów napraw i części</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm">
                  Dostępne są różne poziomy kontraktów - od podstawowego wsparcia 
                  po zaawansowane pakiety z gwarancją wymiany następnego dnia roboczego.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


// Accessories Section Component
const AccessoriesSection = ({ productName }: { productName: string }) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])
  
  // ✅ HOOK Z KONTEKSTU ZAPYTAŃ
  const { addToInquiry } = useInquiry()

  const accessories = [
    {
      id: 'case',
      name: 'Etui ochronne Zebra',
      description: 'Wytrzymałe etui ochronne z paskiem na nadgarstek'
    },
    {
      id: 'charger',
      name: 'Dodatkowa ładowarka',
      description: 'Ładowarka sieciowa z kablem USB-C'
    },
    {
      id: 'workstation',
      name: 'Stacja Workstation Connect',
      description: 'Profesjonalna stacja dokująca z ładowaniem i przeniesieniem danych'
    },
    {
      id: 'holster',
      name: 'Kabura na pasek',
      description: 'Kabura z klamrą do paska z możliwością obrotu'
    }
  ]

  const toggleAccessory = (accessoryId: string) => {
    setSelectedAccessories(prev => 
      prev.includes(accessoryId) 
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  // ✅ FUNKCJA DODAWANIA WYBRANYCH AKCESORIÓW
  const handleAddSelectedAccessories = () => {
    selectedAccessories.forEach(accessoryId => {
      const accessory = accessories.find(a => a.id === accessoryId)
      if (accessory) {
        addToInquiry({
          id: `em45-accessory-${accessory.id}`,
          name: `${productName} - ${accessory.name}`,
          image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23f3f4f6'/%3E%3C/svg%3E",
          category: 'Akcesoria',
          description: accessory.description
        })
      }
    })
    // Wyczyść zaznaczone akcesoria po dodaniu
    setSelectedAccessories([])
  }

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Akcesoria
            </h3>
          </div>
          {selectedAccessories.length > 0 && (
            <motion.button
              onClick={handleAddSelectedAccessories}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Package className="w-5 h-5" />
              <span>Dodaj do zapytania ({selectedAccessories.length})</span>
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessories.map((accessory) => {
            const isSelected = selectedAccessories.includes(accessory.id)
            return (
              <motion.div
                key={accessory.id}
                className={`bg-white rounded-lg border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
                onClick={() => toggleAccessory(accessory.id)}
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="relative mb-4">
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{accessory.name}</h4>
                  <p className="text-sm text-gray-600 mb-3 flex-1">{accessory.description}</p>
                  <div className="flex items-center justify-end mt-auto">
                    <button
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isSelected 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      {isSelected ? 'Wybrane' : 'Dodaj do zapytania'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

// Main Product Page Component
export default function ZebraEM45ProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const [isServiceLightboxOpen, setIsServiceLightboxOpen] = useState(false)
  const [showRipple, setShowRipple] = useState(false)
  
  // ✅ HOOK Z KONTEKSTU ZAPYTAŃ
  const { inquiryCount, addToInquiry, openCart } = useInquiry()

  const features = [
    { icon: Shield, title: "Wytrzymałość IP68", description: "Odporność na pył, wodę i upadki z 2.4m" },
    { icon: Battery, title: "14h bateria", description: "Cały dzień pracy bez ładowania" },
    { icon: Wifi, title: "Łączność", description: "Wi-Fi 6, Bluetooth 5.0, opcjonalnie LTE" },
    { icon: Smartphone, title: "Android 11", description: "Znany system z aktualizacjami bezpieczeństwa" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - IDENTYCZNY JAK STRONA GŁÓWNA */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo_footer_header.png" alt="Rejestartory.info" className="h-8 w-auto" />
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
          <a href="/kategoria/rejestratory" className="hover:text-emerald-600">Rejestratory</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Zebra EM45</span>
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
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                  Bestseller
                </span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                  Nowość
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Zebra EM45
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Zebra EM45 to profesjonalny smartfon stworzony z myślą o pracy w trudnych warunkach terenowych, idealny dla leśników i służb terenowych. W przeciwieństwie do zwykłych telefonów, EM45 oferuje solidną, wzmocnioną konstrukcję z klasą odporności IP68, co gwarantuje niezawodność nawet w deszczu, błocie czy niskich temperaturach. Duży, czytelny ekran umożliwia wygodną obsługę aplikacji leśnych w rękawicach, a pojemna bateria zapewnia pracę przez cały dzień bez potrzeby ładowania. Dzięki stabilnej łączności LTE, Wi-Fi 6 i Bluetooth 5.0 EM45 pozostaje zawsze gotowy do działania – tam, gdzie zwykły smartfon dawno by zawiódł.
              </p>
              
              {/* ✅ PRZYCISK DODAJ DO ZAPYTANIA Z OBIEKTEM PRODUKTU */}
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'zebra-em45',
                      name: 'Zebra EM45',
                      image: '/em45_1.png',
                      category: 'Rejestratory',
                      description: 'Profesjonalny smartfon terenowy',
                      specifications: 'IP68, 6.7", Android 11, 4700mAh, 14h pracy'
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

              {/* Link do pełnej strony produktu */}
              <motion.a
                href="https://www.em45.info"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl p-6 mb-6 group shadow-lg border-2 border-emerald-200 hover:border-emerald-300"
                style={{
                  background: 'linear-gradient(to right, #ccffc4, #9eff90)',
                  transition: 'all 0.3s ease-in-out'
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-white/40 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/50 transition-all duration-300">
                      <FileText className="w-6 h-6 text-emerald-800" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-emerald-900 mb-2 text-xl">
                        Zobacz urządzenie w pełnej okazałości
                      </h4>
                      <p className="text-emerald-800 text-base">
                        Odwiedź dedykowaną stronę produktu, aby dowiedzieć się, że Zebra EM45 to nie tylko zwykły smartfon.
                      </p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0 text-emerald-800 group-hover:translate-x-1 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.a>

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

        {/* Accessories Section */}
        <AccessoriesSection productName="Zebra EM45" />

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
                  { title: "Karta katalogowa", type: "PDF", size: "2.1 MB" },
                  { title: "Instrukcja obsługi", type: "PDF", size: "8.7 MB" },
                  { title: "Specyfikacja techniczna", type: "PDF", size: "1.3 MB" },
                  { title: "Certyfikaty IP68", type: "PDF", size: "0.9 MB" },
                  { title: "Aplikacje mobilne", type: "APK", size: "45 MB" },
                  { title: "Narzędzia deweloperskie", type: "ZIP", size: "156 MB" }
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
      <CourierServiceSection productName="Zebra EM45" />

   {/* Footer */}
<Footer />
</div>
  )
}