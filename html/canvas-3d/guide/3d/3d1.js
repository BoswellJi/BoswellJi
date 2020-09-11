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


const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;

    uniform mat4 u_ModelMatrix;
    uniform mat4 u_ProjMatrix;
    uniform mat4 u_ViewMatrix;

    varying vec4 v_Color;

    void main(){
      gl_Position =u_ProjMatrix * u_ViewMatrix *  u_ModelMatrix * a_Position;
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

initShaders(gl, vertex, fragment)

const n = initVertexBuffer(gl);

// 视图矩阵
const viewMatrix = new Matrix4();
viewMatrix.setLookAt(0, 0, 0.1, 0, 0, 0, 0, 1, 0);
const uViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

// 变化矩阵矩阵
const rotateMatrix = new Matrix4();
rotateMatrix.setRotate(10, 0, 0, 1);
const uModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
gl.uniformMatrix4fv(uModelMatrix, false, rotateMatrix.elements);

// 正射投影矩阵
const projMatrix = new Matrix4();
projMatrix.setOrtho(-1, 1, -1, 1, 0, 2);
const uProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);

gl.clearColor(0.0, 0.0, 0.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);

// 根据键盘移动视点
let g_eyeX = 0.2;

/**
 * 当在调整观察者的位置时，视点在极右，或者极左的时候，三角形会缺少一部分
 * 原因： 没有指定可视范围，实际观察得到的区域边界
 * 
 * 
 */
document.addEventListener('keydown', function (e) {
  // 左右键
  if (e.keyCode == 39) {
    g_eyeX += 0.01;
  } else if (e.keyCode == 37) {
    g_eyeX -= 0.01;
  } else {
    return;
  }
  // 设置观察者的状态（视图矩阵
  viewMatrix.setLookAt(g_eyeX, 0.25, 0.25, 0, 0, 0, 0, 1, 0);
  // 给glsl中的变量赋值（计算物体的顶点坐标
  gl.uniformMatrix4fv(uModelMatrix, false, viewMatrix.elements);
  // 清空画布
  gl.clear(gl.COLOR_BUFFER_BIT);
  // 绘制图形
  gl.drawArrays(gl.TRIANGLES, 0, n);
});
