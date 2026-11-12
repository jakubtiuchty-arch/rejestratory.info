/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
    // /api/oferta-pdf czyta fonty DejaVu i logo z public/ przez system plików —
    // bez tego wpisu funkcja na Vercelu nie ma ich w bundlu i musi sięgać po URL.
    // pdfkit ładuje standardowe fonty (Helvetica.cjs i spółka) dynamicznie w runtime,
    // więc tracing Next ich nie widzi i funkcja na Vercelu wywala się na
    // „Cannot find module … /pdfkit/js/standard-fonts/Helvetica.cjs”. Kopii pdfkit
    // jest kilka (@react-pdf/renderer, @react-pdf/font, top-level), stąd glob.
    outputFileTracingIncludes: {
      '/api/pospay-studio/contracts{,/**}': [
        './tools/contracts-scanner/pdf-worker.cjs',
        './node_modules/pdf-lib/**', './node_modules/@pdf-lib/**',
        './node_modules/pako/**', './node_modules/tslib/**',
      ],
      '/api/oferta-pdf': [
        './public/fonts/DejaVuSans.ttf',
        './public/fonts/DejaVuSans-Bold.ttf',
        './public/takma_logo_footer.png',
        './node_modules/pdfkit/js/**',
        './node_modules/@react-pdf/*/node_modules/pdfkit/js/**',
        './node_modules/**/fontkit/**',
      ],
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
      // ZUP Łódź sprzedaje od 23.09.2026 następców (decyzja Jakuba z 12.11.2026, karty przerobione
      // na nowe modele). Stare adresy krążą w newsletterach i panelu klienta, więc prowadzą do następców.
      { source: '/produkt/samsung-a36', destination: '/produkt/samsung-a37', permanent: true },
      { source: '/produkt/samsung-a56', destination: '/produkt/samsung-a57', permanent: true },
      { source: '/produkt/dell-pro-24-plus-p2425he', destination: '/produkt/dell-pro-p-24-p2426h', permanent: true },
      { source: '/produkt/dell-pro-24-plus-p2425he-usbc', destination: '/produkt/dell-pro-p-24-p2426he', permanent: true },
      // formularze zamówienia pod starymi nazwami (wdrożone 12.11.2026, mogły trafić do maili)
      { source: '/formularze/zup-lodz/rejestratory/zup-lodz-samsung-a36.pdf', destination: '/formularze/zup-lodz/rejestratory/zup-lodz-samsung-a37.pdf', permanent: true },
      { source: '/formularze/zup-lodz/rejestratory/zup-lodz-samsung-a56.pdf', destination: '/formularze/zup-lodz/rejestratory/zup-lodz-samsung-a57.pdf', permanent: true },
      { source: '/formularze/zup-lodz/monitory/zup-lodz-dell-pro-24-plus-p2425he.pdf', destination: '/formularze/zup-lodz/monitory/zup-lodz-dell-pro-p-24-p2426h.pdf', permanent: true },
      { source: '/formularze/zup-lodz/monitory/zup-lodz-dell-pro-24-plus-p2425he-usbc.pdf', destination: '/formularze/zup-lodz/monitory/zup-lodz-dell-pro-p-24-p2426he.pdf', permanent: true },
    ]
  },
}

module.exports = nextConfig
