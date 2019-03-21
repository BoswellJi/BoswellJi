 var mysql = require('mysql');

 // 创建一个将要连接的数据库实体
 // var connection=mysql.createConnection({
 // 	host:'localhost',
 // 	user:'jmz',
 // 	password:'jmzjmz',
 // 	database:'upandrunning'
 // });
var connection=mysql.createConnection('mysql://jmz:jmzjmz@localhost/upandrunning');

// 对数据库进行连接
 // connection.connect(function(err){
 // 	if(!err){
 // 		console.log('连接ID'+connection.threadId);
 // 		return;
 // 	}
 // 	console.error('连接错误 '+err.stack);
 // 	return;
 // });
 
 connection.query('select 1',function(err,rows){
 	console.log('连接成功', rows instanceof Array);
 	console.log(rows);
 	rows.forEach(function(value,index){
 		console.log(index,value);
 	});
 	return;
 });


// 关闭和数据库之间的连接
// connection.end(function(err){
// 	if(err){
// 		console.log('关闭错误');
// 	}else{
// 		console.log('关闭成功');
// 	}
// });

// connection.destroy();

//切换连接数据库的用户
connection.changeUser({user:'joho'},function(err){
	if(err){
		throw err;
	}
}); 