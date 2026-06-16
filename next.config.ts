import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/opcao-03",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
