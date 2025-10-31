// Zaawansowany silnik wyszukiwania dla produktów IT dla Lasów
import { Product, ProductsByCategory } from '../products-data';

export interface SearchFilters {
  categories: string[];
  specifications: { [key: string]: string[] };
  whereToBuy: string[];
  availability: string[];
  priceRange: { min: number; max: number } | null;
}

export interface SearchOptions {
  query: string;
  filters: Partial<SearchFilters>;
  sortBy: 'relevance' | 'name' | 'category' | 'price';
  sortOrder: 'asc' | 'desc';
  fuzzySearch: boolean;
  searchInSpecs: boolean;
  searchInAccessories: boolean;
}

export interface SearchResult {
  product: Product;
  relevanceScore: number;
  matchedFields: string[];
  highlightedText: { [field: string]: string };
}

export interface SearchSuggestion {
  type: 'product' | 'category' | 'specification' | 'brand';
  text: string;
  count: number;
  query: string;
}

export class AdvancedProductSearch {
  private products: Product[] = [];
  private searchIndex: Map<string, Set<number>> = new Map();
  private specificationValues: Map<string, Set<string>> = new Map();
  private searchHistory: string[] = [];
  private savedSearches: Map<string, SearchOptions> = new Map();

  constructor(productsByCategory: ProductsByCategory) {
    this.products = Object.values(productsByCategory).flat();
    this.buildSearchIndex();
    this.loadSearchHistory();
  }

  // Budowanie indeksu wyszukiwania dla szybszego wyszukiwania
  private buildSearchIndex(): void {
    this.products.forEach((product, index) => {
      // Indeksowanie nazwy produktu
      this.addToIndex(product.name.toLowerCase(), index);
      
      // Indeksowanie opisu
      this.addToIndex(product.description.toLowerCase(), index);
      this.addToIndex(product.shortDescription.toLowerCase(), index);
      
      // Indeksowanie kategorii
      this.addToIndex(product.category.toLowerCase(), index);
      
      // Indeksowanie specyfikacji
      product.specifications.forEach(spec => {
        this.addToIndex(spec.label.toLowerCase(), index);
        this.addToIndex(spec.value.toLowerCase(), index);
        
        // Budowanie mapy wartości specyfikacji
        if (!this.specificationValues.has(spec.label)) {
          this.specificationValues.set(spec.label, new Set());
        }
        this.specificationValues.get(spec.label)!.add(spec.value);
      });
      
      // Indeksowanie akcesoriów
      product.accessories.forEach(accessory => {
        this.addToIndex(accessory.toLowerCase(), index);
      });
      
      // Indeksowanie pozostałych pól
      this.addToIndex(product.whereToBuy.toLowerCase(), index);
      this.addToIndex(product.availability.toLowerCase(), index);
    });
  }

  private addToIndex(term: string, productIndex: number): void {
    const words = term.split(/\s+/);
    words.forEach(word => {
      if (word.length > 2) { // Ignoruj krótkie słowa
        if (!this.searchIndex.has(word)) {
          this.searchIndex.set(word, new Set());
        }
        this.searchIndex.get(word)!.add(productIndex);
      }
    });
  }

  // Główna funkcja wyszukiwania
  public search(options: Partial<SearchOptions>): SearchResult[] {
    const defaultOptions: SearchOptions = {
      query: '',
      filters: {},
      sortBy: 'relevance',
      sortOrder: 'desc',
      fuzzySearch: true,
      searchInSpecs: true,
      searchInAccessories: true,
      ...options
    };

    // Zapisz wyszukiwanie w historii
    if (defaultOptions.query.trim()) {
      this.addToSearchHistory(defaultOptions.query);
    }

    let results: SearchResult[] = [];

    if (defaultOptions.query.trim()) {
      results = this.performTextSearch(defaultOptions);
    } else {
      // Jeśli brak query, pokaż wszystkie produkty
      results = this.products.map((product, index) => ({
        product,
        relevanceScore: 1,
        matchedFields: [],
        highlightedText: {}
      }));
    }

    // Aplikuj filtry
    results = this.applyFilters(results, defaultOptions.filters);

    // Sortowanie
    results = this.sortResults(results, defaultOptions.sortBy, defaultOptions.sortOrder);

    return results;
  }

  private performTextSearch(options: SearchOptions): SearchResult[] {
    const query = options.query.toLowerCase();
    const searchTerms = query.split(/\s+/).filter(term => term.length > 0);
    const results: SearchResult[] = [];

    this.products.forEach((product, index) => {
      const score = this.calculateRelevanceScore(product, searchTerms, options);
      if (score > 0) {
        const matchedFields = this.getMatchedFields(product, searchTerms, options);
        const highlightedText = this.generateHighlightedText(product, searchTerms, matchedFields);
        
        results.push({
          product,
          relevanceScore: score,
          matchedFields,
          highlightedText
        });
      }
    });

    return results;
  }

