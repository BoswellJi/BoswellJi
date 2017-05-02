'use strict';

var _iterator = require('babel-runtime/core-js/symbol/iterator');

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var project = {
	projectName: 'jmz',
	fileData: [{
		name: 'css',
		type: 'dir'
	}, {
		name: 'js',
		type: 'dir'
	}, {
		name: 'images',
		type: 'dir'
	}, {
		name: 'index.html',
		type: 'file',
		content: 'jmz'
	}]
};

var fs = require('fs');

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
fs.readdir('./', 'utf-8', function (err, data) {
	console.log(typeof data === 'undefined' ? 'undefined' : _typeof(data));
});