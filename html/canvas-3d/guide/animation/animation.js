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

function initVertexBuffer(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
    0.5, -0.5
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

  return n;
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {
  // 顶点着色器，矩阵旋转
  var vertex = `
    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;

    void main(){
      gl_Position = a_Position * u_ModelMatrix;
    }
  `,
    // 片元着色器
    fragment = `
    precision mediump float;
    uniform vec4  u_FragColor;
    void main(){
      gl_FragColor = u_FragColor;
    }
  `;

  if (!initShaders(gl, vertex, fragment)) {
    return;
  }
  // 获取glsl中attribute类型变量的存储地址
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  // 设置canvas背景
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空canvas背景
  gl.clear(gl.COLOR_BUFFER_BIT);

  const n = initVertexBuffer(gl);

  // 给点设置大小
  gl.vertexAttrib1f(aPointSize, 5);

  // 缩放变换矩阵
  const matrix = new Matrix4();

  // 进行矩阵变换（复合,自身矩阵
  // 计算后为旋转变换矩阵： （旋转矩阵*原始坐标），然后设置自身矩阵为这个旋转后的矩阵
  matrix.setRotate(110, 0, 0, 1);
  // 计算后为平移变换矩阵： （平移矩阵*原始坐标）* 自身矩阵
  matrix.translate(-1, 0, 0);
  // 计算矩阵依然使用原始坐标，
  matrix.setRotate(0, 0, 0, 1);

  const uXformMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  
  let x = 0;
  function draw(gl, n, currentAngle, matrix, uXformMatrix) {
    matrix.setTranslate(0.5,0,0);
    // 设置旋转矩阵
    matrix.rotate(currentAngle, 0, 0, 1);
    // 给glsl变量传递数据
    gl.uniformMatrix4fv(uXformMatrix, false, matrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
    // x-=0.1;
    // if(x===-0.6){
    //   x=0;
    // }
  }

  // 计算当前角度
  let gLast = Date.now();
  function animate(angle) {
    let now = Date.now();
    // 时间，毫秒数
    let elapsed = now - gLast;
    gLast = now;
    let newAngle = angle + (10 * elapsed) / 1000;
    newAngle = newAngle % 360;
    return newAngle;
  }

  let currentAngle = 0;
  const tick = function () {
    currentAngle = animate(currentAngle);
    draw(gl, n, currentAngle, matrix, uXformMatrix);
    requestAnimationFrame(tick);
  }
  tick();
}

draw();