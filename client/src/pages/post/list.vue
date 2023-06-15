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
        <post :post="p" class="mb-4" @post-deleted="postDeleted" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import axios from "axios";
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

    const postDeleted = id => {
      console.log('postDeleted', id);
      state.posts = state.posts.filter(p => p.id !== id)
    }

    onMounted(() => {
        axios.get("/posts").then((response) => {
          if(response.status === 200) {
            state.posts = response.data;
            console.log(response.data);
          }
        });
    });

    return {
      ...toRefs(state),

      postDeleted
    };
  },
};
</script>

<style></style>
