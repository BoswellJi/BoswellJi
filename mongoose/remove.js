var mongoose=require('mongoose');
require('./mongoose.js');

var Book=mongoose.model('Book');

Book.findOne({name:'jmz'},function (err,docs) {
	if(err){
		return;
	}

	if(docs){
		docs.remove();
	}
});