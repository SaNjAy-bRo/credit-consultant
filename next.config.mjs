/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/akivuy/:path*',
        destination: 'https://162.241.27.47/akivuy/:path*',
      },
      {
        source: '/aklvuy/:path*',
        destination: 'https://162.241.27.47/aklvuy/:path*',
      },
    ];
  },
};

export default nextConfig;
