* 组件中响应式属性发生变化时，会通知响应式属性的watcher,会重新渲染vnode,也就是执行render,patch函数;

* 一次只有一个watcher被执行；

* 一个组件模板中多个响应式属性的dep的Watcher都是同一个；

* 一个watcher有多个响应式属性的Dep实例(组件本身响应式属性；