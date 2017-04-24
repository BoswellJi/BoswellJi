import http from 'http';
http.createServer((request,respone)=>{
	respone.writeHead(200,{'content-type':'text/plain'});
	respone.send('df');
	respone.end();
});