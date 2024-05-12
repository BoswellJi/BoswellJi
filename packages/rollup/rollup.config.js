import typescript from '@rollup/plugin-typescript';
import { babel,  getBabelOutputPlugin } from '@rollup/plugin-babel';
const path = require('path');

export default {
  input: "./src/index.ts",
  external: ["vue"],
  output: [
    {
      dir: "dist",
      format: "es",
      globals: {
        vue: "Vue",
      },
    },
    // {
    //   dir: "dist",
    //   format: "es",
    //   entryFileNames:'[name]1.js',
    //   globals: {
    //     vue: "Vue",
    //   },
    // },
  ],
  plugins: [
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, 'babel.config.js')
    }),
    typescript(),
  ],
};
