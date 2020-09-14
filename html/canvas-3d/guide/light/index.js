/**
 * 初始化顶点数据缓存
 * 物体都是有，点，线面（三角形组成
 * @param {*} gl 
 */
function initVertexBuffer(gl) {
  var vertices = new Float32Array([
    1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // v0-v1-v2-v3 front
    1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // v0-v3-v4-v5 right
    1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // v1-v6-v7-v2 left
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // v7-v4-v3-v2 down
    1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0  // v4-v7-v6-v5 back
  ]);

  var colors = new Float32Array([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  // v0-v1-v2-v3 front    
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // v0-v3-v4-v5 right
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // v0-v5-v6-v1 up
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // v1-v6-v7-v2 left
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // v7-v4-v3-v2 down
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 // v4-v7-v6-v5 back
  ]);

  var normals = new Float32Array([
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
  ]);


  // 每个面的两个三角形的顶点索引
  var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    4, 5, 6, 4, 6, 7,    // right
    8, 9, 10, 8, 10, 11,    // up
    12, 13, 14, 12, 14, 15,    // left
    16, 17, 18, 16, 18, 19,    // down
    20, 21, 22, 20, 22, 23     // back
  ]);

  initArrayBuffer(gl, 'a_Position', vertices, 3, gl.FLOAT);
  initArrayBuffer(gl, 'a_Color', colors, 3, gl.FLOAT);
  initArrayBuffer(gl, 'a_Normal', normals, 3, gl.FLOAT);


  const indexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

/**
 * 初始化数组类型缓冲区
 * @param {*} gl 
 * @param {*} attribute 
 * @param {*} data 
 * @param {*} num 
 * @param {*} type 
 */
function initArrayBuffer(gl, attribute, data, num, type) {
  const buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

  const aAttribute = gl.getAttribLocation(gl.program, attribute);

  gl.vertexAttribPointer(aAttribute, num, type, false, 0, 0);
  gl.enableVertexAttribArray(aAttribute);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {

  // 平行光下的漫反射光
  const vertex = `
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec4 a_Normal; // 法向量

  uniform mat4 u_MvpMatrix;
  uniform vec3 u_LightColor; // 入射线/光线颜色
  uniform vec3 u_LightDirection; // 归一化世界坐标

  varying vec4 v_Color;

  void main(){
    // 模型视图透视举证转换
    gl_Position = u_MvpMatrix * a_Position;
    // 对法向量进行归一化
    vec3 normal = normalize(vec3(a_Normal));
    // 计算光线方向和法向量的点积(夹角)，当夹角大于90度时，光照没有作用，照射在物体背面
    float nDotL = max(dot(u_LightDirection,normal),0.0);
    // 计算漫反射光线的颜色
    vec3 diffuse = u_LightColor * vec3(a_Color) * nDotL;
    // 顶点颜色
    v_Color = vec4(diffuse,1.0);
  }
  `,
    fragment = `
    precision mediump float;
    varying vec4 v_Color;

    void main() {
      gl_FragColor = v_Color;
    }`;

  if (!initShaderProgram(gl, vertex, fragment)) {
    return;
  }

  const n = initVertexBuffer(gl);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  // 可视空间下的物体
  const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  // 视图投影矩阵
  const mvpMatrix = new Matrix4();
  // 透视矩阵
  mvpMatrix.perspective(30, canvas.width / canvas.clientHeight, 1, 100);
  // 视图矩阵
  mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
  // 模型矩阵
  mvpMatrix.scale(0.5,0.5,0.5);
  gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

  // 光照下的物体
  // 光线颜色
  const uLightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
  gl.uniform3f(uLightColor, 1, 1, 1);

  // 光线方向
  const uLightDirection = gl.getUniformLocation(gl.program, 'u_LightDirection');
  const lightDirection = new Vector3([0.5, 3, 4]);
  lightDirection.normalize(); // 归一化
  gl.uniform3fv(uLightDirection, lightDirection.elements);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

draw();