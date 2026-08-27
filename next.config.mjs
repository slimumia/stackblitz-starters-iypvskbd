import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development", 
});

export default withSerwist({
  reactStrictMode: true,
  webpack: (config) => {
    config.cache = false;
    return config;
  },
});