// 依赖
var express = require('express');
var session = require('express-session');
var logger = require('morgan');
var cookiePaser = require('cookie-parser');
var bodyPaser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var MySQLStore = require('express-mysql-session')(session);
var FileStore = require('session-file-store')(session);
var FileStreamRotator = require('file-stream-rotator');
var cors = require('cors');
// 定义变量
var app = express();

/**
 * session 存储到mysql中的配置
 */
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'test'
};
var sessionStore = new MySQLStore(options);

/**
 * 日志存储到文件中
 */
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
/**
 *  可写流
 */
/**
 * 日志目录
 */
var logDirectory = path.join(__dirname, 'log')
// 确认日志目录是否存在，不存在则创建
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// 创建可写流
// 根据日期进行分割日志
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

/**
 * 中间件 
 * 将一些量进行处理，交付到下一个处理中使用
 * 在路由中可以使用
 */
app.use(logger('common', {
    stream: accessLogStream
}));

app.use(session({
    name: 'session_id',
    secret: 'chyingp',                      // 用来对session id相关的cookie进行签名
    store: new FileStore(),               // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    //store:sessionStore,                   // 本地存储session（mysql，也可以选择其他store，比如redis的）
    //saveUninitialized: false,             // 是否自动保存未初始化的会话，建议false
    resave: false,                          // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 1000 * 1000                   // 有效期，单位是毫秒
    }
}));

/**
 * 配置视图模板目录
 */
app.set('view', __dirname + '/view');

/**
 * 视图模板引擎
 * express 内置中间件
 */
app.set('engin', 'ejs');

/**
 * cookie解析
 */
// app.use(cookiePaser());

/**
 * post 请求参数解析
 */
// app.use(bodyPaser());

/**
 * http资源共享配置
 */
app.use(cors());

var sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
})

// 路由
app.get('/', function (req, res) {
    if (req.query['name']) {
        req.session.name = 'jmzdf';
    } else if (req.query['name1']) {
        req.session.name = 'jmzdf1';
    }
    res.json({ name: 'jmz' });
})

app.get('/login', function (req, res) {
    console.log(res.sessionStore);
    console.log(res.session);
    res.json({ name: 'jmz1' });
})

app.listen(3000);

/**
 * 1. 日志
 *  1.1 分割日志
 *  1.2 文件存储
 * 2. session
 *  2.1 文件存储
 *  2.2 数据库存储
 *  2.3 redis存储
 */