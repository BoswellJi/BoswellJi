## uniapp 是如何让 vue 在小程序运行时运行的

- 依赖模块

  - ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js：uni core
  - ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js：vue core
  - ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js： component core
  
  - ./node_modules/@babel/runtime/regenerator/index.js: ployfill
  - ./node_modules/regenerator-runtime/runtime.js: ployfill
  - (webpack)/buildin/global.js: 

- 文件
  - runtime.js: webpack的模块加载器
  - vendor.js: 运行时的依赖库(mpvue)
  - main.js: app.js

## 实现
