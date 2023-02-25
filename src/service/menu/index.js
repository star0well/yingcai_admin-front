import request from "@/service/index";

export const addMenu = (data) => {
  return request.post({
    url: "/menus",
    data,
    sucessTips: "添加成功",
    showReault: true,
    showLoading: true,
  });
};
export const deleteMenu = (id) => {
  return request.delete({
    url: "/menus/" + id,
  });
};
export const patchMenu = (data) => {
  return request.patch({
    url: "/menus/" + data.id,
    data,
  });
};

export const getMenu = (data) => {
  return request.get({
    url: "/menus",
    params: data,
  });
};
export const getAllMenu = (data) => {
  return request.get({
    url: "/menus/list",
    params: data,
  });
};
