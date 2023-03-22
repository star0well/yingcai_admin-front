export const contentTableConfig = {
  propList: [
    // { prop: "goodsName", type: "expand", slotName: "more_img" },
    { prop: "name", label: "商品名称" },
    { prop: "activityTime", label: "活动开始时间" },
    {
      prop: "img_url",
      label: "商品图片",
      slotName: "img_url",
    },
    {
      prop: "createdAt",
      label: "创建时间",
    },
    {
      label: "操作",
      prop: "pid",

      slotName: "operation",
    },
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  //childrenProps 将直接传入elTable
  childrenProps: {},
};
export const searchList = [
  {
    type: "input",
    placeholder: "请输入商品名称",
    field: "name",
    label: "商品名称:",
  },

  {
    type: "daterange",
    placeholder: "请选择时间",
    field: "time",
    label: "创建时间:",
    options: [{ field: "beginTime" }, { field: "endTime" }],
  },
];

export const modalList = [
  {
    type: "input",
    label: "名称",
    field: "name",
    requireRules: true, //是否使用rules
    rules: [{ required: true, message: "请输入名称", trigger: "blur" }],
    span: 24,
  },
  {
    type: "upload",
    label: "图片",
    field: "_imgUrl",
    requireRules: true, //是否使用rules
    rules: [{ required: true, message: "请输入名称", trigger: "change" }],
    span: 24,
  },

  {
    type: "datetime",
    label: "活动时间",
    field: "activityTime",
    requireRules: true, //是否使用rules
    rules: [{ required: true, message: "请选择时间", trigger: "change" }],
    span: 24,
  },
];
