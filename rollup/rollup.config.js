import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.js",
  output: [
    {
      dir:'dist',
      format: "cjs",
    },
    // iife模块格式不支持代码分割
    // {
    //   dir:'dist',
    //   format: "iife",
    //   name: "version",
    //   plugins: [
    //     terser({
    //       compress:false,
    //     }),
    //   ],
    // },
  ],
  plugins: [json()],
};
