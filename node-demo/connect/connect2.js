var connect=require('connect');
connect()
    .use(logger)
    .use(function(req,res){
        res.setHeader('Content-Type','text/plain');
        res.end('hello world');
        next();
    })
    .use(errorHandler)
    .listen(3000);

function logger(req,res,next){
    console.log(req.url+''+req.method);
    // res.end('df');
    next();
}


function errorHandler(){
    // 环境变量
    var env=process.env.NODE_ENV || 'development';
    return function(err,req,res,next){
        res.statusCode=500;
        switch(env){
            case 'development':
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify(err));
                break;
            default:
                res.end('server error');
        }
    }
}