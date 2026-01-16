"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Lock, AlertCircle } from "lucide-react";
import { supabase } from '@/lib/supabase';

export default function PanelKlienta() {
  const [serialNumber, setSerialNumber] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const serialTrimmed = serialNumber.trim().toUpperCase();

    try {
      // 1. Najpierw szukamy w urządzeniach fiskalnych
      const { data: device, error: deviceError } = await supabase
        .from('devices')
        .select('client_name, serial_number')
        .eq('serial_number', serialTrimmed)
        .single();

      if (device && !deviceError) {
        // Znaleziono urządzenie fiskalne
        localStorage.setItem('client_name', device.client_name);
        localStorage.setItem('serial_number', device.serial_number);
        window.location.href = "/panel-klienta/dashboard";
        return;
      }

      // 2. Jeśli nie znaleziono w devices, szukamy w rejestratorach
      const { data: registrator, error: regError } = await supabase
        .from('registrators')
        .select('client_name, serial_number')
        .eq('serial_number', serialTrimmed)
        .single();

      if (registrator && !regError) {
        // Znaleziono rejestrator
        localStorage.setItem('client_name', registrator.client_name);
        localStorage.setItem('serial_number', registrator.serial_number);
        window.location.href = "/panel-klienta/dashboard";
        return;
      }

      // 3. Nie znaleziono w żadnej tabeli
      setError("Nie znaleziono urządzenia o podanym numerze seryjnym. Sprawdź poprawność numeru lub skontaktuj się z nami.");
      setIsLoading(false);
    } catch (err) {
      console.error('Login error:', err);
      setError("Wystąpił błąd podczas logowania. Spróbuj ponownie później.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header activeTab="produkty" />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          {/* Logo/Ikona */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel Klienta</h1>
            <p className="text-gray-600">
              Sprawdź status swoich urządzeń
            </p>
          </div>

          {/* Formularz logowania */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="serial" className="block text-sm font-medium text-gray-700 mb-2">
                  Numer seryjny urządzenia
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="serial"
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                    placeholder="np. ABC123456"
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Znajdziesz go na naklejce na Twoim urządzeniu
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !serialNumber}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sprawdzanie..." : "Pokaż moje urządzenia"}
              </button>
            </form>

            {/* Informacje pomocnicze */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                Co znajdziesz w panelu?
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>Listę urządzeń fiskalnych i rejestratorów</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>Terminy przeglądów i status kontraktów</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>Protokoły z przeprowadzonych przeglądów (PDF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">✓</span>
                  <span>Formularz zgłoszenia serwisowego</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pomoc */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Problemy z dostępem?{" "}
              <a href="mailto:takma@takma.com.pl" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Skontaktuj się z nami
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
