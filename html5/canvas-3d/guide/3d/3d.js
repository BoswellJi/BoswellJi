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
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 顶点坐标 纹理坐标
  const vertices = new Float32Array([
    // Vertex coordinates and color(RGBA)
    0.0, 0.5, -0.4, 0.4, 1.0, 0.4, // The back green one
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4, // The middle yellow one
    -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
    0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0,  // The front blue one 
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
    0.5, -0.5, 0.0, 1.0, 0.4, 0.4
  ]);

  // 顶点个数
  const n = 9;

  // 创建缓冲数据
  const vertexTexCoordBuffer = gl.createBuffer();

  const fsize = vertices.BYTES_PER_ELEMENT;

  // 绑定缓冲
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);

  // 将数据与缓冲进行绑定
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // glsl种a_Position变量的内存地址
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');

  // 将缓冲中的数据指定给aPosition
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, fsize * 6, 0);

  gl.enableVertexAttribArray(aPosition);

  // 获取glsl中a_Color存储地址
  const aColor = gl.getAttribLocation(gl.program, 'a_Color');

  // 给地址中分配数据
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, fsize * 6, fsize * 3);

  gl.enableVertexAttribArray(aColor);

  return n;
}


const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {
  const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_RotateMatrix;

    varying vec4 v_Color;

    void main(){
      // 视图矩阵和顶点坐标相乘； 意味着：根据视图矩阵（观察者,照相机），调整每个顶点坐标，渲染到屏幕上
      gl_Position = u_ViewMatrix *  a_Position * u_RotateMatrix;
      v_Color = a_Color;
    }
  `,
    fragment = `
      precision mediump float;
      varying vec4 v_Color;

      void main(){
        gl_FragColor = v_Color;
      }
    `;

  if (!initShaders(gl, vertex, fragment)) {
    return;
  }

  const n = initVertexBuffer(gl);
 

  // 根据下面的三个矢量创建视图矩阵：影响屏幕上的视图
  // 视点，目标点/观察点/视线，上方向
  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0, 0, 0.5, 0.5, 0, 0, 0, 1, 0);
  const uViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  // 旋转：先设置视图矩阵，从指定视点观察旋转后的三角形
  const rotateMatrix = new Matrix4();
  rotateMatrix.setRotate(-10,0,0,1);
  const uRotateMatrix = gl.getUniformLocation(gl.program, 'u_RotateMatrix');
  gl.uniformMatrix4fv(uRotateMatrix, false, rotateMatrix.elements);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

draw();