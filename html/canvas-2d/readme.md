  # 数学相关：
  
  ### 三角函数

  1. 以角 A 为相对元素(非直角)
  2. 正弦函数(sin(A))：对边比斜边的比值
  3. 余弦函数(cos(A))：临边比斜边的比值
  4. 正切函数(tan(A))：对边比临边的比值

  5. 反正切(atan()):对边/临边的反正切值，为这个夹角的弧长

  ### 代数方程

  ### 向量运算

  # 物理相关：

  ## 基本概念

  1. 力
  2. 矢量
  3. 质量
  4. 重力
  5. 摩擦力
  6. 速度
  7. 速率
  8. 加速度

  # canvas相关

  ## 绘图环境

  ## 坐标系

  1. canvas元素实际上有两套尺寸，一个是元素本身的大小，还有一个是元素绘图表面的大小；
  2. 当设置元素的width和height属性时，实际上是同时修改该元素本身的大小，与元素绘图表面的大小。设置css来设定canvas元素的大小，只会改变元素本身的大小，不会影响到绘图表面；
  3. 使用css这是canvas大小等于缩放了坐标系；

  ## 绘制模型

  1. 理解canvas如何绘制图形，图像，文本，需要理解阴影，alpha通道，剪辑区域及图像合成等内容；
  2. 填充模式，描边模式，线条样式

  ## dom对象的属性与方法
  属性

  + width
  + height

  
  方法：

  + getContext()
  + toDataURL(mime-type, quality)
  + toBlob(callback, mime-type)

  ## 绘图环境对象 getContext('2d')

  ## 性能

  + 性能分析器
  + 时间轴工具

  

## canvas

* [spritejs](https://github.com/spritejs/spritejs)

* [incubator-echarts/echarts](https://github.com/apache/incubator-echarts)

``` 
图表与可视化库
```

* [zrender](https://github.com/ecomfe/zrender)
```
一个轻量的提供给echart的2d绘制的canvas库
```
