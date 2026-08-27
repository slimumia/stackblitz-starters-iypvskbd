/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import { type PrecacheEntry, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    {
      // 擷取所有 OpenStreetMap 圖塊請求
      matcher: /^https:\/\/.*\.tile\.openstreetmap\.org\/.*/i,
      // 🟢 戰術調整：改用 StaleWhileRevalidate，完美相容跨網域圖資與 Opaque 響應
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "osm-map-tiles",
        expiration: {
          maxEntries: 2000,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 確保圖資在無網路環境下保留 30 天
        },
      },
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();