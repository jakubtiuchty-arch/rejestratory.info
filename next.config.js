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
}

module.exports = nextConfig
