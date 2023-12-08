* 只有组件才有生命周期；

```js
const option = {
  parent：parentComponent
}
```

* 函数组件没有内部状态，没有响应式更新，状态都是外部传入的，所以父组件更新也会跟着更新；

* 组件更新时，会根据组件的`新老vnode tree`进行对比，而函数组件无脑更新；