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

export default {
  name: "App",
  components: {
    HeaderBar,
  },
};
</script>

<style></style>
