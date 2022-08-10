
* 组件的产出是`vnode`,渲染器的渲染目标也是`vnode`(意思是渲染器要将vnode渲染到平台);
* vdom需要渲染为真实dom, 这个过程可以理解为模板引擎年代的完全替换html, 但是vdom=>dom不是完全替换，而是叫做patch; 
* `想要把vnode渲染成真实dom，需要渲染器，也就是将vnode渲染到平台(dom,android,ssr,canvas)`; 

## vnode描述抽象内容

* 组件就是一个抽象的内容；因为你的意图不是要在页面中渲染`<component></component>`，而是要渲染组件的内容；
* 除了组件之外还有两种抽象内容需要描述：`Fragment`,`portal`;

* Fragment: 当一块模板有多个元素没有容器时，创建Fragment节点；
* Portal: 将想要的内容渲染到任何地方；

## 怎样区分vnode

* 使用flags属性作为vnode的标识；进而优化diff算法；