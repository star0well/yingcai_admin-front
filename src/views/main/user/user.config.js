import { ref } from "vue";

export const contentTableConfig = {
  propList: [
    // { prop: "goodsName", type: "expand", slotName: "more_img" },
    { prop: "name", label: "角色名称" },
    {
      prop: "describe",
      label: "描述",
      formatter: (row) => {
        return row.roleList.map((item) => item.name).join(",");
      },
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
  childrenProps: {
    rowKey: "id",
  },
};
export const searchList = [
  {
    type: "input",
    placeholder: "请输入订单号",
    field: "name",
    label: "名称:",
  },
  {
    type: "input",
    placeholder: "请输入商品名称",
    field: "path",
    label: "路径:",
  },
  {
    type: "daterange",
    placeholder: "请选择时间",
    field: "time",
    label: "创建时间:",
    options: [{ field: "beginTime" }, { field: "endTime" }],
  },
];
export const currentMode = ref(0);

export const modalList = ref([
  {
    type: "input",
    label: "名称",
    field: "name",
    requireRules: true, //是否使用rules
    rules: [{ required: true, message: "请输入名称", trigger: "blur" }],
    span: 24,
  },
  {
    type: "input",
    label: "密码",
    field: "password",
    requireRules: true, //是否使用rules
    rules: [{ required: true, message: "请输入密码", trigger: "blur" }],
    span: 24,
  },
  {
    type: "select",
    label: "角色",
    field: "roleIds",
    requireRules: true, //是否使用rules
    rules: [{ required: true, message: "请选择角色", trigger: "change" }],
    span: 24,
    otherProps: {
      multiple: true,
    },
  },
]);
export const detailFiledList = [
  {
    field: "order_no",
    label: "订单号",
  },
  {
    soltName: "goods_status",
  },
  {
    field: "order_address.name",
    label: "收货人",
  },
  {
    field: "order_address.phone",
    label: "联系电话",
  },
  {
    field: "order_address.detail",
    label: "收货地址",
  },

  {
    soltName: "goods_detail",
  },
  // {
  //   field: "goods_name",
  //   label: "商品名称",
  //   soltName: "goods_name",
  // },
  // {
  //   field: "img",
  //   label: "商品图片",
  //   soltName: "goods_img",
  // },
  // {
  //   field: "order_goods.goods_spec_name",
  //   label: "规格",
  //   soltName: "goods_spec_name",
  // },
  {
    field: "order_price",
    label: "订单总价",
  },
  {
    field: "points_money",
    label: "禾元积分抵扣",
  },
  {
    field: "pay_price",
    label: "实际支付",
  },
  {
    field: "express_no",
    label: "物流单号",
  },
  {
    field: "delivery_time",
    label: "发货时间",
  },
  { soltName: "expressInfo" },
];
