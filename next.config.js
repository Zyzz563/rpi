/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  experimental: {
    turbo: {}
  },
  eslint: {
    // Отключаем ESLint во время сборки
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Игнорируем ошибки TS во время сборки
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 