const CACHE_NAME = "ayanna-portfolio-v7";
const OFFLINE_URL = "/";

const PRECACHE_URLS = [OFFLINE_URL, "/manifest.webmanifest"];

const NETWORK_FIRST_PREFIXES = [
  "/favicon",
  "/logo-mark",
  "/icon",
  "/apple-icon",
];

function isNetworkFirstAsset(pathname: string) {
  return NETWORK_FIRST_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isDocument =
    event.request.mode === "navigate" ||
    event.request.destination === "document";

  if (isDocument) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL)),
    );
    return;
  }

  if (isNetworkFirstAsset(url.pathname)) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request)),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }

          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL));
    }),
  );
});
