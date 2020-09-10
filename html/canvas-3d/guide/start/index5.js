const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl');

function draw() {
  // 顶点着色器
  const vertex = `
        // 存储限定符 类型 变量名
        attribute vec4 a_Position;
        attribute float a_PointSize;
        
        void main(){
          gl_Position = a_Position;
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

  // 设置canvas背景
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空canvas背景
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制一个点
  // gl.drawArrays(gl.POINTS, 0, 1);
  const points = [];
  const colors = [];
  canvas.addEventListener('mousedown', function (e) {
    const x = (e.clientX - e.target.getBoundingClientRect().left - canvas.width / 2) / canvas.width / 2;
    const y = (canvas.height / 2 - e.clientY + e.target.getBoundingClientRect().top) / canvas.height / 2;

    points.push([x, y]);

    if (x >= 0 && y >= 0) {
      colors.push([1, 0, 0, 1]);
    } else if (x < 0 && y < 0) {
      colors.push([0, 1, 0, 1]);
    } else {
      colors.push([1, 1, 1, 1]);
    }

    // 不清空，绘制点之后，颜色缓冲区被重置为（0，0，0，0）
    // 这里是用指定的背景色 clearColor(0,0,0,1)
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 设置顶点坐标，大小
    gl.vertexAttrib1f(aPointSize, 5);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      gl.vertexAttrib4fv(aPosition, new Float32Array([point[0], point[1], 0, 1.0]));
      

      const rgba = colors[i];
      // 向uniform变量中写入数据
      gl.uniform4f(uFragColor,rgba[0],rgba[1],rgba[2],rgba[3]);

      // 需要一个一个绘制
      gl.drawArrays(gl.POINTS, 0, 1);
    }

    // 绘制操作是在颜色缓冲区中进行绘制，绘制结束，系统将缓冲区内容显示在屏幕上
    // 接着缓冲区被重置，内容丢失，这是默认操作
    // gl.drawArrays(gl.POINTS, 0, 1);

  });
}

draw();