<template>
  <BaseEchart :options="option"></BaseEchart>
</template>
<script setup>
import BaseEchart from "@/base-ui/echart/base-echart.vue";
import { computed } from "vue";
const props = defineProps({
  legend: {
    type: Object,
    default: () => ({}),
  },
  series: {
    type: Array,
    default: () => [],
  },
  xAxisData: {
    type: Array,
    default: () => [],
  },
});
const option = computed(() => {
  return {
    title: {
      text: "订单详情",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: props.legend,
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: props.series,
  };
});
</script>
<style lang="scss" scoped></style>
