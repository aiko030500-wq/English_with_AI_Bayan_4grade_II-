self.addEventListener('install', event => {
  self.skipWaiting(); // сразу активировать новую версию
});

self.addEventListener('activate', event => {
  clients.claim(); // применить новую версию для всех вкладок
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => caches.delete(key))) // очистить старый кэш
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
