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

const canvas = document.querySelector('#canvas'),
  gl = canvas.getContext('webgl'),
  vertexShaderSource = `
    attribute vec4 a_Position;
    
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_Eye;

    varying vec4 v_Color;
    varying float v_Dist;

    void main(){
      gl_Position = a_Position;
      gl_PointSize = 100.0;
      v_Dist = distance(u_ModelMatrix * a_Position, u_Eye);
    }
  `,
  fragmentShaderSource = `
    precision mediump float;
    uniform vec3 u_FogColor;
    uniform vec2 u_FogDist;

    varying float v_Dist;
    varying vec4 v_Color;

    void main() {
      float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y),u_FogDist,0.0,1.0 );
      vec3 color = mix(u_FogColor,vec3(v_Color),fogFactor);
      gl_FragColor = vec4(color,v_Color.a);
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

const fogColor = new Float32Array([
  0.137,
  0.231,
  0.423
]),
fogDist = new Float32Array([
  55,
  80
]),
eye = new Float32Array([
  25,65,35
]);

gl.uniform3fv();

gl.drawArrays(gl.POINTS, 0, 2);
