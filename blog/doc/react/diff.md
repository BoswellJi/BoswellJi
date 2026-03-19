## 过程

* schedule(在并发模式下，setState会触发多次，但不会立即更新视图) => reconcile(对比vdom的过程) => commit(根据diff对比结果，真实操作dom的过程)
