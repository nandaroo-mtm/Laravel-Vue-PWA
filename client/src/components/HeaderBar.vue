<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container">
      <h1 class="navbar-brand">
        <a class="navbar-brand" href="#">PWA</a>
      </h1>
      <div
        class="collapse navbar-collapse navbar-right d-lg-flex justify-content-end"
        id="navbarTogglerDemo01"
      >
        <ul class="navbar-nav" v-if="isLoggedIn">
          <li>
            <router-link :to="{ name: 'post-list' }" class="nav-link"
              >Posts</router-link
            >
          </li>
          <li @click="logout()" class="nav-link">Logout</li>
        </ul>
        <ul class="navbar-nav" v-if="!isLoggedIn">
          <li>
            <router-link :to="{ name: 'login' }" class="nav-link"
              >Login</router-link
            >
          </li>
          <li>
            <router-link :to="{ name: 'register' }" class="nav-link"
              >Register</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
export default {
  name: "HeaderBar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = computed(() => {
      return store.state.isLoggedIn;
    });

    const logout = () => {
      store.commit("setLoggedIn", false);
      localStorage.removeItem("isLoggedIn"); 
      router.push({ name: "login" }); 
    };

    onMounted(() => {
      store.commit("setLoggedIn", localStorage.getItem("isLoggedIn"));
    });

    return {
      isLoggedIn,

      logout,
    };
  },
};
</script>

<style></style>
