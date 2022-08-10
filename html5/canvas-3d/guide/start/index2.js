const canvas = document.querySelector('#canvas');
const  gl = canvas.getContext('webgl');

const vertexShaderSource = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute float a_PositionSize;

  varying vec4 v_Color;

  void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PositionSize;
    v_Color = a_Color;
  }
`;
const  fragmentShaderSource = `
  precision mediump float;
  varying vec4 v_Color;

  void main(){
    gl_FragColor = v_Color;
  }
`;

initShaders(gl, vertexShaderSource, fragmentShaderSource);

// 在js和glsl es中传递数据
const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
const aColor = gl.getAttribLocation(gl.program, 'a_Color');
const aPositionSize = gl.getAttribLocation(gl.program, 'a_PositionSize');

// 这个方法省略了vec4类型中的第四个分量，他会自动默认第4个分量设置为1.0
// gl.vertexAttrib3f(aPosition,0,0,0);

// 方法省略了z轴的大小，设置为默认值 z轴为0，w分量为1
// 这样可以当作二维平面使用


// 缺点：这种方式只能绘制一个点，对于哪些多个顶点组成的图形，比如三角形，矩形，立方体，需要一次性将图形的顶点全部传入到顶点着色器中，才能够把图形画出来

// 所以，webgl提供了一种很方便的机制，缓冲区对象，可以一次性地向着色器传入多个顶点数据
// 缓冲区对象： webgl系统中的一块内存区域

gl.vertexAttrib2fv(aPosition, [0, 0]);
gl.vertexAttrib3fv(aColor, [1, 1, 1]);
gl.vertexAttrib1f(aPositionSize, 1);

gl.clearColor(0, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);

function draw(x, y) {
  gl.vertexAttrib2fv(aPosition, [x, y]);
  gl.drawArrays(gl.PONITS, 0, 1);
}

const l = canvas.offsetLeft,
  t = canvas.offsetTop,
  width = canvas.width,
  height = canvas.height,
  points = [];

canvas.addEventListener('mousedown', function (e) {
  const x = e.clientX,
    y = e.clientY,
    cx = x - l,
    cy = y - t,
    // 距离坐标原点的x轴距离
    ol = cx - width / 2,
    // 距离坐标原点的y轴距离
    ot = height / 2 - cy,
    // 转换成三维空间坐标系的值
    glx = ol / (width / 2),
    gly = ot / (height / 2);

  points.push([glx, gly]);

  // 绘制之前，先清空画布
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0, len = points.length; i < len; i++) {
    draw(points[i][0], points[i][1]);
  }

  canvas.addEventListener('mousemove', mousemove, false);
  canvas.addEventListener('mouseup', mouseup, false);
}, false);


function mouseup(e) {
  canvas.removeEventListener('mousemove', mousemove);
  canvas.removeEventListener('mouseup', mouseup);
}

function mousemove(e) {
  const x = e.clientX,
    y = e.clientY,
    cx = x - l,
    cy = y - t,
    // 距离坐标原点的x轴距离
    ol = cx - width / 2,
    // 距离坐标原点的y轴距离
    ot = height / 2 - cy,
    // 转换成三维空间坐标系的值
    glx = ol / (width / 2),
    gly = ot / (height / 2);

  points.push([glx, gly]);

  // 绘制之前，先清空画布
  gl.clear(gl.COLOR_BUFFER_BIT);

  for (let i = 0, len = points.length; i < len; i++) {
    draw(points[i][0], points[i][1]);
  }
}

