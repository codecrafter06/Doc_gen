import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use Node.js runtime for API routes that need Buffer, fs, etc.
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
