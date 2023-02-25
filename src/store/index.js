import { createPinia } from "pinia";
const pinia = createPinia();

async function registerStore(app) {
  // 1.use的pinia
  app.use(pinia);
}

export default registerStore;
