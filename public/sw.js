// Service Worker (sw.js)

// Install event (does nothing)
self.addEventListener('install', event => {
  console.log('Service Worker installed.');
});

// Activate event (does nothing)
self.addEventListener('activate', event => {
  console.log('Service Worker activated.');
});

//Fetch event (pass-through fetch with no caching)
self.addEventListener('fetch', event => {
  // Simply fetch the request from the network
  console.log('Intercepting a fetch request...');
  event.respondWith(fetch(event.request));
});
