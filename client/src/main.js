import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router/index";
import axios from "axios";

createApp(App).use(router, axios).mount("#app");

axios.defaults.baseURL = "http://127.0.0.1:8000/api";


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    console.log("support window load");
    navigator.serviceWorker.register('/customServiceWorker.js')
      .then(registration => {
        console.log('Custom Service Worker registered:', registration);
      })
      .catch(error => {
        console.log('Custom Service Worker registration failed:', error);
      });
  });
} else {
  console.log("not support");
}
