'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _swig = require('swig');

var _swig2 = _interopRequireDefault(_swig);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './node/utils/use';
// 

// import router1 from './node/utils/router/router1.js';

// 开启一个nodejs服务，监听81端口

var app = (0, _express2.default)();
// router1(app); 


/**
 * 配置模板
 * 1.定义模板引擎，使用swig.renderFile来解析html文件
 * 2.设置模板存放目录
 * 3.注册模板引擎
 */
// 第一个参数为模板后缀
app.engine('html', _swig2.default.renderFile);
// 第一个参数必须是views
app.set('views', __dirname + '/public/views');
// 第一个参数必须是view engine,第二个参数必须和app.engine的第一个参数定义的模板类型必须一致
app.set('view engine', 'html');
app.set('view cache', false);
_swig2.default.setDefaults({ cache: false });

/**
 * 中间件配置使用
 */
app.use((0, _morgan2.default)());
// // 设置静态文件托管 
// // 请求以/public开头的就一后面方法处理
app.use('/public', _express2.default.static(__dirname + '/public'));

// 定义不同部分的路由
app.use('/admin', require('./node/router/admin'));
app.use('/api', require('./node/router/api'));
app.use('/', require('./node/router/main'));

// // 设置body-parser,解析post请求的数据
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.listen(3001);

// console.log('node server 。。。'+process.env.PORT);

// const http=require('http');
// const connect=require('connect');
// const app=connect();

// app.use(connect.logger());

// app.use(function(req,res,next){
// 	res.writeHead(200,{'Content-Type':'text/html'});
// 	res.send('df');
// 	res.end();
// });

// http.createServer(app).listen(3001);