function render() {
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
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(2, 2, 5);
  // 照相机也需要被添加到创景中
  scene.add(camera);


  // 创建长方体
  // 几何体 ，长，宽，高
  const geometry = new THREE.CubeGeometry(1, 2, 3);
  // 几何体的组成元素
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  });
  const cube = new THREE.Mesh(geometry, material);
  // 将物体添加到场景中
  scene.add(cube);

  // 使用camera将scene渲染到网页中
  // 离线渲染： 处理好每一帧的图，进行图片帧播放

  // 实时渲染： 不停的执行渲染，实时生成一帧
  renderer1.render(scene, camera);


  /**
   * 1. 场景是一个物体的容器
   * 2. 相机是面对场景的视角
   * 3. 渲染器的作用是将相机拍摄下来的图片，放到浏览器中显示
   */
}

function webglApp() {
  // 创建渲染器
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#main-canvas')
  });
  // 将背景色设置为黑色
  renderer.setClearColor(0x000000);

  // 创建场景
  const scene = new THREE.Scene();

  // 创建相机（透视投影的相机
  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
  camera.position.set(1, 0, 5);
  scene.add(camera);

  // 创建长方体(物体)
  const cube = new THREE.Mesh(
    new THREE.CubeGeometry(1, 2, 3),
    new THREE.MeshBasicMaterial({
      color: 0xff0000
    }));
  scene.add(cube);

  // 渲染到页面中
  renderer.render(scene, camera);
}

/**
 * 
 */
function webglApp() {
  const scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
    renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.CubeGeometry(1, 1, 1),
    material = new THREE.MeshBasicMaterial({
      color: 0x00ff00
    }),
    cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;

  function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
    renderer.render(scene, camera);
  }
  render();
}

function webglApp() {
  var renderer, width, height, stats;
  function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('canvas-frame').appendChild(stats.domElement);
  }

  var camera;
  function initCamera() {
    camera = new THREE.PerspectiveCamera(90, width / height, 1, 10000);
    // camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 600;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
      x: 0,
      y: 0,
      z: 0
    });
  }

  var scene;
  function initScene() {
    scene = new THREE.Scene();
  }

  var light;
  function initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
  }

  function initLight() {
    light = new THREE.AmbientLight(0xFFFFFF);
    light.position.set(100, 100, 200);
    scene.add(light);
    light = new THREE.PointLight(0x00FF00);
    light.position.set(0, 0, 300);
    scene.add(light);
  }

  function initObject() {
    // 创建几何形状
    var geometry = new THREE.Geometry();

    // 创建材质
    var material = new THREE.LineBasicMaterial({
      // 线条的颜色根据顶点来计算
      vertexColors: THREE.VertexColors
    });

    // 创建颜色
    var color1 = new THREE.Color(0x000000),
      color2 = new THREE.Color(0xFF0000);

    // 创建顶点
    var p1 = new THREE.Vector3();
    p1.set(0, 0, 0);
    var p2 = new THREE.Vector3(-100, 0, 0);

    // vertices表示顶点
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);

    // colors表示顶点颜色
    geometry.colors.push(color1, color2);

    // 创建一条线（使用顶点，材质）
    var line = new THREE.Line(geometry, material);

    // 添加到场景中去
    scene.add(line);
  }

  function initObject() {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-500, 0, 0));
    geometry.vertices.push(new THREE.Vector3(500, 0, 0));

    for (let i = 0; i <= 20; i++) {
      const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.2
      }));
      line.position.z = (i * 50) - 500;
      scene.add(line);

      const line1 = new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.2
      }));
      line1.position.x = (i * 50) - 500;
      // 围绕y轴旋转90度
      line1.rotation.y = 90 * Math.PI * 2 / 360;
      scene.add(line1);
    }
  }

  var mesh;
  function initObject() {
    var geometry = new THREE.CylinderGeometry(100, 150, 400);
    var material = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position = new THREE.Vector3(0, 0, 0);
    scene.add(mesh);
  }

  function initTween() {
    // 参数： 要改变属性的对象（dom等）
    new TWEEN.Tween(mesh.position)
      // 目标位置
      .to({ x: 400 }, 500)
      // 动画函数
      .easing(TWEEN.Easing.Back.Out)
      // 重复
      .repeat(Infinity)
      // 开始
      .start();
  }

  function render() {
    renderer.clear();
    renderer.render(scene, camera);
  }

  /**
   * 运动的两种方式:
   * 1. 让照相机运动
   * 2. 让物体运动
   */
  function render() {
    renderer.clear();
    camera.position.x = camera.position.x + 1;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function render() {
    // mesh.position.x -= 1;
    renderer.render(scene, camera);
    // requestAnimationFrame(render);
    TWEEN.update();
    stats.update();
  }

  function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();
    initObject();
    initTween();
    render();
  }

  threeStart();
}

webglApp();