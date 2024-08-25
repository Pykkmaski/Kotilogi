/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/newDashboard/:path*',
        destination: '/dashboard/:path*',
        permanent: true,
      },
    ];
  },
  /*
  async rewrites() {
    return [
      {
        source: '/api/:path((?!public|auth).*)',
        destination: '/api/protected/:path*',
      },
    ];
  },
  */
  experimental: {
    serverComponentsExternalPackages: ['knex'],
  },
};

module.exports = nextConfig;
