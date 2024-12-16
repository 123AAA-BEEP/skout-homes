/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'assets.vercel.com',
      'lh3.googleusercontent.com', // For Google OAuth profile pictures
      'avatars.githubusercontent.com' // For GitHub OAuth profile pictures
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Improved security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin'
        }
      ]
    }
  ],
  // Improved build optimization
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false
}

module.exports = nextConfig 