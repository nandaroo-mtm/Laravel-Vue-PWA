const CACHE_NAME = "my-cache";
const API_CACHE_NAME = "api-cache";

const API_URLS = ["/api/posts"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "/index.html", "/manifest.json"]);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME && cache !== API_CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Check if the request is an API request
  if (API_URLS.some((url) => request.url.includes(url))) {
    event.respondWith(fetchAndCache(request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});

async function fetchAndCache(request) {
  const cache = await caches.open(API_CACHE_NAME);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    return (
      cachedResponse ||
      new Response(null, { status: 404, statusText: "Not found" })
    );
  }
}

async function cacheFirst(request) {
  const cacheResponse = await caches.match(request);
  return cacheResponse || fetch(request);
}
