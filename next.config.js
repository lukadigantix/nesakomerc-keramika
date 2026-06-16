/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  cacheComponents: true,
  experimental: {
    serverMinification: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.nesakomerckeramika.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
