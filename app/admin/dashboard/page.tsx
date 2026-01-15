"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  LogOut,
  BarChart3,
  Printer,
  FileText,
  Plus,
  Building2,
  RefreshCw,
  Loader2,
  Home,
  Calendar,
} from "lucide-react";
import { supabase } from '@/lib/supabase';

interface ClientStats {
  client_name: string;
  device_count: number;
  fiscalization_date: string | null;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [clientStats, setClientStats] = React.useState<ClientStats[]>([]);
  const [totalDevices, setTotalDevices] = React.useState(0);

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: devices, error } = await supabase
        .from('devices')
        .select('client_name, fiscalization_date')
        .is('last_inspection_date', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const statsMap = new Map<string, ClientStats>();
      
      (devices || []).forEach(device => {
        const existing = statsMap.get(device.client_name);
        if (existing) {
          existing.device_count++;
        } else {
          statsMap.set(device.client_name, {
            client_name: device.client_name,
            device_count: 1,
            fiscalization_date: device.fiscalization_date,
          });
        }
      });

      const stats = Array.from(statsMap.values()).sort((a, b) => b.device_count - a.device_count);
      
      setClientStats(stats);
      setTotalDevices(devices?.length || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    const authenticated = localStorage.getItem("admin_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      window.location.href = "/admin";
    }
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    window.location.href = "/admin";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header z nawigacją */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-900">Panel administratora</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-500 hover:text-emerald-600 text-sm flex items-center gap-1">
                <Home className="w-4 h-4" />
                Strona główna
              </a>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Wyloguj
              </button>
            </div>
          </div>
          
          {/* Nawigacja zakładkowa */}
          <nav className="flex gap-1">
            <a
              href="/admin/dashboard"
              className="px-4 py-3 text-sm font-medium border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </span>
            </a>
            <a
              href="/admin/urzadzenia"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Dodaj urządzenia
              </span>
            </a>
            <a
              href="/admin/dokumenty"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Dokumenty
              </span>
            </a>
            <a
              href="/admin/sprzedaz"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Sprzedaż
              </span>
            </a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Statystyki w kartkach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Klientów z nowymi urządzeniami</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : clientStats.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Nowych urządzeń łącznie</p>
                <p className="text-2xl font-bold text-gray-900">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : totalDevices}
                </p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Printer className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lista klientów */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden"
        >
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Klienci z nowymi urządzeniami</h2>
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="text-gray-500 hover:text-emerald-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              title="Odśwież dane"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mx-auto" />
            </div>
          ) : clientStats.length === 0 ? (
            <div className="p-8 text-center">
              <Printer className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 text-sm mb-3">Brak nowych urządzeń w systemie</p>
              <a
                href="/admin/urzadzenia"
                className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Dodaj pierwsze urządzenia
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {clientStats.map((client, index) => (
                <motion.div
                  key={client.client_name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{client.client_name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Fiskalizacja: {formatDate(client.fiscalization_date)}
                      </p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-semibold">
                    {client.device_count} {client.device_count === 1 ? 'urządzenie' : client.device_count < 5 ? 'urządzenia' : 'urządzeń'}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
