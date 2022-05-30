var readline = require('readline');

//创建readline接口实例
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// question方法
rl.question("你叫什么？", function (answer) {
  console.log("名字是：" + answer);
  // question方法
  rl.question("年龄？", function (answer) {
    console.log("年龄是：" + answer);
    rl.close();
  });
});



// close事件监听
rl.on("close", function () {
  // 结束程序
  process.exit(0);
});