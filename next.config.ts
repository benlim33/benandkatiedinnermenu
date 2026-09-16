import type { NextConfig } from "next";

// GitHub Pages serves project sites from a subpath, so assets need the repo prefix.
const repo = "/benandkatiedinnermenu";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repo : "",
  assetPrefix: isProd ? repo : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
