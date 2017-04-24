const express = require('express');
const app=express.createServer();
const tweets = [];

app.get('/',function(req,res){
	res.send('welcome to node twitter');
});

/**
 * express.bodyParser() :中间件，解析post传递过来的data
 * req.body：为data
 * http头必须是formdata
 * content-type 属性是application/x-www-form-urlencoded 或 application/json。
 */
app.post('/send',express.bodyParser(),(req,res)=>{
	if(req.body && req.body.tweet){
		tweets.push(req.body.tweet);
		res.send({status:'ok',message:'Tweet received'});
	}else{
		res.send({status:'nok',message:'No tweet received'});
	}
});

app.get('/tweets',(req,res)=>{
	res.send(tweets);
});

app.listen(8000);

