const express=require('express');
const router=express.Router();

router.get('/user/register',(req,res,next)=>{
	res.send('register');
});

module.exports=router;