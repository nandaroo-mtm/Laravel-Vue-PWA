<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="row">
        <div class="px-3 position-relative">
          <h4 class="text-capitalize">
            {{ post.title }}
          </h4>
          <p class="truncated">
            {{ post.content }}
          </p>
          <span
            id="delete-icon"
            class="me-3 position-absolute top-0 end-0"
            @click="deletePost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-trash3 text-danger"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
              />
            </svg>
          </span>
          <router-link
            :to="{ name: 'post-detail', params: { id: post.id } }"
            class="me-3"
            >Detail</router-link
          >
          <router-link
            :to="{ name: 'post-edit', params: { id: post.id } }"
            class="me-3"
            >Edit post</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { sendNotification } from "../../../public/js/firebase_utils";

export default {
  name: "Post",
  props: ["post"],
  setup(props, ctx) {
    const deletePost = () => {
      if (confirm("Are you sure to delete?")) {
        axios.delete(`/posts/${props.post.id}`).then(() => {
          let message = {
            title: props.post.title,
            body: "This post has been deleted!"
          };
          sendNotification(message);
          ctx.emit("post-deleted", props.post.id);
        });
      }
    };

    return {
      deletePost,
    };
  },
};
</script>

<style>
.truncated {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  max-width: 100%;
  width: auto;
  overflow: hidden;
}
</style>
