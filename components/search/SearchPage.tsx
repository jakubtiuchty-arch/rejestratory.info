"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Filter,
  Grid,
  List,
  BarChart,
  Download,
  Share2,
  BookmarkPlus,
  SlidersHorizontal
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

// Import komponentów wyszukiwania
import AdvancedSearch from './AdvancedSearch';
import { AdvancedProductSearch, SearchResult } from '../../lib/advanced-search-engine';
import { productsByCategory } from '../../lib/products-data';

interface SearchPageProps {
  className?: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ className = '' }) => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const showAdvanced = searchParams.get('advanced') === 'true';

  const [results, setResults] = useState<SearchResult[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [compareList, setCompareList] = useState<SearchResult[]>([]);
  const [searchAnalytics, setSearchAnalytics] = useState({
    totalSearches: 0,
    averageResults: 0,
    topCategories: [] as { name: string; count: number }[],
    searchTime: 0
  });

  // Initialize search engine
  const [searchEngine] = useState(() => new AdvancedProductSearch(productsByCategory));

  useEffect(() => {
    // Load search analytics
    const analytics = searchEngine.getSearchAnalytics();
    setSearchAnalytics({
      totalSearches: analytics.topQueries.length,
      averageResults: results.length,
      topCategories: analytics.topCategories,
      searchTime: Date.now()
    });
  }, [results, searchEngine]);

  const handleResultsChange = (newResults: SearchResult[]) => {
    setResults(newResults);
  };

  const addToCompare = (result: SearchResult) => {
    if (compareList.length < 3 && !compareList.find(item => item.product.id === result.product.id)) {
      setCompareList([...compareList, result]);
    }
  };

  const removeFromCompare = (productId: number) => {
    setCompareList(compareList.filter(item => item.product.id !== productId));
  };

  const exportResults = (format: 'csv' | 'json' | 'pdf') => {
    const data = results.map(r => ({
      name: r.product.name,
      category: r.product.category,
      description: r.product.shortDescription,
      price: r.product.price,
      availability: r.product.availability,
      whereToBuy: r.product.whereToBuy,
      relevanceScore: r.relevanceScore
    }));

    switch (format) {
      case 'csv':
        const csv = [
          Object.keys(data[0] || {}).join(','),
          ...data.map(row => Object.values(row).map(val => `"${val}"`).join(','))
        ].join('\n');
        
        const csvBlob = new Blob([csv], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);
        const csvLink = document.createElement('a');
        csvLink.href = csvUrl;
        csvLink.download = `search-results-${new Date().toISOString().split('T')[0]}.csv`;
        csvLink.click();
        break;

      case 'json':
        const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        const jsonLink = document.createElement('a');
        jsonLink.href = jsonUrl;
        jsonLink.download = `search-results-${new Date().toISOString().split('T')[0]}.json`;
        jsonLink.click();
        break;

      case 'pdf':
        // Simplified PDF generation - in real app would use proper PDF library
        window.print();
        break;
    }
  };

  const shareResults = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Wyniki wyszukiwania - IT dla Lasów',
          text: `Znaleziono ${results.length} produktów`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification here
    }
  };

  const TopCategories = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Popularne kategorie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(productsByCategory).map(([categoryId, products]) => (
            <div key={categoryId} className="flex items-center justify-between">
              <span className="text-sm capitalize">{categoryId.replace('-', ' ')}</span>
              <Badge variant="outline">{products.length}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const SearchAnalytics = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5" />
          Statystyki wyszukiwania
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">{results.length}</div>
            <div className="text-sm text-muted-foreground">Znalezione produkty</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {Math.round(results.reduce((sum, r) => sum + r.relevanceScore, 0) / results.length || 0)}%
            </div>
            <div className="text-sm text-muted-foreground">Średnia trafność</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ComparePanel = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          Porównaj produkty
          {compareList.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {compareList.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle>Porównanie produktów</SheetTitle>
          <SheetDescription>
            Porównaj do 3 produktów jednocześnie
          </SheetDescription>
        </SheetHeader>
        
        {compareList.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Dodaj produkty do porównania</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {compareList.map((item, index) => (
              <Card key={item.product.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.product.category}</p>
                      <p className="text-sm mt-2">{item.product.price}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCompare(item.product.id)}
                    >
                      Usuń
                    </Button>
                  </div>
                  
                  {/* Key specifications comparison */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    {item.product.specifications.slice(0, 4).map((spec, specIndex) => (
                      <div key={specIndex}>
                        <span className="font-medium">{spec.label}:</span> {spec.value}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {compareList.length > 1 && (
              <div className="pt-4 border-t">
                <Button className="w-full">
                  Zobacz szczegółowe porównanie
                </Button>
              </div>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );

  const ResultsGrid = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((result, index) => (
        <motion.div
          key={result.product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
                <img
                  src={result.product.imageUrl}
                  alt={result.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder-product.jpg';
                  }}
                />
              </div>
              
              <h3 className="font-medium text-sm mb-1 line-clamp-2">
                {result.product.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                {result.product.category}
              </p>
              <p className="text-sm font-semibold text-emerald-600 mb-2">
                {result.product.price}
              </p>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {Math.round(result.relevanceScore * 10) / 10}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addToCompare(result)}
                  disabled={compareList.length >= 3 || compareList.some(item => item.product.id === result.product.id)}
                >
                  <BookmarkPlus className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const ResultsList = () => (
    <div className="space-y-4">
      {results.map((result, index) => (
        <motion.div
          key={result.product.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-4">
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
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {result.product.name}
                      </h3>
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
                  
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {result.product.shortDescription}
                  </p>
                  
                  {/* Key specifications */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {result.product.specifications.slice(0, 3).map((spec, specIndex) => (
                      <Badge key={specIndex} variant="outline" className="text-xs">
                        {spec.label}: {spec.value}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Trafność: {Math.round(result.relevanceScore * 10) / 10}
                      </Badge>
                      {result.matchedFields.map(field => (
                        <Badge key={field} variant="outline" className="text-xs">
                          {field === 'name' ? 'nazwa' : 
                           field === 'description' ? 'opis' :
                           field === 'specifications' ? 'spec' :
                           field === 'category' ? 'kategoria' : field}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addToCompare(result)}
                        disabled={compareList.length >= 3 || compareList.some(item => item.product.id === result.product.id)}
                      >
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Szczegóły
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Wyszukiwanie produktów
        </h1>
        
        {/* Search component */}
        <div className="mb-6">
          <AdvancedSearch
            onResultsChange={handleResultsChange}
            defaultQuery={initialQuery}
          />
        </div>
        
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              Lista
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Siatka
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtry
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <ComparePanel />
            
            <Button
              variant="outline"
              size="sm"
              onClick={shareResults}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Udostępnij
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportResults('csv')}
            >
              <Download className="h-4 w-4 mr-2" />
              Eksportuj
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        {showFilters && (
          <div className="lg:col-span-1 space-y-6">
            <TopCategories />
            <SearchAnalytics />
          </div>
        )}
        
        {/* Results */}
        <div className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
          {results.length > 0 ? (
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')}>
              <TabsContent value="list">
                <ResultsList />
              </TabsContent>
              <TabsContent value="grid">
                <ResultsGrid />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Rozpocznij wyszukiwanie
              </h3>
              <p className="text-gray-600">
                Wprowadź nazwę produktu, kategorię lub specyfikację w pole wyszukiwania powyżej
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;