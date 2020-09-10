/**
 * 设置顶点，尺寸，颜色，纹理坐标，点所在的平面的法向量（坐标）
 * @param {*} gl webgl渲染上下文
 */
function initVertexBuffer(gl) {
  // 混合信息(每个元素都是4个字节)
  // 顶点坐标+顶点大小+顶点颜色
  const verticesSizes = new Float32Array([
    0.5, 0.5, 10, 0, 0, 1, 1,
    -0.5, -0.5, 20, 0, 1, 0, 1,
    0.5, -0.5, 20, 0, 1, 0, 1
  ]);
  const verticesSizeBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, verticesSizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW);

  // 每个元素的字节大小
  const fsize = verticesSizes.BYTES_PER_ELEMENT;

  /**
   *  vertexAttribPointer()
   *  根据缓冲区的间隔，和偏移量，来获取不同类型的数据
   *  stride : 相邻两个顶点间的字节数，点的开始位置（ 单位为字节
   *  offset : 缓冲区对象中的偏移量 （单位为字节
   */
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, fsize * 7, 0);
  gl.enableVertexAttribArray(aPosition);

  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
  gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, fsize * 7, fsize * 2);
  gl.enableVertexAttribArray(aPointSize);

  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, fsize * 7, fsize * 3);
  gl.enableVertexAttribArray(aColor);

  return 3;
}

/**
 * 初始化顶点缓冲区，给顶点着色器添加多个缓冲区
 * @param {*} gl webgl渲染上下文
 */
function initVertexBuffer1(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
    -1, -0.5,
    1, 0.5,
    1, -0.5
  ]);
  const n = 6; 
  const vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  // 尺寸数据
  const sizes = new Float32Array([
    10, 10, 10, 10, 10, 10
  ]);
  const sizeBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
  
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

  gl.vertexAttribPointer(aPointSize, 1, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPointSize);

  const colors = new Float32Array([
    0, 0, 1,
    0, 1, 1,
    1, 0, 1,
    0, 0, 1,
    0, 1, ,
    1, 0, ,
  ]);
  const colorsBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

  const aColor = gl.getAttribLocation(gl.program, 'a_Color');

  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aColor);

  return n;
}

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

/**
 * 1. 将顶点的其他（非坐标）数据-如颜色等，传入顶点着色器；
 * 2. 发生在顶点着色器和片元着色器之间的从图形到片元的转化，又称为图元光栅化；
 * 3. 将图像（或者纹理）映射到图形或三维对象的表面上； 
 */
function draw() {
  // varying 变量的作用： 从顶点着色器向片元着色器传输数据
  // 定义 attribute 使得可以让外部的数据传递进来
  // 定义varying 使得顶点着色器中的颜色可以传递到片元着色器中
  var vertex = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    attribute vec4 a_Color;
    
    varying vec4 v_Color;

    void main(){
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
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

  if (!initShaderProgram(gl, vertex, fragment)) {
    return;
  }

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  let n = initVertexBuffer(gl);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

draw();