/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/newDashboard',
        permanent: true,
      },
    ];
  },
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
