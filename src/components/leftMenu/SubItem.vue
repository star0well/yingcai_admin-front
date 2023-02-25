<template>
  <template v-for="item of menuList" :key="item.id">
    <template v-if="item.type == 1">
      <el-sub-menu :index="item.id">
        <template #title>
          <el-icon>
            <component :is="icons[item.icon]" />
          </el-icon>
          <span>{{ item.name }}</span>
        </template>
        <template v-if="item.type == 1">
          <SubItem
            :menu-list="item.children"
            @clickSubItem="handleMenuItemClick"
          ></SubItem>
        </template>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item
        v-if="item.type == 2"
        :key="item.id"
        :index="item.id"
        @click="handleMenuItemClick(item)"
      >
        <el-icon v-if="item.icon">
          <component :is="icons[item.icon]" :iconName="item.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup>
import { icons } from "@/global/register-icon";
defineProps({
  menuList: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["clickSubItem"]);
const handleMenuItemClick = (subItem) => {
  emit("clickSubItem", subItem);
};
</script>
<style lang="scss" scoped>
.log {
  width: 16px;
  height: 16px;
  margin-left: 5px;
}
</style>