  private calculateRelevanceScore(product: Product, searchTerms: string[], options: SearchOptions): number {
    let score = 0;
    const productText = this.getProductSearchText(product, options);

    searchTerms.forEach(term => {
      // Exact match w nazwie - najwyższy priorytet
      if (product.name.toLowerCase().includes(term)) {
        score += 10;
      }

      // Exact match w short description
      if (product.shortDescription.toLowerCase().includes(term)) {
        score += 8;
      }

      // Exact match w kategorii
      if (product.category.toLowerCase().includes(term)) {
        score += 7;
      }

      // Exact match w specyfikacjach
      if (options.searchInSpecs) {
        product.specifications.forEach(spec => {
          if (spec.label.toLowerCase().includes(term) || spec.value.toLowerCase().includes(term)) {
            score += 5;
          }
        });
      }

      // Exact match w opisie
      if (product.description.toLowerCase().includes(term)) {
        score += 3;
      }

      // Exact match w akcesoriach
      if (options.searchInAccessories) {
        product.accessories.forEach(accessory => {
          if (accessory.toLowerCase().includes(term)) {
            score += 2;
          }
        });
      }

      // Fuzzy search - błędy pisowni
      if (options.fuzzySearch) {
        score += this.fuzzyMatchScore(productText, term);
      }
    });

    return score;
  }

  private fuzzyMatchScore(text: string, term: string): number {
    // Prosta implementacja fuzzy search - Levenshtein distance
    const words = text.split(/\s+/);
    let bestScore = 0;

    words.forEach(word => {
      const distance = this.levenshteinDistance(word, term);
      const similarity = 1 - (distance / Math.max(word.length, term.length));
      if (similarity > 0.7) { // 70% podobieństwa
        bestScore = Math.max(bestScore, similarity * 2);
      }
    });

    return bestScore;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    const n = str2.length;
    const m = str1.length;

    if (n === 0) return m;
    if (m === 0) return n;

    for (let i = 0; i <= m; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= n; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1.charAt(i - 1) === str2.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[m][n];
  }

  private getProductSearchText(product: Product, options: SearchOptions): string {
    let text = `${product.name} ${product.description} ${product.shortDescription} ${product.category}`;
    
    if (options.searchInSpecs) {
      const specs = product.specifications.map(s => `${s.label} ${s.value}`).join(' ');
      text += ` ${specs}`;
    }
    
    if (options.searchInAccessories) {
      text += ` ${product.accessories.join(' ')}`;
    }
    
    return text.toLowerCase();
  }

  private getMatchedFields(product: Product, searchTerms: string[], options: SearchOptions): string[] {
    const matched: string[] = [];

    searchTerms.forEach(term => {
      if (product.name.toLowerCase().includes(term)) matched.push('name');
      if (product.shortDescription.toLowerCase().includes(term)) matched.push('shortDescription');
      if (product.description.toLowerCase().includes(term)) matched.push('description');
      if (product.category.toLowerCase().includes(term)) matched.push('category');
      
      if (options.searchInSpecs) {
        product.specifications.forEach(spec => {
          if (spec.label.toLowerCase().includes(term) || spec.value.toLowerCase().includes(term)) {
            matched.push('specifications');
          }
        });
      }
    });

    return [...new Set(matched)]; // Remove duplicates
  }

  private generateHighlightedText(product: Product, searchTerms: string[], matchedFields: string[]): { [field: string]: string } {
    const highlighted: { [field: string]: string } = {};

    matchedFields.forEach(field => {
      let text = '';
      switch (field) {
        case 'name':
          text = product.name;
          break;
        case 'shortDescription':
          text = product.shortDescription;
          break;
        case 'description':
          text = product.description;
          break;
        case 'category':
          text = product.category;
          break;
      }

      // Highlight search terms
      let highlightedText = text;
      searchTerms.forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        highlightedText = highlightedText.replace(regex, '<mark>$1</mark>');
      });

      highlighted[field] = highlightedText;
    });

