/**
 * 初始化顶点数据缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  // 顶点坐标 纹理坐标
  const vertices = new Float32Array([
    // 顶点坐标 和 颜色值
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

  // 顶点个数
  const n = 9;

  // 创建缓冲数据
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

// 视图矩阵和顶点坐标相乘； 意味着：根据视图矩阵（观察者,照相机），调整每个顶点坐标，渲染到屏幕上
function draw() {
  const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_RotateMatrix;

    varying vec4 v_Color;

    void main(){
      gl_Position = u_ViewMatrix *  a_Position * u_RotateMatrix;
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

  // 根据下面的三个矢量创建视图矩阵：影响屏幕上的视图
  // 视点，目标点/观察点/视线，上方向
  const viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0, 0, 0.5, 0.5, 0, 0, 0, 1, 0);

  const uViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

  // 旋转：先设置视图矩阵，从指定视点观察旋转后的三角形
  const rotateMatrix = new Matrix4();
  rotateMatrix.setRotate(-10, 0, 0, 1);

  const uRotateMatrix = gl.getUniformLocation(gl.program, 'u_RotateMatrix');
  gl.uniformMatrix4fv(uRotateMatrix, false, rotateMatrix.elements);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

draw();