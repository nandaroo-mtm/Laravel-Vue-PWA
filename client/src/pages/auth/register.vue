<template>
  <div class="row justify-content-center mt-5">
    <div class="col-md-6">
      <div class="card">
        <div class="card-header">
          <h5>Register</h5>
        </div>

        <div class="card-body">
          <form
            @submit.prevent="register()"
            id="form"
            enctype="multipart/form-data"
          >
            <div class="form-group mb-3">
              <label for="title" class="fw-semibold">User Name</label>
              <input
                type="text"
                class="form-control"
                v-model="user.name"
                placeholder="Enter name"
              />
              <small class="text-danger" v-if="errors.name != null"
                >*{{ errors.name[0] }}</small
              >
            </div>
            <div class="form-group mb-3">
              <label for="title" class="fw-semibold">Email</label>
              <input
                type="text"
                class="form-control"
                v-model="user.email"
                placeholder="Enter email"
              />
              <small class="text-danger" v-if="errors.email != null"
                >*{{ errors.email[0] }}</small
              >
            </div>
            <div class="form-group mb-3">
              <label for="title" class="fw-semibold">Password</label>
              <input
                type="password"
                class="form-control"
                v-model="user.password"
                placeholder="Enter password"
              />
              <small class="text-danger" v-if="errors.password != null"
                >*{{ errors.password[0] }}</small
              >
            </div>
            <div class="form-group mb-3">
              <label for="title" class="fw-semibold"
                >Confirmation Password</label
              >
              <input
                type="password"
                class="form-control"
                v-model="user.password_confirmation"
                placeholder="Enter password"
              />
              <small
                class="text-danger"
                v-if="errors.password_confirmation != null"
                >*{{ errors.password_confirmation[0] }}</small
              >
            </div>
            <div class="text-center">
              <button class="btn btn-secondary btn-sm me-3" type="reset">
                <i class="fa-solid fa-trash-arrow-up"></i>Clear
              </button>
              <button class="btn btn-primary btn-sm" type="submit">
                <i class="fa-regular fa-floppy-disk"></i>Register
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
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router=useRouter();
    const state = reactive({
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      errors: [],
    });

    const register = () => {
      axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");

      axios
        .post("/register", state.user)
        .then((response) => {
          if (response.data.success) {
            router.push({ name: "login" });
          } else {
            this.error = response.data.message;
          }
        })
        .catch(function (error) {
          console.log(error.response);
          state.errors = error.response.data.errors;
        });
    };

    return {
      ...toRefs(state),

      register,
    };
  },
};
</script>

<style></style>
