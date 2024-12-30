const { Scene, Sprite, Label, Path, Gradient, Arc, Ring } = spritejs

// 创建场景容器
const scene = new Scene({
  container: container,
  // autoResize: true,
  mode: 'stickyTop',
  width: window.innerWidth,
  height: window.innerHeight
});
// 创建图层
const layer = scene.layer();

async function main() {
  // 计算随机的圆心坐标
  const x = 100 + Math.random() * 1000,
    y = 100 + Math.random() * 400,
    // 计算随机的颜色
    r = Math.round(255 * Math.random()),
    g = Math.round(255 * Math.random()),
    b = Math.round(255 * Math.random());

  // 创建canvas元素
  const bubble = new Arc();
  // 设置元素的属性
  bubble.attr({
    fillColor: `rgb(${r},${g},${b})`,
    radius: 25,
    x,
    y
  });
  // 将元素添加到canvas中
  layer.append(bubble);
  // 给元素添加过度动画
  await bubble.transition(2.0, '').attr({
    scale: [2, 2],
    opacity: 0
  });
  bubble.remove();
}

function main() {
  // 创建渐变
  // const gradient = new Gradient({
  //   vector: [0, 0, 150, 150],
  //   colors: [
  //     { offset: 0, color: 'red' },
  //     { offset: 1, color: 'blue' }
  //   ]
  // });

  // // 创建精灵元素
  // const s1 = new Sprite();
  // s1.attr({
  //   // 作为参考点（坐标点
  //   achor: [1, 1],
  //   pos: [470, 300],
  //   size: [300, 300],
  //   anchor: [0.5, 0.5],
  //   bgcolor: gradient
  // });
  // // 将元素添加到canvas中
  // layer.append(s1);

  // // 给canvas元素添加事件
  // s1.addEventListener('mouseenter', (e) => {
  //   // 改变样式
  //   s1.attr('border', [10, 'blue']);
  // });

  // s1.addEventListener('mouseleave', (e) => {
  //   s1.attr('border', [10, '']);
  // });

  // // 路径元素
  // const anchorCross = new Path('M-10,0H10M0,-10V10');
  // anchorCross.attr({
  //   pos: [470, 200],
  //   strokeColor: 'red',
  //   // anchor: [0.5, 0.5],
  //   lineWidth: 4
  // });
  // layer.append(anchorCross);

  // // 标签元素
  // const label = new Label('鼠标位置：');
  // label.attr({
  //   pos: [20, 50],
  //   font: '24px Arial',
  //   lineHeight: 56
  // });
  // layer.append(label);

  // // 给元素定义事件
  // s1.addEventListener('mousemove', (e) => {
  //   const { x, y } = e;
  //   label.text = `鼠标的位置，相对于锚点：${s1.getOffsetPosition(x, y)}`;
  // });

  // s1.animate([
  //   { rotate: 0 },
  //   { rotate: 360 }
  // ], {
  //   iterations: Infinity,
  //   duration: 3000
  // });

  // const ring = new Ring();
  // ring.attr({
  //   pos: [100, 100],
  //   innerRadius: 50,
  //   outerRadius: 100,
  //   fillColor: 'red'
  // });

  // layer.append(ring);

  // ring.addEventListener('click',function(e){
  //   console.log('click',e);
  // });

  // ring.addEventListener('dblclick',function(e){
  //   console.log('dblclick',e);
  // });

  // ring.addEventListener('longpress',function(e){
  //   console.log('longpress',e);
  // });

  // ring.addEventListener('mousedown',function(e){
  //   console.log('mousedown',e);
  // });

  // ring.addEventListener('mouseup',function(e){
  //   console.log('mouseup',e);
  // });

  // ring.addEventListener('mousemove',function(e){
  //   console.log('mousemove',e);
  // });

  // ring.addEventListener('mousewheel',function(e){
  //   console.log('mousewheel',e);
  // });

  // ring.addEventListener('wheel',function(e){
  //   console.log('wheel',e);
  // });

  // ring.addEventListener('tap',function(e){
  //   console.log('tap',e);
  // });

  // ring.addEventListener('touchstart', function (e) {
  //   console.log('touchstart', e);
  // });

  // ring.addEventListener('touchmove', function (e) {
  //   console.log('touchmove', e);
  // });

  // ring.addEventListener('touchend', function (e) {
  //   console.log('touchend', e);
  // });

  // ring.addEventListener('touchcancel', function (e) {
  //   console.log('touchcancel', e);
  // });

  const sprite1 = new Sprite();
  sprite1.attr({
    pos: [200, 200],
    size: [10, 10],
    bgcolor: 'blue',
    opacity: 0.4
  });
  layer.append(sprite1);


  // sprite label group 元素都是 spritejs中的块级元素，其实就是方形元素，具有盒子模型的元素
  // 创建元素（文本元素
  const label = new Label('jmz');
  // 设置元素样式
  label.attr({
    pos: [200, 200],
    anchor: [0.5, 0],
    fillColor: 'red',
    font: 'bold 56px Arial',
    // lineHeight: 112,
    border: [5, 'red'],
    // rotate: 20,
    textAlign: 'center',
    verticalAlign: 'middle'
  });
  // 将元素添加到canvas中
  layer.append(label);

  // 元素的事件
  label.addEventListener('click', function (e) {
    // 这些是元素设置的效果
    // 直接修改样式，过渡效果，动画效果，滤镜效果，渐变效果

    // 属性修改
    label.attr({
      fillColor: 'blue',
      pos: [100, 100],
      filter: 'blur(12px)',
      borderColor: new Gradient({
        vector: [0, 0, 170, 170],
        colors: [
          { offset: 0, color: 'red' },
          { offset: 0.5, color: 'yellow' },
          { offset: 1, color: 'green' },
        ],
      }),
    });

    // 过度效果
    // label.transition(1).attr({
    //   fillColor: 'blue',
    //   pos: [100, 100]
    // });

    // 动画效果
    label.animate([
      { pos: [100, 100] },
      { pos: [300, 300] }
    ], {
      duration: 1000,
      iterations: Infinity,
    });
  });
}

