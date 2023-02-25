import request from "@/service/index";

const userlogin = (data) => {
  return request.post({
    url: "/auth/login",
    data,
  });
};
const userRegister = (data) => {
  return request.post({
    url: "/auth/register",
    data,
  });
};
const getUserInfo = (params, config) => {
  return request.get({
    url: "/auth/current",
    params,
    ...config,
  });
};
export { userlogin, getUserInfo, userRegister };
