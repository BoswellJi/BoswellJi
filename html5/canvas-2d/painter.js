function listenerMouse() {
  const canvas = document.querySelector('#canvas'),
    cx = canvas.offsetLeft,
    cy = canvas.offsetTop;

  let mx1, my1, start = false;
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'red';

  function draw(mx, my) {
    ctx.beginPath();
    ctx.moveTo(mx1, my1);
    mx1 = mx;
    my1 = my;
    ctx.lineTo(mx, my);
    ctx.stroke();
  }
  canvas.addEventListener('mousedown', function (e) {
    start = true;
  });
  canvas.addEventListener('mousemove', function (e) {
    if (start === false) return;
    const x = e.offsetX,
      y = e.offsetY,
      mx = x - cx,
      my = y - cy;
    draw(mx, my)
  });
  canvas.addEventListener('mouseleave', function (e) {
    mx1 = undefined;
    my1 = undefined;
    start = false;
  });
  canvas.addEventListener('mouseup', function (e) {
    mx1 = undefined;
    my1 = undefined;
    start = false;
  });
}