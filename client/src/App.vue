<template>
  <div>
    <header-bar></header-bar>
    <div class="container">
      <div class="row">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
  setup() {
    const router = useRouter();
    onMounted(() => {
      axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
      window.navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data.action === "showOfflineAlert") {
          router.push({ name: "offline" });
        }
      });
    });
  },
};
</script>

<style></style>
