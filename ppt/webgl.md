title: webgl
speaker: jmz
plugins:

    - echarts

<slide class="bg-black-blue aligncenter" image="https://source.unsplash.com/C1HhAQrbykQ/ .dark">

# webgl {.text-landing.text-shadow}

By jmz {.text-intro}

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

* `WebGLRenderingContext`接口提供绘图上下文，用于在 HTML `<canvas>` 元素内绘图；
* 要获得这个接口的对象，可以通过在 `<canvas>` 元素上调用 getContext() 函数，调用时传入 “webgl” 参数；

```
const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');
```

<slide class="bg-black-blue aligncenter">

# 着色器

<br />
<br />
<br />

* 着色器

<slide class="bg-black-blue aligncenter">

# glsl es

<br />
<br />
<br />

* 着色器

<slide class="bg-black-blue aligncenter">

# 缓冲区

<br />
<br />
<br />

* 着色器

<slide class="bg-black-blue aligncenter">

# 绘制


<!-- 2 -->
<slide class="bg-black-blue aligncenter">

# 再来几个概念

<br />
<br />
<br />

* 变换
* 动画
* 矩阵

<!-- 3 -->
<slide class="bg-black-blue aligncenter">

# 最后来几个概念

<br />
<br />
<br />

* 照相机
* 可视空间
