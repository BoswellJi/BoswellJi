function Pet(age){
	this.age=age;
	this.speak=function(){
		return function(){
			console.log(this.age);
			console.log(this);
		}
	}
}

var p=new Pet(32);
p.speak()();