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
  Nfc
} from 'lucide-react'
import { useInquiry } from '@/components/InquiryContext'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div>
      {/* Main Image */}
      <motion.div 
        className="relative rounded-lg overflow-hidden aspect-[4/3] cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src="/lkp43_1.png"
          alt="Sewoo LK-P43"
          className="w-full h-full object-contain"
          style={{ transform: 'scale(1.10) translateY(-2%)' }}
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
                src="/lkp43_1.png"
                alt="Sewoo LK-P43 - powiększenie"
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
    { category: "Ogólne", items: [
      { name: "Typ drukarki", value: "Mobilna, termiczna" },
      { name: "Metoda druku", value: "Direct Thermal" },
      { name: "Rozdzielczość", value: "203 DPI" }
    ]},
    { category: "Drukowanie", items: [
      { name: "Prędkość druku", value: "100 mm/s" },
      { name: "Szerokość druku", value: "104 mm" },
      { name: "Liczba punktów na linię", value: "832" }
    ]},
    { category: "Obsługa papieru", items: [
      { name: "Rodzaje nośników", value: "Papier termiczny, etykiety" },
      { name: "Szerokość papieru", value: "50-112 mm" },
      { name: "Grubość papieru", value: "0.06 - 0.16 mm" },
      { name: "Maksymalna średnica rolki", value: "Ø 56 mm" },
      { name: "Średnica rdzenia", value: "12.5 mm ± 0.5 mm" }
    ]},
    { category: "Łączność", items: [
      { name: "Standard", value: "Serial (RS-232C), USB" },
      { name: "Opcje", value: "Wi-Fi (802.11a/b/g/n), Bluetooth Smart Ready (Bluetooth 4.2 + BLE)" }
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


// Accessories Section Component
const AccessoriesSection = ({ productName }: { productName: string }) => {
  const { addToInquiry } = useInquiry()
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const accessories = [
    {
      id: 'charger-network',
      name: 'Ładowarka sieciowa',
      price: 'Zapytaj o cenę'
    },
    {
      id: 'charger-car',
      name: 'Ładowarka samochodowa',
      price: 'Zapytaj o cenę'
    },
    {
      id: 'bag',
      name: 'Torba na drukarkę',
      price: 'Zapytaj o cenę'
    },
    {
      id: 'paper',
      name: 'Papier termiczny',
      price: 'Zapytaj o cenę'
    }
  ]

  const toggleAccessory = (accessoryId: string) => {
    setSelectedAccessories(prev => 
      prev.includes(accessoryId) 
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  const handleAddSelectedToInquiry = () => {
    selectedAccessories.forEach(accessoryId => {
      const accessory = accessories.find(a => a.id === accessoryId)
      if (accessory) {
        addToInquiry({
          id: `sewoo-lkp43-accessory-${accessory.id}`,
          name: accessory.name,
          image: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
          category: 'Akcesoria',
          description: `Akcesoria do drukarki ${productName}`
        })
      }
    })
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
              onClick={handleAddSelectedToInquiry}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Package className="w-5 h-5" />
              <span>Dodaj do zapytania ({selectedAccessories.length})</span>
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <div className="p-4 flex flex-col items-center text-center">
                  {isSelected && (
                    <div className="mb-2">
                      <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <h4 className="font-semibold text-gray-900 mb-3">{accessory.name}</h4>
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
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}

// Main Product Page Component
export default function SewooLKP43ProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
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
          <a href="/kategoria/drukarki-do-rejestratora" className="hover:text-emerald-600">Drukarki do rejestratora</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Sewoo LK-P43</span>
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
                  Drukarka mobilna
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sewoo LK-P43
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Sewoo LK-P43 to kompaktowa drukarka mobilna 4-calowa, zaprojektowana z myślą o profesjonalnych zastosowaniach terenowych. Urządzenie oferuje szybki i niezawodny druk termiczny przy prędkości 100 mm/s, co sprawia, że idealnie nadaje się do pracy w służbach leśnych i innych organizacjach wymagających mobilnych rozwiązań drukowania. Drukarka obsługuje szeroki zakres formatów papieru od 50 do 112 mm, w tym paragony i etykiety, zapewniając uniwersalność w codziennym użytkowaniu. Wyposażona w standardowe interfejsy komunikacyjne USB i RS-232C oraz opcjonalne moduły Wi-Fi i Bluetooth, drukarka łatwo integruje się z różnymi systemami mobilnymi i infrastrukturą IT.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'sewoo-lk-p43',
                      name: 'Sewoo LK-P43',
                      image: '/lkp43_1.png',
                      category: 'Drukarki',
                      description: 'Mobilna drukarka termiczna 4" z łącznością Wi-Fi i Bluetooth',
                      specifications: '203 DPI, 100 mm/s, USB/RS-232C, Wi-Fi/Bluetooth (opcja)'
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

        {/* Accessories Section */}
        <AccessoriesSection productName="Sewoo LK-P43" />

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'specs', label: 'Specyfikacja' },
              { id: 'downloads', label: 'Pliki do pobrania' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
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

      {/* Courier Service Section */}
      <CourierServiceSection productName="Sewoo LK-P43" />

      {/* Footer */}
<Footer />
</div>
  )
}
