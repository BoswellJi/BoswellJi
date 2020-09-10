
function initVertexBuffer(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,
  ]);
  const n = 3; // 2维

  // 1. 创建缓冲区对象(webgl系统中的一块内存区域，将glsl中的变量存储位置指向这块内存)
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    return -1;
  }
  // 2. 将缓冲区对象绑定到目标
  // target: gl.ARRAY_BUFFER gl.ELEMENT_ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // 3. 向缓冲区写入数据
  // target data usage: gl.STATIC_DRAW gl.STREAM_DRAW gl.DYNAMIC_DRAW
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');

  // 4. 将缓冲区对象分配给aPosition
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

  // 5. 连接aPosition变量与分配给它的缓冲对象
  gl.enableVertexAttribArray(aPosition);

  return n;
}

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl'),
  vertex = `
    attribute vec4 a_Position;

    uniform mat4 u_xformMatrix;

    
    void main(){ 
       gl_Position = a_Position * u_xformMatrix;
    }
  `,
  fragment = `
    precision mediump float;

    uniform float u_Width;
    uniform float u_Height;

    void main(){
      gl_FragColor = vec4(1,0.0,0.0,1.0);
    }
  `;

initShaderProgram(gl, vertex, fragment)

// 设置canvas背景
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// 清空canvas背景
gl.clear(gl.COLOR_BUFFER_BIT);

const canvasWidth = canvas.width/400;
const canvasHeight = canvas.height/400;

gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Width'), false, canvasWidth);
gl.uniform1f(gl.getUniformLocation(gl.program, 'u_Height'), false, canvasHeight);


const n = initVertexBuffer(gl),
  h = 2 * Math.PI / 360 * 180,
  uCos = Math.cos(h),
  uSin = Math.sin(h);

// // 旋转变换矩阵
const xformMatrix = new Float32Array([
  uCos, -uSin, 0, 0,
  uSin, uCos, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]);

// 平移矩阵
// const xformMatrix = new Float32Array([
//   1, 0, 0, 0,
//   0, 1, 0, 0,
//   0, 0, 1, 0,
//   0, 0, 0, 1
// ]);

// // 缩放变换矩阵
// const xformMatrix = new Float32Array([
//   1, 0, 0, 0,
//   0, 1, 0, 0,
//   0, 0, 1, 0,
//   0, 0, 0, 1
// ]);

const uXformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');

/**
 * 数组是一维,这里我们可以按照两种方式在数组中存储矩阵元素
 * 1. 按行主序
 * 2. 按列主序
 * 
 * webgl和opengl都是使用的 按列主序
 */
gl.uniformMatrix4fv(uXformMatrix, false, xformMatrix);

// gl.TRIANGLES: 就是告诉webgl
// 1. 从缓冲区的第一个顶点开始，始顶点着色器执行3次
// 2. 使用这三个顶点绘制出三角形
gl.drawArrays(gl.TRIANGLES, 0, n);


// 旋转: 绕z轴，逆时针旋转 a 角度，

// 如果a为正值，观察者在z轴正半轴某处，视线沿着z轴负方向进行观察，那么看到的物体就是逆时针旋转的，这种情况叫做 `正旋转`

//  `右手法则旋转`

/**
 * 旋转变换：
 * （x,y）变化到 （x',y'）
 * x' = xcon(a) - ysin(a)
 * y' = xsin(a) + ycos(a)
 */

/**
 * 变化矩阵： 平移，旋转，缩放
 * 
 * 根据矩阵与向量的乘法来决定，矩阵的设置
 * 
 * (x,y,z)
 * 
 * 平移：
 * x' = ax + by + cz;
 * y' = dx + ey + fz
 * z' = z
 * 
 * 1 0 0 tx
 * 0 1 0 ty
 * 0 0 1 tz
 * 0 0 0 1
 * 
 * 旋转：
 * 
 * 
 * x' = xcos(a) - ysin(a);
 * y' = xsin(a) + ycon(a)
 * z' = z
 * 
 * 
 */