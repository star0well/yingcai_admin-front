<template>
  <div class="menu">
    <PageContent
      ref="pageConentRef"
      v-bind="contentTableConfig"
      :datas-fn="roleGet"
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
    >
      <template #other>
        <el-form labelWidth="80px">
          <el-form-item label="选择权限">
            <el-tree
              :props="{ label: 'name', children: 'children' }"
              :data="menuTree"
              show-checkbox
              @check="handleCheckChange"
              node-key="id"
              :default-checked-keys="checkIds"
              ref="treeRef"
            />
          </el-form-item>
        </el-form>
      </template>
    </PageModal>
  </div>
</template>

<script setup>
import TipsBtn from "@/base-ui/tipsBtn/tipsBtn.vue";
import PageContent from "@/components/pageContent.vue";
import { contentTableConfig, searchList, modalList } from "./roles.config";
import { roleGet, rolePatch, roleDelete, roleAdd } from "@/service/role/role";
import PageModal from "@/components/pageModal.vue";
import { onMounted, ref } from "vue";
import { getMenu } from "@/service/menu";
const pageConentRef = ref();
const addRef = ref();
const currenType = ref(0); //0 添加 1 修改 2详情
const hanldeAddmenu = () => {
  currenType.value = 0;
  addRef.value.formData = {};

  addRef.value.open();
};
const confirmAddmenu = async (item) => {
  item.menuIds = checkIds.value.map((item) => item + "");
  try {
    switch (currenType.value) {
      case 0:
        await roleAdd(item);
        break;
      case 1:
        await rolePatch(item);
        break;
      default:
        break;
    }
    addRef.value.close();
    pageConentRef.value.getDatas();
  } catch (error) {}
};

const hanldeDelete = async ({ id }) => {
  await roleDelete(id);
  pageConentRef.value.getDatas();
};

const hanldePatch = async (row) => {
  currenType.value = 1;
  addRef.value.formData = { ...row };

  checkIds.value = row.menuList.map((item) => item.id);
  addRef.value.open();
};

const hanldeDetail = (row) => {
  currenType.value = 2;
  addRef.value.formData = { ...row };
  checkIds.value = row.menuList.map((item) => item.id);

  addRef.value.open();
};

onMounted(() => {
  getTreeMenus();
});

const menuTree = ref([]);
const checkIds = ref([]);
const getTreeMenus = async () => {
  const res = await getMenu();
  menuTree.value = res.data.list;
};

const handleCheckChange = (data, checked) => {
  checkIds.value = checked.checkedKeys;
};
</script>

<style scoped>
.menu {
}
</style>
