/**
 * Service worker — Al Kanzou (carrés wafq).
 *
 * Mise en cache "app shell" des pages statiques pour un accès hors-ligne,
 * avec une stratégie stale-while-revalidate (le cache répond tout de
 * suite, le réseau met à jour le cache en arrière-plan).
 *
 * Pour publier une nouvelle version des fichiers mis en cache, INCRÉMENTER
 * CACHE_VERSION ci-dessous : les anciens caches sont purgés à l'activation.
 */
const CACHE_VERSION = "v10";
const CACHE_NAME = `al-kanzou-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/carre/3",
  "/carre/4",
  "/carre/5",
  "/carre/6",
  "/carre/7",
  "/carre/8",
  "/carre/9",
  "/carre/10",
  "/carre/11",
  "/manifest.json",
  "/icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("al-kanzou-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
