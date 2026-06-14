import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nesakomerckeramika.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
