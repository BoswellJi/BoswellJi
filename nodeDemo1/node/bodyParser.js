var connect=require('connect');
var app=connect()
    // .use(connect.bodyParser())
    // .use(function(req,res){
    //     console.log(req.body.name);
    // });
    console.log(connect);

    app.listen(3000);