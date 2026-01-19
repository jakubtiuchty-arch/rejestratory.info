"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Plus,
  LogOut,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Trash2,
  Users,
  Copy,
  FileText,
  TrendingUp,
  BarChart3,
  Home,
} from "lucide-react";
import { supabase } from '@/lib/supabase';

// Typy rejestratorów
const REGISTRATOR_TYPES = [
  { value: "Zebra EM45", label: "Zebra EM45" },
  { value: "Zebra TC27", label: "Zebra TC27" },
  { value: "Samsung A56", label: "Samsung A56" },
  { value: "Samsung S25 FE", label: "Samsung S25 FE" },
  { value: "Samsung S25 Ultra", label: "Samsung S25 Ultra" },
];

interface ParsedDevice {
  serialNumber: string;
  isValid: boolean;
  isDuplicate: boolean;
}

export default function AdminRejestratory() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Form states
  const [clientName, setClientName] = React.useState("");
  const [deviceType, setDeviceType] = React.useState(REGISTRATOR_TYPES[0].value);
  const [purchaseDate, setPurchaseDate] = React.useState("");
  const [serviceContract, setServiceContract] = React.useState<number | null>(null); // null, 3 lub 5
  const [serialNumbersText, setSerialNumbersText] = React.useState("");
  const [parsedDevices, setParsedDevices] = React.useState<ParsedDevice[]>([]);
  
  // Results
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
    addedCount?: number;
  } | null>(null);

  // Existing clients for autocomplete
  const [existingClients, setExistingClients] = React.useState<string[]>([]);
  const [showClientSuggestions, setShowClientSuggestions] = React.useState(false);

  // Check authentication
  React.useEffect(() => {
    const authenticated = localStorage.getItem("admin_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchExistingClients();
    } else {
      window.location.href = "/admin";
    }
  }, []);

  // Fetch existing clients for autocomplete
  const fetchExistingClients = async () => {
    try {
      // Pobierz klientów z devices i registrators
      const { data: devicesData } = await supabase
        .from('devices')
        .select('client_name');
      
      const { data: registratorsData } = await supabase
        .from('registrators')
        .select('client_name');
      
      const allClients = [
        ...(devicesData || []).map(d => d.client_name),
        ...(registratorsData || []).map(d => d.client_name),
      ];
      
      const uniqueClients = [...new Set(allClients)].sort((a, b) => a.localeCompare(b, 'pl'));
      setExistingClients(uniqueClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  // Parse serial numbers from text
  const parseSerialNumbers = (text: string): ParsedDevice[] => {
    const lines = text
      .split(/[\n,;]/)
      .map(line => line.trim().toUpperCase())
      .filter(line => line.length > 0);
    
    const seen = new Set<string>();
    const parsed: ParsedDevice[] = [];
    
    for (const line of lines) {
      const isDuplicate = seen.has(line);
      seen.add(line);
      
      parsed.push({
        serialNumber: line,
        isValid: line.length >= 5,
        isDuplicate,
      });
    }
    
    return parsed;
  };

  // Handle text change
  const handleSerialNumbersChange = (text: string) => {
    setSerialNumbersText(text);
    setParsedDevices(parseSerialNumbers(text));
    setSubmitResult(null);
  };

  // Submit registrators
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validDevices = parsedDevices.filter(d => d.isValid && !d.isDuplicate);
    
    if (validDevices.length === 0) {
      setSubmitResult({
        success: false,
        message: "Brak poprawnych numerów seryjnych do dodania",
      });
      return;
    }

    if (!clientName.trim()) {
      setSubmitResult({
        success: false,
        message: "Wprowadź nazwę klienta (nadleśnictwo)",
      });
      return;
    }

    if (!purchaseDate) {
      setSubmitResult({
        success: false,
        message: "Wybierz datę zakupu",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Oblicz datę końca kontraktu jeśli wybrany
      let contractEndDate = null;
      if (serviceContract && purchaseDate) {
        const endDate = new Date(purchaseDate);
        endDate.setFullYear(endDate.getFullYear() + serviceContract);
        contractEndDate = endDate.toISOString().split('T')[0];
      }

      // Prepare registrators for insertion
      const registratorsToInsert = validDevices.map(d => ({
        client_name: clientName.trim(),
        device_name: deviceType,
        serial_number: d.serialNumber,
        purchase_date: purchaseDate,
        service_contract_years: serviceContract,
        service_contract_end: contractEndDate,
        created_at: new Date().toISOString(),
      }));

      // Check for existing serial numbers
      const serialNumbers = validDevices.map(d => d.serialNumber);
      const { data: existing } = await supabase
        .from('registrators')
        .select('serial_number')
        .in('serial_number', serialNumbers);

      const existingSerials = new Set(existing?.map(e => e.serial_number) || []);
      const newRegistrators = registratorsToInsert.filter(d => !existingSerials.has(d.serial_number));

      if (newRegistrators.length === 0) {
        setSubmitResult({
          success: false,
          message: "Wszystkie podane numery seryjne już istnieją w bazie",
        });
        setIsSubmitting(false);
        return;
      }

      // Insert registrators
      const { error } = await supabase
        .from('registrators')
        .insert(newRegistrators);

      if (error) throw error;

      // Success!
      setSubmitResult({
        success: true,
        message: `Pomyślnie dodano ${newRegistrators.length} rejestratorów dla ${clientName}`,
        addedCount: newRegistrators.length,
      });

      // Reset form
      setSerialNumbersText("");
      setParsedDevices([]);
      fetchExistingClients();

    } catch (error) {
      console.error('Error adding registrators:', error);
      setSubmitResult({
        success: false,
        message: "Błąd podczas dodawania rejestratorów. Upewnij się, że tabela registrators istnieje w bazie.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Remove single device from list
  const removeDevice = (index: number) => {
    const lines = serialNumbersText.split(/[\n]/).filter((_, i) => i !== index);
    const newText = lines.join('\n');
    setSerialNumbersText(newText);
    setParsedDevices(parseSerialNumbers(newText));
  };

  // Filter clients for autocomplete
  const filteredClients = existingClients.filter(client =>
    client.toLowerCase().includes(clientName.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    window.location.href = "/admin";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Sprawdzanie autoryzacji...</p>
        </div>
      </div>
    );
  }

  const validCount = parsedDevices.filter(d => d.isValid && !d.isDuplicate).length;
  const invalidCount = parsedDevices.filter(d => !d.isValid).length;
  const duplicateCount = parsedDevices.filter(d => d.isDuplicate).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
          <nav className="flex gap-1">
            <a
              href="/admin/dashboard"
              className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-colors"
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
              className="px-4 py-3 text-sm font-medium border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
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

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <form onSubmit={handleSubmit}>
          {/* Klient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Klient</h2>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nazwa nadleśnictwa *
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  setShowClientSuggestions(true);
                }}
                onFocus={() => setShowClientSuggestions(true)}
                onBlur={() => setTimeout(() => setShowClientSuggestions(false), 200)}
                placeholder="np. Nadleśnictwo Mrągowo"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              
              {/* Autocomplete suggestions */}
              <AnimatePresence>
                {showClientSuggestions && filteredClients.length > 0 && clientName.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto"
                  >
                    {filteredClients.slice(0, 5).map((client) => (
                      <button
                        key={client}
                        type="button"
                        onClick={() => {
                          setClientName(client);
                          setShowClientSuggestions(false);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50 text-gray-900 text-sm"
                      >
                        {client}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Typ rejestratora i data zakupu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Informacje o rejestratorach</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Typ rejestratora */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typ rejestratora *
                </label>
                <div className="space-y-2">
                  {REGISTRATOR_TYPES.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        deviceType === type.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deviceType"
                        value={type.value}
                        checked={deviceType === type.value}
                        onChange={(e) => setDeviceType(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-900">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Data zakupu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data zakupu *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Kontrakt serwisowy */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kontrakt serwisowy
                  </label>
                  <div className="space-y-2">
                    <label
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        serviceContract === null
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceContract"
                        checked={serviceContract === null}
                        onChange={() => setServiceContract(null)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-900">Brak kontraktu</span>
                    </label>
                    <label
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        serviceContract === 3
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceContract"
                        checked={serviceContract === 3}
                        onChange={() => setServiceContract(3)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-900">3 lata</span>
                      {purchaseDate && serviceContract === 3 && (
                        <span className="text-xs text-blue-600 ml-auto">
                          do {new Date(new Date(purchaseDate).setFullYear(new Date(purchaseDate).getFullYear() + 3)).toLocaleDateString('pl-PL')}
                        </span>
                      )}
                    </label>
                    <label
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        serviceContract === 5
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceContract"
                        checked={serviceContract === 5}
                        onChange={() => setServiceContract(5)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-900">5 lat</span>
                      {purchaseDate && serviceContract === 5 && (
                        <span className="text-xs text-blue-600 ml-auto">
                          do {new Date(new Date(purchaseDate).setFullYear(new Date(purchaseDate).getFullYear() + 5)).toLocaleDateString('pl-PL')}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Numery seryjne */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Copy className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Numery seryjne</h2>
              </div>
              {parsedDevices.length > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-blue-600 font-medium">
                    ✓ Poprawne: {validCount}
                  </span>
                  {duplicateCount > 0 && (
                    <span className="text-amber-600 font-medium">
                      ⚠ Duplikaty: {duplicateCount}
                    </span>
                  )}
                  {invalidCount > 0 && (
                    <span className="text-red-600 font-medium">
                      ✗ Błędne: {invalidCount}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wklej numery seryjne (każdy w nowej linii lub oddzielone przecinkiem)
              </label>
              <textarea
                value={serialNumbersText}
                onChange={(e) => handleSerialNumbersChange(e.target.value)}
                placeholder="IMEI lub numer seryjny...
np. 123456789012345
..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
              <p className="mt-2 text-xs text-gray-500">
                Możesz skopiować numery z Excela lub innego źródła - system automatycznie je rozpozna
              </p>
            </div>

            {/* Parsed devices preview */}
            {parsedDevices.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Podgląd rejestratorów do dodania:
                </p>
                <div className="max-h-64 overflow-auto border border-gray-200 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Numer seryjny</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-700">Status</th>
                        <th className="px-4 py-2 text-right font-medium text-gray-700">Akcja</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {parsedDevices.map((device, index) => (
                        <tr key={index} className={!device.isValid || device.isDuplicate ? 'bg-red-50' : ''}>
                          <td className="px-4 py-2 font-mono">{device.serialNumber}</td>
                          <td className="px-4 py-2">
                            {device.isDuplicate ? (
                              <span className="text-amber-600 text-xs">Duplikat</span>
                            ) : !device.isValid ? (
                              <span className="text-red-600 text-xs">Za krótki</span>
                            ) : (
                              <span className="text-blue-600 text-xs">OK</span>
                            )}
                          </td>
                          <td className="px-4 py-2 text-right">
                            <button
                              type="button"
                              onClick={() => removeDevice(index)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>

          {/* Result message */}
          <AnimatePresence>
            {submitResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  submitResult.success
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {submitResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${submitResult.success ? 'text-blue-900' : 'text-red-900'}`}>
                    {submitResult.success ? 'Sukces!' : 'Błąd'}
                  </p>
                  <p className={`text-sm ${submitResult.success ? 'text-blue-700' : 'text-red-700'}`}>
                    {submitResult.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              type="submit"
              disabled={isSubmitting || validCount === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Dodawanie rejestratorów...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Dodaj {validCount} rejestratorów
                </>
              )}
            </button>
          </motion.div>
        </form>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Informacje:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Rejestratory nie mają przeglądów - zapisywana jest tylko data zakupu</li>
                <li>• Numery seryjne muszą być unikalne</li>
                <li>• Klient zobaczy rejestratory w swoim Panelu Klienta</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
