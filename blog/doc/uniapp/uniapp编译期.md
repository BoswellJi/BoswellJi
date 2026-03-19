## uniapp与vue编译结果的异同

## 模板

* uniapp编译到`wxml`;vue编译到`渲染函数（render function`;

## main.js的选项（参数option

* uniapp的是App的选项；vue的是Vue构造函数的选项;

```uniapp
1. app.$mount()
```

```mini
1. createApp(app).$mount();
```

## 样式

* uniapp编译到`wxss`；vue编译到`css`;

## App.vue

* uniapp编译到`pages`；vue编译到`component/createComponent`;

## page.vue

```uniapp
1. export default {};
```

```mini
1. createPage({});
```

## component.vue

```uniapp
1. export default {};
```

```mini
1. createComponent({});
```
