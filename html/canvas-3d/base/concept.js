const canvas = document.querySelector('#glcanvas');
const gl = canvas.getContext('webgl');
// glsl程序
// vec4 : 有4个浮点数据的数据类型 a_position: 变量名
const vertex = `
    attribute vec2 a_position;
    uniform vec2 u_resolution;

    void main(){
      vec2 zeroToOne = a_position / u_resolution;
      vec2 zeroToTwo = zeroToOne * 2.0;
      vec2 clipSpace = zeroToTwo - 1.0;

      gl_Position = vec4(clipSpace * vec2(1,-1),0,1);
    }
  `;
const fragment = `
    precision mediump float;
    uniform vec4 u_color;

    void main(){
      gl_FragColor = u_color;
    }
  `;

// 将两个着色器link（链接）到一个 program 
const program = initShaderProgram(gl, vertex, fragment);

// 给着色程序提供数据（webgl的主要任务就是设置好状态并为glsl着色程序提供数据（这个程序中，着色程序的唯一输入是属性 a_position

// 从创建的glsl着色程序中找到这个属性值所在的位置
const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
const colorUniformLocation = gl.getUniformLocation(program, 'u_color');

// a_position属性值从缓冲中获取数据
const positionBuffer = gl.createBuffer();

// webgl可以通过绑定点操控全局范围内的许多数据，绑定点可以想想成webgl内部的全局变量
// 绑定一个数据源到绑定点 绑定点： gl.ARRAY_BUFFER 数据源： positionBuffer
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// bufferData复制这些数据到gpu的positionBuffer对象上
// 通过绑定点，向缓冲中存放数据
// 能够传递到positionBuffer上，是因为之前一步，我们将他绑定到了 gl.ARRAY_BUFFER(绑定点)
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

webglUtils.resizeCanvasToDisplaySize(gl.canvas);

// 告诉webgl怎样把提供的gl_Position裁剪空间坐标对应到画布像素坐标
// 画布像素坐标叫做屏幕空间
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

// 清空画布
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// 告诉webgl运行哪一个程序对
gl.useProgram(program);

// 告诉webgl，怎样从我们之前准备的缓冲中获取数据给着色器的属性

// 首先需要启用对应属性
gl.enableVertexAttribArray(positionAttributeLocation);

// 将绑定点绑定到缓冲数据
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// 每次迭代运行获取2个单位数据
const size = 2,
  // 每个单位的数据类型是32位浮点型
  type = gl.FLOAT,
  // 不需要归一化数据
  normalize = false,
  stride = 0,
  // 从第0位开始
  offset = 0;

// 怎么给属性和两个全局变量提供数据

// 告诉attribute如何从positionBuffer（缓冲数据）中获取数据
gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
// 设置分辨率
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

setRectangle(gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
// 告诉webgl,怎样获取颜色缓冲数据
gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

const primitiveType = gl.TRIANGLES, // 图元类型（三角形
  offset1 = 0, // 获取数据的偏移量
  count = 6; // 顶点着色器将运行6次

// gl.drawElements();
gl.drawArrays(primitiveType, offset1, count);


/**
 * 控制范围内的随机数
 * @param {*} range 
 */
function randomInt(range) {
  return Math.floor(Math.random() * range) + 1;
}

/**
 * 设置矩形
 * @param {*} gl 渲染上下文
 * @param {*} x x轴
 * @param {*} y y轴
 * @param {*} width 宽度 
 * @param {*} height 高度
 */
function setRectangle(gl, x, y, width, height) {
  const x1 = x,
    x2 = x + width,
    y1 = y,
    y2 = y + height;

  // 给绑定点存放缓存数据
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ]), gl.STATIC_DRAW);
}