import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "timviecits.id.vn",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "timviecits.id.vn",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "devo.vn",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "devo.vn",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
