const http=require('http');
const assert=require('assert');

const opt={
	host:'localhost',
	port:8000,
	path:'/send',
	method:'post',
	headers:{'content-type':'application/x-www-form-urlencoded'}
}

const req=http.request(opt,(res)=>{
	// 将返回的数据进行设置编码
	res.setEncoding('utf8');

	let data='';

	res.on('data',(d)=>{
		data+=d;
	})

	// 服务器返回的数据接收完整后
	res.on('end',()=>{
		// 数据不对等发生错误
		assert.strictEqual(data,'{"status":"ok","message":"Tweet received"}');
	});
});

req.write('tweet=test');
req.end();

/**
 *编写这些测试脚本的目的，就是检查服务器是否达到了设计要求。
 * 
 */