<template><div><h2 id="transport-layer-security-传输层安全协议" tabindex="-1"><a class="header-anchor" href="#transport-layer-security-传输层安全协议"><span>Transport Layer Security(传输层安全协议)</span></a></h2>
<ul>
<li>以前被称为<code v-pre>ssl:安全套接层协议</code>;</li>
<li>属于网络模型中的<code v-pre>运输层协议</code>;</li>
<li>公钥/私钥;</li>
<li>利用公钥进行加密操作,私钥进行解密;</li>
</ul>
<h2 id="作用" tabindex="-1"><a class="header-anchor" href="#作用"><span>作用</span></a></h2>
<ul>
<li>通过<code v-pre>密码协议</code>提供网络传输的安全,确保没有第三方可以<code v-pre>偷听</code>和<code v-pre>篡改</code>传输的信息;</li>
</ul>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2>
<ul>
<li>这是一个client/server协议,因此需要都支持此协议;</li>
<li>为了建立安全连接,server需要提供一个满足身份识别的有效的<code v-pre>数字证书</code>;</li>
</ul>
<h2 id="数字证数" tabindex="-1"><a class="header-anchor" href="#数字证数"><span>数字证数</span></a></h2>
<ul>
<li>是一个将公开的已知密码私钥绑定到组织的数据文件;</li>
<li>包含内容: <code v-pre>有关组织的信息</code>
<ul>
<li>通用名称</li>
<li>组织单位</li>
<li>位置</li>
<li>公钥</li>
<li>等</li>
</ul>
</li>
<li>通常由<code v-pre>证书颁发机构</code>签名,证明证书的真实性;</li>
</ul>
<h2 id="凭证管理中心-ca" tabindex="-1"><a class="header-anchor" href="#凭证管理中心-ca"><span>凭证管理中心<code v-pre>(CA)</code></span></a></h2>
<ul>
<li>CA是对<code v-pre>数字证书</code>及其<code v-pre>相关公钥</code>进行签名的组织;</li>
</ul>
<h2 id="生成自签名证书" tabindex="-1"><a class="header-anchor" href="#生成自签名证书"><span>生成自签名证书</span></a></h2>
<ul>
<li>
<p>前提条件</p>
<ul>
<li>生成私密密钥的工具<code v-pre>openssl</code>;</li>
<li>依赖公钥基础设施的<code v-pre>ssl/tls</code>协议集合;</li>
<li>服务器必须要有一个私钥;</li>
</ul>
</li>
<li>
<p>https服务器创建步骤</p>
<ul>
<li>通过<code v-pre>openssl</code>生成数字证数文件;</li>
<li><code v-pre>openssl genrsa -out ryans-key.pem 2048</code>: rsa私钥</li>
<li><code v-pre>openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem</code>: csr的私钥</li>
<li><code v-pre>openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem</code>: 自签名的证书</li>
</ul>
</li>
</ul>
</div></template>


