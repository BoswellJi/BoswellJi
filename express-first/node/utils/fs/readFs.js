/**
 * Buffer是二进制
 * String是字符串
 */


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

// var fs=require('fs');
// var zlib=require('zlib');

// fs.createReadStream('1.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('3.txt'));
// console.log("hhe");
// var Buffer=require('buffer');

// console.log(buffer);
//创建保存二进制数据的缓存区对象，定义这个缓存区的大小
// var b1=new Buffer(34);
// var len=b1.write('abcdef',0,5,'utf8');

// console.log('写入到缓存区中的数据长度'+len);

// var str=b1.toString('utf8',0,5);
// console.log(str);


// var buf=new Buffer(23);  //定义一个长度为23的buffer
// for(var i=0;i<buf.length;i++){
// 	buf[i]=i+97;  
// }
// //获取缓冲区中的数据
// console.log(buf.toString('utf8',0,6));


var fs=require('fs');

module.exports={
	/**
	 * 同步读取文件
	 * @param  {[type]} path [description]
	 * @return {[type]}      [description]
	 */
	readFileSync:function(path){
		// 获取的数据为文本字符串
		var data=fs.readFileSync(path,'utf-8');
		return data;
	},
	/**
	 * 异步读取文件
	 * @param  {[type]} path [description]
	 * @return {[type]}      [description]
	 */
	readFile:function(path,recall){
		var data='';
		// 获取的数据为文本字符串，所以使用正则进行
		// 模板字符替换
		fs.readFile(path,'utf-8',function(err,data){
			if(err){
				console.log(err);
			}else{
				// console.log(data.toString());
				//res.write(data.toString());
				recall(data);
			}
		});
	},
	/**
	 * 读取图片
	 * @param  {[type]} path [description]
	 * @param  {[type]} res  [description]
	 * @return {[type]}      [description]
	 */
	readImg:function(path,res){
		fs.readFile(path,'binary',function(err,file){
			res.write(file,'binary');
			res.end();
		});
	}
}
