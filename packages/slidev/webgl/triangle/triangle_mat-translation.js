/**
 * 矩阵平移
 */
const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

let vertex = `
    attribute vec4 a_Position;
    uniform mat4 u_xformMatrix;

    void main(){
      
      gl_Position = a_Position * u_xformMatrix;
    }
`;
let fragment = `
    precision mediump float;
    uniform vec4  u_FragColor;
    void main(){
      gl_FragColor = u_FragColor;
    }
`;

initShaders(gl, vertex, fragment);

const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
const uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
const uTranslation = gl.getUniformLocation(gl.program, 'u_Translation');

gl.clearColor(0.0, 0.0, 0.0, 1.0);

const n = initVertexBuffer(gl);
const xformMatrix = new Float32Array([
  1, 0, 0, .1,
  0, 1, 0, .1,
  0, 0, 1, 0,
  0, 0, 0, 1
]);

const uXformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
gl.uniformMatrix4fv(uXformMatrix, false, xformMatrix);
gl.vertexAttrib1f(aPointSize, 5);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.LINES, 0, n);


function initVertexBuffer(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,

    -0.5, -0.5,
    0.5, 0.5,
    0.5, -0.5
  ]);
  const n = 6; 

  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    return -1;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(aPosition);

  return n;
}


