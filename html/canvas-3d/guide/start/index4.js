/**
 * 纹理的使用
 */

const canvas = document.querySelector('#canvas');
const  gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;

    varying vec2 v_TexCoord;

    void main(){
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
    }
`;
const  fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_Color;
    // 用来接收纹理图像的对象
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;

    varying vec2 v_TexCoord;

    void main(){
      vec4 color0 =  texture2D(u_Sampler0,v_TexCoord);
      gl_FragColor =  color0;
    }
`;

// 设置背景色
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

// 
initShaders(gl, vertexShaderSource, fragmentShaderSource);

// 顶点坐标 纹理坐标
initVertexBuffers(gl, new Float32Array([
  -1, 1,  0, 1,
  -1, -1, 0, 0,
  1, 1,   1, 1,
  1, -1,  1, 0,
]), 4);
initTexture(gl);

/**
 * 初始化顶点缓冲区
 * @param {*} gl 
 * @param {*} vertices  
 */
function initVertexBuffers(gl, vertices) {
  const vertexBuffer = gl.createBuffer();
  const size = vertices.BYTES_PER_ELEMENT;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 4 * size, 0);
  gl.enableVertexAttribArray(aPosition);

  const aTexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, 4 * size, 2 * size);
  gl.enableVertexAttribArray(aTexCoord);
}

function initTexture(gl) {
  // 创建纹理对象,纹理对象用来管理webgl中的纹理
  const texture = gl.createTexture();

  // 获取glsl变量u_Sampler的存储地址,改变量用来接收纹理图像
  const uSampler = gl.getUniformLocation(gl.program, 'u_Sampler0');

  // 创建图片对象
  const image = new Image();

  // 监听图片加载事件
  image.addEventListener('load', function () {
    loadTexture(gl, texture, uSampler, image);
  });

  // 给图片添加src属性
  image.src = 'http://localhost/canvas-3d/guide/asset/abc.jpg';
}

function loadTexture(gl, texture, uSampler, image) {
  // 对纹理图像进行y轴反转
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // 开启0号纹理单元
  gl.activeTexture(gl.TEXTURE0);

  // 绑定纹理目标
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 配置纹理参数（不同的纹理，类似背景图
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // 配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // 将0号纹理传递给着色器
  gl.uniform1i(uSampler, 0);

  // 方法是异步执行的，必须放这里
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

