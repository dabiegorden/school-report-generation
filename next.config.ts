import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Heavy Node-only deps used inside route handlers / server actions; keep
  // them external to the bundler.
  serverExternalPackages: ["@react-pdf/renderer", "cloudinary"],
  experimental: {
    serverActions: {
      // Logo uploads are capped at 5MB in the action; leave multipart overhead.
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
