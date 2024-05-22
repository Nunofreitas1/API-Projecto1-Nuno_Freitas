import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/Login.vue";
import HomeView from "../views/HomeView.vue";
import SearchView from "../views/SearchView.vue";
import LibraryView from "../views/LibraryView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LoginView,
    },
    {
      path: "/home",
      component: HomeView,
    },
    {
      path: "/search",
      component: SearchView,
    },
    {
      path: "/library",
      component: LibraryView,
    },
  ],
});

export default router;
