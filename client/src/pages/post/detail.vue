<template>
  <div class="row mt-5">
    <div class="col-6 mx-auto">
      <div class="card shadow-sm">
        <div class="card-body">
          <div class="px-3 position-relative">
            <h2 class="text-capitalize">
              {{ post.title }}
            </h2>
            <p class="truncated">
              {{ post.content }}
            </p>
            <router-link
              :to="{ name: 'post-list'}"
              class="me-3"
              > Back </router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const state = reactive({
      post: {
        id: 0,
        title: "",
        content: "",
      },
    });

    onMounted(() => {
      const route = useRoute();
      const id = route.params.id;

      if (id) {
        axios.get(`/posts/${id}`).then((response) => {
          state.post = response.data;
        });
      }
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style></style>
