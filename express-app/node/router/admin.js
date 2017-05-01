'use strict';

var express = require('express');
var router = express.Router();

// app.use()指定了 只在/admin路径下的路由匹配
router.get('/user', function (req, res, next) {
	next();
});

module.exports = router;