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
      const headers = { "Content-Type": "multipart/form-data" };

      axios
        .post("/api/posts", { post: state.post }, { headers })
        .then((response) => {
          if (response.status === 201) {
            router.push({ name: "post-list" });
          } else {
            state.errors = response.data;
          }
        });
    };

    const editPost = () => {
      const headers = { "Content-Type": "multipart/form-data" };

      axios
        .put(`/api/posts/${state.post.id}`, { post: state.post }, { headers })
        .then((response) => {
          if (response.data.status === 422) {
            state.errors = response.data.errors;
          } else {
            router.push({ name: "post-list" });
          }
        });
    };

    onMounted(() => {
      const route = useRoute();
      const id = route.params.id;

      if (id) {
        state.post = {
          id: 2,
          title: "post title 2",
          content: `Remember, Firefox and Safari don’t support PWAs on desktop. iOS also 
          restricts some PWA features, but PWAs should still be installable on iOS. Here are th`,
        };
        // axios.get(`/api/posts/${id}`).then((response) => {
        //   state.post = response.data;
        //   state.post.image_data = JSON.parse(response.data.image_data);
        //   state.image_url = `http://localhost:3000/uploads/${state.post.image_data.id}`;
        // });
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