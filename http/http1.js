var http = require('http');
var url = require('url');
var items = [];

var httpServer = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            // ascill utf-8 
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function (data) {
                item += data;
            });

            req.on('end', function () {
                items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            // items.forEach(function (item, i) {
            //     res.write(i + '' + item + '\n');
            // });
            // res.end();
            var body = items.map(function (item, i) {
                return i + ')' + item;
            }).join('\n');

            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain;charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname,
                i = parseInt(path.slice(1), 10);

            if (isNaN(i)) {
                res.statusCode = 400;
                res.end('无效id');
            } else if (!items[i]) {
                res.statusCode = 404;
                res.end('item is not found');
            } else {
                items.splice(i, 1);
                res.end('ok\n');
            }
            break;
    }
}).listen(3000);