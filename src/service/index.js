import YCRequest from "./request/request";
import { API_BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";
import { ElMessageBox } from "element-plus";
import router from "@/router/index";
import { debounce } from "@/utils/uitls";
import store from "@/store/index";
import { addPending, removePending, cancelPending } from "@/utils/axiosCancel";
const tips = debounce(
  () => {
    ElMessageBox.confirm("登录过期,请重新登录", "提示", {
      type: "warning",
    })
      .then(() => {
        router.push({
          path: "/",
        });
      })
      .finally(() => {
        store.commit("initState");
      });
  },
  2000,
  true
);
const ycRequest = new YCRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    //设置请求头
    requestInterceptor: (config) => {
      // config.headers["Content-Type"] = "application/json";
      const TOKEN = localCache.getCathe("token");
      config.headers["Authorization"] = "Bearer " + TOKEN;
      cancelPending(config);
      addPending(config);
      return config;
    },
    //设置请求失败
    requestInterceptorCatch: (err) => {
      return err;
    },
    //给ycRequest设置单独响应成功拦截
    responseInterceptor: (res) => {
      removePending(res.config);
      //通过后端返回状态码判断状态 失败返回reject
      if (res.data.code == 0) {
        return res.data;
      }
      if (res.data.code == -401) {
        tips();
        return new Promise((resolve, reject) => {
          reject(res);
        });
      }

      return new Promise((resolve, reject) => {
        reject(res);
      });
    },
    //设置响应失败拦截
    responseInterceptorCatch: (err) => {
      removePending(err);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    },
  },
});
export const dowloadReq = new YCRequest({
  baseURL: API_BASE_URL,
  timeout: TIME_OUT,
  interceptorHooks: {
    //设置请求头
    requestInterceptor: (config) => {
      // config.headers["Content-Type"] = "application/json";
      const TOKEN = localCache.getCathe("token");
      config.headers["Authorization"] = "Bearer " + TOKEN;
      cancelPending(config);
      addPending(config);
      return config;
    },
    //设置请求失败
    requestInterceptorCatch: (err) => {
      return err;
    },
    //给ycRequest设置单独响应成功拦截
    responseInterceptor: (res) => {
      removePending(res.config);
      //通过后端返回状态码判断状态 失败返回reject
      if (res.data.code == -401) {
        tips();
        return new Promise((resolve, reject) => {
          reject(res);
        });
      }
      if (res.data.code == -1) {
        return new Promise((resolve, reject) => {
          reject(res);
        });
      }
      if (res.status == 200) {
        return res.data;
      }
      return new Promise((resolve, reject) => {
        reject(res);
      });
    },
    //设置响应失败拦截
    responseInterceptorCatch: (err) => {
      removePending(err);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    },
  },
});
export default ycRequest;
