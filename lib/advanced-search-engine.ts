// Zaawansowany silnik wyszukiwania dla produktów IT dla Lasów
import { Product, ProductsByCategory } from '../products-data';

export interface SearchFilters {
  categories: string[];
  whereToBuy: string[];
}

export interface SearchOptions {
  query: string;
  filters: Partial<SearchFilters>;
  sortBy: 'relevance' | 'name' | 'category';
  sortOrder: 'asc' | 'desc';
  fuzzySearch: boolean;
}

export interface SearchResult {
  product: Product;
  relevanceScore: number;
  matchedFields: string[];
  highlightedText: { [field: string]: string };
}

export interface SearchSuggestion {
  type: 'product' | 'category';
  text: string;
  count: number;
  query: string;
}

export class AdvancedProductSearch {
  private products: Product[] = [];
  private searchIndex: Map<string, Set<number>> = new Map();
  private searchHistory: string[] = [];

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
      
      // Indeksowanie kategorii
      this.addToIndex(product.category.toLowerCase(), index);
      
      // Indeksowanie specyfikacji (jeśli istnieje)
      if (product.specification) {
        this.addToIndex(product.specification.toLowerCase(), index);
      }
      
      // Indeksowanie akcesoriów (jeśli istnieją)
      if (product.accessories) {
        this.addToIndex(product.accessories.toLowerCase(), index);
      }
      
      // Indeksowanie pozostałych pól
      if (product.where_to_buy) {
        this.addToIndex(product.where_to_buy.toLowerCase(), index);
      }
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
      const score = this.calculateRelevanceScore(product, searchTerms);
      if (score > 0) {
        const matchedFields = this.getMatchedFields(product, searchTerms);
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

  private calculateRelevanceScore(product: Product, searchTerms: string[]): number {
    let score = 0;

    searchTerms.forEach(term => {
      // Exact match w nazwie - najwyższy priorytet
      if (product.name.toLowerCase().includes(term)) {
        score += 10;
      }

      // Exact match w kategorii
      if (product.category.toLowerCase().includes(term)) {
        score += 7;
      }

      // Exact match w specyfikacjach
      if (product.specification && product.specification.toLowerCase().includes(term)) {
        score += 5;
      }

      // Exact match w opisie
      if (product.description.toLowerCase().includes(term)) {
        score += 3;
      }

      // Exact match w akcesoriach
      if (product.accessories && product.accessories.toLowerCase().includes(term)) {
        score += 2;
      }
    });

    return score;
  }

  private getMatchedFields(product: Product, searchTerms: string[]): string[] {
    const matched: string[] = [];

    searchTerms.forEach(term => {
      if (product.name.toLowerCase().includes(term)) {
        matched.push('name');
      }
      if (product.description.toLowerCase().includes(term)) {
        matched.push('description');
      }
      if (product.category.toLowerCase().includes(term)) {
        matched.push('category');
      }
      if (product.specification && product.specification.toLowerCase().includes(term)) {
        matched.push('specification');
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
        case 'description':
          text = product.description;
          break;
        case 'category':
          text = product.category;
          break;
        case 'specification':
          text = product.specification || '';
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

    // Filter by where to buy
    if (filters.whereToBuy && filters.whereToBuy.length > 0) {
      filtered = filtered.filter(result => 
        result.product.where_to_buy && filters.whereToBuy!.includes(result.product.where_to_buy)
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

  // Uzyskaj wszystkie dostępne filtry
  public getAvailableFilters(): {
    categories: string[];
    whereToBuy: string[];
  } {
    const categories = [...new Set(this.products.map(p => p.category))];
    const whereToBuy = [...new Set(this.products.map(p => p.where_to_buy).filter(Boolean))];

    return {
      categories: categories.sort(),
      whereToBuy: whereToBuy.sort()
    };
  }
}