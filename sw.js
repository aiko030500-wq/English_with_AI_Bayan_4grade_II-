// ✅ AI Bayan Service Worker (offline mode)
const CACHE_NAME = "ai-bayan-v1";
const FILES_TO_CACHE = [
  "index.html",
  "logo.png",
  "ornament-bg.png",
  "manifest.json"
];

// Установка service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Активация и очистка старых кэшей
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Обработка запросов
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          new Response("⚠️ You are offline. Try again later.")
        )
      );
    })
  );
});
