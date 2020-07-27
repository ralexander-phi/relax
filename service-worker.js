var dataCacheName = 'relax-pwa';
var cacheName = 'relax-pwa';
var filesToCache = [
  "/relax/",
  "/relax/img/icon/144x144.png",
  "/relax/img/icon/144x144.png",
  "/relax/img/icon/152x152.png",
  "/relax/img/icon/android-icon-192x192.png",
  "/relax/img/icon/apple-icon-114x114.png",
  "/relax/img/icon/apple-icon-120x120.png",
  "/relax/img/icon/apple-icon-144x144.png",
  "/relax/img/icon/apple-icon-152x152.png",
  "/relax/img/icon/apple-icon-180x180.png",
  "/relax/img/icon/apple-icon-57x57.png",
  "/relax/img/icon/apple-icon-60x60.png",
  "/relax/img/icon/apple-icon-72x72.png",
  "/relax/img/icon/apple-icon-76x76.png",
  "/relax/img/icon/favicon-16x16.png",
  "/relax/img/icon/favicon-32x32.png",
  "/relax/img/icon/favicon-96x96.png",
  "/relax/img/waterfall.jpg",
  "/relax/index.html",
  "/relax/manifest.json",
  "/relax/scripts/app.js",
  "/relax/scripts/audio.js",
  "/relax/service-worker.js",
  "/relax/styles/index.css",
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

