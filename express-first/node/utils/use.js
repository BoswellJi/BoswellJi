function express(){
	const fns=[];
	function expr(req,res){
		let i=0;
		function next(){
			let task=fns[i++];
			if(!task) return;
			task(req,res,next);
		}
		next();
	}
	expr.use=function(fn){
		fns.push(fn);
	}
	return expr;
}

const app=express();

app.use((req,res,next)=>{ 
	console.log('df');
	next();
});

app.use((req,res,next)=>{
	console.log('second');
	next();
});

// next把控制权给了下一个中间件，完成后在执行下面的
app.use((req,res,next)=>{
	console.log('12');
	next();
	console.log('34');
});

app.use((res,req,next)=>{
	console.log('nne');
	next();
});