/**
 * 获取鼠标在canvas上的坐标
 */
function event() {
  const cx = canvas.offsetLeft,
    cy = canvas.offsetTop;

  canvas.addEventListener('mousemove', function (e) {
    const x = e.clientX,
      y = e.clientY;
    container.innerHTML = `鼠标在canvas上的坐标位：x:${x - cx} y: ${y - cy}`;
  });
}

event();