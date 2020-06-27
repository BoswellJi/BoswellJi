const canvas = document.querySelector('#canvas'),
  ctx = canvas.getContext('2d'),
  cw = window.innerWidth,
  ch = window.innerHeight;

function fillScreen() {
  canvas.width = cw;
  canvas.height = ch;
}
fillScreen();

function draw() {
  let i = 0,
    dir = 'l',
    speed = 1;

  const shapes = [
    new Shape(20, 20),
    new Shape(30, 20),
    new Shape(40, 20),
    new Shape(50, 20),
  ];

  function anmiate() {
    speed = speed + 1;
    if (i >= cw) {
      dir = 'r';
      speed = 1;
    } else if (i <= 0) {
      dir = 'l';
      speed = 1;
    }
    if (dir === 'l') {
      i = i + speed;
    } else if (dir === 'r') {
      i = i - speed;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillRect(i, 250, 10, 10);
    setTimeout(anmiate, 1000 / 60);
  }
  anmiate();
}

/**
 * 1. 使用面向对象创建元素
 * 2. 使用Math.random()方法生成随机数字
 */
function draw() {

  function Shape(x, y) {
    this.x = x;
    this.y = y;
  }

  const shapes = [
    new Shape(20, 201),
    new Shape(30, 200),
    new Shape(40, 30),
    new Shape(50, 50),
  ];

  function anmiate() {
    ctx.clearRect(0, 0, cw, ch);

    shapes.forEach((item) => {
      const x = Math.random() * 250;
      const y = Math.random() * 250;
      ctx.fillRect(x, y, 10, 10);
    });

    setTimeout(anmiate, 500);
  }
  anmiate();
}


function draw() {

  function Shape(x, y) {
    this.x = x;
    this.y = y;
  }

  const shapes = [
    new Shape(20, 201),
    new Shape(30, 200),
    new Shape(40, 30),
    new Shape(50, 50),
  ];

  function anmiate() {
    ctx.clearRect(0, 0, cw, ch);

    shapes.forEach((item) => {
      const x = Math.random() * item.x;
      const y = Math.random() * item.y;
      ctx.fillRect(x, y, 10, 10);
    });

    setTimeout(anmiate, 500);
  }
  anmiate();
}

/**
 * 改变方向
 */
function draw() {

  function Shape(x, y) {
    this.x = x;
    this.y = y;
  }

  const shapes = [
    new Shape(20, 201),
    new Shape(30, 200),
    new Shape(40, 30),
    new Shape(50, 50),
  ];

  function anmiate() {
    ctx.clearRect(0, 0, cw, ch);

    shapes.forEach((item) => {
      item.x += Math.random() * 4 - 2;
      item.y += Math.random() * 4 - 2;
      ctx.fillRect(item.x, item.y, 10, 10);
    });

    setTimeout(anmiate, 500);
  }
  anmiate();
}

/**
 * 反弹
 */
function draw() {

  function Shape(x, y, width = 10, height = 10) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.reverseX = false;
    this.reverseY = false;
  }

  const shapes = [
    new Shape(20, 201),
    new Shape(30, 200),
    new Shape(40, 30),
    new Shape(50, 50),
  ];

  function anmiate() {
    ctx.clearRect(0, 0, cw, ch);

    shapes.forEach((item) => {

      if (item.x < 0) {
        item.reverseX = false;
      } else if (item.x + item.width > cw) {
        item.reverseX = true;
      }

      if (item.y < 0) {
        item.reverseY = false;
      } else if (item.y + item.height > ch) {
        item.reverseY = true;
      }

      if (!item.reverseX) {
        item.x += 2;
      } else {
        item.x -= 2;
      }

      if (!item.reverseY) {
        item.y += 2;
      } else {
        item.y -= 2;
      }

      ctx.fillRect(item.x, item.y, 10, 10);
    });

    setTimeout(anmiate, 10);
  }
  anmiate();
}

