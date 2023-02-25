<template>
  <div class="tag-list">
    <el-scrollbar>
      <div class="scrollbar-flex-content">
        <el-tag
          v-for="(tag, index) in dynamicTags"
          :key="tag"
          class="item"
          :color="currentRoute == tag.path ? '#ecf5ff' : '#FFFFFF'"
          :class="currentRoute == tag.path ? 'actice' : 'normal'"
          :closable="index != 0"
          size="large"
          :checked="currentRoute == tag.path"
          @close="handleClose(tag)"
          @click="hanldeClick(tag)"
        >
          {{ tag.name }}
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { pathMapToMenu } from "@/utils/map-menu";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const dynamicTags = ref([]);
const currentRoute = ref("");

watch(
  () => route.path,
  (newValue) => {
    currentRoute.value = newValue;
    if (!dynamicTags.value.length) {
      dynamicTags.value.push({ name: "首页", path: "/main/welcome" });
    }
    if (dynamicTags.value.map((item) => item.path).includes(newValue)) return;
    const menu = pathMapToMenu(userMenus.value, newValue);
    if (!menu) return;
    dynamicTags.value.push(menu);
  },
  {
    immediate: true,
  }
);
const hanldeClick = (tag) => {
  if (tag.path == currentRoute.value) return;
  console.log("tiaozhuan ");

  router.replace({
    path: tag.path,
  });
};
const handleClose = (tag) => {
  const index = dynamicTags.value.findIndex((item) => item.path == tag.path);
  router.replace({
    path: dynamicTags.value[index - 1].path,
  });

  dynamicTags.value.splice(index, 1);
};
</script>
<style lang="scss" scoped>
.scrollbar-flex-content {
  display: flex;
}
.tag-list {
  padding: 0 0 10px 0;
  margin-bottom: 10px;
  .actice {
    color: var(--el-color-primary);
  }
  .normal {
    color: #909399;
  }
  .item {
    margin-right: 10px;
    flex-shrink: 0;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
