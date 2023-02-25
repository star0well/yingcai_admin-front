<template>
  <div class="page-content">
    <div class="page-search">
      <SearchHeader
        :search-list="props.searchList"
        @search="hanldeSearch"
        :searchParams="props.searchParams"
      >
        <template #btn>
          <slot
            name="searchBtn"
            :searchForm="{ ...page, ...searchParams }"
          ></slot>
        </template>
      </SearchHeader>
    </div>
    <div class="pageTable">
      <el-table
        :data="dataList"
        max-height="70vh"
        v-bind="props.childrenProps"
        border
        style="width: 100%"
      >
        <el-table-column
          v-if="showSelectColumn"
          align="center"
          type="selection"
          width="50"
        ></el-table-column>
        <el-table-column
          v-if="props.showIndexColumn"
          type="index"
          align="center"
          label="序号"
          width="60"
        ></el-table-column>
        <el-table-column
          align="center"
          v-bind="item"
          v-for="(item, index) of props.propList"
          :key="index"
        >
          <template #default="scope" v-if="item.slotName">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}</slot
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-footer">
      <el-pagination
        background
        layout=" prev, pager, next,sizes"
        :total="dataTotal"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="hanldeCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import SearchHeader from "@/base-ui/searchHeader/searchHeader.vue";
import { onMounted, ref } from "vue";
const props = defineProps({
  propList: {
    type: Array,
    default: () => [],
  },
  childrenProps: {
    type: Object,
    default: () => ({}),
  },
  showSelectColumn: {
    type: Boolean,
    default: false,
  },
  showIndexColumn: {
    type: Boolean,
    default: false,
  },
  searchList: {
    type: Array,
    default: () => [],
  },
  datasFn: {
    type: Function,
    required: true,
  },
});

const searchParams = ref({});
const hanldeSearch = (e) => {
  searchParams.value = e;
  getDatas();
};

const page = ref({
  pageSize: 10,
  pageNum: 1,
});
//分页
const handleSizeChange = (e) => {
  page.value.pageSize = e;
  getDatas();
};
const hanldeCurrentChange = (e) => {
  page.value.pageNum = e;
  getDatas();
};
const dataList = ref([]);
const dataTotal = ref(0);
const getDatas = async () => {
  const res = await props.datasFn({
    ...page.value,
    ...searchParams.value,
  });
  dataList.value = res?.data?.list ?? [];
  dataTotal.value = res?.data?.total ?? 0;
};
onMounted(() => {
  getDatas();
});
defineExpose({
  getDatas,
});
</script>

<style lang="scss" scoped>
.page-content {
  .page-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
