## 响应式

- 组件中响应式属性发生变化时，会通知响应式属性的 watcher,会重新渲染 vnode,也就是执行 render,patch 函数;
- 一次只有一个 watcher 被执行；
- 一个组件模板中多个响应式属性的 dep 的 Watcher 都是同一个；
- 一个 watcher 有多个响应式属性的 Dep 实例(组件本身响应式属性；

## 组件化

- 模板编译到 render 函数执行创建 render 函数创建 vnode 元素；
- createElement->createComponent(构造子类/组件 Vue.extend({...options})，安装组件钩子函数，实例化vnode);
- 通过模板来创建树状的 vnode；

- 流程：
  - vm._render()->h/createElement->createComponent->Vue.extend(...)`mergeOptions()->installComponentHooks(vnode的hook)->vnode`->vm._update()->vm._patch_()`createElem,patchVnode`，从createElement会重新执行；