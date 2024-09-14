/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/properties',
        permanent: true,
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['knex'],
  },
};

module.exports = nextConfig;
