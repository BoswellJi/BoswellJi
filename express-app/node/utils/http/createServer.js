'use strict';

var http = require("http");
var url = require('url');

var User = require('./modules/user.js');

http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
	res.write("hello world");
	res.write('<div><h2>h2</h2></div>');
	res.write('<div>jmz supervisor</div>');

	// 清除第二次访问
	if (req.url !== '/favicon.ico') {

		// var user=new User();
		// user.enter();
		// console.log('访问');
		res.write(req.url + '<br />');
		res.write(url.parse(req.url).pathname + '<br />');
		res.write(url.parse(req.url).href + '<br />');
		res.write(url.parse(req.url).protocol + '<br />');
		res.write(url.parse(req.url).port + '<br />');
	}
	// 响应结束，否则响应未结束
	// 会产生2次访问
	res.end('end');
}).listen(3000);