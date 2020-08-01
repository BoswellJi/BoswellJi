const canvas = document.querySelector('#canvas'),
// webgl绘图上下文

  // 获取webgl绘图上下文这里不同平台会有兼容问题
  gl = canvas.getContext('webgl');

  // 设置背景

  // canvas二维绘图系统的颜色分量值在（0-255）之间
  // webgl是继承自opengl的，所以它遵循传统的opengl颜色分量的取值，即（0，1

  // 一旦指定，背景颜色会贮存在webgl系统，下次调用clearColor方法之前不会改变；

  // 参数(也叫颜色分量： 红，黄，蓝，透明度（值都是从0-1
  gl.clearColor(1,0,0,1);

  // 用之前clearColor指定的背景色清空绘图区域

  // 方法继承自opengl，基于多基本缓冲区模型

  // 清空绘图区域，就是在清空颜色缓冲区（color buffer

  // gl.COLOR_BUFFER_BIT就是告诉webgl清空颜色缓冲区

  // 可以使用 | 位操作符，指定多个缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);

  /**
   * gl.clearColor(1,1,1,1);
   * gl.clearDepth(depth)
   * gl.clearStencil(s);
   */