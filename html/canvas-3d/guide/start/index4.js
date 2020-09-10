const canvas = document.querySelector('#canvas'),

  gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;

    varying vec2 v_TexCoord;

    void main(){
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
    }
  `,
  fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_Color;
    // 用来接收纹理图像的对象
    uniform sampler2D u_Sampler0;
    uniform sampler2D u_Sampler1;

    varying vec2 v_TexCoord;

    void main(){
      vec4 color0 =  texture2D(u_Sampler0,v_TexCoord);
      vec4 color1 =  texture2D(u_Sampler1,v_TexCoord);
      gl_FragColor = color1 * color0;
    }
  `;

if (!initShaderProgram(gl, vertexShaderSource, fragmentShaderSource)) {
  console.log('着色器初始化失败');
}

// 设置背景色
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);

let image = 0;

initVertexBuffers(gl, new Float32Array([
  0.5, -0.5, 1, 0,
  -0.5, -0.5, 0, 0,
  0.5, 0.5, 1, 1,
  -0.5, 0.5, 0, 1,
]), 4);

initTexture(gl);


initVertexBuffers(gl, new Float32Array([
  -1, 1, 1, 0,
  0, 1, 0, 0,
  -1, 0, 0, 1,
  0, 0, 1, 1,
]), 4);
initTexture(gl);


/**
 * 
 * @param {*} gl 
 * @param {*} vertices 
 * @param {*} n 
 */
function initVertexBuffers(gl, vertices, n, attribute) {
  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  const size = vertices.BYTES_PER_ELEMENT;

  // 将缓冲区对象绑定
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 将数据(顶点数据)放到缓冲区对象中
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // 获取着色器中的变量地址
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  // 指定取数据的规则，将缓冲区对象分配给attribute变量
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 4 * size, 0);
  // 开始使用，使得顶点能够访问缓冲区内的数据
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
  image.src = '../asset/sky.jpg';
}

function loadTexture(gl, texture, uSampler, image) {
  // 对纹理图像进行y轴反转
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // 开启0号纹理单元
  gl.activeTexture(gl.TEXTURE0);

  // 向target绑定
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // 配置纹理参数（不同的纹理，类似背景图
  // gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.MIRRORED_REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);

  // 配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // 将0号纹理传递给着色器
  gl.uniform1i(uSampler, 0);

  // 方法是异步执行的，必须放这里

  image++;

  if (image === 2) {
   
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

