var events = require('events');
var net = require('net');
var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

/**
 * 给发射器添加事件监听
 */
channel.on('join', function (id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function (sendId, message) {
        if (id != sendId) {
            this.clients[id].write(message);
        }
    }
    this.on('broadcast',this.subscriptions[id]);
});

var server=net.createServer(function(client){
    var id=client.remoteAddress+':'+client.remotePort;
    console.log(id);
    client.on('connect',function(){
        console.log(id);
        channel.emit('join',id,client);
    });

    client.on('data',function(data){
        
        data=data.toString();
        console.log(data);

        channel.emit('broadcast',id,data);
    });
});

server.listen(8000,function(){
    console.log('dfdf');
});