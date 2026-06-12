import type { MetadataRoute } from 'next'

// Strona przeznaczona wyłącznie dla jednego klienta — blokada wszystkich
// robotów wyszukiwarek i crawlerów AI. Deindeksację wymusza dodatkowo
// meta robots (layout.tsx) i nagłówek X-Robots-Tag (next.config.js).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
  }
}
