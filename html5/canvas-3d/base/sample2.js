
const canvas = document.querySelector('#glcanvas');
const gl = canvas.getContext('webgl');
const vsSource = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  attribute vec4 a_Color;

  varying vec4 v_Color;

  void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
    v_Color = a_Color;
  }
`;
const fsSource = `
  precision mediump float;

  varying vec4 v_Color;

  void main(){
    gl_FragColor = v_Color;
  }
`;
// 着色器程序对象
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

// 获取着色器程序中的属性变量
const vertexPosition = gl.getAttribLocation(shaderProgram, 'a_Position');
const vertexSize = gl.getAttribLocation(shaderProgram, 'a_PointSize');
const vertexColor = gl.getAttribLocation(shaderProgram, 'a_Color');

// 单个顶点赋值
// gl.vertexAttrib4fv(vertexPosition, [0.5, -0.5, 0, 1]); 
gl.vertexAttrib1fv(vertexSize, [5]);

const positionBuffer = gl.createBuffer();
const size = positionBuffer.BYTES_PER_ELEMENT;
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const vertices = [
  0, 1, 0, 0, 0, 1,
  -1, -1, 0, 0, 1, 0,
  1, -1, 0, 0, 0, 0
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// 给变量指定缓冲中的数据以及获取方式
gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 6 * size, 0);
// 开启缓冲区与着色器变量
gl.enableVertexAttribArray(vertexPosition);

// 给变量指定缓冲中的数据以及获取方式
gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 6 * size, 3 * size);
// 开启缓冲区与着色器变量
gl.enableVertexAttribArray(vertexColor);

// 绘制图形
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);
