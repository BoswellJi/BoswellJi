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
  // 顶点坐标 纹理坐标
  const vertices = new Float32Array([
    -0.5, 0.5, 0, 1,
    -0.5, -0.5, 0, 0,
    0.5, 0.5, 1, 1,
    0.5, -0.5, 1, 0,
  ]);
  const n = 4;
  const vertexTexCoordBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const fsize = vertices.BYTES_PER_ELEMENT;

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, fsize * 4, 0);
  gl.enableVertexAttribArray(vertices);

  const aTexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord');
  gl.vertexAttribPointer(aTexCoord, 2, gl.FLOAT, false, fsize * 4, fsize * 2);
  gl.enableVertexAttribArray(aTexCoord);

  return n;
}

function initTexures(gl, n) {
  const texture = gl.createTexture();
  const uSampler = gl.getUniformLocation(gl.program, 'u_Sampler');

  // 加载纹理图像
  const image = new Image();
  image.addEventListener('load', function () {
    // 将图像交给webgl系统
    loadTexture(gl, n, texture, uSampler, image);
  });
  image.src = './1.jpg';
  return true;
}

function loadTexture(gl, n, texture, uSampler, image) {
  // 对纹理图像进行y轴反转
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  // 激活0号纹理单元
  gl.activeTexture(gl.TEXTURE0);

  // 开启纹理对象， 绑定纹理对象到纹理单元
  gl.bindTexture(gl.TEXTURE_2D,texture);

  // 配置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // 配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // 将0号纹理传递给着色器
  gl.uniform1i(uSampler, 0);
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

/**
 * 顶点坐标
 * 图形装配
 * 光栅化
 * 执行片元着色器
 */
function draw() {
  const vertex = `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord;

    void main(){
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
    }
  `,
    fragment = `
      precision mediump float;
      uniform float u_Width;
      uniform float u_Height;

      uniform sampler2D u_Sampler;
      varying vec2 v_TexCoord;

      void main(){
        // 根据片元的坐标信息计算颜色
        // gl_FragColor = vec4(gl_FragCoord.x/u_Width,0,gl_FragCoord.y/u_Height,1);
        gl_FragColor = texture2D(u_Sampler,v_TexCoord);
      }
    `;

  // 初始化着色器
  if (!initShaders(gl, vertex, fragment)) {
    return;
  }

  const n = initVertexBuffer(gl);

  const flag = initTexures(gl,n);

  console.log(flag);

  // const uWidth = gl.getUniformLocation(gl.program, 'u_Width');
  // const uHeight = gl.getUniformLocation(gl.program, 'u_Height');

  // 颜色缓冲区的宽度，高度
  // const colorBufferWidth = gl.drawingBufferWidth;
  // const colorBufferHeight = gl.drawingBufferHeight;

  // gl.uniform1f(uWidth, colorBufferWidth);
  // gl.uniform1f(uHeight, colorBufferHeight);

  // 设置canvas背景
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas背景
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 进行绘制
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

draw();