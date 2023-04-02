import request from "@/service/index";

const userlogin = (data) => {
  return request.post({
    url: "/api/auth/login",
    data,
  });
};
const userRegister = (data) => {
  return request.post({
    url: "/api/auth/register",
    data,
  });
};
const getUserInfo = (params, config) => {
  return request.get({
    url: "/api/auth/current",
    params,
    ...config,
  });
};
export { userlogin, getUserInfo, userRegister };
