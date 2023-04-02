import request from "@/service/index";

export const userAdd = (data) => {
  return request.post({
    url: "/api/user",
    data,
    sucessTips: "添加成功",
    showReault: true,
    showLoading: true,
  });
};
export const userDelete = (id) => {
  return request.delete({
    url: "/api/user/" + id,
  });
};
export const userPatch = (data) => {
  return request.patch({
    url: "/api/user/" + data.id,
    data,
  });
};

export const userGet = (data) => {
  return request.get({
    url: "/api/user",
    params: data,
  });
};
