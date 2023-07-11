<template>
  <div class="row">
    <div class="col-10 mx-auto">
      <form
        @submit.prevent="isEdit ? editPost() : createPost()"
        id="form"
        enctype="multipart/form-data"
      >
        <div class="form-group mb-3">
          <label for="title" class="fw-semibold">Title</label>
          <input
            type="text"
            class="form-control"
            v-model="post.title"
            placeholder="Write post title!"
          />
          <small class="text-danger" v-if="errors.title != null"
            >*{{ errors.title[0] }}</small
          >
        </div>
        <div class="form-group mb-3">
          <label for="body" class="fw-semibold">Description</label>
          <textarea
            class="form-control"
            v-model="post.content"
            rows="5"
            placeholder="Write details here!"
          ></textarea>
          <small class="text-danger" v-if="errors.content != null"
            >*{{ errors.content[0] }}</small
          >
        </div>
        <div class="text-center">
          <button
            v-if="!isEdit"
            class="btn btn-secondary btn-sm me-3"
            type="reset"
          >
            <i class="fa-solid fa-trash-arrow-up"></i>Clear
          </button>
          <button class="btn btn-primary btn-sm" type="submit">
            <i class="fa-regular fa-floppy-disk"></i> Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { sendNotification } from "../../../public/js/firebase_utils";

export default {
  setup() {
    const state = reactive({
      post: {
        id: null,
        title: "",
        content: "",
      },
      errors: [],
      isEdit: false,
    });

    const router = useRouter();

    const createPost = () => {
      axios
        .post("/posts", state.post)
        .then(() => {
          let message = {
            title: "Created Message",
            body: "The new post has been created!",
          };
          sendNotification(message);
          router.push({ name: "post-list" });
        })
        .catch((err) => {
          if (err.code !== "ERR_NETWORK") {
            state.errors = err.response.data.errors;
          }
        });
    };

    const editPost = () => {
      axios
        .put(`/posts/${state.post.id}`, state.post)
        .then(() => {
          let message = {
            title: "Updated Message",
            body: "The selected post has been updated!",
          };
          sendNotification(message);
          router.push({ name: "post-list" });
        })
        .catch((err) => {
          if (err.code !== "ERR_NETWORK") {
            state.errors = err.response.data.errors;
          }
        });
    };

    onMounted(() => {
      const route = useRoute();
      const id = route.params.id;

      if (id) {
        axios.get(`/posts/${id}`).then((response) => {
          state.post = response.data;
        });
        state.isEdit = true;
      }

      window.navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data.action === "showPostList") {
          router.push({ name: "post-list" });
        }
      });
    });

    return {
      ...toRefs(state),

      createPost,
      editPost,
    };
  },
};
</script>

<style></style>
