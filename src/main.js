import { createApp } from "vue";
import store from "@/store";
import router from "@/router";
import "@/global/register-el-style";
import { useUserStore } from "@/store/user";
import "@/assets/css/index.css";
import App from "./App.vue";
import "virtual:uno.css";

async function bootstrap() {
  const app = createApp(App);

  app.use(store);
  const userStore = useUserStore();
  await userStore.loadLocalCacheAction();
  app.use(router).mount("#app");
}
bootstrap();
