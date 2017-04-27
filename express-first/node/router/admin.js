import express from 'express';
const router=express.Router();

// app.use()指定了 只在/admin路径下的路由匹配
router.get('/user',(req,res,next)=>{
	next();
});

