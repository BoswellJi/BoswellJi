## 框架提供给用户东西

- 构建产物，产物模块格式？
- 用户没有按照预期的方式使用框架是否打印合适的警告信息？
- 开发版本与生产版本的区别？
- 是否要支持热更新HMR？
- 是否需要进行tree shaking?

- 提升用户开发体验
- 控制框架代码的体积
- 框架要做到良好的 Tree-Shaking
- 框架应该输出怎样的构建产物
- 特性开关
- 错误处理
- 良好的 Typescript 类型支持

## 内部类

- ReactiveEffect
- EffectScope

## 实例

- vnode: createBaseVNode
- app: createApp
- appContext: createAppContext

## 定义响应式对象

- setupComponent
- setupStatefulComponent
  - callWithErrorHandling(setup)

## 依赖追踪(进行的时机)

- render function
  - PublicInstanceProxyHandlers
    - get
      - trackEffects 

- effect function
  - new ReactiveEffect()
  - effect.run

- computed function
  - ComputedRefImpl
    - new ReactiveEffect()
    - get value(){}
    - effect.run

- watch function
  - new ReactiveEffect()
  - effect.run

## 副作用调度(effect scheduling)

- todo...

## 安装过程

> Patch: root vnode 开始，判断传入的vnode类型，进行不同类型的处理，组件，片段进行递归处理；

- mount
- render
- patch
  - processComponent
  - mountComponent
  - setupRenderEffect
    - componentUpdateFn
      - renderComponentRoot: 执行组件的 render function
      - patch
        - 因为没有old vnode,所以走的都是安装方法（mountElement

## 更新过程

- triggerEffects
- run(ReactiveEffect)
  - fn
  - componentUpdateFn
    - renderComponentRoot: 执行组件的 render function
    - patch

## 对比vnode

> diff核心：判断是否有节点需要移动，以及应该如何移动和寻找出那些需要被添加或移除的节点

1. 首先进行预处理，比较相同的前缀和后缀元素`j,prevEnd,nextEnd`
   - j > prevEnd && j <= nextEnd:  j -> nextEnd 之间的节点应该被添加
   - j > nextEnd: j -> prevEnd 之间的节点应该被移除
2. 判断是否需要进行dom移动
3. dom移动的方式

## 编译模板时的优化

1. Block Tree 和 PatchFlag
   - Block Tree: 需要更新的vnode tree
   - PatchFlag: 动态vnode需要修改的类型
`总结：可以利用以上特性，在diff时精确更新vnode`

2. 静态提升
   - 将静态vnode创建流程提取，不需要每次render都创建

3. 不会静态提升
   - 元素带有动态key
   - 使用ref的元素
   - 使用自定义指令的元素

4. 提升静态 PROPS

5. 预字符串化

6. Cache Event handler

7. v-once

## 如何进行高性能渲染

- 利用v-show缓存组件,避免大量销毁创建组件
- dom数量太大，导致渲染卡顿，可以利用css，将元素渲染计算交给GPU

1. vue2.x
   - 简洁的模板标签
   - 拆分组件`(diff算法只进行当前组件的vnode对比)`
   - children vnode添加key标识
   - 减少模板中使用不必要的响应式属性

2. vue3.x
   - 正确地使用 PatchFlags
   - NEED_PATCH
   - 该使用 Block 的地方必须用
   - 分支判断使用 Block
   - 列表使用 Block
   - 使用动态 key 的元素应该是 Block
   - 使用 Slot hint
   - 为组件正确地使用 DYNAMIC_SLOTS
   - 使用 $stable hint

## vue渲染

- 同步渲染，从父组件开始到子组件递归渲染，整个过程是同步的

## 预编译Vue

- 每个`.vue`文件，编译之后都会为带有`render function`的`options`对象；

## slot组件

> 编译后的slot组件。也就是说，如果不适用`<slot></slot>`组件的话，想要展示`<test>text</test>`中的插槽内容，使用`vm.slots.default()`获取vnode,传入`h/createVnode`中。

```js 
// slot
const slot = {
  render: function _sfc_render(_ctx, _cache) {
    return renderSlot(_ctx.$slots, "default");
  }
}
```