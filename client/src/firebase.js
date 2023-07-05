import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import Flower from "@/assets/flower_1.jpg";

const firebaseConfig = {
  apiKey: "AIzaSyAfACbZ8WlG_2V2w0R9r6BWJQTmuN7qwew",
  authDomain: "blog-92669.firebaseapp.com",
  projectId: "blog-92669",
  storageBucket: "blog-92669.appspot.com",
  messagingSenderId: "928269993401",
  appId: "1:928269993401:web:d1df8cdcaf84790457a268",
  measurementId: "G-QJ8B0E4W25",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

getToken(messaging, {
  vapidKey:
    "BErvWy0ZXbUR15shQR7JZrN1KN6z0ShejtUcToLj6OFabnImgvTseu0DkprD1ObTrGAn4qwWmn3BA_k4GcRbWuI",
})
  .then((token) => {
    localStorage.setItem("currentFBToken", token);
  })
  .catch((err) => {
    console.log("Unable to get permission to notify from firebase.js", err);
  });

onMessage(messaging, (payload) => {
  Notification.requestPermission((result) => {
    if (result === "granted") {
      navigator.serviceWorker.ready.then((registration) => {
        let noti = payload.notification;
        registration.showNotification(noti.title, {
          body: noti.body,
          icon: Flower,
          vibrate: [500, 500, 200, 100, 200, 100, 200],
        });
      });
    }
  });
});

self.addEventListener('notificationclick', function() {
  self.clients.openWindow('https://legacy.reactjs.org/docs/getting-started.html');
});

export default { messaging, getToken };
