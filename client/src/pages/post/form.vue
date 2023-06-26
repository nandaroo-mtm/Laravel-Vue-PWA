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
import Swal from "sweetalert2";

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
      if (window.navigator.onLine) {
        axios
          .post("/posts", state.post)
          .then(() => {
            router.push({ name: "post-list" });
          })
          .catch((err) => {
            state.errors = err.response.data.errors;
          });
      } else {
        Swal.fire("The Internet?", "That thing is still around?", "question");
      }
    };

    const editPost = () => {
      if (window.navigator.onLine) {
        axios
          .put(`/posts/${state.post.id}`, state.post)
          .then(() => {
            router.push({ name: "post-list" });
          })
          .catch((err) => {
            state.errors = err.response.data.errors;
          });
      } else {
        Swal.fire("The Internet?", "That thing is still around?", "question");
      }
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
