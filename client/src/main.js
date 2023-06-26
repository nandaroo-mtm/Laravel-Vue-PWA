import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router/index";
import axios from "axios";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

createApp(App).use(router, axios, VueSweetalert2).mount("#app");

axios.defaults.baseURL = "http://127.0.0.1:8000/api";


