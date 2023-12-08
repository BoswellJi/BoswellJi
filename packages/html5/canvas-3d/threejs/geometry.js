/**
 * 创建物体时的参数：
 * 1. 几何形状 (Geometry)
 * 2. 材质 （Material
 * 
 * 几何形状的创建：
 * 
 * 几何形状最主要的功能是？
 * 存储了一个物体的顶点信息；（webgl信息需要指定每个顶点的位置
 * 
 */
function webglApp() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas')
  });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 400 / 300, 3, 10);
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // 创建长方体
  // 创建几何形状
  // 参数： width height depth
  // const geometry = new THREE.CubeGeometry(1,2,3);

  // 分段 width height depth widthSegments heightSegments depthSegments
  const cubeGeometry = new THREE.CubeGeometry(1, 2, 3, 2, 2, 3);

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
  });
  const cube = new THREE.Mesh(
    cubeGeometry,
    material
  );
  scene.add(cube);

  renderer.render(scene, camera);
}


function webglApp() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas')
  });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 400 / 300, 3, 10);
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // 创建平面
  // 参数： width height  widthSegments, heightSegments
  const planeGeometry = new THREE.PlaneGeometry(2, 3, 2, 2);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
  });
  const plane = new THREE.Mesh(
    planeGeometry,
    material
  );
  scene.add(plane);

  renderer.render(scene, camera);
}

function webglApp() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas')
  });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, 400 / 300, 1, 8);
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // 创建平面
  // 参数： width height  widthSegments, heightSegments
  const sphereGeometry = new THREE.SphereGeometry(3, 8, 6);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
  });
  const plane = new THREE.Mesh(
    sphereGeometry,
    material
  );
  scene.add(plane);

  renderer.render(scene, camera);
}

function webglApp() {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas')
  });
  renderer.setClearColor(0x000000);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(90, 400 / 300, 1, 8);
  camera.position.set(0, 0, 5);
  scene.add(camera);

  // 创建文字
  // 参数： width height  widthSegments, heightSegments
  const textGeometry = new THREE.TextGeometry('Hello', {
    size: 1,
    height: 1,
    font: 'Microsoft Yahei'
  });
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
  });
  const text = new THREE.Mesh(
    textGeometry,
    material
  );
  scene.add(text);

  renderer.render(scene, camera);
}

webglApp();