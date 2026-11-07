import type { NextConfig } from "next";
import { ASSET_QUERY } from "./src/lib/assets";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
    // Images are referenced with a version stamp (src/lib/assets.ts) so updated files are refetched.
    localPatterns: [
      { pathname: "/images/**", search: ASSET_QUERY },
      { pathname: "/images/**", search: "" },
    ],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Not immutable: file names are not content-hashed, and placeholders get replaced in place.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    // Common URL shapes shoppers and old links use; keeps link equity on one canonical URL.
    return [
      // Pages from the earlier multi-product catalogue.
      { source: "/bilona-process", destination: "/how-its-made", permanent: true },
      { source: "/collections/:slug", destination: "/shop", permanent: true },
      { source: "/lab-reports", destination: "/how-its-made", permanent: true },
      { source: "/products/a2-gir-cow-bilona-ghee", destination: "/products/pure-desi-buffalo-ghee", permanent: true },
      { source: "/products/desi-buffalo-bilona-ghee", destination: "/products/pure-desi-buffalo-ghee", permanent: true },
      // Per-size product pages and guides from the team's earlier update.
      { source: "/products/pure-desi-buffalo-ghee-500ml", destination: "/products/pure-desi-buffalo-ghee?pack=500-ml", permanent: true },
      { source: "/products/pure-desi-buffalo-ghee-1l", destination: "/products/pure-desi-buffalo-ghee?pack=1-l", permanent: true },
      { source: "/products/pure-desi-buffalo-ghee-5l", destination: "/products/pure-desi-buffalo-ghee?pack=5-l", permanent: true },
      { source: "/products/:slug(a2-sahiwal-cow-bilona-ghee|haldi-infused-cow-ghee|family-saver-2x1l|ghee-tasting-duo|festive-gift-box)", destination: "/shop", permanent: true },
      { source: "/blog/a2-vs-a1-ghee", destination: "/blog/buffalo-ghee-vs-cow-ghee", permanent: true },
      { source: "/blog/bilona-vs-cream-ghee", destination: "/how-its-made", permanent: true },
      { source: "/shop/:slug", destination: "/products/:slug", permanent: true },
      { source: "/product/:slug", destination: "/products/:slug", permanent: true },
      { source: "/collection/:slug", destination: "/shop", permanent: true },
      { source: "/pages/about-us", destination: "/about", permanent: true },
    ];
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
