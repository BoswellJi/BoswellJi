/**
 * 实现圆形的点
 * 1. 为了实现原点，需要将原先的方点削成圆形；（顶点着色器到片元着色器之间发生了光栅化，一个顶点被光栅化了多个片元，每个片元都会经过片元着色器的处理
 * 2. 所以只绘制圆圈以内的片元就可以绘制出圆形的点了
 */

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl'),
  vertexShaderSource = `
    attribute vec4 a_Position;

    void main(){
      gl_Position = a_Position;
      gl_PointSize = 100.0;
    }
  `,

  // gl_FragCoord 片元着色器内置变量，  片元的窗口坐标
  // gl_PointCoord 片元着色器内置变量， 片元在被绘制的点内的坐标（0.0，1.0）
  fragmentShaderSource = `
    precision mediump float;

    void main() {
      // 点内的片元坐标到中心点的距离，超过点的宽度的一半，去掉，内部的上色
      float dist = distance(gl_PointCoord, vec2(0.5,0.5));

      if(dist < 0.5){
        // 范围以内的涂上颜色
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
      } else{
        // 跳过当前语句
        discard;
      }
    }
  `;

if (!initShaders(gl, vertexShaderSource, fragmentShaderSource)) {
  console.log('着色器初始化失败');
}



function initVertexBuffers(gl, vertices, n, attribute) {
  
  const vertexBuffer = gl.createBuffer();
  
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  
  const aPosition = gl.getAttribLocation(gl.program, attribute);
  
  gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
  
  gl.enableVertexAttribArray(aPosition);

  return n;
}

gl.clearColor(0, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);

initVertexBuffers(gl, new Float32Array([
  0.5, 0.5,
  -0.5, -0.5
]), 2, 'a_Position');

gl.drawArrays(gl.POINTS, 0, 2);
