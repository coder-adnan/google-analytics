import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: process.env.MY_SECRET,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
  git: {
    "deploymentEnables": {
      "main": true,
      "master": true,
      "feature/*": true,
    }
  },
  "buildCommand": "sh vercel.sh",
  "env": {
    "NEXT_PUBLIC_ENV": "$NEXT_PUBLIC_ENV"
  }
};

export default nextConfig;

// added just to trigger the build