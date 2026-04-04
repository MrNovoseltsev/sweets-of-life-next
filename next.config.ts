import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/catalog", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
