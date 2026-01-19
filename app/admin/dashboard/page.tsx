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
  Smartphone,
} from "lucide-react";
import { supabase } from '@/lib/supabase';

interface ClientStats {
  client_name: string;
  device_count: number;
  fiscalization_date: string | null;
}

interface RegistratorStats {
  client_name: string;
  device_count: number;
  devices: { device_name: string; count: number }[];
  has_contract: boolean;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [clientStats, setClientStats] = React.useState<ClientStats[]>([]);
  const [totalDevices, setTotalDevices] = React.useState(0);
  const [registratorStats, setRegistratorStats] = React.useState<RegistratorStats[]>([]);
  const [totalRegistrators, setTotalRegistrators] = React.useState(0);

  const fetchData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      // Pobierz urządzenia fiskalne (nowe)
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

      // Pobierz rejestratory
      const { data: registrators, error: regError } = await supabase
        .from('registrators')
        .select('*')
        .order('created_at', { ascending: false });

      if (regError) {
        console.log('Rejestratory nie dostępne:', regError);
      } else {
        const regStatsMap = new Map<string, RegistratorStats>();
        
        (registrators || []).forEach(reg => {
          const existing = regStatsMap.get(reg.client_name);
          if (existing) {
            existing.device_count++;
            const deviceEntry = existing.devices.find(d => d.device_name === reg.device_name);
            if (deviceEntry) {
              deviceEntry.count++;
            } else {
              existing.devices.push({ device_name: reg.device_name, count: 1 });
            }
            if (reg.service_contract_years) {
              existing.has_contract = true;
            }
          } else {
            regStatsMap.set(reg.client_name, {
              client_name: reg.client_name,
              device_count: 1,
              devices: [{ device_name: reg.device_name, count: 1 }],
              has_contract: !!reg.service_contract_years,
            });
          }
        });

        const regStats = Array.from(regStatsMap.values()).sort((a, b) => b.device_count - a.device_count);
        setRegistratorStats(regStats);
        setTotalRegistrators(registrators?.length || 0);
      }
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
              <span className="font-bold text-gray-900">Panel SuperAdmin</span>
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
                Urządzenia fiskalne
              </span>
            </a>
            <a
              href="/admin/rejestratory"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Rejestratory
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {/* Urządzenia fiskalne */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Printer className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-xs text-gray-500">Urządzenia fiskalne</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : totalDevices}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-xl border border-gray-200 p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-xs text-gray-500">Klientów (fiskalne)</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : clientStats.length}
            </p>
          </motion.div>

          {/* Rejestratory */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-xs text-gray-500">Rejestratory</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : totalRegistrators}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl border border-gray-200 p-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs text-gray-500">Klientów (rejestratory)</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : registratorStats.length}
            </p>
          </motion.div>
        </div>

        {/* Dwie kolumny - urządzenia fiskalne i rejestratory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Lista klientów - urządzenia fiskalne */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-emerald-50">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Printer className="w-4 h-4 text-emerald-600" />
                Urządzenia fiskalne
              </h2>
              <button
                onClick={fetchData}
                disabled={isLoading}
                className="text-gray-500 hover:text-emerald-600 p-1.5 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
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
              <div className="p-6 text-center">
                <Printer className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm mb-2">Brak nowych urządzeń</p>
                <a
                  href="/admin/urzadzenia"
                  className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 text-xs font-medium"
                >
                  <Plus className="w-3 h-3" />
                  Dodaj urządzenia
                </a>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                {clientStats.map((client, index) => (
                  <motion.div
                    key={client.client_name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.03 }}
                    className="px-3 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center text-emerald-700 font-bold text-xs flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{client.client_name}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(client.fiscalization_date)}
                        </p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0">
                      {client.device_count} szt.
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Lista klientów - rejestratory */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-orange-50">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-orange-600" />
                Rejestratory
              </h2>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">
                <Loader2 className="w-6 h-6 animate-spin text-orange-600 mx-auto" />
              </div>
            ) : registratorStats.length === 0 ? (
              <div className="p-6 text-center">
                <Smartphone className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500 text-sm mb-2">Brak rejestratorów</p>
                <a
                  href="/admin/rejestratory"
                  className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                >
                  <Plus className="w-3 h-3" />
                  Dodaj rejestratory
                </a>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
                {registratorStats.map((client, index) => (
                  <motion.div
                    key={client.client_name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + index * 0.03 }}
                    className="px-3 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center text-orange-700 font-bold text-xs flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="font-medium text-gray-900 text-sm truncate">{client.client_name}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {client.has_contract && (
                          <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-xs">
                            Kontrakt
                          </span>
                        )}
                        <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs font-semibold">
                          {client.device_count} szt.
                        </span>
                      </div>
                    </div>
                    <div className="ml-8 flex flex-wrap gap-1">
                      {client.devices.map((dev, i) => (
                        <span key={i} className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                          {dev.device_name} ({dev.count})
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
