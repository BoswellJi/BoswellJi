var http=require('http');
var server=http.Server();
var querystring = require('querystring');

server.on('request',function(req,res){
    res.writeHead(200,{'content-type':'text/html;utf-8'});
    res.end('df');
});

server.listen(3000,function(){
    console.log('df');
});

/**
 * EventEmitter 对象，触发时，执行回调
 * 对象上绑定事件
 */

var contents = querystring.stringify({
    adparam:"pf=in&ad_type=HT&pf_ex=pc&url=http%3A%2F%2Fsports.qq.com%2Fnba%2F&refer=https%3A%2F%2Fwww.google.com%2F&ty=web&plugin=1.0.0&v=3.4.37&coverid=&vid=d0026dy8qdu&pt=&flowid=0204a0843e99c5fc910d462bdb5f5f31_4100201&vptag=www_google_com&pu=1&chid=8&adaptor=2&dtype=1&live=0&resp_type=json&guid=f37b546ad70ac9ded4befc6b1f3dd55e&req_type=1&platform=4100201&method=POST",
    buid:"onlyad"
    });

 var req=http.request({
     host:'https://stackoverflow.com',
     port:443,
     method:'get',
     path:'/posts/17690803/ivc/579e?_=1527213297848'
 },function(err,data){
    console.log(data);
 })
 req.write();
 req.end();