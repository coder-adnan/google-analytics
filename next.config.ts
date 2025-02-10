import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
  },
  // Enable environment-specific settings
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: process.env.MY_SECRET,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
};

export default nextConfig;
