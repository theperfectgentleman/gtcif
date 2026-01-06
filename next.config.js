module.exports = {
  reactStrictMode: true,
  serverExternalPackages: ['sqlite3'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-image-domain.com',
      },
    ],
  },
  env: {
    API_URL: process.env.API_URL, // Example of using environment variables
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};