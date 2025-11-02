"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Trash2, 
  Send, 
  Package, 
  Mail,
  User,
  Phone,
  Building2,
  MessageSquare,
  CheckCircle,
  ShoppingCart,
  AlertCircle
} from 'lucide-react'
import { useInquiry } from './InquiryContext'

export default function InquiryCartPanel() {
  const { 
    items, 
    inquiryCount, 
    isCartOpen, 
    closeCart, 
    removeFromInquiry, 
    clearInquiry 
  } = useInquiry()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    forestDistrict: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Wysyłka do API
      const response = await fetch('/api/send-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          forestDistrict: formData.forestDistrict,
          message: formData.message,
          items: items
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Błąd wysyłania zapytania')
      }

      // Sukces!
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Resetuj formularz i koszyk po 2 sekundach
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          forestDistrict: '',
          message: ''
        })
        clearInquiry()
        setShowSuccess(false)
        closeCart()
      }, 2000)

    } catch (error) {
      console.error('Error:', error)
      setIsSubmitting(false)
      // TODO: Możesz dodać error state i pokazać komunikat błędu
      alert('Wystąpił błąd podczas wysyłania zapytania. Spróbuj ponownie.')
    }
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
        )}
      </AnimatePresence>

      {/* Sliding Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Zapytanie ofertowe</h2>
                  <p className="text-emerald-100 text-sm">
                    {inquiryCount === 0 ? 'Brak produktów' : `${inquiryCount} ${inquiryCount === 1 ? 'produkt' : inquiryCount < 5 ? 'produkty' : 'produktów'}`}
                  </p>
                </div>
              </div>
              <motion.button
                onClick={closeCart}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {inquiryCount === 0 ? (
                // Pusty koszyk
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <motion.div
                    className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                  >
                    <Package className="w-12 h-12 text-gray-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Brak produktów w zapytaniu
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Dodaj produkty z katalogu, aby wysłać zapytanie ofertowe
                  </p>
                  <motion.button
                    onClick={closeCart}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Przeglądaj produkty
                  </motion.button>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Lista produktów */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">Produkty w zapytaniu</h3>
                      {inquiryCount > 0 && (
                        <motion.button
                          onClick={clearInquiry}
                          className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Wyczyść wszystko</span>
                        </motion.button>
                      )}
                    </div>

                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-emerald-300 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          layout
                        >
                          <div className="flex items-center space-x-4">
                            {/* Zdjęcie */}
                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0 p-2 border border-gray-200">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                              {item.category && (
                                <p className="text-sm text-emerald-600">{item.category}</p>
                              )}
                              {item.description && (
                                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description}</p>
                              )}
                            </div>

                            {/* Remove button */}
                            <motion.button
                              onClick={() => removeFromInquiry(item.id)}
                              className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Formularz */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Dane kontaktowe</h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Imię i nazwisko */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imię <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              placeholder="Jan"
                            />
                          </div>
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Kowalski"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="jan.kowalski@nadlesnictwo.pl"
                          />
                        </div>
                      </div>

                      {/* Telefon */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Telefon <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="+48 600 123 456"
                          />
                        </div>
                      </div>

                      {/* Nadleśnictwo */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nadleśnictwo (opcjonalnie)
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            name="forestDistrict"
                            value={formData.forestDistrict}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Nadleśnictwo Wrocław"
                          />
                        </div>
                      </div>

                      {/* Wiadomość */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dodatkowa wiadomość (opcjonalnie)
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Pytania, uwagi, preferencje dotyczące dostawy..."
                          />
                        </div>
                      </div>

                      {/* Info box */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="text-sm text-blue-900">
                            <p className="font-semibold mb-1">Jak to działa?</p>
                            <p className="text-blue-800">
                              Po kliknięciu przycisku "Wyślij zapytanie" otworzy się Twój program pocztowy 
                              z przygotowaną wiadomością. Możesz ją jeszcze edytować przed wysłaniem.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Submit button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            <span>Przygotowuję...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Wyślij zapytanie</span>
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* Success Animation Overlay */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  className="absolute inset-0 bg-emerald-600 flex items-center justify-center z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="text-center text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="w-24 h-24 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-2">Zapytanie wysłane!</h3>
                    <p className="text-emerald-100">Skontaktujemy się z Tobą wkrótce</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}