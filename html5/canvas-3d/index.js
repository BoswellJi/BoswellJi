const canvas = document.querySelector('#canvas'),
    gl = canvas.getContext('webgl');

function draw(){
  // 跟webgl上下文相关的canvas dom对象
  console.log(gl.canvas);
  
  console.log(gl.drawingBufferWidth);
  console.log(gl.drawingBufferHeight);


  // 着色器是使用GLSL编写的
  // 通过着色器来渲染场景并画出物体

  gl.clearColor(0,0,0,1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

draw();