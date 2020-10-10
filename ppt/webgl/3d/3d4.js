function initVertexBuffer(gl) {
  var vertices = new Float32Array([   
    1.0, 1.0, 1.0,   1.0, 1.0, 1.0, 
    -1.0, 1.0, 1.0,   1.0, 0.0, 1.0, 
    -1.0, -1.0, 1.0,   1.0, 0.0, 0.0,
    1.0, -1.0, 1.0,   1.0, 1.0, 0.0, 
    1.0, -1.0, -1.0,   0.0, 1.0, 0.0, 
    1.0, 1.0, -1.0,   0.0, 1.0, 1.0, 
    -1.0, 1.0, -1.0,   0.0, 0.0, 1.0, 
    -1.0, -1.0, -1.0,   0.0, 0.0, 0.0  
  ]);

  var indices = new Uint8Array([
    0, 1, 2, 2, 0, 3,    // front
    0, 3, 4, 4, 0, 5,    // right
    0, 5, 6, 0, 6, 1,    // up
    1, 6, 7, 1, 7, 2,    // left
    7, 4, 3, 7, 3, 2,    // down
    4, 7, 6, 4, 6, 5     // back
  ]);
  // 顶点颜色缓冲区
  const vertexColorBuffer = gl.createBuffer();
  const size = vertices.BYTES_PER_ELEMENT;
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, size * 6, 0);
  gl.enableVertexAttribArray(aPosition);

  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, size * 6, size * 3);
  gl.enableVertexAttribArray(aColor);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {
  const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_MvpMatrix;
    varying vec4 v_Color;

    void main(){
      gl_Position = u_MvpMatrix * a_Position;
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

  initShaders(gl, vertex, fragment);

  const n = initVertexBuffer(gl);

  gl.clearColor(0, 0, 0, 1);
  gl.enable(gl.DEPTH_TEST);

  const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  const mvpMatrix = new Matrix4();
  mvpMatrix.setPerspective(30, 1, 1, 100);
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  mvpMatrix.rotate(0, 0, 0, 1);

  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

draw();


