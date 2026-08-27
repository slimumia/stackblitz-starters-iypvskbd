import withSerwistInit from "@serwist/next";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withSerwist = withSerwistInit({
  // 強制指定為專案根目錄下的 sw.ts，避免系統預設去 src 資料夾找
  swSrc: path.resolve(__dirname, "sw.ts"),
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