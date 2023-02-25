<template>
  <div class="welcome">
    <div class="center">
      <el-image class="orgin" src="/assets/svg/study.jpg"></el-image>

      <template v-for="(item, index) of iconList" :key="index">
        <el-icon size="80" class="icon" :class="`icon-${index}`">
          <component :is="item" />
        </el-icon>
      </template>
    </div>
  </div>
</template>
<script setup>
import vueIcon from "@/assets/svg/vue.svg";
import nestjs from "@/assets/svg/nestjs.svg";
import react from "@/assets/svg/react.svg";
import angular from "@/assets/svg/angular.svg";

const iconList = [vueIcon, nestjs, react, angular];
</script>

<style lang="scss" scoped>
@keyframes loop {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loop2 {
  100% {
    transform: rotate(-360deg);
  }
}

.welcome {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  height: 85vh;
}
.center {
  margin-top: 180px;
  width: 300px;
  height: 300px;
  position: relative;
  animation: 4s linear 0s infinite loop;
  .orgin {
    width: 100%;
    height: 100%;
    animation: 4s linear 0s infinite loop2;
  }
  .icon {
    position: absolute;

    animation: 4s linear 0s infinite loop2;
  }
  .icon-0 {
    left: 150px;
    top: -190px;
  }
  .icon-1 {
    top: 150px;
    right: -190px;
  }
  .icon-2 {
    bottom: -190px;
    left: 150px;
  }
  .icon-3 {
    left: -190px;
    top: 150px;
  }
}
</style>
