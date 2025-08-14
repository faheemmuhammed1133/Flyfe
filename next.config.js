/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  // Exclude backend and problematic directories from build traces
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'backend/**/*',
        '**/node_modules/@swc/core-linux-x64-gnu/**/*',
        '**/node_modules/@swc/core-linux-x64-musl/**/*',
        '**/node_modules/@swc/core-darwin-x64/**/*',
        '**/node_modules/@swc/core-win32-x64-msvc/**/*',
      ],
    },
  },
}

module.exports = nextConfig
