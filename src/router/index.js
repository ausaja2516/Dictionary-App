import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Dictionary App",
      },
    },
  ],
});

router.beforeEach((to, _, next) => {
  document.title = to.meta.title;

  next();
});
export default router;
