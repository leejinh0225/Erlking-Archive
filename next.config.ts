import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repository = 'Erlking-Archive';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  assetPrefix: isGitHubPages ? `/${repository}/` : undefined,
};

export default nextConfig;
