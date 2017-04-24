const mySql=require('mysql');

const conn=mySql.createConnection({
	host:'localhost',
	user:'jmz',
	password:'jmzjmz',
	database:'world',
	port:3306
});

conn.connect();
conn.query('select * from city',(err,rows,fields)=>{
	if(err){
		throw err;
	}else{
		console.log(rows[0].Name);
	}
});

conn.end();
