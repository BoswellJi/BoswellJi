var http=require('http');

var url='http://www.imooc.com/video/7965';

//发送一个get的http请求给web服务器
http.get(url,function(res) {     //地址+返回的response的数据处理
	var html='';

	res.on('data',function(data){
		html+=data;
	});

	res.on('end', function() {
		console.log(html);
	});

}).on('error',function() {
	console.log("出错");
});;