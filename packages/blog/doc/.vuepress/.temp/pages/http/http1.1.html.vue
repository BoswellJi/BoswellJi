<template><div><ul>
<li>最初http1.1规格规定，一个客户端最大允许使用两个tcp连接每个主机；</li>
</ul>
<h2 id="http-头部" tabindex="-1"><a class="header-anchor" href="#http-头部"><span>http 头部</span></a></h2>
<h3 id="文件缓存相关" tabindex="-1"><a class="header-anchor" href="#文件缓存相关"><span>文件缓存相关</span></a></h3>
<ul>
<li>
<p>Age：文件缓存的时间，相对于代理客户端操作系统的本地时间；</p>
</li>
<li>
<p>Expires: 文件缓存的过期日期；</p>
</li>
<li>
<p>cache-control:</p>
<ul>
<li><code v-pre>max-age=&lt;seconds&gt;</code>: 设置缓存存储的最大周期，时间是相对请求时间；</li>
</ul>
</li>
<li>
<p>ETag：资源特定版本的标识符；</p>
</li>
<li>
<p>Last-Modified: 源头服务器认定的资源被修改的日期及时间；</p>
</li>
</ul>
</div></template>


