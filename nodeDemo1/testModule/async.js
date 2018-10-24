
/**
 * 通用方法
 * 异步方法
 */

var async=require('async');


// async.map([function(cb){
// 	cb(null,1);
// },2,3,4,5],function(index,el){
// 	console.log(index,el);
// });

// console.log(async); 


async.series([
	function(cb){
		for(var i=0;i<100;i++){
			setTimeout(function(){
				console.log('1');
				cb(null,1);
			},1000);
		}
	},
	function(cb){
		setTimeout(function(){
				console.log('2');
				cb(null,2);
			},1000);
	}
],function(err,result){
	console.log(result);
});

async.each([1,3,4,5],function(i,e){
	console.log(i,e);
});