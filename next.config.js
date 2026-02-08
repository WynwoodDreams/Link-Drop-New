/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'opengraph.githubassets.com' },
      { hostname: 'img.youtube.com' },
    ],
  },
}

module.exports = nextConfig