/**
 * 圆周运动
 * 要点： 根据圆心，获取圆弧上的坐标
 */
function draw() {

  function Shape(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = Math.random() * 100;
    this.angle = 0;
  }

  const shapes = [
    new Shape(250, 250, 10, 10),
    new Shape(2 * 250, 250, 10, 10),
    new Shape(3 * 250, 250, 10, 10),
    new Shape(4 * 250, 250, 10, 10),
  ];

  function anmiate() {
    ctx.clearRect(0, 0, cw, ch);

    shapes.forEach((item) => {
      /**
       * 根据三角函数，计算边长，圆心加上边长计算圆弧上的点的坐标
       * r*Math.cos(deg) = x 长
       * r*Math.sin(deg) = y 长
       */
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.stroke();

      // 圆心与圆弧上的点组成的三角形的，非斜边的长与圆心之和
      const x = item.x + (item.radius * Math.cos(item.angle * Math.PI * 2 / 360));
      const y = item.y + (item.radius * Math.sin(item.angle * Math.PI * 2 / 360));
      item.angle += 5;
      if (item.angle > 360) {
        item.angle = 0;
      }

      ctx.beginPath();
      ctx.fillRect(x, y, item.width, item.height);
    });

    setTimeout(anmiate, 60);
  }
  anmiate();
}

/**
 * 每个元素设置独立的速度与方向
 */
