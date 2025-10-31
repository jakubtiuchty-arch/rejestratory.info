"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { 
  Filter,
  Grid3x3,
  List,
  ChevronRight,
  ShieldCheck,
  Truck,
  Package,
  TreePine
} from "lucide-react";

// Import prawdziwych danych produktów
import { 
  getCategoryProducts, 
  productCategories,
  Product 
} from "../../products-data";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [categoryParam, setCategoryParam] = React.useState<string>('');

  // Unwrap params Promise
  React.useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setCategoryParam(resolvedParams.category);
    };
    unwrapParams();
  }, [params]);

  // Pobieramy dane kategorii i produkty
  const categoryInfo = productCategories.find(cat => cat.id === categoryParam);
  const categoryProducts = getCategoryProducts(categoryParam);

  // Inicjalizacja produktów
  React.useEffect(() => {
    setFilteredProducts(categoryProducts);
  }, [categoryProducts]);

  // Loading state
  if (!categoryParam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Ładowanie...</div>
        </div>
      </div>
    );
  }

  // Jeśli kategoria nie istnieje
  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Kategoria nie została znaleziona
          </h1>
          <Link href="/">
            <Button>Wróć do strony głównej</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <TreePine className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-gray-900">IT dla Lasów</span>
            </div>
            
            <ul className="hidden md:flex items-center gap-8">
              <li><Link href="/" className="text-gray-700 hover:text-emerald-600 transition-colors">Strona główna</Link></li>
              <li><a href="/#produkty" className="text-emerald-600">Produkty</a></li>
              <li><Link href="/serwis" className="text-gray-700 hover:text-emerald-600 transition-colors">Serwis</Link></li>
              <li><Link href="/kontakt" className="text-gray-700 hover:text-emerald-600 transition-colors">Kontakt</Link></li>
            </ul>
            
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Zapytaj o ofertę
            </Button>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-emerald-600">Strona główna</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600 hover:text-emerald-600">Produkty</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{categoryInfo.name}</span>
          </nav>
        </div>
      </div>

      {/* Header kategorii */}
      <section className="py-8 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{categoryInfo.name}</h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {categoryParam === 'rejestratory' && "Wzmocnione urządzenia mobilne zaprojektowane do pracy w trudnych warunkach terenowych. Idealne rozwiązanie dla pracowników Lasów Państwowych."}
              {categoryParam === 'telefony' && "Nowoczesne smartfony dostosowane do potrzeb służb leśnych z długim czasem pracy i odpornością na trudne warunki."}
              {categoryParam === 'laptopy' && "Biznesowe laptopy wysokiej wydajności dla biura i pracy mobilnej w nadleśnictwach."}
              {categoryParam === 'drukarki-laserowe' && "Profesjonalne drukarki laserowe do intensywnej pracy biurowej w nadleśnictwach."}
              {categoryParam === 'monitory' && "Wysokiej jakości monitory dla stanowisk pracy w biurach nadleśnictw."}
              {categoryParam === 'serwery' && "Niezawodne serwery dla infrastruktury IT nadleśnictw i regionalnych dyrekcji."}
              {categoryParam === 'ezd' && "Systemy elektronicznego zarządzania dokumentacją zgodne z wymaganiami administracji publicznej."}
              {!['rejestratory', 'telefony', 'laptopy', 'drukarki-laserowe', 'monitory', 'serwery', 'ezd'].includes(categoryParam) && "Profesjonalne rozwiązania technologiczne dedykowane dla służb leśnych."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Toolbar z filtrami */}
      <section className="py-4 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtry
              </Button>
              
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sortowanie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Polecane</SelectItem>
                  <SelectItem value="price-asc">Cena: rosnąco</SelectItem>
                  <SelectItem value="price-desc">Cena: malejąco</SelectItem>
                  <SelectItem value="name">Nazwa A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Znaleziono: {filteredProducts.length} produktów</span>
              <div className="flex gap-1 ml-4">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista produktów */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Brak produktów w tej kategorii
              </h3>
              <p className="text-gray-600 mb-6">
                Produkty z kategorii "{categoryInfo.name}" będą wkrótce dostępne
              </p>
              <Link href="/">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  Wróć do strony głównej
                </Button>
              </Link>
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {viewMode === 'grid' ? (
                    <Link href={`/produkty/${categoryParam}/${product.slug}`}>
                      <Card className="h-full hover:shadow-xl transition-shadow group cursor-pointer">
                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-400 text-center px-4">
                              {product.name}
                            </span>
                          </div>
                          <Badge className="absolute top-4 right-4 bg-emerald-600 text-white">
                            {product.category}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm text-emerald-600 mb-1">{product.category}</p>
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.shortDescription}</p>
                          
                          {/* Cechy */}
                          <div className="space-y-1 mb-4">
                            {product.specification ? (
  product.specification.split(',').slice(0, 3).map((spec, i) => (
    <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
      <div className="w-1 h-1 bg-gray-400 rounded-full" />
      {spec.trim()}
    </div>
  ))
) : null}
                          </div>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span className="text-xl font-bold text-gray-900">Cena na zapytanie</span>
                            </div>
                            <Badge variant="secondary" className="text-emerald-600 bg-emerald-50">
  Dostępny
</Badge>
                          </div>
                          
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                            Zobacz szczegóły
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ) : (
                    <Link href={`/produkty/${categoryParam}/${product.slug}`}>
                      <Card className="hover:shadow-lg transition-shadow group cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex gap-6">
                            <div className="w-48 h-48 flex-shrink-0 bg-gray-100 relative overflow-hidden rounded-lg">
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-400 text-center px-4">
                                  {product.name}
                                </span>
                              </div>
                              <Badge className="absolute top-2 right-2 bg-emerald-600 text-white">
                                {product.category}
                              </Badge>
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <p className="text-sm text-emerald-600 mb-1">{product.category}</p>
                                  <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                                    {product.name}
                                  </h3>
                                  <p className="text-gray-600 mb-4">{product.description}</p>
                                </div>
                                
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-gray-900">Cena na zapytanie</div>
                                </div>
                              </div>
                              
                              {/* Cechy */}
                              <div className="grid grid-cols-2 gap-3 mb-6">
                            {product.specification ? (
  product.specification.split(',').slice(0, 4).map((spec, i) => (
    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
      <ShieldCheck className="h-4 w-4 text-emerald-600" />
      {spec.trim()}
    </div>
  ))
) : null}
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <Button className="bg-emerald-600 hover:bg-emerald-700">
                                  Zobacz szczegóły
                                </Button>
                                <Button variant="outline">
                                  Dodaj do porównania
                                </Button>
                                
                                <div className="ml-auto flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
  <Package className="h-4 w-4 text-emerald-600" />
  Dostępny
</div>
                                  <div className="flex items-center gap-1">
                                    <Truck className="h-4 w-4 text-emerald-600" />
                                    {product.whereToBuy}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Nie znalazłeś odpowiedniego modelu?</h2>
          <p className="text-lg mb-6 text-emerald-100">
            Skontaktuj się z nami - dobierzemy rozwiązanie idealne dla Twoich potrzeb
          </p>
          <Link href="/kontakt">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100">
              Zapytaj o inne modele
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default CategoryPage;