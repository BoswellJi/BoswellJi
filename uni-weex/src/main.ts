import { createSSRApp } from "vue";
import App from "./App.nvue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
