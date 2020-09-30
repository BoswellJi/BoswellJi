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
* 开发一个WebGL程序需要哪些前置知识?{.fadeIn.animated.delay-1200}
* 开发一个WebGL程序需要哪些步骤?{.fadeIn.animated.delay-1600}

<slide class="bg-black-blue aligncenter" >

# 什么是3D（3-dimension）?

通常我们说的`三维`是指在`平面二维系`中又加入了`一个方向向量`构成的`空间系`。三维既是坐标轴的三个轴，即x轴、y轴、z轴，其中x表示左右空间，y表示前后空间，z表示上下空间（不可用平面直角坐标系去理解空间方向）。在实际应用方面，一般把用X轴形容左右运动，而Z轴用来形容上下运动，Y轴用来形容前后运动，这样就形成了人的视觉立体感。

<slide class="bg-black-blue aligncenter">

# 什么是WebGL?

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

<slide class="bg-black-blue aligncenter">

# 开发一个WebGL程序需要哪些前置知识?

<slide class="bg-black-blue aligncenter">

# 着色器程序
<br />
<br />
<br />

* webgl的绘图程序；
* webgl由两部分组成： 
    + 顶点着色器
        - 顶点：二维或者三维中的一个点，比如二维或者三维图形的端点和交点；

    + 片元着色器
        - 片元：可以理解为像素，图像的单元；

<slide class="bg-black-blue aligncenter">

# 矩阵和矢量
<br />
<br />
<br />

:::{.content-left}
### 矢量
* 许多物理量（温度，质量等）与空间中的任何方向无关，完全由数值大小来定义，这些量称为 `标量` ；
* 其他物理量（速度，加速度或者力）需要用一个数值和一个方向才能得到完全的定义，这些量为 `矢量` ；
:::

:::{.content-right}
### 矩阵
* 由行和列组成
* 矩阵每个数值称为矩阵元素
* 一个由m行和n列组成的矩阵，称为矩阵的维数 `m * n`;
:::

<slide class="bg-black-blue aligncenter">

# 坐标系
<br />
<br />
<br />

* 为了 `确定在哪个位置` 绘制webgl对象，需要定义一个坐标系, 也叫做 `空间` ; 
* webgl使用三维，正交（任何一个都与其他两轴垂直），右手坐标系, `x,y,z轴` ；
* 每个轴都被 `归一化` 为 `单位长度` (是单位长度，不是长度单位)，其实也就是 `1` ；


<slide class="bg-black-blue aligncenter">

# 开发一个WebGL程序需要哪些步骤?