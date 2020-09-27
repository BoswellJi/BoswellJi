var drawQiu02 = function (rX, rY, rZ, r, m) {
  var arr = new Array();

  var bufR = -r;
  function getMaxY(a, z, r) {
    var angle = 0;
    var addAng = 360 / a;
    var d = new Array();

    for (var i = 0; i < a; i++) {
      d.push(Math.sin(Math.PI / 180 * angle) * r, Math.cos(Math.PI / 180 * angle) * r, z);
      angle += addAng;
    }
    return d;
  }

  var addAng = 360 / m;
  var angle = 0;
  var bufR = r;
  var angle02 = 0;
  var addAng02 = addAng;

  for (var i = 0; i < m / 2; i++) {
    if (i >= m / 4) {
      var z = Math.sin(Math.PI / 180 * angle) * -r;
    } else {
      var z = Math.sin(Math.PI / 180 * angle) * -r;
    }

    angle += addAng;

    var arr1 = getMaxY(m, z, bufR);
    if (i >= m / 4) {
      z = Math.sin(Math.PI / 180 * angle) * -r
    } else {
      z = -Math.sin(Math.PI / 180 * angle) * -r;
    }
    bufR = Math.sqrt(r * r - r * Math.sin(Math.PI / 180 * angle) * r * Math.sin(Math.PI / 180 * angle));
    var arr2 = getMaxY(m, z, bufR);

    for (var q = 0; q < arr1.length; q += 3) {
      if (q == 0) {
        arr.push(arr1[q], arr1[q + 1], arr1[q + 2]);
        arr.push(arr2[q], arr2[q + 1], arr2[q + 2]);
        arr.push(arr1[arr1.length - 3], arr1[arr1.length - 2], arr1[arr1.length - 1]);
        arr.push(arr1[q], arr1[q + 1], arr1[q + 2]);
        arr.push(arr2[q], arr2[q + 1], arr2[q + 2]);
        arr.push(arr2[q + 3], arr2[q + 4], arr2[q + 5]);
      } else if (q == arr1.length - 3) {
        arr.push(arr1[q], arr1[q + 1], arr1[q + 2]);
        arr.push(arr2[q], arr2[q + 1], arr2[q + 2]);
        arr.push(arr1[q - 3], arr1[q - 2], arr1[q - 1]);
        arr.push(arr1[q], arr1[q + 1], arr1[q + 2]);
        arr.push(arr2[q], arr2[q + 1], arr2[q + 2]);
        arr.push(arr2[0], arr2[1], arr2[2]);
      } else {
        arr.push(arr1[q], arr1[q + 1], arr1[q + 2]);
        arr.push(arr2[q], arr2[q + 1], arr2[q + 2]);
        arr.push(arr1[q - 3], arr1[q - 2], arr1[q - 1]);
        arr.push(arr1[q], arr1[q + 1], arr1[q + 2]);
        arr.push(arr2[q], arr2[q + 1], arr2[q + 2]);
        arr.push(arr2[q + 3], arr2[q + 4], arr2[q + 5]);
      }

    }
  }
  return arr;
}

/**
 * 初始化顶点数据缓存
 * @param {*} gl 
 */
function initVertexBuffer(gl) {

  const vertexColorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');

  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  console.log(data.length / 3);

  return data.length / 3;
}

const data = drawQiu02(0, 0, 0, 0.5, 180);
const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vs = `
  attribute vec3 a_Position;
  uniform mat4 u_MvpMatrix;
  varying vec4 v_Color;

  void main(){
    gl_Position=u_MvpMatrix * vec4(a_Position,1.0);

    v_Color=vec4(a_Position.x,a_Position.y,a_Position.z,0.8);}
`;
const fs = ` 
  precision mediump float;
  varying vec4 v_Color;

  void main(){
      gl_FragColor= v_Color;
  }
`;

initShaders(gl, vs, fs);

const n = initVertexBuffer(gl);

gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);

const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');

(function () {
  let currentAngle = 0.0;
  const ANGLE_STEP = 30.0;
  let g_last = Date.now();

  const tick = function () {
    currentAngle = animate(currentAngle);

    const mvpMatrix = new Matrix4();
    mvpMatrix.setPerspective(30, 1, 1, 100);
    mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);
    mvpMatrix.scale(4, 4, 4);
    mvpMatrix.rotate(currentAngle, 0, 0, 1);
    mvpMatrix.rotate(currentAngle, 0, 1, 0);
    mvpMatrix.rotate(currentAngle, 1, 0, 0);

    gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);

    requestAnimationFrame(tick);
  };
  tick();

  function animate(angle) {
    let now = Date.now();
    let elapsed = now - g_last;
    g_last = now;
    let newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
    return newAngle %= 360;
  }
})()