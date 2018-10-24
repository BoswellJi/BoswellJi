var http=require('http');
var parse=require('url').parse;
var join=require('path').join;
var fs=require('fs');


var server = http.createServer(function (req, res) {
    var url=parse(req.url);
    var path=join(root,url.pathname);
    switch (req.method) {
        case 'POST':
            uploader(req, res);
            break;
        case 'GET':
            if(err){
                if('ENOENT'==err.code){
                    res.statusCode=404;
                    res.end('not found');
                }else{
                    res.statusCode=500;
                    res.end('Server Error');
                }
            }else{
                res.setHeader('Content-Length',stat.size);
                var stream=fs.createReadStream(path);
                stream.pipe(res);
                stream.on('error',function(err){
                    res.statusCode=500;
                    res.end('Server Error');
                });
            }
    }
}).listen(3000,function(){
    console.log('运行在3000。。。');
})

function uploader(req,res){
    res.end('dfdf');
}

function show(req,res){

}