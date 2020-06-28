const canvas = document.querySelector('#glcanvas'),
  gl = canvas.getContext('webgl');

function draw() {

  // glsl程序
  // vec4 : 有4个浮点数据的数据类型 a_position: 变量名
  // varyings(可变量)： 为了可以使用可变量，要在两个着色器中定义同名的可变量
  const vertex = `
  // 定义一个可变量，传递给片段着色器
    varying vec4 v_color;
    uniform mat3 u_matrix;
    attribute vec2 a_position;
    // attribute: 可以使用 float,vec2,vec3,vec4,mat2,mat3,mat4数据类型

    void main(){
      // 每个顶点调用一次顶点着色器，每次调用都要设置一个特殊的全局变量 gl_Position,该变量的值就是裁剪空间坐标系
      // 顶点着色器需要的数据： Attribute,Uniforms,Textures

      gl_Position = vec4((u_matrix * vec3(a_position,1)).xy,0,1);
      v_color = gl_Position * 0.5 * 0.5;
    }
  `,
    fragment = `
    // 所需要的数据，可以通过以下三种方式获取：Uniforms, Texture, Varyings

    precision mediump float;
    // 将会接收到从顶点着色器传递过来的同名变量
    varying vec4 v_color;

    void main(){
      gl_FragColor = v_color;
    }
  `;

  /**
   * 1. 编译着色器对，提交给gpu 
   */

  //  创建两个着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex),
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

  // 将两个着色器link（链接）到一个 program 
  const program = createProgram(gl, vertexShader, fragmentShader);

  // 给着色程序提供数据（webgl的主要任务就是设置好状态并为glsl着色程序提供数据（这个程序中，着色程序的唯一输入是属性 a_position

  // 从刚才创建的glsl着色程序中找到这个属性值所在的位置
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
  const colorUniformLocation = gl.getUniformLocation(program, 'u_color');
  const matrixLocation  = gl.getUniformLocation(program,'u_matrix');

  // createBuffer, bindBuffer, bufferData(将数据存放到缓冲中)
  // a_position属性值从缓冲中获取数据
  const positionBuffer = gl.createBuffer();

  // webgl可以通过绑定点操控全局范围内的许多数据，绑定点可以想想成webgl内部的全局变量
  // 绑定一个数据源到绑定点 绑定点： gl.ARRAY_BUFFER 数据源： positionBuffer
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  setGeometry(gl);

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
  gl.enableVertexAttribArray(positionAttributeLocation);

  // 将绑定点绑定到缓冲数据
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 每次获取2个 32位float数据
  const size = 2,
    // type = gl.FLOAT,
    type = gl.UNSIGNED_BYTE, // 8位
    normalize = false,
    stride = 0,
    // 从第0位开始
    offset = 0;

  // 怎么给属性和两个全局变量提供数据

  // 告诉attribute如何从positionBuffer（缓冲数据）中获取数据
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
  // 设置分辨率
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.uniformMatrix3fv(matrixLocation,false,);

  const primitiveType = gl.TRIANGLES, // 图元类型（三角形
    offset1 = 0,
    count = 3; // 表示处理6个顶点

  gl.drawArrays(primitiveType, offset1, count);
}

function setGeometry(gl) {
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0, -100,
    150, 125,
    -175, 100
  ]), gl.STATIC_DRAW);
}

function randomInt(range) {
  return Math.floor(Math.random * range) + 1;
}

function setRectangle(gl, x, y, width, height) {
  const x1 = x,
    x2 = x + width,
    y1 = y,
    y2 = y + height;

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2,
  ]), gl.STATIC_DRAW);
}

/**
  * 创建着色器程序
  * @param {*} gl 渲染上下文
  * @param {*} vertexShader 顶点着色器
  * @param {*} fragmentShader 片段着色器
  */
function createProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log('program: ' + gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

/**
 * 
 * @param {*} gl 渲染上下文
 * @param {*} type 着色器类型
 * @param {*} source 数据源
 */
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log('shader: ' + gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

draw();