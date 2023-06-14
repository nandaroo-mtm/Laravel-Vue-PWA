<template>
  <div class="row mt-5">
    <div class="col-8 mx-auto">
      <div class="row mb-3">
        <div class="col">
          <router-link
            :to="{ name: 'post-new' }"
            class="btn btn-sm btn-outline-primary inline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
            New
          </router-link>
        </div>
      </div>
      <div v-for="p in posts" :key="p.id">
        <post :post="p" class="mb-4" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
// import axios from "axios";
import Post from "./post.vue";

export default {
  name: "PostList",
  components: {
    Post,
  },
  setup() {
    const state = reactive({
      posts: [],
    });

    onMounted(() => {
      state.posts = [
        {
          id: 1,
          title: "post title 1",
          content: `While its not recommended, you can use this mode inside Browser applications 
          but note there will be no history, meaning you wont be able to go`,
        },
        {
          id: 2,
          title: "post title 2",
          content: `Remember, Firefox and Safari don’t support PWAs on desktop. iOS also 
          restricts some PWA features, but PWAs should still be installable on iOS. Here are th`,
        },
      ];
      //   axios.get("/api/posts").then((response) => {
      //     state.posts = response.data;
      //     response.data.map((p) => {
      //       p.image_data = JSON.parse(p.image_data);
      //     });
      //     state.posts = response.data;
      //   });
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style></style>
