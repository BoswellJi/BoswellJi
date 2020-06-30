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
  // 混合信息(每个元素都是4个字节)
  const vertices = new Float32Array([
    0,0.5,-0.5,-0.5,0.5,-0.5
  ]);
  const verticesBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0,0);
  gl.enableVertexAttribArray(vertices);
  
  return 3;
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
    void main(){
      gl_Position = a_Position;
    }
  `,
    fragment = `
      void main(){
        gl_FragColor = vec4(1,0,0,1);
      }
    `;

  // 初始化着色器
  if (!initShaders(gl, vertex, fragment)) {
    return;
  }

  const n = initVertexBuffer(gl);
  // 设置canvas背景
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 清空canvas背景
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 进行绘制
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

draw();