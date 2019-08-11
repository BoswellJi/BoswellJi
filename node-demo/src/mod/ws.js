var {Server}=require('ws');

exports.ws=function(req,res,next){
    var wsServer=new Server({port:8085});
    wsServer.on('conncetion',function(websocket){
        websocket.send('websocket');
    });
}

exports.wx=function(){
    console.log('add')
}

