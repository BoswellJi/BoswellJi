## 并发react

- `协作多任务处理`、`基于优先级的渲染`、`调度`、`中断`;
- react保证即使渲染中断，UI也会显示一致；
- UI可以立即响应用户输入，即使它是在一个大型渲染任务的中间；

## 渲染

- `渲染中断`中的`渲染`指的是什么：就是用户触发数据更新后，对组件进行的`新vnode创建，新老vnode对比，创建、删除、移动、更新dom`过程；
- 之前只有 vdom 的 render 和 patch，现在却变成了 vdom 转 fiber 的 reconcile，空闲调度 reconcile 的 schedule，最后把 fiber 渲染的 commit 三个阶段；

