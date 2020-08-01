/**
 * 照相机
 * 1. 如何将三维的场景显示到二维的屏幕上呢？
 * 照相机就是这样一个抽象，他定义了三维空间到二维屏幕的投影方式；（投影方式）
 * 
 * 2. 根据投影方式的不同，照相机分为？
 * 正交投影和透视投影照相机
 * 
 * 3. 透视投影照相机？
 * 透视投影照相机获得的结果是类似人眼中的真实世界中看到的‘近大远小’的效果；
 * 
 * 4. 正交投影照相机？
 * 获取的结果像是我们在数学几何课上老师教我们画的效果，对于三维空间内平行的线，投
 * 影到二维空间也是平行的；
 * 
 * 5. 什么时候使用哪种类型的照相机？
 * 1. 不会因为投影而改变物体比例的正交投影照相机；
 * 2. 想要接近人眼的观察效果的使用透视投影照相机；
 */

function webglApp() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas')
  });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();

  // 正交投影照相机
  // // 参数： left, right, top, bottom, near, far
  // (right - left)与(top - bottom)的比例与Canvas宽度与高度的比例一致。
  // const camera = new THREE.OrthographicCamera(-1, 3, 1.5, -1.5, 1, 10);
  // // const camera = new THREE.OrthographicCamera(-1, 1, 1.5, -1.5, 1, 10);
  // // camera.position.set(0, 0, 5);
  // camera.position.set(4, -3, 5);
  // camera.lookAt(new THREE.Vector3(0, 0, 0));
  // scene.add(camera);

  // // 创建网格 参数：物体的（几何坐标）， 物体的（材质
  // const cube = new THREE.Mesh(
  //   new THREE.CubeGeometry(1, 1, 1),
  //   new THREE.MeshBasicMaterial({
  //     color: 0xffffff,
  //     wireframe: true
  //   })
  // );

  // 透视投影照相机
  // 参数： fov, aspect, near, far
  /**
    fov是视景体竖直方向上的张角（是角度制而非弧度制），如侧视图所示。
    aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。
    near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。
   */
  const camera = new THREE.PerspectiveCamera(20, 1400 / 300, 3, 120);
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // 创建物体
  const cube = new THREE.Mesh(
    new THREE.CubeGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    })
  );
  scene.add(cube);

  renderer.render(scene, camera);
}

webglApp();