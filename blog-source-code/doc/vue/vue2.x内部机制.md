## const app = new Vue()

## app.$mount()

- new Watcher()
  - 直接调用 updateComponent,在 Watcher 中执行组件的渲染
    - patch
      - createElement
        - createComponent
          - Vue.extend()
          - 创建 vue-component-id-name 的 vnode

## patch

- 核心逻辑为 vnode 的同层比较；
- 完全相同的 vnode 才会去深度比较内部 vnode;
- diff 的核心逻辑 updateChildren;
- 期间 vnode 为 component 时，会调用 vnode 的 init hook，的 vm.$mount;

- createElm

  - createComponent
  - createElement

- patchVnode
  - updateChildren: vnode 的 child vnode 不同，需要再进行比对
  - addVnodes：oldVnodeChild 不存在，直接添加
  - removeVnodes：newVnodeChild 不存在，直接删除

## reactive（MVVM

`响应式的核心就是，给带有响应式数据的回调函数，根据其中的响应式数据来创建Watcher,在触发响应式时更新这些回调函数`

- 只能通过修改 model 来更新 view,触发 view 事件来修改 model
- **一个组件模板中多个响应式属性的 dep 的 Watcher 都是同一个**；
- 一个 watcher 有多个响应式属性的 Dep 实例(组件本身响应式属性；
- **一个响应式属性的依赖可能存在多个 Watcher 中，每个依赖就是一个 Watcher**;

## component system

- 模板编译到 render 函数执行创建 render 函数创建 vnode 元素；
- createElement->createComponent(构造子类/组件 Vue.extend({...options})，安装组件钩子函数，实例化 vnode);
- 通过模板来创建树状的 vnode；

- 流程：
  - vm._render()->h/createElement->createComponent->Vue.extend(...)`mergeOptions()->installComponentHooks(vnode的hook)->vnode`->vm.\_update()->vm.\_patch_()`createElem,patchVnode`，从 createElement 会重新执行；

## render function 只要依赖发生变化就会重新调用

## computed option

- 会 new Watcher 对 computed 中的响应式属性进行监听，没有变化就会使用上次缓存的值，变化了重新执行并缓存下来；

## nextTick

## keep-alive

## transition

## transition-group

## event system

- 每个Vue实例以及Vue子类实例，都存在一个_event = {}的私有事件容器属性，`$on,$emit`方法会在当前调用组件上查找，是否存在当前事件名的事件；
