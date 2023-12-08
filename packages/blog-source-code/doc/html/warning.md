# 警告

## video 元素无法绑定 click 事件的解决方案

### pc

1. 不存在此问题

### mobile

1. 给`video`元素添加可点击的蒙层元素；
2. 移动端可以将`click`改为`touchstart`事件；

### 总结

用加蒙层的方式能统一解决问题；

## 小米手机浏览器中

- 给`video`元素的`body,html`等元素设置`overflow-x:hidden`样式后，播放`video`视频会自动脱离文档流，其他浏览器不会；
