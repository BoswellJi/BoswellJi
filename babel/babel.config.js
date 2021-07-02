module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        /***
         * 这个字段指定项目兼容的浏览器范围
         */
        // target:{},
        /***
         * usage:
         * entry:
         */
        useBuiltIns: "usage",
        corejs: { version: "3.6", proposals: false },
      },
    ],
    [
      /***
       * 将jsx语法编译为react的render function
       */
      "@babel/preset-react",
    ],
    [
      /*** 
       * 编译ts语法
       */
      "@babel/preset-typescript"
    ]
  ],
  plugins: [
    /***
     * 将jsx转换为vue的render function
     */
    // "transform-vue-jsx",
  ],
};
