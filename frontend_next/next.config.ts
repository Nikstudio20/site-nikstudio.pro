import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Localhost development
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      // Production domain
      {
        protocol: 'https',
        hostname: 'nikstudio.pro',
        pathname: '/storage/**',
      },
      // IP address fallback (если нужно)
      {
        protocol: 'http',
        hostname: '109.205.58.5',
        port: '8000',
        pathname: '/storage/**',
      },
      // HTTPS для IP (если SSL настроен)
      {
        protocol: 'https',
        hostname: '109.205.58.5',
        pathname: '/storage/**',
      }
    ],
  },
  /* config options here */
};

export default nextConfig;