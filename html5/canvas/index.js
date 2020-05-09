function drawRoundRect({
  color,
  x,
  y,
  w,
  h,
  radius,
  ctx
}) {
  ctx.beginPath();
  color && (ctx.fillStyle = color);
  ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
  ctx.lineTo(w - radius + x, y);
  ctx.arc(w - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
  ctx.lineTo(w + x, h + y - radius);
  ctx.arc(w - radius + x, h - radius + y, radius, 0, Math.PI * 1 / 2);
  ctx.lineTo(radius + x, h + y);
  ctx.arc(radius + x, h - radius + y, radius, Math.PI * 1 / 2, Math.PI);
  ctx.fill();
  ctx.closePath();
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
  let tempUrl = typeof url === 'object'?;
  if (imgType === 1) {
    const {
      path
    } = await getImage({
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
      width: w,
      height: circularBeadH,
      radius: 10,
      ctx
    });
    ctx.clip();
  }

  ctx.drawImage(tempUrl, x, y, w, h);
  ctx.restore();
}

function main() {
  var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d');
  canvas.style.background = 'black';

  drawRoundRect({
    color: 'red',
    x: 10,
    y: 10,
    w: 50,
    h: 50,
    radius: 10,
    ctx
  });

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


