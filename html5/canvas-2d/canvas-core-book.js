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
  ctx.translate(cw / 2 - 50, ch / 2 - 50);
  ctx.strokeRect(10, 10, 100, 100);
  ctx.restore();
}

/**
 * 1-2
 */
function draw() {
  const x = Math.floor(cw / 2),
    y = Math.floor(ch / 2),
    text = '季明壮';

  ctx.beginPath();
  ctx.moveTo(x, y - 50);
  ctx.lineTo(x, y + 50);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(x - 50, y);
  ctx.lineTo(x + 50, y);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = 'blue';
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = 'red';
  ctx.font = '38px Arial';
  ctx.textBaseline = 'middle';
  // 居中的实现方法1
  // ctx.textAlign = 'center';

  // 居中的实现方法2
  const info = ctx.measureText(text),
    diffX = Math.floor(info.width / 2),
    cx = Math.floor(x - diffX);

  ctx.fillText(text, cx, y);
}

/**
 * 1-13
 */
function draw() {
  const cx = 500,
    cy = 500,
    r = 100;

  ctx.clearRect(0, 0, cw, ch);

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fill();

  const date = new Date(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();



  // 时针
  const degh = hour * 30 - 90,
    hx = cx + 50 * Math.cos(Math.PI * 2 / 360 * degh),
    hy = cy + 50 * Math.sin(Math.PI * 2 / 360 * degh);

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(hx, hy);
  ctx.stroke();

  // 分针
  const degm = min * 6 - 90,
    mx = cx + 70 * Math.cos(Math.PI * 2 / 360 * degm),
    my = cy + 70 * Math.sin(Math.PI * 2 / 360 * degm);

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(mx, my);
  ctx.stroke();

  // 秒针
  const degs = sec * 6 - 90,
    sx = cx + 70 * Math.cos(Math.PI * 2 / 360 * degs),
    sy = cy + 70 * Math.sin(Math.PI * 2 / 360 * degs);

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(sx, sy);
  ctx.stroke();

  for (let i = 0; i < 360; i += 6) {
    let x1 = cx + r * Math.cos(Math.PI * 2 / 360 * i),
      y1 = cy + r * Math.sin(Math.PI * 2 / 360 * i),
      x = cx + 90 * Math.cos(Math.PI * 2 / 360 * i),
      y = cy + 90 * Math.sin(Math.PI * 2 / 360 * i);

    if (i % 30 === 0) {
      x = cx + 80 * Math.cos(Math.PI * 2 / 360 * i),
        y = cy + 80 * Math.sin(Math.PI * 2 / 360 * i)
      ctx.strokeStyle = 'red';

      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // ctx.fillText(Mat h.abs(( -  i) / 30), x, y);
    } else {
      ctx.strokeStyle = 'black';
    }

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
  }

  setTimeout(draw, 900);
}


/**
 * 鼠标事件
 */
function draw() {
  canvas.addEventListener('mousemove', function (e) {
    ctx.clearRect(0, 0, cw, ch);
    const x = e.clientX,
      y = e.clientY;

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.setLineDash([2]);
    ctx.beginPath();
    ctx.moveTo(x, y + 50);
    ctx.lineTo(x, y - 50);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 50, y);
    ctx.lineTo(x - 50, y);
    ctx.stroke();
  });
}

/**
 * 橡皮擦除
 */
function draw() {
  ctx.beginPath();
  ctx.rect(0, 0, cw, ch);
  ctx.fill();

  let sx = 0,
    sy = 0;

  canvas.addEventListener('mouseover', function (e) {
    sx = e.clientX;
    sy = e.clientY;
  });

  canvas.addEventListener('mousemove', function (e) {
    const mx = e.clientX,
      my = e.clientY

    const imageData = ctx.getImageData(mx, my, 10, 10),
      px = imageData.data;

    for (let i = 0, len = px.length; i < len; i += 4) {
      px[i] = 255;
      px[i + 1] = 255;
      px[i + 2] = 255;
    }

    ctx.putImageData(imageData, mx, my);
  });
}

/**
 * 绘制在一起上层会把下层的像素数据给覆盖掉
 */
function draw() {
  ctx.beginPath();
  ctx.rect(100, 100, 100, 100);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = 'rgb(255,0,0)';
  ctx.rect(110, 110, 100, 100);
  ctx.fill();

  canvas.addEventListener('mousemove', function (e) {
    const mx = e.clientX,
      my = e.clientY

    const imageData = ctx.getImageData(mx, my, 10, 10),
      px = imageData.data;

    for (let i = 0, len = px.length; i < len; i += 4) {
      if (px[i] === 255) {
        px[i + 3] = 0;
      }
    }

    ctx.putImageData(imageData, mx, my);
  });
}

/**
 * 画框
 */
function draw() {
  let sx = 0,
    sy = 0,
    mx = 0,
    my = 0,
    cache = [];

  canvas.addEventListener('mousedown', function (e) {
    sx = e.clientX;
    sy = e.clientY;

    function mousemove(e) {
      ctx.clearRect(0, 0, cw, ch);

      mx = e.clientX;
      my = e.clientY;

      for (let i = 0, len = cache.length; i < len; i++) {
        ctx.beginPath();
        ctx.rect(cache[i].x, cache[i].y, cache[i].w, cache[i].h);
        ctx.stroke();
      }

      ctx.beginPath()
      ctx.rect(sx, sy, mx - sx, my - sy);
      ctx.stroke();
    }

    function mouseup(e) {
      cache.push({
        x: sx,
        y: sy,
        w: mx - sx,
        h: my - sy,
      });
      canvas.removeEventListener('mousemove', mousemove);
      canvas.removeEventListener('mouseup', mouseup);
    }

    canvas.addEventListener('mousemove', mousemove);

    canvas.addEventListener('mouseup', mouseup);
  });
}

draw();