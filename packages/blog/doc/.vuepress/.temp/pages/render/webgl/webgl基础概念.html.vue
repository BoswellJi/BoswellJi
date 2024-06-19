<template><div><h1 id="webgl" tabindex="-1"><a class="header-anchor" href="#webgl"><span>webgl</span></a></h1>
<ul>
<li>一个光栅化引擎： 根据你的代码绘制出，点，线，和三角形，实现更复杂的任务，取决你能否提供合适的代码，组合使用，点，线，三角形；</li>
<li>webgl在gpu上运行，所以需要能够在gpu上运行的代码，这样的代码需要提供成对的方法；</li>
<li>每对方法都有一个顶点着色器和片段着色器，使用 <code v-pre>强类型语言GLSL</code> , 每对组合起来称为 <code v-pre>program</code> ;</li>
<li>大部分 <code v-pre>webgl api</code> ，都是关于如何设置这些成对方法的状态值和运行他们；</li>
<li>webgl被创建出来，就是为了在网页上创建三维的应用和用户体验；</li>
<li>从传统意义上来说，为了显示三维图形，开发者需要使用c或者c++语言，辅以专门的计算机图形库，如 <code v-pre>openGL</code> ， <code v-pre>Direct3D</code> ；</li>
<li>向html和js中添加额外的三维图形学的代码，就可以在网页上显示三维图形了；</li>
<li>webgl是内嵌在浏览器中的；所以跨平台；</li>
<li>webgl程序的结构
<ul>
<li>glsl es, webgl, opengl/opengl es, js web api</li>
</ul>
</li>
<li>主要的几个矩阵：
<ul>
<li>变换/模型矩阵
<ul>
<li>平移矩阵</li>
<li>旋转矩阵</li>
<li>缩放矩阵</li>
</ul>
</li>
<li>视图矩阵</li>
<li>投影矩阵
<ul>
<li>正射投影矩阵</li>
<li>透视投影矩阵</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="工作原理" tabindex="-1"><a class="header-anchor" href="#工作原理"><span>工作原理</span></a></h2>
<ul>
<li>将顶点（数据流）转换到裁剪空间坐标系； <code v-pre>(每个顶点都会调用顶点着色器)</code></li>
<li>基于第一部分的结果绘制像素点； <code v-pre>（计算出三个顶点对应的像素后，就会光栅化三角形，光栅化：用像素画出，每个像素都会调用片段着色器）</code></li>
<li>对于想要绘制的每个对象，都需要先设置一系列状态值，然后调用 <code v-pre>gl.drawArrays</code> 或 <code v-pre>gl.drawElements</code> 运行一个着色方法对；</li>
</ul>
<h2 id="着色器" tabindex="-1"><a class="header-anchor" href="#着色器"><span>着色器</span></a></h2>
<ul>
<li>使用opengl的着色语言glsl编写程序；</li>
<li>携带绘制形状的顶点信息和构造绘制在屏幕上的像素所需要信息（像素点的位置和颜色</li>
</ul>
<h2 id="着色器分类" tabindex="-1"><a class="header-anchor" href="#着色器分类"><span>着色器分类</span></a></h2>
<ul>
<li>顶点着色器和片段着色器</li>
</ul>
<h3 id="顶点着色器" tabindex="-1"><a class="header-anchor" href="#顶点着色器"><span>顶点着色器</span></a></h3>
<ul>
<li>图像的顶点（坐标</li>
<li>gl_Position: 每次计算给这个特殊变量赋值，就可以确定顶点坐标值，GPU将其保存起来</li>
</ul>
<h3 id="片段着色器" tabindex="-1"><a class="header-anchor" href="#片段着色器"><span>片段着色器</span></a></h3>
<ul>
<li>被绘制的图形的每个像素点调用一次，职责是确定像素的颜色；</li>
<li>通过指定应用到像素的纹理元素（也就是图形纹理中的像素）；</li>
<li>gl_FragColor: 每次计算给这个特殊变量赋值，就可以确定一个颜色值，实现自定义像素颜色；</li>
</ul>
<h2 id="glsl" tabindex="-1"><a class="header-anchor" href="#glsl"><span>GLSL</span></a></h2>
<h2 id="数据类型-每种数据依据作用不同可以被一种或者全部shader访问-都可以使用javascript访问-着色器获取数据的4种方法" tabindex="-1"><a class="header-anchor" href="#数据类型-每种数据依据作用不同可以被一种或者全部shader访问-都可以使用javascript访问-着色器获取数据的4种方法"><span>数据类型 <code v-pre>每种数据依据作用不同可以被一种或者全部shader访问，都可以使用javascript访问，着色器获取数据的4种方法：</code></span></a></h2>
<ul>
<li><code v-pre>attributes 和 bufferr: 通过缓冲区提供数据</code>
<ul>
<li>可以被javascript操作，也可以被vertex shader作为变量访问</li>
</ul>
</li>
<li><code v-pre>uniforms (全局变量): 在一次绘制中对所有顶点保持一致值</code></li>
<li><code v-pre>varyings （可变量）: 从顶点着色器转递到片段着色器的值</code></li>
<li><code v-pre>textures （纹理）: 从像素或者纹理元素中获取的数据</code></li>
<li>texture2D: 抽取纹素颜色 <code v-pre>（参数：纹理单元编号，纹理坐标）</code></li>
</ul>
<h2 id="_3d" tabindex="-1"><a class="header-anchor" href="#_3d"><span>3d</span></a></h2>
<ul>
<li>组成：由点组成，两个点组成一条线，三个不在一条直线上的点组成三角形面，多个三角形面组成各种形状的物体；</li>
</ul>
<h2 id="右手坐标系" tabindex="-1"><a class="header-anchor" href="#右手坐标系"><span>右手坐标系</span></a></h2>
<h2 id="缓冲区" tabindex="-1"><a class="header-anchor" href="#缓冲区"><span>缓冲区</span></a></h2>
<ul>
<li>颜色缓冲区 <code v-pre>gl.COLOR_BUFFER_BIT</code></li>
<li>深度缓冲区 <code v-pre>gl.DEPTH_BUFFER_BIT</code></li>
<li>模板缓冲区 <code v-pre>gl.STENCIL_BUFFER_BIT</code></li>
</ul>
<h3 id="清空缓冲区" tabindex="-1"><a class="header-anchor" href="#清空缓冲区"><span>清空缓冲区</span></a></h3>
<ul>
<li><code v-pre>gl.clearColor(red,green,blue,alpha) (0.0,0.0,0.0,0.0)</code></li>
<li><code v-pre>gl.clearDepth(depth)  1.0</code></li>
<li><code v-pre>gl.clearStencil(s) 0</code></li>
</ul>
</div></template>


