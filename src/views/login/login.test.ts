import { shallowMount } from "@vue/test-utils";
import { describe, it, vi, expect, spyOn } from "vitest";
import LoginPage from "./login.vue";
import { createPinia, setActivePinia } from "pinia";
import { mount } from "@vue/test-utils";
import { userlogin } from "@/service/login";

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn(() => ({
    push: () => {},
  })),
  createRouter: vi.fn(() => ({
    beforeEach: vi.fn(),
  })),
  createWebHashHistory: vi.fn(),
}));
vi.mock("@/service/login/index", () => ({
  userlogin: vi.fn((...arg) =>
    Promise.resolve({
      data: { token: "123" },
    }),
  ),
}));

describe("测试Login", () => {
  const mockObj = {
    login: () => {},
  };
  const spy = vi.spyOn(mockObj, "login").mockImplementation(() => {
    return 0;
  });

  const pinia = setActivePinia(createPinia());
  const wrapper = mount(LoginPage, {
    global: {
      mocks: {
        login: mockObj.login,
      },
    },
  });

  it("vites组件", async () => {
    const account = wrapper.find("[data-test=account]");

    await account.setValue("yingcai");

    const password = wrapper.find("[data-test=password]");
    await password.setValue("123456");
    const btn = wrapper.find("[data-test=btn]");
    await btn.trigger("click");

    expect(spy).toHaveBeenCalledWith(2);
  });
});
