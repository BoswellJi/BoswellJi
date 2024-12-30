function initVertexBuffer(gl) {
  const verticesColors = new Float32Array([
    // Vertex coordinates and color(RGBA)
    0.0, 0.5, -0.4,   0.4, 1.0, 0.4, 0.4, // The back green one
    -0.5, -0.5, -0.4, 0.4, 1.0, 0.4, 0.4,
    0.5, -0.5, -0.4, 1.0, 0.4, 0.4, 0.4,

    0.5, 0.4, -0.2, 1.0, 0.4, 0.4, 0.4, // The middle yerrow one
    -0.5, 0.4, -0.2, 1.0, 1.0, 0.4, 0.4,
    0.0, -0.6, -0.2, 1.0, 1.0, 0.4, 0.4,

    0.0, 0.5, 0.0, 0.4, 0.4, 1.0, 0.4,  // The front blue one 
    -0.5, -0.5, 0.0, 0.4, 0.4, 1.0, 0.4,
    0.5, -0.5, 0.0, 1.0, 0.4, 0.4, 0.4,
  ]);
  const size = verticesColors.BYTES_PER_ELEMENT;

  var buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var a_attribute = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_attribute, 3, gl.FLOAT, false, size * 7, 0);

  gl.enableVertexAttribArray(a_attribute);

  var aColor = gl.getAttribLocation(gl.program, 'a_Color');
  gl.vertexAttribPointer(aColor, 4, gl.FLOAT, false, size * 7, size * 3);

  gl.enableVertexAttribArray(aColor);

  return 9;
}

const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    
    uniform mat4 u_ProjMatrix;
    uniform mat4 u_ViewMatrix;

    varying vec4 v_Color;

    void main(){
      gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;

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

gl.clearColor(0, 0, 0, 1.0);

// 开启深度测试
gl.enable(gl.DEPTH_TEST);

// 开启混合功能
gl.enable(gl.BLEND);

// 指定混合功能
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

var uViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
const viewMatrix = new Matrix4();
var g_EyeX = 0.20, g_EyeY = 0.25, g_EyeZ = 0.25;
viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, 0, 0, 0, 0, 1, 0);
gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix.elements);

var uProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
var projMatrix = new Matrix4();
projMatrix.setOrtho(-1, 1, -1, 1, 0, 2);
gl.uniformMatrix4fv(uProjMatrix, false, projMatrix.elements);

render();

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0,n);
}

