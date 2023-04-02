import request from "@/service/index";

export const roleAdd = (data) => {
  return request.post({
    url: "/api/role",
    data,
    sucessTips: "添加成功",
    showReault: true,
    showLoading: true,
  });
};
export const roleDelete = (id) => {
  return request.delete({
    url: "/api/role/" + id,
  });
};
export const rolePatch = (data) => {
  return request.patch({
    url: "/api/role/" + data.id,
    data,
  });
};

export const roleGet = (data) => {
  return request.get({
    url: "/api/role",
    params: data,
  });
};
export const roleMenus = (data) => {
  return request.get({
    url: "/api/role/menus",
    params: data,
  });
};
