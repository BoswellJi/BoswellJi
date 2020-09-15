function initVertexBuffer(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
    -1, -0.5,
    1, 0.5,
    1, -0.5
  ]);
  const n = 6;

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  const colors = new Float32Array([
    0, 0, 1,
    0, 1, 1,
    1, 0, 1,
    0, 0, 1,
    0, 1, 0,
    1, 0, 0,
  ]);
  const colorsBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorsBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

  const aColor = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aColor);

  return n;
}

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vs = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    
    varying vec4 v_Color;

    void main(){
      gl_Position = a_Position;
      v_Color = a_Color;
    }
`;
const fs = `
    precision mediump float;
    varying vec4 v_Color;

    void main(){
      gl_FragColor = v_Color;
    }
`;

initShaderProgram(gl, vs, fs);

let n = initVertexBuffer(gl);

gl.clearColor(0.0, 0.0, 0.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);