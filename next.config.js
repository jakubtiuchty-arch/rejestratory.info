/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // /api/oferta-pdf czyta fonty DejaVu i logo z public/ przez system plików —
    // bez tego wpisu funkcja na Vercelu nie ma ich w bundlu i musi sięgać po URL.
    // pdfkit ładuje standardowe fonty (Helvetica.cjs i spółka) dynamicznie w runtime,
    // więc tracing Next ich nie widzi i funkcja na Vercelu wywala się na
    // „Cannot find module … /pdfkit/js/standard-fonts/Helvetica.cjs”. Kopii pdfkit
    // jest kilka (@react-pdf/renderer, @react-pdf/font, top-level), stąd glob.
    outputFileTracingIncludes: {
      '/api/oferta-pdf': [
        './public/fonts/DejaVuSans.ttf',
        './public/fonts/DejaVuSans-Bold.ttf',
        './public/takma_logo_footer.png',
        './node_modules/pdfkit/js/**',
        './node_modules/@react-pdf/*/node_modules/pdfkit/js/**',
        './node_modules/**/fontkit/**',
      ],
    },
  },
  async headers() {
    return [
      {
        // Strona tylko dla jednego klienta — noindex na wszystkim,
        // łącznie z plikami statycznymi i obrazami.
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // Serwery wypadły z oferty (25.08.2026), ale trzy wysłane newslettery
      // niosą kafelek „Serwery i All-in-One" prosto do skrzynek nadleśnictw.
      // Te linki żyją dalej, więc zamiast 404 prowadzą tam, gdzie została
      // druga połowa obietnicy — do komputerów All in One.
      { source: '/kategoria/serwery', destination: '/kategoria/all-in-one', permanent: true },
      { source: '/produkt/dell-poweredge-:model', destination: '/kategoria/all-in-one', permanent: true },
      { source: '/produkty/serwery', destination: '/kategoria/all-in-one', permanent: true },
    ]
  },
}

module.exports = nextConfig
