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
  // 对纹理图像进行y轴反转， 因为webgl的纹理坐标系统中t轴的方向和图片的坐标系统的y轴是相反的

  // gl.UNPACK_FLIP_Y_WEBGL：对纹理图像进行y轴反转
  // gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL: 将图像rgb颜色值的每一个分量乘以A
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // 通过纹理单元的机制来同时使用多个纹理
  // 每个纹理单元有一个单元编号来管理一张纹理图像
  // 系统支持的纹理单元的个数，取决于硬件和浏览器的webgl实现
  // webgl系统默认至少支持8个纹理单元，内置的变量代表各个纹理单元
  // gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2,...,gl.TEXTURE7

  // 开启0号纹理单元(激活纹理单元)
  gl.activeTexture(gl.TEXTURE0);

  // 告诉webgl系统，纹理对象使用哪种类型的纹理
  // gl.TEXTURE_2D：二维纹理
  // gl.TEXTURE_CUBE_MAP：立方体纹理

  // 开启纹理对象；将纹理对象绑定到纹理单元上；
  // 我们没有办法直接操作纹理对象，只能将纹理对象绑定到纹理单元，通过操作纹理单元来操作纹理对象
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 配置纹理对象的参数，设置纹理图像映射到图形上的具体方式
  // 根据纹理坐标获取纹素颜色，按哪种方式重复填充纹理
  // 参数：
  // target
  // pname: 纹理参数
  // gl.TEXTURE_MAG_FILTER(放大方法)
  // gl.TEXTURE_MIN_FILTER(缩小方法)

  // gl.TEXTURE_WRAP_S(水平填充方法) 
  // gl.TEXTUER_WRAP_T(垂直填充方法)
  // param: 纹理参数的值
  // gl.NEAREST 
  // gl.LINEAR

  // 曼哈顿距离/直角距离/棋盘距离： （x1,y1） (x2,y2) = > (|x2-x1|,|y2-y1|)

  // gl.REPEAT：平铺式的重复纹理
  // gl.MIRRORED_REPEAT：镜像对称式的重复纹理
  // gl.CLAMP_TO_EDGE：使用纹理图像边缘值

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);

  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT);
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);

  // 配置纹理图像:将纹理图像分配给纹理对象
  // target: gl.TEXTURE_2D,gl.TEXTURE_CUBE_MAP

  // level: 为了金字塔纹理准备的

  // internalformat: 图像的内部格式

  // format: 纹理数据的格式，必须跟internalformat相同的值
  // 必须要根据纹理图像的格式（jpg,png）来选择这个参数
  // jpg: gl.RGB png: gl.RGBA bmp: gl.RGB
  // gl.LUMINANCE（流明），gl.LUMINANCE_ALPHA（透明度）：通常用在灰度图像上
  // 流明： 感知到的物体表面的亮度，使用物体表面，红，绿，蓝分量值的加权平均来计算；

  // type: 纹理数据的类型
  // gl.UNSIGNED_BYTE
  // gl.UNSIGNED_SHORT_5_6_5(将rgb三分量压缩入16比特中),数字代表占比
  // gl.UNSIGNED_SHORT_4_4_4_4(将rgb三分量压缩入16比特中)
  // gl.UNSIGNED_SHORT_5_5_5_1(将rgb三分量压缩入16比特中)

  // image: 图片对象

  // 这时，image对象中的图像就从javascript中传入webgl系统中，并存储在纹理对象中
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

// 拾色器类型，获取纹理对象中纹理图片的每个纹素
// 顶点之间片元的纹理坐标会在光栅化的过程中内插出来
// 根据片元的纹理坐标，从纹理图像上抽取出纹素的颜色，涂到当前片元上
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
