<template><div><h2 id="传输控制协议-transmission-control-protocol" tabindex="-1"><a class="header-anchor" href="#传输控制协议-transmission-control-protocol"><span>传输控制协议(Transmission Control Protocol)</span></a></h2>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h3>
<p>位于网络模型层中的传输层；
Http1.1 中规定，一个域名可以有 6 个 Tcp 连接；
Http2 中规定，一个域名只有 1 个 Tcp 连接；</p>
<h3 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点"><span>缺点</span></a></h3>
<ul>
<li>
<p>Tcp 队头阻塞；</p>
</li>
<li>
<p>Tcp 握手时间长；</p>
<ul>
<li>RTT(网络延迟): 发送一个请求数据包到服务器，再从服务器得到响应数据包的这段时间</li>
</ul>
</li>
</ul>
</div></template>


