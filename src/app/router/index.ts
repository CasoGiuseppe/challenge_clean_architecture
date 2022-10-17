import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HeroesList",
      components: {
        default: () => import("@/app/ui/views/heroes-list/HeroesList.vue"),
      },
    },
  ],
});

export default router;
