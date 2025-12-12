import type { NextConfig } from "next";

const nextConfig = {
  images: {
    
  remotePatterns: [
    { protocol: "https", hostname: "res.cloudinary.com" },
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "i.pinimg.com" },
  ],


  },

   experimental: {
    serverActions: {
      bodySizeLimit: '100mb', // increase global body size limit
    },
  },
};

export default nextConfig;
