"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer,
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
  Smartphone,
} from "lucide-react";
import { supabase, DEVICE_TYPES, DeviceType } from '@/lib/supabase';

interface ParsedDevice {
  serialNumber: string;
  isValid: boolean;
  isDuplicate: boolean;
}

export default function AdminDevices() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Form states
  const [clientName, setClientName] = React.useState("");
  const [deviceType, setDeviceType] = React.useState<DeviceType>("Posnet Temo Online");
  const [fiscalizationDate, setFiscalizationDate] = React.useState("");
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
      const { data } = await supabase
        .from('devices')
        .select('client_name')
        .order('client_name');
      
      if (data) {
        const uniqueClients = [...new Set(data.map(d => d.client_name))];
        setExistingClients(uniqueClients);
      }
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
        isValid: line.length >= 5, // Minimum 5 characters
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

  // Calculate next inspection date (fiscalization + 24 months)
  const calculateNextInspectionDate = (fiscDate: string): string => {
    const date = new Date(fiscDate);
    date.setMonth(date.getMonth() + 24);
    return date.toISOString().split('T')[0];
  };

  // Submit devices
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

    if (!fiscalizationDate) {
      setSubmitResult({
        success: false,
        message: "Wybierz datę fiskalizacji",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const nextInspectionDate = calculateNextInspectionDate(fiscalizationDate);
      
      // Prepare devices for insertion
      const devicesToInsert = validDevices.map(d => ({
        client_name: clientName.trim(),
        device_name: deviceType,
        serial_number: d.serialNumber,
        fiscalization_date: fiscalizationDate,
        last_inspection_date: null, // NULL for new devices
        next_inspection_date: nextInspectionDate,
        created_at: new Date().toISOString(),
      }));

      // Check for existing serial numbers
      const serialNumbers = validDevices.map(d => d.serialNumber);
      const { data: existing } = await supabase
        .from('devices')
        .select('serial_number')
        .in('serial_number', serialNumbers);

      const existingSerials = new Set(existing?.map(e => e.serial_number) || []);
      const newDevices = devicesToInsert.filter(d => !existingSerials.has(d.serial_number));

      if (newDevices.length === 0) {
        setSubmitResult({
          success: false,
          message: "Wszystkie podane numery seryjne już istnieją w bazie",
        });
        setIsSubmitting(false);
        return;
      }

      // Insert devices
      const { error } = await supabase
        .from('devices')
        .insert(newDevices);

      if (error) throw error;

      // Success!
      setSubmitResult({
        success: true,
        message: `Pomyślnie dodano ${newDevices.length} urządzeń dla ${clientName}`,
        addedCount: newDevices.length,
      });

      // Reset form
      setSerialNumbersText("");
      setParsedDevices([]);
      fetchExistingClients(); // Refresh client list

    } catch (error) {
      console.error('Error adding devices:', error);
      setSubmitResult({
        success: false,
        message: "Błąd podczas dodawania urządzeń. Spróbuj ponownie.",
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
              className="px-4 py-3 text-sm font-medium border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
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

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <form onSubmit={handleSubmit}>
          {/* Klient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-emerald-600" />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                        className="w-full px-4 py-2 text-left hover:bg-emerald-50 text-gray-900 text-sm"
                      >
                        {client}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Typ urządzenia i data fiskalizacji */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg border border-gray-200 p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Printer className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-bold text-gray-900">Informacje o urządzeniach</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Typ urządzenia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typ urządzenia *
                </label>
                <div className="space-y-2">
                  {DEVICE_TYPES.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        deviceType === type.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="deviceType"
                        value={type.value}
                        checked={deviceType === type.value}
                        onChange={(e) => setDeviceType(e.target.value as DeviceType)}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="font-medium text-gray-900">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Data fiskalizacji */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data fiskalizacji *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={fiscalizationDate}
                    onChange={(e) => setFiscalizationDate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                {fiscalizationDate && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">Przegląd wymagany do:</span>{' '}
                      {new Date(calculateNextInspectionDate(fiscalizationDate)).toLocaleDateString('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      (24 miesiące od daty fiskalizacji)
                    </p>
                  </div>
                )}
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
                <Copy className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-gray-900">Numery unikatowe (N/U)</h2>
              </div>
              {parsedDevices.length > 0 && (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-emerald-600 font-medium">
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
                placeholder="CAZ 1802291857
CAZ 1802291772
CAZ 1802291813
..."
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
              />
              <p className="mt-2 text-xs text-gray-500">
                Możesz skopiować numery z Excela lub innego źródła - system automatycznie je rozpozna
              </p>
            </div>

            {/* Parsed devices preview */}
            {parsedDevices.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Podgląd urządzeń do dodania:
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
                              <span className="text-emerald-600 text-xs">OK</span>
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
                    ? 'bg-emerald-50 border border-emerald-200'
                    : 'bg-red-50 border border-red-200'
                }`}
              >
                {submitResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium ${submitResult.success ? 'text-emerald-900' : 'text-red-900'}`}>
                    {submitResult.success ? 'Sukces!' : 'Błąd'}
                  </p>
                  <p className={`text-sm ${submitResult.success ? 'text-emerald-700' : 'text-red-700'}`}>
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
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Dodawanie urządzeń...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Dodaj {validCount} urządzeń
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
            <FileText className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Informacje:</p>
              <ul className="space-y-1 text-blue-700">
                <li>• Urządzenia zostaną dodane ze statusem <strong>NOWE</strong></li>
                <li>• Termin pierwszego przeglądu: 24 miesiące od daty fiskalizacji</li>
                <li>• Automatyczne przypomnienie zostanie ustawione na 14 dni przed terminem</li>
                <li>• Klient zobaczy urządzenia w swoim Panelu Klienta po zalogowaniu numerem seryjnym</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
