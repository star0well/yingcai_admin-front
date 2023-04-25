<template>
  <el-container class="h-100%">
    <el-aside :style="{ '--el-aside-width': isFlod ? '64px' : '180px' }" class="aside bg-#fff">
      <left-menus> </left-menus>
    </el-aside>
    <el-container class="h-100% bg-#f4f4f4">
      <el-header class="bg-#fff">
        <page-header></page-header>
      </el-header>
      <RouteTag
        class="m-x-2.5 my-2.5 py-1.5 pl-1.5 bg-#fff border-rd-2 hover:shadow-md hover:transform transition"
        style="--un-translate-y: -1px"></RouteTag>
      <el-main style="--el-main-padding: 10px" class="m-2.5 bg-#fff mt-0 border-rd-2">
        <router-view v-slot="{ Component }">
          <transition name="slide-right" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import LeftMenus from "@/components/leftMenu/leftMenu.vue";
import PageHeader from "@/components/pageHeader.vue";
import RouteTag from "@/base-ui/routeTag/routeTag.vue";
import { useUserStore } from "@/store/user";
import { storeToRefs } from "pinia";
const loginStore = useUserStore();
const { isFlod } = storeToRefs(loginStore);
</script>

<style scoped>
.aside {
  transition: var(--el-transition-all);
  overflow: hidden;
}

/* 页面切换动画-s */
.slide-right-enter-active,
.slide-right-leave-active {
  will-change: transform;
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.el-main {
  overflow: hidden;
}
</style>
