## 重要概念

* RouteRecord：路由记录

```ts
interface RouteRecord {
  path: string
  regex: RegExp
  components: Dictionary<Component>
  instances: Dictionary<Vue>
  name?: string
  parent?: RouteRecord
  redirect?: RedirectOption
  matchAs?: string
  meta: any
  beforeEnter?: (
    route: Route,
    redirect: (location: RawLocation) => void,
    next: () => void
  ) => any
  props:
    | boolean
    | Object
    | RoutePropsFunction
    | Dictionary<boolean | Object | RoutePropsFunction>
}
```

* Route: 路线/路由
  - 路由中的一条线路；

```ts
interface Route {
  path: string
  name?: string | null
  hash: string
  query: Dictionary<string | (string | null)[]>
  params: Dictionary<string>
  fullPath: string
  matched: RouteRecord[] // 匹配到路线记录
  redirectedFrom?: string
  meta?: any
}
```

* Location：位置/地点
  - 对url的结构化描述；

```ts
interface Location {
  name?: string
  path?: string
  hash?: string
  query?: Dictionary<string | (string | null)[] | null | undefined>
  params?: Dictionary<string>
  append?: boolean
  replace?: boolean
}
```

* match: function
  - 找到匹配的Route

* 路由的跳转有两种方式触发：
  - 手动route.push，改写history stack，触发route的响应式，重新渲染视图；
  - 浏览器的前进，自动触发popstate事件，后退按钮，触发route的响应式，重新渲染视图；


## 初始化路由表

- createMatcher();
- createRouteMap()
  - pathList：路径列表
  - pathMap: 路径与RouteRecord映射，别名当作路径
  - nameMap：名字/路径别名与RouteRecord映射
- addRouteRecord();
  - record instance
  - children
  - alias
  - name

## 初始化路由跳转流程

- new VueRouter()
- new Vue()
- beforeCreate
- _router.init
- transitionTo

## 手动路由跳转流程
- this.$router.push:
- history.push
- history.transitionTo
- this.$router.match：获取目标路由
- normalizeLocation：获取目标地址
- history.confirmTransition
- 守护任务
- history.confirmTransition回调
- updateRoute
- replaceState
- pushState
- handleScroll
- afterHook

## 匹配目标路由的使用地方

1. `<view-link>`组件，每次数据发生变化都要调用；
2. `history.transitionTo`跳转;

## 路由导航

*这里提一下，跟测试代码类似*

* 全局
* 每个路由
* 组件