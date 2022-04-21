## video元素无法绑定click事件的解决方案

### pc
1. 不存在此问题 

### mobile
1. 给`video`元素添加可点击的蒙层元素；
2. 移动端可以将`click`改为`touchstart`事件；

### 总结
用加蒙层的方式能统一解决问题；