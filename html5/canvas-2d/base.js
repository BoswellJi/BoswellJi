function drawRoundRect({
  color,
  x,
  y,
  w,
  h,
  radius,
  ctx
}) {
  ctx.save();
  color && (ctx.fillStyle = color);
  ctx.translate(x, y);
  drawRoundRectPath({
    ctx, w, h, radius
  });
  ctx.fill();
  ctx.restore();
}

function drawRect({
  color,
  x,
  y,
  w,
  h,
  ctx,
  isFill = false
}) {
  ctx.beginPath();
  if (isFill === true) {
    ctx.fillStyle = color;
    ctx.rect(x, y, w, h);
    ctx.fill();
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, w, h);
  }
  ctx.closePath();
}

function putImageData({
  ctx,
  fromX,
  fromY,
  fromW,
  fromH,
  toX,
  toY,
  toW,
  toH
}) {
  var imageData = ctx.getImageData(fromX, fromY, fromW, fromH);
  ctx.putImageData(imageData, toX, toY, toW, toH);
}

function drawImage({
  url,
  x,
  y,
  w,
  h,
  ctx,
  circle,
  cx,
  cy,
  cr,
  rect,
  rectH,
  circularBead,
  circularBeadH,
  imgType = 1
}) {
  let tempUrl = typeof url === 'object' ? '' : '';
  if (imgType === 1) {
    const {
      path
    } = getImage({
      src: url
    });
    tempUrl = path;
  }
  if (circle === true) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, 2 * Math.PI);
    ctx.clip();
  }
  if (rect === true) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, rectH);
    ctx.clip();
  }
  if (circularBead === true) {
    ctx.save();
    ctx.beginPath();
    drawRoundRect({
      x,
      y,
      w: w,
      h: circularBeadH,
      radius: 10,
      ctx
    });
    ctx.clip();
  }

  ctx.drawImage(tempUrl, x, y, w, h);
  ctx.restore();
}

function strokeRoundRect({
  ctx,
  x,
  y,
  w,
  h,
  radius,
  lineW,
  color
}) {
  if (2 * radius > w || 2 * radius > h) { return false; }

  ctx.save();
  ctx.translate(x, y);
  drawRoundRectPath({
    ctx, w, h, radius
  });
  ctx.lineWidth = lineW || 1;
  color && (ctx.strokeStyle = color);
  ctx.stroke();
  ctx.restore();
}

function drawRoundRectPath({
  ctx,
  w,
  h,
  radius
}) {
  ctx.beginPath();
  ctx.arc(w - radius, h - radius, radius, 0, Math.PI / 2);
  ctx.lineTo(radius, h);
  ctx.arc(radius, h - radius, radius, Math.PI / 2, Math.PI);
  ctx.lineTo(0, radius);
  ctx.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);
  ctx.lineTo(w - radius, 0);
  ctx.arc(w - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);
  ctx.lineTo(w, h - radius);
  ctx.closePath();
}

function main() {
  var canvas = document.querySelector('#canvas'),
    viewport = document.documentElement;

  ctx = canvas.getContext('2d');
  canvas.style.cssText = 'background:black;';
  canvas.width = viewport.clientWidth;
  canvas.height = viewport.clientHeight;

  ctx.save();
  strokeRoundRect({
    ctx,
    x: 10,
    y: 10,
    w: 30,
    h: 30,
    radius: 10,
  });
  ctx.clip();
  drawRoundRect({
    color: 'red',
    x: 10,
    y: 10,
    w: 50,
    h: 50,
    radius: 10,
    ctx
  });
  ctx.restore();

  drawRect({
    color: 'yellow',
    w: 10,
    h: 10,
    x: 60,
    y: 10,
    ctx,
    isFill: true
  });
}

// sprite.js
// 封装底层 canvas 绘图api,提供声明式绘图编程
// 每个元素都是类dom结构的

