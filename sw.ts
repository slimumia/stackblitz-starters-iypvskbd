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
      matcher: ({ url }) => url.hostname.includes("openstreetmap.org"),
      // 🟢 戰術調整：改用 CacheFirst，斷網時絕對不發起網路請求，直接讀取快取
      handler: "CacheFirst" as any,
      options: {
        // 🟢 強制更名：加上 -v2 強迫 Safari 建立全新快取空間
        cacheName: "osm-map-tiles-v2",
        expiration: {
          maxEntries: 2000,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 快取保留 30 天
        },
        cacheableResponse: {
          statuses: [0, 200], // 允許快取跨網域的 Opaque 響應
        },
      },
    },
    ...defaultCache,
  ],
});

// 植入除錯日誌
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  if (url.includes('openstreetmap.org')) {
    console.log('[SW Debug] 攔截到地圖請求 ➔', url);
  }
});

serwist.addEventListeners();