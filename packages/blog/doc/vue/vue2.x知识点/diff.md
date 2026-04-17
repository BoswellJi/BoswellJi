## diff的应用场景

* 新vnode和旧vnode的子节点都是多个的时候；

## DOM操作的性能问题

* 创建，移除；

## children对比方案 

* 对比children中相同位置的vnode作为一对新旧对vnode对比；
* 根据新children和旧children长度中较短的进行遍历patch，之后根据当前children的长度大于旧children就新增，少于就删除；

## diff中的优化

* 这里的优化需要注意DOM的复用，因为有时候可以看出，vnode列表只是位置发生变化；
* 移动元素的关键在于：我们需要在新旧children的节点中保存映射关系；
* vnode中key的作用是映射到vnode,因为vnode中没有key的情况下，没法知道新children中节点是否在旧vnode下找到可复用节点;

