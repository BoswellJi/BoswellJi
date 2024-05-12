## 数学相关

###

* 求解代数方程
* 三角函数

### 向量运算

  + 二维向量都包含两个值：方向，大小（这两个值可以表达出各种各样的物理特性来；比如：力和运动
  + 向量数学运算

* 问题引出：
  + 碰撞检测中：顶部多边形向底部多边形前进；（ `顶部的碰撞之前速度` 与 `碰撞之后被弹开速度` 都是以向量来建模的；
  + 即将与顶部发生碰撞的那条边，也是以向量来建模，我们称之为 `向量边` ；
  + 问题：给定的前进速度与碰撞边界上的两个点，来计算碰撞之后被弹走的速度；

* 向量的大小
* 根据勾股定理，来计算出向量的大小； `const len = Math.sqrt(Math.pow(vector.x,2) + Math.pow(vertor.y,2))` ; 

* 向量的方向
* 单位向量： 是用来指示方向的向量；它的长度永远是单位1; 
* 根据给定的向量计算单位向量：
  + 先把原来的向量的大小去掉，只留下方向

``` 
公式：
const len = Math.sqrt(Math.pow(vector.x,2) + Math.pow(vertor.y,2));
unitVector = new Vector();

unitVector.x = vector.x / len;
unitVector.y = vector.y / len;

```

* 向量的加法与减法
* 应用：
  + 如果有两个力同时作用于某个物体上，可以将代表两个力的向量相加，计算出两个力的合力；
  + 一个方位向量减去另一个，求两点之间的边界；
* 公式：

``` 
加法：
vectorSum.x = vectorOne.x + vectorTwo.x;
vectorSum.y = vectorOne.y + vectorTwo.y;

减法：
vectorSum.x = vectorOne.x - vectorTwo.x;
vectorSum.y = vectorOne.y - vectorTwo.y;
```

* 两个向量的 点积（又叫标量，纯量）
* 应用：
  + 主要在于 `大于0` 这个事实; 
    - 如果点积大于0，说明两个向量方向基本相同
    - 如果点积小于0，说明两个向量方向基本不相同
  + 所以，碰撞检测中，判断两个矢量的终点是不是大致指向同一个方向，这个很关键；
* 公式

``` 
vector = vectorOne.x * vectorTwo.x + vectorOne.y + vectorTwo.y;
```

### 根据计量单位来推到等式
- 动画的移动应该是以时间为基准的；
- 一个物体的移动频率不应该随着动画的帧速率而改变；
- 为了实现这个目标：我们要使用`每秒移动的像素数`作为计量移动速度的单位；

- 需要的信息： `物体的移动速度是每秒多少像素`，`当前动画的帧速率是每帧持续多少毫秒`；
```
一帧移动多少像素 = 一帧多少毫秒 / 1000 * 物体每秒钟移动的像素数 

帧速率： 一帧多少毫秒；
速度： 一秒多少像素；

```
  
  ### 三角函数

  1. 以角 A 为相对元素(非直角)
  2. 正弦函数(sin(A))：对边比斜边的比值
  3. 余弦函数(cos(A))：临边比斜边的比值
  4. 正切函数(tan(A))：对边比临边的比值

  5. 反正切(atan()):对边/临边的反正切值，为这个夹角的弧长

  ### 代数方程

  ### 向量运算

  ## 物理相关

  ### 基本概念

  1. 力
  2. 矢量
  3. 质量
  4. 重力
  5. 摩擦力
  6. 速度
  7. 速率
  8. 加速度

  ## canvas相关

  ### 绘图环境

  ### 坐标系

  1. canvas元素实际上有两套尺寸，一个是元素本身的大小，还有一个是元素绘图表面的大小；
  2. 当设置元素的width和height属性时，实际上是同时修改该元素本身的大小，与元素绘图表面的大小。设置css来设定canvas元素的大小，只会改变元素本身的大小，不会影响到绘图表面；
  3. 使用css这是canvas大小等于缩放了坐标系；

```公式
  转换一些限制左，右，上，下的实数坐标系为范围从左边为0右边为800以及上边为0下边为600的像素坐标系。

  newX = ((oldX-left)/(right-left)) * 800；
  newY = ((oldY-top)/(bottom-top))* 600; 
``` 

  ### 绘制模型

  1. 理解canvas如何绘制图形，图像，文本，需要理解阴影，alpha通道，剪辑区域及图像合成等内容；
  2. 填充模式，描边模式，线条样式

  ### dom对象的属性与方法
  属性

  + width
  + height

  
  方法：

  + getContext()
  + toDataURL(mime-type, quality)
  + toBlob(callback, mime-type)

  ### 绘图环境对象 getContext('2d')

  ### 性能

  + 性能分析器
  + 时间轴工具

### canvas

* [spritejs](https://github.com/spritejs/spritejs)

* [incubator-echarts/echarts](https://github.com/apache/incubator-echarts)

```

图表与可视化库

``` 

* [zrender](https://github.com/ecomfe/zrender)

```

一个轻量的提供给echart的2d绘制的canvas库
```
