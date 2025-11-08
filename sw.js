const CACHE_NAME = "ai-bayan-v1";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "logo.png",
  "ornament-bg.png",
  "theme1.html",
  "theme2.html",
  "theme3.html",
  "theme4.html",
  "theme5.html",
  "theme6.html",
  "theme7.html",
  "theme8.html",
  "theme9.html",
  "theme10.html",
  "theme11.html",
  "theme12.html",
  "theme13.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
