<<<<<<< HEAD
const CACHE = 'shieldlog-v3';
const SHELL = [
=======
const CACHE = 'shieldlog-v1';
const SHELL = [
  './',
  './index.html',
>>>>>>> 01cd493 (added some graphs and card moving)
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Barlow+Condensed:wght@400;500;600;700;800&family=Barlow:wght@400;500;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js'
];

<<<<<<< HEAD
const PASSTHROUGH = [
  'firestore.googleapis.com',
  'firebase.googleapis.com',
  'identitytoolkit.googleapis.com',
  'securetoken.googleapis.com',
  'accounts.google.com',
  'gstatic.com/firebasejs',
  'vision.googleapis.com',
  'firebaseapp.com',
  'googleapis.com',
  'chrome-extension',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(SHELL.map(url => {
        // Only cache http/https URLs
        if(url.startsWith('http')) return c.add(url);
      })))
      .then(() => self.skipWaiting())
=======
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
>>>>>>> 01cd493 (added some graphs and card moving)
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
<<<<<<< HEAD
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
=======
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
>>>>>>> 01cd493 (added some graphs and card moving)
  );
});

self.addEventListener('fetch', e => {
<<<<<<< HEAD
  const url = e.request.url;
  // Only handle http/https
  if (!url.startsWith('http')) return;
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate') return;
  if (PASSTHROUGH.some(domain => url.includes(domain))) return;
=======
  // Let Firebase/Firestore requests go through the network always
  if (e.request.url.includes('firestore.googleapis.com') ||
      e.request.url.includes('firebase') ||
      e.request.url.includes('gstatic.com/firebasejs') ||
      e.request.url.includes('vision.googleapis.com')) {
    return;
  }
>>>>>>> 01cd493 (added some graphs and card moving)
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
<<<<<<< HEAD
        if (resp.status === 200) {
=======
        // Cache successful GET responses for app shell assets
        if (e.request.method === 'GET' && resp.status === 200) {
>>>>>>> 01cd493 (added some graphs and card moving)
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
<<<<<<< HEAD
      }).catch(() => cached);
=======
      }).catch(() => cached); // fall back to cache if network fails
>>>>>>> 01cd493 (added some graphs and card moving)
    })
  );
});
