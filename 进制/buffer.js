const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  res.end('dfdfdfdf');
});

server.listen(7000, () => {
  console.log(7000);
})