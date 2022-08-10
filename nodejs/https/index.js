const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('./ryans-key.pem'),
  cert: fs.readFileSync('./ryans-cert.pem')
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8003);