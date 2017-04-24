const express = require('express');
const app = express.createServer();
const tweets=[];

app.get('/', (req, res) => {
    var title = 'Chirpie',
        header = 'Welcome to Chirpie'
    res.render('views/index', {
        locals: {
            'title': title,
            'header': header,
            'tweets': tweets,
            stylesheets: ['/public/style.css']
        }
    })
});

app.post('/send',express.bodyParser(),(req,res)=>{
	if(req.body && req.body.tweet){
		tweets.push(req.body.tweet);

		// 判断头信息中是否包含text/html
		if(acceptsHtml(req.headers['accept'])){
			res.redirect('/',302);
		}else{
			res.send({status:'ok',message:'Tweet received'});
		}
	}else{
		res.send({status:'nok',message:'No tweet received'});
	}
});
app.listen(8000);

function acceptHtml(header){
	let accepts=header.split(',');
	
	for(let i=0;i<accepts.length;i++){
		if(accepts[i]==='text/html'){
			return true;
		}
	}
}