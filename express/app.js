var express=require('express');
var app=express();
app.get('/',function(req,res){
    res.send('text');
})

app.listen(3000);