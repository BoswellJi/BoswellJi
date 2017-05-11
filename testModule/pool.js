var mysql=require('mysql');
var pool=mysql.createPool({
	connectionLimit:10,
	host:'localhost',
	user:'jmz',
	password:'jmzjmz',
	database:'upandrunning'
});

pool.query('select 1+1 as solution',function(err,rows,fields){
	if(err){
		throw err;
	}
	console.log('the solution is :',rows[0].solution,fields);
});