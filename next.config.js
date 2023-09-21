/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    // logging: 'verbose',
  },
  images: {
    domains: ['mangadex.org'],
  },
};

module.exports = nextConfig;
