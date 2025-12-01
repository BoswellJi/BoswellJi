## latex是什么？

是一种基于TEX的排版系统，由美国计算机科学家莱斯利·兰伯特在20世纪80年代初期开发。

## tex是什么？

是一个由美国计算机科学教授高德纳（Donald Ervin Knuth）编写的排版软件。TeX的MIME类型为`application/x-tex`，是一款自由软件。它在学术界特别是数学、物理学和计算机科学界十分流行。TEX被普遍认为是一个优秀的排版工具，尤其是对于复杂数学符号的处理。利用LATEX等终端软件，TeX就能够排版出精美的文本以帮助人们辨认和查找。

## 如何安装latex?

### 第一步

下载`basic-miktex-24.1-x64.exe`、`strawberry-perl-5.38.2.2-64bit.msi`并安装，前者是`latex`软件平台，后者是相关依赖，具体是否需要安装可看环境情况而定。

### 第二步

在`vscode`中下载`James-Yu.latex-workshop`插件。

### 第三步

在`latex`项目根目录创建`.vscode`文件夹，在其中创建自己的`settings.json`配置。具体内容如下:

```json
{
  "latex-workshop.latex.tools": [
    {
      "name": "xelatex",
      "command": "xelatex",
      "args": [
        "-synctex=1",
        "-interaction=nonstopmode",
        "-file-line-error",
        "%DOC%"
      ]
    }
  ],
  "latex-workshop.latex.recipes": [
    {
      "name": "xelatex -> bibtex -> xelatex*2",
      "tools": ["xelatex", "bibtex", "xelatex", "xelatex"]
    }
  ]
}
```

### 第四步

创建`.tex`文件，并编写代码，具体如下：

```tex
\documentclass{article}

\usepackage[utf8]{inputenc}
\usepackage{amsmath}
\usepackage{graphicx}
\usepackage{fontspec}

% 设置正文字体，默认字体找不到，需要设置操作系统中存在的字体
\setmainfont{字体名称} % 设置正文字体
\setsansfont{Arial} % 设置无衬线字体
\setmonofont{Courier New} % 设置等宽字体

\title{示例文档}
\author{作者名}
\date{今天的日期}

\begin{document}

\maketitle

\section{介绍}
这是一个简单的文档，用于展示基本的LaTeX结构。

\section{方程式}
你可以很容易地插入数学方程，比如:
\begin{equation}
    E = mc^2
\end{equation}

\section{图像}
你也可以插入图像：
\begin{figure}[h]
    \centering
    \includegraphics[width=0.5\textwidth]{example-image}
    \caption{示例图像}
    \label{fig:example}
\end{figure}

\section{结论}
LaTeX是一个强大的工具，可以用来创建格式化的文档。

\end{document}
```

**如何在操作系统中查看支持字体：打开“控制面板”。选择“外观和个性化”然后点击“字体”，可以看到所有已安装的字体。复制字体名称替换即可。**
