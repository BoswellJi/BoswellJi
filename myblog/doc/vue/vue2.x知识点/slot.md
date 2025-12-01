## 插槽

* 默认插槽：
  - 生成普通的vnode(使用内部的元素);

* 作用域插槽：
  - 生成render函数；

* 生成的vnode中不存在slot，只会留下slot中的内容，也就是说slot组件在生成vnode时不是节点；

* 解析slot，先解析default，在解析存在name的；
  -  v-slot: 使用这个指令的插槽内容都会在`normalizeScopedSlots`方法中解析；其他内容都会`resolveSlots`方法中解析；