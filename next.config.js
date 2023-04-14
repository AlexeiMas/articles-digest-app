/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "res.cloudinary.com", "i.stack.imgur.com", "mui.com"]
  },
  env: {
    API_URL: process.env.API_URL
  }
}

module.exports = nextConfig
