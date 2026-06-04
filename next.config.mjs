/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/discovery-bc',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
