<template>
  <el-upload
    class="upload"
    :class="limit > fileList.length && !disabled ? 'can' : 'disabel'"
    v-model:file-list="fileList"
    :action="action"
    :headers="headers"
    list-type="picture-card"
    :limit="limit"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="hanldeSuccess"
    :before-upload="hanldeBefore"
    multiple
    :disabled="disabled"
    accept="image/*"
  >
    <el-icon v-if="limit > fileList.length && !disabled"><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img class="pre-img" w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { nextTick, ref, watchEffect } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { API_BASE_URL } from "@/service/request/config";
import { ElMessage } from "element-plus";
const props = defineProps({
  limit: {
    type: [Number, String],
    default: 6,
  },
  action: {
    type: String,
    default: API_BASE_URL + "/upload/image",
  },
  headers: {
    type: Object,
    default: () => ({
      Authorization: "Bearer +token",
    }),
  },
  list: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 1024 * 1024 * 2,
  },
});
const emit = defineEmits(["change", "update:list"]);
const uploadChange = ref(false);

const fileList = ref([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
watchEffect(() => {
  if (uploadChange.value) return;
  fileList.value = props.list;
});

const change = () => {
  if (
    fileList.value.filter((item) => item.status == "success").length !=
    fileList.value.length
  )
    return;

  const imgArray = fileList.value.map((item) => {
    return item._url
      ? {
          url: import.meta.env.VITE_IMAGE_URL + "/" + item._url,
          _url: item._url,
        }
      : {
          url: import.meta.env.VITE_IMAGE_URL + "/" + item.response?.data?.path,
          _url: item.response?.data?.path,
        };
  });
  emit("update:list", imgArray);
  emit("change", imgArray);
};
const hanldeSuccess = () => {
  uploadChange.value = true;
  change();
};

const handleRemove = () => {
  change();
};

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
};
const hanldeBefore = (rawFile) => {
  if (rawFile.size > props.size) {
    ElMessage.error("请上传2M以下的图片");
    return false;
  }
};
defineExpose({
  fileList,
});
</script>
<style scoped lang="scss">
.upload {
  :deep(.el-upload-list--picture-card) {
    --el-upload-list-picture-card-size: 70px;
  }
}
.can {
  :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: 70px;
  }
}
.disabel {
  :deep(.el-upload--picture-card) {
    --el-upload-picture-card-size: 0;
  }
}
.pre-img {
  width: 100%;
}
</style>
