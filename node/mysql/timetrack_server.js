var mysql = require('mysql');
var arg=process.argv.splice(2)[0];
/**
 *  创建数据库连接
 */
var db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect();

// db.query(`CREATE TABLE IF NOT EXISTS user (
//     name varchar(50) DEFAULT NULL,
//     age int(11) DEFAULT NULL,
//     sex bit(1) DEFAULT NULL
//   )`,function(err){
//     if(err) throw err;
// });
var sql='';

if(arg==='add'){
    sql='insert into user (name,age,sex) values(?,?,?)';
    db.query(sql,['jmz',21,1],function(err,data){
        console.log(data);
    });
}else if(arg==='delete'){
    sql='delete from user where name=?';
    db.query(sql,['jmz'],function(err,data){
        console.log(data);
    });
}else if(arg==='update'){
    sql='update user set name="jay" where name=?';
    db.query(sql,['jmz'],function(err,data){
        console.log(data);
    });
}else if(arg==='select'){
    sql='select * from user';
    db.query(sql,['jmz'],function(err,data){
        console.log(data);
    });
}


db.end();