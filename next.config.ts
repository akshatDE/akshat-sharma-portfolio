import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fail the production build on type errors rather than shipping them.
  // (Next 16 removed build-time linting; `npm run lint` runs ESLint directly.)
  typescript: { ignoreBuildErrors: false },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
