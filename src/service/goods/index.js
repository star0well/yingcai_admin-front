import request from "@/service/index";

export const addGoods = (data) => {
  return request.post({
    url: "/api/goods",
    data,
    sucessTips: "添加成功",
    showReault: true,
    showLoading: true,
  });
};
export const deleteGoods = (id) => {
  return request.delete({
    url: "/api/goods/" + id,
  });
};
export const patchGoods = (data) => {
  return request.patch({
    url: "/api/goods/" + data.id,
    data,
  });
};

export const getGoods = (data) => {
  return request.get({
    url: "/api/goods",
    params: data,
  });
};
export const getAllGoods = (data) => {
  return request.get({
    url: "/api/goods/list",
    params: data,
  });
};
