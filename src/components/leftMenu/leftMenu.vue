<template>
  <div class="left-menu">
    <el-scrollbar>
      <el-menu
        :unique-opened="true"
        :default-active="defaultValue"
        :collapse="isCollapse"
      >
        <SubItem
          :menu-list="userMenus"
          @click-sub-item="handleMenuItemClick"
        ></SubItem>
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
  }
);
</script>

<style lang="scss" scoped>
.left-menu {
  height: 100%;
  box-sizing: border-box;

  :deep(.el-scrollbar__view) {
    height: 100%;
  }
  :deep(.el-menu) {
    height: 100%;
  }
}
</style>
