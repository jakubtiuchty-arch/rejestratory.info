"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from '@/components/Header';
import {
  Printer,
  FileText,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  Loader2,
  LogOut,
  Truck,
  X,
  Check,
  Info,
  ChevronDown,
  ChevronUp
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
  const [showAllDevices, setShowAllDevices] = React.useState(false);

  // Courier modal states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedDevice, setSelectedDevice] = React.useState<DeviceWithStatus | null>(null);
  const [formData, setFormData] = React.useState({
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
  });

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

  // Handle opening courier modal for a device
  const handleOpenCourierModal = (device: DeviceWithStatus) => {
    setSelectedDevice(device);
    setFormData({
      firstName: '',
      lastName: '',
      forestDistrict: clientName.replace('Nadleśnictwo ', ''),
      city: '',
      street: '',
      number: '',
      postalCode: '',
      deviceName: device.device_name,
      serialNumber: device.serial_number,
      faultDescription: ''
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/courier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
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
        deviceName: '',
        serialNumber: '',
        faultDescription: ''
      });
      setIsModalOpen(false);

      // Show confirmation lightbox
      setTimeout(() => {
        setIsConfirmationOpen(true);
      }, 300);

    } catch (error) {
      console.error('Error:', error);
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Twoje urządzenia fiskalne
              </h1>
              <p className="text-sm text-gray-600">
                {clientName} • {devices.length} urządzeń
              </p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('client_name');
                localStorage.removeItem('serial_number');
                window.location.href = '/panel-klienta';
              }}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium border border-red-200"
            >
              <LogOut className="h-4 w-4" />
              Wyloguj
            </button>
          </div>
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
            <>
              {/* Pierwsze 3 urządzenia - zawsze widoczne */}
              {devices.slice(0, 3).map((device, index) => {
                const statusConfig = getStatusConfig(device.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div key={device.id} className="flex gap-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow transition-shadow"
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

                    {/* Osobny mały box z przyciskiem kuriera */}
                    <motion.button
                      onClick={() => handleOpenCourierModal(device)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex-shrink-0 w-12 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Truck className="h-4 w-4 text-orange-600" />
                    </motion.button>
                  </div>
                );
              })}

              {/* Rozwijana sekcja z pozostałymi urządzeniami */}
              <AnimatePresence>
                {showAllDevices && devices.length > 3 && (
                  <>
                    {devices.slice(3).map((device, index) => {
                      const statusConfig = getStatusConfig(device.status);
                      const StatusIcon = statusConfig.icon;

                      return (
                        <motion.div
                          key={device.id}
                          className="flex gap-2"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow transition-shadow">
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
                          </div>

                          {/* Osobny mały box z przyciskiem kuriera */}
                          <button
                            onClick={() => handleOpenCourierModal(device)}
                            className="flex-shrink-0 w-12 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Truck className="h-4 w-4 text-orange-600" />
                          </button>
                        </motion.div>
                      );
                    })}
                  </>
                )}
              </AnimatePresence>

              {/* Przycisk "Pokaż więcej / Pokaż mniej" */}
              {devices.length > 3 && (
                <motion.button
                  onClick={() => setShowAllDevices(!showAllDevices)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  {showAllDevices ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Pokaż mniej
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Pokaż więcej ({devices.length - 3} urządzeń)
                    </>
                  )}
                </motion.button>
              )}
            </>
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

        {/* Do pobrania */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Download className="h-4 w-4 text-gray-600" />
            Przydatne dokumenty
          </h2>
          <div className="bg-white rounded-lg border border-gray-300 p-4">
            <a
              href="/zgloszenie-wydania-duplikatu-ksiazki-kasy.pdf"
              download
              className="flex items-center justify-between hover:bg-gray-50 -m-4 p-4 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded">
                  <FileText className="h-4 w-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Zgłoszenie wydania duplikatu książki serwisowej
                  </p>
                  <p className="text-xs text-gray-500">PDF • 91 KB</p>
                  <p className="text-xs text-gray-700 mt-1">
                    Wypełniony wniosek proszę wysłać na: <span className="font-semibold text-red-600">handel@wroclaw.posnet.com</span>
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-600"
              >
                <path d="M12 15V3"></path>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <motion.path
                  d="m7 10 5 5 5-5"
                  animate={{
                    d: [
                      "m7 10 5 5 5-5",
                      "m7 12 5 5 5-5",
                      "m7 10 5 5 5-5"
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Pomoc */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
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
                      <p className="text-sm text-gray-600">Wypełnij formularz aby zamówić odbiór {selectedDevice?.device_name}</p>
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
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                        disabled={isSubmitting}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isSubmitting}
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
                          disabled={isSubmitting}
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
                        value={formData.faultDescription}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        disabled={isSubmitting}
                        placeholder="Opisz szczegółowo problem z urządzeniem..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        disabled={isSubmitting}
                        className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Anuluj
                      </button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={isSubmitting ? {} : { scale: 1.02 }}
                        whileTap={isSubmitting ? {} : { scale: 0.98 }}
                      >
                        <Truck className="w-4 h-4" />
                        <span>{isSubmitting ? 'Wysyłanie...' : 'Zamów kuriera'}</span>
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
                          <li>• W razie pytań zadzwoń: <span className="font-semibold">607 819 688</span></li>
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
