function draw() {
  ctx.beginPath();
  // canvas在填充互相有交叉的路径时，使用 “非零环绕规则”
  ctx.arc(300, 190, 150, 0, Math.PI * 2, false);
  ctx.arc(300, 190, 100, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.shadowColor = undefined;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.stroke();
}

function draw() {
  ctx.scale(100, 100);
  const imageData = ctx.getImageData(0, 0, cw, ch),
    px = imageData.data;

  for (let i = 0; i < px.length; i += 4) {
    px[i] = Math.random() * 255;
    px[i + 1] = Math.random() * 255;
    px[i + 2] = Math.random() * 255;
    px[i + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}


/** 网格 */
function drawGrid(color, stepx, stepy) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 0.5;

  for (let i = stepx + 0.5; i < cw; i += stepx) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ch);
    ctx.stroke();
  }

  for (let i = stepy + 0.5; i < ch; i += stepy) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(cw, i);
    ctx.stroke();
  }
}

function draw() {
  ctx.fillStyle = 'red';
  ctx.strokeStyle = 'yellow';

  ctx.shadowColor = 'rgba(50,50,50,1)';
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 4;

  ctx.lineWidth = 20;
  ctx.lineCap = 'round';

  // 二次方贝塞尔曲线，只能向一个方向弯曲
  // 第一个点是曲线的控制点  第二个点是曲线的锚点 以及当前路径中的最后一个点连接起来
  ctx.beginPath();
  ctx.moveTo(102.5, 130);
  ctx.quadraticCurveTo(190, 250, 210.5, 160.5);
  ctx.quadraticCurveTo(240, 100.5, 290, 70.5);
  ctx.stroke();

  // 三次方贝塞尔曲线,前两个点是控制点，第三个点是锚点
  ctx.beginPath();
  ctx.moveTo(130, 70);
  ctx.bezierCurveTo(130, 250, 450, 70, 430, 270);
  ctx.stroke();
}

function draw() {
  // ctx.beginPath();
  // ctx.arc(400, 400, 50, 0, Math.PI * 2);
  // ctx.stroke();

  let x = 400 + 50 * Math.cos(Math.PI * 2 / 360 * 0),
    y = 400 + 50 * Math.sin(Math.PI * 2 / 360 * 0),
    num = 6,
    deg = 360 / num;

  for (let i = 1; i <= num; i++) {
    x1 = 400 + 50 * Math.cos(Math.PI * 2 / 360 * deg * i),
      y1 = 400 + 50 * Math.sin(Math.PI * 2 / 360 * deg * i);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();

    x = x1;
    y = y1;
  }
}

function draw() {
  function windowToCanvas(x, y) {
    const bbox = canvas.getBoundingClientRect();
    return {
      x: x - bbox.left * canvas.width / bbox.width,
      y: y - bbox.top * canvas.height / bbox.height
    };
  }

  ctx.strokeStyle = 'red';
  drawGrid('lighgray', 10, 10);
}

function draw() {
  const width = 100,
    height = 100;
  // 直接使用原坐标系
  ctx.strokeRect(cw / 2 - 50, ch / 2 - 50, 100, 100);

  // 移动坐标系
  ctx.save();
  ctx.translate(cw/2-50,ch/2-50);
  ctx.strokeRect(10,10,100,100);
  ctx.restore();

}

draw();