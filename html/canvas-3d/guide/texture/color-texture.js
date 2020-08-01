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
 * 创建着色器
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

/**
 * 初始化着色器
 * @param {*} gl webgl渲染上下文
 * @param {*} vertex 顶点着色器字符串程序
 * @param {*} fragment 片元着色器字符串程序
 */
function initShaders(gl, vertex, fragment) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex),
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment),
    program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);
  gl.program = program;

  return program;
}

/**
 * 1. 使用多个缓冲区对象，适合数据量不大的时候；
 * 2. 顶点太多时，维护所有顶点数据有困难；
 * 3. 将数据写到同一个缓冲区内，使用某种机制访问缓冲区对象中不同种类的数据； 
 * 
 * 设置顶点，尺寸，颜色，纹理坐标，点所在的平面的法向量（坐标）
 *
 * @param {*} gl webgl渲染上下文
 */
function initVertexBuffer(gl) {
  // 混合信息(每个元素都是4个字节)
  // 顶点坐标+顶点大小+顶点颜色
  const verticesSizes = new Float32Array([
    0.5, 0.5, 10, 0, 0, 1, 1,
    -0.5, -0.5, 20, 0, 1, 0, 1,
    0.5, -0.5, 20, 0, 1, 0, 1
  ]);
  const verticesSizeBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, verticesSizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

  // 每个元素的字节大小
  const fsize = verticesSizes.BYTES_PER_ELEMENT;

  /**
   *  vertexAttribPointer()
   *  根据缓冲区的间隔，和偏移量，来获取不同类型的数据
   *  stride : 相邻两个顶点间的字节数，点的开始位置（ 单位为字节
   *  offset : 缓冲区对象中的偏移量 （单位为字节
   */

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, fsize * 7, 0);
  gl.enableVertexAttribArray(aPosition);

  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, fsize * 7, fsize * 2);
  gl.enableVertexAttribArray(aPointSize);

  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, fsize * 7, fsize * 3);
  gl.enableVertexAttribArray(aColor);

  return 3;
}

/**
 * 初始化顶点缓冲区
 * @param {*} gl webgl渲染上下文
 */
function initVertexBuffer1(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
    -1, -0.5,
    1, 0.5,
    1, -0.5
  ]);
  const n = 6; // 2维

  // 1. 创建缓冲区对象(webgl系统中的一块内存区域，将glsl中的变量存储位置指向这块内存)
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    return -1;
  }
  // 2. 将缓冲区对象绑定到目标
  // target: gl.ARRAY_BUFFER gl.ELEMENT_ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 3. 向缓冲区写入数据
  // target data usage: gl.STATIC_DRAW gl.STREAM_DRAW gl.DYNAMIC_DRAW
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  // 4. 将缓冲区对象分配给aPosition
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  // 5. 连接aPosition变量与分配给它的缓冲对象
  gl.enableVertexAttribArray(aPosition);

  // 尺寸数据
  const sizes = new Float32Array([
    10, 10, 10, 10, 10, 10 // 点尺寸的数据
  ]);
  const sizeBuffer = gl.createBuffer();
  if (!sizeBuffer) {
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
  // 获取glsl中attribute类型变量的存储地址
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPointSize);

  const colors = new Float32Array([
    0, 0, 1,
    0, 1, 1,
    1, 0, 1,
    0, 0, 1,
    0, 1, ,
    1, 0, ,
  ]);
  const colorsBuffer = gl.createBuffer();
  if (!colorsBuffer) {
    return -1;
  }
  // 将缓冲区与webgl系统绑定
  gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
  // 将数据与缓冲区绑定
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aColor);

  return n;
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

/**
 * 1. 将顶点的其他（非坐标）数据-如颜色等，传入顶点着色器；
 * 2. 发生在顶点着色器和片元着色器之间的从图形到片元的转化，又称为图元光栅化；
 * 3. 将图像（或者纹理）映射到图形或三维对象的表面上； 
 */

function draw() {
  // varying 变量的作用： 从顶点着色器向片元着色器传输数据
  var vertex = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    // 定义 attribute 使得可以让外部的数据传递进来
    attribute vec4 a_Color;
    // 定义varying 使得顶点着色器中的颜色可以传递到片元着色器中
    varying vec4 v_Color;

    void main(){
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
      v_Color = a_Color;
    }
  `,
    fragment = `
    precision mediump float;
    varying vec4 v_Color;

    void main(){
      gl_FragColor = v_Color;
    }
  `;

  if (!initShaders(gl, vertex, fragment)) {
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let n = initVertexBuffer(gl);
  // gl.drawArrays(gl.TRIANGLES, 0, n);

  n = initVertexBuffer1(gl);
  // gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
  gl.drawArrays(gl.LINE_LOOP,0,n);
}

draw();