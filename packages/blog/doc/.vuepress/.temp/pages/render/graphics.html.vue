<template><div><h2 id="图形系统" tabindex="-1"><a class="header-anchor" href="#图形系统"><span>图形系统</span></a></h2>
<ul>
<li>
<p>屏幕上所有的像素的颜色值都存储在一个被称为<code v-pre>帧缓冲区（frame buffer）</code>巨大的内存块中；</p>
</li>
<li>
<p>改变屏幕上的图片需要改变被存储在<code v-pre>帧缓存区（frame buffer）</code>中的颜色值；</p>
</li>
<li>
<p>屏幕每秒被重新绘制许多次；</p>
</li>
</ul>
<h2 id="gui" tabindex="-1"><a class="header-anchor" href="#gui"><span>gui</span></a></h2>
<ul>
<li>gui的特点就是，这个ui thread，不要block它，因为它有任务在身，每隔1/60s左右，它要执行一次渲染任务，就是在屏幕上把你要的图形给绘制出来，所以如果有操作block了这个线程，超过1/60s的话，用户就会觉得卡顿</li>
</ul>
<h2 id="渲染" tabindex="-1"><a class="header-anchor" href="#渲染"><span>渲染</span></a></h2>
<ul>
<li>概念：计算机将用数学描述的3d场景通过计算自动化成图像的过程；</li>
<li>图像：对于计算机来说，图像就是一个二维排列的数据块，是一个离散采集的样本集；</li>
<li>所以，渲染可以看做是对 <code v-pre>3d场景</code> 的 <code v-pre>数学模型</code> 进行 <code v-pre>离散采样</code> 的一个过程；</li>
</ul>
<h2 id="渲染技术的分类" tabindex="-1"><a class="header-anchor" href="#渲染技术的分类"><span>渲染技术的分类：</span></a></h2>
<ul>
<li>
<p>扫描线渲染与栅格化：将场景切碎（离散）之后，贴到图像（屏幕）上来</p>
<ul>
<li>将场景物体投射到屏幕上之后离散， <code v-pre>从而确定颜色</code> ；</li>
</ul>
</li>
<li>
<p>光线追踪：将图像切碎后投射到场景当中去；</p>
<ul>
<li>将像素沿视线方向投射到场景物体表面, <code v-pre>从而确定颜色</code> ；</li>
<li>根据几何光学，从反射光线或者折射光线入手，倒推出入射光线，然后，沿着入射光线的反方向一路继续倒退，直到找到光源；</li>
</ul>
</li>
<li>
<p>辐射着色</p>
</li>
<li>
<p>光线投射</p>
</li>
</ul>
<h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论"><span>结论：</span></a></h2>
<ul>
<li>
<p>光线追踪和辐射度方法，主要是一种光照模型，光线追踪擅长 <code v-pre>镜面反射</code> 和 <code v-pre>折射</code> ，而辐射度方法擅长 <code v-pre>漫反射</code> 和 <code v-pre>大面积光源</code> 的模拟</p>
</li>
<li>
<p>一个完整的渲染</p>
<ul>
<li>采样方法</li>
<li>光照模型</li>
<li>材质模型</li>
</ul>
</li>
</ul>
<h2 id="网格渲染-阴影渲染" tabindex="-1"><a class="header-anchor" href="#网格渲染-阴影渲染"><span>网格渲染，阴影渲染</span></a></h2>
<ul>
<li>视觉工业，CG领域的技术实现思路完全不同
<ul>
<li>这些工具会借鉴类似游戏领域的思路，（类似引文中的 <code v-pre>预渲染技术</code> 为主,</li>
<li>CG专业工具都要求 <code v-pre>渲染管线</code> 的完整，精确和前后统一，更多采用 <code v-pre>延迟渐进</code> 的 <code v-pre>准实时渲染</code> 方案, 也被称为 <code v-pre>交互式渲染</code></li>
<li>其架构能使用所有可用的计算单元，（cpu+gpu，并随网络节点平行扩展）充分利用计算资源，接近 <code v-pre>实时渲染</code></li>
</ul>
</li>
</ul>
<h2 id="实时渲染" tabindex="-1"><a class="header-anchor" href="#实时渲染"><span>实时渲染</span></a></h2>
<ul>
<li>在三维场景有动态的时候，计算机给你即时的 <code v-pre>光影</code> / <code v-pre>（光照，阴影）</code> 反馈；</li>
<li>涉及到需要人机交互并且需要实时反馈的画面，都需要用到实时渲染；</li>
</ul>
<h2 id="实时" tabindex="-1"><a class="header-anchor" href="#实时"><span>实时</span></a></h2>
<ul>
<li>液晶显示屏上的画面，都是靠计算机一幅幅画出来的；所以显示器有个属性叫做 <code v-pre>刷新率</code> ;
<ul>
<li>液晶显示器的内容是计算机一帧，一帧画出来的，所以叫 <code v-pre>实时的</code></li>
<li>动画片的 <code v-pre>下一幅</code> 都是过去画好的，所以叫 <code v-pre>非实时，离线的</code></li>
</ul>
</li>
</ul>
<h2 id="渲染-1" tabindex="-1"><a class="header-anchor" href="#渲染-1"><span>渲染</span></a></h2>
<ul>
<li>是一个过程，把人为组织好的数据，经过计算机处理后，呈现到屏幕上的过程
<ul>
<li>组织好的数据：美术人员画好的图，做好的3d模型；</li>
</ul>
</li>
</ul>
</div></template>


