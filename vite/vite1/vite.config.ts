import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: ".",
  server: {
    host:'0.0.0.0',
    strictPort: true,
    https: true,
    open: true
  },
});