function circle() {
  const { Scene, Sprite } = spritejs,
    // 类似于 html
    container = document.getElementById('container'),
    paper = new Scene({
      container,
      width: 400,
      height: 400,
      stickyMode: 'stickyBottom'
    }),
    // 类似于 body
    layer = paper.layer(),
    // 类似于div
    sprite = new Sprite();

  sprite.attr({
    bgcolor: '#000',
    pos: [0, 0],
    size: [400, 400],
    borderRadius: '200'
  });

  layer.append(sprite);

  layer.addEventListener('mousemove', (e) => {
    console.log(e);
  });
}

function rect() {
  const { Scene, Path } = spritejs;
  const container = document.getElementById('container');
  const scene = new Scene({
    container,
    width: 1600,
    height: 1600
  });
  const layer = scene.layer();

  // 展示在画布上的元素
  const path = new Path('M 297.29747,550.86823 C 283.52243,535.43191 249.1268,505.33855 220.86277,483.99412 C 137.11867,420.75228 125.72108,411.5999 91.719238,380.29088 C 29.03471,322.57071 2.413622,264.58086 2.5048478,185.95124 C 2.5493594,147.56739 5.1656152,132.77929 15.914734,110.15398 C 34.151433,71.768267 61.014996,43.244667 95.360052,25.799457 C 119.68545,13.443675 131.6827,7.9542046 172.30448,7.7296236 C 214.79777,7.4947896 223.74311,12.449347 248.73919,26.181459 C 279.1637,42.895777 310.47909,78.617167 316.95242,103.99205 L 320.95052,119.66445 L 330.81015,98.079942 C 386.52632,-23.892986 564.40851,-22.06811 626.31244,101.11153 C 645.95011,140.18758 648.10608,223.6247 630.69256,270.6244 C 607.97729,331.93377 565.31255,378.67493 466.68622,450.30098 C 402.0054,497.27462 328.80148,568.34684 323.70555,578.32901 C 317.79007,589.91654 323.42339,580.14491 297.29747,550.86823 z');
  const rect = path.originalContentRect;

  path.attr({
    anchor: [0.5, 0.5],
    pos: [800 - rect[2] / 2, 800 - rect[3] / 3],
    fillColor: 'red'
  });

  // layer.append(path);
}

/**
 * 填充矩形
 */
function draw() {
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, 100, 100);
}

/**
 * 描边矩形
 */
function draw() {
  ctx.strokeStyle = 'green';
  ctx.strokeRect(0, 0, 100, 100);
}

/**
 * 清空画布指定区域
 */
function clear() {
  ctx.clearRect(0, 0, 100, 100);
}

// 路径
/**
 * 三角形
 */
