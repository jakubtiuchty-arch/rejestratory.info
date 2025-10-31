"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  Mic,
  MicOff,
  Camera,
  History,
  Save,
  Download,
  SlidersHorizontal,
  Keyboard,
  Star,
  Clock,
  TrendingUp,
  Zap,
  MoreHorizontal
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

// Import silnika wyszukiwania i danych
import { AdvancedProductSearch, SearchOptions, SearchResult, SearchSuggestion } from '../../lib/advanced-search-engine';
import { productsByCategory } from '../../lib/products-data';

interface AdvancedSearchProps {
  onResultsChange?: (results: SearchResult[]) => void;
  showInModal?: boolean;
  defaultQuery?: string;
  className?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onResultsChange,
  showInModal = false,
  defaultQuery = '',
  className = ''
}) => {
  // Initialize search engine
  const searchEngine = useRef<AdvancedProductSearch | null>(null);
  
  useEffect(() => {
    searchEngine.current = new AdvancedProductSearch(productsByCategory);
  }, []);

  // State management
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Search options
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    query: '',
    filters: {},
    sortBy: 'relevance',
    sortOrder: 'desc',
    fuzzySearch: true,
    searchInSpecs: true,
    searchInAccessories: true
  });

  // Voice search
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  
  // UI refs
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (showInModal) {
          setShowAdvancedModal(true);
        } else {
          searchInputRef.current?.focus();
        }
      }
      if (e.key === 'Escape') {
        setShowSuggestions(false);
        setShowAdvancedModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showInModal]);

  // Debounced search
  const performSearch = useCallback((searchQuery: string, options?: Partial<SearchOptions>) => {
    if (!searchEngine.current) return;

    const fullOptions: SearchOptions = {
      ...searchOptions,
      query: searchQuery,
      ...options
    };

    setIsSearching(true);
    
    try {
      const searchResults = searchEngine.current.search(fullOptions);
      setResults(searchResults);
      onResultsChange?.(searchResults);
      
      // Generate suggestions
      if (searchQuery.length > 1) {
        const newSuggestions = searchEngine.current.generateSuggestions(searchQuery, 8);
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  }, [searchOptions, onResultsChange]);

  // Handle input change with debouncing
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(true);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  // Voice search functionality
  const startVoiceSearch = () => {
    if (!speechSupported) return;

    setIsListening(true);
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'pl-PL';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      handleQueryChange(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Get available filters
  const availableFilters = searchEngine.current?.getAvailableFilters() || {
    categories: [],
    specifications: {},
    whereToBuy: [],
    availability: []
  };

  // Search history
  const searchHistory = searchEngine.current?.getSearchHistory() || [];

  // Main search input component
  const SearchInput = () => (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder="Szukaj produktów, specyfikacji, kategorii..."
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="pl-10 pr-20 py-3 text-lg border-2 border-gray-200 focus:border-emerald-500 rounded-xl"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {speechSupported && (
            <Button
              variant="ghost"
              size="sm"
              onClick={startVoiceSearch}
              className={isListening ? 'text-red-500' : 'text-gray-400'}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAdvancedModal(true)}
            className="text-gray-400"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
          <kbd className="hidden sm:inline-flex items-center rounded border bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
            Ctrl K
          </kbd>
        </div>
      </div>

      {/* Search suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && (query.length > 0 || searchHistory.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-96 overflow-y-auto"
          >
            {/* Recent searches */}
            {query.length === 0 && searchHistory.length > 0 && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Ostatnie wyszukiwania
                </h4>
                {searchHistory.slice(0, 5).map((historyQuery, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(historyQuery);
                      handleQueryChange(historyQuery);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm"
                  >
                    {historyQuery}
                  </button>
                ))}
              </div>
            )}

            {/* Search suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Sugestie
                </h4>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setQuery(suggestion.query);
                      handleQueryChange(suggestion.query);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <span className="text-sm">{suggestion.text}</span>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.count}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Search results component
  const SearchResults = () => (
    <div className="space-y-4">
      {/* Results header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {isSearching ? 'Wyszukiwanie...' : `Znaleziono ${results.length} produktów`}
          {query && (
            <span className="font-medium">
              {' '} dla "{query}"
            </span>
          )}
        </p>
        
        <div className="flex items-center gap-2">
          <Select
            value={searchOptions.sortBy}
            onValueChange={(value) => {
              const newOptions = { ...searchOptions, sortBy: value as any };
              setSearchOptions(newOptions);
              performSearch(query, newOptions);
            }}
          >
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Trafność</SelectItem>
              <SelectItem value="name">Nazwa A-Z</SelectItem>
              <SelectItem value="category">Kategoria</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtry
          </Button>
        </div>
      </div>

      {/* Results grid */}
      <div className="grid gap-6">
        {results.map((result, index) => (
          <motion.div
            key={result.product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Product image */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={result.product.imageUrl}
                      alt={result.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/placeholder-product.jpg';
                      }}
                    />
                  </div>
                  
                  {/* Product details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 
                          className="text-lg font-semibold text-gray-900 mb-1"
                          dangerouslySetInnerHTML={{ 
                            __html: result.highlightedText.name || result.product.name 
                          }}
                        />
                        <p className="text-sm text-gray-600 mb-2">
                          {result.product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-emerald-600">
                          {result.product.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          {result.product.availability}
                        </p>
                      </div>
                    </div>
                    
                    <p 
                      className="text-sm text-gray-700 mb-3 line-clamp-2"
                      dangerouslySetInnerHTML={{ 
                        __html: result.highlightedText.shortDescription || result.product.shortDescription 
                      }}
                    />
                    
                    {/* Key specifications */}
                    {result.product.specifications.slice(0, 3).map((spec, specIndex) => (
                      <Badge key={specIndex} variant="outline" className="mr-2 mb-1 text-xs">
                        {spec.label}: {spec.value}
                      </Badge>
                    ))}
                    
                    {/* Matched fields */}
                    {result.matchedFields.length > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-gray-500">Trafienia:</span>
                        {result.matchedFields.map(field => (
                          <Badge key={field} variant="secondary" className="text-xs">
                            {field === 'name' ? 'nazwa' : 
                             field === 'description' ? 'opis' :
                             field === 'specifications' ? 'specyfikacje' :
                             field === 'category' ? 'kategoria' : field}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="text-xs">
                          {Math.round(result.relevanceScore * 10) / 10}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="mt-4 flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Button asChild size="sm">
                      <Link href={`/produkty/${result.product.category.toLowerCase()}/${result.product.slug}`}>
                        Zobacz szczegóły
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Porównaj
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{result.product.whereToBuy}</span>
                    {result.product.serviceContract && (
                      <>
                        <Separator orientation="vertical" className="h-4" />
                        <span>Serwis: {result.product.serviceContract}</span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No results */}
      {!isSearching && results.length === 0 && query && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Brak wyników
          </h3>
          <p className="text-gray-600 mb-4">
            Nie znaleźliśmy produktów pasujących do zapytania "{query}"
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newOptions = { ...searchOptions, fuzzySearch: !searchOptions.fuzzySearch };
                setSearchOptions(newOptions);
                performSearch(query, newOptions);
              }}
            >
              {searchOptions.fuzzySearch ? 'Wyłącz' : 'Włącz'} wyszukiwanie rozmyte
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuery('')}
            >
              Wyczyść wyszukiwanie
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  // Advanced search modal
  const AdvancedSearchModal = () => (
    <Dialog open={showAdvancedModal} onOpenChange={setShowAdvancedModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-emerald-600" />
            Zaawansowane wyszukiwanie
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="search">Wyszukiwanie</TabsTrigger>
            <TabsTrigger value="filters">Filtry</TabsTrigger>
            <TabsTrigger value="history">Historia</TabsTrigger>
            <TabsTrigger value="saved">Zapisane</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-4">
            <SearchInput />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Opcje wyszukiwania</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fuzzy"
                      checked={searchOptions.fuzzySearch}
                      onCheckedChange={(checked) => 
                        setSearchOptions(prev => ({ ...prev, fuzzySearch: !!checked }))
                      }
                    />
                    <label htmlFor="fuzzy" className="text-sm">Wyszukiwanie rozmyte (błędy pisowni)</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="specs"
                      checked={searchOptions.searchInSpecs}
                      onCheckedChange={(checked) => 
                        setSearchOptions(prev => ({ ...prev, searchInSpecs: !!checked }))
                      }
                    />
                    <label htmlFor="specs" className="text-sm">Szukaj w specyfikacjach</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="accessories"
                      checked={searchOptions.searchInAccessories}
                      onCheckedChange={(checked) => 
                        setSearchOptions(prev => ({ ...prev, searchInAccessories: !!checked }))
                      }
                    />
                    <label htmlFor="accessories" className="text-sm">Szukaj w akcesoriach</label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sortowanie</label>
                <Select
                  value={searchOptions.sortBy}
                  onValueChange={(value) => 
                    setSearchOptions(prev => ({ ...prev, sortBy: value as any }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Trafność</SelectItem>
                    <SelectItem value="name">Nazwa</SelectItem>
                    <SelectItem value="category">Kategoria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="filters" className="space-y-4">
            {/* Kategorie */}
            <div>
              <h4 className="font-medium mb-2">Kategorie</h4>
              <div className="grid grid-cols-2 gap-2">
                {availableFilters.categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={searchOptions.filters.categories?.includes(category) || false}
                      onCheckedChange={(checked) => {
                        const current = searchOptions.filters.categories || [];
                        const updated = checked 
                          ? [...current, category]
                          : current.filter(c => c !== category);
                        setSearchOptions(prev => ({
                          ...prev,
                          filters: { ...prev.filters, categories: updated }
                        }));
                      }}
                    />
                    <label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Miejsce zakupu */}
            <div>
              <h4 className="font-medium mb-2">Gdzie kupić</h4>
              <div className="grid grid-cols-2 gap-2">
                {availableFilters.whereToBuy.map(place => (
                  <div key={place} className="flex items-center space-x-2">
                    <Checkbox
                      id={`place-${place}`}
                      checked={searchOptions.filters.whereToBuy?.includes(place) || false}
                      onCheckedChange={(checked) => {
                        const current = searchOptions.filters.whereToBuy || [];
                        const updated = checked 
                          ? [...current, place]
                          : current.filter(p => p !== place);
                        setSearchOptions(prev => ({
                          ...prev,
                          filters: { ...prev.filters, whereToBuy: updated }
                        }));
                      }}
                    />
                    <label htmlFor={`place-${place}`} className="text-sm">
                      {place}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Historia wyszukiwań</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => searchEngine.current?.clearSearchHistory()}
              >
                Wyczyść historię
              </Button>
            </div>
            
            {searchHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Brak historii wyszukiwań</p>
            ) : (
              <div className="space-y-2">
                {searchHistory.map((historyQuery, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">{historyQuery}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setQuery(historyQuery);
                        handleQueryChange(historyQuery);
                      }}
                    >
                      Użyj ponownie
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Zapisane wyszukiwania</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const name = prompt('Nazwa wyszukiwania:');
                  if (name) {
                    searchEngine.current?.saveSearch(name, { ...searchOptions, query });
                  }
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Zapisz obecne
              </Button>
            </div>
            
            <div className="space-y-2">
              {Array.from(searchEngine.current?.getSavedSearches() || []).map(([name, options]) => (
                <div key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="text-sm font-medium">{name}</span>
                    <p className="text-xs text-gray-500">{options.query}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchOptions(options);
                        setQuery(options.query);
                        handleQueryChange(options.query);
                      }}
                    >
                      Załaduj
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => searchEngine.current?.deleteSavedSearch(name)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-4 border-t">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setQuery('');
                setResults([]);
                setSearchOptions({
                  query: '',
                  filters: {},
                  sortBy: 'relevance',
                  sortOrder: 'desc',
                  fuzzySearch: true,
                  searchInSpecs: true,
                  searchInAccessories: true
                });
              }}
            >
              Resetuj
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                // Export results to CSV
                const csv = results.map(r => ({
                  name: r.product.name,
                  category: r.product.category,
                  price: r.product.price,
                  availability: r.product.availability,
                  relevance: r.relevanceScore
                }));
                
                const csvContent = "data:text/csv;charset=utf-8," + 
                  Object.keys(csv[0] || {}).join(",") + "\n" +
                  csv.map(row => Object.values(row).join(",")).join("\n");
                
                const link = document.createElement("a");
                link.setAttribute("href", encodeURI(csvContent));
                link.setAttribute("download", `search-results-${new Date().toISOString().split('T')[0]}.csv`);
                link.click();
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Eksportuj
            </Button>
            
            <Button onClick={() => {
              performSearch(query, searchOptions);
              setShowAdvancedModal(false);
            }}>
              Szukaj
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (showInModal) {
    return (
      <>
        <Button onClick={() => setShowAdvancedModal(true)} className={className}>
          <Search className="h-4 w-4 mr-2" />
          Szukaj produktów
        </Button>
        <AdvancedSearchModal />
      </>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <SearchInput />
      <SearchResults />
      <AdvancedSearchModal />
    </div>
  );
};

export default AdvancedSearch;