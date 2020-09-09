/**
   * 初始化一个着色器程序
   * @param {*} gl webgl上下文对象
   * @param {*} vsSource 顶点着色器程序
   * @param {*} fsSource 片元着色器程序
   * @returns 着色器程序对象
   */
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    gl.deleteProgram(shaderProgram);
    return null;
  }
  // 可以用这个程序对象绘制图形
  gl.useProgram(shaderProgram);
  gl.program = shaderProgram;

  return shaderProgram;
}

/**
 * 加载着色器程序
 * @param {*} gl webgl上下文对象
 * @param {*} type 着色器类型
 * @param {*} source 着色器源码
 * @returns 着色器对象
 */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

/**
* 初始化数组类型缓冲
* @param {*} gl 
* @param {*} attribute 
* @param {*} data 
* @param {*} num 
* @param {*} type 
*/
function initArrayBuffer(gl, attribute, data, num, type) {
  // 创建缓冲区，将获取的glsl变量的地址指向缓冲区
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  const aAttribute = gl.getAttribLocation(gl.program, attribute);

  gl.vertexAttribPointer(aAttribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(aAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

/**
* 初始化数组类型缓冲
* @param {*} gl 
* @param {*} attribute 
* @param {*} data 
* @param {*} num 
* @param {*} type 
*/
function initElementArrayBuffer(gl, attribute, data, num, type) {
  // 创建缓冲区，将获取的glsl变量的地址指向缓冲区
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);

  const aAttribute = gl.getAttribLocation(gl.program, attribute);

  gl.vertexAttribPointer(aAttribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(aAttribute);
  
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}