import { createRouter, createWebHashHistory } from "vue-router";
import { useUserStore } from "@/store/user";
import main from "@/views/main/main.vue";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",

    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "404",
    component: () => import("@/views/404/index.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: main,
    children: [],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(async (to) => {
  const loginStore = useUserStore();
  const whitePath = ["/", "/login"];
  if (!whitePath.includes(to.path)) {
    if (Object.keys(loginStore.userInfo).length === 0) {
      return "/login";
    }
    return true;
  }
  return true;
});

export default router;
