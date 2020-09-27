const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vertexShaderSource = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;

    varying vec4 v_Color;

    void main(){
      gl_Position = a_Position;
      gl_PointSize = 5.0;
      v_Color = a_Color;
    }
`;
const fragmentShaderSource = `
    precision mediump float;
    varying vec4 v_Color;

    void main(){
      gl_FragColor = vec4(1,0,1,1);
    }
`;

initShaders(gl, vertexShaderSource, fragmentShaderSource);

gl.clearColor(0, 0, 0, 1);

const n = initVertexBuffers(gl, new Float32Array([
  0, 0.5,
  -0.5, -0.5,

  -0.5, -0.5,
  0.5, -0.5,

  0.5, -0.5,
  0, 0.5,
]), 'a_Position');

gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.LINES, 0, 6);

function initVertexBuffers(gl, vertices, attribute) {
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, attribute);
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);
}

