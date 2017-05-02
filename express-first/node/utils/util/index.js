var util=require('util');
// console.log(util);

function Parent(){
	this.name='jmz';
}

Parent.prototype={
	a:'b'
}

function Child(){
	Parent.call(this);
	this.age=21;
}

// 构造函数的`原型`的继承
util.inherits(Child,Parent);

const c=new Child();

console.log(c.name);


util.inspect.styles={
	number:'yellow'
}
// 对象的字符串输出
console.log(util.inspect({a:{a:'b'}},{showHidden:true,colors:true}));