import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("@node-rs/argon2", "@node-rs/bcrypt")
    return config;
  }
};

export default nextConfig;
