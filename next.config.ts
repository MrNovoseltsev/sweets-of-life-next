import type { NextConfig } from "next";

const isMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";

const nextConfig: NextConfig = {
  output: isMock ? "export" : undefined,
  reactStrictMode: true,
  images: isMock
    ? { loader: "custom", loaderFile: "./src/shared/lib/imageLoader.ts" }
    : undefined,
  basePath: isMock ? "/sweets-of-life-next" : "",
  trailingSlash: isMock ? true : undefined,
};

export default nextConfig;
