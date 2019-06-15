const CACHE_NAME = 'v1';

const cacheByInstall = [
  '/index.html',
  '/about.html',
  '/cycle.png'
];

self.addEventListener('install', event => {
  console.log('install');
  console.log(event);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(cacheByInstall);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('activate');
  console.log(event);
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  console.log('fetch');
  console.log(url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          console.log('cache');
          console.log(response);
          return response || fetch(event.request).then((response) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});