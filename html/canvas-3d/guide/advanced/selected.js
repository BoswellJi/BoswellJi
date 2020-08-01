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

/**
 * 组成立方体的面，三角形，和顶点的关系（为每个面指定不同的颜色
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  /**
   * 给每个表面指定颜色
   * 1. 给前表面v0顶点指定为蓝色，因为另外两个面也会用到，所以也是蓝色；
   * 2. 所以需要创建多个相同的顶点；
   */
  // 6个面，每面4个点，共24个点
  // 三个三个顶点一组，构成
  var vertices = new Float32Array([
    1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,  // v0-v3-v4-v5 right
    1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,  // v1-v6-v7-v2 left
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,  // v7-v4-v3-v2 down
    1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0   // v4-v7-v6-v5 back
  ]);

  // 每个顶点的颜色
  // 每个颜色对应一个顶点，按顺序对应
  var colors = new Float32Array([     // Colors
    0.4, 0, 1.0, 0.4, 0, 1.0, 0.4, 0, 1.0, 0.4, 0, 1.0,  // v0-v1-v2-v3 front(blue)
    0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4,  // v0-v3-v4-v5 right(green)
    1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4, 1.0, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
    1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4,  // v1-v6-v7-v2 left
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,  // v7-v4-v3-v2 down
    0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0, 0.4, 1.0, 1.0   // v4-v7-v6-v5 back
  ]);

  // 绘制顶点的顺序（最大值为256，36个带有重复的顶点组成正方体
  // 每三个索引为一组
  // 三角形列表
  // 每个面都指向一组不同的顶点，不会有共享一个顶点的情况
  var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    4, 5, 6, 4, 6, 7,    // right
    8, 9, 10, 8, 10, 11,    // up
    12, 13, 14, 12, 14, 15,    // left
    16, 17, 18, 16, 18, 19,    // down
    20, 21, 22, 20, 22, 23     // back
  ]);

  var indexBuffer = gl.createBuffer();

  if (!initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position'))
    return -1;

  if (!initArrayBuffer(gl, colors, 3, gl.FLOAT, 'a_Color'))
    return -1;

  // Write the indices to the buffer object
  // 【ELEMENT_ARRAY_BUFFER】 告诉webgl系统，该缓冲区中的内容是顶点的索引值数据
  // 因为顶点的绘制不会因为开启隐藏面消除功能，所以需要用索引指定，顶点的绘制顺序
  // 使用的是gl.ELEMENT_ARRAY_BUFFER,管理着具有索引结构的三维模型数据
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  // 将顶点索引与缓冲区绑定
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, data, num, type, attribute) {
  var buffer = gl.createBuffer();   // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}


/**
 * 三维空间中选中物体：
 * 1. 通过数学过程来计算鼠标是否悬浮在某个图形上
 * 
 * 1. 当鼠标按下时，将整个正方体重绘为单一的红色
 * 2. 读取鼠标点击处的像素颜色
 * 3. 使用立方体原来的颜色对其进行重绘
 * 4. 如果第二步骤读取到的颜色是红色，就说明物体被选中
 */
const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {
  const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_MvpMatrix;
    varying vec4 v_Color;

    uniform bool u_Clicked;

    void main(){
      gl_Position = u_MvpMatrix * a_Position;
      if(u_Clicked){
        v_Color = vec4(1,0,0,1);
      }else{
        v_Color = a_Color;
      }
    }
  `,
    fragment = `
      precision mediump float;
      varying vec4 v_Color;

      void main(){
        gl_FragColor = v_Color;
      }
    `;

  initShaders(gl, vertex, fragment);

  const n = initVertexBuffer(gl);

  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);

  const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');

  const mvpMatrix = new Matrix4();
  // 透视投影矩阵
  mvpMatrix.setPerspective(30, 1, 1, 100);
  // 视图矩阵
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  // 模型矩阵
  mvpMatrix.rotate(0, 0, 0, 1);

  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

  canvas.addEventListener('click', function (e) {
    const uClicked = gl.getUniformLocation(gl.program, 'u_Clicked');
    gl.uniform1i(uClicked, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);

    const x = e.clientX,
      y = e.clientY,
      l = canvas.offsetLeft,
      t = canvas.offsetTop,
      diffx = x - l,
      diffy = y - t;

    // 读取点击位置的像素颜色值
    const pixels = new Uint8Array(4);
    // webgl中读取canvas坐标像素的颜色值
    gl.readPixels(diffx, diffy, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    if(pixels[0]===255 && pixels[1]===0 && pixels[1]===0){
      console.log('red');
    }

    gl.uniform1i(uClicked, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
  }, false);
}

draw();

