'use client'

import CourierServiceSection from "@/components/CourierServiceSection";

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="relative bg-white rounded-lg overflow-hidden aspect-video cursor-pointer p-8"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={`/dell_16_${currentImage}.png`}
          alt="Dell Pro 16 Plus"
          className="w-full h-full object-contain"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/80 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-6 gap-1">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <motion.div
            key={index}
            className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer border-2 p-2 ${
              currentImage === index ? 'border-emerald-600' : 'border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentImage(index)}
          >
            <img
              src={`/dell_16_${index}.png`}
              alt={`View ${index}`}
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
                src={`/dell_16_${currentImage}.png`}
                alt="Dell Pro 16 Plus - powiększenie"
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
      { name: "Procesor", value: "Intel® Core™ Ultra 5 235U vPro®" },
      { name: "NPU", value: "12 TOPS, 12 rdzeni, do 4,9 GHz" },
      { name: "RAM", value: "16 GB DDR5, 5600 MT/s" },
      { name: "Dysk", value: "SSD 512 GB" },
      { name: "Karta graficzna", value: "Zintegrowana Intel® Graphics" }
    ]},
    { category: "Łączność i bezpieczeństwo", items: [
      { name: "Sieć bezprzewodowa", value: "Wi-Fi 6E AX211, 2x2, 802.11ax" },
      { name: "Bluetooth", value: "Bluetooth® 5.3" },
      { name: "Kamera", value: "FHD HDR z IR, rozpoznawanie twarzy" },
      { name: "Czytniki", value: "Linii papilarnych, kart smart Control Vault 3+" }
    ]},
    { category: "Klawiatura i mobilność", items: [
      { name: "Klawiatura", value: "Podświetlana z Copilot + klawiatura numeryczna" },
      { name: "Bateria", value: "55 Wh z ExpressCharge™ i ExpressCharge Boost™" },
      { name: "Zasilacz", value: "65 W USB Type-C" },
      { name: "System", value: "Windows 11 Pro" }
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
                  Dell Pro 16 Plus jest objęty 5-letnią gwarancją Dell ProSupport z serwisem na miejscu 
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


// Accessories Section
const AccessoriesSection = ({ 
  productName, 
  onAddToInquiry 
}: { 
  productName: string, 
  onAddToInquiry: (accessory: any) => void
}) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const accessories = [
    {
      id: 'footrest',
      name: 'Podnóżek biurowy',
      description: 'Ergonomiczny podnóżek do pracy przy komputerze',
      image: '/api/placeholder/120/120',
      price: '99 zł'
    },
    {
      id: 'mouse',
      name: 'Bezprzewodowy zestaw klawiatura i mysz Dell',
      description: 'Ergonomiczny zestaw klawiatura i mysz Bluetooth',
      image: '/api/placeholder/120/120',
      price: '189 zł'
    },
    {
      id: 'bag',
      name: 'Torba na laptopa 14"',
      description: 'Wodoodporna torba na laptopa',
      image: '/api/placeholder/120/120',
      price: '169 zł'
    },
    {
      id: 'dock',
      name: 'Stacja dokująca Dell',
      description: 'USB-C uniwersalna stacja z ładowaniem',
      image: '/api/placeholder/120/120',
      price: '399 zł'
    }
  ]

  const toggleAccessory = (accessoryId: string) => {
    setSelectedAccessories(prev => 
      prev.includes(accessoryId) 
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
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
              onClick={() => {
                selectedAccessories.forEach((accessoryId) => {
                  const accessory = accessories.find(a => a.id === accessoryId)
                  if (accessory) {
                    onAddToInquiry(accessory)
                  }
                })
                setSelectedAccessories([])
              }}
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
export default function DellPro16PlusProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const [isServiceLightboxOpen, setIsServiceLightboxOpen] = useState(false)
  const { inquiryCount, addToInquiry, openCart } = useInquiry()
  const [showRipple, setShowRipple] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          <a href="/kategoria/laptopy" className="hover:text-emerald-600">Laptopy</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Dell Pro 16 Plus</span>
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
                Dell Pro 16 Plus
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Dell Pro 16 Plus to zaawansowany laptop biznesowy z dużym 16-calowym wyświetlaczem IPS FHD+, idealny dla profesjonalistów wymagających maksymalnej przestrzeni roboczej. Procesor Intel Core Ultra 5 vPro z 12 rdzeniami i NPU 12 TOPS zapewnia wyjątkową wydajność w pracy z dokumentami, analizie danych i wielozadaniowości. Wyświetlacz z powłoką przeciwodblaskową gwarantuje komfort podczas długich sesji pracy. Bateria 55 Wh z ExpressCharge umożliwia całodzienną pracę mobilną. Wbudowany czytnik kart smart Control Vault 3+ oraz rozpoznawanie twarzy zapewniają najwyższy poziom bezpieczeństwa danych. Objęty 5-letnią gwarancją Dell ProSupport z serwisem na miejscu.
              </p>
              
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'dell-pro-16-plus',
                      name: 'Dell Pro 16 Plus',
                      image: '/dell_16_1.png',
                      category: 'Laptopy',
                      description: 'Zaawansowany laptop z 16" ekranem',
                      specifications: 'Intel Core Ultra 5, 16GB RAM, 512GB SSD'
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

              {/* Gwarancja Dell ProSupport i SmartCard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

                <div className="bg-gradient-to-br from-slate-600 to-blue-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">Wbudowany czytnik SmartCard</h4>
                      <p className="text-sm text-blue-50">
                        Laptop wyposażony w czytnik kart smart Control Vault 3+ z obsługą RJ-45. 
                        Pełna integracja z systemami wymagającymi autoryzacji kartą inteligentną.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gdzie kupić */}
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

        <AccessoriesSection 
          productName="Dell Pro 16 Plus" 
          onAddToInquiry={(accessory) => {
            addToInquiry({
              id: `accessory-${accessory.id}`,
              name: accessory.name,
              image: accessory.image,
              category: 'Akcesoria',
              description: accessory.description
            })
            setShowRipple(true)
            setTimeout(() => setShowRipple(false), 1000)
          }} 
        />

        {/* Bundle Section */}
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
              <div className="bg-white rounded-lg p-6 border-2 border-emerald-300 shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Laptop className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 text-center mb-2">Dell Pro 16 Plus</h4>
                <p className="text-sm text-gray-600 text-center">
                  Laptop biznesowy z Intel Core Ultra 5 vPro
                </p>
              </div>

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
                    addToInquiry({
                      id: 'dell-pro-16-plus',
                      name: 'Dell Pro 16 Plus',
                      image: '/dell_16_1.png',
                      category: 'Laptopy'
                    })
                    addToInquiry({
                      id: 'dell-pro-27-plus-p2725he',
                      name: 'Dell Pro 27 Plus P2725HE',
                      image: '/dell_monitor_1.png',
                      category: 'Monitory'
                    })
                    addToInquiry({
                      id: 'dell-keyboard-mouse',
                      name: 'Klawiatura + Mysz Dell',
                      image: '/dell_keyboard.png',
                      category: 'Akcesoria'
                    })
                    setShowRipple(true)
                    setTimeout(() => setShowRipple(false), 1000)
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

      <ServiceContractLightbox 
        isOpen={isServiceLightboxOpen} 
        onClose={() => setIsServiceLightboxOpen(false)} 
      />

      <CourierServiceSection productName="Dell Pro 16 Plus" />

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
