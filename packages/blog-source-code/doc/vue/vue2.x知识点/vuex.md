## 映射

* `template => view`
* `data => state`
* `methods => actions`


## 当多个组件共享同一份数据

* 多个视图依赖同一块数据；
* 不同的视图行为可能需要变更同一块数据；

* 第一个问题：
  1. 传递属性在遇到深度嵌套组件的时候会变得乏味的；
  2. 在兄弟组件之间不能工作；

* 第二个问题：
  1. 直接去拿父组件和子组件的实例引用；
  2. 尝试通过事件来修改和同步多个状态副本；

* 以上的解决方案，都会导致不可维护；

## 终极解决方案

* 提取出组件的共享状态，并且用全局单例进行管理，所有的组件树变成一个大的视图，任何组件都能访问状态和触发行为，无论他们在树中的哪里；

* 通过定义和分离状态管理中设计的概念以及强制在视图和状态之间维护独立的规则；

## 总结

* Flex就像眼镜，当你需要的时候，你会知道的；

## 使用vuex不意味着你应该放所有的状态在vuex终

* 它会使得你的状态变化更明显以及可调式，但是它也会使得你的代码更加的繁琐和间接；
* 如果状态是属于单个组件，应该把它放到本地状态中去，这个需要在开发过程中开发者自己做权衡；

## state

## getter

* 与组件的computed option相同，为了组合data中的数据的使用，getter中的data就是state;

## mutation

* 只能通过store的commit方法触发，为了是状态变化过程的可预测；
* 执行的只能是同步程序，这样才可以获取到程序之前和之后state;

## action

* 处理异步操作；
* 可以访问到回调函数中的`{state,getters,mutations,actions}`;
* 多action组合，这就需要action中返回Promise;

## module

* 有单独的state,getter,mutation,action;
* 注意namespaced option,没有的情况下，`state是不会添加到根模块上的`；