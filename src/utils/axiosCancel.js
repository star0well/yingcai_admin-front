import axios from "axios";
// 存储pengding请求容器
export const pendingList = new Map();
// 生成各个请求标识
export const getFetchKey = (config) => {
  const { url, data, method } = config;
  let token;
  if (method === "get") {
    token = [method, url].join("&");
  } else {
    token = [method, url, JSON.stringify(data)].join("&");
  }
  return token;
};
// 添加pengding请求
export const addPending = (config) => {
  const fetchKey = getFetchKey(config);
  if (fetchKey) {
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingList.has(fetchKey)) {
          pendingList.set(fetchKey, cancel);
        }
      });
  }
};
// 移除pengding请求
export const removePending = (config) => {
  const fetchKey = getFetchKey(config);
  if (fetchKey) {
    if (pendingList.has(fetchKey)) {
      pendingList.delete(fetchKey);
    }
  }
};
// 取消请求
export const cancelPending = (config) => {
  const fetchKey = getFetchKey(config);
  if (fetchKey) {
    if (pendingList.has(fetchKey)) {
      const cancel = pendingList.get(fetchKey);
      cancel("cancel");
      pendingList.delete(fetchKey);
    }
  }
};
