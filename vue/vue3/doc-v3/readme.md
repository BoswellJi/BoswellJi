## vue3 与 vue2 的不同

## main.js

```vue2
new Vue().$mount("#app");
```

```vue3
createApp(App).mount('#app')
```

## vnode

```vue3
const vnode: VNode = {
    __v_isVNode: true,
    [ReactiveFlags.SKIP]: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children: null,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null
}
```

## vue 执行流程

- createApp()

  - ensureRenderer

    - createRenderer
      - render
      - createAppAPI

  - createApp(createAppAPI 中的)
    - createAppContext
    - App object

- mount()
  - mount
    - createVnode: 这里创建根组件的vnode
      - normalizeChildren
    - render
      - patch
        - processComponent: 安装组件，从根组件开始，递归安装每个元素/组件；
          - mountComponent
            - setupComponent
      - unmount


## renderer

* 从根组件开始渲染 App.vue：vnode

```js
// 组件参数：
{
  name: "App",
  props: {msg: ()=>{}},
  render:()=>{},
}
```