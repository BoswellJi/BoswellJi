const canvas = document.querySelector('#canvas');
const gl = canvas.getContext('webgl');

// 处理的是三维图形，所以需要指定三维坐标

// webgl的绘图需要使用着色器的绘图机制

// 着色器提供了灵活且强大的二维或者三维图形的新方法

// 所有的webgl程序必须使用它，是webgl的一项重要的核心机制

// 使用webgl进行绘图，必须使用 着色器程序


// 描述顶点特性（位置，颜色
// 顶点：二维或者三维中的一个点，比如二维或者三维图形的端点和交点
// 片元着色器：进行逐片元处理过程，如光照

// 引申：在三维场景中，仅仅用线条和颜色把图形画出来是远远不够的
// 还需要考虑的是： 光线照上去之后， 或者观察者的视角发生变化，对场景会有什么影响

// 着色器就是为了高度灵活的完成这些工作，提供各种渲染效果的；
// 这也是当今计算机制作出三维场景如此逼真和令人震撼的原因

// webgl程序的执行流程：
// 执行javascript，到在webgl系统中使用着色器在浏览器上绘制图形

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

// webgl系统由两部分组成： 顶点着色器和片元着色器
// 在初始化着色器之前，顶点，片元着色器都是空白的
// webgl程序包括：运行在浏览器中的javascript 和 运行在webgl系统中的着色器程序

// 初始化着色器程序
initShaders(gl, vs, fs);

gl.clearColor(0, 0, 0, 1);

gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.PONITS, 0, 1);

/**
 * 坐标只有三个浮点数（x,y,z）
 * gl_Position变量是 vec4 类型，需要将坐标点转换位vec4类型的变量，
 * 可以使用内置的vec4方法来创建
 * vec4(x,y,z,v4): v4默认位1.0
 * 当vec4()函数当中，v4的值为1.0，那么前三个分量为坐标值的那个点
 *
 * （x,y,z,w）相当于： (x/w,y/w,z/w)，所以当w是1的时候，表示的就是坐标点
 *
 * 三维图形系统在计算过程中，通常使用齐次坐标系来表示顶点的三维坐标
 *
 */
