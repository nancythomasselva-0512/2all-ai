import type { NextConfig } from "next";

const nextConfig: any = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/widget-core.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate, max-age=0" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
      {
        source: "/loader.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate, max-age=0" },
          { key: "Pragma", value: "no-cache" },
          { key: "Expires", value: "0" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;
