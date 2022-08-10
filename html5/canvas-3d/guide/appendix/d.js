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
 * 物体都是有，点，线面（三角形组成
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  const pc = new Float32Array([
    // 坐标在前
    0, 0.5, -0.1, 0, 0, 1,
    -0.5, -0.5, -0.1, 0, 0, 1,
    0.5, -0.5, -0.1, 1, 1, 0,

    // 坐标在后
    0.5, 0.4, -0.5, 1, 1, 0,
    -0.5, 0.4, -0.5, 1, 0, 0,
    0, -0.6, -0.5, 1, 0, 0
  ]);

  const numVertex = 3,
    numColor = 3,
    n = 6;

  // 创建缓冲数据
  const indexBuffer = gl.createBuffer();

  // 绑定缓冲
  gl.bindBuffer(gl.ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pc, gl.STATIC_DRAW);

  const fsize = pc.BYTES_PER_ELEMENT,
    stride = numColor + numVertex,
    aPosition = gl.getAttribLocation(gl.program, 'a_Position'),
    aColor = gl.getAttribLocation(gl.program, 'a_Color');

  gl.vertexAttribPointer(aPosition, numVertex, gl.FLOAT, false, fsize * stride, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.vertexAttribPointer(aColor, numColor, gl.FLOAT, false, fsize * stride, fsize * numVertex);
  gl.enableVertexAttribArray(aColor);

  return n;
}

/**
 * 初始化数组类型缓冲
 * @param {*} gl 
 * @param {*} attribute 
 * @param {*} data 
 * @param {*} num 
 * @param {*} type 
 */
function initArrayBuffer(gl, attribute, data, num, type) {
  // 创建缓冲区，将获取的glsl变量的地址指向缓冲区
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  const aAttribute = gl.getAttribLocation(gl.program, attribute);

  gl.vertexAttribPointer(aAttribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(aAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {
  const vertexShaderSource = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    
    varying vec4 v_Color;

    uniform mat4 u_MvpMatrix;

    void main(){
      // 将u_MvpMatrix矩阵假设为单位矩阵，（这是一个投影矩阵，根据公式可以计算出他的盒状，可视空间（四棱锥
      gl_Position = u_MvpMatrix * a_Position;
      v_Color = a_Color;
    }
  `,
    fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_Color;
    void main(){
      gl_FragColor = v_Color;
    }
  `;

  initShaders(gl, vertexShaderSource, fragmentShaderSource);

  // 
  gl.enable(gl.DEPTH_TEST);

  const uMvpMatrix = gl.getUniformLocation(gl.program,'u_MvpMatrix');

  const mvpMatrix = new Matrix4();
  // 这个矩阵很重要，翻转z轴
  mvpMatrix.setOrtho(-1,1,-1,1,1,0);
  gl.uniformMatrix4fv(uMvpMatrix,false,mvpMatrix.elements);

  const n = initVertexBuffer(gl);

  gl.clearColor(0, 0, 0, 1);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

draw();