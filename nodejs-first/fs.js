// var fs=require('fs');
// //创建堆取流
// var readerStream=fs.createReadStream('server.js');
// var data='';
// //设置读取素具编码格式
// readerStream.setEncoding('utf8');

// readerStream.on('data',function(a) {
// 	data+=a;
// });

// readerStream.on('end',function() {
// 	console.log(data);
// });

// readerStream.on('error', function(err) {
// 	console.log(err.stack);
	
// });

// var fs=require('fs');
// var writeStream=fs.createWriteStream('1.txt');
// var data='ddd';
// //writeStream.setEncoding('utf8');
// writeStream.write(data,'utf8');
// //标记文件末尾
// writeStream.end();

// writeStream.on('finish', function() {
// 	console.log('wancheng');
// });

var fs=require('fs');
var readStream=fs.createReadStream('1.txt');
var writeStream=fs.createWriteStream('2.txt');

readStream.pipe(writeStream);
