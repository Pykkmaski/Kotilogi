/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path((?!public|auth).*)',
        destination: '/api/protected/:path*',
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['knex'],
  },
};

module.exports = nextConfig;
