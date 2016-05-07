function a(){
	console.log('a');
}

function b(){
	console.log('b');
}

//会将b对象输出 
module.exports=a;
module.exports=b;

//输出的是exports对象
exports.a=a;