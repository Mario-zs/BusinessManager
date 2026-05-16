const CACHE_NAME = "businessmanager-v2";

const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./ui.js",
    "./events.js",
    "./data.js",
    "./manifest.json",
    "./libs/chart.umd.min.js",
    "./resources/icon-32.png",
    "./resources/icon-192.png",
    "./resources/icon-512.png",
];

self.addEventListener("install", (event) => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("activate", (event) => {

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );

    clients.claim();
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});