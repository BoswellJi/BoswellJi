'use strict';

var fs = require('fs');
module.exports = {
	writeFile: function writeFile(path, data) {
		fs.writeFile(path, data, function (err) {
			if (err) {
				console.log('读取文件错误！');
			}
		});
	},
	writeFileSnyc: function writeFileSnyc(path, data) {
		fs.writeFileSnyc(path, data);
	}
};