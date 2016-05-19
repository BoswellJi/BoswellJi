// 开启一个nodejs服务，监听81端口
var express=require('express');
var app=express();
app.listen(81);

//路由处理 ，  第一为路径，第二个为处理函数，第一个省略，说明所有的请求路径都会被他处理
app.use();


//静态文件路径,当请求路径为一个静态文件时，直接返回
app.use(express.static(__dirname+'/public')); 

//只处理过来请求根路径的请求路径，
app.get('/',function(res,req){    //路由 请求对象 响应对象
	//从提交的请求中，查询信息
	console.log(res.method);
	console.log(res.baseUrl);
	console.log(res.query);  //获取转换后的查询参数对象 url
	console.log(res.query.id);

	//post
	console.log(res.body);  //获取转换后的提交数据对象

	
	
});

