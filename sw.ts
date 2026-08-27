/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import { type PrecacheEntry, Serwist, type RuntimeCaching } from "serwist";

declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

// 宣告嚴格型別陣列，防止 TypeScript 將 handler 誤判為普通 string
const runtimeCachingConfig: RuntimeCaching[] = [
  {
    matcher: /^https:\/\/.*\.tile\.openstreetmap\.org\/.*/i,
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "osm-map-tiles",
      expiration: {
        maxEntries: 2000,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
    },
  },
  ...defaultCache,
];

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: runtimeCachingConfig,
});

serwist.addEventListeners();