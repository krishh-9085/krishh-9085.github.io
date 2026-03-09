import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS || false;
const repoName = "Next-Portfolio";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  ...(isGithubPages && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
