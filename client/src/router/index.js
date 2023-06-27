import { createRouter, createWebHashHistory  } from "vue-router";
import NewPost from "../pages/post/new.vue";
import PostList from "../pages/post/list.vue";
import PostEdit from "../pages/post/edit.vue";
import PostDetail from "../pages/post/detail.vue";
import Offline from "../pages/offline.vue";

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
  {
    path: '/offline',
    name: 'offline',
    component: Offline,
    beforeEnter(to, from, next) {
      if(window.navigator.onLine) {
        next(false); // Abort the navigation
        router.replace(from.fullPath);
      } else {
        next();
      }
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
