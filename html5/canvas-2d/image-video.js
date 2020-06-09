function draw() {
  const image = new Image();
  image.src = 'https://developer.mozilla.org/@api/deki/files/80/=Canvas_drawimage2.jpg';
  image.onload = function () {
    const imageData = ctx.createImageData(500, 500),
    // UInt8CampArray 数组，字节
      px = imageData.data,
      // 
      rows = 4,
      cols = 4,
      // 4px宽，4px高， 要有多少这样的像素
      tileWidth = imageData.width / cols,
      tileHeight = imageData.height / rows;
    let red, green, blue;

    // 一块为16个像素
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // 随机产生颜色
        red = Math.floor(Math.random() * 255);
        green = Math.floor(Math.random() * 255);
        blue = Math.floor(Math.random() * 255);

        for (let tr = 0; tr < tileHeight; tr++) {
          for (let tc = 0; tc < tileWidth; tc++) {
            let truex = (j * tileWidth) + tc;
            let truey = (i * tileHeight) + tr;
            let pos = (truey * (imageData.width * 4)) * truex * 4;

            px[pos] = red;
            px[pos + 1] = green;
            px[pos + 2] = blue;
            px[pos + 3] = 255;
          }
        }
      }
    }

    ctx.shadowBlur = 20;
    ctx.shadowColor = '#333';
    // 不限制大小，图片完整展示
    ctx.drawImage(image, 0, 100);
    // 将图片放置到指定位置的区域
    ctx.drawImage(image, 300, 100, 100, 100);
    // 前4位数字是图片上的部分，将图片当作一个画布在切割，后4位数字是画布上放置切割下来的部分
    ctx.drawImage(image, 100, 100, 100, 100, 500, 100, 100, 100);
    ctx.putImageData(imageData,0,100);
  }
}

draw();