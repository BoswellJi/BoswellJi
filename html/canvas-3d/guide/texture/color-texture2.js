/**
 * 初始化顶点数据缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 顶点坐标 纹理坐标
  const vertices = new Float32Array([
    -1, 1, 0, 1,
    -1, -1, 0, 0,
    1, 1, 1, 1,
    1, -1, 1, 0,
  ]);

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
 * @param {*} gl 
 */
function initTexures(gl) {
  // 创建纹理对象
  const texture = gl.createTexture();
  const texture1 = gl.createTexture();

  // 获取glsl变量u_Sampler的存储地址
  const uSampler = gl.getUniformLocation(gl.program, 'u_Sampler0');
  const uSampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');

  // 创建图片对象
  const image = new Image();
  const image1 = new Image();

  // 监听图片加载事件
  image.addEventListener('load', function () {
    loadTexture(gl, texture, uSampler, image, 0);
  });
  image1.addEventListener('load', function () {
    loadTexture(gl, texture1, uSampler1, image1, 1);
  });

  // 给图片添加src属性
  image.src = '/canvas-3d/guide/asset/sky.jpg';
  image1.src = '/canvas-3d/guide/asset/sky.jpg';
  return true;
}

let g_texUnit0 = false, g_texUnit1 = false;
function loadTexture(gl, texture, uSampler, image, texUnit) {
  // 对纹理图像进行y轴反转，环绕x轴翻转，让图片坐标系与纹理图像坐标系对应
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // 开启0号纹理单元(激活纹理)

  // 指定纹理单元编号,gl.TEXTUREn 中的n,将纹理对象传给u_Sampler
  if (texUnit === 0) {
    gl.activeTexture(gl.TEXTURE0);
    g_texUnit0 = true;
  } else {
    gl.activeTexture(gl.TEXTURE1);
    g_texUnit1 = true;
  }

  // 绑定纹理对象到激活的纹理单元上,纹理对象(也被指定纹理类型)
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 配置纹理参数（不同的纹理，类似背景图
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);

  // 将图像从javascript传入webgl系统,存储在纹理对象中
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // 将纹理单元传递给着色器,必须指定纹理单元编号
  gl.uniform1i(uSampler, texUnit);

  // 方法是异步执行的，必须放这里
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 当两个纹理图像都激活处理完成后,进行绘制
  if (g_texUnit0 && g_texUnit1) {
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {
  const vertex = `
  attribute vec4 a_Position;
  // 从顶点着色器向片元着色器传输纹理坐标
  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;

  void main() {
    gl_Position = a_Position;
    v_TexCoord = a_TexCoord;
  }`;
  const fragment = `
    precision mediump float;
    // 片元着色器访问两个纹理
    // 最终的片元颜色由两个纹理上纹素颜色共同决定

    // 专门用于处理纹理对象的数据类型
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;
    varying vec2 v_TexCoord;

    void main() {
      // texture2D: 在片元着色器中获取纹理像素颜色(纹理单元编号,纹理坐标)
      vec4 color0 = texture2D(u_Sampler0 , v_TexCoord);
      vec4 color1 = texture2D(u_Sampler1 , v_TexCoord);
      gl_FragColor = color0 * color1;
    }`;

  if (!initShaderProgram(gl, vertex, fragment)) {
    return;
  }

  const n = initVertexBuffer(gl);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  initTexures(gl);
}

draw();