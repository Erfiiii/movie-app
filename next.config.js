/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['tmdb.org', 'image.tmdb.org', 'themoviedb.org'],
  },
}

module.exports = nextConfig
