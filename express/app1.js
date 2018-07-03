/**
 * nodejs发请求
 */
var http = require('http');

function sendReq(option) {
    var req = http.request({
        host: option.host,
        method: option.method,
        port: 3000,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    req.write('[');
    var n = 30000;
    while (n > 0) {
        n = n - 1;
        req.write('"foo",');
    }
    req.write('"bar"]');
    req.end();
}