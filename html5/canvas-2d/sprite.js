function main() {

  const { Scene, Sprite, Label, Path, Gradient } = spritejs
  const container = document.getElementById('container');

  // 创建场景容器
  const scene = new Scene({
    container: container,
    width: container.offsetWidth,
    height: container.offsetHeight
  });
  // 创建图层
  const layer = scene.layer();

  // 创建渐变
  const gradient = new Gradient({
    vector: [0, 0, 150, 150],
    colors: [
      { offset: 0, color: 'red' },
      { offset: 1, color: 'blue' }
    ]
  });

  // 创建元素
  const s1 = new Sprite();
  s1.attr({
    // 作为参考点（坐标点
    achor: [1, 1],
    pos: [470, 300],
    size: [300, 300],
    anchor:[0.5,0.5],
    bgcolor: gradient
  });
  layer.append(s1);

  s1.addEventListener('mouseenter', (e) => {
    s1.attr('border', [1, 'blue']);
  });

  s1.addEventListener('mouseleave', (e) => {
    s1.attr('border', [1, '']);
  });

  const anchorCross = new Path('M-10,0H10M0,-10V10');
  anchorCross.attr({
    pos: [470, 500],
    strokeColor: 'red',
    anchor:[0.5,0.5],
    lineWidth: 4,
    // pointerEvents: 'none',
  });
  layer.append(anchorCross);

  const label = new Label('鼠标位置：');
  label.attr({
    pos: [20, 50],
    font: '24px Arial',
    lineHeight: 56
  });
  layer.append(label);

  // 给元素定义事件
  s1.addEventListener('mousemove', (e) => {
    const { x, y } = e;
    label.text = `鼠标的位置，相对于锚点：${s1.getOffsetPosition(x, y)}`;
  });

  s1.animate([
    { rotate: 0 },
    { rotate: 360 }
  ], {
    iterations: Infinity,
    duration: 3000
  });
}

main();