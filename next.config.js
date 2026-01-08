/**
 * Minimal Next.js config adapted for Lily Combest site starter.
 * Keep environment variables and CSP updated for your final deploy.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://lilycombest.com'
  }
};

module.exports = nextConfig;
