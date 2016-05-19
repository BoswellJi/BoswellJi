var express=require('express');
var router=require('router');
 
router.get('/:id',function(res,req){   // /user/101

	console.log(res.params);

	req.send('jaj');
	req.status(403).send();  //返回给用户的状态码
	req.contentType('application/javascript');  //设置当前相应的数据类型
	req.sendFile('./a.js',{root:__dirname+'/'});  //当前文件的绝对路径 __dirname
	req.json({"a":"b"});  //发送一个json
});