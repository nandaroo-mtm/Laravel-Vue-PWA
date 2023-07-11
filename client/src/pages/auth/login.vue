<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">Login</div>

        <div class="card-body">
          <p class="text-danger" v-if="error_msg">{{ error_msg }}Login failed! </p>
          <form @submit.prevent="login()" id="form" enctype="multipart/form-data">
            <div class="form-group mb-3">
              <label for="title" class="fw-semibold">Email</label>
              <input
                type="text"
                class="form-control"
                v-model="user.email"
                placeholder="Enter email"
              />
              
            </div>
            <div class="form-group mb-3">
              <label for="title" class="fw-semibold">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="user.password"
                placeholder="Enter password"
              />
              
            </div>
            <div class="text-center">
              <button class="btn btn-secondary btn-sm me-3" type="reset">
                <i class="fa-solid fa-trash-arrow-up"></i>Clear
              </button>
              <button class="btn btn-primary btn-sm" type="submit">
                <i class="fa-regular fa-floppy-disk"></i> Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import axios from "axios";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const store= useStore();
    const router= useRouter();
    const state = reactive({
      user: {
        email: null,
        password: null,
      },
      error_msg: ''
    });

    const login = () => {
      axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      axios
        .post("/login", state.user)
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem("isLoggedIn", true);
            store.commit('setLoggedIn', true)
            router.push({ name: "post-list" });
          } else {
            state.error_msg = response.data.message;
          }
        })
        .catch(function (error) {
          console.log(error.response);
        });
    };

    return {
      ...toRefs(state),

      login
    };
  },
};
</script>

<style></style>
