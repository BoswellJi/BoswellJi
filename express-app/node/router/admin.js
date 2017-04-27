'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// app.use()指定了 只在/admin路径下的路由匹配
router.get('/user', function (req, res, next) {
	next();
});