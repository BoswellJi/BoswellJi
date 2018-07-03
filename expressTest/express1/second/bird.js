/**
 * 定义路由模块
 */
var express=require('express');
var router=express.Router();

router.use(function(req,res,next){
    console.log('time',Date.now());
    next();
});

router.get('/',function(req,res){
    res.send('birds end');
});

router.get('/about',function(req,res){
    res.send('about');
});

module.exports=router;

