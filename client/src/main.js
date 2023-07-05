import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router/index";
import axios from "axios";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./firebase";

const app = createApp(App);

app.use(router, axios, VueSweetalert2).mount("#app");

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then((reg) => {
      console.log(`Service Worker Registration (Scope: ${reg.scope})`);
    })
    .catch((error) => {
      const msg = `Service Worker Error (${error})`;
      console.log("Error firebase:::", msg);
    });
} else {
  // happens when the app isn't served over HTTPS or if the browser doesn't support service workers
  console.warn("Service Worker not available");
}

