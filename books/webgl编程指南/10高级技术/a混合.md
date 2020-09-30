## 概述

* 颜色中的 `a分量` (RGBA中的A), 控制颜色的透明度；
* 默认情况下，a混合不仅影响绘制的物体，也会影响背景色；

* 实现一个半透明效果，需要用到a分量，该功能被称为`a混合或混合`；
* webgl中已经内置了改功能，开启即可；

## 实现a混合

* gl.enable(gl.BLEND): 开启混合功能
* gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA): 指定混合函数


