/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {}
  },
  output: 'standalone'
}

module.exports = nextConfig 