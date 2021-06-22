## 模块加载流程

### runtime.js: webpack生成的模块加载器

- 初始化模块加载器

  - **webpack_require**: 加载模块
  - modules[moduleId].call(module.exports, module, module.exports, **webpack_require**): 执行模块

- webpackJsonpCallback:
  - 获取正在加载的chunk；
  - 合并模块；
  - 将chunk添加到`jsonpArray/global["webpackJsonp"]`中；
  - 调用正在加载的chunk；
  - 从已经加载好的chunk中添加入口模块到延迟列表中；
  - 所有chunk都准备好，运行延迟模块；

- checkDeferredModules：
  - 检查chunk是否加载好；
  - 加载chunkmodule[0];

- 模块信息
  - module:
    - `{i: moduleId,l: false,exports: {}}`
    - 每个模块导出接口都挂载到exports对象上；
    - `{default: obj }`

### vendor.js: uniapp的运行时库

### main.js: 项目入口