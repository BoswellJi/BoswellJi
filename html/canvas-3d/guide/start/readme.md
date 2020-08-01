## canvas是什么？
- html5之前在网页上显示图像，只能使用html提供的原生方案img标签；
- 但是只能展示静态的图片，不能进行实时绘制和渲染；
- 解决问题的方法： Flash player;
- 直到`html5`中的`canvas`;
- canvas定义了网页上的`绘图区域`；

## 在canvas中绘制2维图形
- 使用canvas的`2维,canvas`绘图系统；
- 使用canvas的`3维，webgl`绘图系统；


对场景有哪些影响：

1. 光线照上去
2. 观察者的视角发生变化

着色器可以高度灵活地完成这些工作，提供各种渲染效果；

webgl程序执行流程：

1. 获取canvas元素
2. 获取webgl绘图上下文
3. 初始化着色器
4. 设置canvas背景色
5. 清除canvas
6. 绘制

顶点着色器的内置变量：

1. vec4 gl_Position：  顶点位置
  + 齐次坐标，具有4个分量，如果齐次坐标最后一个分量是 `1.0` ，那么它的前三个分量就可以表示一个三维坐标； `（必须是1.0）` 
  + 齐次坐标中的 `gl_Position` 对象可以单独访问它的属性， `gl_Position.x， gl_Position.y， gl_Position.z， gl_Position.w` 
2. float gl_PointSize: 点的尺寸（像素数

片元着色器内置变量：（唯一内置的变量

1. vec4 gl_fragColor 片元颜色（rgba格式）
* 对这个内置变量赋值后，相应像素就会以这个颜色值显示

GLSL中的数据类型：
1 float： 表示浮点数
2 vec4: 表示由四个浮点数组成的矢量(4个分量组成的矢量称为：齐次坐标)

齐次坐标：
如果第4个分量为1.0，那么齐次坐标，前三个分量为坐标值的那个点
矢量也叫做向量，特殊语境下叫做法向量

优化：
为变量指定类型，系统就能够轻松理解变量中存储的是何种数据，进而优化处理这些数据；

绘制操作：

1. gl.drawArrays(gl.POINTS,0,1);
* 可以绘制各种图形
* 参数： gl.drawArrays(mode, first, count)
  + mode(绘制方式，常量符号): gl. POINTS gl. LINES, gl. LINE_STRIP
  + first: 指定从哪个顶点开始绘制
  + count: 指定绘制需要用到多少顶点

webgl坐标系统：

1. webgl是处理三维图形，所以它使用的三维坐标系（笛卡尔坐标系），有x,y,z轴；
2. 又称为右手坐标系；
3. webgl坐标于canvas坐标对应关系：
  + canvas的中心点：(0.0, 0.0, 0.0)
  + canvas的左边缘与右边缘：(-1.0, 0.0, 0.0) 和 (1.0, 0.0, 0.0)
  + canvas的上边缘与下边缘：(0.0, 1.0, 0.0) 和 (0.0, -1.0, 0.0)
4. 将客户区坐标系统，转换到canvas坐标系统，再转换到webgl坐标系
5. webgl坐标系的中心，再canvas元素的中心点（canvas.width/2,canvas.height/2）
6. canvas坐标系转webgl坐标系公式：

``` 
x = ((x-rect.left) - canvas.width/2) / (canvas.width/2);
y = (canvas.height/2 - (y-rect.top)) / (canvas.height/2);
```

webgl与javascript之间传输数据：
目标： 从javascript中设置的顶点的位置坐标，传到着色器程序中；
方式： attribute 和 uniform

1. uniform 传输的是对于所有顶点都相同的数据（与顶点无关
2. attribute 顶点坐标

顶点着色器使用attribute变量的步骤：

1. 在顶点着色器中，生命attribute变量
2. 将attribute变量赋值给gl_Position
3. 向attribute 传输数据

```处理glsl中变量的函数：

1. vertexAttrib3f方法的同族函数：

1. vertexAttrib1f
2. vertexAttrib2f
3. vertexAttrib3f
4. vertexAttrib4f

2. vertexAttrib1f方法的矢量版本：（在方法的结尾处以 ‘v’ 字符结尾）

* 这个矢量版本函数，接手类型化数组作为参数，函数名中的数字表示数组中的元素个数
1. vertexAttrib1fv
2. vertexAttrib2fv
3. vertexAttrib3fv
4. vertexAttrib4fv

3. uniform4f函数与vertexAttrib4f函数相同：

4. uniformMatrix4fv: 处理矩阵的函数

``` 

openGL中函数的命名规范：
基础函数名 参数个数 参数类型
vertexAttrib [123](attribute矢量中元素个数) f(float)

三维模型：

1. 构成三维模型的基本单位是三角形；
2. 不管三维模型多复杂，其基本组成部分都是三角形；

变换或者仿射变换：

