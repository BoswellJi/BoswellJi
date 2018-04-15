var connect = require('connect');
var app = connect();

// app.use(logger);

// app.use(hello);

// app.listen(3000);


app.use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(3000);


function logger(req, res, next) {
    console.log(req.method + '--', req.url);
    next();
}

function hello(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.end('nihaofgfg');
}

function limit(req, res, next) {
    var u = req.url;
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.end('无权限');
    next();
}

function restrict(req, res, next) {
    var auth = req.headers.authorization;

    if (!auth) {
        return next(new Error('认证错误'));
    }
    var parts = auth.split(' ');
    var scheme = parts[0];
    var au = new Buffer(parts[1], 'base64').toString().split(':');
    var user = au[0];
    var pass = au[1];

    authDB(user, pass, function (err) {
        if (err) {
            return next(err);
        }
        next();
    });
}


function admin(req, res, next) {
    switch (req.url) {
        case '/':
            res.end('try /use');
            break;
        case '/users':
            res.setHeader('Content-Type', 'text/plain');
            res.end(JSON.stringify(['todi', 'dfdf']));
            break;
    }
}

var path=url.parse(req.url).pathname;

function rewrite(req,res,next){
    var match=path.match(/^\/blog\/posts\/(.+)/);
    if(match){
        findPostIdBySlug(match[1],function(err,id){
            if(err) return next(err);
            if(!id) return next(new Error('user not fount'));
            req.url='/blog/posts/'+id;
            next();
        });
    }else{
        next();
    }
}

/**
 * 1. 分派器
 * 检测中间件，根据回调执行下一个中间件
 */