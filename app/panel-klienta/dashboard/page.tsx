"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  ChevronUp,
  MapPin,
  Pencil,
  Search,
  Filter,
  Save,
  BookOpen,
  ZoomIn,
  Smartphone,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { supabase, Device, Inspection, ClientDocument, Registrator } from '@/lib/supabase';

type DeviceStatus = "new" | "ok" | "warning" | "overdue";

interface DeviceWithStatus extends Device {
  status: DeviceStatus;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case "new":
      return {
        icon: Printer,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        label: "NOWE",
        borderColor: "border-blue-200"
      };
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

// Mapowanie nazw urządzeń na zdjęcia
const getDeviceImage = (deviceName: string): string | null => {
  const name = deviceName.toLowerCase();
  
  if (name.includes('pospay')) return '/pospay_3.png';
  if (name.includes('temo')) return '/temo_online_1.png';
  // Dodaj więcej mapowań w miarę potrzeby
  
  return null; // Brak zdjęcia - użyj ikony
};

export default function Dashboard() {
  const [devices, setDevices] = React.useState<DeviceWithStatus[]>([]);
  const [registrators, setRegistrators] = React.useState<Registrator[]>([]);
  const [inspections, setInspections] = React.useState<Inspection[]>([]);
  const [clientDocuments, setClientDocuments] = React.useState<ClientDocument[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [clientName, setClientName] = React.useState("");
  const [showAllDevices, setShowAllDevices] = React.useState(false);
  const [showAllRegistrators, setShowAllRegistrators] = React.useState(false);

  // Mapowanie obrazków dla rejestratorów
  const getRegistratorImage = (deviceName: string): string | null => {
    const imageMap: Record<string, string> = {
      'Zebra EM45': '/em45_1.webp',
      'Zebra TC27': '/tc27_1.png',
      'Samsung A56': '/a56_1.png',
      'Samsung S25 Ultra': '/s25ultra_1.png',
      'Samsung S25 FE': '/s25plus_1.png', // używamy s25plus jako placeholder
    };
    return imageMap[deviceName] || null;
  };

  // Location (leśnictwo) editing states
  const [editingDeviceId, setEditingDeviceId] = React.useState<string | null>(null);
  const [editingRegistratorId, setEditingRegistratorId] = React.useState<string | null>(null);
  const [editingLocation, setEditingLocation] = React.useState("");
  const [isSavingLocation, setIsSavingLocation] = React.useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = React.useState(false);
  const [selectedDeviceForLocation, setSelectedDeviceForLocation] = React.useState<DeviceWithStatus | null>(null);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState<string>("all");

  // Courier modal states
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
  
  // Image preview modal state
  const [previewImage, setPreviewImage] = React.useState<{src: string, title: string} | null>(null);
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
  const [activeContract, setActiveContract] = React.useState<{years: number, endDate: string} | null>(null);

  // Funkcja obliczająca status urządzenia na podstawie daty następnego przeglądu i czy był przegląd
  const calculateDeviceStatus = (nextInspectionDate: string, lastInspectionDate: string | null): DeviceStatus => {
    const today = new Date();
    const nextDate = new Date(nextInspectionDate);
    const daysUntilInspection = Math.floor((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // Jeśli nie było przeglądu - urządzenie jest NOWE
    const isNewDevice = !lastInspectionDate;

    if (daysUntilInspection < 0) {
      return "overdue"; // Przeterminowany
    } else if (daysUntilInspection <= 90) {
      return "warning"; // Zbliża się termin (3 miesiące)
    } else if (isNewDevice) {
      return "new"; // Nowe urządzenie bez przeglądu
    } else {
      return "ok"; // Po przeglądzie
    }
  };

  // Pobierz unikalne leśnictwa do filtrowania
  const uniqueForestryUnits = React.useMemo(() => {
    const units = devices
      .map(d => d.forestry_unit)
      .filter((unit): unit is string => Boolean(unit && unit.trim()));
    return [...new Set(units)].sort((a, b) => a.localeCompare(b, 'pl'));
  }, [devices]);

  // Filtrowane i wyszukiwane urządzenia
  const filteredDevices = React.useMemo(() => {
    return devices.filter(device => {
      // Filtr po leśnictwie
      if (locationFilter !== "all") {
        if (locationFilter === "unassigned") {
          if (device.forestry_unit && device.forestry_unit.trim()) return false;
        } else {
          if (device.forestry_unit !== locationFilter) return false;
        }
      }
      
      // Wyszukiwanie
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = device.device_name.toLowerCase().includes(query);
        const matchesSerial = device.serial_number.toLowerCase().includes(query);
        const matchesForestryUnit = device.forestry_unit?.toLowerCase().includes(query) || false;
        return matchesName || matchesSerial || matchesForestryUnit;
      }
      
      return true;
    });
  }, [devices, locationFilter, searchQuery]);

  // Funkcja zapisująca nazwę leśnictwa do Supabase (dla urządzeń fiskalnych)
  const saveForestryUnit = async (deviceId: string, newForestryUnit: string) => {
    setIsSavingLocation(true);
    try {
      const { error } = await supabase
        .from('devices')
        .update({ forestry_unit: newForestryUnit.trim() })
        .eq('id', deviceId);

      if (error) throw error;

      // Aktualizuj lokalny stan
      setDevices(prev => prev.map(d => 
        d.id === deviceId ? { ...d, forestry_unit: newForestryUnit.trim() } : d
      ));

      setEditingDeviceId(null);
      setEditingLocation("");
      setIsLocationModalOpen(false);
      setSelectedDeviceForLocation(null);
    } catch (error) {
      console.error('Error saving forestry unit:', error);
      alert('Błąd podczas zapisywania leśnictwa. Spróbuj ponownie.');
    } finally {
      setIsSavingLocation(false);
    }
  };

  // Funkcja zapisująca nazwę leśnictwa dla rejestratorów
  const saveRegistratorForestryUnit = async (registratorId: string, newForestryUnit: string) => {
    setIsSavingLocation(true);
    try {
      const { error } = await supabase
        .from('registrators')
        .update({ forestry_unit: newForestryUnit.trim() })
        .eq('id', registratorId);

      if (error) throw error;

      // Aktualizuj lokalny stan
      setRegistrators(prev => prev.map(r => 
        r.id === registratorId ? { ...r, forestry_unit: newForestryUnit.trim() } : r
      ));

      setEditingRegistratorId(null);
      setEditingLocation("");
    } catch (error) {
      console.error('Error saving registrator forestry unit:', error);
      alert('Błąd podczas zapisywania leśnictwa. Spróbuj ponownie.');
    } finally {
      setIsSavingLocation(false);
    }
  };

  // Otwórz modal edycji leśnictwa
  const openLocationModal = (device: DeviceWithStatus) => {
    setSelectedDeviceForLocation(device);
    setEditingLocation(device.forestry_unit || "");
    setIsLocationModalOpen(true);
  };

  // Rozpocznij edycję inline
  const startInlineEdit = (device: DeviceWithStatus) => {
    setEditingDeviceId(device.id);
    setEditingLocation(device.forestry_unit || "");
  };

  // Anuluj edycję inline
  const cancelInlineEdit = () => {
    setEditingDeviceId(null);
    setEditingLocation("");
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
          status: calculateDeviceStatus(device.next_inspection_date, device.last_inspection_date)
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

        // Pobierz dokumenty klienta (umowy itp.)
        const { data: documentsData, error: documentsError } = await supabase
          .from('client_documents')
          .select('*')
          .eq('client_name', storedClientName)
          .order('created_at', { ascending: false });

        if (documentsError) {
          console.log('Dokumenty nie dostępne (tabela może nie istnieć):', documentsError);
        } else {
          setClientDocuments(documentsData || []);
        }

        // Pobierz rejestratory klienta
        const { data: registratorsData, error: registratorsError } = await supabase
          .from('registrators')
          .select('*')
          .eq('client_name', storedClientName)
          .order('purchase_date', { ascending: false });

        if (registratorsError) {
          console.log('Rejestratory nie dostępne (tabela może nie istnieć):', registratorsError);
        } else {
          setRegistrators(registratorsData || []);
        }
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
    setActiveContract(null); // Urządzenia fiskalne nie mają kontraktu
    // Jeśli urządzenie ma przypisane leśnictwo, użyj go w polu nadleśnictwo
    const districtInfo = device.forestry_unit && device.forestry_unit.trim() 
      ? `${clientName.replace('Nadleśnictwo ', '')} - ${device.forestry_unit}`
      : clientName.replace('Nadleśnictwo ', '');
    setFormData({
      firstName: '',
      lastName: '',
      forestDistrict: districtInfo,
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

  // Handle opening courier modal for a registrator
  const handleOpenCourierModalForRegistrator = (reg: Registrator) => {
    setSelectedDevice(null);
    
    // Sprawdź czy ma aktywny kontrakt
    if (reg.service_contract_years && reg.service_contract_end && new Date(reg.service_contract_end) > new Date()) {
      setActiveContract({
        years: reg.service_contract_years,
        endDate: reg.service_contract_end
      });
    } else {
      setActiveContract(null);
    }
    
    setFormData({
      firstName: '',
      lastName: '',
      forestDistrict: clientName.replace('Nadleśnictwo ', ''),
      city: '',
      street: '',
      number: '',
      postalCode: '',
      deviceName: reg.device_name,
      serialNumber: reg.serial_number,
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
        body: JSON.stringify({
          ...formData,
          activeContract: activeContract ? {
            years: activeContract.years,
            endDate: activeContract.endDate
          } : null
        }),
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
                Twoje urządzenia
              </h1>
              <p className="text-sm text-gray-600">
                {clientName}
                {devices.length > 0 && ` • ${devices.length} ${devices.length === 1 ? 'urządzenie fiskalne' : 'urządzeń fiskalnych'}`}
                {registrators.length > 0 && ` • ${registrators.length} ${registrators.length === 1 ? 'rejestrator' : 'rejestratorów'}`}
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

        {/* Sekcja urządzeń fiskalnych - tylko jeśli są */}
        {devices.length > 0 && (
          <>
        {/* Nagłówek sekcji fiskalnych */}
        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Printer className="h-4 w-4 text-emerald-600" />
          Urządzenia fiskalne ({devices.length})
        </h2>

        {/* Wyszukiwanie i filtrowanie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4 bg-white rounded-lg border border-gray-200 p-3"
        >
          <div className="flex flex-col md:flex-row gap-3">
            {/* Wyszukiwarka */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj po nazwie, numerze seryjnym lub leśnictwie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filtr po leśnictwie */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm appearance-none bg-white"
              >
                <option value="all">Wszystkie leśnictwa ({devices.length})</option>
                <option value="unassigned">
                  Nieprzypisane ({devices.filter(d => !d.forestry_unit || !d.forestry_unit.trim()).length})
                </option>
                {uniqueForestryUnits.map(unit => (
                  <option key={unit} value={unit}>
                    {unit} ({devices.filter(d => d.forestry_unit === unit).length})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Info o filtrowanych wynikach */}
          {(searchQuery || locationFilter !== "all") && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-gray-600">
                Znaleziono: <strong>{filteredDevices.length}</strong> z {devices.length} urządzeń
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setLocationFilter("all");
                }}
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </motion.div>

        {/* Lista urządzeń */}
        <div className="space-y-2">
          {filteredDevices.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <Printer className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">
                {devices.length === 0 
                  ? "Brak urządzeń do wyświetlenia" 
                  : "Brak urządzeń pasujących do wyszukiwania"}
              </p>
              {(searchQuery || locationFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setLocationFilter("all");
                  }}
                  className="mt-3 text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                >
                  Wyczyść filtry
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Pierwsze 3 urządzenia - zawsze widoczne */}
              {filteredDevices.slice(0, 3).map((device, index) => {
                const statusConfig = getStatusConfig(device.status);
                const StatusIcon = statusConfig.icon;
                const isEditing = editingDeviceId === device.id;

                return (
                  <div key={device.id} className="flex gap-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow transition-shadow"
                    >
                      <div className="p-3 flex items-center gap-3">
                        {/* Zdjęcie lub ikona urządzenia */}
                        {getDeviceImage(device.device_name) ? (
                          <div className="bg-gray-50 rounded flex-shrink-0 overflow-hidden w-10 h-10">
                            <img 
                              src={getDeviceImage(device.device_name)!} 
                              alt={device.device_name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="bg-gray-50 p-1.5 rounded flex-shrink-0">
                            <Printer className="h-4 w-4 text-gray-500" />
                          </div>
                        )}

                        {/* Nazwa, numer seryjny i leśnictwo */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {device.device_name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            {device.serial_number}
                          </p>
                          
                          {/* Leśnictwo - inline edit */}
                          {isEditing ? (
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                              <input
                                type="text"
                                value={editingLocation}
                                onChange={(e) => setEditingLocation(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveForestryUnit(device.id, editingLocation);
                                  if (e.key === 'Escape') cancelInlineEdit();
                                }}
                                className="flex-1 text-xs px-1.5 py-0.5 border border-emerald-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Wpisz nazwę leśnictwa..."
                                autoFocus
                                list={`forestry-units-${device.id}`}
                              />
                              <datalist id={`forestry-units-${device.id}`}>
                                {uniqueForestryUnits.map(unit => (
                                  <option key={unit} value={unit} />
                                ))}
                              </datalist>
                              <button
                                onClick={() => saveForestryUnit(device.id, editingLocation)}
                                disabled={isSavingLocation}
                                className="p-0.5 text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                              >
                                <Save className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={cancelInlineEdit}
                                className="p-0.5 text-gray-400 hover:text-gray-600"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => startInlineEdit(device)}
                              className="flex items-center gap-1 mt-1 group"
                            >
                              <MapPin className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                              {device.forestry_unit && device.forestry_unit.trim() ? (
                                <span className="text-xs text-emerald-700 font-medium group-hover:text-emerald-800 truncate">
                                  {device.forestry_unit}
                                </span>
                              ) : (
                                <span className="text-xs text-gray-400 italic group-hover:text-emerald-600">
                                  Przypisz leśnictwo...
                                </span>
                              )}
                              <Pencil className="h-2.5 w-2.5 text-gray-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          )}
                        </div>

                        {/* Status badge */}
                        <div className={`flex items-center gap-1.5 ${statusConfig.bgColor} ${statusConfig.color} px-2 py-1 rounded-full text-xs font-medium flex-shrink-0`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig.label}
                        </div>

                        {/* Daty przeglądów */}
                        <div className="hidden md:flex items-center gap-4 text-xs flex-shrink-0">
                          {device.status === 'new' ? (
                            <>
                              <div>
                                <p className="text-gray-400 text-xs">Fiskalizacja</p>
                                <p className="font-medium text-gray-900">
                                  {device.fiscalization_date 
                                    ? new Date(device.fiscalization_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })
                                    : '-'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400 text-xs">Przegląd do</p>
                                <p className="font-medium text-blue-600">
                                  {new Date(device.next_inspection_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <p className="text-gray-400 text-xs">Ostatni</p>
                                <p className="font-medium text-gray-900">
                                  {device.last_inspection_date 
                                    ? new Date(device.last_inspection_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })
                                    : '-'}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400 text-xs">Następny</p>
                                <p className="font-medium text-gray-900">
                                  {new Date(device.next_inspection_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    {/* Osobny mały box z przyciskiem kuriera */}
                    <motion.button
                      onClick={() => handleOpenCourierModal(device)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="relative group flex-shrink-0 w-12 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors flex items-center justify-center"
                      title="Problem z urządzeniem? Zamów kuriera po odbiór sprzętu"
                    >
                      <Truck className="h-4 w-4 text-orange-600" />
                      <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 z-50">
                        Problem z urządzeniem? Zamów kuriera po odbiór sprzętu
                        <span className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></span>
                      </span>
                    </motion.button>
                  </div>
                );
              })}

              {/* Rozwijana sekcja z pozostałymi urządzeniami */}
              <AnimatePresence>
                {showAllDevices && filteredDevices.length > 3 && (
                  <>
                    {filteredDevices.slice(3).map((device, index) => {
                      const statusConfig = getStatusConfig(device.status);
                      const StatusIcon = statusConfig.icon;
                      const isEditing = editingDeviceId === device.id;

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
                              {/* Zdjęcie lub ikona urządzenia */}
                              {getDeviceImage(device.device_name) ? (
                                <div className="bg-gray-50 rounded flex-shrink-0 overflow-hidden w-10 h-10">
                                  <img 
                                    src={getDeviceImage(device.device_name)!} 
                                    alt={device.device_name}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                              ) : (
                                <div className="bg-gray-50 p-1.5 rounded flex-shrink-0">
                                  <Printer className="h-4 w-4 text-gray-500" />
                                </div>
                              )}

                              {/* Nazwa, numer seryjny i leśnictwo */}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-gray-900 truncate">
                                  {device.device_name}
                                </h3>
                                <p className="text-xs text-gray-500 truncate">
                                  {device.serial_number}
                                </p>
                                
                                {/* Leśnictwo - inline edit */}
                                {isEditing ? (
                                  <div className="flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                                    <input
                                      type="text"
                                      value={editingLocation}
                                      onChange={(e) => setEditingLocation(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') saveForestryUnit(device.id, editingLocation);
                                        if (e.key === 'Escape') cancelInlineEdit();
                                      }}
                                      className="flex-1 text-xs px-1.5 py-0.5 border border-emerald-300 rounded focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                                      placeholder="Wpisz nazwę leśnictwa..."
                                      autoFocus
                                      list={`forestry-units-expanded-${device.id}`}
                                    />
                                    <datalist id={`forestry-units-expanded-${device.id}`}>
                                      {uniqueForestryUnits.map(unit => (
                                        <option key={unit} value={unit} />
                                      ))}
                                    </datalist>
                                    <button
                                      onClick={() => saveForestryUnit(device.id, editingLocation)}
                                      disabled={isSavingLocation}
                                      className="p-0.5 text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                                    >
                                      <Save className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={cancelInlineEdit}
                                      className="p-0.5 text-gray-400 hover:text-gray-600"
                                    >
                                      <X className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => startInlineEdit(device)}
                                    className="flex items-center gap-1 mt-1 group"
                                  >
                                    <MapPin className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                                    {device.forestry_unit && device.forestry_unit.trim() ? (
                                      <span className="text-xs text-emerald-700 font-medium group-hover:text-emerald-800 truncate">
                                        {device.forestry_unit}
                                      </span>
                                    ) : (
                                      <span className="text-xs text-gray-400 italic group-hover:text-emerald-600">
                                        Przypisz leśnictwo...
                                      </span>
                                    )}
                                    <Pencil className="h-2.5 w-2.5 text-gray-300 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </button>
                                )}
                              </div>

                              {/* Status badge */}
                              <div className={`flex items-center gap-1.5 ${statusConfig.bgColor} ${statusConfig.color} px-2 py-1 rounded-full text-xs font-medium flex-shrink-0`}>
                                <StatusIcon className="h-3 w-3" />
                                {statusConfig.label}
                              </div>

                              {/* Daty przeglądów */}
                              <div className="hidden md:flex items-center gap-4 text-xs flex-shrink-0">
                                {device.status === 'new' ? (
                                  <>
                                    <div>
                                      <p className="text-gray-400 text-xs">Fiskalizacja</p>
                                      <p className="font-medium text-gray-900">
                                        {device.fiscalization_date 
                                          ? new Date(device.fiscalization_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })
                                          : '-'}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-400 text-xs">Przegląd do</p>
                                      <p className="font-medium text-blue-600">
                                        {new Date(device.next_inspection_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div>
                                      <p className="text-gray-400 text-xs">Ostatni</p>
                                      <p className="font-medium text-gray-900">
                                        {device.last_inspection_date 
                                          ? new Date(device.last_inspection_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })
                                          : '-'}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-gray-400 text-xs">Następny</p>
                                      <p className="font-medium text-gray-900">
                                        {new Date(device.next_inspection_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Osobny mały box z przyciskiem kuriera */}
                          <button
                            onClick={() => handleOpenCourierModal(device)}
                            className="relative group flex-shrink-0 w-12 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors flex items-center justify-center"
                            title="Problem z urządzeniem? Zamów kuriera po odbiór sprzętu"
                          >
                            <Truck className="h-4 w-4 text-orange-600" />
                            <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 z-50">
                              Problem z urządzeniem? Zamów kuriera po odbiór sprzętu
                              <span className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></span>
                            </span>
                          </button>
                        </motion.div>
                      );
                    })}
                  </>
                )}
              </AnimatePresence>

              {/* Przycisk "Pokaż więcej / Pokaż mniej" */}
              {filteredDevices.length > 3 && (
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
                      Pokaż więcej ({filteredDevices.length - 3} urządzeń)
                    </>
                  )}
                </motion.button>
              )}
            </>
          )}
        </div>
          </>
        )}

        {/* Sekcja Rejestratory */}
        {registrators.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-blue-600" />
              Rejestratory ({registrators.length})
            </h2>
            <div className="space-y-2">
              {(showAllRegistrators ? registrators : registrators.slice(0, 3)).map((reg, index) => {
                const isContractActive = reg.service_contract_end && new Date(reg.service_contract_end) > new Date();
                const contractDaysLeft = reg.service_contract_end 
                  ? Math.ceil((new Date(reg.service_contract_end).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  : 0;

                return (
                  <div key={reg.id} className="flex gap-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-3"
                    >
                      <div className="flex items-center gap-3">
                      {/* Zdjęcie urządzenia */}
                      <div className="bg-gray-50 rounded flex-shrink-0 w-12 h-12 flex items-center justify-center overflow-hidden">
                        {getRegistratorImage(reg.device_name) ? (
                          <img 
                            src={getRegistratorImage(reg.device_name)!} 
                            alt={reg.device_name}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <Smartphone className="h-5 w-5 text-blue-600" />
                        )}
                      </div>

                        {/* Info o urządzeniu */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {reg.device_name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {reg.serial_number}
                          </p>
                          
                          {/* Leśnictwo - inline edit */}
                          {editingRegistratorId === reg.id ? (
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3 text-blue-500 flex-shrink-0" />
                              <input
                                type="text"
                                value={editingLocation}
                                onChange={(e) => setEditingLocation(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') saveRegistratorForestryUnit(reg.id, editingLocation);
                                  if (e.key === 'Escape') {
                                    setEditingRegistratorId(null);
                                    setEditingLocation("");
                                  }
                                }}
                                className="flex-1 text-xs px-1.5 py-0.5 border border-blue-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Wpisz nazwę leśnictwa..."
                                autoFocus
                                list={`forestry-units-reg-${reg.id}`}
                              />
                              <datalist id={`forestry-units-reg-${reg.id}`}>
                                {uniqueForestryUnits.map(unit => (
                                  <option key={unit} value={unit} />
                                ))}
                              </datalist>
                              <button
                                onClick={() => saveRegistratorForestryUnit(reg.id, editingLocation)}
                                disabled={isSavingLocation}
                                className="p-0.5 text-blue-600 hover:text-blue-700 disabled:opacity-50"
                              >
                                <Save className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingRegistratorId(null);
                                  setEditingLocation("");
                                }}
                                className="p-0.5 text-gray-400 hover:text-gray-600"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingRegistratorId(reg.id);
                                setEditingLocation(reg.forestry_unit || "");
                              }}
                              className="flex items-center gap-1 mt-1 group"
                            >
                              <MapPin className="h-3 w-3 text-blue-500 flex-shrink-0" />
                              {reg.forestry_unit && reg.forestry_unit.trim() ? (
                                <span className="text-xs text-blue-700 font-medium group-hover:text-blue-800 truncate">
                                  {reg.forestry_unit}
                                </span>
                              ) : (
                                <span className="text-xs text-gray-400 italic group-hover:text-blue-600">
                                  Przypisz leśnictwo...
                                </span>
                              )}
                              <Pencil className="h-2.5 w-2.5 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                          )}
                        </div>

                        {/* Kontrakt badge */}
                        {reg.service_contract_years && (
                          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                            isContractActive 
                              ? 'bg-green-50 text-green-700' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {isContractActive ? (
                              <ShieldCheck className="h-3 w-3" />
                            ) : (
                              <Shield className="h-3 w-3" />
                            )}
                            {isContractActive 
                              ? `Kontrakt ${reg.service_contract_years}L (${contractDaysLeft} dni)` 
                              : `Kontrakt wygasł`}
                          </div>
                        )}

                        {/* Data zakupu */}
                        <div className="hidden md:block text-right flex-shrink-0">
                          <p className="text-xs text-gray-400">Zakup</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(reg.purchase_date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                          </p>
                        </div>
                      </div>

                      {/* Szczegóły kontraktu - rozwinięte */}
                      {reg.service_contract_years && isContractActive && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <div className="bg-green-50 rounded-lg p-2 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <p className="text-xs text-green-700">
                              <strong>Kontrakt serwisowy aktywny</strong> do {new Date(reg.service_contract_end!).toLocaleDateString('pl-PL')} 
                              {' '}• Serwis w ramach kontraktu
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Przycisk kuriera */}
                    <motion.button
                      onClick={() => handleOpenCourierModalForRegistrator(reg)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="relative group flex-shrink-0 w-12 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors flex items-center justify-center"
                      title="Problem z urządzeniem? Zamów kuriera"
                    >
                      <Truck className="h-4 w-4 text-orange-600" />
                    </motion.button>
                  </div>
                );
              })}

              {/* Pokaż więcej/mniej */}
              {registrators.length > 3 && (
                <button
                  onClick={() => setShowAllRegistrators(!showAllRegistrators)}
                  className="w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  {showAllRegistrators ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Pokaż mniej
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Pokaż więcej ({registrators.length - 3} rejestratorów)
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Dokumenty - Umowy i inne (bez protokołów) */}
        {(() => {
          const nonProtocolDocuments = clientDocuments.filter(doc => doc.document_type !== 'protocol');
          if (nonProtocolDocuments.length === 0) return null;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Dokumenty
              </h2>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {nonProtocolDocuments.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-3 hover:bg-blue-50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-50 p-2 rounded">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {doc.document_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {doc.document_type === 'contract' ? 'Umowa' : 'Dokument'}
                            {' • '}
                            {new Date(doc.created_at).toLocaleDateString('pl-PL')}
                          </p>
                        </div>
                      </div>
                      <a
                        href={doc.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        Pobierz
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Protokoły przeglądów - z aplikacji terenowej + dodane przez admin */}
        {(() => {
          const protocolDocuments = clientDocuments.filter(doc => doc.document_type === 'protocol');
          const hasInspections = inspections.filter(i => i.pdf_url).length > 0;
          const hasProtocolDocuments = protocolDocuments.length > 0;
          
          if (!hasInspections && !hasProtocolDocuments) return null;
          
          return (
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
                <div className="divide-y divide-gray-100">
                  {/* Protokoły dodane przez admin */}
                  {protocolDocuments.map((doc, index) => (
                    <motion.div
                      key={`doc-${doc.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.1 }}
                      className="p-3 hover:bg-emerald-50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 p-2 rounded">
                          <FileText className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {doc.document_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Protokół • {new Date(doc.created_at).toLocaleDateString('pl-PL')}
                          </p>
                        </div>
                      </div>
                      <a
                        href={doc.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </a>
                    </motion.div>
                  ))}
                  
                  {/* Protokoły z aplikacji terenowej */}
                  {inspections.filter(i => i.pdf_url).map((inspection, index) => (
                    <motion.div
                      key={`insp-${inspection.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + protocolDocuments.length * 0.1 + index * 0.1 }}
                      className="p-3 hover:bg-emerald-50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-50 p-2 rounded">
                          <FileText className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            Przegląd {formatDate(inspection.inspection_date)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {inspection.device_count} urządzeń
                          </p>
                        </div>
                      </div>
                      <a
                        href={inspection.pdf_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })()}

        {/* Instrukcje - Infografiki (tylko dla nowych urządzeń, max 1 miesiąc od fiskalizacji) */}
        {(() => {
          // Sprawdź czy są nowe urządzenia sfiskalizowane w ciągu ostatniego miesiąca
          const today = new Date();
          const oneMonthAgo = new Date(today);
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          
          const hasRecentNewDevices = devices.some(device => {
            // Urządzenie musi być NOWE (bez przeglądu)
            if (device.last_inspection_date) return false;
            
            // Sprawdź datę fiskalizacji (musi być w ciągu ostatniego miesiąca)
            if (!device.fiscalization_date) return false;
            const fiscDate = new Date(device.fiscalization_date);
            return fiscDate >= oneMonthAgo;
          });
          
          if (!hasRecentNewDevices) return null;
          
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-purple-600" />
                Instrukcje dla nowych urządzeń
                <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                  Widoczne przez 30 dni
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Instrukcja 1 - Kod autoryzacyjny */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 }}
                  className="bg-white rounded-lg border border-purple-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => setPreviewImage({
                    src: '/instrukcja-kod-autoryzacyjny.png',
                    title: 'Wprowadzenie kodu autoryzacyjnego'
                  })}
                >
                  <div className="relative">
                    <img 
                      src="/instrukcja-kod-autoryzacyjny.png" 
                      alt="Wprowadzenie kodu autoryzacyjnego"
                      className="w-full h-40 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Wprowadzenie kodu autoryzacyjnego
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Kliknij aby powiększyć
                    </p>
                  </div>
                </motion.div>

                {/* Instrukcja 2 - Aktualizacja menu */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-lg border border-purple-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => setPreviewImage({
                    src: '/instrukcja-aktualizacja-menu-pospay.png',
                    title: 'Aktualizacja menu aplikacji płatniczej - Posnet Pospay 2'
                  })}
                >
                  <div className="relative">
                    <img 
                      src="/instrukcja-aktualizacja-menu-pospay.png" 
                      alt="Aktualizacja menu aplikacji płatniczej"
                      className="w-full h-40 object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Aktualizacja menu aplikacji płatniczej
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Posnet Pospay 2 • Kliknij aby powiększyć
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })()}

        {/* Do pobrania - tylko dla klientów z urządzeniami fiskalnymi */}
        {devices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
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
        )}

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

      {/* Location Edit Modal */}
      <AnimatePresence>
        {isLocationModalOpen && selectedDeviceForLocation && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsLocationModalOpen(false);
              setSelectedDeviceForLocation(null);
              setEditingLocation("");
            }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-md w-full shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Przypisz leśnictwo</h3>
                      <p className="text-sm text-gray-600">{selectedDeviceForLocation.device_name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsLocationModalOpen(false);
                      setSelectedDeviceForLocation(null);
                      setEditingLocation("");
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Informacja o urządzeniu */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3">
                    {getDeviceImage(selectedDeviceForLocation.device_name) ? (
                      <div className="bg-white rounded-lg overflow-hidden w-12 h-12 flex-shrink-0 border border-gray-200">
                        <img 
                          src={getDeviceImage(selectedDeviceForLocation.device_name)!} 
                          alt={selectedDeviceForLocation.device_name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <Printer className="h-8 w-8 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{selectedDeviceForLocation.device_name}</p>
                      <p className="text-sm text-gray-500">{selectedDeviceForLocation.serial_number}</p>
                    </div>
                  </div>
                </div>

                {/* Input z autocomplete */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nazwa leśnictwa
                  </label>
                  <input
                    type="text"
                    value={editingLocation}
                    onChange={(e) => setEditingLocation(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && editingLocation.trim()) {
                        saveForestryUnit(selectedDeviceForLocation.id, editingLocation);
                      }
                    }}
                    placeholder="np. Leśnictwo Rybaki"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    autoFocus
                    list="forestry-units-modal"
                  />
                  <datalist id="forestry-units-modal">
                    {uniqueForestryUnits.map(unit => (
                      <option key={unit} value={unit} />
                    ))}
                  </datalist>
                  <p className="mt-2 text-xs text-gray-500">
                    Zacznij pisać, aby zobaczyć podpowiedzi z wcześniej używanych nazw
                  </p>
                </div>

                {/* Podpowiedzi - szybki wybór */}
                {uniqueForestryUnits.length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-medium text-gray-500 mb-2">Szybki wybór:</p>
                    <div className="flex flex-wrap gap-2">
                      {uniqueForestryUnits.slice(0, 6).map(unit => (
                        <button
                          key={unit}
                          onClick={() => setEditingLocation(unit)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                            editingLocation === unit
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                          }`}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Przyciski */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setIsLocationModalOpen(false);
                      setSelectedDeviceForLocation(null);
                      setEditingLocation("");
                    }}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={() => saveForestryUnit(selectedDeviceForLocation.id, editingLocation)}
                    disabled={isSavingLocation || !editingLocation.trim()}
                    className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSavingLocation ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Zapisywanie...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Zapisz
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  {/* Info o aktywnym kontrakcie */}
                  {activeContract && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-green-800">
                            Aktywny kontrakt serwisowy ({activeContract.years} lata)
                          </h4>
                          <p className="text-sm text-green-700 mt-1">
                            Twoje urządzenie jest objęte kontraktem serwisowym ważnym do{' '}
                            <strong>{new Date(activeContract.endDate).toLocaleDateString('pl-PL')}</strong>.
                          </p>
                          <p className="text-sm text-green-600 mt-2">
                            ✓ Serwis w ramach kontraktu • ✓ Priorytetowa obsługa
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

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

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors flex items-center gap-2"
              >
                <span className="text-sm">Zamknij</span>
                <X className="w-6 h-6" />
              </button>
              
              {/* Title */}
              <h3 className="absolute -top-12 left-0 text-white font-semibold text-lg">
                {previewImage.title}
              </h3>
              
              {/* Image */}
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
