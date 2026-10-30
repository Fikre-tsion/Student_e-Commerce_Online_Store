/**
 * ==============================================================================
 * NEXT.JS CONFIGURATION - SHETA (ሽታ) PERFUMES
 * ==============================================================================
 * CodeOps Day 43 Performance & Production Optimization:
 * - images.remotePatterns: Explicitly allow trusted image hosts (Unsplash)
 *   to eliminate unauthorized external asset loads and optimize responsive sizes.
 * - experimental.optimizePackageImports: Tree-shakes @mui/material & @mui/icons-material
 *   at build time, drastically decreasing First Load JS and main thread execution time.
 * - compress: Enables Gzip/Brotli compression for all text and chunk payloads.
 * - reactStrictMode: Enforces React lifecycle best practices.
 * ==============================================================================
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["@mui/material", "@mui/icons-material"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // High-efficiency modern formats
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