function draw() {
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

function draw() {
  ctx.beginPath();
  ctx.strokeStyle = 'red'
  ctx.rect(0, 0, 50, 50);
  ctx.closePath();
  ctx.stroke();
}

/**
 * state stack => [{default},{ ctx.fillStyle = '#09f'; }]
 */
function draw() {
  ctx.fillRect(0, 0, 100, 100);
  ctx.save();
  ctx.fillStyle = '#09f';
  ctx.fillRect(10, 10, 80, 80);
  ctx.save();
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.5;
  ctx.fillRect(20, 20, 60, 60);
  ctx.restore();
  ctx.fillRect(30, 30, 40, 40);   // 使用上一次的配置绘制一个矩形
  ctx.restore();               // 加载默认颜色配置
  ctx.translate(100, 10);
  ctx.fillRect(40, 40, 20, 20);
}

function draw() {
  ctx.translate(75, 75);

  for (let i = 0; i < 6; i++) {
    ctx.save();
    ctx.fillStyle = 'rgb(1,2,3)';
    ctx.rotate(Math.PI * 2 / 6);
    ctx.beginPath();
    ctx.arc(0, 12.5, 5, 0, Math.PI * 2, true);
    ctx.fill();
  }

  ctx.restore();
}

function draw() {
  ctx.drawImage(document.getElementById('frame'),
    0, 0, 104, 124, 0, 0, 100, 100);
}

function draw() {
  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  ctx.moveTo(10, 10);
  ctx.lineTo(20, 20);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.moveTo(20, 20);
  ctx.lineTo(30, 30);
  ctx.stroke();
}

function draw() {
  ctx.font = '48px serif';
  ctx.save();
  ctx.textBaseline = 'top';
  ctx.fillText('top', 30, 100);

  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'red';
  ctx.fillText('middle', 100, 100);

  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'green';
  ctx.fillText('hanging', 220, 100);

  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = 'yellow';
  ctx.fillText('alphabetic', 350, 100);

  ctx.textBaseline = 'ideographic';
  ctx.fillStyle = 'blue';
  ctx.fillText('ideographic', 450, 100);

  ctx.textBaseline = 'bottom';
  ctx.fillStyle = 'red';
  ctx.fillText('bottom', 630, 100);

  ctx.restore();
  ctx.fillStyle = 'pink';
  ctx.fillText('default', 750, 100);
}

function draw() {
  ctx.font = '40px serif';

  ctx.strokeStyle = 'red';
  ctx.strokeText('季明壮', 100, 100);
}

function draw() {
  const name = '爱因斯坦';
  ctx.font = '40px serif';
  ctx.strokeText(name, 100, 100);
  const info = ctx.measureText(name);
  text.innerText = info.width;
}

function draw() {
  ctx.drawImage(undefined, 0, 0, 10, 10);
}

function draw() {
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(100 * Math.random(), 70 * Math.random());
  ctx.lineTo(80 * Math.random(), 80 * Math.random());
  ctx.lineTo(70 * Math.random(), 70 * Math.random());
  ctx.closePath();
  ctx.stroke();
}

function draw() {
  ctx.lineWidth = 10;
  ctx.lineCap = 'butt';
  ctx.beginPath()
  ctx.moveTo(20, 20);
  ctx.lineTo(20, 100);
  ctx.stroke();

  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(50, 20);
  ctx.lineTo(50, 100);
  ctx.stroke();
}

function draw() {
  ctx.lineWidth = 10;
  ctx.lineJoin = 'bevel';
  ctx.setLineDash([5, 5]);
  ctx.strokeRect(20, 20, 100, 100);
}

function draw() {
  const gradient = ctx.createLinearGradient(0, 0, 300, 0);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(1, 'yellow');
  ctx.lineWidth = 10;
  ctx.strokeStyle = gradient;
  ctx.strokeRect(10, 10, 200, 200);
}

function draw() {
  const gradient = ctx.createRadialGradient(0, 10, 10, 50, 50, 20);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(1, 'yellow');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 100, 100);
}

function draw() {
  ctx.fillRect(100, 100, 10, 10);
  ctx.scale(3, 3);
  ctx.translate(-70, -70);
  ctx.fillRect(100, 100, 10, 10);
}

function draw() {
  ctx.scale(1, -1);
  ctx.fillStyle = 'red';
  ctx.font = '32px STHeiti, SimHei';
  ctx.textBaseline = 'bottom';
  ctx.fillText('季明壮', 100, -100);
}

function draw() {
  ctx.beginPath();
  ctx.save();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 10;
  ctx.moveTo(100, 100);
  ctx.lineTo(100, 101);
  ctx.stroke();
  ctx.restore();
  ctx.closePath();

  ctx.beginPath();
  // 参数 椭圆x轴， 椭圆y轴， 长轴半径， 短轴半径， 旋转角度，
  // 开始角度， 结束角度 ， 顺/逆时针
  ctx.ellipse(100, 100, 80, 80, Math.PI * 1, 0, 0.5 * Math.PI, true);
  ctx.stroke();
}

