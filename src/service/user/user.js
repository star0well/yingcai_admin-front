import request from "@/service/index";

export const userAdd = (data) => {
  return request.post({
    url: "/user",
    data,
    sucessTips: "添加成功",
    showReault: true,
    showLoading: true,
  });
};
export const userDelete = (id) => {
  return request.delete({
    url: "/user/" + id,
  });
};
export const userPatch = (data) => {
  return request.patch({
    url: "/user/" + data.id,
    data,
  });
};

export const userGet = (data) => {
  return request.get({
    url: "/user",
    params: data,
  });
};

