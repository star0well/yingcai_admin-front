<template>
  <div class="menu">
    <PageContent
      ref="pageConentRef"
      v-bind="contentTableConfig"
      :datas-fn="getMenu"
      :search-list="searchList"
    >
      <template #searchBtn>
        <el-button @click="hanldeAddmenu">添加</el-button>
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
      :title="currenType == 0 ? '添加菜单' : '修改菜单'"
      @submit="confirmAddmenu"
      :select-options="selectOptions"
    >
    </PageModal>
  </div>
</template>

<script setup>
import TipsBtn from "@/base-ui/tipsBtn/tipsBtn.vue";
import PageContent from "@/components/pageContent.vue";
import { contentTableConfig, searchList, modalList } from "./menu.config";
import {
  getMenu,
  addMenu,
  deleteMenu,
  patchMenu,
  getAllMenu,
} from "@/service/menu/index";
import PageModal from "@/components/pageModal.vue";
import { onMounted, ref } from "vue";
const pageConentRef = ref();
const addRef = ref();
const currenType = ref(0); //0 添加 1 修改 2详情
const hanldeAddmenu = () => {
  currenType.value = 0;
  addRef.value.formData = {};

  addRef.value.open();
};
const confirmAddmenu = async (item) => {
  try {
    switch (currenType.value) {
      case 0:
        await addMenu(item);
        break;
      case 1:
        await patchMenu(item);
        break;
      default:
        break;
    }
    addRef.value.close();
    pageConentRef.value.getDatas();
  } catch (error) {}
};

const hanldeDelete = async ({ id }) => {
  await deleteMenu(id);
  pageConentRef.value.getDatas();
};

const hanldePatch = async (row) => {
  currenType.value = 1;
  addRef.value.formData = { ...row };
  addRef.value.open();
};

const hanldeDetail = (row) => {
  currenType.value = 2;
  addRef.value.formData = { ...row };
  addRef.value.open();
};

const selectOptions = ref({});
const hanldeAllMenus = async () => {
  const { data } = await getAllMenu();
  console.log(data, "data");
  selectOptions.value["pid"] = data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  console.log(selectOptions.value);
};
onMounted(() => {
  hanldeAllMenus();
});
</script>

<style scoped>
.menu {
}
</style>
