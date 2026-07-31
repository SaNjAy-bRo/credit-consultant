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
        destination: 'http://162.241.27.47/akivuy/:path*',
      },
      {
        source: '/aklvuy/:path*',
        destination: 'http://162.241.27.47/akivuy/:path*',
      },
    ];
  },
};

export default nextConfig;
