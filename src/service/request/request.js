import axios from "axios";
import { ElLoading, ElNotification, ElMessage } from "element-plus";
class YCRequest {
  config = null;
  interceptorHooks = null;
  showLoading = true;
  instance = null;
  showReault = false; //操作成功提示符
  constructor(options) {
    this.config = options;
    this.interceptorHooks = options.interceptorHooks;
    this.showLoading = options.showLoading ?? true;
    this.showReault = options.showReault ?? false;
    this.instance = axios.create(options);
    this.setupInterceptor();
  }
  //全局响应拦截
  setupInterceptor() {
    this.instance.interceptors.request.use(
      this.interceptorHooks?.requestInterceptor,
      this.interceptorHooks?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    );

    this.instance.interceptors.request.use((config) => {
      const { showLoading } = config;
      if (showLoading) {
        this.loadingInstance = ElLoading.service({ fullscreen: true }); //控制spin
      }
      return config;
    });
    //全局响应成功失败拦截
    this.instance.interceptors.response.use(
      (res) => {
        //响应成功拦截
        this.showLoading && this.loadingInstance?.close();
        return res;
      },
      (err) => {
        //响应失败拦截
        this.showLoading && this.loadingInstance?.close();
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    );
  }

  request(config) {
    this.showLoading = config.showLoading;
    this.showReault = config.showReault;
    const { sucessTips } = config;
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
          this.showLoading = true;
          this.showReault &&
            ElNotification({
              title: "成功",
              message: sucessTips ?? "操作成功",
              type: "success",
              duration: 3000,
            });
        })
        .catch((err) => {
          reject(err);
          this.showLoading = true;

          if (err?.data?.code == -401 || err.code == "ERR_CANCELED") return;
          ElMessage.error(
            err?.data?.msg[0].message || err.data.msg || "请求超时,请检查网络"
          );
        });
    });
  }

  get(config) {
    return this.request({
      showReault: false,
      showLoading: false,
      ...config,
      method: "GET",
    });
  }

  post(config) {
    return this.request({
      showReault: false,
      showLoading: true,
      ...config,
      method: "POST",
    });
  }

  delete(config) {
    return this.request({
      showReault: true,
      showLoading: true,
      ...config,
      method: "DELETE",
    });
  }

  patch(config) {
    return this.request({
      showReault: false,
      showLoading: true,
      ...config,
      method: "PATCH",
    });
  }
}

export default YCRequest;
