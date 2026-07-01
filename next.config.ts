import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next 16 does not run ESLint during `next build`, so no eslint config is
  // needed here. Type safety is enforced by the build's TypeScript pass.
};

export default nextConfig;
