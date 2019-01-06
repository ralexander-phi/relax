var dataCacheName = 'relax-pwa';
var cacheName = 'relax-pwa';
var filesToCache = [
  '/',
 "./favicon.ico",
 "./img",
 "./img/icon",
 "./img/icon/128x128.png",
 "./img/icon/144x144.png",
 "./img/icon/152x152.png",
 "./img/icon/192x192.png",
 "./img/icon/256x256.png",
 "./index.html",
 "./manifest.json",
 "./scripts",
 "./scripts/app.js",
 "./scripts/jquery-3.3.1.js",
 "./scripts/jquery.qrcode.min.js",
 "./service-worker.js",
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

