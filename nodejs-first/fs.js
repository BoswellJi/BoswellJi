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

// var fs=require('fs');
// var readStream=fs.createReadStream('1.txt');
// var writeStream=fs.createWriteStream('2.txt');

// readStream.pipe(writeStream);


// var fs=require('fs');
// var zlib=require('zlib');  //压缩文件

// //创建读取流，将数据通过数据管道进行压缩，再将文件写到压缩文件中
// fs.createReadStream('1.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('1.txt.gz'));
// console.log('哎呦');

var fs=require('fs');
var zlib=require('zlib');

fs.createReadStream('1.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('3.txt'));
console.log("hhe");