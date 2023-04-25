import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import { defineConfig } from "unocss";
export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    // presetWeapp(),
    presetUno(),
    presetIcons(),
  ],
  shortcuts: [
    {
      "border-base": "border border-gray-500_10",
      center: "flex justify-center items-center",
      show: "opacity-100 whitespace-nowrap",
      hidden: "opacity-0 w-0 whitespace-nowrap ",
    },
  ],
  rules: [
    // [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}rem` })],//m-1 ：{margin:1px}
    // [/^p-([\.\d]+)$/, ([_, num]) => ({ padding: `${num}rem` })],//p-1 ：{padding:1px}
    // [
    //   /^text-(.*)$/,
    //   ([, c], { theme }) => {
    //     if (theme.colors[c]) return { color: theme.colors[c] };
    //   },
    // ],
  ],
  theme: {
    // colors: {
    //   my: {
    //     primary: "#aac19b",
    //   },
    // },
  },
  transformers: [],
});
