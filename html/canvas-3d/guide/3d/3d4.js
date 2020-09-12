/**
 * 初始化顶点数据缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 顶点坐标 颜色
  const vertices = new Float32Array([

    0, 1, 0, 0, 0, 1,
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

    uniform mat4 u_ProjMatrix;

    varying vec4 v_Color;

    void main(){
      gl_Position = u_ProjMatrix * a_Position;
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

initShaderProgram(gl, vertex, fragment);

const n = initVertexBuffer(gl);

// 透视投影矩阵
const uProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
const projMatrix = new Matrix4();
projMatrix.setPerspective(10, canvas.width / canvas.height, 100, 200);
gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);

gl.clearColor(0, 0, 0, 1);

// 开启消除隐藏面
gl.enable(gl.DEPTH_TEST);

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);
