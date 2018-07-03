var http=require('http');
var server=http.createServer(function(req,res){
    res.end('df');
});
module.exports=server;