'use client'

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
  TreePine,
  CreditCard,
  Printer,
  Monitor
} from 'lucide-react'

// Image Gallery Component
const ImageGallery = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsZoomed(true)}
      >
        <img
          src={images[currentImage] || images[0]}
          alt="Posnet Pospay 2"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white/80 rounded-full p-2">
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-3 gap-2">
        {images.slice(1).map((image, index) => (
          <motion.div
            key={index}
            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 ${
              currentImage === index + 1 ? 'border-emerald-600' : 'border-transparent'
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setCurrentImage(index + 1)}
          >
            <img
              src={image}
              alt={`View ${index + 2}`}
              className="w-full h-full object-cover"
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
                src={images[currentImage] || images[0]}
                alt="Posnet Pospay 2 - powiększenie"
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
    { category: "Urządzenie", items: [
      { name: "Wersja", value: "ONLINE" },
      { name: "Pamięć chroniona", value: "Karta micro SDHC - 4 GB" },
      { name: "Komunikacja z CRK", value: "Modem GSM, WiFi" },
      { name: "Wymiary", value: "15,2 x 8 x 8,1 cm" },
      { name: "Waga", value: "~0,6 kg (z papierem)" }
    ]},
    { category: "Mechanizm drukujący", items: [
      { name: "Typ mechanizmu", value: "Termiczny \"drop in\" - wrzuć i drukuj" },
      { name: "Liczba znaków w wierszu", value: "Do 40" },
      { name: "Szerokość papieru", value: "57 mm" },
      { name: "Długość rolki papieru", value: "14 m" }
    ]},
    { category: "Wyświetlacze", items: [
      { name: "Wyświetlacz operatora", value: "4,5\", 1280 x 720 pikseli" },
      { name: "Wyświetlacz klienta", value: "LCD 2 x 16 znaków" }
    ]},
    { category: "Zasilanie", items: [
      { name: "Zasilacz", value: "Zewnętrzny, 5V/4A" },
      { name: "Akumulator drukarka", value: "Li-ion 6800 mAh" },
      { name: "Akumulator terminal", value: "Li-ion 2500 mAh" }
    ]},
    { category: "Bazy danych", items: [
      { name: "Stawki VAT", value: "7 (A...G)" },
      { name: "Liczba PLU", value: "4000 (aplikacja kasowa), 100 000 (aplikacja drukarkowa)" },
      { name: "Nazwa towarów", value: "80" },
      { name: "Kasjerzy", value: "200" },
      { name: "Formy płatności", value: "16" },
      { name: "Grupy towarowe", value: "32" }
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

// Documents Required Lightbox Component
const DocumentsLightbox = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
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
                <h3 className="text-xl font-bold text-gray-900">Dokumenty wymagane do fiskalizacji</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-blue-900">
                    Jak otrzymamy od Państwa zamówienie, prześlemy w odpowiedzi szczegółową listę dokumentów wymaganych do zgłoszenia urządzeń do eService oraz Urzędu Skarbowego.
                  </p>
                </div>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-700 mb-3">Wymagane dokumenty:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Dane Nadleśnictwa (NIP, REGON, nazwa)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Adres miejsca instalacji urządzenia</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Nazwy i adresy leśnictw</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Skan paragonu używanych urządzeń fiskalnych (jeśli są używane)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Numer telefonu kontaktowego</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-gray-900 mb-2">
                    Pomoc krok po kroku:
                  </p>
                  <p className="text-sm">
                    Nasz zespół pomoże Państwu w wypełnieniu wszystkich niezbędnych dokumentów oraz przeprowadzi przez cały proces fiskalizacji i zgłoszenia do eService.
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

// Timeline Component
const PurchaseTimeline = () => {
  const [isDocumentsLightboxOpen, setIsDocumentsLightboxOpen] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const timelineRef = React.useRef(null)

  // Detect when timeline enters viewport
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (timelineRef.current) {
      observer.observe(timelineRef.current)
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current)
      }
    }
  }, [hasAnimated])

  const timelineSteps = [
    {
      title: "Zamówienie urządzeń",
      description: "Posnet Pospay 2 w TAKMA",
      icon: ShoppingCart
    },
    {
      title: "Przesłanie dokumentów",
      description: "do fiskalizacji",
      icon: FileText,
      hasButton: true
    },
    {
      title: "Fiskalizacja",
      description: "i zgłoszenie do eService",
      icon: Check
    },
    {
      title: "Dostawa",
      description: "urządzenia do Nadleśnictwa",
      icon: Truck
    },
    {
      title: "Szkolenie",
      description: "leśniczych",
      icon: Info
    },
    {
      title: "Integracja",
      description: "z rejestratorami",
      icon: Monitor
    },
    {
      title: "Przeglądy",
      description: "ustawowe co 2 lata",
      icon: Shield
    }
  ]

  return (
    <>
      <div className="mb-12" ref={timelineRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm"
        >
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Proces zakupu i wdrożenia
            </h3>
            <p className="text-gray-600">
              Od zamówienia do pełnej integracji - krok po kroku
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Linia łącząca - animowana */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200 hidden lg:block" 
                 style={{ left: '5%', right: '5%' }} />
            
            {/* Aktywna linia - rysuje się od lewej do prawej BARDZO WOLNO */}
            <motion.div 
              className="absolute top-8 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 hidden lg:block shadow-lg" 
              style={{ left: '5%' }}
              initial={{ width: 0 }}
              animate={hasAnimated ? { width: '90%' } : { width: 0 }}
              transition={{ 
                duration: 6.5,
                ease: "easeInOut"
              }}
            />
            
            {/* Świecący efekt na końcu linii */}
            <motion.div 
              className="absolute top-6 h-5 w-5 bg-emerald-500 rounded-full blur-md hidden lg:block" 
              style={{ left: '5%' }}
              initial={{ x: 0, opacity: 0 }}
              animate={hasAnimated ? { 
                x: 'calc(90vw * 0.9)',
                opacity: [0, 1, 1, 0]
              } : { x: 0, opacity: 0 }}
              transition={{ 
                duration: 6.5,
                ease: "easeInOut",
                opacity: {
                  times: [0, 0.1, 0.9, 1]
                }
              }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon
                const baseDelay = index * 0.9 // Zwiększone z 0.6s na 0.9s
                
                return (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={hasAnimated ? { 
                      opacity: 1, 
                      y: 0,
                      scale: 1
                    } : { 
                      opacity: 0, 
                      y: 50,
                      scale: 0.5
                    }}
                    transition={{ 
                      delay: baseDelay,
                      duration: 1.0, // Zwiększone z 0.8s na 1.0s
                      ease: "easeOut",
                      type: "spring",
                      stiffness: 80, // Zmniejszone dla wolniejszego ruchu
                      damping: 18
                    }}
                  >
                    {/* Ikona z pulsującym ringiem */}
                    <div className="relative">
                      {/* Pulsujący ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-emerald-500"
                        initial={{ scale: 1, opacity: 0 }}
                        animate={hasAnimated ? {
                          scale: [1, 1.5, 2],
                          opacity: [0.5, 0.3, 0]
                        } : { scale: 1, opacity: 0 }}
                        transition={{
                          delay: baseDelay + 0.5,
                          duration: 2.0, // Zwiększone z 1.5s
                          ease: "easeOut"
                        }}
                      />
                      
                      {/* Ikona */}
                      <motion.div
                        className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-3 relative z-10 border-4 border-white shadow-xl"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={hasAnimated ? { 
                          scale: 1,
                          rotate: 0,
                          backgroundColor: ["#d1fae5", "#10b981", "#d1fae5"]
                        } : { scale: 0, rotate: -180 }}
                        transition={{ 
                          delay: baseDelay + 0.4,
                          duration: 1.0, // Zwiększone z 0.8s
                          scale: {
                            type: "spring",
                            stiffness: 150, // Zmniejszone
                            damping: 12
                          },
                          rotate: {
                            duration: 1.0,
                            ease: "easeOut"
                          },
                          backgroundColor: {
                            delay: baseDelay + 1.0,
                            duration: 1.5, // Zwiększone z 1.2s
                            times: [0, 0.5, 1]
                          }
                        }}
                        whileHover={{ 
                          scale: 1.15,
                          rotate: 5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
                          transition={{ 
                            delay: baseDelay + 0.7,
                            duration: 0.5, // Zwiększone z 0.4s
                            type: "spring",
                            stiffness: 250
                          }}
                        >
                          <Icon className="w-8 h-8 text-emerald-600" />
                        </motion.div>
                      </motion.div>
                    </div>
                    
                    {/* Numer kroku */}
                    <motion.div 
                      className="text-xs font-bold text-emerald-600 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ 
                        delay: baseDelay + 0.8,
                        duration: 0.6 // Zwiększone z 0.5s
                      }}
                    >
                      KROK {index + 1}
                    </motion.div>
                    
                    {/* Tytuł */}
                    <motion.h4 
                      className="font-semibold text-gray-900 mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ 
                        delay: baseDelay + 0.95,
                        duration: 0.6 // Zwiększone z 0.5s
                      }}
                    >
                      {step.title}
                    </motion.h4>
                    
                    {/* Opis */}
                    <motion.p 
                      className="text-sm text-gray-600 mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                      transition={{ 
                        delay: baseDelay + 1.1,
                        duration: 0.6 // Zwiększone z 0.5s
                      }}
                    >
                      {step.description}
                    </motion.p>
                    
                    {/* Button jeśli wymagany */}
                    {step.hasButton && (
                      <motion.button
                        onClick={() => setIsDocumentsLightboxOpen(true)}
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={hasAnimated ? { 
                          opacity: 1, 
                          scale: 1
                        } : { 
                          opacity: 0, 
                          scale: 0.5 
                        }}
                        transition={{ 
                          delay: baseDelay + 1.3,
                          duration: 0.5,
                          type: "spring",
                          stiffness: 180
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Jakie dokumenty?
                      </motion.button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Documents Lightbox */}
      <DocumentsLightbox 
        isOpen={isDocumentsLightboxOpen} 
        onClose={() => setIsDocumentsLightboxOpen(false)} 
      />
    </>
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

// Client Portal Section Component
const ClientPortalSection = () => {
  const [deviceNumber, setDeviceNumber] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState('')
  
  // Courier modal states
  const [isCourierModalOpen, setIsCourierModalOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState<any>(null)
  const [courierFormData, setCourierFormData] = useState({
    firstName: '',
    lastName: '',
    forestDistrict: '',
    city: '',
    street: '',
    number: '',
    postalCode: '',
    deviceName: '',
    serialNumber: '',
    faultDescription: ''
  })

  const handleCourierInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCourierFormData(prev => ({ ...prev, [name]: value }))
  }

  const openCourierModal = (device: any) => {
    setSelectedDevice(device)
    setCourierFormData({
      firstName: '',
      lastName: '',
      forestDistrict: forestryData.name,
      city: '',
      street: '',
      number: '',
      postalCode: '',
      deviceName: device.model,
      serialNumber: device.uniqueNumber,
      faultDescription: ''
    })
    setIsCourierModalOpen(true)
  }

  const handleCourierSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const emailBody = `
Zamówienie kuriera - ${courierFormData.deviceName}

Dane kontaktowe:
- Imię: ${courierFormData.firstName}
- Nazwisko: ${courierFormData.lastName}
- Nadleśnictwo: ${courierFormData.forestDistrict}

Adres odbioru:
- Miasto: ${courierFormData.city}
- Ulica: ${courierFormData.street} ${courierFormData.number}
- Kod pocztowy: ${courierFormData.postalCode}

Urządzenie:
- Nazwa: ${courierFormData.deviceName}
- Numer seryjny: ${courierFormData.serialNumber}
- Lokalizacja: ${selectedDevice?.location}

Opis usterki:
${courierFormData.faultDescription}
    `.trim()

    const mailtoLink = `mailto:handlowy@takma.com.pl?subject=Zamówienie kuriera - ${courierFormData.deviceName}&body=${encodeURIComponent(emailBody)}`
    
    window.location.href = mailtoLink
    
    setCourierFormData({
      firstName: '',
      lastName: '',
      forestDistrict: '',
      city: '',
      street: '',
      number: '',
      postalCode: '',
      deviceName: '',
      serialNumber: '',
      faultDescription: ''
    })
    setIsCourierModalOpen(false)
    
    setTimeout(() => {
      setIsConfirmationOpen(true)
    }, 300)
  }

  // Przykładowy numer do logowania
  const DEMO_NUMBER = 'PSP2-2024-001234'

  // Przykładowe dane Nadleśnictwa
  const forestryData = {
    name: 'Nadleśnictwo Krotoszyn',
    address: 'ul. Leśna 12, 63-700 Krotoszyn',
    contact: 'sekretariat@krotoszyn.lasy.gov.pl',
    devices: [
      {
        id: 1,
        uniqueNumber: 'PSP2-2024-001234',
        model: 'Posnet Pospay 2',
        location: 'Leśnictwo Borki',
        fiscalizationDate: '2024-01-15',
        lastInspection: '2024-01-15',
        nextInspection: '2026-01-15',
        status: 'ok',
        daysUntilInspection: 452
      },
      {
        id: 2,
        uniqueNumber: 'PTM-2023-005678',
        model: 'Posnet Temo Online',
        location: 'Leśnictwo Dębina',
        fiscalizationDate: '2023-06-20',
        lastInspection: '2023-06-20',
        nextInspection: '2025-06-20',
        status: 'warning',
        daysUntilInspection: 232,
        issues: []
      },
      {
        id: 3,
        uniqueNumber: 'PSP2-2023-009012',
        model: 'Posnet Pospay 2',
        location: 'Leśnictwo Sosnowy Bór',
        fiscalizationDate: '2023-03-10',
        lastInspection: '2023-03-10',
        nextInspection: '2025-03-10',
        status: 'critical',
        daysUntilInspection: 130,
        issues: []
      },
      {
        id: 4,
        uniqueNumber: 'PTM-2022-003456',
        model: 'Posnet Temo Online',
        location: 'Leśnictwo Modrzewie',
        fiscalizationDate: '2022-11-05',
        lastInspection: '2024-10-20',
        nextInspection: '2024-11-05',
        status: 'overdue',
        daysUntilInspection: -25,
        issues: ['Przeterminowany przegląd']
      },
      {
        id: 5,
        uniqueNumber: 'PSP2-2024-002345',
        model: 'Posnet Pospay 2',
        location: 'Leśnictwo Jarzębina',
        fiscalizationDate: '2024-08-01',
        lastInspection: '2024-08-01',
        nextInspection: '2026-08-01',
        status: 'ok',
        daysUntilInspection: 640
      }
    ]
  }

  const handleLogin = () => {
    if (deviceNumber.trim() === DEMO_NUMBER) {
      setIsLoggedIn(true)
      setError('')
    } else {
      setError('Nieprawidłowy numer unikatowy urządzenia')
      setIsLoggedIn(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ok':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Aktywny', icon: Check }
      case 'warning':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Przegląd zbliża się', icon: AlertTriangle }
      case 'critical':
        return { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Wymaga uwagi', icon: AlertTriangle }
      case 'overdue':
        return { bg: 'bg-red-100', text: 'text-red-700', label: 'Przeterminowany', icon: X }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Nieznany', icon: Info }
    }
  }

  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-indigo-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Portal Klienta</h3>
            <p className="text-gray-600">Zarządzaj swoimi urządzeniami fiskalnymi</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <h4 className="font-semibold text-gray-900 mb-4">Zaloguj się numerem unikatowym urządzenia</h4>
            <p className="text-sm text-gray-600 mb-4">
              Wprowadź numer unikatowy dowolnej drukarki fiskalnej z Twojego Nadleśnictwa, aby uzyskać dostęp do pełnych informacji o wszystkich urządzeniach.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numer unikatowy urządzenia (NUF)
                </label>
                <input
                  type="text"
                  value={deviceNumber}
                  onChange={(e) => setDeviceNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="np. PSP2-2024-001234"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
              </div>

              <motion.button
                onClick={handleLogin}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield className="w-5 h-5" />
                Zaloguj się
              </motion.button>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Demo:</strong> Użyj numeru <code className="bg-white px-2 py-1 rounded font-mono text-xs">PSP2-2024-001234</code> aby zobaczyć przykładowy dashboard
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header z danymi Nadleśnictwa */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{forestryData.name}</h4>
                  <p className="text-sm text-gray-600">{forestryData.address}</p>
                  <p className="text-sm text-gray-600">{forestryData.contact}</p>
                </div>
                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setDeviceNumber('')
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Wyloguj
                </button>
              </div>

              {/* Statystyki */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-700">
                    {forestryData.devices.filter(d => d.status === 'ok').length}
                  </div>
                  <div className="text-sm text-gray-600">Aktywne</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-700">
                    {forestryData.devices.filter(d => d.status === 'warning').length}
                  </div>
                  <div className="text-sm text-gray-600">Zbliża się przegląd</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <div className="text-2xl font-bold text-orange-700">
                    {forestryData.devices.filter(d => d.status === 'critical').length}
                  </div>
                  <div className="text-sm text-gray-600">Wymaga uwagi</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <div className="text-2xl font-bold text-red-700">
                    {forestryData.devices.filter(d => d.status === 'overdue').length}
                  </div>
                  <div className="text-sm text-gray-600">Przeterminowane</div>
                </div>
              </div>
            </div>

            {/* Lista urządzeń */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 text-lg">Twoje urządzenia fiskalne</h4>
              
              {forestryData.devices.map((device, index) => {
                const statusInfo = getStatusBadge(device.status)
                const StatusIcon = statusInfo.icon
                
                return (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Printer className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-semibold text-gray-900">{device.model}</h5>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.bg} ${statusInfo.text}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusInfo.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{device.location}</p>
                          <p className="text-xs text-gray-500 font-mono">{device.uniqueNumber}</p>
                        </div>
                      </div>
                      
                      {/* Subtelny przycisk serwisowy w prawym górnym rogu */}
                      <motion.button
                        onClick={() => openCourierModal(device)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          device.status === 'overdue' || device.status === 'critical' 
                            ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Wezwij kuriera serwisowego"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Serwis</span>
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Data fiskalizacji</div>
                        <div className="font-medium text-gray-900">{new Date(device.fiscalizationDate).toLocaleDateString('pl-PL')}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Ostatni przegląd</div>
                        <div className="font-medium text-gray-900">{new Date(device.lastInspection).toLocaleDateString('pl-PL')}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Następny przegląd</div>
                        <div className="font-medium text-gray-900">{new Date(device.nextInspection).toLocaleDateString('pl-PL')}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Dni do przeglądu</div>
                        <div className={`font-bold ${
                          device.daysUntilInspection < 0 ? 'text-red-600' :
                          device.daysUntilInspection < 180 ? 'text-orange-600' :
                          device.daysUntilInspection < 365 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {device.daysUntilInspection < 0 ? `Przeterminowany o ${Math.abs(device.daysUntilInspection)} dni` : `${device.daysUntilInspection} dni`}
                        </div>
                      </div>
                    </div>

                    {device.issues && device.issues.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-red-900 mb-1">Zgłoszone problemy:</div>
                            <ul className="text-sm text-red-700 space-y-1">
                              {device.issues.map((issue, i) => (
                                <li key={i}>• {issue}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Kontakt serwisowy */}
            <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-indigo-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Potrzebujesz pomocy?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Nasz zespół serwisowy jest dostępny, aby pomóc w przeprowadzeniu przeglądów lub rozwiązaniu problemów z urządzeniami.
                  </p>
                  <div className="flex gap-4">
                    <a href="tel:717817128" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      71 781 71 28
                    </a>
                    <a href="mailto:serwis@takma.com.pl" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      serwis@takma.com.pl
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.div>

      {/* Courier Form Modal */}
      <AnimatePresence>
        {isCourierModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCourierModalOpen(false)}
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
                      <p className="text-sm text-gray-600">Wypełnij formularz aby zamówić odbiór {selectedDevice?.model}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCourierModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={handleCourierSubmit} className="space-y-6">
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
                          value={courierFormData.firstName}
                          onChange={handleCourierInputChange}
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
                          value={courierFormData.lastName}
                          onChange={handleCourierInputChange}
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
                        value={courierFormData.forestDistrict}
                        onChange={handleCourierInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        readOnly
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
                          value={courierFormData.city}
                          onChange={handleCourierInputChange}
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
                          value={courierFormData.postalCode}
                          onChange={handleCourierInputChange}
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
                          value={courierFormData.street}
                          onChange={handleCourierInputChange}
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
                          value={courierFormData.number}
                          onChange={handleCourierInputChange}
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
                          value={courierFormData.deviceName}
                          onChange={handleCourierInputChange}
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
                          value={courierFormData.serialNumber}
                          onChange={handleCourierInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Opis usterki <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="faultDescription"
                        value={courierFormData.faultDescription}
                        onChange={handleCourierInputChange}
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
                        onClick={() => setIsCourierModalOpen(false)}
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
    </div>
  )
}

// Accessories Section Component
const AccessoriesSection = ({ productName, onAddToInquiry }: { productName: string, onAddToInquiry: () => void }) => {
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const accessories = [
    {
      id: 'paper',
      name: 'Rolki papieru termicznego',
      description: 'Oryginalne rolki 57mm x 14m',
      image: '/api/placeholder/120/120',
      price: '49 zł'
    },
    {
      id: 'holder',
      name: 'Uchwyt montażowy',
      description: 'Do montażu przy stanowisku',
      image: '/api/placeholder/120/120',
      price: '79 zł'
    },
    {
      id: 'cover',
      name: 'Pokrowiec ochronny',
      description: 'Wodoodporny pokrowiec',
      image: '/api/placeholder/120/120',
      price: '89 zł'
    },
    {
      id: 'battery',
      name: 'Dodatkowy akumulator',
      description: 'Zapasowy akumulator Li-ion',
      image: '/api/placeholder/120/120',
      price: '199 zł'
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
                selectedAccessories.forEach(() => onAddToInquiry())
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
                  <div className="relative mb-4">
                    <img
                      src={accessory.image}
                      alt={accessory.name}
                      className="w-full h-24 object-cover rounded-lg"
                    />
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
export default function PosnetPospay2ProductPage() {
  const [activeTab, setActiveTab] = useState('timeline')
  const [inquiryCount, setInquiryCount] = useState(0)
  const [showRipple, setShowRipple] = useState(false)

  const addToInquiry = () => {
    setInquiryCount(prev => prev + 1)
    setShowRipple(true)
    setTimeout(() => setShowRipple(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - IDENTYCZNY JAK STRONA GŁÓWNA */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </div>
            
            <div className="flex items-center gap-8">
              <ul className="hidden md:flex items-center gap-8">
                <li><a href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</a></li>
                <li><a href="#produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</a></li>
                <li><a href="/serwis" className="text-gray-700 hover:text-emerald-600 transition-colors">Serwis</a></li>
                <li><a href="/kontakt" className="text-gray-700 hover:text-emerald-600 transition-colors">Kontakt</a></li>
              </ul>
              
              <motion.button 
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
          <a href="/kategoria/urzadzenia-fiskalne" className="hover:text-emerald-600">Urządzenia fiskalne</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Posnet Pospay 2</span>
        </nav>
      </div>

      {/* Product Hero Section */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={['/pospay_1.png', '/pospay_2.png', '/pospay_3.png', '/pospay_4.png']} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium">
                  Urządzenie fiskalne
                </span>
                <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-medium">
                  Kompatybilne z Leśnik+
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Posnet Pospay 2
              </h1>
              
              <p className="text-gray-600 mb-4 text-justify">
                Posnet Pospay 2 to nowoczesne urządzenie fiskalne typu online łączące funkcje kasy fiskalnej z terminalem płatniczym. Rozwiązanie idealne dla nadleśnictw i instytucji publicznych wymagających obsługi płatności gotówkowych i bezgotówkowych. Kompaktowa konstrukcja z intuicyjnym ekranem dotykowym 4,5" ułatwia codzienną obsługę sprzedaży. Wbudowany terminal płatniczy akceptuje karty i BLIK. Urządzenie w pełni kompatybilne z systemem Leśnik+, co zapewnia bezproblemową integrację z oprogramowaniem używanym przez administrację leśną. Bateria o pojemności 6800 mAh umożliwia mobilną pracę przez cały dzień. Objęty kompleksowym wsparciem technicznym oraz obowiązkowymi przeglądami co 2 lata.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.button
                  onClick={addToInquiry}
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Zapytaj o produkt
                </motion.button>
              </div>

              {/* Box Ceny - na pełną szerokość */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-indigo-200 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-indigo-900 mb-3">Cennik i prowizje</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                        <span className="text-gray-700">Cena zakupu urządzenia:</span>
                        <span className="font-bold text-indigo-900">1 799 zł netto</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-white rounded-lg">
                        <span className="text-gray-700">Abonament miesięczny (wynajem terminala):</span>
                        <span className="font-bold text-indigo-900">39 zł netto</span>
                      </div>
                      <div className="p-2 bg-white rounded-lg">
                        <p className="text-gray-700 font-medium mb-2">Prowizje od transakcji:</p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-indigo-50 rounded px-2 py-1">
                            <div className="text-xs text-gray-600">VISA</div>
                            <div className="font-bold text-indigo-900">0,69%</div>
                          </div>
                          <div className="bg-indigo-50 rounded px-2 py-1">
                            <div className="text-xs text-gray-600">MasterCard</div>
                            <div className="font-bold text-indigo-900">0,79%</div>
                          </div>
                          <div className="bg-indigo-50 rounded px-2 py-1">
                            <div className="text-xs text-gray-600">BLIK</div>
                            <div className="font-bold text-indigo-900">0,39%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gdzie kupić - prosty design */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gdzie kupić?</h3>
                
                <div className="space-y-3">
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
              { id: 'timeline', label: 'Proces zakupu i wdrożenia' },
              { id: 'accessories', label: 'Akcesoria' },
              { id: 'specs', label: 'Specyfikacja' },
              { id: 'downloads', label: 'Pliki do pobrania' },
              { id: 'portal', label: 'Portal klienta' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => {
                  setActiveTab(tab.id)
                  // Scroll do sekcji
                  const element = document.getElementById(tab.id)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Timeline Section */}
        <div id="timeline" className="scroll-mt-24">
          <PurchaseTimeline />
        </div>

        {/* Accessories Section */}
        <div id="accessories" className="scroll-mt-24">
          <AccessoriesSection productName="Posnet Pospay 2" onAddToInquiry={addToInquiry} />
        </div>

        {/* Specyfikacja Section */}
        <div id="specs" className="scroll-mt-24 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Specyfikacja</h3>
          <Specifications />
        </div>

        {/* Pliki do pobrania Section */}
        <div id="downloads" className="scroll-mt-24 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Pliki do pobrania</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Karta katalogowa", type: "PDF", size: "1.2 MB" },
              { title: "Instrukcja obsługi", type: "PDF", size: "2.8 MB" },
              { title: "Specyfikacja techniczna", type: "PDF", size: "890 KB" }
            ].map((file, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 border border-gray-200 hover:border-emerald-300 cursor-pointer transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
          </div>
        </div>

        {/* Portal Klienta Section */}
        <div id="portal" className="scroll-mt-24">
          <ClientPortalSection />
        </div>
      </div>

      {/* Courier Service Section - POZA PORTALEM */}
      <CourierServiceSection productName="Posnet Pospay 2" />

      {/* Footer - IDENTYCZNY JAK STRONA GŁÓWNA */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white p-2 rounded-lg">
                  <img src="/rejestratory_logo.png" alt="Rejestartory.info" className="h-10 w-auto" />
                </div>
              </div>
              <div className="text-gray-400">
                <div>Administratorem serwisu</div>
                <div>Rejestratory.info,</div>
                <div>jest firma TAKMA</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produkty</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/kategoria/rejestratory" className="hover:text-white">Rejestratory</a></li>
                <li><a href="/kategoria/telefony" className="hover:text-white">Telefony</a></li>
                <li><a href="/kategoria/laptopy" className="hover:text-white">Laptopy</a></li>
                <li><a href="/kategoria/drukarki" className="hover:text-white">Drukarki</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Firma</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">O nas</a></li>
                <li><a href="#" className="hover:text-white">Serwis</a></li>
                <li><a href="#" className="hover:text-white">Kontakt</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>71 781 71 28</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>takma@takma.com.pl</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Wrocław, Poświęcka 1a, 51-128 Wrocław</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; Rejestratory.info. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}