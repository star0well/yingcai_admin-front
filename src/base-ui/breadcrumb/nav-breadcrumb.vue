<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <TransitionGroup name="list">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
          <span
            v-if="index == breadcrumbs.length - 1 || !item.path"
            class="no-redirect"
            >{{ item.name }}</span
          >
          <a v-else @click.prevent="handleLink(item)">{{ item.name }}</a>
        </el-breadcrumb-item>
      </TransitionGroup>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

defineProps({
  breadcrumbs: {
    type: Array,
  },
});
const router = useRouter();
const handleLink = (item) => {
  router.push({
    path: item.path,
  });
};
</script>

<style scoped>
.breadcrumb {
  margin-left: 10px;
}
.no-redirect {
  color: #97a8be;
  cursor: text;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
