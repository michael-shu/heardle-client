// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export',
    images: {
      domains: ['i.scdn.co'],
    },
}

module.exports = nextConfig;
  