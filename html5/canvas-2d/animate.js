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
 * 圆周运动
 * 要点： 根据圆心，获取圆弧上的坐标
 */
function draw() {

  function Shape(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = Math.random() * 30;
    this.angle = 0;
  }

  const shapes = [
    new Shape(Math.random() * 250, Math.random() * 250, Math.random() * 30, Math.random() * 30),
    new Shape(Math.random() * 250, Math.random() * 250, Math.random() * 30, Math.random() * 30),
    new Shape(Math.random() * 250, Math.random() * 250, Math.random() * 30), Math.random() * 30,
    new Shape(Math.random() * 250, Math.random() * 250, Math.random() * 30, Math.random() * 30),
  ];

  function anmiate() {
    ctx.clearRect(0, 0, cw, ch);

    shapes.forEach((item) => {
      /**
       * 根据三角函数，计算边长，圆心加上边长计算圆弧上的点的坐标
       * r*Math.cos(deg) = x 长
       * r*Math.sin(deg) = y 长
       */
      const x = item.x + (item.radius * Math.cos(item.angle * Math.PI * 2 / 360));
      const y = item.y + (item.radius * Math.sin(item.angle * Math.PI * 2 / 360));
      item.angle += 5;
      if (item.angle > 360) {
        item.angle = 0;
      }
      ctx.fillRect(x, y, item.width, item.height);
    });

    setTimeout(anmiate, 60);
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

  for (let i = 0; i < 10; i++) {
    const x = Math.random() * 250;
    const y = Math.random() * 250;
    const radius = 0;
    const vx = vy = Math.random() * 4 - 2;

    shapes.push(new Shape(x, y, radius, vx, vy));
  }

  function animate() {
    ctx.clearRect(0, 0, cw, ch);
    shapes.forEach(item => {
      item.y += 2;
      item.x += 2;

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
      ctx.fillRect(item.x, item.y, 10, 10);
    });

    setTimeout(animate, 20);
  }

  animate();
}

draw();