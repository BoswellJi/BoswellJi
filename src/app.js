var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');
var request = require('request');
var url = require('url');
var path=require('path');
var swig=require('swig');
var ws=require('./mod/ws');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})


/**
 * 中间件的配置使用
 */
app.use('/static',express.static(path.join(__dirname,'public')));
app.use(urlencodedParser);
app.use(multer({
    dest: '/tmp/'
}).array('image'));

/**
 * 配置模板
 * 1.定义模板引擎，使用swig.renderFile来解析html文件
 * 2.设置模板存放目录
 * 3.注册模板引擎
 */
// 第一个参数为模板后缀
app.engine('html',swig.renderFile);
// // 第一个参数必须是views
app.set('views',__dirname +'/view');
// // 第一个参数必须是view engine,第二个参数必须和app.engine的第一个参数定义的模板类型必须一致
app.set('view engine','html');
app.set('view cache', false);
swig.setDefaults({ cache: false });

ws.wx();
// wx();

app.get('/', function (req, res1) {
    res1.sendFile(__dirname + '/view/index.html');
    // var str=''+req.ip+req.hostname+req.host+req.accepts+req.baseUrl+'jmz';
    // // res.send(str);
    // res.send(req.params);
    //console.log(url.parse(req.url));

    // request('https://wohugb.gitbooks.io/pm2/content/gitbook/plugins/gitbook-plugin-comment/plugin.js', function (error, res, body) {
    //     if (!error && res.statusCode === 200) {

    //         // res1.type('.js'); 
    //         // res1.set({
    //         //     'Content-Type': 'text/plain',
    //         //     'Content-Length': '123',
    //         //     'ETag': '12345'
    //         // })
    //          res1.send(body);
    //         //res1.status(400).send('Bad Request');
    //     }
    // })
})

app.get('/a', function (req, res) {
    res.send(req.route);
})

app.post('/process_post', urlencodedParser, function (req, res) {

    // 输出 JSON 格式
    var response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})

app.post('/file_upload', function (req, res) {

    console.log(req.files[0]); // 上传的文件信息

    var des_file = __dirname + "/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})

app.get('/dqr', function (req, res) {

    var connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'jmzjmz',
        database: 'dqrdb'
    });

    connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
        res.end('df');
    });

    connection.end();
})

var server = app.listen('3001', function () {
    console.log(server.address().address, server.address().port);
});