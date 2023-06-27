const CACHE_NAME = "my-cache";
const API_CACHE_NAME = "api-cache";

// const API_URLS = ["/api/posts"];

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
  if (navigator.onLine) {
    return fetch(event.request)
      .then((networkResponse) => {
        // Clone the network response to cache it
        const clonedResponse = networkResponse.clone();

        caches.open(API_CACHE_NAME).then((cache) => {
          // Cache the response for future use
          cache.put(event.request, clonedResponse);
        });
        return networkResponse;
      })
      .catch((error) => {
        // Handle fetch errors
        console.log("Error:", error);
      });
  } else {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          if (response) {
            // Serve the request from cache
            return response;
          } else {
            self.clients.matchAll().then((clients) => {
              clients.forEach((client) => {
                client.postMessage({ action: "showOfflineAlert" });
              });
            });
          }
        })
        .catch((error) => {
          console.log("error");
          // Handle cache match errors
          console.error("Error:", error);
        })
    );
  }
});

