/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
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
