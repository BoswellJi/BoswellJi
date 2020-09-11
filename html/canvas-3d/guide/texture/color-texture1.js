/**
 * 初始化顶点数据，纹理坐标数据 缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 顶点坐标 和 纹理坐标，纹理覆盖在顶点坐标装配的几何图形上；
  const vertices = new Float32Array([
    -1, 1, 0, 1,
    -1, -1, 0, 0,
    1, 1, 1, 1,
    1, -1, 1, 0,
  ]);

  // const vertices = new Float32Array([
  //   -0.5, 0.5, 0, 1,
  //   -0.5, -0.5, 0, 0,
  //   0.5, 0.5, 1, 1,
  //   0.5, -0.5, 1, 0,
  // ]);

  const n = 4;

  const vertexTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const fsize = vertices.BYTES_PER_ELEMENT;

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, fsize * 4, 0);
  gl.enableVertexAttribArray(aPosition);

  const aTexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, fsize * 4, fsize * 2);
  gl.enableVertexAttribArray(aTexCoord);

  return n;
}

/**
 * 初始化纹理
 * @param {WebGLRenderingContext} gl webgl渲染上下文
 */
function initTexures(gl) {
  // 创建纹理对象
  const texture = gl.createTexture();
  // 加载图像资源
  const image = new Image();

  image.src = '/canvas-3d/guide/asset/sky.jpg';
  image.addEventListener('load', function () {
    loadTexture(gl, texture, image);
  });
}

/**
 * 顶点坐标
 * 图形装配
 * 光栅化
 * 执行片元着色器
 * 加载纹理
 * @param {WebGLRenderingContext} gl webgl渲染上下文
 * @param {*} texture 纹理对象
 * @param {*} image 图片对象
 */
function loadTexture(gl, texture, image) {

  // 对纹理图像进行y轴反转
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // 开启0号纹理单元(激活纹理单元)
  gl.activeTexture(gl.TEXTURE0);

  gl.bindTexture(gl.TEXTURE_2D, texture);

  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);

  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);

  
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // 获取glsl变量u_Sampler的存储地址
  const uSampler = gl.getUniformLocation(gl.program, 'u_Sampler');

  // 将0号纹理传递给着色器， 唯一的纹理对象，被绑定在gl.TEXTURE0上，所以第二个为0
  // 片元着色器终于能够访问纹理图像了
  gl.uniform1i(uSampler, 0);

  // 给canvas背景设置颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 方法是异步执行的，必须放这里
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');
const vertex = `
  attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;

  void main() {
    gl_Position = a_Position;
    v_TexCoord = a_TexCoord;
  }
`;


const fragment = `
    precision mediump float;
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;

    void main() {
      gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    }
`;

initShaderProgram(gl, vertex, fragment);

const n = initVertexBuffer(gl);

initTexures(gl);
