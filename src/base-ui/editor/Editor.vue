<template>
  <div ref="editorRef" class="zl-editor" :style="{ width: width ? `${width}px` : '100%' }"></div>
</template>

<script>
import { defineComponent, watch, onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { API_BASE_URL } from "@/service/request/config";
import WangEditor from "wangeditor";
import { imgUpload } from "@/service/public/public";
export default defineComponent({
  components: {},
  props: {
    // 默认显示的文本
    // defaultHtmlStr: {
    //   type: String,
    //   default: ''
    // },
    // 数据双向绑定
    value: {
      type: String,
      default: "",
    },
    zIndex: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 300,
    },
    width: {
      type: Number,
      default: 0,
    },
    focus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:value", "onChangeValue"],

  setup(props, { emit }) {
    const editorRef = ref(null);
    const isInitContent = ref(false);
    const content = reactive({
      html: "",
      text: "",
    });
    const instance = ref(null);
    const isChange = ref(false);
    watch(
      () => props.value,
      () => {
        if (!isChange.value) {
          initEditorContent(props.value, true);
        }
        isChange.value = false;
      },
    );

    onMounted(() => {
      createWangEditor();
    });

    onBeforeUnmount(() => {
      if (!instance.value) return;
      instance.value.destroy();
      instance.value = null;
    });

    const createWangEditor = () => {
      instance.value = new WangEditor(editorRef.value);
      // Object.assign(instance.value.config, {
      //   onchange(newHtml) {
      //     console.log("change", newHtml);
      //   },
      // });
      setEditorConfig();
      instance.value.create();
      // create 之后才能初始化
      // initEditorContent(props.defaultHtmlStr)
      let initVal = props.value;
      if (props.disabled) {
        instance.value.disable();
        initVal = initVal ? initVal : "<div>&nbsp;</div>";
      }
      initEditorContent(initVal);
    };

    const initEditorContent = (htmlStr, isFocus = false) => {
      if (!instance.value) return;
      const editor = instance.value;
      editor.config.focus = isFocus;
      if (!htmlStr) return;
      isInitContent.value = true;
      editor.txt.html(htmlStr);
    };

    const setEditorConfig = () => {
      if (!instance.value) return;
      const editor = instance.value;
      // 设置编辑区域高度为 500px
      editor.config.height = props.height;
      // 设计z-index
      editor.config.zIndex = props.zIndex;
      // 取消自动 focus
      editor.config.focus = props.focus;
      // 配置 onchange 回调函数
      editor.config.onchange = function (newHtml) {
        isChange.value = true;
        content.html = newHtml;
        content.text = editor.txt.text();
        if (!isInitContent.value) {
          emit("update:value", content.html);
          emit("onChangeValue", content.html, content.text);
        }
        // 最后标记为 false
        isInitContent.value = false;
      };
      editor.config.showLinkImg = false;
      // editor.config.uploadImgShowBase64 = true
      editor.config.customUploadImg = async function (resultFiles, insertImgFn) {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法

        for (const file of resultFiles) {
          const res = await imgUpload(file, { showReault: false, showLoading: false });
          if (res.code == 0) {
            insertImgFn(API_BASE_URL + "/" + res.data.fileInfo.fileUrl);
          }
        }
      };
      // 配置触发 onchange 的时间频率，默认为 200ms
      editor.config.onchangeTimeout = 200; // 修改为 500ms
      // 配置菜单栏，删减菜单，调整顺序
      if (props.disabled) {
        editor.config.showFullScreen = false;
        editor.config.menus = [];
      } else {
        editor.config.menus = [
          "head",
          "bold",
          "fontSize",
          "fontName",
          "italic",
          "underline",
          "strikeThrough",
          "indent",
          "lineHeight",
          "foreColor",
          "backColor",
          "link",
          "list",
          // 'todo',
          "justify",
          "quote",
          // 'emoticon',
          "image",
          // 'video',
          // 'table',
          "code",
          "emoji",
          "splitLine",
          "undo",
          "redo",
        ];
      }
    };

    return {
      editorRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.zl-editor {
  text-align: left;
  &:deep(.w-e-text-container) {
    min-height: 200px !important;
  }
}
</style>
