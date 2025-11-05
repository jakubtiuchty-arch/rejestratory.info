"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import Link from "next/link";
import { 
  ChevronRight,
  TreePine,
  Download,
  FileText,
  ShoppingCart,
  Info,
  Cpu,
  Battery,
  CloudRain,
  Camera,
  Wifi,
  Maximize2,
  Phone,
  Mail
} from "lucide-react";

// Import prawdziwych danych produktów
import { 
  getProductBySlug, 
  getCategoryProducts,
  productCategories 
} from "../../../products-data";

interface ProductPageProps {
  params: Promise<{
    category: string;
    produkt: string;
  }>;
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [categoryParam, setCategoryParam] = React.useState<string>('');
  const [productSlug, setProductSlug] = React.useState<string>('');

  // Unwrap params Promise
  React.useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setCategoryParam(resolvedParams.category);
      setProductSlug(resolvedParams.produkt);
    };
    unwrapParams();
  }, [params]);

  // Pobieramy dane produktu i kategorii
  const product = getProductBySlug(productSlug);
  const categoryInfo = productCategories.find(cat => cat.id === categoryParam);
  const relatedProducts = getCategoryProducts(categoryParam).filter(p => p.slug !== productSlug).slice(0, 3);

  // Placeholder images (można zastąpić prawdziwymi URL-ami z Google Drive)
  const images = [
    product?.image_link || "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
    "/api/placeholder/600/600",
  ];

  // Grupowanie specyfikacji w kategorie
 const specificationsList = React.useMemo(() => {
  if (!product?.specification) return [];
  return product.specification.split(',').map(s => s.trim());
}, [product]);

  const downloads = [
    { name: `Karta katalogowa ${product?.name}`, type: "PDF", size: "2.4 MB" },
    { name: "Instrukcja obsługi PL", type: "PDF", size: "8.1 MB" },
    { name: "Specyfikacja techniczna", type: "PDF", size: "1.2 MB" },
    { name: "Certyfikaty zgodności", type: "PDF", size: "0.8 MB" },
  ];

  // Loading state
  if (!categoryParam || !productSlug) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Ładowanie...</div>
        </div>
      </div>
    );
  }

  // Jeśli produkt nie został znaleziony
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Produkt nie został znaleziony
          </h1>
          <p className="text-gray-600 mb-6">
            Produkt "{productSlug}" w kategorii "{categoryParam}" nie istnieje.
          </p>
          <Link href={`/produkty/${categoryParam}`}>
            <Button>Wróć do kategorii</Button>
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
              <li><Link href="/#produkty" className="text-gray-700 hover:text-emerald-600 transition-colors">Produkty</Link></li>
              <li><Link href="/serwis" className="text-gray-700 hover:text-emerald-600 transition-colors">Serwis</Link></li>
              <li><Link href="/kontakt" className="text-gray-700 hover:text-emerald-600 transition-colors">Kontakt</Link></li>
            </ul>
            
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Zapytanie (0)
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
            <Link href="/#produkty" className="text-gray-600 hover:text-emerald-600">Produkty</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href={`/produkty/${categoryParam}`} className="text-gray-600 hover:text-emerald-600">
              {categoryInfo?.name}
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galeria */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  <span className="text-gray-400 text-center px-4">
                    {product.name}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors flex items-center justify-center ${
                      selectedImage === index ? 'border-emerald-600' : 'border-gray-200'
                    }`}
                  >
                    <span className="text-xs text-gray-400 text-center">{index + 1}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Informacje */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 border-emerald-200">
                {product.category}
              </Badge>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>



              <div className="flex gap-4 mb-8">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 flex-1">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Dodaj do zapytania
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="h-5 w-5 mr-2" />
                  Zadzwoń
                </Button>
              </div>



              <Card className="bg-emerald-50 border-emerald-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Kluczowe cechy</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {specificationsList.slice(0, 6).map((spec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0" />
                       <span className="text-sm text-gray-700">
  {spec}
</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs z informacjami */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="description">Opis</TabsTrigger>
              <TabsTrigger value="specs">Specyfikacja</TabsTrigger>
              <TabsTrigger value="downloads">Pliki</TabsTrigger>
              <TabsTrigger value="buy">Gdzie kupić</TabsTrigger>
            </TabsList>

            <TabsContent value="description">
              <Card>
                <CardContent className="p-8 prose prose-emerald max-w-none">
                  <h2>{product.name} - Profesjonalne rozwiązanie dla leśnictwa</h2>
                  <p>{product.description}</p>
                  
                  <h3>Dlaczego {product.name} dla Lasów Państwowych?</h3>
                  <ul>
                    {specificationsList.slice(0, 4).map((spec, index) => (
  <li key={index}>
    {spec}
  </li>
))}
                  </ul>

                 <h3>Akcesoria i dodatki</h3>
{product.accessories ? (
  <p className="text-gray-700">{product.accessories}</p>
) : (
  <p className="text-gray-500">Informacje o akcesoriach dostępne u sprzedawcy.</p>
)}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs">
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Specyfikacja</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {specificationsList.length > 0 ? (
          <ul className="list-disc list-inside space-y-1">
            {specificationsList.map((spec, index) => (
              <li key={index} className="text-gray-700">{spec}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Brak specyfikacji</p>
        )}
      </div>
    </CardContent>
  </Card>
</TabsContent>

            <TabsContent value="downloads">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Pliki do pobrania</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {downloads.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-10 w-10 text-emerald-600" />
                          <div>
                            <h4 className="font-medium text-gray-900">{file.name}</h4>
                            <p className="text-sm text-gray-500">{file.type} • {file.size}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-emerald-600">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="buy">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6">Gdzie można kupić?</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Dostawca</h4>
                      <div className="space-y-3">
                        <p className="text-gray-600">
                          Produkt dostępny u: <strong>{product.where_to_buy}</strong>
                        </p>
                        <p className="text-gray-600">
                          Skontaktuj się z działem handlowym, aby otrzymać ofertę 
                          dostosowaną do potrzeb Twojego nadleśnictwa.
                        </p>
                        <div className="flex items-center gap-2">
                          <Phone className="h-5 w-5 text-emerald-600" />
                          <span className="font-medium">+48 123 456 789</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-5 w-5 text-emerald-600" />
                          <span className="font-medium">sprzedaz@itdlalasow.pl</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Serwis i gwarancja</h4>
                      <p className="text-gray-600 mb-4">
                        {product.service_contract}
                      </p>
                      <Button variant="outline">
                        <Link href="/serwis">
                          Sprawdź serwis
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Oferta dla Lasów Państwowych</h4>
                    <p className="text-gray-600 mb-4">
                      Specjalne warunki cenowe i wydłużone okresy gwarancyjne dla jednostek Lasów Państwowych.
                    </p>
                    <Link href="/kontakt">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        Zapytaj o ofertę specjalną
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Produkty powiązane */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produkty powiązane</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/produkty/${categoryParam}/${relatedProduct.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-center px-4">
                        {relatedProduct.name}
                      </span>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductPage;