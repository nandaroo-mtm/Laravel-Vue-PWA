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
        <ul class="navbar-nav">
          <li>
            <router-link :to="{name: 'post-list'}" class="nav-link">Posts</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderBar",
};
</script>

<style></style>
