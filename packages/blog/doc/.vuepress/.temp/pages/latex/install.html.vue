<template><div><h2 id="latex是什么" tabindex="-1"><a class="header-anchor" href="#latex是什么"><span>latex是什么？</span></a></h2>
<p>是一种基于TEX的排版系统，由美国计算机科学家莱斯利·兰伯特在20世纪80年代初期开发。</p>
<h2 id="tex是什么" tabindex="-1"><a class="header-anchor" href="#tex是什么"><span>tex是什么？</span></a></h2>
<p>是一个由美国计算机科学教授高德纳（Donald Ervin Knuth）编写的排版软件。TeX的MIME类型为<code v-pre>application/x-tex</code>，是一款自由软件。它在学术界特别是数学、物理学和计算机科学界十分流行。TEX被普遍认为是一个优秀的排版工具，尤其是对于复杂数学符号的处理。利用LATEX等终端软件，TeX就能够排版出精美的文本以帮助人们辨认和查找。</p>
<h2 id="如何安装latex" tabindex="-1"><a class="header-anchor" href="#如何安装latex"><span>如何安装latex?</span></a></h2>
<h3 id="第一步" tabindex="-1"><a class="header-anchor" href="#第一步"><span>第一步</span></a></h3>
<p>下载<code v-pre>basic-miktex-24.1-x64.exe</code>、<code v-pre>strawberry-perl-5.38.2.2-64bit.msi</code>并安装，前者是<code v-pre>latex</code>软件平台，后者是相关依赖，具体是否需要安装可看环境情况而定。</p>
<h3 id="第二步" tabindex="-1"><a class="header-anchor" href="#第二步"><span>第二步</span></a></h3>
<p>在<code v-pre>vscode</code>中下载<code v-pre>James-Yu.latex-workshop</code>插件。</p>
<h3 id="第三步" tabindex="-1"><a class="header-anchor" href="#第三步"><span>第三步</span></a></h3>
<p>在<code v-pre>latex</code>项目根目录创建<code v-pre>.vscode</code>文件夹，在其中创建自己的<code v-pre>settings.json</code>配置。具体内容如下:</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre v-pre class="language-json"><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"latex-workshop.latex.tools"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"xelatex"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"command"</span><span class="token operator">:</span> <span class="token string">"xelatex"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">        <span class="token string">"-synctex=1"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"-interaction=nonstopmode"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"-file-line-error"</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string">"%DOC%"</span></span>
<span class="line">      <span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token property">"latex-workshop.latex.recipes"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"xelatex -> bibtex -> xelatex*2"</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token property">"tools"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"xelatex"</span><span class="token punctuation">,</span> <span class="token string">"bibtex"</span><span class="token punctuation">,</span> <span class="token string">"xelatex"</span><span class="token punctuation">,</span> <span class="token string">"xelatex"</span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第四步" tabindex="-1"><a class="header-anchor" href="#第四步"><span>第四步</span></a></h3>
<p>创建<code v-pre>.tex</code>文件，并编写代码，具体如下：</p>
<div class="language-tex line-numbers-mode" data-highlighter="prismjs" data-ext="tex" data-title="tex"><pre v-pre class="language-tex"><code><span class="line"><span class="token function selector">\documentclass</span><span class="token punctuation">{</span><span class="token keyword">article</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function selector">\usepackage</span><span class="token punctuation">[</span>utf8<span class="token punctuation">]</span><span class="token punctuation">{</span><span class="token keyword">inputenc</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token function selector">\usepackage</span><span class="token punctuation">{</span><span class="token keyword">amsmath</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token function selector">\usepackage</span><span class="token punctuation">{</span><span class="token keyword">graphicx</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token function selector">\usepackage</span><span class="token punctuation">{</span><span class="token keyword">fontspec</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">% 设置正文字体，默认字体找不到，需要设置操作系统中存在的字体</span></span>
<span class="line"><span class="token function selector">\setmainfont</span><span class="token punctuation">{</span>字体名称<span class="token punctuation">}</span> <span class="token comment">% 设置正文字体</span></span>
<span class="line"><span class="token function selector">\setsansfont</span><span class="token punctuation">{</span>Arial<span class="token punctuation">}</span> <span class="token comment">% 设置无衬线字体</span></span>
<span class="line"><span class="token function selector">\setmonofont</span><span class="token punctuation">{</span>Courier New<span class="token punctuation">}</span> <span class="token comment">% 设置等宽字体</span></span>
<span class="line"></span>
<span class="line"><span class="token function selector">\title</span><span class="token punctuation">{</span>示例文档<span class="token punctuation">}</span></span>
<span class="line"><span class="token function selector">\author</span><span class="token punctuation">{</span>作者名<span class="token punctuation">}</span></span>
<span class="line"><span class="token function selector">\date</span><span class="token punctuation">{</span>今天的日期<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function selector">\begin</span><span class="token punctuation">{</span><span class="token keyword">document</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function selector">\maketitle</span></span>
<span class="line"></span>
<span class="line"><span class="token function selector">\section</span><span class="token punctuation">{</span><span class="token headline class-name">介绍</span><span class="token punctuation">}</span></span>
<span class="line">这是一个简单的文档，用于展示基本的LaTeX结构。</span>
<span class="line"></span>
<span class="line"><span class="token function selector">\section</span><span class="token punctuation">{</span><span class="token headline class-name">方程式</span><span class="token punctuation">}</span></span>
<span class="line">你可以很容易地插入数学方程，比如:</span>
<span class="line"><span class="token function selector">\begin</span><span class="token punctuation">{</span><span class="token keyword">equation</span><span class="token punctuation">}</span><span class="token equation string"></span>
<span class="line">    E = mc^2</span>
<span class="line"></span><span class="token function selector">\end</span><span class="token punctuation">{</span><span class="token keyword">equation</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function selector">\section</span><span class="token punctuation">{</span><span class="token headline class-name">图像</span><span class="token punctuation">}</span></span>
<span class="line">你也可以插入图像：</span>
<span class="line"><span class="token function selector">\begin</span><span class="token punctuation">{</span><span class="token keyword">figure</span><span class="token punctuation">}</span><span class="token punctuation">[</span>h<span class="token punctuation">]</span></span>
<span class="line">    <span class="token function selector">\centering</span></span>
<span class="line">    <span class="token function selector">\includegraphics</span><span class="token punctuation">[</span>width=0.5<span class="token function selector">\textwidth</span><span class="token punctuation">]</span><span class="token punctuation">{</span>example-image<span class="token punctuation">}</span></span>
<span class="line">    <span class="token function selector">\caption</span><span class="token punctuation">{</span>示例图像<span class="token punctuation">}</span></span>
<span class="line">    <span class="token function selector">\label</span><span class="token punctuation">{</span><span class="token keyword">fig:example</span><span class="token punctuation">}</span></span>
<span class="line"><span class="token function selector">\end</span><span class="token punctuation">{</span><span class="token keyword">figure</span><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function selector">\section</span><span class="token punctuation">{</span><span class="token headline class-name">结论</span><span class="token punctuation">}</span></span>
<span class="line">LaTeX是一个强大的工具，可以用来创建格式化的文档。</span>
<span class="line"></span>
<span class="line"><span class="token function selector">\end</span><span class="token punctuation">{</span><span class="token keyword">document</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如何在操作系统中查看支持字体：打开“控制面板”。选择“外观和个性化”然后点击“字体”，可以看到所有已安装的字体。复制字体名称替换即可。</strong></p>
</div></template>


