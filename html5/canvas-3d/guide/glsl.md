# glsl(专门用来编写着色器的编程语言)

## 数据，变量，和变量类型

## 矢量，矩阵，结构体，数组，采样器（纹理）

## 运算，程序流，函数

## attribute, uniform, varying变量

## 精度限定词

## 预处理和指令

## 应用领域

* 消费电子产品
* 嵌入式设备，手机，或者游戏主机
* 图像处理和数据运算

## 起源

* 在opengl着色器语言glsl之上的编程语言 `glsl es` , 所以进行了散出，简化；

## 数据值类型（数值和布尔值）

* 数值类型：整型数，浮点数
* 布尔类型：true, false

## 变量

* 命名： 不能以 `gl_` , `webgl_` , `_webgl_` 开头, 这些被opengl es 保留了；

## 基本数据类型

* float
* int
* bool

## 类型转换

1. ` int i = 9; float f = float(i)`

## 矢量和矩阵(类型，集合类型)

矢量: 矢量构造函数

* 用来存储顶点坐标，颜色，纹理坐标

``` 
（2，2，3）
 vec2，  vec3，   vec4    浮点型集合， 
 ivec2， ivec3，  ivec4， 整型集合
 bvec2， bvec3，  bvec4， 布尔型集合
```

* 矢量变量中访问分量名： vertex.x: `(x)` ，还可以 vertex.xy: `(x,y)` , 这个叫做 `混合`
分量名： 
x, y, z, w 用来获取顶点坐标分量
r, g, b, a 用来获取颜色分量
s, t, p, q 获取纹理坐标分量(只用到了s, t)

* 矢量的运算

v3c = v3a + v3b; 
=>
v3a.x + v3b.x
v3a.y + v3b.y
v3a.z + v3b.z

矩阵: 矩阵构造函数，*数据必须是按照列主序排列的*

``` 
[
 a,b
 d,e
]
都是浮点型集合：
mat2: 2 * 2
mat3: 3 * 3
mat4：4 * 4
```

* 我们使用等号（=）来对矢量和矩阵进行赋值操作；

* 矩阵和浮点数的运算

m3b = m3a * f; 
=>
m3b[0].x = m3b[0].x * f; 

* 矩阵右乘矢量 `(矩阵和矢量的左右相乘是不同的)`
v3b = m3a * v3a; 

* 矩阵与矩阵相称

* 结构体

``` 
struct light{
  vec4 color;
  vec3 position;
}
```

* 数组

``` 
floatArray
vec4Array
```

取样器

* sampler

``` 
sampler2D
samplerCube
```

* 参数限定词：

* 内置函数：

* 全局变量和局部变量

* 存储限定字

 - const：常量
 - attribute: 变量， `只能被声明为全局变量` ， `只能在顶点着色器中` , `逐顶点`
 
 - uniform: `只读，不能被修改`
 - varying: 
  

* 精度限定字

 - highp: 高精度，顶点着色器的最低精度
 - mediump： 中精度
 - lowp： 低精度

 - 使用关键字precision声明着色器默认精度

  + precision 精度限定字 类型名称； `说明接下来的所有不以精度限定字符修饰的该类型变量，其精度就是默认精度`
  + 例如： precision mediump float; `说明，所有float 以及相关的vec2,mat3的变量都是中精度的`
  + 片元着色器中的float类型没有默认精度，其他类型都实现了默认精度
  + 顶点着色器中实现了默认的精度，所有类型

* 预处理指令
 - 用来在真正编译之前对代码进行预处理
 - 例子：

``` 
#ifdef GL_ES 
precision mediump float;
#endif
```
- #ifdef GL_ES  #endif 是否定义了GL_ES宏
- #if #endif   if语句
- #ifndef GL_ES #endif 是否没有定义GL_ES宏
  
* 内置宏
 - GL_ES 
 - GL_FRAGMENT_PRECISION_HIGH

* 宏定义，使用#define指令

``` 
#define NUM 100  定义 NUM 为宏
#if NUM == 100
如果宏NUM为100执行这里的代码
#else
否则，执行这里
#endif
```

glsl es： 支持一些转为计算机图形学而设计的专属特性， `矢量，矩阵` ， `访问矢量，矩阵元素的特殊分量名` ， `矢量和矩阵操作`
