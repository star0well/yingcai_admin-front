<template>
  <div class="main">
    <el-container class="layout-container">
      <el-header class="header">
        <page-header></page-header>
      </el-header>
      <el-container>
        <el-aside :style="{ width: loginStore.isFlod ? '80px' : '180px' }">
          <left-menus></left-menus>
        </el-aside>
        <el-main>
          <!-- <RouteTag></RouteTag> -->
          <div class="main-content">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import LeftMenus from "@/components/leftMenu/leftMenu.vue";
import PageHeader from "@/components/pageHeader.vue";
// import RouteTag from "@/base-ui/routeTag/routeTag.vue";
import { useUserStore } from "@/store/user";
const loginStore = useUserStore();
</script>

<style scoped lang="scss">
.main {
  height: 100%;

  .collapse {
    width: 200px;
  }
  .flod {
    width: 100px;
  }
  .header {
    font-size: 12px;
    border-bottom: 1px solid #eeeeee;
  }
  .layout-container {
    height: 100%;
  }
  :deep(.el-main) {
    display: flex;
    flex-direction: column;
    padding-top: 10px;
  }
  :deep(.el-aside) {
    transition: all 0.3s;
  }
  .main-content {
    flex: 1;
  }
}
</style>
