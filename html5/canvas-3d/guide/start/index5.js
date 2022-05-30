/**
 * 点击画布生成点
 */


const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

// 顶点着色器
const vertex = `
    // 存储限定符 类型 变量名
    attribute vec4 a_Position;

    uniform float a_PointSize;
    
    void main(){
      gl_Position = a_Position;
      gl_PointSize = a_PointSize;
    }
`;
// 片元着色器
const fragment = `
    // 精度限定词（指定变量的范围，（最大值，最小值）和精度
    precision mediump float;
    // 存储限定符 类型 变量名
    uniform vec4  u_FragColor;
    void main(){
      gl_FragColor = u_FragColor;
    }
`;
// 初始化着色器程序
initShaders(gl, vertex, fragment);

// 获取attribute 变量存储位置，返回变量a_Position存储地址
// 不存在返回-1，存在即大于等于 0
const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
const aPointSize = gl.getUniformLocation(gl.program, 'a_PointSize');
const uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

// 设置canvas背景
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const points = [];
const colors = [];

canvas.addEventListener('mousedown', function (e) {
  const x = (e.clientX - canvas.getBoundingClientRect().left - canvas.width / 2) / (canvas.width / 2);
  const y = (canvas.height / 2 - e.clientY + canvas.getBoundingClientRect().top ) / (canvas.height / 2);

  points.push([x, y]);

  if (x >= 0 && y >= 0) {
    colors.push([1, 0, 0, 1]);
  } else if (x < 0 && y < 0) {
    colors.push([0, 1, 0, 1]);
  } else {
    colors.push([0, 0, 1, 1]);
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.uniform1f(aPointSize, 5);

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    gl.vertexAttrib4fv(aPosition, new Float32Array([point[0], point[1], 0, 1.0]));

    const rgba = colors[i];
    gl.uniform4f(uFragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.drawArrays(gl.POINTS, 0, 1);
  }

  // 绘制操作是在颜色缓冲区中进行绘制，绘制结束，系统将缓冲区内容显示在屏幕上;
  // 接着缓冲区被重置，内容丢失，这是默认操作;
});
