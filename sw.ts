// @ts-nocheck
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
      matcher: /^https:\/\/.*\.tile\.openstreetmap\.org\/.*/i,
      handler: "StaleWhileRevalidate" as any,
      options: {
        cacheName: "osm-map-tiles",
        expiration: {
          maxEntries: 2000, // 紐西蘭南島圖塊數量龐大，保留高上限
          maxAgeSeconds: 60 * 60 * 24 * 30, // 快取 30 天
        },
        // 🟢 關鍵修復：明確允許狀態碼 0 (跨網域不透明響應) 與 200 的資源寫入快取
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();