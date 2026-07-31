/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/aklvuy/:path*',
        destination: 'http://162.241.27.47/aklvuy/:path*',
      },
    ];
  },
};

export default nextConfig;
