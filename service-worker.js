const CACHE_NAME = "ai-bayan-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./logo.png",
  "./manifest.json"
];

// Установка и кэширование
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Работа офлайн
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Очистка старого кэша при обновлении
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
