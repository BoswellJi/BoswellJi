/**
 * 鼠标控制物体旋转
 * 1. 使用模型视图投影矩阵来变换顶点坐标
 */

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

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, data, num, type, attribute) {
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    attribute float a_Face;

    uniform mat4 u_MvpMatrix;
    uniform bool u_Clicked;
    uniform int u_PickedFace;

    varying vec4 v_Color;

    void main(){
      gl_Position = u_MvpMatrix * a_Position;

      v_Color = a_Color;
    }
`;
const fragment = `
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

let currentAngle = [0.0, 0.0];

initEventHandlers(canvas, currentAngle);
render(currentAngle);

function render(currentAngle) {
  const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  const mvpMatrix = new Matrix4();
  mvpMatrix.setPerspective(30, 1, 1, 100);
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  mvpMatrix.rotate(currentAngle[0], 0, 0, 1);
  mvpMatrix.rotate(currentAngle[1], 0, 1, 0);
  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

function initEventHandlers(canvas, currentAngle) {
  var dragging = false;
  var lastX = -1, lastY = -1;

  canvas.onmousedown = function (ev) {
    var x = ev.clientX, y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();
    if (rect.left <= x && x < rect.right && rect.top <= y && y < rect.bottom) {
      lastX = x; lastY = y;
      dragging = true;
    }
  };

  document.onmouseup = function (ev) { dragging = false; };

  canvas.onmousemove = function (ev) {
    var x = ev.clientX, y = ev.clientY;
    if (dragging) {
      var factor = 100 / canvas.height;
      var dx = factor * (x - lastX);
      var dy = factor * (y - lastY);

      currentAngle[0] = Math.max(Math.min(currentAngle[0] + dy, 90.0), -90.0);
      currentAngle[1] = currentAngle[1] + dx;
    }
    lastX = x, lastY = y;

    render(currentAngle);
  };
}