function draw() {

  // 重置变形
  // ctx.setTransform(1, 0, 0, 1, 0, 0);

  // 旋转坐标系
  ctx.save();
  ctx.rotate(Math.PI * 2 / 30);
  ctx.strokeRect(200, 200, 100, 100);
  ctx.restore();

  // 位移坐标系
  ctx.save();
  ctx.translate(20, 20);
  ctx.strokeStyle = 'red';
  ctx.strokeRect(0, 0, 30, 30);
  ctx.restore();

  // 缩放坐标系
  ctx.save();
  ctx.strokeStyle = 'red';
  ctx.scale(3, 3);
  ctx.arc(70, 70, 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 水平缩放 垂直倾斜(宽度的倍数) 水平倾斜（高度的倍数）    垂直缩放 水平移动（像素单位） 垂直移动（像素单位）
  ctx.save();
  ctx.transform(1, 0, 0.5, 1, 0, 100);
  ctx.strokeRect(300, 300, 100, 100);
  ctx.restore();
}

function draw() {
  ctx.fillStyle = 'red';
  ctx.fillRect(10, 10, 120, 120);

  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = 'black';
  ctx.fillRect(20, 20, 100, 100);
  ctx.restore();
}

// 圆环进度条
let i = 1;
function draw() {
  ctx.save();
  ctx.translate(300, 300);
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(0, 0, 120, 0, i * Math.PI * 2 / 50); // Math.PI * 2
  ctx.lineTo(0, 0);
  ctx.fill();
  ctx.restore();
  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, Math.PI * 2); i *
    ctx.fill();
  ctx.restore();

  setTimeout(function () {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    i++
    if (i > 51) {
      i = 0;
    }
    draw();
  }, 60);

  ctx.beginPath();
  // 画的是弧线
  ctx.arc(100, 100, 30, 0, Math.PI / 3);
  // 需要根据一个点来填充形成扇形
  ctx.lineTo(100, 100);
  ctx.closePath();
  ctx.fill();
}

// 围绕圆心转圈
let deg = 0;
function draw() {
  ctx.save();
  ctx.translate(200, 200);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(300, 0);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 300);
  ctx.closePath();
  ctx.stroke();

  ctx.rotate(Math.PI * 2 / 120 * deg);

  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(100, 100, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  setTimeout(function () {
    deg++;
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    draw();
  }, 60);
}

/**
 * 1. Math.sin(弧度) 正弦值
 * 2. Math.cos(弧度) 余弦值
 * 
 * 3. Math.PI*2/360 * 度数 = 度数的弧长
 * 
 * 圆心（x,y）
 * x = a + Math.sin(Math.PI * 2/360 * 度数) * r;
 * y = b + Math.cos(Math.PI * 2/360 * 度数) * r;
 */

// 绘制扇形
let deg1 = 0;
function draw() {
  ctx.save();
  ctx.translate(200, 200);
  ctx.rotate(Math.PI * 2 / 360 * deg1);

  ctx.beginPath();
  ctx.arc(0, 0, 100, 0, Math.PI * 2);
  ctx.closePath();
  ctx.stroke();

  for (let i = 0; i < 360; i += 10) {
    const x = Math.sin(Math.PI * 2 / 360 * i) * 100;
    const y = Math.cos(Math.PI * 2 / 360 * i) * 100;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.closePath();
  }
  ctx.restore();

  setTimeout(function () {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    deg1++;
    draw();
  }, 60);
}

/**
 * 三角函数
 * 1. sin
 * 2. cos
 * 3. tan
 * 4. atan
 */
function draw() {
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.lineTo(100, 500);
  ctx.lineTo(200, 500);
  ctx.closePath();
  ctx.stroke();

  const xb = Math.sqrt(100 * 100 + 400 * 400);
  ctx.fillStyle = 'red';
  ctx.fillText('x:400', 80, 300);
  ctx.fillText('y:100', 150, 510);
  ctx.fillText(`z:${xb} (Math.sqrt(x * x + y * y))`, 160, 300);

  ctx.fillText(`sin = y/z`, 160, 520);
  ctx.fillText(`cos = x/z`, 160, 540);
  ctx.fillText(`tan = y/x`, 160, 560);
  ctx.fillText(`最顶点的角`, 160, 580);
}

