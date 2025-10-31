"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, Keyboard } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Import silnika wyszukiwania
import { AdvancedProductSearch, SearchSuggestion } from './advanced-search-engine';
import { productsByCategory } from './lib/products-data';

interface SearchBarProps {
  variant?: 'compact' | 'full';
  placeholder?: string;
  showShortcut?: boolean;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  variant = 'compact',
  placeholder = 'Szukaj produktów...',
  showShortcut = true,
  onSearch,
  className = ''
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const searchEngine = useRef<AdvancedProductSearch | null>(null);
  const router = useRouter();

  // Initialize search engine
  useEffect(() => {
    searchEngine.current = new AdvancedProductSearch(productsByCategory);
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Generate suggestions
  useEffect(() => {
    if (query.length > 1 && searchEngine.current) {
      const newSuggestions = searchEngine.current.generateSuggestions(query, 6);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      router.push(`/szukaj?q=${encodeURIComponent(searchQuery)}`);
      setOpen(false);
      setQuery('');
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'product': return '📱';
      case 'category': return '📂';
      case 'specification': return '⚙️';
      case 'brand': return '🏢';
      default: return '🔍';
    }
  };

  if (variant === 'compact') {
    return (
      <>
        <Button
          variant="outline"
          className={`relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 ${className}`}
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Szukaj produktów...</span>
          {showShortcut && (
            <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          )}
        </Button>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput
            placeholder={placeholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>Nie znaleziono wyników.</CommandEmpty>
            
            {suggestions.length > 0 && (
              <CommandGroup heading="Sugestie">
                {suggestions.map((suggestion, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => handleSearch(suggestion.query)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span>{getSuggestionIcon(suggestion.type)}</span>
                      <span>{suggestion.text}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.count}
                    </Badge>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {query && (
              <CommandGroup heading="Akcje">
                <CommandItem onSelect={() => handleSearch(query)}>
                  <Search className="mr-2 h-4 w-4" />
                  Szukaj "{query}"
                </CommandItem>
                <CommandItem asChild>
                  <Link href={`/szukaj?q=${encodeURIComponent(query)}&advanced=true`}>
                    <Keyboard className="mr-2 h-4 w-4" />
                    Zaawansowane wyszukiwanie
                  </Link>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </CommandDialog>
      </>
    );
  }

  // Full variant - inline search
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
          className="pl-9 pr-20"
        />
        {showShortcut && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        )}
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && query.length > 1 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-md border bg-popover p-0 text-popover-foreground shadow-md">
          <div className="max-h-60 overflow-y-auto p-1">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSearch(suggestion.query)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm"
              >
                <div className="flex items-center gap-2">
                  <span>{getSuggestionIcon(suggestion.type)}</span>
                  <span>{suggestion.text}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {suggestion.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;