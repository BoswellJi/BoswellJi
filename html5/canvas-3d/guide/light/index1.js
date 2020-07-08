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
  // 24
  var vertices = new Float32Array([   // Coordinates
    1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // v0-v1-v2-v3 front
    1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // v0-v3-v4-v5 right
    1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // v1-v6-v7-v2 left
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // v7-v4-v3-v2 down
    1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0  // v4-v7-v6-v5 back
  ]);

// 
  var colors = new Float32Array([    // Colors
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v1-v2-v3 front
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v3-v4-v5 right
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v0-v5-v6-v1 up
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v1-v6-v7-v2 left
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,     // v7-v4-v3-v2 down
    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0　    // v4-v7-v6-v5 back
  ]);


  var normals = new Float32Array([    // Normal
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
  ]);


  // Indices of the vertices，每个面的两个三角形的顶点索引
  var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    4, 5, 6, 4, 6, 7,    // right
    8, 9, 10, 8, 10, 11,    // up
    12, 13, 14, 12, 14, 15,    // left
    16, 17, 18, 16, 18, 19,    // down
    20, 21, 22, 20, 22, 23     // back
  ]);

  initArrayBuffer(gl, 'a_Position', vertices, 3, gl.FLOAT);
  initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT);
  initArrayBuffer(gl, 'a_Normal', normals, 3, gl.FLOAT);

  // 创建缓冲数据
  const indexBuffer = gl.createBuffer();

  // 绑定缓冲
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // 将数据与缓冲进行绑定
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
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
  const vertex = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec4 a_Normal; // 法向量
  uniform mat4 u_MvpMatrix;
  uniform vec3 u_LightColor; // 入射线颜色
  uniform vec3 u_LightDirection; // 归一化世界坐标
  uniform vec3 u_AmbientLight;
  varying vec4 v_Color;

  void main(){
    gl_Position = u_MvpMatrix * a_Position;
    // 对法向量进行归一化
    vec3 normal = normalize(vec3(a_Normal));
    // 计算光线方向和法向量的点积（入射角
    float nDotL = max(dot(u_LightDirection,normal),0.0);
    // 计算漫反射光线的颜色
    vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;
    // 环境反射光颜色
    vec3 ambient = u_AmbientLight * a_Color.rgb;
    // 顶点颜色
    v_Color = vec4(diffuse + ambient,a_Color);
  }
  `,
    fragment = `
    precision mediump float;
    varying vec4 v_Color;

    void main() {
      gl_FragColor = v_Color;
    }`;

  if (!initShaders(gl, vertex, fragment)) {
    return;
  }

  const n = initVertexBuffer(gl);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // uniform
  const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  const uLightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  const uLightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  const uAmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');

  // 直接给存储位置添加数据，不使用缓存
  // 设置光线颜色
  gl.uniform3f(uLightColor, 1, 1, 1);

  gl.uniform3f(uAmbientLight, 0.2, 0.2, 0.2);

  const lightDirection = new Vector3([0.5, 3, 4]);
  lightDirection.normalize(); // 归一化
  gl.uniform3fv(uLightDirection, lightDirection.elements);

  

  // 计算模型视图投影矩阵
  const mvpMatrix = new Matrix4();
  // 透视模型矩阵
  mvpMatrix.setPerspective(30, canvas.width / canvas.clientHeight, 1, 100);
  // 观察者状态矩阵
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

draw();