    return highlighted;
  }

  private applyFilters(results: SearchResult[], filters: Partial<SearchFilters>): SearchResult[] {
    let filtered = results;

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter(result => 
        filters.categories!.includes(result.product.category)
      );
    }

    // Filter by specifications
    if (filters.specifications) {
      Object.entries(filters.specifications).forEach(([specLabel, specValues]) => {
        if (specValues.length > 0) {
          filtered = filtered.filter(result => {
            const productSpec = result.product.specifications.find(s => s.label === specLabel);
            return productSpec && specValues.includes(productSpec.value);
          });
        }
      });
    }

    // Filter by where to buy
    if (filters.whereToBuy && filters.whereToBuy.length > 0) {
      filtered = filtered.filter(result => 
        filters.whereToBuy!.includes(result.product.whereToBuy)
      );
    }

    // Filter by availability
    if (filters.availability && filters.availability.length > 0) {
      filtered = filtered.filter(result => 
        filters.availability!.includes(result.product.availability)
      );
    }

    return filtered;
  }

  private sortResults(results: SearchResult[], sortBy: string, sortOrder: string): SearchResult[] {
    return results.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'relevance':
          comparison = b.relevanceScore - a.relevanceScore;
          break;
        case 'name':
          comparison = a.product.name.localeCompare(b.product.name, 'pl');
          break;
        case 'category':
          comparison = a.product.category.localeCompare(b.product.category, 'pl');
          break;
        default:
          comparison = b.relevanceScore - a.relevanceScore;
      }

      return sortOrder === 'desc' ? comparison : -comparison;
    });
  }

  // Generowanie sugestii wyszukiwania
  public generateSuggestions(query: string, limit: number = 10): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    const queryLower = query.toLowerCase();

    if (queryLower.length < 2) return suggestions;

    // Sugestie produktów
    this.products.forEach(product => {
      if (product.name.toLowerCase().includes(queryLower)) {
        suggestions.push({
          type: 'product',
          text: product.name,
          count: 1,
          query: product.name
        });
      }
    });

    // Sugestie kategorii
    const categories = [...new Set(this.products.map(p => p.category))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(queryLower)) {
        const count = this.products.filter(p => p.category === category).length;
        suggestions.push({
          type: 'category',
          text: category,
          count,
          query: category
        });
      }
    });

    // Sugestie specyfikacji
    this.specificationValues.forEach((values, label) => {
      if (label.toLowerCase().includes(queryLower)) {
        suggestions.push({
          type: 'specification',
          text: label,
          count: values.size,
          query: label
        });
      }
      
      values.forEach(value => {
        if (value.toLowerCase().includes(queryLower)) {
          suggestions.push({
            type: 'specification',
            text: `${label}: ${value}`,
            count: this.products.filter(p => 
              p.specifications.some(s => s.label === label && s.value === value)
            ).length,
            query: value
          });
        }
      });
    });

    // Sortuj po relevantności i ogranicz
    return suggestions
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  // Historia wyszukiwań
  private addToSearchHistory(query: string): void {
    this.searchHistory = this.searchHistory.filter(q => q !== query);
    this.searchHistory.unshift(query);
    this.searchHistory = this.searchHistory.slice(0, 20); // Limit to 20
    this.saveSearchHistory();
  }

  public getSearchHistory(): string[] {
    return this.searchHistory;
  }

  public clearSearchHistory(): void {
    this.searchHistory = [];
    this.saveSearchHistory();
  }

  private saveSearchHistory(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('itdlalasow_search_history', JSON.stringify(this.searchHistory));
    }
  }

  private loadSearchHistory(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('itdlalasow_search_history');
      if (saved) {
        this.searchHistory = JSON.parse(saved);
      }
    }
  }

  // Zapisane wyszukiwania
  public saveSearch(name: string, options: SearchOptions): void {
    this.savedSearches.set(name, options);
    this.saveSavedSearches();
  }

  public getSavedSearches(): Map<string, SearchOptions> {
    return this.savedSearches;
  }

  public deleteSavedSearch(name: string): void {
    this.savedSearches.delete(name);
    this.saveSavedSearches();
  }

  private saveSavedSearches(): void {
    if (typeof window !== 'undefined') {
      const searchesArray = Array.from(this.savedSearches.entries());
      localStorage.setItem('itdlalasow_saved_searches', JSON.stringify(searchesArray));
    }
  }

  private loadSavedSearches(): void {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('itdlalasow_saved_searches');
      if (saved) {
        const searchesArray = JSON.parse(saved);
        this.savedSearches = new Map(searchesArray);
      }
    }
  }

  // Analityka wyszukiwań
  public getSearchAnalytics(): {
    topQueries: { query: string; count: number }[];
    topCategories: { category: string; count: number }[];
    topSpecs: { spec: string; count: number }[];
  } {
    // Prosta implementacja - w rzeczywistej aplikacji byłoby to bardziej zaawansowane
    return {
      topQueries: this.searchHistory.slice(0, 10).map(q => ({ query: q, count: 1 })),
      topCategories: [],
      topSpecs: []
    };
  }

  // Uzyskaj wszystkie dostępne filtry
  public getAvailableFilters(): {
    categories: string[];
    specifications: { [label: string]: string[] };
    whereToBuy: string[];
    availability: string[];
  } {
    const categories = [...new Set(this.products.map(p => p.category))];
    const whereToBuy = [...new Set(this.products.map(p => p.whereToBuy))];
    const availability = [...new Set(this.products.map(p => p.availability))];
    
    const specifications: { [label: string]: string[] } = {};
    this.specificationValues.forEach((values, label) => {
      specifications[label] = Array.from(values);
    });

    return {
      categories: categories.sort(),
      specifications,
      whereToBuy: whereToBuy.sort(),
      availability: availability.sort()
    };
  }
}