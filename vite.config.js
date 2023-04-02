import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    svgLoader(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ["vue", "md"],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
      dts: "src/components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),

      "/img": "src/assets/img",
      "/assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://124.221.130.56",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 不可以省略rewrite
      },
    },
  },
});
