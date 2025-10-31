// Hook do wyszukiwania głosowego
"use client";
import { useState, useEffect, useRef, useCallback } from 'react';

interface VoiceSearchOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  grammars: SpeechGrammarList;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onstart: () => void;
  onend: () => void;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export const useVoiceSearch = (options: VoiceSearchOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState('');

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const {
    language = 'pl-PL',
    continuous = false,
    interimResults = true,
    maxAlternatives = 1,
    onResult,
    onError,
    onStart,
    onEnd
  } = options;

  // Check for speech recognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
    }
  }, []);

  // Setup speech recognition
  useEffect(() => {
    if (!recognitionRef.current) return;

    const recognition = recognitionRef.current;
    
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;
    recognition.lang = language;
    recognition.maxAlternatives = maxAlternatives;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
      setTranscript('');
      setInterimTranscript('');
      onStart?.();
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interimText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence;

        if (result.isFinal) {
          finalTranscript += transcript;
          setConfidence(confidence);
        } else {
          interimText += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(finalTranscript);
        onResult?.(finalTranscript);
      }

      setInterimTranscript(interimText);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      const errorMessage = getErrorMessage(event.error);
      setError(errorMessage);
      setIsListening(false);
      onError?.(errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
      onEnd?.();
    };

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [language, continuous, interimResults, maxAlternatives, onResult, onError, onStart, onEnd]);

  const getErrorMessage = (error: string): string => {
    switch (error) {
      case 'no-speech':
        return 'Nie wykryto mowy. Spróbuj ponownie.';
      case 'audio-capture':
        return 'Nie można uzyskać dostępu do mikrofonu.';
      case 'not-allowed':
        return 'Dostęp do mikrofonu został zablokowany.';
      case 'network':
        return 'Błąd połączenia sieciowego.';
      case 'service-not-allowed':
        return 'Usługa rozpoznawania mowy nie jest dostępna.';
      case 'bad-grammar':
        return 'Błąd gramatyki rozpoznawania.';
      case 'language-not-supported':
        return 'Wybrany język nie jest obsługiwany.';
      default:
        return `Nieznany błąd: ${error}`;
    }
  };

  const startListening = useCallback((timeout?: number) => {
    if (!isSupported || !recognitionRef.current || isListening) return false;

    try {
      recognitionRef.current.start();
      
      // Auto-stop after timeout
      if (timeout) {
        timeoutRef.current = setTimeout(() => {
          stopListening();
        }, timeout);
      }
      
      return true;
    } catch (err) {
      setError('Nie można uruchomić rozpoznawania mowy');
      return false;
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      recognitionRef.current.stop();
    } catch (err) {
      console.error('Error stopping recognition:', err);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setConfidence(0);
    setError('');
  }, []);

  return {
    isListening,
    isSupported,
    transcript,
    interimTranscript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript
  };
};

// Search Context Provider
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SearchResult, SearchOptions, AdvancedProductSearch } from '../../lib/advanced-search-engine';

interface SearchState {
  results: SearchResult[];
  query: string;
  isSearching: boolean;
  options: SearchOptions;
  history: string[];
  compareList: SearchResult[];
  recentlyViewed: SearchResult[];
  savedSearches: Map<string, SearchOptions>;
}

interface SearchAction {
  type: 'SET_RESULTS' | 'SET_QUERY' | 'SET_SEARCHING' | 'SET_OPTIONS' | 
        'ADD_TO_HISTORY' | 'ADD_TO_COMPARE' | 'REMOVE_FROM_COMPARE' | 
        'ADD_RECENTLY_VIEWED' | 'SAVE_SEARCH' | 'CLEAR_COMPARE' | 'RESET';
  payload?: any;
}

const initialState: SearchState = {
  results: [],
  query: '',
  isSearching: false,
  options: {
    query: '',
    filters: {},
    sortBy: 'relevance',
    sortOrder: 'desc',
    fuzzySearch: true,
    searchInSpecs: true,
    searchInAccessories: true
  },
  history: [],
  compareList: [],
  recentlyViewed: [],
  savedSearches: new Map()
};

