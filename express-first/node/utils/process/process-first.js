// console.log(process.cwd()+'获取应用程序的当前绝对路径');
// var path=process.cwd();
// process.chdir(path+'/modeified path');  修改当前应用程序的路径

// // 标准的输出流
// console.log = function(d){  // 重写了log函数
//     process.stdout.write(d+'\n');
// }
// console.log('diaoyong');

// 标准的错误输出流
// process.stderr.write('here error information');

//标准的进程输入流  检测事件来获取用户输入的数据
// process.stdin.on('readable', function() {
// 	var chunk = process.stdin.read();
// 	if (chunk !== null) {
// 		process.stdout.write('data' + chunk);
// 	}
// });
//退出进程
// process.exit();


// // 标注的输入流
// process.stdin.resume();   //等待输入
// process.stdin.on('data',function(data){   //触发data事件
	 
// 		process.stdout.write('haha'+data);  //标准输出流
	
// });

// nextTick不需要等待callback方法执行完毕
console.log('start');
process.nextTick(() => {
	debugger;
  console.log('nextTick callback');
});

debugger;
console.log('scheduled');