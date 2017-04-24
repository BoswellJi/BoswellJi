module.exports=function(app){


	app.use('/',function(req,res,next){
		if(req.url==='/'){
			// res.writeHead(200,{'Content-type':'text/html;charset=utf-8'})
			res.send('hh');
			console.log(req)
			res.end()
		}else{
			next();
		}
	});

	app.use('/user',function(req,res){
		if(req.url==='user'){
			// res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
			res.send('add')
			res.end()
		}
	})
}