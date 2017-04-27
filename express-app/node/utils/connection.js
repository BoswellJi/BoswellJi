'use strict';

var mySql = require('mysql');

var conn = mySql.createConnection({
	host: 'localhost',
	user: 'jmz',
	password: 'jmzjmz',
	database: 'world',
	port: 3306
});

conn.connect();
conn.query('select * from city', function (err, rows, fields) {
	if (err) {
		throw err;
	} else {
		console.log(rows[0].Name);
	}
});

conn.end();