import { createRouter, createWebHistory } from "vue-router";
import NewPost from "../pages/post/new.vue";
import PostList from "../pages/post/list.vue";
import PostEdit from "../pages/post/edit.vue";

const routes = [
  {
    path: "/posts",
    name: "post-list",
    component: PostList,
  },
  {
    path: "/posts/new",
    name: "post-new",
    component: NewPost,
  },
  {
    path: "/posts/:id/edit",
    name: "post-edit",
    component: PostEdit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
