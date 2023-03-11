<script setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
}
</style>
