<template><div><h2 id="http-缓存" tabindex="-1"><a class="header-anchor" href="#http-缓存"><span>http 缓存</span></a></h2>
<ul>
<li>缓存是一种存储指定资源副本的技术，当请求时再将它返回；</li>
</ul>
<h3 id="缓存的变更" tabindex="-1"><a class="header-anchor" href="#缓存的变更"><span>缓存的变更</span></a></h3>
<h3 id="缓存类型" tabindex="-1"><a class="header-anchor" href="#缓存类型"><span>缓存类型</span></a></h3>
<ul>
<li>私有/本地浏览器缓存；</li>
<li>共享代理缓存；
<ul>
<li>浏览器缓存，代理缓存，网关缓存，cdn 缓存，反向代理缓存，负载均衡；</li>
</ul>
</li>
</ul>
<h3 id="文件缓存时间已经过期-但是内容并未发生变化-如何避免浪费请求" tabindex="-1"><a class="header-anchor" href="#文件缓存时间已经过期-但是内容并未发生变化-如何避免浪费请求"><span>文件缓存时间已经过期，但是内容并未发生变化,如何避免浪费请求?</span></a></h3>
<ul>
<li>文件最新修改时间的对比；</li>
</ul>
<h3 id="max-age-expires-不过期-浏览器无法跳过缓存过期时间-主动感知文件变化" tabindex="-1"><a class="header-anchor" href="#max-age-expires-不过期-浏览器无法跳过缓存过期时间-主动感知文件变化"><span>max-age,expires 不过期，浏览器无法跳过缓存过期时间，主动感知文件变化；</span></a></h3>
<h3 id="缓存方案" tabindex="-1"><a class="header-anchor" href="#缓存方案"><span>缓存方案</span></a></h3>
<ul>
<li>md5/hash 缓存： 不缓存 html,为静态文件添加 md5,hash 标识;</li>
</ul>
<h3 id="缓存位置" tabindex="-1"><a class="header-anchor" href="#缓存位置"><span>缓存位置</span></a></h3>
<ul>
<li>
<p>Service Worker</p>
</li>
<li>
<p>Memory Cache：是浏览器为了加速读取缓存速度进行的自身的优化行为，不受开发者和 http 协议头的约束；</p>
</li>
<li>
<p>Disk Cache：http cache,严格根据 http 头信息中的各类字段来判断哪些资源可以缓存；</p>
</li>
</ul>
</div></template>


