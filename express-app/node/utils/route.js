'use strict';

var url = require('url');
var querystring = require('querystring');
var readFile = require('./fs/readFs.js');
var writeFile = require('./fs/writeFs.js');

module.exports = {
	/**
  * 异步处理文件回调
  * @param  {[type]} data [description]
  * @return {[type]}      [description]
  */
	recall: function recall(res) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		function recall(data) {
			res.write(data);
			res.end();
		}
		return recall;
	},
	login: function login(req, res) {

		// if(typeof url.parse(req.url).query!='null'){
		// 	console.log(url.parse(req.url).query);
		// }
		var post = '';
		req.on('data', function (data) {
			post += data;
		});
		req.on('end', function () {
			post = querystring.parse(post);
			// console.log(post['email']);
			res.write(post['email']);
			res.end();
		});

		readFile.readFile('./views/index.html', this.recall(res));
	},
	showImg: function showImg(req, res) {
		res.writeHead(200, { 'Content-Type': 'image/jpeg' });
		readFile.readImg('./images/a.png', res);
	}
};