function main() {
  // 这里是svg路径元素
  // 没有anchor，border,padding,boxSizing属性
  const p1 = new Path();
  p1.attr({
    // 使用的是svg的路径设置方式, m: moveTo l: lineTo z: closePath
    d: 'M0,0 L100,100',
    fillColor: 'red',
    // 定位路径，根据坐标原点进行定位
    pos: [100, 0],
    strokeColor: 'blue',
    lineWidth: 10,
    normalize: true
  });
  layer.append(p1);

  // 矩形路径
  const { Rect } = spritejs
  const rect = new Rect();
  rect.attr({
    // 设置路径的中心点为路径的最中心
    normalize: true,
    pos: [100, 100],
    size: [200, 200],
    strokeColor: 'red'
  });
  layer.append(rect);

  const rect1 = new Rect();
  rect1.attr({
    normalize: false,
    pos: [100, 100],
    size: [200, 200],
    fillColor: 'blue'
  });
  layer.append(rect1);

  // 三角行路径
  const { Triangle } = spritejs;
  const triangle = new Triangle();
  triangle.attr({
    pos: [200, 300],
    sides: [100, 300],
    angle: 90,
    strokeColor: 'red',
    // normalize:true
  });
  layer.append(triangle);

  // 平行四边形
  const { Parallel } = spritejs;
  const parallel = new Parallel({
    normalize: true,
    pos: [750, 300],
    sides: [200, 200],
    angle: 60,
    rotate: 60,
    fillColor: '#c7c',
  });
  layer.append(parallel);

  // 折线
  const { Polyline } = spritejs;
  const line = new Polyline({
    pos: [250, 50],
    points: [0, 0, 100, 100, 200, 0, 300, 100, 400, 0, 500, 100, 600, 0],
    strokeColor: 'blue',
    lineWidth: 3,
  });
  layer.append(line);

  // 元素克隆
  const line2 = line.cloneNode();
  line2.attr({
    smooth: true,
    strokeColor: 'red',
  });
  // 增加元素
  layer.append(line2);
  // 删除元素
  line2.remove();
  // 增，删，改，查
  console.log(line.parentNode);

  // 正多边行 和 星型
  const { Regular, Star } = spritejs;
  const shape = new Regular({
    pos: [300, 300],
    edges: 7,
    radius: 100,
    fillColor: 'blue',
  });
  layer.append(shape);

  const star = new Star({
    pos: [700, 300],
    angles: 5,
    innerRadius: 50,
    outerRadius: 100,
    fillColor: 'red',
  });
  layer.append(star);
}

main();

