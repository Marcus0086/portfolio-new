import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — exports to ./out, deployable on any static host.
  output: "export",
};

export default nextConfig;
