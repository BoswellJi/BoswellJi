var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');
var formidable = require('formidable');

var root = __dirname;

var server = http.createServer(function (req, res) {
    // 获取文件路径
    var url = parse(req.url);
    var path = join(root, url.pathname);
    // res.setHeader('Content-Type','text/html;charset="utf-8"');
    // res.end(path);

    // 读取文件
    //var stream=fs.createReadStream(path);
    // stream.on('data',function(chunck){
    //     res.write(chunck);
    // });

    // stream.on('end',function(){
    //     res.end();
    // });

    // stream.pipe(res);

    // 处理错误
    // stream.on('error',function(err){
    //     res.statusCode=500;
    //     res.end('Interval Server Error');
    // });

    // stat 系统调用获取文件信息
    switch (req.method) {
        case 'POST':
        console.log('df');
            uploader(req, res);
            break;
        case 'GET':
            show(req, res);
            break;
    }

    function uploader(req, res) {
        var body = '';
        var file = '';
        if (!isFormData(req)) {
            res.statusCode = 400;
            res.end('Bad Request:ex');
        }

        var form = new formidable.IncomingForm();
        // form.parse(req);

        form.on('field', function (field, value) {
            body += field + '' + value;
            // res.end(body);
            console.log(body);
        });

        form.on('file', function (name, file) {
            file += name + '' + file;
            // res.end(file);
            console.log(file);
        });

        form.on('progress',function(byRec,byExp){
            var per=Math.floor(byRec/byExp*100);
            res.end(per);
        });

        form.on('end', function () {
            res.end('upload complete');
        });

    }

    function isFormData(req) {
        var type = req.headers['Content-Type'] || '';
        return 0 == type.indexOf('multipart/form-data');
    }

    function show(req, res) {
        // fs.stat(path, function (err, stat) {
        //     if (err) {
        //         if ('ENOENT' == err.code) {
        //             res.statusCode = 404;
        //             res.end('not found');
        //         } else {
        //             res.statusCode = 500;
        //             res.end('Server Error');
        //         }
        //     } else {
        //         res.setHeader('Content-Length', stat.size);
        //         var stream = fs.createReadStream(path);
        //         stream.pipe(res);
        //         stream.on('error', function (err) {
        //             res.statusCode = 500;
        //             res.end('Server Error');
        //         });
        //     }
        // });
        res.end(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form action="/" method="post" enctype="multipart/form-data">
        <input type="file" name="pic" id="pic" />
        <input type="submit" value="提交">
    </form>
</body>
</html>
        `);
    }
}).listen(3000);