const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case 'SET_RESULTS':
      return { ...state, results: action.payload };
    
    case 'SET_QUERY':
      return { ...state, query: action.payload };
    
    case 'SET_SEARCHING':
      return { ...state, isSearching: action.payload };
    
    case 'SET_OPTIONS':
      return { ...state, options: { ...state.options, ...action.payload } };
    
    case 'ADD_TO_HISTORY':
      const newHistory = [action.payload, ...state.history.filter(q => q !== action.payload)].slice(0, 20);
      return { ...state, history: newHistory };
    
    case 'ADD_TO_COMPARE':
      if (state.compareList.length >= 3 || state.compareList.find(item => item.product.id === action.payload.product.id)) {
        return state;
      }
      return { ...state, compareList: [...state.compareList, action.payload] };
    
    case 'REMOVE_FROM_COMPARE':
      return { 
        ...state, 
        compareList: state.compareList.filter(item => item.product.id !== action.payload) 
      };
    
    case 'ADD_RECENTLY_VIEWED':
      const newRecentlyViewed = [
        action.payload, 
        ...state.recentlyViewed.filter(item => item.product.id !== action.payload.product.id)
      ].slice(0, 10);
      return { ...state, recentlyViewed: newRecentlyViewed };
    
    case 'SAVE_SEARCH':
      const newSavedSearches = new Map(state.savedSearches);
      newSavedSearches.set(action.payload.name, action.payload.options);
      return { ...state, savedSearches: newSavedSearches };
    
    case 'CLEAR_COMPARE':
      return { ...state, compareList: [] };
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
};

interface SearchContextType {
  state: SearchState;
  dispatch: React.Dispatch<SearchAction>;
  searchEngine: AdvancedProductSearch | null;
  performSearch: (query: string, options?: Partial<SearchOptions>) => Promise<void>;
  addToCompare: (result: SearchResult) => void;
  removeFromCompare: (productId: number) => void;
  addToHistory: (query: string) => void;
  addRecentlyViewed: (result: SearchResult) => void;
  saveSearch: (name: string, options: SearchOptions) => void;
  clearCompare: () => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const [searchEngine] = useState(() => new AdvancedProductSearch(productsByCategory));

  const performSearch = async (query: string, options?: Partial<SearchOptions>) => {
    dispatch({ type: 'SET_SEARCHING', payload: true });
    
    try {
      const searchOptions = { ...state.options, query, ...options };
      const results = searchEngine.search(searchOptions);
      
      dispatch({ type: 'SET_RESULTS', payload: results });
      dispatch({ type: 'SET_QUERY', payload: query });
      dispatch({ type: 'SET_OPTIONS', payload: searchOptions });
      
      if (query.trim()) {
        dispatch({ type: 'ADD_TO_HISTORY', payload: query });
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      dispatch({ type: 'SET_SEARCHING', payload: false });
    }
  };

  const addToCompare = (result: SearchResult) => {
    dispatch({ type: 'ADD_TO_COMPARE', payload: result });
  };

  const removeFromCompare = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_COMPARE', payload: productId });
  };

  const addToHistory = (query: string) => {
    dispatch({ type: 'ADD_TO_HISTORY', payload: query });
  };

  const addRecentlyViewed = (result: SearchResult) => {
    dispatch({ type: 'ADD_RECENTLY_VIEWED', payload: result });
  };

  const saveSearch = (name: string, options: SearchOptions) => {
    dispatch({ type: 'SAVE_SEARCH', payload: { name, options } });
  };

  const clearCompare = () => {
    dispatch({ type: 'CLEAR_COMPARE' });
  };

  const value: SearchContextType = {
    state,
    dispatch,
    searchEngine,
    performSearch,
    addToCompare,
    removeFromCompare,
    addToHistory,
    addRecentlyViewed,
    saveSearch,
    clearCompare
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

// Hook do zarządzania wyszukiwaniem z localStorage
export const useSearchPersistence = () => {
  const saveToStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`itdlalasow_${key}`, JSON.stringify(data));
    }
  };

  const loadFromStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`itdlalasow_${key}`);
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  };

  const removeFromStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`itdlalasow_${key}`);
    }
  };

  return {
    saveToStorage,
    loadFromStorage,
    removeFromStorage
  };
};