
const canvas = document.querySelector('#glcanvas');
const gl = canvas.getContext('webgl');
const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    void main() {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `;
const fsSource = `
    void main(){
      gl_FragColor = vec4(1.0,1.0,1.0,1.0);
    }
  `;
const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
  }
};

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const vertices = [
  1.0, 1.0, 0.0,
  -1.0, 1.0, 0.0,
  1.0, -1.0, 0.0,
  -1.0, -1.0, 0.0
];

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

gl.clearColor(0, 0, 0, 1);
gl.clearDepth(1);
gl.enable(gl.EDPTH_TEST);
gl.depthFunc(gl.LEQUAL);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const fieldOfView = 45 * Math.PI / 180,
  aspect = gl.canvas.clientWidth / gl.canvas.clientHeight,
  zNear = .1,
  zFar = 100,
  projectionMatrix = mat4.create();

mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

const modelViewMatrix = mat4.create();

mat4.translate(modelViewMatrix,
  modelViewMatrix,
  [-0.0, 0.0, -6.0]);

const numComponents = 3;
const type = gl.FLOAT;
const normalize = false;
const stride = 0;
const offset = 0;

gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(
  programInfo.attribLocations.vertexPosition,
  numComponents,
  type,
  normalize,
  stride,
  offset);
gl.enableVertexAttribArray(
  programInfo.attribLocations.vertexPosition);

gl.useProgram(programInfo.program);

gl.uniformMatrix4fv(
  programInfo.uniformLocations.projectionMatrix,
  false,
  projectionMatrix);
gl.uniformMatrix4fv(
  programInfo.uniformLocations.modelViewMatrix,
  false,
  modelViewMatrix);


const offset1 = 0;
const vertexCount = 4;
gl.drawArrays(gl.TRIANGLE_STRIP, offset1, vertexCount);

