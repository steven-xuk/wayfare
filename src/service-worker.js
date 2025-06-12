// public/service-worker.js
/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

clientsClaim();

// ---------- 1. Precaching (unchanged) ----------
precacheAndRoute(self.__WB_MANIFEST);

// ---------- 2. App‐Shell / “Navigation” Routing ----------
// Instead of createHandlerBoundToURL (which serves index.html from cache immediately),
// we make a NetworkFirst strategy that always includes cookies. If the network fetch fails,
// it will fall back to whatever copy is in the runtime cache (or precache if you’ve baked it in).
registerRoute(
  // Only handle “navigate” requests when PWA mode is active
  ({ request, url }) => {
    // If you have a PWA toggle, keep your previous logic. Otherwise, you can drop “isPwa.”
    // Here we assume you always want to do this for navigations.
    if (request.mode !== 'navigate') return false;
    // Don’t intercept requests for files that have extensions (e.g. .js, .css, .png, etc.)
    const fileExtRegexp = new RegExp('/[^/?]+\\.[^/]+$');
    if (fileExtRegexp.test(url.pathname)) return false;
    // You can also exclude admin or API sub‐paths if needed:
    if (url.pathname.startsWith('/_')) return false;

    // Otherwise, treat it as an “App Shell” navigation
    return true;
  },
  new NetworkFirst({
    cacheName: 'html-runtime-cache',
    fetchOptions: {
      credentials: 'include', // ← crucial: send InfinityFree’s “_test” cookie back
    },
    networkTimeoutSeconds: 5, // optional: if network is slow, fall back to cache
    plugins: [
      // Limit the runtime cache to just 1 copy of index.html (or larger if you have multiple pages)
      new ExpirationPlugin({ maxEntries: 1 }),
    ],
  })
);

// ---------- 3. Runtime Caching for Images ----------
registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    fetchOptions: {
      credentials: 'include', // ← also include cookies for any same‐origin fetch
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// ---------- 4. Optional: Cache other assets (JS/CSS) with credentials included ----------
registerRoute(
  ({ request }) =>
    request.destination === 'script' ||
    request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    fetchOptions: {
      credentials: 'include',
    },
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  })
);

// ---------- 5. Cleanup or “skipWaiting” support ----------
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
