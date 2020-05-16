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

rect();