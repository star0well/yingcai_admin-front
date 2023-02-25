<template>
  <el-upload
    class="upload"
    :class="limit > fileList.length && !disabled ? 'can' : 'disabel'"
    v-model:file-list="fileList"
    :action="props.action"
    :headers="props.headers"
    list-type="picture-card"
    :limit="limit"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="hanldeSuccess"
    :before-upload="hanldeBefore"
    multiple
    :disabled="disabled"
    accept="image/*">
    <el-icon v-if="limit > fileList.length && !disabled"><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img class="pre-img" w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
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
    default: API_BASE_URL + "/api/upload/upImg",
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

watch(
  () => props.list,
  (newV) => {
    fileList.value = newV;
  },
);

const fileList = ref([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const change = () => {
  if (fileList.value.filter((item) => item.status == "success").length != fileList.value.length) return;

  const imgArray = fileList.value.map((item) => {
    return item._url
      ? { url: item._url, _url: item._url }
      : {
          url: API_BASE_URL + "/" + item.response?.data?.fileInfo?.fileUrl,
          _url: API_BASE_URL + "/" + item.response?.data?.fileInfo?.fileUrl,
        };
  });
  emit("update:list", imgArray);
  emit("change", imgArray);
};
const hanldeSuccess = () => {
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
