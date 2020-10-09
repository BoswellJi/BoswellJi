/**
 * 矩阵旋转
 */

function initVertexBuffer(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
  ]);

  const vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');

  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  gl.enableVertexAttribArray(aPosition);

  return vertices.length / 2;
}

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');
const vertex = `
    attribute vec4 a_Position;

    uniform mat4 u_xformMatrix;

    void main(){ 
       gl_Position = a_Position * u_xformMatrix;
    }
`;
const fragment = `
    precision mediump float;

    void main(){
      gl_FragColor = vec4(1,0.0,0.0,1.0);
    }
`;

initShaders(gl, vertex, fragment)

gl.clearColor(0.0, 0.0, 0.0, 1.0);

const n = initVertexBuffer(gl);
const h = 2 * Math.PI / 360 * 100;
const uCos = Math.cos(h);
const uSin = Math.sin(h);

const xformMatrix = new Float32Array([
  uCos, -uSin, 0, 0,
  uSin, uCos, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]);
const uXformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
gl.uniformMatrix4fv(uXformMatrix, false, xformMatrix);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);
