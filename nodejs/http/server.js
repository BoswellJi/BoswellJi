const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',

    /***
     * 资源的标识符，类似于指纹，用来对比资源是否真正发生变化
     *
     * 对比的响应头： If-None-Match
     */
    ETag: '2f2f1b158d759dc834d69c55903c86274316f401',

    /***
     * Expires是绝对时间，浏览器修改时间会导致缓存失效
     * max-age是相对时间
     */
    'Cache-Control': 'max-age=60',

    /***
     * Expires是绝对时间，
     */
    // Expires: "Wed, 21 Oct 2115 07:28:00 GMT",

    /***
     * 最后修改时间，告诉浏览器文件的最后修改时间，在过期时间之后，比对修改时间确定是否需要修改文件
     *
     * 缺点：Last-Modified只能精确到秒，假设文件是在1s内发生变动，Last-Modified无法感知到变化
     *
     * 对比的响应头： If-Modified-Since
     */
    // "Last-Modified": "Wed, 21 Oct 2115 07:28:00 GMT",
  });

  fs.readFile('./index.html', 'utf8', (err, data) => {
    res.end(data);
  });
});

server.listen(8001, () => {
  console.log('server 8001');
});