function draw() {
  ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  ctx.save();
  ctx.translate(75, 75);
  ctx.scale(0.4, 0.4);
  ctx.rotate(-Math.PI * 2);
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#fff';
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';

  ctx.save();
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0);
    ctx.lineTo(120, 0);
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.lineWidth = 5;
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore();

  let now = new Date(),
    sec = now.getSeconds(),
    min = now.getMinutes(),
    hr = now.getHours();

  ctx.save();
  ctx.rotate(hr * Math.PI / 6 + Math.PI / 360 * min + Math.PI / 21600 * sec);
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec)
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.rotate(sec * Math.PI / 30);
  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#325FA2';
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore();

  window.requestAnimationFrame(draw);
}

function draw() {
  ctx.fillStyle = 'rgba(255,255,0,0.9)';
  ctx.fillRect(100, 100, 100, 100);

  // 获取canvas中的像素 Uint8ClampedArray
  const px = ctx.getImageData(100, 100, 2, 2);
  console.log(px.data);

  ctx.putImageData(px, 10, 10);
}

function draw() {
  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.moveTo(20, 30);
  ctx.lineTo(70, 30);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'green';
  ctx.moveTo(70, 30);
  ctx.arcTo(70 + 50, 30, 70 + 50, 80, 50);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  ctx.moveTo(120, 80);
  ctx.lineTo(120, 130);
  ctx.stroke();
  ctx.closePath();

  ctx.save();
  ctx.strokeStyle = 'black';
  ctx.setLineDash([2]);
  ctx.moveTo(70, 30);
  ctx.lineTo(120, 30);
  ctx.lineTo(120, 80);
  ctx.stroke();
  ctx.restore();

  ctx.strokeText('点3', 70, 20);
  ctx.strokeText('点1', 130, 30);
  ctx.strokeText('点2', 130, 80);

  ctx.strokeText('所以，根据半径，确定点1和点2位置', 230, 80);
}

/**
 * 绘制二次贝塞尔曲线
 */
function draw() {
  ctx.beginPath();
  ctx.moveTo(100, 100);
  ctx.quadraticCurveTo(20, 50, 200, 200);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.setLineDash([5]);
  ctx.moveTo(100, 100);
  ctx.lineTo(20, 50);
  ctx.lineTo(200, 200);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'blue';
  ctx.rect(100, 100, 10, 10);
  ctx.rect(20, 50, 10, 10);
  ctx.rect(200, 200, 10, 10);
  ctx.fill();
}

/**
 * 三次贝塞尔曲线
 */
function draw() {
  ctx.moveTo(100, 100);
  ctx.bezierCurveTo(50, 120, 200, 200, 300, 300);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'red';
  ctx.setLineDash([5]);
  ctx.moveTo(100, 100);
  ctx.lineTo(50, 120);
  ctx.lineTo(200, 200);
  ctx.lineTo(300, 300);
  ctx.stroke();

  ctx.beginPath();
  ctx.fillStyle = 'blue';
  ctx.rect(100, 100, 10, 10);
  ctx.rect(50, 120, 10, 10);
  ctx.rect(200, 200, 10, 10);
  ctx.rect(300, 300, 10, 10);
  ctx.fill();
}

/**
 * 变形
 */
function draw() {

  ctx.save();
  ctx.strokeStyle = 'red';
  ctx.rect(100, 100, 100, 100);
  ctx.stroke();
  ctx.restore();

  ctx.beginPath();


  /**
   *  {
   *  a c e
   *  b d f
   *  0 0 1
   * }
   *  
   *  a,d 缩放
   *  e,f 平移
   *  b,c 旋转
   *  
   * 
   */

  // 变形 a,b,c,d,e,f

  // 缩放坐标系
  // ctx.transform(3,0,0,3,0,0);

  // 平移坐标系
  // ctx.transform(1,0,0,1,50,50);

  // 旋转坐标系
  // ctx.transform(Math.cos(Math.PI * 2 / 360 * 30), Math.sin(Math.PI * 2 / 360 * 30), -Math.sin(Math.PI * 2 / 360 * 30), Math.cos(Math.PI * 2 / 360 * 30), 0, 0);

  // **  setTransform 的操作，不会再上一次的结果上进行； transform 的操作，会在上一次的基础之上进行；

  // 倾斜坐标系
  ctx.transform();


  // 先描述形状
  ctx.rect(100, 100, 100, 100);

  // 使用画笔进行绘制
  ctx.stroke();
}

