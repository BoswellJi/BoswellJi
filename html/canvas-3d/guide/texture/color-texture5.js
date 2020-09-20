function initVertexBuffer(gl) {
  // 顶点坐标 和 纹理坐标，
  // 纹理覆盖在顶点坐标装配的几何图形上；
  // 纹理图像根据坐标来重复背景填充
  // const vertices = new Float32Array([
  //   -.5, .5, 0, 2,
  //   -.5, -.5, 0, 0,
  //   .5, .5, 2, 2,
  //   .5, -.5, 2, 0,
  // ]);

  const vertices = new Float32Array([
    // left column front
    0, 0, 0,
    0, 150, 0,
    30, 0, 0,
    0, 150, 0,
    30, 150, 0,
    30, 0, 0,

    // top rung front
    30, 0, 0,
    30, 30, 0,
    100, 0, 0,
    30, 30, 0,
    100, 30, 0,
    100, 0, 0,

    // middle rung front
    30, 60, 0,
    30, 90, 0,
    67, 60, 0,
    30, 90, 0,
    67, 90, 0,
    67, 60, 0,

    // left column back
    0, 0, 30,
    30, 0, 30,
    0, 150, 30,
    0, 150, 30,
    30, 0, 30,
    30, 150, 30,

    // top rung back
    30, 0, 30,
    100, 0, 30,
    30, 30, 30,
    30, 30, 30,
    100, 0, 30,
    100, 30, 30,

    // middle rung back
    30, 60, 30,
    67, 60, 30,
    30, 90, 30,
    30, 90, 30,
    67, 60, 30,
    67, 90, 30,

    // top
    0, 0, 0,
    100, 0, 0,
    100, 0, 30,
    0, 0, 0,
    100, 0, 30,
    0, 0, 30,

    // top rung right
    100, 0, 0,
    100, 30, 0,
    100, 30, 30,
    100, 0, 0,
    100, 30, 30,
    100, 0, 30,

    // under top rung
    30, 30, 0,
    30, 30, 30,
    100, 30, 30,
    30, 30, 0,
    100, 30, 30,
    100, 30, 0,

    // between top rung and middle
    30, 30, 0,
    30, 60, 30,
    30, 30, 30,
    30, 30, 0,
    30, 60, 0,
    30, 60, 30,

    // top of middle rung
    30, 60, 0,
    67, 60, 30,
    30, 60, 30,
    30, 60, 0,
    67, 60, 0,
    67, 60, 30,

    // right of middle rung
    67, 60, 0,
    67, 90, 30,
    67, 60, 30,
    67, 60, 0,
    67, 90, 0,
    67, 90, 30,

    // bottom of middle rung.
    30, 90, 0,
    30, 90, 30,
    67, 90, 30,
    30, 90, 0,
    67, 90, 30,
    67, 90, 0,

    // right of bottom
    30, 90, 0,
    30, 150, 30,
    30, 90, 30,
    30, 90, 0,
    30, 150, 0,
    30, 150, 30,

    // bottom
    0, 150, 0,
    0, 150, 30,
    30, 150, 30,
    0, 150, 0,
    30, 150, 30,
    30, 150, 0,

    // left side
    0, 0, 0,
    0, 0, 30,
    0, 150, 30,
    0, 0, 0,
    0, 150, 30,
    0, 150, 0
  ]);

  const vertexTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  const texCoords = new Float32Array([
    // left column front
    0.22, 0.19,
    0.22, 0.79,
    0.34, 0.19,
    0.22, 0.79,
    0.34, 0.79,
    0.34, 0.19,

    // top rung front
    0.34, 0.19,
    0.34, 0.31,
    0.62, 0.19,
    0.34, 0.31,
    0.62, 0.31,
    0.62, 0.19,

    // middle rung front
    0.34, 0.43,
    0.34, 0.55,
    0.49, 0.43,
    0.34, 0.55,
    0.49, 0.55,
    0.49, 0.43,

    // left column back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // top rung back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // middle rung back
    0, 0,
    1, 0,
    0, 1,
    0, 1,
    1, 0,
    1, 1,

    // top
    0, 0,
    1, 0,
    1, 1,
    0, 0,
    1, 1,
    0, 1,

    // top rung right
    0, 0,
    1, 0,
    1, 1,
    0, 0,
    1, 1,
    0, 1,

    // under top rung
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // between top rung and middle
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // top of middle rung
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // right of middle rung
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // bottom of middle rung.
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // right of bottom
    0, 0,
    1, 1,
    0, 1,
    0, 0,
    1, 0,
    1, 1,

    // bottom
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,

    // left side
    0, 0,
    0, 1,
    1, 1,
    0, 0,
    1, 1,
    1, 0,
  ]);

  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

  const aTexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aTexCoord);

  return 4;
}

