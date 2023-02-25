<template>
  <el-dialog
    :title="props.title"
    v-model="visible"
    :close-on-click-modal="false"
    :width="width"
    @close="hanldeDialogClose"
    destroy-on-close
  >
    <template>
      <slot name="inner"></slot>
    </template>
    <slot name="beforeContent"></slot>
    <slot name="content">
      <el-form
        ref="formRef"
        :model="formData"
        :label-width="labelWidth"
        :label-position="labelPosition"
      >
        <el-row :gutter="20">
          <el-col
            :span="formItem.span ?? 24"
            v-for="(formItem, index) of formFieldList"
            :key="index"
          >
            <!-- requireRules 是否一直校验-->
            <el-form-item
              class="form-item"
              :label="formItem.label"
              :rules="
                formItem.requireRules ||
                props.checkList.includes(formItem.field)
                  ? formItem.rules
                  : []
              "
              :prop="formItem.field"
            >
              <el-tooltip
                v-if="formItem.tips"
                effect="dark"
                :content="formItem.tips"
                placement="top-start"
              >
                <el-icon class="toolTips" size="12"
                  ><Warning color="#409EFC"
                /></el-icon>
              </el-tooltip>
              <el-input
                v-model="formData[formItem.field]"
                v-if="formItem.type == 'input'"
                :placeholder="formItem.placeholder"
                @blur="hanldeblur(formItem.field)"
                :disabled="
                  formItem.disabled || disabledArray.includes(formItem.field)
                "
                clearable
              />
              <el-input
                v-model.number="formData[formItem.field]"
                v-if="formItem.type == 'input-number'"
                :placeholder="formItem.placeholder"
                @blur="hanldeblur(formItem.field)"
                :disabled="
                  formItem.disabled || disabledArray.includes(formItem.field)
                "
                clearable
              />
              <el-input
                v-model="formData[formItem.field]"
                type="textarea"
                v-if="formItem.type == 'textarea'"
                :placeholder="formItem.placeholder"
                :disabled="
                  formItem.disabled || disabledArray.includes(formItem.field)
                "
              />
              <el-select
                v-if="formItem.type == 'select'"
                v-model="formData[formItem.field]"
                filterable
                clearable
                :placeholder="formItem.placeholder"
                :disabled="
                  formItem.disabled || disabledArray.includes(formItem.field)
                "
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  :key="index"
                  v-for="(item, index) of selectOptions[formItem.field]"
                ></el-option>
              </el-select>
              <el-cascader
                v-model="formData[formItem.field]"
                v-if="formItem.type == 'cascader'"
                :placeholder="formItem.placeholder"
                :options="selectOptions[formItem.field]"
                filterable
                :props="formItem.props"
                clearable
              />
              <HyUpload
                :limit="uploadLimit"
                :headers="headers"
                v-if="formItem.type == 'upload'"
                v-model:list="formData[formItem.field]"
              ></HyUpload>
              <el-autocomplete
                v-if="formItem.type == 'autocomplete'"
                v-model="formData[formItem.field]"
                clearable
                :fetch-suggestions="formItem.autocompleteFn"
                placeholder="商户名称"
              />
              <div v-if="formItem.type == 'radio'">
                <el-radio-group v-model="formData[formItem.field]">
                  <el-radio
                    v-for="item of formItem.options"
                    :label="item.label"
                    :key="item.label"
                    >{{ item.text }}</el-radio
                  >
                </el-radio-group>
              </div>

              <div class="add" v-if="formItem.type == 'addIcon'">
                <el-icon size="32"
                  ><CirclePlus color="#409EFC" class="no-inherit"
                /></el-icon>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </slot>
    <slot name="other"></slot>
    <template v-slot:footer>
      <slot name="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </slot>
    </template>
  </el-dialog>
</template>

<script setup>
import localCache from "@/utils/cache";
import { CirclePlus, Warning } from "@element-plus/icons-vue";
import { nextTick, ref, watch } from "vue";
import HyUpload from "./HyUpload.vue";
/**
   * 公用弹窗
   * @param {title} 弹窗标题
   * @param {formFieldList} 弹窗内置表单组件字段配置文件 [{}]
   *
   *@param {sorceFormData} 父组件传递值

   *@param { labelWidth} el-form labelWidth
   *
   * @param {selectOptions} 父组件传递selsect组件选项 ps{[字段]:[{label:展示字段名 , value:1}]}
   * @param {checkList} 动态校验字段
   *
   *
   * formFieldList:配置文件说明：
   * ps：输入框规则 {
    type: "input", // 通过type 匹配对应 el-组件
    label: "表号", 传递 el-form ->label
    field: "meter_number", 字段名 提交表单数据 {meter_number:'1111'}
    requireRules: true,  校验字段
    placeholder: "请输入表号",
    rules: [{ required: true, message: "请输入表号", trigger: "blur" }],
     },
   * 选择框规则{

   }
   *
   */
const props = defineProps({
  title: {
    type: String,
    default: "默认标题",
  },
  formFieldList: {
    type: Array,
    default: () => [],
  },
  sorceFormData: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: String,
    default: "80px",
  },
  width: {
    type: [String, Number],
    default: "520px",
  },
  selectOptions: {
    type: Object,
    default: () => ({}),
  },
  checkList: {
    type: Array,
    default: () => [],
  },
  labelPosition: {
    type: String,
    default: "right",
  },
  disabledArray: {
    type: Array,
    default: () => [],
  },
  uploadLimit: {
    type: Number,
    default: 1,
  },
});
const TOKEN = localCache.getCathe("token");

const headers = {
  Authorization: "Bearer " + TOKEN,
};
const emit = defineEmits(["close", "submit", "inputChange", "onChange"]);
const visible = ref(false);
const isCheck = ref(false);
const formData = ref({});
const formRef = ref();
watch(
  () => props.sorceFormData,
  (newValue) => {
    nextTick(() => {
      formData.value = newValue && JSON.parse(JSON.stringify(newValue));
    });
  }
);
watch(
  () => formData.value,
  (newValue) => {
    emit("onChange", newValue);
  },
  {
    deep: true,
  }
);
const hanldeblur = (filed) => {
  emit("inputChange", filed, formData.value[filed]);
};

const hanldeDialogClose = () => {
  emit("close");
};
const close = () => {
  visible.value = false;
  isCheck.value = false;
};
const open = () => {
  formRef.value?.clearValidate();

  visible.value = true;
};
const clearFormValidate = (filed) => {
  formRef.value?.clearValidate(filed);
};
const submit = async () => {
  try {
    await formRef.value?.validate();
    emit("submit", formData.value);
  } catch (error) {
    console.log(error, "校验失败");
  }
};
defineExpose({
  open,
  close,
  clearFormValidate,
  formData,
});
</script>
<style lang="scss" scoped>
.tips {
  font-size: 12px;
}

.form-item {
  position: relative;
  .toolTips {
    position: absolute;
    left: -15px;
    top: 0px;
  }
}
</style>
