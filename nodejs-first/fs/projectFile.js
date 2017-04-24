const project={
	projectName:'jmz',
	fileData:[
		{
			name:'css',
			type:'dir'
		},{
			name:'js',
			type:'dir'
		},{
			name:'images',
			type:'dir'
		},{
			name:'index.html',
			type:'file',
			content:'jmz'
		},
	]
}


var fs=require('fs');


// 创建文件夹
// fs.mkdirSync('./a');


// // 监听文件夹下的操作
// fs.watch('./a',function(ev,file){
// 	console.log(ev+'---'+file);
// });


// 创建文件夹
// fs.mkdir('./a/a',function(err,data){
// 	console.log(data);
// }); 

// 读取文件夹
fs.readdir('./','utf-8',function(err,data){
	console.log(typeof data);
});