/**
 * 材质
 * 
 * 分类：
 * 1. 基本
 * 2. Lambert
 * 3. Phong
 * 4. 法向
 * 
 * 材质的纹理贴图
 * 
 * 1. 独立于物体顶点信息之外的，于渲染效果相关的属性；
 * 2. 可以改变物体的颜色，纹理贴图，光照模式等；
 */

function webglApp() {
  // webgl渲染器
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas')
  });
  renderer.setClearColor(0x000000);

  // 场景
  const scene = new THREE.Scene();

  // 透视照相机
  const camera = new THREE.PerspectiveCamera(40, 400 / 300, 4, 10);
  // camera.position.set(1, 0, 5);
  scene.add(camera);

  // 几何形状：
  // 立方体
  // const geometry = new THREE.CubeGeometry(1, 1, 1);
  // 
  // const geometry = new THREE.OctahedronGeometry(3);
  // const geometry = new THREE.SphereGeometry(3, 20, 8);

  // 材质：
  // 基本材质
  // const material = new THREE.MeshBasicMaterial({
  //   color: 0xffffff,
  //   wireframe: false
  // });

  // Lambert材质
  // const material = new THREE.MeshLambertMaterial({
  //   color: 0xff0000
  // });

  // Phong材质
  // const material = new THREE.MeshPhongMaterial({
  //   // color: 0xff0000,
  //   specular: 0xff0000
  // });

  // 法向材质
  // const material = new THREE.MeshNormalMaterial();

  // // 物体
  // const object = new THREE.Mesh(
  //   geometry,
  //   material
  // );
  // scene.add(object);

  const mesh = new THREE.Mesh(
    new THREE.CubeGeometry(1, 2, 3),
    new THREE.MeshLambertMaterial({
      color: 0xffff00
    })
  );
  scene.add(mesh);

  mesh.position.set(1.5,-0.5,0);

  // 渲染到场景中
  renderer.render(scene, camera);
}

webglApp();