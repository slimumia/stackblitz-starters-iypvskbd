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
      // 🟢 戰術調整：捨棄正則表達式，改用精確的 URL 屬性解析函數，確保 100% 攔截跨網域地圖
      matcher: ({ url }) => url.hostname.includes("openstreetmap.org"),
      handler: "StaleWhileRevalidate" as any,
      options: {
        cacheName: "osm-map-tiles",
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