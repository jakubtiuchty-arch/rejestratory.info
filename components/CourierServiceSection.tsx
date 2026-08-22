'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ICON, naCiemnym } from '@/components/product/icons'

interface CourierServiceSectionProps {
  productName: string
  /** np. '3 lub 5 lat' — gdy podany, wariant v2 pokazuje informację o kontrakcie serwisowym */
  serviceContract?: string
  /** 'classic' — dotychczasowy pomarańczowy box; 'v2' — ciemny panel nowej karty produktu */
  variant?: 'classic' | 'v2'
}

export const CourierServiceSection = ({
  productName,
  serviceContract,
  variant = 'classic',
}: CourierServiceSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/courier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza')
      }

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

    } catch (error) {
      console.error('Error:', error)
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Wariant v2 — sekcja serwisu.
          To treść stała, a nie komunikat o zdarzeniu, więc świadomie NIE jest
          stylizowana na alert: Material każe dla treści trwałych używać nagłówka
          sekcji zamiast banera, a USWDS ostrzega, że mocna czerwień i pomarańcz
          wywołują reakcję lękową i przy dobrym umiejscowieniu są zbędne.
          Rozpoznawalność bierze się stąd, że sekcja nazywa rzecz po imieniu
          (nadtytuł + nagłówek w formie sytuacji klienta) i ma jedno ostrzeżenie
          we wzorcu GOV.UK „warning text”: ikona plus wytłuszczony tekst, czytelne
          także bez koloru (WCAG 1.4.1). */}
      {variant === 'v2' ? (
        <div id="service-section" className="scroll-mt-16 border-y border-stone-200 bg-white">
          <div className="container mx-auto px-4 py-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700">
                  Awaria i serwis
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
                  Urządzenie nie działa?
                </h2>
                <p className="mt-3 leading-relaxed text-stone-600">
                  Zgłaszasz usterkę formularzem, a kurier odbiera {productName} spod
                  wskazanego adresu. Transportu nie organizujesz i nie nadajesz paczki
                  samodzielnie.
                </p>
              </div>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0A1B12] px-6 py-3.5 font-semibold text-white transition hover:bg-[#14301F]"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Zgłoś usterkę
                <img src={naCiemnym(ICON.strzalka)} alt="" className="h-4 w-4" />
              </motion.button>
            </div>

            {/* wzorzec GOV.UK „warning text” — jedna rzecz, która ma konsekwencje,
                gdy klient jej nie dopilnuje */}
            <p className="mt-8 flex items-start gap-3 border-t border-stone-200 pt-6">
              <img
                src="/icons/line/ostrzezenie.png"
                alt="Uwaga"
                className="mt-0.5 h-6 w-6 shrink-0 mix-blend-multiply"
              />
              <strong className="text-lg font-bold leading-snug text-stone-900">
                Sprzęt pakujesz we własnym zakresie i naklejasz etykietę, którą wyślemy
                mailem.
              </strong>
            </p>

            <div className="mt-10">
              <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-stone-200 bg-stone-200 sm:grid-cols-3">
                {[
                  {
                    icon: '/icons/em45/line/formularz.png',
                    step: '01',
                    title: 'Zgłoszenie',
                    body: 'Opisujesz usterkę i podajesz adres odbioru.',
                  },
                  {
                    icon: '/icons/em45/line/kurier.png',
                    step: '02',
                    title: 'Odbiór w 24 h',
                    body: 'Pakujesz sprzęt, naklejasz etykietę z maila, kurier zabiera paczkę.',
                  },
                  {
                    icon: '/icons/em45/line/naprawa.png',
                    step: '03',
                    title: 'Naprawa',
                    body: 'Diagnoza w serwisie i informacja o zakresie prac.',
                  },
                ].map((s) => (
                  <li key={s.step} className="bg-white p-5">
                    <div className="flex items-center gap-3">
                      <img src={s.icon} alt="" className="h-6 w-6 mix-blend-multiply" />
                      <span className="font-mono text-[11px] tracking-[0.18em] text-stone-400">{s.step}</span>
                    </div>
                    <p className="mt-3 font-semibold text-stone-900">{s.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-stone-600">{s.body}</p>
                  </li>
                ))}
              </ol>

              {serviceContract && (
                <div className="mt-6 flex flex-col gap-2 border-t border-stone-100 pt-5 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="text-sm text-stone-600">
                    <span className="font-semibold text-stone-900">
                      Kontrakt serwisowy na {serviceContract}
                    </span>{' '}
                    — stała opieka nad urządzeniem zamiast pojedynczych zgłoszeń.
                  </p>
                  <a
                    href="/kontakt"
                    className="text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
                  >
                    Zapytaj o warunki
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
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
                    <img src={ICON.ostrzezenie} alt="" className="w-6 h-6 mix-blend-multiply" />
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
                    <img src={ICON.kurier} alt="" className="w-4 h-4 mr-2 mix-blend-multiply" />
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
                <img src={ICON.kurier} alt="" className="w-5 h-5 mix-blend-multiply" />
                <span>Zamów kuriera</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      )}

      {/* Courier Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#06140E]/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/20"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex shrink-0 items-center justify-between px-6 pb-4 pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-stone-50">
                      <img src="/icons/line/ostrzezenie.png" alt="" className="h-6 w-6 mix-blend-multiply" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-stone-900">Zgłoszenie usterki</h3>
                      <p className="mt-0.5 text-sm text-stone-600">Odbiór urządzenia {productName} spod wskazanego adresu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    aria-label="Zamknij"
                    className="rounded-full p-2 transition hover:bg-stone-100"
                  >
                    <img src="/icons/line/zamknij.png" alt="" className="h-5 w-5 mix-blend-multiply" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                <div className="bez-paska min-h-0 flex-1 space-y-6 overflow-y-auto px-6 pb-4">
                  {/* Personal Data */}
                  <div>
                    <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400">Dane kontaktowe</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm text-stone-600">
                          Imię <span className="text-stone-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-stone-600">
                          Nazwisko <span className="text-stone-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="mb-1.5 block text-sm text-stone-600">
                        Nadleśnictwo <span className="text-stone-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="forestDistrict"
                        value={formData.forestDistrict}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400">Adres odbioru</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm text-stone-600">
                          Miasto <span className="text-stone-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-stone-600">
                          Kod pocztowy <span className="text-stone-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          pattern="[0-9]{2}-[0-9]{3}"
                          placeholder="00-000"
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="md:col-span-2">
                        <label className="mb-1.5 block text-sm text-stone-600">
                          Ulica <span className="text-stone-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={formData.street}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-stone-600">
                          Numer <span className="text-stone-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="number"
                          value={formData.number}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Device Info */}
                  <div>
                    <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400">Informacje o urządzeniu</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm text-stone-600">
                          Nazwa urządzenia <span className="text-stone-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="deviceName"
                          value={formData.deviceName}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 font-medium text-stone-700"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm text-stone-600">
                          Numer seryjny <span className="text-stone-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="serialNumber"
                          value={formData.serialNumber}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="mb-1.5 block text-sm text-stone-600">
                        Opis usterki <span className="text-stone-400">*</span>
                      </label>
                      <textarea
                        name="faultDescription"
                        value={formData.faultDescription}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        disabled={isSubmitting}
                        placeholder="Opisz szczegółowo problem z urządzeniem..."
                        className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-stone-900 transition focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 disabled:cursor-not-allowed disabled:bg-stone-100"
                      />
                    </div>
                  </div>

                </div>

                {/* Przyciski zawsze widoczne — poza obszarem przewijania */}
                <div className="shrink-0 border-t border-stone-200 bg-white px-6 py-4">
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        disabled={isSubmitting}
                        className="rounded-xl border border-stone-300 px-5 py-2.5 font-medium text-stone-700 transition hover:border-stone-400 disabled:opacity-50"
                      >
                        Anuluj
                      </button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0A1B12] px-6 py-2.5 font-semibold text-white transition hover:bg-[#14301F] disabled:opacity-50"
                        whileHover={isSubmitting ? {} : { scale: 1.02 }}
                        whileTap={isSubmitting ? {} : { scale: 0.98 }}
                      >
                        {isSubmitting ? 'Wysyłanie…' : 'Zamów kuriera'}
                      </motion.button>
                    </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Lightbox */}
      <AnimatePresence>
        {isConfirmationOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#06140E]/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsConfirmationOpen(false)}
          >
            <motion.div
              className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/20"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50">
                      <img src="/icons/line/ptaszek.png" alt="" className="h-6 w-6 mix-blend-multiply" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-stone-900">Zgłoszenie przyjęte</h3>
                      <p className="mt-0.5 text-sm text-stone-600">Dalsze instrukcje wyślemy mailem</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsConfirmationOpen(false)}
                    aria-label="Zamknij"
                    className="rounded-full p-2 transition hover:bg-stone-100"
                  >
                    <img src="/icons/line/zamknij.png" alt="" className="h-5 w-5 mix-blend-multiply" />
                  </button>
                </div>
                
                <div className="mb-6 rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <h4 className="mb-1 font-semibold text-stone-900">Co dalej?</h4>
                  <p className="text-sm text-stone-600">
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
                      className="flex items-start gap-3 rounded-2xl border border-stone-200 p-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <motion.div
                        className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 font-mono text-[11px] font-bold text-white"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.1, type: "spring" }}
                      >
                        {index + 1}
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-semibold text-stone-900">{item.text}</p>
                        <p className="mt-1 text-sm text-stone-600">{item.detail}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 border-t border-stone-200 pt-6">
                  <div className="rounded-2xl bg-[#0A1B12] p-4">
                    <div className="flex items-start gap-3">
                      <img src="/icons/line/info.png" alt="" className="mt-0.5 h-5 w-5 flex-shrink-0 invert" />
                      <div className="text-sm text-emerald-50/85">
                        <p className="font-semibold mb-1">Ważne informacje:</p>
                        <ul className="space-y-1">
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
export default CourierServiceSection