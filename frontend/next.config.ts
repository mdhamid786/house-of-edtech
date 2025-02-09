import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  env: {
    HOSTNAME: 'localhost',
    APIBASEURL: 'http://localhost:5000',
  }
  /* config options here */
};

export default nextConfig;
