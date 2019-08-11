const WebSocket = require('ws');
const http = require('http');

http.createServer(function(req,res){

}).listen('8080',function(){
    console.log(',,,');
});

const ws = new WebSocket('wss://sscpgoceni.jin10.com:8081/socket.io/?EIO=3&transport=websocket&sid=wfD_tCULxmOaRkrTHlup');

ws.on('open', function open() {
    console.log('open');
    ws.send(3);
});

ws.on('message', function incoming(data) {
    console.log(data);
});

ws.on('close', function clear() {
    console.log('close');
});