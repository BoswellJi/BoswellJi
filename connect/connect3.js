var connect=require('connect');
var app=connect();
var http=require('http');

var server=http.createServer(function(req,res){
    res.end('jmz');
});
/**
 * 第一个会失效
 */
function a(req,res,next){
    console.log(b+'df');
    next();
}

a.handle=function(req,res){
    res.end(b+'jay67');
}

app.use('/a/b',function(req,res){
    res.end('a/b');
});


app.listen(3000,function(){
    console.log('dfs');
});

/**
 * 挂在中间件
 */