import { createRouter, createWebHashHistory  } from "vue-router";
import NewPost from "../pages/post/new.vue";
import PostList from "../pages/post/list.vue";
import PostEdit from "../pages/post/edit.vue";
import PostDetail from "../pages/post/detail.vue";

const routes = [
  {
    path: "/",
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
  {
    path: "/posts/:id",
    name: "post-detail",
    component: PostDetail,
  },
];

const router = createRouter({
  history: createWebHashHistory (),
  routes,
});

export default router;
