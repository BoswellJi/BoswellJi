/**
 * 初始化顶点数据缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 顶点坐标 颜色
  const vertices = new Float32Array([
    0.0, 0.5, -0.4, 0.4, 1.0, 0.4,
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, -0.4, 1.0, 0.4, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4,
    -0.5, 0.4, -0.2, 1.0, 1.0, 0.4,
    0.0, -0.6, -0.2, 1.0, 1.0, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0,
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0,
    0.5, -0.5, 0.0, 1.0, 0.4, 0.4
  ]);
  const n = 9;

  const vertexTexCoordBuffer = gl.createBuffer();
  const fsize = vertices.BYTES_PER_ELEMENT;

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, fsize * 6, 0);
  gl.enableVertexAttribArray(aPosition);

  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
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
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ModelViewMatrix;



    varying vec4 v_Color;

    void main(){
      // gl_Position = u_ViewMatrix *  u_ModelMatrix * a_Position;
      gl_Position = u_ModelViewMatrix * a_Position;
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

initShaderProgram(gl, vertex, fragment)

const n = initVertexBuffer(gl);

// 视图矩阵
const viewMatrix = new Matrix4();
viewMatrix.setLookAt(0, 0, 0.1, 0, 0, 0, 0, 1, 0);
const uViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

// 旋转矩阵
const modelMatrix = new Matrix4();
modelMatrix.setRotate(10, 0, 0, 1);
const uModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix.elements);

// 可以先在js中计算出视图矩阵和模型矩阵相乘的结果，这样避免每个顶点都会执行一遍
const modelViewMatrix = viewMatrix.multiply(modelMatrix);
const uModelViewMatrix = gl.getUniformLocation(gl.program,'u_ModelViewMatrix');
gl.uniformMatrix4fv(uModelViewMatrix,false,modelViewMatrix.elements);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);

// 根据键盘移动视点
let g_eyeX = 0;

/**
 * 当在调整观察者的位置时，视点在极右，或者极左的时候，三角形会缺少一部分
 * 原因： 没有指定可视范围，实际观察得到的区域边界
 */
document.addEventListener('keydown', function (e) {

  viewMatrix.setLookAt(g_eyeX, 0, 0.1, 0, 0, 0, 0, 1, 0);
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  rotateMatrix.setRotate(10, 0, 0, 1);
  gl.uniformMatrix4fv(uModelMatrix, false, rotateMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);

  // 左右键
  if (e.code == 39) {
    g_eyeX += 0.01;
  } else if (e.code == 37) {
    g_eyeX -= 0.01;
  } else {
    return;
  }
});
