## StarportCarrier 星港搬运器

- 用于创建星港的全局飞行器；

## StarportCraft 星港飞行器

- 用于将星港从老位置移动到新位置；

## Starport 星港

- 用于创建星港容器，每个星港容器都有一个唯一的标识；
- 通过获取插槽组件，创建星港代理组件，同时将插槽组件添加到全局状态`portMap`中；

## StarportProxy 星港代理

- 用于创建星港元素；

## createInternalState

- 根据星港唯一标识获取星港实例/创建星港实例/删除星港实例；

## createStarportInstance

- 创建星港实例，所有状态参数；

## 动画流程

- 初始化星港`starport`生成对应的飞行器`StarportCraft`这时有了飞行器的初始化样式也就是`对应的星港的样式`；
- 跳转页面时:
  - 首先将飞行器`display:block`，因为飞行器落地后，会`display:none`飞行器；
  - 飞行器将星港元素添加到`Teleport`组件插槽中，切换`StarportCraft`飞行器的样式到`目标星港样式`；
  - 到目的地后`display:none`飞行器，将`Teleport`中的插槽内容`星港`放到目标位置；