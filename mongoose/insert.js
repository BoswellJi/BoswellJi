var mongoose=require('mongoose');
require('./mongoose.js');

// 获取定义的model
var Book=mongoose.model('Book');

// 创建model实例,对应的就是mongoDB中的文档
var book=new Book({
	name:'jmz',
	age:23
});


book.save(function(err){
	console.log('stuts',err?'failed':'success');
});