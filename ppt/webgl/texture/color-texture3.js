
function initVertexBuffer(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
  ]);
  const n = 3;

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

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl'),
  vertex = `
    attribute vec4 a_Position;

    void main(){ 
       gl_Position = a_Position;
    }
  `;

// gl_FragCoord: 片元的坐标系，在canvas坐标系中的定位；
const fragment = `
    precision mediump float;

    uniform float u_Width;
    uniform float u_Height;

    void main(){
      gl_FragColor = vec4(gl_FragCoord.x/u_Width,0.0,gl_FragCoord.y/u_Height,1.0);
    }
  `;

initShaders(gl, vertex, fragment)

const n = initVertexBuffer(gl);

const uWidth = gl.getUniformLocation(gl.program, 'u_Width');
const uHeight = gl.getUniformLocation(gl.program, 'u_Height');

gl.uniform1f(uWidth, gl.drawingBufferWidth);
gl.uniform1f(uHeight, gl.drawingBufferHeight);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, n);
