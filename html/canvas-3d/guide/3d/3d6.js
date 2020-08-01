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

function initShaders(gl, vertex, fragment) {
  //  创建两个着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex),
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

  // 将两个着色器link（链接）到一个 program 
  const program = createProgram(gl, vertexShader, fragmentShader);

  gl.useProgram(program);

  gl.program = program;

  return program;
}

/**
 * 初始化顶点数据缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 8个顶点，三个三个顶点相连接，组成12个三角形，构成正方形
  var vertices = new Float32Array([   // Vertex coordinates 24个顶点
    // Vertex coordinates and color
    1.0, 1.0, 1.0,   1.0, 1.0, 1.0,  // v0 White
    -1.0, 1.0, 1.0,   1.0, 0.0, 1.0,  // v1 Magenta
    -1.0, -1.0, 1.0,   1.0, 0.0, 0.0,  // v2 Red
    1.0, -1.0, 1.0,   1.0, 1.0, 0.0,  // v3 Yellow
    1.0, -1.0, -1.0,   0.0, 1.0, 0.0,  // v4 Green
    1.0, 1.0, -1.0,   0.0, 1.0, 1.0,  // v5 Cyan
    -1.0, 1.0, -1.0,   0.0, 0.0, 1.0,  // v6 Blue
    -1.0, -1.0, -1.0,   0.0, 0.0, 0.0   // v7 Black
  ]);

  // 1. 36个带有重复的顶点（一个面两个三角行），组成正方体
  // 2. 绘制顶点的顺序（最大值为256，大于256个顶点的，需要使用Uint16Array
  // 3. 每三个索引为一组
  // 4. 这些顶点坐标和索引数据等，一般由三维建模工具创建
  // 5. 不再按照顶点的顺序进行绘制，通过索引值来指定绘制的顺序
  // 6. 索引值是整型数
  // 7. 共享顶点，所以只需要8个顶点
  var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    0, 3, 4, 0, 4, 5,    // right
    0, 5, 6, 0, 6, 1,    // up
    1, 6, 7, 1, 7, 2,    // left
    7, 4, 3, 7, 3, 2,    // down
    4, 7, 6, 4, 6, 5     // back
  ]);
  // 顶点颜色缓冲区
  const vertexColorBuffer = gl.createBuffer();
  const size = vertices.BYTES_PER_ELEMENT;
  // 将缓冲区绑定给webgl系统
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, size * 6, 0);
  gl.enableVertexAttribArray(aPosition);

  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, size * 6, size * 3);
  gl.enableVertexAttribArray(aColor);

  // 顶点索引缓冲区
  var indexBuffer = gl.createBuffer();
  // Write the indices to the buffer object
  // 【ELEMENT_ARRAY_BUFFER】 告诉webgl系统，该缓冲区中的内容是顶点的索引值数据
  // 因为顶点的绘制不会因为开启隐藏面消除功能，所以需要用索引指定，顶点的绘制顺序
  // 使用的是gl.ELEMENT_ARRAY_BUFFER,管理着具有索引结构的三维模型数据
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // 将顶点索引与缓冲区绑定
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {
  const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_MvpMatrix;
    varying vec4 v_Color;

    void main(){
      gl_Position = u_MvpMatrix * a_Position;
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

  initShaders(gl, vertex, fragment);

  const n = initVertexBuffer(gl);

  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);

  const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');

  const mvpMatrix = new Matrix4();
  // 透视投影矩阵
  mvpMatrix.setPerspective(30, 1, 1, 100);
  // 视图矩阵
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  // 模型矩阵
  mvpMatrix.rotate(0, 0, 0, 1);

  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

draw();


