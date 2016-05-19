var mongoose=require('mongoose');
require('./mongoose.js');


var Book=mongoose.model('Book');

Book.find({},function (err,docs) {
	console.log(docs);
});


Book.findOne({name:'jmz'},function(err,docs){
	if(err){
		return;
	}

	console.log(docs,'haha');
});