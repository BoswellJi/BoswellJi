## 概述

THREE.js是一个用于3d图形的面向对象javascript库。它是一个Ricardo Cabello创建，以及来自其他程序员的贡献的开源项目。它似乎已经称为了3dweb应用程序的最流行的开源javascript库。Three.js使用你已经熟悉的概念，比如几何对象，变化，灯光，素材，纹理和照相机。但是它还有构建在强大，灵活的webgl之上的额外特性。

你能够下载three.js以及阅读文档，在主要的web站点https://threejs.org。下载是相当大的，因为它包含了许多案例和支持文件。在这本书中，我使用软件来自2017年10月的89版。（这本书的1.1版本使用的是71版。从那个发布之后，有大量的api修改。不幸的是，api还没有像我希望的那个稳定，这本书中的例子在89版下会工作，但是可能不会在其他three.js版本中工作）

three.js的核心特性被定义在一个单个的巨大，被命名为three.js的javascript文件中。能够在下在的build目录下被找到。还有一个更小的最小化版本。three.min.js,包含相同的格式，其格式不是人类可读的。（你还能找到这些文件的拷贝，从three.js的89版，作为这本书的web站下载的一部分，在内部的源文件中的threejs文件）。在一个web页面上使用three.js，你需要在页面上包含两个script元素之一。例如，将设three.min.js和web页面在相同的文件夹。

核心之外，three.js下载包含许多案例以及各种在案例中使用的支持文件，即使我重点在核心上，我也会使用几个额外的，并会注意它们的来源当我做的时候。

## 场景，渲染器，照相机

Three.js使用HTML<canvas>元素来工作，在章节2.6中，我们使用同样的事情用于2d图形。在许多web浏览器中，除了自身的2d图形api，一个画布还支持使用webgl画3d,这与2d api几乎完全不同。webgl在一些支持<canvas>的浏览器中不能使用。例如，在Ie9和e10中是真实的。但是webgl在ie11中被实现，以及chrome，safari，firefox，和edge最近版本，它还在许多手机设备的浏览器中工作。

Three.js是一个面向对象的场景图api。基础的程序是构建一个three.js对象之外的场景图。之后，渲染它要呈现的场景图片。动画可以通过修改帧之间的场景图属性来实现。

three.js库由大量的类组成。最基本的三个是，THREE.Scene,THREE.Camera，THREE.WebRenderer。一个three.js程序，至少需要每种类型的一个对象。这些对象通常存在全局变量中。`var scene, renderer, camera;`

注意，几乎所有我们将使用到的three.js的类和常量是被命名为THREE对象的属性，并且它们的名称开头使用THREE。我有时查阅到没有使用前缀的类，并且它通常在three.js文档中没有被使用，但是，前缀一定要包含在真实的项目代码中。

一个Scene是所有组成一个3D世界对象的持有者。包括灯光，图形对象，可能还有照相机。它表现为场景图的根节点。一个Camera是一个呈现被组成的3d世界的图片的一个视口的特殊类型对象。它代表视图变换和投影的组合。一个WebGLRendere是一个能从一个场景图常见一张图片的对象。

场景是三个对象中最简单的。一个场景能够被是使用一个没有参数的构造函数THREE.Scene类型的对象来创建`scene = new THREE.Scene`.

scene.add(item)函数通常被用来添加照相机，灯光，和图形对象到场景中。它可能是你唯一需要调用的scene函数,scene.remove(item)函数会从场景中移除一个项目，也偶尔有用。

有两种类型的相机，一种是正射投影，一种是透视投影。它们用THREE.Camera的子类，THREE.OrthographicCamera和THREE.PerspectiveCamera类来表示。构造函数使用与opengl熟悉的参数来指定投影。`camera = new THREE.OrthographicCamera( left, right, top, bottom, near, far );camera = new THREE.PerspectiveCamera( fieldOfViewAngle, aspect, near, far );`
正射照相机参数指定可视空间的x,y,z限制，在眼睛坐标系中，就是说，在一个坐标系同种，照相机在（0,0,0）位置看向z轴的负轴方向,和视图种指向上的y轴。从照相机的距离来说，near和far参数指定了z轴的限制。对于一个正射投影，near可以是负的，放置near的裁剪面在照相机的后面。除了指定上和下裁剪面的参数顺序颠倒之外，与openglglOrtho()函数是相同的。

透视投影更为普遍。透视投影参数来自opengl的GLU库中的gluPerspective()函数。第一个参数决定了可视空间的垂直范围，指定角度为测量单位。aspect是水平和垂直之间的比例。通常将画布的高度除以宽度。near和far指定可视空间的z轴的限制，作为与照相机的距离。对于一个投影矩阵，near和far必须是正数。创建一个透视相机的典型代码是：`camera = new THREE.PerspectiveCamera( 45, canvas.width/canvas.height, 1, 100 );`,canvas保存着将被渲染的在图像中的画布的引用。near和far的指意味着，在图像中只包含照相机前面1到100个单位之间的内容。记住，使用不必要的大值赋给far或者不必要的小值赋给near能干扰depth test的准确性。

一个照相机，像其他对象，也能够添加到场景中，它不能成为被使用的场景图的一部分。

## THREE.Object3D

一个three.js场景图由THREE.Object3D类型的对象组成。包括属于那个类子类的对象。照相机，灯光，和可见对象都是由Object3D的子类来表示。事实上，THREE.Scene本身也是Object3D的子类。

## Object,Geometry,Material

## Lights

## 一个制造模型的案例