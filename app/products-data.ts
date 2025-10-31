// Prosty plik products-data.ts do pracy nad layoutem
export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  category_slug: string;
  slug?: string;
  shortDescription?: string;
  specification?: string;
  where_to_buy?: string;
  image_link?: string;
  accessories?: string;
  service_contract?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export const productsByCategory: { [key: string]: Product[] } = {
  "rejestrator": [
    { 
      id: 1, 
      name: "Zebra EM45", 
      description: "Terminal terenowy", 
      category: "Rejestrator",
      category_slug: "rejestrator",
      slug: "zebra-em45",
      specification: "Android 14, 6GB RAM",
      where_to_buy: "ZUP Łódź",
      image_link: "/images/zebra-em45.jpg",
      accessories: "Ładowarka, etui",
      service_contract: "3 lata"
    },
    { 
      id: 2, 
      name: "Zebra TC27", 
      description: "Terminal mobilny", 
      category: "Rejestrator",
      category_slug: "rejestrator",
      slug: "zebra-tc27",
      specification: "Android 14, 4GB RAM",
      where_to_buy: "ZUP Łódź"
    }
  ],
  "monitory": [
    { 
      id: 3, 
      name: "Monitor Dell", 
      description: "Monitor LCD 24\"", 
      category: "Monitory",
      category_slug: "monitory",
      slug: "monitor-dell",
      specification: "24\" Full HD",
      where_to_buy: "ZUP Warszawa"
    }
  ],
  "drukarki-do-rejestratora": [
    { 
      id: 4, 
      name: "Drukarka Zebra", 
      description: "Drukarka etykiet", 
      category: "Drukarki do rejestratora",
      category_slug: "drukarki-do-rejestratora",
      slug: "drukarka-zebra",
      specification: "Termiczna, 203 dpi",
      where_to_buy: "ZUP Kraków"
    }
  ]
};

// Eksport kategorii jako stała
export const productCategories = [
  { id: "rejestrator", name: "Rejestrator", slug: "rejestrator", count: 2 },
  { id: "monitory", name: "Monitory", slug: "monitory", count: 1 },
  { id: "drukarki-do-rejestratora", name: "Drukarki do rejestratora", slug: "drukarki-do-rejestratora", count: 1 }
];

export function getFeaturedProducts(): Product[] {
  return [
    productsByCategory["rejestrator"][0],
    productsByCategory["monitory"][0],
    productsByCategory["drukarki-do-rejestratora"][0]
  ];
}

export function getTotalProductCount(): number {
  return Object.values(productsByCategory).flat().length;
}

export function getProductCategories(): Category[] {
  return productCategories;
}

export function getMainCategories(): Category[] {
  return getProductCategories().slice(0, 3);
}

export function getAdditionalCategories(): Category[] {
  return getProductCategories().slice(3);
}

export function getCategoryProducts(categorySlug: string): Product[] {
  return productsByCategory[categorySlug] || [];
}

export function getProductBySlug(slug: string): Product | undefined {
  const allProducts = Object.values(productsByCategory).flat();
  return allProducts.find(product => product.slug === slug);
}

export function searchProducts(query: string, category?: string): Product[] {
  const allProducts = Object.values(productsByCategory).flat();
  if (!query) return allProducts.slice(0, 10);
  
  return allProducts.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 10);
}

// Type export
export type ProductsByCategory = typeof productsByCategory;