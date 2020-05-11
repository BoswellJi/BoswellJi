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

main();


