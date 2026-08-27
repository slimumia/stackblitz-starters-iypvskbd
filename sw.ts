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
      handler: "CacheFirst",
      options: {
        cacheName: "osm-map-tiles",
        expiration: {
          maxEntries: 2000,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
      },
    },
    ...defaultCache,
  ],
});

serwist.addEventListeners();