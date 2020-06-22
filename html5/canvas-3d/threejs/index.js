// 指定dom元素创建
// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector('#webgl-canvas')
// });

// 脚本创建canvas元素

// 创建渲染器 Renderer
const renderer1 = new THREE.WebGLRenderer();
renderer1.setSize(400, 300);
// canvas 添加到dom中
document.body.appendChild(renderer1.domElement);

renderer1.setClearColor(0xfffff);

// 创建场景 Scene
const scene = new THREE.Scene();

// 创建照相机 Camera
// 相机决定了场景中哪个角度的景色会显示出来，不同的视角
// 透视相机
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(2, 2, 5);
// 照相机也需要被添加到创景中
scene.add(camera);


// 创建长方体
// 几何体 ，长，宽，高
const geometry = new THREE.CubeGeometry(1,2,3);
// 几何体的组成元素
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
});
const cube = new THREE.Mesh(geometry,material);
// 将物体添加到场景中
scene.add(cube);

// 使用camera将scene渲染到网页中
// 离线渲染： 处理好每一帧的图，进行图片帧播放

// 实时渲染： 不停的执行渲染，实时生成一帧
renderer1.render(scene,camera);


/**
 * 1. 场景是一个物体的容器
 * 2. 相机是面对场景的视角
 * 3. 渲染器的作用是将相机拍摄下来的图片，放到浏览器中显示
 */