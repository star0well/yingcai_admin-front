import { getUserInfo } from "@/service/login";
import { filterMenus, menuMapToRoutes, getPermisson } from "@/utils/map-menu";
import { defineStore } from "pinia";
import router from "@/router";

import { ref } from "vue";
import { menus } from "@/router/config";
export const useUserStore = defineStore("user", () => {
  const userInfo = ref({});
  const userMenus = ref([]);
  const isFlod = ref(false);
  async function getUserInfoAction(params, config) {
    const res = await getUserInfo(params, config);
    userInfo.value = res.data;
    changeUserMenus();
  }
  function changeUserMenus() {
    const userPermisson = getPermisson(menus);
    userMenus.value = filterMenus(menus, userPermisson);

    const userRouter = menuMapToRoutes(userMenus.value);
    userRouter.forEach((route) => router.addRoute("main", route));
  }

  async function loadLocalCacheAction() {
    const currentPath = window.location.hash;
    if (currentPath == "#/" || currentPath == "#/login") return;
    await getUserInfoAction();
  }
  return {
    userInfo,
    getUserInfoAction,
    userMenus,
    isFlod,
    loadLocalCacheAction,
  };
});