/**
 * 颜色合成（新绘制的颜色与画布上的颜色的合成
 */
function draw() {
  ctx.fillStyle = 'red';
  ctx.rect(100, 100, 100, 100);
  ctx.fill();

  // 新添加到画布上的颜色，是如何与画布上已有的颜色组合的
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalCompositeOperation = 'copy';
  ctx.globalCompositeOperation = 'darker';
  ctx.globalCompositeOperation = 'destination-atop';
  ctx.globalCompositeOperation = 'destination-out';
  ctx.globalCompositeOperation = 'destination-over';
  ctx.globalCompositeOperation = 'lighter';

  ctx.beginPath();
  ctx.fillStyle = 'blue';
  ctx.rect(120, 120, 120, 120);
  ctx.fill();
}

/**
 * 图片的灰度控制：
 * 1. pixel = [2,2,2]
 * const grayscale = pixel[0] * .3 + pixel[1] * .59 + pixel[2] * .11;
 * 每个像素 4个字节，每个字节（8位无符号整型 0-255
 * 将每个像素的每个色值都赋值为 grayscale，就形成了图片的灰度控制
 */
function draw() {
  ctx.fillStyle = 'red';
  ctx.rect(0, 0, 100, 100);
  ctx.fill();

  const imageData = ctx.getImageData(0, 0, 100, 100),
    px = imageData.data;

  for (let i = 0, len = px.length; i < len; i += 4) {
    const grayscale = px[i] * .3 + px[i + 1] * .59 + px[i + 2] * .11;
    px[i] = grayscale;
    px[i + 1] = grayscale;
    px[i + 2] = grayscale;
  }

  ctx.putImageData(imageData, 200, 0);
}

/**
 * 阴影
 */
function draw() {
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'red';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;

  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.rect(100, 100, 100, 100);
  ctx.fill();
}

/**
 * 颜色反转
 */
function draw() {
  ctx.fillStyle = 'red';
  ctx.rect(0, 0, 100, 100);
  ctx.fill();

  const imageData = ctx.getImageData(0, 0, 100, 100),
    px = imageData.data;

  for (let i = 0, len = px.length; i < len; i += 4) {
    px[i] = 255 - px[i];
    px[i + 1] = 255 - px[i + 1];
    px[i + 2] = 255 - px[i + 2];
  }

  ctx.putImageData(imageData, 200, 0);
}

/**
 * 径向渐变
 */
function draw() {
  const grd = ctx.createRadialGradient(100, 100, 10, 100, 100, 20);
  grd.addColorStop(0, 'red');
  grd.addColorStop(0.2, 'yellow');
  grd.addColorStop(1, 'blue');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 200, 200);
}

/**
 * 线性渐变
 */
function draw() {
  // x1,y1 x2,y2 之间做渐变

  const grd = ctx.createLinearGradient(100, 0, 150, 0);
  grd.addColorStop(0.2, 'red');
  grd.addColorStop(0.8, 'blue');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 200, 200);

  // 平移: ctx.transform(1,0,0,1,x,y);
  // 缩放：ctx.transform(x,0,0,y,0,0);
  // 倾斜: ctx.transform(1,x,y,1,0,0);
  // 旋转：ctx.transform(cos,sin,-sin,cos,0,0);
  // ctx.transform(2, 0, 1, 1, 200, 200);

  const deg = Math.PI * 2 / 360;

  ctx.save();
  ctx.transform(Math.cos(10 * deg), Math.sin(10 * deg), -Math.sin(10 * deg), Math.cos(10 * deg), 0, 0);
  const grd1 = ctx.createLinearGradient(100, 0, 150, 0);
  grd1.addColorStop(0.2, 'red');
  grd1.addColorStop(0.8, 'blue');
  ctx.fillStyle = grd1;
  ctx.fillRect(0, 0, 200, 200);
}


