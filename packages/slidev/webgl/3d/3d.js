const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');
const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    
    uniform mat4 u_ViewMatrix;

    varying vec4 v_Color;

    void main(){
      gl_Position = u_ViewMatrix *  a_Position;
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

const viewMatrix = new Matrix4();
// 设置照相机
viewMatrix.setLookAt(1, .25, .25, 0, 0, -1, 0, 1, 0);

const uViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

gl.clearColor(0.0, 0.0, 0.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);

function initVertexBuffer(gl) {
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