function initTexures(gl) {
  // 创建纹理对象
  const texture = gl.createTexture();
  const image = new Image();

  image.src = 'http://localhost:81/html/canvas-3d/guide/asset/keyboard.jpg';
  image.addEventListener('load', function () {
    loadTexture(gl, texture, image);
  });
}

function loadTexture(gl, texture, image) {
  // 对纹理图像进行y轴反转
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // 开启0号纹理单元(激活纹理单元)
  gl.activeTexture(gl.TEXTURE0);

  // 将纹理对象绑定给webgl系统
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 配置纹理对象 texParameter[if]: int float => gl.LINEAR
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  // 将纹理图像分配给纹理对象
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // 获取glsl变量u_Sampler的存储地址
  const uSampler = gl.getUniformLocation(gl.program, 'u_Sampler');

  // 将0号纹理传递给着色器， 唯一的纹理对象，被绑定在gl.TEXTURE0上，所以第二个为0
  // 片元着色器终于能够访问纹理图像了
  gl.uniform1i(uSampler, 0);

  var matrixLocation = gl.getUniformLocation(gl.program, "u_matrix");

  var cameraPosition = [0, 0,100];
  var up = [0, 1, 0];
  var target = [0, 0, -1];

  // 视点，观察点，上方向
  const matrix = new Matrix4();
  const cMatrix =  matrix.setLookAt(...cameraPosition, ...up, ...target);
  const iMatrix = matrix.setInverseOf(cMatrix);
  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var fieldOfViewRadians = 10 * Math.PI / 180;
  var projectionMatrix =iMatrix.setPerspective(fieldOfViewRadians, aspect, 1, 200);

  matrix.rotate(40,0,1,0);

  gl.uniformMatrix4fv(matrixLocation, false, matrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 16 * 6);
}

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vertex = `
  attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;

  uniform mat4 u_matrix;

  void main() {
    gl_Position = u_matrix * a_Position;
    v_TexCoord = a_TexCoord;
  }
`;
const fragment = `
    precision mediump float;

    uniform sampler2D u_Sampler;
    uniform vec2 u_TextureSize;

    varying vec2 v_TexCoord;

    void main() {
      // 获取一个像素大小
      vec2 onePixel = vec2(1.0,1.0)/u_TextureSize;

      // rgba => bgra

      gl_FragColor = (
        texture2D(u_Sampler, v_TexCoord) +
        texture2D(u_Sampler, v_TexCoord + vec2(onePixel.x, 0.0)) +
        texture2D(u_Sampler, v_TexCoord + vec2(-onePixel.x, 0.0))) / 3.0;
    }
`;

initShaders(gl, vertex, fragment);

gl.clearColor(0.0, 0.0, 0.0, 1.0);

var textureSizeLocation = gl.getUniformLocation(gl.program, "u_TextureSize");

gl.uniform2f(textureSizeLocation, canvas.width, canvas.height);

const n = initVertexBuffer(gl);

initTexures(gl);


