import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Demo photography only. Replace with the client's own CDN before launch.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      // Babolat's India store CDN — real product photography for the demo.
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
