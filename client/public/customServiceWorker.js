const CACHE_NAME = "my-cache";
const API_CACHE_NAME = "api-cache";

// const API_URLS = ["/api/posts"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "/index.html", "/manifest.json"]);
    })
  );
  /*
   ** check network state after certain time interval
   ** If online for the first time, create an indexed db and a table
   ** If online after going offline, hit all requests saved in indexed table to server and empty the table
   */
  checkNetworkState();
});

function checkNetworkState() {
  setInterval(function () {
    if (navigator.onLine) {
      sendOfflinePostRequestsToServer();
    }
  }, 3000);
}

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
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET") {
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
            // Handle cache match errors
            console.error("Error:", error);
          })
      );
    }
  } else {
    if (!navigator.onLine) {
      //here you can check for specific urls to be saved in indexed db
      var authHeader = event.request.headers.get("Authorization");
      var reqUrl = event.request.url;
      var method = event.request.method;
      Promise.resolve(event.request.text()).then((payload) => {
        //save offline requests to indexed db
        saveIntoIndexedDb(method, reqUrl, authHeader, payload);
      });
    }
  }
});

async function sendOfflinePostRequestsToServer() {
  var request = indexedDB.open("TrayTrackingPostDB");
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("postrequest", "readwrite");
    var store = tx.objectStore("postrequest");
    var allRecords = store.getAll();
    allRecords.onsuccess = function () {
      if (allRecords.result && allRecords.result.length > 0) {
        var records = allRecords.result;
        //make recursive call to hit fetch requests to server in a serial manner
        sendFetchRequestsToServer(
          fetch(records[0].url, {
            method: records[0].method,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: records[0].authHeader,
            },
            body: records[0].payload,
          }),
          records[0].method,
          records[0].url,
          records[0].authHeader,
          records[0].payload,
          records.slice(1)
        );

        for (var i = 0; i < allRecords.result.length; i++)
          store.delete(allRecords.result[i].id);
      }
    };
  };
  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    db.onerror = function () {
      console.log("Why didn't you allow my web app to use IndexedDB?!");
    };

    if (!db.objectStoreNames.contains("postrequest")) {
      db.createObjectStore("postrequest", {
        keyPath: "id",
        autoIncrement: true,
      });
    } else {
      db.objectStoreNames.get("postrequest");
    }
  };
}

function saveIntoIndexedDb(method, url, authHeader, payload) {
  var myRequest = {};
  let jsonPayLoad = null;
  if(method !== 'DELETE') jsonPayLoad = JSON.parse(payload);
  //add payload if required. If not skip parsing json and stringifying it again
  //jsonPayLoad['eventTime'] = getCurrentTimeString(eventTime)
  myRequest.method = method;
  myRequest.url = url;
  myRequest.authHeader = authHeader;
  myRequest.payload = JSON.stringify(jsonPayLoad);
  var request = indexedDB.open("TrayTrackingPostDB");
  request.onsuccess = function (event) {
    var db = event.target.result;
    var tx = db.transaction("postrequest", "readwrite");
    var store = tx.objectStore("postrequest");
    store.add(myRequest);
  };
}

async function sendFetchRequestsToServer(
  data,
  method,
  reqUrl,
  authHeader,
  payload,
  records
) {
  Promise.resolve(data)
    .then((response) => {
      console.log("Successfully sent request to server");
      if (records.length != 0) {
        sendFetchRequestsToServer(
          fetch(records[0].url, {
            method: records[0].method,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: records[0].authHeader,
            },
            body: records[0].payload,
          }),
          records[0].method,
          records[0].url,
          records[0].authHeader,
          records[0].payload,
          records.slice(1)
        );
      } else {
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ action: "showPostList" });
          });
        });
      }
    })
    .catch((e) => {
      //fetch fails only in case of network error. Fetch is successful in case of any response code
      console.log("Exception while sending post request to server" + e);
      saveIntoIndexedDb(method, reqUrl, authHeader, payload);
    });
}
