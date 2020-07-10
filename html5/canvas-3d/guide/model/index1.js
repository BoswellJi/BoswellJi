/**
  * 创建着色器程序
  * @param {*} gl 渲染上下文
  * @param {*} vertexShader 顶点着色器
  * @param {*} fragmentShader 片段着色器
  */
 function createProgram(gl, vertexShader, fragmentShader) {
  //  创建程序对象
  const program = gl.createProgram();
  // 为程序对象分配着色器
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  // 连接程序对象
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
  // 创建着色器
  const shader = gl.createShader(type);
  // 向着色器对象中填充着色器程序的源代码
  gl.shaderSource(shader, source);
  // 编译着色器
  gl.compileShader(shader);

  // 查看着色器状态，是否失败
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  // 可以获取失败日志
  console.log('shader: ' + gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function initShaders(gl, vertex, fragment) {
  //  创建两个着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertex),
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragment);

  // 将两个着色器link（链接）到一个 program 
  const program = createProgram(gl, vertexShader, fragmentShader);

  // 使用程序对象
  gl.useProgram(program);

  gl.program = program;

  return program;
}

