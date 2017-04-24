function User(){
	this.name='jmz'
}

User.prototype={
	enter:function(){
		console.log(this.name+'哈哈');
	}
};

module.exports=User;