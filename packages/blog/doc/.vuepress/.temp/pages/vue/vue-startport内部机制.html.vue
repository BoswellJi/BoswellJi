<template><div><h2 id="starportcarrier-星港搬运器" tabindex="-1"><a class="header-anchor" href="#starportcarrier-星港搬运器"><span>StarportCarrier 星港搬运器</span></a></h2>
<ul>
<li>用于创建星港的全局飞行器；</li>
</ul>
<h2 id="starportcraft-星港飞行器" tabindex="-1"><a class="header-anchor" href="#starportcraft-星港飞行器"><span>StarportCraft 星港飞行器</span></a></h2>
<ul>
<li>用于将星港从老位置移动到新位置<strong>它的位置大小和<code v-pre>StarportProxy</code>组件相同</strong>；</li>
<li>获取<code v-pre>portMap</code>中的存储的<code v-pre>Starport</code>的上下文信息；</li>
</ul>
<h2 id="starport-星港" tabindex="-1"><a class="header-anchor" href="#starport-星港"><span>Starport 星港</span></a></h2>
<ul>
<li>用于创建星港容器，每个星港容器都有一个唯一的标识；</li>
<li>通过获取插槽组件，创建星港代理组件，同时将插槽组件添加到全局状态<code v-pre>portMap</code>中；</li>
</ul>
<h2 id="starportproxy-星港代理" tabindex="-1"><a class="header-anchor" href="#starportproxy-星港代理"><span>StarportProxy 星港代理</span></a></h2>
<ul>
<li>用于创建星港元素；</li>
<li>记录<code v-pre>StarportProxy</code>的dom信息，到<code v-pre>portMap</code>中；</li>
<li>用来存放<code v-pre>StarportCraft</code>的<code v-pre>Teleport</code>移动的元素；</li>
<li>跳转路由后，获取指定<code v-pre>port</code>的<code v-pre>Starport</code>,获取当前的<code v-pre>StarportProxy</code>的dom信息；</li>
</ul>
<h2 id="createinternalstate" tabindex="-1"><a class="header-anchor" href="#createinternalstate"><span>createInternalState</span></a></h2>
<ul>
<li>根据星港唯一标识获取星港实例/创建星港实例/删除星港实例；</li>
</ul>
<h2 id="createstarportinstance" tabindex="-1"><a class="header-anchor" href="#createstarportinstance"><span>createStarportInstance</span></a></h2>
<ul>
<li>创建星港实例，所有状态参数；</li>
</ul>
<h2 id="动画流程" tabindex="-1"><a class="header-anchor" href="#动画流程"><span>动画流程</span></a></h2>
<ol>
<li>
<p>创建<code v-pre>StarportCarrier</code>,初始化时<code v-pre>portMap</code>为空,所以不会创建<code v-pre>StarportCraft</code>;</p>
</li>
<li>
<p>跳转人默认路由,创建<code v-pre>Starport</code>,<code v-pre>Starport</code>内部创建<code v-pre>StarportProxy</code>,<code v-pre>StarportProxy</code>内部会创建<code v-pre>StarportInstance</code>并存入<code v-pre>portMap</code>,并且安装之后将<code v-pre>StarportProxy</code>的根元素 dom 对象赋值给<code v-pre>StarportInstance</code>属性<code v-pre>el</code>,因为<code v-pre>StarportCarrier</code>渲染函数中使用了<code v-pre>portMap</code>,所以当<code v-pre>portMap</code>更新后,会重新渲染,创建<code v-pre>StarportCraft</code>,其中会拿到安装的<code v-pre>StarportProxy</code>的 dom 对象实例，所以可以获取 dom 的尺寸位置,就会将<code v-pre>StarportCraft</code>组件移动到<code v-pre>StarportProxy</code>位置,<code v-pre>StarportCraft</code>中创建的<code v-pre>Teleport</code>会将插槽组件,移动到对应的<code v-pre>StarportProxy</code>中创建的目标<code v-pre>DOM</code>中:</p>
<ul>
<li>初始化星港<code v-pre>starport</code>生成对应的飞行器<code v-pre>StarportCraft</code>这时有了飞行器的初始化样式也就是<code v-pre>对应的星港的样式</code>；</li>
</ul>
</li>
<li>
<p>跳转页面时:</p>
<ul>
<li><code v-pre>RouterView</code>中切目标换路由,创建其中的<code v-pre>Starport</code>:
<ul>
<li>获取<code v-pre>Starportproxy</code>的位置尺寸信息;</li>
<li>首先将飞行器<code v-pre>display:block</code>，因为飞行器落地后，会<code v-pre>display:none</code>飞行器；</li>
<li>飞行器将星港元素添加到<code v-pre>Teleport</code>组件插槽中，切换<code v-pre>StarportCraft</code>飞行器的样式到<code v-pre>目标星港样式</code>；</li>
<li>到目的地后<code v-pre>display:none</code>飞行器，将<code v-pre>Teleport</code>中的插槽内容<code v-pre>星港</code>放到目标位置；</li>
</ul>
</li>
</ul>
</li>
</ol>
</div></template>


