const CACHE_NAME = "game-hub-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./manifest.json",
  "./games/dado/index.html",
  "./games/dado/style.css",
  "./games/dado/script.js",
  "./games/juego2/index.html",
  "./games/juego2/style.css",
  "./games/juego2/script.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js")
    .then(() => console.log("SW registrado"))
    .catch(err => console.log(err));
}
