/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },

  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/properties',
        permanent: true,
      },
    ];
  },
  serverExternalPackages: ['knex'],
};

module.exports = nextConfig;
