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
  serverExternalPackages: ['knex'],
};

module.exports = nextConfig;
