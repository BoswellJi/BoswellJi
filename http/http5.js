/**
 * app
 * 
 * 秘钥： 90263bde43c27c2a312f2d77833ecef7
 * id:   2053133584948865
 */

var http = require('http');

const options = {
    hostname: '192.168.2.162',
    port: 3000,
    path: '/login',
    method: 'get'
  };

var req=http.request('https://graph.facebook.com/oauth/access_token?client_id=2053133584948865&grant_type=client_credentials&client_secret=90263bde43c27c2a312f2d77833ecef7', function (res) {
    res.on('data', (chunk) => {
        console.log(`响应主体: ${chunk}`);
    });
    res.on('end', () => {
        console.log('响应中已无数据。');
    });
});

req.end();