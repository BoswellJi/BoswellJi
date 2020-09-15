const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

readOBJFile('/canvas-3d/guide/asset/cube.obj', 60, true);

function readOBJFile(fileName, scale, reverse) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status !== 404) {
      onReadOBJFile(request.responseText, fileName, scale, reverse);
    }
  }
  request.open('GET', fileName, true);
  request.send();
}

function onReadOBJFile(fileString, fileName, scale, reverse) {
  var objDoc = new OBJDoc(fileName);
  var result = objDoc.parse(fileString, scale, reverse);

  initArrayBuffer(objDoc.getDrawingInfo());

  draw(objDoc.getDrawingInfo(), 0);

  var currentAngle = 0.0; // Current rotation angle [degree]
  var tick = function () {   // Start drawing
    currentAngle = animate(currentAngle); // Update current rotation angle
    draw(objDoc.getDrawingInfo(), currentAngle);
    requestAnimationFrame(tick);
  };
  tick();


  if (!result) {
    g_objDoc = null; g_drawingInfo = null;
    console.log("OBJ file parsing error.");
    return;
  }
  g_objDoc = objDoc;
}

function initArrayBuffer(objDoc) {
  const vertexBuffer = gl.createBuffer();
  const aPosAttribute = gl.getAttribLocation(gl.program, 'a_Position');
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, objDoc.vertices, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPosAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosAttribute);

  const normalBuffer = gl.createBuffer();
  const aNorAttribute = gl.getAttribLocation(gl.program, 'a_Normal');
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, objDoc.normals, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aNorAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aNorAttribute);

  const colorBuffer = gl.createBuffer();
  const aColAttribute = gl.getAttribLocation(gl.program, 'a_Color');
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, objDoc.colors, gl.STATIC_DRAW);
  gl.vertexAttribPointer(aColAttribute, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aColAttribute);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, objDoc.indices, gl.STATIC_DRAW);
}

const vertex = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec4 a_Normal;
  
  uniform mat4 u_MvpMatrix;
  uniform mat4 u_NormalMatrix;
  
  varying vec4 v_Color;

  void main(){
    // 计算顶点坐标
    gl_Position = u_MvpMatrix * a_Position;

    // 计算光照下的顶点颜色

    // 光线方向
    vec3 lightDirection = vec3(-0.35,0.35,0.87);

    // 计算变换后的法线
    vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));

    // 入射光与法线的夹角
    float nDotL = max(dot(normal,lightDirection),0.0);

    v_Color = vec4(a_Color.rgb * nDotL,a_Color);
  }
`;
const fragment = `
    precision mediump float;

    varying vec4 v_Color;

    void main() {
  
      gl_FragColor = v_Color;
    }
`;

// 初始化着色器程序
initShaderProgram(gl, vertex, fragment);

gl.clearColor(0.2, 0.2, 0.2, 1.0);
gl.enable(gl.DEPTH_TEST);

const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
const uNormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
// 视图透视矩阵
const viewProjMatrix = new Matrix4();
viewProjMatrix.setPerspective(30.0, canvas.width / canvas.height, 1.0, 5000.0);
viewProjMatrix.lookAt(0.0, 500.0, 200.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

// 逆转置矩阵
const gNormalMatrix = new Matrix4();
// 模型矩阵
const gModelMatrix = new Matrix4();
// 模型视图透视矩阵
const gMvpMatrix = new Matrix4();

gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

function draw(objDoc, angle) {

  gModelMatrix.setRotate(angle, 1.0, 0.0, 0.0);
  gModelMatrix.rotate(angle, 0.0, 1.0, 0.0);
  gModelMatrix.rotate(angle, 0.0, 0.0, 1.0);

  gNormalMatrix.setInverseOf(gModelMatrix);
  gNormalMatrix.transpose();
  gl.uniformMatrix4fv(uNormalMatrix, false, gNormalMatrix.elements);

  gMvpMatrix.set(viewProjMatrix);
  gMvpMatrix.multiply(gModelMatrix);
  gl.uniformMatrix4fv(uMvpMatrix, false, gMvpMatrix.elements);

  gl.drawElements(gl.TRIANGLES, objDoc.indices.length, gl.UNSIGNED_SHORT, 0);
}


var ANGLE_STEP = 30;

var last = Date.now();
function animate(angle) {
  var now = Date.now();
  var elapsed = now - last;
  last = now;

  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle % 360;
}