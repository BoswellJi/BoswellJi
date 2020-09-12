/**
 * 初始化顶点数据缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 顶点坐标 纹理坐标
  const vertices = new Float32Array([
    // Three triangles on the right side
    0.75, 1.0, -4.0, 0.4, 1.0, 0.4, // The back green one
    0.25, -1.0, -4.0, 0.4, 1.0, 0.4,
    1.25, -1.0, -4.0, 1.0, 0.4, 0.4,

    0.75, 1.0, -2.0, 1.0, 1.0, 0.4, // The middle yellow one
    0.25, -1.0, -2.0, 1.0, 1.0, 0.4,
    1.25, -1.0, -2.0, 1.0, 0.4, 0.4,

    0.75, 1.0, 0.0, 0.4, 0.4, 1.0,  // The front blue one 
    0.25, -1.0, 0.0, 0.4, 0.4, 1.0,
    1.25, -1.0, 0.0, 1.0, 0.4, 0.4,

    // Three triangles on the left side
    -0.75, 1.0, -4.0, 0.4, 1.0, 0.4, // The back green one
    -1.25, -1.0, -4.0, 0.4, 1.0, 0.4,
    -0.25, -1.0, -4.0, 1.0, 0.4, 0.4,

    -0.75, 1.0, -2.0, 1.0, 1.0, 0.4, // The middle yellow one
    -1.25, -1.0, -2.0, 1.0, 1.0, 0.4,
    -0.25, -1.0, -2.0, 1.0, 0.4, 0.4,

    -0.75, 1.0, 0.0, 0.4, 0.4, 1.0,  // The front blue one 
    -1.25, -1.0, 0.0, 0.4, 0.4, 1.0,
    -0.25, -1.0, 0.0, 1.0, 0.4, 0.4,
  ]);

  // 顶点个数
  const n = 18;

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

function draw() {
  const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    uniform mat4 u_ProjMatrix;
    uniform mat4 u_ViewMatrix;

    void main(){
      gl_Position = u_ProjMatrix * u_ViewMatrix *  a_Position;
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

  const n = initVertexBuffer(gl);
  
  
  // 视图矩阵
  const uViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0, 0, 5, 0, 0, -100, 0, 1, 0);
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  // 透视投影矩阵
  const uProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  const projMatrix = new Matrix4();
  projMatrix.setPerspective(50, canvas.width / canvas.height/2, 1, 100);
  gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);

  gl.clearColor(0, 0, 0, 1);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

draw();