* 平移
* 旋转: `旋转轴，旋转方向，旋转角度` 
  + 旋转方向的问题： 沿着z轴正半轴某处，视线沿着z轴负方向进行观察，看到的物体就是逆时针旋转的；（向左为逆，向右为顺
* 缩放： `缩放因子` 

需要用到数学知识，不过可以借助函数库来进行数学计算；

矩阵：

1. 是一个矩形的二维数组
2. 数字按照行（水平方向），列（垂直方向）排列

[
  [8, 3, 0], 
  [4, 3, 6], 
  [3, 2, 3]
]

矢量：

1. 就是由多个分量组成的对象

[0, 0.5, 1]

矩阵 * 矢量

[                [
  [8, 3, 0],          x, 
  [4, 3, 6], *        y, 
  [3, 2, 3]           z
]                ]

x' = 8*x + 3*y + 0*z; 
y' = 4*x + 3*y + 6*z; 
z' = 3*x + 2*y + 3*z; 

以z轴为旋转轴：

三角函数公式：

1. sin(a+b) = sin(a) * cos(b) + cos(a) * sin(b); 正弦
2. cos(a+b) = cos(a) * cos(b) - sin(a) * sin(b); 余弦

计算p点的坐标：

1. cos(a) = 临边/斜边
2. sin(a) = 对边/斜边

```
 x轴先旋转 a角度，再旋转 b角度, p点的坐标为 （x, y, z）, 原点距离点p的距离为r; 

 计算旋转 a角度后的 p点坐标:
 x = r * cos(a); 
 y = r * sin(a); 
 
 计算旋转a+b角度后的 p点的坐标:
 x' = r * cos(a+b); 
 y' = r * sin(a+b); 

 转换：
 x' = r * ( cos(a) * cos(b) - sin(a) * sin(b) ); 
 y' = r * ( sin(a) * cos(b) + cos(a) * sin(b) ); 

 转换：
 x' = r * cos(a) * cos(b) - r * sin(a) * sin(b); 
 y' = r * sin(a) * cos(b) + r * cos(a) * sin(b); 

 根据三角函数进行转换:
 x' = x * cos(a) - y * sin(b); 
 y' = x * sin(b) + y * cos(a); 

``` 

变换矩阵：在三维图形学中非常重要；

1. 旋转：这种矩阵也被称为旋转变换矩阵 ；
2. 平移：这种矩阵也被称为平移变换矩阵 ；
3. 缩放：这种矩阵也被称为缩放变换矩阵 ；

- 根据矩阵来计算坐标位置
- 优势： 不需要重新定义着色器
- 矩阵 * 矢量（旧坐标） = 新坐标

```矩阵替换数学表达式
 旋转矩阵：
 数学表达式：
 y' = x * sin(b) + y * cos(a); 
 x' = x * cos(a) - y * sin(b); 
 z' = 1; 

 矩阵表达式：
 x' = ax + by + cz; 
 y' = dx + ey + fz; 
 z' = gx + hy + iz

 a = cos(a), b = -sin(a), c = 0
 d = sin(a), e = cos(a), f = 0
 g = 0, h = 0, i =1
 
 平移矩阵：(因为这个等式中有t, 下一个等式中没有t, 所以需要借助4*4矩阵)
 数学表达式：
 x' = x + t; 
 y' = y + t; 
 z' = 1; 

 矩阵表达式：
 x' = ax + by + cz + d; 
 y' = ex + fy + gz + h; 
 z' = ix + jy + kz + l; 
 1 =  mx + ny + oz + p; 

 a = 1, b = 0, c = 0, d = t, 
 e = 0, f = 1, g = 0, h = t, 
 i = 0, j = 0, k = 0, l = 0, 
 m = 0, n = 0, o = 0, p = 1; 

 缩放矩阵：
 数学表达式：
 x' = x * s; 
 y' = y * s; 
 z' = z * s; 
 1 = w * 1; 

 矩阵表达式：
 x' = ax + by + cz + d; 
 y' = ex + fy + gz + h; 
 z' = ix + jy + kz + l; 
 1 =  mx + ny + oz + p; 

 a = s, b = 0, c = 0, d = 0, 
 e = 0, f = s, g = 0, h = 0, 
 i = 0, j = 0, k = s, l = 0, 
 m = 0, n = 0, o = 0, p = 1; 

 将不同阶数的矩阵相乘的方法：
 - 将阶数少的矩阵转换为阶数多个矩阵
```

着色器本身就实现了矩阵和矢量相乘的功能；

矩阵都是二维的，数组是一维的，需要： 按列主序, 按行主序 两种方式存储在数组中；

webgl中的矩阵存储在数组中的方式： 按列主序存储；

## webgl中涉及的矩阵
- 模型矩阵：平移，缩放，旋转矩阵等
- 视图矩阵：观察者状态
- 投影矩阵：透视模型，盒模型