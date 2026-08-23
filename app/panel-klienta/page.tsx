"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ICON } from '@/components/product/icons';
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
    <div className="min-h-screen bg-stone-50">
      <Header activeTab="produkty" />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          {/* Logo/Ikona */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-white">
              <img src={ICON.klodka} alt="" className="h-7 w-7 mix-blend-multiply" />
            </div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-stone-900">Panel Klienta</h1>
            <p className="text-stone-600">
              Sprawdź status swoich urządzeń
            </p>
          </div>

          {/* Formularz logowania */}
          <div className="rounded-2xl border border-stone-200 bg-white p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="serial" className="block text-sm font-medium text-stone-700 mb-2">
                  Numer seryjny urządzenia
                </label>
                <div className="relative">
                  <img src={ICON.lupa} alt="" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 mix-blend-multiply" />
                  <input
                    id="serial"
                    type="text"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value.toUpperCase())}
                    placeholder="np. ABC123456"
                    className="w-full rounded-xl border border-stone-300 py-3 pl-11 pr-4 text-lg outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-stone-500">
                  Znajdziesz go na naklejce na Twoim urządzeniu
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <img src={ICON.info} alt="" className="h-5 w-5 flex-shrink-0 mt-0.5 mix-blend-multiply" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !serialNumber}
                className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-stone-300"
              >
                {isLoading ? "Sprawdzanie..." : "Pokaż moje urządzenia"}
              </button>
            </form>

            {/* Informacje pomocnicze */}
            <div className="mt-6 pt-6 border-t border-stone-200">
              <h3 className="text-sm font-semibold text-stone-900 mb-2">
                Co znajdziesz w panelu?
              </h3>
              <ul className="space-y-2 text-sm text-stone-600">
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
            <p className="text-sm text-stone-600">
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