function draw() {
  function Shape(x, y, radius, vx, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    // 每个方向上不同的速度
    this.vy = vy;
    this.vx = vx;
  }

  const shapes = [];

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 1250;
    const y = Math.random() * 1250;
    const radius = 5 * Math.random() + 10;
    const vx = vy = Math.random() * 4 - 2;

    shapes.push(new Shape(x, y, radius, vx, vy));
  }

  function animate() {
    ctx.clearRect(0, 0, cw, ch);

    shapes.forEach(item => {
      item.x += item.vx;
      item.y += item.vy;

      // 靠近左右上下边，重新设置圆心，速度取反
      if (item.x - item.radius < 0) {
        item.x = item.radius;
        item.vx *= -1
      } else if (item.x + item.radius > cw) {
        item.x = cw - item.radius;
        item.vx *= -1
      }

      if (item.y - item.radius < 0) {
        item.y = item.radius;
        item.vy *= -1
      } else if (item.y + item.radius > ch) {
        item.y = ch - item.radius;
        item.vy *= -1
      }

      ctx.fillStyle = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    setTimeout(animate, 1000 / 60);
  }

  animate();
}

/**
 * 每个元素设置独立的速度与方向
 * 1. 添加加速度
 */
function draw() {
  function Shape(x, y, radius, vx, vy, ax, ay, mass) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.mass = mass;
    // 每个方向上不同的速度
    this.vy = vy;
    this.vx = vx;
    this.ax = ax;
    this.ay = ay;
  }

  const shapes = [];

  for (let i = 0; i < 100; i++) {
    const x = Math.random() * 1250;
    const y = Math.random() * 1250;
    const radius = 5 * Math.random() + 10;
    const mass = radius / 2;
    const vx = vy = Math.random() * 4 - 2;
    const ax = ay = 0;

    shapes.push(new Shape(x, y, radius, vx, vy, ax, ay, mass));
  }

  function animate() {
    ctx.clearRect(0, 0, cw, ch);

    shapes.forEach((item, index) => {
      // 碰撞检测
      for (let i = index + 1, len = shapes.length; i < len; i++) {
        // 检测碰撞
        const
          another = shapes[i],
          dx = shapes[i].x - item.x,
          dy = shapes[i].y - item.y,
          distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < item.radius + item.radius) {
          // 碰撞后，抛开物体
          const
            // 夹角的大小
            angle = Math.atan2(dy, dx),
            sine = Math.sin(angle),
            cosine = Math.cos(angle);
          let
            x = 0,
            y = 0,
            xb = dx * cosine + dy * sine,
            yb = dy * cosine - dx * sine,
            vx = item.vx * cosine + item.vy * sine,
            vy = item.vy * cosine - item.vx * sine,
            vxb = shapes[i].vx * cosine + shapes[i].vy * sine,
            vyb = shapes[i].vy * cosine - shapes[i].vx * sine;

          vx *= -1;
          vxb *= -1;
          // const vTotal = vx - vxb;
          // vx = ((item.mass - another.mass) * vx + 2 * another.mass * vxb) / (item.mass + another.mass);
          // vxb = vTotal + vx;

          xb = x + item.radius + shapes[i].radius;
          item.x = item.x + x * cosine - y * sine;
          item.y = item.y + x * cosine + x * sine;
          shapes[i].x = item.x + xb * cosine - yb * sine;
          shapes[i].y = item.y + yb * cosine + xb * sine;
          item.vx = vx * cosine - vy * sine;
          item.vy = vy * cosine - vx * sine;
          shapes[i].vx = vxb + cosine - vyb * sine;
          shapes[i].vy = vyb * cosine + vxb * sine;
        }
      }

      // 加速度,对速度进行加速,限制速度一直增加
      if (Math.abs(item.vx) < 10) {
        item.vx += item.ax;
      }
      if (Math.abs(item.vy) < 10) {
        item.vy += item.ay;
      }

      // 摩擦力
      if (Math.abs(item.vx) > 0.1) {
        item.vx *= 0.9;
      } else {
        item.vx = 0;
      }
      if (Math.abs(item.vy) > 0.1) {
        item.vy *= 0.9;
      } else {
        item.vy = 0;
      }

      // 速度
      item.x += item.vx;
      item.y += item.vy;

      // 边界限制，靠近左右上下边，重新设置圆心，速度取反,加速度取反(否则，加速度之后速度依然为正向的)
      if (item.x - item.radius < 0) {
        item.x = item.radius;
        item.vx *= -1;
        item.ax *= -1;
      } else if (item.x + item.radius > cw) {
        item.x = cw - item.radius;
        item.vx *= -1;
        item.ax *= -1;
      }

      if (item.y - item.radius < 0) {
        item.y = item.radius;
        item.vy *= -1;
        item.ay *= -1;
      } else if (item.y + item.radius > ch) {
        item.y = ch - item.radius;
        item.vy *= -1;
        item.ay *= -1;
      }

      // ctx.fillStyle = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    setTimeout(animate, 33);
  }

  animate();
}

/**
 * 摩擦力
 */
// function draw() {
//   function Shape(x, y, width = 10, height = 10) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     // 是否倒回
//     this.reverseX = false;
//     this.reverseY = false;
//   }

//   const shapes = [
//     new Shape(20, 200, 100, 100)
//   ];

//   function anmiate() {
//     ctx.clearRect(0, 0, cw, ch);

//     let speed = 2, aspeed = 0, mx = 0.9;
//     shapes.forEach((item) => {
//       aspeed += 1;

//       speed += aspeed;

//       if (item.reverseY) {
//         speed *= mx;
//         mx -= 0.1;
//       }

//       if (item.x < 0) {
//         item.reverseX = false;
//       } else if (item.x + item.width > cw) {
//         item.reverseX = true;
//       }

//       if (item.y < 0) {
//         item.reverseY = false;
//       } else if (item.y + item.height > ch) {
//         item.reverseY = true;
//       }

//       if (!item.reverseX) {
//         item.x += speed;
//       } else {
//         item.x -= speed;
//       }

//       if (!item.reverseY) {
//         item.y += speed;
//       } else {
//         item.y -= speed;
//       }

//       ctx.fillRect(100, item.y, item.width, item.width);
//     });

//     setTimeout(anmiate, 10);
//   }

//   anmiate();
// }

function random(start, end) {
  return Math.floor((end - start) * Math.random() + 1) + start;
}

draw();