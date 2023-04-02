import request from "@/service/index";

export const addMenu = (data) => {
  return request.post({
    url: "/api/menus",
    data,
    sucessTips: "添加成功",
    showReault: true,
    showLoading: true,
  });
};
export const deleteMenu = (id) => {
  return request.delete({
    url: "/api/menus/" + id,
  });
};
export const patchMenu = (data) => {
  return request.patch({
    url: "/api/menus/" + data.id,
    data,
  });
};

export const getMenu = (data) => {
  return request.get({
    url: "/api/menus",
    params: data,
  });
};
export const getAllMenu = (data) => {
  return request.get({
    url: "/api/menus/list",
    params: data,
  });
};
