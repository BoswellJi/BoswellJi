## uniapp 是如何让 vue 在小程序运行时运行的

- 依赖模块

  - uni-mp-weixin/dist/index.js：创建小程序的配置参数

    - api：
      - createApp
      - createComponent
      - createPage
      - createSubpackageApp
      - default

  - mp-vue/dist/mp.runtime.esm.js：

    - api:
      - default：Vue

  - (webpack)/buildin/global.js：

    - api:
      - g

  - vue-loader/lib/runtime/componentNormalizer.js：创建组件
    - api:
      - default

- 文件
  - runtime.js: webpack 的模块加载器
  - vendor.js: 运行时的依赖库(mpvue)
  - main.js: app.js

## 实现