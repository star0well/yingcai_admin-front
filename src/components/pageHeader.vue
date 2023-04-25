<template>
  <div class="header" id="header">
    <div class="right">
      <div class="menu-action">
        <el-icon class="hover:cursor-pointer" size="16" v-if="!isFlod" @click="store.isFlod = true"><Fold /></el-icon>
        <el-icon class="hover:cursor-pointer" size="16" v-if="isFlod" @click="store.isFlod = false"><Expand /></el-icon>
        <NavBreadcrumb :breadcrumbs="breadcrumbs"></NavBreadcrumb>
      </div>
      <el-tooltip raw-content effect="light" append-to="body">
        <template #content>
          <div class="btnItem loginOut" @click="loginOut">退出登录</div>
        </template>
        <div class="userInfo-box">
          <el-image :src="userInfo.avatar || defaultImage" class="portrait">
            <template #error>
              <el-image :src="defaultImage" />
            </template>
          </el-image>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import vueIcon from "@/assets/svg/vue.svg";

import { useRoute } from "vue-router";
import NavBreadcrumb from "@/base-ui/breadcrumb/nav-breadcrumb.vue";
import { pathMapBreadcrumbs } from "@/utils/map-menu";
import { Expand, Fold } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/user";
import defaultImage from "@/assets/img/avatar.png";
const route = useRoute();
const store = useUserStore();
const userInfo = computed(() => store.userInfo);

/**
 * 方法start
 * */
const loginOut = () => {
  const theme = localStorage.getItem("vueuse-color-scheme");
  window.localStorage.clear();
  theme && localStorage.setItem("vueuse-color-scheme", theme);
};

/**
 * 方法end
 * */

//面包屑
const isFlod = computed(() => store.isFlod);
const breadcrumbs = computed(() => {
  const userMenus = store.userMenus;
  const currentPath = route.path;

  return pathMapBreadcrumbs(userMenus, currentPath);
});
//end
</script>
<style scoped lang="scss">
.header {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 200px;
    min-width: 180px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #131414;
    font-size: 14px;
    font-weight: bold;
    .logo {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
  .right {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .menu-action {
      min-width: 200px;
      display: flex;
      align-items: center;
    }

    .userInfo-box {
      display: flex;
      align-items: center;
      font-weight: bold;
    }
    .portrait {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
.btnItem {
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  //padding: 0 10px;
  &:hover {
    background-color: var(--el-color-primary-light-9);
  }
}
.loginOut {
  border-top: 1px solid #eeeeee;
}
.item {
  text-align: center;
  line-height: 40px;
  height: 40px;
  border-bottom: 1px solid #eeeeee;
  cursor: pointer;
  &:hover {
    color: orangered;
  }
}
</style>
