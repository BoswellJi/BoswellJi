function initVertexBuffer(gl) {
  // 顶点
  var vertices = new Float32Array([
    // Front face
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0,
    -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, 1.0, -1.0,
  ]);

  // 纹理坐标
  const textureCoordinates = new Float32Array([
    // Front
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Back
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Top
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Bottom
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Right
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0,
    // Left
    0.0, 0.0,
    1.0, 0.0,
    1.0, 1.0,
    0.0, 1.0
  ]);

  initArrayBuffer(gl, 'a_Position', vertices, 3, gl.FLOAT);
  initArrayBuffer(gl, 'a_TexCoord', textureCoordinates, 2, gl.FLOAT);

  var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    4, 5, 6, 4, 6, 7,    // right
    8, 9, 10, 8, 10, 11,    // up
    12, 13, 14, 12, 14, 15,    // left
    16, 17, 18, 16, 18, 19,    // down
    20, 21, 22, 20, 22, 23     // back
  ]);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, attribute, data, num, type) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  const aAttribute = gl.getAttribLocation(gl.program, attribute);
  gl.vertexAttribPointer(aAttribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(aAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function initTexures(gl) {
  const texture = gl.createTexture();
  const image = new Image();

  image.src = '/asset/cubetexture.png';
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

  // 配置纹理对象
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // 将纹理图像分配给纹理对象
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  const uSampler = gl.getUniformLocation(gl.program, 'u_Sampler');

  // 指定uniform变量的值
  gl.uniform1i(uSampler, 0);

  (function () {
    const ANGLE_STEP = 30.0;
    let currentAngle = 0.0;
    let g_last = Date.now();

    const tick = function () {
      currentAngle = animate(currentAngle);

      const mvpMatrix = new Matrix4();
      mvpMatrix.perspective(30, canvas.width / canvas.clientHeight, 1, 100);
      mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
      mvpMatrix.rotate(currentAngle, 0, 0, 1);
      mvpMatrix.rotate(currentAngle, 0, 1, 0);
      mvpMatrix.rotate(currentAngle, 1, 0, 0);

      const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
      gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);

      requestAnimationFrame(tick, canvas);
    };
    tick();

    function animate(angle) {
      let now = Date.now();
      let elapsed = now - g_last;
      g_last = now;
      let newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
      return newAngle %= 360;
    }
  })();
}

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vertex = `
  attribute vec4 a_Position;
  attribute vec2 a_TexCoord;
  
  uniform mat4 u_MvpMatrix;

  varying vec2 v_TexCoord;

  void main(){
    gl_Position = u_MvpMatrix * a_Position;
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

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.enable(gl.DEPTH_TEST);

initShaders(gl, vertex, fragment);

initVertexBuffer(gl);

initTexures(gl);

