//我擦，居然使用es6的语法

//nodejs提倡使用commonjs规范，所以，使用require函数来加载模块


//因为nodejs为服务器端的js语言了，所以提供了适合于服务器端的api[对象]，
//当然也就不需要在浏览器端的一些api了，但是语法还是相同的，也会有部分的api是通用的



//nodejs中实现了commonjs的模块管理规范，并在这个模块管理规范的基础之上创造了npm，包【模块】管理工具，每一个包
//就是一个模块，需要使用的时候，就可以require进来，


//人而模块就是三个部分，定义 ， 输出 ， 引用

/*
	nodejs的模块：核心模块，文件模块【自定义】 ，第三方模块


	quertstring字符串操作：
	1.nodejs解析js字面量对象为querystring:querystring.stringify({}),
		1.1querystring:querystring.stringify({},',')分隔符自定义
	2.可以看出，发送到服务器的数据最终都会被解析为key1=value1&keyn=valuen
	3.querystring.parse('key1=value1&keyn=valuen','&')将querystring解析为js对象，第二个默认为&分割符
		3.1.querystring.parse('key1=value1,keyn=valuen',',')根据分割符类型进行解析
	4.querystring.escape('编码');
		4.querystring.unescape('解码')；

	http:
	1.在浏览器输入网址
	2.浏览器查找自身sdn缓存
	3.浏览器查找操作系统自身sdn缓存
	4.远程

	回调
	异步
	单线程、多线程
	1.依次执行，安全
	2.并发执行，资源分配，不安全
	io:输入输出
	阻塞和非阻塞

	nodejs通过异步回调的方式来模拟多线程，进行非阻塞

	
*/


//加载模块

const http = require('http');


//定义常量
const hostname = '127.0.0.1';
const port = 1337;


//创建一个node服务
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

});
