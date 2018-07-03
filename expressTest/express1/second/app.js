var express = require('express');
var app = express();
var bird = require('./bird');

// 提供静态文件目录
app.use(express.static('public'));
app.use(requestTime);

app.route('/book')
    .get(function (req, res) {
        res.send('Get a random book');
    })
    .post(function (req, res) {
        res.send('Add a book');
    })
    .put(function (req, res) {
        res.send('Update the book');
    });

app.use('/bird', bird);

var a = 0;

// app.get('/', function (req, res) {
//     req.requestTime += 'abc';
// }, function (req, res) {
//     res.send(req.requestTime);
// });

// regular middleware
app.use(function (req, res, next) {
    // i had an error
    next();
});

// error middleware for errors that occurred in middleware
// declared before this
app.use(function onerror(err, req, res, next) {
    if(err){
        res.send('error');
    }
    // an error occurred!
});

app.listen(3000, function () {
    console.log(3000 + '....');
});

function requestTime(req, res, next) {
    req.requestTime = Date.now();
    next();
}