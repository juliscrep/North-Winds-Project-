/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      os: false,
      net: false,
      tls: false,
      http: false,
      https: false,
      child_process: false,
    }
    return config
  },
  experimental: {
    esmExternals: 'loose',
  }
}

module.exports = nextConfig
