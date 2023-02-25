<template>
  <div class="header">
    <el-form :inline="true">
      <el-form-item v-for="(searchItem, index) of props.searchList" :key="index" :label="searchItem.label">
        <el-input
          clearable
          v-if="searchItem.type == 'input'"
          v-model="form[searchItem.field]"
          :placeholder="searchItem.placeholder">
        </el-input>
        <el-radio-group v-if="searchItem.type == 'radio'" v-model="form[searchItem.field]">
          <el-radio v-for="item of searchItem.options" :label="item.label" :key="item.label">{{ item.text }}</el-radio>
        </el-radio-group>
        <el-select
          v-if="searchItem.type == 'select'"
          v-model="form[searchItem.field]"
          clearable
          :placeholder="searchItem.placeholder"
          v-bind="searchItem.otherProps">
          <el-option
            :label="item.label"
            :value="item.value"
            :key="index"
            v-for="(item, index) of searchItem.options"></el-option>
        </el-select>
        <el-date-picker
          v-if="searchItem.type == 'daterange'"
          v-model="form[searchItem.field]"
          @change="timeChange($event, searchItem.field, searchItem.options)"
          type="datetimerange"
          format="YYYY-MM-DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button @click="reset" type="primary">
          <el-icon class="el-icon--left"><Refresh /></el-icon>
          重置</el-button
        >
        <el-button @click="search" type="primary">
          <el-icon class="el-icon--left"><Search /></el-icon>
          搜索</el-button
        >
        <slot name="btn"></slot>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { Refresh, Search } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
const emits = defineEmits(["search"]);
const props = defineProps({
  searchParams: {
    type: Object,
    default: () => ({}),
  },
  searchList: {
    type: Array,
    default: () => [],
  },
});

const form = ref({});
onMounted(() => {
  form.value = props.searchParams;
});
const timeChange = (e, field, options) => {
  options.forEach((item, index) => {
    form.value[item.field] = e?.[index] ?? undefined;
  });
};
const search = () => {
  emits("search", form.value);
};
const reset = () => {
  form.value = {};
  search();
};
</script>
<style scoped lang="scss">
.header {
  height: 100%;
}
</style>
