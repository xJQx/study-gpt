/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  },
  basePath: process.env.NODE_ENV === 'production' ? '/study-gpt' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/study-gpt' : ''
};

module.exports = nextConfig;
