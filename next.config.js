/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    level: 'debug',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
}

module.exports = nextConfig
