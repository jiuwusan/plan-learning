/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/apiv1/:path*',
        destination: 'http://localhost:8090/:path*',
      },
    ]
  },
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  webpack: (config, options) => {
    options
    return config
  }
}

module.exports = nextConfig
