'use client'

import CourierServiceSection from "@/components/CourierServiceSection";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  Laptop
} from 'lucide-react'

// Image Gallery Component - ZMODYFIKOWANY: usunięte miniatury, dodane dell_16_bs_1.png
const ImageGallery = ({ images }: { images: string[] }) => {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image - Larger */}
      <motion.div 
        className="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
        style={{ aspectRatio: '4/3' }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src="/dell_16_bs_1.png"
          alt="Dell Pro 16"
          className="w-full h-full object-contain"
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
                src="/dell_16_bs_1.png"
                alt="Dell Pro 16 - powiększenie"
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
      { name: "Rozmiar", value: "16 cali" },
      { name: "Typ", value: "FHD+ IPS, powłoka przeciwodblaskowa" },
      { name: "Jasność", value: "300 nitów, 45% przestrzeni barw NTSC" }
    ]},
    { category: "Wydajność", items: [
      { name: "Procesor", value: "Intel® Core™ 3 100U" },
      { name: "Rdzenie", value: "6 rdzeni, do 4,7 GHz" },
      { name: "RAM", value: "8 GB DDR5, 5600 MT/s" },
      { name: "Dysk", value: "SSD TLC 256 GB" },
      { name: "Karta graficzna", value: "Zintegrowana Intel® Graphics" }
    ]},
    { category: "Łączność i multimedia", items: [
      { name: "Sieć bezprzewodowa", value: "Wi-Fi 6E AX211, 2x2, 802.11ax" },
      { name: "Bluetooth", value: "Bluetooth® 5.3" },
      { name: "Kamera", value: "HD z czasową redukcją szumów, zasłona kamery" }
    ]},
    { category: "Klawiatura i mobilność", items: [
      { name: "Klawiatura", value: "Podświetlana z Copilot + klawiatura numeryczna" },
      { name: "Bateria", value: "55 Wh z ExpressCharge™ i ExpressCharge Boost™" },
      { name: "Zasilacz", value: "65 W USB Type-C" },
      { name: "System", value: "Ubuntu Linux 24.04 LTS" }
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
                  Dell Pro 16 jest objęty 5-letnią gwarancją Dell ProSupport z serwisem na miejscu 
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


// Accessories Section Component - ZMODYFIKOWANY: usunięte zdjęcia, nowe akcesoria
const AccessoriesSection = ({ productName, onAddToInquiry }: { productName: string, onAddToInquiry: (accessory: any) => void }) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const accessories = [
    {
      id: 'footrest',
      name: 'Podnóżek biurowy',
      description: 'Ergonomiczny podnóżek regulowany',
      price: '89 zł'
    },
    {
      id: 'keyboard-mouse',
      name: 'Bezprzewodowy zestaw klawiatura i mysz Dell',
      description: 'Zestaw klawiatura + mysz Bluetooth',
      price: '169 zł'
    },
    {
      id: 'bag',
      name: 'Torba na laptopa 16"',
      description: 'Wodoodporna torba na laptopa',
      price: '149 zł'
    },
    {
      id: 'dock',
      name: 'Stacja dokująca Dell',
      description: 'USB-C uniwersalna stacja z ładowaniem',
      price: '399 zł'
    }
  ]

  const toggleAccessory = (accessory: any) => {
    const isSelected = selectedAccessories.includes(accessory.id)
    
    if (isSelected) {
      setSelectedAccessories(prev => prev.filter(id => id !== accessory.id))
    } else {
      setSelectedAccessories(prev => [...prev, accessory.id])
      onAddToInquiry({
        id: `accessory-${accessory.id}`,
        name: accessory.name,
        image: '/api/placeholder/120/120',
        category: 'Akcesoria',
        description: accessory.description
      })
    }
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessories.map((accessory) => {
            const isSelected = selectedAccessories.includes(accessory.id)
            return (
              <motion.div
                key={accessory.id}
                className={`bg-white rounded-lg border-2 transition-all cursor-pointer p-6 ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-50' 
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
                onClick={() => toggleAccessory(accessory)}
              >
                <div className="flex flex-col h-full">
                  {isSelected && (
                    <div className="flex justify-end mb-2">
                      <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <h4 className="font-semibold text-gray-900 mb-2">{accessory.name}</h4>
                  <p className="text-sm text-gray-600 mb-4 flex-1">{accessory.description}</p>
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

// Bundle Section Component - NOWA SEKCJA
const BundleSection = ({ onAddToInquiry }: { onAddToInquiry: (product: any) => void }) => {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl p-8 border-2 border-emerald-200 shadow-sm"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Najlepiej kupić w zestawie
          </h3>
          <p className="text-gray-600">
            Kompletne stanowisko pracy - laptop, monitor i akcesoria w jednym zamówieniu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Dell Pro 16 */}
          <div className="bg-white rounded-lg p-6 border-2 border-emerald-300 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Laptop className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 text-center mb-2">Dell Pro 16</h4>
            <p className="text-sm text-gray-600 text-center">
              Laptop biznesowy z Intel Core 3 100U
            </p>
          </div>

          {/* Dell Pro Monitor */}
          <div className="bg-white rounded-lg p-6 border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2"/>
                </svg>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 text-center mb-2">Dell Pro 27 Plus P2725HE</h4>
            <p className="text-sm text-gray-600 text-center mb-4">
              Monitor 27" QHD z USB-C i stacją dokującą
            </p>
            <div className="text-center">
              <a 
                href="/produkt/dell-pro-27-plus-p2725he-usbc"
                className="inline-flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors border border-blue-200"
              >
                <span>Zobacz produkt</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Keyboard + Mouse */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-300 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2"/>
                  <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 16h8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 text-center mb-2">Klawiatura + Mysz Dell</h4>
            <p className="text-sm text-gray-600 text-center">
              Bezprzewodowy zestaw klawiatura i mysz
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-emerald-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Korzyści z zakupu zestawu:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Kompletne stanowisko pracy od razu gotowe do użycia</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Spójny ekosystem produktów Dell - pełna kompatybilność</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Pojedyncze zamówienie - uproszczona logistyka i dokumentacja</span>
                </li>
              </ul>
            </div>
            <motion.button
              onClick={() => {
                onAddToInquiry({
                  id: 'dell-pro-16',
                  name: 'Dell Pro 16',
                  image: '/dell_16_bs_1.png',
                  category: 'Laptopy',
                  description: 'Laptop biznesowy z Intel Core 3 100U'
                })
                onAddToInquiry({
                  id: 'dell-pro-27-plus-p2725he',
                  name: 'Dell Pro 27 Plus P2725HE',
                  image: '/dell_monitor_1.png',
                  category: 'Monitory',
                  description: 'Monitor 27" QHD z USB-C'
                })
                onAddToInquiry({
                  id: 'dell-keyboard-mouse',
                  name: 'Klawiatura + Mysz Dell',
                  image: '/dell_keyboard.png',
                  category: 'Akcesoria',
                  description: 'Bezprzewodowy zestaw'
                })
              }}
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Package className="w-5 h-5" />
              <span>Zapytaj o zestaw</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Main Product Page Component
export default function DellPro16ProductPage() {
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
          <a href="/kategoria/laptopy" className="hover:text-emerald-600">Laptopy</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Dell Pro 16</span>
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
                  Laptop
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dell Pro 16
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Dell Pro 16 to ekonomiczny laptop z dużym 16-calowym wyświetlaczem IPS FHD+, zaprojektowany specjalnie dla stanowisk leśniczego. Procesor Intel Core 3 100U z 6 rdzeniami zapewnia wydajność wystarczającą do pracy biurowej i aplikacji GIS. Model dostarczany z systemem Ubuntu Linux 24.04 LTS, bez Windows – idealny dla administratorów planujących instalację dedykowanego oprogramowania leśnego. Bateria 55 Wh z ExpressCharge pozwala na mobilną pracę w terenie. Wyświetlacz z powłoką przeciwodblaskową gwarantuje czytelność w każdych warunkach. Objęty 5-letnią gwarancją Dell ProSupport z serwisem na miejscu, zapewnia długoterminowe wsparcie w pracy leśnictwa.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'dell-pro-16',
                      name: 'Dell Pro 16',
                      image: '/dell_16_bs_1.png',
                      category: 'Laptopy',
                      description: 'Laptop biznesowy z Intel Core 3 100U',
                      specifications: 'Intel Core 3 100U, 8GB RAM, 256GB SSD, Ubuntu Linux'
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

              {/* Gwarancja Dell ProSupport i Brak Windows - grid 2 kolumny */}
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

                {/* Bez systemu Windows - z Ubuntu */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-3">
                    <Info className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Bez systemu Windows</h4>
                      <p className="text-sm text-orange-50">
                        Laptop dostarczany z Ubuntu Linux 24.04 LTS. Idealny do stanowiska leśniczego.
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

        {/* Bundle Section - NOWA SEKCJA */}
        <BundleSection onAddToInquiry={addToInquiry} />

        {/* Accessories Section */}
        <AccessoriesSection productName="Dell Pro 16" onAddToInquiry={addToInquiry} />

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
      <CourierServiceSection productName="Dell Pro 16" />

 {/* Footer */}
<Footer />
</div>
  )
}
