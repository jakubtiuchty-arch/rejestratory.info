"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  LogOut,
  Plus,
  Trash2,
  Users,
  Link as LinkIcon,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Search,
  Filter,
  TrendingUp,
  BarChart3,
  Home,
} from "lucide-react";
import { supabase, ClientDocument } from '@/lib/supabase';

export default function AdminDocuments() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Documents state
  const [documents, setDocuments] = React.useState<ClientDocument[]>([]);
  
  // Form states
  const [clientName, setClientName] = React.useState("");
  const [documentName, setDocumentName] = React.useState("");
  const [documentUrl, setDocumentUrl] = React.useState("");
  const [documentType, setDocumentType] = React.useState<'contract' | 'protocol' | 'other'>('contract');
  const [notes, setNotes] = React.useState("");
  
  // Filter
  const [searchQuery, setSearchQuery] = React.useState("");
  const [clientFilter, setClientFilter] = React.useState<string>("all");
  
  // Existing clients for autocomplete
  const [existingClients, setExistingClients] = React.useState<string[]>([]);
  const [showClientSuggestions, setShowClientSuggestions] = React.useState(false);
  
  // Results
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = React.useState<string | null>(null);

  // Check authentication
  React.useEffect(() => {
    const authenticated = localStorage.getItem("admin_authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
      fetchData();
    } else {
      window.location.href = "/admin";
    }
  }, []);

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch documents
      const { data: docsData, error: docsError } = await supabase
        .from('client_documents')
        .select('*')
        .order('created_at', { ascending: false });

      if (docsError) {
        console.log('Tabela client_documents może nie istnieć:', docsError);
      } else {
        setDocuments(docsData || []);
      }

      // Fetch existing clients
      const { data: devicesData } = await supabase
        .from('devices')
        .select('client_name')
        .order('client_name');
      
      if (devicesData) {
        const uniqueClients = [...new Set(devicesData.map(d => d.client_name))];
        setExistingClients(uniqueClients);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter clients for autocomplete
  const filteredClients = existingClients.filter(client =>
    client.toLowerCase().includes(clientName.toLowerCase())
  );

  // Get unique clients from documents
  const documentClients = [...new Set(documents.map(d => d.client_name))].sort();

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    if (clientFilter !== "all" && doc.client_name !== clientFilter) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return doc.document_name.toLowerCase().includes(query) || 
             doc.client_name.toLowerCase().includes(query);
    }
    return true;
  });

  // Submit document
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName.trim() || !documentName.trim() || !documentUrl.trim()) {
      setSubmitResult({
        success: false,
        message: "Wypełnij wszystkie wymagane pola",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const { error } = await supabase
        .from('client_documents')
        .insert({
          client_name: clientName.trim(),
          document_name: documentName.trim(),
          document_url: documentUrl.trim(),
          document_type: documentType,
          notes: notes.trim() || null,
          uploaded_by: 'admin',
        });

      if (error) throw error;

      setSubmitResult({
        success: true,
        message: `Dokument "${documentName}" został dodany dla ${clientName}`,
      });

      // Reset form
      setDocumentName("");
      setDocumentUrl("");
      setNotes("");
      setIsModalOpen(false);
      
      // Refresh documents
      fetchData();

    } catch (error) {
      console.error('Error adding document:', error);
      setSubmitResult({
        success: false,
        message: "Błąd podczas dodawania dokumentu. Upewnij się, że tabela client_documents istnieje w bazie.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete document
  const handleDelete = async (docId: string) => {
    try {
      const { error } = await supabase
        .from('client_documents')
        .delete()
        .eq('id', docId);

      if (error) throw error;

      setDocuments(prev => prev.filter(d => d.id !== docId));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Błąd podczas usuwania dokumentu');
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                Dodaj urządzenia
              </span>
            </a>
            <a
              href="/admin/dokumenty"
              className="px-4 py-3 text-sm font-medium border-b-2 border-emerald-600 text-emerald-600 bg-emerald-50"
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
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-4 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj dokumentów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
              />
            </div>

            {/* Client filter */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm appearance-none bg-white"
              >
                <option value="all">Wszyscy klienci</option>
                {documentClients.map(client => (
                  <option key={client} value={client}>{client}</option>
                ))}
              </select>
            </div>

            {/* Dodaj dokument */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
            >
              <Plus className="h-4 w-4" />
              Dodaj dokument
            </button>
          </div>
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

        {/* Documents list */}
        {isLoading ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <p className="text-gray-600">Ładowanie dokumentów...</p>
            </div>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg border border-gray-200 p-8 text-center"
          >
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 mb-4">
              {documents.length === 0 
                ? "Brak dokumentów. Dodaj pierwszy dokument dla klienta."
                : "Brak dokumentów pasujących do filtrów."}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Dodaj dokument
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filteredDocuments.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      doc.document_type === 'contract' ? 'bg-blue-50' :
                      doc.document_type === 'protocol' ? 'bg-emerald-50' : 'bg-gray-50'
                    }`}>
                      <FileText className={`h-6 w-6 ${
                        doc.document_type === 'contract' ? 'text-blue-600' :
                        doc.document_type === 'protocol' ? 'text-emerald-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{doc.document_name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {doc.client_name}
                        </span>
                        <span>•</span>
                        <span>
                          {doc.document_type === 'contract' ? 'Umowa' :
                           doc.document_type === 'protocol' ? 'Protokół' : 'Dokument'}
                        </span>
                        <span>•</span>
                        <span>{new Date(doc.created_at).toLocaleDateString('pl-PL')}</span>
                      </div>
                      {doc.notes && (
                        <p className="text-xs text-gray-400 mt-1">{doc.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={doc.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Otwórz
                    </a>
                    {deleteConfirmId === doc.id ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(doc.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Potwierdź
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Anuluj
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(doc.id)}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Document Modal */}
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
              className="bg-white rounded-lg max-w-lg w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Plus className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Dodaj dokument</h3>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Client Name */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Klient (nadleśnictwo) *
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                    
                    {/* Autocomplete */}
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
                              className="w-full px-3 py-2 text-left hover:bg-blue-50 text-gray-900 text-sm"
                            >
                              {client}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Document Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Typ dokumentu *
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value as 'contract' | 'protocol' | 'other')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="contract">Umowa</option>
                      <option value="protocol">Protokół</option>
                      <option value="other">Inny dokument</option>
                    </select>
                  </div>

                  {/* Document Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nazwa dokumentu *
                    </label>
                    <input
                      type="text"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="np. Umowa serwisowa 2026"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Document URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link do dokumentu (URL) *
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="url"
                        value={documentUrl}
                        onChange={(e) => setDocumentUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Wklej link do pliku na Google Drive, Supabase Storage lub innej usłudze
                    </p>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notatki (opcjonalnie)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Dodatkowe informacje..."
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Anuluj
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Dodawanie...
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Dodaj dokument
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
