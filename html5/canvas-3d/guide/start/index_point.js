const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

const vs = `
    void main(){
      gl_Position = vec4(0.5,-0.5,0,1);
      gl_PointSize = 10.0;
    }
`;
const  fs = `
    void main(){
      gl_FragColor = vec4(0.0,0.0,1.0,1);
    }
`;

// 初始化着色器程序
initShaders(gl, vs, fs);

gl.clearColor(0, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.PONITS, 0, 1);
