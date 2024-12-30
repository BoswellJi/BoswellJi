/**
 * 雾化： 描述远处的物体看上去较为模糊的现象；
 * 
 * 1. 任何介质中的物体都可能表现出雾化现象；
 * 
 * 实现雾化的方式：
 * 1. 线性雾化： 某一点的雾化程度取决于它与视点之间的距离，距离越远雾化程度越高；
 * 2. 有起点，有终点
 * 
 * 完全雾化： 表示完全看不见
 * 
 * 某一点雾化的程度： 被定义为雾化因子
 * 
 * 雾化因子 = （终点-当前点与视点之间的距离） / （终点-起点）
 * 
 * 起点 <= 当前点与视点之间的距离 <= 终点
 * 
 * 雾化因子是1： 表示完全没有被雾化
 * 雾化因子是0： 表示完全被雾化，完全看不见
 * 
 * 片元着色器中，根据雾化因子计算片元颜色
 * 
 * 片元颜色 = 物体表面颜色 * 雾化因子 + 雾的颜色 * （1-雾化因子）
 */


function initVertexBuffer(gl) {
  /**
   * 给每个表面指定颜色
   * 1. 给前表面v0顶点指定为蓝色，因为另外两个面也会用到，所以也是蓝色；
   * 2. 所以需要创建多个相同的顶点；
   */

  // 6个面，每面4个点，共24个点
  // 三个三个顶点一组，构成
  var vertices = new Float32Array([
    1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,  // v0-v1-v2-v3 front
    1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,  // v0-v3-v4-v5 right
    1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,  // v0-v5-v6-v1 up
    -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,  // v1-v6-v7-v2 left
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,  // v7-v4-v3-v2 down
    1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0   // v4-v7-v6-v5 back
  ]);

  // 每个顶点的颜色
  var colors = new Float32Array([     // Colors
    0.4, 0, 1.0, 0.4, 0.4, 0, 1.0, 0.4, 0.4, 0, 1.0, 0.4, 0.4, 0, 1.0, 0.4,  // v0-v1-v2-v3 front(blue)
    0.4, 1.0, 0.4, 0.4, 0.4, 1.0, 0.4, 0.4, 0.4, 1.0, 0.4, 0.4, 0.4, 1.0, 0.4, 0.4,  // v0-v3-v4-v5 right(green)
    1.0, 0.4, 0.4, 0.4, 1.0, 0.4, 0.4, 0.4, 1.0, 0.4, 0.4, 0.4, 1.0, 0.4, 0.4, 0.4,  // v0-v5-v6-v1 up(red)
    1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4,  // v1-v6-v7-v2 left
    1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 0.4, 1.0, 1.0, 1.0, 0.4,  // v7-v4-v3-v2 down
    0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4, 0.4, 1.0, 1.0, 0.4,  // v4-v7-v6-v5 back
  ]);

  // 
  var indices = new Uint8Array([
    0, 1, 2, 0, 2, 3,    // front
    4, 5, 6, 4, 6, 7,    // right
    8, 9, 10, 8, 10, 11,    // up
    12, 13, 14, 12, 14, 15,    // left
    16, 17, 18, 16, 18, 19,    // down
    20, 21, 22, 20, 22, 23     // back
  ]);

  var indexBuffer = gl.createBuffer();

  if (!initArrayBuffer(gl, vertices, 3, gl.FLOAT, 'a_Position'))
    return -1;

  if (!initArrayBuffer(gl, colors, 4, gl.FLOAT, 'a_Color'))
    return -1;

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initArrayBuffer(gl, data, num, type, attribute) {
  var buffer = gl.createBuffer();   // Create a buffer object
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');


const vertex = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    
    uniform mat4 u_MvpMatrix;
  

    varying vec4 v_Color;

    void main(){
      gl_Position = u_MvpMatrix * a_Position;

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

initShaderProgram(gl, vertex, fragment);

const n = initVertexBuffer(gl);

// 设置webgl中的视口大小： 左下角为原点（0，0） canvas的宽高
// 设置gl.drawArrays(),gl.drawElements()函数的的绘图区域
gl.viewport(0,0,400,600);

// 方案1： 会让不透明的物体前后关系乱掉；不推荐
// 隐藏消除面功能开启时，被隐藏的片元不会被绘制，所以不会发生混合过程；不会有半透明效果；
// 取消隐藏消除面功能即可；
// gl.enable(gl.DEPTH_TEST);

gl.enable(gl.DEPTH_TEST);
// 消隐功能，让webgl不再绘制图形的背面，提高绘制速度；
gl.enable(gl.CULL_FACE);
// 锁定用于进行隐藏面消除的深度缓冲区的写入操作，使之只读
gl.depthMask(false);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


const uMvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
const mvpMatrix = new Matrix4();
mvpMatrix.setPerspective(30, 1, 1, 1000);
mvpMatrix.lookAt(25, 65, 35, 0, 1, 0, 0, 1, 0);
mvpMatrix.rotate(0, 0, 0, 1);
mvpMatrix.scale(10, 10, 10);
gl.uniformMatrix4fv(uMvpMatrix, false, mvpMatrix.elements);

gl.clearColor(0, 0, 0, 1.0);



render();

// 恢复深度缓冲区，使之可读可写
gl.depthMask(true);

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

const vertexColors = new Float32Array([
  .6, -.7, 1, 0, 1,
  .6, -.6, 1, 0, 1,
  .7, -.6, 1, 0, 1,
  .7, -.7, 1, 0, 1,
]);
const buffer1 = gl.createBuffer();
const size = buffer1.BYTES_PER_ELEMENT;

gl.bindBuffer(gl.ARRAY_BUFFER, buffer1);
gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);

const aPos = gl.getAttribLocation(gl.program, 'a_Position');
gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, size * 5, 0);
gl.enableVertexAttribArray(aPos);

const aColor = gl.getAttribLocation(gl.program, 'a_Color');
gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, size * 5, size*2);
gl.enableVertexAttribArray(aColor);

// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0 , 4);