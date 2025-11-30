"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import {
  Printer,
  Calendar,
  FileText,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2
} from "lucide-react";
import { supabase, Device, Inspection } from '@/lib/supabase';

type DeviceStatus = "ok" | "warning" | "overdue";

interface DeviceWithStatus extends Device {
  status: DeviceStatus;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "ok":
      return {
        icon: CheckCircle2,
        color: "text-emerald-600",
        bgColor: "bg-emerald-50",
        label: "Po przeglądzie",
        borderColor: "border-emerald-200"
      };
    case "warning":
      return {
        icon: Clock,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        label: "Zbliża się przegląd",
        borderColor: "border-amber-200"
      };
    case "overdue":
      return {
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        label: "Wymaga przeglądu",
        borderColor: "border-red-200"
      };
    default:
      return {
        icon: CheckCircle2,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        label: "Nieznany",
        borderColor: "border-gray-200"
      };
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function Dashboard() {
  const [devices, setDevices] = React.useState<DeviceWithStatus[]>([]);
  const [inspections, setInspections] = React.useState<Inspection[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [clientName, setClientName] = React.useState("");

  // Funkcja obliczająca status urządzenia na podstawie daty następnego przeglądu
  const calculateDeviceStatus = (nextInspectionDate: string): DeviceStatus => {
    const today = new Date();
    const nextDate = new Date(nextInspectionDate);
    const daysUntilInspection = Math.floor((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilInspection < 0) {
      return "overdue"; // Przeterminowany
    } else if (daysUntilInspection <= 90) {
      return "warning"; // Zbliża się termin (3 miesiące)
    } else {
      return "ok"; // Sprawny
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      // Pobierz dane klienta z localStorage
      const storedClientName = localStorage.getItem('client_name');

      if (!storedClientName) {
        // Jeśli nie ma danych w localStorage, przekieruj do logowania
        window.location.href = "/panel-klienta";
        return;
      }

      setClientName(storedClientName);

      try {
        // Pobierz urządzenia klienta
        const { data: devicesData, error: devicesError } = await supabase
          .from('devices')
          .select('*')
          .eq('client_name', storedClientName)
          .order('created_at', { ascending: false });

        if (devicesError) throw devicesError;

        // Dodaj status do każdego urządzenia
        const devicesWithStatus: DeviceWithStatus[] = (devicesData || []).map(device => ({
          ...device,
          status: calculateDeviceStatus(device.next_inspection_date)
        }));

        setDevices(devicesWithStatus);

        // Pobierz protokoły przeglądów
        const { data: inspectionsData, error: inspectionsError } = await supabase
          .from('inspections')
          .select('*')
          .eq('client_name', storedClientName)
          .order('inspection_date', { ascending: false });

        if (inspectionsError) throw inspectionsError;

        console.log('Pobrane protokoły dla klienta:', storedClientName, inspectionsData);
        setInspections(inspectionsData || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Ładowanie danych...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="produkty" />

      <div className="container mx-auto px-4 py-6">
        {/* Baner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 relative overflow-hidden rounded-xl shadow-lg"
        >
          <img
            src="/baner_em45_1.png"
            alt="EM45 Banner"
            className="w-full h-40 object-cover"
          />

          {/* Gradient zanikający po prawej stronie */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent"
               style={{
                 background: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 20%, transparent 40%)'
               }}>
          </div>

          {/* Treść banera */}
          <div className="absolute inset-0 flex items-center justify-end px-8">
            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-white text-xs uppercase tracking-wider font-semibold mb-1 drop-shadow-lg">
                  Poznaj nasz Bestseller!
                </p>
                <h3 className="text-white text-2xl font-bold leading-tight drop-shadow-lg">
                  Zebra EM45
                </h3>
                <p className="text-white text-xs font-light italic drop-shadow-lg">
                  To nie tylko smartfon
                </p>
              </div>
              <a
                href="https://www.em45.info"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold px-6 py-2.5 rounded-lg shadow-xl hover:shadow-2xl transition-all text-sm"
              >
                Zobacz więcej →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Twoje urządzenia fiskalne
          </h1>
          <p className="text-sm text-gray-600">
            {clientName} • {devices.length} urządzeń
          </p>
        </motion.div>

        {/* Podsumowanie statusów */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-xl font-bold text-emerald-900">
                  {devices.filter(d => d.status === "ok").length}
                </p>
                <p className="text-xs text-emerald-700">Po przeglądzie</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-xl font-bold text-amber-900">
                  {devices.filter(d => d.status === "warning").length}
                </p>
                <p className="text-xs text-amber-700">Zbliża się przegląd</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-xl font-bold text-red-900">
                  {devices.filter(d => d.status === "overdue").length}
                </p>
                <p className="text-xs text-red-700">Wymaga przeglądu</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lista urządzeń */}
        <div className="space-y-2">
          {devices.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <Printer className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">Brak urządzeń do wyświetlenia</p>
            </div>
          ) : (
            devices.map((device, index) => {
              const statusConfig = getStatusConfig(device.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow transition-shadow"
                >
                  <div className="p-3 flex items-center gap-3">
                    {/* Ikona urządzenia */}
                    <div className="bg-gray-50 p-1.5 rounded flex-shrink-0">
                      <Printer className="h-4 w-4 text-gray-500" />
                    </div>

                    {/* Nazwa i numer seryjny */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {device.device_name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {device.serial_number}
                      </p>
                    </div>

                    {/* Status badge */}
                    <div className={`flex items-center gap-1.5 ${statusConfig.bgColor} ${statusConfig.color} px-2 py-1 rounded-full text-xs font-medium flex-shrink-0`}>
                      <StatusIcon className="h-3 w-3" />
                      {statusConfig.label}
                    </div>

                    {/* Daty przeglądów */}
                    <div className="hidden md:flex items-center gap-4 text-xs flex-shrink-0">
                      <div>
                        <p className="text-gray-400 text-xs">Ostatni</p>
                        <p className="font-medium text-gray-900">
                          {new Date(device.last_inspection_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Następny</p>
                        <p className="font-medium text-gray-900">
                          {new Date(device.next_inspection_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Protokoły przeglądów */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-600" />
            Protokoły przeglądów
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {inspections.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Brak protokołów do wyświetlenia</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {inspections.map((inspection, index) => (
                  <motion.div
                    key={inspection.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-3 hover:bg-emerald-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-50 p-2 rounded">
                        <FileText className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatDate(inspection.inspection_date)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {inspection.device_count} urządzeń
                        </p>
                      </div>
                    </div>
                    {inspection.pdf_url ? (
                      <a
                        href={inspection.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex items-center gap-2 bg-gray-300 text-gray-500 px-3 py-1.5 rounded text-xs font-medium cursor-not-allowed"
                        title="Protokół niedostępny"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Pomoc */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-3"
        >
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            Potrzebujesz pomocy?
          </h3>
          <p className="text-xs text-blue-700 mb-2">
            Problem z urządzeniem lub umówienie przeglądu
          </p>
          <a
            href="tel:+48607819688"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors inline-block"
          >
            +48 607 819 688
          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/20 py-7 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-3.5">
            <div className="flex items-center justify-center gap-7 text-sm">
              <img src="/takma_logo_footer.png" alt="TAKMA" className="h-10 w-auto" />
              <span className="text-gray-600">takma@takma.com.pl</span>
              <span className="text-gray-600">607 819 688</span>
              <span className="text-gray-600">51-128 Wrocław, ul. Poświęcka 1a</span>
            </div>
            <div className="w-full max-w-3xl border-t border-gray-200"></div>
            <div className="text-gray-400 text-sm">
              © 2024 Rejestratory.info. Wszystkie prawa zastrzeżone.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
