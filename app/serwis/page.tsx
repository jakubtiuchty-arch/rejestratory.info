"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Phone, 
  Mail, 
  MapPin,
  Wrench,
  Clock,
  CheckCircle,
  Send,
  X,
  Package,
  Printer,
  Truck,
  Menu
} from "lucide-react";

export default function ServicePage() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    forestDistrict: "",
    address: "",
    phone: "",
    email: "",
    deviceType: "",
    otherDevice: "",
    serialNumber: "",
    hasContract: "",
    courierPickup: "",
    problemDescription: ""
  });

  const [showLightbox, setShowLightbox] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
      }

      setIsSubmitting(false);
      setShowLightbox(true);
      
      // Reset formularza
      setFormData({
        firstName: "",
        lastName: "",
        forestDistrict: "",
        address: "",
        phone: "",
        email: "",
        deviceType: "",
        otherDevice: "",
        serialNumber: "",
        hasContract: "",
        courierPickup: "",
        problemDescription: ""
      });

    } catch (error) {
      console.error('Error:', error);
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - z hamburger menu dla mobile */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/rejestratory_logo_footer_header.png" alt="Rejestartory.info" className="h-10 w-auto" />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-8">
                <li><a href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</a></li>
                <li><a href="/#produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</a></li>
                <li><a href="/serwis" className="text-emerald-600 font-semibold">Serwis</a></li>
                <li><a href="/kontakt" className="text-gray-700 hover:text-emerald-600 transition-colors">Kontakt</a></li>
              </ul>
              
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Zapytanie (0)
              </button>
            </div>

            {/* Mobile Menu Button & Cart */}
            <div className="flex md:hidden items-center gap-3">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                (0)
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <ul className="py-4 space-y-2">
                <li>
                  <a 
                    href="/" 
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Strona główna
                  </a>
                </li>
                <li>
                  <a 
                    href="/#produkty" 
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Produkty
                  </a>
                </li>
                <li>
                  <a 
                    href="/serwis" 
                    className="block px-4 py-2 text-emerald-600 bg-emerald-50 font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Serwis
                  </a>
                </li>
                <li>
                  <a 
                    href="/kontakt" 
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kontakt
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </header>

      {/* Hero Section z Typewriter */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur rounded-full p-4">
                  <Wrench className="h-12 w-12" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SERWIS
              </h1>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center justify-center">
                <p className="text-lg lg:text-xl text-emerald-50 leading-relaxed">
                  Chcielibyśmy, abyś trafiał tu jak najrzadziej, ale skoro już jesteś – załatwmy to jak najszybciej.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline - Proces naprawy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Jak wygląda proces naprawy?
              </h2>
            </motion.div>

            {/* Desktop Timeline - poziomy */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Linia łącząca */}
                <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-200">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "easeInOut", delay: 0.3 }}
                  />
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {/* Krok 1: Zgłoszenie */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 w-24 h-24 mx-auto bg-white border-4 border-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all cursor-pointer"
                    >
                      <Send className="h-10 w-10 text-emerald-600" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                    </motion.div>
                    <div className="text-center mt-4">
                      <h3 className="font-bold text-gray-900 mb-1">Zgłoszenie</h3>
                      <p className="text-sm text-gray-600">Formularz lub telefon</p>
                    </div>
                  </motion.div>

                  {/* Krok 2: Wysyłka do nas */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 w-24 h-24 mx-auto bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all cursor-pointer"
                    >
                      <Package className="h-10 w-10 text-blue-600" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                    </motion.div>
                    <div className="text-center mt-4">
                      <h3 className="font-bold text-gray-900 mb-1">Wysyłka</h3>
                      <p className="text-sm text-gray-600">Kurier odbiera sprzęt</p>
                    </div>
                  </motion.div>

                  {/* Krok 3: Diagnoza */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 }}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        rotate: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      className="relative z-10 w-24 h-24 mx-auto bg-white border-4 border-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all cursor-pointer"
                    >
                      <CheckCircle className="h-10 w-10 text-purple-600" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                    </motion.div>
                    <div className="text-center mt-4">
                      <h3 className="font-bold text-gray-900 mb-1">Diagnoza</h3>
                      <p className="text-sm text-gray-600">Wycena i akceptacja</p>
                    </div>
                  </motion.div>

                  {/* Krok 4: Naprawa */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.8 }}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative z-10 w-24 h-24 mx-auto bg-white border-4 border-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all cursor-pointer"
                    >
                      <Wrench className="h-10 w-10 text-orange-600" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                    </motion.div>
                    <div className="text-center mt-4">
                      <h3 className="font-bold text-gray-900 mb-1">Naprawa</h3>
                      <p className="text-sm text-gray-600">Profesjonalny serwis</p>
                    </div>
                  </motion.div>

                  {/* Krok 5: Wysyłka zwrotna */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 2.3 }}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        x: [0, 5, 0],
                      }}
                      transition={{
                        x: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      className="relative z-10 w-24 h-24 mx-auto bg-white border-4 border-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all cursor-pointer"
                    >
                      <Truck className="h-10 w-10 text-emerald-600" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        5
                      </div>
                    </motion.div>
                    <div className="text-center mt-4">
                      <h3 className="font-bold text-gray-900 mb-1">Wysyłka</h3>
                      <p className="text-sm text-gray-600">Odbiór sprawnego sprzętu</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Mobile Timeline - pionowy */}
            <div className="lg:hidden space-y-6">
              {[
                { icon: Send, title: "Zgłoszenie", desc: "Formularz lub telefon", color: "emerald", step: 1 },
                { icon: Package, title: "Wysyłka", desc: "Kurier odbiera sprzęt", color: "blue", step: 2 },
                { icon: CheckCircle, title: "Diagnoza", desc: "Wycena i akceptacja", color: "purple", step: 3 },
                { icon: Wrench, title: "Naprawa", desc: "Profesjonalny serwis", color: "orange", step: 4 },
                { icon: Truck, title: "Wysyłka", desc: "Odbiór sprawnego sprzętu", color: "emerald", step: 5 }
              ].map((item, index) => {
                const Icon = item.icon;
                const colorClasses = {
                  emerald: "border-emerald-500 bg-emerald-50",
                  blue: "border-blue-500 bg-blue-50",
                  purple: "border-purple-500 bg-purple-50",
                  orange: "border-orange-500 bg-orange-50"
                };
                const iconColors = {
                  emerald: "text-emerald-600",
                  blue: "text-blue-600",
                  purple: "text-purple-600",
                  orange: "text-orange-600"
                };
                const badgeColors = {
                  emerald: "bg-emerald-600",
                  blue: "bg-blue-600",
                  purple: "bg-purple-600",
                  orange: "bg-orange-600"
                };

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.4 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`relative flex-shrink-0 w-16 h-16 rounded-full border-4 ${colorClasses[item.color as keyof typeof colorClasses]} flex items-center justify-center shadow-lg`}>
                      <Icon className={`h-7 w-7 ${iconColors[item.color as keyof typeof iconColors]}`} />
                      <div className={`absolute -top-1 -right-1 w-6 h-6 ${badgeColors[item.color as keyof typeof badgeColors]} text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Info box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.6 }}
              className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border-2 border-emerald-200"
            >
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Najkrótszy możliwy czas</h3>
                  <p className="text-gray-700">
                    Rozumiemy, że każda godzina bez sprawnego sprzętu to utrata efektywności. 
                    Dlatego priorytetem jest jak najszybsze przywrócenie urządzenia do pełnej sprawności.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Formularz zgłoszenia */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                  <Send className="h-8 w-8 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Zgłoś naprawę</h2>
                <p className="text-gray-600">Wypełnij formularz, a my zajmiemy się resztą</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imię *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Jan"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nazwisko *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Kowalski"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nadleśnictwo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.forestDistrict}
                      onChange={(e) => setFormData({...formData, forestDistrict: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nadleśnictwo Miłomłyn"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="+48 123 456 789"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="ul. Leśna 1, 00-000 Miłomłyn"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="jan.kowalski@nadlesnictwo.pl"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Typ urządzenia *
                    </label>
                    <select
                      required
                      value={formData.deviceType}
                      onChange={(e) => setFormData({...formData, deviceType: e.target.value, otherDevice: ""})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="">Wybierz urządzenie</option>
                      <option value="rejestrator">Rejestrator</option>
                      <option value="telefon">Telefon</option>
                      <option value="laptop">Laptop</option>
                      <option value="drukarka-laserowa">Drukarka laserowa</option>
                      <option value="urzadzenie-wielofunkcyjne">Urządzenie wielofunkcyjne</option>
                      <option value="drukarka-termiczna">Drukarka termiczna</option>
                      <option value="urzadzenie-fiskalne">Urządzenie fiskalne</option>
                      <option value="inny">Inny</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numer seryjny
                    </label>
                    <input
                      type="text"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="SN: 123456789"
                    />
                  </div>
                </div>

                {/* Warunkowe pole "Inny typ urządzenia" */}
                {formData.deviceType === "inny" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jaki typ urządzenia? *
                    </label>
                    <input
                      type="text"
                      required={formData.deviceType === "inny"}
                      value={formData.otherDevice}
                      onChange={(e) => setFormData({...formData, otherDevice: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Wpisz typ urządzenia"
                    />
                  </motion.div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Czy urządzenie posiada kontrakt serwisowy? *
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        required
                        value="tak"
                        checked={formData.hasContract === "tak"}
                        onChange={(e) => setFormData({...formData, hasContract: e.target.value})}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700">Tak</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        required
                        value="nie"
                        checked={formData.hasContract === "nie"}
                        onChange={(e) => setFormData({...formData, hasContract: e.target.value})}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-gray-700">Nie</span>
                    </label>
                  </div>
                </div>

                {/* Zamówienie kuriera - wyróżniona sekcja z poprawą na mobile */}
                <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-base font-bold text-gray-900 mb-1">
                        Czy zamówić kuriera po odbiór sprzętu? *
                      </label>
                      <p className="text-sm text-gray-600 mb-3">
                        Zamówimy kuriera, który odbierze sprzęt z Twojej lokalizacji w ciągu 48h
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center gap-3 cursor-pointer bg-white px-6 py-3 rounded-lg border-2 border-gray-200 hover:border-emerald-500 transition-all flex-1">
                      <input
                        type="radio"
                        required
                        value="tak"
                        checked={formData.courierPickup === "tak"}
                        onChange={(e) => setFormData({...formData, courierPickup: e.target.value})}
                        className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 flex-shrink-0"
                      />
                      <span className="text-gray-900 font-semibold">Tak, zamów kuriera</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer bg-white px-6 py-3 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-all flex-1">
                      <input
                        type="radio"
                        required
                        value="nie"
                        checked={formData.courierPickup === "nie"}
                        onChange={(e) => setFormData({...formData, courierPickup: e.target.value})}
                        className="w-5 h-5 text-gray-600 focus:ring-gray-500 flex-shrink-0"
                      />
                      <span className="text-gray-900 font-semibold">Nie, dostarczę osobiście</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opis usterki *
                  </label>
                  <textarea
                    required
                    value={formData.problemDescription}
                    onChange={(e) => setFormData({...formData, problemDescription: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Opisz problem z urządzeniem..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full font-semibold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-xl'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock className="h-5 w-5" />
                      </motion.div>
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Wyślij zgłoszenie
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox z instrukcją - warunkowy */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
            onClick={() => setShowLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative z-[9999]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-4"
                >
                  <CheckCircle className="h-10 w-10 text-emerald-600" />
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Zgłoszenie przyjęte!
                </h3>
              </div>

              {/* Warunkowa treść - zależnie od wyboru kuriera */}
              {formData.courierPickup === "tak" ? (
                // Lightbox dla kuriera
                <>
                  <div className="bg-emerald-50 rounded-xl p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Package className="h-5 w-5 text-emerald-600" />
                      Co teraz zrobić?
                    </h4>
                    <ol className="space-y-4">
                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Zapakuj urządzenie</div>
                          <div className="text-sm text-gray-600">Zabezpiecz sprzęt w oryginalnym opakowaniu lub kartonowym pudełku</div>
                        </div>
                      </motion.li>

                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            Wydrukuj etykietę
                            <Printer className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div className="text-sm text-gray-600">Otrzymasz od nas email z etykietą kurierską do wydruku</div>
                        </div>
                      </motion.li>

                      <motion.li
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center gap-2">
                            Oczekuj na kuriera
                            <Truck className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div className="text-sm text-gray-600">Kurier odbierze przesyłkę w ciągu 48h</div>
                        </div>
                      </motion.li>
                    </ol>
                  </div>
                </>
              ) : (
                // Lightbox dla dostawy osobistej
                <div className="bg-blue-50 rounded-xl p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Adres wysyłki
                  </h4>
                  
                  <div className="bg-white rounded-lg p-4 mb-4 border-2 border-blue-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900 mb-1">TAKMA SERWIS</div>
                      <div className="text-gray-700">ul. Poświęcka 1a</div>
                      <div className="text-gray-700 mb-2">51-128 Wrocław</div>
                      <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
                        <Phone className="h-4 w-4" />
                        601 619 898
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-gray-700">
                    <p className="mb-2">Oczekujemy na przesyłkę</p>
                    <p className="text-xl font-bold text-gray-900">Będziemy w kontakcie!</p>
                  </div>
                </div>
              )}

              <motion.button
                onClick={() => setShowLightbox(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Rozumiem
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kontakt - Krzysztof Wójcik - przeprojektowane */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
        {/* Dekoracyjne elementy w tle */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Masz pytania?
              </h2>
              <p className="text-gray-600 text-lg">
                Skontaktuj się z osobą odpowiedzialną za serwis
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="grid md:grid-cols-5">
                {/* Lewa kolumna - emerald gradient */}
                <div className="md:col-span-2 bg-gradient-to-br from-emerald-600 to-emerald-800 p-8 flex flex-col justify-center items-center text-white relative overflow-hidden">
                  {/* Dekoracyjny wzór */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 border-4 border-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/30"
                    >
                      <Phone className="h-12 w-12 text-white" />
                    </motion.div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-emerald-200 mb-1">Kierownik działu serwisu</div>
                      <div className="text-2xl font-bold">Krzysztof Wójcik</div>
                    </div>
                  </div>
                </div>

                {/* Prawa kolumna - informacje kontaktowe */}
                <div className="md:col-span-3 p-8">
                  <div className="space-y-6">
                    {/* Telefon */}
                    <motion.a
                      href="tel:601619898"
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 transition-all group"
                    >
                      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Telefon</div>
                        <div className="text-2xl font-bold text-gray-900">601 619 898</div>
                      </div>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                      href="mailto:serwis@takma.com.pl"
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
                    >
                      <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Email</div>
                        <div className="text-lg font-semibold text-gray-900">serwis@takma.com.pl</div>
                      </div>
                    </motion.a>

                    {/* Godziny dostępności */}
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">Godziny dostępności</div>
                        <div className="text-lg font-semibold text-gray-900">Pn-Pt: 7:30 - 15:30</div>
                      </div>
                    </div>
                  </div>

                  {/* Dodatkowa informacja */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-600 text-center">
                      Wolisz pisemnie? Skorzystaj z formularza zgłoszeniowego powyżej
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

     {/* Footer */}
<footer className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/20 py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
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
  );
}