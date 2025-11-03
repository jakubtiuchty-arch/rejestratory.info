'use client'

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
  Palette,
  Nfc,
  Award
} from 'lucide-react'

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
          src="/zq521_1.png"
          alt="Zebra ZQ521"
          className="w-full h-full object-contain"
          style={{ transform: 'scale(1.13) translateY(2%)' }}
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
                src="/zq521_1.png"
                alt="Zebra ZQ521 - powiększenie"
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
    { category: "Parametry fizyczne", items: [
      { name: "Wymiary", value: "158 × 155 × 67 mm" },
      { name: "Waga", value: "0,79 kg (bateria 3250 mAh)" },
      { name: "Klasa szczelności", value: "IP54" },
      { name: "Odporność na upadki", value: "2 m (wielokrotnie)" }
    ]},
    { category: "Parametry drukarki", items: [
      { name: "Rozdzielczość", value: "203 dpi (8 pkt/mm)" },
      { name: "Maksymalna szerokość druku", value: "104 mm" },
      { name: "Maksymalna szybkość druku", value: "127 mm/s" },
      { name: "System operacyjny", value: "Link-OS™" }
    ]},
    { category: "Obsługa nośników", items: [
      { name: "Szerokość podłoża", value: "50,8-113 mm" },
      { name: "Maksymalna średnica rolki", value: "57 mm" },
      { name: "Rodzaje podłoży", value: "Paragon, etykiety, przywieszki, RFID" }
    ]},
    { category: "Zasilanie", items: [
      { name: "Bateria standardowa", value: "PowerPrecision+ 3250 mAh" },
      { name: "Bateria opcjonalna", value: "PowerPrecision+ 6500 mAh" }
    ]},
    { category: "Łączność", items: [
      { name: "Wi-Fi", value: "802.11ac (2,4 GHz i 5 GHz)" },
      { name: "Bluetooth", value: "4.1 (Classic i BLE)" },
      { name: "USB", value: "2.0 On-The-Go (12 Mb/s)" }
    ]},
    { category: "Parametry pracy", items: [
      { name: "Temperatura robocza", value: "-20°C do 55°C" },
      { name: "Wilgotność robocza", value: "10% do 90%, bez kondensacji" }
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

// Courier Service Section Component
const CourierServiceSection = ({ productName }: { productName: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    forestDistrict: '',
    city: '',
    street: '',
    number: '',
    postalCode: '',
    deviceName: productName,
    serialNumber: '',
    faultDescription: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create email body
    const emailBody = `
Zamówienie kuriera - ${productName}

Dane kontaktowe:
- Imię: ${formData.firstName}
- Nazwisko: ${formData.lastName}
- Nadleśnictwo: ${formData.forestDistrict}

Adres odbioru:
- Miasto: ${formData.city}
- Ulica: ${formData.street} ${formData.number}
- Kod pocztowy: ${formData.postalCode}

Urządzenie:
- Nazwa: ${formData.deviceName}
- Numer seryjny: ${formData.serialNumber}

Opis usterki:
${formData.faultDescription}
    `.trim()

    // Create mailto link
    const mailtoLink = `mailto:handlowy@takma.com.pl?subject=Zamówienie kuriera - ${productName}&body=${encodeURIComponent(emailBody)}`
    
    // Open email client
    window.location.href = mailtoLink
    
    // Reset form and close modal
    setFormData({
      firstName: '',
      lastName: '',
      forestDistrict: '',
      city: '',
      street: '',
      number: '',
      postalCode: '',
      deviceName: productName,
      serialNumber: '',
      faultDescription: ''
    })
    setIsModalOpen(false)
    
    // Show confirmation lightbox
    setTimeout(() => {
      setIsConfirmationOpen(true)
    }, 300)
  }

  return (
    <>
      {/* Service Section */}
      <div id="service-section" className="bg-orange-50 border-t border-orange-200">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            className="bg-white rounded-xl p-8 border border-orange-200 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Problem z urządzeniem?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Jeśli masz problem z urządzeniem <span className="font-semibold">{productName}</span> i chcesz wysłać je do serwisu, 
                    zamów kuriera który odbierze sprzęt bezpośrednio ze wskazanego adresu.
                  </p>
                  <div className="flex items-center text-sm text-orange-700 bg-orange-50 px-3 py-2 rounded-lg">
                    <Truck className="w-4 h-4 mr-2" />
                    <span>Kurier odbierze urządzenie w ciągu 24h od zgłoszenia</span>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 flex-shrink-0 w-full lg:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Truck className="w-5 h-5" />
                <span>Zamów kuriera</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Courier Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Truck className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Zamówienie kuriera</h3>
                      <p className="text-sm text-gray-600">Wypełnij formularz aby zamówić odbiór {productName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Data */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Dane kontaktowe</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Imię <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nazwisko <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nadleśnictwo <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="forestDistrict"
                        value={formData.forestDistrict}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Adres odbioru</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Miasto <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Kod pocztowy <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          pattern="[0-9]{2}-[0-9]{3}"
                          placeholder="00-000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ulica <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numer <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="number"
                          value={formData.number}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Device Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Informacje o urządzeniu</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nazwa urządzenia <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="deviceName"
                          value={formData.deviceName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numer seryjny <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="serialNumber"
                          value={formData.serialNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Opis usterki <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="faultDescription"
                        value={formData.faultDescription}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Opisz szczegółowo problem z urządzeniem..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Anuluj
                      </button>
                      <motion.button
                        type="submit"
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Truck className="w-4 h-4" />
                        <span>Zamów kuriera</span>
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Lightbox */}
      <AnimatePresence>
        {isConfirmationOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsConfirmationOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Zamówienie kuriera wysłane!</h3>
                      <p className="text-sm text-gray-600">Otrzymasz wiadomość email z dalszymi instrukcjami</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsConfirmationOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-orange-900 mb-2">Co dalej?</h4>
                  <p className="text-sm text-orange-800">
                    Przygotuj urządzenie do odbioru zgodnie z poniższą listą. Kurier skontaktuje się z Tobą 
                    w ciągu 24 godzin od otrzymania zgłoszenia.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { 
                      text: "Przygotuj urządzenie", 
                      detail: "Wykonaj kopię zapasową danych i wyloguj się z kont" 
                    },
                    { 
                      text: "Starannie zapakuj", 
                      detail: "Zabezpiecz urządzenie w oryginalnym pudełku lub w bezpiecznym opakowaniu" 
                    },
                    { 
                      text: "Wydrukuj otrzymaną etykietę", 
                      detail: "Otrzymasz etykietę kurierską na email - wydrukuj i przyklej do paczki" 
                    },
                    { 
                      text: "Dołącz dokumenty", 
                      detail: "Jeśli posiadasz fakturę lub dowód zakupu, dołącz kopię do przesyłki" 
                    },
                    { 
                      text: "Oczekuj na kuriera", 
                      detail: "Kurier odbierze paczkę we wskazanym miejscu - nie musisz jej nadawać" 
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <motion.div
                        className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.1, type: "spring" }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{index + 1}. {item.text}</p>
                        <p className="text-sm text-gray-600 mt-1">{item.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-900">
                        <p className="font-semibold mb-1">Ważne informacje:</p>
                        <ul className="space-y-1 text-blue-800">
                          <li>• Numer przesyłki otrzymasz w wiadomości email</li>
                          <li>• Śledź status naprawy w systemie lub kontaktując się z nami</li>
                          <li>• W razie pytań zadzwoń: <span className="font-semibold">71 781 71 28</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <motion.button
                    onClick={() => setIsConfirmationOpen(false)}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Rozumiem
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Accessories Section Component
const AccessoriesSection = ({ productName, onAddToInquiry }: { productName: string, onAddToInquiry: (accessory: any) => void }) => {
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
      name: 'Papier termiczny 104x25x33',
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
export default function ZebraZQ521ProductPage() {
  const [activeTab, setActiveTab] = useState('specs')
  const { inquiryCount, addToInquiry, openCart } = useInquiry()
  const [showRipple, setShowRipple] = useState(false)

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
          <a href="/kategoria/drukarki-do-rejestratora" className="hover:text-emerald-600">Drukarki do rejestratora</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Zebra ZQ521</span>
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
                Zebra ZQ521
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Zebra ZQ521 to zaawansowana drukarka mobilna 4-calowa zaprojektowana dla najbardziej wymagających zastosowań terenowych. Wyposażona w system operacyjny Link-OS oraz technologię Power Smart Print, drukarka automatycznie optymalizuje zużycie baterii i szybkość druku. Urządzenie charakteryzuje się wyjątkową odpornością – klasa szczelności IP54 oraz certyfikat MIL-STD 810G gwarantują niezawodne działanie w trudnych warunkach, a odporność na wielokrotne upadki z wysokości 2 metrów czyni ją idealnym narzędziem dla służb leśnych. Dzięki rozszerzonej łączności bezprzewodowej Bluetooth 4.1, a także obsłudze platformy Zebra DNA, drukarka zapewnia bezproblemową integrację z mobilnymi systemami zarządzania flotą.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={() => {
                    addToInquiry({
                      id: 'zebra-zq521',
                      name: 'Zebra ZQ521',
                      image: '/zq521_1.png',
                      category: 'Drukarki mobilne',
                      description: 'Drukarka mobilna 4-calowa z Link-OS',
                      specifications: 'IP54, Bluetooth 4.1, Wi-Fi 802.11ac'
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

              {/* Bestseller box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-lg p-6 border-2 border-amber-300 shadow-lg mb-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Najczęściej wybierana przez Nadleśnictwa
                    </h3>
                    <p className="text-sm text-amber-50">
                      Niekwestionowany lider wśród drukarek termiczny pracujących w terenie!
                    </p>
                  </div>
                </div>
              </motion.div>

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
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <span className="font-medium text-gray-900">ZSLP Stargard</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">
                    <span className="font-medium text-gray-900">ZPUH Olsztyn</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Accessories Section */}
        <AccessoriesSection 
          productName="Zebra ZQ521" 
          onAddToInquiry={(accessory) => {
            addToInquiry({
              id: `accessory-${accessory.id}`,
              name: accessory.name,
              image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==',
              category: 'Akcesoria'
            })
          }} 
        />

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
      <CourierServiceSection productName="Zebra ZQ521" />

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