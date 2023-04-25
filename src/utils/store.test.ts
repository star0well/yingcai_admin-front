import { it } from "vitest";
import { expect } from "vitest";
import { describe } from "vitest";
import { store } from "./store";
describe("测试store", () => {
  it("异步set存储", async () => {
    setTimeout(() => {
      store.set({ a: "nihao" });
    }, 0);
    const { a } = await store.get();
    expect(a).toBe("nihao");
  });
  it("同步set存储", async () => {
    store.set({ a: "sync" });
    const { a } = await store.get();
    expect(a).toBe("sync");
  });
  it("是否清除clear", async () => {
    setTimeout(() => {
      store.set({ a: "nihao" });
    }, 1000);
    await store.get();
    expect(store.timer).toBeNull;
  });
  it("空值测试", async () => {
    setTimeout(() => {
      store.set({});
    }, 1000);
    try {
      await store.get();
    } catch (error) {
      expect(error).toBeFalsy;
    }
    expect(store.timer).toBeNull;
    console.log("store.info", store.info);

    expect(Object.keys(store.info).length).toBe(0);
  });
});
