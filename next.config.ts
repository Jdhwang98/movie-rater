import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    ignoreDuringBuilds: true,
  },
};


module.exports = {
  images: {
    domains: ['image.tmdb.org'], // Add the TMDB image domain
  },
};
export default nextConfig;
