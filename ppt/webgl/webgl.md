title: WebGL从入门到放弃
speaker: 季明壮
plugins:
    - echarts

<slide class="bg-black-blue aligncenter">

# WebGL从入门到放弃 {.text-landing.text-shadow}

By 季明壮 {.text-intro}

<slide class="bg-black-blue aligncenter">

# 主要内容

<br />
<br />
<br />

* 什么是3D? {.fadeIn.animated.delay-0}
* 什么是WebGL? {.fadeIn.animated.delay-400}
* WebGL的应用领域? {.fadeIn.animated.delay-800}
* WebGL中的基本概念和示例? {.fadeIn.animated.delay-1200}

<slide class="bg-black-blue aligncenter" >

# 什么是3D（3-dimension）?

<br />
<br />
<br />

通常我们说的`三维`是指在`平面二维系`中又加入了`一个方向向量`构成的`空间系`。三维既是坐标轴的三个轴，即x轴、y轴、z轴，其中x表示左右空间，y表示前后空间，z表示上下空间（不可用平面直角坐标系去理解空间方向）。在实际应用方面，一般把用X轴形容左右运动，而Z轴用来形容上下运动，Y轴用来形容前后运动，这样就形成了人的视觉立体感。

<slide class="bg-black-blue aligncenter">

# 什么是WebGL?

<br />
<br />
<br />

WebGL（Web图形库）是一个JavaScript API，可在任何兼容的Web浏览器中渲染高性能的交互式3D和2D图形，而无需使用插件。


<slide class="bg-black-blue aligncenter">

# WebGL的应用领域?

<br />
<br />
<br />

* [3D 的数据可视化](https://cybermap.kaspersky.com/)
* 3D游戏开发
* H5广告/Web传页
* 3D绘图软件
* [打造3D的交互效果](http://bookcase.chromeexperiments.com/)
* [进行3D产品/物体展示](https://alteredqualia.com/three/examples/materials_cars.html)
* ......

<!-- 1 -->
<slide class="bg-black-blue aligncenter">

# 先来几个概念

<br />
<br />
<br />

* canvas
* 渲染上下文
* 着色器
* glsl es
* 缓冲区
* 绘制

<slide class="bg-black-blue aligncenter">

# canvas

<br />
<br />
<br />

* html5之前在网页上显示图像，只能使用html提供的原生方案img标签 ；
* 直到 `html5` 中的 `canvas` ; 
* canvas定义了网页上的 `绘图区域` ；

<slide class="bg-black-blue aligncenter">

# 渲染上下文

<br />
<br />
<br />

* `WebGLRenderingContext` 接口提供绘图上下文，用于在 HTML `<canvas>` 元素内绘图；
* 要获得这个接口的对象，可以通过在 `<canvas>` 元素上调用 getContext() 函数，调用时传入 “webgl” 参数；

<slide class="bg-black-blue aligncenter">

# 着色器

<br />
<br />
<br />

:::{.content-left}

* webgl系统的绘图程序；
* webgl系统的着色器由两部分组成： 
    - 顶点着色器
        - 顶点：二维或者三维中的一个点，比如二维或者三维图形的端点和交点；
    - 片元着色器
        - 片元：可以理解为像素，图像的单元；
:::

:::{.content-right}

``` javascript
const vertexShaderSource = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute float a_PositionSize;

  varying vec4 v_Color;

  void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PositionSize;
    v_Color = a_Color;
  }
`;
```


``` javascript
const fragmentShaderSource = `
  precision mediump float;
  varying vec4 v_Color;

  void main(){
    gl_FragColor = v_Color;
  }
`;
```

:::
<slide class="bg-black-blue aligncenter">

# 编写着色器的语言glsl es

<br />
<br />
<br />

:::{.content-left}

## 数据类型

* 矢量

``` html
(3,7,1)
```

* 矩阵

``` html
[
2,3,4
2,3,4,
3,3,3
]

乘法规则：行 * 列

[ [ [
1,2, * a,b, = 1*a + 2*c , 1*b + 2*d
3,4 c,d 3*a + 4*c , 3*b + 4*d
] ] ]
```

:::

:::{.content-right}

### 存储限定字

* attribute
  + 只能被声明为全局变量; 
  + 只能在顶点着色器中; 
  + 逐顶点；

* uniform
  + 只能被声明为全局变量; 
  + 只读，不能被修改；

* varying
  + 必须是全局变量
  + 任务是从顶点着色器向片元着色器传输数据; 

:::

<slide class="bg-black-blue aligncenter">

# 缓冲区

<br />
<br />

是webgl中的一块存储区；可以在缓存区对象中保存想要绘制的所有顶点的数据；


<slide class="bg-black-blue aligncenter">

# 绘制

* `gl.drawArrays(type,offset,number)`
* 三种基本图形是webgl可以直接绘制的图形
    - gl.POINTS：
      - 一系列点;
    - gl.LINES：
      - 一系列单独的线段；
    - gl.TRIANGLES：
      - 一系列单独的三角形；

<!-- 2 -->
<slide class="bg-black-blue aligncenter">

# 再来几个概念

<br />
<br />
<br />

* 坐标系
* 变换
* 矩阵变换

<slide class="bg-black-blue aligncenter">

# 坐标系

<br />
<br />
<br />

在三维向量空间中，可以用任意三个线性无关的向量 `x,y,z(坐标系的三个轴)` 把任意 `一个向量w` 表示为`w = a1*x + a2*y+ a3*z` ,标量 `(a1,a2,a3)` 是 `w` 关于基 `x,y,z` 的分量,所以通常认为： `x,y,z` 定义了一个坐标系;

!![](./zbx.png)

<slide class="bg-black-blue aligncenter">

# 变换

<br />
<br />
<br />

移动，旋转和缩放，这样的操作称为`变换或者仿射`

<slide class="bg-black-blue aligncenter">

# 矩阵变换

<br />
<br />
<br />

使用变换矩阵进行变换

<!-- 3 -->
<slide class="bg-black-blue aligncenter">

# 又又来几个概念

<br />
<br />
<br />

* 照相机
* 可视空间

<slide class="bg-black-blue aligncenter">

# 照相机

<br />
<br />
<br />

* 照相机/观察者

* `照相机的状态`  
  + 视点：
    - 观察者的 `位置`  `(eyeX,eyeY,eyeZ)` ；
  + 观察目标点： 
    - `被观察目标` 所在的点，它可以用来确定 `视线`  `(atX,atY,atZ)` ；
  + 上方向：
    - 我们要把观察到的景象绘制到屏幕上，还要知道 `上方向`  `(upX,upY,upZ)` ；
    - 为了固定住场景；

<slide class="bg-black-blue aligncenter">

# 可视空间

<br />
<br />
<br />
:::{.content-left}

三维物体可以放在三维空间的任何地方，但是只有当它在可视范围内时，webgl才会绘制它

* 四棱锥/金字塔可视空间，由 `透视投影` 产生；

* 长方体可视空间/盒状可视空间，由 `正射投影` 产生；
:::

:::{.content-left}

!![](./othor.png)

!![](./prepestive.png)
:::

<!-- 4 -->
<slide class="bg-black-blue aligncenter">

# 最后几个概念

<br />
<br />
<br />

* 纹理
* 纹理坐标


<slide class="bg-black-blue aligncenter">

# 纹理

<br />
<br />
<br />

使用一图案或纹理确定片元的颜色


<slide class="bg-black-blue aligncenter">


# 纹理坐标

<br />
<br />
<br />

纹理坐标： 纹理图像上的坐标，可以在纹理图像上获取纹素颜色；

!![](./texture.png)