/**
 * 文本的 
 * textBaseline
 * textAlign
 */
function draw() {
  // textAlign
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textAlign = 'start';
  ctx.fillText('jmz start', 100, 100);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('jmz center', 100, 150);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('jmz left', 100, 200);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('jmz right', 100, 250);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textAlign = 'end';
  ctx.fillText('jmz end', 100, 300);
  ctx.restore();

  // textBaseline
  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textBaseline = 'top';
  ctx.fillText('jmz top', 200, 100);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textBaseline = 'hanging';
  ctx.fillText('jmz hanging', 200, 150);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText('jmz middle', 200, 200);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('jmz alphabetic', 200, 250);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textBaseline = 'ideographic';
  ctx.fillText('jmz ideographic', 200, 300);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = 'red';
  ctx.font = '30px sans-serif';
  ctx.textBaseline = 'bottom';
  ctx.fillText('jmz bottom', 200, 350);
  ctx.restore();


  // TextMetrics
  ctx.font = 'italic bold 20px sans-serif';
  const info = ctx.measureText('jmz');
  ctx.fillText(`字体：italic bold 20px sans-serif -》jmz: width - ${info.width}`, 400, 100);

  ctx.globalAlpha = 0.4;

  // textAlign
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(100, 100, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(100, 150, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(100, 200, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(100, 250, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(100, 300, 10, 10);

  // textBaseline
  ctx.beginPath()
  ctx.fillStyle = 'black';
  ctx.fillRect(200, 100, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(200, 150, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(200, 200, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(200, 250, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(200, 300, 10, 10);
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(200, 350, 10, 10);

  canvas.toBlob(function (e) {
    console.log(e);
  }, 'image/png', 1);

  const url = canvas.toDataURL('image/png', 1);
  const image = new Image();
  image.src = url;
  document.body.appendChild(image);
}

function draw() {
  const cx = 100,
    cy = 100,
    r = 50,
    cr = 4;

  // 钟环
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // 圆心
  ctx.beginPath();
  ctx.save();
  ctx.fillStyle = 'black';
  ctx.arc(cx, cy, cr, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.beginPath();
  const innerx = 40 + 40 * Math.cos(Math.PI * 2 / 360 * 0),
    innery = 40 + 40 * Math.sin(Math.PI * 2 / 360 * 0),
    outx = 50 + 50 * Math.cos(Math.PI * 2 / 360 * 0),
    outy = 50 + 50 * Math.sin(Math.PI * 2 / 360 * 0);

  // ctx.moveTo();
  // ctx.lineTo();

  canvas.toBlob(function (blob) {
    const url = URL.createObjectURL(blob),
      image = new Image();
    image.src = url;

    image.onload = function () {
      // 释放资源，释放对 url 对象的引用
      URL.revokeObjectURL(url);
    }

    document.body.appendChild(image);
  });
}

/**
 * offscreen canvas: 离屏canvas
 * 1. 也叫缓冲canvas-> buffer
 */

function draw() {
  const offscreen = document.createElement('canvas');

  ctx.clearRect(0, 0, cw, ch);
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.fillRect(0, 0, cw, ch);

}


/**
 * 变换坐标系
 * 1. translate
 * 2. rotate
 * 3. scale
 */
function draw() {

  ctx.translate(100, 100);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 500);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(500, 0);
  ctx.closePath();
  ctx.stroke();

  for (let i = 0; i < 500; i += 5) {
    ctx.beginPath();
    if (i % 50 === 0) {
      ctx.strokeStyle = 'red';
    } else {
      ctx.strokeStyle = 'black';
    }
    ctx.moveTo(0, i);
    ctx.lineTo(-5, i);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, -5);
    ctx.stroke();
    ctx.closePath();
  }

  for (let i = 0; i < 500; i += 50) {
    ctx.textBaseline = 'bottom';
    ctx.textAlign = 'center';
    ctx.fillText(i, i, -5);

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'right';
    ctx.fillText(i, -5, i);
  }

}

draw();
