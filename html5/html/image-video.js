function draw() {
  const image = new Image();
  image.src = 'anatomy-of-a-frame.jpg';
  image.onload = function () {
    // 创建马赛克
    const imageData = ctx.createImageData(500, 500),
      // UInt8CampArray 数组，字节
      px = imageData.data,
      // 4行，4列
      rows = 100,
      cols = 100,
      // 每个单元格的大小
      tileWidth = imageData.width / cols,
      tileHeight = imageData.height / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // 随机产生颜色
        let red = 255 - Math.floor(Math.random() * 255),
          green = 255 - Math.floor(Math.random() * 255),
          blue = 255 - Math.floor(Math.random() * 255);

        // 遍历单元格中的像素
        for (let tr = 0; tr < tileHeight; tr++) {
          for (let tc = 0; tc < tileWidth; tc++) {
            // 计算像素的坐标
            let x = (c * tileWidth) + tc;
            let y = (r * tileHeight) + tr;
            // 计算坐标在数组中的位置 , y * imageData.width * 4 计算多列的位置 ，x*4 计算x轴的位置
            let pos = y * imageData.width * 4 + x * 4;

            px[pos] = red;
            px[pos + 1] = green;
            px[pos + 2] = blue;
            px[pos + 3] = 255;
          }
        }
      }
    }

    // ctx.shadowBlur = 20;
    // ctx.shadowColor = '#333';
    // 不限制大小，图片完整展示
    // ctx.drawImage(image, 0, 100);
    // 将图片放置到指定位置的区域
    ctx.drawImage(image, 0, 0, 600, 600);
    // 前4位数字是图片上的部分，将图片当作一个画布在切割，后4位数字是画布上放置切割下来的部分
    // ctx.drawImage(image, 100, 100, 100, 100, 500, 100, 100, 100);
    ctx.putImageData(imageData, 0, 0);

    // 像素化
    // const imageData = ctx.getImageData(0, 0, 500, 500),
    //   px = imageData.data, 
    //   // 将imageData，分为20行，20列
    //   rows = 20,
    //   cols = 20, 
    //   // 计算每个单元格长度和宽度
    //   tileWidth = imageData.width / cols,
    //   tileHeight = imageData.height / rows;

    //   // 计算每个单元格的像素数，修改每个像素
    // for (let r = 0; r < rows; r++) {
    //   for (let c = 0; c < cols; c++) {
    //     let x = c * tileWidth + tileWidth / 2;
    //     let y = r * tileHeight + tileHeight / 2;
    //     let pos = (Math.floor(y) * (imageData.width * 4)) + Math.floor(x) * 4;
    //     let red = px[pos];
    //     let green = px[pos + 1];
    //     let blue = px[pos + 2];

    //     ctx.fillStyle = `rgb(${red},${green},${blue})`;
    //     ctx.fillRect(x - tileWidth / 2, y - tileHeight / 2, tileWidth, tileHeight);
    //     ctx.beginPath();
    //     ctx.arc(x, y, tileWidth / 2, 0, Math.PI * 2, false);
    //     ctx.fill();
    //   }
    // }
  }
}

/**
 * 视频抓取
 * 1. 视频播放后才可以进行抓取
 */
function draw() {
  const video = document.querySelector('#video');

  video.addEventListener('play', function () {
    ctx.drawImage(video, 400, 0);
  }, false);
}

draw();
