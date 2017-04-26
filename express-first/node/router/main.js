const express=require('express');
const router=express.Router();


router.get('/',(req,res,next)=>{
	res.render('index');
<<<<<<< HEAD
	
=======
	next();
>>>>>>> 20c3e2e464d7b4dc5ae6f68ee51e91390855f3b8
});

module.exports=router;
