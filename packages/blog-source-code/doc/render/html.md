## 用户界面的渲染类型

* 中断渲染：先将`渲染任务`进行分割`fiber`，数据更新后，为了不影响`ui线程`将渲染任务暂停，之后继续执行；
* 同步渲染：数据更新后，立即执行`渲染任务`；
* 异步渲染：数据更新后，将`渲染任务`放到`下个任务队列`中，等待`当前任务栈`被清空；

## 渲染器

* svg
* html
* canvas
* webgl
* native

## mvvm

* Object.defineProperty()
* 依赖收集
* 状态变更，视图更新

## diff

* 算法的核心在于两个vnode相同时多个子节点的比较
* 对比算法是渲染的性能所在；[对比的次数，操作dom的次数]

## 组件化

* 组件的本质没有变化`模板+数据`，但是组件产出`=>完整html`却变化了，现在组件的产出变成了`vdom`;
* 一个组件最重要的是render,借助snabbdom api我们可以很容易获得vdom；

## 复用方式

* mixins
* hoc 
* render prop
* hook：逻辑复用和组件表达进行一定程度的解耦；

## 性能优化

* 给绑定v-for指令的节点的子节点添加key，使得oldVnode children在对比过程中可以复用节点；

## packages

* [vue](https://github.com/vuejs/vue)
* [vue-router](https://github.com/vuejs/vue-router)
* [vuex](https://github.com/vuejs/vuex)

* [vue-template-es2015-compiler](https://github.com/vuejs/vue-template-es2015-compiler)
```
在vue2.0模板中支持，方便的es2015特性子集
```

* [vue-template-compiler](https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler)
```
用来预编译vue2.0模板到渲染函数中
```

### components
* [vue-color](https://github.com/xiaokaike/vue-color)
* [mint-ui](https://github.com/ElemeFE/mint-ui)
* [element](https://github.com/ElemeFE/element)
* [vue-picker](https://github.com/naihe138/vue-picker)

### libary
* [vue-clipboard2](https://github.com/Inndy/vue-clipboard2)
* [vue-cookie](https://github.com/alfhen/vue-cookie)
* [vue-html5plus](https://github.com/vue-html5plus/vue-html5plus)

### build tool
* [vue-cli](https://github.com/vuejs/vue-cli)

### server render
* [ream](https://github.com/ream/ream)

* [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)
```
从一个项目的提交信息合元数据中生成日志和发布笔记
```

