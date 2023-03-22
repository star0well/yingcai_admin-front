<template>
  <div class="goods">
    <PageContent
      ref="pageConentRef"
      v-bind="contentTableConfig"
      :datas-fn="getGoods"
      :search-list="searchList"
    >
      <template #searchBtn>
        <el-button @click="hanldeAddgoods">添加</el-button>
      </template>
      <template #img_url="{ row }">
        <el-image class="img" :src="getImg(row.imgUrl)[0]"></el-image>
      </template>
      <template #operation="{ row }">
        <el-button @click="hanldeDetail(row)" size="small">详情</el-button>
        <TipsBtn
          btn-name="删除"
          content="确认删除?"
          size="small"
          @on-confirm="hanldeDelete(row)"
        ></TipsBtn>

        <el-button size="small" @click="hanldePatch(row)">修改</el-button>
      </template>
    </PageContent>

    <PageModal
      ref="addRef"
      :form-field-list="modalList"
      :title="currenType == 0 ? '添加商品' : '修改商品'"
      @submit="confirmAddgoods"
      :uploadLimit="6"
    >
    </PageModal>
  </div>
</template>

<script setup>
import TipsBtn from "@/base-ui/tipsBtn/tipsBtn.vue";
import PageContent from "@/components/pageContent.vue";
import { contentTableConfig, searchList, modalList } from "./goods.config";
import {
  getGoods,
  addGoods,
  deleteGoods,
  patchGoods,
} from "@/service/goods/index";
import PageModal from "@/components/pageModal.vue";
import { getImg } from "@/utils/uitls";
import { onMounted, ref } from "vue";
const pageConentRef = ref();
const addRef = ref();
const currenType = ref(0); //0 添加 1 修改 2详情
const hanldeAddgoods = () => {
  currenType.value = 0;
  addRef.value.formData = {};

  addRef.value.open();
};
const confirmAddgoods = async (item) => {
  item.imgUrl = item._imgUrl.map((item) => item._url).join(",");
  try {
    switch (currenType.value) {
      case 0:
        await addGoods(item);
        break;
      case 1:
        await patchGoods(item);
        break;
      default:
        break;
    }
    addRef.value.close();
    pageConentRef.value.getDatas();
  } catch (error) {}
};

const hanldeDelete = async ({ id }) => {
  await deleteGoods(id);
  pageConentRef.value.getDatas();
};

const hanldePatch = async (row) => {
  currenType.value = 1;
  addRef.value.formData = {
    ...row,
    _imgUrl: hanldeUploadImg(row.imgUrl),
  };
  addRef.value.open();
};

const hanldeDetail = (row) => {
  currenType.value = 2;
  addRef.value.formData = {
    ...row,
    _imgUrl: hanldeUploadImg(row.imgUrl),
  };

  addRef.value.open();
};

onMounted(() => {});
const hanldeUploadImg = (imgurl) => {
  return imgurl.split(",").map((item) => ({
    url: import.meta.env.VITE_IMAGE_URL + "/" + item,
    _url: item,
  }));
};
</script>

<style scoped lang="scss">
.goods {
  .img {
    width: 80px;
    height: 80px;
  }
}
</style>
