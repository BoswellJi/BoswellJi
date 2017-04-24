'use strict';

var async = require('async');
// console.log(async);

// async.series({
// 	one: function(callback){
// 		callback(null, 1);
// 	},
// 	two: function(callback){
// 		callback(null, 2);
// 	},
// 	three:function(callback){
// 		callback(null,3);
// 	}
// },function(err, results) {
// 	console.log(results);
// });

// async.series([
// 	function(callback){
// 		callback(null,1);
// 	},
// 	function(callback){
// 		callback(null,2);
// 	}
// 	],function(err,results){
// 	console.log(results);
// });

async.parallel([function (callback) {
	callback(null, 1);
}, function (callback) {
	callback(null, 111);
}], function (err, results) {
	console.log(results);
});

module.exports = {};