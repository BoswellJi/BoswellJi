
const net = require('net'),
	  clientList=[];

const chatServer=net.createServer();

// 监听client连接到服务器端
chatServer.on('connection',(client)=>{

	// client.remoteAddress :ip地址
	// client.remotePort :端口
	client.name=client.remoteAddress+':'+client.remotePort;
	client.write('hi'+client.name+'!\n');

	clientList.push(client);

	// 监听client发送的信息
	client.on('data',function(data){
		 broadcast(data,client);
	});

	// client断开时
	client.on('end',function(){
		clientList.splice(clientList.indexOf(client),1);
	});

	// 当客户端发生的错误触发
	client.on('error',function(e){
		console.log(e);
	});

	// 关闭服务器端与客户端的连接
	// client.end();
});

function broadcast(message,client){
	const cleanup=[];
	for(let i=0;i<clientList[i];i++){
		if(client !== clientList[i]){
			if(clientList[i].writable){
				clientList[i].write(client.name+'says'+message);
			}else{
				cleanup.push(clientList[i]);
				clientList[i].destroy();
			}
		}
	}
	for(let i=0;i<cleanup.length;i++){
		clientList.splice(clientList.indexOf(cleanup[i]),1);
	}
}

chatServer.listen(9001);