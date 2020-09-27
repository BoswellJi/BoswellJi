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
gl.clear(gl.COLOR_BUFFER_BIT);

const n = initVertexBuffers(gl, new Float32Array([
  0, 0.5,
  -0.5, -0.5,
  0.5, -0.5,
]), 'a_Position');

gl.drawArrays(gl.LINE_STRIP, 0, 3);

/**
 * 顶点缓冲区
 * @param {*} gl 
 * @param {*} vertices 
 * @param {*} attribute
 */
function initVertexBuffers(gl, vertices, attribute) {
  // 创建缓冲区对象
  const vertexBuffer = gl.createBuffer();
  // 将缓冲区对象绑定
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 将数据(顶点数据)放到缓冲区对象中
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // 获取着色器中的变量地址
  const aPosition = gl.getAttribLocation(gl.program, attribute);
  // 指定取数据的规则，将缓冲区对象分配给attribute变量
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  // 开始使用，使得顶点能够访问缓冲区内的数据
  gl.enableVertexAttribArray(aPosition);
}

