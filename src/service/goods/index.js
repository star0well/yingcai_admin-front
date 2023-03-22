import request from "@/service/index";

export const addGoods = (data) => {
  return request.post({
    url: "/goods",
    data,
    sucessTips: "添加成功",
    showReault: true,
    showLoading: true,
  });
};
export const deleteGoods = (id) => {
  return request.delete({
    url: "/goods/" + id,
  });
};
export const patchGoods = (data) => {
  return request.patch({
    url: "/goods/" + data.id,
    data,
  });
};

export const getGoods = (data) => {
  return request.get({
    url: "/goods",
    params: data,
  });
};
export const getAllGoods = (data) => {
  return request.get({
    url: "/goods/list",
    params: data,
  });
};
