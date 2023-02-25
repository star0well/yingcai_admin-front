<template>
  <div ref="baseEchart" class="base-echart">
    <div ref="echartDivRef" class="echart-div" :style="{ height: height }"></div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect, defineComponent, nextTick } from "vue";
import useEchart from "./hooks/useEchart.js";
export default defineComponent({
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const height = ref("460px");
    const baseEchart = ref();
    const echartDivRef = ref();
    onMounted(() => {
      setTimeout(() => {
        height.value = baseEchart.value.offsetHeight + "px";
        nextTick(() => {
          const { setOptions } = useEchart(echartDivRef.value);
          watchEffect(() => {
            setOptions(props.options);
          });
        });
      }, 2000);
    });
    return { height, baseEchart, echartDivRef };
  },
});
</script>

<style lang="scss" scoped>
.base-echart {
  width: 100%;
  height: 100%;
  .echart-div {
    width: 100%;
  }
}
</style>
