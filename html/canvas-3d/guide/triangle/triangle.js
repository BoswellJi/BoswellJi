function initVertexBuffer(gl) {
  const vertices = new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, 0.5,

    -0.5, -0.5,
    0.5, 0.5,
    0.5, -0.5
  ]);
  const n = 6; // 2维

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
  gl = canvas.getContext('webgl');

function draw() {
  // 顶点着色器，平移
  var vertex = `
        // 存储限定符 类型 变量名
        attribute vec4 a_Position;
        attribute float a_PointSize;
        
        uniform vec4 u_Translation;
        
        void main(){
          gl_Position = a_Position + u_Translation;
          gl_PointSize = a_PointSize;
        }
      `,
    // 片元着色器
    fragment = `
        // 精度限定词（指定变量的范围，（最大值，最小值）和精度
        precision mediump float;
        // 存储限定符 类型 变量名
        uniform vec4  u_FragColor;
        void main(){
          gl_FragColor = u_FragColor;
        }
      `;


  // 顶点着色器，旋转
  var vertex = `
  // 存储限定符 类型 变量名
  attribute vec4 a_Position;
  uniform float u_CosB,u_SinB;
  
  void main(){
    // 根据公式传入计算好的信息
    gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB;
    gl_Position.y = a_Position.x * u_SinB + a_Position.y * u_CosB;
    gl_Position.z = a_Position.z;
    gl_Position.w = 1.0;
  }
`,
    // 片元着色器
    fragment = `
// 精度限定词（指定变量的范围，（最大值，最小值）和精度
  precision mediump float;
  // 存储限定符 类型 变量名
  uniform vec4  u_FragColor;
  void main(){
    gl_FragColor = u_FragColor;
  }
`;

  // 顶点着色器，矩阵旋转
  var vertex = `
    // 存储限定符 类型 变量名
    attribute vec4 a_Position;
    uniform mat4 u_xformMatrix;

    void main(){
      // 矢量具有三个分量，被称为三维矢量
      // 矩阵 与 矢量 相乘得到 新矢量
      // 只有在矩阵的列数和矢量的行数相等时，才可以将两者相乘

      // 矢量 a_Position 乘以 矩阵 u_xformMatrix，自动进行计算
      gl_Position = a_Position * u_xformMatrix;
    }
  `,
    // 片元着色器
    fragment = `
    // 精度限定词（指定变量的范围，（最大值，最小值）和精度
    precision mediump float;
    // 存储限定符 类型 变量名
    uniform vec4  u_FragColor;
    void main(){
      gl_FragColor = u_FragColor;
    }
  `;

  //   // 顶点着色器，矩阵平移
  //   var vertex = `
  // // 存储限定符 类型 变量名
  // attribute vec4 a_Position;

  // uniform mat4 u_xformMatrix;

  // void main(){
  //   gl_Position = a_Position * u_xformMatrix;
  // }
  // `,
  //     // 片元着色器
  //     fragment = `
  // // 精度限定词（指定变量的范围，（最大值，最小值）和精度
  // precision mediump float;
  // // 存储限定符 类型 变量名
  // uniform vec4  u_FragColor;
  // void main(){
  //   gl_FragColor = u_FragColor;
  // }
  // `;

  if (!initShaderProgram(gl, vertex, fragment)) {
    return;
  }

  // 获取glsl中的变量的存储地址
  // 获取attribute 变量存储位置，返回变量a_Position存储地址
  // 不存在返回-1，存在即大于等于 0
  const aPosition = gl.getAttribLocation(gl.program, 'a_Position');
  const aPointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

  // 不存在返回null
  const uFragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  const uTranslation = gl.getUniformLocation(gl.program, 'u_Translation');

  if (aPosition < 0) {
    return;
  }
  // 将顶点位置传输给attribute 变量
  // 向attribute变量赋值,后面三个参数，对应变量的三个分量
  // 省略第4个参数，默认会被设置为 1.0

  //  vertexAttrib3f() 是一系列同族函数：
  // vertexAttrib1f vertexAttrib2f
  // gl.vertexAttrib3f(aPosition, 0.0, 1.0, 0.0);
  // gl.vertexAttrib1f(aPointSize, 50);

  // vertexAttrib3f的矢量版本
  // gl.vertexAttrib4fv(aPosition, new Float32Array([0, 0, 0.0, 1.0]));
  // gl.uniform4f(uTranslation, 0.5, 0.5, 0, 0);

  // 设置canvas背景
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空canvas背景
  gl.clear(gl.COLOR_BUFFER_BIT);


  const n = initVertexBuffer(gl);

  const radian = Math.PI * 2 / 360 * 90;
  // 计算角度的余弦值，正弦值
  const cosB = Math.cos(radian);
  const sinB = Math.sin(radian);

  // 获取glsl中定义的正弦，余弦的变量
  const uCosB = gl.getUniformLocation(gl.program, 'u_CosB');
  const uSinB = gl.getUniformLocation(gl.program, 'u_SinB');

  // 将余弦，正弦值传入glsl中
  // gl.uniform1f(uCosB, cosB);
  // gl.uniform1f(uSinB, sinB);

  // 旋转矩阵
  // const xformMatrix = new Float32Array([
  //   cosB, -sinB, 0, 0,
  //   sinB, cosB, 0, 0,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1
  // ]);

  // 平移矩阵
  // const xformMatrix = new Float32Array([
  //   1,0,0,0.5,
  //   0,1,0,0.5,
  //   0,0,0,0,
  //   0,0,0,1
  // ]);

  // 平移矩阵2
  // const xformMatrix = new Float32Array([
  //   1, 0, 0, 0,
  //   0, 1, 0, 0,
  //   0, 0, 1, 0,
  //   0.5, 0.5, 0, 1
  // ]);

  // 平移加旋转 矩阵
  // const xformMatrix = new Float32Array([
  //   cosB, -sinB, 0, 0.5,
  //   sinB, cosB, 0, 0.5,
  //   0, 0, 1, 0,
  //   0, 0, 0, 1
  // ]);

  // 缩放变换矩阵
  const xformMatrix = new Float32Array([
    1.5, 0, 0, 0,
    0, 0.5, 0, 0,
    0, 0, 0.5, 0,
    0, 0, 0, 1
  ]);

  const uXformMatrix = gl.getUniformLocation(gl.program, 'u_xformMatrix');
  gl.uniformMatrix4fv(uXformMatrix, false, xformMatrix);

  // 给点设置大小
  gl.vertexAttrib1f(aPointSize, 5);

  // 点
  //  参数一： 绘制图形的类型
  //  参数二： 坐标的偏移量（从哪个点开始
  //  参数三： 顶点数量 （绘制几个
  // gl.drawArrays(gl.POINTS, 0, 1);

  // 线段 ,两两一条
  gl.drawArrays(gl.LINES,0,n);

  // 线条
  // gl.drawArrays(gl.LINE_STARIP,0,n);

  // 回路
  // gl.drawArrays(gl.LINE_LOOP,0,n);

  // 三角形
  // gl.drawArrays(gl.TRIANGLES,0,n);

  // 三角带
  // gl.drawArrays(gl.TRIANGLE_STRIP,0,n);

  // 三角扇
  // gl.drawArrays(gl.TRIANGLE_FAN,0,n);
}

draw();