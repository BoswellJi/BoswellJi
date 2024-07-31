## Fiber(纤维)

* 比线程更细的线，也就是比线程控制的更加细致的并发处理机制；
* 一个`fiber`就是一个`虚拟调用帧`；
* `Reconciliation`是react的diff算法；

## 问题

* 之前变化更新是同步的，这会导致性能问题；
* 组件多了之后，因为同步会带来卡顿；

## 更新组件的流程

* 生命周期->计算和对比vdom->更新dom;(如上面所说，这个过程是同步的)

## 解决方案

* 将同步分割为多个同步任务，每个同步任务异步来执行；
* `reconciler`来调度，开始，暂停`fiber`;