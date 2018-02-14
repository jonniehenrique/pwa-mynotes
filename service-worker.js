let cacheName = 'notes-v-2.0.0';
let filesToCache = [
	'./',
	'index.html',
	'css/style.css',
	'css/colors.css',
	'js/array.observe.polyfill.js',
	'js/object.observe.polyfill.js',
	'js/main.js'
];

self.addEventListener('install', function (e) {
	console.log('[Service Worker] Installer');
	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
			console.log('[Service Worker] Caching app shell');
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener('active', function (e) {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (key !== cacheName) {
					console.log('[ServiceWorker] Removing old cache');
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function (e) {
	console.log('[ServiceWorker] Fetch', e.request.url);
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	);
});