<template>
  <div class="post col-6 px-3 mx-auto mt-5">
    <div class="card shadow-lg">
      <div class="card-header">
        <h4 class="fw-bolder text-center text-uppercase">Post Create</h4>
      </div>
      <div class="card-body">
        <post-form />
      </div>
    </div>
  </div>
</template>

<script>
import PostForm from "./form.vue";

export default {
  name: "PostNew",
  components: {
    PostForm,
  },
};
</script>

<style></style>
