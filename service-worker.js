const CACHE_NAME = 'iadapta-juegos-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/games_icon.png',
  '/memory_game_thumbnail.png',
  '/order_game_thumbnail.png',
  '/word_search_thumbnail.png',
  '/mental_math_thumbnail.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
