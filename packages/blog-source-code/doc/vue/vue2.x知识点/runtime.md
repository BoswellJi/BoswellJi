## chunk

- 获取 chunk 的 id;
- 获取 chunk 中的模块;

## jsonpArray

- 数组中的每个元素都是一个 chunk;

## installedChunks

- chunk 被加载之后，状态改为 0；

## modules

- 收集每个 chunk 中的模块；

## deferredModules

- 延迟模块；

## checkDeferredModules

- 开始执行安装好的延迟模块；

## 步骤

- 获取 window.webpackJsonp 数组的值；
- 保存 jsonpArray 的 push 方法的引用，其中方法的 this 值绑定到 jsonArray;
- 给 jsonpArray 添加 push 方法（重写）；
- 复制 jsonpArray;
- 收集每个 chunk 中的模块；
- 将延迟执行模块添加到延迟列表中；
- checkDeferredModules：执行加载好的 chunk;

## 组件实例

- new Vue(): Vue
- Vue.extend(): Component

## vue初始化的组件渲染过程：

- app.$mount
- compile(template 编译为 render function)
- render
  - createElement
    - createComponent
      - baseCtor.extend(Ctor)
      - installComponentHooks
      - 实例化 vnode:
        - `这里会将子组件的构造函数，设置给componentOptions属性`；
- update
  - patch
    - createEle
      - createComponent
        - init（vnode init hook）
        - createComponentInstanceForVnode()
          - new vnode.componentOptions.Ctor(): 通过 vnode 创建组件实例
        - child.$mount

## render function

```js
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h; // createElement
  return _c(
    "div",
    [
      _c("test", { on: { testClickHandle: _vm.appClickhandle } }),
      _c("async-example"),
    ],
    1
  );
};
```
