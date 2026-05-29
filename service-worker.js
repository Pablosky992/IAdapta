const CACHE_NAME = 'iadapta-v4'; // Bumped to force SW update
const ASSETS = [
  './',
  './index.html',
  './estimulacion-cognitiva.html',
  './recursos.html',
  './guias.html',
  './css/styles.css',
  './catalogData.js',
  './games_icon.png',
  './pro_resources_icon.png',
  './manifest.json',
  './manifest_pro.json',
  './memory_game_thumbnail.png',
  './order_game_thumbnail.png',
  './word_search_thumbnail.png',
  './mental_math_thumbnail.png',
  './visual_game_thumbnail.png',
  './intruder_game_thumbnail.png',
  './sudoku_game_thumbnail.png'
];

// Install: Cache essential assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force the new SW to take control immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate: Clean up old caches and take control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch: Network-first for HTML/JS (to get updates), Cache-first for images
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Don't intercept cross-origin requests (let them open in the system browser)
  if (url.origin !== self.location.origin) return;

  // Strategy: Network-first for HTML and scripts to ensure latest data
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.js') || url.pathname.endsWith('.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
  } else {
    // Strategy: Cache-first for images and styles
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Push event listener: handle incoming push notifications from Firebase or Web Push server
self.addEventListener('push', (event) => {
  let data = { title: 'IAdapta', body: '¡Es hora de hacer tu Reto Diario! 🧠' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'IAdapta', body: event.data.text() };
    }
  }
  
  const options = {
    body: data.body,
    icon: './games_icon.png',
    badge: './games_icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click listener: open the website when clicked
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://iadapta.es/estimulacion-cognitiva.html')
  );
});
