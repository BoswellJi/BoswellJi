var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');

var multer = require('multer');
var mysql = require('mysql');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.use(urlencodedParser);
app.use(multer({ dest: '/tmp/' }).array('image'));



app.get('/', function (req, res) {
    // res.send('df');
    res.sendFile(__dirname + '/view/index.html');
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

    console.log(req.files[0]);  // 上传的文件信息

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