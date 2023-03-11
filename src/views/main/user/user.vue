<template>
  <div class="menu">
    <PageContent
      ref="pageConentRef"
      v-bind="contentTableConfig"
      :datas-fn="userGet"
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
      :select-options="selectOptions"
      :title="currenType == 0 ? '添加用户' : '修改用户'"
      @submit="confirmAddmenu"
      :sorce-form-data="itemInfo"
    >
    </PageModal>
  </div>
</template>

<script setup>
import TipsBtn from "@/base-ui/tipsBtn/tipsBtn.vue";
import PageContent from "@/components/pageContent.vue";
import { contentTableConfig, searchList, modalList } from "./user.config";
import { userAdd, userDelete, userGet, userPatch } from "@/service/user/user";
import PageModal from "@/components/pageModal.vue";
import { onMounted, ref } from "vue";
import { roleGet } from "@/service/role/role";

const pageConentRef = ref();
const addRef = ref();
const currenType = ref(0); //0 添加 1 修改 2详情
const itemInfo = ref({});
const hanldeAddmenu = () => {
  currenType.value = 0;
  addRef.value.open();
};

const confirmAddmenu = async (item) => {
  try {
    switch (currenType.value) {
      case 0:
        await userAdd(item);
        break;
      case 1:
        await userPatch(item);
        break;
      default:
        break;
    }
    addRef.value.clearFormValidate("userIds");

    addRef.value.close();

    pageConentRef.value.getDatas();
  } catch (error) {}
};

const hanldeDelete = async ({ id }) => {
  await userDelete(id);
  pageConentRef.value.getDatas();
};

const hanldePatch = async (row) => {
  currenType.value = 1;
  itemInfo.value = {
    ...row,
    roleIds: row.roleList.map((item) => item.roleId),
  };

  addRef.value.open();
};

const hanldeDetail = (row) => {
  currenType.value = 2;
  itemInfo.value = {
    ...row,
    roleIds: row.roleList.map((item) => item.roleId),
  };

  addRef.value.open();
};

onMounted(() => {
  getAllRoles();
});
const selectOptions = ref({});

const getAllRoles = async () => {
  const res = await roleGet();
  selectOptions.value["roleIds"] = res.data.list.map((item) => ({
    label: item.name,
    value: item.id,
  }));
};
</script>

<style scoped>
.menu {
}
</style>
