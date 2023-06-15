import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import router from "./router/index";
import axios from "axios"
import './registerServiceWorker'
import VueOffline from 'vue-offline'

axios.defaults.baseURL = "http://127.0.0.1:8000/api"


createApp(App).use(router, axios, VueOffline).mount("#app");
