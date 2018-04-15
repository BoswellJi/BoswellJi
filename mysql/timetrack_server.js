var http = require('http');
var work = require('./timetrack');
var mysql = require('mysql');
var db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test'
});

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case 'POST':
            switch (req.url) {
                case '/':
                    work.add(db, req, res);
                    break;
                case '/archive':
                    work.archive(db, req, res);
                    break;
            }
            break;
        case 'GET':
            switch (req.url) {
                case '/':
                    work.show(db, res);
                    break;
                case '/archive':
                    work.showArchive(db, res)
                    break;
            }
            break;
    }
});

db.query(`CREATE TABLE IF NOT EXISTS user (
    name varchar(50) DEFAULT NULL,
    age int(11) DEFAULT NULL,
    sex bit(1) DEFAULT NULL
  )`,function(err){
    if(err) throw err;
    console.log('server started...');
    server.listen(3000,'127.0.0.1');
});