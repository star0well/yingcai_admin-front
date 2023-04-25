<template>
  <div class="left-menu flex flex-col">
    <div class="flex h-15 items-center justify-center bg-#fcfcfc">
      <el-icon class="animate-iteration-1" :class="isCollapse && 'animate-fade-in'" size="16"
        ><vueIcon></vueIcon
      ></el-icon>
      <div class="transition box-border" :class="[isCollapse ? 'hidden' : 'show ml-2']">yingcai_admin</div>
    </div>
    <el-scrollbar>
      <el-menu :unique-opened="true" :default-active="defaultValue" :collapse="isCollapse">
        <SubItem :menu-list="userMenus" @click-sub-item="handleMenuItemClick"></SubItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { pathMapToMenu } from "@/utils/map-menu";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import SubItem from "./SubItem.vue";
import { useUserStore } from "@/store/user";
import vueIcon from "@/assets/svg/vue.svg";

//store
//router
const router = useRouter();
const route = useRoute();
const store = useUserStore();
const userMenus = computed(() => store.userMenus);
//data
const currentPath = route.path;
const menu = pathMapToMenu(userMenus.value, currentPath);
const defaultValue = ref(menu?.id);
const isCollapse = computed(() => store.isFlod);
//event handle
const handleMenuItemClick = (item) => {
  router.push({
    path: item.path ?? "/not-found",
  });
};
watch(
  () => route.path,
  (newValue) => {
    const menu = pathMapToMenu(userMenus.value, newValue);
    defaultValue.value = menu?.id + "";
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped>
.left-menu {
  :deep(.el-scrollbar__view) {
    flex: 1;
  }
  :deep(.el-menu) {
    height: 100%;
    border-right: none;
  }
}
</style>
