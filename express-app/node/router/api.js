'use strict';

var express = require('express');
var router = express.Router();

router.get('/user/register', function (req, res, next) {

	next();
});

module.exports = router;