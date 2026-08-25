/** @type {import('next').NextConfig} */
const nextConfig = {
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
