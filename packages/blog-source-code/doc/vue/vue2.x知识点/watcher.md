## 内部Watcher

* 组件上的每条指令和computed属性（get),通过compile都会变成一个对应的Watcher对象；

## 用户watch

* 监听属性改变了，都会触发定义好的回调函数；

## 渲染watcher

* 每个组件都会有一个render-watcher，当data中的属性改变时，调用render-watcher来更新组件的视图；