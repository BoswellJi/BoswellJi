## StarportCarrier 星港搬运器

- 用于创建星港的全局飞行器；

## StarportCraft 星港飞行器

- 用于将星港从老位置移动到新位置**它的位置大小和`StarportProxy`组件相同**；
- 获取`portMap`中的存储的`Starport`的上下文信息；

## Starport 星港

- 用于创建星港容器，每个星港容器都有一个唯一的标识；
- 通过获取插槽组件，创建星港代理组件，同时将插槽组件添加到全局状态`portMap`中；

## StarportProxy 星港代理

- 用于创建星港元素；
- 记录`StarportProxy`的dom信息，到`portMap`中；
- 用来存放`StarportCraft`的`Teleport`移动的元素；
- 跳转路由后，获取指定`port`的`Starport`,获取当前的`StarportProxy`的dom信息；

## createInternalState

- 根据星港唯一标识获取星港实例/创建星港实例/删除星港实例；

## createStarportInstance

- 创建星港实例，所有状态参数；

## 动画流程

1. 创建`StarportCarrier`,初始化时`portMap`为空,所以不会创建`StarportCraft`;
2. 跳转人默认路由,创建`Starport`,`Starport`内部创建`StarportProxy`,`StarportProxy`内部会创建`StarportInstance`并存入`portMap`,并且安装之后将`StarportProxy`的根元素 dom 对象赋值给`StarportInstance`属性`el`,因为`StarportCarrier`渲染函数中使用了`portMap`,所以当`portMap`更新后,会重新渲染,创建`StarportCraft`,其中会拿到安装的`StarportProxy`的 dom 对象实例，所以可以获取 dom 的尺寸位置,就会将`StarportCraft`组件移动到`StarportProxy`位置,`StarportCraft`中创建的`Teleport`会将插槽组件,移动到对应的`StarportProxy`中创建的目标`DOM`中:

   - 初始化星港`starport`生成对应的飞行器`StarportCraft`这时有了飞行器的初始化样式也就是`对应的星港的样式`；

3. 跳转页面时:
   - `RouterView`中切目标换路由,创建其中的`Starport`:
     - 获取`Starportproxy`的位置尺寸信息;
     - 首先将飞行器`display:block`，因为飞行器落地后，会`display:none`飞行器；
     - 飞行器将星港元素添加到`Teleport`组件插槽中，切换`StarportCraft`飞行器的样式到`目标星港样式`；
     - 到目的地后`display:none`飞行器，将`Teleport`中的插槽内容`星港`放到目标位置；