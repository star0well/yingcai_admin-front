<template>
  <el-popover :visible="visible" placement="top" :width="160">
    <p>{{ content }}</p>
    <div style="text-align: right; margin: 0">
      <el-button size="small" text @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="hanldeConfirm">确认</el-button>
    </div>
    <template #reference>
      <el-button @click="visible = true" :size="size" :type="type">{{ btnName }}</el-button>
    </template>
  </el-popover>
</template>

<script setup>
import { ref } from "vue";
defineProps({
  content: {
    type: String,
    default: "删除后不可恢复,确认删除吗?",
  },
  btnName: {
    type: String,
    default: "删除",
  },
  size: {
    type: String,
  },
  type: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["onConfirm"]);
const visible = ref(false);

const hanldeConfirm = () => {
  emit("onConfirm");
  visible.value = false;
};
</script>
