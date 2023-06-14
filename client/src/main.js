import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router/index";

createApp(App).use(router).mount("#app");
