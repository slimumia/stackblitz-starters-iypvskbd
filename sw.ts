import { defaultCache } from '@serwist/next/worker';
import { type PrecacheEntry, Serwist } from 'serwist';

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
    // 🟢 針對 OpenStreetMap 圖資設定強制快取 (Cache First)
    {
      matcher: /^https:\/\/.*\.tile\.openstreetmap\.org\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'osm-map-tiles',
        expiration: {
          maxEntries: 2000, // 調高容量限制以應付大量地圖圖塊
          maxAgeSeconds: 60 * 60 * 24 * 30, // 快取保留 30 天
        },
      },
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();
