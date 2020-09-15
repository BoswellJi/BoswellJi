/**
 * 初始化顶点数据缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 顶点坐标 颜色
  const vertices = new Float32Array([

    0, 1, 0, 1, 0, 0,
    -1, -1, 0, 0, 0, 1,
    1, -1, 0, 0, 0, 1,

    0, .5, 0, 1, 0, 0,
    -.5, -.5, 0, 1, 0, 0,
    .5, -.5, 0, 1, 0, 0,

    0, .8, 0, 0, 1, 0,
    -.8, -.8, 0, 0, 1, 0,
    .8, -.8, 0, 0, 1, 0,

  ]);

  // 顶点个数
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

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;

    uniform mat4 u_ProjMatrix;

    varying vec4 v_Color;

    void main(){
      gl_Position = u_ProjMatrix * a_Position;
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

initShaderProgram(gl, vertex, fragment);

const n = initVertexBuffer(gl);

gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);

const uProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');

(function () {
  const ANGLE_STEP = 30.0;
  let currentAngle = 0.0;
  let g_last = Date.now();

  tick();

  function tick() {
    currentAngle = animate(currentAngle);

    const mvpMatrix = new Matrix4();

    mvpMatrix.rotate(currentAngle, 0, 0, 1);

    gl.uniformMatrix4fv(uProjMatrix, false, mvpMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);

    requestAnimationFrame(tick);
  };

  function animate(angle) {
    let now = Date.now();
    let elapsed = now - g_last;
    g_last = now;
    let newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
  }
})()