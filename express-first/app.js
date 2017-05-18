// 开启一个nodejs服务，监听81端口

import express from'express';
import swig from'swig';
import bodyParser from'body-parser';
import logger from 'morgan';
// import './node/utils/use';
// 

// import router1 from './node/utils/router/router1.js';

const app=express();
// router1(app); 


/**
 * 配置模板
 * 1.定义模板引擎，使用swig.renderFile来解析html文件
 * 2.设置模板存放目录
 * 3.注册模板引擎
 */
// 第一个参数为模板后缀
app.engine('html',swig.renderFile);
// 第一个参数必须是views
app.set('views',__dirname +'/public/views');
// 第一个参数必须是view engine,第二个参数必须和app.engine的第一个参数定义的模板类型必须一致
app.set('view engine','html');
app.set('view cache', false);
swig.setDefaults({ cache: false });


/**
 * 中间件配置使用
 */
app.use(logger());
// // 设置静态文件托管 
// // 请求以/public开头的就一后面方法处理
app.use('/public',express.static(__dirname+'/public'));

// 定义不同部分的路由
app.use('/admin',require('./node/router/admin'));
app.use('/api',require('./node/router/api'));
app.use('/',require('./node/router/main'));

// // 设置body-parser,解析post请求的数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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



