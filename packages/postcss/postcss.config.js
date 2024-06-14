module.exports = function (cfg) {
  return {
    plugins: [
      /***
       * 根据目标浏览器范围添加样式前缀
       */
      require('autoprefixer')(),
      /***
       * 根据目标浏览器范围转换高级css到polyfill
       */
      require('postcss-preset-env')({
        stage: 0
      }),
      /***
       * 允许直接在css文件中使用postcss plugin,作用域在当前的css文件
       */
      require('postcss-use')

      /***
       * 压缩css
       */
      // require('cssnano'),
    ]
  }
}
